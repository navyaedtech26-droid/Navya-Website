import { motion } from "framer-motion";
import Container from "@/components/common/Container";
import SectionHeading from "@/components/common/SectionHeading";
import { milestones } from "@/data/milestones";
import { fadeUp, staggerContainer, viewportOnce, easeEntrance } from "@/lib/animations";

export default function Milestones() {
  return (
    <section className="relative py-24 md:py-32 bg-paper border-t border-line/50">
      <Container>
        <SectionHeading
          align="center"
          title="The Road"
          highlight="So Far"
          subtitle="From a single conviction to a full-stack transformation partner. Here's how we've grown — and helped our clients grow along the way."
        />

        <div className="relative mx-auto mt-24 max-w-4xl">
          {/* Vertical line that draws in on scroll */}
          <div className="absolute bottom-0 left-[27px] top-4 w-[2px] bg-line/60 md:left-1/2 md:-translate-x-1/2">
            <motion.div
              className="absolute inset-x-0 top-0 w-full bg-gradient-to-b from-primary via-primary to-brand"
              initial={{ height: "0%" }}
              whileInView={{ height: "100%" }}
              viewport={{ once: true, margin: "-120px" }}
              transition={{ duration: 2, ease: easeEntrance }}
            />
          </div>

          <motion.div
            variants={staggerContainer(0.15)}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            className="flex flex-col gap-12"
          >
            {milestones.map((m, i) => (
              <motion.div
                key={m.year}
                variants={fadeUp}
                className={`relative flex items-start gap-8 pl-20 md:w-1/2 md:pl-0 ${
                  i % 2 === 0
                    ? "md:ml-0 md:pr-16 md:text-right"
                    : "md:ml-auto md:flex-row-reverse md:pl-16 md:text-left"
                }`}
              >
                {/* Node */}
                <span
                  className={`absolute left-[18px] top-6 flex h-5 w-5 items-center justify-center rounded-full bg-primary shadow-[0_0_15px_rgba(30,107,255,0.4)] ring-4 ring-paper md:left-auto ${
                    i % 2 === 0 ? "md:-right-[10px]" : "md:-left-[10px]"
                  }`}
                >
                  <span className="h-2 w-2 rounded-full bg-white" />
                </span>

                <div className="w-full rounded-3xl bg-white border border-line/40 p-8 shadow-[0_10px_40px_-15px_rgba(0,0,0,0.05)] transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
                  <span className="font-display text-sm font-bold tracking-[0.2em] text-primary uppercase">
                    {m.year}
                  </span>
                  <h3 className="mt-3 font-display text-2xl font-bold text-heading">{m.title}</h3>
                  <p className="mt-3 text-base leading-relaxed text-faint">{m.description}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
