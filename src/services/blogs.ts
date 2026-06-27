/**
 * Blog posts. Public reads are limited to published rows by RLS.
 */
import { supabase, isSupabaseConfigured } from "@/lib/supabase";
import type { BlogPostRow } from "@/types/database";

export type BlogPost = BlogPostRow;

/** A trimmed shape for listing pages (no heavy `content`). */
export type BlogPostSummary = Omit<BlogPost, "content">;

const LIST_COLUMNS =
  "id, slug, title, excerpt, cover_image, author, category, tags, status, read_minutes, published_at, created_at, updated_at";

/**
 * Published posts, newest first. Returns `[]` if Supabase is not configured.
 *
 * The default cap is a deliberate ceiling: the Blog page filters and paginates
 * this set in the browser (see `Blog.tsx`), which is ideal for a marketing-site
 * volume. If the catalogue ever approaches this many posts, move search and
 * pagination server-side (`.range()` + a count) rather than just raising it.
 */
export async function getPublishedPosts(limit = 200): Promise<BlogPostSummary[]> {
  if (!isSupabaseConfigured || !supabase) return [];

  const { data, error } = await supabase
    .from("blog_posts")
    .select(LIST_COLUMNS)
    .eq("status", "published")
    .order("published_at", { ascending: false })
    .limit(limit);

  if (error) {
    console.error("[blogs] list failed:", error.message);
    return [];
  }
  return (data ?? []) as BlogPostSummary[];
}

/**
 * Posts related to `post`, ranked by shared category and tags. Pulls a small
 * pool of recent published posts and scores them in the browser — plenty for a
 * marketing-site blog and avoids a bespoke SQL function.
 */
export async function getRelatedPosts(
  post: Pick<BlogPost, "id" | "category" | "tags">,
  limit = 3
): Promise<BlogPostSummary[]> {
  if (!isSupabaseConfigured || !supabase) return [];

  const { data, error } = await supabase
    .from("blog_posts")
    .select(LIST_COLUMNS)
    .eq("status", "published")
    .neq("id", post.id)
    .order("published_at", { ascending: false })
    .limit(30);

  if (error) {
    console.error("[blogs] related failed:", error.message);
    return [];
  }

  const tags = new Set((post.tags ?? []).map((t) => t.toLowerCase()));
  const scored = (data ?? []).map((candidate) => {
    let score = 0;
    if (post.category && candidate.category === post.category) score += 3;
    for (const tag of candidate.tags ?? []) {
      if (tags.has(tag.toLowerCase())) score += 1;
    }
    return { candidate, score };
  });

  return scored
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((s) => s.candidate) as BlogPostSummary[];
}

/** A single published post by slug, or `null` if not found / not configured. */
export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  if (!isSupabaseConfigured || !supabase) return null;

  const { data, error } = await supabase
    .from("blog_posts")
    .select("*")
    .eq("slug", slug)
    .eq("status", "published")
    .maybeSingle();

  if (error) {
    console.error("[blogs] getBySlug failed:", error.message);
    return null;
  }
  return data;
}
