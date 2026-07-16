import { Code2, ShieldCheck, Gauge, Layers, PlugZap } from "lucide-react";
import type { ServicePage } from "@/types";

export const customSoftwareDevelopmentServicePage: ServicePage = {
  slug: "custom-software-development",
  category: "service",
  icon: Code2,
  title: "Custom Software Development",
  highlight: "Built Around Your Workflow",

  heroSubtitle:
    "Off-the-shelf software makes you adapt your business to its limits. We build the reverse — software shaped exactly around how your team actually works, so the tool disappears and the work just moves faster.",

  heroImage: "/vector/custom-software-development.avif",

  seoDescription:
    "Custom software built around your actual workflow, replacing generic tools and manual workarounds with one system your team owns outright.",

  seoKeywords: [
    "custom software development",
    "enterprise software development Nepal",
    "bespoke business software",
    "legacy system modernization",
    "workflow automation software",
    "custom ERP and CRM development",
    "API integration services",
  ],

  overview: {
    whatIsIt:
      "Software engineered from your actual processes and constraints — not configured from a template that assumes a generic business.",
    whoNeedsIt:
      "Businesses whose growth is capped by manual workarounds, spreadsheet chains, or off-the-shelf tools that almost fit but never quite do.",
    businessValue:
      "Turns the workflow your team already runs into a system that runs it faster, with fewer errors, and without a recurring per-seat license bill.",
    benefits: [
      "Software shaped to your process, not the other way around",
      "One owned system instead of five stitched-together tools",
      "No per-seat license costs that scale against you as you grow",
      "A durable asset that adds to your company's valuation",
    ],
  },

  businessProblem: {
    title: "Why Is Generic Software",
    highlight: "Quietly Taxing Your Operations?",
    intro:
      "Most businesses don't notice the cost of an ill-fitting tool — it shows up as small workarounds, repeated across every team, every day, for years.",
    painPoints: [
      {
        title: "Your team builds workarounds for gaps in the tool",
        description:
          "A spreadsheet bridges what the software can't do, a shared doc tracks what the CRM doesn't capture — and each patch becomes one more thing that can break silently.",
      },
      {
        title: "You're paying per seat for features you don't use",
        description:
          "Generic platforms bundle dozens of modules built for a different business than yours, and the license cost climbs with headcount regardless of what you actually touch.",
      },
      {
        title: "Data lives in five places that don't talk to each other",
        description:
          "Orders in one system, inventory in another, customer records in a third — so a simple question means manually reconciling three exports before anyone gets an answer.",
      },
      {
        title: "Every process change means a support ticket",
        description:
          "A vendor's roadmap decides what your software can do next, not your business — so an urgent operational change waits in a queue you don't control.",
      },
      {
        title: "The tool doesn't scale the way your business does",
        description:
          "What worked at ten staff starts to buckle at fifty — approval chains, reporting, and permissions were never designed for your current scale.",
      },
      {
        title: "You own nothing at the end of it",
        description:
          "Years of subscription payments leave you with no asset — cancel the plan and the operational muscle memory it encoded disappears with it.",
      },
    ],
  },

  businessImpact: {
    title: "What Purpose-Built Software",
    highlight: "Actually Changes?",
    intro:
      "A system built around your real process removes friction at the exact points your team feels it daily — not the points a vendor's roadmap prioritized.",
    points: [
      {
        icon: Gauge,
        title: "Work moves at the speed of the process, not the tool",
        description:
          "Screens and workflows match how your team actually operates, so tasks that took workarounds now happen in the software directly — faster, with fewer handoffs.",
      },
      {
        icon: Layers,
        title: "One system replaces a stack of disconnected tools",
        description:
          "Data that used to live in five spreadsheets and three logins now lives in one place, so every report and every answer comes from a single source of truth.",
      },
      {
        icon: PlugZap,
        title: "It plugs into what you already run",
        description:
          "Payment gateways, accounting software, and existing databases connect through clean APIs, so the new system extends your operations instead of replacing them wholesale.",
      },
      {
        icon: ShieldCheck,
        title: "You control the roadmap, not a vendor",
        description:
          "Every future change — a new approval rule, a new report, a new integration — is a conversation with your own engineering partner, not a feature request in a public queue.",
      },
    ],
  },

  roi: {
    title: "Where Does the Return",
    highlight: "Actually Come From?",
    intro:
      "The return on custom software shows up in hours reclaimed and licenses no longer paid — both measurable against your current baseline.",
    points: [
      "Lower long-term cost than compounding SaaS subscriptions — you pay once to build the asset instead of forever to rent a partial fit.",
      "Fewer manual reconciliation hours — one system means data is entered once and trusted everywhere, instead of re-typed across disconnected tools.",
      "Faster process changes — an operational fix ships in days through your own engineering partner, not months through a vendor's backlog.",
      "Reduced error rates — validation and business rules are built into the workflow itself, catching mistakes before they become costly.",
      "An asset that compounds — the system gets more valuable as it's extended, unlike a subscription that resets to zero the moment you cancel it.",
    ],
  },

  workflow: [
    {
      step: "01",
      title: "Process & Systems Audit",
      description:
        "We map exactly how your team works today — the tools, the workarounds, the handoffs — before proposing a single screen.",
    },
    {
      step: "02",
      title: "Architecture & Scope Definition",
      description:
        "We define the system's structure, data model, and integrations, scoped against your real constraints, not a generic feature list.",
    },
    {
      step: "03",
      title: "Iterative Design & Build",
      description:
        "We build in reviewable sprints, with working software you can click through and correct at every stage — not a single reveal at the end.",
    },
    {
      step: "04",
      title: "Integration & Data Migration",
      description:
        "Existing records and third-party tools are connected and migrated carefully, so day one runs on real data, not an empty system.",
    },
    {
      step: "05",
      title: "Launch, Training & Support",
      description:
        "We train your team, monitor the first weeks of real usage closely, and stay on to extend the system as your process evolves.",
    },
  ],

  implementation: {
    title: "What Actually Happens",
    highlight: "During the Build",
    intro:
      "No black box. Here's what you're involved in, and what you walk away owning.",
    deliverables: [
      "A documented process map before any code is written, so scope is agreed, not assumed",
      "A working staging environment you can test against at every milestone",
      "Source code and infrastructure you own outright, with no vendor lock-in",
      "Role-based access control scoped to how your team is actually structured",
      "API documentation for every integration point, for your team or ours to extend later",
      "A handover package — documentation, admin training, and a support plan for what comes next",
    ],
  },

  timeline: [
    {
      phase: "Discovery & Architecture",
      duration: "1–2 weeks",
      description: "Process audit, data modeling, and a scoped technical plan.",
    },
    {
      phase: "Core Build",
      duration: "4–10 weeks",
      description: "The primary system, built and reviewed in shippable increments.",
    },
    {
      phase: "Integration & Migration",
      duration: "1–3 weeks",
      description: "Connecting existing tools and moving historical data in safely.",
    },
    {
      phase: "UAT & Launch",
      duration: "1–2 weeks",
      description: "Structured testing against real scenarios, staff training, and go-live.",
    },
  ],

  technology: [
    { category: "Backend", items: ["Node.js", "PHP", "Python", "PostgreSQL", "MySQL"] },
    { category: "Frontend", items: ["React", "TypeScript", "Tailwind CSS"] },
    { category: "Integration", items: ["REST & webhook APIs", "Payment gateways", "Accounting software sync"] },
    { category: "Infrastructure", items: ["Cloud hosting", "Automated backups", "Role-based access control"] },
  ],

  caseStudy: {
    illustrative: true,
    client: "A regional logistics operator",
    industry: "Logistics & Distribution",
    challenge:
      "Dispatch, driver assignments, and delivery confirmations were coordinated across phone calls and a shared spreadsheet, with no record either side could trust in a dispute.",
    approach:
      "We built a dispatch management system tailored to their exact routing rules, with a driver mobile view for real-time delivery confirmation.",
    outcome:
      "Dispatch decisions and delivery records now live in one auditable system, replacing phone-call coordination with a process the whole team can see and trust.",
  },

  faqs: [
    {
      question: "How is this different from just configuring an off-the-shelf platform?",
      answer:
        "Configuration bends your process to fit the platform's existing structure. Custom development starts from your process and builds the software to match it exactly — no compromises baked in from day one.",
    },
    {
      question: "What if our requirements aren't fully defined yet?",
      answer:
        "That's normal, and what the process audit is for. Most engagements start from a rough pain point — we turn it into a scoped, documented plan before development begins.",
    },
    {
      question: "Do we own the code and infrastructure after launch?",
      answer:
        "Yes, entirely. There's no licensing arrangement or vendor lock-in — the system and its source code are yours outright.",
    },
    {
      question: "Can you integrate with the tools we already use?",
      answer:
        "In most cases, yes. We connect to existing accounting software, payment gateways, and databases through their APIs so the new system extends your stack rather than replacing it wholesale.",
    },
    {
      question: "What happens after launch if our process changes?",
      answer:
        "We scope ongoing support and enhancement work as your business evolves — since you own the system, any partner (including us) can extend it as needed.",
    },
  ],

  cta: {
    title: "Ready to Stop Adapting Your Business to Someone Else's Software?",
    subtitle:
      "Tell us where the workarounds are. We'll show you exactly what a system built around your process would remove.",
    buttonLabel: "Book a Strategy Call",
  },

  relatedServices: ["dedicated-developers", "it-consulting", "cloud-services"],
  relatedSolutions: ["erp-systems", "crm-systems", "digital-transformation"],
  relatedIndustries: ["manufacturing", "hospitals", "schools"],
};
