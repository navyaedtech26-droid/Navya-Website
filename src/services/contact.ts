/**
 * Contact form submissions. Routed through the Supabase `submit` Edge Function,
 * which verifies Turnstile (if configured), applies per-IP rate-limiting, inserts
 * into `contact_submissions`, and sends email notifications via Resend.
 *
 * Falls back to direct Supabase anon insert if the Edge Function is unreachable.
 */
import { supabase, isSupabaseConfigured } from "@/lib/supabase";
import { logger } from "@/lib/logger";

const log = logger.scope("contact");

export interface ContactInput {
  name: string;
  email: string;
  phone?: string;
  service?: string;
  budget?: string;
  message: string;
  /** Honeypot — must always be empty for a real human. */
  company_website?: string;
}

export interface SubmitResult {
  ok: boolean;
  error?: string;
}

/**
 * Submit a contact inquiry.
 */
export async function submitContact(
  input: ContactInput,
  token?: string
): Promise<SubmitResult> {
  // Honeypot tripped → pretend success so we don't reveal the trap
  if (input.company_website && input.company_website.trim() !== "") {
    return { ok: true };
  }

  if (!isSupabaseConfigured || !supabase) {
    // No backend configured (e.g. local dev without env) — don't hard-fail the UI.
    log.warn("Supabase is not configured; message was not sent.");
    return { ok: true };
  }

  const payload = {
    name: input.name.trim(),
    email: input.email.trim(),
    phone: input.phone?.trim() || null,
    service: input.service || null,
    budget: input.budget || null,
    message: input.message.trim(),
  };

  try {
    const { data, error } = await supabase.functions.invoke<{
      ok: boolean;
      error?: string;
    }>("submit", {
      body: {
        type: "contact",
        token,
        payload,
      },
    });

    if (!error && data?.ok) {
      return { ok: true };
    }

    if (error) {
      log.warn("submit via edge function failed, falling back to direct insert", error);
    } else if (data && !data.ok) {
      return { ok: false, error: data.error ?? "Something went wrong. Please try again." };
    }
  } catch (err) {
    log.warn("edge function call threw, falling back to direct insert", err);
  }

  // Fallback path: direct database insert
  const { error } = await supabase.from("contact_submissions").insert(payload);

  if (error) {
    log.error("submit failed", error);
    // 23514 is check_violation from enforce_contact_rules()
    if (error.code === "23514") {
      return { ok: false, error: error.message };
    }
    return { ok: false, error: "Something went wrong. Please try again." };
  }

  return { ok: true };
}
