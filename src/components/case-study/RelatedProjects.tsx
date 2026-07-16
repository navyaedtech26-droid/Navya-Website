import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Container from "@/components/common/Container";
import CaseStudyCard from "@/components/portfolio/CaseStudyCard";
import { getRelatedCaseStudies, type CaseStudy } from "@/services/caseStudies";

export default function RelatedProjects({ currentStudy }: { currentStudy: CaseStudy }) {
  const [related, setRelated] = useState<CaseStudy[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const data = await getRelatedCaseStudies(currentStudy, 2);
      setRelated(data);
      setLoading(false);
    }
    load();
  }, [currentStudy.id]);

  if (loading || related.length === 0) return null;

  return (
    <section className="py-24 lg:py-32 bg-mist relative overflow-hidden border-t border-line/50">
      <Container>
        <div className="text-center max-w-3xl mx-auto mb-16 lg:mb-20">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-display text-3xl sm:text-4xl font-bold text-heading tracking-tight mb-4"
          >
            Similar Projects
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-lg text-faint"
          >
            Explore more of our enterprise success stories.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {related.map((study, idx) => (
            <motion.div
              key={study.slug}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
            >
              <CaseStudyCard study={study as any} index={idx} />
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
