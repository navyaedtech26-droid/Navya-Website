import { motion } from "framer-motion";
import { Code2, Database, Cloud, Cpu, type LucideIcon } from "lucide-react";
import { useReducedMotion } from "@/hooks/useMediaQuery";

const icons: { icon: LucideIcon; angle: number }[] = [
  { icon: Code2, angle: 0 },
  { icon: Database, angle: 90 },
  { icon: Cloud, angle: 180 },
  { icon: Cpu, angle: 270 },
];

interface OrbitSystemProps {
  radius?: number;
  duration?: number;
}

export default function OrbitSystem({ radius = 210, duration = 26 }: OrbitSystemProps) {
  const reduced = useReducedMotion();

  return (
    <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
      {/* Rotating rings */}
      <div
        className="absolute rounded-full border border-white/5"
        style={{ width: radius * 2, height: radius * 2 }}
      />
      <div
        className="absolute rounded-full border border-brand/10"
        style={{ width: radius * 1.55, height: radius * 1.55 }}
      />

      <motion.div
        className="absolute"
        style={{ width: radius * 2, height: radius * 2 }}
        animate={reduced ? undefined : { rotate: 360 }}
        transition={{ duration, repeat: Infinity, ease: "linear" }}
      >
        {icons.map(({ icon: Icon, angle }, i) => {
          const rad = (angle * Math.PI) / 180;
          const cx = radius + Math.cos(rad) * radius;
          const cy = radius + Math.sin(rad) * radius;
          return (
            <motion.div
              key={i}
              className="absolute flex h-12 w-12 items-center justify-center rounded-2xl glass text-cyan-accent ring-1 ring-brand/30 shadow-glow-sm"
              style={{ left: cx, top: cy, x: "-50%", y: "-50%" }}
              // Counter-rotate so icons stay upright
              animate={reduced ? undefined : { rotate: -360 }}
              transition={{ duration, repeat: Infinity, ease: "linear" }}
            >
              <Icon size={20} strokeWidth={1.75} />
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
}
