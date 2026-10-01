import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, ShieldCheck } from "lucide-react";
import Container from "@/components/common/Container";
import { useSmoothScroll } from "@/components/effects/SmoothScroll";

// --- Subcomponents ---

// --- Hook for Mouse Parallax ---
function useMouseParallax(ref: React.RefObject<HTMLElement>) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const smoothX = useSpring(mouseX, { stiffness: 50, damping: 20 });
  const smoothY = useSpring(mouseY, { stiffness: 50, damping: 20 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!ref.current) return;
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

export default function PortfolioHero() {
  const containerRef = useRef<HTMLElement>(null);
  const { mouseX, mouseY } = useMouseParallax(containerRef);
  const { scrollTo } = useSmoothScroll();

  // Parallax transforms for different layers
  const x1 = useTransform(mouseX, [-0.5, 0.5], [-25, 25]);
  const y1 = useTransform(mouseY, [-0.5, 0.5], [-25, 25]);

  const scrollToGrid = (e: React.MouseEvent) => {
    e.preventDefault();
    scrollTo("#case-studies-grid", { offset: -80, duration: 1.2 });
  };

  return (
    <section
      ref={containerRef}
      className="relative min-h-[100svh] overflow-hidden bg-paper flex flex-col justify-center pt-32 pb-24 lg:pt-40 lg:pb-32"
    >
      {/* Background Effects */}
      <div className="absolute inset-0 z-0 pointer-events-none bg-gradient-to-b from-slate-50 via-white to-white" />
      <div className="absolute inset-0 z-0 pointer-events-none light-grid opacity-60 [mask-image:radial-gradient(ellipse_at_top,black_40%,transparent_70%)]" />

      {/* Blurred Circles */}
      <div className="absolute inset-0 z-[1] overflow-hidden pointer-events-none">
        <motion.div
          animate={{ scale: [1, 1.1, 1], opacity: [0.2, 0.4, 0.2] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-[20%] -right-[10%] h-[50rem] w-[50rem] rounded-full bg-brand/10 blur-[120px]"
        />
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.15, 0.3, 0.15] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute top-[30%] -left-[15%] h-[40rem] w-[40rem] rounded-full bg-secondary/10 blur-[100px]"
        />
        <motion.div
          animate={{ scale: [1, 1.15, 1], opacity: [0.15, 0.25, 0.15] }}
          transition={{ duration: 9, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute -bottom-[20%] right-[20%] h-[35rem] w-[35rem] rounded-full bg-cyan-accent/10 blur-[100px]"
        />
      </div>

      <Container className="relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-8 items-center">

          {/* ── LEFT: Content ── */}
          <div className="max-w-2xl xl:max-w-3xl">
            {/* Small Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="inline-flex items-center gap-2 rounded-full border border-brand/20 bg-brand/5 px-4 py-2 text-sm font-semibold text-brand mb-8 shadow-sm backdrop-blur-md"
            >
              <ShieldCheck size={16} />
              Enterprise Software Portfolio
            </motion.div>

            {/* Large Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
              className="font-display text-5xl sm:text-6xl lg:text-7xl font-extrabold leading-[1.05] tracking-tight text-heading"
            >
              Transforming Ideas into <br className="hidden md:block" />
              <span className="text-transparent bg-clip-text bg-brand-gradient">Enterprise Solutions.</span>
            </motion.h1>

            {/* Supporting Paragraph */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
              className="mt-6 text-lg sm:text-xl leading-relaxed text-faint max-w-xl"
            >
              We engineer scalable, secure, and modern digital products that drive efficiency and growth for startups, SMEs, and global enterprises.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut", delay: 0.3 }}
              className="mt-10 flex flex-wrap items-center gap-4"
            >
              <a
                href="#case-studies-grid"
                onClick={scrollToGrid}
                className="group relative flex h-14 items-center justify-center gap-2 overflow-hidden rounded-xl bg-primary px-8 font-semibold text-white shadow-primary-sm transition-transform hover:-translate-y-0.5 active:translate-y-0"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-in-out" />
                View Case Studies
                <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
              </a>
              <Link
                to="/contact"
                className="flex h-14 items-center justify-center rounded-xl border border-line bg-white px-8 font-semibold text-heading shadow-sm transition-all hover:border-brand hover:text-brand hover:shadow-card-hover"
              >
                Book Free Consultation
              </Link>
            </motion.div>

          </div>

          {/* ── RIGHT: Visual Showcase ── */}
          <div className="relative h-[350px] sm:h-[450px] lg:h-[650px] w-full mt-12 lg:mt-0">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
              style={{ x: x1, y: y1 }}
              className="absolute inset-0 flex items-center justify-center"
            >
              {/* Soft ambient glow */}
              <div className="absolute h-[70%] w-[70%] rounded-full bg-brand/10 blur-[90px]" />
              <img
                src="/vectors1/portfolio-clean.avif"
                alt="Portfolio Showcase"
                loading="eager"
                className="relative z-10 h-full w-full object-contain drop-shadow-xl"
              />
            </motion.div>
          </div>
        </div>
      </Container>
    </section>
  );
}
