/**
 * Testimonials. Reads published rows from Supabase and maps the stored icon
 * key (a string) back to a Lucide component. Falls back to the bundled static
 * list when Supabase is not configured or returns nothing.
 */
import { Store, GraduationCap, Building2, ShoppingBag, Quote } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { supabase, isSupabaseConfigured } from "@/lib/supabase";
import { testimonials as staticTestimonials, type Testimonial } from "@/data/testimonials";

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
    .order("sort_order", { ascending: true });

  if (error) {
    console.error("[testimonials] fetch failed:", error.message);
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
 */
export async function submitTestimonial(
  input: TestimonialSubmission
): Promise<SubmitTestimonialResult> {
  if (!input.quote.trim() || !input.name.trim()) {
    return { ok: false, error: "Please share a quote and your name." };
  }

  if (!isSupabaseConfigured || !supabase) {
    console.warn("[testimonials] Supabase not configured; submission not saved.");
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
    console.error("[testimonials] submit failed:", error.message);
    return { ok: false, error: "Something went wrong. Please try again." };
  }

  return { ok: true };
}
