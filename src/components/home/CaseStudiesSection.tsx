import { motion } from "framer-motion";
import Container from "@/components/common/Container";
import SectionHeading from "@/components/common/SectionHeading";
import CaseStudyCard from "@/components/home/CaseStudyCard";
import { caseStudies } from "@/data/caseStudies";
import { staggerContainer, viewportOnce } from "@/lib/animations";

export default function CaseStudiesSection() {
  return (
    <section className="relative py-24">
      <Container>
        <SectionHeading
          eyebrow="Selected Work"
          title="Outcomes We've"
          highlight="Delivered"
          subtitle="Real clients we've partnered with — from complete ERP systems and online stores to brand-building social media."
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
