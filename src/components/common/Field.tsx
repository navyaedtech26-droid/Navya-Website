import {
  cloneElement,
  forwardRef,
  isValidElement,
  type ReactElement,
  type ReactNode,
  type InputHTMLAttributes,
  type TextareaHTMLAttributes,
  type SelectHTMLAttributes,
} from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

/**
 * Shared input styling for the public-facing forms (contact, testimonial,
 * admin login). Pass `error` to switch the border to the danger colour.
 *
 * The admin CRUD screens use a slightly tighter variant — see
 * `inputCls` in `@/components/admin/ui`.
 */
export function inputClass(error?: boolean): string {
  return cn(
    "w-full rounded-xl border bg-white/[0.03] px-4 py-3 text-sm text-ink placeholder:text-ink-muted/70 outline-none transition-all duration-200",
    "focus:border-brand/60 focus:bg-white/[0.05] focus:shadow-[0_0_0_3px_rgba(30, 107, 255,0.18)]",
    error ? "border-red-500/60" : "border-white/10"
  );
}

type InputProps = InputHTMLAttributes<HTMLInputElement> & { error?: boolean };
export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ error, className, ...props }, ref) => (
    <input ref={ref} className={cn(inputClass(error), className)} {...props} />
  )
);
Input.displayName = "Input";

type TextareaProps = TextareaHTMLAttributes<HTMLTextAreaElement> & {
  error?: boolean;
};
export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ error, className, ...props }, ref) => (
    <textarea ref={ref} className={cn(inputClass(error), className)} {...props} />
  )
);
Textarea.displayName = "Textarea";

type SelectProps = SelectHTMLAttributes<HTMLSelectElement> & { error?: boolean };
export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ error, className, ...props }, ref) => (
    <select
      ref={ref}
      className={cn(inputClass(error), "appearance-none", className)}
      {...props}
    />
  )
);
Select.displayName = "Select";

/**
 * Labelled form field with optional required marker and an animated, accessible
 * error message. The single control child is cloned to wire up `aria-invalid`,
 * `aria-describedby` and `aria-required` so call sites don't repeat them.
 */
export function Field({
  label,
  id,
  required,
  error,
  children,
  className,
}: {
  label: string;
  id: string;
  required?: boolean;
  error?: string;
  children: ReactNode;
  className?: string;
}) {
  const errorId = `${id}-error`;
  const control =
    isValidElement(children)
      ? cloneElement(children as ReactElement<Record<string, unknown>>, {
          "aria-invalid": error ? true : undefined,
          "aria-describedby": error ? errorId : undefined,
          "aria-required": required || undefined,
        })
      : children;

  return (
    <div className={cn("flex flex-col gap-2", className)}>
      <label htmlFor={id} className="text-sm font-medium text-ink">
        {label}
        {required && <span className="ml-1 text-cyan-accent">*</span>}
      </label>
      {control}
      <AnimatePresence>
        {error && (
          <motion.span
            id={errorId}
            role="alert"
            initial={{ opacity: 0, y: -4, height: 0 }}
            animate={{ opacity: 1, y: 0, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="text-xs text-red-400"
          >
            {error}
          </motion.span>
        )}
      </AnimatePresence>
    </div>
  );
}
