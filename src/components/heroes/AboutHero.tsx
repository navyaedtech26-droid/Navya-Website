import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Rocket, Users, Code2, HeartHandshake } from "lucide-react";
import HeroShell from "./HeroShell";
import IconBadge from "@/components/common/IconBadge";
import { fadeUp, staggerContainer } from "@/lib/animations";
import { useReducedMotion } from "@/hooks/useMediaQuery";

const WORDS = ["Innovate.", "Build.", "Elevate."];

const VALUES = [
  { icon: Rocket, label: "Built for growth", desc: "Every build aimed at measurable business outcomes." },
  { icon: Users, label: "Senior, hands-on team", desc: "Real engineers on your project — not handed off." },
  { icon: Code2, label: "Modern tech stack", desc: "Fast, secure, and maintainable by design." },
  { icon: HeartHandshake, label: "Long-term partnership", desc: "We stay on after launch, as your team would." },
];

function AuroraBackdrop({ still }: { still: boolean }) {
  return (
    <>
      <div className="absolute inset-0 bg-grid-pattern bg-[length:64px_64px] opacity-[0.35]" />
      <motion.div
        className="absolute -left-[10%] top-[-10%] h-[42rem] w-[42rem] rounded-full bg-brand/20 blur-[130px]"
        animate={still ? undefined : { x: [0, 60, 0], y: [0, 40, 0], opacity: [0.5, 0.85, 0.5] }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute right-[-12%] top-[18%] h-[34rem] w-[34rem] rounded-full bg-cyan-accent/15 blur-[120px]"
        animate={still ? undefined : { x: [0, -50, 0], y: [0, 30, 0], opacity: [0.4, 0.7, 0.4] }}
        transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-[-15%] left-[25%] h-[38rem] w-[38rem] rounded-full bg-depth/25 blur-[130px]"
        animate={still ? undefined : { x: [0, 40, 0], opacity: [0.45, 0.75, 0.45] }}
        transition={{ duration: 26, repeat: Infinity, ease: "easeInOut" }}
      />
    </>
  );
}

export default function AboutHero() {
  const reduced = useReducedMotion();

  return (
    <HeroShell
      backdrop={<AuroraBackdrop still={reduced} />}
      contentClassName="grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-10"
    >
      {/* Left — editorial headline */}
      <motion.div variants={staggerContainer(0.12)} initial="hidden" animate="visible">
        <h1 className="font-display text-5xl font-semibold leading-[1.04] tracking-tight text-ink sm:text-6xl md:text-7xl">
          {WORDS.map((word, i) => (
            <motion.span key={word} variants={fadeUp} className="flex items-center gap-4">
              <span
                aria-hidden
                className={`hidden h-9 w-1.5 shrink-0 rounded-full sm:block ${
                  i === WORDS.length - 1 ? "bg-brand" : "bg-white/15"
                }`}
              />
              <span className={i === WORDS.length - 1 ? "text-gradient" : undefined}>{word}</span>
            </motion.span>
          ))}
        </h1>

        <motion.p variants={fadeUp} className="mt-7 max-w-xl text-base leading-relaxed text-ink-muted sm:text-lg">
          We are Navya EdTech, a digital solutions company helping businesses grow through modern websites and smart
          systems.
        </motion.p>

        <motion.div variants={fadeUp} className="mt-9 flex flex-col gap-3 sm:flex-row">
          <Link
            to="/contact"
            className="group inline-flex items-center justify-center gap-1.5 rounded-xl bg-brand px-6 py-3 text-sm font-semibold text-white shadow-glow-sm transition-all duration-200 hover:bg-brand-light hover:shadow-glow"
          >
            Work With Us
            <ArrowRight size={16} className="transition-transform duration-200 group-hover:translate-x-0.5" />
          </Link>
          <Link
            to="/services"
            className="inline-flex items-center justify-center rounded-xl glass px-6 py-3 text-sm font-semibold text-ink-muted ring-1 ring-white/10 transition-colors duration-200 hover:text-ink hover:ring-brand/40"
          >
            Our Services
          </Link>
        </motion.div>
      </motion.div>

      {/* Right — stacked value cards */}
      <motion.ul
        variants={staggerContainer(0.1, 0.25)}
        initial="hidden"
        animate="visible"
        className="flex flex-col gap-3"
      >
        {VALUES.map(({ icon: Icon, label, desc }) => (
          <motion.li
            key={label}
            variants={fadeUp}
            className="group flex items-start gap-4 rounded-2xl glass p-4 text-left ring-1 ring-white/10 transition-colors duration-300 hover:ring-brand/40"
          >
            <IconBadge icon={Icon} className="shrink-0" />
            <span>
              <span className="block text-sm font-semibold text-ink">{label}</span>
              <span className="mt-0.5 block text-sm leading-relaxed text-ink-muted">{desc}</span>
            </span>
          </motion.li>
        ))}
      </motion.ul>
    </HeroShell>
  );
}
