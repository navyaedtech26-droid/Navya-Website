import { Receipt, Wallet, Clock3, ShieldCheck, RefreshCw } from "lucide-react";
import type { ServicePage } from "@/types";

export const billingInvoicingServicePage: ServicePage = {
  slug: "billing-invoicing",
  category: "solution",
  icon: Receipt,
  title: "Billing & Invoicing",
  highlight: "Payments That Accelerate Cash Flow",

  heroSubtitle:
    "Every day between a completed job and a paid invoice is cash tied up you can't use. We build billing systems that generate, send, and chase invoices automatically — so cash flow depends on your terms, not on manual admin catching up.",

  heroImage: "/vectors1/billing-clean.avif",

  seoDescription:
    "Automated billing and invoicing software that generates, sends, and chases invoices for you — shortening your cash cycle and cutting admin hours.",

  seoKeywords: [
    "billing and invoicing software",
    "automated invoicing system Nepal",
    "recurring billing platform",
    "custom invoicing solution",
    "payment collection automation",
    "accounts receivable software",
    "invoice management system",
  ],

  overview: {
    whatIsIt:
      "An automated billing and invoicing system that generates, sends, and tracks payments against your actual pricing and payment terms.",
    whoNeedsIt:
      "Businesses currently generating invoices manually, chasing overdue payments by hand, or managing recurring billing through spreadsheets.",
    businessValue:
      "Shortens the gap between work completed and payment received, while removing the manual admin hours spent generating and tracking invoices.",
    benefits: [
      "Invoices generated and sent automatically on your schedule",
      "Automated payment reminders that reduce days-sales-outstanding",
      "Recurring and subscription billing handled without manual entry",
      "A clear, real-time view of what's paid, pending, and overdue",
    ],
  },

  businessProblem: {
    title: "Why Is Manual Invoicing",
    highlight: "Quietly Extending Your Cash Cycle?",
    intro:
      "Most businesses don't notice how much cash is tied up in a slow, manual billing process until they calculate exactly how long invoices actually sit unpaid.",
    painPoints: [
      {
        title: "Invoices go out late because someone has to remember to send them",
        description:
          "Without automation, invoice generation depends on a person's bandwidth that week, so delays compound before the payment clock even starts.",
      },
      {
        title: "Overdue payments are chased manually, if at all",
        description:
          "Following up on a late invoice means someone remembering to check, then drafting a reminder by hand — a task that's easy to deprioritize under pressure.",
      },
      {
        title: "Recurring billing is managed through spreadsheets",
        description:
          "Subscription or retainer clients get billed through manually re-created invoices each cycle, increasing both labor cost and the risk of a missed or incorrect charge.",
      },
      {
        title: "There's no single view of what's actually outstanding",
        description:
          "Without a centralized system, knowing exactly how much revenue is unpaid at any moment means manually checking multiple records.",
      },
      {
        title: "Payment errors damage client relationships",
        description:
          "Manually created invoices are prone to pricing or quantity mistakes that create friction with clients and delay payment even further while disputes are resolved.",
      },
      {
        title: "Reconciling payments against invoices is a manual chore",
        description:
          "Matching incoming bank payments to the correct invoice takes manual cross-checking, adding administrative overhead every single billing cycle.",
      },
    ],
  },

  businessImpact: {
    title: "What Automated Billing",
    highlight: "Actually Changes?",
    intro:
      "Automating invoicing doesn't just save admin time — it directly shortens the real gap between completed work and cash in the bank.",
    points: [
      {
        icon: Clock3,
        title: "Invoices go out the moment they're due, every time",
        description:
          "Automated generation and sending remove the delay caused by someone needing to remember — the payment clock starts as early as possible.",
      },
      {
        icon: RefreshCw,
        title: "Follow-ups happen without anyone chasing manually",
        description:
          "Automated reminder sequences follow up on overdue invoices consistently, recovering payments that used to slip through a busy team's attention.",
      },
      {
        icon: Wallet,
        title: "Recurring billing runs without manual re-entry",
        description:
          "Subscription and retainer invoices generate automatically each cycle, eliminating both the labor and the error risk of manual recreation.",
      },
      {
        icon: ShieldCheck,
        title: "You get one accurate view of receivables",
        description:
          "A live dashboard of paid, pending, and overdue invoices replaces manual record-checking, giving finance an accurate picture at any moment.",
      },
    ],
  },

  roi: {
    title: "Where Does the Return",
    highlight: "Actually Come From?",
    intro:
      "Billing automation's return is directly measurable in reduced days-sales-outstanding and admin hours reclaimed from manual invoice generation.",
    points: [
      "Shorter days-sales-outstanding — invoices sent immediately and followed up automatically shorten the average time to payment.",
      "Reduced admin hours — automated generation and reminders remove the manual work of creating and chasing invoices by hand.",
      "Fewer billing errors — automation reduces the pricing and quantity mistakes that manually created invoices are prone to.",
      "Faster reconciliation — automated payment matching removes the manual cross-checking between bank records and invoices.",
      "Improved client relationships — accurate, timely invoices reduce the friction and disputes that late or incorrect billing causes.",
    ],
  },

  workflow: [
    {
      step: "01",
      title: "Billing Process & Terms Review",
      description:
        "We map your current invoicing process, pricing structure, and payment terms before configuring any automation.",
    },
    {
      step: "02",
      title: "System Design & Rule Configuration",
      description:
        "We design invoice templates, reminder sequences, and recurring billing rules to match your actual pricing model.",
    },
    {
      step: "03",
      title: "Payment Gateway Integration",
      description:
        "We connect the billing system to your preferred payment gateways so clients can pay directly from the invoice.",
    },
    {
      step: "04",
      title: "Testing & Historical Data Migration",
      description:
        "We test the full billing cycle against real scenarios and migrate existing client and invoice history into the new system.",
    },
    {
      step: "05",
      title: "Rollout & Finance Team Training",
      description:
        "We roll out the system with your finance team trained directly, and monitor the first billing cycles closely.",
    },
  ],

  implementation: {
    title: "What Actually Happens",
    highlight: "During the Build",
    intro:
      "No black box. Here's what you're involved in, and what you're handed at the end.",
    deliverables: [
      "A documented billing process and pricing rule map before configuration begins",
      "Automated invoice generation matched to your actual billing cycle",
      "Configured reminder sequences for overdue payments",
      "Payment gateway integration for direct online payment",
      "Migrated historical client and invoice data",
      "Finance team training and a documented admin guide",
    ],
  },

  timeline: [
    {
      phase: "Process Review",
      duration: "3–5 days",
      description: "Billing and pricing structure audit before configuration.",
    },
    {
      phase: "Build & Configuration",
      duration: "2–3 weeks",
      description: "Invoice automation, reminders, and gateway integration.",
    },
    {
      phase: "Testing & Migration",
      duration: "3–5 days",
      description: "Full-cycle testing and historical data migration.",
    },
    {
      phase: "Rollout & Training",
      duration: "3–5 days",
      description: "Finance team training and a monitored first billing cycle.",
    },
  ],

  technology: [
    { category: "Core Platform", items: ["Custom billing engine", "Recurring subscription logic"] },
    { category: "Payments", items: ["Payment gateway integration", "Automated reconciliation"] },
    { category: "Reporting", items: ["Receivables dashboards", "Aging reports", "Cash flow visibility"] },
  ],

  caseStudy: {
    illustrative: true,
    client: "A B2B services agency",
    industry: "Professional Services",
    challenge:
      "Monthly retainer invoices were recreated manually for each client, with overdue accounts followed up inconsistently, extending the average payment cycle well past agreed terms.",
    approach:
      "We built an automated billing system with recurring invoice generation, automated reminder sequences, and direct payment gateway integration.",
    outcome:
      "Invoices now go out automatically every cycle, overdue reminders follow up consistently without manual effort, and the average time to payment has shortened measurably.",
  },

  faqs: [
    {
      question: "Can the system handle both one-time and recurring billing?",
      answer:
        "Yes — the platform is built to handle project-based invoices, recurring subscriptions, and retainer billing within the same system.",
    },
    {
      question: "Will clients be able to pay directly from the invoice?",
      answer:
        "Yes, we integrate your preferred payment gateway so clients can pay online directly, and payments reconcile against the invoice automatically.",
    },
    {
      question: "How are overdue payments followed up?",
      answer:
        "Automated reminder sequences trigger at intervals you define, escalating tone as an invoice ages, without requiring manual tracking.",
    },
    {
      question: "Can you migrate our existing client and invoice history?",
      answer:
        "Yes — historical billing data is migrated as part of the build so your records stay complete in the new system.",
    },
    {
      question: "Does this integrate with our existing accounting software?",
      answer:
        "In most cases, yes, through API integration — so billing data syncs with your accounting records rather than requiring double entry.",
    },
  ],

  cta: {
    title: "Ready to Stop Waiting on Invoices You Forgot to Send?",
    subtitle:
      "Tell us how billing works today. We'll show you exactly what automation would recover in cash flow.",
    buttonLabel: "Book a Strategy Call",
  },

  relatedServices: ["custom-software-development"],
  relatedSolutions: ["crm-systems", "erp-systems"],
  relatedIndustries: ["hospitals", "schools", "retail"],
};
