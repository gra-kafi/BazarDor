import React from "react";
import { ProductGridSkeleton } from "@/components/ProductCardSkeleton";

export default function CategoryLoading() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
      {/* Header skeleton */}
      <div className="bg-white rounded-2xl border border-gray-200 p-6 sm:p-8 flex items-center justify-between animate-pulse">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-gray-200"></div>
          <div className="space-y-2">
            <div className="w-24 h-4 bg-gray-200 rounded"></div>
            <div className="w-48 h-8 bg-gray-200 rounded"></div>
          </div>
        </div>
        <div className="w-32 h-10 bg-gray-200 rounded-lg"></div>
      </div>

      {/* Grid skeleton */}
      <ProductGridSkeleton count={8} />
    </div>
  );
}
