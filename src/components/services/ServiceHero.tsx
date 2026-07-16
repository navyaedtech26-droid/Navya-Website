import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Cloud, Brain, ShieldCheck, Zap, Code2, Sparkles, LayoutDashboard } from "lucide-react";
import Container from "@/components/common/Container";
import IconBadge from "@/components/common/IconBadge";
import type { ServicePage } from "@/types";
import { fadeUp, staggerContainer } from "@/lib/animations";

interface ServiceHeroProps {
  data: ServicePage;
}

export default function ServiceHero({ data }: ServiceHeroProps) {
  const containerRef = useRef<HTMLElement>(null);
  const { mouseX, mouseY } = useMouseParallax(containerRef);
  const isSolution = data.category === "solution";
  const sectionLabel = isSolution ? "Solutions" : "Services";

  // Parallax transforms for different layers
  const x1 = useTransform(mouseX, [-0.5, 0.5], [-20, 20]);
  const y1 = useTransform(mouseY, [-0.5, 0.5], [-20, 20]);
  
  const x2 = useTransform(mouseX, [-0.5, 0.5], [-40, 40]);
  const y2 = useTransform(mouseY, [-0.5, 0.5], [-40, 40]);

  const x3 = useTransform(mouseX, [-0.5, 0.5], [30, -30]);
  const y3 = useTransform(mouseY, [-0.5, 0.5], [30, -30]);



  return (
    <section 
      ref={containerRef}
      className="relative min-h-[90svh] overflow-hidden bg-paper flex flex-col justify-center pt-24 pb-16 lg:pt-40 lg:pb-24 border-b border-line/40"
    >
      {/* Background Effects */}
      <div className="absolute inset-0 z-0 pointer-events-none bg-gradient-to-b from-slate-50/80 via-white to-white" />
      <div className="absolute inset-0 z-0 pointer-events-none light-grid opacity-60 [mask-image:radial-gradient(ellipse_at_top,black_40%,transparent_70%)]" />
      
      {/* Blurred Abstract Shapes */}
      <div className="absolute inset-0 z-[1] overflow-hidden pointer-events-none">
        <motion.div 
          animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-[20%] -right-[10%] h-[40rem] w-[40rem] rounded-full bg-brand/10 blur-[100px]" 
        />
        <motion.div 
          animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.4, 0.2] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute top-[40%] -left-[10%] h-[30rem] w-[30rem] rounded-full bg-secondary/10 blur-[80px]" 
        />
      </div>

      <Container className="relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          
          {/* ── LEFT: Content ── */}
          <motion.div
            variants={staggerContainer(0.1)}
            initial="hidden"
            animate="visible"
            className="max-w-2xl"
          >
            {/* Breadcrumb */}
            <motion.nav
              variants={fadeUp}
              aria-label="Breadcrumb"
              className="mb-6 text-sm font-medium text-faint"
            >
              <ol className="inline-flex items-center gap-2">
                <li>
                  {isSolution ? (
                    sectionLabel
                  ) : (
                    <Link to="/services" className="hover:text-primary transition-colors">{sectionLabel}</Link>
                  )}
                </li>
                <li aria-hidden="true">/</li>
                <li aria-current="page" className="text-heading/80">{data.title}</li>
              </ol>
            </motion.nav>

            {/* Small Badge */}
            <motion.div variants={fadeUp} className="mb-6">
              <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-sm font-semibold text-primary shadow-sm backdrop-blur-md">
                <IconBadge icon={data.icon} size="sm" tone="light" className="bg-transparent text-primary p-0 h-auto w-auto" />
                <span className="leading-none flex items-center gap-1"><Sparkles size={14} /> Enterprise-Grade {isSolution ? "Solution" : "Service"}</span>
              </div>
            </motion.div>
            
            {/* Large Headline */}
            <motion.h1
              variants={fadeUp}
              className="font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-[1.1] tracking-tight text-heading"
            >
              {data.title} <br className="hidden sm:block" />
              <span className="text-transparent bg-clip-text bg-brand-gradient">{data.highlight}</span>
            </motion.h1>
            
            {/* Supporting Description */}
            <motion.p
              variants={fadeUp}
              className="mt-6 text-lg leading-relaxed text-faint max-w-xl"
            >
              {data.heroSubtitle}
            </motion.p>
            
            {/* CTAs */}
            <motion.div variants={fadeUp} className="mt-8 flex flex-wrap items-center gap-4">
              <Link
                to="/contact"
                className="group relative flex h-12 sm:h-14 items-center justify-center gap-2 overflow-hidden rounded-xl bg-primary px-6 sm:px-8 font-semibold text-white shadow-primary-sm transition-transform hover:-translate-y-0.5 active:translate-y-0"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-in-out" />
                Book a Strategy Call
                <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
              </Link>
              <Link
                to="/#case-studies"
                className="flex h-12 sm:h-14 items-center justify-center rounded-xl border border-line bg-white px-6 sm:px-8 font-semibold text-heading shadow-sm transition-all hover:border-brand hover:text-brand hover:shadow-card-hover"
              >
                View Case Studies
              </Link>
            </motion.div>
            

          </motion.div>

          {/* ── RIGHT: Visual Showcase ── */}
          <div className="relative h-[380px] sm:h-[500px] lg:h-[600px] w-full mt-10 lg:mt-0">
            {data.heroImage ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
                style={{ x: x1, y: y1 }}
                className="absolute inset-0 flex items-center justify-center"
              >
                {/* Soft ambient glow — no boxed background behind the illustration */}
                <div className="absolute h-[70%] w-[70%] rounded-full bg-brand/10 blur-[90px]" />
                <img
                  src={data.heroImage}
                  alt={`${data.title} illustration`}
                  loading="eager"
                  className="relative z-10 h-full w-full object-contain drop-shadow-xl"
                />
              </motion.div>
            ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
              className="absolute inset-0 flex items-center justify-center"
            >

              {/* Layer 1: Dashboard Mockup */}
              {/* Scaled down from 0.85 to 0.7 for narrow mobile screens */}
              <motion.div 
                style={{ x: x1, y: y1 }}
                className="absolute top-[5%] sm:top-[10%] -right-[10%] sm:right-[0%] w-[380px] sm:w-[480px] h-[280px] sm:h-[320px] bg-white rounded-xl border border-line shadow-2xl overflow-hidden flex flex-col z-10 transform origin-right scale-[0.7] sm:scale-100"
              >
                {/* Browser Chrome */}
                <div className="h-10 bg-slate-50 border-b border-line flex items-center px-4 gap-3 shrink-0">
                  <div className="flex gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-slate-300"></div>
                    <div className="w-2.5 h-2.5 rounded-full bg-slate-300"></div>
                    <div className="w-2.5 h-2.5 rounded-full bg-slate-300"></div>
                  </div>
                  <div className="flex-1 h-6 bg-white border border-line rounded-md flex items-center px-3 gap-2">
                    <ShieldCheck size={12} className="text-green-500" />
                    <div className="w-24 h-2 bg-slate-100 rounded"></div>
                  </div>
                </div>
                {/* Dashboard UI */}
                <div className="flex-grow p-4 flex gap-4 bg-slate-50/50">
                  {/* Sidebar */}
                  <div className="w-32 h-full bg-white border border-line rounded-lg p-3 flex flex-col gap-3 shadow-sm">
                    <div className="w-full h-6 rounded bg-primary/10 flex items-center px-2"><div className="w-1/2 h-2 bg-primary/40 rounded"></div></div>
                    <div className="w-full h-6 rounded flex items-center px-2"><div className="w-2/3 h-2 bg-slate-200 rounded"></div></div>
                    <div className="w-full h-6 rounded flex items-center px-2"><div className="w-1/2 h-2 bg-slate-200 rounded"></div></div>
                    <div className="w-full h-6 rounded flex items-center px-2"><div className="w-3/4 h-2 bg-slate-200 rounded"></div></div>
                  </div>
                  {/* Main Content area */}
                  <div className="flex-grow flex flex-col gap-4">
                    <div className="flex gap-4">
                      <div className="flex-1 h-20 bg-white border border-line rounded-lg shadow-sm p-3 flex flex-col justify-between">
                         <div className="w-6 h-6 rounded bg-indigo-50 text-indigo-500 flex items-center justify-center"><LayoutDashboard size={14} /></div>
                         <div className="w-1/2 h-2 bg-slate-200 rounded"></div>
                      </div>
                      <div className="flex-1 h-20 bg-white border border-line rounded-lg shadow-sm p-3 flex flex-col justify-between">
                         <div className="w-6 h-6 rounded bg-green-50 text-green-500 flex items-center justify-center"><Zap size={14} /></div>
                         <div className="w-1/2 h-2 bg-slate-200 rounded"></div>
                      </div>
                    </div>
                    <div className="flex-grow bg-white border border-line rounded-lg shadow-sm p-4 relative overflow-hidden">
                       {/* Chart mockup */}
                       <div className="absolute bottom-0 left-0 w-full h-[60%] flex items-end gap-1 px-4">
                         {[40, 60, 45, 80, 55, 90, 70].map((h, i) => (
                           <motion.div 
                             key={i} 
                             initial={{ height: 0 }}
                             animate={{ height: `${h}%` }}
                             transition={{ duration: 1, delay: 0.5 + i * 0.1 }}
                             className="flex-1 bg-gradient-to-t from-primary/20 to-primary/40 rounded-t-sm"
                           />
                         ))}
                       </div>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Layer 2: Illustration / Abstract graphic */}
              <motion.div 
                style={{ x: x2, y: y2 }}
                className="absolute bottom-[5%] sm:bottom-[10%] left-[0%] sm:left-[5%] w-[160px] sm:w-[200px] h-[200px] sm:h-[240px] bg-gradient-to-br from-primary to-secondary rounded-2xl shadow-xl overflow-hidden z-20 p-4 sm:p-5 flex flex-col justify-between text-white border border-white/20 transform origin-left scale-[0.75] sm:scale-100"
              >
                <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center backdrop-blur-sm border border-white/30">
                  <Code2 className="text-white" size={20} />
                </div>
                <div>
                  <div className="text-xs font-medium text-white/70 uppercase tracking-wider mb-1">Architecture</div>
                  <div className="font-semibold text-lg leading-tight">Scalable &<br/>Secure</div>
                  <div className="w-full h-1 bg-white/20 rounded-full mt-4 overflow-hidden">
                    <motion.div 
                      initial={{ width: "0%" }}
                      animate={{ width: "100%" }}
                      transition={{ duration: 2, ease: "easeOut", delay: 1 }}
                      className="h-full bg-white"
                    />
                  </div>
                </div>
              </motion.div>

              {/* Layer 3: Floating Feature Cards */}
              
              <motion.div 
                style={{ x: x3, y: y3 }}
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-[0%] sm:top-[5%] left-[5%] sm:left-[10%] enterprise-glass rounded-xl p-2 sm:p-3.5 flex items-center gap-2 sm:gap-3 shadow-lg z-30 border border-white/60 transform scale-[0.75] sm:scale-100"
              >
                <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center">
                  <Cloud className="text-blue-600 w-5 h-5" />
                </div>
                <div>
                  <div className="font-semibold text-heading text-sm leading-tight">Cloud-Native</div>
                  <div className="text-[11px] text-faint">Auto-scaling infrastructure</div>
                </div>
              </motion.div>

              <motion.div 
                style={{ x: x2, y: y1 }}
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="absolute bottom-[15%] sm:bottom-[20%] right-[-10%] sm:right-[-5%] enterprise-glass rounded-xl p-2 sm:p-3.5 flex items-center gap-2 sm:gap-3 shadow-lg z-30 border border-white/60 transform scale-[0.75] sm:scale-100"
              >
                <div className="w-10 h-10 rounded-full bg-indigo-50 flex items-center justify-center">
                  <Brain className="text-indigo-600 w-5 h-5" />
                </div>
                <div>
                  <div className="font-semibold text-heading text-sm leading-tight">AI-Powered</div>
                  <div className="text-[11px] text-faint">Smart automation</div>
                </div>
              </motion.div>

            </motion.div>
            )}
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
    // Disable parallax calculations on touch devices to improve mobile performance
    if (window.matchMedia && window.matchMedia("(hover: none)").matches) return;

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
