import { Skeleton } from "@/components/common/Skeleton";

/** Loading placeholder matching FeaturedPost's cover + content split. */
export default function FeaturedPostSkeleton() {
  return (
    <div className="grid overflow-hidden rounded-3xl card-light lg:grid-cols-2">
      <Skeleton className="h-64 w-full rounded-none lg:h-full" />
      <div className="flex flex-col justify-center p-8 sm:p-10 lg:p-12">
        <Skeleton className="h-6 w-28 rounded-full" />
        <div className="mt-5 space-y-3">
          <Skeleton className="h-8 w-full" />
          <Skeleton className="h-8 w-3/4" />
        </div>
        <div className="mt-5 space-y-2">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-2/3" />
        </div>
        <div className="mt-8 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Skeleton className="h-10 w-10 shrink-0 rounded-full" />
            <div className="space-y-1.5">
              <Skeleton className="h-3 w-20" />
              <Skeleton className="h-3 w-24" />
            </div>
          </div>
          <Skeleton className="h-10 w-32 rounded-full" />
        </div>
      </div>
    </div>
  );
}
