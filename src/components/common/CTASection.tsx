import { motion } from "framer-motion";
import Container from "@/components/common/Container";
import MagneticButton from "@/components/effects/MagneticButton";
import FloatingOrbs from "@/components/effects/FloatingOrbs";
import { fadeUp, staggerContainer, viewportOnce } from "@/lib/animations";

interface CTASectionProps {
  title: string;
  subtitle: string;
  buttonLabel: string;
  /**
   * "dark" (default) = legacy navy pages: transparent section, translucent
   * card. "light" = professional redesign: a white section wrapping a solid
   * deep-navy CTA band — the deliberate dark close before the dark footer.
   */
  tone?: "dark" | "light";
}

export default function CTASection({ title, subtitle, buttonLabel, tone = "light" }: CTASectionProps) {
  const light = tone === "light";

  const content = (
    <div className="relative">
      <motion.h2
        variants={fadeUp}
        className="mx-auto max-w-2xl font-display text-3xl font-semibold leading-tight tracking-tight text-ink sm:text-4xl md:text-5xl"
      >
        {title}
      </motion.h2>
      <motion.p
        variants={fadeUp}
        className="mx-auto mt-5 max-w-xl text-base text-ink-muted sm:text-lg"
      >
        {subtitle}
      </motion.p>
      <motion.div variants={fadeUp} className="mt-9 flex justify-center">
        <MagneticButton to="/contact">{buttonLabel}</MagneticButton>
      </motion.div>
    </div>
  );

  // Light (redesign): a full-bleed deep-navy band that matches the flush navbar
  // and footer — the deliberate dark close before the footer.
  if (light) {
    return (
      <motion.section
        variants={staggerContainer(0.12)}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
        className="relative overflow-hidden border-t border-white/10 bg-bg py-20 text-center md:py-28"
      >
        <img
          src="/home/homecta.avif"
          alt=""
          aria-hidden="true"
          loading="lazy"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-bg/70" />
        <FloatingOrbs count={5} />
        <div className="absolute inset-0 grid-bg opacity-30 [mask-image:radial-gradient(ellipse_at_center,black,transparent_70%)]" />
        <div className="absolute -inset-x-20 -top-40 h-80 bg-brand/20 blur-[120px]" />
        <Container className="relative">{content}</Container>
      </motion.section>
    );
  }

  // Legacy dark pages: a contained, translucent card on a transparent section.
  return (
    <section className="relative py-16 md:py-20">
      <Container>
        <motion.div
          variants={staggerContainer(0.12)}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-surface/60 to-bg-900/60 px-6 py-16 text-center shadow-glow sm:px-12"
        >
          <FloatingOrbs count={5} />
          <div className="absolute inset-0 grid-bg opacity-30 [mask-image:radial-gradient(ellipse_at_center,black,transparent_70%)]" />
          <div className="absolute -inset-x-20 -top-40 h-80 bg-brand/20 blur-[120px]" />
          {content}
        </motion.div>
      </Container>
    </section>
  );
}
