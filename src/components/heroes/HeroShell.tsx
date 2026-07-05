import type { ReactNode } from "react";
import { motion } from "framer-motion";
import Container from "@/components/common/Container";

interface HeroShellProps {
  /**
   * Legacy page-specific dark backdrop. Retained for API compatibility but no
   * longer rendered: the light theme uses a single calm wash for every hero.
   */
  backdrop?: ReactNode;
  children: ReactNode;
  /** Width constraint + alignment of the content column. */
  contentClassName?: string;
  /** Hide the bottom scroll cue (e.g. when the hero is shorter). */
  hideScrollCue?: boolean;
  /**
   * Page-specific background photograph (served from /public). Rendered edge to
   * edge behind the content, softened by a light scrim so the dark hero copy
   * stays legible while the image texture reads through.
   */
  bgImage?: string;
  /** Accessible description of the background image (decorative if omitted). */
  bgImageAlt?: string;
  /** Intrinsic dimensions of `bgImage`, in pixels — sets the img's width/height attributes. */
  bgImageWidth?: number;
  bgImageHeight?: number;
}

/**
 * Shared chrome for the secondary-page heroes: full-height section on a calm
 * white canvas with an optional page-specific background photo, a single
 * restrained brand wash + faint blueprint grid, and the animated scroll cue.
 * Consistent, professional framing across all pages.
 */
export default function HeroShell({
  children,
  contentClassName,
  hideScrollCue,
  bgImage,
  bgImageAlt,
  bgImageWidth,
  bgImageHeight,
}: HeroShellProps) {
  return (
    <section className="relative isolate flex min-h-screen items-center overflow-hidden bg-paper pb-16 pt-28 sm:pt-36">
      {/* Page-specific background photo + readability scrim. */}
      {bgImage && (
        <>
          <img
            src={bgImage}
            alt={bgImageAlt ?? ""}
            aria-hidden={bgImageAlt ? undefined : true}
            width={bgImageWidth}
            height={bgImageHeight}
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
        <div className={contentClassName ?? "mx-auto max-w-3xl text-center"}>
          {children}
        </div>
      </Container>

      {!hideScrollCue && (
        <motion.div
          aria-hidden
          className="absolute bottom-6 left-1/2 z-10 hidden -translate-x-1/2 opacity-50 sm:block"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
        >
          <div className="flex h-9 w-5 items-start justify-center rounded-full border border-heading/20 p-1">
            <span className="h-2 w-1 rounded-full bg-primary" />
          </div>
        </motion.div>
      )}
    </section>
  );
}
