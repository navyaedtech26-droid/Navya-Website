import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import Container from "@/components/common/Container";
import Reveal from "@/components/effects/Reveal";

/**
 * A calm, static brand card: the Navya logo framed in glass. The only motion is
 * a gentle zoom + tilt on hover (a spring, so it settles smoothly) — no looping
 * background animation.
 */
function StoryVisual() {
  return (
    <div className="relative mx-auto flex aspect-square w-full max-w-md items-center justify-center">
      {/* Static brand glow */}
      <div className="absolute inset-0 rounded-full bg-brand/15 blur-[90px]" />

      {/* Static concentric rings for a subtle techy depth (no animation) */}
      <div className="pointer-events-none absolute inset-[5%] rounded-full border border-dashed border-cyan-accent/15" />
      <div className="pointer-events-none absolute inset-[17%] rounded-full border border-cyan-accent/10" />

      {/* Logo card — gently zooms and rotates on hover */}
      <motion.div
        whileHover={{ scale: 1.05, rotate: 2.5 }}
        whileTap={{ scale: 1.02, rotate: 1 }}
        transition={{ type: "spring", stiffness: 220, damping: 16 }}
        className="group relative flex aspect-square w-[74%] items-center justify-center rounded-[2rem] glass shadow-glow ring-1 ring-white/10"
      >
        {/* Static corner ticks → framed, "command-center" card look */}
        {[
          "left-4 top-4 border-l border-t",
          "right-4 top-4 border-r border-t",
          "left-4 bottom-4 border-l border-b",
          "right-4 bottom-4 border-r border-b",
        ].map((pos) => (
          <span
            key={pos}
            className={`absolute h-5 w-5 rounded-[4px] border-cyan-accent/40 ${pos}`}
          />
        ))}

        <img
          src="/logo.png"
          alt="Navya EdTech"
          width={420}
          height={162}
          decoding="async"
          className="w-2/3 max-w-[15rem] object-contain drop-shadow-[0_0_24px_rgba(30, 107, 255,0.35)] transition-transform duration-500 group-hover:scale-105"
        />
      </motion.div>
    </div>
  );
}

export default function CompanyStory() {
  return (
    <section className="relative py-20">
      <Container>
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div>
            <Reveal>
              <span className="inline-flex items-center gap-2 rounded-full glass px-4 py-1.5 text-xs font-medium uppercase tracking-[0.2em] text-brand-light">
                <Sparkles size={13} className="text-cyan-accent" /> Our Story
              </span>
            </Reveal>
            <Reveal delay={0.1}>
              <h2 className="mt-5 font-display text-3xl font-semibold leading-tight text-ink sm:text-4xl">
                A digital partner built for <span className="text-ink">modern businesses</span>
              </h2>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="mt-5 text-base leading-relaxed text-ink-muted">
                Navya EdTech began with a simple belief: great technology should be
                accessible to every growing business. We pair editorial design with
                serious engineering to ship websites and systems that feel premium and
                perform under pressure.
              </p>
            </Reveal>
            <Reveal delay={0.3}>
              <p className="mt-4 text-base leading-relaxed text-ink-muted">
                From a first landing page to a full ERP rollout, we obsess over speed,
                clarity, and the details that make software a joy to use, so your team
                and your customers feel the difference.
              </p>
            </Reveal>
          </div>

          {/* Abstract animated glass visual */}
          <Reveal delay={0.15}>
            <StoryVisual />
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
