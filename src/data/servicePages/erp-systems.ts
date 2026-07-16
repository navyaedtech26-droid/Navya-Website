import { Server, Layers, Wallet, Clock3, ShieldCheck } from "lucide-react";
import type { ServicePage } from "@/types";

export const erpSystemsServicePage: ServicePage = {
  slug: "erp-systems",
  category: "solution",
  icon: Server,
  title: "ERP Systems",
  highlight: "One Platform for Every Department",

  heroSubtitle:
    "Finance runs one system, HR runs another, inventory a third — and every month-end close means reconciling all of them by hand. We build ERP platforms that unify finance, HR, inventory, and operations into a single source of truth.",

  heroImage: "/vectors1/erpsolutions-clean.avif",

  seoDescription:
    "Custom ERP systems that unify finance, HR, inventory, and operations into one platform, replacing manual month-end reconciliation for good.",

  seoKeywords: [
    "ERP system development",
    "custom ERP software Nepal",
    "enterprise resource planning solution",
    "unified business management system",
    "ERP for manufacturing and retail",
    "inventory finance HR integration",
    "ERP implementation services",
  ],

  overview: {
    whatIsIt:
      "A custom-built ERP platform that unifies finance, HR, inventory, and operations data into one system, configured around how your business actually runs.",
    whoNeedsIt:
      "Growing businesses running finance, HR, and operations on separate tools, where month-end reporting means manually reconciling numbers across systems.",
    businessValue:
      "Replaces the recurring cost of manual cross-departmental reconciliation with one platform that keeps every team's data in sync automatically.",
    benefits: [
      "One dashboard for finance, HR, inventory, and operations data",
      "Automated invoicing, payroll, and ledger posting",
      "Real-time, audit-ready reporting instead of month-end scrambles",
      "A system configured to your process, not a rigid generic module",
    ],
  },

  businessProblem: {
    title: "Why Are Disconnected Departmental Systems",
    highlight: "Quietly Draining Your Team?",
    intro:
      "Most growing businesses don't choose to run five separate systems — they accumulate them one department at a time, until nobody has one accurate view of the whole operation.",
    painPoints: [
      {
        title: "Month-end close means manual reconciliation across systems",
        description:
          "Finance pulls numbers from separate inventory, sales, and payroll tools and reconciles them by hand every month, turning a routine close into a multi-day scramble.",
      },
      {
        title: "HR, finance, and operations each see a different picture",
        description:
          "Headcount, payroll, and departmental budgets live in disconnected systems, so a simple cost question requires three different people to answer.",
      },
      {
        title: "Inventory and finance are never quite in sync",
        description:
          "Stock movements recorded in an inventory tool take time to reflect in the accounting ledger, creating a lag that makes real-time margin visibility impossible.",
      },
      {
        title: "Payroll and invoicing are manual, error-prone processes",
        description:
          "Without automation, payroll runs and invoice generation depend on manual data entry, increasing both the labor cost and the risk of a costly mistake.",
      },
      {
        title: "Audits take weeks instead of hours",
        description:
          "Producing an audit-ready report means assembling data from every disconnected system by hand, turning a routine compliance task into a major project.",
      },
      {
        title: "Growth multiplies the reconciliation burden",
        description:
          "Every new branch, product line, or hire adds more data that has to be manually reconciled across the same disconnected systems, compounding the problem as you scale.",
      },
    ],
  },

  businessImpact: {
    title: "What a Unified ERP",
    highlight: "Actually Changes?",
    intro:
      "A single platform doesn't just save time — it changes how confidently leadership can answer questions about the state of the business at any moment.",
    points: [
      {
        icon: Layers,
        title: "Every department reads from the same data",
        description:
          "Finance, HR, and operations pull from one shared system, eliminating the reconciliation work between disconnected tools entirely.",
      },
      {
        icon: Clock3,
        title: "Month-end close shrinks from days to hours",
        description:
          "With inventory, sales, and payroll already synced in real time, closing the books becomes a review step instead of a data-gathering exercise.",
      },
      {
        icon: Wallet,
        title: "Payroll and invoicing run on autopilot",
        description:
          "Automated posting and invoice generation remove the manual entry that used to consume finance team hours and introduce costly errors.",
      },
      {
        icon: ShieldCheck,
        title: "Audits become a report, not a project",
        description:
          "Real-time, audit-ready data means compliance reporting is generated on demand instead of assembled manually under deadline pressure.",
      },
    ],
  },

  roi: {
    title: "Where Does the Return",
    highlight: "Actually Come From?",
    intro:
      "ERP's return shows up directly in finance and operations hours reclaimed, plus the errors and delays a unified system prevents.",
    points: [
      "Faster month-end close — real-time synced data removes the manual reconciliation that currently extends the close by days.",
      "Reduced payroll and invoicing errors — automation removes the manual data entry steps most prone to costly mistakes.",
      "Lower audit preparation cost — audit-ready reporting is generated on demand instead of assembled manually under time pressure.",
      "Better margin visibility — real-time inventory-to-finance sync means leadership sees true margins immediately, not weeks later.",
      "A system that scales with growth — new branches or product lines add data to one existing system instead of a new reconciliation burden.",
    ],
  },

  workflow: [
    {
      step: "01",
      title: "Departmental Process Mapping",
      description:
        "We map how finance, HR, inventory, and operations actually work today, including the manual bridges between them.",
    },
    {
      step: "02",
      title: "Module & Architecture Design",
      description:
        "We design the ERP's structure and modules around your specific processes, not a rigid template built for a generic business.",
    },
    {
      step: "03",
      title: "Build & Data Migration",
      description:
        "We build the platform in reviewable stages and migrate existing financial, HR, and inventory data carefully.",
    },
    {
      step: "04",
      title: "Cross-Department Testing",
      description:
        "We test the full data flow across departments — not just individual modules — to confirm the unified picture is accurate.",
    },
    {
      step: "05",
      title: "Rollout & Training",
      description:
        "We roll out department by department with hands-on training, so adoption doesn't stall on unfamiliarity with the new system.",
    },
  ],

  implementation: {
    title: "What Actually Happens",
    highlight: "During the Build",
    intro:
      "No black box. Here's what you're involved in, and what you're handed at the end.",
    deliverables: [
      "A documented process map across finance, HR, inventory, and operations before the build begins",
      "A working staging environment to review at every module milestone",
      "Automated payroll, invoicing, and ledger posting configured to your accounting rules",
      "Real-time, audit-ready reporting dashboards",
      "Role-based access so each department sees exactly what it needs",
      "Full documentation and training for every department using the system",
    ],
  },

  timeline: [
    {
      phase: "Process Mapping",
      duration: "1–2 weeks",
      description: "Cross-departmental audit and ERP architecture design.",
    },
    {
      phase: "Core Build",
      duration: "6–12 weeks",
      description: "Module development across finance, HR, inventory, and operations.",
    },
    {
      phase: "Data Migration & Testing",
      duration: "2–3 weeks",
      description: "Historical data migration and cross-department testing.",
    },
    {
      phase: "Rollout & Training",
      duration: "1–2 weeks",
      description: "Department-by-department launch with hands-on training.",
    },
  ],

  technology: [
    { category: "Core Platform", items: ["Custom ERP architecture", "PostgreSQL / MySQL", "Node.js / PHP backend"] },
    { category: "Modules", items: ["Finance & accounting", "HR & payroll", "Inventory & procurement"] },
    { category: "Reporting", items: ["Real-time dashboards", "Audit-ready exports", "Role-based reporting access"] },
  ],

  caseStudy: {
    illustrative: true,
    client: "A multi-branch manufacturing firm",
    industry: "Manufacturing",
    challenge:
      "Finance, HR, and inventory each ran on separate software, requiring a full week of manual reconciliation before every month-end close and audit.",
    approach:
      "We built a custom ERP unifying all three departments into one platform, with automated payroll posting and real-time inventory-to-finance sync.",
    outcome:
      "Month-end close now takes a fraction of the previous time, payroll runs automatically each cycle, and audit-ready reports are available on demand instead of assembled by hand.",
  },

  faqs: [
    {
      question: "How is a custom ERP different from a platform like SAP or Odoo?",
      answer:
        "Off-the-shelf ERP platforms configure your business into their existing modules. A custom ERP is built around your specific processes from the start, avoiding the workarounds a generic platform often requires.",
    },
    {
      question: "Do we need to replace all our departmental systems at once?",
      answer:
        "No — most ERP builds roll out department by department, so you see value from the first module before the next one is even built.",
    },
    {
      question: "How is our existing financial and HR data migrated?",
      answer:
        "We migrate historical data in stages with validation at each step, so the transition doesn't risk your existing financial or payroll records.",
    },
    {
      question: "Can the ERP integrate with our existing accounting or payroll provider?",
      answer:
        "In most cases, yes — we connect to existing tools through their APIs where full replacement isn't necessary or desired.",
    },
    {
      question: "How long before we see a return on an ERP investment?",
      answer:
        "Most clients see the first return — reduced reconciliation time — within the first month-end close after the relevant module goes live.",
    },
  ],

  cta: {
    title: "Ready to Stop Reconciling Systems by Hand Every Month?",
    subtitle:
      "Tell us which departments feel the most disconnected. We'll show you exactly what a unified ERP would fix first.",
    buttonLabel: "Book a Strategy Call",
  },

  relatedServices: ["custom-software-development", "cloud-services"],
  relatedSolutions: ["inventory-management", "crm-systems", "business-intelligence-analytics"],
  relatedIndustries: ["manufacturing", "hospitals", "retail"],
};
