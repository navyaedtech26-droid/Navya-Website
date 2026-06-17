import { motion } from "framer-motion";
import Container from "@/components/common/Container";
import SectionHeading from "@/components/common/SectionHeading";
import IconBadge from "@/components/common/IconBadge";
import { processSteps } from "@/data/process";
import { fadeUp, staggerContainer, viewportOnce, easeEntrance } from "@/lib/animations";

export default function ProcessSection() {
  return (
    <section className="relative py-24">
      <Container>
        <SectionHeading
          eyebrow="Our Approach"
          title="How We Transform"
          highlight="Your Business"
          subtitle="We study your business, market, competitors, and growth possibilities before suggesting the right digital solution."
        />

        <div className="relative mt-16">
          {/* Desktop connector line that draws on scroll */}
          <div className="absolute left-0 right-0 top-7 hidden lg:block">
            <div className="relative h-px w-full bg-white/10">
              <motion.div
                className="absolute inset-y-0 left-0 bg-gradient-to-r from-brand via-brand-light to-cyan-accent"
                initial={{ width: "0%" }}
                whileInView={{ width: "100%" }}
                viewport={{ once: true, margin: "-120px" }}
                transition={{ duration: 1.6, ease: easeEntrance }}
              />
            </div>
          </div>

          <motion.div
            variants={staggerContainer(0.15)}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            className="grid gap-8 lg:grid-cols-5"
          >
            {processSteps.map((step) => (
              <motion.div
                key={step.step}
                variants={fadeUp}
                className="relative flex gap-5 lg:flex-col lg:gap-4 lg:text-center"
              >
                <div className="relative flex flex-col items-center lg:items-center">
                  <div className="relative z-10 flex h-14 w-14 items-center justify-center rounded-2xl glass ring-1 ring-brand/30 shadow-glow-sm">
                    <IconBadge icon={step.icon} className="h-10 w-10 bg-transparent ring-0" />
                  </div>
                  {/* mobile vertical connector */}
                  <span className="mt-2 h-full w-px flex-1 bg-gradient-to-b from-brand/40 to-transparent lg:hidden" />
                </div>

                <div className="lg:mt-3">
                  <span className="font-display text-xs font-bold tracking-widest text-cyan-accent">
                    STEP {step.step}
                  </span>
                  <h3 className="mt-1 font-display text-base font-semibold text-ink">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink-muted">
                    {step.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
