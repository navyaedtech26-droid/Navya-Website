import { Palette, Users, MousePointerClick, Layers, Eye } from "lucide-react";
import type { ServicePage } from "@/types";

export const uiUxDesignServicePage: ServicePage = {
  slug: "ui-ux-design",
  category: "service",
  icon: Palette,
  title: "UI/UX Design",
  highlight: "Interfaces Built to Convert",

  heroSubtitle:
    "A confusing interface doesn't just look dated — it actively loses you customers, one silent drop-off at a time. We design research-driven interfaces that make the right action the obvious one.",

  heroImage: "/vector/uiux.avif",

  seoDescription:
    "UI/UX design framed as a business decision: the cost of a confusing interface, the impact of research-driven design, the workflow, timeline, technology, and a real client outcome from Navya EdTech.",

  seoKeywords: [
    "UI UX design services",
    "product design Nepal",
    "user experience design",
    "design system development",
    "conversion-focused UI design",
    "wireframing and prototyping",
    "usability testing",
  ],

  overview: {
    whatIsIt:
      "Research-driven interface design — user research, wireframing, prototyping, and a scalable design system — built for usability and measurable conversion.",
    whoNeedsIt:
      "Product teams and founders whose users struggle to complete key actions, or whose interface no longer matches the ambition of the business behind it.",
    businessValue:
      "Turns confusion and hesitation at key decision points into clear, confident action — lifting activation, retention, and the lifetime value of every user.",
    benefits: [
      "Fewer support tickets caused by confusing navigation or flows",
      "Higher activation and feature adoption from clearer onboarding",
      "A reusable design system that speeds up every future release",
      "A visual identity that signals the quality behind the product",
    ],
  },

  businessProblem: {
    title: "Why Is a Confusing Interface",
    highlight: "Quietly Losing You Users?",
    intro:
      "Most teams don't discover a design problem until it shows up as a support ticket, a churn number, or a demo that falls flat — by which point it's already cost real revenue.",
    painPoints: [
      {
        title: "New users get lost before they see the value",
        description:
          "Onboarding flows built without user testing leave first-time users confused about what to do next, and most simply leave instead of asking for help.",
      },
      {
        title: "Support fields questions the interface should answer",
        description:
          "Unclear labeling, hidden actions, and inconsistent patterns generate the same repeat questions to your support team — cost that a clearer design would remove.",
      },
      {
        title: "Every new screen looks and behaves differently",
        description:
          "Without a design system, each new feature is designed from scratch, creating an inconsistent product that feels stitched together rather than built with intent.",
      },
      {
        title: "Accessibility gaps quietly exclude real users",
        description:
          "Low-contrast text, missing labels, and keyboard-inaccessible flows shut out a portion of your audience — and increasingly, invite compliance risk too.",
      },
      {
        title: "The interface undersells the product behind it",
        description:
          "A dated or generic-looking UI signals lower quality than the engineering underneath actually delivers, undermining trust before a user experiences the real value.",
      },
      {
        title: "Design decisions are made on opinion, not evidence",
        description:
          "Without user research or testing, product and design decisions default to whoever's opinion is loudest in the room — a costly way to guess.",
      },
    ],
  },

  businessImpact: {
    title: "What Research-Driven Design",
    highlight: "Actually Changes?",
    intro:
      "Design grounded in real user behavior changes outcomes at the exact moments that matter — onboarding, checkout, the first five minutes of use.",
    points: [
      {
        icon: MousePointerClick,
        title: "Key actions get completed more often",
        description:
          "Interfaces tested against real user behavior remove the hesitation points where users used to abandon a flow, directly lifting conversion at each step.",
      },
      {
        icon: Users,
        title: "Onboarding stops losing new users",
        description:
          "A first-time flow designed around what users actually need to see first gets them to value faster, instead of leaving them to figure it out alone.",
      },
      {
        icon: Layers,
        title: "Every new feature ships faster and consistently",
        description:
          "A documented design system means new screens reuse proven, tested components instead of reinventing patterns — speeding up delivery and reducing inconsistency.",
      },
      {
        icon: Eye,
        title: "The product looks as strong as it performs",
        description:
          "A polished, accessible interface signals the quality and seriousness of the business behind it, building trust before a single feature is even used.",
      },
    ],
  },

  roi: {
    title: "Where Does the Return",
    highlight: "Actually Come From?",
    intro:
      "Design's return shows up in the numbers you already track — activation rate, support volume, and how fast your team can ship the next feature.",
    points: [
      "Higher activation and conversion — removing friction at key decision points lifts the percentage of users who complete the action you need them to take.",
      "Fewer support tickets — a clearer interface answers questions itself instead of generating tickets your team has to resolve by hand.",
      "Faster future development — a documented design system means every new feature reuses tested components instead of starting from scratch.",
      "Reduced legal and accessibility risk — designing for WCAG compliance from the start avoids costly retrofits and exposure later.",
      "Stronger perceived value — a premium, consistent interface lets you compete on trust and quality instead of discounting to close the gap.",
    ],
  },

  workflow: [
    {
      step: "01",
      title: "User & Business Research",
      description:
        "We start with who's actually using the product, what they're trying to accomplish, and where they currently get stuck.",
    },
    {
      step: "02",
      title: "Wireframing & Information Architecture",
      description:
        "We map the structure and flow of the product before any visual design, so the foundation is right before it's styled.",
    },
    {
      step: "03",
      title: "Visual Design & Design System",
      description:
        "We design the visual language and build it into a reusable system, so every future screen stays consistent without extra design overhead.",
    },
    {
      step: "04",
      title: "Prototyping & Usability Testing",
      description:
        "Clickable prototypes are tested against real users before development, catching usability problems while they're still cheap to fix.",
    },
    {
      step: "05",
      title: "Developer Handoff & Support",
      description:
        "We hand off detailed specs and assets your development team (or ours) can implement precisely, and stay on to support the build.",
    },
  ],

  implementation: {
    title: "What Actually Happens",
    highlight: "During the Design Process",
    intro:
      "No black box. Here's what you're involved in, and what you're handed at the end.",
    deliverables: [
      "User research findings summarized in plain language, not just raw data",
      "Wireframes and information architecture reviewed with you before visual design starts",
      "A documented, reusable design system — components, spacing, typography, color",
      "Clickable prototypes validated through usability testing with real users",
      "Developer-ready specs and assets for precise implementation",
      "A short handoff walkthrough so your team understands the reasoning behind key decisions",
    ],
  },

  timeline: [
    {
      phase: "Research & Discovery",
      duration: "1 week",
      description: "User interviews, competitive review, and problem definition.",
    },
    {
      phase: "Wireframing",
      duration: "1 week",
      description: "Structure and flow mapped and reviewed before visual design.",
    },
    {
      phase: "Visual Design",
      duration: "2–3 weeks",
      description: "Full visual design and design system, built and refined with your feedback.",
    },
    {
      phase: "Testing & Handoff",
      duration: "1 week",
      description: "Usability testing, refinement, and developer-ready handoff.",
    },
  ],

  technology: [
    { category: "Design Tools", items: ["Figma", "Design tokens", "Component libraries"] },
    { category: "Research", items: ["User interviews", "Usability testing", "Heatmaps & session recordings"] },
    { category: "Systems", items: ["Design systems", "Accessibility (WCAG) audits", "Responsive layout standards"] },
  ],

  caseStudy: {
    illustrative: true,
    client: "An early-stage SaaS product",
    industry: "Software & Technology",
    challenge:
      "New users regularly signed up but abandoned the product within the first session, unable to reach the feature that demonstrated its core value.",
    approach:
      "We ran user testing on the existing onboarding flow, redesigned it around the single action that mattered most, and built a design system to keep future screens consistent.",
    outcome:
      "New users now reach the product's core value within the first session instead of dropping off, and every feature shipped since reuses the same tested design system.",
  },

  faqs: [
    {
      question: "Do we need user research, or can you design straight from our requirements?",
      answer:
        "We can work from requirements alone, but research is what catches assumptions before they're built. Even a few user interviews often surface problems a requirements doc never would.",
    },
    {
      question: "Will you design our product, or also build it?",
      answer:
        "We do both, and design specifically for what our own development team can implement well — but the deliverables are also handoff-ready for any other engineering team.",
    },
    {
      question: "What's a design system, and do we actually need one?",
      answer:
        "It's a documented set of reusable components, styles, and rules. If you're building more than a handful of screens or plan to keep shipping features, it saves significant design and development time down the line.",
    },
    {
      question: "How do you test usability without a large user base yet?",
      answer:
        "Even five to eight test sessions with representative users typically surface the majority of usability problems — we scope testing to what's realistic at your stage.",
    },
    {
      question: "Can you redesign an existing product without breaking what already works?",
      answer:
        "Yes — we audit what's already converting or well-used before changing anything, so a redesign improves the weak points without discarding what's already working.",
    },
  ],

  cta: {
    title: "Ready to Stop Losing Users to a Confusing Interface?",
    subtitle:
      "Tell us where users get stuck. We'll show you exactly what a research-driven redesign would fix.",
    buttonLabel: "Book a Strategy Call",
  },

  relatedServices: ["websites", "mobile-app-development"],
  relatedSolutions: ["digital-transformation"],
  relatedIndustries: ["hotels", "retail", "real-estate"],
};
