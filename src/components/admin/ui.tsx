/**
 * Small, dependency-free building blocks shared across admin screens:
 * a page header, a centered modal, an inline alert, and field wrappers.
 * Kept here so Blogs/Testimonials screens stay focused on their own logic.
 */
import { useEffect, type ReactNode } from "react";
import { createPortal } from "react-dom";
import { X, type LucideIcon } from "lucide-react";
import { Spinner } from "@/components/common/Spinner";
import { cn } from "@/lib/utils";

export function PageHeader({
  title,
  subtitle,
  action,
}: {
  title: string;
  subtitle?: string;
  action?: ReactNode;
}) {
  return (
    <div className="flex flex-wrap items-end justify-between gap-4">
      <div>
        <h1 className="font-display text-2xl font-semibold text-ink">{title}</h1>
        {subtitle && <p className="mt-1 text-sm text-ink-muted">{subtitle}</p>}
      </div>
      {action}
    </div>
  );
}

/** A centered, scrollable modal rendered into <body> via a portal. */
export function Modal({
  open,
  onClose,
  title,
  children,
  wide = false,
}: {
  open: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
  wide?: boolean;
}) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  if (!open) return null;

  return createPortal(
    <div className="fixed inset-0 z-[100] flex items-start justify-center overflow-y-auto bg-black/60 p-4 backdrop-blur-sm sm:p-8">
      <div
        className="absolute inset-0"
        onClick={onClose}
        aria-hidden
      />
      <div
        role="dialog"
        aria-modal
        className={cn(
          "relative my-auto w-full rounded-3xl border border-white/10 bg-bg-900 p-6 shadow-2xl sm:p-8",
          wide ? "max-w-2xl" : "max-w-lg"
        )}
      >
        <div className="mb-5 flex items-center justify-between">
          <h2 className="font-display text-lg font-semibold text-ink">{title}</h2>
          <button
            onClick={onClose}
            aria-label="Close"
            className="flex h-9 w-9 items-center justify-center rounded-xl text-ink-muted transition-colors hover:bg-white/5 hover:text-ink"
          >
            <X size={18} />
          </button>
        </div>
        {children}
      </div>
    </div>,
    document.body
  );
}

export function Alert({
  kind,
  children,
}: {
  kind: "error" | "success";
  children: ReactNode;
}) {
  return (
    <p
      className={cn(
        "rounded-xl border px-4 py-2.5 text-sm",
        kind === "error"
          ? "border-red-500/40 bg-red-500/10 text-red-300"
          : "border-emerald-500/40 bg-emerald-500/10 text-emerald-300"
      )}
    >
      {children}
    </p>
  );
}

export function Field({
  label,
  htmlFor,
  hint,
  children,
}: {
  label: string;
  htmlFor?: string;
  hint?: string;
  children: ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={htmlFor} className="text-sm font-medium text-ink">
        {label}
      </label>
      {children}
      {hint && <p className="text-xs text-ink-muted">{hint}</p>}
    </div>
  );
}

export const inputCls = cn(
  "w-full rounded-xl border border-white/10 bg-white/[0.03] px-3.5 py-2.5 text-sm text-ink placeholder:text-ink-muted/70 outline-none transition-all duration-200",
  "focus:border-brand/60 focus:bg-white/[0.05] focus:shadow-[0_0_0_3px_rgba(245, 166, 35,0.18)]"
);

export function Badge({
  children,
  tone = "neutral",
}: {
  children: ReactNode;
  tone?: "neutral" | "green" | "amber";
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ring-1",
        tone === "green" && "bg-emerald-500/10 text-emerald-300 ring-emerald-500/30",
        tone === "amber" && "bg-amber-500/10 text-amber-300 ring-amber-500/30",
        tone === "neutral" && "bg-white/5 text-ink-muted ring-white/10"
      )}
    >
      {children}
    </span>
  );
}

/** Square, icon-only action button used in table/list/card rows. */
export function IconButton({
  children,
  label,
  onClick,
  danger,
  busy,
  size = "md",
}: {
  children: ReactNode;
  label: string;
  onClick: () => void;
  danger?: boolean;
  busy?: boolean;
  size?: "sm" | "md";
}) {
  return (
    <button
      onClick={onClick}
      title={label}
      aria-label={label}
      disabled={busy}
      className={cn(
        "flex items-center justify-center rounded-lg text-ink-muted transition-colors disabled:opacity-50",
        size === "sm" ? "h-8 w-8" : "h-9 w-9",
        danger
          ? "hover:bg-red-500/10 hover:text-red-300"
          : "hover:bg-white/5 hover:text-ink"
      )}
    >
      {busy ? <Spinner size={15} /> : children}
    </button>
  );
}

/**
 * Destructive confirmation modal (delete a post / testimonial / message). The
 * body copy is passed as children so each caller can name the target inline.
 */
export function ConfirmDialog({
  open,
  onClose,
  onConfirm,
  title,
  busy,
  confirmLabel = "Delete",
  children,
}: {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  busy?: boolean;
  confirmLabel?: string;
  children: ReactNode;
}) {
  return (
    <Modal open={open} onClose={onClose} title={title}>
      <p className="text-sm text-ink-muted">{children}</p>
      <div className="mt-6 flex justify-end gap-3">
        <button
          onClick={onClose}
          className="rounded-xl px-4 py-2.5 text-sm font-medium text-ink-muted transition-colors hover:text-ink"
        >
          Cancel
        </button>
        <button
          onClick={onConfirm}
          disabled={busy}
          className="inline-flex items-center gap-2 rounded-xl bg-red-500/90 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-red-500 disabled:opacity-70"
        >
          {busy && <Spinner size={16} />}
          {confirmLabel}
        </button>
      </div>
    </Modal>
  );
}

/**
 * Column descriptor for {@link AdminTable}. `cell` renders the value for a row;
 * `className`/`headerClassName` carry per-column styling such as responsive
 * visibility (`"hidden sm:table-cell"`) or right-alignment for an actions column.
 */
export interface Column<T> {
  /** Stable key for React and the column identity. */
  key: string;
  header: ReactNode;
  cell: (row: T) => ReactNode;
  /** Extra classes on the `<td>` (e.g. responsive hiding, muted text). */
  className?: string;
  /** Extra classes on the `<th>` (defaults to matching `className`). */
  headerClassName?: string;
}

/**
 * Generic, styled data table for the admin screens. Owns the table chrome
 * (rounded border, header row, divided body, row hover) so pages only declare
 * their columns and rows. Use for tabular data; card/list layouts (testimonials,
 * messages) keep their bespoke markup.
 */
export function AdminTable<T>({
  columns,
  rows,
  rowKey,
}: {
  columns: Column<T>[];
  rows: T[];
  rowKey: (row: T) => string;
}) {
  return (
    <div className="overflow-hidden rounded-2xl border border-white/10">
      <table className="w-full text-left text-sm">
        <thead className="bg-bg-900/80 text-xs uppercase tracking-wide text-ink-muted">
          <tr>
            {columns.map((col) => (
              <th
                key={col.key}
                className={cn("px-4 py-3 font-medium", col.headerClassName ?? col.className)}
              >
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-white/5">
          {rows.map((row) => (
            <tr key={rowKey(row)} className="bg-bg-900/40 hover:bg-white/[0.03]">
              {columns.map((col) => (
                <td key={col.key} className={cn("px-4 py-3", col.className)}>
                  {col.cell(row)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/** Centered "nothing here yet" panel with an icon, copy and an optional action. */
export function EmptyState({
  icon: Icon,
  title,
  description,
  action,
}: {
  icon: LucideIcon;
  title: string;
  description: string;
  action?: ReactNode;
}) {
  return (
    <div className="flex flex-col items-center rounded-3xl border border-white/10 bg-bg-900/40 p-12 text-center">
      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-brand/15 ring-1 ring-brand/30">
        <Icon className="text-brand-light" />
      </div>
      <h3 className="mt-5 font-display text-lg font-semibold text-ink">{title}</h3>
      <p className="mt-1 max-w-sm text-sm text-ink-muted">{description}</p>
      {action && <div className="mt-5">{action}</div>}
    </div>
  );
}

/** Cancel + submit footer for the admin form modals, with a busy spinner. */
export function FormActions({
  onCancel,
  busy,
  submitLabel,
}: {
  onCancel: () => void;
  busy?: boolean;
  submitLabel: string;
}) {
  return (
    <div className="mt-2 flex justify-end gap-3">
      <button
        type="button"
        onClick={onCancel}
        className="rounded-xl px-4 py-2.5 text-sm font-medium text-ink-muted transition-colors hover:text-ink"
      >
        Cancel
      </button>
      <button
        type="submit"
        disabled={busy}
        className="inline-flex items-center gap-2 rounded-xl bg-brand-gradient px-5 py-2.5 text-sm font-semibold text-bg shadow-glow-sm transition-shadow hover:shadow-glow disabled:opacity-70"
      >
        {busy && <Spinner size={16} />}
        {submitLabel}
      </button>
    </div>
  );
}
