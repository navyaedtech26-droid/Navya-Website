import {
  Server,
  GitMerge,
  Terminal,
  ShieldCheck,
  MessageSquare,
  LifeBuoy,
} from "lucide-react";
import type { FeatureItem } from "@/types";

export const features: FeatureItem[] = [
  {
    icon: Server,
    title: "Resilient Architecture",
    description: "Foundations built to absorb traffic spikes and complex integrations without accumulating technical debt.",
  },
  {
    icon: GitMerge,
    title: "Iterative Delivery",
    description: "We ship usable features fast and adapt to market feedback, rather than disappearing into a black box.",
  },
  {
    icon: Terminal,
    title: "Senior Engineering Teams",
    description: "Your project is built by veterans who understand business logic, not just code.",
  },
  {
    icon: ShieldCheck,
    title: "Zero-Compromise QA",
    description: "Rigorous automated testing and manual audits ensure flawless performance before your users ever see it.",
  },
  {
    icon: MessageSquare,
    title: "Total Transparency",
    description: "Direct access to the engineers building your product. Clear timelines, proactive updates, and no surprises.",
  },
  {
    icon: LifeBuoy,
    title: "Lifecycle Support",
    description: "We monitor, maintain, and scale your systems long after launch, protecting your investment over time.",
  },
];
