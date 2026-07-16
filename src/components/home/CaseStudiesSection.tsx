import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Container from "@/components/common/Container";
import SectionHeading from "@/components/common/SectionHeading";
import CaseStudyCard from "@/components/home/CaseStudyCard";
import type { CaseStudy } from "@/services/caseStudies";
import { staggerContainer, viewportOnce } from "@/lib/animations";

export default function CaseStudiesSection() {
  const [caseStudies, setCaseStudies] = useState<CaseStudy[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      // Dynamic import: @/services/caseStudies pulls in the full
      // @supabase/supabase-js SDK, which is too heavy to bundle into Home's
      // eagerly-loaded main chunk just for a read-only fetch.
      const { getPublishedCaseStudies } = await import("@/services/caseStudies");
      const data = await getPublishedCaseStudies(3);
      setCaseStudies(data);
      setLoading(false);
    }
    load();
  }, []);

  return (
    <section id="case-studies" className="relative bg-[#F4F7F5] py-[120px] scroll-mt-24 overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 left-1/4 h-96 w-96 -translate-y-1/2 translate-x-1/2 rounded-full bg-[#404E3B]/5 blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 h-[500px] w-[500px] translate-y-1/4 translate-x-1/4 rounded-full bg-brand/5 blur-[120px] pointer-events-none" />

      <Container className="relative z-10">
        <SectionHeading
          tone="light"
          eyebrow="Proven Outcomes"
          title="Results We've"
          highlight="Delivered"
          subtitle="Real partnerships where digital investment became a business advantage — unified operations, new revenue channels, and brands that command attention."
        />

        {loading ? (
          <div className="flex justify-center py-20"><span className="animate-pulse text-faint">Loading...</span></div>
        ) : (
          <motion.div
            variants={staggerContainer(0.08)}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            className="mt-20 flex flex-col gap-24 lg:gap-32"
          >
            {caseStudies.map((study, index) => (
              <CaseStudyCard key={study.client} study={study} index={index} />
            ))}
          </motion.div>
        )}
      </Container>
    </section>
  );
}
