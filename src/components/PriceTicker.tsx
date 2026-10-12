"use client";

import React from "react";
import Link from "next/link";
import { Product } from "@/lib/types";
import { toBanglaNumber, formatUnit } from "@/lib/bangla";

interface PriceTickerProps {
  products: Product[];
}

export default function PriceTicker({ products }: PriceTickerProps) {
  if (!products || products.length === 0) return null;

  // Duplicate list to create a seamless infinite loop
  const tickerItems = [...products, ...products];

  return (
    <div className="w-full bg-emerald-50 border-y border-emerald-100 overflow-hidden py-2 text-xs select-none">
      <div className="flex items-center">
        <div className="flex items-center gap-2 pl-4 pr-3 border-r border-emerald-200 shrink-0 font-medium text-emerald-800">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-600"></span>
          </span>
          <span>লাইভ বাজারদর:</span>
        </div>

        <div className="overflow-hidden w-full relative">
          <div className="ticker-track flex items-center whitespace-nowrap">
            {tickerItems.map((p, idx) => {
              const isUp = p.change?.dir === "up" || (p.change?.pct && p.change.pct > 0);
              const isDown = p.change?.dir === "down" || (p.change?.pct && p.change.pct < 0);
              const unitText = formatUnit(p.unit).replace("প্রতি ", "/");

              return (
                <Link
                  key={`${p.id}-${idx}`}
                  href={`/product/${p.slug || p.id}`}
                  className="inline-flex items-center gap-1.5 mx-4 text-gray-700 hover:text-emerald-700 transition-colors"
                >
                  <span className="text-sm">{p.image || "📦"}</span>
                  <span className="font-medium">{p.nameBn}</span>
                  <span className="font-semibold text-gray-900">
                    {toBanglaNumber(p.today)} ৳{unitText}
                  </span>
                  <span
                    className={`inline-flex items-center text-[11px] font-medium px-1.5 py-0.5 rounded ${
                      isUp
                        ? "bg-emerald-100 text-emerald-700"
                        : isDown
                        ? "bg-red-100 text-red-600"
                        : "bg-gray-100 text-gray-600"
                    }`}
                  >
                    {isUp ? "▲ " : isDown ? "▼ " : "— "}
                    {toBanglaNumber(Math.abs(p.change?.pct || 0))}%
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
