import React from "react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="w-full bg-white border-t border-gray-200 mt-16 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
          {/* Left Side */}
          <div className="flex items-center gap-2">
            <Link href="/" className="flex items-center gap-1.5 group">
              <span className="text-xl">🛒</span>
              <span className="font-bold text-gray-900 group-hover:text-emerald-700 transition-colors">
                বাজার দর
              </span>
            </Link>
            <span className="text-gray-300 hidden sm:inline">|</span>
            <span className="text-sm text-gray-600">
              প্রয়োজনীয় পণ্যের দাম এক নজরে।
            </span>
          </div>

          {/* Right Side */}
          <div>
            <p className="text-xs text-gray-500 italic">
              “সকল দাম সম্ভাব্য; বাজার অবস্থার ওপর নির্ভর করে পরিবর্তিত হয়।”
            </p>
          </div>
        </div>

        <div className="mt-6 pt-6 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between text-xs text-gray-400 gap-2">
          <p>© {new Date().getFullYear()} বাজার দর (BazarDor). সর্বস্বত্ব সংরক্ষিত।</p>
          <div className="flex items-center gap-4">
            <Link href="/" className="hover:text-emerald-600 transition-colors">
              হোম
            </Link>
            <Link href="/#সব-পণ্য" className="hover:text-emerald-600 transition-colors">
              সব পণ্য
            </Link>
            <Link href="/signin" className="hover:text-emerald-600 transition-colors">
              সাইন ইন
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
