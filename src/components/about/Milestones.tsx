import { motion } from "framer-motion";
import Container from "@/components/common/Container";
import SectionHeading from "@/components/common/SectionHeading";
import { milestones } from "@/data/milestones";
import { fadeUp, staggerContainer, viewportOnce, easeEntrance } from "@/lib/animations";

export default function Milestones() {
  return (
    <section className="relative py-24">
      <Container>
        <SectionHeading
          eyebrow="Our Journey"
          title="The Road"
          highlight="So Far"
          subtitle="From a single belief to a full-stack growth partner. Here's how Navya EdTech has grown."
        />

        <div className="relative mx-auto mt-16 max-w-3xl">
          {/* Vertical line that draws in on scroll */}
          <div className="absolute bottom-0 left-[19px] top-2 w-px bg-white/10 sm:left-1/2 sm:-translate-x-1/2">
            <motion.div
              className="absolute inset-x-0 top-0 w-full bg-gradient-to-b from-brand via-brand-light to-cyan-accent"
              initial={{ height: "0%" }}
              whileInView={{ height: "100%" }}
              viewport={{ once: true, margin: "-120px" }}
              transition={{ duration: 1.8, ease: easeEntrance }}
            />
          </div>

          <motion.div
            variants={staggerContainer(0.15)}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            className="flex flex-col gap-10"
          >
            {milestones.map((m, i) => (
              <motion.div
                key={m.year}
                variants={fadeUp}
                className={`relative flex items-start gap-6 pl-14 sm:w-1/2 sm:pl-0 ${
                  i % 2 === 0
                    ? "sm:ml-0 sm:pr-12 sm:text-right"
                    : "sm:ml-auto sm:flex-row-reverse sm:pl-12 sm:text-left"
                }`}
              >
                {/* Node */}
                <span
                  className={`absolute left-[12px] top-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-brand shadow-glow-sm ring-4 ring-bg sm:left-auto ${
                    i % 2 === 0 ? "sm:-right-2" : "sm:-left-2"
                  }`}
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-white" />
                </span>

                <div className="rounded-2xl glass p-6 ring-1 ring-white/10 transition-all duration-300 hover:shadow-glow-sm">
                  <span className="font-display text-sm font-bold tracking-widest text-cyan-accent">
                    {m.year}
                  </span>
                  <h3 className="mt-1 font-display text-lg font-semibold text-ink">{m.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink-muted">{m.description}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
