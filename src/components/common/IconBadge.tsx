import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface IconBadgeProps {
  icon: LucideIcon;
  className?: string;
  size?: "sm" | "md" | "lg";
  /** Accent colour (hex, e.g. "#F5A623"). Defaults to the brand amber. */
  color?: string;
}

const sizes = {
  sm: { box: "h-10 w-10 rounded-xl", icon: 18 },
  md: { box: "h-12 w-12 rounded-2xl", icon: 22 },
  lg: { box: "h-14 w-14 rounded-2xl", icon: 26 },
};

/**
 * A glossy "app-icon" style badge used site-wide for feature/section icons: a
 * rounded squircle filled with the accent colour as a soft gradient, a coloured
 * glow bloom, a glossy inner top highlight for a dimensional/3D feel, and the
 * glyph tinted to match. Pass `color` to theme an individual badge (e.g. the
 * per-sector colours on the Industries grid); it defaults to the brand amber so
 * the rest of the site stays consistent.
 *
 * Alpha is expressed via 8-digit hex suffixes (e.g. `${color}30` ≈ 19%).
 */
export default function IconBadge({
  icon: Icon,
  className,
  size = "md",
  color = "#F5A623",
}: IconBadgeProps) {
  const s = sizes[size];
  return (
    <div
      className={cn("relative isolate flex items-center justify-center border", s.box, className)}
      style={{
        background: `linear-gradient(145deg, ${color}30, ${color}0A)`,
        borderColor: `${color}45`,
        boxShadow: `0 10px 26px -12px ${color}80, inset 0 1px 0 0 ${color}55`,
      }}
    >
      {/* Coloured glow bloom behind the badge */}
      <span
        aria-hidden
        className="absolute inset-0 -z-10 rounded-[inherit] blur-md opacity-60"
        style={{ background: `${color}40` }}
      />
      {/* Glossy inner top highlight */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-x-1 top-1 h-1/2 rounded-lg opacity-50"
        style={{ background: `linear-gradient(to bottom, ${color}3D, transparent)` }}
      />
      <Icon size={s.icon} strokeWidth={1.9} className="relative z-10" style={{ color }} />
    </div>
  );
}
