import { cn } from "@/lib/utils";

/**
 * A single shimmering placeholder block. Compose several together to mirror the
 * shape of the content that's loading (text lines, avatars, cards) so the page
 * doesn't reflow when real data arrives.
 *
 * The sweep runs on a GPU-friendly `translateX` and is paused automatically for
 * `prefers-reduced-motion` users (the global rule in index.css collapses the
 * animation), leaving a calm static block.
 */
export function Skeleton({ className }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={cn(
        "relative overflow-hidden rounded-md bg-white/[0.06]",
        "after:absolute after:inset-0 after:-translate-x-full after:animate-skeleton",
        "after:bg-gradient-to-r after:from-transparent after:via-white/10 after:to-transparent",
        className
      )}
    />
  );
}

/**
 * Wrapper that hides a block of skeletons from the a11y tree while exposing a
 * polite "loading" status so screen-reader users hear that content is on its
 * way instead of silence.
 */
export function SkeletonGroup({
  label = "Loading…",
  className,
  children,
}: {
  label?: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div role="status" aria-busy="true" aria-live="polite" className={className}>
      <span className="sr-only">{label}</span>
      {children}
    </div>
  );
}
