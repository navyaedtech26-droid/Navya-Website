import { motion } from "framer-motion";
import { Handshake, FileSignature, RefreshCcw, UserCheck, MessageSquare, Wrench } from "lucide-react";
import Container from "@/components/common/Container";
import SectionHeading from "@/components/common/SectionHeading";
import { fadeUp, staggerContainer, viewportOnce } from "@/lib/animations";

const TRUST_FEATURES = [
  {
    icon: Handshake,
    title: "Free Consultation",
    description: "Start with a no-obligation strategy session to align on your business goals and technical requirements.",
  },
  {
    icon: FileSignature,
    title: "NDA Protection",
    description: "Your intellectual property is secure. We sign non-disclosure agreements before any sensitive discussions.",
  },
  {
    icon: RefreshCcw,
    title: "Agile Delivery",
    description: "Iterative sprints ensure rapid delivery, continuous feedback, and the flexibility to adapt to market changes.",
  },
  {
    icon: UserCheck,
    title: "Dedicated Manager",
    description: "A single point of contact oversees your project, ensuring accountability and seamless execution.",
  },
  {
    icon: MessageSquare,
    title: "Full Transparency",
    description: "Clear communication, detailed reporting, and open access to project tracking boards at all times.",
  },
  {
    icon: Wrench,
    title: "Long-Term Support",
    description: "We don't just launch and leave. Enjoy ongoing maintenance, SLAs, and dedicated technical support.",
  },
];

export default function TrustSection() {
  return (
    <section className="relative bg-slate-50/50 py-24 lg:py-32 overflow-hidden border-t border-line/50">
      <Container>
        <SectionHeading
          eyebrow="The Enterprise Standard"
          title="Why Partner"
          highlight="With Us"
          subtitle="We eliminate the risks of software outsourcing with a proven, transparent, and highly secure engagement model."
        />

        <motion.div
          variants={staggerContainer(0.1)}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {TRUST_FEATURES.map((feature, idx) => (
            <motion.div
              key={idx}
              variants={fadeUp}
              className="group relative flex flex-col gap-5 rounded-2xl bg-white p-8 shadow-sm ring-1 ring-line/60 transition-all duration-500 hover:-translate-y-1.5 hover:shadow-xl hover:shadow-black/5 hover:ring-brand/30 overflow-hidden"
            >
              {/* Subtle hover gradient background */}
              <div className="absolute inset-0 bg-gradient-to-br from-brand/5 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100"></div>
              
              <div className="relative flex h-14 w-14 items-center justify-center rounded-xl bg-slate-50 border border-line/50 text-brand transition-all duration-500 group-hover:scale-110 group-hover:bg-brand group-hover:text-white group-hover:border-brand shadow-sm">
                <feature.icon size={24} strokeWidth={2} />
              </div>
              
              <div className="relative z-10">
                <h3 className="font-display text-xl font-bold text-heading mb-3 transition-colors group-hover:text-brand">
                  {feature.title}
                </h3>
                <p className="text-sm leading-relaxed text-faint">
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </section>
  );
}
