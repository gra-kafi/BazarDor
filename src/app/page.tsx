import Image from "next/image";
import Link from "next/link";
import { fetchAllProducts, fetchCategories } from "@/lib/api";
import PriceTicker from "@/components/PriceTicker";
import ProductCard from "@/components/ProductCard";
import HomeProductList from "@/components/HomeProductList";
import { ArrowDown, TrendingUp, TrendingDown, Sparkles } from "lucide-react";

export const revalidate = 60;

export default async function HomePage() {
  const [products, categories] = await Promise.all([
    fetchAllProducts(),
    fetchCategories(),
  ]);

  // Section A: Top 6 Risers
  const risers = products
    .filter((p) => p.change?.dir === "up" || (p.change?.pct && p.change.pct > 0))
    .sort((a, b) => (b.change?.pct || 0) - (a.change?.pct || 0))
    .slice(0, 6);

  // Section B: Top 6 Fallers
  const fallers = products
    .filter((p) => p.change?.dir === "down" || (p.change?.pct && p.change.pct < 0))
    .sort((a, b) => Math.abs(b.change?.pct || 0) - Math.abs(a.change?.pct || 0))
    .slice(0, 6);

  return (
    <div className="space-y-12">
      {/* Price Ticker Strip directly below navbar */}
      <PriceTicker products={products} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16 pb-12">
        {/* Hero Section */}
        <section className="pt-6 sm:pt-10">
          <div className="bg-gradient-to-br from-emerald-50 via-emerald-100/40 to-white rounded-3xl p-6 sm:p-10 md:p-14 border border-emerald-100/80 shadow-sm relative overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
              {/* Left Column: Text & CTA */}
              <div className="md:col-span-7 space-y-6 text-center md:text-left z-10">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-100/80 text-emerald-800 text-xs sm:text-sm font-semibold border border-emerald-200">
                  <Sparkles className="w-4 h-4 text-emerald-700" />
                  <span>দৈনিক বাজার দর পর্যবেক্ষণ প্ল্যাটফর্ম</span>
                </div>

                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-gray-900 tracking-tight leading-tight">
                  নিত্যপ্রয়োজনীয় পণ্যের নির্ভরযোগ্য <span className="text-emerald-700">বাজার দর</span> জানুন
                </h1>

                <p className="text-sm sm:text-base text-gray-600 max-w-xl leading-relaxed">
                  প্রতিদিনের চাল, ডাল, তেল, সবজি ও মাছ-মাংসের নির্ভরযোগ্য ও হালনাগাদ বাজারদর এখন এক ঠিকানায়। সরাসরি রাজধানীর কারওয়ান বাজারসহ প্রধান বাজারগুলোর তথ্য।
                </p>

                <div className="pt-2 flex flex-col sm:flex-row items-center justify-center md:justify-start gap-4">
                  <a
                    href="#সব-পণ্য"
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-sm sm:text-base shadow-md hover:shadow-lg shadow-emerald-700/20 transition-all duration-200"
                  >
                    <span>সব পণ্য দেখুন</span>
                    <ArrowDown className="w-4 h-4 animate-bounce" />
                  </a>

                  <Link
                    href="/category/chal"
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl bg-white hover:bg-gray-50 text-gray-800 font-semibold text-sm sm:text-base border border-gray-200 shadow-sm transition-colors"
                  >
                    <span>চাল ও ডাল ক্যাটাগরি</span>
                  </Link>
                </div>
              </div>

              {/* Right Column: Hero Banner Image */}
              <div className="md:col-span-5 flex justify-center md:justify-end z-10">
                <div className="relative w-64 h-64 sm:w-80 sm:h-80 lg:w-96 lg:h-96">
                  <div className="absolute inset-0 bg-emerald-300/20 rounded-full blur-3xl transform scale-90"></div>
                  <Image
                    src="/bazar-hero.png"
                    alt="Bazar Dor Basket"
                    fill
                    priority
                    className="object-contain drop-shadow-xl hover:scale-105 transition-transform duration-300"
                  />
                </div>
              </div>
            </div>

            {/* Subtle background decoration */}
            <div className="absolute -bottom-24 -right-24 w-80 h-80 bg-emerald-200/20 rounded-full blur-3xl pointer-events-none"></div>
          </div>
        </section>

        {/* Section A: আজ দাম বেড়েছে ▲ */}
        <section className="space-y-6">
          <div className="flex items-center justify-between border-b border-gray-200 pb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 flex items-center justify-center text-emerald-700">
                <TrendingUp className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-gray-900 flex items-center gap-2">
                  <span>আজ দাম বেড়েছে</span>
                  <span className="text-emerald-600 font-extrabold text-base sm:text-lg">▲</span>
                </h2>
                <p className="text-xs sm:text-sm text-gray-500">
                  গতকালের তুলনায় যেসব পণ্যের দাম বৃদ্ধি পেয়েছে (শীর্ষ ৬টি পণ্য)
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
            {risers.map((product) => (
              <ProductCard key={`riser-${product.id}`} product={product} />
            ))}
          </div>
        </section>

        {/* Section B: আজ দাম কমেছে ▼ */}
        <section className="space-y-6">
          <div className="flex items-center justify-between border-b border-gray-200 pb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-red-100 flex items-center justify-center text-red-600">
                <TrendingDown className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-gray-900 flex items-center gap-2">
                  <span>আজ দাম কমেছে</span>
                  <span className="text-red-500 font-extrabold text-base sm:text-lg">▼</span>
                </h2>
                <p className="text-xs sm:text-sm text-gray-500">
                  গতকালের তুলনায় যেসব পণ্যের দাম কমেছে (শীর্ষ ৬টি পণ্য)
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
            {fallers.map((product) => (
              <ProductCard key={`faller-${product.id}`} product={product} />
            ))}
          </div>
        </section>

        {/* Section C: সব পণ্য (with sort control and category pills) */}
        <section>
          <HomeProductList products={products} categories={categories} />
        </section>
      </div>
    </div>
  );
}
