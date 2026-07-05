import {
  Zap,
  Smartphone,
  Search,
  ShieldCheck,
  Settings2,
  Layers,
} from "lucide-react";
import type { FeatureItem } from "@/types";

export const features: FeatureItem[] = [
  {
    icon: Zap,
    title: "Fast & Responsive",
    description: "Sub-second load times that lift conversions and keep customers from bouncing.",
  },
  {
    icon: Smartphone,
    title: "Mobile Friendly",
    description: "A flawless experience for the majority of customers who arrive on mobile.",
  },
  {
    icon: Search,
    title: "SEO Optimized",
    description: "Engineered to rank, so you win high-intent traffic without paying for every click.",
  },
  {
    icon: ShieldCheck,
    title: "Secure & Reliable",
    description: "Hardened and monitored to protect your revenue, data, and reputation.",
  },
  {
    icon: Settings2,
    title: "Easy to Manage",
    description: "Your team runs the platform without a developer, cutting cost and delay.",
  },
  {
    icon: Layers,
    title: "Clean & Scalable",
    description: "Architecture that absorbs growth, so scaling never means starting over.",
  },
];
