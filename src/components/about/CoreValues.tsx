import { motion } from "framer-motion";
import Container from "@/components/common/Container";
import SectionHeading from "@/components/common/SectionHeading";
import IconBadge from "@/components/common/IconBadge";
import { coreValues } from "@/data/about";
import { fadeUp, staggerContainer, viewportOnce } from "@/lib/animations";

export default function CoreValues() {
  return (
    <section className="relative py-20">
      <Container>
        <SectionHeading eyebrow="What Drives Us" title="Our Core" highlight="Values" />
        <motion.div
          variants={staggerContainer(0.1)}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4"
        >
          {coreValues.map((value) => (
            <motion.div
              key={value.title}
              variants={fadeUp}
              className="group rounded-2xl glass p-7 text-center transition-all duration-300 hover:-translate-y-1 hover:shadow-glow"
            >
              <div className="flex justify-center">
                <IconBadge icon={value.icon} size="lg" />
              </div>
              <h3 className="mt-5 font-display text-lg font-semibold text-ink">
                {value.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-muted">
                {value.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </section>
  );
}
