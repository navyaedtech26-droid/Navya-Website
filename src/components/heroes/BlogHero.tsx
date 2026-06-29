import { motion } from "framer-motion";
import { Code2, Gauge, ShoppingCart, Layers } from "lucide-react";
import HeroShell from "./HeroShell";
import { fadeUp, staggerContainer } from "@/lib/animations";
import { useReducedMotion } from "@/hooks/useMediaQuery";

const TOPICS = [
  { icon: Code2, label: "Web development" },
  { icon: Gauge, label: "Performance & SEO" },
  { icon: ShoppingCart, label: "E-commerce" },
  { icon: Layers, label: "Business systems" },
];

function MastheadBackdrop({ still }: { still: boolean }) {
  return (
    <>
      <div className="absolute inset-0 bg-grid-pattern bg-[length:72px_72px] opacity-30" />
      {/* Oversized watermark word — editorial masthead feel. */}
      <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
        <span
          aria-hidden
          className="select-none font-display text-[28vw] font-bold leading-none tracking-tighter text-white/[0.03] sm:text-[22vw]"
        >
          DISPATCH
        </span>
      </div>
      <motion.div
        className="absolute left-1/2 top-1/3 h-[34rem] w-[34rem] -translate-x-1/2 rounded-full bg-brand/15 blur-[130px]"
        animate={still ? undefined : { opacity: [0.4, 0.7, 0.4], scale: [1, 1.1, 1] }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
      />
    </>
  );
}

export default function BlogHero() {
  const reduced = useReducedMotion();
  // Doubled list so the marquee loops seamlessly.
  const ticker = [...TOPICS, ...TOPICS];

  return (
    <HeroShell
      backdrop={<MastheadBackdrop still={reduced} />}
      contentClassName="mx-auto max-w-3xl text-center"
    >
      <motion.div variants={staggerContainer(0.12)} initial="hidden" animate="visible">
        <motion.h1
          variants={fadeUp}
          className="font-display text-5xl font-semibold leading-[1.02] tracking-tight text-ink sm:text-6xl md:text-7xl"
        >
          The Navya EdTech <span className="text-gradient">Blog</span>
        </motion.h1>

        {/* Amber rule under the masthead. */}
        <motion.div
          variants={fadeUp}
          className="mx-auto mt-6 h-px w-40 bg-gradient-to-r from-transparent via-brand to-transparent"
        />

        <motion.p
          variants={fadeUp}
          className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-ink-muted sm:text-lg"
        >
          Practical articles on building fast, modern websites and business systems, written by the team that ships
          them.
        </motion.p>
      </motion.div>

      {/* Topic ticker */}
      <motion.div
        variants={fadeUp}
        initial="hidden"
        animate="visible"
        className="relative mt-10 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_12%,black_88%,transparent)]"
      >
        <motion.ul
          className="flex w-max items-center gap-3"
          animate={reduced ? undefined : { x: ["0%", "-50%"] }}
          transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
        >
          {ticker.map(({ icon: Icon, label }, i) => (
            <li
              key={`${label}-${i}`}
              className="inline-flex shrink-0 items-center gap-2 rounded-full glass px-4 py-2 text-sm font-medium text-ink-muted ring-1 ring-white/10"
            >
              <Icon size={15} className="text-cyan-accent" strokeWidth={2} />
              {label}
            </li>
          ))}
        </motion.ul>
      </motion.div>
    </HeroShell>
  );
}
