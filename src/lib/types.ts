export interface MarketData {
  market: string;
  division: string;
  min: number;
  max: number;
}

export interface ProductChange {
  dir: "up" | "down" | "flat" | string;
  pct: number;
}

export interface Product {
  id: number;
  slug: string;
  nameBn: string;
  category: string;
  categoryNameBn: string;
  categoryIcon?: string;
  unit: string;
  image: string;
  today: number;
  yesterday?: number;
  lastWeek?: number;
  lastMonth?: number;
  change: ProductChange;
  markets: MarketData[];
}

export interface Category {
  id: string;
  slug: string;
  nameBn: string;
  icon: string;
}

export interface UserSession {
  user: {
    id: string;
    name: string;
    email: string;
    image?: string | null;
  } | null;
}
