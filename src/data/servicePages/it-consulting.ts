import { Compass, Map, ShieldCheck, LineChart, Layers3 } from "lucide-react";
import type { ServicePage } from "@/types";

export const itConsultingServicePage: ServicePage = {
  slug: "it-consulting",
  category: "service",
  icon: Compass,
  title: "IT Consulting",
  highlight: "A Technology Plan Tied to Business Outcomes",

  heroSubtitle:
    "Most IT spending decisions get made by whoever's loudest in the room, not by what actually moves the business. We bring an outside, technically fluent view that ties every technology decision back to a measurable business outcome.",

  seoDescription:
    "IT consulting that ties every technology decision to a measurable business outcome, audits, roadmaps, and independent vendor evaluation.",

  seoKeywords: [
    "IT consulting services",
    "technology strategy consulting Nepal",
    "IT audit and assessment",
    "digital transformation strategy",
    "technology risk management",
    "IT roadmap planning",
    "vendor and software evaluation",
  ],

  overview: {
    whatIsIt:
      "Strategic technology guidance (audits, roadmaps, and vendor evaluation) that aligns your IT investment with actual business priorities.",
    whoNeedsIt:
      "Leadership teams making significant technology decisions without an in-house CTO, or businesses whose IT spend has grown without a coherent strategy behind it.",
    businessValue:
      "Replaces reactive, vendor-driven technology decisions with a deliberate plan tied directly to cost reduction, risk management, or growth targets.",
    benefits: [
      "A clear technology roadmap tied to specific business goals",
      "Independent evaluation of vendors and tools, free of sales pressure",
      "Risk and compliance gaps identified before they become incidents",
      "Technology spend that's justified against measurable outcomes",
    ],
  },

  businessProblem: {
    title: "Why Are Technology Decisions Without a Strategy",
    highlight: "Quietly Expensive?",
    intro:
      "Most businesses accumulate technology decisions one urgent request at a time, without ever stepping back to see whether the whole picture serves the business.",
    painPoints: [
      {
        title: "Software gets bought reactively, one fire at a time",
        description:
          "Each tool gets purchased to solve today's emergency, with nobody checking whether it overlaps with something you already own or fits the bigger picture.",
      },
      {
        title: "Nobody's evaluating vendors without a stake in the sale",
        description:
          "Vendor demos are persuasive by design. Without an independent technical evaluation, decisions get made on a sales pitch instead of a fair comparison.",
      },
      {
        title: "Technology risk is invisible until it's an incident",
        description:
          "Outdated systems, unpatched software, and compliance gaps sit unaddressed because no one owns the job of surfacing them before they become costly.",
      },
      {
        title: "IT spend keeps climbing with no clear return",
        description:
          "Budgets grow year over year without a documented case for what each dollar is actually buying the business in outcomes.",
      },
      {
        title: "There's no plan for the next two years, only the next quarter",
        description:
          "Without a roadmap, every technology decision is made in isolation, leading to a patchwork of tools that don't scale together.",
      },
    ],
  },

  businessImpact: {
    title: "What Strategic Guidance",
    highlight: "Actually Changes?",
    intro:
      "Independent, technically grounded advice changes how technology decisions get made, from reactive purchases to a deliberate plan tied to outcomes.",
    points: [
      {
        icon: Map,
        title: "Every decision ties back to a documented roadmap",
        description:
          "New technology investments get evaluated against a plan built around your actual priorities, instead of being decided in isolation under pressure.",
      },
      {
        icon: ShieldCheck,
        title: "Risk gets surfaced before it becomes an incident",
        description:
          "A structured audit identifies outdated systems, security gaps, and compliance exposure while they're still cheap and quiet to fix.",
      },
      {
        icon: LineChart,
        title: "IT spend gets justified, not just approved",
        description:
          "Every recommendation comes with a clear business case, so leadership can see exactly what a technology investment is expected to return.",
      },
      {
        icon: Layers3,
        title: "Vendor decisions get made on fit, not persuasion",
        description:
          "Independent evaluation compares tools against your actual requirements, removing the sales pressure that usually drives the decision.",
      },
    ],
  },

  roi: {
    title: "Where Does the Return",
    highlight: "Actually Come From?",
    intro:
      "Consulting's return shows up in avoided bad purchases, reduced risk exposure, and a technology budget that finally has a documented rationale.",
    points: [
      "Avoided wasted spend. Independent evaluation catches redundant or poorly fitting tools before the purchase, not after the contract is signed.",
      "Reduced risk exposure. Identifying compliance and security gaps early avoids the far higher cost of a breach or violation discovered later.",
      "Better negotiating position. An independent technical assessment gives your team leverage in vendor negotiations instead of taking the first offer.",
      "Clearer budget justification. A documented roadmap ties every dollar of IT spend to a specific business outcome leadership can evaluate.",
      "Faster, more confident decisions. A clear strategic plan means less time spent debating each new request in isolation.",
    ],
  },

  workflow: [
    {
      step: "01",
      title: "Business & Technology Audit",
      description:
        "We assess your current technology stack, spend, and risk posture against your actual business goals, not a generic checklist.",
    },
    {
      step: "02",
      title: "Gap & Risk Analysis",
      description:
        "We identify where technology is holding the business back or exposing it to risk, prioritized by impact and urgency.",
    },
    {
      step: "03",
      title: "Roadmap Development",
      description:
        "We build a phased technology roadmap tied to specific business outcomes, with clear ownership and timelines.",
    },
    {
      step: "04",
      title: "Vendor & Tool Evaluation",
      description:
        "Where new tools are needed, we run an independent evaluation against your requirements, free of vendor influence.",
    },
    {
      step: "05",
      title: "Implementation Support",
      description:
        "We stay engaged through execution, whether that's our own team building the recommended systems or supporting yours.",
    },
  ],

  implementation: {
    title: "What Actually Happens",
    highlight: "During the Engagement",
    intro:
      "No black box. Here's what you're involved in, and what you're handed at the end.",
    deliverables: [
      "A documented audit of your current technology stack, spend, and risk posture",
      "A prioritized list of gaps and risks, ranked by business impact",
      "A phased technology roadmap tied to specific, measurable outcomes",
      "Independent vendor and tool comparisons, scored against your actual requirements",
      "A presentation-ready summary for leadership and stakeholders",
      "Ongoing advisory support available through implementation",
    ],
  },

  timeline: [
    {
      phase: "Audit",
      duration: "1–2 weeks",
      description: "Current-state technology, spend, and risk assessment.",
    },
    {
      phase: "Analysis",
      duration: "1 week",
      description: "Gap identification and prioritization against business goals.",
    },
    {
      phase: "Roadmap",
      duration: "1 week",
      description: "A phased plan with clear ownership, timelines, and business cases.",
    },
    {
      phase: "Ongoing Advisory",
      duration: "As needed",
      description: "Continued support through vendor evaluation and implementation.",
    },
  ],

  technology: [
    { category: "Assessment", items: ["Technology audits", "Risk & compliance review", "Cost analysis"] },
    { category: "Strategy", items: ["Roadmap planning", "Vendor evaluation frameworks", "Digital transformation planning"] },
    { category: "Governance", items: ["IT policy documentation", "Budget justification models"] },
  ],

  caseStudy: {
    illustrative: true,
    client: "A mid-sized professional services firm",
    industry: "Professional Services",
    challenge:
      "The firm had accumulated over a dozen software subscriptions purchased reactively over several years, with significant overlap and no documented technology strategy.",
    approach:
      "We audited the full technology stack, identified redundant tools, and built a two-year roadmap tied to the firm's growth and compliance priorities.",
    outcome:
      "The firm consolidated overlapping subscriptions, redirected the savings toward a prioritized roadmap, and now evaluates every new tool against a documented strategy instead of ad hoc requests.",
  },

  faqs: [
    {
      question: "We don't have an in-house CTO. Is this a substitute for one?",
      answer:
        "For many businesses, yes, on a project or fractional basis. We provide the strategic technology judgment a CTO would, without the full-time executive cost, and can hand off cleanly if you later hire one.",
    },
    {
      question: "Will you push us toward your own development services?",
      answer:
        "Recommendations are based on what's actually right for your business. If that means work outside our own capabilities, we'll say so, and the evaluation stays independent regardless of who ends up doing the build.",
    },
    {
      question: "How long does a typical engagement take?",
      answer:
        "An initial audit and roadmap typically takes 3–4 weeks. Ongoing advisory support is scoped separately based on how actively you want us involved through implementation.",
    },
    {
      question: "Can you evaluate a specific vendor or tool we're already considering?",
      answer:
        "Yes. A focused vendor evaluation is available as a standalone engagement if you don't need a full audit, scored against your actual requirements rather than the vendor's pitch.",
    },
    {
      question: "Do you help implement the roadmap, or just write it?",
      answer:
        "Both. Many clients have us both build the recommended systems and continue as an advisor through the rest of the roadmap, but the roadmap itself is designed to be actionable by any team.",
    },
  ],

  cta: {
    title: "Ready for a Technology Plan Tied to Actual Business Outcomes?",
    subtitle:
      "Tell us where your technology spend feels reactive. We'll show you exactly what a documented roadmap changes.",
    buttonLabel: "Book a Strategy Call",
  },

  relatedServices: ["custom-software-development", "dedicated-developers", "cloud-services"],
  relatedSolutions: ["digital-transformation"],
  relatedIndustries: ["manufacturing", "hospitals", "colleges", "ngos"],
};
