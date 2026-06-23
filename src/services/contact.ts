/**
 * Contact form submissions. Anonymous visitors are allowed to INSERT only
 * (enforced by RLS in `supabase/schema.sql`).
 */
import { supabase, isSupabaseConfigured } from "@/lib/supabase";

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

/** Persist a contact message. Returns `{ ok }` so the UI can react. */
export async function submitContact(input: ContactInput): Promise<SubmitResult> {
  // Honeypot tripped → a bot filled a field humans never see. Pretend success
  // so we don't reveal the trap, but never touch the database.
  if (input.company_website && input.company_website.trim() !== "") {
    return { ok: true };
  }

  if (!isSupabaseConfigured || !supabase) {
    // No backend configured (e.g. local dev) — don't hard-fail the UI.
    console.warn("[contact] Supabase not configured; submission was not saved.");
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
    console.error("[contact] submit failed:", error.message);
    // The DB throttle/validation trigger raises check_violation (SQLSTATE 23514)
    // with a message that's already safe to show the user.
    if (error.code === "23514") {
      return { ok: false, error: error.message };
    }
    return { ok: false, error: "Something went wrong. Please try again." };
  }

  return { ok: true };
}
