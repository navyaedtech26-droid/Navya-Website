import { Search, X } from "lucide-react";
import { motion } from "framer-motion";
import Container from "@/components/common/Container";
import { fadeUp, staggerContainer } from "@/lib/animations";
import { cn } from "@/lib/utils";

const HERO_TITLE = "Insights & Engineering";
const HERO_SUBTITLE = "Our perspectives on software architecture, technology trends, and building resilient systems.";

interface BlogHeroProps {
  query: string;
  onQueryChange: (value: string) => void;
  categories: string[];
  category: string;
  onCategoryChange: (value: string) => void;
}

/**
 * Editorial masthead — bright, clean, with stark typography.
 * Acts as the sophisticated header for an enterprise publication.
 */
export default function BlogHero({
  query,
  onQueryChange,
  categories,
  category,
  onCategoryChange,
}: BlogHeroProps) {
  return (
    <section className="relative overflow-hidden bg-paper pt-28 sm:pt-36 border-b border-line pb-12 lg:pb-0">
      {/* Very faint blueprint grid in the background to add a subtle technical texture */}
      <div aria-hidden className="absolute inset-0 light-grid opacity-60" />
      
      <Container className="relative">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-8 xl:gap-16 items-center">
          <motion.div
            variants={staggerContainer(0.1)}
            initial="hidden"
            animate="visible"
            className="flex flex-col justify-between py-4 lg:py-16 xl:py-24"
          >
            <div>
              <motion.p 
                variants={fadeUp} 
                className="text-sm font-semibold uppercase tracking-widest text-brand mb-4"
              >
                Navya Publications
              </motion.p>
              <motion.h1
                variants={fadeUp}
                className="font-display text-4xl font-semibold tracking-tight text-heading sm:text-5xl lg:text-6xl"
              >
                {HERO_TITLE}
              </motion.h1>
              <motion.p variants={fadeUp} className="mt-6 text-lg text-faint max-w-xl leading-relaxed">
                {HERO_SUBTITLE}
              </motion.p>
            </div>

            <motion.div variants={fadeUp} className="mt-12 flex flex-col gap-10">
              {/* Search */}
              <div className="relative w-full max-w-md shrink-0">
                <Search
                  size={16}
                  className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-faint"
                />
                <input
                  type="search"
                  value={query}
                  onChange={(e) => onQueryChange(e.target.value)}
                  placeholder="Search articles…"
                  aria-label="Search articles"
                  className="w-full rounded-none border border-line bg-white/50 backdrop-blur py-3.5 pl-11 pr-10 text-sm text-heading placeholder:text-faint outline-none transition-colors duration-200 focus:border-brand focus:bg-white focus:ring-1 focus:ring-brand"
                />
                {query && (
                  <button
                    type="button"
                    onClick={() => onQueryChange("")}
                    aria-label="Clear search"
                    className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-faint transition-colors hover:text-heading"
                  >
                    <X size={15} />
                  </button>
                )}
              </div>

              {/* Categories Filter (Premium Chips) */}
              {categories.length > 1 && (
                <div className="flex overflow-x-auto no-scrollbar pb-4 -mb-4">
                  <div className="flex gap-3">
                    {categories.map((cat) => (
                      <button
                        key={cat}
                        onClick={() => onCategoryChange(cat)}
                        className={cn(
                          "relative px-4 py-2 text-[11px] font-bold uppercase tracking-widest whitespace-nowrap transition-all duration-300 rounded-full border",
                          cat === category
                            ? "bg-brand text-white border-brand shadow-md shadow-brand/20 scale-105"
                            : "bg-paper text-faint border-line hover:border-brand hover:text-brand"
                        )}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          </motion.div>

          {/* Visual Showcase inside Hero */}
          <div className="relative h-[300px] sm:h-[400px] lg:h-[500px] w-full mt-10 lg:mt-0">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
              className="absolute inset-0 flex items-center justify-center"
            >
              {/* Soft ambient glow */}
              <div className="absolute h-[70%] w-[70%] rounded-full bg-brand/10 blur-[90px]" />
              <img
                src="/vectors1/insights.avif"
                alt="Navya Publications Insights"
                loading="eager"
                className="relative z-10 h-full w-full object-contain drop-shadow-2xl"
              />
            </motion.div>
          </div>
        </div>
      </Container>
    </section>
  );
}
