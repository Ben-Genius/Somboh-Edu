import {
  HeroSkeleton,
  PageLoading,
  RowsSkeleton,
  Skeleton,
} from "@/components/skeletons";

export default function ProgramsLoading() {
  return (
    <PageLoading label="Loading the programs page">
      <HeroSkeleton lines={1} />
      <div className="mt-12 border-y border-line py-4">
        <Skeleton className="h-8 w-full max-w-3xl" />
      </div>
      <div className="mt-4">
        <RowsSkeleton count={5} />
      </div>
    </PageLoading>
  );
}
