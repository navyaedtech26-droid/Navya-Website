import { Skeleton } from "@/components/common/Skeleton";

/**
 * Placeholder that matches BlogCard's footprint (cover banner, title,
 * excerpt, author footer) so the blog grid holds its shape while posts load.
 */
export default function BlogCardSkeleton() {
  return (
    <div className="flex h-full flex-col overflow-hidden rounded-2xl card-light">
      {/* Cover banner */}
      <Skeleton className="h-44 w-full rounded-none sm:h-48" />

      <div className="flex flex-1 flex-col p-6 sm:p-7">
        {/* Title (two lines) */}
        <div className="space-y-2">
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
        <div className="mt-6 flex items-center justify-between gap-3 border-t border-line pt-5">
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
    </div>
  );
}
