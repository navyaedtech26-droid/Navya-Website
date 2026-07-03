import type { ReactNode } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, type LucideIcon } from "lucide-react";
import Container from "@/components/common/Container";
import { fadeUp, staggerContainer } from "@/lib/animations";

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
   * Legacy custom dark backdrop slot. Retained for API compatibility but no
   * longer rendered — the light theme uses one calm wash for every hero.
   */
  background?: ReactNode;
  /**
   * Page-specific background photograph (served from /public). Rendered edge
   * to edge behind the content, softened by a light scrim so hero copy stays
   * legible while the image texture reads through.
   */
  bgImage?: string;
  /** Accessible description of the background image (decorative if omitted). */
  bgImageAlt?: string;
}

export default function PageHero({
  title,
  highlight,
  subtitle,
  highlights,
  primaryCta,
  secondaryCta,
  bgImage,
  bgImageAlt,
}: PageHeroProps) {
  return (
    <section className="relative isolate flex min-h-screen items-center overflow-hidden bg-paper pb-16 pt-28 sm:pt-36">
      {/* Page-specific background photo + readability scrim. */}
      {bgImage && (
        <>
          <img
            src={bgImage}
            alt={bgImageAlt ?? ""}
            aria-hidden={bgImageAlt ? undefined : true}
            loading="eager"
            fetchPriority="high"
            decoding="async"
            className="absolute inset-0 -z-20 h-full w-full object-cover object-center"
          />
          {/* Light scrim: keeps dark hero copy legible over the photograph. */}
          <div
            aria-hidden
            className="absolute inset-0 -z-10 bg-gradient-to-br from-paper/90 via-paper/78 to-paper/88"
          />
        </>
      )}
      {/* Faint blueprint grid, masked so it dissolves toward the edges. */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10 light-grid opacity-70 [mask-image:radial-gradient(ellipse_at_center,black_20%,transparent_78%)]"
      />
      {/* Single restrained brand wash. */}
      <div aria-hidden className="absolute inset-0 -z-10 bg-hero-wash" />

      <Container className="relative">
        <motion.div
          variants={staggerContainer(0.12)}
          initial="hidden"
          animate="visible"
          className="mx-auto max-w-3xl text-center"
        >
          <motion.h1
            variants={fadeUp}
            className="mt-6 font-display text-4xl font-semibold leading-[1.08] tracking-tight text-heading sm:text-5xl md:text-6xl"
          >
            {title}{" "}
            {highlight && <span className="text-primary">{highlight}</span>}
          </motion.h1>
          <motion.p
            variants={fadeUp}
            className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-faint sm:text-lg"
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
                  className="inline-flex items-center gap-2 rounded-full border border-line bg-white px-3.5 py-1.5 text-xs font-medium text-faint shadow-sm sm:text-sm"
                >
                  <Icon size={15} className="text-primary" strokeWidth={2} />
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
                  className="group inline-flex items-center justify-center gap-1.5 rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-white shadow-primary-sm transition-colors duration-200 hover:bg-primary-dark"
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
                  className="inline-flex items-center justify-center rounded-xl border border-line bg-white px-6 py-3 text-sm font-semibold text-heading shadow-sm transition-colors duration-200 hover:bg-mist hover:border-primary/40"
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
        <div className="flex h-9 w-5 items-start justify-center rounded-full border border-heading/20 p-1">
          <span className="h-2 w-1 rounded-full bg-primary" />
        </div>
      </motion.div>
    </section>
  );
}
