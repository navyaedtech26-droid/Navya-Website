import { Factory, Boxes, BarChart3, Truck, Wrench, ShieldCheck, LineChart, Package } from "lucide-react";
import type { IndustryPage } from "@/types";

export const manufacturingIndustryPage: IndustryPage = {
  slug: "manufacturing",
  icon: Factory,
  color: "#F59E0B",
  title: "Manufacturing",
  highlight: "Cut Waste, See Everything",

  heroSubtitle:
    "Production floors run on tighter margins than almost any other business — and most still track inventory, orders, and output on spreadsheets that are already out of date by the time anyone reads them.",

  heroImage: "/industries section/manufacturing.avif",

  seoTitle: "Digital Transformation for Manufacturing | Navya EdTech",
  seoDescription:
    "Inventory management, ERP, and production dashboards built for manufacturers — cut material waste, track output in real time, and replace spreadsheet-based operations with a single source of truth.",
  seoKeywords: [
    "manufacturing ERP software",
    "inventory management system for manufacturers",
    "production tracking software",
    "supply chain management system",
    "manufacturing business intelligence dashboard",
    "digital transformation for manufacturing",
    "factory management software",
  ],

  challenges: {
    title: "Where Does Margin Leak",
    highlight: "Out of the Production Floor?",
    intro:
      "Manufacturing runs on thin margins, which means small inefficiencies compound fast. Most of the leaks below aren't visible until they're measured.",
    items: [
      {
        title: "Raw material stock is tracked by hand",
        description:
          "Without real-time inventory, production stalls waiting on materials that were assumed to be in stock, or capital sits idle in excess stock nobody flagged.",
      },
      {
        title: "Production output isn't visible until it's too late",
        description:
          "Managers learn about a bottleneck or defect rate spike from an end-of-week report, days after the cost was already incurred on the floor.",
      },
      {
        title: "Purchase orders and supplier data live in email threads",
        description:
          "Reordering decisions are made from memory or a scattered inbox, leading to duplicate orders, missed reorder points, or supplier terms nobody tracked.",
      },
      {
        title: "Multiple spreadsheets don't agree with each other",
        description:
          "Sales, inventory, and production each keep their own version of the numbers, so the true stock level or order status depends on whoever you ask.",
      },
      {
        title: "Quality and compliance records are paper-based",
        description:
          "Audit trails for defects, batch tracking, or safety compliance sit in binders, making certification renewals and client audits slower than they need to be.",
      },
    ],
  },

  solutions: {
    title: "One System That Replaces",
    highlight: "the Spreadsheet Sprawl",
    intro:
      "We build the ERP, inventory, and reporting layer that gives a production floor one real-time source of truth instead of five disconnected ones.",
    items: [
      {
        icon: Boxes,
        title: "Real-time inventory & materials tracking",
        description:
          "Stock levels update the moment materials move, so reorder points trigger automatically instead of being discovered after a production stall.",
      },
      {
        icon: Factory,
        title: "Production & ERP system",
        description:
          "Orders, work-in-progress, and output tracked end to end, unifying sales, inventory, and production into one system everyone reads from.",
      },
      {
        icon: Truck,
        title: "Supplier & purchase order management",
        description:
          "Purchase orders, supplier terms, and delivery tracking in one place, replacing the email-thread approach to reordering.",
      },
      {
        icon: LineChart,
        title: "Production & BI dashboards",
        description:
          "Live visibility into throughput, defect rates, and bottlenecks, so managers catch a problem the day it starts, not the week it's reported.",
      },
    ],
  },

  roi: {
    title: "Where Does the Return",
    highlight: "Actually Come From?",
    intro:
      "In manufacturing, the return is measured directly in reduced waste, fewer stockouts, and faster decisions — numbers your floor managers already track.",
    points: [
      "Less capital tied up in excess stock — real-time inventory means ordering to actual need, not a safety-margin guess.",
      "Fewer production stalls — automated reorder points catch material shortages before they halt the line.",
      "Faster bottleneck detection — live production dashboards surface a slowdown the day it starts, not the week it's reported.",
      "Reduced reconciliation time — one shared system replaces the hours spent aligning sales, inventory, and production spreadsheets.",
      "Simpler audits and certifications — digital batch and compliance records turn an audit into a data export instead of a binder search.",
    ],
  },

  features: {
    title: "What's Inside the",
    highlight: "Platform?",
    intro: "Built around the actual flow of materials, orders, and output on a production floor.",
    items: [
      {
        icon: Boxes,
        title: "Live inventory tracking",
        description: "Raw materials and finished goods tracked in real time across every location.",
      },
      {
        icon: Package,
        title: "Order & production workflow",
        description: "Orders flow from sales through production to fulfillment in one system.",
      },
      {
        icon: Truck,
        title: "Supplier & purchase order management",
        description: "Reorder points, supplier terms, and delivery status in a single dashboard.",
      },
      {
        icon: BarChart3,
        title: "Throughput & defect dashboards",
        description: "Real-time visibility into output, downtime, and quality metrics.",
      },
      {
        icon: Wrench,
        title: "Maintenance & equipment logs",
        description: "Track servicing schedules and downtime causes against every machine.",
      },
      {
        icon: ShieldCheck,
        title: "Compliance & batch records",
        description: "Digital audit trails for quality, safety, and certification requirements.",
      },
    ],
  },

  caseStudy: {
    illustrative: true,
    client: "A small-batch manufacturing operation",
    challenge:
      "Inventory, purchase orders, and production tracking were split across separate spreadsheets that regularly disagreed with each other, causing material shortages and duplicate orders.",
    approach:
      "We built a unified ERP covering inventory, purchase orders, and production tracking, paired with a live dashboard for throughput and stock levels.",
    outcome:
      "Material shortages and duplicate orders dropped substantially, and floor managers now see production bottlenecks the day they start instead of in a weekly report.",
  },

  faqs: [
    {
      question: "Can the system handle multiple production lines or facilities?",
      answer:
        "Yes — it's built to scale across lines, shifts, and locations, giving you one consolidated view instead of separate reports per site.",
    },
    {
      question: "Will this integrate with equipment or barcode scanners we already use?",
      answer:
        "In most cases, yes. We scope integration with existing hardware and scanning systems during discovery so data flows in automatically.",
    },
    {
      question: "How long does an ERP implementation like this take?",
      answer:
        "Scope depends on how many workflows you're digitizing, but most manufacturing ERP builds run 6-10 weeks from kickoff, with a clear phased plan agreed upfront.",
    },
    {
      question: "Can we migrate our existing spreadsheet data into the new system?",
      answer:
        "Yes, data migration from existing spreadsheets and legacy systems is part of the implementation, so you're not starting from zero.",
    },
  ],

  cta: {
    title: "Ready to Stop Losing Margin to Spreadsheets?",
    subtitle: "Tell us how inventory, orders, and production are tracked today. We'll show you exactly where the waste is hiding.",
    buttonLabel: "Book a Strategy Call",
  },

  relatedIndustries: ["retail", "real-estate"],
  relatedServices: ["systems", "business-intelligence", "apps"],
  relatedSolutions: ["erp-systems", "inventory-management", "business-intelligence-analytics"],
};
