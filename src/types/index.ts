import type { LucideIcon } from "lucide-react";

export interface NavLink {
  label: string;
  href?: string;
  children?: {
    label: string;
    href: string;
    description?: string;
  }[];
}

export interface ServiceItem {
  icon: LucideIcon;
  title: string;
  description: string;
  tags?: string[];
}

export interface ServiceCategory {
  id: string;
  icon: LucideIcon;
  title: string;
  subtitle: string;
  description: string;
  items: string[];
}

export interface FeatureItem {
  icon: LucideIcon;
  title: string;
  description: string;
}

export interface StatItem {
  value: number;
  suffix: string;
  label: string;
}

export interface ValueItem {
  icon: LucideIcon;
  title: string;
  description: string;
}

/**
 * Structured content for a dedicated per-service deep-dive page
 * (e.g. /services/websites) — problem/impact/ROI/workflow/implementation/
 * timeline/technology/case study/FAQ/CTA, in that order.
 */
interface ServicePainPoint {
  title: string;
  description: string;
}

interface ServiceImpactPoint {
  icon: LucideIcon;
  title: string;
  description: string;
}

interface ServiceWorkflowStep {
  step: string;
  title: string;
  description: string;
}

interface ServiceTimelinePhase {
  phase: string;
  duration: string;
  description: string;
}

interface ServiceTechGroup {
  category: string;
  items: string[];
}

interface ServiceCaseStudy {
  /** True for an honest, unnamed representative engagement rather than a named client. */
  illustrative?: boolean;
  client: string;
  industry: string;
  challenge: string;
  approach: string;
  outcome: string;
}

export interface ServicePage {
  slug: string;
  /** "solution" pages live at /solutions/:slug and breadcrumb to "Solutions" instead of "Services". Defaults to "service". */
  category?: "service" | "solution";
  icon: LucideIcon;
  title: string;
  highlight: string;
  heroSubtitle: string;
  /** Optional path to a transparent-background illustration (public/vector) shown in the hero. */
  heroImage?: string;
  seoDescription: string;
  /** Terms this page is written to rank for — rendered as a meta keywords tag. */
  seoKeywords: string[];
  overview?: {
    whatIsIt: string;
    whoNeedsIt: string;
    businessValue: string;
    benefits: string[];
  };
  businessProblem: {
    title: string;
    highlight: string;
    intro: string;
    painPoints: ServicePainPoint[];
  };
  businessImpact: {
    title: string;
    highlight: string;
    intro: string;
    points: ServiceImpactPoint[];
  };
  roi: {
    title: string;
    highlight: string;
    intro: string;
    points: string[];
  };
  workflow: ServiceWorkflowStep[];
  implementation: {
    title: string;
    highlight: string;
    intro: string;
    deliverables: string[];
  };
  timeline: ServiceTimelinePhase[];
  technology: ServiceTechGroup[];
  caseStudy: ServiceCaseStudy;
  faqs: { question: string; answer: string }[];
  cta: {
    title: string;
    subtitle: string;
    buttonLabel: string;
  };
  /** Slugs of other /services/* pages to cross-link ("Related Services"). */
  relatedServices?: string[];
  /** Slugs of /solutions/* pages to cross-link ("Related Solutions"). */
  relatedSolutions?: string[];
  /** Slugs of /industries/* pages to cross-link ("Who This Is For"). */
  relatedIndustries?: string[];
}

/**
 * Structured content for a dedicated per-industry landing page
 * (e.g. /industries/schools) — challenges/solutions/ROI/features/case
 * study/FAQ/CTA, plus SEO keywords and internal-linking slugs.
 */
interface IndustryChallenge {
  title: string;
  description: string;
}

interface IndustrySolution {
  icon: LucideIcon;
  title: string;
  description: string;
}

interface IndustryFeature {
  icon: LucideIcon;
  title: string;
  description: string;
}

interface IndustryCaseStudy {
  /** True for an honest, unnamed representative engagement rather than a named client. */
  illustrative?: boolean;
  client: string;
  challenge: string;
  approach: string;
  outcome: string;
}

export interface IndustryPage {
  slug: string;
  icon: LucideIcon;
  /** Accent colour (hex) — matches the homepage Industries grid. */
  color: string;
  heroImage?: string;
  title: string;
  highlight: string;
  heroSubtitle: string;
  seoTitle: string;
  seoDescription: string;
  /** Terms this page is written to rank for — rendered as a meta keywords tag. */
  seoKeywords: string[];
  challenges: {
    title: string;
    highlight: string;
    intro: string;
    items: IndustryChallenge[];
  };
  solutions: {
    title: string;
    highlight: string;
    intro: string;
    items: IndustrySolution[];
  };
  roi: {
    title: string;
    highlight: string;
    intro: string;
    points: string[];
  };
  features: {
    title: string;
    highlight: string;
    intro: string;
    items: IndustryFeature[];
  };
  caseStudy: IndustryCaseStudy;
  faqs: { question: string; answer: string }[];
  cta: {
    title: string;
    subtitle: string;
    buttonLabel: string;
  };
  /** Slugs of other /industries/* pages to cross-link ("Related Industries"). */
  relatedIndustries: string[];
  /** Ids from serviceCategories (@/data/services) to cross-link into /services. */
  relatedServices: string[];
  /** Slugs of /solutions/* pages to cross-link ("Related Solutions"). */
  relatedSolutions?: string[];
}
