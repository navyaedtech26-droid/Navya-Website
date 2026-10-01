import { motion } from "framer-motion";
import { Target, Telescope, Rocket } from "lucide-react";
import Container from "@/components/common/Container";
import SectionHeading from "@/components/common/SectionHeading";
import { fadeUp, staggerContainer, viewportOnce } from "@/lib/animations";

const panels = [
  {
    icon: Target,
    label: "Mission",
    text: "To design and deliver reliable, innovative, and scalable technology solutions that help businesses and institutions operate more efficiently — and to provide practical, industry-relevant tech education that bridges academic learning and real-world professional skills.",
  },
  {
    icon: Telescope,
    label: "Vision",
    text: "To be one of Nepal's leading and most trusted providers of innovative technology solutions that accelerate digital transformation, and a recognized center for practical tech education that produces industry-ready professionals for Nepal's growing digital economy.",
  },
  {
    icon: Rocket,
    label: "Objectives",
    text: "To empower businesses through innovative digital solutions, including web applications, mobile applications, business systems, and digital marketing services. We aim to improve business efficiency, promote digital transformation, and provide practical IT education that develops skilled professionals. Through quality, innovation, and long-term partnerships, we strive to become a trusted technology partner in Nepal and beyond.",
  },
];

export default function MissionVision() {
  return (
    <section className="relative py-24 md:py-32 bg-mist overflow-hidden">
      <Container>
        <SectionHeading
          align="center"
          title="Our Guiding"
          highlight="Principles"
          subtitle="The foundation of every partnership, every strategy, and every line of code we write."
        />

        <motion.div
          variants={staggerContainer(0.08)}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="mt-20 flex flex-col"
        >
          {panels.map((panel, index) => {
            const Icon = panel.icon;
            return (
              <motion.div
                key={panel.label}
                variants={fadeUp}
                className="group relative border-t border-line last:border-b"
              >
                <div className="flex flex-col gap-8 py-10 transition-colors duration-500 hover:bg-white/40 md:flex-row md:items-center md:gap-16 px-4 md:px-8 -mx-4 md:-mx-8 rounded-2xl md:rounded-none">
                  {/* Number */}
                  <div className="font-display text-2xl font-bold text-brand pt-1 md:pt-0 w-12 shrink-0 md:group-hover:text-cyan-accent transition-colors duration-500">
                    {String(index + 1).padStart(2, "0")}
                  </div>

                  {/* Content */}
                  <div className="flex-1 space-y-4">
                    <h3 className="font-display text-2xl font-bold text-heading transition-colors duration-300 group-hover:text-brand">
                      {panel.label}
                    </h3>
                    <p className="mt-3 text-base leading-relaxed text-faint max-w-2xl">
                      {panel.text}
                    </p>
                  </div>

                  {/* Icon Visual */}
                  <div className="w-full md:w-[320px] lg:w-[400px] shrink-0">
                    <div className="relative aspect-[16/9] w-full overflow-hidden rounded-2xl bg-gradient-to-br from-white to-sky/20 p-6 flex items-center justify-center transition-all duration-500 group-hover:shadow-card-hover group-hover:from-white group-hover:to-sky/40">
                      <Icon
                        size={64}
                        strokeWidth={1.5}
                        className="text-brand transition-transform duration-700 ease-out group-hover:scale-105"
                      />
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </Container>
    </section>
  );
}
