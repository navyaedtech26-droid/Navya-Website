import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, MessageSquare } from "lucide-react";
import Container from "@/components/common/Container";
import { fadeUp, staggerContainer, viewportOnce } from "@/lib/animations";

export default function ServicesCTA() {
  return (
    <section className="relative py-32 bg-primary text-white overflow-hidden">
      {/* Premium radial wash background */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(30,107,255,0.18)_0%,transparent_70%)] pointer-events-none"
      />
      <div
        aria-hidden="true"
        className="absolute -top-40 -left-40 h-[400px] w-[400px] rounded-full bg-brand/10 blur-[120px] pointer-events-none animate-pulse-glow"
      />

      <Container className="relative z-10">
        <motion.div
          variants={staggerContainer(0.08)}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="max-w-4xl mx-auto text-center space-y-8"
        >
          {/* Main Heading */}
          <motion.h2
            variants={fadeUp}
            className="font-display text-4xl sm:text-5xl md:text-6xl font-semibold tracking-tight text-white leading-tight"
          >
            Let's build something <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky via-brand-light to-white">
              exceptional together.
            </span>
          </motion.h2>

          {/* Value Paragraph */}
          <motion.p
            variants={fadeUp}
            className="text-base sm:text-lg text-ink-muted leading-relaxed max-w-2xl mx-auto"
          >
            Whether you need to automate administrative bottlenecks with practical AI agents, build high-performance web systems, or deploy scalable cloud-native architectures, we have the engineering depth to execute your goals.
          </motion.p>

          {/* Action Buttons */}
          <motion.div
            variants={fadeUp}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-2"
          >
            <Link
              to="/contact?intent=consultation"
              className="group w-full sm:w-auto inline-flex items-center justify-center gap-1.5 rounded-xl bg-white px-7 py-4 text-sm font-semibold text-primary shadow-lg transition-transform duration-200 hover:-translate-y-0.5 hover:bg-slate-50"
            >
              Schedule Consultation
              <ArrowRight size={16} className="transition-transform duration-200 group-hover:translate-x-0.5" />
            </Link>
            <Link
              to="/contact"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 rounded-xl border border-white/20 bg-primary-light/45 px-7 py-4 text-sm font-semibold text-white backdrop-blur-sm transition-colors duration-200 hover:bg-primary-light/80 hover:border-white/40"
            >
              <MessageSquare size={16} />
              Contact Us
            </Link>
          </motion.div>

          {/* Footer Closing Banner */}
          <motion.p
            variants={fadeUp}
            className="text-xs text-slate-400 font-mono pt-12 border-t border-white/10"
          >
            Have an intricate engineering specification?{" "}
            <Link to="/contact" className="text-brand-light hover:underline font-semibold">
              Speak directly with our solutions architect
            </Link>{" "}
            for a custom technical estimate.
          </motion.p>
        </motion.div>
      </Container>
    </section>
  );
}
