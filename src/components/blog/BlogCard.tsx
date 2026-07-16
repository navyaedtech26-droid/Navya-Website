import type { CSSProperties } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, BookOpen, Calendar, Clock } from "lucide-react";
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
      className="group relative flex h-full flex-col overflow-hidden bg-paper border border-line transition-colors duration-300 hover:border-heading focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60"
    >
      {/* Category spine — a permanent colour cue, not just a hover flourish. */}
      <span aria-hidden className="absolute inset-x-0 top-0 z-10 h-1" style={{ background: accent.ink }} />

      {/* Cover: the post's image, or a branded gradient standing in for one. */}
      <div className="relative h-48 overflow-hidden border-b border-line sm:h-56">
        {post.cover_image ? (
          <img
            src={post.cover_image}
            alt=""
            loading="lazy"
            decoding="async"
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
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
        <div className="absolute inset-x-0 top-0 flex items-start justify-between gap-2 p-4">
          {post.category ? (
            <span
              className="inline-flex items-center bg-paper px-3 py-1 text-[0.6875rem] font-bold uppercase tracking-widest shadow-sm border border-line"
              style={{ color: accent.ink }}
            >
              {post.category}
            </span>
          ) : (
            <span />
          )}
          {post.read_minutes != null && (
            <span className="inline-flex shrink-0 items-center gap-1.5 bg-paper px-2.5 py-1 text-[0.6875rem] font-bold uppercase tracking-widest text-faint shadow-sm border border-line">
              <Clock size={12} />
              {post.read_minutes} min
            </span>
          )}
        </div>
      </div>

      {/* Body */}
      <div className="flex flex-1 flex-col p-6 sm:p-8">
        <h3 className="font-display text-xl font-semibold leading-snug tracking-tight text-heading transition-colors group-hover:text-primary">
          {post.title}
        </h3>

        {post.excerpt && (
          <p className="mt-4 line-clamp-3 flex-1 text-sm leading-relaxed text-faint">
            {post.excerpt}
          </p>
        )}

        {/* Footer: author + date, with a text read more link */}
        <div className="mt-8 flex items-end justify-between gap-4 border-t border-line pt-6">
          <div className="flex min-w-0 items-center gap-3">
            <span
              className="flex h-10 w-10 shrink-0 items-center justify-center text-xs font-bold tracking-wide border border-line"
              style={{ background: `${accent.tint}14`, color: accent.ink }}
            >
              {authorInitials(post.author)}
            </span>
            <div className="min-w-0">
              {post.author && (
                <p className="truncate text-[0.6875rem] font-bold uppercase tracking-widest text-heading">{post.author}</p>
              )}
              {post.published_at && (
                <p className="mt-1 flex items-center gap-1 text-[0.625rem] font-bold uppercase tracking-widest text-faint">
                  <Calendar size={12} />
                  {formatDate(post.published_at)}
                </p>
              )}
            </div>
          </div>

          <span 
            className="flex items-center gap-1.5 text-[0.6875rem] font-bold uppercase tracking-widest shrink-0 transition-colors group-hover:text-heading" 
            style={{ color: accent.ink }}
          >
            Read More <ArrowRight size={14} className="transition-transform duration-300 group-hover:translate-x-1" />
          </span>
        </div>
      </div>
    </Link>
  );
}
