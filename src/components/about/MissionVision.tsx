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
    glow: "from-brand/20",
  },
  {
    icon: Telescope,
    label: "Vision",
    text: "To be the most trusted digital partner for modern businesses.",
    glow: "from-cyan-accent/20",
  },
];

export default function MissionVision() {
  return (
    <section className="relative py-16">
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
              className={`group relative overflow-hidden rounded-3xl glass p-10 ring-1 ring-white/10 transition-all duration-300 hover:shadow-glow`}
            >
              <div
                className={`absolute -right-16 -top-16 h-48 w-48 rounded-full bg-gradient-to-br ${panel.glow} to-transparent blur-2xl`}
              />
              <div className="relative">
                <IconBadge icon={panel.icon} size="lg" />
                <p className="mt-6 font-display text-xs font-bold uppercase tracking-[0.25em] text-cyan-accent">
                  {panel.label}
                </p>
                <p className="mt-3 font-display text-2xl font-semibold leading-snug text-ink sm:text-3xl">
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
