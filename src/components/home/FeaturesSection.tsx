import { motion } from "framer-motion";
import Container from "@/components/common/Container";
import SectionHeading from "@/components/common/SectionHeading";
import { features } from "@/data/features";
import { fadeUp, staggerContainer, viewportOnce } from "@/lib/animations";

export default function FeaturesSection() {
  return (
    <section id="why-choose-us" className="relative bg-[#F4F7F5] py-24 md:py-32 overflow-hidden">
      {/* Decorative Background Elements for Glassmorphism */}
      <div className="absolute top-0 left-1/4 h-96 w-96 -translate-y-1/2 translate-x-1/2 rounded-full bg-[#404E3B]/5 blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 h-[500px] w-[500px] translate-y-1/4 translate-x-1/4 rounded-full bg-brand/5 blur-[120px] pointer-events-none" />

      <Container className="relative z-10">
        <div className="mx-auto max-w-3xl text-center mb-20">
          <SectionHeading
            tone="light"
            eyebrow="Why Choose Us"
            title="Engineered for"
            highlight="Enterprise"
            subtitle="We build scalable, secure, and robust digital foundations that empower your business to grow without technical debt."
          />
        </div>

        <motion.div
          variants={staggerContainer(0.08)}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {features.map((feature) => (
            <motion.div
              key={feature.title}
              variants={fadeUp}
              className="group relative overflow-hidden rounded-[24px] bg-white/60 backdrop-blur-xl border border-white/60 p-8 md:p-10 transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05)] hover:bg-white"
            >
              {/* Top Gradient Line on Hover */}
              <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-[#404E3B] via-[#404E3B]/50 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

              <div className="mb-8 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-white shadow-sm ring-1 ring-black/5 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3">
                <feature.icon className="h-8 w-8 text-[#404E3B]" strokeWidth={1.5} />
              </div>

              <h3 className="mb-4 font-display text-2xl font-bold tracking-tight text-heading">
                {feature.title}
              </h3>

              <p className="text-base leading-relaxed text-faint font-medium">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </section>
  );
}
