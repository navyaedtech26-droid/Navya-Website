import { motion } from "framer-motion";
import { Search, Compass, Eye, Terminal, CheckCircle2, Rocket, Heart } from "lucide-react";
import Container from "@/components/common/Container";
import { fadeUp, staggerContainer, viewportOnce } from "@/lib/animations";

const PROCESS_STEPS = [
  {
    step: "1",
    title: "Discovery",
    icon: Search,
    description: "We audit your existing tech stack, document process inefficiencies, and define the commercial outcomes required.",
  },
  {
    step: "2",
    title: "Planning",
    icon: Compass,
    description: "Our solutions architects draft data schemas, choose appropriate technologies, and provide a fixed-scope estimate.",
  },
  {
    step: "3",
    title: "Design",
    icon: Eye,
    description: "We design accessibility-compliant (WCAG) interactive UI wireframes and user journeys for feedback.",
  },
  {
    step: "4",
    title: "Development",
    icon: Terminal,
    description: "Our engineering team builds clean, well-tested code using Agile sprints with continuous deployment.",
  },
  {
    step: "5",
    title: "Testing",
    icon: CheckCircle2,
    description: "Rigorous QA testing for security vulnerabilities, page speed optimization, and responsive layout scaling.",
  },
  {
    step: "6",
    title: "Launch",
    icon: Rocket,
    description: "We handle server migration, SSL security configurations, API handshakes, and launch with zero downtime.",
  },
  {
    step: "7",
    title: "Support",
    icon: Heart,
    description: "Proactive monitoring, uptime protection, monthly security updates, and SLAs for future iterations.",
  },
];

export default function ServicesProcess() {
  return (
    <section className="py-32 bg-mist border-y border-line overflow-hidden relative">
      {/* Decorative enterprise line pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5 pointer-events-none" />

      <Container>
        <motion.div
          variants={staggerContainer(0.08)}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="space-y-24"
        >
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto space-y-5">
            <motion.h2
              variants={fadeUp}
              className="font-display text-xs font-semibold tracking-widest text-primary uppercase"
            >
              Our Methodology
            </motion.h2>
            <motion.p
              variants={fadeUp}
              className="type-heading-l text-heading"
            >
              Engineered for reliability.
            </motion.p>
            <motion.p
              variants={fadeUp}
              className="text-lg text-faint max-w-xl mx-auto"
            >
              A transparent, risk-managed process engineered to take digital products from ideation to production.
            </motion.p>
          </div>

          {/* Timeline Grid: Desktop Horizontal, Mobile Vertical */}
          <div className="relative">
            {/* Connecting line - desktop only */}
            <div className="hidden lg:block absolute top-[44px] left-[5%] right-[5%] h-px bg-line z-0" />

            <div className="grid grid-cols-1 lg:grid-cols-7 gap-10 lg:gap-6 relative z-10">
              {PROCESS_STEPS.map((step) => {
                const Icon = step.icon;
                return (
                  <motion.div
                    key={step.step}
                    variants={fadeUp}
                    className="flex lg:flex-col items-start lg:items-center text-left lg:text-center gap-5 lg:gap-0"
                  >
                    {/* Circle badge */}
                    <div className="relative flex-shrink-0 flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 rounded-2xl border border-line bg-paper text-primary shadow-sm group hover:border-brand hover:text-brand transition-all duration-300 lg:mb-8">
                      {/* Step number badge */}
                      <span className="absolute -top-2 -right-2 w-6 h-6 rounded-lg bg-primary text-white text-[10px] font-bold flex items-center justify-center border border-paper shadow-sm">
                        {step.step}
                      </span>
                      <Icon size={24} />
                    </div>

                    {/* Copy details */}
                    <div className="space-y-2 flex-1 lg:w-full">
                      <h3 className="font-display font-semibold text-heading text-lg">
                        {step.title}
                      </h3>
                      <p className="text-sm text-faint leading-relaxed max-w-xs lg:mx-auto">
                        {step.description}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
