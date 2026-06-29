import type { LucideIcon } from "lucide-react";

export interface Testimonial {
  quote: string;
  name: string;
  role: string;
  company: string;
  icon: LucideIcon;
  rating: number;
}

/**
 * Real, attributable client testimonials are managed from the admin dashboard
 * (Testimonials → publish a submission). This list is intentionally empty so
 * the public site shows no fabricated reviews; the section invites visitors to
 * share their story until real testimonials are published.
 */
export const testimonials: Testimonial[] = [];
