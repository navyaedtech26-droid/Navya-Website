import { motion } from "framer-motion";
import Container from "@/components/common/Container";
import SectionHeading from "@/components/common/SectionHeading";
import CaseStudyCard from "@/components/home/CaseStudyCard";
import { caseStudies } from "@/data/caseStudies";
import { staggerContainer, viewportOnce } from "@/lib/animations";

export default function CaseStudiesSection() {
  return (
    <section id="case-studies" className="relative bg-mist py-16 md:py-20 scroll-mt-24">
      <Container>
        <SectionHeading
          tone="light"
          eyebrow="Proven Outcomes"
          title="Results We've"
          highlight="Delivered"
          subtitle="Real partnerships where digital investment became a business advantage — unified operations, new revenue channels, and brands that command attention."
        />

        <motion.div
          variants={staggerContainer(0.08)}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3"
        >
          {caseStudies.map((study) => (
            <CaseStudyCard key={study.client} study={study} />
          ))}
        </motion.div>
      </Container>
    </section>
  );
}
