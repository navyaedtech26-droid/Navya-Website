import {
  Globe,
  LayoutDashboard,
  ShoppingCart,
  Share2,
  type LucideIcon,
} from "lucide-react";
import type { MutableRefObject } from "react";

// ─── Types ───────────────────────────────────────────────────────────────────
/** Which service card (0-3) is currently hovered, shared across the canvases. */
export type HoverRef = MutableRefObject<number | null>;

// ─── Accent palette (sprinkled in small places) ───────────────────────────────
export const ACCENT = {
  blue: "8, 30, 77", // primary #081E4D
  green: "99, 102, 241", // secondary indigo #6366F1
  gold: "245, 158, 11", // accent amber #F59E0B
};
// Per-card tether / linked-node accent — mostly blue, with one indigo + one amber
export const CARD_ACCENT = [ACCENT.blue, ACCENT.green, ACCENT.gold, ACCENT.blue];

// ─── Growth-ring structure ─────────────────────────────────────────────────────
// The mark "grows" outward from the seed (Navya logo) in three concentric
// rings of nodes, each fading in in sequence, then gently dissolving back to
// the seed and renewing — a loop echoing "Navya" (new).
export interface GrowthRing {
  count: number;
  radiusFactor: number; // multiplier of R
  rotate: boolean;
  speed: number; // radians/frame when rotating
  revealFrom: number; // bloom threshold where this ring starts fading in
  revealWindow: number; // how much bloom-progress the fade-in takes
  dotSize: number;
}

export const GROWTH_RINGS: GrowthRing[] = [
  { count: 6, radiusFactor: 0.78, rotate: true, speed: 0.0016, revealFrom: 0.08, revealWindow: 0.22, dotSize: 3 },
  { count: 10, radiusFactor: 1.08, rotate: true, speed: -0.0011, revealFrom: 0.34, revealWindow: 0.24, dotSize: 2.6 },
  { count: 16, radiusFactor: 1.4, rotate: false, speed: 0, revealFrom: 0.6, revealWindow: 0.26, dotSize: 3.2 },
];

// Index into the outermost ring's nodes that each floating service card
// tethers to (up-left, up-right, down-right, down-left — matching card layout).
export const CARD_NODE = [10, 14, 2, 6];

export const ORBITAL_RINGS = [
  { tilt: 0.4, speed: 0.004, phase: 0, color: "rgba(8,30,77,0.30)", dash: [6, 8], dot: ACCENT.blue },
  { tilt: -0.6, speed: -0.003, phase: Math.PI, color: "rgba(99,102,241,0.24)", dash: [3, 12], dot: ACCENT.green },
  { tilt: 0.9, speed: 0.005, phase: Math.PI / 2, color: "rgba(245,158,11,0.24)", dash: [8, 6], dot: ACCENT.gold },
];

export interface ServiceCard {
  tag: string;
  title: string;
  sub: string;
  icon: LucideIcon;
  style: string;
  float: "A" | "B" | "C" | "D";
  dur: number;
}

export const SERVICE_CARDS: ServiceCard[] = [
  {
    tag: "Revenue",
    title: "Websites That Convert",
    sub: "More leads, more sales",
    icon: Globe,
    style: "top-0 left-0 sm:top-[2%] sm:left-[-7%]",
    float: "A",
    dur: 5,
  },
  {
    tag: "Efficiency",
    title: "Systems That Automate",
    sub: "Cut manual work & cost",
    icon: LayoutDashboard,
    style: "top-[16%] right-0 sm:top-[20%] sm:right-[-8%]",
    float: "B",
    dur: 6.4,
  },
  {
    tag: "Scale",
    title: "Commerce That Grows",
    sub: "Sell around the clock",
    icon: ShoppingCart,
    style: "bottom-[14%] right-0 sm:bottom-[16%] sm:right-[-6%]",
    float: "C",
    dur: 7,
  },
  {
    tag: "Reach",
    title: "Brands That Compound",
    sub: "Audience into pipeline",
    icon: Share2,
    style: "bottom-0 left-0 sm:bottom-[1%] sm:left-[-4%]",
    float: "D",
    dur: 6.2,
  },
];

export const easeEntrance = [0.22, 1, 0.36, 1] as const;
