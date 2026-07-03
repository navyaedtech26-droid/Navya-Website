import type { CSSProperties } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, BookOpen, Calendar, Clock, Sparkles } from "lucide-react";
import type { BlogPostSummary } from "@/services/blogs";
import { authorInitials, formatDate } from "@/lib/utils";
import { blogAccent } from "@/lib/blogAccent";

/**
 * Magazine-style headline spread for the newest post: a large cover on one
 * side, full title + excerpt on the other. Sits above the regular grid on
 * the unfiltered first page only (see Blog.tsx) so it reads as "today's
 * lead story," not just another card.
 */
export default function FeaturedPost({ post }: { post: BlogPostSummary }) {
  const accent = blogAccent(post.category);
  const style = { "--accent": accent.ink } as CSSProperties;

  return (
    <Link
      to={`/blog/${post.slug}`}
      data-cursor="hover"
      aria-label={post.title}
      style={style}
      className="group relative grid overflow-hidden rounded-3xl card-light transition-shadow duration-300 hover:shadow-card-hover lg:grid-cols-2"
    >
      {/* Cover */}
      <div className="relative h-64 overflow-hidden border-b border-line lg:h-full lg:border-b-0 lg:border-r">
        {post.cover_image ? (
          <img
            src={post.cover_image}
            alt=""
            loading="eager"
            decoding="async"
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div
            className="relative flex h-full w-full items-center justify-center"
            style={{ background: `linear-gradient(135deg, ${accent.tint}2E, ${accent.tint}08)` }}
          >
            <div aria-hidden className="absolute inset-0 light-grid opacity-70" />
            <BookOpen size={64} strokeWidth={1.2} aria-hidden style={{ color: `${accent.ink}55` }} />
          </div>
        )}

        <span className="absolute left-4 top-4 inline-flex items-center gap-1.5 rounded-full bg-white/90 px-3 py-1.5 text-xs font-semibold uppercase tracking-wide text-heading shadow-sm backdrop-blur">
          <Sparkles size={13} style={{ color: accent.ink }} />
          Latest article
        </span>
      </div>

      {/* Content */}
      <div className="flex flex-col justify-center p-8 sm:p-10 lg:p-12">
        <div className="flex items-center gap-3">
          {post.category && (
            <span
              className="inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wide"
              style={{ background: `${accent.tint}14`, color: accent.ink }}
            >
              {post.category}
            </span>
          )}
          {post.read_minutes != null && (
            <span className="inline-flex items-center gap-1.5 text-xs text-faint">
              <Clock size={13} />
              {post.read_minutes} min read
            </span>
          )}
        </div>

        <h2 className="mt-5 font-display text-2xl font-semibold leading-tight tracking-tight text-heading transition-colors group-hover:text-primary sm:text-3xl md:text-4xl">
          {post.title}
        </h2>

        {post.excerpt && (
          <p className="mt-4 line-clamp-3 max-w-xl text-base leading-relaxed text-faint">
            {post.excerpt}
          </p>
        )}

        <div className="mt-8 flex items-center justify-between gap-4">
          <div className="flex min-w-0 items-center gap-3">
            <span
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-xs font-bold tracking-wide"
              style={{ background: `${accent.tint}14`, color: accent.ink }}
            >
              {authorInitials(post.author)}
            </span>
            <div className="min-w-0">
              {post.author && (
                <p className="truncate text-sm font-medium text-heading">{post.author}</p>
              )}
              {post.published_at && (
                <p className="mt-0.5 inline-flex items-center gap-1 text-xs text-faint">
                  <Calendar size={12} />
                  {formatDate(post.published_at)}
                </p>
              )}
            </div>
          </div>

          <span className="inline-flex shrink-0 items-center gap-2 rounded-full bg-mist px-4 py-2.5 text-sm font-medium text-heading ring-1 ring-line transition-all duration-300 group-hover:bg-[var(--accent)] group-hover:text-white group-hover:ring-[var(--accent)]">
            Read article
            <ArrowRight size={15} className="transition-transform duration-300 group-hover:translate-x-0.5" />
          </span>
        </div>
      </div>
    </Link>
  );
}
