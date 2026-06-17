import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import Container from "@/components/common/Container";
import Reveal from "@/components/effects/Reveal";
import FloatingOrbs from "@/components/effects/FloatingOrbs";
import { useReducedMotion } from "@/hooks/useMediaQuery";

export default function CompanyStory() {
  const reduced = useReducedMotion();
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
                A digital partner built for <span className="text-gradient">modern businesses</span>
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
                clarity, and the details that make software a joy to use — so your team
                and your customers feel the difference.
              </p>
            </Reveal>
          </div>

          {/* Abstract animated glass visual */}
          <Reveal delay={0.15}>
            <div className="relative mx-auto aspect-square w-full max-w-md [perspective:1200px]">
              <FloatingOrbs count={8} />
              <div className="absolute inset-0 rounded-full bg-brand/20 blur-[90px]" />
              <motion.div
                className="absolute inset-8 rounded-3xl glass ring-1 ring-white/10 shadow-glow [transform-style:preserve-3d]"
                animate={reduced ? undefined : { rotateY: [0, 8, 0], rotateX: [0, -6, 0] }}
                transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
              >
                <div className="absolute inset-6 grid grid-cols-2 gap-3">
                  {[0, 1, 2, 3].map((i) => (
                    <motion.div
                      key={i}
                      className="rounded-2xl bg-gradient-to-br from-brand/30 to-cyan-accent/10 ring-1 ring-white/10"
                      animate={reduced ? undefined : { opacity: [0.4, 1, 0.4] }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: i * 0.5,
                      }}
                    />
                  ))}
                </div>
              </motion.div>
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  className="absolute rounded-full border border-cyan-accent/20"
                  style={{ inset: `${i * 1.5}rem` }}
                  animate={reduced ? undefined : { rotate: 360 }}
                  transition={{
                    duration: 20 + i * 6,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                />
              ))}
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
