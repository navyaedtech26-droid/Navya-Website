/**
 * Contact form submissions. Anonymous visitors are allowed to INSERT only
 * (enforced by RLS in `supabase/schema.sql`).
 */
import { supabase, isSupabaseConfigured } from "@/lib/supabase";
import { isTurnstileConfigured } from "@/lib/turnstile";
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
 * Persist a contact message. Returns `{ ok }` so the UI can react.
 *
 * When Turnstile is configured the write is routed through the `submit` Edge
 * Function, which verifies the bot-check token server-side and then inserts —
 * so the human-check is bound to the insert. Otherwise it falls back to a
 * direct (RLS-gated) anon insert. `token` is the Turnstile response token.
 */
export async function submitContact(
  input: ContactInput,
  token?: string
): Promise<SubmitResult> {
  // Honeypot tripped → a bot filled a field humans never see. Pretend success
  // so we don't reveal the trap, but never touch the database.
  if (input.company_website && input.company_website.trim() !== "") {
    return { ok: true };
  }

  if (!isSupabaseConfigured || !supabase) {
    // No backend configured (e.g. local dev) — don't hard-fail the UI.
    log.warn("Supabase not configured; submission was not saved.");
    return { ok: true };
  }

  if (isTurnstileConfigured()) {
    const { data, error } = await supabase.functions.invoke<{
      ok: boolean;
      error?: string;
    }>("submit", {
      body: {
        type: "contact",
        token,
        payload: {
          name: input.name.trim(),
          email: input.email.trim(),
          phone: input.phone?.trim() || null,
          service: input.service || null,
          budget: input.budget || null,
          message: input.message.trim(),
        },
      },
    });
    if (error) {
      log.error("submit via function failed", error);
      return { ok: false, error: "Something went wrong. Please try again." };
    }
    if (!data?.ok) {
      return { ok: false, error: data?.error ?? "Something went wrong. Please try again." };
    }
    return { ok: true };
  }

  const { error } = await supabase.from("contact_submissions").insert({
    name: input.name.trim(),
    email: input.email.trim(),
    phone: input.phone?.trim() || null,
    service: input.service || null,
    budget: input.budget || null,
    message: input.message.trim(),
  });

  if (error) {
    log.error("submit failed", error);
    // The DB throttle/validation trigger raises check_violation (SQLSTATE 23514)
    // with a message that's already safe to show the user.
    if (error.code === "23514") {
      return { ok: false, error: error.message };
    }
    return { ok: false, error: "Something went wrong. Please try again." };
  }

  return { ok: true };
}
