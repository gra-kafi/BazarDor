import React from "react";
import type { Metadata } from "next";
import { fetchCategoryBySlug, fetchProductsByCategory } from "@/lib/api";
import CategoryProductList from "@/components/CategoryProductList";

interface CategoryPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const { slug } = await params;
  const category = await fetchCategoryBySlug(slug);

  if (!category) {
    return {
      title: "ক্যাটাগরি পাওয়া যায়নি — বাজার দর",
    };
  }

  return {
    title: `${category.nameBn} বাজার দর — বাজার দর (BazarDor)`,
    description: `আজকের ${category.nameBn} এর বাজারদর ও বিস্তারিত তথ্য এক নজরে।`,
  };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = await params;
  const [category, products] = await Promise.all([
    fetchCategoryBySlug(slug),
    fetchProductsByCategory(slug),
  ]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      <CategoryProductList category={category} initialProducts={products} />
    </div>
  );
}
