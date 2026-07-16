import { motion } from "framer-motion";
import Container from "@/components/common/Container";
import { fadeUp, staggerContainer, viewportOnce } from "@/lib/animations";

const TECH_CATEGORIES = [
  {
    category: "Frontend",
    items: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Vite", "HTML5/CSS3"],
  },
  {
    category: "Backend",
    items: ["Node.js", "Go (Golang)", "Python (FastAPI)", "NestJS", "Express"],
  },
  {
    category: "Cloud",
    items: ["Amazon Web Services (AWS)", "Google Cloud Platform", "Microsoft Azure", "Vercel", "Netlify"],
  },
  {
    category: "AI & Data Science",
    items: ["OpenAI API", "LangChain", "PyTorch", "Hugging Face", "Pandas & NumPy"],
  },
  {
    category: "Database & Caching",
    items: ["PostgreSQL", "Supabase", "Redis", "MongoDB", "SQLite"],
  },
  {
    category: "Mobile App Development",
    items: ["React Native", "Flutter", "Swift (iOS)", "Kotlin (Android)"],
  },
  {
    category: "DevOps & CI/CD",
    items: ["Docker", "GitHub Actions", "Terraform", "Kubernetes", "PM2"],
  },
  {
    category: "UI Design & Prototyping",
    items: ["Figma", "Framer", "Adobe CC", "Tailwind UI", "Design Tokens"],
  },
];

export default function ServicesTechStack() {
  return (
    <section className="py-24 bg-mist border-t border-line overflow-hidden">
      <Container>
        <motion.div
          variants={staggerContainer(0.08)}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="space-y-16"
        >
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <motion.h2
              variants={fadeUp}
              className="font-display text-xs font-semibold tracking-widest text-primary uppercase"
            >
              Technology Catalog
            </motion.h2>
            <motion.p
              variants={fadeUp}
              className="text-3xl sm:text-4xl md:text-5xl font-display font-semibold tracking-tight text-heading"
            >
              Our Development Stack
            </motion.p>
            <motion.p
              variants={fadeUp}
              className="text-base sm:text-lg text-faint max-w-xl mx-auto"
            >
              We leverage modern, secure, and widely-supported technologies to ensure your systems remain maintainable for years to come.
            </motion.p>
          </div>

          {/* Grid Layout */}
          <motion.div
            variants={staggerContainer(0.04)}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {TECH_CATEGORIES.map((cat, idx) => (
              <motion.div
                key={idx}
                variants={fadeUp}
                className="p-6 rounded-2xl bg-paper border border-line shadow-sm hover:shadow-md hover:border-primary/20 transition-all duration-300 flex flex-col"
              >
                <h3 className="font-display font-semibold text-lg text-heading border-b border-line pb-3 mb-4">
                  {cat.category}
                </h3>
                <div className="flex flex-wrap gap-2 flex-1 items-start content-start">
                  {cat.items.map((item, itemIdx) => (
                    <span
                      key={itemIdx}
                      className="px-2.5 py-1 text-xs font-medium text-faint bg-mist border border-line rounded-lg hover:border-brand/30 hover:bg-sky hover:text-primary transition-colors duration-200"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
}
