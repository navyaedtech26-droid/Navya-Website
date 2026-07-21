/**
 * Case-study accent → static Tailwind class bundle.
 *
 * Every class below must appear as a literal string somewhere in this file —
 * Tailwind's JIT scanner only picks up classes it can find as complete
 * substrings in source, so building them with `` `bg-${accent}-500/10` ``
 * template literals (the old approach) silently produces unstyled markup in
 * the production build. Keying off a static lookup keeps the exact same
 * palette while staying scanner-safe.
 */
const ACCENTS = {
  blue: {
    bg5: "bg-blue-500/5",
    bg10: "bg-blue-500/10",
    bg20: "bg-blue-500/20",
    border20: "border-blue-500/20",
    text: "text-blue-500",
    from20: "from-blue-500/20",
  },
  cyan: {
    bg5: "bg-cyan-500/5",
    bg10: "bg-cyan-500/10",
    bg20: "bg-cyan-500/20",
    border20: "border-cyan-500/20",
    text: "text-cyan-500",
    from20: "from-cyan-500/20",
  },
  violet: {
    bg5: "bg-violet-500/5",
    bg10: "bg-violet-500/10",
    bg20: "bg-violet-500/20",
    border20: "border-violet-500/20",
    text: "text-violet-500",
    from20: "from-violet-500/20",
  },
  rose: {
    bg5: "bg-rose-500/5",
    bg10: "bg-rose-500/10",
    bg20: "bg-rose-500/20",
    border20: "border-rose-500/20",
    text: "text-rose-500",
    from20: "from-rose-500/20",
  },
  amber: {
    bg5: "bg-amber-500/5",
    bg10: "bg-amber-500/10",
    bg20: "bg-amber-500/20",
    border20: "border-amber-500/20",
    text: "text-amber-500",
    from20: "from-amber-500/20",
  },
} as const;

type CaseStudyAccent = keyof typeof ACCENTS;
export type AccentClasses = (typeof ACCENTS)[CaseStudyAccent];

/** Falls back to `blue` (the admin form's default) for unrecognized/legacy values. */
export function getAccentClasses(accent?: string | null): AccentClasses {
  return ACCENTS[accent as CaseStudyAccent] ?? ACCENTS.blue;
}
