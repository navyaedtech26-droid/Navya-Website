/**
 * Deterministic category → brand accent, so the blog grid reads as
 * colour-coded sections at a glance instead of one flat blue everywhere.
 * Every value is drawn from the existing design-token palette (no off-brand
 * hues) — `tint` for low-alpha fills/gradients, `ink` (the darker variant)
 * for text/icons/spines where contrast on white matters.
 */
const PALETTE = [
  { tint: "#2563EB", ink: "#1D4ED8" }, // primary / blue
  { tint: "#6366F1", ink: "#4F46E5" }, // secondary / indigo
  { tint: "#F59E0B", ink: "#D97706" }, // accent / amber
] as const;

export type BlogAccent = (typeof PALETTE)[number];

export function blogAccent(category?: string | null): BlogAccent {
  if (!category) return PALETTE[0];
  let hash = 0;
  for (let i = 0; i < category.length; i++) {
    hash = (hash * 31 + category.charCodeAt(i)) >>> 0;
  }
  return PALETTE[hash % PALETTE.length];
}
