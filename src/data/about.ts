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
    description: "We chase the smartest path to your outcome, not trends for their own sake.",
  },
  {
    icon: Gem,
    title: "Quality",
    description: "Every detail is engineered to a standard we'd stake our name on.",
  },
  {
    icon: ShieldCheck,
    title: "Reliability",
    description: "We ship on time, communicate clearly, and stand behind the results.",
  },
  {
    icon: HeartHandshake,
    title: "Client Success",
    description: "Your growth is the only metric that matters. We win when you win.",
  },
];

export const whyChooseUs: FeatureItem[] = [
  {
    icon: Sparkles,
    title: "Modern UI/UX",
    description: "Interfaces that build trust and turn visitors into customers.",
  },
  {
    icon: Gauge,
    title: "Fast Performance",
    description: "Speed that directly lifts conversion, ranking, and retention.",
  },
  {
    icon: Code2,
    title: "Clean Code",
    description: "Maintainable engineering that lowers your long-term cost of ownership.",
  },
  {
    icon: Network,
    title: "Scalable Architecture",
    description: "Systems that grow with demand without breaking or rebuilding.",
  },
  {
    icon: Search,
    title: "SEO-Friendly Development",
    description: "Discoverability built in, so your best customers find you first.",
  },
  {
    icon: UserCheck,
    title: "Client-Focused Approach",
    description: "A transparent, responsive partnership focused on your results.",
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
