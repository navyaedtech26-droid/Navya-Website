import { School, Users, FileText, Smartphone, Bell, LayoutDashboard, BarChart3, ShieldCheck, BookOpen } from "lucide-react";
import type { IndustryPage } from "@/types";

export const schoolsIndustryPage: IndustryPage = {
  slug: "schools",
  icon: School,
  color: "#38BDF8",
  title: "Schools",
  highlight: "Run Smoother, Enroll Faster",

  heroSubtitle:
    "Between admissions, attendance, fees, and parent communication, most school offices run on spreadsheets, paper registers, and phone calls. We replace the manual layer with software built around your academic calendar.",

  heroImage: "/industries section/education.avif",

  seoTitle: "Digital Transformation for Schools in Nepal | Navya EdTech",
  seoDescription:
    "School management systems, admissions websites, and parent communication platforms for K-12 schools, cut admin hours, enroll faster.",
  seoKeywords: [
    "school management system",
    "school ERP software",
    "school website development",
    "school admissions and enrollment software",
    "learning management system for schools",
    "student information system for schools",
    "student attendance system",
    "fee management software for schools",
    "parent communication app",
    "admissions CRM for schools",
    "digital transformation for schools",
    "school management system Nepal",
  ],

  challenges: {
    title: "Where Does School Admin",
    highlight: "Quietly Break Down?",
    intro:
      "Most schools don't lack effort. They lack systems. The same problems repeat every term because the tools weren't built for a school's rhythm.",
    items: [
      {
        title: "Admissions run on paper forms and phone calls",
        description:
          "Prospective parents call, fill a printed form, and wait, with no way to track where their application sits, so front-desk staff re-answer the same status questions all day.",
      },
      {
        title: "Attendance and grades live in separate registers",
        description:
          "Teachers mark attendance by hand and grades in a different notebook or spreadsheet, so a parent asking about either means someone physically pulling a file.",
      },
      {
        title: "Fee collection is a manual reconciliation job",
        description:
          "Accountants chase receipts, cross-check bank deposits against a ledger, and field the same 'has my payment been received?' question from dozens of parents every month.",
      },
      {
        title: "Parents have no real-time visibility",
        description:
          "Without a portal, parents only learn about attendance, results, or fee dues through a note sent home with the child, which too often never arrives.",
      },
      {
        title: "The school's online presence undersells it",
        description:
          "An outdated or missing website means parents comparing schools online see a competitor's polished site first, regardless of your actual academic quality.",
      },
    ],
  },

  solutions: {
    title: "A Digital Layer Built",
    highlight: "Around the School Calendar",
    intro:
      "We don't sell generic software. We build or configure the specific systems a school's admissions, academic, and finance cycle actually needs.",
    items: [
      {
        icon: LayoutDashboard,
        title: "School management system",
        description:
          "A single student information system covering admissions, attendance, grading, timetables, and staff records, replacing five disconnected spreadsheets with one source of truth.",
      },
      {
        icon: BookOpen,
        title: "Learning management system for schools",
        description:
          "Homework, class materials, and online learning delivered through the same platform, so teaching resources aren't scattered across chat groups and photocopied handouts.",
      },
      {
        icon: Bell,
        title: "Parent communication portal",
        description:
          "A portal and app where parents see attendance, results, homework, and fee status the moment it's recorded, no more notes that never make it home.",
      },
      {
        icon: FileText,
        title: "Online admissions & fee payment",
        description:
          "Parents apply, upload documents, and pay fees online, with your office tracking every application's status on a dashboard instead of a paper stack.",
      },
      {
        icon: Smartphone,
        title: "Admissions-focused school website",
        description:
          "A fast, credible website that answers a searching parent's real questions (curriculum, fees, facilities) and converts that visit into a scheduled tour.",
      },
    ],
  },

  roi: {
    title: "What This Is Actually",
    highlight: "Worth to a School?",
    intro:
      "The return isn't hypothetical. It shows up in staff hours, enrollment numbers, and fee collection cycles you can already measure.",
    points: [
      "Front-office hours reclaimed. Status questions that used to require a phone call are answered instantly by the parent portal.",
      "Faster fee collection. Automated reminders and online payment shorten the gap between a due date and a received payment.",
      "Higher admissions conversion. An online application with visible status reduces the drop-off between inquiry and enrollment.",
      "Fewer data-entry errors. One shared system means attendance, grades, and fees are entered once, not re-typed across separate registers.",
      "A stronger first impression. A modern website and portal signal the same professionalism prospective parents expect from your classrooms.",
    ],
  },

  features: {
    title: "What's Inside the",
    highlight: "Platform?",
    intro: "Every feature is scoped to a job your admin, academic, or finance team already does by hand.",
    items: [
      {
        icon: Users,
        title: "Admissions & enrollment tracking",
        description: "A pipeline view of every applicant, from inquiry to enrolled student.",
      },
      {
        icon: FileText,
        title: "Attendance & gradebook",
        description: "Teachers mark attendance and grades once; parents and admin see it immediately.",
      },
      {
        icon: Bell,
        title: "Automated parent notifications",
        description: "SMS and app alerts for attendance, results, events, and fee due dates.",
      },
      {
        icon: BarChart3,
        title: "Fee & finance dashboard",
        description: "Real-time visibility into collections, dues, and outstanding balances by class.",
      },
      {
        icon: Smartphone,
        title: "Mobile-friendly parent app",
        description: "Everything a parent needs to check, on the device they already use daily.",
      },
      {
        icon: ShieldCheck,
        title: "Role-based staff access",
        description: "Teachers, accountants, and admins each see exactly what their role requires, nothing more.",
      },
    ],
  },

  caseStudy: {
    illustrative: true,
    client: "A mid-sized private school",
    challenge:
      "Admissions, attendance, and fee records were split across paper forms, a shared spreadsheet, and a separate accounting notebook, with no way for parents to check status without calling the office.",
    approach:
      "We built a school management system covering admissions, attendance, and fee tracking, paired with a parent portal and a redesigned admissions website.",
    outcome:
      "The front office now spends a fraction of the time on status calls, fee reminders go out automatically, and prospective parents can apply and track their application entirely online.",
  },

  faqs: [
    {
      question: "Can this integrate with the exam board or curriculum we already follow?",
      answer:
        "Yes. The gradebook and report card structure are configured around your specific grading scale, subjects, and terms, not a generic template.",
    },
    {
      question: "Will our teachers need training to use it?",
      answer:
        "We design the interface to be as simple as marking a paper register, and include a short onboarding session for staff before go-live.",
    },
    {
      question: "Can parents pay fees online through the portal?",
      answer:
        "Yes, we integrate local payment gateways so parents can pay directly through the portal, with receipts generated automatically.",
    },
    {
      question: "Do you also handle the school's public website?",
      answer:
        "Yes. We typically pair the management system with a fast, SEO-ready admissions website, since the two work together to convert inquiries into enrollments.",
    },
    {
      question: "Do you build a learning management system (LMS) for schools, not just the admin side?",
      answer:
        "Yes. We build or integrate an LMS alongside the school management system, so homework, class materials, and online learning content live in the same platform parents and teachers already use.",
    },
    {
      question: "Is this a full school ERP, or separate tools stitched together?",
      answer:
        "It's built as a unified school ERP. Admissions, attendance, fees, and staff records all read from one system, not individual modules bolted together after the fact.",
    },
  ],

  cta: {
    title: "Ready to Give Your School Office Its Time Back?",
    subtitle: "Tell us how admissions, attendance, and fees are handled today. We'll show you exactly what a digital layer removes.",
    buttonLabel: "Book a Strategy Call",
  },

  relatedIndustries: ["colleges", "ngos"],
  relatedServices: ["systems", "websites", "business-intelligence"],
  relatedSolutions: ["learning-management-systems", "erp-systems", "billing-invoicing"],
};
