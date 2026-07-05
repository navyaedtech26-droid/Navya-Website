import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Rocket, Users, Code2, HeartHandshake } from "lucide-react";
import HeroShell from "./HeroShell";
import { fadeUp, staggerContainer } from "@/lib/animations";

const HIGHLIGHTS = [
  { icon: Rocket, label: "Outcome-driven" },
  { icon: Users, label: "Senior, hands-on team" },
  { icon: Code2, label: "Enterprise-grade stack" },
  { icon: HeartHandshake, label: "Long-term partnership" },
];

export default function AboutHero() {
  return (
    <HeroShell
      bgImage="/about/about.avif"
      bgImageWidth={1584}
      bgImageHeight={672}
      contentClassName="mx-auto max-w-3xl text-center"
    >
      <motion.div variants={staggerContainer(0.12)} initial="hidden" animate="visible">
        <motion.h1
          variants={fadeUp}
          className="type-display text-heading"
        >
          Technology, measured by <span className="text-primary">business results.</span>
        </motion.h1>

        <motion.p
          variants={fadeUp}
          className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-faint sm:text-lg"
        >
          We&apos;re Navya EdTech — a digital transformation partner helping founders and enterprises turn technology
          investment into revenue, efficiency, and lasting competitive advantage.
        </motion.p>

        <motion.ul
          variants={fadeUp}
          className="mx-auto mt-8 flex max-w-2xl flex-wrap items-center justify-center gap-2.5"
        >
          {HIGHLIGHTS.map(({ icon: Icon, label }) => (
            <li
              key={label}
              className="inline-flex items-center gap-2 rounded-full border border-line bg-white px-3.5 py-1.5 text-xs font-medium text-faint shadow-sm sm:text-sm"
            >
              <Icon size={15} className="text-primary" strokeWidth={2} />
              {label}
            </li>
          ))}
        </motion.ul>

        <motion.div variants={fadeUp} className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link
            to="/contact"
            className="group inline-flex items-center justify-center gap-1.5 rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-white shadow-primary-sm transition-colors duration-200 hover:bg-primary-dark"
          >
            Work With Us
            <ArrowRight size={16} className="transition-transform duration-200 group-hover:translate-x-0.5" />
          </Link>
          <Link
            to="/services"
            className="inline-flex items-center justify-center rounded-xl border border-line bg-white px-6 py-3 text-sm font-semibold text-heading shadow-sm transition-colors duration-200 hover:bg-mist hover:border-primary/40"
          >
            Our Services
          </Link>
        </motion.div>
      </motion.div>
    </HeroShell>
  );
}
