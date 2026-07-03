import { motion } from "framer-motion";
import Container from "@/components/common/Container";
import SectionHeading from "@/components/common/SectionHeading";
import IconBadge from "@/components/common/IconBadge";
import TiltCard from "@/components/effects/TiltCard";
import { industries } from "@/data/industries";
import { fadeUp, staggerContainer, viewportOnce } from "@/lib/animations";

export default function IndustriesSection() {
  return (
    <section className="relative bg-paper py-16 md:py-20">
      <Container>
        <SectionHeading
          tone="light"
          eyebrow="Who We Help"
          title="Solutions for Every"
          highlight="Industry"
          subtitle="From first-time founders to established operations, we build digital solutions tailored to the realities of your sector."
        />

        <motion.div
          variants={staggerContainer(0.06)}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4"
        >
          {industries.map((industry) => (
            <motion.div key={industry.title} variants={fadeUp}>
              <TiltCard intensity={7} className="h-full">
                <div className="group flex h-full flex-col card-light rounded-2xl p-6 transition-shadow duration-300 hover:shadow-card-hover">
                  <div className="w-fit transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:scale-105">
                    <IconBadge icon={industry.icon} size="lg" color={industry.color} tone="light" />
                  </div>
                  <h3 className="mt-5 font-display text-base font-semibold text-heading">
                    {industry.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-faint">
                    {industry.description}
                  </p>
                </div>
              </TiltCard>
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </section>
  );
}
