/**
 * Admin-only data access for the dashboard.
 *
 * Every write here is gated server-side by Row-Level Security: the
 * `*: admin all` policies in `supabase/schema.sql` require the caller's
 * profile to have `role = 'admin'`. The functions below therefore trust RLS
 * for authorization and only surface friendly errors to the UI.
 *
 * All functions resolve to `{ data }` / `{ error }` shaped results so callers
 * never have to catch. When Supabase is not configured they return an error
 * explaining that, rather than throwing.
 */
import { supabase, isSupabaseConfigured } from "@/lib/supabase";
import type {
  BlogPostRow,
  TestimonialRow,
  ContactSubmissionRow,
  NewsletterSubscriberRow,
} from "@/types/database";

export interface Result<T> {
  data?: T;
  error?: string;
}

const NOT_CONFIGURED = "Supabase is not configured. Add your keys to .env.";

function fail<T>(message: string): Result<T> {
  return { error: message };
}

// =============================================================================
// Overview / stats
// =============================================================================

export interface DashboardStats {
  blogsTotal: number;
  blogsPublished: number;
  blogsDraft: number;
  testimonialsTotal: number;
  testimonialsPublished: number;
  contactsTotal: number;
  contactsNew: number;
}

/** Aggregate counts for the Overview screen, computed with cheap head queries. */
export async function getDashboardStats(): Promise<Result<DashboardStats>> {
  if (!isSupabaseConfigured || !supabase) return fail(NOT_CONFIGURED);
  const sb = supabase; // narrow non-null for the closures below

  // `head: true` + `count: 'exact'` returns only the count, no rows.
  const head = { count: "exact" as const, head: true };

  const [
    blogsTotal,
    blogsPublished,
    blogsDraft,
    testimonialsTotal,
    testimonialsPublished,
    contactsTotal,
    contactsNew,
  ] = await Promise.all([
    sb.from("blog_posts").select("*", head),
    sb.from("blog_posts").select("*", head).eq("status", "published"),
    sb.from("blog_posts").select("*", head).eq("status", "draft"),
    sb.from("testimonials").select("*", head),
    sb.from("testimonials").select("*", head).eq("is_published", true),
    sb.from("contact_submissions").select("*", head),
    sb.from("contact_submissions").select("*", head).eq("status", "new"),
  ]);

  const firstError = [
    blogsTotal,
    blogsPublished,
    blogsDraft,
    testimonialsTotal,
    testimonialsPublished,
    contactsTotal,
    contactsNew,
  ].find((r) => r.error);

  if (firstError?.error) return fail(firstError.error.message);

  return {
    data: {
      blogsTotal: blogsTotal.count ?? 0,
      blogsPublished: blogsPublished.count ?? 0,
      blogsDraft: blogsDraft.count ?? 0,
      testimonialsTotal: testimonialsTotal.count ?? 0,
      testimonialsPublished: testimonialsPublished.count ?? 0,
      contactsTotal: contactsTotal.count ?? 0,
      contactsNew: contactsNew.count ?? 0,
    },
  };
}

// =============================================================================
// Chart data for the Overview (aggregated client-side from raw rows)
// =============================================================================

export interface OverviewCharts {
  /** Submissions per day for the trailing `days` window, oldest → newest. */
  contactsByDay: { date: string; label: string; count: number }[];
  contactsByStatus: { new: number; read: number; archived: number };
  /** Top services requested in the contact form, most-requested first. */
  contactsByService: { service: string; count: number }[];
  blogsByStatus: { published: number; draft: number };
  /** Testimonial counts indexed by rating: [1★, 2★, 3★, 4★, 5★]. */
  testimonialsByRating: number[];
}

/** Local YYYY-MM-DD key for a date (used to bucket submissions by day). */
function dayKey(d: Date): string {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(
    d.getDate()
  ).padStart(2, "0")}`;
}

/**
 * Fetch the raw rows the Overview charts need and aggregate them in the
 * browser. Volumes here are small (a marketing site), so a few full-column
 * selects are cheaper and simpler than server-side grouping.
 */
export async function getOverviewCharts(days = 30): Promise<Result<OverviewCharts>> {
  if (!isSupabaseConfigured || !supabase) return fail(NOT_CONFIGURED);
  const sb = supabase;

  const [contacts, blogs, testimonials] = await Promise.all([
    sb.from("contact_submissions").select("created_at, status, service"),
    sb.from("blog_posts").select("status"),
    sb.from("testimonials").select("rating"),
  ]);

  const firstError = [contacts, blogs, testimonials].find((r) => r.error);
  if (firstError?.error) return fail(firstError.error.message);

  // --- contacts by day (zero-filled window) ---------------------------------
  const buckets = new Map<string, number>();
  const series: OverviewCharts["contactsByDay"] = [];
  const today = new Date();
  for (let i = days - 1; i >= 0; i--) {
    const d = new Date(today);
    d.setDate(today.getDate() - i);
    const key = dayKey(d);
    buckets.set(key, 0);
    series.push({
      date: key,
      label: d.toLocaleDateString("en-US", { month: "short", day: "numeric" }),
      count: 0,
    });
  }

  const byStatus = { new: 0, read: 0, archived: 0 };
  const serviceCounts = new Map<string, number>();

  for (const row of contacts.data ?? []) {
    const key = dayKey(new Date(row.created_at));
    if (buckets.has(key)) buckets.set(key, (buckets.get(key) ?? 0) + 1);
    if (row.status in byStatus) byStatus[row.status as keyof typeof byStatus] += 1;
    const svc = row.service?.trim();
    if (svc) serviceCounts.set(svc, (serviceCounts.get(svc) ?? 0) + 1);
  }
  for (const point of series) point.count = buckets.get(point.date) ?? 0;

  const contactsByService = [...serviceCounts.entries()]
    .map(([service, count]) => ({ service, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 6);

  // --- blogs by status ------------------------------------------------------
  const blogsByStatus = { published: 0, draft: 0 };
  for (const row of blogs.data ?? []) {
    if (row.status === "published") blogsByStatus.published += 1;
    else blogsByStatus.draft += 1;
  }

  // --- testimonials by rating ----------------------------------------------
  const testimonialsByRating = [0, 0, 0, 0, 0];
  for (const row of testimonials.data ?? []) {
    const r = Math.min(5, Math.max(1, row.rating ?? 0));
    if (r >= 1) testimonialsByRating[r - 1] += 1;
  }

  return {
    data: {
      contactsByDay: series,
      contactsByStatus: byStatus,
      contactsByService,
      blogsByStatus,
      testimonialsByRating,
    },
  };
}

/** A few most-recent contact messages for the Overview feed. */
export async function getRecentContacts(limit = 5): Promise<Result<ContactSubmissionRow[]>> {
  if (!isSupabaseConfigured || !supabase) return fail(NOT_CONFIGURED);

  const { data, error } = await supabase
    .from("contact_submissions")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(limit);

  if (error) return fail(error.message);
  return { data: data ?? [] };
}

// =============================================================================
// Contact messages (admin-only read/manage)
// =============================================================================

export type ContactStatus = ContactSubmissionRow["status"];

/** All contact submissions, newest first. */
export async function listContacts(): Promise<Result<ContactSubmissionRow[]>> {
  if (!isSupabaseConfigured || !supabase) return fail(NOT_CONFIGURED);

  const { data, error } = await supabase
    .from("contact_submissions")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) return fail(error.message);
  return { data: data ?? [] };
}

export async function setContactStatus(
  id: string,
  status: ContactStatus
): Promise<Result<ContactSubmissionRow>> {
  if (!isSupabaseConfigured || !supabase) return fail(NOT_CONFIGURED);

  const { data, error } = await supabase
    .from("contact_submissions")
    .update({ status })
    .eq("id", id)
    .select("*")
    .single();

  if (error) return fail(error.message);
  return { data };
}

export async function deleteContact(id: string): Promise<Result<true>> {
  if (!isSupabaseConfigured || !supabase) return fail(NOT_CONFIGURED);

  const { error } = await supabase.from("contact_submissions").delete().eq("id", id);
  if (error) return fail(error.message);
  return { data: true };
}

// =============================================================================
// Blog posts (admin sees drafts + published)
// =============================================================================

export async function listBlogPosts(): Promise<Result<BlogPostRow[]>> {
  if (!isSupabaseConfigured || !supabase) return fail(NOT_CONFIGURED);

  const { data, error } = await supabase
    .from("blog_posts")
    .select("*")
    .order("updated_at", { ascending: false });

  if (error) return fail(error.message);
  return { data: data ?? [] };
}

export interface BlogPostInput {
  slug: string;
  title: string;
  excerpt: string | null;
  content: string | null;
  cover_image: string | null;
  author: string | null;
  category: string | null;
  tags: string[];
  status: "draft" | "published";
  read_minutes: number | null;
}

/** Create a post. `published_at` is stamped automatically when publishing. */
export async function createBlogPost(input: BlogPostInput): Promise<Result<BlogPostRow>> {
  if (!isSupabaseConfigured || !supabase) return fail(NOT_CONFIGURED);

  const { data, error } = await supabase
    .from("blog_posts")
    .insert({
      ...input,
      published_at: input.status === "published" ? new Date().toISOString() : null,
    })
    .select("*")
    .single();

  if (error) return fail(friendlyBlogError(error.message));
  return { data };
}

/** Update a post. Sets/clears `published_at` to match the new status. */
export async function updateBlogPost(
  id: string,
  input: BlogPostInput,
  previousStatus: BlogPostRow["status"]
): Promise<Result<BlogPostRow>> {
  if (!isSupabaseConfigured || !supabase) return fail(NOT_CONFIGURED);

  // Only (re)stamp published_at when transitioning into "published"; clear it
  // when moving back to draft so the public read policy hides it.
  const published_at =
    input.status === "published"
      ? previousStatus === "published"
        ? undefined // keep existing timestamp
        : new Date().toISOString()
      : null;

  const patch =
    published_at === undefined ? input : { ...input, published_at };

  const { data, error } = await supabase
    .from("blog_posts")
    .update(patch)
    .eq("id", id)
    .select("*")
    .single();

  if (error) return fail(friendlyBlogError(error.message));
  return { data };
}

export async function deleteBlogPost(id: string): Promise<Result<true>> {
  if (!isSupabaseConfigured || !supabase) return fail(NOT_CONFIGURED);

  const { error } = await supabase.from("blog_posts").delete().eq("id", id);
  if (error) return fail(error.message);
  return { data: true };
}

function friendlyBlogError(message: string): string {
  if (/duplicate key|unique/i.test(message)) {
    return "A post with that slug already exists. Choose a different slug.";
  }
  return message;
}

// =============================================================================
// Testimonials
// =============================================================================

export async function listTestimonials(): Promise<Result<TestimonialRow[]>> {
  if (!isSupabaseConfigured || !supabase) return fail(NOT_CONFIGURED);

  const { data, error } = await supabase
    .from("testimonials")
    .select("*")
    .order("sort_order", { ascending: true })
    .order("created_at", { ascending: false });

  if (error) return fail(error.message);
  return { data: data ?? [] };
}

export interface TestimonialInput {
  quote: string;
  name: string;
  role: string | null;
  company: string | null;
  icon: string | null;
  rating: number;
  is_published: boolean;
  sort_order: number;
}

export async function createTestimonial(
  input: TestimonialInput
): Promise<Result<TestimonialRow>> {
  if (!isSupabaseConfigured || !supabase) return fail(NOT_CONFIGURED);

  const { data, error } = await supabase
    .from("testimonials")
    .insert(input)
    .select("*")
    .single();

  if (error) return fail(error.message);
  return { data };
}

export async function updateTestimonial(
  id: string,
  input: Partial<TestimonialInput>
): Promise<Result<TestimonialRow>> {
  if (!isSupabaseConfigured || !supabase) return fail(NOT_CONFIGURED);

  const { data, error } = await supabase
    .from("testimonials")
    .update(input)
    .eq("id", id)
    .select("*")
    .single();

  if (error) return fail(error.message);
  return { data };
}

export async function deleteTestimonial(id: string): Promise<Result<true>> {
  if (!isSupabaseConfigured || !supabase) return fail(NOT_CONFIGURED);

  const { error } = await supabase.from("testimonials").delete().eq("id", id);
  if (error) return fail(error.message);
  return { data: true };
}

// =============================================================================
// Newsletter subscribers
// =============================================================================

export async function listSubscribers(): Promise<Result<NewsletterSubscriberRow[]>> {
  if (!isSupabaseConfigured || !supabase) return fail(NOT_CONFIGURED);

  const { data, error } = await supabase
    .from("newsletter_subscribers")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) return fail(error.message);
  return { data: data ?? [] };
}

export async function deleteSubscriber(id: string): Promise<Result<true>> {
  if (!isSupabaseConfigured || !supabase) return fail(NOT_CONFIGURED);

  const { error } = await supabase.from("newsletter_subscribers").delete().eq("id", id);
  if (error) return fail(error.message);
  return { data: true };
}

/** Lucide icon keys the public site knows how to render (see services/testimonials.ts). */
export const TESTIMONIAL_ICON_KEYS = [
  "Store",
  "GraduationCap",
  "Building2",
  "ShoppingBag",
  "Quote",
] as const;
