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

        {/* Static ambient glow. This was a 1200x800 element at 150px blur
            rotating a full turn every 40s, forever, plus a second pulsing
            blob - a permanent compositing cost on every page that renders
            this section, for motion nobody can perceive on a symmetrical
            radial shape. */}
        <div className="absolute left-1/2 top-1/2 h-[800px] w-[1200px] -translate-x-1/2 -translate-y-1/2 rounded-[100%] bg-brand/15 blur-[150px]" />

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
            /* Capped at 6xl. 4.5rem extrabold was larger than the page's own
               H1 after the hero was scaled back, which inverted the type
               hierarchy at the bottom of the page. */
            className="font-display text-4xl font-bold leading-[1.08] tracking-tight text-white sm:text-5xl lg:text-6xl"
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
              /* Solid brand blue with tinted elevation. It was navy (`bg-primary`)
                 wearing a 40px blue outer glow - a colour the button itself
                 never used, and a neon bloom the rest of the site does not
                 have. Matching the fill to the accent and swapping the glow
                 for a directional shadow keeps it prominent without the halo. */
              className="group relative inline-flex w-full items-center justify-center gap-2 overflow-hidden rounded-xl bg-brand px-10 py-5 text-base font-bold text-white shadow-[0_10px_30px_-10px_rgba(30,107,255,0.7)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-brand-light active:translate-y-0 sm:w-auto"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 ease-in-out" />
              <span>{primaryButtonLabel}</span>
              <ArrowRight size={20} className="transition-transform duration-300 group-hover:translate-x-1" strokeWidth={2.5} />
            </Link>

            {secondaryButtonLabel && (
              <Link
                to={secondaryButtonHref}
                className="group inline-flex w-full items-center justify-center gap-2 rounded-xl border border-white/20 bg-white/5 px-10 py-5 text-base font-bold text-white shadow-sm backdrop-blur-md transition-all duration-300 hover:-translate-y-0.5 hover:border-white/40 hover:bg-white/10 active:translate-y-0 sm:w-auto"
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
