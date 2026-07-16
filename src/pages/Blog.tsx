import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { PenLine, Search, ChevronLeft, ChevronRight } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import Seo from "@/components/common/Seo";
import PageTransition from "@/components/effects/PageTransition";
import BlogHero from "@/components/heroes/BlogHero";
import Container from "@/components/common/Container";
import Reveal from "@/components/effects/Reveal";
import CTASection from "@/components/common/CTASection";
import BlogCard from "@/components/blog/BlogCard";
import BlogCardSkeleton from "@/components/blog/BlogCardSkeleton";
import FeaturedPostSkeleton from "@/components/blog/FeaturedPostSkeleton";
import NewsletterCTA from "@/components/blog/NewsletterCTA";
import { SkeletonGroup } from "@/components/common/Skeleton";
import { useAsync } from "@/hooks/useAsync";
import { getPublishedPosts, type BlogPostSummary } from "@/services/blogs";
import { breadcrumbSchema } from "@/lib/structuredData";
import { cn } from "@/lib/utils";

const PAGE_SIZE = 9;
const ALL = "All";

const PREDEFINED_CATEGORIES = [
  ALL,
  "AI",
  "Web Development",
  "Mobile",
  "Cloud",
  "DevOps",
  "UI/UX",
  "Business",
  "Case Studies"
];

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

  const gridPosts = filtered;
  
  const totalPages = Math.max(1, Math.ceil(gridPosts.length / PAGE_SIZE));
  const current = Math.min(page, totalPages);
  const visible = gridPosts.slice((current - 1) * PAGE_SIZE, current * PAGE_SIZE);
  
  const showNewsletter = page === 1 && visible.length > 0;
  const firstRow = visible.slice(0, 3);
  const remainingRows = visible.slice(3);

  const hasPosts = posts.length > 0;

  return (
    <PageTransition>
      <Seo
        title="Insights | Navya EdTech"
        description="Perspectives on web development, performance, e-commerce, and building systems that scale."
        keywords={[
          "web development blog",
          "e-commerce insights",
          "software architecture",
          "website performance tips",
        ]}
        path="/blog"
        pageType="CollectionPage"
        jsonLd={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Insights", path: "/blog" },
        ])}
      />

      <BlogHero 
        query={query} 
        onQueryChange={setQuery}
        categories={PREDEFINED_CATEGORIES}
        category={category}
        onCategoryChange={setCategory}
      />

      <section className="relative py-12 sm:py-16">
        <Container>
          {loading ? (
            <div className="space-y-12">
              <FeaturedPostSkeleton />
              <SkeletonGroup
                label="Loading articles…"
                className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
              >
                {Array.from({ length: 6 }).map((_, i) => (
                  <BlogCardSkeleton key={i} />
                ))}
              </SkeletonGroup>
            </div>
          ) : !hasPosts ? (
            <EmptyState />
          ) : (
            <div className="space-y-16">
              {gridPosts.length >= 0 && (
                <div>
                  <div className="mb-8 flex items-baseline justify-between gap-4 border-b border-line pb-4">
                    <h2 className="font-display text-2xl font-semibold text-heading">
                      Latest Articles
                    </h2>
                    <p className="text-sm font-medium uppercase tracking-widest text-faint">
                      {filtered.length} article{filtered.length === 1 ? "" : "s"}
                    </p>
                  </div>

                  {visible.length === 0 ? (
                    <NoResults onReset={() => { setQuery(""); setCategory(ALL); }} />
                  ) : (
                    <>
                      <motion.div layout className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        <AnimatePresence mode="popLayout">
                          {firstRow.map((post, i) => (
                            <motion.div 
                              key={post.id}
                              layout
                              initial={{ opacity: 0, scale: 0.95 }}
                              animate={{ opacity: 1, scale: 1 }}
                              exit={{ opacity: 0, scale: 0.9 }}
                              transition={{ duration: 0.3, ease: "easeOut", delay: i * 0.05 }}
                            >
                              <BlogCard post={post} />
                            </motion.div>
                          ))}
                        </AnimatePresence>
                      </motion.div>
                      
                      {showNewsletter && (
                        <Reveal className="my-16">
                          <NewsletterCTA />
                        </Reveal>
                      )}

                      {remainingRows.length > 0 && (
                        <motion.div layout className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                          <AnimatePresence mode="popLayout">
                            {remainingRows.map((post, i) => (
                              <motion.div 
                                key={post.id}
                                layout
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                transition={{ duration: 0.3, ease: "easeOut", delay: i * 0.05 }}
                              >
                                <BlogCard post={post} />
                              </motion.div>
                            ))}
                          </AnimatePresence>
                        </motion.div>
                      )}

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
        primaryButtonLabel="Start the Conversation"
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
      className="mt-16 flex items-center justify-center gap-2 border-t border-line pt-8"
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
            "h-10 min-w-10 rounded-none border px-3 text-sm font-semibold transition-colors",
            n === page
              ? "bg-brand text-white border-brand"
              : "bg-paper text-heading border-line hover:border-heading"
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
      className="flex h-10 w-10 items-center justify-center bg-paper text-heading border border-line transition-colors hover:border-heading disabled:cursor-not-allowed disabled:opacity-40"
    >
      {children}
    </button>
  );
}

function NoResults({ onReset }: { onReset: () => void }) {
  return (
    <div className="mx-auto flex max-w-md flex-col items-center bg-mist border border-line p-12 text-center">
      <div className="flex h-14 w-14 items-center justify-center bg-white border border-line">
        <Search className="text-brand" />
      </div>
      <h3 className="mt-6 font-display text-2xl font-semibold text-heading">No matches found</h3>
      <p className="mt-3 text-base text-faint">
        We couldn't find any articles matching your criteria.
      </p>
      <button
        onClick={onReset}
        className="mt-8 border border-line bg-white px-6 py-3 text-sm font-semibold uppercase tracking-widest text-heading transition-colors hover:border-heading"
      >
        Clear filters
      </button>
    </div>
  );
}

function EmptyState() {
  return (
    <div className="mx-auto flex max-w-md flex-col items-center bg-mist border border-line p-12 text-center">
      <div className="flex h-14 w-14 items-center justify-center bg-white border border-line">
        <PenLine className="text-brand" />
      </div>
      <h3 className="mt-6 font-display text-2xl font-semibold text-heading">
        No articles yet
      </h3>
      <p className="mt-3 text-base text-faint">
        We're working on our first publications. Check back soon for insights on web development and architecture.
      </p>
    </div>
  );
}
