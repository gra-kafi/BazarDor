import React from "react";
import Link from "next/link";
import { Product } from "@/lib/types";
import { toBanglaNumber, formatPrice, formatUnit } from "@/lib/bangla";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const isUp = product.change?.dir === "up" || (product.change?.pct && product.change.pct > 0);
  const isDown = product.change?.dir === "down" || (product.change?.pct && product.change.pct < 0);
  const pctValue = Math.abs(product.change?.pct || 0);

  return (
    <Link
      href={`/product/${product.slug || product.id}`}
      className="group block bg-white rounded-2xl border border-gray-200/90 p-5 hover:border-emerald-400 hover:shadow-lg hover:shadow-emerald-500/5 transition-all duration-200"
    >
      {/* Top: Icon + Category Badge */}
      <div className="flex items-start justify-between mb-4">
        <div className="w-14 h-14 rounded-2xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-3xl group-hover:scale-105 transition-transform">
          {product.image || "📦"}
        </div>
        <span className="text-[11px] font-semibold text-emerald-800 bg-emerald-50/80 px-2.5 py-1 rounded-full border border-emerald-200/60">
          {product.categoryNameBn || "নিত্যপণ্য"}
        </span>
      </div>

      {/* Title & Unit */}
      <div className="mb-4">
        <h3 className="font-bold text-gray-900 text-lg group-hover:text-emerald-700 transition-colors line-clamp-1">
          {product.nameBn}
        </h3>
        <p className="text-xs text-gray-500 font-medium mt-0.5">
          {formatUnit(product.unit)}
        </p>
      </div>

      {/* Divider */}
      <div className="border-t border-gray-100 pt-3">
        <div className="flex items-end justify-between">
          <div>
            <p className="text-[11px] text-gray-500 font-medium">আজকের দাম</p>
            <p className="text-xl font-bold text-gray-900 tracking-tight">
              {formatPrice(product.today)}
            </p>
          </div>

          {/* Change Badge */}
          <div
            className={`inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-lg ${
              isUp
                ? "bg-emerald-100 text-emerald-700 border border-emerald-200"
                : isDown
                ? "bg-red-50 text-red-600 border border-red-200"
                : "bg-gray-100 text-gray-600 border border-gray-200"
            }`}
          >
            <span>{isUp ? "▲" : isDown ? "▼" : "—"}</span>
            <span>{toBanglaNumber(pctValue.toFixed(1))}%</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
