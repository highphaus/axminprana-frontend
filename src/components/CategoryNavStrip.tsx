'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

interface CategoryItem {
  title: string;
  image: string;
  link: string;
}

const CATEGORY_ITEMS: CategoryItem[] = [
  {
    title: 'Shop All',
    image: 'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?auto=format&fit=crop&w=300&q=80',
    link: '/shop'
  },
  {
    title: 'Classical Tailams',
    image: 'https://images.unsplash.com/photo-1601049541289-9b1b7bbbfe19?auto=format&fit=crop&w=300&q=80',
    link: '/shop?format=Oil'
  },
  {
    title: 'Herbal Churnas',
    image: 'https://images.unsplash.com/photo-1547887537-6158d64c35b3?auto=format&fit=crop&w=300&q=80',
    link: '/shop?format=Churna'
  },
  {
    title: 'Skin Radiance',
    image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=300&q=80',
    link: '/shop?category=Skin%20Radiance%20%26%20Kanti'
  },
  {
    title: 'Hair Therapy',
    image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=300&q=80',
    link: '/shop?category=Hair%20Therapy%20%26%20Keshya'
  },
  {
    title: 'Bulk & Wholesale',
    image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=300&q=80',
    link: '/bulk-orders'
  }
];

export const CategoryNavStrip: React.FC = () => {
  return (
    <div className="bg-[#FAF7F2] py-4 sm:py-5 border-b border-[#EDE8E0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-start sm:justify-center gap-5 sm:gap-8 lg:gap-10 overflow-x-auto no-scrollbar py-1">
          {CATEGORY_ITEMS.map((item, idx) => (
            <Link
              key={idx}
              href={item.link}
              className="flex flex-col items-center shrink-0 group select-none text-center"
            >
              {/* Clean MNC-grade circular / soft-square card with zero tacky overlays */}
              <div className="relative w-18 h-18 sm:w-22 sm:h-22 rounded-2xl overflow-hidden bg-white border border-[#E6E0D4] shadow-2xs group-hover:border-[#C59B27] group-hover:shadow-sm transition-all duration-300">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              {/* Category title arranged strictly on ONE clean line without truncation */}
              <span className="text-[12px] sm:text-[13px] font-medium text-[#2C1D11] group-hover:text-[#1F4E34] transition-colors mt-2 whitespace-nowrap">
                {item.title}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};
