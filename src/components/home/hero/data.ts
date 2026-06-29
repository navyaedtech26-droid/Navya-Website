import {
  Globe,
  LayoutDashboard,
  ShoppingCart,
  Share2,
  type LucideIcon,
} from "lucide-react";
import type { MutableRefObject } from "react";

// ─── Types ───────────────────────────────────────────────────────────────────
export interface SphereDot {
  lat: number;
  lng: number;
  type: "grid" | "city";
  name?: string;
}

export interface Projected {
  x: number;
  y: number;
  z: number;
  visible: boolean;
}

/** Which service card (0-3) is currently hovered, shared across the canvases. */
export type HoverRef = MutableRefObject<number | null>;

// ─── Data ────────────────────────────────────────────────────────────────────
export const CITIES = [
  { lat: 35.68, lng: 139.69, name: "Tokyo" },
  { lat: 35.01, lng: 135.77, name: "Kyoto" },
  { lat: 1.35, lng: 103.82, name: "Singapore" },
  { lat: 37.56, lng: 126.97, name: "Seoul" },
  { lat: 51.51, lng: -0.13, name: "London" },
  { lat: 48.85, lng: 2.35, name: "Paris" },
  { lat: 40.71, lng: -74.0, name: "New York" },
  { lat: 37.77, lng: -122.42, name: "San Francisco" },
  { lat: -33.87, lng: 151.21, name: "Sydney" },
  { lat: 22.32, lng: 114.17, name: "Hong Kong" },
  { lat: 19.08, lng: 72.88, name: "Mumbai" },
  { lat: -23.55, lng: -46.63, name: "São Paulo" },
];

export const CONNECTIONS: [number, number][] = [
  [0, 1], [0, 3], [1, 3], [3, 9], [9, 6],
  [0, 5], [5, 6], [6, 7], [7, 11], [0, 8], [2, 3],
];

// Card index → city node it "hooks" into on the globe
export const CARD_NODE = [6, 0, 2, 4]; // New York, Tokyo, Singapore, London

// ─── Accent palette (sprinkled in small places) ───────────────────────────────
export const ACCENT = {
  blue: "245, 166, 35",
  green: "57,255,150",
  gold: "245,200,70",
};
// Per-card tether / linked-node accent
export const CARD_ACCENT = [ACCENT.blue, ACCENT.green, ACCENT.gold, ACCENT.blue];
// A handful of city nodes that glow off-blue (rest stay blue)
export const CITY_COLOR: Record<number, string> = {
  1: ACCENT.green, // Kyoto
  5: ACCENT.gold,  // Paris
  8: ACCENT.gold,  // Sydney
  10: ACCENT.green, // Mumbai
};

export const ORBITAL_RINGS = [
  { tilt: 0.4, speed: 0.004, phase: 0, color: "rgba(245, 166, 35,0.35)", dash: [6, 8], dot: ACCENT.blue },
  { tilt: -0.6, speed: -0.003, phase: Math.PI, color: "rgba(57,255,150,0.18)", dash: [3, 12], dot: ACCENT.green },
  { tilt: 0.9, speed: 0.005, phase: Math.PI / 2, color: "rgba(245,200,70,0.2)", dash: [8, 6], dot: ACCENT.gold },
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
    tag: "Web",
    title: "Web Development",
    sub: "Fast, modern & SEO-ready",
    icon: Globe,
    style: "top-0 left-0 sm:top-[2%] sm:left-[-7%]",
    float: "A",
    dur: 5,
  },
  {
    tag: "Systems",
    title: "ERP · CRM · LMS",
    sub: "Platforms that run ops",
    icon: LayoutDashboard,
    style: "top-[16%] right-0 sm:top-[20%] sm:right-[-8%]",
    float: "B",
    dur: 6.4,
  },
  {
    tag: "Commerce",
    title: "E-Commerce",
    sub: "Stores built to convert",
    icon: ShoppingCart,
    style: "bottom-[14%] right-0 sm:bottom-[16%] sm:right-[-6%]",
    float: "C",
    dur: 7,
  },
  {
    tag: "Social",
    title: "Social & Content",
    sub: "Reels, posts & campaigns",
    icon: Share2,
    style: "bottom-0 left-0 sm:bottom-[1%] sm:left-[-4%]",
    float: "D",
    dur: 6.2,
  },
];

export const easeEntrance = [0.22, 1, 0.36, 1] as const;
