"use client";

import React, { useEffect, useState, useMemo } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { Product } from "@/lib/types";
import { toBanglaNumber, formatPrice, formatUnit } from "@/lib/bangla";
import toast from "react-hot-toast";
import {
  ArrowLeft,
  Store,
  MapPin,
  TrendingUp,
  TrendingDown,
  ShieldCheck,
  Search,
} from "lucide-react";

interface ProductDetailViewProps {
  product: Product;
}

export default function ProductDetailView({ product }: ProductDetailViewProps) {
  const { user, isLoading } = useAuth();
  const router = useRouter();
  const [selectedDivision, setSelectedDivision] = useState<string>("all");
  const [marketSearch, setMarketSearch] = useState<string>("");

  // Protected route enforcement
  useEffect(() => {
    if (!isLoading && !user) {
      toast.error("পণ্যের বিস্তারিত দেখতে অনুগ্রহ করে সাইন ইন করুন");
      router.push(`/signin?redirect=/product/${product.slug || product.id}`);
    }
  }, [user, isLoading, router, product]);

  // Price calculations
  const markets = product.markets || [];

  const minPrice = useMemo(() => {
    if (markets.length === 0) return product.today;
    return Math.min(...markets.map((m) => m.min));
  }, [markets, product.today]);

  const maxPrice = useMemo(() => {
    if (markets.length === 0) return product.today;
    return Math.max(...markets.map((m) => m.max));
  }, [markets, product.today]);

  const avgPrice = useMemo(() => {
    if (markets.length === 0) return product.today;
    const total = markets.reduce((acc, m) => acc + (m.min + m.max) / 2, 0);
    return Math.round(total / markets.length);
  }, [markets, product.today]);

  // Divisions list
  const divisions = useMemo(() => {
    const set = new Set<string>();
    markets.forEach((m) => {
      if (m.division) set.add(m.division);
    });
    return Array.from(set);
  }, [markets]);

  // Filtered markets
  const filteredMarkets = useMemo(() => {
    return markets.filter((m) => {
      const matchDiv = selectedDivision === "all" || m.division === selectedDivision;
      const matchSearch =
        marketSearch.trim() === "" ||
        m.market.toLowerCase().includes(marketSearch.toLowerCase()) ||
        m.division.toLowerCase().includes(marketSearch.toLowerCase());
      return matchDiv && matchSearch;
    });
  }, [markets, selectedDivision, marketSearch]);

  if (isLoading || !user) {
    return (
      <div className="max-w-5xl mx-auto py-16 px-4">
        <div className="bg-white rounded-3xl border border-gray-200 p-8 sm:p-12 text-center space-y-4 animate-pulse">
          <div className="w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center mx-auto text-emerald-700">
            <ShieldCheck className="w-8 h-8 animate-spin" />
          </div>
          <h2 className="text-xl font-bold text-gray-900">লগইন যাচাই করা হচ্ছে...</h2>
          <p className="text-sm text-gray-500">
            অনুগ্রহ করে অপেক্ষা করুন, সুরক্ষিত পেজ লোড হচ্ছে।
          </p>
        </div>
      </div>
    );
  }

  const isUp = product.change?.dir === "up" || (product.change?.pct && product.change.pct > 0);
  const isDown = product.change?.dir === "down" || (product.change?.pct && product.change.pct < 0);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
      {/* Back button & Breadcrumb */}
      <div className="flex items-center gap-3">
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border border-gray-200 bg-white hover:bg-gray-50 text-xs sm:text-sm font-medium text-gray-700 transition-colors shadow-sm"
        >
          <ArrowLeft className="w-4 h-4 text-gray-500" />
          <span>পেছনে যান</span>
        </Link>
        <span className="text-gray-300">/</span>
        <Link
          href={`/category/${product.category}`}
          className="text-xs sm:text-sm text-emerald-700 font-medium hover:underline"
        >
          {product.categoryNameBn || "ক্যাটাগরি"}
        </Link>
        <span className="text-gray-300">/</span>
        <span className="text-xs sm:text-sm text-gray-500 font-medium truncate max-w-[200px]">
          {product.nameBn}
        </span>
      </div>

      {/* Top - Summary Card */}
      <div className="bg-white rounded-3xl border border-gray-200 p-6 sm:p-10 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-start sm:items-center gap-5">
            <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-3xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-5xl sm:text-6xl shrink-0 shadow-inner">
              {product.image || "📦"}
            </div>
            <div className="space-y-2">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-xs font-semibold text-emerald-800 bg-emerald-100/70 px-3 py-1 rounded-full border border-emerald-200">
                  {product.categoryNameBn || "নিত্যপণ্য"}
                </span>
                <span className="text-xs font-medium text-gray-600 bg-gray-100 px-3 py-1 rounded-full border border-gray-200">
                  {formatUnit(product.unit)}
                </span>
                <span
                  className={`inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full ${
                    isUp
                      ? "bg-emerald-100 text-emerald-700 border border-emerald-200"
                      : isDown
                      ? "bg-red-50 text-red-600 border border-red-200"
                      : "bg-gray-100 text-gray-600 border border-gray-200"
                  }`}
                >
                  {isUp ? <TrendingUp className="w-3.5 h-3.5" /> : isDown ? <TrendingDown className="w-3.5 h-3.5" /> : null}
                  <span>
                    {isUp ? "▲ " : isDown ? "▼ " : "— "}
                    {toBanglaNumber(Math.abs(product.change?.pct || 0).toFixed(1))}%
                  </span>
                </span>
              </div>

              <h1 className="text-2xl sm:text-4xl font-black text-gray-900 tracking-tight">
                {product.nameBn}
              </h1>
              <p className="text-xs sm:text-sm text-gray-600 max-w-2xl leading-relaxed">
                আজকের বাজারে {product.nameBn}-এর দর ও সারাদেশের বিভিন্ন পাইকারি ও খুচরা বাজারের তুলনামূলক চিত্র।
              </p>
            </div>
          </div>

          {/* Today's Price Highlight */}
          <div className="bg-emerald-50/70 rounded-2xl border border-emerald-200/80 p-5 md:min-w-[220px] text-center md:text-right shrink-0">
            <span className="text-xs font-medium text-emerald-800">আজকের গড় মূল্য</span>
            <div className="text-3xl sm:text-4xl font-black text-emerald-800 mt-1">
              {formatPrice(product.today)}
            </div>
            <span className="text-[11px] text-emerald-600 font-medium">
              {formatUnit(product.unit)}
            </span>
          </div>
        </div>
      </div>

      {/* Price Summary Cards: Minimum, Maximum, Average */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
        {/* Min Price */}
        <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 text-xl font-bold">
            📉
          </div>
          <div>
            <p className="text-xs text-gray-500 font-medium">সর্বনিম্ন দাম</p>
            <p className="text-2xl font-bold text-gray-900 mt-0.5">
              {formatPrice(minPrice)}
            </p>
            <p className="text-[11px] text-gray-400">বিভিন্ন বাজারে সর্বনিম্ন রেট</p>
          </div>
        </div>

        {/* Max Price */}
        <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-red-50 text-red-600 flex items-center justify-center shrink-0 text-xl font-bold">
            📈
          </div>
          <div>
            <p className="text-xs text-gray-500 font-medium">সর্বোচ্চ দাম</p>
            <p className="text-2xl font-bold text-gray-900 mt-0.5">
              {formatPrice(maxPrice)}
            </p>
            <p className="text-[11px] text-gray-400">বিভিন্ন বাজারে সর্বোচ্চ রেট</p>
          </div>
        </div>

        {/* Avg Price */}
        <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0 text-xl font-bold">
            📊
          </div>
          <div>
            <p className="text-xs text-gray-500 font-medium">গড় দাম</p>
            <p className="text-2xl font-bold text-gray-900 mt-0.5">
              {formatPrice(avgPrice)}
            </p>
            <p className="text-[11px] text-gray-400">বাজারসমূহের সার্বিক গড় দর</p>
          </div>
        </div>
      </div>

      {/* বাজারভিত্তিক আজকের দাম (Market breakdown) */}
      <div className="bg-white rounded-3xl border border-gray-200 p-6 sm:p-8 shadow-sm space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-gray-100 pb-5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 flex items-center justify-center text-emerald-700">
              <Store className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
                বাজারভিত্তিক আজকের দাম
              </h2>
              <p className="text-xs sm:text-sm text-gray-500">
                বিভাগীয় ও স্থানীয় বাজারগুলোর সর্বশেষ দর পর্যালোচনা
              </p>
            </div>
          </div>

          {/* Search box for markets */}
          <div className="relative">
            <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={marketSearch}
              onChange={(e) => setMarketSearch(e.target.value)}
              placeholder="বাজার বা বিভাগ খুঁজুন..."
              className="w-full sm:w-60 pl-9 pr-3 py-2 text-xs sm:text-sm bg-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>
        </div>

        {/* Division Filter Tabs */}
        {divisions.length > 0 && (
          <div className="flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar">
            <button
              onClick={() => setSelectedDivision("all")}
              className={`shrink-0 px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all ${
                selectedDivision === "all"
                  ? "bg-emerald-700 text-white shadow-sm"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              সব বিভাগ ({markets.length})
            </button>
            {divisions.map((div) => {
              const count = markets.filter((m) => m.division === div).length;
              const isSelected = selectedDivision === div;
              return (
                <button
                  key={div}
                  onClick={() => setSelectedDivision(div)}
                  className={`shrink-0 flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all ${
                    isSelected
                      ? "bg-emerald-700 text-white shadow-sm"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  <MapPin className="w-3 h-3 text-emerald-600" />
                  <span>{div}</span>
                  <span
                    className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                      isSelected ? "bg-emerald-800 text-white" : "bg-gray-200 text-gray-600"
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        )}

        {/* Markets Table */}
        {filteredMarkets.length > 0 ? (
          <div className="overflow-x-auto border border-gray-200 rounded-2xl">
            <table className="w-full text-left border-collapse text-xs sm:text-sm">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200 text-gray-600 font-semibold">
                  <th className="py-3.5 px-4 sm:px-6">বাজারের নাম</th>
                  <th className="py-3.5 px-4 sm:px-6">বিভাগ</th>
                  <th className="py-3.5 px-4 sm:px-6 text-right">সর্বনিম্ন দর</th>
                  <th className="py-3.5 px-4 sm:px-6 text-right">সর্বোচ্চ দর</th>
                  <th className="py-3.5 px-4 sm:px-6 text-right">গড় দর</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 font-medium">
                {filteredMarkets.map((m, idx) => {
                  const mAvg = Math.round((m.min + m.max) / 2);
                  return (
                    <tr
                      key={`${m.market}-${idx}`}
                      className="hover:bg-emerald-50/40 transition-colors"
                    >
                      <td className="py-3.5 px-4 sm:px-6 text-gray-900 font-semibold flex items-center gap-2">
                        <Store className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span>{m.market}</span>
                      </td>
                      <td className="py-3.5 px-4 sm:px-6 text-gray-600">
                        <span className="inline-flex items-center gap-1 bg-gray-100 px-2.5 py-1 rounded-md text-xs">
                          <MapPin className="w-3 h-3 text-gray-400" />
                          <span>{m.division}</span>
                        </span>
                      </td>
                      <td className="py-3.5 px-4 sm:px-6 text-right text-gray-700">
                        {toBanglaNumber(m.min)} ৳
                      </td>
                      <td className="py-3.5 px-4 sm:px-6 text-right text-gray-700">
                        {toBanglaNumber(m.max)} ৳
                      </td>
                      <td className="py-3.5 px-4 sm:px-6 text-right font-bold text-emerald-800">
                        {toBanglaNumber(mAvg)} ৳
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center py-12 bg-gray-50 rounded-2xl">
            <p className="text-sm text-gray-500">কোনো বাজার খুঁজে পাওয়া যায়নি।</p>
          </div>
        )}
      </div>
    </div>
  );
}
