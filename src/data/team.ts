import type { LucideIcon } from "lucide-react";
import { Code2, Palette, Database, Megaphone } from "lucide-react";

export interface Founder {
  /** Full name — replace the placeholder with the real founder's name. */
  name: string;
  /** Title / position at Navya EdTech. */
  role: string;
  /** The discipline this founder leads. */
  focus: string;
  /** One or two sentences in the founder's voice. */
  bio: string;
  /** Discipline icon shown on the avatar badge. */
  icon: LucideIcon;
  /** Fallback shown until a real photo is provided. */
  initials: string;
  /**
   * Portrait image. Drop a square photo (≈ 600×600) in `public/team/`
   * and point to it, e.g. "/team/founder-1.jpg". Leave empty ("") to
   * show the initials placeholder.
   */
  image: string;
  /** Optional profile links — leave "" to hide the icon. */
  socials: {
    linkedin?: string;
    github?: string;
    email?: string;
  };
}

/**
 * The four founders of Navya EdTech.
 *
 * TODO: Replace the placeholder names, bios, photos and social links below
 * with the real details for each founder before going live.
 */
export const founders: Founder[] = [
  {
    name: "Founder One", // TODO: real name
    role: "Co-Founder & Head of Engineering",
    focus: "Engineering",
    bio: "Leads the build: websites, systems, and integrations engineered to stay fast and reliable as you scale.",
    icon: Code2,
    initials: "F1",
    image: "", // e.g. "/team/founder-1.jpg"
    socials: {
      linkedin: "",
      github: "",
      email: "",
    },
  },
  {
    name: "Founder Two", // TODO: real name
    role: "Co-Founder & Head of Design",
    focus: "Design",
    bio: "Owns the look and feel: premium, intuitive interfaces with real personality, crafted down to the last detail.",
    icon: Palette,
    initials: "F2",
    image: "", // e.g. "/team/founder-2.jpg"
    socials: {
      linkedin: "",
      github: "",
      email: "",
    },
  },
  {
    name: "Founder Three", // TODO: real name
    role: "Co-Founder & Solutions Architect",
    focus: "Data & Systems",
    bio: "Designs the backbone: scalable ERP, CRM, and BI platforms that fit the way your team actually works.",
    icon: Database,
    initials: "F3",
    image: "", // e.g. "/team/founder-3.jpg"
    socials: {
      linkedin: "",
      github: "",
      email: "",
    },
  },
  {
    name: "Founder Four", // TODO: real name
    role: "Co-Founder & Head of Growth",
    focus: "Growth",
    bio: "Drives reach with reels, scripts, campaigns, and strategy that turn good work into visible momentum.",
    icon: Megaphone,
    initials: "F4",
    image: "", // e.g. "/team/founder-4.jpg"
    socials: {
      linkedin: "",
      github: "",
      email: "",
    },
  },
];

/** @deprecated Use {@link founders}. Kept as an alias for existing imports. */
export const team = founders;
export type TeamMember = Founder;
