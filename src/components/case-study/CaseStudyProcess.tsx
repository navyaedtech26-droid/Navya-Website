import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import Container from "@/components/common/Container";
import type { CaseStudy } from "@/services/caseStudies";

export default function CaseStudyProcess({ study }: { study: CaseStudy }) {
  if (!study.content?.developmentProcess?.milestones || study.content.developmentProcess.milestones.length === 0) return null;

  return (
    <section className="py-20 lg:py-32 bg-mist relative overflow-hidden border-t border-line/50">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          
          <div className="lg:col-span-4 lg:sticky lg:top-32">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="font-display text-3xl sm:text-4xl font-bold text-heading tracking-tight mb-6">
                Development Process
              </h2>
              <div className="flex flex-col gap-4 bg-white p-6 rounded-3xl border border-line shadow-sm">
                <div>
                  <div className="text-xs font-bold text-faint uppercase tracking-wider mb-1">Timeline</div>
                  <div className="text-lg font-bold text-heading">{study.duration}</div>
                </div>
                <div className="pt-4 border-t border-line/50">
                  <div className="text-xs font-bold text-faint uppercase tracking-wider mb-1">Methodology</div>
                  <div className="text-lg font-bold text-brand">{study.content?.developmentProcess.methodology}</div>
                </div>
              </div>
            </motion.div>
          </div>

          <div className="lg:col-span-8 relative">
            <div className="absolute left-8 top-0 bottom-0 w-px bg-line" />
            
            <div className="space-y-12 relative z-10">
              {study.content?.developmentProcess?.milestones?.map((milestone, idx) => (
                <motion.div 
                  key={idx}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  className="flex gap-8"
                >
                  <div className="w-16 h-16 rounded-full bg-white border-4 border-mist flex items-center justify-center shrink-0 shadow-sm relative z-10 group-hover:border-brand/30 transition-colors">
                    <CheckCircle2 className="w-6 h-6 text-brand" />
                  </div>
                  <div className="pt-4">
                    <div className="text-sm font-bold text-brand uppercase tracking-wider mb-2">Phase 0{idx + 1}</div>
                    <h3 className="font-display text-2xl font-bold text-heading mb-3">{milestone.title}</h3>
                    <p className="text-faint leading-relaxed bg-white p-6 rounded-2xl border border-line shadow-sm">
                      {milestone.desc}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

        </div>
      </Container>
    </section>
  );
}
