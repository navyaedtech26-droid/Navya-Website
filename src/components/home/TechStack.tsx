import { motion } from "framer-motion";
import Container from "@/components/common/Container";
import SectionHeading from "@/components/common/SectionHeading";
import { techGroups } from "@/data/techStack";
import { fadeUpSmall, staggerContainer, viewportOnce } from "@/lib/animations";

// One flat list — the categories organise the data, but the grid reads as a
// single, uniform wall of tools rather than labelled rows.
const techs = techGroups.flatMap((group) => group.items);

export default function TechStack() {
  return (
    <section className="relative py-24">
      {/* soft ambient glow to echo the hero */}
      <div
        className="pointer-events-none absolute inset-x-0 top-1/4 -z-10 mx-auto h-[420px] max-w-4xl rounded-full opacity-60 blur-3xl"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(30,107,255,0.12), transparent 70%)",
        }}
      />

      <Container>
        <SectionHeading
          eyebrow="Our Toolkit"
          title="Technologies We"
          highlight="Build With"
          subtitle="A modern, battle-tested stack across languages, frameworks, databases, and cloud — chosen to fit each project, not the other way around."
        />

        <motion.div
          variants={staggerContainer(0.03)}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="mt-14 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-7"
        >
          {techs.map((tech) => (
            <motion.div
              key={tech.name}
              variants={fadeUpSmall}
              className="group flex cursor-default flex-col items-center justify-center gap-2.5 rounded-2xl border border-white/10 bg-bg-900/60 px-3 py-5 text-center backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-brand/50 hover:bg-bg-900/90 hover:shadow-glow-sm"
            >
              {/* original brand logo with a soft colored halo on hover */}
              <span className="relative flex h-8 w-8 shrink-0 items-center justify-center">
                <span
                  className="absolute inset-0 rounded-full opacity-0 blur-[10px] transition-opacity duration-300 group-hover:opacity-70"
                  style={{ backgroundColor: tech.color }}
                />
                <img
                  src={tech.logo}
                  alt={`${tech.name} logo`}
                  loading="lazy"
                  width={30}
                  height={30}
                  className="relative h-[30px] w-[30px] object-contain transition-transform duration-300 group-hover:scale-110"
                  style={tech.invert ? { filter: "brightness(0) invert(1)" } : undefined}
                />
              </span>
              <span className="text-[13px] font-medium leading-tight text-ink">
                {tech.name}
              </span>
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </section>
  );
}
