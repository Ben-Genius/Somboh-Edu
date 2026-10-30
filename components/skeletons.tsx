/**
 * Loading placeholders. These are intentionally shaped like the page that is
 * arriving, so the layout does not jump when real content replaces them.
 * All blocks are aria-hidden; the wrapper announces politely instead.
 */
import type { ReactNode } from "react";

export function Skeleton({
  className = "",
}: {
  className?: string;
}) {
  return (
    <div
      aria-hidden="true"
      className={`animate-pulse rounded-md bg-clay ${className}`}
    />
  );
}

export function SkeletonText({
  lines = 3,
  className = "",
}: {
  lines?: number;
  className?: string;
}) {
  return (
    <div aria-hidden="true" className={`space-y-3 ${className}`}>
      {Array.from({ length: lines }).map((_, index) => (
        <div
          key={index}
          className="h-3.5 animate-pulse rounded bg-clay"
          style={{ width: index === lines - 1 ? "68%" : "100%" }}
        />
      ))}
    </div>
  );
}

export function PageLoading({
  children,
  label = "Loading page",
}: {
  children: ReactNode;
  label?: string;
}) {
  return (
    <div className="shell section" role="status" aria-live="polite">
      <span className="sr-only">{label}</span>
      {children}
    </div>
  );
}

export function HeroSkeleton({
  lines = 2,
  lede = true,
}: {
  lines?: number;
  lede?: boolean;
}) {
  return (
    <div aria-hidden="true">
      <Skeleton className="h-3 w-36" />
      <div className="mt-7 space-y-4">
        {Array.from({ length: lines }).map((_, index) => (
          <Skeleton
            key={index}
            className="h-[clamp(2.7rem,7vw,5.4rem)] w-full max-w-4xl"
          />
        ))}
      </div>
      {lede ? <SkeletonText className="mt-8 max-w-xl" lines={2} /> : null}
    </div>
  );
}

export function StatStripSkeleton({ count = 4 }: { count?: number }) {
  return (
    <div
      aria-hidden="true"
      className="grid gap-px overflow-hidden rounded-[1.25rem] border border-line bg-line sm:grid-cols-2 lg:grid-cols-4"
    >
      {Array.from({ length: count }).map((_, index) => (
        <div key={index} className="bg-paper p-6">
          <Skeleton className="h-[clamp(3rem,6vw,4.6rem)] w-24" />
          <SkeletonText className="mt-5" lines={2} />
        </div>
      ))}
    </div>
  );
}

export function RowsSkeleton({ count = 5 }: { count?: number }) {
  return (
    <div aria-hidden="true" className="border-b border-line">
      {Array.from({ length: count }).map((_, index) => (
        <div key={index} className="grid gap-4 border-t border-line py-8 sm:grid-cols-[3rem_1fr]">
          <Skeleton className="h-4 w-8" />
          <div>
            <Skeleton className="h-7 w-[min(26rem,80%)]" />
            <SkeletonText className="mt-4 max-w-2xl" lines={2} />
          </div>
        </div>
      ))}
    </div>
  );
}

export function FormSkeleton({ fields = 5 }: { fields?: number }) {
  return (
    <div aria-hidden="true" className="panel p-6 sm:p-8">
      <div className="grid gap-5 sm:grid-cols-2">
        {Array.from({ length: fields }).map((_, index) => (
          <div
            key={index}
            className={index === fields - 1 ? "sm:col-span-2" : ""}
          >
            <Skeleton className="h-3 w-28" />
            <Skeleton className="mt-3 h-12 w-full" />
          </div>
        ))}
      </div>
      <Skeleton className="mt-6 h-12 w-36" />
    </div>
  );
}

export function ArticleSkeleton() {
  return (
    <div aria-hidden="true" className="grid gap-10 lg:grid-cols-12">
      <div className="lg:col-span-3">
        <Skeleton className="h-3 w-24" />
      </div>
      <div className="lg:col-span-8 lg:col-start-5">
        <Skeleton className="h-10 w-4/5" />
        <SkeletonText className="mt-8" lines={5} />
        <SkeletonText className="mt-8" lines={4} />
      </div>
    </div>
  );
}
