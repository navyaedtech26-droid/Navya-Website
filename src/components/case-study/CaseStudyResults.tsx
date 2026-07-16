import { motion } from "framer-motion";
import { TrendingUp, Activity, CheckCircle } from "lucide-react";
import Container from "@/components/common/Container";
import type { CaseStudy } from "@/services/caseStudies";

export default function CaseStudyResults({ study }: { study: CaseStudy }) {
  if (!study.content?.results) return null;

  return (
    <section className="py-20 lg:py-32 bg-white relative overflow-hidden">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="inline-flex items-center gap-2 rounded-full border border-brand/20 bg-brand/5 px-4 py-2 text-sm font-semibold text-brand mb-6 shadow-sm backdrop-blur-md">
              Business Impact
            </div>
            
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-heading mb-6 tracking-tight">
              Measurable Results
            </h2>
            
            <p className="text-lg text-faint leading-relaxed mb-10">
              {study.content?.results?.businessImpact}
            </p>

            <div className="space-y-8">
              <div>
                <h4 className="flex items-center gap-2 font-bold text-heading mb-4 text-lg">
                  <Activity className="w-5 h-5 text-emerald-500" />
                  Performance Improvements
                </h4>
                <ul className="space-y-3 text-faint">
                  {study.content?.results?.performance?.map((perf, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-2 shrink-0" />
                      <span>{perf}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="flex items-center gap-2 font-bold text-heading mb-4 text-lg">
                  <TrendingUp className="w-5 h-5 text-blue-500" />
                  Strategic Outcomes
                </h4>
                <ul className="space-y-3 text-faint">
                  {study.content?.results?.outcomes?.map((outcome, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-blue-500 shrink-0" />
                      <span>{outcome}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>

          {/* KPI Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {study.content?.results?.kpis?.map((kpi, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className={`p-8 rounded-3xl border border-line flex flex-col items-center justify-center text-center shadow-sm relative overflow-hidden bg-${study.accent}-500/5`}
              >
                <div className={`absolute -right-10 -top-10 w-32 h-32 bg-${study.accent}-500/10 rounded-full blur-2xl`} />
                <div className={`font-display text-5xl font-extrabold text-${study.accent}-500 mb-2 relative z-10`}>
                  {kpi.value}
                </div>
                <div className="text-sm font-bold text-heading uppercase tracking-wider relative z-10">
                  {kpi.label}
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </Container>
    </section>
  );
}
