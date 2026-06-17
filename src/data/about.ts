import {
  Lightbulb,
  Gem,
  ShieldCheck,
  HeartHandshake,
  Sparkles,
  Gauge,
  Code2,
  Network,
  Search,
  UserCheck,
  type LucideIcon,
} from "lucide-react";
import type { ValueItem, FeatureItem } from "@/types";

export const coreValues: ValueItem[] = [
  {
    icon: Lightbulb,
    title: "Innovation",
    description: "We chase better ways to solve real problems, not trends for their own sake.",
  },
  {
    icon: Gem,
    title: "Quality",
    description: "Every detail is crafted to a standard we'd be proud to put our name on.",
  },
  {
    icon: ShieldCheck,
    title: "Reliability",
    description: "We ship on time, communicate clearly, and stand behind our work.",
  },
  {
    icon: HeartHandshake,
    title: "Client Success",
    description: "Your growth is the metric that matters. We win when you win.",
  },
];

export const whyChooseUs: FeatureItem[] = [
  {
    icon: Sparkles,
    title: "Modern UI/UX",
    description: "Interfaces that feel premium, intuitive, and on-brand.",
  },
  {
    icon: Gauge,
    title: "Fast Performance",
    description: "Optimized to the millisecond for speed and smoothness.",
  },
  {
    icon: Code2,
    title: "Clean Code",
    description: "Readable, tested, and maintainable engineering.",
  },
  {
    icon: Network,
    title: "Scalable Architecture",
    description: "Systems designed to grow without breaking.",
  },
  {
    icon: Search,
    title: "SEO-Friendly Development",
    description: "Built from the ground up to be discoverable.",
  },
  {
    icon: UserCheck,
    title: "Client-Focused Approach",
    description: "Transparent, collaborative, and always responsive.",
  },
];

export const techStack: string[] = [
  "React",
  "Next.js",
  "Node.js",
  "PHP",
  "MySQL",
  "Tailwind CSS",
  "Framer Motion",
  "GitHub",
  "Vercel",
  "Cloudinary",
];

export type { LucideIcon };
