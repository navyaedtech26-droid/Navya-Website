import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Eye, Users, Code2, Cloud, Brain } from "lucide-react";
import Container from "@/components/common/Container";

export default function HeroSection() {
  const containerRef = useRef<HTMLElement>(null);
  const { mouseX, mouseY } = useMouseParallax(containerRef);

  // Parallax transforms for layers
  const x1 = useTransform(mouseX, [-0.5, 0.5], [-15, 15]);
  const y1 = useTransform(mouseY, [-0.5, 0.5], [-15, 15]);

  const x2 = useTransform(mouseX, [-0.5, 0.5], [-30, 30]);
  const y2 = useTransform(mouseY, [-0.5, 0.5], [-30, 30]);

  // Split headline helper for GSAP character stagger reveal (.hero-headline .char)
  const renderSplitHeadline = (text: string) => {
    return text.split(" ").map((word, wIdx) => (
      <span key={wIdx} className="inline-block whitespace-nowrap overflow-hidden py-1">
        {word.split("").map((char, cIdx) => (
          <span key={cIdx} className="char inline-block">
            {char}
          </span>
        ))}
        <span className="char inline-block">&nbsp;</span>
      </span>
    ));
  };

  return (
    <section
      ref={containerRef}
      className="relative min-h-[100svh] overflow-hidden bg-paper flex flex-col justify-center pt-24 pb-16 lg:pb-28"
    >
      {/* Background Grid & Restrained Radial Wash */}
      <div className="absolute inset-0 z-0 pointer-events-none bg-hero-wash" data-speed="0.8" />
      <div className="absolute inset-0 z-0 pointer-events-none light-grid opacity-60 [mask-image:radial-gradient(ellipse_at_top,black_40%,transparent_70%)]" />

      {/* Ambient auras behind the visual — soft, brand-tinted, breathing glow */}
      <motion.div
        aria-hidden
        animate={{ scale: [1, 1.12, 1], opacity: [0.35, 0.55, 0.35] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-[8%] right-[6%] -z-10 h-[420px] w-[420px] rounded-full bg-brand/15 blur-[110px] pointer-events-none"
      />
      <motion.div
        aria-hidden
        animate={{ scale: [1, 1.15, 1], opacity: [0.2, 0.4, 0.2] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="absolute bottom-[4%] left-[38%] -z-10 h-[320px] w-[320px] rounded-full bg-secondary/15 blur-[100px] pointer-events-none"
      />

      <Container className="relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 items-center">

          {/* ── LEFT: Copy, Social Proof & CTAs ── */}
          <div className="lg:col-span-5 flex flex-col items-start text-left max-w-xl">
            {/* Social Proof Badge */}
            <div className="hero-animate-item inline-flex items-center gap-2.5 rounded-full border border-line bg-white/80 backdrop-blur-md px-4 py-1.5 shadow-sm">
              <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/10">
                <Users size={12} className="text-primary" strokeWidth={2.5} />
              </span>
              <span className="text-[13px] text-black/70">
                Trusted by <strong className="font-semibold text-heading">50+ enterprises</strong> and counting
              </span>
            </div>

            {/* Headline with GSAP character reveal support */}
            <h1 className="hero-headline mt-6 font-display text-4xl font-bold leading-[1.08] tracking-tight text-heading sm:text-5xl lg:text-[3.25rem]">
              {renderSplitHeadline("High-Performance Software for ")}
              <span className="text-brand inline-block">
                {renderSplitHeadline("Ambitious Enterprises.")}
              </span>
            </h1>

            {/* Supporting Subtext */}
            <p className="hero-animate-item mt-6 text-lg sm:text-xl leading-relaxed text-faint max-w-lg">
              Custom software, cloud infrastructure, and business systems built to clear operational bottlenecks and scale with you.
            </p>

            {/* CTAs */}
            <div className="hero-animate-item mt-9 flex flex-wrap items-center gap-6">
              <Link
                to="/contact"
                className="group relative flex h-14 items-center gap-4 overflow-hidden rounded-xl bg-primary pl-7 pr-2 font-semibold text-white shadow-primary-sm transition-all hover:-translate-y-0.5 active:translate-y-0"
                style={{ boxShadow: "inset 0 1px 0 0 rgba(255,255,255,0.22), 0 10px 25px -6px rgba(8,30,77,0.4)" }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-in-out" />
                <span className="relative z-10">Book Free Consultation</span>
                <span className="relative z-10 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white text-primary transition-transform duration-slow ease-out group-hover:translate-x-1">
                  <ArrowRight size={16} />
                </span>
              </Link>

              <Link to="/portfolio" className="group flex items-center gap-3">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-primary/15 bg-primary/5 text-primary transition-colors group-hover:bg-primary/10">
                  <Eye size={16} />
                </span>
                <span className="text-[15px] font-bold text-primary transition-colors group-hover:text-primary-light">
                  View Portfolio
                </span>
              </Link>
            </div>
          </div>

          {/* ── RIGHT: Visual Showcase ── */}
          <div className="relative lg:col-span-7 w-full mt-10 lg:mt-0 flex items-center justify-center lg:justify-end" data-speed="1.05">

            {/* Decorative orbit ring */}
            <svg
              aria-hidden
              viewBox="0 0 620 620"
              className="absolute right-[6%] top-1/2 -z-10 hidden h-[560px] w-[560px] -translate-y-1/2 opacity-30 sm:block animate-[spin_70s_linear_infinite]"
            >
              <defs>
                <linearGradient id="heroOrbitGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#1E6BFF" />
                  <stop offset="100%" stopColor="#6366F1" />
                </linearGradient>
              </defs>
              <circle cx="310" cy="310" r="300" fill="none" stroke="url(#heroOrbitGradient)" strokeWidth="1" strokeDasharray="2 10" strokeLinecap="round" />
              <circle cx="310" cy="310" r="250" fill="none" stroke="url(#heroOrbitGradient)" strokeWidth="1" strokeDasharray="1 8" strokeLinecap="round" opacity="0.6" />
            </svg>

            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
              className="relative mx-auto w-full max-w-[560px] h-[380px] sm:h-[460px] flex items-center justify-center"
            >
              {/* Centered Robot Companion Video */}
              <video
                src="/videos/hero-robot.mp4"
                autoPlay
                loop
                muted
                playsInline
                controls={false}
                className="relative z-10 block h-full w-auto max-w-full select-none rounded-[24px] object-contain"
                style={{ filter: "brightness(1.02) contrast(1.04)" }}
              />

              {/* Floating liquid-glass badges — real services, suspended around the visual */}

              {/* Custom Software — top right */}
              <motion.div
                initial={{ opacity: 0, scale: 0.85 }}
                animate={{ opacity: 1, scale: 1, y: [0, -8, 0], x: [0, 2, 0] }}
                transition={{
                  opacity: { duration: 0.5, delay: 0.6, ease: "easeOut" },
                  scale: { duration: 0.5, delay: 0.6, ease: "easeOut" },
                  y: { duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.6 },
                  x: { duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.6 },
                }}
                whileHover={{ scale: 1.05, rotate: 1 }}
                style={{ x: x1, y: y1 }}
                className="absolute top-[8%] -right-3 sm:-right-10 md:-right-12 z-30 enterprise-glass rounded-[20px] px-4 py-3 flex items-center gap-3 shadow-[0_12px_32px_-4px_rgba(30,107,255,0.18)]"
              >
                <div
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl shadow-[0_4px_12px_rgba(30,107,255,0.35)]"
                  style={{ background: "linear-gradient(145deg, #1E6BFF, #1D4ED8)" }}
                >
                  <Code2 size={16} className="text-white" strokeWidth={2.2} />
                </div>
                <div className="flex flex-col text-left leading-tight">
                  <span className="text-[13px] font-extrabold text-heading tracking-tight">Custom Software</span>
                  <span className="mt-0.5 text-[10px] font-semibold text-faint">for your business</span>
                </div>
              </motion.div>

              {/* Cloud Infrastructure — center left */}
              <motion.div
                initial={{ opacity: 0, scale: 0.85 }}
                animate={{ opacity: 1, scale: 1, y: [0, 8, 0], x: [0, -2, 0] }}
                transition={{
                  opacity: { duration: 0.5, delay: 0.75, ease: "easeOut" },
                  scale: { duration: 0.5, delay: 0.75, ease: "easeOut" },
                  y: { duration: 5.5, repeat: Infinity, ease: "easeInOut", delay: 0.75 },
                  x: { duration: 5.5, repeat: Infinity, ease: "easeInOut", delay: 0.75 },
                }}
                whileHover={{ scale: 1.05, rotate: -1 }}
                style={{ x: x2, y: y2 }}
                className="absolute top-[46%] -left-4 sm:-left-12 md:-left-14 z-30 enterprise-glass rounded-[20px] px-4 py-3 flex items-center gap-3 shadow-[0_12px_32px_-4px_rgba(16,185,129,0.18)]"
              >
                <div
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl shadow-[0_4px_12px_rgba(16,185,129,0.35)]"
                  style={{ background: "linear-gradient(145deg, #10B981, #059669)" }}
                >
                  <Cloud size={16} className="text-white" strokeWidth={2.2} />
                </div>
                <div className="flex flex-col text-left leading-tight">
                  <span className="text-[13px] font-extrabold text-heading tracking-tight">Cloud Infrastructure</span>
                  <span className="mt-0.5 text-[10px] font-semibold text-faint">auto-scaling</span>
                </div>
              </motion.div>

              {/* AI Solutions — bottom right */}
              <motion.div
                initial={{ opacity: 0, scale: 0.85 }}
                animate={{ opacity: 1, scale: 1, y: [0, -10, 0], x: [0, -1, 0] }}
                transition={{
                  opacity: { duration: 0.5, delay: 0.9, ease: "easeOut" },
                  scale: { duration: 0.5, delay: 0.9, ease: "easeOut" },
                  y: { duration: 4.8, repeat: Infinity, ease: "easeInOut", delay: 0.9 },
                  x: { duration: 4.8, repeat: Infinity, ease: "easeInOut", delay: 0.9 },
                }}
                whileHover={{ scale: 1.05, rotate: 1.5 }}
                style={{ x: x1, y: y2 }}
                className="absolute bottom-[6%] -right-2 sm:-right-8 md:-right-10 z-30 enterprise-glass rounded-[20px] px-4 py-3 flex items-center gap-3 shadow-[0_12px_32px_-4px_rgba(99,102,241,0.18)]"
              >
                <div
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl shadow-[0_4px_12px_rgba(99,102,241,0.35)]"
                  style={{ background: "linear-gradient(145deg, #6366F1, #4F46E5)" }}
                >
                  <Brain size={16} className="text-white" strokeWidth={2.2} />
                </div>
                <div className="flex flex-col text-left leading-tight">
                  <span className="text-[13px] font-extrabold text-heading tracking-tight">AI Solutions</span>
                  <span className="mt-0.5 text-[10px] font-semibold text-faint">smart automation</span>
                </div>
              </motion.div>

            </motion.div>
          </div>

        </div>
      </Container>
    </section>
  );
}

// --- Hook for Mouse Parallax ---
function useMouseParallax(ref: React.RefObject<HTMLElement>) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const smoothX = useSpring(mouseX, { stiffness: 50, damping: 20 });
  const smoothY = useSpring(mouseY, { stiffness: 50, damping: 20 });

  useEffect(() => {
    if (window.matchMedia && window.matchMedia("(hover: none)").matches) return;

    const handleMouseMove = (e: MouseEvent) => {
      if (!ref.current) return;

      const { innerWidth, innerHeight } = window;
      const x = e.clientX / innerWidth - 0.5;
      const y = e.clientY / innerHeight - 0.5;

      mouseX.set(x);
      mouseY.set(y);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY, ref]);

  return { mouseX: smoothX, mouseY: smoothY };
}
