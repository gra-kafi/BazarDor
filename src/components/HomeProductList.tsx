"use client";

import React, { useState, useMemo } from "react";
import { Product, Category } from "@/lib/types";
import ProductCard from "./ProductCard";
import SortDropdown, { SortOption } from "./SortDropdown";
import { Search, Tag } from "lucide-react";

interface HomeProductListProps {
  products: Product[];
  categories: Category[];
}

export default function HomeProductList({ products, categories }: HomeProductListProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [currentSort, setCurrentSort] = useState<SortOption>("default");

  const filteredAndSortedProducts = useMemo(() => {
    let result = [...products];

    // Filter by category
    if (selectedCategory !== "all") {
      result = result.filter(
        (p) => p.category === selectedCategory || p.categoryNameBn === selectedCategory
      );
    }

    // Filter by search
    if (searchQuery.trim() !== "") {
      const q = searchQuery.toLowerCase().trim();
      result = result.filter(
        (p) =>
          p.nameBn.toLowerCase().includes(q) ||
          p.slug.toLowerCase().includes(q) ||
          (p.categoryNameBn && p.categoryNameBn.toLowerCase().includes(q))
      );
    }

    // Sort by numeric value (Handling Bengali numerals correctly per C1 requirement)
    if (currentSort === "price-asc") {
      result.sort((a, b) => Number(a.today) - Number(b.today));
    } else if (currentSort === "price-desc") {
      result.sort((a, b) => Number(b.today) - Number(a.today));
    }

    return result;
  }, [products, selectedCategory, searchQuery, currentSort]);

  return (
    <div id="সব-পণ্য" className="scroll-mt-24 space-y-8">
      {/* Header and Controls */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-gray-200 pb-5">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-600"></span>
            <span className="text-xs font-semibold text-emerald-800 uppercase tracking-wider">
              সম্পূর্ণ তালিকা
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900">সব পণ্য</h2>
          <p className="text-sm text-gray-500 mt-1">
            দৈনিক বাজার দরের সকল নিত্যপ্রয়োজনীয় পণ্যের পূর্ণাঙ্গ তালিকা
          </p>
        </div>

        {/* Search & Sort Controls */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          {/* Search Box */}
          <div className="relative">
            <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="পণ্য খুঁজুন (যেমন: চাল, আলু)..."
              className="w-full sm:w-60 pl-9 pr-3 py-2 text-xs sm:text-sm bg-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 placeholder-gray-400"
            />
          </div>

          {/* Sort Dropdown */}
          <SortDropdown currentSort={currentSort} onSortChange={setCurrentSort} />
        </div>
      </div>

      {/* Category Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar">
        <button
          onClick={() => setSelectedCategory("all")}
          className={`shrink-0 flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all ${
            selectedCategory === "all"
              ? "bg-emerald-700 text-white shadow-sm"
              : "bg-white text-gray-700 border border-gray-200 hover:border-emerald-300 hover:bg-emerald-50/50"
          }`}
        >
          <Tag className="w-3.5 h-3.5" />
          <span>সকল ({products.length})</span>
        </button>

        {categories.map((cat) => {
          const count = products.filter((p) => p.category === cat.slug).length;
          const isSelected = selectedCategory === cat.slug;
          return (
            <button
              key={cat.id || cat.slug}
              onClick={() => setSelectedCategory(cat.slug)}
              className={`shrink-0 flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all ${
                isSelected
                  ? "bg-emerald-700 text-white shadow-sm"
                  : "bg-white text-gray-700 border border-gray-200 hover:border-emerald-300 hover:bg-emerald-50/50"
              }`}
            >
              <span>{cat.icon || "🏷️"}</span>
              <span>{cat.nameBn}</span>
              {count > 0 && (
                <span
                  className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                    isSelected ? "bg-emerald-800 text-emerald-100" : "bg-gray-100 text-gray-500"
                  }`}
                >
                  {count}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Product Grid */}
      {filteredAndSortedProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
          {filteredAndSortedProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-gray-200 p-12 text-center max-w-lg mx-auto">
          <div className="w-16 h-16 rounded-full bg-emerald-50 flex items-center justify-center text-3xl mx-auto mb-4">
            🔍
          </div>
          <h3 className="text-lg font-bold text-gray-900 mb-1">কোনো পণ্য পাওয়া যায়নি</h3>
          <p className="text-xs sm:text-sm text-gray-500 mb-5">
            আপনার অনুসন্ধানের সাথে মিলে এমন কোনো পণ্য তালিকায় নেই। অনুগ্রহ করে অন্য নাম বা ক্যাটাগরি চেষ্টা করুন।
          </p>
          <button
            onClick={() => {
              setSearchQuery("");
              setSelectedCategory("all");
              setCurrentSort("default");
            }}
            className="px-4 py-2 text-xs sm:text-sm font-semibold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 rounded-lg transition-colors"
          >
            ফিল্টার রিসেট করুন
          </button>
        </div>
      )}
    </div>
  );
}
