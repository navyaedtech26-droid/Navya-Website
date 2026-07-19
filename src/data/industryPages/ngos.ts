import { HeartHandshake, Users, FileText, BarChart3, Bell, Globe, ShieldCheck, Handshake } from "lucide-react";
import type { IndustryPage } from "@/types";

export const ngosIndustryPage: IndustryPage = {
  slug: "ngos",
  icon: HeartHandshake,
  color: "#34D399",
  title: "NGOs & Nonprofits",
  highlight: "More Impact, Less Overhead",

  heroSubtitle:
    "Donor trust is earned through transparency, and transparency is hard to deliver from a spreadsheet. We build the donor, program, and reporting systems that let a lean team prove impact without a full-time admin hire.",

  heroImage: "/industries section/ngo.avif",

  seoTitle: "Digital Transformation for NGOs & Nonprofits in Nepal | Navya EdTech",
  seoDescription:
    "Donor management, program tracking, and nonprofit websites for NGOs, build donor trust, track impact accurately, and cut admin overhead.",
  seoKeywords: [
    "donor management system",
    "nonprofit CRM software",
    "NGO website development",
    "program and beneficiary tracking system",
    "nonprofit reporting dashboard",
    "online donation platform",
    "digital transformation for NGOs",
    "NGO website development Nepal",
  ],

  challenges: {
    title: "Where Do Small Teams Lose Time",
    highlight: "They Could Spend on Impact?",
    intro:
      "Most NGOs run lean by necessity. Every hour spent reconciling donor records or assembling a report by hand is an hour not spent on the program itself.",
    items: [
      {
        title: "Donor records live in spreadsheets and email",
        description:
          "Without a central system, tracking who gave what, when, and for which program becomes a manual reconciliation job every reporting cycle.",
      },
      {
        title: "Online donations are hard to accept or track",
        description:
          "Without an integrated donation platform, the organization either can't accept online giving at all, or receives it disconnected from donor records.",
      },
      {
        title: "Program and beneficiary data stays on paper",
        description:
          "Field data on beneficiaries or outcomes is collected on paper and manually entered later, delaying reporting and introducing transcription errors.",
      },
      {
        title: "Impact reports take days to assemble by hand",
        description:
          "When a donor or grant body asks for outcome data, staff manually pull numbers from multiple sources instead of exporting a live report.",
      },
      {
        title: "The website undersells the organization's credibility",
        description:
          "A dated or missing website makes it harder to earn trust from a donor or grant body researching the organization for the first time online.",
      },
    ],
  },

  solutions: {
    title: "Systems Sized for a",
    highlight: "Lean, Mission-Driven Team",
    intro:
      "We build the donor, program, and reporting systems that let a small team operate with the transparency and rigor larger organizations have.",
    items: [
      {
        icon: Users,
        title: "Donor management system (CRM)",
        description:
          "One record for every donor (giving history, communication, and program interest), replacing scattered spreadsheets and email threads.",
      },
      {
        icon: Handshake,
        title: "Online donation platform",
        description:
          "A secure, branded donation page connected directly to donor records, so every gift is tracked automatically without manual entry.",
      },
      {
        icon: FileText,
        title: "Program & beneficiary tracking",
        description:
          "Digital data collection for field programs, replacing paper forms and reducing the delay between data collection and reporting.",
      },
      {
        icon: Globe,
        title: "Credibility-focused nonprofit website",
        description:
          "A website that clearly communicates mission, impact, and transparency to donors and grant bodies researching you for the first time.",
      },
    ],
  },

  roi: {
    title: "Where Does the Return",
    highlight: "Actually Come From?",
    intro:
      "For an NGO, the return isn't measured in revenue alone. It's measured in donor retention, grant readiness, and staff hours returned to mission work.",
    points: [
      "Higher donor retention. Organized giving history supports timely, personal follow-up instead of generic mass outreach.",
      "Faster grant and donor reporting. Live program data turns an impact report into an export instead of a week of manual compilation.",
      "More online giving captured. An integrated donation platform makes it easier for supporters to give, and easier for you to track it.",
      "Fewer data-entry hours. Digital field data collection removes the delay and error risk of manual paper-to-spreadsheet transcription.",
      "Stronger credibility with funders. A professional website and transparent reporting build the trust that repeat funding depends on.",
    ],
  },

  features: {
    title: "What's Inside the",
    highlight: "Platform?",
    intro: "Every feature is scoped to what a lean nonprofit team actually needs to run donor relations and programs well.",
    items: [
      {
        icon: Users,
        title: "Donor & supporter CRM",
        description: "Giving history, communication log, and program interest in one record.",
      },
      {
        icon: Handshake,
        title: "Online donation & payment processing",
        description: "Secure giving pages connected directly to your donor database.",
      },
      {
        icon: FileText,
        title: "Program & beneficiary data collection",
        description: "Digital forms for field teams, replacing paper-based data collection.",
      },
      {
        icon: BarChart3,
        title: "Impact & grant reporting dashboard",
        description: "Live, exportable reports built for donors, boards, and grant bodies.",
      },
      {
        icon: Bell,
        title: "Automated donor communication",
        description: "Thank-you messages, receipts, and updates sent automatically after every gift.",
      },
      {
        icon: ShieldCheck,
        title: "Role-based data access",
        description: "Staff and volunteers see only the donor or program data relevant to their role.",
      },
    ],
  },

  caseStudy: {
    illustrative: true,
    client: "A community-focused nonprofit organization",
    challenge:
      "Donor records were spread across spreadsheets and email, online donations couldn't be accepted directly, and impact reports for funders took days to assemble by hand each quarter.",
    approach:
      "We built a donor management CRM connected to an online donation platform, alongside a program tracking system with an exportable impact reporting dashboard.",
    outcome:
      "Donor follow-up became timely and personal instead of generic, online giving is now tracked automatically, and quarterly funder reports are now a same-day export.",
  },

  faqs: [
    {
      question: "Is this affordable for a small nonprofit budget?",
      answer:
        "We scope the system to what your team actually needs first, so a smaller organization isn't paying for enterprise-scale features it won't use.",
    },
    {
      question: "Can donors give through the platform without creating an account?",
      answer:
        "Yes, we typically build a frictionless one-time or recurring donation flow that doesn't require account creation, while still logging the gift to your donor records.",
    },
    {
      question: "Can volunteers or field staff use the program tracking tool without much training?",
      answer:
        "Yes. Data collection forms are built to be as simple as filling out a paper form, so field staff need minimal onboarding.",
    },
    {
      question: "Does the reporting dashboard match the format our grant funders require?",
      answer:
        "We configure reports around the specific metrics and formats your funders and board require, rather than a generic template.",
    },
  ],

  cta: {
    title: "Ready to Spend Less Time Reporting and More Time on Mission?",
    subtitle: "Tell us how donor records, programs, and reporting work today. We'll show you exactly where the admin load can be lifted.",
    buttonLabel: "Book a Strategy Call",
  },

  relatedIndustries: ["schools", "hospitals"],
  relatedServices: ["websites", "social", "systems"],
  relatedSolutions: ["crm-systems", "business-intelligence-analytics"],
};
