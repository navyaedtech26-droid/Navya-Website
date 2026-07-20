import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Calendar, Cpu, GitBranch, Layers } from "lucide-react";
import Container from "@/components/common/Container";

export default function PortfolioCTA() {
  return (
    <section className="relative py-24 lg:py-32 overflow-hidden bg-primary text-white">
      {/* Abstract Technology Illustration / Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-brand-gradient opacity-10" />

        {/* Tech Grid */}
        <div className="noise absolute inset-0 opacity-20 mix-blend-overlay" />

        {/* Animated Glow Nodes */}
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.15, 0.3, 0.15] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-[30%] -right-[10%] h-[40rem] w-[40rem] rounded-full bg-brand blur-[120px]"
        />
        <motion.div
          animate={{ scale: [1, 1.1, 1], opacity: [0.1, 0.2, 0.1] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute -bottom-[30%] -left-[10%] h-[40rem] w-[40rem] rounded-full bg-cyan-accent blur-[120px]"
        />

        {/* Floating Abstract Tech Elements */}
        <motion.div
          animate={{ y: [0, -20, 0], rotate: [0, 5, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[20%] left-[10%] opacity-20 hidden lg:block"
        >
          <Layers size={64} className="text-white" />
        </motion.div>
        <motion.div
          animate={{ y: [0, 30, 0], rotate: [0, -10, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute bottom-[20%] right-[10%] opacity-20 hidden lg:block"
        >
          <Cpu size={80} className="text-white" />
        </motion.div>
        <motion.div
          animate={{ y: [0, -15, 0], rotate: [0, 15, 0] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute top-[30%] right-[20%] opacity-10 hidden lg:block"
        >
          <GitBranch size={48} className="text-white" />
        </motion.div>
      </div>

      <Container className="relative z-10">
        <div className="mx-auto max-w-5xl">
          {/* Glass Effect Card Container */}
          <div className="relative rounded-[3rem] bg-white/5 border border-white/10 backdrop-blur-2xl shadow-2xl p-8 sm:p-12 lg:p-20 overflow-hidden">

            {/* Inner glow for glass card */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent pointer-events-none" />

            <div className="relative z-10 text-center flex flex-col items-center">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="w-16 h-16 rounded-2xl bg-brand/20 border border-brand/30 flex items-center justify-center mb-8 shadow-inner"
              >
                <Cpu className="w-8 h-8 text-cyan-accent" />
              </motion.div>

              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
                className="font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight tracking-tight mb-8 text-white"
              >
                Let's Build Your Next <br className="hidden sm:block" />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-accent to-brand">
                  Digital Success Story
                </span>
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
                className="text-lg sm:text-xl text-ink-muted max-w-3xl leading-relaxed mb-12"
              >
                Navya partners with visionary startups and global enterprises to engineer scalable, high-performance software solutions. From zero-to-one product development to complex digital transformations, we turn your boldest ideas into market-leading realities.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, ease: "easeOut", delay: 0.3 }}
                className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto"
              >
                {/* Primary Button */}
                <Link
                  to="/contact"
                  className="group relative flex h-16 w-full sm:w-auto items-center justify-center gap-3 overflow-hidden rounded-xl bg-white px-10 font-bold text-primary shadow-lg transition-transform hover:-translate-y-1 active:translate-y-0 text-lg"
                >
                  <div className="absolute inset-0 bg-slate-50 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                  <span className="relative z-10">Start Your Project</span>
                  <ArrowRight className="relative z-10 w-5 h-5 transition-transform group-hover:translate-x-1" />
                </Link>

                {/* Secondary Button */}
                <Link
                  to="/contact"
                  className="group relative flex h-16 w-full sm:w-auto items-center justify-center gap-3 overflow-hidden rounded-xl bg-white/10 border border-white/20 px-10 font-bold text-white shadow-lg backdrop-blur-md transition-all hover:bg-white/20 hover:-translate-y-1 active:translate-y-0 text-lg"
                >
                  <span className="relative z-10">Schedule Consultation</span>
                  <Calendar className="relative z-10 w-5 h-5 opacity-70 group-hover:opacity-100 transition-opacity" />
                </Link>
              </motion.div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
