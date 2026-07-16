import { Users, Search, TrendingUp, Bell, Layers } from "lucide-react";
import type { ServicePage } from "@/types";

export const crmSystemsServicePage: ServicePage = {
  slug: "crm-systems",
  category: "solution",
  icon: Users,
  title: "CRM Systems",
  highlight: "One Source of Truth for Every Lead",

  heroSubtitle:
    "A lead that isn't tracked is a lead that quietly disappears — split across someone's inbox, a spreadsheet, and their memory of a phone call. We build CRM systems that make sure no opportunity slips through the cracks again.",

  heroImage: "/vectors1/crm-clean.avif",

  seoDescription:
    "Custom CRM systems that track every lead and customer relationship in one place, so no opportunity slips through the cracks again.",

  seoKeywords: [
    "CRM system development",
    "custom CRM software Nepal",
    "sales pipeline management software",
    "customer relationship management solution",
    "lead tracking system",
    "CRM implementation services",
    "sales team CRM integration",
  ],

  overview: {
    whatIsIt:
      "A custom CRM that tracks every lead and customer relationship in one place, built around your actual sales process instead of a generic pipeline template.",
    whoNeedsIt:
      "Sales and customer-facing teams currently tracking leads across inboxes, spreadsheets, and memory, with no shared visibility into the pipeline.",
    businessValue:
      "Converts scattered, person-dependent lead tracking into a shared system that protects revenue from falling through gaps in memory or handoffs.",
    benefits: [
      "Every lead and customer interaction tracked in one shared system",
      "Pipeline visibility that doesn't depend on any single salesperson",
      "Automated follow-up reminders that prevent leads from going cold",
      "Reporting that shows exactly where deals are won and lost",
    ],
  },

  businessProblem: {
    title: "Why Are Untracked Leads",
    highlight: "Revenue You're Quietly Losing?",
    intro:
      "Most businesses don't realize how many leads they've lost to a missed follow-up or a forgotten conversation until a CRM finally shows the gap.",
    painPoints: [
      {
        title: "Leads live in someone's inbox, not a shared system",
        description:
          "When a salesperson is out sick or leaves the company, their open leads and follow-up context often leave with them, with no record anyone else can pick up.",
      },
      {
        title: "Follow-ups get forgotten without a system reminder",
        description:
          "A promising lead goes cold simply because nobody was prompted to follow up at the right moment — an entirely preventable loss.",
      },
      {
        title: "Leadership has no real visibility into the pipeline",
        description:
          "Without a shared CRM, forecasting revenue means asking each salesperson individually for their best guess, rather than seeing an aggregated, current pipeline.",
      },
      {
        title: "Customer history is scattered and incomplete",
        description:
          "A returning customer's past purchases, complaints, or preferences live in whichever tool or person happened to interact with them last, not in one accessible record.",
      },
      {
        title: "There's no data on why deals are won or lost",
        description:
          "Without structured tracking, patterns in what makes a deal succeed or fail stay invisible, so the sales process never actually improves.",
      },
      {
        title: "Onboarding new sales staff takes far longer than it should",
        description:
          "New hires have no system to learn the existing pipeline or customer history from, extending ramp-up time and increasing the risk of dropped relationships during the handover.",
      },
    ],
  },

  businessImpact: {
    title: "What a Unified CRM",
    highlight: "Actually Changes?",
    intro:
      "A CRM built around your actual sales process changes how confidently your team can answer 'where does this deal stand' — for any lead, at any time.",
    points: [
      {
        icon: Layers,
        title: "Every lead lives in one shared, visible system",
        description:
          "No opportunity depends on one person's inbox or memory — the whole team can see where every lead stands and pick it up if needed.",
      },
      {
        icon: Bell,
        title: "Follow-ups happen automatically, not by memory",
        description:
          "Automated reminders and task assignments mean a promising lead doesn't go cold simply because nobody remembered to reach out.",
      },
      {
        icon: TrendingUp,
        title: "Leadership sees the real pipeline in real time",
        description:
          "Aggregated, live pipeline data replaces guesswork forecasting, giving leadership an accurate view of expected revenue at any moment.",
      },
      {
        icon: Search,
        title: "Win/loss patterns become visible for the first time",
        description:
          "Structured deal tracking reveals what actually separates a won deal from a lost one, turning sales improvement into a data-driven process.",
      },
    ],
  },

  roi: {
    title: "Where Does the Return",
    highlight: "Actually Come From?",
    intro:
      "A CRM's return shows up directly in recovered leads, shorter onboarding, and forecasting your team can actually trust.",
    points: [
      "Recovered lost leads — automated follow-up reminders catch the opportunities that used to go cold from a simple missed touchpoint.",
      "Faster new hire ramp-up — a documented pipeline and customer history let new sales staff get productive without relying on tribal knowledge.",
      "More accurate revenue forecasting — a shared, real-time pipeline replaces individual guesswork with aggregated, trustworthy data.",
      "Improved close rates — visibility into win/loss patterns lets your team refine the sales process based on evidence, not instinct.",
      "Protected customer relationships during staff turnover — a complete shared history means a departure no longer risks losing the relationship along with the employee.",
    ],
  },

  workflow: [
    {
      step: "01",
      title: "Sales Process Mapping",
      description:
        "We map your actual sales stages, handoffs, and follow-up cadence before configuring a single pipeline stage.",
    },
    {
      step: "02",
      title: "CRM Architecture & Pipeline Design",
      description:
        "We design the pipeline stages, fields, and automation rules to match how your team actually sells, not a generic default.",
    },
    {
      step: "03",
      title: "Build & Data Migration",
      description:
        "We build the system and migrate existing lead and customer data from spreadsheets, inboxes, or legacy tools.",
    },
    {
      step: "04",
      title: "Automation & Integration Setup",
      description:
        "Follow-up reminders, email integration, and reporting dashboards are configured and tested against real scenarios.",
    },
    {
      step: "05",
      title: "Team Rollout & Adoption Support",
      description:
        "We train your sales team directly and monitor early adoption, since a CRM only works if the team actually uses it consistently.",
    },
  ],

  implementation: {
    title: "What Actually Happens",
    highlight: "During the Build",
    intro:
      "No black box. Here's what you're involved in, and what you're handed at the end.",
    deliverables: [
      "A documented sales process map before any pipeline is configured",
      "Migrated lead and customer data from existing spreadsheets or tools",
      "Automated follow-up reminders and task assignment rules",
      "Real-time pipeline and revenue forecasting dashboards",
      "Email and communication tool integration so activity logs automatically",
      "Hands-on training for your sales team and a documented admin guide",
    ],
  },

  timeline: [
    {
      phase: "Process Mapping",
      duration: "3–5 days",
      description: "Sales stage and workflow audit before configuration begins.",
    },
    {
      phase: "Build & Configuration",
      duration: "2–4 weeks",
      description: "Pipeline, automation, and integration setup.",
    },
    {
      phase: "Data Migration",
      duration: "3–5 days",
      description: "Existing lead and customer records moved into the new system.",
    },
    {
      phase: "Rollout & Training",
      duration: "1 week",
      description: "Team training and adoption support at go-live.",
    },
  ],

  technology: [
    { category: "Core Platform", items: ["Custom CRM architecture", "PostgreSQL / MySQL"] },
    { category: "Automation", items: ["Follow-up reminders", "Email & calendar integration", "Task assignment rules"] },
    { category: "Reporting", items: ["Pipeline dashboards", "Win/loss analytics", "Revenue forecasting"] },
  ],

  caseStudy: {
    illustrative: true,
    client: "A B2B equipment supplier",
    industry: "Wholesale & Distribution",
    challenge:
      "Sales reps tracked leads individually in personal spreadsheets, with no shared visibility, and follow-ups regularly slipped when a rep was busy or out of office.",
    approach:
      "We built a custom CRM with automated follow-up reminders, a shared pipeline view, and migrated all existing lead data into the new system.",
    outcome:
      "Leads no longer depend on any one rep's memory, leadership can see the full pipeline in real time, and follow-up reminders have measurably reduced lost opportunities.",
  },

  faqs: [
    {
      question: "How is a custom CRM different from Salesforce or HubSpot?",
      answer:
        "Off-the-shelf CRMs are powerful but generic, often requiring your process to bend around their structure. A custom CRM is built around your specific sales stages and rules from the start — and typically costs less over time without per-seat licensing.",
    },
    {
      question: "Can you migrate our existing leads from spreadsheets?",
      answer:
        "Yes — migrating existing lead and customer data is a standard part of the build, so you don't lose the history you've already accumulated.",
    },
    {
      question: "Will our sales team actually adopt a new system?",
      answer:
        "Adoption is the main risk with any CRM, which is why we design the pipeline around how your team already sells and include hands-on training and adoption support at rollout.",
    },
    {
      question: "Can the CRM integrate with our email and calendar?",
      answer:
        "Yes — email and calendar integration is typically built in, so activity logs automatically instead of requiring manual entry.",
    },
    {
      question: "How quickly will we see leads stop falling through the cracks?",
      answer:
        "Automated follow-up reminders typically show an impact within the first few weeks of rollout, once the team's active leads are in the system.",
    },
  ],

  cta: {
    title: "Ready to Stop Losing Leads to a Missed Follow-Up?",
    subtitle:
      "Tell us how your team currently tracks leads. We'll show you exactly what a shared CRM would recover.",
    buttonLabel: "Book a Strategy Call",
  },

  relatedServices: ["custom-software-development", "mobile-app-development"],
  relatedSolutions: ["billing-invoicing", "business-intelligence-analytics", "erp-systems"],
  relatedIndustries: ["real-estate", "travel-agencies", "retail", "hotels"],
};
