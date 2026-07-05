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
import FeaturedPost from "@/components/blog/FeaturedPost";
import FeaturedPostSkeleton from "@/components/blog/FeaturedPostSkeleton";
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

  // The newest post leads as a headline spread — only on the unfiltered
  // first page, so search/category results don't lose a post to it.
  const showFeatured = !query.trim() && category === ALL && page === 1 && filtered.length > 0;
  const featuredPost = showFeatured ? filtered[0] : null;
  const gridPosts = featuredPost ? filtered.slice(1) : filtered;

  const totalPages = Math.max(1, Math.ceil(gridPosts.length / PAGE_SIZE));
  const current = Math.min(page, totalPages);
  const visible = gridPosts.slice((current - 1) * PAGE_SIZE, current * PAGE_SIZE);

  const hasPosts = posts.length > 0;

  return (
    <PageTransition>
      <Seo
        title="Blog | Navya EdTech"
        description="Insights on web development, performance, e-commerce, and business systems from the Navya EdTech team."
        keywords={[
          "web development blog",
          "e-commerce insights",
          "business systems blog",
          "website performance tips",
        ]}
        path="/blog"
        pageType="CollectionPage"
        jsonLd={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Blog", path: "/blog" },
        ])}
      />

      <BlogHero />

      <section className="relative py-12 sm:py-16">
        <Container>
          {loading ? (
            <div className="space-y-12">
              <FeaturedPostSkeleton />
              <SkeletonGroup
                label="Loading articles…"
                className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
              >
                {Array.from({ length: 6 }).map((_, i) => (
                  <BlogCardSkeleton key={i} />
                ))}
              </SkeletonGroup>
            </div>
          ) : !hasPosts ? (
            <EmptyState />
          ) : (
            <div className="space-y-12">
              {/* Headline spread for the newest post — first page, no filters. */}
              {featuredPost && (
                <Reveal>
                  <FeaturedPost post={featuredPost} />
                </Reveal>
              )}

              {(!showFeatured || gridPosts.length > 0) && (
                <div>
                  {/* Section heading + search */}
                  <div className="mb-8 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
                    <div>
                      <h2 className="font-display text-2xl font-semibold text-heading">
                        {showFeatured ? "More articles" : "All articles"}
                      </h2>
                      <p className="mt-1.5 text-sm text-faint">
                        {filtered.length} article{filtered.length === 1 ? "" : "s"}
                        {category !== ALL && (
                          <>
                            {" "}
                            in <span className="font-medium text-heading">{category}</span>
                          </>
                        )}
                      </p>
                    </div>

                    <div className="relative w-full sm:w-80">
                      <Search
                        size={16}
                        className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-faint"
                      />
                      <input
                        type="search"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="Search articles…"
                        aria-label="Search articles"
                        className="w-full rounded-xl border border-line bg-white py-3 pl-11 pr-10 text-sm text-heading placeholder:text-faint/70 outline-none transition-all duration-200 focus:border-primary/60 focus:shadow-[0_0_0_3px_rgba(8,30,77,0.15)]"
                      />
                      {query && (
                        <button
                          onClick={() => setQuery("")}
                          aria-label="Clear search"
                          className="absolute right-3 top-1/2 -translate-y-1/2 rounded-md p-1 text-faint transition-colors hover:text-heading"
                        >
                          <X size={15} />
                        </button>
                      )}
                    </div>
                  </div>

                  {categories.length > 1 && (
                    <div className="mb-8 flex flex-wrap gap-2">
                      {categories.map((cat) => (
                        <button
                          key={cat}
                          onClick={() => setCategory(cat)}
                          className={cn(
                            "rounded-full px-4 py-1.5 text-sm font-medium ring-1 transition-colors",
                            cat === category
                              ? "bg-primary/10 text-primary ring-primary/30"
                              : "bg-mist text-faint ring-line hover:text-heading"
                          )}
                        >
                          {cat}
                        </button>
                      ))}
                    </div>
                  )}

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
                </div>
              )}
            </div>
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
              ? "bg-primary/10 text-primary ring-primary/30"
              : "bg-mist text-faint ring-line hover:text-heading"
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
      className="flex h-9 w-9 items-center justify-center rounded-lg bg-mist text-faint ring-1 ring-line transition-colors hover:text-heading disabled:cursor-not-allowed disabled:opacity-40"
    >
      {children}
    </button>
  );
}

function NoResults({ onReset }: { onReset: () => void }) {
  return (
    <div className="mx-auto flex max-w-md flex-col items-center rounded-3xl card-light p-12 text-center">
      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 ring-1 ring-primary/30">
        <Search className="text-primary" />
      </div>
      <h3 className="mt-5 font-display text-xl font-semibold text-heading">No matches</h3>
      <p className="mt-2 text-sm text-faint">
        No articles fit your search. Try different keywords or clear the filters.
      </p>
      <button
        onClick={onReset}
        className="mt-5 rounded-xl border border-line bg-white px-5 py-2.5 text-sm font-medium text-heading shadow-sm transition-colors hover:bg-mist"
      >
        Clear filters
      </button>
    </div>
  );
}

function EmptyState() {
  return (
    <div className="mx-auto flex max-w-md flex-col items-center rounded-3xl card-light p-12 text-center">
      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 ring-1 ring-primary/30">
        <PenLine className="text-primary" />
      </div>
      <h3 className="mt-5 font-display text-xl font-semibold text-heading">
        No articles yet
      </h3>
      <p className="mt-2 text-sm text-faint">
        We're working on our first posts. Check back soon for insights on web
        development and business systems.
      </p>
    </div>
  );
}
