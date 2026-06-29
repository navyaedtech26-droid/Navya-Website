import { motion } from "framer-motion";
import Container from "@/components/common/Container";
import SectionHeading from "@/components/common/SectionHeading";
import { techStack } from "@/data/about";
import { viewportOnce } from "@/lib/animations";
import { useReducedMotion } from "@/hooks/useMediaQuery";

export default function TechStack() {
  const reduced = useReducedMotion();
  return (
    <section className="relative py-20">
      <Container>
        <SectionHeading title="Technologies We" highlight="Build With" />

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          transition={{ staggerChildren: 0.06 }}
          className="mt-12 flex flex-wrap justify-center gap-3"
        >
          {techStack.map((tech, i) => (
            <motion.div
              key={tech}
              variants={{
                hidden: { opacity: 0, scale: 0.8, y: 16 },
                visible: { opacity: 1, scale: 1, y: 0 },
              }}
              className="group relative"
            >
              <motion.span
                className="flex items-center gap-2 rounded-2xl glass px-5 py-3 text-sm font-medium text-ink ring-1 ring-white/10 transition-all duration-300 group-hover:text-cyan-accent group-hover:ring-brand/40 group-hover:shadow-glow-sm"
                animate={reduced ? undefined : { y: [0, -6, 0] }}
                transition={{
                  duration: 4 + (i % 4),
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: i * 0.2,
                }}
              >
                <span className="h-2 w-2 rounded-full bg-brand-gradient" />
                {tech}
              </motion.span>
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </section>
  );
}
