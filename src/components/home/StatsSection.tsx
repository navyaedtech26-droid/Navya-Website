import { motion } from "framer-motion";
import Container from "@/components/common/Container";
import CounterUp from "@/components/effects/CounterUp";
import FloatingOrbs from "@/components/effects/FloatingOrbs";
import { stats } from "@/data/stats";
import { fadeUp, staggerContainer, viewportOnce } from "@/lib/animations";

export default function StatsSection() {
  return (
    <section className="relative py-20">
      <Container>
        <div className="relative overflow-hidden rounded-3xl glass px-6 py-14 ring-1 ring-white/10">
          <FloatingOrbs count={5} />
          <div className="absolute inset-0 bg-gradient-to-r from-brand/10 via-transparent to-cyan-accent/10" />

          <motion.div
            variants={staggerContainer(0.12)}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            className="relative grid grid-cols-2 gap-8 lg:grid-cols-4"
          >
            {stats.map((stat) => (
              <motion.div key={stat.label} variants={fadeUp} className="text-center">
                <div className="font-display text-4xl font-bold text-ink sm:text-5xl">
                  <CounterUp to={stat.value} suffix={stat.suffix} />
                </div>
                <p className="mt-2 text-sm text-ink-muted">{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
