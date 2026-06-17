import { motion } from "framer-motion";
import Container from "@/components/common/Container";
import MagneticButton from "@/components/effects/MagneticButton";
import FloatingOrbs from "@/components/effects/FloatingOrbs";
import { fadeUp, staggerContainer, viewportOnce } from "@/lib/animations";

interface CTASectionProps {
  title: string;
  subtitle: string;
  buttonLabel: string;
}

export default function CTASection({ title, subtitle, buttonLabel }: CTASectionProps) {
  return (
    <section className="relative py-24">
      <Container>
        <motion.div
          variants={staggerContainer(0.12)}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-surface/60 to-bg-900/60 px-6 py-16 text-center shadow-glow sm:px-12"
        >
          <FloatingOrbs count={12} />
          <div className="absolute inset-0 grid-bg opacity-30 [mask-image:radial-gradient(ellipse_at_center,black,transparent_70%)]" />
          <div className="absolute -inset-x-20 -top-40 h-80 bg-brand/20 blur-[120px]" />

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
        </motion.div>
      </Container>
    </section>
  );
}
