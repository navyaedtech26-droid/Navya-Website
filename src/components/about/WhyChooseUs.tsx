import { motion } from "framer-motion";
import Container from "@/components/common/Container";
import SectionHeading from "@/components/common/SectionHeading";
import IconBadge from "@/components/common/IconBadge";
import { whyChooseUs } from "@/data/about";
import { fadeUp, staggerContainer, viewportOnce } from "@/lib/animations";

export default function WhyChooseUs() {
  return (
    <section className="relative py-20">
      <Container>
        <SectionHeading eyebrow="The Difference" title="Why Choose" highlight="Navya EdTech" />
        <motion.div
          variants={staggerContainer(0.08)}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
        >
          {whyChooseUs.map((item) => (
            <motion.div
              key={item.title}
              variants={fadeUp}
              className="group flex items-start gap-4 rounded-2xl glass p-6 transition-all duration-300 hover:shadow-glow"
            >
              <IconBadge icon={item.icon} />
              <div>
                <h3 className="font-display text-base font-semibold text-ink">
                  {item.title}
                </h3>
                <p className="mt-1.5 text-sm leading-relaxed text-ink-muted">
                  {item.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </section>
  );
}
