import {
  ArticleSkeleton,
  HeroSkeleton,
  PageLoading,
  StatStripSkeleton,
} from "@/components/skeletons";

export default function MissionLoading() {
  return (
    <PageLoading label="Loading the mission page">
      <HeroSkeleton lines={1} />
      <div className="mt-16">
        <ArticleSkeleton />
      </div>
      <div className="mt-16">
        <StatStripSkeleton />
      </div>
    </PageLoading>
  );
}
