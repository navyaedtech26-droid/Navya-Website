import { Boxes, Search, TrendingDown, RefreshCw, BarChart3 } from "lucide-react";
import type { ServicePage } from "@/types";

export const inventoryManagementServicePage: ServicePage = {
  slug: "inventory-management",
  category: "solution",
  icon: Boxes,
  title: "Inventory Management",
  highlight: "Real-Time Stock Visibility",

  heroSubtitle:
    "A stockout costs a sale today. Overstock costs cash every day until it sells. Both come from the same root cause, not knowing your real inventory position. We build systems that replace the guesswork with real-time visibility.",

  heroImage: "/vectors1/inventory-clean.avif",

  seoDescription:
    "Real-time inventory management systems that track stock across every location and channel, cutting stockouts and reducing excess capital.",

  seoKeywords: [
    "inventory management system",
    "custom inventory software Nepal",
    "warehouse management system",
    "real-time stock tracking",
    "multi-location inventory software",
    "inventory and POS integration",
    "supply chain visibility system",
  ],

  overview: {
    whatIsIt:
      "A real-time inventory management system that tracks stock levels, movement, and reorder points across every location and sales channel.",
    whoNeedsIt:
      "Retailers, distributors, and manufacturers currently tracking stock through manual counts, spreadsheets, or disconnected point-of-sale systems.",
    businessValue:
      "Replaces reactive stock decisions (emergency reorders, surprise stockouts) with a live, accurate picture your team can act on before it becomes a problem.",
    benefits: [
      "Real-time stock visibility across every location and channel",
      "Automated reorder alerts before a stockout actually happens",
      "Elimination of manual stock counts and reconciliation errors",
      "Clear reporting on what's moving, what's dead stock, and why",
    ],
  },

  businessProblem: {
    title: "Why Is Poor Stock Visibility",
    highlight: "Costing You in Both Directions?",
    intro:
      "Most businesses lose money on inventory from two opposite directions at once (stockouts that lose sales, and overstock that ties up cash), both caused by the same missing visibility.",
    painPoints: [
      {
        title: "Stockouts happen without warning",
        description:
          "Without real-time tracking, a popular item runs out mid-sales-cycle, and the business only finds out when a customer asks or an order fails.",
      },
      {
        title: "Overstock quietly ties up working capital",
        description:
          "Without demand visibility, purchasing defaults to over-ordering as a safety margin, tying up cash in stock that sits unsold for months.",
      },
      {
        title: "Manual stock counts are slow and unreliable",
        description:
          "Physical counts across multiple locations take staff hours and are prone to counting errors that throw off every subsequent decision.",
      },
      {
        title: "Multiple sales channels show different stock numbers",
        description:
          "A separate online store and physical POS with no shared inventory feed means overselling an item that's already sold out elsewhere.",
      },
      {
        title: "There's no visibility into what's actually moving",
        description:
          "Without sales-velocity data by SKU, slow-moving and dead stock go unnoticed for months, occupying warehouse space and tying up capital.",
      },
      {
        title: "Reordering depends on someone remembering to check",
        description:
          "Without automated reorder points, purchasing decisions rely on someone noticing low stock manually, a process that fails exactly when things get busy.",
      },
    ],
  },

  businessImpact: {
    title: "What Real-Time Inventory Visibility",
    highlight: "Actually Changes?",
    intro:
      "The right system doesn't just track stock. It changes purchasing from a reactive scramble into a planned, data-driven decision.",
    points: [
      {
        icon: Search,
        title: "You always know exactly what's in stock, everywhere",
        description:
          "A single real-time view across every location and channel replaces the guesswork of checking multiple disconnected systems.",
      },
      {
        icon: RefreshCw,
        title: "Reordering happens before a stockout, not after",
        description:
          "Automated reorder alerts trigger at the right threshold, so purchasing decisions get made ahead of demand instead of in reaction to a shortage.",
      },
      {
        icon: TrendingDown,
        title: "Overstock and dead stock become visible early",
        description:
          "Sales-velocity reporting by SKU flags slow-moving inventory while there's still time to discount or reallocate it, instead of writing it off months later.",
      },
      {
        icon: BarChart3,
        title: "Purchasing becomes a data decision, not a guess",
        description:
          "Historical demand data informs how much and when to reorder, replacing the safety-margin over-ordering that used to tie up cash.",
      },
    ],
  },

  roi: {
    title: "Where Does the Return",
    highlight: "Actually Come From?",
    intro:
      "Inventory system ROI shows up directly in reduced carrying costs and recovered sales that stockouts used to lose.",
    points: [
      "Reduced carrying costs. Accurate demand visibility lowers the safety-margin over-ordering that ties up working capital in unsold stock.",
      "Recovered lost sales. Automated reorder alerts prevent the stockouts that currently lose sales without anyone noticing until it's too late.",
      "Fewer reconciliation hours. Real-time tracking removes the need for frequent manual stock counts and the errors they introduce.",
      "Faster identification of dead stock. Sales-velocity reporting flags slow-moving inventory early enough to act on it profitably.",
      "Prevented overselling. A synced view across every channel stops selling stock that's already been sold elsewhere.",
    ],
  },

  workflow: [
    {
      step: "01",
      title: "Stock & Channel Audit",
      description:
        "We map every location, sales channel, and current stock-tracking method before designing the new system.",
    },
    {
      step: "02",
      title: "System Architecture & Reorder Rules",
      description:
        "We design the inventory structure and reorder-point logic based on your actual demand patterns and supplier lead times.",
    },
    {
      step: "03",
      title: "Build & POS/Channel Integration",
      description:
        "We build the system and integrate it with your existing POS, e-commerce, or warehouse tools so stock data stays in sync automatically.",
    },
    {
      step: "04",
      title: "Data Migration & Testing",
      description:
        "We migrate current stock records and test the full reorder and sales-sync workflow against real scenarios before go-live.",
    },
    {
      step: "05",
      title: "Rollout & Staff Training",
      description:
        "We roll out to warehouse and sales staff with hands-on training, and monitor the first cycles closely to catch any gaps.",
    },
  ],

  implementation: {
    title: "What Actually Happens",
    highlight: "During the Build",
    intro:
      "No black box. Here's what you're involved in, and what you're handed at the end.",
    deliverables: [
      "A documented map of every location and sales channel before the system is designed",
      "Automated reorder-point logic configured to your real demand and supplier lead times",
      "POS and e-commerce integration so stock stays synced across every channel",
      "Migrated historical stock data for a clean starting point",
      "Sales-velocity and dead-stock reporting dashboards",
      "Staff training and a documented admin guide for ongoing use",
    ],
  },

  timeline: [
    {
      phase: "Audit",
      duration: "3–5 days",
      description: "Stock, channel, and current process assessment.",
    },
    {
      phase: "Build & Integration",
      duration: "3–6 weeks",
      description: "System development and POS/channel integration.",
    },
    {
      phase: "Data Migration & Testing",
      duration: "1 week",
      description: "Historical data migration and full workflow testing.",
    },
    {
      phase: "Rollout & Training",
      duration: "3–5 days",
      description: "Staff training and a monitored go-live.",
    },
  ],

  technology: [
    { category: "Core Platform", items: ["Custom inventory engine", "Multi-location tracking"] },
    { category: "Integration", items: ["POS system sync", "E-commerce platform integration", "Barcode/RFID scanning"] },
    { category: "Reporting", items: ["Reorder alerts", "Sales-velocity dashboards", "Dead-stock reporting"] },
  ],

  caseStudy: {
    illustrative: true,
    client: "A multi-location retail chain",
    industry: "Retail",
    challenge:
      "Each store tracked stock independently with periodic manual counts, causing frequent stockouts on popular items while other locations sat on excess of the same product.",
    approach:
      "We built a real-time inventory system syncing all locations and the online store, with automated reorder alerts based on actual sales velocity per location.",
    outcome:
      "Stockouts on popular items dropped sharply, excess stock is now redistributed between locations instead of sitting idle, and reordering happens automatically ahead of demand.",
  },

  faqs: [
    {
      question: "Can this integrate with our existing POS system?",
      answer:
        "In most cases, yes. We integrate with your current POS and e-commerce platforms so stock data syncs automatically rather than requiring a full replacement.",
    },
    {
      question: "Do you support multiple warehouse or store locations?",
      answer:
        "Yes, multi-location tracking with per-location and aggregated views is a core part of the system design.",
    },
    {
      question: "How are reorder points determined?",
      answer:
        "We calculate them from your actual historical sales velocity and supplier lead times, not a generic fixed threshold, so alerts trigger at the right moment for your business.",
    },
    {
      question: "Can the system handle barcode or RFID scanning?",
      answer:
        "Yes, we can integrate barcode or RFID scanning for warehouse and receiving workflows where it improves speed and accuracy over manual entry.",
    },
    {
      question: "How long until we stop having unexpected stockouts?",
      answer:
        "Once the system is live with accurate reorder points, most clients see a sharp reduction in surprise stockouts within the first full sales cycle.",
    },
  ],

  cta: {
    title: "Ready to Stop Guessing What's Actually in Stock?",
    subtitle:
      "Tell us where stockouts or overstock hurt the most. We'll show you exactly what real-time visibility would fix.",
    buttonLabel: "Book a Strategy Call",
  },

  relatedServices: ["custom-software-development", "mobile-app-development"],
  relatedSolutions: ["erp-systems", "business-intelligence-analytics"],
  relatedIndustries: ["retail", "manufacturing", "restaurants"],
};
