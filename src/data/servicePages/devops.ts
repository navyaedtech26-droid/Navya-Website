import { Wrench, Rocket, ShieldAlert, Boxes, Activity } from "lucide-react";
import type { ServicePage } from "@/types";

export const devopsServicePage: ServicePage = {
  slug: "devops",
  category: "service",
  icon: Wrench,
  title: "DevOps",
  highlight: "Deployments Without the Dread",

  heroSubtitle:
    "If every release feels like a small emergency, the problem isn't your team — it's the absence of a pipeline built to catch mistakes before they reach production. We build the CI/CD, infrastructure, and monitoring that make shipping routine again.",

  heroImage: "/vector/devopps.avif",

  seoDescription:
    "DevOps services — CI/CD, infrastructure as code, and monitoring — that turn risky manual releases into routine, low-drama deployments.",

  seoKeywords: [
    "DevOps services",
    "CI/CD pipeline setup Nepal",
    "infrastructure as code",
    "Kubernetes and containerization",
    "deployment automation",
    "monitoring and logging setup",
    "site reliability engineering",
  ],

  overview: {
    whatIsIt:
      "CI/CD pipelines, infrastructure as code, and monitoring built around your existing stack — engineered to make deployments fast, repeatable, and safe.",
    whoNeedsIt:
      "Engineering teams whose releases are manual, whose incidents take too long to detect, or whose infrastructure is defined only in someone's memory.",
    businessValue:
      "Converts deployment anxiety and reactive firefighting into a predictable, monitored process your team can run without dreading it.",
    benefits: [
      "Automated CI/CD that turns releases into a routine, low-risk event",
      "Infrastructure as code that removes tribal knowledge as a single point of failure",
      "Containerized, orchestrated environments that scale predictably",
      "Monitoring and logging that catch problems before customers do",
    ],
  },

  businessProblem: {
    title: "Why Are Manual Releases a Risk",
    highlight: "Your Team Absorbs Every Time?",
    intro:
      "Most engineering teams don't lack skill — they lack a pipeline that catches mistakes before they ship, and the manual gap keeps costing time and trust every release.",
    painPoints: [
      {
        title: "Every deployment is a manual, high-stakes process",
        description:
          "Without automated pipelines, releases depend on someone remembering every step correctly, and a missed one becomes an incident instead of a footnote.",
      },
      {
        title: "Infrastructure exists only in someone's head",
        description:
          "Server configuration and environment setup live in one engineer's memory rather than in code, making the whole team dependent on that person being available.",
      },
      {
        title: "Incidents are discovered by customers, not dashboards",
        description:
          "Without proper monitoring and alerting, the first sign of an outage is often a support ticket or a social media complaint, not an internal alert.",
      },
      {
        title: "Scaling environments takes days instead of minutes",
        description:
          "Provisioning a new environment or replicating production for testing is a manual, error-prone task that slows down every new initiative.",
      },
      {
        title: "Rollbacks are slower than the outage itself",
        description:
          "Without a proper deployment pipeline, reverting a bad release takes longer than the mistake that caused it — extending downtime unnecessarily.",
      },
      {
        title: "Releases are rare because they're risky",
        description:
          "Teams start shipping less often to avoid the pain of deployment, which slows down the business's ability to respond to customers and competitors.",
      },
    ],
  },

  businessImpact: {
    title: "What a Proper DevOps Pipeline",
    highlight: "Actually Changes?",
    intro:
      "A well-built pipeline doesn't just make engineers happier — it changes how fast the business can respond and how much confidence customers can place in uptime.",
    points: [
      {
        icon: Rocket,
        title: "Releases become routine, not risky",
        description:
          "Automated CI/CD pipelines test and deploy code the same way every time, turning what used to be a stressful event into a background process.",
      },
      {
        icon: Boxes,
        title: "Environments are reproducible in minutes",
        description:
          "Infrastructure as code means a new environment — staging, testing, disaster recovery — spins up identically to production in minutes, not days.",
      },
      {
        icon: Activity,
        title: "Problems get caught before customers notice",
        description:
          "Centralized monitoring and alerting surface issues the moment they start, giving your team a head start on resolving them quietly.",
      },
      {
        icon: ShieldAlert,
        title: "Rollbacks take seconds, not hours",
        description:
          "A proper deployment pipeline makes reverting to the last known-good release a one-command action, cutting incident duration dramatically.",
      },
    ],
  },

  roi: {
    title: "Where Does the Return",
    highlight: "Actually Come From?",
    intro:
      "DevOps investment pays back in deployment frequency, incident duration, and engineering hours no longer spent firefighting — all measurable against your current baseline.",
    points: [
      "Shorter incident duration — automated rollback and monitoring cut the time between something breaking and it being fixed.",
      "More frequent, lower-risk releases — automated pipelines let your team ship smaller, safer changes more often instead of large, risky batches.",
      "Reduced key-person dependency — infrastructure as code documents your environment in a repository, not in one engineer's memory.",
      "Faster new environment setup — reproducible infrastructure turns a multi-day provisioning task into a scripted, minutes-long process.",
      "Fewer engineering hours lost to firefighting — proactive monitoring frees your team to build product instead of chasing undetected issues.",
    ],
  },

  workflow: [
    {
      step: "01",
      title: "Current State Assessment",
      description:
        "We audit your existing deployment process, infrastructure, and monitoring gaps before recommending any change.",
    },
    {
      step: "02",
      title: "Pipeline & Architecture Design",
      description:
        "We design the CI/CD pipeline and infrastructure-as-code approach matched to your stack and team's workflow, not a generic template.",
    },
    {
      step: "03",
      title: "Implementation in Stages",
      description:
        "We build and roll out incrementally — starting with the highest-risk gap — so your team adapts without disruption to ongoing work.",
    },
    {
      step: "04",
      title: "Monitoring & Alerting Setup",
      description:
        "Centralized logging, monitoring, and alerting are configured so your team has visibility from day one, not just after the first incident.",
    },
    {
      step: "05",
      title: "Team Handoff & Ongoing Support",
      description:
        "We document everything and train your team on the new pipeline, staying on to support it as your infrastructure evolves.",
    },
  ],

  implementation: {
    title: "What Actually Happens",
    highlight: "During the Engagement",
    intro:
      "No black box. Here's what you're involved in, and what you're handed at the end.",
    deliverables: [
      "A documented assessment of your current deployment and infrastructure gaps",
      "CI/CD pipelines configured for your actual codebase and release cadence",
      "Infrastructure defined as code, version-controlled and reproducible",
      "Centralized monitoring, logging, and alerting wired into your team's existing tools",
      "Containerization and orchestration where it fits your workload, not by default",
      "Documentation and hands-on training so your team owns the pipeline going forward",
    ],
  },

  timeline: [
    {
      phase: "Assessment",
      duration: "3–5 days",
      description: "Audit of current deployment process, infrastructure, and monitoring gaps.",
    },
    {
      phase: "Pipeline Design",
      duration: "1 week",
      description: "CI/CD and infrastructure-as-code architecture matched to your stack.",
    },
    {
      phase: "Implementation",
      duration: "2–5 weeks",
      description: "Staged rollout of pipelines, infrastructure code, and monitoring.",
    },
    {
      phase: "Handoff & Training",
      duration: "1 week",
      description: "Documentation, team training, and a transition to ongoing ownership.",
    },
  ],

  technology: [
    { category: "CI/CD", items: ["GitHub Actions", "GitLab CI", "Jenkins"] },
    { category: "Infrastructure as Code", items: ["Terraform", "Ansible", "CloudFormation"] },
    { category: "Containers & Orchestration", items: ["Docker", "Kubernetes"] },
    { category: "Monitoring", items: ["Centralized logging", "Alerting & on-call tooling", "Performance dashboards"] },
  ],

  caseStudy: {
    illustrative: true,
    client: "A growing fintech engineering team",
    industry: "Financial Technology",
    challenge:
      "Releases were manual, deployed by a single senior engineer who understood the server setup, with no monitoring to catch issues before customers reported them.",
    approach:
      "We built an automated CI/CD pipeline, moved infrastructure into version-controlled code, and set up centralized monitoring and alerting.",
    outcome:
      "Deployments no longer depend on one person, releases ship more frequently with less risk, and the team now catches issues before customers notice them.",
  },

  faqs: [
    {
      question: "We're a small team — is DevOps overkill for us?",
      answer:
        "Not necessarily. We scope the pipeline to your team's actual size and release frequency — a lightweight CI/CD setup for a small team looks very different from an enterprise pipeline, and we won't oversell you one you don't need.",
    },
    {
      question: "Will this disrupt our current development process?",
      answer:
        "We roll out changes incrementally, starting with the highest-risk gap, so your team keeps shipping throughout rather than pausing for a full overhaul.",
    },
    {
      question: "Do we need Kubernetes?",
      answer:
        "Only if your workload actually benefits from it. Many teams are well served by simpler container deployment — we'll recommend based on your actual scale, not by default.",
    },
    {
      question: "Who owns the pipeline after you're done?",
      answer:
        "Your team does. We document everything and train your engineers directly, so the pipeline isn't dependent on us being on retainer — though ongoing support is available if you want it.",
    },
    {
      question: "How quickly will we see fewer incidents?",
      answer:
        "Monitoring and alerting improvements show results almost immediately. Deployment risk reduction compounds over the following weeks as the new pipeline becomes the team's default habit.",
    },
  ],

  cta: {
    title: "Ready to Make Deployments Boring Again?",
    subtitle:
      "Tell us what breaks during your releases. We'll show you exactly what a proper pipeline removes.",
    buttonLabel: "Book a Strategy Call",
  },

  relatedServices: ["cloud-services", "it-consulting"],
  relatedSolutions: ["cloud-devops"],
  relatedIndustries: ["manufacturing", "hospitals"],
};
