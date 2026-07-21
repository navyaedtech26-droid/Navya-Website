import { motion } from "framer-motion";
import { TrendingUp } from "lucide-react";
import Container from "@/components/common/Container";
import type { CaseStudy } from "@/services/caseStudies";
import { getAccentClasses } from "@/lib/caseStudyAccent";

export default function CaseStudyResults({ study }: { study: CaseStudy }) {
  const results = study.content?.results;
  const hasSummary = Boolean(results?.businessImpact || results?.outcomes?.length);
  const hasKpis = Boolean(results?.kpis?.length);
  if (!hasSummary && !hasKpis) return null;
  const accent = getAccentClasses(study.accent);

  return (
    <section className="py-20 lg:py-32 bg-white relative overflow-hidden">
      <Container>
        <div className={`grid grid-cols-1 gap-16 lg:gap-24 items-center ${hasSummary && hasKpis ? "lg:grid-cols-2" : ""}`}>

          {hasSummary && (
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
            
            {results?.businessImpact && (
              <p className="text-lg text-faint leading-relaxed mb-10">
                {results.businessImpact}
              </p>
            )}

            {!!results?.outcomes?.length && (
              <div>
                <h4 className="flex items-center gap-2 font-bold text-heading mb-4 text-lg">
                  <TrendingUp className="w-5 h-5 text-blue-500" />
                  Key Outcomes
                </h4>
                <ul className="space-y-3 text-faint">
                  {results.outcomes.map((outcome, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-2 shrink-0" />
                      <span>{outcome}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </motion.div>
          )}

          {/* KPI Grid */}
          {hasKpis && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {results!.kpis.map((kpi, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className={`p-8 rounded-3xl border border-line flex flex-col items-center justify-center text-center shadow-sm relative overflow-hidden ${accent.bg5}`}
              >
                <div className={`absolute -right-10 -top-10 w-32 h-32 ${accent.bg10} rounded-full blur-2xl`} />
                <div className={`font-display text-5xl font-extrabold ${accent.text} mb-2 relative z-10`}>
                  {kpi.value}
                </div>
                <div className="text-sm font-bold text-heading uppercase tracking-wider relative z-10">
                  {kpi.label}
                </div>
              </motion.div>
            ))}
          </div>
          )}

        </div>
      </Container>
    </section>
  );
}
