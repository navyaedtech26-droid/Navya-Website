import type { LucideIcon } from "lucide-react";
import {
  Store,
  GraduationCap,
  Stethoscope,
  UtensilsCrossed,
  Home,
  Truck,
  Landmark,
  Plane,
} from "lucide-react";

export interface Industry {
  icon: LucideIcon;
  title: string;
  description: string;
  /** Accent colour for the industry's icon badge (hex). */
  color: string;
}

export const industries: Industry[] = [
  {
    icon: Store,
    title: "Retail & E-Commerce",
    description: "Storefronts, carts, and inventory built to sell around the clock.",
    color: "#F5A623",
  },
  {
    icon: GraduationCap,
    title: "Education & EdTech",
    description: "Learning platforms and portals that scale with every new cohort.",
    color: "#38BDF8",
  },
  {
    icon: Stethoscope,
    title: "Healthcare & Clinics",
    description: "Secure booking, records, and patient systems you can rely on.",
    color: "#2DD4BF",
  },
  {
    icon: UtensilsCrossed,
    title: "Food & Hospitality",
    description: "Ordering, reservations, and menus that delight guests online.",
    color: "#FB7185",
  },
  {
    icon: Home,
    title: "Real Estate",
    description: "Listings, CRM, and lead funnels that turn browsers into buyers.",
    color: "#A78BFA",
  },
  {
    icon: Truck,
    title: "Logistics & Supply",
    description: "Tracking, dispatch, and inventory dashboards in real time.",
    color: "#60A5FA",
  },
  {
    icon: Landmark,
    title: "Finance & Fintech",
    description: "Billing, reporting, and compliant platforms built on trust.",
    color: "#34D399",
  },
  {
    icon: Plane,
    title: "Travel & Tourism",
    description: "Booking engines and experiences that convert wanderlust to sales.",
    color: "#F472B6",
  },
];
