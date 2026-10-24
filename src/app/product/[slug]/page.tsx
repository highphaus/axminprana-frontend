import React from 'react';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { ProductDetailsClient } from './ProductDetailsClient';
import { IProduct, API_BASE } from '../../../lib/api';

interface PageProps {
  params: Promise<{ slug: string }>;
}

async function getProduct(slug: string): Promise<IProduct | null> {
  try {
    const res = await fetch(`${API_BASE}/products/slug/${slug}`, {
      next: { revalidate: 60 }
    });
    if (!res.ok) return null;
    const data = await res.json();
    return data.data || null;
  } catch (e) {
    return null;
  }
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProduct(slug);
  if (!product) {
    return { title: 'Product Not Found | Axmin Prana Ayurveda' };
  }

  const primaryImage = product.thumbnail || (product.images && product.images[0]) || '/og-image.jpg';
  const pageUrl = `https://www.axminprana.com/product/${product.slug}`;

  return {
    title: `${product.name} | Axmin Prana Authentic Ayurveda`,
    description: product.tagline || product.description.slice(0, 160),
    openGraph: {
      title: `${product.name} | Axmin Prana Ayurveda`,
      description: product.tagline || product.description.slice(0, 160),
      url: pageUrl,
      siteName: 'Axmin Prana Ayurveda',
      type: 'website',
      images: [
        {
          url: primaryImage,
          width: 800,
          height: 800,
          alt: product.name
        },
        {
          url: '/og-logo.png',
          width: 600,
          height: 600,
          alt: 'Axmin Prana Logo'
        }
      ]
    },
    twitter: {
      card: 'summary_large_image',
      title: `${product.name} | Axmin Prana Ayurveda`,
      description: product.tagline || product.description.slice(0, 160),
      images: [primaryImage]
    }
  };
}

export default async function ProductPage({ params }: PageProps) {
  const { slug } = await params;
  const product = await getProduct(slug);

  if (!product) {
    notFound();
  }

  // JSON-LD Structured Data for Google Rich Snippets
  const jsonLd = {
    '@context': 'https://schema.org/',
    '@type': 'Product',
    name: product.name,
    image: product.images,
    description: product.description,
    sku: product.sku,
    brand: {
      '@type': 'Brand',
      name: product.brand
    },
    offers: {
      '@type': 'Offer',
      url: `https://axminprana.com/product/${product.slug}`,
      priceCurrency: 'INR',
      price: product.salePrice || product.price,
      availability:
        product.stock > 0
          ? 'https://schema.org/InStock'
          : 'https://schema.org/OutOfStock'
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: product.rating,
      reviewCount: Math.max(1, product.reviewCount)
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-8 py-4 sm:py-8 lg:py-12 pb-32 sm:pb-20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ProductDetailsClient product={product} />
    </div>
  );
}
