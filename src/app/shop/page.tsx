import React from 'react';
import { Metadata } from 'next';
import { ShopClient } from './ShopClient';
import { IProduct, ICategory, API_BASE } from '../../lib/api';

interface SearchParams {
  category?: string;
  dosha?: string;
  format?: string;
  sort?: string;
  search?: string;
  priceRange?: string;
  rating?: string;
  page?: string;
}

export const metadata: Metadata = {
  title: 'Classical Ayurvedic Formulations & Herbal Medicines | Axmin Prana',
  description:
    'Explore classical Ayurvedic formulations prepared according to the Charaka Samhita. Standardized Ashwagandha, Triphala, Kumkumadi Tailam, and Bringadi hair oils crafted in Kerala.'
};

async function getCatalog(searchParams: SearchParams) {
  try {
    const query = new URLSearchParams();
    if (searchParams.category) query.set('category', searchParams.category);
    if (searchParams.dosha) query.set('dosha', searchParams.dosha);
    if (searchParams.format) query.set('format', searchParams.format);
    if (searchParams.sort) query.set('sort', searchParams.sort);
    if (searchParams.search) query.set('search', searchParams.search);
    if (searchParams.page) query.set('page', searchParams.page);
    if (searchParams.priceRange) {
      const [min, max] = searchParams.priceRange.split('-');
      if (min) query.set('minPrice', min);
      if (max) query.set('maxPrice', max);
    }
    query.set('limit', '16');

    const [productsRes, categoriesRes] = await Promise.all([
      fetch(`${API_BASE}/products?${query.toString()}`, { cache: 'no-store' }),
      fetch(`${API_BASE}/categories`, { next: { revalidate: 300 } })
    ]);

    const productsData = await productsRes.json();
    const categoriesData = await categoriesRes.json();

    return {
      products: (productsData.data || []) as IProduct[],
      pagination: productsData.pagination || { total: 0, totalPages: 1, page: 1 },
      categories: (categoriesData.data || []) as ICategory[]
    };
  } catch (e) {
    console.error('Catalog fetch error', e);
    return {
      products: [],
      pagination: { total: 0, totalPages: 1, page: 1 },
      categories: []
    };
  }
}

export default async function ShopPage({
  searchParams
}: {
  searchParams: Promise<SearchParams>;
}) {
  const resolvedParams = await searchParams;
  const { products, categories, pagination } = await getCatalog(resolvedParams);

  return (
    <ShopClient
      products={products}
      categories={categories}
      pagination={pagination}
      searchParams={resolvedParams}
    />
  );
}
