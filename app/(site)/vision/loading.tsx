import {
  ArticleSkeleton,
  HeroSkeleton,
  PageLoading,
  StatStripSkeleton,
} from "@/components/skeletons";

export default function VisionLoading() {
  return (
    <PageLoading label="Loading the vision page">
      <HeroSkeleton lines={1} />
      <div className="mt-16">
        <ArticleSkeleton />
      </div>
      <div className="mt-16">
        <StatStripSkeleton count={2} />
      </div>
    </PageLoading>
  );
}
