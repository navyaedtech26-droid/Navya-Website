import { motion } from "framer-motion";
import { Lightbulb, Zap } from "lucide-react";
import Container from "@/components/common/Container";
import type { CaseStudy } from "@/services/caseStudies";

export default function CaseStudySolution({ study }: { study: CaseStudy }) {
  const solution = study.content?.solution;
  const hasApproach = Boolean(solution?.approach);
  const hasFeatures = Boolean(solution?.features?.length);
  if (!hasApproach && !hasFeatures) return null;

  const cards = [
    hasApproach && {
      title: "Our Approach",
      icon: Lightbulb,
      content: <p className="whitespace-pre-line">{solution!.approach}</p>,
      color: "text-amber-500",
      bg: "bg-amber-500/10",
      border: "hover:border-amber-500/30"
    },
    hasFeatures && {
      title: "Key Features",
      icon: Zap,
      content: (
        <ul className="space-y-2 list-disc list-inside">
          {solution!.features.map((f, i) => <li key={i}>{f}</li>)}
        </ul>
      ),
      color: "text-emerald-500",
      bg: "bg-emerald-500/10",
      border: "hover:border-emerald-500/30"
    }
  ].filter(Boolean) as { title: string; icon: typeof Lightbulb; content: JSX.Element; color: string; bg: string; border: string }[];

  return (
    <section className="py-20 lg:py-32 bg-mist relative overflow-hidden border-y border-line/50">
      <Container>
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/5 px-4 py-2 text-sm font-semibold text-emerald-600 mb-6 shadow-sm backdrop-blur-md">
              The Solution
            </div>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-heading tracking-tight">
              Engineering the Future
            </h2>
          </motion.div>
        </div>

        <div className={`grid grid-cols-1 gap-8 ${cards.length > 1 ? "md:grid-cols-2" : "max-w-2xl mx-auto"}`}>
          {cards.map((card, idx) => {
            const Icon = card.icon;
            return (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className={`group p-8 rounded-3xl bg-white border border-line shadow-sm hover:shadow-md transition-all duration-300 ${card.border}`}
              >
                <div className={`w-14 h-14 rounded-2xl ${card.bg} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <Icon className={`w-7 h-7 ${card.color}`} />
                </div>
                <h3 className="font-display text-2xl font-bold text-heading mb-4">
                  {card.title}
                </h3>
                <div className="text-faint leading-relaxed">
                  {card.content}
                </div>
              </motion.div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
