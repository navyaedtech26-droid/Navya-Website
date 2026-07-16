import { BarChart3, Database, TrendingUp, Eye, Layers } from "lucide-react";
import type { ServicePage } from "@/types";

export const businessIntelligenceAnalyticsServicePage: ServicePage = {
  slug: "business-intelligence-analytics",
  category: "solution",
  icon: BarChart3,
  title: "Business Intelligence & Analytics",
  highlight: "Decisions Backed by Evidence",

  heroSubtitle:
    "Every leadership meeting where someone asks 'do we actually have the numbers on that?' is a sign the data exists somewhere, just not anywhere useful. We build the dashboards that turn scattered data into decisions made with evidence, not instinct.",

  heroImage: "/vectors1/bi-clean.avif",

  seoDescription:
    "Business intelligence and analytics framed as a business decision: the cost of scattered, inaccessible data, the impact of a unified BI system, the workflow, timeline, technology, and a real client outcome from Navya EdTech.",

  seoKeywords: [
    "business intelligence services",
    "custom BI dashboard development Nepal",
    "data visualization solutions",
    "KPI tracking software",
    "data warehousing services",
    "predictive analytics for business",
    "reporting and analytics automation",
  ],

  overview: {
    whatIsIt:
      "Custom BI dashboards and a unified data layer that turn scattered operational data into real-time, decision-ready visibility.",
    whoNeedsIt:
      "Leadership teams making decisions on delayed or incomplete data pulled manually from multiple disconnected systems.",
    businessValue:
      "Replaces manual, delayed reporting with live dashboards that let leadership see and act on what's actually happening in the business now.",
    benefits: [
      "Real-time dashboards for the metrics that actually drive decisions",
      "One unified data source instead of five conflicting exports",
      "Predictive insights that flag problems before they show up in results",
      "Reporting your team can trust without re-verifying it manually",
    ],
  },

  businessProblem: {
    title: "Why Is Scattered Data",
    highlight: "Quietly Slowing Every Decision?",
    intro:
      "Most businesses have plenty of data — it's just locked in disconnected systems, exported manually, and stitched together under deadline pressure before anyone can act on it.",
    painPoints: [
      {
        title: "Reporting means manually pulling exports from five systems",
        description:
          "Building even a simple monthly report requires exporting spreadsheets from separate tools and reconciling them by hand, delaying decisions by days.",
      },
      {
        title: "Different teams report different numbers for the same metric",
        description:
          "Without a single source of truth, sales, finance, and operations each calculate the same KPI slightly differently, leading to disputes about whose number is right.",
      },
      {
        title: "By the time a report is ready, the data is already stale",
        description:
          "Manual reporting cycles mean decisions get made on numbers that are days or weeks old, missing the window where the insight was actually actionable.",
      },
      {
        title: "Nobody sees a problem coming until it's in the results",
        description:
          "Without predictive or trend analysis, issues like slowing sales or rising churn only become visible after they've already impacted the bottom line.",
      },
      {
        title: "Dashboards exist but nobody trusts them",
        description:
          "Ad hoc dashboards built without a proper data foundation often show inconsistent numbers, so leadership reverts to manually verifying everything anyway.",
      },
      {
        title: "Valuable data sits unanalyzed because nobody has time",
        description:
          "Operational systems capture rich data that never gets turned into insight, simply because no one owns the job of building the analysis.",
      },
    ],
  },

  businessImpact: {
    title: "What Real-Time BI",
    highlight: "Actually Changes?",
    intro:
      "A proper business intelligence layer doesn't just make reporting faster — it changes how early a business can see and respond to what's actually happening.",
    points: [
      {
        icon: Eye,
        title: "Leadership sees the current state, not last week's",
        description:
          "Real-time dashboards replace the lag of manual reporting cycles, so decisions are made on what's happening now, not what happened days ago.",
      },
      {
        icon: Layers,
        title: "Every team reports from the same underlying data",
        description:
          "A unified data layer eliminates the disputes between departments over whose version of a metric is correct.",
      },
      {
        icon: TrendingUp,
        title: "Problems surface as trends, before they're results",
        description:
          "Trend and predictive analysis flag a slowing metric while there's still time to intervene, instead of after it's already hit the bottom line.",
      },
      {
        icon: Database,
        title: "Rich operational data finally gets turned into insight",
        description:
          "A proper data warehouse and reporting layer means the data your systems already capture actually gets used, not left unanalyzed.",
      },
    ],
  },

  roi: {
    title: "Where Does the Return",
    highlight: "Actually Come From?",
    intro:
      "BI's return shows up in decisions made faster, disputes over data eliminated, and problems caught before they compound in cost.",
    points: [
      "Faster decision cycles — real-time dashboards remove the days-long delay a manual reporting process currently imposes.",
      "Eliminated cross-team data disputes — a single source of truth stops the recurring debate over whose version of a metric is correct.",
      "Earlier problem detection — trend and predictive analysis surface risk while it's still cheap to address, not after it's already cost revenue.",
      "Reduced manual reporting hours — automated dashboards remove the recurring work of manually assembling reports from multiple exports.",
      "Better resource allocation — clear, trusted KPI visibility lets leadership direct effort to what the data actually shows is working.",
    ],
  },

  workflow: [
    {
      step: "01",
      title: "Data Source & KPI Audit",
      description:
        "We identify every system holding relevant data and define the specific KPIs leadership actually needs visibility into.",
    },
    {
      step: "02",
      title: "Data Architecture Design",
      description:
        "We design the data warehouse and pipeline structure that consolidates every source into one reliable foundation.",
    },
    {
      step: "03",
      title: "Dashboard Build & Visualization",
      description:
        "We build dashboards around how decisions actually get made, not a generic template of charts nobody asked for.",
    },
    {
      step: "04",
      title: "Validation Against Known Numbers",
      description:
        "We validate the new dashboards against numbers your team already trusts, so confidence is established before rollout.",
    },
    {
      step: "05",
      title: "Rollout & Ongoing Refinement",
      description:
        "We roll out to leadership and relevant teams, then refine the dashboards as real usage reveals what's actually being acted on.",
    },
  ],

  implementation: {
    title: "What Actually Happens",
    highlight: "During the Build",
    intro:
      "No black box. Here's what you're involved in, and what you're handed at the end.",
    deliverables: [
      "A documented audit of data sources and defined KPIs before dashboard design begins",
      "A consolidated data warehouse pulling from every relevant system",
      "Real-time dashboards built around actual decision-making needs",
      "Validation against numbers your team already trusts, before rollout",
      "Predictive or trend analysis where the data supports it",
      "Documentation and training so your team can extend the dashboards independently",
    ],
  },

  timeline: [
    {
      phase: "Audit & KPI Definition",
      duration: "1 week",
      description: "Data source mapping and defining what leadership actually needs to see.",
    },
    {
      phase: "Data Architecture",
      duration: "1–2 weeks",
      description: "Data warehouse and pipeline design consolidating every source.",
    },
    {
      phase: "Dashboard Build",
      duration: "2–4 weeks",
      description: "Visualization development and validation against trusted numbers.",
    },
    {
      phase: "Rollout & Refinement",
      duration: "Ongoing",
      description: "Team rollout and iterative refinement based on real usage.",
    },
  ],

  technology: [
    { category: "Data Layer", items: ["Data warehousing", "ETL pipelines", "API-based data integration"] },
    { category: "Visualization", items: ["Custom dashboards", "Real-time charting", "Role-based reporting views"] },
    { category: "Analytics", items: ["KPI tracking", "Trend analysis", "Predictive modeling where applicable"] },
  ],

  caseStudy: {
    illustrative: true,
    client: "A multi-branch retail and services group",
    industry: "Retail & Services",
    challenge:
      "Monthly leadership reporting required manually exporting and reconciling data from sales, finance, and inventory systems, often taking a week to assemble and already stale on delivery.",
    approach:
      "We built a consolidated data warehouse and real-time dashboards covering sales, finance, and inventory KPIs, validated against the leadership team's existing trusted figures.",
    outcome:
      "Leadership now sees current performance in real time instead of waiting a week for a manually assembled report, and the recurring disputes over whose numbers were correct have stopped.",
  },

  faqs: [
    {
      question: "We already have some dashboards — do we need to start over?",
      answer:
        "Not necessarily. We audit what's already working and typically rebuild the underlying data layer where it's unreliable, while reusing dashboard designs your team already trusts.",
    },
    {
      question: "How do you make sure the new dashboards are actually accurate?",
      answer:
        "We validate every dashboard against numbers your team already trusts before rollout, so discrepancies are caught and resolved before leadership starts relying on the new system.",
    },
    {
      question: "Can this include predictive analytics, not just historical reporting?",
      answer:
        "Yes, where your data supports it — we scope predictive or trend modeling as part of the engagement when it adds genuine decision-making value, not as a default feature.",
    },
    {
      question: "Will different departments see different views?",
      answer:
        "Yes — role-based dashboard access means each team sees the metrics relevant to them, while leadership sees the consolidated cross-department view.",
    },
    {
      question: "How long before we see a return on a BI investment?",
      answer:
        "Most clients see the first return — faster reporting cycles — as soon as the initial dashboards go live, with deeper insight compounding over subsequent months of use.",
    },
  ],

  cta: {
    title: "Ready to Make Decisions on Evidence, Not Guesswork?",
    subtitle:
      "Tell us which decisions currently wait too long for data. We'll show you exactly what real-time visibility would change.",
    buttonLabel: "Book a Strategy Call",
  },

  relatedServices: ["ai-solutions", "custom-software-development"],
  relatedSolutions: ["erp-systems", "crm-systems"],
  relatedIndustries: ["manufacturing", "retail", "hospitals"],
};
