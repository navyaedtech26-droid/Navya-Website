import { motion } from "framer-motion";
import Container from "@/components/common/Container";
import SectionHeading from "@/components/common/SectionHeading";
import IconBadge from "@/components/common/IconBadge";
import { features } from "@/data/features";
import { fadeUp, staggerContainer, viewportOnce } from "@/lib/animations";

export default function FeaturesSection() {
  return (
    <section className="relative py-24">
      <Container>
        <SectionHeading
          eyebrow="Why It Works"
          title="Built for Performance."
          highlight="Designed for Growth."
        />

        <motion.div
          variants={staggerContainer(0.08)}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
        >
          {features.map((feature) => (
            <motion.div
              key={feature.title}
              variants={fadeUp}
              className="group relative overflow-hidden rounded-2xl glass p-7 transition-all duration-300 hover:-translate-y-1 hover:shadow-glow"
            >
              <div className="absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-brand/60 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              <IconBadge icon={feature.icon} />
              <h3 className="mt-5 font-display text-lg font-semibold text-ink">
                {feature.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-muted">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </section>
  );
}
