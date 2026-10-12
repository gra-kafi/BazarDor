import React from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { fetchProductBySlugOrId } from "@/lib/api";
import ProductDetailView from "@/components/ProductDetailView";

interface ProductPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = await fetchProductBySlugOrId(slug);

  if (!product) {
    return {
      title: "পণ্য পাওয়া যায়নি — বাজার দর",
    };
  }

  return {
    title: `${product.nameBn} এর আজকের বাজার দর — বাজার দর (BazarDor)`,
    description: `আজকের বাজারে ${product.nameBn}-এর দর এবং বিভিন্ন বাজারের সর্বনিম্ন ও সর্বোচ্চ মূল্য।`,
  };
}

export default async function ProductDetailPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = await fetchProductBySlugOrId(slug);

  if (!product) {
    notFound();
  }

  return <ProductDetailView product={product} />;
}
