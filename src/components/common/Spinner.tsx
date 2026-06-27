import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * The app's single spinning indicator. Wraps `Loader2` with the `animate-spin`
 * class so call sites stop repeating it (and so reduced-motion handling lives in
 * one place if we ever add it).
 */
export function Spinner({
  size = 18,
  className,
}: {
  size?: number;
  className?: string;
}) {
  return <Loader2 size={size} className={cn("animate-spin", className)} aria-hidden />;
}

/**
 * Full-area loading state: a centered spinner with a polite status for screen
 * readers. `className` overrides the default min-height / background so it can
 * fill a page (`min-h-[100svh]`) or just a section.
 */
export function LoadingScreen({
  label = "Loading…",
  className,
}: {
  label?: string;
  className?: string;
}) {
  return (
    <div
      role="status"
      aria-live="polite"
      className={cn(
        "flex items-center justify-center text-ink-muted",
        className ?? "min-h-[60svh]"
      )}
    >
      <Spinner />
      <span className="sr-only">{label}</span>
    </div>
  );
}
