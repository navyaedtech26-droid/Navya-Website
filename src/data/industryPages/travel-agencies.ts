import { Plane, MapPin, CalendarCheck, BarChart3, Bell, Globe, CreditCard, Users } from "lucide-react";
import type { IndustryPage } from "@/types";

export const travelAgenciesIndustryPage: IndustryPage = {
  slug: "travel-agencies",
  icon: Plane,
  color: "#F472B6",
  title: "Travel Agencies",
  highlight: "Convert Wanderlust Into Bookings",

  heroSubtitle:
    "Travelers now research and compare trips almost entirely online before ever contacting an agency. We build the booking platforms and itinerary systems that turn that research phase into a confirmed, paid booking.",

  heroImage: "/industries section/travel.avif",

  seoTitle: "Digital Transformation for Travel Agencies | Navya EdTech",
  seoDescription:
    "Booking engines, itinerary systems, and travel websites for agencies and tour operators — convert more inquiries into confirmed bookings.",
  seoKeywords: [
    "travel agency website development",
    "tour booking system",
    "travel itinerary management software",
    "online travel booking engine",
    "travel CRM software",
    "tour operator management system",
    "digital transformation for travel agencies",
  ],

  challenges: {
    title: "Why Do Bookings Slip Away",
    highlight: "During the Research Phase?",
    intro:
      "Most travelers compare several agencies and packages before booking — and most of that comparison happens without an agency even knowing a prospect exists.",
    items: [
      {
        title: "Inquiries are handled entirely through calls and messages",
        description:
          "Without an online booking option, every prospective traveler has to reach out directly, and the ones who won't call simply book elsewhere.",
      },
      {
        title: "Itineraries are built manually for every trip",
        description:
          "Staff assemble each itinerary from scratch in documents or spreadsheets, a slow process that limits how many inquiries can be quoted per day.",
      },
      {
        title: "Payments and deposits are tracked by hand",
        description:
          "Partial payments, balances, and due dates across multiple bookings are tracked manually, risking missed follow-ups on outstanding balances.",
      },
      {
        title: "There's no system for repeat traveler relationships",
        description:
          "Past clients who'd happily book their next trip with you get no personalized outreach, so the next booking depends on them remembering to reach back out.",
      },
      {
        title: "The website doesn't reflect the quality of the trips offered",
        description:
          "A dated, generic website undersells curated packages next to competitors with a more visual, trust-building online presence.",
      },
    ],
  },

  solutions: {
    title: "Systems That Convert Research",
    highlight: "Into Confirmed Trips",
    intro:
      "We build the booking, itinerary, and CRM layer that captures a traveler's interest online and carries it through to a paid, confirmed trip.",
    items: [
      {
        icon: CalendarCheck,
        title: "Online booking engine",
        description:
          "Travelers browse packages, check availability, and book or request a quote directly online, without waiting for a callback.",
      },
      {
        icon: MapPin,
        title: "Itinerary management system",
        description:
          "Build and customize trip itineraries faster with reusable templates, letting staff quote more inquiries in the same amount of time.",
      },
      {
        icon: CreditCard,
        title: "Payment & deposit tracking",
        description:
          "Automated tracking of deposits, balances, and due dates across every booking, with reminders that reduce missed follow-ups.",
      },
      {
        icon: Globe,
        title: "Trust-building travel website",
        description:
          "A visually rich, credible website that showcases packages and past traveler experiences, converting research-stage visitors into inquiries.",
      },
    ],
  },

  roi: {
    title: "Where Does the Return",
    highlight: "Actually Come From?",
    intro:
      "For a travel agency, the return shows up in more inquiries converted, faster quote turnaround, and fewer bookings lost to slow follow-up.",
    points: [
      "Higher inquiry-to-booking conversion — an online booking option captures travelers who'd otherwise book with a competitor rather than wait for a call back.",
      "Faster itinerary turnaround — reusable itinerary templates let staff quote more inquiries without adding headcount.",
      "Fewer missed payments — automated deposit and balance tracking reduces the risk of a booking falling through over an unpaid balance.",
      "More repeat bookings — systematic outreach to past travelers recovers business that would otherwise depend on them remembering to reach back out.",
      "Stronger first impression — a polished, visual website builds the same trust and excitement the trips themselves are meant to deliver.",
    ],
  },

  features: {
    title: "What's Inside the",
    highlight: "Platform?",
    intro: "Every feature is built around a specific stage — research, quoting, booking, or repeat travel.",
    items: [
      {
        icon: CalendarCheck,
        title: "Online package booking",
        description: "Travelers browse, check availability, and book packages directly online.",
      },
      {
        icon: MapPin,
        title: "Itinerary builder & templates",
        description: "Assemble custom trip itineraries faster with reusable building blocks.",
      },
      {
        icon: CreditCard,
        title: "Deposit & payment tracking",
        description: "Automated reminders for balances and due dates across every booking.",
      },
      {
        icon: BarChart3,
        title: "Booking & revenue dashboard",
        description: "Real-time visibility into bookings, revenue, and popular packages.",
      },
      {
        icon: Users,
        title: "Traveler CRM & repeat outreach",
        description: "Track past travelers and automate outreach for their next trip.",
      },
      {
        icon: Bell,
        title: "Automated trip communication",
        description: "Confirmations, pre-trip details, and reminders sent without manual follow-up.",
      },
    ],
  },

  caseStudy: {
    illustrative: true,
    client: "A boutique tour operator",
    challenge:
      "Bookings were handled entirely through phone and email, itineraries were built from scratch for every inquiry, and payment balances were tracked manually across a growing number of trips.",
    approach:
      "We built an online booking engine with a reusable itinerary template system, integrated with automated payment and deposit tracking, plus a redesigned travel website.",
    outcome:
      "Online bookings began converting inquiries that previously required a callback, itinerary turnaround time dropped substantially, and missed balance follow-ups became rare instead of routine.",
  },

  faqs: [
    {
      question: "Can travelers book instantly, or does every trip need a custom quote?",
      answer:
        "We can configure either — instant booking for fixed packages, and a request-a-quote flow for fully custom itineraries, often both on the same site.",
    },
    {
      question: "Does the system handle multi-currency payments for international travelers?",
      answer:
        "Yes, we integrate payment gateways that support multiple currencies where your traveler base requires it.",
    },
    {
      question: "Can we manage group bookings and individual bookings in the same system?",
      answer:
        "Yes — the booking engine and CRM are built to handle both group and individual trips within the same pipeline.",
    },
    {
      question: "How long does it take to build a booking system like this?",
      answer:
        "A focused booking engine and website typically ships in 3-6 weeks depending on the number of package types and integrations involved.",
    },
  ],

  cta: {
    title: "Ready to Stop Losing Bookings to Slow Follow-Up?",
    subtitle: "Tell us how inquiries, itineraries, and payments are handled today. We'll show you exactly where the booking gap is.",
    buttonLabel: "Book a Strategy Call",
  },

  relatedIndustries: ["hotels", "restaurants"],
  relatedServices: ["websites", "apps", "systems"],
  relatedSolutions: ["crm-systems", "social-media-growth"],
};
