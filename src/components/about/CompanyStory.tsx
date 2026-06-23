import { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Sparkles, Code2, BarChart3, Globe, Cpu, type LucideIcon } from "lucide-react";
import Container from "@/components/common/Container";
import Reveal from "@/components/effects/Reveal";
import FloatingOrbs from "@/components/effects/FloatingOrbs";

const PANES: { icon: LucideIcon; bars: number[] }[] = [
  { icon: Code2, bars: [0.5, 0.8, 0.4, 0.95] },
  { icon: BarChart3, bars: [0.7, 0.45, 0.9, 0.6] },
  { icon: Globe, bars: [0.4, 0.7, 0.55, 0.85] },
  { icon: Cpu, bars: [0.85, 0.5, 0.7, 0.55] },
];

function StoryVisual() {
  // Decorative visual — always animates (independent of OS reduced-motion).
  const reduced = false;
  const ref = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const spring = { stiffness: 120, damping: 18, mass: 0.4 };
  const rotateY = useSpring(useTransform(mx, [-0.5, 0.5], [-12, 12]), spring);
  const rotateX = useSpring(useTransform(my, [-0.5, 0.5], [9, -9]), spring);

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (reduced) return;
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
  };
  const handleLeave = () => {
    mx.set(0);
    my.set(0);
  };

  return (
    <div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      className="relative mx-auto aspect-square w-full max-w-md [perspective:1200px]"
    >
      <FloatingOrbs count={8} />

      {/* Center glow */}
      <div className="absolute inset-0 rounded-full bg-brand/20 blur-[90px]" />

      {/* Expanding ripple pulses (the concentric-ring "broadcast") */}
      {!reduced &&
        [0, 1, 2].map((i) => (
          <motion.div
            key={`pulse-${i}`}
            className="absolute inset-[14%] rounded-full border border-cyan-accent/30"
            initial={{ scale: 0.55, opacity: 0 }}
            animate={{ scale: [0.55, 1.55], opacity: [0.55, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeOut", delay: i * 1.33 }}
          />
        ))}

      {/* Rotating dashed rings with orbiting dots (now visibly spinning) */}
      {[0, 1, 2].map((i) => (
        <motion.div
          key={`ring-${i}`}
          className="absolute rounded-full border border-dashed border-cyan-accent/25"
          style={{ inset: `${i * 1.5}rem` }}
          animate={reduced ? undefined : { rotate: i % 2 === 0 ? 360 : -360 }}
          transition={{ duration: 22 + i * 8, repeat: Infinity, ease: "linear" }}
        >
          <span className="absolute left-1/2 top-0 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-accent shadow-glow-sm" />
        </motion.div>
      ))}

      {/* 3D tilt layer (follows cursor) */}
      <motion.div
        className="absolute inset-0 [transform-style:preserve-3d]"
        style={{ rotateX, rotateY }}
      >
        {/* Glass card with idle float */}
        <motion.div
          className="absolute inset-8 overflow-hidden rounded-3xl glass shadow-glow ring-1 ring-white/10 [transform-style:preserve-3d]"
          style={{ translateZ: 50 }}
          animate={reduced ? undefined : { y: [0, -8, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        >
          {/* Diagonal sheen sweep */}
          {!reduced && (
            <motion.div
              className="pointer-events-none absolute inset-y-0 w-1/2 -skew-x-12 bg-gradient-to-r from-transparent via-white/10 to-transparent"
              initial={{ x: "-150%" }}
              animate={{ x: "300%" }}
              transition={{ duration: 3.2, repeat: Infinity, repeatDelay: 2.4, ease: "easeInOut" }}
            />
          )}

          {/* Corner ticks */}
          {[
            "left-3 top-3 border-l border-t",
            "right-3 top-3 border-r border-t",
            "left-3 bottom-3 border-l border-b",
            "right-3 bottom-3 border-r border-b",
          ].map((pos) => (
            <span key={pos} className={`absolute h-4 w-4 rounded-[3px] border-cyan-accent/40 ${pos}`} />
          ))}

          {/* 2x2 "live dashboard" panes */}
          <div className="absolute inset-6 grid grid-cols-2 gap-3">
            {PANES.map((pane, i) => {
              const Icon = pane.icon;
              return (
                <motion.div
                  key={i}
                  className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-brand/30 to-cyan-accent/10 ring-1 ring-white/10"
                  animate={reduced ? undefined : { boxShadow: ["0 0 0 0 rgba(34,211,238,0)", "0 0 22px 1px rgba(34,211,238,0.35)", "0 0 0 0 rgba(34,211,238,0)"] }}
                  transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut", delay: i * 0.8 }}
                >
                  {/* small icon */}
                  <Icon size={15} strokeWidth={1.75} className="absolute left-2.5 top-2.5 text-cyan-accent/80" />

                  {/* mini animated bar chart */}
                  <div className="absolute inset-x-2.5 bottom-2.5 flex h-1/2 items-end gap-1">
                    {pane.bars.map((b, bi) => (
                      <motion.div
                        key={bi}
                        className="flex-1 origin-bottom rounded-sm bg-cyan-accent/55"
                        style={{ height: `${b * 100}%` }}
                        animate={reduced ? undefined : { scaleY: [0.55, 1, 0.7, 1, 0.55] }}
                        transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut", delay: i * 0.3 + bi * 0.18 }}
                      />
                    ))}
                  </div>
                </motion.div>
              );
            })}

            {/* Radar scan line sweeping across the grid */}
            {!reduced && (
              <motion.div
                className="pointer-events-none absolute inset-x-0 h-px bg-gradient-to-r from-transparent via-cyan-accent/90 to-transparent"
                initial={{ top: "0%" }}
                animate={{ top: ["0%", "100%", "0%"] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              />
            )}
          </div>
        </motion.div>

        {/* Floating depth accent dots */}
        {!reduced &&
          [
            { cls: "left-2 top-10", z: 90, d: 0 },
            { cls: "right-3 bottom-12", z: 110, d: 1.1 },
          ].map((dot) => (
            <motion.span
              key={dot.cls}
              className={`absolute h-2.5 w-2.5 rounded-full bg-cyan-accent shadow-glow-sm ${dot.cls}`}
              style={{ translateZ: dot.z }}
              animate={{ y: [0, -10, 0], opacity: [0.6, 1, 0.6] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: dot.d }}
            />
          ))}
      </motion.div>
    </div>
  );
}

export default function CompanyStory() {
  return (
    <section className="relative py-20">
      <Container>
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div>
            <Reveal>
              <span className="inline-flex items-center gap-2 rounded-full glass px-4 py-1.5 text-xs font-medium uppercase tracking-[0.2em] text-brand-light">
                <Sparkles size={13} className="text-cyan-accent" /> Our Story
              </span>
            </Reveal>
            <Reveal delay={0.1}>
              <h2 className="mt-5 font-display text-3xl font-semibold leading-tight text-ink sm:text-4xl">
                A digital partner built for <span className="text-gradient">modern businesses</span>
              </h2>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="mt-5 text-base leading-relaxed text-ink-muted">
                Navya EdTech began with a simple belief: great technology should be
                accessible to every growing business. We pair editorial design with
                serious engineering to ship websites and systems that feel premium and
                perform under pressure.
              </p>
            </Reveal>
            <Reveal delay={0.3}>
              <p className="mt-4 text-base leading-relaxed text-ink-muted">
                From a first landing page to a full ERP rollout, we obsess over speed,
                clarity, and the details that make software a joy to use — so your team
                and your customers feel the difference.
              </p>
            </Reveal>
          </div>

          {/* Abstract animated glass visual */}
          <Reveal delay={0.15}>
            <StoryVisual />
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
