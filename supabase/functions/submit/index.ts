// =============================================================================
// Supabase Edge Function: submit
// =============================================================================
// The server-side gateway for the public contact + testimonial forms. It:
//   1. throttles by client IP (a global limit on top of the per-email DB rule),
//   2. verifies a Cloudflare Turnstile token,
//   3. inserts a contact message / (unpublished) testimonial via the service role,
//   4. fires transactional email — team notification + visitor auto-reply.
//
// Binding the human-check to the write — server-side, with the secret the browser
// never sees — is what makes the CAPTCHA un-bypassable: a bot can't skip the
// verify call and POST to the table directly (once anon INSERT is removed; see
// README). Steps 1 and 4 degrade gracefully: no throttle RPC / no RESEND_API_KEY
// simply skips that step, so the function is safe to ship before either is set up.
//
// Deploy:
//   supabase functions deploy submit --no-verify-jwt
// Secrets (set once):
//   supabase secrets set TURNSTILE_SECRET_KEY=xxxxxxxx
//   supabase secrets set RESEND_API_KEY=re_xxx            # optional, see email.ts
//   supabase secrets set CONTACT_FROM="Navya EdTech <hello@your-domain.com>"
//   supabase secrets set CONTACT_NOTIFY_TO=team@your-domain.com
//   (SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY are injected automatically.)
//
// `--no-verify-jwt` because anonymous visitors submit these forms; abuse is
// gated by Turnstile + the throttles, not by auth.
//
// Always responds 200 with `{ ok, error? }` for business outcomes (failed
// verification, validation, rate-limit) so the client can read a friendly message
// from the body; non-2xx is reserved for unexpected/transport errors.
// =============================================================================
import { createClient, type SupabaseClient } from "https://esm.sh/@supabase/supabase-js@2";
import {
  autoReplyContact,
  dispatch,
  notifyNewContact,
  notifyNewTestimonial,
} from "./email.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

function json(body: unknown, status = 200): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
}

/** Trim + length-cap a free-text field; returns null for empty/absent. */
function clean(value: unknown, max: number): string | null {
  if (typeof value !== "string") return null;
  const v = value.trim();
  return v ? v.slice(0, max) : null;
}

async function verifyTurnstile(
  token: unknown,
  ip: string | null
): Promise<boolean> {
  const secret = Deno.env.get("TURNSTILE_SECRET_KEY");
  if (!secret) {
    console.error("TURNSTILE_SECRET_KEY is not set — rejecting submission.");
    return false;
  }
  if (typeof token !== "string" || !token) return false;

  const form = new FormData();
  form.append("secret", secret);
  form.append("response", token);
  if (ip) form.append("remoteip", ip);

  const res = await fetch(
    "https://challenges.cloudflare.com/turnstile/v0/siteverify",
    { method: "POST", body: form }
  );
  const data = await res.json().catch(() => ({ success: false }));
  return data?.success === true;
}

// Per-IP rate limit, in addition to the per-email DB throttle. Backed by the
// `register_ip_hit` RPC (see migration 0005). If the RPC is missing or errors
// we *allow* the request — availability over enforcement, and the other layers
// (Turnstile, per-email throttle) still apply.
const IP_MAX_HITS = 8; // submissions per window, per IP, across all form types
const IP_WINDOW = "10 minutes";

async function withinIpLimit(
  supabase: SupabaseClient,
  ip: string | null,
  kind: string
): Promise<boolean> {
  if (!ip) return true; // can't identify the caller — don't block
  const { data, error } = await supabase.rpc("register_ip_hit", {
    p_ip: ip,
    p_kind: kind,
    p_max: IP_MAX_HITS,
    p_window: IP_WINDOW,
  });
  if (error) {
    console.error("register_ip_hit failed (allowing)", error.message);
    return true;
  }
  return data !== false;
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }
  if (req.method !== "POST") {
    return json({ ok: false, error: "Method not allowed." }, 405);
  }

  let body: { type?: string; token?: string; payload?: Record<string, unknown> };
  try {
    body = await req.json();
  } catch {
    return json({ ok: false, error: "Bad request." }, 400);
  }

  const { type, token, payload = {} } = body;

  // Honeypot (defence in depth): a real human never fills these. Pretend
  // success so we don't reveal the trap, but never touch the database.
  if (payload.company_website || payload.company_url) {
    return json({ ok: true });
  }

  const ip =
    req.headers.get("cf-connecting-ip") ??
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    null;

  const supabase = createClient(
    Deno.env.get("SUPABASE_URL")!,
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
    { auth: { persistSession: false, autoRefreshToken: false } }
  );

  // Rate-limit before spending a Turnstile verification, so a flood is cut off
  // cheaply at the IP layer.
  if (!(await withinIpLimit(supabase, ip, type ?? "unknown"))) {
    return json({
      ok: false,
      error: "Too many submissions from your network. Please try again later.",
    });
  }

  if (!(await verifyTurnstile(token, ip))) {
    return json({ ok: false, error: "Verification failed. Please try again." });
  }

  if (type === "contact") {
    const name = clean(payload.name, 120);
    const email = clean(payload.email, 200);
    const message = clean(payload.message, 5000);
    if (!name || !email || !message) {
      return json({ ok: false, error: "Missing required fields." });
    }
    const { error } = await supabase.from("contact_submissions").insert({
      name,
      email,
      message,
      phone: clean(payload.phone, 40),
      service: clean(payload.service, 120),
      budget: clean(payload.budget, 60),
    });
    if (error) {
      // 23514 = check_violation raised by the enforce_contact_rules trigger;
      // its message is already safe to show the user.
      if (error.code === "23514") return json({ ok: false, error: error.message });
      console.error("contact insert failed", error);
      return json({ ok: false, error: "Something went wrong. Please try again." });
    }

    // Best-effort, off the response path: notify the team + acknowledge the
    // visitor. A failure here never affects the saved message.
    const emailData = {
      name,
      email,
      message,
      phone: clean(payload.phone, 40),
      service: clean(payload.service, 120),
      budget: clean(payload.budget, 60),
    };
    dispatch(Promise.all([notifyNewContact(emailData), autoReplyContact(emailData)]));

    return json({ ok: true });
  }

  if (type === "testimonial") {
    const quote = clean(payload.quote, 2000);
    const name = clean(payload.name, 120);
    if (!quote || !name) {
      return json({ ok: false, error: "Please share a quote and your name." });
    }
    const ratingNum = Number(payload.rating);
    const rating = Math.min(5, Math.max(1, Number.isFinite(ratingNum) ? ratingNum : 5));
    const { error } = await supabase.from("testimonials").insert({
      quote,
      name,
      role: clean(payload.role, 120),
      company: clean(payload.company, 120),
      rating,
      is_published: false, // always a draft for admin review
      sort_order: 0,
    });
    if (error) {
      console.error("testimonial insert failed", error);
      return json({ ok: false, error: "Something went wrong. Please try again." });
    }

    // Let the team know a testimonial is waiting for review (no auto-reply: the
    // form doesn't collect the author's email).
    dispatch(
      notifyNewTestimonial({
        name,
        quote,
        role: clean(payload.role, 120),
        company: clean(payload.company, 120),
        rating,
      })
    );

    return json({ ok: true });
  }

  return json({ ok: false, error: "Unknown submission type." }, 400);
});
