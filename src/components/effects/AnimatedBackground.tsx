import { motion } from "framer-motion";
import { useRichMotion } from "@/hooks/useMediaQuery";

// The orbs are huge (40rem) and heavily blurred (120px). Animating their
// position (x/y) forces the browser to repaint that enormous blurred layer
// every frame — a major source of scroll/paint jank. Animating only `opacity`
// keeps the work on the compositor (GPU) for the same ambient "breathing" feel
// at a fraction of the cost.
const orbs = [
  { className: "left-[-10%] top-[-5%] h-[40rem] w-[40rem] bg-brand/25", dur: 22, opacity: [0.5, 0.9, 0.5] },
  { className: "right-[-15%] top-[20%] h-[32rem] w-[32rem] bg-cyan-accent/20", dur: 26, opacity: [0.4, 0.75, 0.4] },
  { className: "left-[20%] bottom-[-10%] h-[36rem] w-[36rem] bg-depth/20", dur: 30, opacity: [0.45, 0.8, 0.45] },
];

export default function AnimatedBackground() {
  // Only desktop + fine-pointer + motion-allowed visitors get the animated
  // layers. Secondary pages already run a per-hero WebGL shader; compositing
  // that on top of three animating 120px-blurred orbs + a blurred beam is
  // expensive on low-end mobile, so there we render the same backdrop fully
  // static — the orbs and grid still set the mood, just without the rAF cost.
  const rich = useRichMotion();

  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      {/* Base gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-bg via-bg to-bg-deep" />

      {/* Grid */}
      <div className="absolute inset-0 grid-bg opacity-60 [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_75%)]" />

      {/* Radial orbs — animated (opacity only, GPU-composited) on rich-motion
          desktops, static everywhere else. */}
      {orbs.map((orb, i) => (
        <motion.div
          key={i}
          className={`absolute rounded-full blur-[120px] ${orb.className}`}
          style={{ willChange: rich ? "opacity" : undefined }}
          animate={rich ? { opacity: orb.opacity } : undefined}
          transition={{
            duration: orb.dur,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* Slow gradient beam — desktop only; an extra full-height blurred layer
          is the first thing to drop on constrained devices. */}
      {rich && (
        <motion.div
          className="absolute left-1/2 top-0 h-[120vh] w-[60vw] -translate-x-1/2 rotate-12 bg-gradient-to-b from-brand/10 via-transparent to-transparent blur-3xl"
          animate={{ opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
      )}

      {/* Noise overlay */}
      <div className="absolute inset-0 noise opacity-[0.035] mix-blend-overlay" />
      <div className="absolute inset-0 bg-gradient-to-t from-bg-deep/80 via-transparent to-bg/60" />
    </div>
  );
}
