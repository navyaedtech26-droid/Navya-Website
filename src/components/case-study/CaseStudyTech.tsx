import { motion } from "framer-motion";
import { Monitor, Server, Cloud, Database, Settings, BrainCircuit } from "lucide-react";
import Container from "@/components/common/Container";
import type { CaseStudy } from "@/services/caseStudies";

export default function CaseStudyTech({ study }: { study: CaseStudy }) {
  const categories = [
    { id: "frontend", label: "Frontend", icon: Monitor, items: study.content?.techStack?.frontend || [] },
    { id: "backend", label: "Backend", icon: Server, items: study.content?.techStack?.backend || [] },
    { id: "cloud", label: "Cloud", icon: Cloud, items: study.content?.techStack?.cloud || [] },
    { id: "database", label: "Database", icon: Database, items: study.content?.techStack?.database || [] },
    { id: "devops", label: "DevOps", icon: Settings, items: study.content?.techStack?.devops || [] },
    ...(study.content?.techStack?.ai && study.content?.techStack?.ai.length > 0 ? [{ id: "ai", label: "AI & ML", icon: BrainCircuit, items: study.content?.techStack.ai }] : [])
  ].filter(cat => cat.items.length > 0);

  if (categories.length === 0) return null;

  return (
    <section className="py-20 lg:py-32 bg-white relative overflow-hidden">
      <Container>
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-heading tracking-tight mb-4">
              Technology Stack
            </h2>
            <p className="text-lg text-faint">
              The modern, scalable infrastructure powering the solution.
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
          {categories.map((cat, idx) => {
            const Icon = cat.icon;
            return (
              <motion.div
                key={cat.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="p-6 rounded-3xl bg-paper border border-line flex flex-col items-center text-center group hover:border-brand/30 transition-colors shadow-sm hover:shadow-card-hover"
              >
                <div className="w-12 h-12 rounded-xl bg-mist flex items-center justify-center mb-4 group-hover:bg-brand/10 transition-colors">
                  <Icon className="w-6 h-6 text-faint group-hover:text-brand transition-colors" />
                </div>
                <h3 className="font-bold text-heading mb-4 uppercase tracking-wider text-xs">
                  {cat.label}
                </h3>
                <div className="flex flex-col gap-2 w-full">
                  {cat.items.map(item => (
                    <span key={item} className="px-3 py-1.5 rounded-lg bg-white border border-line text-sm font-semibold text-faint shadow-sm truncate">
                      {item}
                    </span>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
