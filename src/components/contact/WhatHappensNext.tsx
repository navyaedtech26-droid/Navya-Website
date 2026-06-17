import { motion } from "framer-motion";
import { MessageSquare, Search, FileText, Rocket } from "lucide-react";
import Container from "@/components/common/Container";
import SectionHeading from "@/components/common/SectionHeading";
import IconBadge from "@/components/common/IconBadge";
import { fadeUp, staggerContainer, viewportOnce } from "@/lib/animations";

const steps = [
  {
    icon: MessageSquare,
    step: "01",
    title: "We Reply Fast",
    text: "Within 24 hours we'll reach out to set up a relaxed discovery call.",
  },
  {
    icon: Search,
    step: "02",
    title: "We Understand You",
    text: "We dig into your goals, market, and challenges before proposing anything.",
  },
  {
    icon: FileText,
    step: "03",
    title: "You Get a Clear Plan",
    text: "A transparent scope, timeline, and quote — no jargon, no surprises.",
  },
  {
    icon: Rocket,
    step: "04",
    title: "We Build & Launch",
    text: "We design, build, and ship — then support your growth long after.",
  },
];

export default function WhatHappensNext() {
  return (
    <section className="relative py-24">
      <Container>
        <SectionHeading
          eyebrow="What Happens Next"
          title="From Hello to"
          highlight="Launch"
          subtitle="Reaching out is easy and pressure-free. Here's exactly what to expect after you hit send."
        />

        <motion.div
          variants={staggerContainer(0.12)}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4"
        >
          {steps.map((s) => (
            <motion.div
              key={s.step}
              variants={fadeUp}
              className="group relative overflow-hidden rounded-2xl glass p-7 ring-1 ring-white/10 transition-all duration-300 hover:-translate-y-1 hover:shadow-glow"
            >
              <span className="pointer-events-none absolute right-4 top-2 select-none font-display text-5xl font-bold leading-none text-ink/[0.06] transition-colors duration-300 group-hover:text-brand/20">
                {s.step}
              </span>
              <IconBadge icon={s.icon} size="lg" />
              <h3 className="mt-5 font-display text-base font-semibold text-ink">{s.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-muted">{s.text}</p>
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </section>
  );
}
