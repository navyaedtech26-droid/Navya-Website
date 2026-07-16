import { Rocket, RefreshCw, Layers, Wallet, Users } from "lucide-react";
import type { ServicePage } from "@/types";

export const digitalTransformationServicePage: ServicePage = {
  slug: "digital-transformation",
  category: "solution",
  icon: Rocket,
  title: "Digital Transformation",
  highlight: "Modernize Without the Disruption",

  heroSubtitle:
    "Legacy systems don't fail all at once — they fail quietly, one manual workaround at a time, until the whole operation is held together by institutional memory. We modernize the core of the business without stopping it mid-operation.",

  heroImage: "/vectors1/digital transformation-clean.avif",

  seoDescription:
    "Digital transformation framed as a business decision: the cost of fragmented legacy systems, the impact of a unified digital operation, the workflow, timeline, technology, and a real client outcome from Navya EdTech.",

  seoKeywords: [
    "digital transformation services",
    "legacy system modernization Nepal",
    "business process digitization",
    "enterprise digital transformation",
    "unify fragmented business operations",
    "digital transformation strategy",
    "technology modernization roadmap",
  ],

  overview: {
    whatIsIt:
      "A structured modernization of the systems and processes your operations actually run on — replacing fragmented tools with one coherent digital layer.",
    whoNeedsIt:
      "Established businesses whose operations have grown faster than their systems, leaving departments running on disconnected spreadsheets, legacy software, and manual handoffs.",
    businessValue:
      "Converts scattered, aging operational tooling into a unified system that reduces manual work, cuts licensing waste, and gives leadership one accurate picture of the business.",
    benefits: [
      "One unified system replacing years of accumulated point solutions",
      "Reduced dependency on manual processes and institutional memory",
      "A phased modernization path with no disruptive all-at-once cutover",
      "Leadership visibility into operations that were previously siloed",
    ],
  },

  businessProblem: {
    title: "Why Are Legacy Operations",
    highlight: "Quietly Capping What's Possible?",
    intro:
      "Most businesses don't decide to run on fragmented systems — it happens gradually, one urgent fix at a time, until modernizing feels too risky to attempt.",
    painPoints: [
      {
        title: "Every department runs its own disconnected system",
        description:
          "Finance, operations, and sales each rely on separate tools that were never designed to share data, forcing manual reconciliation for even simple cross-team questions.",
      },
      {
        title: "Institutional memory is doing the job software should",
        description:
          "Critical processes work only because one or two long-tenured staff know the workarounds — a single departure away from a serious operational gap.",
      },
      {
        title: "Leadership can't get a single accurate picture",
        description:
          "Reporting means pulling numbers from five different systems and reconciling them by hand, so decisions are made on data that's already a week stale.",
      },
      {
        title: "Legacy software is a growing security and support risk",
        description:
          "Systems built years ago on outdated technology become harder to secure, patch, or find support for — quietly increasing risk with each year they remain unaddressed.",
      },
      {
        title: "Modernization feels too risky to start",
        description:
          "The fear of a disruptive, all-at-once replacement keeps businesses running on aging systems long after the case for change is obvious.",
      },
      {
        title: "Competitors are moving faster on less friction",
        description:
          "A leaner, more digitized competitor can respond to market changes in days, while fragmented systems keep your business reacting in weeks.",
      },
    ],
  },

  businessImpact: {
    title: "What a Structured Transformation",
    highlight: "Actually Changes?",
    intro:
      "Digital transformation done in phases changes how the business runs day to day — not just the technology underneath it.",
    points: [
      {
        icon: Layers,
        title: "Departments finally share one source of truth",
        description:
          "A unified system replaces the reconciliation work between disconnected tools, so every team is working from the same accurate data.",
      },
      {
        icon: Users,
        title: "Operations stop depending on any one person",
        description:
          "Processes get encoded into the system itself, so institutional knowledge becomes documented workflow instead of a risk tied to one employee.",
      },
      {
        icon: Wallet,
        title: "Licensing and maintenance costs consolidate",
        description:
          "Replacing a patchwork of point solutions with a unified platform typically reduces the total software spend, not just the operational friction.",
      },
      {
        icon: RefreshCw,
        title: "Leadership gets real-time visibility",
        description:
          "Dashboards pulling from one unified system replace the manual, stale reporting that used to take days to assemble.",
      },
    ],
  },

  roi: {
    title: "Where Does the Return",
    highlight: "Actually Come From?",
    intro:
      "Transformation's return shows up in reduced manual reconciliation hours, consolidated software spend, and decisions made on current data instead of week-old numbers.",
    points: [
      "Fewer reconciliation hours — a unified data layer removes the manual cross-checking that fragmented systems currently require.",
      "Lower total software cost — consolidating point solutions into one platform typically reduces combined licensing spend.",
      "Reduced key-person risk — documented, system-encoded processes stop depending on any single employee's institutional knowledge.",
      "Faster, more confident decisions — real-time dashboards replace reporting that used to take days to manually assemble.",
      "Lower long-term security risk — retiring unsupported legacy software removes a growing and often invisible liability.",
    ],
  },

  workflow: [
    {
      step: "01",
      title: "Operational & Systems Audit",
      description:
        "We map every system currently in use, how data moves between them, and where the manual gaps actually are.",
    },
    {
      step: "02",
      title: "Phased Transformation Roadmap",
      description:
        "We design a staged modernization plan that prioritizes the highest-friction gaps first, so value shows up early, not only at the end.",
    },
    {
      step: "03",
      title: "System Consolidation & Build",
      description:
        "We build or integrate the unified systems needed, migrating data carefully at each phase rather than in one high-risk cutover.",
    },
    {
      step: "04",
      title: "Change Management & Training",
      description:
        "We support your team through the transition with training and documentation, since a modernization only works if people actually adopt it.",
    },
    {
      step: "05",
      title: "Continuous Optimization",
      description:
        "After each phase, we review real usage and refine the system, treating transformation as an ongoing process rather than a single project.",
    },
  ],

  implementation: {
    title: "What Actually Happens",
    highlight: "During the Transformation",
    intro:
      "No black box. Here's what you're involved in, and what a phased modernization actually looks like.",
    deliverables: [
      "A documented map of current systems, data flows, and manual gaps before any change is proposed",
      "A phased roadmap that prioritizes the highest-impact gaps first",
      "Staged data migration with validation at every step, not a single risky cutover",
      "Change management support and staff training for each phase",
      "Unified reporting dashboards built on consolidated data",
      "A documented, extensible system your team owns going forward",
    ],
  },

  timeline: [
    {
      phase: "Audit & Roadmap",
      duration: "2–3 weeks",
      description: "Full systems audit and a prioritized, phased transformation plan.",
    },
    {
      phase: "Phase One Build",
      duration: "4–8 weeks",
      description: "The highest-impact system consolidation, built and rolled out first.",
    },
    {
      phase: "Subsequent Phases",
      duration: "Ongoing",
      description: "Additional phases executed on the agreed roadmap timeline.",
    },
    {
      phase: "Optimization",
      duration: "Ongoing",
      description: "Continuous review and refinement based on real usage data.",
    },
  ],

  technology: [
    { category: "Integration", items: ["API-based system integration", "Data migration tooling", "Middleware & sync layers"] },
    { category: "Core Systems", items: ["Custom ERP/CRM platforms", "Unified reporting dashboards"] },
    { category: "Infrastructure", items: ["Cloud hosting", "Automated backups", "Role-based access control"] },
  ],

  caseStudy: {
    illustrative: true,
    client: "A multi-branch distribution business",
    industry: "Distribution & Wholesale",
    challenge:
      "Each branch tracked inventory and sales in its own spreadsheet, with head office reconciling numbers manually every month and no real-time view of stock across locations.",
    approach:
      "We ran a phased transformation — starting with a unified inventory system across branches, then layering in centralized sales reporting and finance integration.",
    outcome:
      "Head office now has real-time visibility across every branch, monthly manual reconciliation has been eliminated, and each phase shipped without disrupting daily branch operations.",
  },

  faqs: [
    {
      question: "Will this disrupt our day-to-day operations?",
      answer:
        "We deliberately phase the rollout so each stage is validated before the next begins — the goal is modernization without a disruptive all-at-once cutover.",
    },
    {
      question: "Where should we start if we have multiple fragmented systems?",
      answer:
        "The audit phase identifies which gap is costing you the most right now, and we start there — not with whichever system happens to be easiest to replace.",
    },
    {
      question: "What happens to our existing data during migration?",
      answer:
        "Data is migrated in stages with validation at each step, so historical records carry over accurately rather than being lost or corrupted in a rushed cutover.",
    },
    {
      question: "How do we get staff to actually adopt the new systems?",
      answer:
        "Each phase includes change management support and training, because a technically sound system that nobody uses correctly delivers no return.",
    },
    {
      question: "Is this a one-time project or an ongoing relationship?",
      answer:
        "Most engagements start with a defined roadmap but continue as an ongoing optimization relationship, since operations keep evolving after the initial transformation.",
    },
  ],

  cta: {
    title: "Ready to Modernize Without Stopping the Business?",
    subtitle:
      "Tell us where your systems feel most fragmented. We'll show you exactly what a phased transformation would prioritize first.",
    buttonLabel: "Book a Strategy Call",
  },

  relatedServices: ["custom-software-development", "it-consulting", "cloud-services"],
  relatedSolutions: ["erp-systems", "cloud-devops", "business-intelligence-analytics"],
  relatedIndustries: ["manufacturing", "hospitals", "schools", "ngos"],
};
