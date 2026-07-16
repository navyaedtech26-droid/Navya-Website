import { motion } from "framer-motion";
import {
  GraduationCap,
  Activity,
  ShoppingCart,
  DollarSign,
  Factory,
  Rocket,
  Globe,
  Building,
  Briefcase,
  Layers,
} from "lucide-react";
import Container from "@/components/common/Container";
import { fadeUp, staggerContainer, viewportOnce } from "@/lib/animations";

const INDUSTRIES_DATA = [
  {
    icon: GraduationCap,
    name: "Education",
    benefit: "Deploy secure learning systems and operational databases that reduce admin overhead.",
  },
  {
    icon: Activity,
    name: "Healthcare",
    benefit: "Build secure patient-care portals, operational logging, and structured reporting panels.",
  },
  {
    icon: ShoppingCart,
    name: "Retail & Commerce",
    benefit: "Scale high-performance storefronts integrated with inventory, sales, and logistics sync.",
  },
  {
    icon: DollarSign,
    name: "Finance",
    benefit: "Engineer secure, audit-ready bookkeeping interfaces and automated invoice reconciliation.",
  },
  {
    icon: Factory,
    name: "Manufacturing",
    benefit: "Optimize resource management databases, machinery usage schedules, and material logging.",
  },
  {
    icon: Rocket,
    name: "Startups",
    benefit: "Accelerate code validation and time-to-market using modular, high-fidelity MVP sprints.",
  },
  {
    icon: Globe,
    name: "NGOs & Non-Profits",
    benefit: "Launch structured donor trackers, grant reports, and interactive project impact dashboards.",
  },
  {
    icon: Building,
    name: "Government",
    benefit: "Develop accessible (WCAG compliant) citizen request portals and secure databases.",
  },
  {
    icon: Briefcase,
    name: "SMEs",
    benefit: "Automate billing cycles and client communication pipelines to protect operating margins.",
  },
  {
    icon: Layers,
    name: "Enterprise",
    benefit: "Bridge legacy silos with custom API orchestration, microservices, and unified data warehouses.",
  },
];

export default function ServicesIndustries() {
  return (
    <section className="py-32 bg-paper relative overflow-hidden">
      {/* Background visual indicators */}
      <div className="absolute top-[20%] right-[-15%] w-[450px] h-[450px] rounded-full bg-sky/20 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[20%] left-[-15%] w-[450px] h-[450px] rounded-full bg-indigo-50/20 blur-[120px] pointer-events-none" />

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
              Market Verticals
            </motion.h2>
            <motion.p
              variants={fadeUp}
              className="type-heading-l text-heading"
            >
              Industries We Serve
            </motion.p>
            <motion.p
              variants={fadeUp}
              className="text-lg text-faint max-w-xl mx-auto"
            >
              Our engineering teams design software tailored around the specific compliance, scaling, and user expectations of your market.
            </motion.p>
          </div>

          {/* Grid Layout */}
          <motion.div
            variants={staggerContainer(0.03)}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6"
          >
            {INDUSTRIES_DATA.map((ind, idx) => {
              const Icon = ind.icon;
              return (
                <motion.div
                  key={idx}
                  variants={fadeUp}
                  className="group relative p-8 rounded-2xl card-light hover:shadow-card hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
                >
                  <div>
                    <div className="w-10 h-10 rounded-lg bg-haze flex items-center justify-center text-primary mb-5 group-hover:bg-primary group-hover:text-white transition-all duration-300">
                      <Icon size={20} />
                    </div>
                    <h3 className="font-display font-semibold text-heading text-base mb-3 group-hover:text-brand transition-colors duration-200">
                      {ind.name}
                    </h3>
                    <p className="text-sm text-faint leading-relaxed">
                      {ind.benefit}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
}
