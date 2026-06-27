import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
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
const LINE_ONE = ["We", "don’t", "just", "build."];
const LINE_TWO = ["We", "transform."];

// ─── Hero left column: badge, headline, copy and CTAs ─────────────────────────
export function Headline() {
  const navigate = useNavigate();

  return (
    <div>
      {/* Badge */}
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: easeEntrance, delay: 0.1 }}
        className="relative inline-flex items-center gap-2 overflow-hidden rounded-full border border-[rgba(30,107,255,0.3)] bg-[rgba(30,107,255,0.06)] px-4 py-1.5"
        style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, fontWeight: 600, letterSpacing: "0.18em", textTransform: "uppercase", color: "#93c5fd" }}
      >
        {/* periodic light sweep across the badge */}
        <span
          className="pointer-events-none absolute inset-y-0 -left-full w-1/2 skew-x-12 bg-gradient-to-r from-transparent via-[rgba(147,197,253,0.25)] to-transparent"
          style={{ animation: "badgeSweep 4.5s ease-in-out 1.4s infinite" }}
        />
        <span className="relative flex h-1.5 w-1.5">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#1E6BFF] opacity-75" />
          <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[#1E6BFF]" />
        </span>
        Web Development · Apps · Systems · BI · Social Media
      </motion.div>

      {/* Headline — word-by-word blur reveal + animated gradient accent */}
      <motion.h1
        variants={headlineContainer}
        initial="hidden"
        animate="show"
        className="mt-6 text-white leading-[1.04] tracking-tight"
        style={{ fontFamily: "'Inter', sans-serif", fontSize: "clamp(2.4rem, 4.5vw, 4.2rem)", fontWeight: 700, letterSpacing: "-0.02em" }}
      >
        <span className="block">
          {LINE_ONE.map((w, i) => (
            <motion.span key={i} variants={headlineWord} className="inline-block" style={{ willChange: "transform, filter" }}>
              {w}
              {i < LINE_ONE.length - 1 && " "}
            </motion.span>
          ))}
        </span>
        <span className="relative inline-block">
          {LINE_TWO.map((w, i) => (
            <motion.span
              key={i}
              variants={headlineWord}
              className="inline-block text-white"
              style={{ willChange: "transform, filter" }}
            >
              {w}
              {i < LINE_TWO.length - 1 && " "}
            </motion.span>
          ))}
          <motion.span
            className="absolute -bottom-1 left-0 h-[3px] rounded-full"
            style={{ background: "linear-gradient(90deg, #1E6BFF, #60A5FA, #93C5FD)" }}
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: "100%", opacity: 1 }}
            transition={{ duration: 0.5, ease: easeEntrance, delay: 0.7 }}
          />
        </span>
      </motion.h1>

      {/* Tagline */}
      <motion.p
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: easeEntrance, delay: 0.35 }}
        className="mt-6 text-lg font-semibold text-white"
      >
        Digital solutions designed after understanding your business.
      </motion.p>

      {/* Body copy */}
      <motion.p
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: easeEntrance, delay: 0.45 }}
        className="mt-3 text-sm leading-relaxed text-[#E2E8F0] max-w-[440px]"
      >
        We study your business, market, competitors, and growth possibilities, then build
        high-performance websites, business systems, and social media that scale your brand.
      </motion.p>

      {/* CTA row */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: easeEntrance, delay: 0.55 }}
        className="mt-9 flex flex-col sm:flex-row gap-3"
      >
        <motion.button
          onClick={() => navigate("/contact")}
          whileHover={{ y: -2 }}
          whileTap={{ scale: 0.97 }}
          transition={{ type: "spring", stiffness: 400, damping: 22 }}
          className="group relative overflow-hidden px-7 py-3.5 rounded-lg bg-[#1E6BFF] text-[#0A1628] text-sm font-bold tracking-wide hover:shadow-[0_8px_30px_rgba(30,107,255,0.4)]"
        >
          {/* shine sweep on hover */}
          <span className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/40 to-transparent transition-transform duration-700 ease-out group-hover:translate-x-full" />
          <span className="relative inline-flex items-center gap-1.5">
            Let&apos;s Build Together
            <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
          </span>
        </motion.button>
        <motion.button
          onClick={() => navigate("/services")}
          whileHover={{ y: -2 }}
          whileTap={{ scale: 0.97 }}
          transition={{ type: "spring", stiffness: 400, damping: 22 }}
          className="px-7 py-3.5 rounded-lg border border-[#1E293B] bg-transparent text-white text-sm font-semibold transition-colors hover:border-[rgba(30,107,255,0.5)] hover:bg-[rgba(30,107,255,0.06)]"
        >
          View Our Services
        </motion.button>
      </motion.div>
    </div>
  );
}
