import { cn } from "@/lib/utils";

/** A faint glowing grid panel, used as a localized background accent. */
export default function GlowGrid({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "pointer-events-none absolute inset-0 grid-bg opacity-40 [mask-image:radial-gradient(ellipse_at_center,black,transparent_70%)]",
        className
      )}
    />
  );
}
