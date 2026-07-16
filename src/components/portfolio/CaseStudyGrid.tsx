import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Container from "@/components/common/Container";
import CaseStudyCard from "./CaseStudyCard";
import { getPublishedCaseStudies, type CaseStudy } from "@/services/caseStudies";

const FILTERS = [
  "All",
  "Web Development",
  "Mobile Apps",
  "AI Solutions",
  "Cloud",
  "ERP",
  "CRM",
  "UI/UX",
  "Digital Transformation",
  "SaaS",
  "Healthcare",
  "Education",
  "Finance",
  "Retail",
  "Manufacturing",
];

export default function CaseStudyGrid() {
  const [activeFilter, setActiveFilter] = useState("All");
  const [caseStudies, setCaseStudies] = useState<CaseStudy[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const data = await getPublishedCaseStudies(50);
      setCaseStudies(data);
      setLoading(false);
    }
    load();
  }, []);

  // A robust text-matching approach to filtering, since the case study data 
  // might not have explicit tags for every single one of these enterprise filters.
  const filteredStudies = caseStudies.filter((study) => {
    if (activeFilter === "All") return true;

    const searchString = `
      ${study.category} 
      ${study.industry} 
      ${study.tags.join(" ")} 
      ${study.summary} 
      ${study.challenge} 
      ${study.solution_short}
    `.toLowerCase();

    const term = activeFilter.toLowerCase();

    // Some specific mapping aliases for broad terms
    if (term === "web development" && (searchString.includes("website") || searchString.includes("react") || searchString.includes("next.js"))) return true;
    if (term === "cloud" && (searchString.includes("aws") || searchString.includes("azure") || searchString.includes("cloud"))) return true;

    return searchString.includes(term);
  });

  return (
    <section id="case-studies-grid" className="py-24 lg:py-32 bg-mist overflow-hidden">
      <Container>
        <div className="text-center max-w-3xl mx-auto mb-12 lg:mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 rounded-full border border-brand/20 bg-brand/5 px-4 py-2 text-sm font-semibold text-brand mb-6 shadow-sm backdrop-blur-md"
          >
            Proven Results
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-display text-4xl sm:text-5xl font-extrabold text-heading tracking-tight mb-6"
          >
            Featured Case Studies
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-lg text-faint leading-relaxed"
          >
            Discover how we've helped global enterprises and disruptive startups overcome complex technical challenges and achieve measurable business impact.
          </motion.p>
        </div>

        {/* Filter Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="mb-16 lg:mb-24 flex flex-wrap justify-center gap-3 max-w-5xl mx-auto"
        >
          {FILTERS.map((filter) => {
            const isActive = activeFilter === filter;
            return (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`relative px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 ease-out overflow-hidden shadow-sm ${isActive
                    ? "text-white shadow-primary-sm"
                    : "bg-white text-faint border border-line hover:border-brand/50 hover:text-heading"
                  }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeFilterBg"
                    className="absolute inset-0 bg-primary"
                    initial={false}
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{filter}</span>
              </button>
            );
          })}
        </motion.div>

        {/* Case Studies Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10 relative min-h-[500px]">
          {loading ? (
            <div className="col-span-full flex justify-center py-20 text-faint">
              <span className="animate-pulse">Loading case studies...</span>
            </div>
          ) : (
            <AnimatePresence mode="popLayout">
              {filteredStudies.length > 0 ? (
                filteredStudies.map((study, idx) => (
                  <motion.div
                    key={study.id || study.client}
                    layout
                    initial={{ opacity: 0, scale: 0.95, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: 20 }}
                    transition={{
                      duration: 0.5,
                      type: "spring",
                      stiffness: 300,
                      damping: 30
                    }}
                  >
                    <CaseStudyCard study={study as any} index={idx} />
                  </motion.div>
                ))
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="col-span-full w-full flex flex-col items-center justify-center py-20 text-center bg-white rounded-3xl border border-line border-dashed"
                >
                  <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center mb-4 border border-line">
                    <span className="text-2xl">🔍</span>
                  </div>
                  <h3 className="text-xl font-bold text-heading mb-2">No Case Studies Found</h3>
                  <p className="text-faint max-w-md">
                    We're currently documenting our work in the <strong>{activeFilter}</strong> sector. Check back soon or contact us to see relevant examples.
                  </p>
                  <button
                    onClick={() => setActiveFilter("All")}
                    className="mt-6 font-semibold text-brand hover:text-brand-light transition-colors"
                  >
                    Clear filters
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          )}
        </div>
      </Container>
    </section>
  );
}
