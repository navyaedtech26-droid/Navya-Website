import type { LucideIcon } from "lucide-react";
import {
  School,
  GraduationCap,
  Stethoscope,
  Factory,
  Hotel,
  UtensilsCrossed,
  Store,
  HeartHandshake,
  Home,
  Plane,
} from "lucide-react";

export interface Industry {
  icon: LucideIcon;
  title: string;
  description: string;
  /** Accent colour for the industry's icon badge (hex). */
  color: string;
  /** Slug of the dedicated /industries/:slug deep-dive page. */
  slug: string;
}

export const industries: Industry[] = [
  {
    icon: School,
    title: "Schools",
    description: "Admissions, attendance, fees, and parent communication on one platform.",
    color: "#38BDF8",
    slug: "schools",
  },
  {
    icon: GraduationCap,
    title: "Colleges & Universities",
    description: "Enrollment, scheduling, and records systems that scale with every program.",
    color: "#6366F1",
    slug: "colleges",
  },
  {
    icon: Stethoscope,
    title: "Hospitals & Clinics",
    description: "Booking, records, and billing systems that give staff time back for patients.",
    color: "#2DD4BF",
    slug: "hospitals",
  },
  {
    icon: Factory,
    title: "Manufacturing",
    description: "Real-time inventory and production visibility that cuts waste and stockouts.",
    color: "#F59E0B",
    slug: "manufacturing",
  },
  {
    icon: Hotel,
    title: "Hotels & Resorts",
    description: "Direct booking engines that keep more margin out of OTA commission.",
    color: "#FB7185",
    slug: "hotels",
  },
  {
    icon: UtensilsCrossed,
    title: "Restaurants & Cafes",
    description: "Online ordering and reservations that fill tables and grow order value.",
    color: "#FB923C",
    slug: "restaurants",
  },
  {
    icon: Store,
    title: "Retail",
    description: "Unified inventory and storefronts that keep every sales channel in sync.",
    color: "#F5A623",
    slug: "retail",
  },
  {
    icon: HeartHandshake,
    title: "NGOs & Nonprofits",
    description: "Donor, program, and reporting systems built for lean, mission-driven teams.",
    color: "#34D399",
    slug: "ngos",
  },
  {
    icon: Home,
    title: "Real Estate",
    description: "Listings, CRM, and lead funnels that convert browsers into buyers.",
    color: "#A78BFA",
    slug: "real-estate",
  },
  {
    icon: Plane,
    title: "Travel Agencies",
    description: "Booking engines and itinerary systems that convert research into trips.",
    color: "#F472B6",
    slug: "travel-agencies",
  },
];
