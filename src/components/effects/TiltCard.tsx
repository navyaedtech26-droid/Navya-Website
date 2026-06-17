import { useRef, useState, type ReactNode } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useRichMotion } from "@/hooks/useMediaQuery";
import { cn } from "@/lib/utils";

interface TiltCardProps {
  children: ReactNode;
  className?: string;
  intensity?: number;
}

export default function TiltCard({
  children,
  className,
  intensity = 10,
}: TiltCardProps) {
  const enabled = useRichMotion();
  const ref = useRef<HTMLDivElement>(null);
  const [shine, setShine] = useState({ x: 50, y: 50 });

  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const srx = useSpring(rx, { stiffness: 150, damping: 18 });
  const sry = useSpring(ry, { stiffness: 150, damping: 18 });
  const rotateX = useTransform(srx, (v) => `${v}deg`);
  const rotateY = useTransform(sry, (v) => `${v}deg`);

  const handleMove = (e: React.MouseEvent) => {
    if (!enabled || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    rx.set((0.5 - py) * intensity);
    ry.set((px - 0.5) * intensity);
    setShine({ x: px * 100, y: py * 100 });
  };

  const reset = () => {
    rx.set(0);
    ry.set(0);
    setShine({ x: 50, y: 50 });
  };

  return (
    <motion.div
      ref={ref}
      data-cursor="hover"
      onMouseMove={handleMove}
      onMouseLeave={reset}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      className={cn(
        "group relative rounded-2xl [perspective:1000px] transition-shadow duration-300 hover:shadow-glow",
        className
      )}
    >
      {/* Moving shine */}
      <div
        className="pointer-events-none absolute inset-0 z-20 rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background: `radial-gradient(420px circle at ${shine.x}% ${shine.y}%, rgba(255,255,255,0.10), transparent 45%)`,
        }}
      />
      {/* Glow border */}
      <div className="pointer-events-none absolute inset-0 z-0 rounded-2xl opacity-0 ring-1 ring-brand/50 transition-opacity duration-300 group-hover:opacity-100" />
      <div style={{ transform: "translateZ(20px)" }} className="relative z-10 h-full">
        {children}
      </div>
    </motion.div>
  );
}
