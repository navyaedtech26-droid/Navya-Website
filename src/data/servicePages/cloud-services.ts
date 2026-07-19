import { Cloud, ShieldCheck, Gauge, Wallet, RefreshCw } from "lucide-react";
import type { ServicePage } from "@/types";

export const cloudServicesServicePage: ServicePage = {
  slug: "cloud-services",
  category: "service",
  icon: Cloud,
  title: "Cloud Services",
  highlight: "Infrastructure That Scales Without Drama",

  heroSubtitle:
    "A server that goes down at the wrong moment doesn't just cost you uptime. It costs you the trust you spent months building. We design cloud infrastructure that stays invisible, because the best infrastructure is the kind nobody ever has to think about.",

  heroImage: "/vector/cloud-infrastructure.avif",

  seoDescription:
    "Secure, scalable cloud services across AWS, Azure, and GCP, infrastructure that handles traffic spikes and bills for what you actually use.",

  seoKeywords: [
    "cloud services for business",
    "AWS Azure GCP migration Nepal",
    "cloud infrastructure management",
    "serverless architecture",
    "cloud security and compliance",
    "cloud cost optimization",
    "scalable cloud hosting",
  ],

  overview: {
    whatIsIt:
      "Secure, scalable cloud infrastructure (migration, architecture, and ongoing management across AWS, Azure, and Google Cloud) built for your actual traffic and compliance needs.",
    whoNeedsIt:
      "Businesses outgrowing shared hosting, facing unpredictable traffic, or needing the security posture their customers and regulators now expect.",
    businessValue:
      "Removes downtime risk and unpredictable hosting cost, replacing both with infrastructure that scales automatically and bills for what you actually use.",
    benefits: [
      "Multi-region resilience that prevents costly downtime",
      "Serverless and auto-scaling architectures that match cost to real usage",
      "Enterprise-grade encryption and compliance built in from the start",
      "Faster deployments through automated, repeatable infrastructure",
    ],
  },

  businessProblem: {
    title: "Why Is Fragile Infrastructure a Risk",
    highlight: "You Don't See Until It Fails?",
    intro:
      "Most businesses only discover their infrastructure's weak points during an outage, a traffic spike, or a security audit, all moments when the cost of finding out is highest.",
    painPoints: [
      {
        title: "A single traffic spike takes the whole system down",
        description:
          "A viral post, a sale, or a seasonal surge overwhelms infrastructure that was never architected to scale automatically, turning a good day into an outage.",
      },
      {
        title: "You're paying for capacity you don't use",
        description:
          "Fixed server provisioning means paying around the clock for peak capacity that sits idle most of the time, a cost that compounds every month.",
      },
      {
        title: "Deployments are manual and risky",
        description:
          "Without CI/CD automation, every release is a manual, error-prone process that a junior mistake can turn into an incident.",
      },
      {
        title: "Security and compliance are an afterthought",
        description:
          "Data encryption, access controls, and audit trails get bolted on reactively after a client or regulator asks, instead of being designed in from the start.",
      },
      {
        title: "There's no visibility until something breaks",
        description:
          "Without monitoring and alerting, the first sign of a problem is often a customer complaint, not a dashboard warning your team caught in advance.",
      },
      {
        title: "One region, one point of failure",
        description:
          "Infrastructure hosted in a single location means a regional outage or provider incident takes your entire business offline with it.",
      },
    ],
  },

  businessImpact: {
    title: "What Properly Architected Cloud",
    highlight: "Actually Changes?",
    intro:
      "The right cloud architecture doesn't just prevent outages. It changes how your cost, deployment speed, and security posture behave under real conditions.",
    points: [
      {
        icon: Gauge,
        title: "Traffic spikes stop being a threat",
        description:
          "Auto-scaling infrastructure absorbs sudden demand automatically, so a viral moment becomes an opportunity instead of an outage.",
      },
      {
        icon: Wallet,
        title: "Cost tracks actual usage",
        description:
          "Serverless and right-sized architectures mean you stop paying for idle peak capacity. Cost scales with real demand, not worst-case provisioning.",
      },
      {
        icon: RefreshCw,
        title: "Releases become routine, not risky",
        description:
          "Automated CI/CD pipelines turn deployments into a repeatable, low-drama process, cutting both release time and the chance of human error.",
      },
      {
        icon: ShieldCheck,
        title: "Security and compliance are provable, not assumed",
        description:
          "Encryption, access controls, and audit logging are built into the architecture, so a compliance question gets a documented answer instead of a scramble.",
      },
    ],
  },

  roi: {
    title: "Where Does the Return",
    highlight: "Actually Come From?",
    intro:
      "The return on proper cloud architecture shows up in avoided downtime cost and a hosting bill that finally matches real usage.",
    points: [
      "Avoided downtime cost. Multi-region, auto-scaling infrastructure prevents the revenue and reputation loss a single outage causes.",
      "Lower hosting spend. Serverless and right-sized provisioning eliminates paying around the clock for peak-only capacity.",
      "Faster time-to-market. Automated deployment pipelines mean new features reach customers in hours, not the days a manual release process takes.",
      "Reduced security risk exposure. Built-in encryption and access controls lower the likelihood and cost of a breach or compliance failure.",
      "Less engineering time on infrastructure firefighting. A stable, monitored environment frees your team to build product instead of babysitting servers.",
    ],
  },

  workflow: [
    {
      step: "01",
      title: "Infrastructure Audit",
      description:
        "We assess your current hosting, traffic patterns, and failure points before recommending any architecture change.",
    },
    {
      step: "02",
      title: "Architecture Design",
      description:
        "We design the target environment (cloud provider, scaling model, and security controls) matched to your actual load and compliance needs.",
    },
    {
      step: "03",
      title: "Migration Planning & Execution",
      description:
        "We plan the cutover to minimize risk, migrating in stages with rollback points rather than a single high-stakes switch.",
    },
    {
      step: "04",
      title: "CI/CD & Monitoring Setup",
      description:
        "Automated deployment pipelines and monitoring/alerting are configured so releases and incidents are both handled predictably.",
    },
    {
      step: "05",
      title: "Handover & Ongoing Management",
      description:
        "We hand over a documented environment and offer ongoing management, so your infrastructure keeps improving after go-live.",
    },
  ],

  implementation: {
    title: "What Actually Happens",
    highlight: "During the Migration",
    intro:
      "No black box. Here's what you're involved in, and what you're handed at the end.",
    deliverables: [
      "A documented architecture diagram of the target cloud environment before migration begins",
      "A staged migration plan with rollback points at every step",
      "CI/CD pipelines configured for your actual deployment workflow",
      "Monitoring, alerting, and logging wired in from day one",
      "Security controls (encryption, access management, backups) documented and tested",
      "A handover package with full infrastructure documentation and a support plan",
    ],
  },

  timeline: [
    {
      phase: "Audit & Architecture",
      duration: "1–2 weeks",
      description: "Current-state assessment and a target architecture design.",
    },
    {
      phase: "Migration Prep",
      duration: "1–2 weeks",
      description: "Staging environment setup, pipeline configuration, and a rollback plan.",
    },
    {
      phase: "Migration & Cutover",
      duration: "1–3 weeks",
      description: "Staged migration with monitoring at every checkpoint.",
    },
    {
      phase: "Stabilization",
      duration: "1–2 weeks",
      description: "Post-migration monitoring, tuning, and handover.",
    },
  ],

  technology: [
    { category: "Cloud Platforms", items: ["AWS", "Microsoft Azure", "Google Cloud Platform"] },
    { category: "Architecture", items: ["Serverless (Lambda/Functions)", "Kubernetes & containers", "Auto-scaling groups"] },
    { category: "DevOps & Monitoring", items: ["CI/CD pipelines", "Infrastructure as Code", "Centralized logging & alerting"] },
    { category: "Security", items: ["End-to-end encryption", "IAM & access controls", "Automated backups"] },
  ],

  caseStudy: {
    illustrative: true,
    client: "A growing SaaS platform",
    industry: "Software & Technology",
    challenge:
      "The platform was hosted on a single fixed server that repeatedly struggled during traffic spikes, with no automated deployment pipeline and manual, error-prone releases.",
    approach:
      "We migrated the platform to an auto-scaling cloud architecture with CI/CD pipelines and centralized monitoring, sized to real traffic patterns instead of guesswork.",
    outcome:
      "Traffic spikes are now absorbed automatically, deployments run through an automated pipeline instead of manual steps, and hosting cost tracks actual usage.",
  },

  faqs: [
    {
      question: "Which cloud provider should we use (AWS, Azure, or GCP)?",
      answer:
        "It depends on your existing stack, compliance requirements, and team familiarity. We assess this honestly during the audit rather than defaulting to one provider.",
    },
    {
      question: "Can you migrate us without downtime?",
      answer:
        "In most cases, yes, through a staged migration with rollback points. We'll be upfront if your specific setup requires a brief maintenance window.",
    },
    {
      question: "Will moving to the cloud actually reduce our hosting cost?",
      answer:
        "For workloads with variable traffic, usually yes. Serverless and auto-scaling architectures mean you stop paying for idle peak capacity. For steady, predictable load, the savings are more modest, and we'll tell you that honestly.",
    },
    {
      question: "Do you handle security compliance requirements like SOC 2 or GDPR?",
      answer:
        "We build the infrastructure controls (encryption, access management, audit logging) that compliance frameworks require, and can work alongside your compliance team on formal certification.",
    },
    {
      question: "Do you manage the infrastructure after migration, or just build it?",
      answer:
        "Both are available. Many clients hand over documentation and manage in-house; others prefer an ongoing management arrangement. We scope either based on your team's capacity.",
    },
  ],

  cta: {
    title: "Ready to Stop Worrying About Your Infrastructure?",
    subtitle:
      "Tell us what's breaking under load or costing too much to run. We'll show you exactly what a properly architected environment fixes.",
    buttonLabel: "Book a Strategy Call",
  },

  relatedServices: ["devops", "custom-software-development"],
  relatedSolutions: ["cloud-devops", "digital-transformation"],
  relatedIndustries: ["manufacturing", "hospitals", "colleges"],
};
