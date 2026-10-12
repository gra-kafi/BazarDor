import { Product, Category } from "./types";

const BASE_URLS = [
  "https://openapi.programming-hero.com/api/bazardor",
  "https://api.api-store.workers.dev/api/bazardor",
  "https://api.abcz.workers.dev/api/bazardor",
];

async function fetchWithFallback<T>(endpoint: string, options?: RequestInit): Promise<T | null> {
  let lastError: unknown = null;

  for (const base of BASE_URLS) {
    try {
      const url = `${base}${endpoint}`;
      const res = await fetch(url, {
        ...options,
        next: { revalidate: 60 },
      });

      if (!res.ok) {
        continue;
      }

      const data = await res.json();
      if (data && data.error) {
        return null;
      }
      return data as T;
    } catch (err) {
      lastError = err;
      continue;
    }
  }

  console.error(`Failed to fetch from all base URLs for ${endpoint}:`, lastError);
  return null;
}

export async function fetchCategories(): Promise<Category[]> {
  const data = await fetchWithFallback<Category[]>("/categories");
  return data || [];
}

export async function fetchCategoryBySlug(slug: string): Promise<Category | null> {
  const data = await fetchWithFallback<Category>(`/categories/${slug}`);
  if (data && data.slug) return data;

  // Fallback: check categories list
  const categories = await fetchCategories();
  return categories.find((c) => c.slug === slug || c.id === slug) || null;
}

export async function fetchAllProducts(): Promise<Product[]> {
  const data = await fetchWithFallback<Product[]>("/products");
  return data || [];
}

export async function fetchProductsByCategory(categorySlug: string): Promise<Product[]> {
  const data = await fetchWithFallback<Product[]>(`/products?category=${categorySlug}`);
  if (Array.isArray(data) && data.length > 0) {
    return data;
  }

  // Fallback: fetch all and filter
  const all = await fetchAllProducts();
  return all.filter((p) => p.category === categorySlug);
}

export async function fetchProductById(id: string | number): Promise<Product | null> {
  const data = await fetchWithFallback<Product>(`/products/${id}`);
  if (data && data.id) {
    return data;
  }
  return null;
}

export async function fetchProductBySlugOrId(slugOrId: string | number): Promise<Product | null> {
  // If numeric id
  const numId = Number(slugOrId);
  if (!isNaN(numId) && Number.isInteger(numId)) {
    const byId = await fetchProductById(numId);
    if (byId) return byId;
  }

  // If slug string or failed id, check all products
  const all = await fetchAllProducts();
  const match = all.find(
    (p) => String(p.id) === String(slugOrId) || p.slug === String(slugOrId)
  );

  if (match) {
    // If full data with markets is needed, try fetching by id
    const full = await fetchProductById(match.id);
    return full || match;
  }

  return null;
}
