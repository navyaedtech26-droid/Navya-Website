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
    description: "Sub-second loads and smooth interactions on every connection.",
  },
  {
    icon: Smartphone,
    title: "Mobile Friendly",
    description: "Designed mobile-first so it looks perfect in every hand.",
  },
  {
    icon: Search,
    title: "SEO Optimized",
    description: "Built to rank with clean markup, speed, and structured data.",
  },
  {
    icon: ShieldCheck,
    title: "Secure & Reliable",
    description: "Hardened, monitored, and built on modern security best practices.",
  },
  {
    icon: Settings2,
    title: "Easy to Manage",
    description: "Intuitive admin tools so you stay in control without a developer.",
  },
  {
    icon: Layers,
    title: "Clean & Scalable",
    description: "Modular, maintainable code that grows alongside your business.",
  },
];
