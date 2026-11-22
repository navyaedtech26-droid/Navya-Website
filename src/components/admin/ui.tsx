/* eslint-disable react-refresh/only-export-components */
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
    <div className="flex flex-wrap items-end justify-between gap-4 pb-6 border-b border-border/60">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-foreground">{title}</h1>
        {subtitle && <p className="mt-1 text-sm text-muted-foreground">{subtitle}</p>}
      </div>
      {action}
    </div>
  );
}

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
        "rounded-2xl border border-border/80 bg-white shadow-[0_2px_12px_rgba(0,0,0,0.03)] overflow-hidden dark:bg-card",
        className
      )}
    >
      {(title || tools) && (
        <div className="flex items-center justify-between gap-4 border-b border-border/60 px-6 py-4">
          <div>
            {title && <h3 className="text-sm font-semibold tracking-tight text-foreground">{title}</h3>}
            {subtitle && <p className="mt-0.5 text-xs text-muted-foreground">{subtitle}</p>}
          </div>
          {tools}
        </div>
      )}
      <div className={cn("p-6", bodyClassName)}>{children}</div>
    </div>
  );
}

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
    <div className="fixed inset-0 z-[100] flex items-start justify-center overflow-y-auto bg-slate-900/40 backdrop-blur-sm p-4 sm:p-8">
      <div className="absolute inset-0" onClick={onClose} aria-hidden />
      <div
        role="dialog"
        aria-modal
        className={cn(
          "relative my-auto w-full rounded-2xl border border-border/80 bg-white shadow-2xl overflow-hidden dark:bg-card",
          wide ? "max-w-2xl" : "max-w-lg"
        )}
      >
        <div className="flex items-center justify-between border-b border-border/60 px-6 py-4">
          <h2 className="text-base font-bold tracking-tight text-foreground">{title}</h2>
          <button
            onClick={onClose}
            aria-label="Close"
            className="flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-slate-100 hover:text-foreground"
          >
            <X size={18} />
          </button>
        </div>
        <div className="p-6">{children}</div>
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
    <div
      className={cn(
        "rounded-xl border px-4 py-3 text-sm font-medium",
        kind === "error"
          ? "border-rose-200 bg-rose-50 text-rose-800"
          : "border-emerald-200 bg-emerald-50 text-emerald-800"
      )}
    >
      {children}
    </div>
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
      <label htmlFor={htmlFor} className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
        {label}
      </label>
      {children}
      {hint && <p className="text-xs text-muted-foreground">{hint}</p>}
    </div>
  );
}

export const inputCls = cn(
  "w-full rounded-xl border border-border/80 bg-slate-50/50 px-3.5 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/60 outline-none transition-all duration-150",
  "focus:border-primary focus:bg-white focus:ring-2 focus:ring-primary/10 shadow-sm"
);

export function Badge({
  children,
  tone = "neutral",
}: {
  children: ReactNode;
  tone?: "neutral" | "green" | "amber" | "red" | "blue";
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold tracking-wide border",
        tone === "green" && "bg-emerald-50 text-emerald-700 border-emerald-200/80",
        tone === "amber" && "bg-amber-50 text-amber-700 border-amber-200/80",
        tone === "red" && "bg-rose-50 text-rose-700 border-rose-200/80",
        tone === "blue" && "bg-blue-50 text-blue-700 border-blue-200/80",
        tone === "neutral" && "bg-slate-100 text-slate-700 border-slate-200/80"
      )}
    >
      {children}
    </span>
  );
}

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
        "flex items-center justify-center rounded-xl border transition-all disabled:opacity-50 shadow-sm",
        size === "sm" ? "h-8 w-8" : "h-9 w-9",
        danger
          ? "border-rose-200 text-rose-600 hover:bg-rose-50 hover:border-rose-300"
          : "border-border/80 text-muted-foreground bg-white hover:bg-slate-50 hover:text-foreground"
      )}
    >
      {busy ? <Spinner size={15} /> : children}
    </button>
  );
}

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
      <p className="text-sm text-muted-foreground leading-relaxed">{children}</p>
      <div className="mt-6 flex justify-end gap-3 border-t border-border/60 pt-4">
        <button
          onClick={onClose}
          className="rounded-xl border border-border px-4 py-2 text-sm font-semibold text-muted-foreground transition-all hover:bg-slate-50 hover:text-foreground shadow-sm"
        >
          Cancel
        </button>
        <button
          onClick={onConfirm}
          disabled={busy}
          className="inline-flex items-center gap-2 rounded-xl bg-rose-600 px-4 py-2 text-sm font-semibold text-white transition-all hover:bg-rose-700 disabled:opacity-70 shadow-sm"
        >
          {busy && <Spinner size={16} />}
          {confirmLabel}
        </button>
      </div>
    </Modal>
  );
}

export interface Column<T> {
  key: string;
  header: ReactNode;
  cell: (row: T) => ReactNode;
  className?: string;
  headerClassName?: string;
}

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
    <div className="overflow-hidden overflow-x-auto rounded-2xl border border-border/80 bg-white shadow-[0_2px_12px_rgba(0,0,0,0.03)]">
      <table className="w-full text-left text-sm">
        <thead className="bg-slate-50/70 text-[11px] uppercase tracking-wider font-bold text-muted-foreground border-b border-border/60">
          <tr>
            {columns.map((col) => (
              <th
                key={col.key}
                className={cn(
                  "px-6 py-3.5 font-bold",
                  col.headerClassName ?? col.className
                )}
              >
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-border/50">
          {rows.map((row) => (
            <tr
              key={rowKey(row)}
              className="transition-colors hover:bg-slate-50/70"
            >
              {columns.map((col) => (
                <td key={col.key} className={cn("px-6 py-4", col.className)}>
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
    <div className="flex flex-col items-center rounded-2xl border border-dashed border-border/80 bg-white p-12 text-center shadow-[0_2px_12px_rgba(0,0,0,0.02)]">
      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary">
        <Icon className="size-6" />
      </div>
      <h3 className="mt-4 text-base font-bold text-foreground">{title}</h3>
      <p className="mt-1 max-w-sm text-sm text-muted-foreground">{description}</p>
      {action && <div className="mt-6">{action}</div>}
    </div>
  );
}

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
    <div className="mt-6 flex justify-end gap-3 border-t border-border/60 pt-4">
      <button
        type="button"
        onClick={onCancel}
        className="rounded-xl border border-border px-4 py-2.5 text-sm font-semibold text-muted-foreground transition-all hover:bg-slate-50 hover:text-foreground shadow-sm"
      >
        Cancel
      </button>
      <button
        type="submit"
        disabled={busy}
        className="inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-sm font-bold text-white transition-all hover:bg-primary/90 disabled:opacity-70 shadow-sm"
      >
        {busy && <Spinner size={16} />}
        {submitLabel}
      </button>
    </div>
  );
}
