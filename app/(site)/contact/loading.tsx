import {
  FormSkeleton,
  HeroSkeleton,
  PageLoading,
  Skeleton,
  SkeletonText,
} from "@/components/skeletons";

export default function ContactLoading() {
  return (
    <PageLoading label="Loading the contact page">
      <HeroSkeleton lines={1} />
      <div className="mt-16 grid gap-12 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <Skeleton className="h-3 w-24" />
          <div className="mt-7 space-y-7">
            {Array.from({ length: 4 }).map((_, index) => (
              <div key={index} className="flex gap-3">
                <Skeleton className="h-9 w-9 rounded-full" />
                <div className="flex-1">
                  <Skeleton className="h-2.5 w-20" />
                  <Skeleton className="mt-2 h-4 w-40" />
                </div>
              </div>
            ))}
          </div>
          <SkeletonText className="mt-8" lines={2} />
        </div>
        <div className="lg:col-span-7 lg:col-start-6">
          <FormSkeleton fields={6} />
        </div>
      </div>
    </PageLoading>
  );
}
