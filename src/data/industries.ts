import type { LucideIcon } from "lucide-react";
import {
  ShoppingBag,
  GraduationCap,
  HeartPulse,
  UtensilsCrossed,
  Building2,
  Truck,
  Landmark,
  Plane,
} from "lucide-react";

export interface Industry {
  icon: LucideIcon;
  title: string;
  description: string;
}

export const industries: Industry[] = [
  {
    icon: ShoppingBag,
    title: "Retail & E-Commerce",
    description: "Storefronts, carts, and inventory built to sell around the clock.",
  },
  {
    icon: GraduationCap,
    title: "Education & EdTech",
    description: "Learning platforms and portals that scale with every new cohort.",
  },
  {
    icon: HeartPulse,
    title: "Healthcare & Clinics",
    description: "Secure booking, records, and patient systems you can rely on.",
  },
  {
    icon: UtensilsCrossed,
    title: "Food & Hospitality",
    description: "Ordering, reservations, and menus that delight guests online.",
  },
  {
    icon: Building2,
    title: "Real Estate",
    description: "Listings, CRM, and lead funnels that turn browsers into buyers.",
  },
  {
    icon: Truck,
    title: "Logistics & Supply",
    description: "Tracking, dispatch, and inventory dashboards in real time.",
  },
  {
    icon: Landmark,
    title: "Finance & Fintech",
    description: "Billing, reporting, and compliant platforms built on trust.",
  },
  {
    icon: Plane,
    title: "Travel & Tourism",
    description: "Booking engines and experiences that convert wanderlust to sales.",
  },
];
