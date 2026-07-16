import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Cloud, Brain, Shield, Database } from "lucide-react";
import Container from "@/components/common/Container";
import { fadeUp, staggerContainer } from "@/lib/animations";

export default function ServicesHeroRedesign() {
  const handleScrollToServices = (e: React.MouseEvent) => {
    e.preventDefault();
    const target = document.getElementById("our-services");
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative isolate min-h-screen flex items-center overflow-hidden bg-paper pt-32 pb-24 sm:pt-40 sm:pb-32 border-b border-line">
      {/* Refined enterprise background grid */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 light-grid opacity-50 [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_80%)]"
      />

      {/* Subtle brand wash */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top_right,rgba(30,107,255,0.03),transparent_50%)]"
      />

      <Container>
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-12 lg:gap-8 items-center">
          {/* Left Column: Premium Copywriting */}
          <motion.div
            variants={staggerContainer(0.08)}
            initial="hidden"
            animate="visible"
            className="lg:col-span-6 space-y-8 text-left"
          >
            {/* Minimalist Tagline */}
            <motion.div variants={fadeUp}>
              <span className="inline-flex items-center rounded-full border border-line bg-haze px-3 py-1 text-xs font-semibold uppercase tracking-wider text-primary">
                <span className="mr-2 flex h-2 w-2 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-brand"></span>
                </span>
                Enterprise Solutions Group
              </span>
            </motion.div>

            {/* Redesigned Premium Title */}
            <motion.h1
              variants={fadeUp}
              className="type-display text-heading"
            >
              Building digital engines that <br />
              <span className="text-primary-light">
                power enterprise growth.
              </span>
            </motion.h1>

            {/* Clear, structured value statement */}
            <motion.p
              variants={fadeUp}
              className="text-base leading-relaxed text-faint sm:text-lg max-w-xl"
            >
              Navya EdTech translates raw technology investment into lasting corporate value. We design, engineer, and orchestrate custom software, automated AI pipelines, scalable cloud networks, robust ERPs, and conversion-focused web systems for market leaders.
            </motion.p>

            {/* Action Buttons */}
            <motion.div
              variants={fadeUp}
              className="flex flex-col sm:flex-row gap-4 pt-2"
            >
              <Link
                to="/contact"
                className="group inline-flex items-center justify-center gap-1.5 rounded-lg bg-primary px-7 py-3.5 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:bg-primary-dark focus-ring"
              >
                Start Your Project
                <ArrowRight size={16} className="transition-transform duration-200 group-hover:translate-x-0.5" />
              </Link>
              <a
                href="#our-services"
                onClick={handleScrollToServices}
                className="inline-flex items-center justify-center rounded-lg border border-line bg-white px-7 py-3.5 text-sm font-semibold text-heading shadow-sm transition-all duration-200 hover:bg-mist hover:border-primary/30 focus-ring"
              >
                Explore Services
              </a>
            </motion.div>
          </motion.div>

          {/* Right Column: Refined Abstract Architecture Visualization */}
          <div className="lg:col-span-6 relative flex justify-center items-center h-[400px] sm:h-[500px] w-full mt-8 lg:mt-0">
            {/* Background Structural Lines */}
            <svg
              className="absolute inset-0 w-full h-full text-line/80 pointer-events-none"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 500 500"
            >
              {/* Minimalist Grid Architecture */}
              <motion.path
                d="M250,250 L100,100 M250,250 L400,100 M250,250 L100,400 M250,250 L400,400"
                stroke="currentColor"
                strokeWidth="1"
                strokeDasharray="4 4"
              />
              <motion.path
                d="M250,250 L250,50 M250,250 L50,250 M250,250 L450,250 M250,250 L250,450"
                stroke="currentColor"
                strokeWidth="1"
              />

              {/* Data Packets flowing */}
              <motion.circle
                r="3"
                fill="#1E6BFF"
                animate={{ cx: [250, 100], cy: [250, 100] }}
                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
              />
              <motion.circle
                r="3"
                fill="#081E4D"
                animate={{ cx: [250, 400], cy: [250, 400] }}
                transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
              />

              {/* Nodes */}
              <circle cx="250" cy="250" r="24" fill="rgba(8, 30, 77, 0.03)" stroke="#1E6BFF" strokeWidth="1" strokeDasharray="2 2" />
              <circle cx="100" cy="100" r="4" fill="#081E4D" />
              <circle cx="400" cy="100" r="4" fill="#081E4D" />
              <circle cx="100" cy="400" r="4" fill="#081E4D" />
              <circle cx="400" cy="400" r="4" fill="#081E4D" />
            </svg>

            {/* Core Enterprise Hub */}
            <motion.div
              animate={{ scale: [0.98, 1.02, 0.98] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute z-10 w-28 h-28 rounded-2xl bg-white border border-line flex flex-col justify-center items-center shadow-card-light rotate-45"
            >
              <div className="w-16 h-16 rounded-xl bg-haze flex items-center justify-center text-primary font-bold text-lg -rotate-45 shadow-sm border border-line">
                N
              </div>
            </motion.div>

            {/* Architectural Service Cards */}
            {/* Card 1: Cloud Architecture */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: [0, -4, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="absolute top-[18%] right-[8%] z-20 w-48 p-4 rounded-xl card-light text-left"
            >
              <div className="flex items-center gap-2 mb-2">
                <Cloud size={14} className="text-brand" />
                <span className="text-[0.625rem] uppercase font-bold tracking-wider text-heading">Cloud Infra</span>
              </div>
              <div className="h-1.5 w-full bg-haze rounded-full overflow-hidden mb-1.5">
                <div className="h-full bg-emerald-500 w-[99%]" />
              </div>
              <div className="flex justify-between items-center text-[0.5625rem] text-faint font-mono">
                <span>Availability</span>
                <span className="text-emerald-600 font-semibold">99.999%</span>
              </div>
            </motion.div>

            {/* Card 2: AI Core */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: [0, 5, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              className="absolute bottom-[20%] left-[2%] z-20 w-52 p-4 rounded-xl card-light text-left"
            >
              <div className="flex items-center justify-between mb-2 pb-2 border-b border-line/60">
                <div className="flex items-center gap-1.5">
                  <Brain size={14} className="text-primary-light" />
                  <span className="text-[0.625rem] uppercase font-bold tracking-wider text-heading">AI Models</span>
                </div>
                <span className="flex h-2 w-2 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
              </div>
              <div className="space-y-1.5">
                <div className="flex justify-between text-[0.5625rem] font-mono">
                  <span className="text-faint">Inference Speed</span>
                  <span className="text-brand font-semibold">12ms</span>
                </div>
                <div className="flex justify-between text-[0.5625rem] font-mono">
                  <span className="text-faint">Data Vectorization</span>
                  <span className="text-emerald-600 font-semibold">Complete</span>
                </div>
              </div>
            </motion.div>

            {/* Card 3: Security & ERP */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: [0, 4, 0] }}
              transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }}
              className="absolute top-[8%] left-[12%] z-20 w-44 p-3 rounded-xl card-light text-left"
            >
              <div className="flex items-center gap-2">
                <Shield size={14} className="text-emerald-600" />
                <div className="flex-1">
                  <p className="text-[0.625rem] font-bold text-heading leading-none">Zero-Trust</p>
                  <p className="text-[0.5625rem] text-faint leading-none mt-1">Network Active</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: [0, -5, 0] }}
              transition={{ duration: 4.8, repeat: Infinity, ease: "easeInOut" }}
              className="absolute bottom-[8%] right-[10%] z-20 w-44 p-3 rounded-xl card-light text-left"
            >
              <div className="flex items-center gap-2">
                <Database size={14} className="text-secondary" />
                <div className="flex-1">
                  <p className="text-[0.625rem] font-bold text-heading leading-none">ERP Sync</p>
                  <p className="text-[0.5625rem] text-faint leading-none mt-1">Real-time Ledgers</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </Container>
    </section>
  );
}
