import { motion } from "framer-motion";
import Container from "@/components/common/Container";
import SectionHeading from "@/components/common/SectionHeading";
import { milestones } from "@/data/milestones";
import { fadeUp, staggerContainer, viewportOnce, easeEntrance } from "@/lib/animations";

export default function Milestones() {
  return (
    <section className="relative py-16 md:py-20">
      <Container>
        <SectionHeading
          eyebrow="Our Journey"
          title="The Road"
          highlight="So Far"
          subtitle="From a single conviction to a full-stack transformation partner. Here's how we've grown — and helped our clients grow."
        />

        <div className="relative mx-auto mt-16 max-w-3xl">
          {/* Vertical line that draws in on scroll */}
          <div className="absolute bottom-0 left-[19px] top-2 w-px bg-line sm:left-1/2 sm:-translate-x-1/2">
            <motion.div
              className="absolute inset-x-0 top-0 w-full bg-gradient-to-b from-primary via-primary-light to-secondary"
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
                  className={`absolute left-[12px] top-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-primary shadow-primary-sm ring-4 ring-paper sm:left-auto ${
                    i % 2 === 0 ? "sm:-right-2" : "sm:-left-2"
                  }`}
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-white" />
                </span>

                <div className="rounded-2xl card-light p-6 transition-all duration-300 hover:shadow-card-hover">
                  <span className="font-display text-sm font-bold tracking-widest text-primary">
                    {m.year}
                  </span>
                  <h3 className="mt-1 font-display text-lg font-semibold text-heading">{m.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-faint">{m.description}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
