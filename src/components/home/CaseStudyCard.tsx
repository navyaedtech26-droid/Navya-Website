import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { fadeUp } from "@/lib/animations";
import { cn } from "@/lib/utils";
import IconBadge from "@/components/common/IconBadge";
import type { CaseStudy } from "@/data/caseStudies";

/** Cover tint per accent — a soft branded banner stands in for a screenshot. */
const ACCENTS: Record<CaseStudy["accent"], string> = {
  blue: "from-primary/12 via-primary/5",
  cyan: "from-[#0EA5E9]/12 via-[#0EA5E9]/5",
  violet: "from-secondary/12 via-secondary/5",
};

/** Icon-badge accent colour matching the cover tint. */
const ACCENT_HEX: Record<CaseStudy["accent"], string> = {
  blue: "#081E4D",
  cyan: "#0EA5E9",
  violet: "#6366F1",
};

/**
 * Dedicated case-study card: a gradient cover with the client's industry icon
 * and project tag, the client name, and a one-line summary. Optionally links to
 * a full write-up; otherwise it's a presentational showcase.
 */
export default function CaseStudyCard({ study }: { study: CaseStudy }) {
  const Icon = study.icon;

  const cardClass =
    "group relative flex h-full flex-col overflow-hidden rounded-2xl card-light transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-card-hover";

  const body = (
    <>
      {/* Cover banner */}
      <div className={cn("relative h-28 overflow-hidden border-b border-line bg-gradient-to-br to-transparent", ACCENTS[study.accent])}>
        <div className="absolute inset-0 light-grid opacity-70" aria-hidden />
        <div className="absolute left-5 top-5">
          <IconBadge icon={Icon} color={ACCENT_HEX[study.accent]} tone="light" />
        </div>
        <span className="absolute right-4 top-4 rounded-full bg-white/85 px-3 py-1 text-[11px] font-medium uppercase tracking-wide text-faint ring-1 ring-line backdrop-blur">
          {study.category}
        </span>
        {study.href && (
          <ArrowUpRight
            size={18}
            className="absolute bottom-4 right-4 text-faint opacity-0 transition-opacity duration-300 group-hover:opacity-100"
            aria-hidden
          />
        )}
      </div>

      {/* Body */}
      <div className="flex flex-1 flex-col p-6">
        <p className="text-xs font-medium uppercase tracking-wider text-primary">
          {study.industry}
        </p>
        <h3 className="mt-1.5 font-display text-lg font-semibold text-heading">
          {study.client}
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-faint">{study.summary}</p>
      </div>
    </>
  );

  const isInternal = study.href?.startsWith("/");

  return (
    <motion.div variants={fadeUp} className="h-full">
      {isInternal ? (
        <Link to={study.href!} aria-label={`${study.client} case study`} className={cardClass}>
          {body}
        </Link>
      ) : study.href ? (
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
