import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import Container from "@/components/common/Container";

// --- Main Component ---

export default function HeroSection() {
  const containerRef = useRef<HTMLElement>(null);
  const { mouseX, mouseY } = useMouseParallax(containerRef);

  // Parallax transforms for different layers
  const x1 = useTransform(mouseX, [-0.5, 0.5], [-20, 20]);
  const y1 = useTransform(mouseY, [-0.5, 0.5], [-20, 20]);

  const x2 = useTransform(mouseX, [-0.5, 0.5], [-40, 40]);
  const y2 = useTransform(mouseY, [-0.5, 0.5], [-40, 40]);

  return (
    <section
      ref={containerRef}
      className="relative min-h-[100svh] overflow-hidden bg-paper flex flex-col justify-center pt-24 pb-16 lg:pt-40 lg:pb-32"
    >
      {/* Background Effects */}
      <div className="absolute inset-0 z-0 pointer-events-none bg-gradient-to-b from-slate-50 via-white to-white" />
      <div className="absolute inset-0 z-0 pointer-events-none light-grid opacity-60 [mask-image:radial-gradient(ellipse_at_top,black_40%,transparent_70%)]" />

      {/* Blurred Circles */}
      <div className="absolute inset-0 z-[1] overflow-hidden pointer-events-none">
        <motion.div
          animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-[20%] -right-[10%] h-[50rem] w-[50rem] rounded-full bg-brand/10 blur-[120px]"
        />
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.4, 0.2] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute top-[30%] -left-[15%] h-[40rem] w-[40rem] rounded-full bg-secondary/10 blur-[100px]"
        />
        <motion.div
          animate={{ scale: [1, 1.15, 1], opacity: [0.2, 0.3, 0.2] }}
          transition={{ duration: 9, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute -bottom-[20%] right-[20%] h-[35rem] w-[35rem] rounded-full bg-cyan-accent/10 blur-[100px]"
        />
      </div>

      <Container className="relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-8 items-center">

          {/* ── LEFT: Content ── */}
          <div className="max-w-2xl xl:max-w-3xl">
            {/* Large Enterprise Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
              /* Changed base text from 5xl to 4xl to prevent long word overflow on 320px */
              className="font-display text-4xl sm:text-6xl lg:text-7xl font-extrabold leading-[1.05] tracking-tight text-heading"
            >
              High-Performance Software <br className="hidden md:block" />
              for <span className="text-transparent bg-clip-text bg-brand-gradient">Ambitious Enterprises.</span>
            </motion.h1>

            {/* Supporting Paragraph */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
              className="mt-6 text-lg sm:text-xl leading-relaxed text-faint max-w-xl"
            >
              We architect custom digital solutions that solve complex operational bottlenecks. From cloud infrastructure to tailored business systems, we build technology that drives measurable impact.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut", delay: 0.3 }}
              className="mt-10 flex flex-wrap items-center gap-4"
            >
              <Link
                to="/contact"
                className="group relative flex h-14 items-center justify-center gap-2 overflow-hidden rounded-xl bg-primary px-8 font-semibold text-white shadow-primary-sm transition-transform hover:-translate-y-0.5 active:translate-y-0"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-in-out" />
                Book Free Consultation
                <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
              </Link>
              <Link
                to="/portfolio"
                className="flex h-14 items-center justify-center rounded-xl border border-line bg-white px-8 font-semibold text-heading shadow-sm transition-all hover:border-brand hover:text-brand hover:shadow-card-hover"
              >
                View Portfolio
              </Link>
            </motion.div>

          </div>

          {/* ── RIGHT: Visual Showcase ── */}
          <div className="relative h-[450px] sm:h-[550px] lg:h-[650px] w-full mt-12 lg:mt-0">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
              className="absolute inset-0 flex items-center justify-center"
            >

              {/* Layer 1: Laptop Mockup (Background) */}
              {/* Mobile: pinned to the top-right corner (origin-top-right) and kept fully
                  on-screen so it doesn't collide with the phone mockup below or bleed off
                  the viewport edge. sm+ is untouched (scale-100 makes origin/position here
                  a no-op past that breakpoint). */}
              <motion.div
                style={{ x: x1, y: y1 }}
                className="absolute top-[0%] sm:top-[5%] right-[2%] sm:right-[5%] w-[420px] sm:w-[520px] h-[280px] sm:h-[340px] bg-slate-100 rounded-xl border-4 border-slate-200 shadow-2xl overflow-hidden flex flex-col transform origin-top-right scale-[0.6] sm:scale-100"
              >
                {/* Browser Chrome */}
                <div className="h-8 bg-slate-200 flex items-center px-4 gap-2 shrink-0">
                  <div className="w-2.5 h-2.5 rounded-full bg-red-400"></div>
                  <div className="w-2.5 h-2.5 rounded-full bg-amber-400"></div>
                  <div className="w-2.5 h-2.5 rounded-full bg-green-400"></div>
                  <div className="ml-4 h-4 w-48 bg-white/50 rounded-full"></div>
                </div>
                {/* Dashboard UI */}
                <div className="flex-grow bg-white p-4 flex gap-4">
                  <div className="w-32 h-full border-r border-slate-100 flex flex-col gap-3 pr-4">
                    <div className="w-full h-4 bg-slate-100 rounded"></div>
                    <div className="w-3/4 h-4 bg-slate-100 rounded"></div>
                    <div className="w-5/6 h-4 bg-slate-100 rounded"></div>
                  </div>
                  <div className="flex-grow flex flex-col gap-4">
                    <div className="flex gap-4">
                      <div className="w-1/3 h-20 rounded-xl bg-brand/5 border border-brand/10 p-3 flex flex-col justify-between">
                        <div className="w-6 h-6 rounded bg-brand/20"></div>
                        <div className="w-1/2 h-2 bg-brand/20 rounded"></div>
                      </div>
                      <div className="w-1/3 h-20 rounded-xl bg-secondary/5 border border-secondary/10 p-3 flex flex-col justify-between">
                        <div className="w-6 h-6 rounded bg-secondary/20"></div>
                        <div className="w-1/2 h-2 bg-secondary/20 rounded"></div>
                      </div>
                      <div className="w-1/3 h-20 rounded-xl bg-cyan-50 border border-cyan-100 p-3 flex flex-col justify-between">
                        <div className="w-6 h-6 rounded bg-cyan-200"></div>
                        <div className="w-1/2 h-2 bg-cyan-200 rounded"></div>
                      </div>
                    </div>
                    <div className="flex-grow rounded-xl bg-slate-50 border border-slate-100 p-4">
                      <div className="w-full h-full border-b border-l border-slate-200 relative">
                        <svg className="absolute inset-0 w-full h-full text-brand/30" preserveAspectRatio="none" viewBox="0 0 100 100">
                          <path d="M0,100 C20,80 40,90 60,40 C80,-10 100,20 100,20" fill="none" stroke="currentColor" strokeWidth="2" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Layer 2: Mobile App Mockup */}
              {/* Mobile: pinned to the bottom-left corner (origin-bottom-left) with a
                  smaller scale so it clears the laptop mockup's bottom edge instead of
                  overlapping it. sm+ is untouched. */}
              <motion.div
                style={{ x: x2, y: y2 }}
                className="absolute bottom-[5%] sm:bottom-[10%] left-[2%] sm:left-[10%] w-[180px] sm:w-[220px] h-[380px] sm:h-[460px] bg-white rounded-[32px] border-[6px] border-slate-800 shadow-[0_20px_50px_rgba(8,30,77,0.2)] overflow-hidden z-20 flex flex-col transform origin-bottom-left scale-[0.6] sm:scale-100"
              >
                {/* Notch */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-6 bg-slate-800 rounded-b-xl z-10"></div>

                {/* App Content */}
                <div className="flex-grow bg-slate-50 pt-10 px-5 flex flex-col gap-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="w-16 h-3 bg-slate-200 rounded-full mb-2"></div>
                      <div className="w-24 h-5 bg-slate-800 rounded-full"></div>
                    </div>
                    <div className="w-10 h-10 rounded-full bg-brand/10 border border-brand/20"></div>
                  </div>

                  <div className="w-full h-32 rounded-2xl bg-gradient-to-br from-brand to-secondary p-4 flex flex-col justify-between text-white shadow-lg">
                    <div className="w-8 h-8 rounded-full bg-white/20"></div>
                    <div>
                      <div className="w-1/2 h-2 bg-white/50 rounded-full mb-2"></div>
                      <div className="w-3/4 h-4 bg-white rounded-full"></div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3 mt-2">
                    <div className="h-24 rounded-xl bg-white border border-slate-100 shadow-sm p-3">
                      <div className="w-6 h-6 rounded-full bg-cyan-100 mb-4"></div>
                      <div className="w-3/4 h-2 bg-slate-200 rounded-full"></div>
                    </div>
                    <div className="h-24 rounded-xl bg-white border border-slate-100 shadow-sm p-3">
                      <div className="w-6 h-6 rounded-full bg-orange-100 mb-4"></div>
                      <div className="w-3/4 h-2 bg-slate-200 rounded-full"></div>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Layer 3: Floating Elements */}



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

  // Smooth the motion values using springs
  const smoothX = useSpring(mouseX, { stiffness: 50, damping: 20 });
  const smoothY = useSpring(mouseY, { stiffness: 50, damping: 20 });

  useEffect(() => {
    // Disable parallax calculations on touch devices to improve mobile performance
    if (window.matchMedia && window.matchMedia("(hover: none)").matches) return;

    const handleMouseMove = (e: MouseEvent) => {
      if (!ref.current) return;

      // Calculate mouse position relative to the center of the window
      const { innerWidth, innerHeight } = window;
      const x = (e.clientX / innerWidth) - 0.5;
      const y = (e.clientY / innerHeight) - 0.5;

      mouseX.set(x);
      mouseY.set(y);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY, ref]);

  return { mouseX: smoothX, mouseY: smoothY };
}
