import type { LucideIcon } from "lucide-react";
import {
  Stethoscope,
  GraduationCap,
  Landmark,
  Store,
  Home,
  Factory,
  Building2,
  Plane,
  UtensilsCrossed,
  HeartHandshake,
} from "lucide-react";

export interface Industry {
  icon: LucideIcon;
  title: string;
  description: string;
  solutions: string[];
  /** Accent colour for the industry's icon badge (hex). */
  color: string;
  /** Slug of the dedicated /industries/:slug deep-dive page. */
  slug: string;
  image?: string;
}

export const industries: Industry[] = [
  {
    icon: Stethoscope,
    title: "Healthcare",
    description: "Secure, compliant systems that streamline patient care and hospital operations.",
    solutions: ["Electronic Health Records (EHR)", "Telemedicine Platforms", "Hospital Management Systems"],
    color: "#2DD4BF",
    slug: "hospitals",
    image: "/industries section/healthcare.avif",
  },
  {
    icon: GraduationCap,
    title: "Education",
    description: "Scalable learning platforms that connect administrators, educators, and students.",
    solutions: ["Learning Management Systems (LMS)", "Student Information Systems", "Virtual Classrooms"],
    color: "#6366F1",
    slug: "schools",
    image: "/industries section/education.avif",
  },
  {
    icon: Landmark,
    title: "Colleges & Universities",
    description: "Enrollment, scheduling, and student-record systems built for institutional scale.",
    solutions: ["Student Information Systems (SIS)", "Course & Faculty Scheduling", "Admissions & Recruitment Platforms"],
    color: "#3B82F6",
    slug: "colleges",
    image: "/industries section/colleges-and-universities.avif",
  },
  {
    icon: Store,
    title: "Retail",
    description: "Omnichannel retail systems that unify inventory, sales, and customer data.",
    solutions: ["Point of Sale (POS) Systems", "Inventory Management", "Customer Loyalty Programs"],
    color: "#F5A623",
    slug: "retail",
    image: "/industries section/retail.avif",
  },
  {
    icon: Home,
    title: "Real Estate",
    description: "Digital tools to manage properties, capture leads, and close deals faster.",
    solutions: ["Real Estate CRM", "Property Management Systems", "Virtual Tour Platforms"],
    color: "#A78BFA",
    slug: "real-estate",
    image: "/industries section/real estate.avif",
  },
  {
    icon: Factory,
    title: "Manufacturing",
    description: "Data-driven systems to optimize production lines and supply chain visibility.",
    solutions: ["Enterprise Resource Planning (ERP)", "Supply Chain Management", "IoT Monitoring"],
    color: "#F59E0B",
    slug: "manufacturing",
    image: "/industries section/manufacturing.avif",
  },
  {
    icon: Building2,
    title: "Hotels & Resorts",
    description: "Direct-booking engines and guest systems that keep more of every stay's value.",
    solutions: ["Direct Booking Engines", "Property Management Systems (PMS)", "Guest CRM & Loyalty Programs"],
    color: "#10B981",
    slug: "hotels",
    image: "/industries section/hotela and resorts.avif",
  },
  {
    icon: Plane,
    title: "Travel",
    description: "Booking and itinerary platforms designed to elevate the traveler experience.",
    solutions: ["Booking Engines", "Travel Agency CRM", "Itinerary Management"],
    color: "#F472B6",
    slug: "travel-agencies",
    image: "/industries section/travel.avif",
  },
  {
    icon: UtensilsCrossed,
    title: "Restaurants & Cafes",
    description: "Ordering and reservation systems that protect margin from commission-heavy apps.",
    solutions: ["Online Ordering Systems", "Table Reservation Platforms", "Kitchen & Inventory Management"],
    color: "#EC4899",
    slug: "restaurants",
    image: "/industries section/cafe and restaurants.avif",
  },
  {
    icon: HeartHandshake,
    title: "NGOs & Nonprofits",
    description: "Donor, program, and reporting systems that prove impact without added overhead.",
    solutions: ["Donor Management (CRM)", "Program & Grant Tracking", "Impact Reporting Dashboards"],
    color: "#64748B",
    slug: "ngos",
    image: "/industries section/ngo.avif",
  },
];
