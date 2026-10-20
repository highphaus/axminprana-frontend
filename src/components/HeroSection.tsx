'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, ShieldCheck, Globe, Building2, Star, Sparkles, ChevronLeft, ChevronRight } from 'lucide-react';
import { IProduct } from '../lib/api';
import { useCart } from '../context/CartContext';

interface HeroSectionProps {
  initialProducts?: IProduct[];
}

interface BannerSlide {
  id: string;
  tag: string;
  tagColor: string;
  headingPrefix: string;
  headingHighlight: string;
  subheading: string;
  description: string;
  ctaText: string;
  ctaLink: string;
  priceNote: string;
  image: string;
  bgGradient: string;
}

const SLIDES: BannerSlide[] = [
  {
    id: 'elixir-gift-set',
    tag: 'Just Launched',
    tagColor: 'bg-[#B03A6A] text-white',
    headingPrefix: 'Meet the',
    headingHighlight: 'Ayurvedic Tailam & Elixir Gift Set',
    subheading: 'A thoughtfully curated collection featuring pure Kashmiri Saffron, Cold-Pressed Bringadi, Ashwagandha & Triphala.',
    description: 'Direct-from-source classical elixirs crafted according to the Ashtanga Hridaya. 100% active botanicals with zero dilution.',
    ctaText: 'Order Now @ ₹1,599*',
    ctaLink: '/product/kumkumadi-radiant-tailam',
    priceNote: '*Special Inaugural Launch Price • Pan-India Free Delivery',
    image: 'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?auto=format&fit=crop&w=1000&q=85',
    bgGradient: 'from-[#0F1E2E] via-[#162A3B] to-[#1F3A4D]'
  },
  {
    id: 'wholesale-dispensary',
    tag: 'Commercial B2B',
    tagColor: 'bg-[#C59B27] text-black font-bold',
    headingPrefix: 'Bulk Wholesale',
    headingHighlight: 'Raw Botanical Extracts & Pure Oils',
    subheading: 'Supplying India’s leading Ayurvedic spas, luxury wellness clinics, and natural cosmetics formulators.',
    description: 'Batch-wise GC/MS & COA certified. Available from 5 Litre clinic packs to 200 Litre industrial drums.',
    ctaText: 'Explore Wholesale Catalog',
    ctaLink: '/bulk-orders',
    priceNote: 'Direct Factory Sourcing • Verified Purity Reports Included',
    image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=1000&q=85',
    bgGradient: 'from-[#1A261D] via-[#213527] to-[#2B4433]'
  },
  {
    id: 'rasayana-remedies',
    tag: 'Charaka Samhita',
    tagColor: 'bg-[#A0522D] text-white',
    headingPrefix: 'Classical Potency',
    headingHighlight: 'Standardized Ashwagandha & Triphala',
    subheading: 'Single-origin certified organic roots processed below 40°C to safeguard delicate herbal bio-actives.',
    description: 'Stabilize stress cortisol rhythms, rejuvenate cellular Ojas, and kindle digestive Agni.',
    ctaText: 'Shop Classical Rasayanas',
    ctaLink: '/shop?category=Immunity%20%26%20Rasayana',
    priceNote: 'AYUSH Certified Formulations • Pan-India Express Delivery',
    image: 'https://images.unsplash.com/photo-1547887537-6158d64c35b3?auto=format&fit=crop&w=1000&q=85',
    bgGradient: 'from-[#2B1B12] via-[#382317] to-[#452C1C]'
  }
];

export const HeroSection: React.FC<HeroSectionProps> = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % SLIDES.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const slide = SLIDES[currentSlide];

  return (
    <div className="space-y-0">
      {/* 1. Full-Width VedaOils Style Campaign Banner */}
      <section className="relative overflow-hidden bg-black text-white min-h-[480px] sm:min-h-[540px] flex items-center">
        {/* Background Gradient */}
        <div className={`absolute inset-0 bg-gradient-to-b sm:bg-gradient-to-r ${slide.bgGradient} transition-all duration-1000 opacity-95`} />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-4 sm:space-y-5 text-center lg:text-left">
              {/* Meet the [Just Launched] header format like VedaOils */}
              <div className="flex items-center justify-center lg:justify-start gap-2.5">
                <span className="font-serif text-2xl sm:text-3xl text-white font-medium">
                  {slide.headingPrefix}
                </span>
                <span className={`text-xs sm:text-sm font-serif font-bold px-3 py-1 rounded-md shadow-sm ${slide.tagColor}`}>
                  {slide.tag}
                </span>
              </div>

              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-serif font-bold text-white leading-tight tracking-tight">
                {slide.headingHighlight}
              </h1>

              <p className="text-xs sm:text-sm md:text-base text-[#E0DDD5] max-w-xl mx-auto lg:mx-0 font-light leading-relaxed">
                {slide.subheading}
              </p>

              {/* VedaOils Signature Pill CTA Button */}
              <div className="pt-2 sm:pt-4 flex flex-col items-center lg:items-start gap-2">
                <Link
                  href={slide.ctaLink}
                  className="w-full sm:w-auto px-10 py-3.5 sm:py-4 bg-[#B83E75] hover:bg-[#9E2E61] text-white font-serif font-bold text-base sm:text-lg rounded-full shadow-xl transition-all transform hover:scale-105 text-center tracking-wide inline-flex items-center justify-center gap-2"
                >
                  <span>{slide.ctaText}</span>
                  <ArrowRight className="w-5 h-5" />
                </Link>
                <span className="text-[11px] sm:text-xs text-[#E5D5BA] tracking-wide font-medium italic">
                  {slide.priceNote}
                </span>
              </div>
            </div>

            {/* Right Product Image Showcase with radiant warm backlighting */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="relative w-72 h-64 sm:w-88 sm:h-80 md:w-96 md:h-96 flex items-center justify-center group">
                {/* Golden ambient backlight glow */}
                <div className="absolute inset-0 bg-radial from-amber-500/40 via-amber-600/10 to-transparent blur-2xl transform scale-110 pointer-events-none" />
                
                <div className="relative w-full h-full rounded-3xl overflow-hidden shadow-2xl border border-white/15 bg-white/5 backdrop-blur-xs flex items-center justify-center">
                  <Image
                    src={slide.image}
                    alt={slide.headingHighlight}
                    fill
                    priority
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Carousel Slide Indicators */}
        <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-2 z-20">
          {SLIDES.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentSlide(idx)}
              className={`h-2 rounded-full transition-all ${
                currentSlide === idx ? 'w-8 bg-[#E5A823]' : 'w-2 bg-white/40'
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      </section>

      {/* 2. Trust Highlights Strip (Horizontal on smaller devices) */}
      <section className="bg-white border-b border-[#EDE8E0] py-4 sm:py-6 shadow-2xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-4 gap-1.5 sm:gap-6 items-center text-center sm:text-left">
            {/* 1. Years of Purity */}
            <div className="flex flex-col sm:flex-row items-center gap-1 sm:gap-2.5 min-w-0">
              <div className="w-7 h-7 sm:w-10 sm:h-10 rounded-full bg-[#FAF7F2] text-[#2C1D11] flex items-center justify-center shrink-0 border border-[#EDE8E0]">
                <ShieldCheck className="w-3.5 h-3.5 sm:w-5 sm:h-5 text-[#C59B27]" />
              </div>
              <div className="min-w-0">
                <span className="font-bold text-[10px] sm:text-sm text-[#1A1A1A] block leading-tight truncate">10+ Years</span>
                <span className="text-[8px] sm:text-[11px] text-[#666] block leading-tight truncate">
                  <span className="hidden sm:inline">100% Natural Guarantee</span>
                  <span className="sm:hidden">Purity</span>
                </span>
              </div>
            </div>

            {/* 2. Businesses Empowered */}
            <div className="flex flex-col sm:flex-row items-center gap-1 sm:gap-2.5 min-w-0">
              <div className="w-7 h-7 sm:w-10 sm:h-10 rounded-full bg-[#FAF7F2] text-[#2C1D11] flex items-center justify-center shrink-0 border border-[#EDE8E0]">
                <Building2 className="w-3.5 h-3.5 sm:w-5 sm:h-5 text-[#C59B27]" />
              </div>
              <div className="min-w-0">
                <span className="font-bold text-[10px] sm:text-sm text-[#1A1A1A] block leading-tight truncate">40k+ B2B</span>
                <span className="text-[8px] sm:text-[11px] text-[#666] block leading-tight truncate">
                  <span className="hidden sm:inline">Spas & Formulators</span>
                  <span className="sm:hidden">Partners</span>
                </span>
              </div>
            </div>

            {/* 3. Global Shipping */}
            <div className="flex flex-col sm:flex-row items-center gap-1 sm:gap-2.5 min-w-0">
              <div className="w-7 h-7 sm:w-10 sm:h-10 rounded-full bg-[#FAF7F2] text-[#2C1D11] flex items-center justify-center shrink-0 border border-[#EDE8E0]">
                <Globe className="w-3.5 h-3.5 sm:w-5 sm:h-5 text-[#C59B27]" />
              </div>
              <div className="min-w-0">
                <span className="font-bold text-[10px] sm:text-sm text-[#1A1A1A] block leading-tight truncate">100+ Lands</span>
                <span className="text-[8px] sm:text-[11px] text-[#666] block leading-tight truncate">
                  <span className="hidden sm:inline">Express Delivery</span>
                  <span className="sm:hidden">Delivery</span>
                </span>
              </div>
            </div>

            {/* 4. Customer Trust Counter & Stars */}
            <div className="flex flex-col sm:flex-row items-center gap-1 sm:gap-2.5 min-w-0">
              <div className="flex -space-x-1 shrink-0">
                <span className="w-5 h-5 sm:w-7 sm:h-7 rounded-full bg-[#C59B27] text-white text-[8px] sm:text-[9px] font-bold flex items-center justify-center border border-white">
                  AP
                </span>
                <span className="w-5 h-5 sm:w-7 sm:h-7 rounded-full bg-[#1F4E34] text-white text-[8px] sm:text-[9px] font-bold flex items-center justify-center border border-white">
                  AY
                </span>
              </div>
              <div className="min-w-0">
                <div className="flex items-center justify-center sm:justify-start gap-0.5 text-[#E5A823]">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-2.5 h-2.5 sm:w-3 sm:h-3 fill-[#E5A823]" />
                  ))}
                </div>
                <span className="text-[8px] sm:text-[10px] text-[#555] block mt-0.5 leading-tight truncate">
                  <span className="hidden sm:inline">Trusted by <strong>12,43,013+</strong></span>
                  <span className="sm:hidden font-bold text-[#1A1A1A]">12L+ Trust</span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
