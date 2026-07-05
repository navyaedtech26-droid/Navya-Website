import { Stethoscope, CalendarCheck, FileText, Bell, ShieldCheck, BarChart3, Users, HeartPulse } from "lucide-react";
import type { IndustryPage } from "@/types";

export const hospitalsIndustryPage: IndustryPage = {
  slug: "hospitals",
  icon: Stethoscope,
  color: "#2DD4BF",
  title: "Hospitals & Clinics",
  highlight: "Less Admin, Better Care",

  heroSubtitle:
    "Every hour spent on paper charts, phone-booked appointments, and manual billing is an hour not spent on patients. We build the booking, records, and billing systems that give that time back — securely.",

  seoTitle: "Digital Transformation for Hospitals & Clinics | Navya EdTech",
  seoDescription:
    "Patient management systems, appointment booking platforms, and billing software built for hospitals and clinics — reduce admin load, cut wait times, and keep patient records secure and organized.",
  seoKeywords: [
    "hospital management system",
    "clinic appointment booking software",
    "electronic patient records system",
    "medical billing software",
    "healthcare website development",
    "patient management system",
    "digital transformation for hospitals",
  ],

  challenges: {
    title: "Where Patient Care",
    highlight: "Gets Slowed by Admin",
    intro:
      "The clinical work is hard enough on its own. Most hospitals and clinics lose additional hours every day to admin processes that were never designed for the patient volume they now handle.",
    items: [
      {
        title: "Appointments are booked entirely by phone",
        description:
          "Reception staff spend hours a day on booking calls alone, while patients who prefer to book online have no option and often just walk away.",
      },
      {
        title: "Patient records are split across paper and spreadsheets",
        description:
          "A returning patient's history has to be manually located, slowing consultations and creating risk when a record is misplaced or out of date.",
      },
      {
        title: "Billing and insurance claims are reconciled by hand",
        description:
          "Front-desk staff manually calculate charges and cross-check insurance coverage, a slow process prone to errors that delay both payment and patient checkout.",
      },
      {
        title: "No-shows go untracked and unaddressed",
        description:
          "Without automated reminders, missed appointments quietly cost revenue and leave gaps in the schedule that could have gone to another patient.",
      },
      {
        title: "Patients can't access their own results or history",
        description:
          "Without a patient portal, every result or record request means another phone call or in-person visit, adding friction for patients and staff alike.",
      },
    ],
  },

  solutions: {
    title: "Systems That Protect",
    highlight: "Time for Patient Care",
    intro:
      "We build the specific systems that remove admin friction from booking through to billing — designed around clinical workflow, not generic office software.",
    items: [
      {
        icon: CalendarCheck,
        title: "Online appointment booking",
        description:
          "Patients book, reschedule, or cancel directly online or via app, with reminders that cut no-shows and free reception staff from constant phone duty.",
      },
      {
        icon: FileText,
        title: "Electronic patient records",
        description:
          "A secure, searchable record for every patient's history, replacing paper charts with instant access at the point of care.",
      },
      {
        icon: Bell,
        title: "Automated billing & insurance workflows",
        description:
          "Charges, payments, and insurance claims processed through one system, cutting reconciliation time and billing errors at checkout.",
      },
      {
        icon: HeartPulse,
        title: "Patient portal & results access",
        description:
          "A secure portal where patients view results, book follow-ups, and message the clinic, reducing inbound calls for routine requests.",
      },
    ],
  },

  roi: {
    title: "Where the Return",
    highlight: "Actually Comes From",
    intro:
      "The return is measured in staff hours freed for patient-facing work and revenue recovered from processes that used to leak it.",
    points: [
      "Fewer no-shows — automated reminders recover appointment slots that would otherwise sit empty.",
      "Shorter reception queues — online booking absorbs the volume that used to require a phone call and a hold.",
      "Faster, more accurate billing — automated claims and invoicing reduce reconciliation time and payment delays.",
      "Reduced risk from lost records — a searchable digital record replaces the risk of a misplaced paper chart.",
      "More time for clinical work — every admin task automated is time returned to patients instead of paperwork.",
    ],
  },

  features: {
    title: "What's Inside the",
    highlight: "Platform",
    intro: "Every feature maps to a specific admin bottleneck slowing down your front desk or back office today.",
    items: [
      {
        icon: CalendarCheck,
        title: "Online & app-based booking",
        description: "Patients self-schedule across departments, with automatic conflict checks.",
      },
      {
        icon: FileText,
        title: "Digital patient records",
        description: "Searchable history, prescriptions, and visit notes, accessible at the point of care.",
      },
      {
        icon: Bell,
        title: "Automated reminders",
        description: "SMS and app alerts that cut no-shows and keep the schedule full.",
      },
      {
        icon: BarChart3,
        title: "Billing & insurance dashboard",
        description: "Real-time visibility into claims, payments, and outstanding balances.",
      },
      {
        icon: Users,
        title: "Multi-department staff access",
        description: "Doctors, nurses, and admin each see the records relevant to their role.",
      },
      {
        icon: ShieldCheck,
        title: "Secure, access-logged records",
        description: "Every record access is logged, protecting patient data and audit compliance.",
      },
    ],
  },

  caseStudy: {
    illustrative: true,
    client: "A multi-department private clinic",
    challenge:
      "Booking ran entirely through phone calls, patient history was kept on paper, and billing was reconciled manually at the end of each day, creating long queues and frequent errors.",
    approach:
      "We built an online booking system with automated reminders, a digital patient records system, and an integrated billing dashboard for the front desk.",
    outcome:
      "No-shows dropped, reception call volume fell sharply, and billing reconciliation that used to take hours at day's end is now a live, continuously updated dashboard.",
  },

  faqs: [
    {
      question: "How is patient data kept secure and confidential?",
      answer:
        "Access is role-based and every record view is logged, so only authorized staff can see patient data, and any access is auditable after the fact.",
    },
    {
      question: "Can patients book appointments without creating an account?",
      answer:
        "We can configure either flow — a lightweight guest booking for simplicity, or an account-based portal that also gives patients access to their history and results.",
    },
    {
      question: "Does the billing system handle insurance claims?",
      answer:
        "Yes, we build the billing workflow around your specific insurance partners and claim formats, so reconciliation happens inside the same system as invoicing.",
    },
    {
      question: "Can this integrate with equipment or lab systems we already use?",
      answer:
        "In most cases, yes — we scope integration with existing lab or diagnostic systems during discovery so results flow into the patient record automatically.",
    },
  ],

  cta: {
    title: "Ready to Give Your Staff Back Their Time?",
    subtitle: "Tell us how booking, records, and billing work today. We'll show you exactly where the admin load can be removed.",
    buttonLabel: "Book a Strategy Call",
  },

  relatedIndustries: ["ngos", "retail"],
  relatedServices: ["systems", "websites", "business-intelligence"],
};
