import type { LucideIcon } from "lucide-react";
import { Store, GraduationCap, Building2, ShoppingBag } from "lucide-react";

export interface Testimonial {
  quote: string;
  name: string;
  role: string;
  company: string;
  icon: LucideIcon;
  rating: number;
}

/**
 * TODO: Replace these with real, attributable client testimonials before
 * launch. Names and companies are kept Nepal-based to stay consistent with
 * the NPR pricing shown elsewhere on the site — avoid mixing regions, as
 * that reads as fabricated and hurts credibility.
 */
export const testimonials: Testimonial[] = [
  {
    quote:
      "Navya EdTech rebuilt our store from scratch. Page loads dropped to under a second and online orders climbed 60% in the first quarter. They understood our business before writing a single line of code.",
    name: "Aarav Shrestha",
    role: "Founder",
    company: "Kathmandu Cart",
    icon: ShoppingBag,
    rating: 5,
  },
  {
    quote:
      "The custom LMS they built handles thousands of learners without a hiccup. Clean dashboards, fast support, and a team that actually listens. Easily our best technology decision this year.",
    name: "Sneha Maharjan",
    role: "Director",
    company: "BrightMinds Academy",
    icon: GraduationCap,
    rating: 5,
  },
  {
    quote:
      "Their ERP rollout unified our finance, inventory, and HR into one place. What used to take days now takes minutes. The onboarding was smooth and the system simply works.",
    name: "Bibek Gurung",
    role: "Operations Head",
    company: "Himalayan Traders",
    icon: Building2,
    rating: 5,
  },
  {
    quote:
      "From the website to our social media reels, everything finally feels consistent and premium. Engagement is up, leads are up, and we look like a brand twice our size.",
    name: "Priya Thapa",
    role: "Marketing Lead",
    company: "Bloom & Co.",
    icon: Store,
    rating: 5,
  },
];
