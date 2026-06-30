import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { fadeUp } from "@/lib/animations";
import { cn } from "@/lib/utils";
import IconBadge from "@/components/common/IconBadge";
import type { CaseStudy } from "@/data/caseStudies";

/** Cover gradient per accent — a branded banner stands in for a screenshot. */
const ACCENTS: Record<CaseStudy["accent"], string> = {
  blue: "from-brand/30 via-brand/5",
  cyan: "from-cyan-accent/30 via-cyan-accent/5",
  violet: "from-depth-light/30 via-depth/5",
};

/** Icon-badge accent colour matching the cover gradient. */
const ACCENT_HEX: Record<CaseStudy["accent"], string> = {
  blue: "#F5A623",
  cyan: "#0EA5E9",
  violet: "#A78BFA",
};

/**
 * Dedicated case-study card: a gradient cover with the client's industry icon
 * and project tag, the client name, and a one-line summary. Optionally links to
 * a full write-up; otherwise it's a presentational showcase.
 */
export default function CaseStudyCard({ study }: { study: CaseStudy }) {
  const Icon = study.icon;

  const cardClass =
    "group relative flex h-full flex-col overflow-hidden rounded-2xl glass ring-1 ring-white/10 transition-all duration-300 hover:-translate-y-1 hover:ring-brand/40 hover:shadow-glow-sm";

  const body = (
    <>
      {/* Cover banner */}
      <div className={cn("relative h-28 overflow-hidden bg-gradient-to-br to-transparent", ACCENTS[study.accent])}>
        <div className="absolute inset-0 grid-bg opacity-40" aria-hidden />
        <div className="absolute left-5 top-5">
          <IconBadge icon={Icon} color={ACCENT_HEX[study.accent]} />
        </div>
        <span className="absolute right-4 top-4 rounded-full bg-bg-900/70 px-3 py-1 text-[11px] font-medium uppercase tracking-wide text-ink-muted ring-1 ring-white/10 backdrop-blur">
          {study.category}
        </span>
        {study.href && (
          <ArrowUpRight
            size={18}
            className="absolute bottom-4 right-4 text-ink-muted opacity-0 transition-opacity duration-300 group-hover:opacity-100"
            aria-hidden
          />
        )}
      </div>

      {/* Body */}
      <div className="flex flex-1 flex-col p-6">
        <p className="text-xs font-medium uppercase tracking-wider text-cyan-accent">
          {study.industry}
        </p>
        <h3 className="mt-1.5 font-display text-lg font-semibold text-ink">
          {study.client}
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-ink-muted">{study.summary}</p>
      </div>
    </>
  );

  return (
    <motion.div variants={fadeUp} className="h-full">
      {study.href ? (
        <a
          href={study.href}
          target="_blank"
          rel="noreferrer"
          aria-label={`${study.client} case study`}
          className={cardClass}
        >
          {body}
        </a>
      ) : (
        <div className={cardClass}>{body}</div>
      )}
    </motion.div>
  );
}
