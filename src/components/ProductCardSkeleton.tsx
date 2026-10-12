import React from "react";

export default function ProductCardSkeleton() {
  return (
    <div className="bg-white rounded-2xl border border-gray-200/90 p-5 animate-pulse">
      {/* Top: Icon + Badge Skeleton */}
      <div className="flex items-start justify-between mb-4">
        <div className="w-14 h-14 rounded-2xl bg-gray-200"></div>
        <div className="w-14 h-5 rounded-full bg-gray-200"></div>
      </div>

      {/* Title & Unit Skeleton */}
      <div className="mb-4 space-y-2">
        <div className="w-3/4 h-5 rounded bg-gray-200"></div>
        <div className="w-1/3 h-3 rounded bg-gray-200"></div>
      </div>

      {/* Divider */}
      <div className="border-t border-gray-100 pt-3">
        <div className="flex items-end justify-between">
          <div className="space-y-1.5">
            <div className="w-16 h-3 rounded bg-gray-200"></div>
            <div className="w-20 h-6 rounded bg-gray-200"></div>
          </div>
          <div className="w-14 h-6 rounded-lg bg-gray-200"></div>
        </div>
      </div>
    </div>
  );
}

export function ProductGridSkeleton({ count = 6 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
      {Array.from({ length: count }).map((_, i) => (
        <ProductCardSkeleton key={i} />
      ))}
    </div>
  );
}
