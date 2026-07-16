import { Store, ShoppingBag, Boxes, BarChart3, Smartphone, CreditCard, Users, Package } from "lucide-react";
import type { IndustryPage } from "@/types";

export const retailIndustryPage: IndustryPage = {
  slug: "retail",
  icon: Store,
  color: "#F5A623",
  title: "Retail",
  highlight: "Sell Everywhere, Track Everything",

  heroSubtitle:
    "Between in-store sales, an online store, and inventory that has to match both, most retailers are one out-of-sync spreadsheet away from a stockout or an overselling incident. We build the system that keeps every channel in sync.",

  heroImage: "/industries section/retail.avif",

  seoTitle: "Digital Transformation for Retail | Navya EdTech",
  seoDescription:
    "E-commerce websites, inventory systems, and POS integrations for retailers — sell online and in-store from one synced system, cut stockouts.",
  seoKeywords: [
    "retail inventory management system",
    "e-commerce website development",
    "point of sale integration",
    "retail ERP software",
    "omnichannel retail platform",
    "online store development",
    "digital transformation for retail",
  ],

  challenges: {
    title: "Why Do Retail Operations",
    highlight: "Fall Out of Sync?",
    intro:
      "The moment a retailer sells through more than one channel, the risk of the numbers disagreeing with each other goes up sharply — and most never fully catch up.",
    items: [
      {
        title: "In-store and online inventory don't match",
        description:
          "A sale in one channel isn't reflected in the other in real time, leading to overselling online or understocking in-store without anyone noticing until a customer complains.",
      },
      {
        title: "The online store looks like an afterthought",
        description:
          "A slow, generic, or poorly designed storefront loses browsers before checkout, especially against competitors with a more polished buying experience.",
      },
      {
        title: "Reordering decisions are based on gut feel",
        description:
          "Without real-time sales data, purchasing decisions rely on instinct, leading to both dead stock tying up capital and stockouts on fast-moving items.",
      },
      {
        title: "Customer data isn't captured or used",
        description:
          "Purchase history sits disconnected across POS and online systems, so there's no way to target repeat customers with relevant offers.",
      },
      {
        title: "Reporting is a manual, end-of-month exercise",
        description:
          "Sales, margin, and inventory reports are assembled by hand from multiple sources, arriving too late to inform the decisions that actually needed them.",
      },
    ],
  },

  solutions: {
    title: "One System Across",
    highlight: "Every Sales Channel",
    intro:
      "We build the storefront, inventory, and reporting layer that keeps in-store and online retail reading from the same real-time numbers.",
    items: [
      {
        icon: ShoppingBag,
        title: "E-commerce storefront",
        description:
          "A fast, conversion-focused online store that gives browsers a buying experience matching or beating dedicated e-commerce competitors.",
      },
      {
        icon: Boxes,
        title: "Unified inventory management",
        description:
          "Stock levels sync in real time across every channel, so a sale anywhere updates availability everywhere instantly.",
      },
      {
        icon: CreditCard,
        title: "POS integration",
        description:
          "In-store point-of-sale connects directly to the same inventory and sales system as the online store — no manual reconciliation required.",
      },
      {
        icon: BarChart3,
        title: "Sales & inventory BI dashboards",
        description:
          "Real-time visibility into what's selling, what's not, and what to reorder, replacing the end-of-month scramble with a live view.",
      },
    ],
  },

  roi: {
    title: "Where Does the Return",
    highlight: "Actually Come From?",
    intro:
      "For a retailer, the return shows up in reduced stockouts, less dead stock, and a higher-converting online storefront — all measurable against your current numbers.",
    points: [
      "Fewer stockouts and overselling incidents — real-time inventory sync means every channel reflects the true available stock.",
      "Less capital tied up in dead stock — sales-driven reordering replaces guesswork with actual demand data.",
      "Higher online conversion — a fast, well-designed storefront converts more of the traffic you already drive to it.",
      "Faster, more accurate reporting — live dashboards replace the manual end-of-month reconciliation across channels.",
      "More repeat purchases — unified customer data supports targeted offers instead of one-size-fits-all promotions.",
    ],
  },

  features: {
    title: "What's Inside the",
    highlight: "Platform?",
    intro: "Built to keep every sales channel — physical and digital — reading from one shared system.",
    items: [
      {
        icon: ShoppingBag,
        title: "Conversion-focused online store",
        description: "Fast, mobile-friendly storefront built to turn browsers into buyers.",
      },
      {
        icon: Boxes,
        title: "Real-time multi-channel inventory",
        description: "Stock levels sync instantly across in-store, online, and any marketplace channels.",
      },
      {
        icon: CreditCard,
        title: "POS & payment integration",
        description: "In-store checkout connected directly to the same inventory and sales data.",
      },
      {
        icon: Package,
        title: "Order & fulfillment tracking",
        description: "Every order tracked from placement through delivery or pickup.",
      },
      {
        icon: Users,
        title: "Customer profiles & loyalty",
        description: "Unified purchase history across channels to power targeted offers.",
      },
      {
        icon: Smartphone,
        title: "Mobile-friendly admin dashboard",
        description: "Manage products, orders, and stock from anywhere, not just the back office.",
      },
    ],
  },

  caseStudy: {
    illustrative: true,
    client: "A multi-location retail business",
    challenge:
      "In-store and online inventory tracked separately caused frequent overselling online and understocking in-store, while monthly reports were assembled manually from disconnected systems.",
    approach:
      "We built a unified e-commerce storefront and inventory system integrated with in-store POS, with a real-time sales and inventory dashboard.",
    outcome:
      "Overselling incidents dropped to near zero, reordering decisions now run off live sales data instead of guesswork, and management gets a real-time view instead of a monthly report.",
  },

  faqs: [
    {
      question: "Can this integrate with the POS system we already use in-store?",
      answer:
        "In most cases, yes — we assess your existing POS during discovery and integrate it, or replace it if a unified system serves you better.",
    },
    {
      question: "Do you handle payment gateway setup for the online store?",
      answer:
        "Yes, we set up and integrate local and international payment gateways as part of the e-commerce build.",
    },
    {
      question: "Can we sell on marketplaces in addition to our own store?",
      answer:
        "Yes — we can extend inventory sync to marketplace channels so stock levels stay accurate everywhere you sell.",
    },
    {
      question: "How long does an e-commerce and inventory system like this take to build?",
      answer:
        "A focused storefront with inventory sync typically ships in 3-6 weeks depending on catalogue size and integrations — you get an exact timeline after discovery.",
    },
  ],

  cta: {
    title: "Ready to Sell From One System Instead of Five Spreadsheets?",
    subtitle: "Tell us how inventory and sales are tracked today across your channels. We'll show you exactly where they're falling out of sync.",
    buttonLabel: "Book a Strategy Call",
  },

  relatedIndustries: ["restaurants", "manufacturing"],
  relatedServices: ["systems", "websites", "business-intelligence"],
  relatedSolutions: ["inventory-management", "erp-systems", "business-intelligence-analytics"],
};
