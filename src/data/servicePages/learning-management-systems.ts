import { GraduationCap, BarChart3, Users, Award, Layers } from "lucide-react";
import type { ServicePage } from "@/types";

export const learningManagementSystemsServicePage: ServicePage = {
  slug: "learning-management-systems",
  category: "solution",
  icon: GraduationCap,
  title: "Learning Management Systems",
  highlight: "Training That Scales and Tracks Itself",

  heroSubtitle:
    "Training delivered over email and shared folders has no record of who actually completed it, or whether it worked. We build learning management systems that deliver, track, and prove training at scale.",

  heroImage: "/vectors1/lms-clean.avif",

  seoDescription:
    "Custom learning management systems that deliver, track, and certify training at scale, replacing untracked email and folder-based training.",

  seoKeywords: [
    "learning management system development",
    "custom LMS software Nepal",
    "corporate training platform",
    "e-learning platform development",
    "employee training tracking system",
    "online course platform",
    "LMS for schools and institutions",
  ],

  overview: {
    whatIsIt:
      "A custom learning management system for delivering, tracking, and certifying training — for employees, students, or paying learners.",
    whoNeedsIt:
      "Organizations delivering training through email, shared drives, or in-person sessions with no way to track completion or measure outcomes.",
    businessValue:
      "Converts untracked, one-off training delivery into a scalable system with completion records, assessments, and a real audit trail.",
    benefits: [
      "Training delivered consistently at scale, not session by session",
      "Completion and assessment tracking for every learner",
      "Certification records ready for compliance or client audits",
      "A platform that can become a new revenue channel, if desired",
    ],
  },

  businessProblem: {
    title: "Why Is Untracked Training a Risk",
    highlight: "You Only Notice After It Fails?",
    intro:
      "Most organizations don't lack training content — they lack a system that proves it was delivered, completed, and actually understood.",
    painPoints: [
      {
        title: "There's no record of who completed what training",
        description:
          "Training delivered over email or in a live session leaves no reliable completion record, so a compliance audit or client question has no clear answer.",
      },
      {
        title: "Onboarding new hires or students doesn't scale",
        description:
          "Repeating the same live training session for every new hire or cohort consumes staff time that a self-paced system would eliminate entirely.",
      },
      {
        title: "There's no way to measure if training actually worked",
        description:
          "Without built-in assessments, training completion is assumed rather than verified — leaving skill or knowledge gaps undetected until they cause a real problem.",
      },
      {
        title: "Content is scattered across drives, emails, and decks",
        description:
          "Training material lives in disconnected files with different versions floating around, making it unclear which version is current or complete.",
      },
      {
        title: "Certifications are tracked manually, if at all",
        description:
          "Compliance certifications and renewal deadlines are tracked in spreadsheets, creating a real risk of an expired certification going unnoticed.",
      },
      {
        title: "There's no path to monetize training expertise",
        description:
          "Organizations with genuinely valuable training content have no platform to package and sell it as a course to a wider audience.",
      },
    ],
  },

  businessImpact: {
    title: "What a Proper LMS",
    highlight: "Actually Changes?",
    intro:
      "A learning management system turns training from a one-off event into a scalable, measurable, auditable process.",
    points: [
      {
        icon: Layers,
        title: "Training scales without repeating staff time",
        description:
          "Self-paced courses let every new hire or student go through the same consistent training without a live session repeated each time.",
      },
      {
        icon: BarChart3,
        title: "Completion and comprehension become measurable",
        description:
          "Built-in assessments and progress tracking show exactly who completed training and how well they understood it — not just that a session happened.",
      },
      {
        icon: Award,
        title: "Certifications are tracked and never quietly expire",
        description:
          "Automated tracking and renewal alerts remove the compliance risk of a certification lapsing unnoticed.",
      },
      {
        icon: Users,
        title: "Training content becomes a manageable, versioned asset",
        description:
          "Centralizing course content in one platform replaces scattered files with a single current version everyone learns from.",
      },
    ],
  },

  roi: {
    title: "Where Does the Return",
    highlight: "Actually Come From?",
    intro:
      "An LMS's return shows up in reclaimed training-delivery hours and a documented audit trail that protects against compliance risk.",
    points: [
      "Reduced repeat-training staff hours — self-paced courses replace the need to deliver the same live session over and over.",
      "Lower compliance risk — automated certification tracking prevents the cost of an expired credential going unnoticed.",
      "Faster onboarding — new hires or students complete structured training in days, not whatever gap exists until the next live session.",
      "Measurable training effectiveness — built-in assessments reveal exactly where knowledge gaps remain, rather than assuming training worked.",
      "A potential new revenue stream — valuable internal training content can be packaged and sold to external learners through the same platform.",
    ],
  },

  workflow: [
    {
      step: "01",
      title: "Training Needs & Audience Review",
      description:
        "We understand who's being trained, on what content, and what proof of completion or certification you actually need.",
    },
    {
      step: "02",
      title: "Platform & Course Structure Design",
      description:
        "We design the course structure, assessment model, and certification logic around your specific training requirements.",
    },
    {
      step: "03",
      title: "Content Migration & Course Build",
      description:
        "We migrate existing training material into structured courses and build out any new content the audit revealed was missing.",
    },
    {
      step: "04",
      title: "Testing & Pilot Rollout",
      description:
        "We pilot the platform with a small group first, refining the experience before a full-scale rollout.",
    },
    {
      step: "05",
      title: "Full Rollout & Ongoing Support",
      description:
        "We roll out to the full audience with training for administrators, and stay on to support new course additions.",
    },
  ],

  implementation: {
    title: "What Actually Happens",
    highlight: "During the Build",
    intro:
      "No black box. Here's what you're involved in, and what you're handed at the end.",
    deliverables: [
      "A documented training needs assessment before course structure is designed",
      "Migrated and restructured training content into the new platform",
      "Assessment and quiz logic tied to each course module",
      "Automated certification tracking with renewal alerts",
      "Completion and performance dashboards for administrators",
      "Admin training and documentation for adding future courses",
    ],
  },

  timeline: [
    {
      phase: "Needs Assessment",
      duration: "3–5 days",
      description: "Training audience, content, and certification requirements review.",
    },
    {
      phase: "Platform Build",
      duration: "3–6 weeks",
      description: "Course structure, assessments, and certification logic development.",
    },
    {
      phase: "Content Migration",
      duration: "1–2 weeks",
      description: "Existing training material restructured into the platform.",
    },
    {
      phase: "Pilot & Full Rollout",
      duration: "1–2 weeks",
      description: "Small-group pilot, refinement, then full-scale launch.",
    },
  ],

  technology: [
    { category: "Core Platform", items: ["Custom LMS architecture", "Course & module builder"] },
    { category: "Assessment & Tracking", items: ["Quizzes & assessments", "Completion tracking", "Certification management"] },
    { category: "Delivery", items: ["Video hosting", "Mobile-responsive learning", "SCORM/xAPI support where needed"] },
  ],

  caseStudy: {
    illustrative: true,
    client: "A regional healthcare provider network",
    industry: "Healthcare",
    challenge:
      "Compliance training was delivered through in-person sessions with attendance tracked on paper sign-in sheets, making certification renewals difficult to monitor across multiple sites.",
    approach:
      "We built a learning management system with automated certification tracking, self-paced compliance courses, and renewal alerts for administrators.",
    outcome:
      "Compliance training now runs consistently across every site with a full digital completion record, and certification renewals are tracked automatically instead of on paper.",
  },

  faqs: [
    {
      question: "Can you migrate our existing training content into the new platform?",
      answer:
        "Yes — existing decks, documents, and videos are restructured into the platform's course format as part of the build.",
    },
    {
      question: "Do you build the training content itself, or just the platform?",
      answer:
        "Primarily the platform — we structure and migrate your existing content, and can advise on instructional design, but content creation is typically scoped separately if extensive new material is needed.",
    },
    {
      question: "Can this track compliance certifications and renewal deadlines?",
      answer:
        "Yes — automated certification tracking with renewal alerts is a core part of the platform for compliance-driven training.",
    },
    {
      question: "Could we eventually sell courses to external learners on this platform?",
      answer:
        "Yes, if that's a goal — we can scope payment integration and external access controls so the same platform supports both internal and paid external training.",
    },
    {
      question: "Is the platform accessible on mobile devices?",
      answer:
        "Yes, the platform is built mobile-responsive so learners can complete training on whatever device is convenient for them.",
    },
  ],

  cta: {
    title: "Ready to Prove Your Training Actually Happened?",
    subtitle:
      "Tell us how training is delivered today. We'll show you exactly what a tracked, scalable system would fix.",
    buttonLabel: "Book a Strategy Call",
  },

  relatedServices: ["custom-software-development", "mobile-app-development"],
  relatedSolutions: ["business-intelligence-analytics"],
  relatedIndustries: ["schools", "colleges", "ngos"],
};
