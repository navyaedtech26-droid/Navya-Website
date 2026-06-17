import { motion } from "framer-motion";
import Container from "@/components/common/Container";
import { fadeUp, staggerContainer } from "@/lib/animations";

interface PageHeroProps {
  eyebrow: string;
  title: string;
  highlight?: string;
  subtitle: string;
}

export default function PageHero({ eyebrow, title, highlight, subtitle }: PageHeroProps) {
  return (
    <section className="relative overflow-hidden pb-12 pt-36">
      <div className="absolute left-1/2 top-0 h-72 w-72 -translate-x-1/2 rounded-full bg-brand/20 blur-[120px]" />
      <Container className="relative">
        <motion.div
          variants={staggerContainer(0.12)}
          initial="hidden"
          animate="visible"
          className="mx-auto max-w-3xl text-center"
        >
          <motion.span
            variants={fadeUp}
            className="inline-flex items-center gap-2 rounded-full glass px-4 py-1.5 text-xs font-medium uppercase tracking-[0.2em] text-brand-light"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-cyan-accent animate-pulse-glow" />
            {eyebrow}
          </motion.span>
          <motion.h1
            variants={fadeUp}
            className="mt-6 font-display text-4xl font-semibold leading-[1.08] tracking-tight text-ink sm:text-5xl md:text-6xl"
          >
            {title} {highlight && <span className="text-gradient">{highlight}</span>}
          </motion.h1>
          <motion.p
            variants={fadeUp}
            className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-ink-muted sm:text-lg"
          >
            {subtitle}
          </motion.p>
        </motion.div>
      </Container>
    </section>
  );
}
