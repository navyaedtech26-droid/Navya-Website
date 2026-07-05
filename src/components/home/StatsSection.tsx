import { motion } from "framer-motion";
import Container from "@/components/common/Container";
import CounterUp from "@/components/effects/CounterUp";
import { stats } from "@/data/stats";
import { fadeUp, staggerContainer, viewportOnce } from "@/lib/animations";

export default function StatsSection() {
  return (
    <section className="relative bg-paper py-14 md:py-16">
      <Container>
        <motion.div
          variants={staggerContainer(0.1)}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="grid grid-cols-2 gap-6 rounded-3xl card-light px-6 py-12 sm:px-10 lg:grid-cols-4"
        >
          {stats.map((stat) => (
            <motion.div key={stat.label} variants={fadeUp} className="text-center">
              <div className="font-display text-4xl font-bold text-primary sm:text-5xl">
                <CounterUp to={stat.value} suffix={stat.suffix} />
              </div>
              <p className="mt-2 text-sm text-faint">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </section>
  );
}
