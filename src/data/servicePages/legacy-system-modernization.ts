import { History, ShieldCheck, PlugZap, Users, Gauge } from "lucide-react";
import type { ServicePage } from "@/types";

export const legacySystemModernizationServicePage: ServicePage = {
  slug: "legacy-system-modernization",
  category: "solution",
  icon: History,
  title: "Legacy System Modernization",
  highlight: "Replace What's Holding You Back, Not What Works",

  heroSubtitle:
    "Your core systems still run the business, but they run on outdated technology nobody wants to touch: unsupported frameworks, disappearing vendor support, and one senior person who understands how it all fits together. We modernize legacy systems in place, without a risky rip-and-replace.",

  heroImage: "/vector/digital-transformation.avif",

  seoDescription:
    "Legacy system modernization that replaces outdated, unsupported software with a secure, maintainable platform, phased in without disrupting the operations that depend on it.",

  seoKeywords: [
    "legacy system modernization",
    "legacy system modernization Nepal",
    "legacy software replacement",
    "legacy application modernization services",
    "technical debt reduction",
    "outdated software migration",
    "legacy to cloud migration",
  ],

  overview: {
    whatIsIt:
      "A structured modernization of the specific legacy systems your business still depends on, replacing outdated, unsupported, or fragile technology with a secure, maintainable platform.",
    whoNeedsIt:
      "Businesses running critical operations on software that's years past vendor support, hard to secure, and understood by only one or two long-tenured staff.",
    businessValue:
      "Removes the compounding risk of unsupported technology (security exposure, vendor abandonment, key-person dependency) while preserving the business logic that already works.",
    benefits: [
      "A modern, secure platform replacing unsupported legacy technology",
      "Existing business logic and data preserved, not thrown out and rebuilt blind",
      "A phased migration path with no risky all-at-once cutover",
      "Reduced dependency on the one or two people who understand the old system",
    ],
  },

  businessProblem: {
    title: "Why Is Legacy Software",
    highlight: "A Growing Liability, Not a Stable Asset?",
    intro:
      "Legacy systems don't announce their risk. They keep running until a security incident, a vendor shutdown, or a key employee's departure forces the issue at the worst possible time.",
    painPoints: [
      {
        title: "The vendor stopped supporting it years ago",
        description:
          "No security patches, no bug fixes, no roadmap. The system keeps running on borrowed time, and every year that passes increases the exposure.",
      },
      {
        title: "Only one or two people actually understand it",
        description:
          "Critical logic lives in undocumented code and institutional memory, so a single departure risks breaking processes nobody else knows how to fix.",
      },
      {
        title: "It can't integrate with anything modern",
        description:
          "No APIs, no webhooks, just manual exports and re-entry. Every new tool your business wants to adopt gets blocked by a system that can't talk to it.",
      },
      {
        title: "Every workaround adds more risk",
        description:
          "Years of patches on top of patches have made the system more fragile with each change, until nobody is confident touching it without breaking something else.",
      },
      {
        title: "Hiring developers who'll maintain it is getting harder",
        description:
          "Fewer engineers know the old stack, and fewer still want to work in it, so support gets slower and more expensive every year you wait.",
      },
      {
        title: "The cost of doing nothing keeps climbing",
        description:
          "Security exposure, compliance risk, and the competitive gap against modern systems all compound quietly, until modernizing becomes urgent instead of planned.",
      },
    ],
  },

  businessImpact: {
    title: "What Modernizing the Core",
    highlight: "Actually Changes?",
    intro:
      "Done right, modernization doesn't just update the technology. It removes the specific risks that come with running critical operations on borrowed time.",
    points: [
      {
        icon: ShieldCheck,
        title: "Security and compliance risk drops immediately",
        description:
          "A patched, actively supported platform replaces software that stopped receiving security updates years ago, closing exposure that had been quietly compounding.",
      },
      {
        icon: PlugZap,
        title: "The system finally connects to modern tools",
        description:
          "API access opens integrations that were blocked for years, so new tools and automations plug in instead of requiring another manual workaround.",
      },
      {
        icon: Users,
        title: "Key-person risk disappears",
        description:
          "Documented, modern architecture means the system is understood by the team, not preserved in one person's memory a single departure away from a crisis.",
      },
      {
        icon: Gauge,
        title: "Performance and reliability improve measurably",
        description:
          "Modern infrastructure handles load the old system was never designed for, cutting the outages and slowdowns that used to mean constant firefighting.",
      },
    ],
  },

  roi: {
    title: "Where Does the Return",
    highlight: "Actually Come From?",
    intro:
      "Modernization's return shows up as risk avoided (a security incident, a vendor abandonment, a key-person loss) and as the new capability a modern platform unlocks.",
    points: [
      "Avoided security incident cost. Patched, supported infrastructure removes an exposure that unsupported software carries every day it keeps running.",
      "Lower maintenance and hiring cost. Modern, documented systems are cheaper to support and easier to staff than a legacy stack nobody wants to touch.",
      "New integrations become possible. API access opens the door to tools and automations the old system blocked outright.",
      "Reduced key-person risk. Documented, modern architecture stops critical operations depending on one person's memory.",
      "A platform that can actually grow with you. Legacy systems cap what's possible; a modernized one becomes a foundation instead of a ceiling.",
    ],
  },

  workflow: [
    {
      step: "01",
      title: "Legacy System Audit",
      description:
        "We map exactly what the system does, its data, dependencies, and the business logic actually buried inside it, before proposing a single change.",
    },
    {
      step: "02",
      title: "Risk & Priority Assessment",
      description:
        "We identify the highest-risk components (security exposure, vendor end-of-life, key-person dependency) and prioritize modernizing those first.",
    },
    {
      step: "03",
      title: "Phased Modernization Plan",
      description:
        "We design a staged migration that keeps the business running throughout, not a single high-risk cutover that bets everything on one weekend.",
    },
    {
      step: "04",
      title: "Build & Parallel Run",
      description:
        "We build the modernized components and run them alongside the legacy system, validating real-world behavior before anything is retired.",
    },
    {
      step: "05",
      title: "Cutover & Decommission",
      description:
        "Legacy components are retired only after their replacement is proven in production, so the transition never puts operations at risk.",
    },
  ],

  implementation: {
    title: "What Actually Happens",
    highlight: "During the Modernization",
    intro:
      "No black box. Here's what you're involved in, and what a phased legacy modernization actually looks like.",
    deliverables: [
      "A documented map of the legacy system's logic, data, and dependencies before any change is proposed",
      "A risk-prioritized modernization roadmap, highest exposure addressed first",
      "A parallel-run period where the old and new systems are validated side by side",
      "Migrated historical data with validation at every stage",
      "Full documentation, so the system is no longer understood by only one person",
      "A modern, supported platform your team owns and can extend going forward",
    ],
  },

  timeline: [
    {
      phase: "Audit & Risk Assessment",
      duration: "1–2 weeks",
      description: "Full legacy system audit and a risk-prioritized modernization plan.",
    },
    {
      phase: "Phase One Modernization",
      duration: "4–8 weeks",
      description: "The highest-risk component rebuilt and validated first.",
    },
    {
      phase: "Parallel Run & Validation",
      duration: "2–4 weeks",
      description: "Old and new systems run side by side until behavior is fully confirmed.",
    },
    {
      phase: "Cutover & Subsequent Phases",
      duration: "Ongoing",
      description: "Legacy components retired on the agreed roadmap, phase by phase.",
    },
  ],

  technology: [
    { category: "Migration", items: ["Legacy data extraction & migration", "API-first re-architecture", "Parallel-run validation tooling"] },
    { category: "Modern Stack", items: ["Node.js / PHP / Python backends", "React / TypeScript frontends", "PostgreSQL / MySQL"] },
    { category: "Infrastructure", items: ["Cloud hosting", "Automated backups", "Modern security & access control"] },
  ],

  caseStudy: {
    illustrative: true,
    client: "A regional hospital network",
    industry: "Healthcare",
    challenge:
      "Patient scheduling and billing ran on software last updated over a decade ago, understood by one retiring IT administrator, with no vendor support and no API access.",
    approach:
      "We audited the legacy system's full logic and data model, then modernized it in phases, running the new platform in parallel until every workflow was validated.",
    outcome:
      "The hospital now runs on a supported, documented platform with modern integrations, and no longer depends on a single person to keep patient scheduling running.",
  },

  faqs: [
    {
      question: "Do we have to replace the whole system at once?",
      answer:
        "No. We modernize in phases, starting with the highest-risk components, and run old and new side by side until each phase is validated before the next begins.",
    },
    {
      question: "Will our existing data and business logic be preserved?",
      answer:
        "Yes. The audit phase maps your system's actual logic and data before anything is rebuilt, so the transition carries over what already works instead of starting blind.",
    },
    {
      question: "What if the legacy system has no documentation at all?",
      answer:
        "That's the common starting point, not a blocker. The audit phase reverse-engineers and documents the system's real behavior before any modernization work begins.",
    },
    {
      question: "How do you avoid downtime during the migration?",
      answer:
        "New components run in parallel with the legacy system and are validated against real usage before cutover, so nothing goes live until it's proven.",
    },
    {
      question: "What happens to the legacy system after modernization?",
      answer:
        "It's decommissioned only after its replacement has been fully proven in production, not before, so there's never a point where critical operations are unsupported.",
    },
  ],

  cta: {
    title: "Ready to Stop Running Critical Operations on Borrowed Time?",
    subtitle:
      "Tell us which legacy system worries you most. We'll show you exactly what a phased modernization would prioritize first.",
    buttonLabel: "Book a Strategy Call",
  },

  relatedServices: ["custom-software-development", "it-consulting", "cloud-services"],
  relatedSolutions: ["digital-transformation", "erp-systems"],
  relatedIndustries: ["manufacturing", "hospitals", "retail"],
};
