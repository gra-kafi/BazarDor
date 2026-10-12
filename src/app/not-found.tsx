import React from "react";
import Link from "next/link";
import { Home, AlertCircle } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-[75vh] flex items-center justify-center px-4 py-16">
      <div className="max-w-md w-full bg-white rounded-3xl border border-gray-200 p-8 sm:p-12 text-center shadow-sm space-y-6">
        <div className="w-20 h-20 rounded-full bg-emerald-50 text-emerald-700 flex items-center justify-center text-4xl mx-auto shadow-inner">
          <AlertCircle className="w-10 h-10" />
        </div>

        <div className="space-y-2">
          <span className="text-4xl sm:text-5xl font-black text-emerald-800 tracking-tight">
            ৪০৪
          </span>
          <h1 className="text-xl sm:text-2xl font-bold text-gray-900">
            পেজটি খুঁজে পাওয়া যায়নি!
          </h1>
          <p className="text-xs sm:text-sm text-gray-500 leading-relaxed">
            আপনি যে ঠিকানাটি খুঁজছেন তা বিদ্যমান নেই অথবা অন্য কোনো স্থানে স্থানান্তর করা হয়েছে।
          </p>
        </div>

        <Link
          href="/"
          className="inline-flex items-center justify-center gap-2 w-full py-3.5 px-6 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-sm shadow-md hover:shadow-lg shadow-emerald-700/20 transition-all"
        >
          <Home className="w-4 h-4" />
          <span>হোম পেজে ফিরে যান</span>
        </Link>
      </div>
    </div>
  );
}
