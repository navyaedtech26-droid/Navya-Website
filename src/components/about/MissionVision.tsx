import { motion } from "framer-motion";
import { Target, Telescope } from "lucide-react";
import Container from "@/components/common/Container";
import IconBadge from "@/components/common/IconBadge";
import { fadeUp, staggerContainer, viewportOnce } from "@/lib/animations";

const panels = [
  {
    icon: Target,
    label: "Mission",
    text: "We help businesses grow through digital innovation.",
    glow: "from-primary/10",
  },
  {
    icon: Telescope,
    label: "Vision",
    text: "To be the most trusted digital partner for modern businesses.",
    glow: "from-secondary/10",
  },
];

export default function MissionVision() {
  return (
    <section className="relative bg-mist py-16">
      <Container>
        <motion.div
          variants={staggerContainer(0.15)}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="grid gap-6 md:grid-cols-2"
        >
          {panels.map((panel) => (
            <motion.div
              key={panel.label}
              variants={fadeUp}
              className={`group relative overflow-hidden rounded-3xl card-light p-10 transition-all duration-300 hover:shadow-card-hover`}
            >
              <div
                className={`absolute -right-16 -top-16 h-48 w-48 rounded-full bg-gradient-to-br ${panel.glow} to-transparent blur-2xl`}
              />
              <div className="relative">
                <IconBadge icon={panel.icon} size="lg" color={panel.label === "Vision" ? "#6366F1" : "#2563EB"} />
                <p className="mt-6 font-display text-xs font-bold uppercase tracking-[0.25em] text-primary">
                  {panel.label}
                </p>
                <p className="mt-3 font-display text-2xl font-semibold leading-snug text-heading sm:text-3xl">
                  {panel.text}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </section>
  );
}
