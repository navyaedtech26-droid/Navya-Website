/* eslint-disable react-refresh/only-export-components */
/**
 * Small, dependency-free building blocks shared across admin screens, styled
 * to match AdminLTE 3 / Bootstrap 4 conventions (card, modal, badge, table).
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
    <div className="flex flex-wrap items-end justify-between gap-4 border-b border-[#dee2e6] pb-4">
      <div>
        <h1 className="text-xl font-medium text-[#212529]">{title}</h1>
        {subtitle && <p className="mt-1 text-sm text-[#6c757d]">{subtitle}</p>}
      </div>
      {action}
    </div>
  );
}

/** AdminLTE-style card: white surface, subtle border + shadow. */
export function Card({
  title,
  subtitle,
  tools,
  className,
  bodyClassName,
  children,
}: {
  title?: ReactNode;
  subtitle?: ReactNode;
  tools?: ReactNode;
  className?: string;
  bodyClassName?: string;
  children: ReactNode;
}) {
  return (
    <div
      className={cn(
        "rounded-[3px] border border-[#dee2e6] bg-white shadow-[0_0_1px_rgba(0,0,0,.125),0_1px_3px_rgba(0,0,0,.1)]",
        className
      )}
    >
      {(title || tools) && (
        <div className="flex items-center justify-between gap-3 border-b border-[#dee2e6] px-4 py-3">
          <div>
            {title && <h3 className="text-sm font-semibold text-[#212529]">{title}</h3>}
            {subtitle && <p className="mt-0.5 text-xs text-[#6c757d]">{subtitle}</p>}
          </div>
          {tools}
        </div>
      )}
      <div className={cn("p-4", bodyClassName)}>{children}</div>
    </div>
  );
}

/** A centered, scrollable Bootstrap-style modal rendered into <body> via a portal. */
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
    <div className="fixed inset-0 z-[100] flex items-start justify-center overflow-y-auto bg-black/50 p-4 sm:p-8">
      <div className="absolute inset-0" onClick={onClose} aria-hidden />
      <div
        role="dialog"
        aria-modal
        className={cn(
          "relative my-auto w-full rounded-[3px] border border-[#dee2e6] bg-white shadow-lg",
          wide ? "max-w-2xl" : "max-w-lg"
        )}
      >
        <div className="flex items-center justify-between border-b border-[#dee2e6] px-5 py-3.5">
          <h2 className="text-base font-semibold text-[#212529]">{title}</h2>
          <button
            onClick={onClose}
            aria-label="Close"
            className="flex h-8 w-8 items-center justify-center rounded text-[#6c757d] transition-colors hover:bg-[#f4f6f9] hover:text-[#212529]"
          >
            <X size={18} />
          </button>
        </div>
        <div className="p-5">{children}</div>
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
        "rounded-[3px] border px-4 py-2.5 text-sm",
        kind === "error"
          ? "border-[#f5c6cb] bg-[#f8d7da] text-[#721c24]"
          : "border-[#c3e6cb] bg-[#d4edda] text-[#155724]"
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
      <label htmlFor={htmlFor} className="text-sm font-medium text-[#212529]">
        {label}
      </label>
      {children}
      {hint && <p className="text-xs text-[#6c757d]">{hint}</p>}
    </div>
  );
}

export const inputCls = cn(
  "w-full rounded-[3px] border border-[#ced4da] bg-white px-3 py-2 text-sm text-[#495057] placeholder:text-[#6c757d]/70 outline-none transition-[border-color,box-shadow] duration-150",
  "focus:border-[#80bdff] focus:shadow-[0_0_0_0.2rem_rgba(0,123,255,0.25)]"
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
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium text-white",
        tone === "green" && "bg-[#28a745]",
        tone === "amber" && "bg-[#ffc107] text-[#212529]",
        tone === "neutral" && "bg-[#6c757d]"
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
        "flex items-center justify-center rounded-[3px] border transition-colors disabled:opacity-50",
        size === "sm" ? "h-8 w-8" : "h-9 w-9",
        danger
          ? "border-[#dc3545]/30 text-[#dc3545] hover:bg-[#dc3545] hover:text-white"
          : "border-[#ced4da] text-[#495057] hover:bg-[#f4f6f9]"
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
      <p className="text-sm text-[#495057]">{children}</p>
      <div className="mt-6 flex justify-end gap-2 border-t border-[#dee2e6] pt-4">
        <button
          onClick={onClose}
          className="rounded-[3px] border border-[#ced4da] px-4 py-2 text-sm font-medium text-[#495057] transition-colors hover:bg-[#f4f6f9]"
        >
          Cancel
        </button>
        <button
          onClick={onConfirm}
          disabled={busy}
          className="inline-flex items-center gap-2 rounded-[3px] bg-[#dc3545] px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-[#c82333] disabled:opacity-70"
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
 * Generic, styled data table for the admin screens — mirrors AdminLTE's
 * `table table-bordered table-striped table-hover` pattern. Use for tabular
 * data; card/list layouts (testimonials, messages) keep their bespoke markup.
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
    <div className="overflow-hidden overflow-x-auto rounded-[3px] border border-[#dee2e6]">
      <table className="w-full text-left text-sm">
        <thead className="bg-[#f4f6f9] text-xs uppercase tracking-wide text-[#6c757d]">
          <tr>
            {columns.map((col) => (
              <th
                key={col.key}
                className={cn(
                  "border-b border-[#dee2e6] px-4 py-2.5 font-semibold",
                  col.headerClassName ?? col.className
                )}
              >
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-[#dee2e6]">
          {rows.map((row, i) => (
            <tr
              key={rowKey(row)}
              className={cn(i % 2 === 1 ? "bg-[#f9fafb]" : "bg-white", "hover:bg-[#f1f5f9]")}
            >
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
    <div className="flex flex-col items-center rounded-[3px] border border-dashed border-[#dee2e6] bg-white p-12 text-center">
      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#e7f1ff]">
        <Icon className="text-[#007bff]" />
      </div>
      <h3 className="mt-5 text-base font-semibold text-[#212529]">{title}</h3>
      <p className="mt-1 max-w-sm text-sm text-[#6c757d]">{description}</p>
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
    <div className="mt-2 flex justify-end gap-2 border-t border-[#dee2e6] pt-4">
      <button
        type="button"
        onClick={onCancel}
        className="rounded-[3px] border border-[#ced4da] px-4 py-2 text-sm font-medium text-[#495057] transition-colors hover:bg-[#f4f6f9]"
      >
        Cancel
      </button>
      <button
        type="submit"
        disabled={busy}
        className="inline-flex items-center gap-2 rounded-[3px] bg-[#007bff] px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-[#0069d9] disabled:opacity-70"
      >
        {busy && <Spinner size={16} />}
        {submitLabel}
      </button>
    </div>
  );
}
