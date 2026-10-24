'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

interface ArchCategory {
  id: string;
  title: string;
  link: string;
  image: string;
}

const ARCH_CATEGORIES: ArchCategory[] = [
  {
    id: 'classical-tailams',
    title: 'Classical Tailams',
    link: '/shop?format=Oil',
    image: 'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?auto=format&fit=crop&w=600&q=85'
  },
  {
    id: 'herbal-churnas',
    title: 'Herbal Churnas',
    link: '/shop?format=Churna',
    image: 'https://images.unsplash.com/photo-1547887537-6158d64c35b3?auto=format&fit=crop&w=600&q=85'
  },
  {
    id: 'ayurvedic-rasayanas',
    title: 'Ayurvedic Rasayanas',
    link: '/shop?category=Immunity%20%26%20Rasayana',
    image: 'https://images.unsplash.com/photo-1577401239170-897942555fb3?auto=format&fit=crop&w=600&q=85'
  },
  {
    id: 'raw-botanicals',
    title: 'Raw Botanicals & Extracts',
    link: '/shop',
    image: 'https://images.unsplash.com/photo-1617897903246-719242758050?auto=format&fit=crop&w=600&q=85'
  }
];

export const ArchCategories: React.FC = () => {
  return (
    <section className="py-8 sm:py-12 bg-[#FAF7F2]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Clean MNC Headline (No decorative line bars) */}
        <div className="text-center mb-8">
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#1A1A1A] tracking-tight">
            Explore Classical Categories
          </h2>
        </div>

        {/* 4 Clean Luxury Arched Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {ARCH_CATEGORIES.map(cat => (
            <Link
              key={cat.id}
              href={cat.link}
              className="group relative flex flex-col items-center select-none"
            >
              <div className="relative w-full aspect-[4/5] max-w-[280px] mx-auto overflow-hidden rounded-t-[100px] sm:rounded-t-[120px] rounded-b-2xl border border-[#E6E0D4] bg-white group-hover:border-[#1F4E34] transition-all duration-300">
                <Image
                  src={cat.image}
                  alt={cat.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                <div className="absolute bottom-3 sm:bottom-4 left-2 sm:left-3 right-2 sm:right-3 text-center">
                  <span className="font-serif font-bold text-xs sm:text-sm text-white tracking-wide block leading-tight line-clamp-2">
                    {cat.title}
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* View All link on one line */}
        <div className="text-center mt-8">
          <Link
            href="/shop"
            className="text-xs sm:text-sm font-medium text-[#1A1A1A] hover:text-[#1F4E34] hover:underline transition-colors"
          >
            View All Categories &rarr;
          </Link>
        </div>
      </div>
    </section>
  );
};
