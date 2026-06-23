/**
 * Blog management: list every post (drafts + published), create, edit and
 * delete. Publishing state is controlled by the `status` field; the service
 * layer handles stamping `published_at`.
 */
import { useEffect, useState, type FormEvent } from "react";
import { Loader2, Plus, Pencil, Trash2, Newspaper, ImagePlus, X } from "lucide-react";
import {
  listBlogPosts,
  createBlogPost,
  updateBlogPost,
  deleteBlogPost,
  type BlogPostInput,
} from "@/services/admin";
import { uploadBlogImage } from "@/services/storage";
import type { BlogPostRow } from "@/types/database";
import { PageHeader, Modal, Alert, Field, Badge, inputCls } from "@/components/admin/ui";
import MarkdownEditor from "@/components/admin/MarkdownEditor";
import { formatDate } from "@/lib/utils";

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
  cover_image: "",
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
        <div className="flex min-h-[16rem] items-center justify-center text-ink-muted">
          <Loader2 className="animate-spin" />
        </div>
      ) : posts.length === 0 ? (
        <EmptyState onCreate={() => setCreating(true)} />
      ) : (
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
              {posts.map((post) => (
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
      <Modal
        open={deleting !== null}
        onClose={() => setDeleting(null)}
        title="Delete post"
      >
        <p className="text-sm text-ink-muted">
          Delete <span className="font-medium text-ink">{deleting?.title}</span>? This
          cannot be undone.
        </p>
        <div className="mt-6 flex justify-end gap-3">
          <button
            onClick={() => setDeleting(null)}
            className="rounded-xl px-4 py-2.5 text-sm font-medium text-ink-muted transition-colors hover:text-ink"
          >
            Cancel
          </button>
          <button
            onClick={handleDelete}
            disabled={deleteBusy}
            className="inline-flex items-center gap-2 rounded-xl bg-red-500/90 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-red-500 disabled:opacity-70"
          >
            {deleteBusy && <Loader2 size={16} className="animate-spin" />}
            Delete
          </button>
        </div>
      </Modal>
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
  const [coverUploading, setCoverUploading] = useState(false);

  // Re-seed the form whenever the modal opens for a new target.
  useEffect(() => {
    if (!open) return;
    if (post) {
      setForm({
        slug: post.slug,
        title: post.title,
        excerpt: post.excerpt ?? "",
        content: post.content ?? "",
        cover_image: post.cover_image ?? "",
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

  const handleCoverUpload = async (file: File | undefined) => {
    if (!file) return;
    setError(null);
    setCoverUploading(true);
    const res = await uploadBlogImage(file);
    setCoverUploading(false);
    if (res.error || !res.url) {
      setError(res.error ?? "Upload failed.");
      return;
    }
    set("cover_image", res.url);
  };

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
      cover_image: form.cover_image?.trim() || null,
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

        <div className="grid gap-4 sm:grid-cols-2">
          <Field
            label="Cover image"
            htmlFor="cover"
            hint="Paste a URL or upload an image."
          >
            <div className="flex gap-2">
              <input
                id="cover"
                value={form.cover_image ?? ""}
                onChange={(e) => set("cover_image", e.target.value)}
                placeholder="https://…"
                className={inputCls}
              />
              <label
                title="Upload cover image"
                className="flex h-[42px] w-11 shrink-0 cursor-pointer items-center justify-center rounded-xl border border-white/10 bg-white/[0.03] text-ink-muted transition-colors hover:text-ink"
              >
                {coverUploading ? (
                  <Loader2 size={16} className="animate-spin" />
                ) : (
                  <ImagePlus size={16} />
                )}
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  disabled={coverUploading}
                  onChange={(e) => {
                    handleCoverUpload(e.target.files?.[0]);
                    e.target.value = "";
                  }}
                />
              </label>
            </div>
            {form.cover_image && (
              <div className="relative mt-2 overflow-hidden rounded-xl ring-1 ring-white/10">
                <img
                  src={form.cover_image}
                  alt="Cover preview"
                  className="aspect-[16/9] w-full object-cover"
                />
                <button
                  type="button"
                  onClick={() => set("cover_image", "")}
                  aria-label="Remove cover image"
                  className="absolute right-2 top-2 flex h-7 w-7 items-center justify-center rounded-lg bg-black/60 text-white transition-colors hover:bg-black/80"
                >
                  <X size={14} />
                </button>
              </div>
            )}
          </Field>
          <Field label="Read minutes" htmlFor="read">
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
        </div>

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

        <div className="mt-2 flex justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="rounded-xl px-4 py-2.5 text-sm font-medium text-ink-muted transition-colors hover:text-ink"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={busy}
            className="inline-flex items-center gap-2 rounded-xl bg-brand-gradient px-5 py-2.5 text-sm font-semibold text-white shadow-glow-sm transition-shadow hover:shadow-glow disabled:opacity-70"
          >
            {busy && <Loader2 size={16} className="animate-spin" />}
            {post ? "Save changes" : "Create post"}
          </button>
        </div>
      </form>
    </Modal>
  );
}

function StatusBadge({ status }: { status: BlogPostRow["status"] }) {
  return status === "published" ? (
    <Badge tone="green">Published</Badge>
  ) : (
    <Badge tone="amber">Draft</Badge>
  );
}

function IconButton({
  children,
  label,
  onClick,
  danger,
}: {
  children: React.ReactNode;
  label: string;
  onClick: () => void;
  danger?: boolean;
}) {
  return (
    <button
      onClick={onClick}
      title={label}
      aria-label={label}
      className={
        "flex h-9 w-9 items-center justify-center rounded-lg text-ink-muted transition-colors " +
        (danger ? "hover:bg-red-500/10 hover:text-red-300" : "hover:bg-white/5 hover:text-ink")
      }
    >
      {children}
    </button>
  );
}

function EmptyState({ onCreate }: { onCreate: () => void }) {
  return (
    <div className="flex flex-col items-center rounded-3xl border border-white/10 bg-bg-900/40 p-12 text-center">
      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-brand/15 ring-1 ring-brand/30">
        <Newspaper className="text-brand-light" />
      </div>
      <h3 className="mt-5 font-display text-lg font-semibold text-ink">No posts yet</h3>
      <p className="mt-1 max-w-sm text-sm text-ink-muted">
        Write your first article. Drafts stay private until you publish them.
      </p>
      <button
        onClick={onCreate}
        className="mt-5 inline-flex items-center gap-2 rounded-xl bg-brand-gradient px-4 py-2.5 text-sm font-semibold text-white shadow-glow-sm transition-shadow hover:shadow-glow"
      >
        <Plus size={16} />
        New post
      </button>
    </div>
  );
}
