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
    title: "Conversion-Driven Design",
    description: "Interfaces engineered to reduce friction and build immediate trust with your users.",
  },
  {
    icon: Gauge,
    title: "Optimized Performance",
    description: "Lightning-fast load times that directly improve your search rankings and user retention.",
  },
  {
    icon: Code2,
    title: "Maintainable Codebases",
    description: "Strict engineering standards that make future handoffs and feature additions seamless.",
  },
  {
    icon: Network,
    title: "Future-Proof Systems",
    description: "Infrastructure designed to scale alongside your user base and revenue.",
  },
  {
    icon: Search,
    title: "Search-Ready by Default",
    description: "Technical SEO best practices baked into the code from day one.",
  },
  {
    icon: UserCheck,
    title: "Strategic Partnership",
    description: "We align our technical decisions with your specific business objectives.",
  },
];
