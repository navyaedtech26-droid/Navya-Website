import { useEffect, useRef } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import { Activity, TrendingUp, Globe, Boxes } from "lucide-react";
import { useRichMotion, useReducedMotion } from "@/hooks/useMediaQuery";
import OrbitSystem from "@/components/effects/OrbitSystem";
import MotionBeam from "@/components/effects/MotionBeam";
import FloatingTechCards from "@/components/effects/FloatingTechCards";
import CounterUp from "@/components/effects/CounterUp";

export default function CommandCenter() {
  const enabled = useRichMotion();
  const reduced = useReducedMotion();
  const containerRef = useRef<HTMLDivElement>(null);

  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const srx = useSpring(rx, { stiffness: 80, damping: 18 });
  const sry = useSpring(ry, { stiffness: 80, damping: 18 });
  const rotateX = useTransform(srx, (v) => `${v}deg`);
  const rotateY = useTransform(sry, (v) => `${v}deg`);

  useEffect(() => {
    if (!enabled) return;
    let frame = 0;
    const onMove = (e: MouseEvent) => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const x = e.clientX / window.innerWidth - 0.5;
        const y = e.clientY / window.innerHeight - 0.5;
        ry.set(x * 16);
        rx.set(-y * 14);
      });
    };
    window.addEventListener("mousemove", onMove);
    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(frame);
    };
  }, [enabled, rx, ry]);

  return (
    <div
      ref={containerRef}
      className="relative mx-auto flex aspect-square w-full max-w-[34rem] items-center justify-center [perspective:2000px]"
    >
      {/* soft radial glow behind everything */}
      <div className="absolute inset-0 rounded-full bg-brand/20 blur-[100px]" />

      {/* orbiting tech icons + rotating rings */}
      <OrbitSystem radius={230} />

      {/* diagonal beams */}
      <MotionBeam className="left-[8%] top-[20%] rotate-[35deg]" />
      <MotionBeam className="right-[6%] bottom-[26%] -rotate-[28deg]" delay={1.4} />

      {/* floating tech chips */}
      <FloatingTechCards />

      {/* THE 3D RIG */}
      <motion.div
        className="relative h-[64%] w-[68%] [transform-style:preserve-3d]"
        style={enabled ? { rotateX, rotateY } : undefined}
        initial={{ opacity: 0, scale: 0.8, rotate: -8 }}
        animate={{ opacity: 1, scale: 1, rotate: 0 }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
      >
        {/* Central glass dashboard */}
        <div
          className="absolute inset-0 rounded-3xl glass p-5 shadow-glow ring-1 ring-white/10 [transform-style:preserve-3d]"
          style={{ transform: "translateZ(40px)" }}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs font-medium text-ink-muted">
              <Activity size={14} className="text-cyan-accent" />
              Performance
            </div>
            <div className="flex gap-1.5">
              <span className="h-2 w-2 rounded-full bg-brand/60" />
              <span className="h-2 w-2 rounded-full bg-cyan-accent/60" />
              <span className="h-2 w-2 rounded-full bg-white/20" />
            </div>
          </div>

          {/* Animated bar chart */}
          <div className="mt-5 flex h-20 items-end gap-2">
            {[0.5, 0.8, 0.45, 0.95, 0.65, 0.85, 0.55].map((base, i) => (
              <motion.div
                key={i}
                className="flex-1 rounded-md bg-gradient-to-t from-brand/40 to-cyan-accent/80"
                animate={
                  reduced
                    ? { height: `${base * 100}%` }
                    : { height: [`${base * 60}%`, `${base * 100}%`, `${base * 70}%`] }
                }
                transition={{
                  duration: 2.4,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: i * 0.12,
                }}
              />
            ))}
          </div>

          {/* Animated SVG line graph */}
          <div className="mt-4 h-14 w-full">
            <svg viewBox="0 0 200 56" className="h-full w-full" preserveAspectRatio="none">
              <defs>
                <linearGradient id="lineFill" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="rgba(30, 107, 255,0.4)" />
                  <stop offset="100%" stopColor="rgba(30, 107, 255,0)" />
                </linearGradient>
              </defs>
              <motion.path
                d="M0,44 C30,20 50,40 80,28 C110,16 130,36 160,18 C175,10 190,20 200,12"
                fill="none"
                stroke="#1E6BFF"
                strokeWidth="2"
                strokeLinecap="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 2, ease: "easeInOut", delay: 0.6 }}
              />
              <motion.path
                d="M0,44 C30,20 50,40 80,28 C110,16 130,36 160,18 C175,10 190,20 200,12 L200,56 L0,56 Z"
                fill="url(#lineFill)"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 1.6 }}
              />
            </svg>
          </div>
        </div>

        {/* Circular score — front layer */}
        <div
          className="absolute -right-10 -top-8 flex h-24 w-24 items-center justify-center rounded-2xl glass shadow-glow-cyan ring-1 ring-cyan-accent/30"
          style={{ transform: "translateZ(90px)" }}
        >
          <svg className="absolute inset-0 h-full w-full -rotate-90" viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="40" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="7" />
            <motion.circle
              cx="50"
              cy="50"
              r="40"
              fill="none"
              stroke="#1E6BFF"
              strokeWidth="7"
              strokeLinecap="round"
              strokeDasharray={2 * Math.PI * 40}
              initial={{ strokeDashoffset: 2 * Math.PI * 40 }}
              whileInView={{ strokeDashoffset: 2 * Math.PI * 40 * (1 - 0.94) }}
              viewport={{ once: true }}
              transition={{ duration: 1.8, ease: "easeOut", delay: 0.5 }}
            />
          </svg>
          <div className="text-center">
            <CounterUp to={94} className="font-display text-2xl font-bold text-ink" />
            <p className="text-[10px] uppercase tracking-wide text-ink-muted">Score</p>
          </div>
        </div>

        {/* Mini code editor — back-left depth */}
        <div
          className="absolute -left-12 top-6 w-40 rounded-xl glass p-3 shadow-glow-sm ring-1 ring-white/10"
          style={{ transform: "translateZ(10px)" }}
        >
          <div className="mb-2 flex gap-1.5">
            <span className="h-2 w-2 rounded-full bg-red-400/70" />
            <span className="h-2 w-2 rounded-full bg-yellow-400/70" />
            <span className="h-2 w-2 rounded-full bg-green-400/70" />
          </div>
          <div className="space-y-1.5">
            {[70, 90, 55, 80, 40].map((w, i) => (
              <div
                key={i}
                className="h-1.5 rounded-full bg-gradient-to-r from-brand/50 to-transparent shimmer-text bg-[length:200%_100%]"
                style={{ width: `${w}%`, animationDelay: `${i * 0.3}s` }}
              />
            ))}
          </div>
        </div>

        {/* Website preview card — bottom right */}
        <div
          className="absolute -bottom-10 right-2 w-36 rounded-xl glass p-2.5 shadow-glow-sm ring-1 ring-white/10"
          style={{ transform: "translateZ(70px)" }}
        >
          <div className="flex items-center gap-1.5 text-[10px] text-ink-muted">
            <Globe size={11} className="text-cyan-accent" />
            yoursite.com
          </div>
          <div className="mt-2 h-2 w-3/4 rounded bg-white/10" />
          <div className="mt-1.5 grid grid-cols-3 gap-1">
            <div className="h-6 rounded bg-brand/30" />
            <div className="h-6 rounded bg-white/10" />
            <div className="h-6 rounded bg-cyan-accent/30" />
          </div>
        </div>

        {/* CRM/ERP module card — bottom left */}
        <div
          className="absolute -bottom-6 -left-8 flex items-center gap-2 rounded-xl glass px-3 py-2.5 shadow-glow-sm ring-1 ring-white/10"
          style={{ transform: "translateZ(55px)" }}
        >
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand/20 text-brand-light">
            <Boxes size={16} />
          </span>
          <div>
            <p className="text-[11px] font-semibold text-ink">CRM / ERP</p>
            <p className="flex items-center gap-1 text-[10px] text-cyan-accent">
              <TrendingUp size={10} /> +18%
            </p>
          </div>
        </div>

        {/* drifting data-stream particles */}
        {!reduced &&
          [0, 1, 2].map((i) => (
            <motion.span
              key={i}
              className="absolute left-1/2 h-1.5 w-1.5 rounded-full bg-cyan-accent shadow-glow-cyan"
              style={{ transform: "translateZ(100px)" }}
              animate={{ y: [60, -60], opacity: [0, 1, 0] }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
                delay: i * 1,
              }}
            />
          ))}
      </motion.div>
    </div>
  );
}
