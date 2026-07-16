import { motion } from "framer-motion";
import { Target, Telescope, Compass } from "lucide-react";
import Container from "@/components/common/Container";
import IconBadge from "@/components/common/IconBadge";
import SectionHeading from "@/components/common/SectionHeading";
import { fadeUp, staggerContainer, viewportOnce } from "@/lib/animations";

const panels = [
  {
    icon: Target,
    label: "Mission",
    text: "To turn digital investment into measurable, scalable business growth.",
    glow: "from-brand/20",
    borderGlow: "group-hover:border-brand/40",
  },
  {
    icon: Telescope,
    label: "Vision",
    text: "To be the most trusted technical partner for ambitious global enterprises.",
    glow: "from-primary/20",
    borderGlow: "group-hover:border-primary/40",
  },
  {
    icon: Compass,
    label: "Core Values",
    text: "Driven by absolute quality, enduring trust, and unrelenting innovation.",
    glow: "from-secondary/20",
    borderGlow: "group-hover:border-secondary/40",
  },
];

export default function MissionVision() {
  return (
    <section className="relative py-24 md:py-32 bg-mist overflow-hidden">
      {/* Subtle Background Elements */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-[0.03] [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_80%)]" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, black 1px, transparent 0)', backgroundSize: '40px 40px' }} />

      <Container className="relative z-10">
        <SectionHeading
          align="center"
          title="Our Guiding"
          highlight="Principles"
          subtitle="The foundation of every partnership, every strategy, and every line of code we write."
        />
        
        <motion.div
          variants={staggerContainer(0.15)}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="mt-20 grid gap-8 md:grid-cols-3"
        >
          {panels.map((panel) => (
            <motion.div
              key={panel.label}
              variants={fadeUp}
              className={`group relative overflow-hidden rounded-[2rem] bg-white border border-line/40 p-10 transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.1)] ${panel.borderGlow}`}
            >
              {/* Premium Gradient Glow */}
              <div
                className={`absolute -right-20 -top-20 h-56 w-56 rounded-full bg-gradient-to-br ${panel.glow} to-transparent blur-[50px] transition-opacity duration-500 opacity-50 group-hover:opacity-100`}
              />
              
              <div className="relative z-10">
                <IconBadge icon={panel.icon} size="lg" className="bg-paper shadow-sm transition-transform duration-500 group-hover:scale-110" />
                <p className="mt-8 font-display text-sm font-bold uppercase tracking-[0.2em] text-primary">
                  {panel.label}
                </p>
                <p className="mt-4 font-display text-xl font-semibold leading-relaxed text-heading sm:text-2xl">
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
