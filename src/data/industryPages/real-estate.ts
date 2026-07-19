import { Home, Building2, Users, BarChart3, Search, Bell, FileText, Smartphone } from "lucide-react";
import type { IndustryPage } from "@/types";

export const realEstateIndustryPage: IndustryPage = {
  slug: "real-estate",
  icon: Home,
  color: "#A78BFA",
  title: "Real Estate",
  highlight: "Turn Listings Into Closings",

  heroSubtitle:
    "A buyer's first impression of a listing happens online, long before an agent ever picks up the phone. We build the listing platforms and CRM systems that convert that first look into a scheduled viewing and a closed deal.",

  heroImage: "/industries section/real estate.avif",

  seoTitle: "Digital Transformation for Real Estate in Nepal | Navya EdTech",
  seoDescription:
    "Property listing websites, real estate CRM, and lead management platforms, convert more browsers into buyers and track every lead to close.",
  seoKeywords: [
    "real estate website development",
    "property listing platform",
    "real estate CRM software",
    "lead management system for real estate",
    "property management system",
    "real estate agency software",
    "digital transformation for real estate",
    "real estate website development Nepal",
  ],

  challenges: {
    title: "Why Do Leads Go Cold",
    highlight: "Before an Agent Even Calls?",
    intro:
      "Real estate is a relationship business, but most of that relationship starts online. And most agencies aren't set up to capture it well.",
    items: [
      {
        title: "Listings are scattered across portals with no central hub",
        description:
          "Without a strong agency website, buyers researching your properties see them fragmented across third-party portals instead of one credible source.",
      },
      {
        title: "Leads come in but aren't tracked systematically",
        description:
          "Inquiries from calls, forms, and walk-ins land in different places, so follow-up depends on memory instead of a system that flags who to call next.",
      },
      {
        title: "Property details go stale across channels",
        description:
          "A price change or sold status update has to be manually pushed to every portal and printed material separately, so buyers see conflicting information.",
      },
      {
        title: "There's no visibility into what buyers are actually looking for",
        description:
          "Without tracking which listings get viewed and inquired about, agencies can't tell which properties or price points are actually in demand.",
      },
      {
        title: "Document handling slows down every transaction",
        description:
          "Contracts, disclosures, and paperwork move by email and physical signature, adding days to a process that buyers increasingly expect to move faster.",
      },
    ],
  },

  solutions: {
    title: "A System That Tracks Every Lead",
    highlight: "From First Click to Closing",
    intro:
      "We build the listing site and CRM layer that gives an agency one place to manage every property and every buyer relationship.",
    items: [
      {
        icon: Building2,
        title: "Property listing website",
        description:
          "A fast, searchable listing site with high-quality property pages that build credibility and capture inquiries directly, not just through third-party portals.",
      },
      {
        icon: Users,
        title: "Real estate CRM & lead tracking",
        description:
          "Every inquiry, call, and viewing request tracked in one pipeline, so no lead goes cold from being forgotten in a scattered inbox.",
      },
      {
        icon: Search,
        title: "Smart property search & alerts",
        description:
          "Buyers filter by location, price, and features, with automated alerts when a new listing matches their saved search criteria.",
      },
      {
        icon: BarChart3,
        title: "Listing performance dashboard",
        description:
          "See which properties and price points get the most views and inquiries, informing pricing and marketing decisions with real data.",
      },
    ],
  },

  roi: {
    title: "Where Does the Return",
    highlight: "Actually Come From?",
    intro:
      "For a real estate business, the return shows up as more qualified leads converted and less time lost to manual coordination.",
    points: [
      "Higher lead-to-viewing conversion. Systematic follow-up means fewer inquiries fall through the cracks before an agent responds.",
      "Faster listing updates. One system pushes price and status changes everywhere at once, keeping every channel consistent.",
      "Better-informed pricing decisions. Visibility into buyer interest by listing supports pricing strategy with real demand data.",
      "Shorter transaction timelines. Digital document handling removes days of back-and-forth from contract to close.",
      "Stronger buyer trust. A professional, credible online presence signals the same quality buyers expect from the properties themselves.",
    ],
  },

  features: {
    title: "What's Inside the",
    highlight: "Platform?",
    intro: "Every feature is built around a specific stage of the buyer journey, from search to signed contract.",
    items: [
      {
        icon: Building2,
        title: "Searchable property listings",
        description: "Rich property pages with photos, details, and map-based search.",
      },
      {
        icon: Users,
        title: "Lead & inquiry pipeline",
        description: "Every inquiry tracked from first contact through to closing.",
      },
      {
        icon: Bell,
        title: "Automated buyer alerts",
        description: "Notify interested buyers instantly when a matching listing goes live.",
      },
      {
        icon: BarChart3,
        title: "Listing performance analytics",
        description: "Track views, inquiries, and conversion by property and price range.",
      },
      {
        icon: FileText,
        title: "Digital document workflow",
        description: "Contracts and disclosures managed and signed without the paper trail.",
      },
      {
        icon: Smartphone,
        title: "Mobile-friendly agent dashboard",
        description: "Agents manage leads and listings on the go, not just from the office.",
      },
    ],
  },

  caseStudy: {
    illustrative: true,
    client: "A regional real estate agency",
    challenge:
      "Listings were scattered across third-party portals with no central agency site, and inquiries came in through disconnected channels with no consistent follow-up process.",
    approach:
      "We built a searchable property listing website integrated with a CRM that tracks every lead from first inquiry to closing, plus automated alerts for buyer search matches.",
    outcome:
      "Lead follow-up became systematic instead of memory-dependent, buyers began inquiring directly through the agency's own site, and the team gained real visibility into which listings were driving demand.",
  },

  faqs: [
    {
      question: "Can the website sync with the property portals we already list on?",
      answer:
        "Yes. We can configure the listing website to sync with major third-party portals so you're not manually re-entering the same property twice.",
    },
    {
      question: "Does the CRM handle both buyer and seller leads?",
      answer:
        "Yes, the CRM is built to track both sides of the transaction, with separate pipelines for buyer inquiries and seller listings.",
    },
    {
      question: "Can this support multiple agents or branches?",
      answer:
        "Yes. It's built to scale across agents and branches, with each agent seeing their own leads and management getting an agency-wide view.",
    },
    {
      question: "Do you handle virtual tours or 3D property walkthroughs?",
      answer:
        "We can integrate virtual tour and walkthrough embeds into listing pages, and scope full 3D tour production as an add-on if needed.",
    },
  ],

  cta: {
    title: "Ready to Stop Losing Leads Between First Click and First Call?",
    subtitle: "Tell us how listings and leads are managed today. We'll show you exactly where the follow-up gap is.",
    buttonLabel: "Book a Strategy Call",
  },

  relatedIndustries: ["hotels", "manufacturing"],
  relatedServices: ["websites", "systems", "business-intelligence"],
  relatedSolutions: ["crm-systems"],
};
