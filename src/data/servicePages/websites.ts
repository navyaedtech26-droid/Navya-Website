import { Globe, TrendingUp, Wallet, Clock3, Search } from "lucide-react";
import type { ServicePage } from "@/types";

export const websitesServicePage: ServicePage = {
  slug: "websites",
  icon: Globe,
  title: "Website Development",
  highlight: "Built to Convert",

  heroSubtitle:
    "Your website is running a shift you can't see, deciding, before you ever get a call, whether a prospect trusts you enough to buy. We build it to win that shift.",

  heroImage: "/vector/web-dev.avif",

  seoDescription:
    "Conversion-engineered website development, from e-commerce builds to mobile-responsive redesigns and migrations, engineered for speed, trust, and SEO.",

  seoKeywords: [
    "website development",
    "e-commerce website development",
    "e-commerce website development Nepal",
    "custom website development Nepal",
    "mobile-responsive web design",
    "website redesign and migration services",
    "business website redesign",
    "hotel and resort booking website development",
    "Progressive Web App development",
    "conversion-focused website design",
    "responsive website design",
    "SEO-ready website development",
  ],

  overview: {
    whatIsIt: "A complete reimagining of your digital presence, engineered for performance, security, and measurable conversion.",
    whoNeedsIt: "Growing enterprises and established businesses, from e-commerce brands to hotels and resorts still paying commission to third-party booking platforms, whose current website is creating friction for sales, marketing, or customer trust.",
    businessValue: "Transforms a passive digital brochure into an active lead-generation engine that works 24/7.",
    benefits: [
      "Higher conversion rates through data-driven UX",
      "Sub-second load times that retain visitors",
      "Enterprise-grade security and compliance",
      "Seamless integration with your existing CRM",
      "Mobile-responsive design that performs identically on phones, tablets, and desktop",
      "Progressive Web App capability for app-like speed and offline reliability, no app store required"
    ]
  },

  businessProblem: {
    title: "Why Is the Website",
    highlight: "Quietly Losing You Deals?",
    intro:
      "Most business owners think of their website as a cost center they settled once, years ago. In practice, it's working (or failing) every single hour, without anyone in the room to notice.",
    painPoints: [
      {
        title: "Prospects leave before you know they arrived",
        description:
          "A visitor lands from a Google search or an ad, sees a slow, dated, or confusing site, and closes the tab. No form, no call, no record it ever happened.",
      },
      {
        title: "Credibility is judged before the sales pitch",
        description:
          "By the time a lead is willing to talk to you, they've already decided (from the site alone) whether your business looks like the safer, more established choice.",
      },
      {
        title: "The site can't be updated without a developer",
        description:
          "Pricing changes, new offers, or a seasonal promotion sit in a queue because the current site was hand-coded years ago and nobody in-house can touch it.",
      },
      {
        title: "Mobile visitors get a broken experience",
        description:
          "More than half of traffic arrives on a phone. If the layout breaks, buttons overlap, or forms don't fit the screen, that half of your market never gets a fair look at what you offer.",
      },
      {
        title: "Search engines can't find a reason to rank it",
        description:
          "Without a technical foundation built for SEO, the business stays invisible to the exact searches (\"[service] near me,\" \"[category] company\") that competitors are capturing instead.",
      },
      {
        title: "Every lead comes from paid ads",
        description:
          "With no organic visibility or on-site conversion path, growth is entirely rented from ad platforms. The moment spend stops, the pipeline stops with it.",
      },
    ],
  },

  businessImpact: {
    title: "What a Site Built for Business",
    highlight: "Actually Changes?",
    intro:
      "A website engineered around your sales process (not just your brand) shifts what happens after someone finds you. Here's where the impact shows up.",
    points: [
      {
        icon: TrendingUp,
        title: "More of your existing traffic converts",
        description:
          "The same visitors you already get from search, ads, and referrals move further down the funnel instead of bouncing, because the path to a form, call, or purchase is obvious.",
      },
      {
        icon: Search,
        title: "You earn traffic instead of renting it",
        description:
          "A technically sound, fast, structured site is what search engines can actually rank. Over time, that reduces how much of your pipeline depends on ad spend.",
      },
      {
        icon: Clock3,
        title: "Your team stops answering the same questions",
        description:
          "Pricing, process, FAQs, and proof are all on the site, pre-qualifying visitors before they ever reach a salesperson, shortening the sales cycle for every lead that does convert.",
      },
      {
        icon: Wallet,
        title: "Marketing spend gets more efficient",
        description:
          "When the destination page converts better, every dollar spent driving traffic to it (ads, social, referrals) goes further, without changing the campaign at all.",
      },
    ],
  },

  roi: {
    title: "Where Does the Return",
    highlight: "Actually Come From?",
    intro:
      "We won't hand you an invented percentage. Every business's baseline is different. What we can tell you precisely is which levers a rebuild pulls, so you can judge the return against your own numbers.",
    points: [
      "Lower cost per lead. A site that converts better turns the same ad and marketing spend into more qualified inquiries, without increasing the budget.",
      "Shorter sales cycle. Pricing, proof, and answers to common objections live on the site, so your team spends less time on questions the website should already have handled.",
      "Reduced dependency on paid acquisition. An SEO-sound technical foundation compounds organic visibility over months, lowering how much growth has to be bought.",
      "Fewer abandoned admin hours. A dynamic site your team can update directly removes the recurring cost of paying a developer for every content or price change.",
      "Higher perceived value at the same price point. Credibility built into the site lets you compete on trust instead of discounting to close the gap.",
    ],
  },

  workflow: [
    {
      step: "01",
      title: "Business & Audience Review",
      description:
        "We start with who you're actually trying to convert (their objections, their buying triggers), not a template's idea of your industry.",
    },
    {
      step: "02",
      title: "Competitor & Market Analysis",
      description:
        "We audit the sites already winning your searches and your customers' attention, so the rebuild starts ahead, not from a blank page.",
    },
    {
      step: "03",
      title: "Conversion-Path & Content Mapping",
      description:
        "Every page is planned around one job: move a specific visitor to a specific next action. Content and layout follow that map, not the other way round.",
    },
    {
      step: "04",
      title: "Design, Build & QA",
      description:
        "We design and build in parallel sprints, with staging links you can click through at every stage, and test across real devices before anything ships.",
    },
    {
      step: "05",
      title: "Launch & Growth Support",
      description:
        "After launch we stay on to monitor performance, tune what the data shows, and keep the site compounding results instead of quietly aging.",
    },
  ],

  implementation: {
    title: "What Actually Happens",
    highlight: "During the Build",
    intro:
      "No black box. Here's what you're involved in, and what we hand you at the end.",
    deliverables: [
      "A kickoff call to lock scope, goals, and success metrics before any design starts",
      "Content and asset collection, we tell you exactly what we need, in plain language",
      "A clickable staging link updated through every design and build milestone",
      "Cross-device and cross-browser QA before anything goes live",
      "An admin dashboard so your team can edit content without calling a developer (dynamic builds)",
      "For redesigns and migrations, a mapped 301 redirect plan that preserves your existing URLs, rankings, and analytics history",
      "A short handover walkthrough plus documentation for whoever manages the site day to day",
    ],
  },

  timeline: [
    {
      phase: "Discovery & Strategy",
      duration: "3–5 days",
      description: "Business review, competitor analysis, and the conversion-path map.",
    },
    {
      phase: "Design",
      duration: "~1 week",
      description: "Page-by-page design, reviewed and revised with you before development starts.",
    },
    {
      phase: "Development",
      duration: "1–2 weeks",
      description: "The site is built against the approved design, with a live staging link throughout.",
    },
    {
      phase: "QA & Launch",
      duration: "2–4 days",
      description: "Device testing, performance tuning, and a monitored go-live.",
    },
  ],

  technology: [
    { category: "Frontend", items: ["React", "Next.js", "Tailwind CSS", "Framer Motion", "Progressive Web Apps (PWA)"] },
    { category: "Backend & CMS", items: ["Node.js", "PHP", "MySQL", "Custom admin dashboards"] },
    { category: "E-Commerce & Booking", items: ["Custom online storefronts", "Payment gateway integration", "Hotel & resort direct-booking engines"] },
    { category: "Performance & SEO", items: ["Structured data", "Core Web Vitals tuning", "Semantic markup"] },
    { category: "Infrastructure", items: ["Hosting & domain setup", "SSL", "Continuous deployment"] },
  ],

  caseStudy: {
    client: "Kabita Shooting And Online Store",
    industry: "Retail & E-Commerce",
    challenge:
      "The business was running its online store and its back-office operations as two disconnected efforts, orders, inventory, and billing all tracked separately, with no shared source of truth.",
    approach:
      "We handled the full e-commerce website development end to end: a custom online store paired with a unified ERP backend, so the storefront and the operations behind it read from the same data instead of being reconciled by hand.",
    outcome:
      "Orders, inventory, and billing now run through one dashboard instead of scattered manual records, replacing guesswork with a single system the team can trust.",
  },

  faqs: [
    {
      question: "How long does a website project actually take?",
      answer:
        "A focused marketing or e-commerce site typically ships in 2–4 weeks from kickoff. Larger, content-heavy builds run longer. You get an exact timeline after the discovery call, not a vague estimate.",
    },
    {
      question: "Will I be able to update the site myself after launch?",
      answer:
        "Yes, for dynamic builds. We include an admin dashboard so your team can edit content, pricing, and pages directly, no developer required for routine changes.",
    },
    {
      question: "Can you redesign or migrate our existing website without losing our SEO rankings?",
      answer:
        "Yes. We audit what's already working (traffic sources, ranking pages, backlinks, brand assets) and carry that equity forward with a mapped 301 redirect plan, so a redesign or platform migration improves the site instead of resetting years of SEO progress, typically without downtime.",
    },
    {
      question: "Will my new website actually be mobile-responsive, not just \"mobile-friendly\"?",
      answer:
        "Every site is designed mobile-first, not adapted afterward, so layouts, forms, and navigation are built and tested on real phones and tablets before desktop, the same standard our e-commerce and PWA builds are held to.",
    },
    {
      question: "Do you handle SEO, or just the build?",
      answer:
        "Every site is built mobile-first with clean markup and structured data from day one, so it's positioned to rank. We can also scope ongoing SEO and content work as ongoing growth support.",
    },
    {
      question: "What if we're not sure exactly what we need yet?",
      answer:
        "That's what the business review step is for. Most projects start from a rough idea or a problem statement. We turn it into a scoped plan during discovery, before any commitment.",
    },
  ],

  cta: {
    title: "Ready to Stop Losing Deals to Your Own Website?",
    subtitle:
      "Tell us what's not converting. We'll show you exactly where the gap is and what fixing it is worth.",
    buttonLabel: "Book a Strategy Call",
  },

  relatedServices: ["ui-ux-design", "custom-software-development"],
  relatedSolutions: ["digital-transformation", "social-media-growth"],
  relatedIndustries: ["retail", "hotels", "real-estate", "restaurants"],
};
