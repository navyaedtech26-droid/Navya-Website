import { motion } from "framer-motion";
import {
  Compass,
  FileText,
  PenTool,
  Code2,
  ShieldCheck,
  Rocket,
  Settings
} from "lucide-react";
import Container from "@/components/common/Container";

const PROCESS_STEPS = [
  {
    title: "Discovery",
    icon: Compass,
    description: "We dive deep into your business objectives, technical constraints, and market landscape to ensure absolute alignment.",
    color: "text-blue-500",
    bg: "bg-blue-500/10",
    border: "border-blue-500/20",
  },
  {
    title: "Planning",
    icon: FileText,
    description: "Architectural blueprinting, resource allocation, and drafting a comprehensive technical roadmap with precise milestones.",
    color: "text-indigo-500",
    bg: "bg-indigo-500/10",
    border: "border-indigo-500/20",
  },
  {
    title: "Design",
    icon: PenTool,
    description: "Prototyping premium, accessible, and high-converting user interfaces backed by robust UX research and design systems.",
    color: "text-violet-500",
    bg: "bg-violet-500/10",
    border: "border-violet-500/20",
  },
  {
    title: "Development",
    icon: Code2,
    description: "Agile engineering using enterprise-grade tech stacks, ensuring clean, scalable, and highly performant codebases.",
    color: "text-cyan-accent",
    bg: "bg-cyan-accent/10",
    border: "border-cyan-accent/20",
  },
  {
    title: "Testing",
    icon: ShieldCheck,
    description: "Rigorous automated QA, security auditing, and performance profiling to guarantee zero critical defects.",
    color: "text-emerald-500",
    bg: "bg-emerald-500/10",
    border: "border-emerald-500/20",
  },
  {
    title: "Deployment",
    icon: Rocket,
    description: "Seamless CI/CD integration, zero-downtime cloud deployments, and intensive post-launch monitoring.",
    color: "text-orange-500",
    bg: "bg-orange-500/10",
    border: "border-orange-500/20",
  },
  {
    title: "Maintenance",
    icon: Settings,
    description: "Proactive SLA-backed support, continuous optimization, and scalable feature updates to future-proof your product.",
    color: "text-slate-500",
    bg: "bg-slate-500/10",
    border: "border-slate-500/20",
  },
];

export default function SoftwareDeliveryProcess() {
  return (
    <section className="py-24 lg:py-32 bg-mist relative overflow-hidden border-t border-line/50">
      <Container className="relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-20 lg:mb-28">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 rounded-full border border-brand/20 bg-brand/5 px-4 py-2 text-sm font-semibold text-brand mb-6 shadow-sm backdrop-blur-md"
          >
            Engineering Excellence
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-display text-4xl sm:text-5xl font-extrabold text-heading tracking-tight mb-6"
          >
            Software Delivery Process
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-lg text-faint leading-relaxed"
          >
            A predictable, transparent, and battle-tested lifecycle designed to mitigate risk and accelerate time-to-market for enterprise applications.
          </motion.p>
        </div>

        <div className="relative max-w-4xl mx-auto">
          {/* Central Vertical Line for Desktop */}
          <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-brand/30 to-transparent transform md:-translate-x-1/2" />

          {PROCESS_STEPS.map((step, idx) => {
            const Icon = step.icon;
            const isEven = idx % 2 === 0;

            return (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className={`relative flex flex-col md:flex-row items-start md:items-center justify-between mb-12 lg:mb-20 last:mb-0 ${isEven ? "md:flex-row" : "md:flex-row-reverse"}`}
              >
                {/* Timeline Node */}
                <div className="absolute left-6 md:left-1/2 w-12 h-12 transform -translate-x-1/2 bg-mist border-4 border-white shadow-sm rounded-full flex items-center justify-center z-10">
                  <div className={`w-full h-full rounded-full ${step.bg} border ${step.border} flex items-center justify-center`}>
                    <Icon className={`w-5 h-5 ${step.color}`} />
                  </div>
                </div>

                {/* Content Card */}
                <div className="ml-16 md:ml-0 w-full md:w-[45%] group perspective-1000">
                  <div className={`p-6 sm:p-8 rounded-[2rem] bg-white border border-line shadow-sm hover:shadow-card-hover transition-all duration-300 transform-gpu group-hover:-translate-y-2 relative overflow-hidden`}>

                    {/* Step Number Background Mark */}
                    <div className="absolute -right-4 -top-6 text-[8rem] font-display font-extrabold text-slate-50 opacity-50 select-none pointer-events-none transition-transform duration-500 group-hover:scale-110">
                      0{idx + 1}
                    </div>

                    <div className="relative z-10">
                      <div className="text-sm font-bold tracking-widest text-brand uppercase mb-3">
                        Phase 0{idx + 1}
                      </div>
                      <h3 className="font-display text-2xl font-bold text-heading mb-3 group-hover:text-primary transition-colors">
                        {step.title}
                      </h3>
                      <p className="text-faint leading-relaxed">
                        {step.description}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
