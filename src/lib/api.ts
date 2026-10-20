function getBaseUrl() {
  if (process.env.NEXT_PUBLIC_API_URL) {
    const raw = process.env.NEXT_PUBLIC_API_URL;
    return raw.endsWith('/api') ? raw : `${raw.replace(/\/+$/, '')}/api`;
  }
  if (typeof window !== 'undefined') {
    if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
      return 'http://localhost:5000/api';
    }
    return 'https://axminprana.onrender.com/api';
  }
  return 'http://localhost:5000/api';
}

export const API_BASE = getBaseUrl();

export interface IIngredient {
  name: string;
  botanicalName: string;
  portion?: string;
  benefit: string;
}

export interface IProductVariant {
  sku: string;
  packSize: string;
  price: number;
  salePrice?: number;
  stock: number;
}

export interface IProduct {
  _id: string;
  name: string;
  slug: string;
  tagline: string;
  description: string;
  category: string;
  subCategory?: string;
  brand: string;
  price: number;
  salePrice?: number;
  sku: string;
  stock: number;
  packSize: string;
  variants: IProductVariant[];
  format: string;
  images: string[];
  thumbnail: string;
  rating: number;
  reviewCount: number;
  isFeatured: boolean;
  isBestseller: boolean;
  keyIngredients: IIngredient[];
  dosageInstructions: string;
  anupana?: string;
  storageInstructions: string;
  warnings?: string;
  doshaBalancing: {
    vata: boolean;
    pitta: boolean;
    kapha: boolean;
    primaryDosha: string;
  };
  ayushLicenseNumber: string;
  batchNumber: string;
  expiryMonths: number;
  taxPercent: number;
  related?: IProduct[];
}

export interface ICategory {
  _id: string;
  name: string;
  slug: string;
  description: string;
  icon: string;
  image: string;
  doshaAffinity?: string;
  productCount: number;
}

export interface IReview {
  _id: string;
  productId: string;
  userName: string;
  rating: number;
  title: string;
  comment: string;
  verifiedPurchase: boolean;
  createdAt: string;
}

export interface IArticle {
  _id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  category: string;
  author: string;
  readTime: string;
  image: string;
  tags: string[];
  publishedAt: string;
}

export async function fetchFromAPI(endpoint: string, options: RequestInit = {}) {
  const token = typeof window !== 'undefined' ? localStorage.getItem('axmin_token') : null;
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(options.headers as Record<string, string>),
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const res = await fetch(`${API_BASE}${endpoint}`, {
    ...options,
    headers,
  });

  if (!res.ok) {
    let errorMsg = 'An error occurred';
    try {
      const errData = await res.json();
      errorMsg = errData.message || errorMsg;
    } catch (e) {
      // ignore
    }
    throw new Error(errorMsg);
  }

  return res.json();
}
