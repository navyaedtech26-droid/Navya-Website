/**
 * Newsletter sign-ups. Anonymous visitors may INSERT only (enforced by RLS in
 * `supabase/schema.sql`). Admin management lives in `services/admin.ts`.
 */
import { supabase, isSupabaseConfigured } from "@/lib/supabase";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export interface SubscribeResult {
  ok: boolean;
  error?: string;
}

/** Subscribe an email. A duplicate is treated as success (already on the list). */
export async function subscribeNewsletter(
  email: string,
  source = "footer"
): Promise<SubscribeResult> {
  const trimmed = email.trim();
  if (!EMAIL_RE.test(trimmed)) {
    return { ok: false, error: "Please enter a valid email address." };
  }

  if (!isSupabaseConfigured || !supabase) {
    console.warn("[newsletter] Supabase not configured; subscription not saved.");
    return { ok: true };
  }

  const { error } = await supabase
    .from("newsletter_subscribers")
    .insert({ email: trimmed.toLowerCase(), source });

  if (error) {
    // Unique violation → already subscribed; no need to alarm the user.
    if (error.code === "23505") return { ok: true };
    console.error("[newsletter] subscribe failed:", error.message);
    return { ok: false, error: "Something went wrong. Please try again." };
  }

  return { ok: true };
}
