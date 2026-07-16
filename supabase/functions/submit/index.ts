// Supabase Edge Function: `submit`
//
// Endpoint for the testimonial form. (The contact form no longer goes through
// Supabase — it sends directly from the browser via EmailJS, see the
// "Contact form (EmailJS)" section in .env.example.) Verifies the Cloudflare
// Turnstile token server-side, applies a per-IP rate limit on top of the
// existing per-email DB throttle, inserts the row with the service role
// (bypassing RLS), and — best effort, after the row is saved — emails the
// team via Resend. See supabase/README.md §5-7 for the full setup story.
//
// Deploy:  supabase functions deploy submit --no-verify-jwt
// Secrets: TURNSTILE_SECRET_KEY, RESEND_API_KEY, CONTACT_FROM, CONTACT_NOTIFY_TO
//          (SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY are injected automatically)
//
// Every secret is optional: with none set, the function still verifies
// nothing, rate-limits by IP only, and just saves the row — mirroring the
// direct-insert fallback the client uses when Turnstile isn't configured.

import { createClient } from "npm:@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const TURNSTILE_SECRET_KEY = Deno.env.get("TURNSTILE_SECRET_KEY");
const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");
const CONTACT_FROM = Deno.env.get("CONTACT_FROM");
const CONTACT_NOTIFY_TO = Deno.env.get("CONTACT_NOTIFY_TO");
const SUPABASE_URL = Deno.env.get("SUPABASE_URL") ?? "";
const SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "";

// Per-IP fixed-window limit, layered on top of the per-email DB throttle so a
// bot can't bypass it by rotating the email field. See migration 0005
// (ip_throttle) / supabase/README.md §7. Tune here, then redeploy.
const IP_MAX_HITS = 8;
const IP_WINDOW = "10 minutes";

const admin = createClient(SUPABASE_URL, SERVICE_ROLE_KEY, {
  auth: { persistSession: false },
});

interface TestimonialPayload {
  quote: string;
  name: string;
  role: string | null;
  company: string | null;
  rating: number;
}

type Body = { type: "testimonial"; token?: string; payload: TestimonialPayload };

function json(body: unknown, status = 200): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
}

/** Visitor-authored text only ever goes into emails as escaped HTML. */
function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

/**
 * Run a promise after the response is sent, without letting a failure become
 * an unhandled rejection. Falls back to a plain fire-and-forget if the edge
 * runtime's background-task hook isn't present (e.g. local `supabase serve`).
 */
function background(promise: Promise<unknown>): void {
  const waitUntil = (globalThis as { EdgeRuntime?: { waitUntil?: (p: Promise<unknown>) => void } })
    .EdgeRuntime?.waitUntil;
  const guarded = promise.catch((err) => console.error("background task failed", err));
  if (waitUntil) waitUntil(guarded);
}

function clientIp(req: Request): string | null {
  const forwarded = req.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0]?.trim() || null;
  return req.headers.get("cf-connecting-ip");
}

/** Verify a Turnstile response token. A no-op (always passes) when unconfigured. */
async function verifyTurnstile(token: string | undefined, ip: string | null): Promise<boolean> {
  if (!TURNSTILE_SECRET_KEY) return true;
  if (!token) return false;

  const form = new URLSearchParams();
  form.set("secret", TURNSTILE_SECRET_KEY);
  form.set("response", token);
  if (ip) form.set("remoteip", ip);

  try {
    const res = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
      method: "POST",
      body: form,
    });
    const data = await res.json();
    return data.success === true;
  } catch (err) {
    console.error("turnstile verify failed", err);
    return false;
  }
}

/** Send one email via Resend. A silent no-op when Resend isn't configured. */
async function sendEmail(opts: {
  to: string[];
  subject: string;
  html: string;
  replyTo?: string;
}): Promise<void> {
  if (!RESEND_API_KEY || !CONTACT_FROM || opts.to.length === 0) return;

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${RESEND_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: CONTACT_FROM,
      to: opts.to,
      subject: opts.subject,
      html: opts.html,
      ...(opts.replyTo ? { reply_to: opts.replyTo } : {}),
    }),
  });

  if (!res.ok) {
    console.error("resend send failed", res.status, await res.text());
  }
}

function notifyRecipients(): string[] {
  return (CONTACT_NOTIFY_TO ?? "")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
}

async function handleTestimonial(payload: TestimonialPayload) {
  const { data, error } = await admin
    .from("testimonials")
    .insert({
      quote: payload.quote,
      name: payload.name,
      role: payload.role,
      company: payload.company,
      rating: payload.rating,
      is_published: false,
      sort_order: 0,
    })
    .select("id")
    .single();

  if (error) {
    return json({ ok: false, error: "Something went wrong. Please try again." }, 400);
  }

  const to = notifyRecipients();
  if (to.length > 0) {
    background(
      sendEmail({
        to,
        subject: `New testimonial from ${payload.name} (pending review)`,
        html: `
          <h2>New testimonial — pending review</h2>
          <p><strong>Name:</strong> ${escapeHtml(payload.name)}</p>
          ${payload.role ? `<p><strong>Role:</strong> ${escapeHtml(payload.role)}</p>` : ""}
          ${payload.company ? `<p><strong>Company:</strong> ${escapeHtml(payload.company)}</p>` : ""}
          <p><strong>Rating:</strong> ${payload.rating}/5</p>
          <p><strong>Quote:</strong><br>${escapeHtml(payload.quote)}</p>
        `,
      })
    );
  }

  return json({ ok: true, id: data?.id });
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }
  if (req.method !== "POST") {
    return json({ ok: false, error: "Method not allowed." }, 405);
  }

  let body: Body;
  try {
    body = await req.json();
  } catch {
    return json({ ok: false, error: "Invalid request." }, 400);
  }

  if (body.type !== "testimonial") {
    return json({ ok: false, error: "Invalid submission type." }, 400);
  }
  if (!body.payload) {
    return json({ ok: false, error: "Invalid request." }, 400);
  }

  const ip = clientIp(req);

  // Fails open if the ip_throttle migration/RPC isn't present — never blocks
  // a legitimate submission on an infra gap.
  const { data: withinLimit, error: ipError } = await admin.rpc("register_ip_hit", {
    p_ip: ip ?? "",
    p_kind: body.type,
    p_max: IP_MAX_HITS,
    p_window: IP_WINDOW,
  });
  if (ipError) {
    console.error("register_ip_hit failed", ipError);
  } else if (withinLimit === false) {
    return json({ ok: false, error: "Too many submissions. Please try again later." }, 429);
  }

  const verified = await verifyTurnstile(body.token, ip);
  if (!verified) {
    return json({ ok: false, error: "Verification failed. Please try again." }, 400);
  }

  return handleTestimonial(body.payload);
});
