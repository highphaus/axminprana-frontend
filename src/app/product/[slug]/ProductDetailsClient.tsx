'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  Star,
  CheckCircle2,
  Clock,
  ShieldAlert,
  Heart,
  Plus,
  Minus,
  Sparkles,
  Info,
  Leaf,
  Share2,
  Copy,
  Check,
  MessageCircle,
  ShoppingBag,
  ChevronRight,
  Zap
} from 'lucide-react';
import { IProduct, fetchFromAPI } from '../../../lib/api';
import { useCart } from '../../../context/CartContext';
import { useAuth } from '../../../context/AuthContext';
import { ProductCard } from '../../../components/ProductCard';

interface Props {
  product: IProduct;
}

export const ProductDetailsClient: React.FC<Props> = ({ product }) => {
  const router = useRouter();
  const { addToCart } = useCart();
  const { wishlist, toggleWishlist, isAuthenticated, user } = useAuth();

  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedVariant, setSelectedVariant] = useState(
    product.variants && product.variants.length > 0 ? product.variants[0] : null
  );
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'ingredients' | 'dosage' | 'details' | 'reviews'>('ingredients');

  // Review Form
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewTitle, setReviewTitle] = useState('');
  const [reviewComment, setReviewComment] = useState('');
  const [reviewAuthor, setReviewAuthor] = useState(user?.name || '');
  const [reviewSubmitting, setReviewSubmitting] = useState(false);
  const [reviewSubmitted, setReviewSubmitted] = useState(false);
  const [shareCopied, setShareCopied] = useState(false);
  const [showShareDropdown, setShowShareDropdown] = useState(false);
  const [isAddedFeedback, setIsAddedFeedback] = useState(false);

  const handleShare = async () => {
    const url = typeof window !== 'undefined' ? window.location.href : '';
    const title = `${product.name} | Axmin Prana Ayurveda`;
    const text = `Explore ${product.name} - authentic classical formulation by Axmin Prana Ayurveda.`;

    if (typeof navigator !== 'undefined' && navigator.share) {
      try {
        await navigator.share({ title, text, url });
        return;
      } catch (err: any) {
        if (err.name !== 'AbortError') {
          console.warn('Share error:', err);
        }
      }
    }

    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      try {
        await navigator.clipboard.writeText(url);
        setShareCopied(true);
        setTimeout(() => setShareCopied(false), 2500);
      } catch (e) {}
    }
    setShowShareDropdown(prev => !prev);
  };

  const isWishlisted = wishlist.includes(product._id);

  const activePrice = selectedVariant
    ? selectedVariant.salePrice || selectedVariant.price
    : product.salePrice || product.price;

  const originalPrice = selectedVariant ? selectedVariant.price : product.price;
  const currentPackSize = selectedVariant ? selectedVariant.packSize : product.packSize;
  const currentStock = selectedVariant && typeof selectedVariant.stock === 'number' ? selectedVariant.stock : product.stock;
  const isOutOfStock = currentStock <= 0;

  const handleAddToCart = () => {
    if (isOutOfStock) return;
    addToCart(product, quantity, currentPackSize, activePrice);
    setIsAddedFeedback(true);
    setTimeout(() => setIsAddedFeedback(false), 2000);
  };

  const handleBuyNow = () => {
    if (isOutOfStock) return;
    addToCart(product, quantity, currentPackSize, activePrice);
    router.push('/checkout');
  };

  const handleReviewSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!reviewTitle || !reviewComment) return;

    setReviewSubmitting(true);
    try {
      await fetchFromAPI('/reviews', {
        method: 'POST',
        body: JSON.stringify({
          productId: product._id,
          userName: reviewAuthor || 'Verified Customer',
          rating: reviewRating,
          title: reviewTitle,
          comment: reviewComment
        })
      });
      setReviewSubmitted(true);
      setReviewTitle('');
      setReviewComment('');
    } catch (e) {
      alert('Failed to submit review');
    } finally {
      setReviewSubmitting(false);
    }
  };

  return (
    <div className="space-y-8 sm:space-y-12 lg:space-y-16">
      {/* 0. Responsive Breadcrumb Navigation */}
      <nav aria-label="Breadcrumb" className="text-[11px] sm:text-xs text-[#777] flex items-center gap-1.5 flex-wrap overflow-hidden">
        <Link href="/" className="hover:text-[#1F4E34] transition-colors shrink-0">
          Home
        </Link>
        <ChevronRight className="w-3 h-3 text-[#bbb] shrink-0" />
        <Link href="/shop" className="hover:text-[#1F4E34] transition-colors shrink-0">
          Shop
        </Link>
        <ChevronRight className="w-3 h-3 text-[#bbb] shrink-0" />
        <span className="hover:text-[#1F4E34] transition-colors shrink-0">{product.category || 'Classical Formulations'}</span>
        <ChevronRight className="w-3 h-3 text-[#bbb] shrink-0" />
        <span className="text-[#1A1A1A] font-semibold truncate max-w-[160px] sm:max-w-xs">{product.name}</span>
      </nav>

      {/* 1. Main Product Hero Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 lg:gap-12 items-start">
        {/* Left: Image Gallery */}
        <div className="lg:col-span-6 space-y-3 sm:space-y-4">
          <div className="relative aspect-square w-full rounded-2xl overflow-hidden bg-white border border-[#E5E8E0] shadow-xs">
            <Image
              src={product.images[selectedImage] || product.thumbnail}
              alt={product.name}
              fill
              priority
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 550px"
              className="object-cover transition-transform duration-500 hover:scale-105"
            />
            {product.doshaBalancing?.primaryDosha && (
              <span className="absolute top-3 left-3 sm:top-4 sm:left-4 bg-white/95 backdrop-blur-xs text-[10px] sm:text-xs font-bold text-[#214E34] px-2.5 sm:px-3 py-1 rounded-full border border-[#E5E8E0] shadow-xs">
                {product.doshaBalancing.primaryDosha} Pacifying
              </span>
            )}
            {isOutOfStock && (
              <span className="absolute top-3 right-3 bg-red-700 text-white text-[10px] sm:text-xs font-bold px-2.5 py-1 rounded-full uppercase tracking-wider shadow-sm">
                Out of Stock
              </span>
            )}
          </div>

          {/* Thumbnails */}
          {product.images.length > 1 && (
            <div className="flex gap-2 sm:gap-3 overflow-x-auto pb-1.5 scrollbar-none">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(idx)}
                  className={`relative w-16 h-16 sm:w-20 sm:h-20 rounded-xl overflow-hidden border-2 shrink-0 bg-white transition-all cursor-pointer ${
                    selectedImage === idx
                      ? 'border-[#214E34] ring-2 ring-[#214E34]/20 scale-95'
                      : 'border-[#E5E8E0] opacity-75 hover:opacity-100'
                  }`}
                  aria-label={`View image ${idx + 1}`}
                >
                  <Image src={img} alt={`${product.name} thumbnail ${idx + 1}`} fill className="object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right: Product Details & Controls */}
        <div className="lg:col-span-6 space-y-4 sm:space-y-5">
          <div>
            {/* Top Row: Brand Category + Share */}
            <div className="flex items-center justify-between gap-2">
              <span className="text-[10px] sm:text-xs font-bold tracking-widest uppercase text-[#B86F4B] truncate">
                {product.brand} • {product.category}
              </span>

              <div className="relative shrink-0">
                <button
                  type="button"
                  onClick={handleShare}
                  className="inline-flex items-center gap-1.5 text-[11px] sm:text-xs text-[#555] hover:text-[#214E34] font-medium transition-colors cursor-pointer px-2.5 py-1 rounded-md bg-[#FAF8F1] border border-[#E5E8E0] hover:border-[#214E34]"
                  title="Share this formulation"
                >
                  {shareCopied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                      <span className="text-emerald-700 font-bold">Copied!</span>
                    </>
                  ) : (
                    <>
                      <Share2 className="w-3.5 h-3.5 text-[#214E34]" />
                      <span>Share</span>
                    </>
                  )}
                </button>

                {/* Desktop/Tablet Share Dropdown */}
                {showShareDropdown && !shareCopied && (
                  <div className="absolute right-0 top-full mt-2 bg-white border border-[#E5E8E0] rounded-xl shadow-xl p-2 w-48 z-40 space-y-1">
                    <button
                      type="button"
                      onClick={() => {
                        if (typeof navigator !== 'undefined' && navigator.clipboard) {
                          navigator.clipboard.writeText(window.location.href);
                          setShareCopied(true);
                          setTimeout(() => setShareCopied(false), 2500);
                        }
                        setShowShareDropdown(false);
                      }}
                      className="w-full flex items-center gap-2 px-2.5 py-2 text-xs font-medium text-[#202820] hover:bg-[#FAF8F1] rounded-md transition-colors text-left"
                    >
                      <Copy className="w-3.5 h-3.5 text-[#214E34]" />
                      <span>Copy Link</span>
                    </button>
                    <a
                      href={`https://api.whatsapp.com/send?text=${encodeURIComponent(
                        `Check out ${product.name} on Axmin Prana Ayurveda: ${typeof window !== 'undefined' ? window.location.href : ''}`
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => setShowShareDropdown(false)}
                      className="w-full flex items-center gap-2 px-2.5 py-2 text-xs font-medium text-[#202820] hover:bg-[#FAF8F1] rounded-md transition-colors"
                    >
                      <MessageCircle className="w-3.5 h-3.5 text-green-600" />
                      <span>Share on WhatsApp</span>
                    </a>
                  </div>
                )}
              </div>
            </div>

            {/* Product Title */}
            <h1 className="text-xl sm:text-2xl lg:text-3xl font-serif-brand font-bold text-[#214E34] mt-1 sm:mt-1.5 leading-tight sm:leading-snug break-words">
              {product.name}
            </h1>

            {/* Tagline */}
            {product.tagline && (
              <p className="text-xs sm:text-sm text-[#687168] mt-1 font-medium italic leading-relaxed">
                {product.tagline}
              </p>
            )}

            {/* Rating & Trust Badges */}
            <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1.5 mt-2.5 sm:mt-3 text-[11px] sm:text-xs">
              <div className="flex items-center text-[#B86F4B]">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${
                      i < Math.floor(product.rating) ? 'fill-[#B86F4B]' : 'text-gray-300'
                    }`}
                  />
                ))}
              </div>
              <span className="font-bold text-[#202820]">{product.rating}</span>
              <span className="text-[#687168]">
                ({product.reviewCount} <span className="hidden min-[380px]:inline">verified </span>reviews)
              </span>
              <span className="text-green-700 font-semibold flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                <span>AYUSH Certified</span>
              </span>
            </div>
          </div>

          {/* Price Box */}
          <div className="p-3 sm:p-4 bg-white rounded-xl border border-[#E5E8E0] space-y-1 shadow-2xs">
            <div className="flex flex-wrap items-baseline gap-2 sm:gap-3">
              <span className="text-2xl sm:text-3xl font-bold text-[#214E34]">
                ₹{activePrice}
              </span>
              {originalPrice > activePrice && (
                <span className="text-sm sm:text-base text-[#687168] line-through">
                  ₹{originalPrice}
                </span>
              )}
              {originalPrice > activePrice && (
                <span className="text-[10px] sm:text-xs font-bold text-[#B86F4B] bg-[#B86F4B]/10 px-2 py-0.5 rounded">
                  Save ₹{originalPrice - activePrice} ({Math.round(((originalPrice - activePrice) / originalPrice) * 100)}% OFF)
                </span>
              )}
            </div>
            <p className="text-[10px] sm:text-[11px] text-[#687168]">
              100% Classical Herbal Formulation • Inclusive of All Taxes
            </p>
          </div>

          {/* Pack Size Variants */}
          {product.variants && product.variants.length > 0 && (
            <div className="space-y-1.5 sm:space-y-2">
              <label className="text-[11px] sm:text-xs font-bold text-[#202820] uppercase tracking-wider block">
                Select Quantity / Pack Size:
              </label>
              <div className="flex flex-wrap gap-2">
                {product.variants.map((v, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedVariant(v)}
                    className={`px-3 py-1.5 sm:px-4 sm:py-2 text-[11px] sm:text-xs font-semibold rounded-lg border transition-all cursor-pointer ${
                      selectedVariant?.sku === v.sku
                        ? 'bg-[#214E34] text-white border-[#214E34] shadow-xs'
                        : 'bg-white text-[#202820] border-[#E5E8E0] hover:border-[#214E34]'
                    }`}
                  >
                    {v.packSize} • ₹{v.salePrice || v.price}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Real-time Dispensary Stock Status Badge */}
          <div className="pt-0.5">
            {isOutOfStock ? (
              <div className="p-2.5 sm:p-3 bg-red-50 border border-red-200 rounded-lg flex items-center gap-2 text-[11px] sm:text-xs font-bold text-red-700 leading-snug">
                <span className="w-2 h-2 rounded-full bg-red-600 animate-pulse shrink-0"></span>
                <span>Currently Out of Stock at the Dispensary. Restocking shortly.</span>
              </div>
            ) : currentStock <= 5 ? (
              <div className="p-2 sm:p-2.5 bg-amber-50 border border-amber-200 rounded-lg flex items-center gap-2 text-[11px] sm:text-xs font-semibold text-amber-800 leading-snug">
                <span className="w-2 h-2 rounded-full bg-amber-600 shrink-0"></span>
                <span>Limited Classical Batch: Only <strong>{currentStock} units</strong> left!</span>
              </div>
            ) : (
              <div className="flex items-center gap-1.5 text-[11px] sm:text-xs text-green-800 font-semibold">
                <span className="w-2 h-2 rounded-full bg-green-600 shrink-0"></span>
                <span>In Stock & Ready for Immediate Dispatch ({currentStock} available)</span>
              </div>
            )}
          </div>

          {/* Action Row: Quantity + Add to Basket + Wishlist */}
          <div className="space-y-2.5 pt-1">
            <div className="flex items-center gap-2 sm:gap-3">
              {/* Quantity Counter */}
              <div
                className={`flex items-center border border-[#E5E8E0] rounded-xl bg-white overflow-hidden shrink-0 h-10 sm:h-11 ${
                  isOutOfStock ? 'opacity-50 pointer-events-none' : ''
                }`}
              >
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  disabled={isOutOfStock}
                  className="px-2.5 sm:px-3 h-full hover:bg-[#FAF8F1] transition-colors text-[#202820] flex items-center justify-center cursor-pointer touch-manipulation"
                  aria-label="Decrease quantity"
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>
                <span className="px-2 sm:px-3 text-xs sm:text-sm font-bold text-[#202820] min-w-[20px] text-center">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  disabled={isOutOfStock}
                  className="px-2.5 sm:px-3 h-full hover:bg-[#FAF8F1] transition-colors text-[#202820] flex items-center justify-center cursor-pointer touch-manipulation"
                  aria-label="Increase quantity"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Add to Basket Button */}
              <button
                onClick={handleAddToCart}
                disabled={isOutOfStock}
                className={`flex-1 h-10 sm:h-11 px-3 sm:px-6 text-xs sm:text-sm font-bold rounded-xl shadow-xs transition-all flex items-center justify-center gap-2 cursor-pointer touch-manipulation ${
                  isOutOfStock
                    ? 'bg-gray-200 text-gray-500 cursor-not-allowed border border-gray-300'
                    : isAddedFeedback
                    ? 'bg-emerald-700 text-white'
                    : 'bg-[#214E34] hover:bg-[#163A28] text-white active:scale-[0.99]'
                }`}
              >
                <ShoppingBag className="w-4 h-4" />
                <span>
                  {isOutOfStock
                    ? 'Sold Out'
                    : isAddedFeedback
                    ? 'Added to Basket!'
                    : 'Add to Basket'}
                </span>
              </button>

              {/* Wishlist Button */}
              <button
                onClick={() => toggleWishlist(product._id)}
                className="h-10 sm:h-11 w-10 sm:w-11 border border-[#E5E8E0] bg-white rounded-xl hover:border-[#214E34] transition-colors flex items-center justify-center shrink-0 cursor-pointer touch-manipulation"
                aria-label="Save to Wishlist"
                title={isWishlisted ? 'In Wishlist' : 'Save to Wishlist'}
              >
                <Heart
                  className={`w-4 h-4 sm:w-5 sm:h-5 ${
                    isWishlisted ? 'fill-[#B86F4B] text-[#B86F4B]' : 'text-[#687168]'
                  }`}
                />
              </button>
            </div>

            {/* Buy Now Button */}
            <button
              onClick={handleBuyNow}
              disabled={isOutOfStock}
              className={`w-full h-11 sm:h-12 px-4 sm:px-6 text-xs sm:text-sm font-bold rounded-xl shadow-xs transition-all flex items-center justify-center gap-2 cursor-pointer touch-manipulation ${
                isOutOfStock
                  ? 'bg-gray-100 text-gray-400 border border-gray-200 cursor-not-allowed'
                  : 'bg-[#B86F4B] hover:bg-[#a05e3d] text-white active:scale-[0.99]'
              }`}
            >
              <Zap className="w-4 h-4" />
              <span>{isOutOfStock ? 'Batch Currently Unavailable' : 'Buy Now with 1-Click Checkout'}</span>
            </button>
          </div>

          {/* Quick Specifications Strip */}
          <div className="grid grid-cols-2 gap-2 sm:gap-3 text-xs text-[#202820]">
            <div className="p-2.5 sm:p-3 bg-[#FAF8F1] rounded-xl border border-[#E5E8E0]/80">
              <span className="text-[#687168] block text-[9px] sm:text-[10px] uppercase font-semibold">
                AYUSH License
              </span>
              <span className="font-bold text-[#214E34] text-[11px] sm:text-xs truncate block">
                {product.ayushLicenseNumber}
              </span>
            </div>
            <div className="p-2.5 sm:p-3 bg-[#FAF8F1] rounded-xl border border-[#E5E8E0]/80">
              <span className="text-[#687168] block text-[9px] sm:text-[10px] uppercase font-semibold">
                Batch & Expiry
              </span>
              <span className="font-bold text-[#214E34] text-[11px] sm:text-xs truncate block">
                {product.batchNumber} • {product.expiryMonths} Mos
              </span>
            </div>
          </div>

          {/* Cancellation & No Return Policy Box */}
          <div className="p-3 sm:p-3.5 bg-[#FAF8F1] rounded-xl border border-[#E5E8E0] space-y-2 text-[11px] sm:text-xs">
            <div className="flex items-start gap-2 text-[#202820]">
              <Clock className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#214E34] shrink-0 mt-0.5" />
              <div className="leading-snug">
                <strong className="text-[#214E34]">Order Cancellation:</strong> Permitted{' '}
                <span className="font-semibold text-[#B86F4B]">strictly before dispensary shipping dispatch</span>.
              </div>
            </div>
            <div className="flex items-start gap-2 text-[#202820] pt-1.5 border-t border-[#E5E8E0]/60">
              <ShieldAlert className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#B86F4B] shrink-0 mt-0.5" />
              <div className="leading-snug">
                <strong className="text-[#214E34]">No Return & No Exchange:</strong> In adherence to Ayurvedic clinical hygiene, pure oil sterilization, and safety standards, products once shipped cannot be returned or exchanged.
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Responsive Tabs Section */}
      <div className="bg-white rounded-2xl border border-[#E5E8E0] p-3.5 sm:p-6 md:p-8 space-y-5 sm:space-y-6 shadow-2xs">
        {/* Tab Headers */}
        <div className="flex border-b border-[#E5E8E0] gap-2 sm:gap-6 overflow-x-auto scrollbar-none text-xs sm:text-sm font-bold -mx-1 px-1">
          <button
            onClick={() => setActiveTab('ingredients')}
            className={`pb-2.5 sm:pb-3 border-b-2 transition-colors flex items-center gap-1.5 whitespace-nowrap cursor-pointer text-[11px] sm:text-xs md:text-sm ${
              activeTab === 'ingredients'
                ? 'border-[#214E34] text-[#214E34]'
                : 'border-transparent text-[#687168] hover:text-[#202820]'
            }`}
          >
            <Leaf className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#B86F4B]" />
            <span>Ingredients ({product.keyIngredients.length})</span>
          </button>
          <button
            onClick={() => setActiveTab('dosage')}
            className={`pb-2.5 sm:pb-3 border-b-2 transition-colors flex items-center gap-1.5 whitespace-nowrap cursor-pointer text-[11px] sm:text-xs md:text-sm ${
              activeTab === 'dosage'
                ? 'border-[#214E34] text-[#214E34]'
                : 'border-transparent text-[#687168] hover:text-[#202820]'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#B86F4B]" />
            <span>Dosage & Usage</span>
          </button>
          <button
            onClick={() => setActiveTab('details')}
            className={`pb-2.5 sm:pb-3 border-b-2 transition-colors flex items-center gap-1.5 whitespace-nowrap cursor-pointer text-[11px] sm:text-xs md:text-sm ${
              activeTab === 'details'
                ? 'border-[#214E34] text-[#214E34]'
                : 'border-transparent text-[#687168] hover:text-[#202820]'
            }`}
          >
            <Info className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#B86F4B]" />
            <span>Description</span>
          </button>
          <button
            onClick={() => setActiveTab('reviews')}
            className={`pb-2.5 sm:pb-3 border-b-2 transition-colors flex items-center gap-1.5 whitespace-nowrap cursor-pointer text-[11px] sm:text-xs md:text-sm ${
              activeTab === 'reviews'
                ? 'border-[#214E34] text-[#214E34]'
                : 'border-transparent text-[#687168] hover:text-[#202820]'
            }`}
          >
            <Star className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#B86F4B]" />
            <span>Reviews ({product.reviewCount})</span>
          </button>
        </div>

        {/* Tab 1: Key Ingredients */}
        {activeTab === 'ingredients' && (
          <div className="space-y-3.5 sm:space-y-4">
            <p className="text-xs text-[#687168] leading-relaxed">
              Every botanical herb in this classical formulation is harvested wild and tested for purity, absence of heavy metals, and active bio-markers.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              {product.keyIngredients.map((ing, i) => (
                <div
                  key={i}
                  className="p-3 sm:p-4 rounded-xl bg-[#FAF8F1] border border-[#E5E8E0] space-y-1"
                >
                  <div className="flex items-baseline justify-between gap-2">
                    <h4 className="text-xs font-bold text-[#214E34] truncate">{ing.name}</h4>
                    {ing.portion && (
                      <span className="text-[10px] font-mono text-[#B86F4B] font-semibold shrink-0">
                        {ing.portion}
                      </span>
                    )}
                  </div>
                  <p className="text-[10px] sm:text-[11px] font-mono italic text-[#687168]">
                    Botanical: {ing.botanicalName}
                  </p>
                  <p className="text-xs text-[#202820] pt-1 leading-snug">{ing.benefit}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 2: Dosage & Anupana */}
        {activeTab === 'dosage' && (
          <div className="space-y-3.5 sm:space-y-4 text-xs text-[#202820] leading-relaxed max-w-2xl">
            <div className="p-3.5 sm:p-4 bg-[#FAF8F1] rounded-xl border border-[#E5E8E0] space-y-1.5">
              <h4 className="font-bold text-[#214E34] text-xs sm:text-sm">Prescribed Administration:</h4>
              <p className="text-xs leading-relaxed">{product.dosageInstructions}</p>
            </div>
            {product.anupana && (
              <div className="p-3.5 sm:p-4 bg-[#DDE7D9]/40 rounded-xl border border-[#214E34]/20 space-y-1.5">
                <h4 className="font-bold text-[#214E34] text-xs sm:text-sm">Classical Anupana (Herbal Carrier):</h4>
                <p className="text-xs leading-relaxed">{product.anupana}</p>
                <p className="text-[10px] sm:text-[11px] text-[#687168]">
                  *Anupana acts as a vehicle in Ayurveda to transport active phytochemicals directly to targeted Dhatus (tissues).
                </p>
              </div>
            )}
            <div className="p-3.5 sm:p-4 bg-white rounded-xl border border-[#E5E8E0] space-y-1.5">
              <h4 className="font-bold text-[#202820] text-xs sm:text-sm">Storage & Warnings:</h4>
              <p className="text-xs leading-relaxed">{product.storageInstructions}</p>
              {product.warnings && <p className="text-red-700 font-medium text-xs pt-1">{product.warnings}</p>}
            </div>
          </div>
        )}

        {/* Tab 3: Full Description */}
        {activeTab === 'details' && (
          <div className="space-y-4 text-xs text-[#202820] leading-relaxed max-w-3xl">
            <p className="text-xs sm:text-sm leading-relaxed">{product.description}</p>
            <div className="pt-4 border-t border-[#E5E8E0] grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 text-xs">
              <div className="p-2.5 rounded-lg bg-[#FAF8F1]">
                <span className="text-[#687168] block text-[10px] uppercase">Format</span>
                <span className="font-bold text-[#214E34] text-xs">{product.format}</span>
              </div>
              <div className="p-2.5 rounded-lg bg-[#FAF8F1]">
                <span className="text-[#687168] block text-[10px] uppercase">Primary Dosha</span>
                <span className="font-bold text-[#214E34] text-xs">{product.doshaBalancing?.primaryDosha}</span>
              </div>
              <div className="p-2.5 rounded-lg bg-[#FAF8F1]">
                <span className="text-[#687168] block text-[10px] uppercase">Origin</span>
                <span className="font-bold text-[#214E34] text-xs">India (Bharat)</span>
              </div>
              <div className="p-2.5 rounded-lg bg-[#FAF8F1]">
                <span className="text-[#687168] block text-[10px] uppercase">Manufacturer</span>
                <span className="font-bold text-[#214E34] text-xs">Axmin Prana</span>
              </div>
            </div>
          </div>
        )}

        {/* Tab 4: Reviews & Review Form */}
        {activeTab === 'reviews' && (
          <div className="space-y-6 sm:space-y-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4 p-3.5 sm:p-4 bg-[#FAF8F1] rounded-xl border border-[#E5E8E0]">
              <div>
                <span className="text-xl sm:text-2xl font-bold text-[#214E34]">{product.rating} / 5.0</span>
                <p className="text-xs text-[#687168]">Based on {product.reviewCount} customer reviews</p>
              </div>
              <div className="flex items-center gap-1 text-[#B86F4B]">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 sm:w-5 sm:h-5 fill-[#B86F4B]" />
                ))}
              </div>
            </div>

            {/* Add Review Form */}
            <div className="bg-[#FAF8F1] p-3.5 sm:p-5 rounded-xl border border-[#E5E8E0] space-y-3">
              <h4 className="text-xs font-bold text-[#214E34] uppercase tracking-wider">
                Write a Verified Experience Review
              </h4>
              {reviewSubmitted ? (
                <div className="p-3 bg-green-100 border border-green-300 text-green-800 rounded-lg text-xs font-semibold">
                  Thank you! Your verified review has been recorded and will reflect on this product.
                </div>
              ) : (
                <form onSubmit={handleReviewSubmit} className="space-y-3 text-xs">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[#687168] mb-1 font-medium">Your Name</label>
                      <input
                        type="text"
                        required
                        value={reviewAuthor}
                        onChange={e => setReviewAuthor(e.target.value)}
                        placeholder="e.g. Ramesh Iyer"
                        className="w-full px-3 py-2 text-xs sm:text-sm border border-[#E5E8E0] rounded-lg bg-white"
                      />
                    </div>
                    <div>
                      <label className="block text-[#687168] mb-1 font-medium">Rating</label>
                      <select
                        value={reviewRating}
                        onChange={e => setReviewRating(Number(e.target.value))}
                        className="w-full px-3 py-2 text-xs sm:text-sm border border-[#E5E8E0] rounded-lg bg-white"
                      >
                        <option value={5}>5 Stars - Outstanding Results</option>
                        <option value={4}>4 Stars - Great Experience</option>
                        <option value={3}>3 Stars - Satisfactory</option>
                        <option value={2}>2 Stars - Below Expectation</option>
                        <option value={1}>1 Star - Dissatisfied</option>
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="block text-[#687168] mb-1 font-medium">Review Title</label>
                    <input
                      type="text"
                      required
                      value={reviewTitle}
                      onChange={e => setReviewTitle(e.target.value)}
                      placeholder="e.g. Noticeable relief within 10 days"
                      className="w-full px-3 py-2 text-xs sm:text-sm border border-[#E5E8E0] rounded-lg bg-white"
                    />
                  </div>
                  <div>
                    <label className="block text-[#687168] mb-1 font-medium">Your Detailed Feedback</label>
                    <textarea
                      rows={3}
                      required
                      value={reviewComment}
                      onChange={e => setReviewComment(e.target.value)}
                      placeholder="Describe the herbs' effect on your wellness, discomfort, or vitality..."
                      className="w-full px-3 py-2 text-xs sm:text-sm border border-[#E5E8E0] rounded-lg bg-white"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={reviewSubmitting}
                    className="w-full sm:w-auto px-5 py-2.5 bg-[#214E34] text-white font-semibold rounded-lg hover:bg-[#163A28] disabled:opacity-50 transition-colors cursor-pointer"
                  >
                    {reviewSubmitting ? 'Submitting...' : 'Post Verified Review'}
                  </button>
                </form>
              )}
            </div>
          </div>
        )}
      </div>

      {/* 3. Related Ayurvedic Formulations */}
      {product.related && product.related.length > 0 && (
        <div className="space-y-4 sm:space-y-6 pt-4 sm:pt-6">
          <div className="border-b border-[#E5E8E0] pb-2.5 sm:pb-3">
            <span className="text-[10px] sm:text-xs font-bold tracking-widest uppercase text-[#B86F4B]">
              Synergistic Formulations
            </span>
            <h3 className="text-lg sm:text-2xl font-serif-brand font-bold text-[#214E34] mt-0.5">
              Pairs Harmoniously With
            </h3>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-6">
            {product.related.map(rel => (
              <ProductCard key={rel._id} product={rel} />
            ))}
          </div>
        </div>
      )}

      {/* 4. Mobile Sticky Bottom Action Bar (Floats comfortably above MobileBottomBar at bottom-[52px]) */}
      <div className="lg:hidden fixed bottom-[52px] inset-x-0 z-30 bg-white/95 backdrop-blur-md border-t border-[#E5E8E0] px-3.5 py-2 shadow-md flex items-center justify-between gap-2.5 safe-area-inset-bottom">
        <div className="min-w-0 flex-1">
          <p className="text-[10px] text-[#687168] truncate font-medium">{product.name}</p>
          <div className="flex items-baseline gap-1.5">
            <span className="text-sm sm:text-base font-bold text-[#214E34]">₹{activePrice}</span>
            {originalPrice > activePrice && (
              <span className="text-[10px] text-[#888] line-through">₹{originalPrice}</span>
            )}
          </div>
        </div>
        <div className="flex items-center gap-1.5 shrink-0">
          <button
            onClick={handleAddToCart}
            disabled={isOutOfStock}
            className={`px-3 py-1.5 text-white text-[11px] font-bold rounded-lg shadow-xs transition-all cursor-pointer ${
              isOutOfStock
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                : isAddedFeedback
                ? 'bg-emerald-700'
                : 'bg-[#214E34] hover:bg-[#163A28] active:scale-95'
            }`}
          >
            {isOutOfStock ? 'Sold Out' : isAddedFeedback ? 'Added!' : 'Add to Basket'}
          </button>
          <button
            onClick={handleBuyNow}
            disabled={isOutOfStock}
            className={`px-3 py-1.5 text-white text-[11px] font-bold rounded-lg shadow-xs transition-all cursor-pointer ${
              isOutOfStock
                ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                : 'bg-[#B86F4B] hover:bg-[#a05e3d] active:scale-95'
            }`}
          >
            Buy Now
          </button>
        </div>
      </div>
    </div>
  );
};
