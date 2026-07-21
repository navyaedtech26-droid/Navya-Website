import { motion } from "framer-motion";
import { CheckCircle2, AlertTriangle } from "lucide-react";
import Container from "@/components/common/Container";
import type { CaseStudy } from "@/services/caseStudies";
import { getAccentClasses } from "@/lib/caseStudyAccent";

export default function CaseStudyContext({ study }: { study: CaseStudy }) {
  const overview = study.content?.overview;
  const challenges = study.content?.challenges;
  const hasOverview = Boolean(overview?.company || overview?.background || overview?.goals?.length);
  const hasChallenges = Boolean(challenges?.description || challenges?.points?.length);
  if (!hasOverview && !hasChallenges) return null;
  const accent = getAccentClasses(study.accent);

  return (
    <section className="py-20 lg:py-32 bg-white relative overflow-hidden">
      <Container>
        <div className={`grid grid-cols-1 gap-16 lg:gap-24 ${hasOverview && hasChallenges ? "lg:grid-cols-2" : ""}`}>

          {/* Client Overview */}
          {hasOverview && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center gap-2 rounded-full border border-brand/20 bg-brand/5 px-4 py-2 text-sm font-semibold text-brand mb-6 shadow-sm backdrop-blur-md">
                Client Overview
              </div>

              <h2 className="font-display text-3xl sm:text-4xl font-bold text-heading mb-6 tracking-tight">
                About {study.client}
              </h2>

              <p className="text-lg text-faint leading-relaxed mb-8">
                {overview?.company} {overview?.background}
              </p>

              {!!overview?.goals?.length && (
                <div className="bg-paper border border-line rounded-3xl p-8 shadow-sm">
                  <h3 className="text-sm font-bold text-heading uppercase tracking-wider mb-6">Primary Objectives</h3>
                  <ul className="space-y-4">
                    {overview.goals.map((goal, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <CheckCircle2 className={`w-6 h-6 ${accent.text} shrink-0`} />
                        <span className="text-faint leading-relaxed">{goal}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </motion.div>
          )}

          {/* Challenges */}
          {hasChallenges && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="inline-flex items-center gap-2 rounded-full border border-rose-500/20 bg-rose-500/5 px-4 py-2 text-sm font-semibold text-rose-500 mb-6 shadow-sm backdrop-blur-md">
                The Problem
              </div>

              <h2 className="font-display text-3xl sm:text-4xl font-bold text-heading mb-6 tracking-tight">
                Business Challenges
              </h2>

              <p className="text-lg text-faint leading-relaxed mb-8">
                {challenges?.description}
              </p>

              {!!challenges?.points?.length && (
                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-xl bg-orange-500/10 flex items-center justify-center shrink-0">
                    <AlertTriangle className="w-6 h-6 text-orange-500" />
                  </div>
                  <div>
                    <h4 className="font-bold text-heading mb-2">Key Challenges</h4>
                    <ul className="space-y-2 list-disc list-inside text-faint">
                      {challenges.points.map((point, idx) => (
                        <li key={idx}>{point}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
            </motion.div>
          )}

        </div>
      </Container>
    </section>
  );
}
