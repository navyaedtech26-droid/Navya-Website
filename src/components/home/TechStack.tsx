import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Container from "@/components/common/Container";
import SectionHeading from "@/components/common/SectionHeading";
import { techGroups } from "@/data/techStack";
import { cn } from "@/lib/utils";
import { fadeUp, viewportOnce } from "@/lib/animations";

export default function TechStack() {
  const [activeCategory, setActiveCategory] = useState<string>("All");

  const categories = ["All", ...techGroups.map((group) => group.label)];
  
  // Flat list of technologies, optionally filtered
  const filteredTechs = activeCategory === "All"
    ? techGroups.flatMap((group) => group.items)
    : techGroups.find((group) => group.label === activeCategory)?.items || [];

  return (
    <section className="relative overflow-hidden bg-[#F4F7F5] py-[120px]">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 left-1/4 h-96 w-96 -translate-y-1/2 translate-x-1/2 rounded-full bg-[#404E3B]/5 blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 h-[500px] w-[500px] translate-y-1/4 translate-x-1/4 rounded-full bg-brand/5 blur-[120px] pointer-events-none" />

      <Container className="relative z-10">
        <SectionHeading
          tone="light"
          eyebrow="The Arsenal"
          title="Technologies We"
          highlight="Build With"
          subtitle="A modern, battle-tested stack across languages, frameworks, databases, and cloud, chosen to fit each project, not the other way around."
        />

        {/* Filter Bar */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="mt-12 flex flex-wrap justify-center gap-3"
        >
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={cn(
                "rounded-full px-6 py-2.5 text-sm font-semibold transition-all duration-300",
                activeCategory === category
                  ? "bg-brand text-white shadow-primary-sm"
                  : "bg-white text-faint hover:bg-brand/10 hover:text-brand ring-1 ring-line/50"
              )}
            >
              {category}
            </button>
          ))}
        </motion.div>

        {/* Animated Grid */}
        <motion.div 
          layout
          className="mt-16 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6"
        >
          <AnimatePresence mode="popLayout">
            {filteredTechs.map((tech) => (
              <motion.div
                key={tech.name}
                layout
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="group/card relative flex aspect-square cursor-default flex-col items-center justify-center gap-4 rounded-[20px] bg-white border border-line/60 p-4 shadow-card transition-all duration-300 hover:-translate-y-1 hover:border-brand/40 hover:shadow-card-hover"
              >
                {/* original brand logo with a soft colored halo on hover */}
                <span className="relative flex h-14 w-14 shrink-0 items-center justify-center">
                  <span
                    className="absolute inset-0 rounded-full opacity-0 blur-[14px] transition-opacity duration-300 group-hover/card:opacity-70"
                    style={{ backgroundColor: tech.color }}
                  />
                  <img
                    src={tech.logo}
                    alt={`${tech.name} logo`}
                    loading="lazy"
                    className="relative h-[48px] w-[48px] object-contain transition-transform duration-300 group-hover/card:scale-110"
                    style={tech.invert ? { filter: "brightness(0)" } : undefined}
                  />
                </span>
                <span className="text-[0.9375rem] font-semibold leading-tight text-heading">
                  {tech.name}
                </span>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </Container>
    </section>
  );
}
