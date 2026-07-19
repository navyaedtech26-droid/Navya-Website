import { GitBranch, Gauge, ShieldCheck, Wallet, Activity } from "lucide-react";
import type { ServicePage } from "@/types";

export const cloudDevOpsServicePage: ServicePage = {
  slug: "cloud-devops",
  category: "solution",
  icon: GitBranch,
  title: "Cloud & DevOps",
  highlight: "Infrastructure and Delivery, Unified",

  heroSubtitle:
    "Cloud infrastructure and deployment pipelines are usually solved by two different vendors who don't talk to each other. We deliver both as one coherent system, secure infrastructure and the automated delivery pipeline that ships to it.",

  heroImage: "/vectors1/cloudsoln-clean.avif",

  seoDescription:
    "Cloud infrastructure and CI/CD delivered as one unified system, so releases stay fast, secure, and reliable instead of two disconnected setups.",

  seoKeywords: [
    "cloud and DevOps solutions",
    "cloud infrastructure and CI/CD Nepal",
    "unified cloud deployment platform",
    "infrastructure as code services",
    "automated deployment pipeline",
    "cloud cost and reliability optimization",
    "DevOps consulting and implementation",
  ],

  overview: {
    whatIsIt:
      "A unified cloud infrastructure and delivery pipeline (hosting, scaling, security, and automated deployment) designed and run as one coherent system.",
    whoNeedsIt:
      "Growing engineering teams whose infrastructure and deployment process were bolted together over time by different people, with no single coherent design.",
    businessValue:
      "Removes the coordination gap between infrastructure and deployment, so releases are fast and infrastructure is stable, without one team's fix breaking the other's setup.",
    benefits: [
      "Infrastructure and deployment pipeline designed as one system",
      "Automated, secure infrastructure that scales with real demand",
      "Faster, lower-risk delivery through unified CI/CD pipelines",
      "One team accountable for both the platform and how code reaches it",
    ],
  },

  businessProblem: {
    title: "Why Do Disjointed Infrastructure and Delivery",
    highlight: "Create Friction Nobody Owns?",
    intro:
      "Most engineering teams end up with infrastructure and deployment tooling that were set up separately over time, and neither piece was designed with the other in mind.",
    painPoints: [
      {
        title: "Infrastructure changes break the deployment pipeline",
        description:
          "A server or network change made without deployment tooling in mind quietly breaks the release process, and nobody notices until the next deploy fails.",
      },
      {
        title: "Nobody owns the whole system end to end",
        description:
          "Infrastructure and CI/CD get managed by different people or vendors, so a cross-cutting problem falls into a gap nobody's specifically responsible for.",
      },
      {
        title: "Cost and reliability trade-offs are made in isolation",
        description:
          "Infrastructure decisions made without deployment frequency in mind, or pipeline decisions made without infrastructure cost in mind, lead to a system that's neither efficient nor reliable.",
      },
      {
        title: "Security gaps fall between the cracks",
        description:
          "Infrastructure security and pipeline security are often each other's blind spot, leaving an access control or secrets-management gap that neither side is watching.",
      },
      {
        title: "Scaling the team means scaling the confusion",
        description:
          "As more engineers touch either infrastructure or deployment without a unified design, the system becomes harder to reason about and slower to change safely.",
      },
    ],
  },

  businessImpact: {
    title: "What Does a Unified Cloud & DevOps",
    highlight: "Approach Actually Change?",
    intro:
      "Designing infrastructure and delivery together (not as two separate projects) changes how reliably and quickly your team can ship.",
    points: [
      {
        icon: Gauge,
        title: "Infrastructure and pipeline changes stay in sync",
        description:
          "A single coherent design means a change on one side accounts for its effect on the other, eliminating the breakage that used to happen at the seams.",
      },
      {
        icon: Activity,
        title: "One team is accountable for the whole system",
        description:
          "Cross-cutting problems get resolved by a team that understands both infrastructure and delivery, instead of falling into a gap between vendors.",
      },
      {
        icon: Wallet,
        title: "Cost and reliability get optimized together",
        description:
          "Infrastructure sizing and deployment frequency are planned as one trade-off, avoiding the waste of decisions made in isolation.",
      },
      {
        icon: ShieldCheck,
        title: "Security is designed across the whole system",
        description:
          "Access control, secrets management, and infrastructure hardening are handled as one continuous responsibility, not two separate blind spots.",
      },
    ],
  },

  roi: {
    title: "Where Does the Return",
    highlight: "Actually Come From?",
    intro:
      "A unified approach pays back in fewer cross-system incidents, lower total infrastructure cost, and engineering time no longer spent untangling two disconnected setups.",
    points: [
      "Fewer deployment-breaking incidents. A coherent design prevents the seam failures that occur when infrastructure and pipeline are managed separately.",
      "Lower total infrastructure spend. Cost and reliability trade-offs planned together avoid the waste of isolated, uncoordinated decisions.",
      "Faster incident resolution. One team accountable for the whole system resolves cross-cutting issues faster than two separate vendors handing off blame.",
      "Reduced security exposure. Unified access control and secrets management close the gaps that fall between infrastructure and pipeline ownership.",
      "More engineering time spent building product. Less time is lost reconciling two systems that were never designed to work together.",
    ],
  },

  workflow: [
    {
      step: "01",
      title: "Current State Assessment",
      description:
        "We assess your existing infrastructure and deployment tooling together, mapping where the two currently create friction.",
    },
    {
      step: "02",
      title: "Unified Architecture Design",
      description:
        "We design infrastructure and CI/CD as one coherent system, sized and secured with both sides in mind from the start.",
    },
    {
      step: "03",
      title: "Implementation in Stages",
      description:
        "We roll out the unified design incrementally, starting with the highest-friction seam between infrastructure and delivery.",
    },
    {
      step: "04",
      title: "Monitoring & Security Hardening",
      description:
        "We implement monitoring and security controls across the whole system, closing the gaps that used to fall between teams.",
    },
    {
      step: "05",
      title: "Handoff & Ongoing Management",
      description:
        "We document the unified system and train your team, or continue managing it, so it stays coherent as it evolves.",
    },
  ],

  implementation: {
    title: "What Actually Happens",
    highlight: "During the Engagement",
    intro:
      "No black box. Here's what you're involved in, and what you're handed at the end.",
    deliverables: [
      "A documented assessment of current infrastructure and deployment friction points",
      "A unified architecture covering both hosting and delivery pipeline design",
      "Infrastructure as code and CI/CD pipelines configured to work together",
      "Cross-system monitoring, alerting, and security controls",
      "Cost and reliability trade-offs documented and optimized jointly",
      "Full documentation and training for ongoing team ownership",
    ],
  },

  timeline: [
    {
      phase: "Assessment",
      duration: "1 week",
      description: "Joint audit of infrastructure and deployment friction points.",
    },
    {
      phase: "Architecture Design",
      duration: "1–2 weeks",
      description: "Unified infrastructure and pipeline design.",
    },
    {
      phase: "Implementation",
      duration: "3–6 weeks",
      description: "Staged rollout of the unified system.",
    },
    {
      phase: "Handoff",
      duration: "1 week",
      description: "Documentation, training, and transition to ongoing ownership.",
    },
  ],

  technology: [
    { category: "Cloud Platforms", items: ["AWS", "Microsoft Azure", "Google Cloud Platform"] },
    { category: "Delivery", items: ["CI/CD pipelines", "Infrastructure as Code", "Containerization & orchestration"] },
    { category: "Operations", items: ["Unified monitoring & alerting", "Cost management", "Security & access controls"] },
  ],

  caseStudy: {
    illustrative: true,
    client: "A scaling e-commerce platform",
    industry: "E-Commerce",
    challenge:
      "Infrastructure was managed by one contractor and the deployment pipeline by another, with releases regularly breaking due to infrastructure changes neither side had visibility into.",
    approach:
      "We took over both infrastructure and deployment as a single unified system, redesigning the CI/CD pipeline and hosting architecture together.",
    outcome:
      "Deployment-breaking incidents caused by infrastructure changes have stopped, and one team now owns the full system end to end instead of two disconnected vendors handing off blame.",
  },

  faqs: [
    {
      question: "We already have separate infrastructure and DevOps vendors. Can you take over both?",
      answer:
        "Yes. This is a common starting point. We assess the existing setup from both sides and typically consolidate ownership so the seam that was causing friction disappears.",
    },
    {
      question: "Do you manage the infrastructure ongoing, or hand it off after setup?",
      answer:
        "Both are available. Some clients prefer full documentation and internal handoff, others prefer we continue managing the unified system directly.",
    },
    {
      question: "Which cloud provider do you recommend?",
      answer:
        "It depends on your existing stack and team familiarity. We assess this honestly during the audit rather than defaulting to one provider.",
    },
    {
      question: "Will this reduce our cloud costs?",
      answer:
        "In most cases, yes. Planning infrastructure sizing and deployment frequency together typically removes waste that isolated decisions introduce, though the specific savings depend on your current setup.",
    },
    {
      question: "How disruptive is the transition to a unified system?",
      answer:
        "We roll out in stages, starting with the highest-friction point, so your team keeps shipping throughout rather than pausing for a full rebuild.",
    },
  ],

  cta: {
    title: "Ready to Stop Managing Infrastructure and Delivery Separately?",
    subtitle:
      "Tell us where the friction shows up between your infrastructure and your releases. We'll show you what a unified system fixes.",
    buttonLabel: "Book a Strategy Call",
  },

  relatedServices: ["cloud-services", "devops"],
  relatedSolutions: ["digital-transformation"],
  relatedIndustries: ["manufacturing", "hospitals"],
};
