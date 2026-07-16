import type { LucideIcon } from "lucide-react";

export interface Testimonial {
  quote: string;
  name: string;
  role: string;
  company: string;
  icon?: LucideIcon;
  rating: number;
  photoUrl?: string;
  country?: string;
  projectDelivered?: string;
  hasVideoBadge?: boolean;
}

export const testimonials: Testimonial[] = [];
