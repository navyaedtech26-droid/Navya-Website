/**
 * Typed shape of the Supabase database. Mirrors `supabase/schema.sql`.
 *
 * Kept hand-written for clarity; if you prefer, regenerate it with the
 * Supabase CLI:  `supabase gen types typescript --project-id <id> > src/types/database.ts`
 */

// NOTE: these are `type` aliases, not `interface`. Object-literal type aliases
// carry an implicit index signature, so they satisfy supabase-js's
// `Record<string, unknown>` table constraint; interfaces do not, which would
// silently collapse the schema types to `never`.

export type ProfileRow = {
  id: string;
  full_name: string | null;
  email: string | null;
  avatar_url: string | null;
  role: "user" | "admin";
  created_at: string;
  updated_at: string;
};

export type ContactSubmissionRow = {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  service: string | null;
  budget: string | null;
  message: string;
  status: "new" | "read" | "archived";
  created_at: string;
};

export type TestimonialRow = {
  id: string;
  quote: string;
  name: string;
  role: string | null;
  company: string | null;
  icon: string | null;
  rating: number;
  is_published: boolean;
  sort_order: number;
  /** Soft delete: live row when null (see supabase/migrations/). */
  deleted_at: string | null;
  created_at: string;
};

export type BlogPostRow = {
  id: string;
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
  published_at: string | null;
  /** Soft delete: live row when null (see supabase/migrations/). */
  deleted_at: string | null;
  created_at: string;
  updated_at: string;
};

/** JSON returned by the `admin_overview_charts` RPC (see supabase/migrations/). */
export type OverviewChartsPayload = {
  contactsByDay: { date: string; count: number }[];
  contactsByStatus: { new: number; read: number; archived: number };
  contactsByService: { service: string; count: number }[];
  blogsByStatus: { published: number; draft: number };
  testimonialsByRating: number[];
};

/** Minimal generic-friendly Database type for `createClient<Database>()`. */
export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: ProfileRow;
        Insert: Partial<ProfileRow> & { id: string };
        Update: Partial<ProfileRow>;
        Relationships: [];
      };
      contact_submissions: {
        Row: ContactSubmissionRow;
        Insert: Omit<ContactSubmissionRow, "id" | "status" | "created_at"> & {
          status?: ContactSubmissionRow["status"];
        };
        Update: Partial<ContactSubmissionRow>;
        Relationships: [];
      };
      testimonials: {
        Row: TestimonialRow;
        Insert: Partial<TestimonialRow> & { quote: string; name: string };
        Update: Partial<TestimonialRow>;
        Relationships: [];
      };
      blog_posts: {
        Row: BlogPostRow;
        Insert: Partial<BlogPostRow> & { slug: string; title: string };
        Update: Partial<BlogPostRow>;
        Relationships: [];
      };
    };
    Views: Record<string, never>;
    Functions: {
      /** Server-side aggregation for the admin Overview charts. */
      admin_overview_charts: {
        Args: { days?: number; tz?: string };
        Returns: OverviewChartsPayload;
      };
    };
    Enums: Record<string, never>;
    CompositeTypes: Record<string, never>;
  };
}
