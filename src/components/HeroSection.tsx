'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  ShoppingBag,
  Star,
  Check,
  ShieldCheck,
  Truck,
  Sparkles,
  ArrowRight,
  Flame,
  Leaf,
  Plus,
  Minus,
  CheckCircle2,
  Clock,
  Heart,
  ChevronRight,
  Compass,
  Gift,
  Tag
} from 'lucide-react';
import { IProduct } from '../lib/api';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useQuiz } from '../context/QuizContext';

interface IVariantOption {
  size: string;
  price: number;
  salePrice: number;
  sku: string;
}

interface IEcomHeroProduct {
  id: string;
  slug: string;
  name: string;
  eyebrow: string;
  tagline: string;
  description: string;
  badge: string;
  badgeColor: string;
  category: string;
  categoryLink: string;
  rating: number;
  reviewCount: number;
  stockLeft: number;
  image: string;
  treatiseSource: string;
  botanicalHighlight: string;
  dosha: string;
  doshaColor: string;
  variants: IVariantOption[];
}

const ECOM_HERO_PRODUCTS: IEcomHeroProduct[] = [
  {
    id: 'kumkumadi',
    slug: 'kumkumadi-radiant-tailam',
    name: 'Kumkumadi Miraculous Radiant Tailam',
    eyebrow: 'Bestseller in Skin Radiance & Kanti',
    tagline: 'Pure Kashmiri Saffron & Red Sandalwood 72-Hour Boil',
    description: 'Classical Ashtanga Hridaya elixir. Deeply penetrates to illuminate dull skin, soften hyperpigmentation, and restore natural youthful kanti.',
    badge: '★ #1 BESTSELLER',
    badgeColor: 'bg-amber-500 text-black',
    category: 'Skin Radiance',
    categoryLink: '/shop?category=Skin%20Radiance%20%26%20Kanti',
    rating: 4.95,
    reviewCount: 312,
    stockLeft: 14,
    image: 'https://images.unsplash.com/photo-1608248597359-0091d3d6e5a4?auto=format&fit=crop&w=1000&q=85',
    treatiseSource: 'Ashtanga Hridaya • Mukha Lepa Vidhi',
    botanicalHighlight: '12% Kashmiri Mogra Kesar & Rakta Chandana',
    dosha: 'Pitta & Vata Balancer',
    doshaColor: 'bg-amber-400/20 text-amber-300 border-amber-400/30',
    variants: [
      { size: '30 ml Flacon', price: 1850, salePrice: 1599, sku: 'AP-KUM-002-30' },
      { size: '50 ml Royal Dropper', price: 2850, salePrice: 2499, sku: 'AP-KUM-002-50' }
    ]
  },
  {
    id: 'ashwagandha',
    slug: 'ashwagandha-supreme-ksm66',
    name: 'Ashwagandha Supreme KSM-66® Organic',
    eyebrow: 'Top Choice for Stress, Sleep & Vitality',
    tagline: 'Standardized 5% Withanolides Full-Spectrum Root Extract',
    description: 'Revered in Charaka Samhita to strengthen Ojas, stabilize cortisol spikes, relieve anxiety, and promote deep restorative REM sleep.',
    badge: 'CLINICALLY PROVEN',
    badgeColor: 'bg-emerald-500 text-black',
    category: 'Stress & Sleep',
    categoryLink: '/shop?category=Stress%20%26%20Cognitive%20Health',
    rating: 4.92,
    reviewCount: 428,
    stockLeft: 22,
    image: 'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?auto=format&fit=crop&w=1000&q=85',
    treatiseSource: 'Charaka Samhita • Rasayana Adhyaya',
    botanicalHighlight: 'Standardized KSM-66® with BioPerine®',
    dosha: 'Vata & Kapha Pacifying',
    doshaColor: 'bg-emerald-400/20 text-emerald-300 border-emerald-400/30',
    variants: [
      { size: '60 Veggie Caps', price: 999, salePrice: 849, sku: 'AP-ASH-001-60' },
      { size: '120 Veggie Caps', price: 1799, salePrice: 1549, sku: 'AP-ASH-001-120' }
    ]
  },
  {
    id: 'bringadi',
    slug: 'bringadi-hair-therapy-tailam',
    name: 'Bringadi Intensive Ayurvedic Hair & Scalp Oil',
    eyebrow: 'Most Awarded Hair Growth Formulation',
    tagline: '96-Hour Copper Decoction with Eclipta Alba & True Indigo',
    description: 'Traditional woodfire boil in unrefined sesame oil and goat milk. Nourishes dormant hair roots, cools scalp heat, and controls premature hair fall.',
    badge: 'VEDIC HERITAGE',
    badgeColor: 'bg-teal-400 text-black',
    category: 'Hair Therapy',
    categoryLink: '/shop?category=Hair%20Therapy%20%26%20Keshya',
    rating: 4.89,
    reviewCount: 264,
    stockLeft: 18,
    image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=1000&q=85',
    treatiseSource: 'Sahasrayogam • Shiro-Roga Chikitsa',
    botanicalHighlight: 'Fresh Bringaraj Juice & Cold-Pressed Sesame',
    dosha: 'Pitta Cooling & Calming',
    doshaColor: 'bg-teal-400/20 text-teal-300 border-teal-400/30',
    variants: [
      { size: '200 ml Bottle', price: 1250, salePrice: 1099, sku: 'AP-BRN-004-200' },
      { size: '400 ml Twin Pack', price: 2200, salePrice: 1950, sku: 'AP-BRN-004-400' }
    ]
  },
  {
    id: 'chyawanprash',
    slug: 'chyawanprash-supreme-awaleha',
    name: 'Chyawanprash Supreme Awaleha (52 Rare Herbs)',
    eyebrow: 'Family Immunity & Ojas Booster',
    tagline: 'Cooked in Authentic A2 Gir Cow Ghee & Raw Forest Honey',
    description: 'Fresh wild Amla cooked in cultured Desi Gir cow bilona ghee with 50+ classical herbs. Zero refined sugar, zero preservatives, 100% vital immune defense.',
    badge: '100% PURE A2 GHEE',
    badgeColor: 'bg-amber-400 text-black',
    category: 'Immunity & Rasayana',
    categoryLink: '/shop?category=Immunity%20%26%20Rasayana',
    rating: 4.97,
    reviewCount: 512,
    stockLeft: 27,
    image: 'https://images.unsplash.com/photo-1509358271058-acd22cc93898?auto=format&fit=crop&w=1000&q=85',
    treatiseSource: 'Caraka Samhita • Rasayana Chikitsa',
    botanicalHighlight: 'Wild Forest Amla & A2 Gir Cow Ghee',
    dosha: 'Tridoshic Rasayana',
    doshaColor: 'bg-yellow-400/20 text-yellow-300 border-yellow-400/30',
    variants: [
      { size: '500g Jar', price: 1350, salePrice: 1199, sku: 'AP-CHY-005-500' },
      { size: '1kg Grand Jar', price: 2400, salePrice: 2099, sku: 'AP-CHY-005-1000' }
    ]
  }
];

const HEALTH_GOALS = [
  { label: 'Glowing Skin ✨', link: '/shop?category=Skin%20Radiance%20%26%20Kanti' },
  { label: 'Hair Fall Control 🍃', link: '/shop?category=Hair%20Therapy%20%26%20Keshya' },
  { label: 'Stress & Deep Sleep 🌙', link: '/shop?category=Stress%20%26%20Cognitive%20Health' },
  { label: 'Digestive Detox & Gut 🔥', link: '/shop?category=Digestive%20%26%20Gut%20Health' },
  { label: 'Joint & Muscle Ease 🌿', link: '/shop?category=Joint%20Care%20%26%20Sandhi' }
];

interface HeroSectionProps {
  initialProducts?: IProduct[];
}

export const HeroSection: React.FC<HeroSectionProps> = ({ initialProducts = [] }) => {
  const [selectedProductIdx, setSelectedProductIdx] = useState(0);
  const [selectedVariantIdx, setSelectedVariantIdx] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isAdding, setIsAdding] = useState(false);
  const [justAdded, setJustAdded] = useState(false);

  const { addToCart } = useCart();
  const { wishlist, toggleWishlist } = useAuth();
  const { openQuiz } = useQuiz();

  const current = ECOM_HERO_PRODUCTS[selectedProductIdx];
  const activeVariant = current.variants[selectedVariantIdx] || current.variants[0];

  // Reset variant and quantity on product change
  useEffect(() => {
    setSelectedVariantIdx(0);
    setQuantity(1);
  }, [selectedProductIdx]);

  // Construct or find the actual product for cart
  const getProductForCart = (): IProduct => {
    const matched = initialProducts.find(p => p.slug === current.slug);
    if (matched) return matched;

    return {
      _id: `hero-${current.id}`,
      name: current.name,
      slug: current.slug,
      tagline: current.tagline,
      description: current.description,
      category: current.category,
      brand: 'Axmin Prana Heritage',
      price: activeVariant.price,
      salePrice: activeVariant.salePrice,
      sku: activeVariant.sku,
      stock: current.stockLeft,
      packSize: activeVariant.size,
      variants: current.variants.map(v => ({
        sku: v.sku,
        packSize: v.size,
        price: v.price,
        salePrice: v.salePrice,
        stock: 30
      })),
      format: 'Ayurvedic Formulation',
      images: [current.image],
      thumbnail: current.image,
      rating: current.rating,
      reviewCount: current.reviewCount,
      isFeatured: true,
      isBestseller: true,
      keyIngredients: [
        {
          name: current.botanicalHighlight,
          botanicalName: 'Ayurvedic Active Extract',
          benefit: 'Targeted constitutional rejuvenation'
        }
      ],
      dosageInstructions: 'Refer to ritual guidelines.',
      storageInstructions: 'Store in cool ambient conditions.',
      doshaBalancing: {
        vata: current.dosha.includes('Vata'),
        pitta: current.dosha.includes('Pitta'),
        kapha: current.dosha.includes('Kapha'),
        primaryDosha: current.dosha
      },
      ayushLicenseNumber: 'AYU/DL/IND-2024-8841',
      batchNumber: 'AP-2026-HERO',
      expiryMonths: 36,
      taxPercent: 12
    };
  };

  const handleAddToCart = () => {
    setIsAdding(true);
    const prod = getProductForCart();
    addToCart(prod, quantity, activeVariant.size, activeVariant.salePrice);
    setJustAdded(true);
    setTimeout(() => {
      setIsAdding(false);
      setJustAdded(false);
    }, 1500);
  };

  const discountAmount = activeVariant.price - activeVariant.salePrice;
  const discountPercent = Math.round((discountAmount / activeVariant.price) * 100);
  const isWishlisted = wishlist.includes(`hero-${current.id}`);

  return (
    <section className="relative bg-[#0d2218] text-white overflow-hidden border-b border-[#214E34]/40">
      {/* 1. Top E-Commerce Offer Ticker Bar */}
      <div className="bg-[#143224] border-b border-[#D4AF37]/20 py-2 px-4 text-center">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-center gap-x-6 gap-y-1 text-xs">
          <span className="inline-flex items-center gap-1.5 text-[#E6C687] font-semibold">
            <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
            VEDIC FESTIVE OFFER: Flat 15% OFF your order with code <strong className="underline tracking-wider font-bold text-white ml-0.5">PRANA15</strong>
          </span>
          <span className="hidden sm:inline text-white/30">•</span>
          <span className="inline-flex items-center gap-1 text-[#DDE7D9]/90">
            <Gift className="w-3.5 h-3.5 text-[#B86F4B]" />
            Free Kumkumadi Glow Miniature on orders above ₹1,499
          </span>
          <span className="hidden md:inline text-white/30">•</span>
          <span className="hidden md:inline-flex items-center gap-1 text-emerald-300">
            <Truck className="w-3.5 h-3.5" />
            Cash on Delivery Available Pan-India
          </span>
        </div>
      </div>

      {/* Ambient background glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 right-1/4 w-[500px] h-[500px] bg-[#B86F4B]/15 rounded-full blur-[140px]" />
        <div className="absolute bottom-0 left-10 w-[450px] h-[450px] bg-[#214E34]/40 rounded-full blur-[160px]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(212,175,55,0.06),transparent_60%)]" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-14">
        {/* Quick Concern Search & Dosha Pill Ribbon */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-8 pb-5 border-b border-white/10">
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar w-full md:w-auto py-1">
            <span className="text-[11px] font-bold tracking-wider uppercase text-[#E6C687] shrink-0 mr-1 flex items-center gap-1">
              <Tag className="w-3 h-3 text-[#B86F4B]" /> Shop By Concern:
            </span>
            {HEALTH_GOALS.map((goal, idx) => (
              <Link
                key={idx}
                href={goal.link}
                className="px-3 py-1 rounded-full text-xs font-medium bg-white/5 hover:bg-[#B86F4B]/30 hover:text-white border border-white/10 hover:border-[#B86F4B]/50 transition-all text-[#DDE7D9] whitespace-nowrap shrink-0"
              >
                {goal.label}
              </Link>
            ))}
          </div>

          <button
            onClick={openQuiz}
            className="group flex items-center gap-1.5 text-xs text-[#E6C687] hover:text-white transition-colors shrink-0 cursor-pointer self-start md:self-auto"
          >
            <Compass className="w-4 h-4 text-[#B86F4B] group-hover:rotate-45 transition-transform" />
            <span className="font-semibold underline underline-offset-4 decoration-[#B86F4B]">
              Take 60-Sec Dosha Diagnostic
            </span>
            <ChevronRight className="w-3.5 h-3.5 text-[#B86F4B]" />
          </button>
        </div>

        {/* Hero Main Grid: Left Commercial Story + Right E-Commerce Shoppable Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Left Column: Authentic Brand Voice + E-Commerce Buying Hooks */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#183d2c] border border-[#D4AF37]/30 text-[#E6C687] text-[11px] sm:text-xs font-bold tracking-widest uppercase">
              <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>Haridwar Vedic Shastra • 100% Active Botanicals</span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-serif-brand font-bold tracking-tight text-white leading-[1.12]">
              Sacred Ayurveda. <br />
              <span className="text-[#E6C687] font-normal italic">
                Formulated for Proven Wellness.
              </span>
            </h1>

            <p className="text-sm sm:text-base text-[#DDE7D9]/90 max-w-xl mx-auto lg:mx-0 leading-relaxed font-normal">
              Direct-from-source Ayurvedic remedies crafted according to the Charaka and Ashtanga Samhitas. No diluted carrier oils, zero artificial preservatives, full-potency clinical extracts.
            </p>

            {/* Direct E-Commerce Actions */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-1">
              <Link
                href="/shop"
                className="w-full sm:w-auto px-8 py-4 bg-[#B86F4B] hover:bg-[#a05e3d] active:scale-95 text-white text-sm font-bold rounded-lg shadow-xl shadow-[#B86F4B]/30 transition-all flex items-center justify-center gap-2.5"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Shop All Ayurvedic Remedies</span>
                <ArrowRight className="w-4 h-4 ml-1" />
              </Link>

              <Link
                href="/shop?sort=bestseller"
                className="w-full sm:w-auto px-7 py-4 bg-white/5 hover:bg-white/10 border border-[#DDE7D9]/30 text-[#FAF8F1] text-sm font-semibold rounded-lg transition-all flex items-center justify-center gap-2"
              >
                <Sparkles className="w-4 h-4 text-[#D4AF37]" />
                <span>Explore Top Bestsellers</span>
              </Link>
            </div>

            {/* Live E-Commerce Trust Badges */}
            <div className="pt-5 border-t border-white/10 grid grid-cols-2 sm:grid-cols-4 gap-3 text-left">
              <div className="flex items-center gap-2">
                <Truck className="w-4 h-4 text-[#D4AF37] shrink-0" />
                <div>
                  <span className="text-[11px] font-bold text-white block">Free Shipping</span>
                  <span className="text-[10px] text-[#DDE7D9]/70">On orders ₹799+</span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <div>
                  <span className="text-[11px] font-bold text-white block">COD Available</span>
                  <span className="text-[10px] text-[#DDE7D9]/70">Pan-India delivery</span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#B86F4B] shrink-0" />
                <div>
                  <span className="text-[11px] font-bold text-white block">AYUSH Licensed</span>
                  <span className="text-[10px] text-[#DDE7D9]/70">Govt. Verified</span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Star className="w-4 h-4 fill-amber-400 text-amber-400 shrink-0" />
                <div>
                  <span className="text-[11px] font-bold text-white block">4.9★ Patrons</span>
                  <span className="text-[10px] text-[#DDE7D9]/70">25,000+ Reviews</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Shoppable Product Card (The Real E-Commerce Powerhouse) */}
          <div className="lg:col-span-5">
            <div className="bg-[#122B1E] rounded-2xl border border-[#D4AF37]/35 shadow-2xl p-5 sm:p-6 text-white relative">
              {/* Product Tabs Header: Switch between 4 Crown Jewels */}
              <div className="flex items-center justify-between gap-1 pb-4 mb-4 border-b border-white/10 overflow-x-auto no-scrollbar">
                {ECOM_HERO_PRODUCTS.map((prod, idx) => {
                  const isActive = idx === selectedProductIdx;
                  return (
                    <button
                      key={prod.id}
                      onClick={() => setSelectedProductIdx(idx)}
                      className={`text-xs px-3 py-1.5 rounded-md font-semibold transition-all whitespace-nowrap cursor-pointer shrink-0 ${
                        isActive
                          ? 'bg-[#B86F4B] text-white shadow-md'
                          : 'bg-white/5 text-[#DDE7D9]/75 hover:bg-white/10 hover:text-white'
                      }`}
                    >
                      {prod.category}
                    </button>
                  );
                })}
              </div>

              {/* Product Visual & Badges Row */}
              <div className="grid grid-cols-12 gap-4 items-center mb-4">
                <div className="col-span-5 relative aspect-square rounded-xl overflow-hidden bg-[#0A1A12] border border-white/10 shadow-inner group">
                  <Image
                    key={current.id}
                    src={current.image}
                    alt={current.name}
                    fill
                    sizes="(max-width: 768px) 150px, 200px"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-2 left-2">
                    <span
                      className={`text-[9px] font-extrabold px-2 py-0.5 rounded tracking-wide uppercase ${current.badgeColor}`}
                    >
                      {current.badge}
                    </span>
                  </div>
                </div>

                <div className="col-span-7 space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#B86F4B]">
                      {current.eyebrow}
                    </span>
                    <button
                      onClick={() => toggleWishlist(`hero-${current.id}`)}
                      className="p-1 rounded-full hover:bg-white/10 text-white/70 hover:text-rose-400 transition-colors"
                      title="Save to Wishlist"
                    >
                      <Heart
                        className={`w-4 h-4 ${isWishlisted ? 'fill-rose-500 text-rose-500' : ''}`}
                      />
                    </button>
                  </div>

                  <Link href={`/product/${current.slug}`}>
                    <h3 className="text-base sm:text-lg font-bold font-serif-brand text-white hover:text-[#E6C687] transition-colors line-clamp-2">
                      {current.name}
                    </h3>
                  </Link>

                  {/* Rating & Treatise Tag */}
                  <div className="flex items-center gap-1.5 text-xs">
                    <div className="flex text-amber-400">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-3 h-3 fill-amber-400 text-amber-400" />
                      ))}
                    </div>
                    <span className="font-bold text-white text-[11px]">{current.rating}</span>
                    <span className="text-[10px] text-[#DDE7D9]/60">({current.reviewCount})</span>
                  </div>

                  <div className="pt-0.5">
                    <span
                      className={`inline-block text-[10px] px-2 py-0.5 rounded border font-medium ${current.doshaColor}`}
                    >
                      {current.dosha}
                    </span>
                  </div>
                </div>
              </div>

              {/* Pack Size / Variant Selector Buttons */}
              <div className="space-y-1.5 mb-4">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-[#DDE7D9]/80 font-medium">Select Size / Pack:</span>
                  <span className="text-[11px] text-[#E6C687] font-semibold">
                    {activeVariant.size}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  {current.variants.map((v, idx) => {
                    const isSelected = idx === selectedVariantIdx;
                    return (
                      <button
                        key={v.sku}
                        onClick={() => setSelectedVariantIdx(idx)}
                        className={`py-2 px-3 rounded-lg border text-left transition-all cursor-pointer ${
                          isSelected
                            ? 'bg-[#214E34] border-[#E6C687] text-white shadow-sm'
                            : 'bg-white/5 border-white/10 text-[#DDE7D9]/75 hover:bg-white/10 hover:text-white'
                        }`}
                      >
                        <div className="text-xs font-bold">{v.size}</div>
                        <div className="text-[11px] text-[#E6C687] font-semibold mt-0.5">
                          ₹{v.salePrice}{' '}
                          <span className="text-white/40 line-through text-[10px]">
                            ₹{v.price}
                          </span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Price, Stock and Quantity Row */}
              <div className="p-3 rounded-xl bg-black/25 border border-white/10 mb-4 flex items-center justify-between">
                <div>
                  <div className="flex items-baseline gap-2">
                    <span className="text-xl font-extrabold text-[#E6C687]">
                      ₹{activeVariant.salePrice}
                    </span>
                    <span className="text-xs text-white/50 line-through">
                      ₹{activeVariant.price}
                    </span>
                    <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-400/30">
                      Save ₹{discountAmount} ({discountPercent}% OFF)
                    </span>
                  </div>
                  <span className="text-[10px] text-[#DDE7D9]/60 block mt-0.5">
                    Inclusive of all taxes • Ships in 24 Hrs
                  </span>
                </div>

                {/* Quantity Selector */}
                <div className="flex items-center border border-white/20 rounded-lg overflow-hidden bg-white/5">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-2 hover:bg-white/10 text-white transition-colors cursor-pointer"
                    aria-label="Decrease quantity"
                  >
                    <Minus className="w-3 h-3" />
                  </button>
                  <span className="px-3 text-xs font-bold text-white min-w-[28px] text-center">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="p-2 hover:bg-white/10 text-white transition-colors cursor-pointer"
                    aria-label="Increase quantity"
                  >
                    <Plus className="w-3 h-3" />
                  </button>
                </div>
              </div>

              {/* Big High-Converting CTA Buttons */}
              <div className="space-y-2">
                <button
                  onClick={handleAddToCart}
                  disabled={isAdding}
                  className="w-full py-3.5 px-4 bg-[#B86F4B] hover:bg-[#a05e3d] active:scale-[0.99] text-white font-bold text-sm rounded-lg shadow-lg shadow-[#B86F4B]/30 transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  {justAdded ? (
                    <>
                      <Check className="w-4 h-4 text-emerald-300" />
                      <span>Added to Basket!</span>
                    </>
                  ) : (
                    <>
                      <ShoppingBag className="w-4 h-4" />
                      <span>Add to Basket • ₹{activeVariant.salePrice * quantity}</span>
                    </>
                  )}
                </button>

                <div className="flex items-center justify-between text-[11px] pt-1 px-1">
                  <span className="text-emerald-400 flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    In Stock ({current.stockLeft} units left)
                  </span>
                  <Link
                    href={`/product/${current.slug}`}
                    className="text-[#E6C687] hover:underline font-semibold flex items-center gap-0.5"
                  >
                    View Full Product Details →
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 4. Mini Shoppable Carousel Strip: Switch or Instant Buy */}
        <div className="mt-10 pt-6 border-t border-white/10">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold tracking-widest text-[#E6C687] uppercase flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
              Other Crown Formulations:
            </span>
            <Link
              href="/shop"
              className="text-xs text-[#DDE7D9]/80 hover:text-white flex items-center gap-1 font-medium"
            >
              Browse entire collection <ArrowRight className="w-3 h-3" />
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {ECOM_HERO_PRODUCTS.map((item, idx) => {
              const isCurrent = idx === selectedProductIdx;
              return (
                <div
                  key={item.id}
                  onClick={() => setSelectedProductIdx(idx)}
                  className={`p-2.5 rounded-xl border transition-all cursor-pointer flex items-center gap-3 ${
                    isCurrent
                      ? 'bg-[#183d2c] border-[#D4AF37] shadow-lg ring-1 ring-[#D4AF37]/50'
                      : 'bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20'
                  }`}
                >
                  <div className="relative w-12 h-12 rounded-lg overflow-hidden shrink-0 bg-black/40">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover"
                      sizes="48px"
                    />
                  </div>
                  <div className="min-w-0 flex-1">
                    <h5 className="text-xs font-bold text-white truncate">{item.name}</h5>
                    <div className="flex items-center gap-1.5 mt-0.5">
                      <span className="text-xs font-bold text-[#E6C687]">
                        ₹{item.variants[0].salePrice}
                      </span>
                      <span className="text-[10px] text-white/50 line-through">
                        ₹{item.variants[0].price}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
