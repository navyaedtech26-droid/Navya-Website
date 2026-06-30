import type { ReactNode } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, type LucideIcon } from "lucide-react";
import Container from "@/components/common/Container";
import HeroPillar, { HeroGlow } from "@/components/effects/HeroPillar";
import { fadeUp, staggerContainer } from "@/lib/animations";
import { useReducedMotion, useRichMotion } from "@/hooks/useMediaQuery";

export interface PageHeroHighlight {
  icon: LucideIcon;
  label: string;
}

export interface PageHeroAction {
  label: string;
  to: string;
}

interface PageHeroProps {
  /**
   * Deprecated/no-op: eyebrow badges were removed site-wide. Kept so existing
   * call sites still compile; it renders nothing. See SectionHeading.
   */
  eyebrow?: string;
  title: string;
  highlight?: string;
  subtitle: string;
  /** Quick value-prop / topic chips rendered under the subtitle. */
  highlights?: PageHeroHighlight[];
  primaryCta?: PageHeroAction;
  secondaryCta?: PageHeroAction;
  /**
   * Optional custom hero backdrop. When provided, it replaces the default
   * LightPillar shader (e.g. the Contact page's animated beams). It should
   * render its own absolute-fill background; the navbar scrim and bottom fade
   * are kept on top regardless.
   */
  background?: ReactNode;
}

export default function PageHero({
  title,
  highlight,
  subtitle,
  highlights,
  primaryCta,
  secondaryCta,
  background,
}: PageHeroProps) {
  // The hero shader is the single most expensive thing on a secondary page.
  // Gate its cost on the device: only desktop + fine-pointer + motion-allowed
  // visitors get the full 80-iteration "high" pass; everyone else gets a
  // lighter render, and reduced-motion users get a static glow with no WebGL
  // context or rAF loop at all (battery- and a11y-friendly).
  const reduced = useReducedMotion();
  const rich = useRichMotion();

  return (
    <section className="relative isolate flex min-h-screen items-center overflow-hidden pb-24 pt-32 sm:pt-36">
      {/* Dark hero backdrop so the light-pillar reads consistently regardless
          of the page background that scrolls beneath it. */}
      <div className="absolute inset-0 -z-10 bg-bg-deep" />

      {/* Animated hero backdrop — a custom `background` (e.g. the Contact
          beams) when supplied, otherwise the scoped LightPillar shader. */}
      <div aria-hidden className="absolute inset-0 -z-10 overflow-hidden">
        {background ? (
          background
        ) : reduced ? (
          // Reduced-motion: a static glow with no WebGL context or rAF loop —
          // the three.js chunk is never even fetched.
          <HeroGlow />
        ) : (
          <HeroPillar quality={rich ? "high" : "medium"} />
        )}
      </div>

      {/* Top accent glow */}
      <div className="absolute left-1/2 top-0 -z-10 h-72 w-72 -translate-x-1/2 rounded-full bg-brand/20 blur-[120px]" />

      {/* Calm scrim over the navbar zone: suppresses the animated pillar's glow
          back to the base navy behind the (transparent) fixed header, so the
          navbar reads as static — the same as the home hero — instead of having
          the shader shimmer through it. */}
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 -z-10 h-40 bg-gradient-to-b from-bg-deep via-bg-deep/80 to-transparent"
      />

      {/* Smoothly fade the hero into the page's normal background below it. */}
      <div className="absolute inset-x-0 bottom-0 -z-10 h-40 bg-gradient-to-b from-transparent to-bg" />

      <Container className="relative">
        <motion.div
          variants={staggerContainer(0.12)}
          initial="hidden"
          animate="visible"
          className="mx-auto max-w-3xl text-center"
        >
          <motion.h1
            variants={fadeUp}
            className="mt-6 font-display text-4xl font-semibold leading-[1.08] tracking-tight text-ink sm:text-5xl md:text-6xl"
          >
            {title}{" "}
            {highlight && <span className="text-gradient">{highlight}</span>}
          </motion.h1>
          <motion.p
            variants={fadeUp}
            className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-ink-muted sm:text-lg"
          >
            {subtitle}
          </motion.p>

          {highlights && highlights.length > 0 && (
            <motion.ul
              variants={fadeUp}
              className="mx-auto mt-8 flex max-w-2xl flex-wrap items-center justify-center gap-2.5"
            >
              {highlights.map(({ icon: Icon, label }) => (
                <li
                  key={label}
                  className="inline-flex items-center gap-2 rounded-full glass px-3.5 py-1.5 text-xs font-medium text-ink-muted ring-1 ring-white/10 sm:text-sm"
                >
                  <Icon size={15} className="text-cyan-accent" strokeWidth={2} />
                  {label}
                </li>
              ))}
            </motion.ul>
          )}

          {(primaryCta || secondaryCta) && (
            <motion.div
              variants={fadeUp}
              className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row"
            >
              {primaryCta && (
                <Link
                  to={primaryCta.to}
                  className="group inline-flex items-center justify-center gap-1.5 rounded-xl bg-brand px-6 py-3 text-sm font-semibold text-white shadow-glow-sm transition-all duration-200 hover:bg-brand-light hover:shadow-glow"
                >
                  {primaryCta.label}
                  <ArrowRight
                    size={16}
                    className="transition-transform duration-200 group-hover:translate-x-0.5"
                  />
                </Link>
              )}
              {secondaryCta && (
                <Link
                  to={secondaryCta.to}
                  className="inline-flex items-center justify-center rounded-xl glass px-6 py-3 text-sm font-semibold text-ink-muted ring-1 ring-white/10 transition-colors duration-200 hover:text-ink hover:ring-brand/40"
                >
                  {secondaryCta.label}
                </Link>
              )}
            </motion.div>
          )}
        </motion.div>
      </Container>

      {/* Scroll cue — anchors the full-height hero like the home page. */}
      <motion.div
        className="absolute bottom-6 left-1/2 z-10 hidden -translate-x-1/2 opacity-50 sm:block"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
      >
        <div className="flex h-9 w-5 items-start justify-center rounded-full border border-white/20 p-1">
          <span className="h-2 w-1 rounded-full bg-brand" />
        </div>
      </motion.div>
    </section>
  );
}
