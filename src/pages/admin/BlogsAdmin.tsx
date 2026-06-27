/**
 * Blog management: list every post (drafts + published), create, edit and
 * delete. Publishing state is controlled by the `status` field; the service
 * layer handles stamping `published_at`.
 */
import { useEffect, useMemo, useState, type FormEvent } from "react";
import {
  Plus,
  Pencil,
  Trash2,
  Newspaper,
  Search,
  X,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import {
  listBlogPosts,
  createBlogPost,
  updateBlogPost,
  deleteBlogPost,
  type BlogPostInput,
} from "@/services/admin";
import type { BlogPostRow } from "@/types/database";
import {
  PageHeader,
  Modal,
  Alert,
  Field,
  Badge,
  inputCls,
  IconButton,
  ConfirmDialog,
  EmptyState,
  FormActions,
} from "@/components/admin/ui";
import MarkdownEditor from "@/components/admin/MarkdownEditor";
import { Skeleton, SkeletonGroup } from "@/components/common/Skeleton";
import { cn, formatDate } from "@/lib/utils";

const PAGE_SIZE = 10;
const STATUS_FILTERS = ["all", "published", "draft"] as const;
type StatusFilter = (typeof STATUS_FILTERS)[number];

/** Build a URL-friendly slug from a title. */
function slugify(value: string): string {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

const EMPTY: BlogPostInput = {
  slug: "",
  title: "",
  excerpt: "",
  content: "",
  author: "",
  category: "",
  tags: [],
  status: "draft",
  read_minutes: null,
};

export default function BlogsAdmin() {
  const [posts, setPosts] = useState<BlogPostRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [editing, setEditing] = useState<BlogPostRow | null>(null);
  const [creating, setCreating] = useState(false);
  const [deleting, setDeleting] = useState<BlogPostRow | null>(null);
  const [deleteBusy, setDeleteBusy] = useState(false);

  const [query, setQuery] = useState("");
  const [status, setStatus] = useState<StatusFilter>("all");
  const [page, setPage] = useState(1);

  // Search across the fields an editor would scan for, plus a status filter.
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return posts.filter((p) => {
      if (status !== "all" && p.status !== status) return false;
      if (!q) return true;
      const haystack = [p.title, p.slug, p.category, p.author, ...(p.tags ?? [])]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();
      return haystack.includes(q);
    });
  }, [posts, query, status]);

  // Snap back to the first page whenever the result set changes.
  useEffect(() => {
    setPage(1);
  }, [query, status]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);
  const visible = filtered.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE
  );

  const load = async () => {
    const res = await listBlogPosts();
    if (res.error) setError(res.error);
    else setPosts(res.data ?? []);
    setLoading(false);
  };

  useEffect(() => {
    load();
  }, []);

  const handleSaved = (saved: BlogPostRow) => {
    setPosts((prev) => {
      const exists = prev.some((p) => p.id === saved.id);
      const next = exists
        ? prev.map((p) => (p.id === saved.id ? saved : p))
        : [saved, ...prev];
      return [...next].sort((a, b) => b.updated_at.localeCompare(a.updated_at));
    });
    setCreating(false);
    setEditing(null);
  };

  const handleDelete = async () => {
    if (!deleting) return;
    setDeleteBusy(true);
    const res = await deleteBlogPost(deleting.id);
    setDeleteBusy(false);
    if (res.error) {
      setError(res.error);
      return;
    }
    setPosts((prev) => prev.filter((p) => p.id !== deleting.id));
    setDeleting(null);
  };

  return (
    <div className="space-y-8">
      <PageHeader
        title="Blogs"
        subtitle="Create and manage articles shown on the public blog."
        action={
          <button
            onClick={() => setCreating(true)}
            className="inline-flex items-center gap-2 rounded-xl bg-brand-gradient px-4 py-2.5 text-sm font-semibold text-white shadow-glow-sm transition-shadow hover:shadow-glow"
          >
            <Plus size={16} />
            New post
          </button>
        }
      />

      {error && <Alert kind="error">{error}</Alert>}

      {loading ? (
        <ListSkeleton />
      ) : posts.length === 0 ? (
        <EmptyState
          icon={Newspaper}
          title="No posts yet"
          description="Write your first article. Drafts stay private until you publish them."
          action={
            <button
              onClick={() => setCreating(true)}
              className="inline-flex items-center gap-2 rounded-xl bg-brand-gradient px-4 py-2.5 text-sm font-semibold text-white shadow-glow-sm transition-shadow hover:shadow-glow"
            >
              <Plus size={16} />
              New post
            </button>
          }
        />
      ) : (
        <div className="space-y-5">
          <Toolbar
            query={query}
            onQuery={setQuery}
            status={status}
            onStatus={setStatus}
            shown={filtered.length}
            total={posts.length}
          />

          {filtered.length === 0 ? (
            <NoResults
              onReset={() => {
                setQuery("");
                setStatus("all");
              }}
            />
          ) : (
            <>
              <div className="overflow-hidden rounded-2xl border border-white/10">
                <table className="w-full text-left text-sm">
                  <thead className="bg-bg-900/80 text-xs uppercase tracking-wide text-ink-muted">
                    <tr>
                      <th className="px-4 py-3 font-medium">Title</th>
                      <th className="hidden px-4 py-3 font-medium sm:table-cell">Status</th>
                      <th className="hidden px-4 py-3 font-medium md:table-cell">Updated</th>
                      <th className="px-4 py-3 text-right font-medium">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {visible.map((post) => (
                      <tr key={post.id} className="bg-bg-900/40 hover:bg-white/[0.03]">
                        <td className="px-4 py-3">
                          <p className="font-medium text-ink">{post.title}</p>
                          <p className="text-xs text-ink-muted">/{post.slug}</p>
                          <div className="mt-1 sm:hidden">
                            <StatusBadge status={post.status} />
                          </div>
                        </td>
                        <td className="hidden px-4 py-3 sm:table-cell">
                          <StatusBadge status={post.status} />
                        </td>
                        <td className="hidden px-4 py-3 text-ink-muted md:table-cell">
                          {formatDate(post.updated_at)}
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex justify-end gap-1">
                            <IconButton label="Edit" onClick={() => setEditing(post)}>
                              <Pencil size={16} />
                            </IconButton>
                            <IconButton
                              label="Delete"
                              danger
                              onClick={() => setDeleting(post)}
                            >
                              <Trash2 size={16} />
                            </IconButton>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {totalPages > 1 && (
                <Pagination
                  page={currentPage}
                  totalPages={totalPages}
                  onChange={setPage}
                />
              )}
            </>
          )}
        </div>
      )}

      {/* Create / edit form */}
      <BlogForm
        open={creating || editing !== null}
        post={editing}
        onClose={() => {
          setCreating(false);
          setEditing(null);
        }}
        onSaved={handleSaved}
      />

      {/* Delete confirmation */}
      <ConfirmDialog
        open={deleting !== null}
        onClose={() => setDeleting(null)}
        onConfirm={handleDelete}
        title="Delete post"
        busy={deleteBusy}
      >
        Delete <span className="font-medium text-ink">{deleting?.title}</span>? This
        cannot be undone.
      </ConfirmDialog>
    </div>
  );
}

function BlogForm({
  open,
  post,
  onClose,
  onSaved,
}: {
  open: boolean;
  post: BlogPostRow | null;
  onClose: () => void;
  onSaved: (p: BlogPostRow) => void;
}) {
  const [form, setForm] = useState<BlogPostInput>(EMPTY);
  const [tagsText, setTagsText] = useState("");
  const [slugTouched, setSlugTouched] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Re-seed the form whenever the modal opens for a new target.
  useEffect(() => {
    if (!open) return;
    if (post) {
      setForm({
        slug: post.slug,
        title: post.title,
        excerpt: post.excerpt ?? "",
        content: post.content ?? "",
        author: post.author ?? "",
        category: post.category ?? "",
        tags: post.tags ?? [],
        status: post.status,
        read_minutes: post.read_minutes,
      });
      setTagsText((post.tags ?? []).join(", "));
      setSlugTouched(true);
    } else {
      setForm(EMPTY);
      setTagsText("");
      setSlugTouched(false);
    }
    setError(null);
  }, [open, post]);

  const set = <K extends keyof BlogPostInput>(key: K, value: BlogPostInput[K]) =>
    setForm((f) => ({ ...f, [key]: value }));

  const onTitleChange = (value: string) => {
    set("title", value);
    // Auto-fill the slug from the title until the user edits the slug manually.
    if (!slugTouched) set("slug", slugify(value));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!form.title.trim() || !form.slug.trim()) {
      setError("Title and slug are required.");
      return;
    }

    const payload: BlogPostInput = {
      ...form,
      slug: slugify(form.slug),
      title: form.title.trim(),
      excerpt: form.excerpt?.trim() || null,
      content: form.content?.trim() || null,
      author: form.author?.trim() || null,
      category: form.category?.trim() || null,
      tags: tagsText
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean),
      read_minutes: form.read_minutes || null,
    };

    setBusy(true);
    const res = post
      ? await updateBlogPost(post.id, payload, post.status)
      : await createBlogPost(payload);
    setBusy(false);

    if (res.error) {
      setError(res.error);
      return;
    }
    if (res.data) onSaved(res.data);
  };

  return (
    <Modal open={open} onClose={onClose} title={post ? "Edit post" : "New post"} wide>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <Field label="Title" htmlFor="title">
          <input
            id="title"
            value={form.title}
            onChange={(e) => onTitleChange(e.target.value)}
            placeholder="How we cut load times in half"
            className={inputCls}
          />
        </Field>

        <Field label="Slug" htmlFor="slug" hint="Used in the URL: /blog/your-slug">
          <input
            id="slug"
            value={form.slug}
            onChange={(e) => {
              setSlugTouched(true);
              set("slug", e.target.value);
            }}
            placeholder="how-we-cut-load-times"
            className={inputCls}
          />
        </Field>

        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Author" htmlFor="author">
            <input
              id="author"
              value={form.author ?? ""}
              onChange={(e) => set("author", e.target.value)}
              placeholder="Navya Team"
              className={inputCls}
            />
          </Field>
          <Field label="Category" htmlFor="category">
            <input
              id="category"
              value={form.category ?? ""}
              onChange={(e) => set("category", e.target.value)}
              placeholder="Engineering"
              className={inputCls}
            />
          </Field>
        </div>

        <Field label="Excerpt" htmlFor="excerpt" hint="Short summary shown on listing cards.">
          <textarea
            id="excerpt"
            value={form.excerpt ?? ""}
            onChange={(e) => set("excerpt", e.target.value)}
            rows={2}
            className={inputCls}
          />
        </Field>

        <MarkdownEditor
          value={form.content ?? ""}
          onChange={(v) => set("content", v)}
        />

        <Field label="Read minutes" htmlFor="read" hint="Estimated reading time.">
          <input
            id="read"
            type="number"
            min={1}
            value={form.read_minutes ?? ""}
            onChange={(e) =>
              set("read_minutes", e.target.value ? Number(e.target.value) : null)
            }
            placeholder="5"
            className={inputCls}
          />
        </Field>

        <Field label="Tags" htmlFor="tags" hint="Comma-separated, e.g. react, performance">
          <input
            id="tags"
            value={tagsText}
            onChange={(e) => setTagsText(e.target.value)}
            placeholder="react, performance"
            className={inputCls}
          />
        </Field>

        <Field label="Status" htmlFor="status">
          <select
            id="status"
            value={form.status}
            onChange={(e) => set("status", e.target.value as BlogPostInput["status"])}
            className={inputCls}
          >
            <option value="draft">Draft</option>
            <option value="published">Published</option>
          </select>
        </Field>

        {error && <Alert kind="error">{error}</Alert>}

        <FormActions
          onCancel={onClose}
          busy={busy}
          submitLabel={post ? "Save changes" : "Create post"}
        />
      </form>
    </Modal>
  );
}

function Toolbar({
  query,
  onQuery,
  status,
  onStatus,
  shown,
  total,
}: {
  query: string;
  onQuery: (v: string) => void;
  status: StatusFilter;
  onStatus: (v: StatusFilter) => void;
  shown: number;
  total: number;
}) {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex flex-1 flex-col gap-3 sm:flex-row sm:items-center">
        <div className="relative w-full sm:max-w-xs">
          <Search
            size={16}
            className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-ink-muted"
          />
          <input
            type="search"
            value={query}
            onChange={(e) => onQuery(e.target.value)}
            placeholder="Search title, slug, tags…"
            aria-label="Search posts"
            className={cn(inputCls, "pl-10 pr-9")}
          />
          {query && (
            <button
              onClick={() => onQuery("")}
              aria-label="Clear search"
              className="absolute right-2.5 top-1/2 -translate-y-1/2 rounded-md p-1 text-ink-muted transition-colors hover:text-ink"
            >
              <X size={15} />
            </button>
          )}
        </div>

        <div className="flex rounded-xl border border-white/10 p-0.5 text-sm">
          {STATUS_FILTERS.map((s) => (
            <button
              key={s}
              onClick={() => onStatus(s)}
              className={cn(
                "rounded-lg px-3 py-1.5 font-medium capitalize transition-colors",
                s === status
                  ? "bg-brand/20 text-ink"
                  : "text-ink-muted hover:text-ink"
              )}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      <p className="text-xs text-ink-muted">
        {shown === total ? `${total} posts` : `${shown} of ${total} posts`}
      </p>
    </div>
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
      aria-label="Blog admin pagination"
      className="flex items-center justify-center gap-2"
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
    <div className="flex flex-col items-center rounded-2xl border border-white/10 bg-bg-900/40 p-12 text-center">
      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-brand/15 ring-1 ring-brand/30">
        <Search className="text-brand-light" size={20} />
      </div>
      <h3 className="mt-4 font-display text-base font-semibold text-ink">No matches</h3>
      <p className="mt-1 max-w-sm text-sm text-ink-muted">
        No posts fit your search. Try different keywords or clear the filters.
      </p>
      <button
        onClick={onReset}
        className="mt-4 rounded-xl border border-white/10 px-4 py-2 text-sm font-medium text-ink-muted transition-colors hover:text-ink"
      >
        Clear filters
      </button>
    </div>
  );
}

function StatusBadge({ status }: { status: BlogPostRow["status"] }) {
  return status === "published" ? (
    <Badge tone="green">Published</Badge>
  ) : (
    <Badge tone="amber">Draft</Badge>
  );
}

/** Skeleton that mirrors the toolbar + table while posts load. */
function ListSkeleton() {
  return (
    <SkeletonGroup label="Loading posts…" className="space-y-5">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-1 gap-3">
          <Skeleton className="h-10 w-full rounded-xl sm:max-w-xs" />
          <Skeleton className="h-10 w-40 rounded-xl" />
        </div>
        <Skeleton className="h-4 w-16" />
      </div>

      <div className="overflow-hidden rounded-2xl border border-white/10">
        <div className="divide-y divide-white/5">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="flex items-center justify-between gap-4 bg-bg-900/40 px-4 py-4"
            >
              <div className="min-w-0 flex-1 space-y-2">
                <Skeleton className="h-4 w-1/2" />
                <Skeleton className="h-3 w-1/3" />
              </div>
              <Skeleton className="hidden h-5 w-20 rounded-full sm:block" />
              <Skeleton className="hidden h-4 w-24 md:block" />
              <div className="flex gap-1">
                <Skeleton className="h-9 w-9 rounded-lg" />
                <Skeleton className="h-9 w-9 rounded-lg" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </SkeletonGroup>
  );
}

