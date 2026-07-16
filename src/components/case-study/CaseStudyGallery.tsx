import { motion } from "framer-motion";
import Container from "@/components/common/Container";
import type { CaseStudy } from "@/services/caseStudies";

export default function CaseStudyGallery({ study }: { study: CaseStudy }) {
  if (!study.content?.gallery || study.content?.gallery.length === 0) return null;

  return (
    <section className="py-20 lg:py-32 bg-paper relative overflow-hidden border-t border-line/50">
      <Container>
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-display text-3xl sm:text-4xl font-bold text-heading tracking-tight mb-4"
          >
            Project Gallery
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-lg text-faint"
          >
            A closer look at the interfaces and dashboards we engineered.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {study.content?.gallery.map((image, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              className={`rounded-3xl overflow-hidden shadow-card border border-line bg-haze group ${
                idx === 0 && study.content?.gallery.length % 2 !== 0 ? "md:col-span-2" : ""
              }`}
            >
              <img 
                src={image} 
                alt={`${study.client} Gallery Image ${idx + 1}`}
                className="w-full h-full object-cover aspect-[16/10] transform group-hover:scale-105 transition-transform duration-[1500ms] ease-out"
              />
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
