import {
  HeroSkeleton,
  PageLoading,
  RowsSkeleton,
  StatStripSkeleton,
} from "@/components/skeletons";

export default function HomeLoading() {
  return (
    <PageLoading label="Loading the home page">
      <HeroSkeleton lines={2} />
      <div className="mt-16">
        <StatStripSkeleton />
      </div>
      <div className="mt-16">
        <RowsSkeleton count={5} />
      </div>
    </PageLoading>
  );
}
