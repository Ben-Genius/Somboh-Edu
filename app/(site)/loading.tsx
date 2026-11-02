import { BrandLoader } from "@/components/brand-loader";

/** Route loading state: the brand loader instead of a blank page. */
export default function Loading() {
  return (
    <div className="bg-hero-blend grid min-h-[70svh] place-items-center">
      <BrandLoader />
    </div>
  );
}
