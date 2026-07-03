import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft, Calendar, Clock } from "lucide-react";
import Seo from "@/components/common/Seo";
import PageTransition from "@/components/effects/PageTransition";
import Container from "@/components/common/Container";
import CTASection from "@/components/common/CTASection";
import Reveal from "@/components/effects/Reveal";
import BlogCard from "@/components/blog/BlogCard";
import Markdown from "@/components/blog/Markdown";
import ArticleAside from "@/components/blog/ArticleAside";
import { LoadingScreen } from "@/components/common/Spinner";
import { useAsync } from "@/hooks/useAsync";
import {
  getPostBySlug,
  getRelatedPosts,
  type BlogPostSummary,
} from "@/services/blogs";
import { articleSchema, breadcrumbSchema, SITE_URL } from "@/lib/structuredData";
import { formatDate } from "@/lib/utils";

export default function BlogPostPage() {
  const { slug = "" } = useParams();
  const { data: post, loading } = useAsync(() => getPostBySlug(slug), [slug]);
  const [related, setRelated] = useState<BlogPostSummary[]>([]);

  // Pull related posts once the article resolves (and reset when it's gone).
  useEffect(() => {
    if (!post) {
      setRelated([]);
      return;
    }
    let active = true;
    getRelatedPosts(post).then((rows) => active && setRelated(rows));
    return () => {
      active = false;
    };
  }, [post]);

  if (loading) {
    return (
      <PageTransition>
        <LoadingScreen />
      </PageTransition>
    );
  }

  if (!post) {
    return (
      <PageTransition>
        <Seo
          title="Article Not Found | Navya EdTech"
          description="This article could not be found."
          path={`/blog/${slug}`}
          index={false}
        />
        <Container className="flex min-h-[60svh] flex-col items-center justify-center py-32 text-center">
          <h1 className="font-display text-3xl font-semibold text-heading">
            Article not found
          </h1>
          <p className="mt-3 text-faint">
            This post may have been moved or unpublished.
          </p>
          <Link
            to="/blog"
            className="mt-7 inline-flex items-center gap-2 rounded-xl border border-line bg-white px-5 py-2.5 text-sm font-medium text-heading shadow-sm transition-colors hover:bg-mist"
          >
            <ArrowLeft size={16} />
            Back to blog
          </Link>
        </Container>
      </PageTransition>
    );
  }

  return (
    <PageTransition>
      <Seo
        title={`${post.title} | Navya EdTech`}
        description={post.excerpt ?? post.title}
        path={`/blog/${post.slug}`}
        type="article"
        image={post.cover_image ?? undefined}
        imageAlt={post.title}
        article={{
          publishedTime: post.published_at,
          modifiedTime: post.updated_at ?? post.published_at,
          author: post.author,
          section: post.category,
          tags: post.tags,
        }}
        jsonLd={[
          articleSchema(post),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Blog", path: "/blog" },
            { name: post.title, path: `/blog/${post.slug}` },
          ]),
        ]}
      />

      <article className="relative pb-12 pt-28">
        <div className="absolute left-1/2 top-0 h-72 w-72 -translate-x-1/2 rounded-full bg-primary/[0.07] blur-[120px]" />
        <Container className="relative max-w-5xl">
          <Link
            to="/blog"
            data-cursor="hover"
            className="inline-flex items-center gap-2 text-sm font-medium text-faint transition-colors hover:text-heading"
          >
            <ArrowLeft size={16} />
            All articles
          </Link>

          <header className="mt-6">
            {post.category && (
              <Link
                to={`/blog?category=${encodeURIComponent(post.category)}`}
                data-cursor="hover"
                className="rounded-full border border-line bg-white px-3 py-1 text-xs font-medium text-primary shadow-sm transition-colors hover:text-primary-dark"
              >
                {post.category}
              </Link>
            )}
            <h1 className="mt-5 font-display text-3xl font-semibold leading-tight tracking-tight text-heading sm:text-4xl md:text-5xl">
              {post.title}
            </h1>
            <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-faint">
              {post.author && <span>By {post.author}</span>}
              {post.published_at && (
                <span className="inline-flex items-center gap-1.5">
                  <Calendar size={14} />
                  {formatDate(post.published_at)}
                </span>
              )}
              {post.read_minutes != null && (
                <span className="inline-flex items-center gap-1.5">
                  <Clock size={14} />
                  {post.read_minutes} min read
                </span>
              )}
            </div>
          </header>

          {/* Editorial two-column body: readable prose on the left, a sticky
              rail (share / topics / CTA) on the right that fills the width on
              wide screens. On mobile the rail stacks below the article. */}
          <div className="mt-10 grid grid-cols-1 gap-x-12 gap-y-12 lg:grid-cols-[minmax(0,1fr)_15rem]">
            {/* min-w-0 lets wide code blocks / tables scroll inside their own
                track instead of stretching the grid column. */}
            <div className="min-w-0">
              {post.content ? (
                <Markdown content={post.content} />
              ) : (
                <p className="text-faint">{post.excerpt}</p>
              )}
            </div>

            <ArticleAside
              url={`${SITE_URL}/blog/${post.slug}`}
              title={post.title}
              tags={post.tags}
            />
          </div>
        </Container>
      </article>

      {related.length > 0 && (
        <section className="relative py-12">
          <Container className="max-w-5xl">
            <h2 className="mb-8 font-display text-2xl font-semibold text-heading">
              Related articles
            </h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((item, i) => (
                <Reveal key={item.id} delay={i * 0.05}>
                  <BlogCard post={item} />
                </Reveal>
              ))}
            </div>
          </Container>
        </section>
      )}

      <CTASection
        title="Like What You're Reading?"
        subtitle="Let's build something just as thoughtful for your business."
        buttonLabel="Get in Touch"
      />
    </PageTransition>
  );
}
