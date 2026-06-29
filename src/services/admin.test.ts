import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import {
  getOverviewCharts,
  getDashboardStats,
  listContacts,
  setContactStatus,
  deleteContact,
  getRecentContacts,
  listBlogPosts,
  createBlogPost,
  updateBlogPost,
  deleteBlogPost,
  listTestimonials,
  createTestimonial,
  updateTestimonial,
  deleteTestimonial,
  type BlogPostInput,
} from "@/services/admin";

// Controllable Supabase stub (see blogs.test.ts for the same pattern), plus an
// `rpc` whose result we can stage to exercise both the RPC and fallback paths.
const h = vi.hoisted(() => {
  const state = {
    tables: {} as Record<string, { data?: unknown; error?: unknown; count?: number }>,
    rpc: { data: null as unknown, error: { message: "no rpc" } as unknown },
  };
  const chain = (result: unknown) => {
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
      "update",
      "insert",
      "delete",
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
    rpc: () => Promise.resolve(h.state.rpc),
  },
}));

const setTable = (t: string, result: { data?: unknown; error?: unknown; count?: number }) => {
  h.state.tables[t] = result;
};

beforeEach(() => {
  h.state.tables = {};
  h.state.rpc = { data: null, error: { message: "no rpc" } };
});

describe("getOverviewCharts — client-side fallback aggregation", () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date("2026-06-28T12:00:00")); // local noon, avoids tz day-shift
  });
  afterEach(() => vi.useRealTimers());

  it("buckets contacts by day, drops out-of-window rows, and aggregates the rest", async () => {
    setTable("contact_submissions", {
      data: [
        { created_at: "2026-06-28T09:00:00", status: "new", service: "Websites" },
        { created_at: "2026-06-28T15:00:00", status: "read", service: "Websites" },
        { created_at: "2026-06-27T10:00:00", status: "archived", service: "E-commerce" },
        { created_at: "2026-06-01T10:00:00", status: "new", service: "Old" }, // outside 7-day window
      ],
      error: null,
    });
    setTable("blog_posts", {
      data: [{ status: "published" }, { status: "draft" }, { status: "draft" }],
      error: null,
    });
    setTable("testimonials", {
      data: [{ rating: 5 }, { rating: 5 }, { rating: 3 }, { rating: 9 }, { rating: 0 }],
      error: null,
    });

    const { data, error } = await getOverviewCharts(7);
    expect(error).toBeUndefined();
    if (!data) throw new Error("expected data");

    // 7-day zero-filled, continuous window, oldest → newest.
    expect(data.contactsByDay).toHaveLength(7);
    const today = data.contactsByDay.at(-1)!;
    const yesterday = data.contactsByDay.at(-2)!;
    expect(today).toMatchObject({ date: "2026-06-28", count: 2 });
    expect(yesterday).toMatchObject({ date: "2026-06-27", count: 1 });
    // The 2026-06-01 row is older than the window, so the total is only 3.
    expect(data.contactsByDay.reduce((n, d) => n + d.count, 0)).toBe(3);

    // Status / service tallies count every returned row (they aren't gated by
    // the day window), so the out-of-window "new" row still shows up here.
    expect(data.contactsByStatus).toEqual({ new: 2, read: 1, archived: 1 });
    expect(data.contactsByService[0]).toEqual({ service: "Websites", count: 2 });
    expect(data.blogsByStatus).toEqual({ published: 1, draft: 2 });
    // Ratings clamp into 1..5: 9→5, 0→1.
    expect(data.testimonialsByRating).toEqual([1, 0, 1, 0, 3]);
  });

  it("caps the service breakdown at the top 6", async () => {
    setTable("contact_submissions", {
      data: Array.from({ length: 8 }, (_, i) => ({
        created_at: "2026-06-28T09:00:00",
        status: "new",
        service: `svc-${i}`,
      })),
      error: null,
    });
    setTable("blog_posts", { data: [], error: null });
    setTable("testimonials", { data: [], error: null });

    const { data } = await getOverviewCharts(7);
    expect(data?.contactsByService).toHaveLength(6);
  });

  it("surfaces a fallback query error", async () => {
    setTable("contact_submissions", { data: null, error: { message: "db down" } });
    setTable("blog_posts", { data: [], error: null });
    setTable("testimonials", { data: [], error: null });
    const { error } = await getOverviewCharts(7);
    expect(error).toBe("db down");
  });
});

describe("getOverviewCharts — RPC path", () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date("2026-06-28T12:00:00"));
  });
  afterEach(() => vi.useRealTimers());

  it("shapes the RPC payload into a zero-filled day series", async () => {
    h.state.rpc = {
      data: {
        contactsByDay: [{ date: "2026-06-28", count: 5 }],
        contactsByStatus: { new: 5, read: 0, archived: 0 },
        contactsByService: [{ service: "Websites", count: 5 }],
        blogsByStatus: { published: 2, draft: 1 },
        testimonialsByRating: [0, 0, 0, 1, 4],
      },
      error: null,
    };
    const { data } = await getOverviewCharts(7);
    expect(data?.contactsByDay).toHaveLength(7);
    expect(data?.contactsByDay.at(-1)).toMatchObject({ date: "2026-06-28", count: 5 });
    expect(data?.testimonialsByRating).toEqual([0, 0, 0, 1, 4]);
  });
});

describe("getDashboardStats", () => {
  it("reads exact counts per table", async () => {
    setTable("blog_posts", { count: 4, error: null });
    setTable("testimonials", { count: 7, error: null });
    setTable("contact_submissions", { count: 9, error: null });
    const { data, error } = await getDashboardStats();
    expect(error).toBeUndefined();
    expect(data).toMatchObject({ blogsTotal: 4, testimonialsTotal: 7, contactsTotal: 9 });
  });

  it("surfaces the first error", async () => {
    setTable("blog_posts", { count: 0, error: { message: "nope" } });
    setTable("testimonials", { count: 0, error: null });
    setTable("contact_submissions", { count: 0, error: null });
    expect((await getDashboardStats()).error).toBe("nope");
  });
});

describe("blog CRUD", () => {
  const input: BlogPostInput = {
    slug: "s",
    title: "T",
    excerpt: null,
    content: null,
    author: null,
    category: null,
    tags: [],
    status: "published",
    read_minutes: null,
  };

  it("lists posts", async () => {
    setTable("blog_posts", { data: [{ id: "1" }], error: null });
    expect((await listBlogPosts()).data).toHaveLength(1);
  });

  it("translates a duplicate-slug error into a friendly message", async () => {
    setTable("blog_posts", {
      data: null,
      error: { message: "duplicate key value violates unique constraint" },
    });
    const { error } = await createBlogPost(input);
    expect(error).toMatch(/slug already exists/i);
  });

  it("creates a post", async () => {
    setTable("blog_posts", { data: { id: "1" }, error: null });
    expect((await createBlogPost(input)).data).toMatchObject({ id: "1" });
  });

  it("updates a post across all published_at transitions", async () => {
    setTable("blog_posts", { data: { id: "1" }, error: null });
    // draft → published (stamp), published → published (keep), published → draft (clear)
    expect((await updateBlogPost("1", input, "draft")).data).toBeTruthy();
    expect((await updateBlogPost("1", input, "published")).data).toBeTruthy();
    expect((await updateBlogPost("1", { ...input, status: "draft" }, "published")).data).toBeTruthy();
  });

  it("soft-deletes a post", async () => {
    setTable("blog_posts", { data: null, error: null });
    expect((await deleteBlogPost("1")).data).toBe(true);
  });
});

describe("contact + testimonial CRUD", () => {
  it("lists, updates status, and deletes contacts", async () => {
    setTable("contact_submissions", { data: [{ id: "1" }], error: null });
    expect((await listContacts()).data).toHaveLength(1);
    expect((await getRecentContacts()).data).toHaveLength(1);
    setTable("contact_submissions", { data: { id: "1", status: "read" }, error: null });
    expect((await setContactStatus("1", "read")).data).toMatchObject({ status: "read" });
    setTable("contact_submissions", { data: null, error: null });
    expect((await deleteContact("1")).data).toBe(true);
  });

  it("lists, creates, updates and soft-deletes testimonials", async () => {
    setTable("testimonials", { data: [{ id: "1" }], error: null });
    expect((await listTestimonials()).data).toHaveLength(1);
    setTable("testimonials", { data: { id: "1" }, error: null });
    expect(
      (
        await createTestimonial({
          quote: "q",
          name: "n",
          role: null,
          company: null,
          icon: null,
          rating: 5,
          is_published: false,
          sort_order: 0,
        })
      ).data
    ).toMatchObject({ id: "1" });
    expect((await updateTestimonial("1", { rating: 4 })).data).toMatchObject({ id: "1" });
    setTable("testimonials", { data: null, error: null });
    expect((await deleteTestimonial("1")).data).toBe(true);
  });

  it("surfaces errors from list queries", async () => {
    setTable("contact_submissions", { data: null, error: { message: "boom" } });
    expect((await listContacts()).error).toBe("boom");
  });
});
