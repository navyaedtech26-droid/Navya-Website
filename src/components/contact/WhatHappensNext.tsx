import { motion } from "framer-motion";
import { Network, SearchCode, FileStack, Rocket } from "lucide-react";
import Container from "@/components/common/Container";
import SectionHeading from "@/components/common/SectionHeading";
import { fadeUp, staggerContainer, viewportOnce } from "@/lib/animations";

const steps = [
  {
    icon: Network,
    step: "01",
    title: "Discovery & Strategy",
    text: "We begin with a deep dive into your business objectives, target market, and operational challenges to align on the strategic vision.",
  },
  {
    icon: SearchCode,
    step: "02",
    title: "Technical Audit",
    text: "Our architects review your existing infrastructure and processes to identify bottlenecks and map out the optimal technical approach.",
  },
  {
    icon: FileStack,
    step: "03",
    title: "Implementation Plan",
    text: "We deliver a comprehensive roadmap including architecture design, resource allocation, and a transparent project timeline.",
  },
  {
    icon: Rocket,
    step: "04",
    title: "Execution & Scale",
    text: "Our dedicated teams execute the plan with precision, ensuring scalable delivery and continuous support post-launch.",
  },
];

export default function WhatHappensNext() {
  return (
    <section className="relative bg-white py-20 md:py-28 overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-line to-transparent"></div>
      
      <Container>
        <SectionHeading
          eyebrow="Engagement Process"
          title="From Inquiry to"
          highlight="Execution"
          subtitle="Our enterprise consultation process is designed to minimize risk and accelerate time-to-value from day one."
        />

        <motion.div
          variants={staggerContainer(0.12)}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4 relative"
        >
          {/* Connecting line for desktop */}
          <div className="hidden lg:block absolute top-[44px] left-[10%] right-[10%] h-px bg-line"></div>

          {steps.map((s) => (
            <motion.div
              key={s.step}
              variants={fadeUp}
              className="relative z-10 flex flex-col items-center text-center group"
            >
              <div className="flex h-24 w-24 items-center justify-center rounded-2xl bg-slate-50 border border-line/80 shadow-sm transition-all duration-300 group-hover:scale-110 group-hover:border-brand/30 group-hover:bg-white group-hover:shadow-md mb-6 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-brand/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <s.icon size={32} className="text-faint group-hover:text-brand transition-colors" strokeWidth={1.5} />
                <div className="absolute top-2 left-2 text-[10px] font-bold text-faint/50 group-hover:text-brand/30 transition-colors">
                  {s.step}
                </div>
              </div>
              
              <h3 className="font-display text-lg font-bold text-heading">{s.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-faint max-w-[260px]">{s.text}</p>
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </section>
  );
}
