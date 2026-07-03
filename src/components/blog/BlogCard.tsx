import type { CSSProperties } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight, BookOpen, Calendar, Clock } from "lucide-react";
import type { BlogPostSummary } from "@/services/blogs";
import { authorInitials, formatDate } from "@/lib/utils";
import { blogAccent } from "@/lib/blogAccent";

export default function BlogCard({ post }: { post: BlogPostSummary }) {
  const accent = blogAccent(post.category);
  const style = { "--accent": accent.ink } as CSSProperties;

  return (
    <Link
      to={`/blog/${post.slug}`}
      data-cursor="hover"
      aria-label={post.title}
      style={style}
      className="group relative flex h-full flex-col overflow-hidden rounded-2xl card-light transition-all duration-300 hover:-translate-y-1 hover:shadow-card-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60"
    >
      {/* Category spine — a permanent colour cue, not just a hover flourish. */}
      <span aria-hidden className="absolute inset-x-0 top-0 z-10 h-1" style={{ background: accent.ink }} />

      {/* Cover: the post's image, or a branded gradient standing in for one. */}
      <div className="relative h-44 overflow-hidden border-b border-line sm:h-48">
        {post.cover_image ? (
          <img
            src={post.cover_image}
            alt=""
            loading="lazy"
            decoding="async"
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div
            className="relative flex h-full w-full items-center justify-center"
            style={{ background: `linear-gradient(135deg, ${accent.tint}26, ${accent.tint}06)` }}
          >
            <div aria-hidden className="absolute inset-0 light-grid opacity-70" />
            <BookOpen size={36} strokeWidth={1.5} aria-hidden style={{ color: `${accent.ink}55` }} />
          </div>
        )}

        {/* Eyebrow chips float over the cover. */}
        <div className="absolute inset-x-0 top-0 flex items-start justify-between gap-2 p-3.5">
          {post.category ? (
            <span
              className="inline-flex items-center rounded-full bg-white/90 px-3 py-1 text-xs font-semibold uppercase tracking-wide shadow-sm backdrop-blur"
              style={{ color: accent.ink }}
            >
              {post.category}
            </span>
          ) : (
            <span />
          )}
          {post.read_minutes != null && (
            <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-white/90 px-2.5 py-1 text-xs text-faint shadow-sm backdrop-blur">
              <Clock size={12} />
              {post.read_minutes} min
            </span>
          )}
        </div>
      </div>

      {/* Body */}
      <div className="flex flex-1 flex-col p-6 sm:p-7">
        <h3 className="font-display text-xl font-semibold leading-snug tracking-tight text-heading transition-colors group-hover:text-primary">
          {post.title}
        </h3>

        {post.excerpt && (
          <p className="mt-3 line-clamp-3 flex-1 text-sm leading-relaxed text-faint">
            {post.excerpt}
          </p>
        )}

        {/* Footer: author + date, with an arrow affordance */}
        <div className="mt-6 flex items-center justify-between gap-3 border-t border-line pt-5">
          <div className="flex min-w-0 items-center gap-3">
            <span
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-[11px] font-bold tracking-wide"
              style={{ background: `${accent.tint}14`, color: accent.ink }}
            >
              {authorInitials(post.author)}
            </span>
            <div className="min-w-0">
              {post.author && (
                <p className="truncate text-xs font-medium text-heading">{post.author}</p>
              )}
              {post.published_at && (
                <p className="mt-0.5 inline-flex items-center gap-1 text-xs text-faint">
                  <Calendar size={12} />
                  {formatDate(post.published_at)}
                </p>
              )}
            </div>
          </div>

          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-mist text-faint ring-1 ring-line transition-all duration-300 group-hover:bg-[var(--accent)] group-hover:text-white group-hover:ring-[var(--accent)]">
            <ArrowUpRight
              size={16}
              className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </span>
        </div>
      </div>
    </Link>
  );
}
