import type { ReactNode } from "react";
import { motion } from "framer-motion";
import Container from "@/components/common/Container";

interface HeroShellProps {
  /** The page-specific animated backdrop (rendered behind content, aria-hidden). */
  backdrop: ReactNode;
  children: ReactNode;
  /** Width constraint + alignment of the content column. */
  contentClassName?: string;
  /** Hide the bottom scroll cue (e.g. when the hero is shorter). */
  hideScrollCue?: boolean;
}

/**
 * Shared chrome for the secondary-page heroes: full-height section, deep
 * aubergine base, navbar scrim, bottom fade into the page, and the animated
 * scroll cue. Each page supplies its own distinctive `backdrop` + content
 * layout so the heroes stay visually unique while the framing stays consistent.
 */
export default function HeroShell({
  backdrop,
  children,
  contentClassName,
  hideScrollCue,
}: HeroShellProps) {
  return (
    <section className="relative isolate flex min-h-screen items-center overflow-hidden pb-24 pt-32 sm:pt-36">
      {/* Deep base so every backdrop reads consistently. */}
      <div className="absolute inset-0 -z-10 bg-bg-deep" />

      {/* Page-specific animated backdrop. */}
      <div aria-hidden className="absolute inset-0 -z-10 overflow-hidden">
        {backdrop}
      </div>

      {/* Calm scrim under the fixed navbar so the header reads static. */}
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 -z-10 h-40 bg-gradient-to-b from-bg-deep via-bg-deep/80 to-transparent"
      />

      {/* Fade the hero into the page background below it. */}
      <div
        aria-hidden
        className="absolute inset-x-0 bottom-0 -z-10 h-40 bg-gradient-to-b from-transparent to-bg"
      />

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
          <div className="flex h-9 w-5 items-start justify-center rounded-full border border-white/20 p-1">
            <span className="h-2 w-1 rounded-full bg-brand" />
          </div>
        </motion.div>
      )}
    </section>
  );
}
