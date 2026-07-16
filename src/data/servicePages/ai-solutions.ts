import { Brain, Bot, Clock3, TrendingUp, FileSearch } from "lucide-react";
import type { ServicePage } from "@/types";

export const aiSolutionsServicePage: ServicePage = {
  slug: "ai-solutions",
  category: "service",
  icon: Brain,
  title: "AI Solutions",
  highlight: "Automation With a Measurable Return",

  heroSubtitle:
    "Most AI conversations stay theoretical. Ours start with a specific, expensive manual task in your business and end with a working system that removes it — chatbots, document automation, and predictive models built for a return you can measure.",

  heroImage: "/vector/ai-solutions.avif",

  seoDescription:
    "AI solutions for business: chatbots, document automation, and predictive analytics that remove repetitive work and deliver measurable ROI.",

  seoKeywords: [
    "AI solutions for business",
    "AI automation Nepal",
    "generative AI integration",
    "AI chatbot development",
    "document processing automation",
    "predictive analytics for business",
    "machine learning implementation",
  ],

  overview: {
    whatIsIt:
      "Applied AI — chatbots, document parsers, and predictive models — built to remove a specific, costly manual task, not a generic AI feature bolted onto your product.",
    whoNeedsIt:
      "Operations, support, and logistics teams currently absorbing repetitive manual work that a well-scoped model can take over.",
    businessValue:
      "Converts hours of manual data entry, response drafting, or pattern-spotting into an automated process running continuously in the background.",
    benefits: [
      "Manual data entry cut by a measurable margin, not a vague promise",
      "24/7 intelligent customer responses without adding headcount",
      "Predictive signals built into your existing dashboards and workflows",
      "Automation scoped to your actual process, not a generic AI demo",
    ],
  },

  businessProblem: {
    title: "Why Is Manual, Repetitive Work",
    highlight: "Quietly Capping Your Growth?",
    intro:
      "Most businesses don't lack ambition for AI — they lack a scoped, practical starting point. Meanwhile, the same repetitive tasks keep consuming hours that should scale with revenue, not headcount.",
    painPoints: [
      {
        title: "Staff spend hours on data entry that follows a clear pattern",
        description:
          "Invoices, forms, and documents are re-typed by hand into a system, even though the pattern of the data rarely changes — a textbook case for automation nobody's built yet.",
      },
      {
        title: "Customer support answers the same questions on repeat",
        description:
          "A large share of support tickets are the same handful of questions, answered manually every time instead of being resolved instantly by a trained assistant.",
      },
      {
        title: "Decisions rely on gut feel instead of available data",
        description:
          "The data to predict demand, churn, or delays already exists in your systems — it's just never been modeled into a forecast anyone actually uses.",
      },
      {
        title: "\"AI\" conversations stall at the demo stage",
        description:
          "Generic chatbot trials or off-the-shelf AI tools get evaluated, get excited about, and then quietly die because nobody scoped them against a real, measurable task.",
      },
      {
        title: "Scaling means hiring, not just software",
        description:
          "Every unit of growth adds headcount for the same repetitive review and response work, instead of the software absorbing the increase.",
      },
    ],
  },

  businessImpact: {
    title: "What Practical AI",
    highlight: "Actually Changes?",
    intro:
      "Applied correctly, AI removes the specific manual step causing the bottleneck — and the impact shows up immediately in hours, not in a strategy document.",
    points: [
      {
        icon: Clock3,
        title: "Manual entry work drops sharply",
        description:
          "Document parsing and structured data extraction take over the repetitive re-typing work, freeing staff for judgment calls a model shouldn't make.",
      },
      {
        icon: Bot,
        title: "Customers get instant, accurate answers",
        description:
          "A trained chatbot handles the repeat questions immediately, day or night, and hands off to a human only for the cases that actually need one.",
      },
      {
        icon: TrendingUp,
        title: "You see problems before they happen",
        description:
          "Predictive models surface demand spikes, churn risk, or delivery delays early enough for your team to act, instead of reacting after the fact.",
      },
      {
        icon: FileSearch,
        title: "Growth stops requiring proportional headcount",
        description:
          "Automated workflows absorb volume increases that would otherwise mean hiring, letting the team scale their judgment instead of their typing.",
      },
    ],
  },

  roi: {
    title: "Where Does the Return",
    highlight: "Actually Come From?",
    intro:
      "AI's return is concrete when it's scoped against a real task — measured in hours saved, tickets deflected, or errors avoided, not in abstract innovation points.",
    points: [
      "Reduced manual entry cost — document automation removes a large share of the re-typing hours currently paid for by the hour.",
      "Lower support cost per ticket — a chatbot resolving repeat questions instantly reduces the average cost of handling each inquiry.",
      "Fewer costly surprises — predictive alerts on demand or churn let your team intervene before the cost of reacting late sets in.",
      "Headcount that scales with judgment, not volume — automation absorbs the repetitive load so hiring tracks growth in complexity, not growth in volume.",
      "A visible, ongoing return — because the system is scoped to a measured task, the before/after is something you can actually track.",
    ],
  },

  workflow: [
    {
      step: "01",
      title: "Task Identification & Scoping",
      description:
        "We identify the specific, measurable task worth automating first — not a broad AI strategy, a concrete process with a clear cost today.",
    },
    {
      step: "02",
      title: "Data & Feasibility Assessment",
      description:
        "We assess what data you actually have and whether it supports the model you need, before committing to a build.",
    },
    {
      step: "03",
      title: "Model Selection & Prototyping",
      description:
        "We choose the right approach — an LLM integration, a custom model, or a rules-based system — and prove it on real samples of your data first.",
    },
    {
      step: "04",
      title: "Integration Into Your Workflow",
      description:
        "The model is wired into the tools your team already uses, so adopting it doesn't mean learning a new separate system.",
    },
    {
      step: "05",
      title: "Monitoring & Continuous Improvement",
      description:
        "We track accuracy and outcomes after launch and retrain or adjust the model as real usage reveals edge cases.",
    },
  ],

  implementation: {
    title: "What Actually Happens",
    highlight: "During the Build",
    intro:
      "No black box. Here's what you're involved in, and what you're handed at the end.",
    deliverables: [
      "A scoped brief defining exactly which task is being automated and how success is measured",
      "A working prototype tested against real samples of your own data before full build-out",
      "Integration into your existing tools — CRM, helpdesk, ERP — rather than a standalone dashboard",
      "Guardrails and human hand-off rules for cases the model shouldn't handle alone",
      "Accuracy and performance monitoring in place from day one",
      "Documentation covering how the model works and how to retrain or adjust it",
    ],
  },

  timeline: [
    {
      phase: "Scoping & Feasibility",
      duration: "1 week",
      description: "Task selection, data assessment, and a defined success metric.",
    },
    {
      phase: "Prototype",
      duration: "1–2 weeks",
      description: "A working proof of concept tested against your real data.",
    },
    {
      phase: "Build & Integration",
      duration: "2–6 weeks",
      description: "Full development and wiring into your existing tools and workflows.",
    },
    {
      phase: "Launch & Monitoring",
      duration: "Ongoing",
      description: "Go-live with accuracy tracking and scheduled model review.",
    },
  ],

  technology: [
    { category: "AI & Models", items: ["OpenAI & LLM APIs", "Custom ML models", "NLP pipelines"] },
    { category: "Automation", items: ["Document parsing", "Workflow orchestration", "RPA where appropriate"] },
    { category: "Integration", items: ["CRM & helpdesk APIs", "Webhooks", "Existing database connections"] },
    { category: "Infrastructure", items: ["Cloud inference hosting", "Monitoring & logging", "Data privacy controls"] },
  ],

  caseStudy: {
    illustrative: true,
    client: "A multi-branch retail support desk",
    industry: "Retail & Customer Support",
    challenge:
      "Support staff answered the same handful of order-status and return-policy questions dozens of times a day, leaving little time for the cases that actually needed a person.",
    approach:
      "We built and trained a chatbot on the business's actual order and policy data, integrated with their existing helpdesk and handed off to a human for anything outside its scope.",
    outcome:
      "Repeat questions are now resolved instantly and around the clock, with support staff freed to focus on the complex cases the chatbot correctly escalates.",
  },

  faqs: [
    {
      question: "How do we know if a task is a good fit for AI automation?",
      answer:
        "It's repetitive, follows a pattern, and currently costs staff hours. If it requires deep judgment on every single case, it's usually a poor first candidate — we'll tell you honestly during scoping.",
    },
    {
      question: "Do you build custom models or use existing AI APIs?",
      answer:
        "Both, depending on the task. Many business problems are solved well and cheaply with an existing LLM API; others genuinely need a custom-trained model. We choose based on your data and budget, not by default.",
    },
    {
      question: "What about accuracy and mistakes the AI makes?",
      answer:
        "We build in guardrails and human hand-off rules for cases outside the model's confidence range, and monitor accuracy after launch to catch drift before it becomes a problem.",
    },
    {
      question: "Will this replace our staff?",
      answer:
        "It's designed to remove the repetitive load, not the judgment. In most engagements, staff are freed to handle higher-value work the automation correctly routes to them.",
    },
    {
      question: "How is our data handled and kept private?",
      answer:
        "We scope data privacy controls into the architecture from the start — including which data touches third-party APIs and which stays inside your own infrastructure.",
    },
  ],

  cta: {
    title: "Ready to Automate the Task That's Costing You the Most?",
    subtitle:
      "Tell us about the repetitive work eating your team's hours. We'll show you exactly what's feasible to automate, and what isn't.",
    buttonLabel: "Book a Strategy Call",
  },

  relatedServices: ["custom-software-development", "cloud-services"],
  relatedSolutions: ["business-intelligence-analytics", "digital-transformation"],
  relatedIndustries: ["manufacturing", "hospitals", "retail"],
};
