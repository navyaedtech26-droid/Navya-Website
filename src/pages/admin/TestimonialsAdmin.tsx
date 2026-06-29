/**
 * Testimonial moderation: list, edit, delete, reorder, and toggle the published
 * flag on quotes that VISITORS submit via the public "Share your story" form.
 * Admins don't author testimonials here — they only manage submitted ones.
 * `sort_order` controls the order they appear on the public site (ascending).
 */
import { useEffect, useState, type FormEvent } from "react";
import { Pencil, Trash2, Star, MessageSquareQuote, ExternalLink } from "lucide-react";
import {
  listTestimonials,
  updateTestimonial,
  deleteTestimonial,
  TESTIMONIAL_ICON_KEYS,
  type TestimonialInput,
} from "@/services/admin";
import type { TestimonialRow } from "@/types/database";
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
import { Skeleton, SkeletonGroup } from "@/components/common/Skeleton";
import { Spinner } from "@/components/common/Spinner";
import { useToast } from "@/components/common/Toast";
import { cn } from "@/lib/utils";

const EMPTY: TestimonialInput = {
  quote: "",
  name: "",
  role: "",
  company: "",
  icon: "Quote",
  rating: 5,
  is_published: true,
  sort_order: 0,
};

export default function TestimonialsAdmin() {
  const toast = useToast();
  const [items, setItems] = useState<TestimonialRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [filter, setFilter] = useState<"all" | "pending" | "published">("all");
  const [editing, setEditing] = useState<TestimonialRow | null>(null);
  const [deleting, setDeleting] = useState<TestimonialRow | null>(null);
  const [deleteBusy, setDeleteBusy] = useState(false);
  const [togglingId, setTogglingId] = useState<string | null>(null);

  const load = async () => {
    const res = await listTestimonials();
    if (res.error) setError(res.error);
    else setItems(res.data ?? []);
    setLoading(false);
  };

  useEffect(() => {
    load();
  }, []);

  const sortItems = (rows: TestimonialRow[]) =>
    [...rows].sort(
      (a, b) => a.sort_order - b.sort_order || b.created_at.localeCompare(a.created_at)
    );

  const handleSaved = (saved: TestimonialRow) => {
    setItems((prev) => sortItems(prev.map((t) => (t.id === saved.id ? saved : t))));
    setEditing(null);
    toast.success("Changes saved.");
  };

  const togglePublish = async (t: TestimonialRow) => {
    setTogglingId(t.id);
    const res = await updateTestimonial(t.id, { is_published: !t.is_published });
    setTogglingId(null);
    if (res.error) {
      toast.error(res.error);
      return;
    }
    const updated = res.data;
    if (updated) {
      setItems((prev) => sortItems(prev.map((x) => (x.id === updated.id ? updated : x))));
      toast.success(updated.is_published ? "Testimonial published." : "Testimonial hidden.");
    }
  };

  const handleDelete = async () => {
    if (!deleting) return;
    setDeleteBusy(true);
    const res = await deleteTestimonial(deleting.id);
    setDeleteBusy(false);
    if (res.error) {
      toast.error(res.error);
      return;
    }
    setItems((prev) => prev.filter((t) => t.id !== deleting.id));
    setDeleting(null);
    toast.success("Testimonial deleted.");
  };

  const pendingCount = items.filter((t) => !t.is_published).length;
  const publishedCount = items.length - pendingCount;
  const visible = items.filter((t) =>
    filter === "all" ? true : filter === "pending" ? !t.is_published : t.is_published
  );

  const filters: { key: typeof filter; label: string; count: number }[] = [
    { key: "all", label: "All", count: items.length },
    { key: "pending", label: "Pending review", count: pendingCount },
    { key: "published", label: "Published", count: publishedCount },
  ];

  return (
    <div className="space-y-8">
      <PageHeader
        title="Testimonials"
        subtitle="Quotes submitted by visitors through the public “Share your story” form. They arrive under Pending review — publish to feature them. Lower sort order appears first."
        action={
          <a
            href="/share-your-story"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-xl border border-white/10 px-4 py-2.5 text-sm font-semibold text-ink-muted transition-colors hover:text-ink"
          >
            <ExternalLink size={16} />
            View submission form
          </a>
        }
      />

      {error && <Alert kind="error">{error}</Alert>}

      {!loading && items.length > 0 && (
        <div className="flex flex-wrap items-center gap-2">
          {filters.map((f) => (
            <button
              key={f.key}
              onClick={() => setFilter(f.key)}
              className={cn(
                "inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-sm font-medium ring-1 transition-colors",
                filter === f.key
                  ? "bg-brand/15 text-brand-light ring-brand/40"
                  : "text-ink-muted ring-white/10 hover:bg-white/5 hover:text-ink"
              )}
            >
              {f.label}
              <span
                className={cn(
                  "rounded-full px-1.5 text-xs",
                  f.key === "pending" && f.count > 0
                    ? "bg-amber-500/20 text-amber-300"
                    : "bg-white/10 text-ink-muted"
                )}
              >
                {f.count}
              </span>
            </button>
          ))}
        </div>
      )}

      {loading ? (
        <GridSkeleton />
      ) : items.length === 0 ? (
        <EmptyState
          icon={MessageSquareQuote}
          title="No testimonials yet"
          description="When visitors submit their story through the public form, it'll appear here for you to review and publish. Until then, the site shows sample quotes."
          action={
            <a
              href="/share-your-story"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-xl border border-white/10 px-4 py-2.5 text-sm font-semibold text-ink-muted transition-colors hover:text-ink"
            >
              <ExternalLink size={16} />
              View submission form
            </a>
          }
        />
      ) : visible.length === 0 ? (
        <p className="rounded-2xl border border-dashed border-white/10 bg-bg-900/30 px-6 py-10 text-center text-sm text-ink-muted">
          {filter === "pending"
            ? "No testimonials awaiting review. New submissions from the site will appear here."
            : "No published testimonials yet."}
        </p>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2">
          {visible.map((t) => (
            <article
              key={t.id}
              className="flex flex-col rounded-2xl border border-white/10 bg-bg-900/50 p-5"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1 text-amber-300">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      size={14}
                      className={cn(i < t.rating ? "fill-current" : "text-white/15")}
                    />
                  ))}
                </div>
                <Badge tone={t.is_published ? "green" : "amber"}>
                  {t.is_published ? "Published" : "Pending review"}
                </Badge>
              </div>

              <p className="mt-3 line-clamp-4 text-sm text-ink-muted">"{t.quote}"</p>

              <div className="mt-4 flex items-end justify-between gap-3">
                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold text-ink">{t.name}</p>
                  <p className="truncate text-xs text-ink-muted">
                    {[t.role, t.company].filter(Boolean).join(" · ")}
                  </p>
                  <p className="mt-1 text-xs text-ink-muted/70">order: {t.sort_order}</p>
                </div>
                <div className="flex shrink-0 items-center gap-1">
                  <button
                    onClick={() => togglePublish(t)}
                    disabled={togglingId === t.id}
                    className="rounded-lg px-2.5 py-1.5 text-xs font-medium text-ink-muted transition-colors hover:bg-white/5 hover:text-ink disabled:opacity-50"
                  >
                    {togglingId === t.id ? (
                      <Spinner size={14} />
                    ) : t.is_published ? (
                      "Hide"
                    ) : (
                      "Publish"
                    )}
                  </button>
                  <IconButton label="Edit" size="sm" onClick={() => setEditing(t)}>
                    <Pencil size={15} />
                  </IconButton>
                  <IconButton label="Delete" size="sm" danger onClick={() => setDeleting(t)}>
                    <Trash2 size={15} />
                  </IconButton>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}

      <TestimonialForm
        open={editing !== null}
        item={editing}
        onClose={() => setEditing(null)}
        onSaved={handleSaved}
      />

      <ConfirmDialog
        open={deleting !== null}
        onClose={() => setDeleting(null)}
        onConfirm={handleDelete}
        title="Delete testimonial"
        busy={deleteBusy}
      >
        Delete the testimonial from{" "}
        <span className="font-medium text-ink">{deleting?.name}</span>? This cannot be
        undone.
      </ConfirmDialog>
    </div>
  );
}

function TestimonialForm({
  open,
  item,
  onClose,
  onSaved,
}: {
  open: boolean;
  item: TestimonialRow | null;
  onClose: () => void;
  onSaved: (t: TestimonialRow) => void;
}) {
  const [form, setForm] = useState<TestimonialInput>(EMPTY);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!open) return;
    if (item) {
      setForm({
        quote: item.quote,
        name: item.name,
        role: item.role ?? "",
        company: item.company ?? "",
        icon: item.icon ?? "Quote",
        rating: item.rating,
        is_published: item.is_published,
        sort_order: item.sort_order,
      });
    } else {
      setForm(EMPTY);
    }
    setError(null);
  }, [open, item]);

  const set = <K extends keyof TestimonialInput>(key: K, value: TestimonialInput[K]) =>
    setForm((f) => ({ ...f, [key]: value }));

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!item) return; // edit-only: testimonials originate from the public form

    if (!form.quote.trim() || !form.name.trim()) {
      setError("Quote and name are required.");
      return;
    }

    const payload: TestimonialInput = {
      ...form,
      quote: form.quote.trim(),
      name: form.name.trim(),
      role: form.role?.trim() || null,
      company: form.company?.trim() || null,
    };

    setBusy(true);
    const res = await updateTestimonial(item.id, payload);
    setBusy(false);

    if (res.error) {
      setError(res.error);
      return;
    }
    if (res.data) onSaved(res.data);
  };

  return (
    <Modal open={open} onClose={onClose} title="Edit testimonial" wide>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <Field label="Quote" htmlFor="quote">
          <textarea
            id="quote"
            value={form.quote}
            onChange={(e) => set("quote", e.target.value)}
            rows={4}
            placeholder="They transformed our business…"
            className={inputCls}
          />
        </Field>

        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Name" htmlFor="name">
            <input
              id="name"
              value={form.name}
              onChange={(e) => set("name", e.target.value)}
              placeholder="Aarav Shrestha"
              className={inputCls}
            />
          </Field>
          <Field label="Role" htmlFor="role">
            <input
              id="role"
              value={form.role ?? ""}
              onChange={(e) => set("role", e.target.value)}
              placeholder="Founder"
              className={inputCls}
            />
          </Field>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Company" htmlFor="company">
            <input
              id="company"
              value={form.company ?? ""}
              onChange={(e) => set("company", e.target.value)}
              placeholder="Kathmandu Cart"
              className={inputCls}
            />
          </Field>
          <Field label="Icon" htmlFor="icon" hint="Shown beside the quote.">
            <select
              id="icon"
              value={form.icon ?? "Quote"}
              onChange={(e) => set("icon", e.target.value)}
              className={inputCls}
            >
              {TESTIMONIAL_ICON_KEYS.map((key) => (
                <option key={key} value={key}>
                  {key}
                </option>
              ))}
            </select>
          </Field>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Rating" htmlFor="rating">
            <select
              id="rating"
              value={form.rating}
              onChange={(e) => set("rating", Number(e.target.value))}
              className={inputCls}
            >
              {[5, 4, 3, 2, 1].map((n) => (
                <option key={n} value={n}>
                  {n} star{n > 1 ? "s" : ""}
                </option>
              ))}
            </select>
          </Field>
          <Field label="Sort order" htmlFor="sort" hint="Lower numbers appear first.">
            <input
              id="sort"
              type="number"
              value={form.sort_order}
              onChange={(e) => set("sort_order", Number(e.target.value) || 0)}
              className={inputCls}
            />
          </Field>
        </div>

        <label className="flex cursor-pointer items-center gap-3 rounded-xl border border-white/10 bg-white/[0.02] px-4 py-3">
          <input
            type="checkbox"
            checked={form.is_published}
            onChange={(e) => set("is_published", e.target.checked)}
            className="h-4 w-4 accent-brand"
          />
          <span className="text-sm text-ink">Published (visible on the site)</span>
        </label>

        {error && <Alert kind="error">{error}</Alert>}

        <FormActions onCancel={onClose} busy={busy} submitLabel="Save changes" />
      </form>
    </Modal>
  );
}

/** Skeleton card grid shown while testimonials load. */
function GridSkeleton() {
  return (
    <SkeletonGroup label="Loading testimonials…" className="grid gap-4 sm:grid-cols-2">
      {Array.from({ length: 4 }).map((_, i) => (
        <div
          key={i}
          className="flex flex-col rounded-2xl border border-white/10 bg-bg-900/50 p-5"
        >
          <div className="flex items-center justify-between">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-5 w-16 rounded-full" />
          </div>
          <div className="mt-3 space-y-2">
            <Skeleton className="h-3.5 w-full" />
            <Skeleton className="h-3.5 w-full" />
            <Skeleton className="h-3.5 w-2/3" />
          </div>
          <div className="mt-4 flex items-end justify-between gap-3">
            <div className="space-y-1.5">
              <Skeleton className="h-3.5 w-28" />
              <Skeleton className="h-3 w-20" />
            </div>
            <Skeleton className="h-8 w-16 rounded-lg" />
          </div>
        </div>
      ))}
    </SkeletonGroup>
  );
}

