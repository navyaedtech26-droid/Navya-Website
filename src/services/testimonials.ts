/**
 * Testimonials. Reads published rows from Supabase and maps the stored icon
 * key (a string) back to a Lucide component. Falls back to the bundled static
 * list when Supabase is not configured or returns nothing.
 *
 * SECURITY INVARIANT: `quote` (and name/role/company) is visitor-authored —
 * anonymous visitors may INSERT testimonials, but only as unpublished drafts an
 * admin reviews (see the RLS policy in supabase/schema.sql). Consumers MUST
 * render these fields as plain text. Never pass a quote through the Markdown
 * renderer or dangerouslySetInnerHTML; the icon is a fixed key, not free HTML.
 */
import { Store, GraduationCap, Building2, ShoppingBag, Quote } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { supabase, isSupabaseConfigured } from "@/lib/supabase";
import { isTurnstileConfigured } from "@/lib/turnstile";
import { logger } from "@/lib/logger";
import {
  testimonials as staticTestimonials,
  type Testimonial,
} from "@/data/testimonials";

const log = logger.scope("testimonials");

/** Allowed icon keys stored in the DB → component. Extend as needed. */
const ICONS: Record<string, LucideIcon> = {
  Store,
  GraduationCap,
  Building2,
  ShoppingBag,
  Quote,
};

function iconFor(key: string | null): LucideIcon {
  return (key && ICONS[key]) || Quote;
}

/** Published testimonials, newest sort_order first. Always resolves. */
export async function getTestimonials(): Promise<Testimonial[]> {
  if (!isSupabaseConfigured || !supabase) return staticTestimonials;

  const { data, error } = await supabase
    .from("testimonials")
    .select("*")
    .eq("is_published", true)
    .is("deleted_at", null)
    .order("sort_order", { ascending: true });

  if (error) {
    log.error("fetch failed", error);
    return staticTestimonials;
  }
  if (!data || data.length === 0) return staticTestimonials;

  return data.map((row) => ({
    quote: row.quote,
    name: row.name,
    role: row.role ?? "",
    company: row.company ?? "",
    icon: iconFor(row.icon),
    rating: row.rating,
  }));
}

export interface TestimonialSubmission {
  quote: string;
  name: string;
  role?: string;
  company?: string;
  rating: number;
}

export interface SubmitTestimonialResult {
  ok: boolean;
  error?: string;
}

/**
 * Public testimonial submission. Inserted UNPUBLISHED (RLS only permits
 * `is_published = false`); an admin reviews and publishes it from the dashboard.
 *
 * When Turnstile is configured the write goes through the `submit` Edge Function
 * (verifies the bot-check token, then inserts as a draft). `token` is the
 * Turnstile response token. Otherwise it falls back to a direct anon insert.
 */
export async function submitTestimonial(
  input: TestimonialSubmission,
  token?: string
): Promise<SubmitTestimonialResult> {
  if (!input.quote.trim() || !input.name.trim()) {
    return { ok: false, error: "Please share a quote and your name." };
  }

  if (!isSupabaseConfigured || !supabase) {
    log.warn("Supabase not configured; submission not saved.");
    return { ok: true };
  }

  if (isTurnstileConfigured()) {
    const { data, error } = await supabase.functions.invoke<{
      ok: boolean;
      error?: string;
    }>("submit", {
      body: {
        type: "testimonial",
        token,
        payload: {
          quote: input.quote.trim(),
          name: input.name.trim(),
          role: input.role?.trim() || null,
          company: input.company?.trim() || null,
          rating: Math.min(5, Math.max(1, input.rating || 5)),
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

  const { error } = await supabase.from("testimonials").insert({
    quote: input.quote.trim(),
    name: input.name.trim(),
    role: input.role?.trim() || null,
    company: input.company?.trim() || null,
    rating: Math.min(5, Math.max(1, input.rating || 5)),
    is_published: false,
    sort_order: 0,
  });

  if (error) {
    log.error("submit failed", error);
    return { ok: false, error: "Something went wrong. Please try again." };
  }

  return { ok: true };
}
