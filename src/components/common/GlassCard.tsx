import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface GlassCardProps {
  children: ReactNode;
  className?: string;
}

export default function GlassCard({ children, className }: GlassCardProps) {
  return (
    <div
      className={cn(
        "glass rounded-2xl p-6 transition-colors duration-300",
        className
      )}
    >
      {children}
    </div>
  );
}
