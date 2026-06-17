import type { LucideIcon } from "lucide-react";
import { Rocket, Layers, Building2 } from "lucide-react";

export interface Plan {
  icon: LucideIcon;
  name: string;
  tagline: string;
  bestFor: string;
  features: string[];
  highlighted?: boolean;
}

export const plans: Plan[] = [
  {
    icon: Rocket,
    name: "Launch",
    tagline: "Get online, fast",
    bestFor: "Startups & small businesses",
    features: [
      "Responsive marketing website",
      "Up to 6 custom pages",
      "SEO-ready foundation",
      "Contact & lead forms",
      "Mobile-first design",
      "2 weeks of post-launch support",
    ],
  },
  {
    icon: Layers,
    name: "Growth",
    tagline: "Scale with confidence",
    bestFor: "Growing brands & teams",
    features: [
      "Everything in Launch",
      "Dynamic CMS & dashboards",
      "E-commerce or booking module",
      "Analytics & performance tuning",
      "Social media content kit",
      "Priority support & maintenance",
    ],
    highlighted: true,
  },
  {
    icon: Building2,
    name: "Enterprise",
    tagline: "Built for operations",
    bestFor: "Established companies",
    features: [
      "Custom system development",
      "ERP, CRM, LMS or BI platforms",
      "Role-based access & integrations",
      "Dedicated project manager",
      "Security & scalability review",
      "Ongoing growth partnership",
    ],
  },
];
