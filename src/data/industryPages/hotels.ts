import { Hotel, CalendarCheck, Bell, BarChart3, ConciergeBell, Smartphone, Star, ShieldCheck } from "lucide-react";
import type { IndustryPage } from "@/types";

export const hotelsIndustryPage: IndustryPage = {
  slug: "hotels",
  icon: Hotel,
  color: "#FB7185",
  title: "Hotels & Resorts",
  highlight: "Book Direct, Keep More Margin",

  heroSubtitle:
    "Every booking that comes through a third-party OTA instead of your own site hands away commission you didn't have to pay. We build the direct-booking engine and guest systems that keep more of every stay's value with you.",

  seoTitle: "Digital Transformation for Hotels & Resorts | Navya EdTech",
  seoDescription:
    "Direct booking websites, reservation management systems, and guest experience platforms built for hotels and resorts — reduce OTA commission, fill more rooms, and keep guests coming back.",
  seoKeywords: [
    "hotel booking website development",
    "hotel reservation management system",
    "direct booking engine for hotels",
    "hotel property management system",
    "guest experience platform",
    "hotel revenue management software",
    "digital transformation for hotels",
  ],

  challenges: {
    title: "Where Hotels Give Away",
    highlight: "Margin They Don't Have To",
    intro:
      "Most of a hotel's revenue leakage isn't visible on a P&L line — it's baked into commission rates and manual processes nobody's had time to fix.",
    items: [
      {
        title: "Most bookings go through commission-heavy OTAs",
        description:
          "Without a strong direct-booking site, a guest who found you on a listing site books through it — handing 15-25% of that revenue away by default.",
      },
      {
        title: "Room inventory is updated manually across channels",
        description:
          "Staff manually sync availability across the front desk, website, and listing sites, risking double-bookings and overselling during peak periods.",
      },
      {
        title: "Guest requests and check-in are handled entirely in person",
        description:
          "Without digital check-in or a request system, front-desk staff manage every request by phone or in person, slowing service during busy check-in windows.",
      },
      {
        title: "There's no system for repeat-guest relationships",
        description:
          "Past guests who'd happily rebook directly get no personalized outreach, so their next booking goes to whichever channel they land on first.",
      },
      {
        title: "Pricing decisions are made without real demand data",
        description:
          "Room rates are set on instinct or a static calendar, missing the revenue available from dynamic pricing around demand and local events.",
      },
    ],
  },

  solutions: {
    title: "Systems That Turn Guests",
    highlight: "Into Direct Bookings",
    intro:
      "We build the booking, front-desk, and guest experience layer that shifts revenue away from commission-heavy channels and back to you.",
    items: [
      {
        icon: CalendarCheck,
        title: "Direct booking website",
        description:
          "A fast, credible booking engine that captures the guest who's already researching you online, before they land on a commission-charging listing site.",
      },
      {
        icon: BarChart3,
        title: "Property management system (PMS)",
        description:
          "Room inventory, rates, and reservations synced across every channel in real time, eliminating manual updates and double-booking risk.",
      },
      {
        icon: ConciergeBell,
        title: "Digital check-in & guest requests",
        description:
          "Guests check in and submit requests through an app or portal, cutting front-desk queues during peak arrival windows.",
      },
      {
        icon: Bell,
        title: "Guest retention & CRM",
        description:
          "Automated post-stay outreach and loyalty offers that bring past guests back to book directly instead of through a third party.",
      },
    ],
  },

  roi: {
    title: "Where the Return",
    highlight: "Actually Comes From",
    intro:
      "For a hotel, the return is measured in commission avoided, occupancy improved, and repeat bookings recovered — all numbers your revenue team already tracks.",
    points: [
      "Lower OTA commission spend — every booking shifted to your direct site keeps 15-25% of that revenue that would otherwise go to a listing platform.",
      "Higher occupancy accuracy — real-time inventory sync across channels eliminates double-bookings and the guest-relations cost of fixing them.",
      "Shorter check-in queues — digital check-in reduces front-desk bottlenecks during peak arrival periods, improving the first guest impression.",
      "More repeat bookings — automated post-stay outreach recovers guests who would otherwise rebook through whichever channel they found first.",
      "Better-informed pricing — demand data supports dynamic rate decisions instead of a static seasonal calendar.",
    ],
  },

  features: {
    title: "What's Inside the",
    highlight: "Platform",
    intro: "Every feature is built around a specific point in the guest journey — from search to rebooking.",
    items: [
      {
        icon: CalendarCheck,
        title: "Real-time booking engine",
        description: "Direct reservations with live availability, synced across every sales channel.",
      },
      {
        icon: BarChart3,
        title: "Channel & rate management",
        description: "One dashboard to manage pricing and inventory across OTAs and your direct site.",
      },
      {
        icon: Smartphone,
        title: "Mobile check-in & guest app",
        description: "Guests check in, request services, and view their stay details from their phone.",
      },
      {
        icon: Bell,
        title: "Automated guest communication",
        description: "Pre-arrival, in-stay, and post-stay messages that improve service and retention.",
      },
      {
        icon: Star,
        title: "Loyalty & review management",
        description: "Encourage repeat bookings and manage guest reviews from a single system.",
      },
      {
        icon: ShieldCheck,
        title: "Secure payment processing",
        description: "PCI-conscious booking and payment flows that protect guest data and your reputation.",
      },
    ],
  },

  caseStudy: {
    illustrative: true,
    client: "A boutique resort property",
    challenge:
      "The majority of bookings arrived through commission-charging OTAs, room inventory was updated manually across channels, and guest requests were handled entirely by phone.",
    approach:
      "We built a direct booking website integrated with a property management system for real-time inventory sync, plus a guest app for digital check-in and requests.",
    outcome:
      "Direct bookings now make up a meaningfully larger share of total reservations, double-booking incidents dropped to near zero, and front-desk queues shortened noticeably at check-in.",
  },

  faqs: [
    {
      question: "Will this replace the OTAs we currently list on, or work alongside them?",
      answer:
        "Alongside. We connect your inventory across OTAs and your direct site so you keep the reach of listing platforms while capturing more bookings directly.",
    },
    {
      question: "Can guests check in without coming to the front desk at all?",
      answer:
        "Yes, we can build a fully digital check-in flow, though most properties keep a front-desk option available for guests who prefer it.",
    },
    {
      question: "Does the system handle seasonal or dynamic pricing?",
      answer:
        "Yes — rates can be configured to adjust automatically around demand, seasonality, or local events, based on rules you define.",
    },
    {
      question: "How does this integrate with our existing property management tools?",
      answer:
        "We assess your current PMS during discovery and either integrate with it directly or replace it with a unified system, depending on what serves you better.",
    },
  ],

  cta: {
    title: "Ready to Stop Paying OTAs for Guests Who'd Book Direct?",
    subtitle: "Tell us how bookings, check-in, and guest communication work today. We'll show you exactly where the commission leak is.",
    buttonLabel: "Book a Strategy Call",
  },

  relatedIndustries: ["restaurants", "travel-agencies"],
  relatedServices: ["websites", "systems", "apps"],
};
