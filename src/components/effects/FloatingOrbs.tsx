import { useMemo } from "react";
import { motion } from "framer-motion";
import { randomBetween } from "@/lib/utils";
import { useReducedMotion } from "@/hooks/useMediaQuery";

interface FloatingOrbsProps {
  count?: number;
  className?: string;
}

export default function FloatingOrbs({ count = 6, className }: FloatingOrbsProps) {
  const reduced = useReducedMotion();
  const particles = useMemo(
    () =>
      Array.from({ length: count }).map(() => ({
        left: randomBetween(0, 100),
        top: randomBetween(0, 100),
        size: randomBetween(3, 8),
        dur: randomBetween(5, 11),
        delay: randomBetween(0, 5),
        amp: randomBetween(8, 20),
      })),
    [count]
  );

  return (
    <div className={`pointer-events-none absolute inset-0 overflow-hidden ${className ?? ""}`}>
      {particles.map((p, i) => (
        <motion.span
          key={i}
          // No per-particle box-shadow glow: that forces an expensive blurred
          // repaint for every dot. A solid, slightly brighter dot reads almost
          // identically at these sizes for a fraction of the paint cost.
          className="absolute rounded-full bg-cyan-accent/70"
          style={{
            left: `${p.left}%`,
            top: `${p.top}%`,
            width: p.size,
            height: p.size,
            willChange: reduced ? undefined : "transform, opacity",
          }}
          animate={
            reduced
              ? undefined
              : { y: [0, -p.amp, 0], opacity: [0.2, 0.8, 0.2] }
          }
          transition={{
            duration: p.dur,
            repeat: Infinity,
            ease: "easeInOut",
            delay: p.delay,
          }}
        />
      ))}
    </div>
  );
}
