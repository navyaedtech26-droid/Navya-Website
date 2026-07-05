import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import CounterUp from "@/components/effects/CounterUp";
import { heroStats } from "@/data/stats";
import { easeEntrance } from "./data";

// Word-by-word headline reveal (blur + rise), staggered after the badge
const headlineContainer = {
  hidden: {},
  show: {
    transition: { delayChildren: 0.12, staggerChildren: 0.04 },
  },
};
const headlineWord = {
  hidden: { opacity: 0, y: "0.4em", filter: "blur(4px)" },
  show: {
    opacity: 1,
    y: "0em",
    filter: "blur(0px)",
    transition: { duration: 0.4, ease: easeEntrance },
  },
};
const LINE_ONE = ["We", "build", "digital", "systems"];
const LINE_TWO = ["that", "pay", "for", "themselves."];

// ─── Hero left column: badge, headline, copy and CTAs ─────────────────────────
export function Headline() {
  const navigate = useNavigate();

  return (
    <div>
      {/* Eyebrow — credibility anchor: category + a real, verifiable figure */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: easeEntrance }}
      >
        <span
          className="inline-flex items-center gap-2 rounded-full border border-line bg-mist px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-primary"
          style={{ fontFamily: "'JetBrains Mono', monospace" }}
        >
          <span className="h-1.5 w-1.5 rounded-full bg-accent" aria-hidden />
          Digital Growth Partner · 3+ Years Delivering Results
        </span>
      </motion.div>

      {/* Headline — word-by-word blur reveal + animated gradient accent */}
      <motion.h1
        variants={headlineContainer}
        initial="hidden"
        animate="show"
        className="mt-5 text-heading leading-[1.04] tracking-tight"
        style={{ fontFamily: "'Inter', sans-serif", fontSize: "clamp(2.4rem, 4.5vw, 4.2rem)", fontWeight: 700, letterSpacing: "-0.02em" }}
      >
        <span className="block">
          {LINE_ONE.map((w, i) => (
            <motion.span
              key={i}
              variants={headlineWord}
              className="inline-block"
              style={{ willChange: "transform, filter", marginRight: i < LINE_ONE.length - 1 ? "0.28em" : undefined }}
            >
              {w}
            </motion.span>
          ))}
        </span>
        <span className="relative inline-block">
          {LINE_TWO.map((w, i) => {
            // "themselves." is the hero's accent word — the payoff the reader's
            // eye should land on. Painted with text-primary; "that pay for"
            // stays plain so only the outcome word carries colour.
            const accent = w === "themselves.";
            return (
              <motion.span
                key={i}
                variants={headlineWord}
                className={accent ? "inline-block text-primary" : "inline-block text-heading"}
                style={{ willChange: "transform, filter", marginRight: i < LINE_TWO.length - 1 ? "0.28em" : undefined }}
              >
                {w}
              </motion.span>
            );
          })}
          <motion.span
            className="absolute -bottom-1 left-0 h-[3px] rounded-full bg-primary"
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: "100%", opacity: 1 }}
            transition={{ duration: 0.5, ease: easeEntrance, delay: 0.7 }}
          />
        </span>
      </motion.h1>

      {/* Subheadline — names who it's for; five-second "is this for me?" answer */}
      <motion.p
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: easeEntrance, delay: 0.55 }}
        className="mt-6 text-lg font-semibold text-heading"
      >
        For founders, executives, and institutions who need results — not another pretty website.
      </motion.p>

      {/* Body copy — the offer plus a risk-reversal line */}
      <motion.p
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: easeEntrance, delay: 0.65 }}
        className="mt-3 text-sm leading-relaxed text-faint max-w-[440px]"
      >
        From high-converting websites to automated systems and commerce that runs around the
        clock — every build is engineered toward one outcome: more revenue, lower operating cost,
        or both. You'll see the plan before you commit to anything.
      </motion.p>

      {/* CTA row */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: easeEntrance, delay: 0.75 }}
        className="mt-9"
      >
        <div className="flex flex-col sm:flex-row gap-3">
          <motion.button
            onClick={() => navigate("/contact")}
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: "spring", stiffness: 400, damping: 22 }}
            className="group relative overflow-hidden px-7 py-3.5 rounded-lg bg-primary text-white text-sm font-bold tracking-wide shadow-primary-sm transition-colors hover:bg-primary-dark"
          >
            {/* shine sweep on hover */}
            <span className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/25 to-transparent transition-transform duration-700 ease-out group-hover:translate-x-full" />
            <span className="relative inline-flex items-center gap-1.5">
              Book a Strategy Call
              <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
            </span>
          </motion.button>
          <motion.a
            href="#case-studies"
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: "spring", stiffness: 400, damping: 22 }}
            className="px-7 py-3.5 rounded-lg border border-line bg-paper text-heading text-sm font-semibold text-center transition-colors hover:border-primary/40 hover:bg-mist"
          >
            See Client Results
          </motion.a>
        </div>
        <p className="mt-3 text-xs text-faint">
          Free 30-minute call · No obligation
        </p>
      </motion.div>

      {/* Stat strip — quantified proof, the numbers doing the persuading */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: easeEntrance, delay: 0.9 }}
        className="mt-9 flex items-center gap-5 sm:gap-7"
      >
        {heroStats.map((stat, i) => (
          <div key={stat.label} className="flex items-center gap-5 sm:gap-7">
            {i > 0 && <span className="h-8 w-px bg-line" aria-hidden />}
            <div>
              <div className="font-display text-2xl sm:text-3xl font-bold text-accent">
                <CounterUp to={stat.value} suffix={stat.suffix} immediate />
              </div>
              <p
                className="mt-0.5 text-[10px] uppercase tracking-[0.1em] text-faint"
                style={{ fontFamily: "'JetBrains Mono', monospace" }}
              >
                {stat.label}
              </p>
            </div>
          </div>
        ))}
      </motion.div>
    </div>
  );
}
