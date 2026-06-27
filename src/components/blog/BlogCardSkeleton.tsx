import { Skeleton } from "@/components/common/Skeleton";

/**
 * Placeholder that matches BlogCard's footprint (eyebrow row, title, excerpt,
 * author footer) so the blog grid holds its shape while posts load.
 */
export default function BlogCardSkeleton() {
  return (
    <div className="flex h-full flex-col rounded-2xl border border-white/[0.08] bg-white/[0.02] p-6 sm:p-7">
      {/* Eyebrow: category pill + read time */}
      <div className="flex items-center justify-between gap-3">
        <Skeleton className="h-6 w-24 rounded-full" />
        <Skeleton className="h-4 w-16" />
      </div>

      {/* Title (two lines) */}
      <div className="mt-5 space-y-2">
        <Skeleton className="h-5 w-full" />
        <Skeleton className="h-5 w-4/5" />
      </div>

      {/* Excerpt */}
      <div className="mt-4 flex-1 space-y-2">
        <Skeleton className="h-3.5 w-full" />
        <Skeleton className="h-3.5 w-full" />
        <Skeleton className="h-3.5 w-2/3" />
      </div>

      {/* Footer: avatar + author/date, arrow */}
      <div className="mt-6 flex items-center justify-between gap-3 border-t border-white/[0.08] pt-5">
        <div className="flex min-w-0 items-center gap-3">
          <Skeleton className="h-9 w-9 shrink-0 rounded-full" />
          <div className="space-y-1.5">
            <Skeleton className="h-3 w-20" />
            <Skeleton className="h-3 w-24" />
          </div>
        </div>
        <Skeleton className="h-9 w-9 shrink-0 rounded-full" />
      </div>
    </div>
  );
}
