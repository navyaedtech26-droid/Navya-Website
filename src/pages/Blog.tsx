import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { PenLine, Search, X, ChevronLeft, ChevronRight } from "lucide-react";
import Seo from "@/components/common/Seo";
import PageTransition from "@/components/effects/PageTransition";
import BlogHero from "@/components/heroes/BlogHero";
import Container from "@/components/common/Container";
import Reveal from "@/components/effects/Reveal";
import CTASection from "@/components/common/CTASection";
import BlogCard from "@/components/blog/BlogCard";
import BlogCardSkeleton from "@/components/blog/BlogCardSkeleton";
import { SkeletonGroup } from "@/components/common/Skeleton";
import { useAsync } from "@/hooks/useAsync";
import { getPublishedPosts, type BlogPostSummary } from "@/services/blogs";
import { breadcrumbSchema } from "@/lib/structuredData";
import { cn } from "@/lib/utils";

const PAGE_SIZE = 9;
const ALL = "All";
/** Stable empty reference so memoised filters don't re-run before posts load. */
const EMPTY_POSTS: BlogPostSummary[] = [];

export default function Blog() {
  const [searchParams] = useSearchParams();
  const { data, loading } = useAsync(() => getPublishedPosts(), []);
  const posts = data ?? EMPTY_POSTS;
  // Allow deep links from posts, e.g. /blog?category=Engineering or /blog?tag=react
  const [query, setQuery] = useState(searchParams.get("tag") ?? searchParams.get("q") ?? "");
  const [category, setCategory] = useState<string>(searchParams.get("category") ?? ALL);
  const [page, setPage] = useState(1);

  // Distinct categories present across published posts.
  const categories = useMemo(() => {
    const set = new Set<string>();
    posts.forEach((p) => p.category && set.add(p.category));
    return [ALL, ...[...set].sort((a, b) => a.localeCompare(b))];
  }, [posts]);

  // Apply search + category filters.
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return posts.filter((p) => {
      if (category !== ALL && p.category !== category) return false;
      if (!q) return true;
      const haystack = [p.title, p.excerpt, p.category, ...(p.tags ?? [])]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();
      return haystack.includes(q);
    });
  }, [posts, query, category]);

  // Reset to the first page whenever the result set changes.
  useEffect(() => {
    setPage(1);
  }, [query, category]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const current = Math.min(page, totalPages);
  const visible = filtered.slice((current - 1) * PAGE_SIZE, current * PAGE_SIZE);

  const hasPosts = posts.length > 0;

  return (
    <PageTransition>
      <Seo
        title="Blog | Navya EdTech"
        description="Insights on web development, performance, e-commerce, and business systems from the Navya EdTech team."
        path="/blog"
        jsonLd={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Blog", path: "/blog" },
        ])}
      />

      <BlogHero />

      <section className="relative py-12">
        <Container>
          {loading ? (
            <SkeletonGroup
              label="Loading articles…"
              className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
            >
              {Array.from({ length: 6 }).map((_, i) => (
                <BlogCardSkeleton key={i} />
              ))}
            </SkeletonGroup>
          ) : !hasPosts ? (
            <EmptyState />
          ) : (
            <>
              {/* Controls: search + category filter */}
              <div className="mb-8 flex flex-col gap-5">
                <div className="relative max-w-md">
                  <Search
                    size={16}
                    className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-ink-muted"
                  />
                  <input
                    type="search"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search articles…"
                    aria-label="Search articles"
                    className="w-full rounded-xl border border-white/10 bg-white/[0.03] py-3 pl-11 pr-10 text-sm text-ink placeholder:text-ink-muted/70 outline-none transition-all duration-200 focus:border-brand/60 focus:bg-white/[0.05] focus:shadow-[0_0_0_3px_rgba(245, 166, 35,0.18)]"
                  />
                  {query && (
                    <button
                      onClick={() => setQuery("")}
                      aria-label="Clear search"
                      className="absolute right-3 top-1/2 -translate-y-1/2 rounded-md p-1 text-ink-muted transition-colors hover:text-ink"
                    >
                      <X size={15} />
                    </button>
                  )}
                </div>

                {categories.length > 1 && (
                  <div className="flex flex-wrap gap-2">
                    {categories.map((cat) => (
                      <button
                        key={cat}
                        onClick={() => setCategory(cat)}
                        className={cn(
                          "rounded-full px-4 py-1.5 text-sm font-medium ring-1 transition-colors",
                          cat === category
                            ? "bg-brand/20 text-ink ring-brand/40"
                            : "bg-white/5 text-ink-muted ring-white/10 hover:text-ink"
                        )}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {visible.length === 0 ? (
                <NoResults onReset={() => { setQuery(""); setCategory(ALL); }} />
              ) : (
                <>
                  <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {visible.map((post, i) => (
                      <Reveal key={post.id} delay={i * 0.05}>
                        <BlogCard post={post} />
                      </Reveal>
                    ))}
                  </div>

                  {totalPages > 1 && (
                    <Pagination
                      page={current}
                      totalPages={totalPages}
                      onChange={setPage}
                    />
                  )}
                </>
              )}
            </>
          )}
        </Container>
      </section>

      <CTASection
        title="Have a Project in Mind?"
        subtitle="Tell us what you're building and we'll make it real."
        buttonLabel="Start the Conversation"
      />
    </PageTransition>
  );
}

function Pagination({
  page,
  totalPages,
  onChange,
}: {
  page: number;
  totalPages: number;
  onChange: (p: number) => void;
}) {
  return (
    <nav
      aria-label="Blog pagination"
      className="mt-12 flex items-center justify-center gap-2"
    >
      <PageButton
        disabled={page === 1}
        onClick={() => onChange(page - 1)}
        label="Previous page"
      >
        <ChevronLeft size={16} />
      </PageButton>

      {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
        <button
          key={n}
          onClick={() => onChange(n)}
          aria-current={n === page ? "page" : undefined}
          className={cn(
            "h-9 min-w-9 rounded-lg px-3 text-sm font-medium ring-1 transition-colors",
            n === page
              ? "bg-brand/20 text-ink ring-brand/40"
              : "bg-white/5 text-ink-muted ring-white/10 hover:text-ink"
          )}
        >
          {n}
        </button>
      ))}

      <PageButton
        disabled={page === totalPages}
        onClick={() => onChange(page + 1)}
        label="Next page"
      >
        <ChevronRight size={16} />
      </PageButton>
    </nav>
  );
}

function PageButton({
  children,
  disabled,
  onClick,
  label,
}: {
  children: React.ReactNode;
  disabled: boolean;
  onClick: () => void;
  label: string;
}) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      aria-label={label}
      className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/5 text-ink-muted ring-1 ring-white/10 transition-colors hover:text-ink disabled:cursor-not-allowed disabled:opacity-40"
    >
      {children}
    </button>
  );
}

function NoResults({ onReset }: { onReset: () => void }) {
  return (
    <div className="mx-auto flex max-w-md flex-col items-center rounded-3xl glass p-12 text-center ring-1 ring-white/10">
      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-brand/20 ring-1 ring-brand/40">
        <Search className="text-brand-light" />
      </div>
      <h3 className="mt-5 font-display text-xl font-semibold text-ink">No matches</h3>
      <p className="mt-2 text-sm text-ink-muted">
        No articles fit your search. Try different keywords or clear the filters.
      </p>
      <button
        onClick={onReset}
        className="mt-5 rounded-xl glass px-5 py-2.5 text-sm font-medium text-ink-muted transition-colors hover:text-ink"
      >
        Clear filters
      </button>
    </div>
  );
}

function EmptyState() {
  return (
    <div className="mx-auto flex max-w-md flex-col items-center rounded-3xl glass p-12 text-center ring-1 ring-white/10">
      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-brand/20 ring-1 ring-brand/40">
        <PenLine className="text-brand-light" />
      </div>
      <h3 className="mt-5 font-display text-xl font-semibold text-ink">
        No articles yet
      </h3>
      <p className="mt-2 text-sm text-ink-muted">
        We're working on our first posts. Check back soon for insights on web
        development and business systems.
      </p>
    </div>
  );
}
