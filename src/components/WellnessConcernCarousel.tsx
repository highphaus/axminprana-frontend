'use client';

import React, { useRef, useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';

interface ConcernItem {
  title: string;
  subtitle: string;
  image: string;
  link: string;
  tag?: string;
}

const CONCERNS: ConcernItem[] = [
  {
    title: 'Skin Glow & Radiance',
    subtitle: 'Pure Kashmiri Saffron & Red Sandalwood Tailam',
    image: 'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?auto=format&fit=crop&w=600&q=80',
    link: '/shop?category=Skin%20Radiance%20%26%20Kanti',
    tag: 'Classical Radiance'
  },
  {
    title: 'Hair Fall & Scalp Nourishment',
    subtitle: 'Cold-Pressed Bringadi & Indigofera Leaf',
    image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=600&q=80',
    link: '/shop?category=Hair%20Therapy%20%26%20Keshya',
    tag: 'Follicle Therapy'
  },
  {
    title: 'Joint, Muscle & Pain Relief',
    subtitle: 'Classical Vadha Ranjaga & Herbal Tailams',
    image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=600&q=80',
    link: '/shop?search=pain',
    tag: 'Pain Recovery'
  },
  {
    title: 'Stress Relief & Deep Restorative Sleep',
    subtitle: 'Standardized Ashwagandha KSM-66® Organic',
    image: 'https://images.unsplash.com/photo-1512290900672-1f4f5f5c4046?auto=format&fit=crop&w=600&q=80',
    link: '/shop?category=Stress%20%26%20Cognitive%20Health',
    tag: 'Mind & Sleep'
  },
  {
    title: 'Digestive Agni & Gut Bio-Detox',
    subtitle: 'Micro-Pulverized Pure Triphala Rasayana',
    image: 'https://images.unsplash.com/photo-1509358271058-acd22cc93898?auto=format&fit=crop&w=600&q=80',
    link: '/shop?category=Digestive%20%26%20Gut%20Health',
    tag: 'Gut Cleanse'
  },
  {
    title: 'Ulcer & Digestive Acidity Relief',
    subtitle: 'Classical Thalis Powder Formulation',
    image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=600&q=80',
    link: '/shop?search=ulcer',
    tag: 'Ulcer Care'
  },
  {
    title: 'Immunity & Classical Rasayana',
    subtitle: 'Awaleha with Wild Forest Amla & A2 Ghee',
    image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=600&q=80',
    link: '/shop?category=Immunity%20%26%20Rasayana',
    tag: 'Vitality'
  },
  {
    title: 'Cold-Pressed Carrier & Massage Oils',
    subtitle: 'Virgin Badam, Black Sesame & Castor Tailam',
    image: 'https://images.unsplash.com/photo-1601049541289-9b1b7bbbfe19?auto=format&fit=crop&w=600&q=80',
    link: '/shop?format=Oil',
    tag: 'Pure Carrier'
  }
];

export const WellnessConcernCarousel: React.FC = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScrollability = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setCanScrollLeft(scrollLeft > 10);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  useEffect(() => {
    const el = scrollRef.current;
    if (el) {
      checkScrollability();
      el.addEventListener('scroll', checkScrollability, { passive: true });
      window.addEventListener('resize', checkScrollability);
      return () => {
        el.removeEventListener('scroll', checkScrollability);
        window.removeEventListener('resize', checkScrollability);
      };
    }
  }, []);

  const handleScroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = scrollRef.current.clientWidth * 0.75;
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header with Title and Left/Right Navigation Controls */}
      <div className="flex items-end justify-between mb-6 pb-2 border-b border-[#EAE5DC]">
        <div>
          <span className="text-[11px] font-bold tracking-widest uppercase text-[#C59B27] block mb-1">
            Targeted Holistic Healing
          </span>
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-serif font-bold text-[#2C1D11] tracking-tight">
            Shop by Wellness Concern
          </h2>
        </div>

        <div className="flex items-center gap-2">
          {/* Navigation Arrows */}
          <button
            type="button"
            onClick={() => handleScroll('left')}
            disabled={!canScrollLeft}
            className="w-9 h-9 rounded-full bg-white border border-[#DCD5C9] flex items-center justify-center text-[#1A1A1A] hover:bg-[#FAF8F5] disabled:opacity-35 disabled:cursor-not-allowed transition-all shadow-2xs cursor-pointer"
            aria-label="Previous concerns"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => handleScroll('right')}
            disabled={!canScrollRight}
            className="w-9 h-9 rounded-full bg-white border border-[#DCD5C9] flex items-center justify-center text-[#1A1A1A] hover:bg-[#FAF8F5] disabled:opacity-35 disabled:cursor-not-allowed transition-all shadow-2xs cursor-pointer"
            aria-label="Next concerns"
          >
            <ChevronRight className="w-4 h-4" />
          </button>

          <Link
            href="/shop"
            className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#1F4E34] hover:bg-[#163B27] text-white text-xs font-semibold transition-colors shadow-2xs ml-1"
          >
            <span>View All</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>

      {/* Swipeable Snap Carousel Container */}
      <div
        ref={scrollRef}
        className="flex gap-4 sm:gap-5 overflow-x-auto snap-x snap-mandatory scroll-smooth no-scrollbar -mx-4 px-4 sm:mx-0 sm:px-0 pb-3"
      >
        {CONCERNS.map((item, idx) => (
          <Link
            key={idx}
            href={item.link}
            className="w-[260px] xs:w-[280px] sm:w-[320px] shrink-0 snap-start group relative rounded-2xl overflow-hidden shadow-2xs border border-[#EAE5DC] aspect-4/3 flex flex-col justify-end p-5 transition-all hover:shadow-lg hover:-translate-y-1"
          >
            <Image
              src={item.image}
              alt={item.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-700"
              sizes="(max-width: 640px) 280px, 320px"
            />
            {/* Rich gradient overlay for text readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent" />

            {item.tag && (
              <span className="absolute top-3.5 left-3.5 bg-black/40 backdrop-blur-xs text-[#E5D5BA] border border-white/20 text-[10px] font-semibold px-2.5 py-0.5 rounded-full z-10">
                {item.tag}
              </span>
            )}

            <div className="relative z-10 text-white space-y-1">
              <span className="text-[10px] text-[#E5D5BA] font-medium tracking-wide block uppercase line-clamp-1">
                {item.subtitle}
              </span>
              <h3 className="text-base sm:text-lg font-bold font-serif text-white group-hover:text-[#E5D5BA] transition-colors line-clamp-1 leading-snug">
                {item.title}
              </h3>
              <span className="text-xs font-semibold text-[#C59B27] flex items-center gap-1 pt-1 group-hover:translate-x-1 transition-transform">
                <span>Explore Formulations</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};
