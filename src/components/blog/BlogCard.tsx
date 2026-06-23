import { Link } from "react-router-dom";
import { ArrowUpRight, Calendar, Clock } from "lucide-react";
import type { BlogPostSummary } from "@/services/blogs";
import { formatDate } from "@/lib/utils";

export default function BlogCard({ post }: { post: BlogPostSummary }) {
  return (
    <Link
      to={`/blog/${post.slug}`}
      data-cursor="hover"
      className="group flex flex-col overflow-hidden rounded-3xl glass ring-1 ring-white/10 transition-all duration-300 hover:-translate-y-1 hover:shadow-glow"
    >
      <div className="relative aspect-[16/9] overflow-hidden bg-gradient-to-br from-brand/20 to-cyan-accent/5">
        {post.cover_image ? (
          <img
            src={post.cover_image}
            alt={post.title}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="absolute inset-0 grid-bg opacity-30" />
        )}
        {post.category && (
          <span className="absolute left-4 top-4 rounded-full glass px-3 py-1 text-xs font-medium text-brand-light ring-1 ring-white/10">
            {post.category}
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col p-6">
        <div className="flex items-center gap-4 text-xs text-ink-muted">
          {post.published_at && (
            <span className="inline-flex items-center gap-1.5">
              <Calendar size={13} />
              {formatDate(post.published_at)}
            </span>
          )}
          {post.read_minutes != null && (
            <span className="inline-flex items-center gap-1.5">
              <Clock size={13} />
              {post.read_minutes} min read
            </span>
          )}
        </div>

        <h3 className="mt-3 font-display text-lg font-semibold leading-snug text-ink transition-colors group-hover:text-brand-light">
          {post.title}
        </h3>

        {post.excerpt && (
          <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-ink-muted">
            {post.excerpt}
          </p>
        )}

        <span className="mt-5 inline-flex items-center gap-1 text-sm font-medium text-brand-light">
          Read article
          <ArrowUpRight
            size={15}
            className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
          />
        </span>
      </div>
    </Link>
  );
}
