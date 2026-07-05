import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Gauge, ShieldCheck, Headset } from "lucide-react";
import HeroShell from "./HeroShell";
import { fadeUp, staggerContainer } from "@/lib/animations";

const CHIPS = [
  { icon: Gauge, label: "Revenue-focused builds" },
  { icon: ShieldCheck, label: "Secure & scalable" },
  { icon: Headset, label: "Measurable outcomes" },
];

export default function ServicesHero() {
  return (
    <HeroShell
      bgImage="/services/services.avif"
      bgImageWidth={1584}
      bgImageHeight={672}
      contentClassName="mx-auto max-w-3xl text-center"
    >
      <motion.div variants={staggerContainer(0.12)} initial="hidden" animate="visible">
        <motion.h1
          variants={fadeUp}
          className="type-display text-heading"
        >
          Capabilities engineered for <span className="text-primary">Business Growth</span>
        </motion.h1>

        <motion.p
          variants={fadeUp}
          className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-faint sm:text-lg"
        >
          From revenue-driving websites to operations that automate cost away, Navya EdTech delivers digital systems
          measured by one thing: the business results they produce.
        </motion.p>

        <motion.ul
          variants={fadeUp}
          className="mx-auto mt-8 flex max-w-2xl flex-wrap items-center justify-center gap-2.5"
        >
          {CHIPS.map(({ icon: Icon, label }) => (
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
            Start Your Project
            <ArrowRight size={16} className="transition-transform duration-200 group-hover:translate-x-0.5" />
          </Link>
          <Link
            to="/blog"
            className="inline-flex items-center justify-center rounded-xl border border-line bg-white px-6 py-3 text-sm font-semibold text-heading shadow-sm transition-colors duration-200 hover:bg-mist hover:border-primary/40"
          >
            Read the Blog
          </Link>
        </motion.div>
      </motion.div>
    </HeroShell>
  );
}
