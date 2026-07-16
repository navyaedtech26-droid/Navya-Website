import { UserCog, Users, Gauge, ShieldCheck, Layers } from "lucide-react";
import type { ServicePage } from "@/types";

export const dedicatedDevelopersServicePage: ServicePage = {
  slug: "dedicated-developers",
  category: "service",
  icon: UserCog,
  title: "Dedicated Developers",
  highlight: "Senior Engineers, Without the Hiring Cycle",

  heroSubtitle:
    "A single open engineering role can take months to fill and derail a roadmap while it stays empty. We plug in vetted, senior developers who integrate with your team directly — so the timeline keeps moving while you hire, or instead of hiring at all.",

  seoDescription:
    "Dedicated developer augmentation framed as a business decision: the cost of a slow hiring cycle, the impact of an integrated engineering partner, the workflow, timeline, and a real client outcome from Navya EdTech.",

  seoKeywords: [
    "dedicated developers for hire",
    "staff augmentation Nepal",
    "hire remote software engineers",
    "outsourced development team",
    "vetted senior engineers",
    "flexible engineering engagement",
    "team augmentation services",
  ],

  overview: {
    whatIsIt:
      "Vetted senior engineers who join your existing team and workflow directly, on a flexible engagement model scoped to your actual project needs.",
    whoNeedsIt:
      "Engineering leaders with an open roadmap and a slow hiring pipeline, or teams needing specific expertise for a defined period without a permanent hire.",
    businessValue:
      "Removes the multi-month hiring cycle as a bottleneck, letting your roadmap keep moving while a permanent hiring process runs in parallel, or instead of it.",
    benefits: [
      "Senior engineers integrated within weeks, not months",
      "Flexible engagement models that scale up or down with the project",
      "No recruiting overhead, benefits administration, or onboarding delay",
      "Seamless integration into your existing tools and agile process",
    ],
  },

  businessProblem: {
    title: "Why Is a Slow Hiring Cycle",
    highlight: "a Direct Cost to Your Roadmap?",
    intro:
      "Most engineering delays aren't caused by bad planning — they're caused by an open seat that takes months to fill, while the work it was meant to cover keeps waiting.",
    painPoints: [
      {
        title: "A single open role stalls the whole roadmap",
        description:
          "Critical features wait behind a hiring pipeline that can take three to six months, while competitors without that gap keep shipping.",
      },
      {
        title: "Recruiting overhead eats internal engineering time",
        description:
          "Screening resumes and running technical interviews pulls your senior engineers away from building, adding hidden cost to every hire.",
      },
      {
        title: "A specific project needs expertise you don't have in-house",
        description:
          "A migration, an integration, or a specialized build needs skills your current team doesn't have time to learn on the clock — but doesn't justify a permanent hire either.",
      },
      {
        title: "Scaling the team up or down doesn't match project reality",
        description:
          "Permanent headcount is hard to flex — a project that needs five engineers for three months and one after that leaves you overstaffed or understaffed either way.",
      },
      {
        title: "A bad hire is expensive and slow to correct",
        description:
          "An unvetted or poorly matched permanent hire costs months of onboarding and salary before the mismatch becomes clear, and even longer to unwind.",
      },
    ],
  },

  businessImpact: {
    title: "What a Dedicated Engineering Partner",
    highlight: "Actually Changes?",
    intro:
      "The right augmentation model doesn't just fill a seat — it changes how fast your roadmap moves and how flexibly your team can respond to real project demand.",
    points: [
      {
        icon: Gauge,
        title: "The roadmap keeps moving immediately",
        description:
          "A vetted senior engineer can be integrated into your team within weeks, removing the multi-month wait a traditional hiring cycle imposes.",
      },
      {
        icon: Layers,
        title: "Capacity scales with the actual project, not fixed headcount",
        description:
          "Engagements flex up for a demanding sprint and down once it's done, matching cost to real project need instead of a fixed salary commitment.",
      },
      {
        icon: Users,
        title: "Specialized skills arrive without a permanent commitment",
        description:
          "A specific expertise gap — a migration, a niche integration — gets covered by an engineer who's already done it, without adding permanent headcount.",
      },
      {
        icon: ShieldCheck,
        title: "The risk of a mismatch drops sharply",
        description:
          "Engineers are vetted for both technical skill and fit before joining your team, and engagements can adjust quickly if a project's needs change.",
      },
    ],
  },

  roi: {
    title: "Where Does the Return",
    highlight: "Actually Come From?",
    intro:
      "The return on augmentation shows up in roadmap velocity and avoided hiring costs — both measurable against the cost of an unfilled seat today.",
    points: [
      "Faster time-to-delivery — closing a skills or capacity gap in weeks instead of months keeps the roadmap moving instead of stalling on an open role.",
      "Lower cost than a bad permanent hire — a flexible engagement avoids the sunk cost of onboarding and correcting a mismatched full-time hire.",
      "Reduced recruiting overhead — your senior engineers stay focused on building instead of screening resumes and running interviews.",
      "Capacity that matches project reality — scaling engagement size up or down avoids paying for idle headcount between project phases.",
      "Specialized expertise without a long-term commitment — a project-specific skill gap gets closed without adding a permanent salary line.",
    ],
  },

  workflow: [
    {
      step: "01",
      title: "Requirement & Fit Scoping",
      description:
        "We understand the specific skills, seniority, and team dynamic you need before proposing any engineer.",
    },
    {
      step: "02",
      title: "Vetted Candidate Matching",
      description:
        "We match you with pre-vetted engineers whose technical skill and working style fit your team, not just a resume that matches keywords.",
    },
    {
      step: "03",
      title: "Trial Integration",
      description:
        "The engineer joins your existing tools and workflow, with an initial period to confirm fit before scaling the engagement further.",
    },
    {
      step: "04",
      title: "Embedded Delivery",
      description:
        "The engineer works as part of your team's sprints and standups, reporting into your process rather than a separate parallel workflow.",
    },
    {
      step: "05",
      title: "Flexible Scaling or Transition",
      description:
        "The engagement scales up, down, or transitions to a different engineer as your project's needs change over time.",
    },
  ],

  implementation: {
    title: "What Actually Happens",
    highlight: "During the Engagement",
    intro:
      "No black box. Here's what you're involved in, and what to expect from day one.",
    deliverables: [
      "A clear scope of the skills and seniority level matched to your actual project",
      "Pre-vetted candidate profiles for your review before any commitment",
      "A short trial integration period to confirm fit within your team",
      "Direct participation in your existing sprint cadence, tools, and communication channels",
      "Transparent time tracking and progress reporting throughout the engagement",
      "Flexible terms to scale the engagement or transition engineers as needs change",
    ],
  },

  timeline: [
    {
      phase: "Scoping & Matching",
      duration: "3–7 days",
      description: "Requirement definition and candidate matching against your specific needs.",
    },
    {
      phase: "Trial Integration",
      duration: "1–2 weeks",
      description: "The engineer joins your workflow with a defined check-in to confirm fit.",
    },
    {
      phase: "Embedded Delivery",
      duration: "Ongoing",
      description: "Full integration into your team's sprints, tools, and delivery cadence.",
    },
    {
      phase: "Scale or Transition",
      duration: "As needed",
      description: "Engagement adjusts in size or personnel as your project evolves.",
    },
  ],

  technology: [
    { category: "Collaboration", items: ["Slack / Teams", "Jira / Linear", "Git-based version control"] },
    { category: "Engineering Skillsets", items: ["Full-stack web", "Mobile (iOS/Android)", "Cloud & DevOps", "AI/ML"] },
    { category: "Engagement Models", items: ["Full-time dedicated", "Part-time / fractional", "Project-based sprints"] },
  ],

  caseStudy: {
    illustrative: true,
    client: "A venture-backed product team",
    industry: "Software & Technology",
    challenge:
      "The team had budget approved for two senior backend engineers but faced a four-month hiring pipeline, while a committed roadmap milestone approached in six weeks.",
    approach:
      "We matched two vetted senior engineers who integrated into the team's existing sprint process within two weeks, working alongside the in-house hiring effort already underway.",
    outcome:
      "The roadmap milestone shipped on schedule, and the dedicated engineers transitioned smoothly once the team's own hires were onboarded months later.",
  },

  faqs: [
    {
      question: "How is this different from a typical outsourcing agency?",
      answer:
        "Engineers integrate directly into your existing team, tools, and sprint process rather than working as a separate, opaque unit — you get the visibility of an in-house hire with the flexibility of an engagement.",
    },
    {
      question: "How quickly can an engineer actually start?",
      answer:
        "Typically within one to two weeks of scoping, depending on the specific skill set required — far faster than a traditional hiring cycle.",
    },
    {
      question: "What if the engineer isn't the right fit for our team?",
      answer:
        "The trial integration period exists specifically for this — if fit isn't right, we adjust or replace the engineer quickly, without the cost of unwinding a permanent hire.",
    },
    {
      question: "Can we scale the engagement up or down as our project changes?",
      answer:
        "Yes — engagements are built to flex with real project demand, whether that means adding engineers for a critical sprint or scaling down once a milestone ships.",
    },
    {
      question: "Do we get full visibility into what the engineer is working on?",
      answer:
        "Yes — engineers work inside your existing project management and communication tools, so progress is as visible as it would be for any in-house team member.",
    },
  ],

  cta: {
    title: "Ready to Stop Letting an Open Role Stall Your Roadmap?",
    subtitle:
      "Tell us what skills and capacity you need. We'll show you how fast a vetted engineer can actually be integrated.",
    buttonLabel: "Book a Strategy Call",
  },

  relatedServices: ["custom-software-development", "it-consulting"],
  relatedSolutions: ["digital-transformation"],
  relatedIndustries: ["manufacturing", "colleges"],
};
