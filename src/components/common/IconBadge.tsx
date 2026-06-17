import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface IconBadgeProps {
  icon: LucideIcon;
  className?: string;
  size?: "sm" | "md" | "lg";
}

const sizes = {
  sm: { box: "h-10 w-10 rounded-xl", icon: 18 },
  md: { box: "h-12 w-12 rounded-2xl", icon: 22 },
  lg: { box: "h-14 w-14 rounded-2xl", icon: 26 },
};

export default function IconBadge({ icon: Icon, className, size = "md" }: IconBadgeProps) {
  const s = sizes[size];
  return (
    <div
      className={cn(
        "relative flex items-center justify-center bg-gradient-to-br from-brand/20 to-cyan-accent/10 text-brand-light ring-1 ring-brand/30",
        s.box,
        className
      )}
    >
      <div className="absolute inset-0 rounded-[inherit] bg-brand/20 blur-md opacity-60" />
      <Icon size={s.icon} className="relative z-10" strokeWidth={1.75} />
    </div>
  );
}
