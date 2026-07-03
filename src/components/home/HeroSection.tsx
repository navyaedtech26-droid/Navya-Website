import { motion } from "framer-motion";
import { Headline } from "@/components/home/hero/Headline";
import { GlobeStage } from "@/components/home/hero/Globe";

// ─── Main HeroSection ─────────────────────────────────────────────────────────
// Thin shell that composes the hero: the marketing copy (Headline) and the
// interactive 3D globe with tethered service cards (GlobeStage). The heavy
// canvas logic lives in `@/hooks/useGlobeCanvas` and the hero/ subcomponents.
//
// Light redesign: a calm white hero. The dark star-field is dropped in favour
// of a single restrained brand wash + a faint blueprint grid (toned-down
// effects), keeping the neutral background at ~75% weight.
export default function HeroSection() {
  return (
    <section className="relative min-h-screen overflow-hidden bg-paper flex items-center px-5 sm:px-8 py-28 lg:py-32">

      {/* Page-specific background photo, edge to edge behind the content */}
      <img
        src="/home/home5.avif"
        alt=""
        aria-hidden
        loading="eager"
        fetchpriority="high"
        decoding="async"
        className="absolute inset-0 z-0 h-full w-full object-cover object-center pointer-events-none"
      />
      {/* Light scrim: keeps the dark hero copy legible over the photograph */}
      <div className="absolute inset-0 z-0 pointer-events-none bg-gradient-to-br from-paper/90 via-paper/78 to-paper/88" />

      {/* Faint blueprint grid — low-contrast texture, masked to fade out */}
      <div className="absolute inset-0 z-[1] pointer-events-none light-grid [mask-image:radial-gradient(ellipse_at_center,black_25%,transparent_78%)]" />

      {/* Single restrained brand wash (no multi-stop gradient soup) */}
      <div className="absolute inset-0 z-[1] pointer-events-none bg-hero-wash" />

      {/* Main grid */}
      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-10 lg:gap-16 items-center max-w-7xl mx-auto w-full">

        {/* ── LEFT: marketing copy ── */}
        <Headline />

        {/* ── RIGHT: 3D Globe + tethered service cards ── */}
        <GlobeStage />
      </div>

      {/* Scroll cue */}
      <motion.div
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 hidden lg:block opacity-50"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
      >
        <div className="flex h-9 w-5 items-start justify-center rounded-full border border-heading/20 p-1">
          <span className="h-2 w-1 rounded-full bg-primary" />
        </div>
      </motion.div>

      {/* Keyframes for float animations & breathe (consumed by the hero subtree) */}
      <style>{`
        @keyframes breathe {
          0%, 100% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.15); opacity: 0.7; }
        }
        @keyframes heroGradient {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        @keyframes badgeSweep {
          0% { transform: translateX(0) skewX(-12deg); }
          45%, 100% { transform: translateX(420%) skewX(-12deg); }
        }
        @keyframes svcFloatA {
          0%, 100% { transform: translate3d(0, 0, 0) rotate(-1.2deg); }
          50% { transform: translate3d(4px, -12px, 0) rotate(1deg); }
        }
        @keyframes svcFloatB {
          0%, 100% { transform: translate3d(0, 0, 0) rotate(1.2deg); }
          50% { transform: translate3d(-5px, 11px, 0) rotate(-1deg); }
        }
        @keyframes svcFloatC {
          0%, 100% { transform: translate3d(0, 0, 0) rotate(1deg); }
          50% { transform: translate3d(-4px, -10px, 0) rotate(-1.4deg); }
        }
        @keyframes svcFloatD {
          0%, 100% { transform: translate3d(0, 0, 0) rotate(-1deg); }
          50% { transform: translate3d(5px, 12px, 0) rotate(1.4deg); }
        }
        @media (prefers-reduced-motion: reduce) {
          [class*="svcFloat"], [style*="svcFloat"],
          [style*="heroGradient"], [style*="badgeSweep"],
          [style*="breathe"] { animation: none !important; }
        }
      `}</style>
    </section>
  );
}
