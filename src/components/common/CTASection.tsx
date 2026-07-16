import { motion } from "framer-motion";
import { ArrowRight, BriefcaseBusiness } from "lucide-react";
import Container from "@/components/common/Container";
import { fadeUp, staggerContainer, viewportOnce } from "@/lib/animations";
import { Link } from "react-router-dom";

interface CTASectionProps {
  title: string;
  subtitle: string;
  primaryButtonLabel: string;
  primaryButtonHref?: string;
  secondaryButtonLabel?: string;
  secondaryButtonHref?: string;
}

export default function CTASection({
  title,
  subtitle,
  primaryButtonLabel,
  primaryButtonHref = "/contact",
  secondaryButtonLabel,
  secondaryButtonHref = "/portfolio"
}: CTASectionProps) {
  return (
    <section className="relative overflow-hidden bg-heading py-28 lg:py-40 border-t border-white/5">
      {/* Premium Dark Tech Abstract Background */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Subtle Dark Grid */}
        <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.15) 1px, transparent 0)', backgroundSize: '40px 40px' }} />

        {/* Massive Ambient Glow */}
        <motion.div
          animate={{
            rotate: 360,
            scale: [1, 1.05, 1],
          }}
          transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[800px] w-[1200px] rounded-[100%] bg-brand/15 blur-[150px]"
        />
        
        {/* Secondary Color Accents */}
        <motion.div
          animate={{
            opacity: [0.1, 0.3, 0.1],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -bottom-[20%] right-[10%] h-[500px] w-[500px] rounded-full bg-primary/20 blur-[120px]"
        />
        
        <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-brand/40 to-transparent" />
      </div>

      <Container className="relative z-10">
        <motion.div
          variants={staggerContainer(0.12)}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="mx-auto max-w-5xl text-center"
        >
          {/* Large Headline */}
          <motion.h2
            variants={fadeUp}
            className="font-display text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-[4.5rem] leading-[1.05]"
          >
            {title}
          </motion.h2>

          {/* Supporting Text */}
          <motion.p
            variants={fadeUp}
            className="mx-auto mt-8 max-w-2xl text-lg sm:text-xl leading-relaxed text-white/70 font-medium"
          >
            {subtitle}
          </motion.p>

          {/* CTA Buttons */}
          <motion.div variants={fadeUp} className="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row sm:gap-6">
            <Link
              to={primaryButtonHref}
              className="group relative inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-primary px-10 py-5 text-base font-bold text-white shadow-[0_0_40px_rgba(30,107,255,0.4)] transition-all duration-300 hover:shadow-[0_0_60px_rgba(30,107,255,0.6)] hover:-translate-y-1 sm:w-auto overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 ease-in-out" />
              <span>{primaryButtonLabel}</span>
              <ArrowRight size={20} className="transition-transform duration-300 group-hover:translate-x-1" strokeWidth={2.5} />
            </Link>

            {secondaryButtonLabel && (
              <Link
                to={secondaryButtonHref}
                className="group inline-flex w-full items-center justify-center gap-2 rounded-2xl border border-white/20 bg-white/5 px-10 py-5 text-base font-bold text-white shadow-sm backdrop-blur-md transition-all duration-300 hover:bg-white/10 hover:border-white/40 hover:-translate-y-1 sm:w-auto"
              >
                <BriefcaseBusiness size={20} className="text-white/70 transition-colors group-hover:text-white" strokeWidth={2.5} />
                <span>{secondaryButtonLabel}</span>
              </Link>
            )}
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
}
