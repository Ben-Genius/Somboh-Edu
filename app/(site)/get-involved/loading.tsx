import {
  FormSkeleton,
  HeroSkeleton,
  PageLoading,
  Skeleton,
  SkeletonText,
} from "@/components/skeletons";

export default function GetInvolvedLoading() {
  return (
    <PageLoading label="Loading the get involved page">
      <HeroSkeleton lines={1} />
      <div className="mt-12 flex gap-3 border-b border-line pb-3">
        <Skeleton className="h-10 w-24" />
        <Skeleton className="h-10 w-24" />
        <Skeleton className="h-10 w-20" />
      </div>
      <div className="mt-10 grid gap-10 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <Skeleton className="h-3 w-32" />
          <Skeleton className="mt-6 h-12 w-3/4" />
          <SkeletonText className="mt-5" lines={3} />
        </div>
        <div className="lg:col-span-7 lg:col-start-6">
          <FormSkeleton fields={8} />
        </div>
      </div>
    </PageLoading>
  );
}
