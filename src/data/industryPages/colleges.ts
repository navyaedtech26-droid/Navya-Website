import { GraduationCap, Users, CalendarClock, Smartphone, BarChart3, LayoutDashboard, BookOpen, ShieldCheck } from "lucide-react";
import type { IndustryPage } from "@/types";

export const collegesIndustryPage: IndustryPage = {
  slug: "colleges",
  icon: GraduationCap,
  color: "#6366F1",
  title: "Colleges & Universities",
  highlight: "Scale Without Losing Control",

  heroSubtitle:
    "More programs, more faculty, more students, and more compliance paperwork than a single spreadsheet can track. We build the systems that let a growing institution scale enrollment without scaling admin headcount at the same rate.",

  heroImage: "/industries section/colleges-and-universities.avif",

  seoTitle: "Digital Transformation for Colleges & Universities in Nepal | Navya EdTech",
  seoDescription:
    "Student information systems, LMS platforms, and admissions websites for colleges and universities, scale enrollment without adding admin overhead.",
  seoKeywords: [
    "college management system",
    "university ERP software",
    "student information system",
    "learning management system for colleges",
    "college admissions website",
    "faculty and course scheduling software",
    "higher education digital transformation",
    "college ERP software Nepal",
  ],

  challenges: {
    title: "Why Does Growth Outpace",
    highlight: "the Systems Behind It?",
    intro:
      "A college that's grown past a single department finds that the tools which worked for 200 students break down at 2,000, not because the staff got worse, but because the process never scaled.",
    items: [
      {
        title: "Multi-program enrollment is tracked manually",
        description:
          "With several faculties, semesters, and intake cycles running in parallel, admissions staff juggle separate spreadsheets that fall out of sync with each other constantly.",
      },
      {
        title: "Course registration and scheduling clash",
        description:
          "Without a shared timetable system, students register for overlapping classes and faculty double-book rooms, creating last-minute scrambles every semester.",
      },
      {
        title: "Result and transcript requests take days",
        description:
          "A student needing a transcript or grade report waits on a manual lookup across paper or disconnected files, instead of a self-service download.",
      },
      {
        title: "Faculty and HR records sit outside the academic system",
        description:
          "Payroll, workload, and qualification records are tracked separately from the academic side, so a simple staffing report requires manually reconciling two systems.",
      },
      {
        title: "The institution is invisible to prospective students online",
        description:
          "Students researching where to apply compare programs and outcomes on the web first. An outdated site loses applicants before an advisor ever gets to speak with them.",
      },
    ],
  },

  solutions: {
    title: "Infrastructure Built for",
    highlight: "Institutional Scale",
    intro:
      "We design systems around your faculties, programs, and academic calendar, not a one-size-fits-all student portal.",
    items: [
      {
        icon: LayoutDashboard,
        title: "Student information system (SIS)",
        description:
          "A central record for every student across programs, admissions, enrollment, grades, and attendance in one queryable system instead of scattered files.",
      },
      {
        icon: BookOpen,
        title: "Learning management system (LMS)",
        description:
          "Course content, assignments, and grading delivered online, giving faculty and students one consistent place to teach and learn regardless of program size.",
      },
      {
        icon: CalendarClock,
        title: "Course & faculty scheduling",
        description:
          "Automated timetabling that flags clashes before they happen, so registration opens without a manual conflict-check across every department.",
      },
      {
        icon: Users,
        title: "Admissions & recruitment website",
        description:
          "A program-by-program admissions site built to convert research-stage visitors into applications, with clear paths to apply, inquire, or visit.",
      },
    ],
  },

  roi: {
    title: "Where Does the Return Show Up",
    highlight: "at Institutional Scale?",
    intro:
      "At a multi-program institution, small process fixes multiply. The same reduction in manual work happens every semester, across every department.",
    points: [
      "Lower cost per enrolled student. Digital admissions and recruitment convert more inquiries without adding recruitment staff.",
      "Reduced scheduling conflicts. Automated timetabling cuts the administrative fire-fighting that happens every semester at registration.",
      "Faster transcript and records turnaround. Self-service access removes a recurring administrative bottleneck for registrar staff.",
      "Cleaner compliance reporting. Centralized records make accreditation and regulatory reporting a data export, not a weeks-long audit.",
      "Higher faculty utilization. Clear scheduling and workload visibility reduces both idle capacity and overload across departments.",
    ],
  },

  features: {
    title: "What's Inside the",
    highlight: "Platform?",
    intro: "Built to reflect how a multi-program institution actually operates, department by department.",
    items: [
      {
        icon: Users,
        title: "Multi-program admissions pipeline",
        description: "Track applicants across every faculty and intake cycle from one dashboard.",
      },
      {
        icon: BookOpen,
        title: "LMS with grading & assignments",
        description: "Course delivery, submissions, and grading in a single faculty-facing workflow.",
      },
      {
        icon: CalendarClock,
        title: "Automated course scheduling",
        description: "Conflict-checked timetables across rooms, faculty, and student cohorts.",
      },
      {
        icon: BarChart3,
        title: "Registrar & compliance reporting",
        description: "Exportable reports built for accreditation bodies and internal review.",
      },
      {
        icon: Smartphone,
        title: "Student self-service portal",
        description: "Transcripts, results, and fee status available on demand, day or night.",
      },
      {
        icon: ShieldCheck,
        title: "Role-based access across departments",
        description: "Faculty, registrar, and admin staff each see only what their role requires.",
      },
    ],
  },

  caseStudy: {
    illustrative: true,
    client: "A multi-faculty private college",
    challenge:
      "Enrollment, scheduling, and results were managed on separate spreadsheets per department, causing scheduling clashes every semester and slow transcript turnaround for students.",
    approach:
      "We built a unified student information system with automated course scheduling and a self-service student portal, alongside a redesigned admissions website for prospective applicants.",
    outcome:
      "Registration clashes dropped sharply, transcript requests are now self-service, and the admissions team tracks every applicant across all faculties from a single dashboard.",
  },

  faqs: [
    {
      question: "Can the system handle multiple faculties and intake cycles?",
      answer:
        "Yes. It's built specifically for institutions running several programs and semesters in parallel, not a single-cohort model.",
    },
    {
      question: "Does this replace our existing LMS, or work alongside it?",
      answer:
        "Either. We can build a new LMS matched to your workflow, or integrate the student information system with an LMS you already use and want to keep.",
    },
    {
      question: "How is student data kept secure and access-controlled?",
      answer:
        "Role-based permissions mean faculty, registrar staff, and administrators only access the records relevant to their role, with full activity logging.",
    },
    {
      question: "Can prospective students apply directly through the website?",
      answer:
        "Yes. The admissions website connects directly to the enrollment pipeline, so an online application appears instantly on your admissions team's dashboard.",
    },
  ],

  cta: {
    title: "Ready to Scale Without Scaling Admin Overhead?",
    subtitle: "Tell us how enrollment, scheduling, and records are managed today. We'll show you exactly where the system should absorb the load.",
    buttonLabel: "Book a Strategy Call",
  },

  relatedIndustries: ["schools", "ngos"],
  relatedServices: ["systems", "websites", "business-intelligence"],
  relatedSolutions: ["learning-management-systems", "crm-systems"],
};
