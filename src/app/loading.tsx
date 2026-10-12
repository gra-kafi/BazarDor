import React from "react";
import { ProductGridSkeleton } from "@/components/ProductCardSkeleton";

export default function HomeLoading() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-12">
      {/* Hero skeleton */}
      <div className="bg-white rounded-3xl border border-gray-200 p-8 sm:p-12 animate-pulse flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="space-y-4 w-full md:w-1/2">
          <div className="w-32 h-6 bg-gray-200 rounded-full"></div>
          <div className="w-full h-10 bg-gray-200 rounded"></div>
          <div className="w-3/4 h-5 bg-gray-200 rounded"></div>
          <div className="w-40 h-12 bg-gray-200 rounded-xl"></div>
        </div>
        <div className="w-64 h-64 bg-gray-200 rounded-full"></div>
      </div>

      {/* Grid skeleton */}
      <div className="space-y-4">
        <div className="w-48 h-8 bg-gray-200 rounded animate-pulse"></div>
        <ProductGridSkeleton count={6} />
      </div>
    </div>
  );
}
