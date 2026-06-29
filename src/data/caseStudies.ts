import type { LucideIcon } from "lucide-react";
import { ShoppingBag, Radar, Megaphone } from "lucide-react";

/**
 * Case studies shown on the home page ("Selected Work").
 *
 * These are real Navya EdTech clients. The card surfaces `client`, `category`,
 * `industry` and `summary`; `metrics` and `tags` are kept for future use (and to
 * keep the type stable) but are not rendered, so no figures are shown as fact.
 * Keep exactly THREE metrics per entry so the type stays satisfied.
 */
export interface CaseStudyMetric {
  /** Headline figure, e.g. "2.1s" or "+38%". */
  value: string;
  /** What the figure measures, kept short. */
  label: string;
}

export interface CaseStudy {
  icon: LucideIcon;
  /** Client or project name. */
  client: string;
  /** Short project type, shown as a chip on the cover. */
  category: string;
  /** Sector the client operates in. */
  industry: string;
  /** One-line description of the engagement. */
  summary: string;
  /** Exactly three headline outcomes. */
  metrics: [CaseStudyMetric, CaseStudyMetric, CaseStudyMetric];
  /** Tech / services delivered. */
  tags: string[];
  /** Cover gradient accent. */
  accent: "blue" | "cyan" | "violet";
  /** Optional link to a full write-up; omit for a presentational card. */
  href?: string;
}

export const caseStudies: CaseStudy[] = [
  {
    icon: ShoppingBag,
    client: "Kabita Shooting And Online Store",
    category: "ERP & Website",
    industry: "Retail & E-Commerce",
    summary:
      "A complete online store paired with a custom ERP — orders, inventory and billing all managed from one connected dashboard.",
    metrics: [
      { value: "ERP", label: "Built end to end" },
      { value: "Online Store", label: "Designed & launched" },
      { value: "Unified", label: "Orders & inventory" },
    ],
    tags: ["ERP", "Website", "Online Store", "Inventory"],
    accent: "blue",
  },
  {
    icon: Radar,
    client: "Yasyasvi",
    category: "Custom ERP",
    industry: "Operations & Tracking",
    summary:
      "A customized ERP with an integrated tracking system, giving the team real-time visibility across their day-to-day operations.",
    metrics: [
      { value: "Custom", label: "ERP tailored to them" },
      { value: "Tracking", label: "Built-in & real-time" },
      { value: "One system", label: "For operations" },
    ],
    tags: ["Custom ERP", "Tracking", "Dashboard", "Automation"],
    accent: "cyan",
  },
  {
    icon: Megaphone,
    client: "Aligans Cricket",
    category: "Social Media",
    industry: "Sports & Cricket",
    summary:
      "Social media posts and content that gave the team a bold, consistent presence and kept fans engaged across platforms.",
    metrics: [
      { value: "Content", label: "Posts & creatives" },
      { value: "On-brand", label: "Consistent identity" },
      { value: "Engagement", label: "Built for reach" },
    ],
    tags: ["Social Media", "Content", "Design", "Branding"],
    accent: "violet",
  },
];
