import type { LucideIcon } from "lucide-react";
import { Code2, Palette, Megaphone, Database } from "lucide-react";

export interface TeamMember {
  name: string;
  role: string;
  focus: string;
  icon: LucideIcon;
  initials: string;
}

export const team: TeamMember[] = [
  {
    name: "Engineering",
    role: "Full-Stack Developers",
    focus: "Websites, systems & integrations built to last.",
    icon: Code2,
    initials: "EN",
  },
  {
    name: "Design",
    role: "UI / UX Designers",
    focus: "Premium, intuitive interfaces with real personality.",
    icon: Palette,
    initials: "DS",
  },
  {
    name: "Data & Systems",
    role: "Solution Architects",
    focus: "Scalable ERP, CRM & BI platforms that fit your workflow.",
    icon: Database,
    initials: "DA",
  },
  {
    name: "Growth",
    role: "Social & Content Team",
    focus: "Reels, scripts, campaigns & strategy that drive reach.",
    icon: Megaphone,
    initials: "GR",
  },
];
