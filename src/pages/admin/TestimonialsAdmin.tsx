/**
 * Testimonial management: list, create, edit, delete, and toggle the published
 * flag. `sort_order` controls the order they appear on the public site
 * (ascending).
 */
import { useEffect, useState, type FormEvent } from "react";
import { Plus, Pencil, Trash2, Star, MessageSquareQuote } from "lucide-react";
import {
  listTestimonials,
  createTestimonial,
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
  const [items, setItems] = useState<TestimonialRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [editing, setEditing] = useState<TestimonialRow | null>(null);
  const [creating, setCreating] = useState(false);
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
    setItems((prev) => {
      const exists = prev.some((t) => t.id === saved.id);
      return sortItems(
        exists ? prev.map((t) => (t.id === saved.id ? saved : t)) : [saved, ...prev]
      );
    });
    setCreating(false);
    setEditing(null);
  };

  const togglePublish = async (t: TestimonialRow) => {
    setTogglingId(t.id);
    const res = await updateTestimonial(t.id, { is_published: !t.is_published });
    setTogglingId(null);
    if (res.error) {
      setError(res.error);
      return;
    }
    if (res.data) handleSaved(res.data);
  };

  const handleDelete = async () => {
    if (!deleting) return;
    setDeleteBusy(true);
    const res = await deleteTestimonial(deleting.id);
    setDeleteBusy(false);
    if (res.error) {
      setError(res.error);
      return;
    }
    setItems((prev) => prev.filter((t) => t.id !== deleting.id));
    setDeleting(null);
  };

  return (
    <div className="space-y-8">
      <PageHeader
        title="Testimonials"
        subtitle="Client quotes shown across the site. Lower sort order appears first."
        action={
          <button
            onClick={() => setCreating(true)}
            className="inline-flex items-center gap-2 rounded-xl bg-brand-gradient px-4 py-2.5 text-sm font-semibold text-white shadow-glow-sm transition-shadow hover:shadow-glow"
          >
            <Plus size={16} />
            New testimonial
          </button>
        }
      />

      {error && <Alert kind="error">{error}</Alert>}

      {loading ? (
        <GridSkeleton />
      ) : items.length === 0 ? (
        <EmptyState
          icon={MessageSquareQuote}
          title="No testimonials yet"
          description="Add client quotes to build trust. The public site falls back to sample quotes until you publish real ones."
          action={
            <button
              onClick={() => setCreating(true)}
              className="inline-flex items-center gap-2 rounded-xl bg-brand-gradient px-4 py-2.5 text-sm font-semibold text-white shadow-glow-sm transition-shadow hover:shadow-glow"
            >
              <Plus size={16} />
              New testimonial
            </button>
          }
        />
      ) : (
        <div className="grid gap-4 sm:grid-cols-2">
          {items.map((t) => (
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
                <Badge tone={t.is_published ? "green" : "neutral"}>
                  {t.is_published ? "Published" : "Hidden"}
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
        open={creating || editing !== null}
        item={editing}
        onClose={() => {
          setCreating(false);
          setEditing(null);
        }}
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
    const res = item
      ? await updateTestimonial(item.id, payload)
      : await createTestimonial(payload);
    setBusy(false);

    if (res.error) {
      setError(res.error);
      return;
    }
    if (res.data) onSaved(res.data);
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      title={item ? "Edit testimonial" : "New testimonial"}
      wide
    >
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

        <FormActions
          onCancel={onClose}
          busy={busy}
          submitLabel={item ? "Save changes" : "Create"}
        />
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

