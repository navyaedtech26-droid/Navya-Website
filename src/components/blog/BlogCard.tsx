import { Link } from "react-router-dom";
import { ArrowUpRight, Calendar, Clock } from "lucide-react";
import type { BlogPostSummary } from "@/services/blogs";
import { formatDate } from "@/lib/utils";

/** Two-letter monogram from the author name (fallback: brand initials). */
function initials(name?: string | null): string {
  if (!name) return "NE";
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return "NE";
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

export default function BlogCard({ post }: { post: BlogPostSummary }) {
  return (
    <Link
      to={`/blog/${post.slug}`}
      data-cursor="hover"
      aria-label={post.title}
      className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.02] p-6 transition-all duration-300 hover:-translate-y-1 hover:border-brand/40 hover:bg-white/[0.04] hover:shadow-glow focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/60 sm:p-7"
    >
      {/* Decorative corner glow — brightens on hover, no empty media box */}
      <span
        aria-hidden
        className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-brand/10 opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-100"
      />
      {/* Top accent bar wipes in on hover */}
      <span
        aria-hidden
        className="absolute inset-x-0 top-0 h-0.5 origin-left scale-x-0 bg-brand-gradient transition-transform duration-300 group-hover:scale-x-100"
      />

      {/* Eyebrow: category + read time */}
      <div className="relative flex items-center justify-between gap-3">
        {post.category ? (
          <span className="inline-flex items-center rounded-full bg-brand/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-brand-light ring-1 ring-brand/25">
            {post.category}
          </span>
        ) : (
          <span />
        )}
        {post.read_minutes != null && (
          <span className="inline-flex shrink-0 items-center gap-1.5 text-xs text-ink-muted">
            <Clock size={13} />
            {post.read_minutes} min read
          </span>
        )}
      </div>

      {/* Title */}
      <h3 className="relative mt-5 font-display text-xl font-semibold leading-snug tracking-tight text-ink transition-colors group-hover:text-brand-light">
        {post.title}
      </h3>

      {/* Excerpt — flex-1 pushes the footer to the bottom for equal-height cards */}
      {post.excerpt && (
        <p className="relative mt-3 line-clamp-3 flex-1 text-sm leading-relaxed text-ink-muted">
          {post.excerpt}
        </p>
      )}

      {/* Footer: author + date, with an arrow affordance */}
      <div className="relative mt-6 flex items-center justify-between gap-3 border-t border-white/[0.08] pt-5">
        <div className="flex min-w-0 items-center gap-3">
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-brand/15 text-[11px] font-bold tracking-wide text-brand-light ring-1 ring-brand/30">
            {initials(post.author)}
          </span>
          <div className="min-w-0">
            {post.author && (
              <p className="truncate text-xs font-medium text-ink">{post.author}</p>
            )}
            {post.published_at && (
              <p className="mt-0.5 inline-flex items-center gap-1 text-xs text-ink-muted">
                <Calendar size={12} />
                {formatDate(post.published_at)}
              </p>
            )}
          </div>
        </div>

        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/5 text-ink-muted ring-1 ring-white/10 transition-all duration-300 group-hover:bg-brand group-hover:text-white group-hover:ring-brand">
          <ArrowUpRight
            size={16}
            className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
          />
        </span>
      </div>
    </Link>
  );
}
