import { describe, it, expect, beforeEach, vi } from "vitest";
import { getPublishedPosts, getRelatedPosts, getPostBySlug } from "@/services/blogs";

// A controllable Supabase stub: every query-builder method chains, and awaiting
// the chain resolves to whatever result we've staged for that table.
const h = vi.hoisted(() => {
  const state = {
    tables: {} as Record<string, { data: unknown; error: unknown }>,
  };
  const chain = (result: { data: unknown; error: unknown }) => {
    const b: Record<string, unknown> = {};
    for (const m of [
      "select",
      "eq",
      "neq",
      "is",
      "order",
      "limit",
      "single",
      "maybeSingle",
    ]) {
      b[m] = () => b;
    }
    (b as { then: unknown }).then = (res: (v: unknown) => unknown, rej: (e: unknown) => unknown) =>
      Promise.resolve(result).then(res, rej);
    return b;
  };
  return { state, chain };
});

vi.mock("@/lib/supabase", () => ({
  isSupabaseConfigured: true,
  supabase: {
    from: (t: string) => h.chain(h.state.tables[t] ?? { data: [], error: null }),
  },
}));

const setPosts = (data: unknown, error: unknown = null) => {
  h.state.tables["blog_posts"] = { data, error };
};

beforeEach(() => {
  h.state.tables = {};
});

describe("getPublishedPosts", () => {
  it("returns the rows on success", async () => {
    setPosts([{ id: "1", slug: "a" }]);
    const posts = await getPublishedPosts();
    expect(posts).toHaveLength(1);
    expect(posts[0].slug).toBe("a");
  });

  it("returns [] for an empty catalogue", async () => {
    setPosts([]);
    expect(await getPublishedPosts()).toEqual([]);
  });

  it("returns [] on a query error", async () => {
    setPosts(null, { message: "boom" });
    expect(await getPublishedPosts()).toEqual([]);
  });
});

describe("getRelatedPosts — scoring", () => {
  const post = { id: "p1", category: "Dev", tags: ["react", "ts"] };

  it("ranks by shared category (+3) and shared tags (+1 each), respecting limit", async () => {
    setPosts([
      { id: "c1", category: "Dev", tags: ["react"] }, // 3 + 1 = 4
      { id: "c2", category: "Design", tags: ["react", "ts"] }, // 0 + 2 = 2
      { id: "c3", category: "Dev", tags: [] }, // 3
      { id: "c4", category: "Design", tags: [] }, // 0
    ]);
    const related = await getRelatedPosts(post, 3);
    expect(related.map((p) => p.id)).toEqual(["c1", "c3", "c2"]);
  });

  it("matches tags case-insensitively", async () => {
    setPosts([
      { id: "x", category: "Other", tags: ["React", "TS"] }, // 2 via case-insensitive
      { id: "y", category: "Other", tags: [] }, // 0
    ]);
    const related = await getRelatedPosts(post, 1);
    expect(related[0].id).toBe("x");
  });

  it("handles a post with no tags/category and an empty pool", async () => {
    setPosts([]);
    expect(await getRelatedPosts({ id: "p1", category: null, tags: null }, 3)).toEqual([]);
  });

  it("returns [] on a query error", async () => {
    setPosts(null, { message: "boom" });
    expect(await getRelatedPosts(post)).toEqual([]);
  });
});

describe("getPostBySlug", () => {
  it("returns the post when found", async () => {
    setPosts({ id: "1", slug: "hello" });
    const found = await getPostBySlug("hello");
    expect(found?.slug).toBe("hello");
  });

  it("returns null on error", async () => {
    setPosts(null, { message: "boom" });
    expect(await getPostBySlug("hello")).toBeNull();
  });
});
