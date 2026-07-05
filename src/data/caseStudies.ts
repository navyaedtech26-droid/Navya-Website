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
  /**
   * Optional link — an internal path (e.g. "/industries/retail") for
   * cross-linking to a relevant landing page, or an external URL to a full
   * write-up. Omit for a presentational card. Only set an industry-page link
   * when the client's sector genuinely matches one of the ten dedicated
   * `/industries/*` pages; otherwise point at the general `/services` page
   * rather than guessing a vertical that isn't a real match.
   */
  href?: string;
}

export const caseStudies: CaseStudy[] = [
  {
    icon: ShoppingBag,
    client: "Kabita Shooting And Online Store",
    category: "ERP & Website",
    industry: "Retail & E-Commerce",
    summary:
      "A unified online store and custom ERP that put orders, inventory, and billing on one dashboard — replacing manual work with a single source of truth.",
    metrics: [
      { value: "ERP", label: "Built end to end" },
      { value: "Online Store", label: "Designed & launched" },
      { value: "Unified", label: "Orders & inventory" },
    ],
    tags: ["ERP", "Website", "Online Store", "Inventory"],
    accent: "blue",
    href: "/industries/retail",
  },
  {
    icon: Radar,
    client: "Yasyasvi",
    category: "Custom ERP",
    industry: "Operations & Tracking",
    summary:
      "A tailored ERP with built-in tracking that gave the team real-time visibility across daily operations — turning guesswork into confident decisions.",
    metrics: [
      { value: "Custom", label: "ERP tailored to them" },
      { value: "Tracking", label: "Built-in & real-time" },
      { value: "One system", label: "For operations" },
    ],
    tags: ["Custom ERP", "Tracking", "Dashboard", "Automation"],
    accent: "cyan",
    href: "/services",
  },
  {
    icon: Megaphone,
    client: "Aligans Cricket",
    category: "Social Media",
    industry: "Sports & Cricket",
    summary:
      "A bold, consistent social presence that grew engagement and kept fans connected across every platform.",
    metrics: [
      { value: "Content", label: "Posts & creatives" },
      { value: "On-brand", label: "Consistent identity" },
      { value: "Engagement", label: "Built for reach" },
    ],
    tags: ["Social Media", "Content", "Design", "Branding"],
    accent: "violet",
    href: "/services",
  },
];
