import { Share2, Camera, TrendingUp, Users, BarChart3 } from "lucide-react";
import type { ServicePage } from "@/types";

export const socialMediaGrowthServicePage: ServicePage = {
  slug: "social-media-growth",
  category: "solution",
  icon: Share2,
  title: "Social Media & Growth",
  highlight: "Turn Attention Into Pipeline",

  heroSubtitle:
    "Posting consistently isn't the same as growing. Without a strategy tying content to a business outcome, social media becomes a task your team maintains rather than a channel that generates pipeline. We build the content, campaigns, and reporting that turn attention into customers.",

  heroImage: "/vectors1/socialmedia-clean.avif",

  seoDescription:
    "Social media and growth services framed as a business decision: the cost of unstrategic posting, the impact of a strategy-led approach, the workflow, timeline, technology, and a real client outcome from Navya EdTech.",

  seoKeywords: [
    "social media management services",
    "content marketing agency Nepal",
    "social media growth strategy",
    "video production for brands",
    "paid social advertising management",
    "content creation and copywriting",
    "social media analytics and reporting",
  ],

  overview: {
    whatIsIt:
      "Strategy-led social media management — content creation, video production, and paid campaigns — tied to measurable growth, not just a posting calendar.",
    whoNeedsIt:
      "Businesses posting on social media without a clear strategy, seeing engagement but no measurable connection to leads or revenue.",
    businessValue:
      "Converts social media from a maintained task into a channel that builds authority, grows reach, and measurably feeds the sales pipeline.",
    benefits: [
      "Content and campaigns tied to a defined growth goal, not just a posting quota",
      "Consistent brand presence without consuming internal team time",
      "Paid campaigns optimized for return, not just reach",
      "Reporting that connects social activity to actual leads and revenue",
    ],
  },

  businessProblem: {
    title: "Why Is Posting Without a Strategy",
    highlight: "Just Activity, Not Growth?",
    intro:
      "Most businesses on social media are active, not strategic — posting consistently without a plan that ties any of it back to leads, revenue, or brand authority.",
    painPoints: [
      {
        title: "Content gets posted without a clear purpose",
        description:
          "Without a strategy, posts go out because it's Tuesday, not because they're building toward a specific audience or business outcome.",
      },
      {
        title: "Engagement doesn't translate into pipeline",
        description:
          "Likes and comments accumulate with no clear path connecting that attention to an actual lead, inquiry, or sale.",
      },
      {
        title: "Video and creative production is inconsistent",
        description:
          "Without a dedicated production process, content quality swings wildly, undermining the professional image the brand needs to project consistently.",
      },
      {
        title: "Paid ad spend isn't optimized for a return",
        description:
          "Boosted posts and ad campaigns run without clear targeting or conversion tracking, so it's unclear whether the spend is actually working.",
      },
      {
        title: "There's no reporting connecting activity to results",
        description:
          "Follower counts and engagement rates get reported, but nobody can say whether social media actually contributed to a closed deal.",
      },
      {
        title: "Internal staff are stretched managing it alongside their real job",
        description:
          "Social media often falls to whoever has time, rather than someone dedicated to doing it strategically and consistently.",
      },
    ],
  },

  businessImpact: {
    title: "What a Strategy-Led Approach",
    highlight: "Actually Changes?",
    intro:
      "Tying content and campaigns to a defined growth goal changes social media from a maintained task into a channel with a measurable return.",
    points: [
      {
        icon: Users,
        title: "Content builds toward a specific audience and goal",
        description:
          "Every piece of content is planned against a defined strategy, so activity compounds toward brand authority and lead generation instead of just filling a calendar.",
      },
      {
        icon: Camera,
        title: "Production quality stays consistently professional",
        description:
          "A dedicated content and video production process replaces inconsistent, ad hoc creative with a polished, on-brand output every time.",
      },
      {
        icon: TrendingUp,
        title: "Paid spend gets targeted and tracked",
        description:
          "Campaigns are built around defined audiences and conversion tracking, so ad spend is optimized for return instead of just reach.",
      },
      {
        icon: BarChart3,
        title: "Reporting connects activity to actual business results",
        description:
          "Analytics tie social media activity back to leads and conversions, so you can see clearly whether the channel is working and where to invest more.",
      },
    ],
  },

  roi: {
    title: "Where Does the Return",
    highlight: "Actually Come From?",
    intro:
      "Social media's return becomes measurable once it's tied to a strategy — visible in leads generated, ad efficiency, and internal time reclaimed from managing it ad hoc.",
    points: [
      "Leads generated directly from social — strategy-led content and campaigns create a trackable path from attention to inquiry.",
      "More efficient ad spend — targeted campaigns with conversion tracking waste less budget on audiences unlikely to convert.",
      "Reclaimed internal staff time — dedicated management frees your team from maintaining a channel alongside their primary role.",
      "Compounding brand authority — consistent, strategic content builds trust over time, lowering the cost of converting future leads.",
      "Clear visibility into what's working — reporting that ties activity to results lets you double down on what's actually generating pipeline.",
    ],
  },

  workflow: [
    {
      step: "01",
      title: "Brand & Audience Strategy",
      description:
        "We define who you're actually trying to reach and what action you want social media to drive — before planning a single post.",
    },
    {
      step: "02",
      title: "Content & Campaign Planning",
      description:
        "We build a content calendar and campaign plan tied to the defined strategy, not a generic posting schedule.",
    },
    {
      step: "03",
      title: "Content Creation & Production",
      description:
        "We produce the content — video, graphics, copy — to a consistent professional standard, on-brand every time.",
    },
    {
      step: "04",
      title: "Publishing & Paid Campaign Management",
      description:
        "We manage day-to-day publishing and run paid campaigns with defined targeting and conversion tracking.",
    },
    {
      step: "05",
      title: "Reporting & Strategy Refinement",
      description:
        "We report on what's actually driving leads and refine the strategy based on real performance, not vanity metrics.",
    },
  ],

  implementation: {
    title: "What Actually Happens",
    highlight: "During the Engagement",
    intro:
      "No black box. Here's what you're involved in, and what you receive on an ongoing basis.",
    deliverables: [
      "A documented content and growth strategy tied to specific business goals",
      "A recurring content calendar covering posts, reels, and blog content",
      "Professionally produced video and graphic content on a consistent schedule",
      "Managed paid campaigns with defined targeting and conversion tracking",
      "Regular performance reporting connecting activity to leads and conversions",
      "Ongoing strategy adjustments based on what the data shows is working",
    ],
  },

  timeline: [
    {
      phase: "Strategy",
      duration: "1 week",
      description: "Audience definition, goal setting, and a content and campaign plan.",
    },
    {
      phase: "Content Production Setup",
      duration: "1–2 weeks",
      description: "Initial content batch production and publishing calendar setup.",
    },
    {
      phase: "Ongoing Management",
      duration: "Monthly",
      description: "Continuous content creation, publishing, and paid campaign management.",
    },
    {
      phase: "Reporting & Refinement",
      duration: "Monthly",
      description: "Performance review and strategy adjustment based on real results.",
    },
  ],

  technology: [
    { category: "Content", items: ["Video production", "Graphic design", "Copywriting & scriptwriting"] },
    { category: "Distribution", items: ["Social media scheduling tools", "Paid ad platforms", "Blog & SEO content"] },
    { category: "Analytics", items: ["Engagement & reach tracking", "Conversion attribution", "Campaign performance dashboards"] },
  ],

  caseStudy: {
    illustrative: true,
    client: "A consumer services brand",
    industry: "Consumer Services",
    challenge:
      "The business posted regularly on social media with decent engagement, but had no way to connect that activity to any actual leads or sales, and internal staff managed it alongside unrelated roles.",
    approach:
      "We built a content and paid campaign strategy tied to a defined lead-generation goal, took over production and publishing, and set up conversion tracking on all paid activity.",
    outcome:
      "Social media now generates a trackable stream of leads instead of untracked engagement, and internal staff are no longer split between their core role and content management.",
  },

  faqs: [
    {
      question: "How is this different from just hiring a social media manager?",
      answer:
        "We bring strategy, content production, and paid campaign management together as one accountable service tied to measurable growth goals, rather than just filling a posting calendar.",
    },
    {
      question: "Can you prove social media is actually generating leads for us?",
      answer:
        "Yes — conversion tracking and reporting are built into the engagement from the start, so you see a clear connection between activity and actual leads, not just engagement metrics.",
    },
    {
      question: "Do you handle video production, or just written content?",
      answer:
        "Both — video, graphics, and written content are all part of the service, produced to a consistent professional standard.",
    },
    {
      question: "Do you manage paid ad spend as well as organic content?",
      answer:
        "Yes — paid campaign management with defined targeting and conversion tracking is part of the engagement where it fits your growth goals.",
    },
    {
      question: "How quickly will we see results?",
      answer:
        "Paid campaign results are typically visible within weeks; organic content and brand authority build measurably over a few months of consistent, strategic execution.",
    },
  ],

  cta: {
    title: "Ready to Turn Social Media Into an Actual Growth Channel?",
    subtitle:
      "Tell us what your current social media activity isn't delivering. We'll show you exactly what a strategy-led approach would change.",
    buttonLabel: "Book a Strategy Call",
  },

  relatedServices: ["websites", "ui-ux-design"],
  relatedIndustries: ["restaurants", "hotels", "retail", "travel-agencies"],
};
