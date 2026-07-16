import { Smartphone, Bell, WifiOff, Fingerprint, Rocket } from "lucide-react";
import type { ServicePage } from "@/types";

export const mobileAppDevelopmentServicePage: ServicePage = {
  slug: "mobile-app-development",
  category: "service",
  icon: Smartphone,
  title: "Mobile App Development",
  highlight: "A Permanent Place on Their Screen",

  heroSubtitle:
    "A website earns a visit. An app earns a place on the home screen — a standing invitation back into your business every time it's unlocked. We build the native and cross-platform apps that make that invitation worth accepting.",

  heroImage: "/vector/mobile-dev.avif",

  seoDescription:
    "Native and cross-platform mobile apps engineered for real device conditions — offline support, push notifications, and secure logins.",

  seoKeywords: [
    "mobile app development",
    "iOS and Android app development Nepal",
    "React Native app development",
    "Flutter app development",
    "custom mobile app for business",
    "cross-platform app development",
    "app UI UX design",
  ],

  overview: {
    whatIsIt:
      "A native or cross-platform mobile application engineered for real device conditions — offline gaps, low bandwidth, and everyday interruptions.",
    whoNeedsIt:
      "Businesses whose customers or field staff need a fast, reliable pocket experience that a mobile website can't deliver.",
    businessValue:
      "Converts occasional web visitors into a retained, notifiable audience you can re-engage directly, without paying for reach every time.",
    benefits: [
      "Push notifications that bring customers back without ad spend",
      "Offline-capable workflows for field teams and patchy connections",
      "Secure biometric login and payment flows customers already trust",
      "A distribution channel you own, not one rented from a platform",
    ],
  },

  businessProblem: {
    title: "Why Are You Renting",
    highlight: "Every Customer Touchpoint Without an App?",
    intro:
      "A mobile website works, but it's a one-time visit with no memory. Most businesses don't notice what that costs until a competitor's app is the one sitting on the home screen instead.",
    painPoints: [
      {
        title: "There's no way to reach customers directly",
        description:
          "Without push notifications, every re-engagement depends on an email opening its way past a spam filter or an ad winning an auction — both costing money every time.",
      },
      {
        title: "Field staff lose functionality the moment signal drops",
        description:
          "A browser-based tool that requires constant connectivity fails exactly where it's needed most — warehouses, rural sites, basements — leaving staff to fall back on paper.",
      },
      {
        title: "Repeat customers face friction every single visit",
        description:
          "Re-entering payment details and re-logging in on a mobile browser adds seconds of friction that a saved, biometric-secured app session removes entirely.",
      },
      {
        title: "The brand looks secondary next to competitors with an app",
        description:
          "When a customer's phone shows a competitor's icon and not yours, the perception of scale and seriousness shifts — regardless of the underlying quality of your service.",
      },
      {
        title: "There's no offline continuity",
        description:
          "A dropped connection on a website means a blank screen. Without local data storage, a customer's in-progress order or a field worker's half-finished form is simply lost.",
      },
      {
        title: "You have no usage data to act on",
        description:
          "Without app analytics, you can't see which features customers actually use, where they drop off, or what's worth investing in next — decisions stay guesses.",
      },
    ],
  },

  businessImpact: {
    title: "What Owning the App",
    highlight: "Actually Changes?",
    intro:
      "An app moves your relationship with customers or staff from a rented visit to an owned channel — with the retention data to prove it's working.",
    points: [
      {
        icon: Bell,
        title: "You can re-engage without paying for reach",
        description:
          "A push notification for a restock, a reminder, or an offer reaches an existing customer directly — no ad auction, no algorithm deciding if it's seen.",
      },
      {
        icon: WifiOff,
        title: "Field and low-connectivity work keeps running",
        description:
          "Offline-first architecture lets staff keep working through dead zones, syncing automatically the moment connectivity returns — no lost forms, no paper fallback.",
      },
      {
        icon: Fingerprint,
        title: "Repeat visits get frictionless",
        description:
          "Biometric login and saved payment methods turn a multi-step checkout into a single tap, measurably lifting conversion on every returning visit.",
      },
      {
        icon: Rocket,
        title: "You gain a direct usage feed",
        description:
          "In-app analytics show exactly which screens convert, where users drop off, and what to build next — replacing guesswork with a live signal from real usage.",
      },
    ],
  },

  roi: {
    title: "Where Does the Return",
    highlight: "Actually Come From?",
    intro:
      "The return on a mobile app shows up in retention and reduced acquisition cost — both trackable against what you're spending today to reach the same customers.",
    points: [
      "Lower cost per re-engagement — a push notification costs nothing per send, compared to an ongoing ad or email spend to reach the same repeat customer.",
      "Higher checkout conversion — saved payment details and biometric login remove the steps that cause cart abandonment on mobile web.",
      "Recovered field-productivity hours — offline-capable workflows remove the downtime a connectivity gap used to cause.",
      "Fewer support calls — a well-designed app answers the questions a confusing mobile site used to generate as calls to your team.",
      "A defensible channel — an installed app with regular usage is harder for a competitor to displace than a bookmarked website.",
    ],
  },

  workflow: [
    {
      step: "01",
      title: "Platform & User Journey Mapping",
      description:
        "We define who's using the app, on what device, in what conditions — and map the journey before any screen is designed.",
    },
    {
      step: "02",
      title: "UI/UX & Prototyping",
      description:
        "Wireframes and a clickable prototype let you validate flows and navigation before development, when changes are still cheap.",
    },
    {
      step: "03",
      title: "Native or Cross-Platform Build",
      description:
        "We build in React Native, Flutter, or fully native Swift/Kotlin, chosen for your actual performance and budget requirements — not by default.",
    },
    {
      step: "04",
      title: "Device & Network Testing",
      description:
        "The app is tested across real devices and degraded network conditions, not just a simulator on fast office Wi-Fi.",
    },
    {
      step: "05",
      title: "Store Submission & Post-Launch Support",
      description:
        "We manage App Store and Google Play submission, then monitor crash reports and usage data to guide the first rounds of updates.",
    },
  ],

  implementation: {
    title: "What Actually Happens",
    highlight: "During the Build",
    intro:
      "No black box. Here's what you're involved in, and what you're handed at launch.",
    deliverables: [
      "A clickable prototype to validate the user journey before development starts",
      "Sprint demos on real devices, not just simulator screenshots",
      "Push notification and analytics infrastructure configured and ready to use",
      "App Store and Google Play submission handled end-to-end, including compliance requirements",
      "Crash reporting and performance monitoring wired in from day one",
      "Documentation and a support plan for post-launch updates and OS version changes",
    ],
  },

  timeline: [
    {
      phase: "Discovery & UX Design",
      duration: "1–2 weeks",
      description: "User journey mapping, wireframes, and an approved clickable prototype.",
    },
    {
      phase: "Development",
      duration: "5–10 weeks",
      description: "Core build across the target platforms, in reviewable sprints.",
    },
    {
      phase: "QA & Device Testing",
      duration: "1–2 weeks",
      description: "Cross-device, cross-network testing and bug resolution.",
    },
    {
      phase: "Store Launch",
      duration: "3–7 days",
      description: "Submission, review response, and a monitored go-live.",
    },
  ],

  technology: [
    { category: "Cross-Platform", items: ["React Native", "Flutter"] },
    { category: "Native", items: ["Swift (iOS)", "Kotlin (Android)"] },
    { category: "Backend & Sync", items: ["Node.js APIs", "Offline-first data sync", "Push notification services"] },
    { category: "Security", items: ["Biometric authentication", "Encrypted local storage", "Secure payment SDKs"] },
  ],

  caseStudy: {
    illustrative: true,
    client: "A subscription-based service platform",
    industry: "Consumer Services",
    challenge:
      "Customers booked and re-booked services entirely through a mobile browser, with no way to notify them of availability or offers — leading to high one-time usage and low repeat bookings.",
    approach:
      "We built a cross-platform app with saved payment details, biometric login, and push notifications tied to booking availability.",
    outcome:
      "Repeat bookings now happen through a one-tap flow instead of a re-entered form, with push notifications driving re-engagement that previously required paid ads.",
  },

  faqs: [
    {
      question: "Should we build native apps or a cross-platform app?",
      answer:
        "It depends on your performance needs and budget. Cross-platform frameworks like React Native or Flutter cover most business apps well at lower cost; we recommend fully native only when the app demands it — and we'll tell you honestly which applies.",
    },
    {
      question: "How long does app store approval take?",
      answer:
        "Google Play review is typically same-day to a few days. Apple's App Store review usually takes 1–3 days, longer if there are compliance questions — we handle any back-and-forth on your behalf.",
    },
    {
      question: "Can the app work without an internet connection?",
      answer:
        "Yes, for workflows that need it. We build offline-first data handling so the app keeps functioning and syncs automatically once connectivity returns.",
    },
    {
      question: "Do you handle push notifications and analytics setup?",
      answer:
        "Yes — both are wired in during the build, so you can send targeted notifications and see real usage data from day one, not as a later add-on.",
    },
    {
      question: "What happens when a new iOS or Android version breaks something?",
      answer:
        "We offer ongoing maintenance plans that cover OS compatibility updates, so the app keeps working as platforms evolve without you needing to notice.",
    },
  ],

  cta: {
    title: "Ready to Own a Permanent Place on Your Customers' Phones?",
    subtitle:
      "Tell us who needs the app and what they need it to do. We'll show you the fastest, most reliable way to build it.",
    buttonLabel: "Book a Strategy Call",
  },

  relatedServices: ["ui-ux-design", "custom-software-development"],
  relatedSolutions: ["crm-systems", "inventory-management"],
  relatedIndustries: ["retail", "restaurants", "travel-agencies", "hotels"],
};
