import { motion } from "framer-motion";
import { ShieldCheck, HeartHandshake, Layers, Network, LifeBuoy } from "lucide-react";
import Container from "@/components/common/Container";
import { fadeUp, staggerContainer, viewportOnce } from "@/lib/animations";

const TRUST_METRICS = [
  {
    icon: ShieldCheck,
    title: "Projects Delivered",
    statement: "100+ high-performance applications shipped globally, built to scale.",
  },
  {
    icon: HeartHandshake,
    title: "Client Satisfaction",
    statement: "98% client retention rate backed by high-trust engineering partnerships.",
  },
  {
    icon: Layers,
    title: "Industries Served",
    statement: "Proven impact across 10+ verticals from FinTech to regulated EdTech platforms.",
  },
  {
    icon: Network,
    title: "Technology Stack",
    statement: "Cloud-native, secure architecture leveraging React, Next.js, Node, and AWS.",
  },
  {
    icon: LifeBuoy,
    title: "Enterprise Support",
    statement: "Proactive maintenance with reliable SLA agreements and 24/7 monitoring.",
  },
];

export default function ServicesTrust() {
  return (
    <section className="relative py-24 bg-mist overflow-hidden">
      <Container>
        <motion.div
          variants={staggerContainer(0.08)}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="space-y-16"
        >
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <motion.h2
              variants={fadeUp}
              className="font-display text-xs font-semibold tracking-widest text-primary uppercase"
            >
              Trusted Technology Partner
            </motion.h2>
            <motion.p
              variants={fadeUp}
              className="text-3xl sm:text-4xl md:text-5xl font-display font-semibold tracking-tight text-heading"
            >
              Commitment to quality at every scale.
            </motion.p>
            <motion.p
              variants={fadeUp}
              className="text-base sm:text-lg text-faint leading-relaxed"
            >
              We measure our success by the integrity of our codebase, the security of our deployments, and the tangible commercial growth of our clients.
            </motion.p>
          </div>

          {/* Cards Grid */}
          <motion.div
            variants={staggerContainer(0.05)}
            className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6"
          >
            {TRUST_METRICS.map((metric, idx) => {
              const Icon = metric.icon;
              return (
                <motion.div
                  key={idx}
                  variants={fadeUp}
                  className="group relative flex flex-col p-8 rounded-2xl card-light hover:-translate-y-1 hover:border-brand/20 transition-all duration-300"
                >
                  <div className="w-10 h-10 rounded-lg bg-haze flex items-center justify-center text-primary mb-5 group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                    <Icon size={20} />
                  </div>
                  <h3 className="font-display font-semibold text-heading text-base mb-3 group-hover:text-brand transition-colors duration-200">
                    {metric.title}
                  </h3>
                  <p className="text-sm text-faint leading-relaxed flex-1">
                    {metric.statement}
                  </p>
                </motion.div>
              );
            })}
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
}
