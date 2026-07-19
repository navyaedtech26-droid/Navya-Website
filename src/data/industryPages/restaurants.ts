import { UtensilsCrossed, ShoppingBag, CalendarCheck, BarChart3, Smartphone, ChefHat, Star, Bell } from "lucide-react";
import type { IndustryPage } from "@/types";

export const restaurantsIndustryPage: IndustryPage = {
  slug: "restaurants",
  icon: UtensilsCrossed,
  color: "#FB923C",
  title: "Restaurants & Cafes",
  highlight: "Fill Tables, Keep the Margin",

  heroSubtitle:
    "Between delivery-app commissions, walk-in-only reservations, and a kitchen running on verbal orders, most restaurants are leaving both revenue and margin on the table. We build the ordering and booking systems that keep both with you.",

  heroImage: "/industries section/cafe and restaurants.avif",

  seoTitle: "Digital Transformation for Restaurants & Cafes in Nepal | Navya EdTech",
  seoDescription:
    "Online ordering, table reservations, and POS integrations for restaurants and cafes, cut delivery commission and speed up kitchen operations.",
  seoKeywords: [
    "restaurant online ordering system",
    "table reservation software",
    "restaurant website development",
    "restaurant POS integration",
    "food delivery website for restaurants",
    "restaurant management system",
    "digital transformation for restaurants",
    "restaurant online ordering system Nepal",
  ],

  challenges: {
    title: "Where Do Restaurants Lose Revenue",
    highlight: "Without Noticing?",
    intro:
      "Restaurant margins are already thin. Every process below quietly narrows them further, one order and one table at a time.",
    items: [
      {
        title: "Most delivery orders go through commission-heavy apps",
        description:
          "Third-party delivery platforms routinely take 20-30% commission per order, a cost that compounds fast when it's the majority of your delivery volume.",
      },
      {
        title: "Reservations are handled entirely by phone",
        description:
          "Staff manage bookings verbally during service hours, leading to double-bookings, missed calls during rushes, and no record of no-shows.",
      },
      {
        title: "Orders move from front-of-house to kitchen verbally",
        description:
          "Without a digital order flow, mistakes and delays creep in during peak hours when servers are relaying multiple orders from memory.",
      },
      {
        title: "There's no way to bring past customers back",
        description:
          "Without a system to capture customer data, a great first visit has no reliable path to becoming a repeat one beyond word of mouth.",
      },
      {
        title: "Menu and pricing updates take days to reach every channel",
        description:
          "A price or menu change has to be manually updated across the physical menu, website, and every delivery app it's listed on separately.",
      },
    ],
  },

  solutions: {
    title: "Systems That Keep Orders",
    highlight: "and Margin With You",
    intro:
      "We build the ordering, booking, and kitchen systems that reduce dependency on commission-heavy platforms and speed up service.",
    items: [
      {
        icon: ShoppingBag,
        title: "Direct online ordering website",
        description:
          "A branded ordering site that captures delivery and pickup orders without paying third-party commission on every sale.",
      },
      {
        icon: CalendarCheck,
        title: "Table reservation system",
        description:
          "Online booking with automated confirmations and reminders, cutting no-shows and freeing staff from managing reservations by phone.",
      },
      {
        icon: ChefHat,
        title: "Kitchen display & order management",
        description:
          "Orders route digitally from front-of-house to kitchen, reducing mistakes and speeding up ticket times during peak hours.",
      },
      {
        icon: Bell,
        title: "Customer loyalty & CRM",
        description:
          "Automated offers and reminders that turn a first-time visitor into a repeat customer, without relying on word of mouth alone.",
      },
    ],
  },

  roi: {
    title: "Where Does the Return",
    highlight: "Actually Come From?",
    intro:
      "The return shows up directly in commission avoided, table turnover improved, and repeat visits recovered, numbers a restaurant owner already watches closely.",
    points: [
      "Lower delivery commission spend. Every order shifted to your direct ordering site avoids the 20-30% cut a third-party app would take.",
      "Fewer no-shows. Automated reservation reminders recover table slots that would otherwise sit empty during service.",
      "Faster ticket times. A digital kitchen order flow cuts the errors and delays that come from verbal order-taking during rushes.",
      "More repeat visits. Automated loyalty outreach brings customers back without relying solely on word of mouth.",
      "Consistent pricing across channels. One system updates your menu everywhere at once, instead of a manual update per platform.",
    ],
  },

  features: {
    title: "What's Inside the",
    highlight: "Platform?",
    intro: "Every feature maps to a moment in service, ordering, booking, kitchen, or follow-up.",
    items: [
      {
        icon: ShoppingBag,
        title: "Commission-free online ordering",
        description: "Branded ordering for delivery and pickup, directly on your own site.",
      },
      {
        icon: CalendarCheck,
        title: "Online table reservations",
        description: "Automated booking, confirmations, and no-show reminders.",
      },
      {
        icon: ChefHat,
        title: "Digital kitchen order flow",
        description: "Orders route to the kitchen instantly, cutting mistakes during peak hours.",
      },
      {
        icon: BarChart3,
        title: "Sales & menu performance dashboard",
        description: "See which dishes and times drive the most revenue, in real time.",
      },
      {
        icon: Smartphone,
        title: "Mobile-friendly ordering experience",
        description: "A fast, simple ordering flow built for customers ordering from their phone.",
      },
      {
        icon: Star,
        title: "Loyalty & repeat-visit automation",
        description: "Automated offers and reminders that bring customers back.",
      },
    ],
  },

  caseStudy: {
    illustrative: true,
    client: "A multi-location casual dining restaurant",
    challenge:
      "Most delivery orders came through commission-charging apps, reservations were taken entirely by phone, and kitchen tickets were relayed verbally during peak hours.",
    approach:
      "We built a direct online ordering website, an automated table reservation system, and a digital kitchen order flow connected to front-of-house.",
    outcome:
      "A meaningful share of delivery volume shifted to the commission-free direct site, no-shows dropped with automated reminders, and kitchen order errors during peak hours fell noticeably.",
  },

  faqs: [
    {
      question: "Will this replace the delivery apps we're already listed on?",
      answer:
        "Not necessarily. Most restaurants keep both. The goal is to give customers who'd order directly a fast, commission-free option, while keeping delivery-app reach for discovery.",
    },
    {
      question: "Can the system integrate with our existing POS?",
      answer:
        "In most cases, yes. We assess your current POS during discovery and integrate order and sales data so you're not managing two disconnected systems.",
    },
    {
      question: "How does the reservation system handle no-shows?",
      answer:
        "Automated SMS or email reminders go out before the reservation time, and the system tracks no-show history so you can set deposit requirements for repeat offenders if needed.",
    },
    {
      question: "Can we update our menu across all channels at once?",
      answer:
        "Yes. Menu and pricing changes made in one place sync across your ordering site and any connected channels, removing manual per-platform updates.",
    },
  ],

  cta: {
    title: "Ready to Stop Paying Commission on Orders You Could Keep?",
    subtitle: "Tell us how ordering, reservations, and the kitchen run today. We'll show you exactly where the margin is leaking.",
    buttonLabel: "Book a Strategy Call",
  },

  relatedIndustries: ["hotels", "retail"],
  relatedServices: ["apps", "websites", "systems"],
  relatedSolutions: ["inventory-management", "social-media-growth"],
};
