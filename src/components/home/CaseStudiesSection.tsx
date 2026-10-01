import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Container from "@/components/common/Container";
import SectionHeading from "@/components/common/SectionHeading";
import CaseStudyCard from "@/components/home/CaseStudyCard";
import { Skeleton, SkeletonGroup } from "@/components/common/Skeleton";
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
    <section id="case-studies" className="relative bg-mist py-[120px] scroll-mt-24 overflow-hidden">
      {/* Two washes as before, but the first is brand-tinted rather than
          #404E3B - an olive green that is not in the palette. The section
          background likewise moved off #F4F7F5 (green-tinted) to the cool
          `mist` neutral so it matches the rest of the page. Spacing and layout
          are unchanged from the original. */}
      <div className="absolute top-0 left-1/4 h-96 w-96 -translate-y-1/2 translate-x-1/2 rounded-full bg-brand/5 blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 h-[500px] w-[500px] translate-y-1/4 translate-x-1/4 rounded-full bg-brand/5 blur-[120px] pointer-events-none" />

      <Container className="relative z-10">
        <SectionHeading
          title="Results We've"
          highlight="Delivered"
          subtitle="Real partnerships where digital investment became a business advantage, unified operations, new revenue channels, and brands that command attention."
        />

        {loading ? (
          /* Skeleton shaped like the split card that lands here, rather than a
             centred "Loading..." string - the page keeps its layout instead of
             collapsing and then jumping when the fetch resolves. */
          <SkeletonGroup label="Loading case studies" className="mt-20 flex flex-col gap-8 lg:flex-row lg:gap-16">
            <div className="lg:w-1/2">
              <Skeleton className="h-[300px] w-full rounded-[24px] sm:h-[400px] lg:h-[500px]" />
            </div>
            <div className="space-y-4 lg:w-1/2 lg:p-8">
              <Skeleton className="h-6 w-40" />
              <Skeleton className="h-10 w-2/3" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-5/6" />
            </div>
          </SkeletonGroup>
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
