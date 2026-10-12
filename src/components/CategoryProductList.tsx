"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { Product, Category } from "@/lib/types";
import ProductCard from "./ProductCard";
import SortDropdown, { SortOption } from "./SortDropdown";
import { ArrowLeft, Home } from "lucide-react";

interface CategoryProductListProps {
  category: Category | null;
  initialProducts: Product[];
}

export default function CategoryProductList({
  category,
  initialProducts,
}: CategoryProductListProps) {
  const [currentSort, setCurrentSort] = useState<SortOption>("default");

  const sortedProducts = useMemo(() => {
    const list = [...initialProducts];
    if (currentSort === "price-asc") {
      list.sort((a, b) => Number(a.today) - Number(b.today));
    } else if (currentSort === "price-desc") {
      list.sort((a, b) => Number(b.today) - Number(a.today));
    }
    return list;
  }, [initialProducts, currentSort]);

  // Empty state if invalid category or no items
  if (!category || initialProducts.length === 0) {
    return (
      <div className="max-w-xl mx-auto py-16 px-4 text-center">
        <div className="bg-white rounded-3xl border border-gray-200 p-10 sm:p-12 shadow-sm">
          <div className="w-20 h-20 rounded-full bg-red-50 text-red-500 flex items-center justify-center text-4xl mx-auto mb-5">
            📦
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            এই ক্যাটাগরিতে কোনো পণ্য পাওয়া যায়নি
          </h1>
          <p className="text-sm text-gray-500 mb-8">
            দুঃখিত, আপনি যে ক্যাটাগরিটি খুঁজছেন তাতে বর্তমানে কোনো পণ্য তালিকাভুক্ত নেই অথবা ক্যাটাগরিটি সঠিক নয়।
          </p>
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-semibold text-sm transition-colors shadow-sm"
          >
            <Home className="w-4 h-4" />
            <span>হোম পেজে ফিরে যান</span>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header and Controls */}
      <div className="bg-white rounded-2xl border border-gray-200 p-6 sm:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-sm">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-4xl">
            {category.icon || "🏷️"}
          </div>
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Link
                href="/"
                className="text-xs text-gray-400 hover:text-emerald-700 inline-flex items-center gap-1 transition-colors"
              >
                <ArrowLeft className="w-3 h-3" />
                <span>সকল পণ্য</span>
              </Link>
              <span className="text-gray-300">/</span>
              <span className="text-xs font-semibold text-emerald-700">ক্যাটাগরি</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900">
              {category.nameBn}
            </h1>
            <p className="text-xs sm:text-sm text-gray-500 mt-0.5">
              মোট {sortedProducts.length}টি পণ্যের আজকের বাজার দর
            </p>
          </div>
        </div>

        {/* Sort control */}
        <div className="flex items-center self-start md:self-center gap-2">
          <SortDropdown currentSort={currentSort} onSortChange={setCurrentSort} />
        </div>
      </div>

      {/* Grid of Products */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
        {sortedProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
