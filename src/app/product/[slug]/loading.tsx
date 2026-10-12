import React from "react";

export default function ProductLoading() {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8 animate-pulse">
      {/* Breadcrumb skeleton */}
      <div className="w-48 h-6 bg-gray-200 rounded"></div>

      {/* Top summary card skeleton */}
      <div className="bg-white rounded-3xl border border-gray-200 p-8 sm:p-10 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-5 w-full md:w-2/3">
          <div className="w-24 h-24 rounded-3xl bg-gray-200 shrink-0"></div>
          <div className="space-y-3 w-full">
            <div className="w-32 h-6 bg-gray-200 rounded-full"></div>
            <div className="w-64 h-9 bg-gray-200 rounded"></div>
            <div className="w-full h-4 bg-gray-200 rounded"></div>
          </div>
        </div>
        <div className="w-48 h-24 rounded-2xl bg-gray-200 shrink-0"></div>
      </div>

      {/* 3 Price Cards Skeleton */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="bg-white rounded-2xl border border-gray-200 p-6 h-28"></div>
        <div className="bg-white rounded-2xl border border-gray-200 p-6 h-28"></div>
        <div className="bg-white rounded-2xl border border-gray-200 p-6 h-28"></div>
      </div>

      {/* Market Table skeleton */}
      <div className="bg-white rounded-3xl border border-gray-200 p-8 h-96"></div>
    </div>
  );
}
