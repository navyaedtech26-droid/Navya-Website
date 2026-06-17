import { motion } from "framer-motion";
import { useReducedMotion } from "@/hooks/useMediaQuery";
import { cn } from "@/lib/utils";

interface MotionBeamProps {
  className?: string;
  delay?: number;
  duration?: number;
}

/** A thin diagonal light beam that sweeps along its own length. */
export default function MotionBeam({
  className,
  delay = 0,
  duration = 3.5,
}: MotionBeamProps) {
  const reduced = useReducedMotion();
  return (
    <div
      className={cn(
        "pointer-events-none absolute h-px w-40 overflow-hidden opacity-70",
        className
      )}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-brand-light/40 to-transparent" />
      {!reduced && (
        <motion.div
          className="absolute top-0 h-px w-10 bg-gradient-to-r from-transparent via-cyan-accent to-transparent"
          animate={{ x: ["-2.5rem", "10rem"] }}
          transition={{
            duration,
            delay,
            repeat: Infinity,
            ease: "easeInOut",
            repeatDelay: 1,
          }}
        />
      )}
    </div>
  );
}
