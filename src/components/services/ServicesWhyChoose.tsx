import { motion } from "framer-motion";
import {
  Users,
  MessageSquare,
  Zap,
  TrendingUp,
  ShieldCheck,
  Award,
  Layers,
  Heart,
  UsersRound,
} from "lucide-react";
import Container from "@/components/common/Container";
import { fadeUp, staggerContainer, viewportOnce } from "@/lib/animations";

const WHY_POINTS = [
  {
    icon: Users,
    title: "Experienced Team",
    desc: "Our architects and engineers bring decades of collective experience delivering production software for global companies.",
  },
  {
    icon: MessageSquare,
    title: "Transparent Communication",
    desc: "No developer jargon. We provide structured weekly updates, transparent task tracking, and predictable pricing frameworks.",
  },
  {
    icon: Zap,
    title: "Modern Technologies",
    desc: "We leverage top-tier frameworks (React, Next.js, FastAPI, Node) to build responsive, fast-loading, and future-proof systems.",
  },
  {
    icon: Layers,
    title: "Scalable Architecture",
    desc: "We construct codebases and server deployments engineered to support expansion from early users to millions.",
  },
  {
    icon: Heart,
    title: "Long-term Support",
    desc: "Our commitment doesn't end at launch. We provide ongoing security patches, backups, and feature development contracts.",
  },
  {
    icon: TrendingUp,
    title: "Business-First Thinking",
    desc: "We align all technological decisions with commercial metrics: revenue channels, cost margins, and customer retention.",
  },
  {
    icon: ShieldCheck,
    title: "Security-Focused",
    desc: "We implement advanced encryption, secure API boundaries, GDPR/HIPAA-aware database design, and firewalls by default.",
  },
  {
    icon: Award,
    title: "Quality Assurance",
    desc: "Rigorous automation testing, linting protocols, and peer reviews ensure code is stable before hitting production.",
  },
  {
    icon: UsersRound,
    title: "Client Collaboration",
    desc: "We function as an extension of your team, scheduling co-working alignment sprints and shared Slack channels.",
  },
];

export default function ServicesWhyChoose() {
  return (
    <section className="py-32 bg-paper relative overflow-hidden">
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
              The Navya Advantage
            </motion.h2>
            <motion.p
              variants={fadeUp}
              className="type-heading-l text-heading"
            >
              Why Partner with Navya
            </motion.p>
            <motion.p
              variants={fadeUp}
              className="text-lg text-faint max-w-xl mx-auto"
            >
              Our engineering team integrates seamlessly with your organizational goals to ship robust, reliable code.
            </motion.p>
          </div>

          {/* Cards Grid */}
          <motion.div
            variants={staggerContainer(0.05)}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {WHY_POINTS.map((point, idx) => {
              const Icon = point.icon;
              return (
                <motion.div
                  key={idx}
                  variants={fadeUp}
                  className="group relative p-8 sm:p-10 rounded-[2rem] card-light hover:shadow-card hover:-translate-y-1 transition-all duration-300"
                >
                  <div className="w-14 h-14 rounded-2xl bg-mist border border-line flex items-center justify-center text-primary mb-6 group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                    <Icon size={24} />
                  </div>
                  <h3 className="font-display font-semibold text-xl text-heading mb-3 group-hover:text-brand transition-colors duration-200">
                    {point.title}
                  </h3>
                  <p className="text-base text-faint leading-relaxed">
                    {point.desc}
                  </p>
                </motion.div>
              );
            })}
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
}
