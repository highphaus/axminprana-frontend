'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import {
  Star,
  ShieldCheck,
  Award,
  RotateCcw,
  CheckCircle2,
  Clock,
  ShieldAlert,
  Heart,
  Plus,
  Minus,
  Sparkles,
  Info,
  Calendar,
  Layers,
  Leaf,
  Share2,
  Copy,
  Check,
  MessageCircle
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
  const [reviewsList, setReviewsList] = useState(product.related || []);
  const [shareCopied, setShareCopied] = useState(false);
  const [showShareDropdown, setShowShareDropdown] = useState(false);

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
    <div className="space-y-12 sm:space-y-16">
      {/* Product Hero Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
        {/* Left: Image Gallery */}
        <div className="lg:col-span-6 space-y-4">
          <div className="relative aspect-square w-full rounded-2xl overflow-hidden bg-white border border-[#E5E8E0] shadow-sm">
            <Image
              src={product.images[selectedImage] || product.thumbnail}
              alt={product.name}
              fill
              priority
              className="object-cover"
            />
            {product.doshaBalancing?.primaryDosha && (
              <span className="absolute top-4 left-4 bg-white/95 backdrop-blur-xs text-xs font-semibold text-[#214E34] px-3 py-1 rounded-full border border-[#E5E8E0] shadow-xs">
                {product.doshaBalancing.primaryDosha} Pacifying
              </span>
            )}
          </div>

          {/* Thumbnails */}
          {product.images.length > 1 && (
            <div className="flex gap-3 overflow-x-auto pb-2">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(idx)}
                  className={`relative w-20 h-20 rounded-lg overflow-hidden border-2 shrink-0 bg-white transition-all ${
                    selectedImage === idx ? 'border-[#214E34] scale-95' : 'border-[#E5E8E0] opacity-70 hover:opacity-100'
                  }`}
                >
                  <Image src={img} alt={`${product.name} ${idx}`} fill className="object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right: Product Details & Controls */}
        <div className="lg:col-span-6 space-y-6">
          <div>
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold tracking-widest uppercase text-[#B86F4B]">
                {product.brand} • {product.category}
              </span>
              <button
                type="button"
                onClick={handleShare}
                className="inline-flex items-center gap-1.5 text-xs text-[#687168] hover:text-[#214E34] font-medium transition-colors cursor-pointer px-2.5 py-1 rounded-md bg-[#FAF8F1] border border-[#E5E8E0] hover:border-[#214E34]"
                title="Share this formulation"
              >
                {shareCopied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                    <span className="text-emerald-700 font-bold">Link Copied!</span>
                  </>
                ) : (
                  <>
                    <Share2 className="w-3.5 h-3.5 text-[#214E34]" />
                    <span>Share</span>
                  </>
                )}
              </button>
            </div>
            <h1 className="text-2xl sm:text-3xl font-serif-brand font-bold text-[#214E34] mt-1 leading-snug">
              {product.name}
            </h1>
            <p className="text-xs sm:text-sm text-[#687168] mt-1 font-medium italic">
              {product.tagline}
            </p>

            {/* Rating */}
            <div className="flex items-center gap-2 mt-3 text-xs">
              <div className="flex items-center text-[#B86F4B]">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${
                      i < Math.floor(product.rating) ? 'fill-[#B86F4B]' : 'text-gray-300'
                    }`}
                  />
                ))}
              </div>
              <span className="font-bold text-[#202820]">{product.rating}</span>
              <span className="text-[#687168]">({product.reviewCount} Verified Customer Reviews)</span>
              <span className="text-green-700 font-semibold flex items-center gap-1 ml-2">
                <CheckCircle2 className="w-3.5 h-3.5" /> Authentic AYUSH Formula
              </span>
            </div>
          </div>

          {/* Price & GST */}
          <div className="p-4 bg-white rounded-xl border border-[#E5E8E0] space-y-1">
            <div className="flex items-baseline gap-3">
              <span className="text-2xl sm:text-3xl font-bold text-[#214E34]">
                ₹{activePrice}
              </span>
              {originalPrice > activePrice && (
                <span className="text-base text-[#687168] line-through">
                  ₹{originalPrice}
                </span>
              )}
              {originalPrice > activePrice && (
                <span className="text-xs font-bold text-[#B86F4B] bg-[#B86F4B]/10 px-2 py-0.5 rounded">
                  Save ₹{originalPrice - activePrice} (
                  {Math.round(((originalPrice - activePrice) / originalPrice) * 100)}% OFF)
                </span>
              )}
            </div>
            <p className="text-[11px] text-[#687168]">
              100% Classical Herbal Formulation • AYUSH Certified
            </p>
          </div>

          {/* Pack Size Variants */}
          {product.variants && product.variants.length > 0 && (
            <div className="space-y-2">
              <label className="text-xs font-bold text-[#202820] uppercase tracking-wider">
                Select Quantity / Pack Size:
              </label>
              <div className="flex flex-wrap gap-2.5">
                {product.variants.map((v, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedVariant(v)}
                    className={`px-4 py-2 text-xs font-semibold rounded-md border transition-all ${
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
          <div className="pt-2">
            {isOutOfStock ? (
              <div className="p-3 bg-red-50 border border-red-200 rounded-lg flex items-center gap-2 text-xs font-bold text-red-700">
                <span className="w-2.5 h-2.5 rounded-full bg-red-600 animate-pulse shrink-0"></span>
                <span>Currently Out of Stock at the Dispensary. Restocking shortly.</span>
              </div>
            ) : currentStock <= 5 ? (
              <div className="p-2.5 bg-amber-50 border border-amber-200 rounded-lg flex items-center gap-2 text-xs font-semibold text-amber-800">
                <span className="w-2 h-2 rounded-full bg-amber-600 shrink-0"></span>
                <span>Limited Classical Batch: Only <strong>{currentStock} units</strong> remaining!</span>
              </div>
            ) : (
              <div className="flex items-center gap-2 text-xs text-green-800 font-semibold">
                <span className="w-2 h-2 rounded-full bg-green-600 shrink-0"></span>
                <span>In Stock & Ready for Immediate Ayurvedic Dispatch ({currentStock} available)</span>
              </div>
            )}
          </div>

          {/* Quantity & CTA Buttons */}
          <div className="space-y-3 pt-1">
            {/* Mobile Controls: Quantity + Wishlist + Share on top row for mobile; unified row on desktop */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-2.5 sm:gap-3">
              <div className="flex items-center justify-between gap-2.5 sm:justify-start">
                {/* Quantity */}
                <div className={`flex items-center border border-[#E5E8E0] rounded-lg bg-white overflow-hidden shrink-0 ${
                  isOutOfStock ? 'opacity-50 pointer-events-none' : ''
                }`}>
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    disabled={isOutOfStock}
                    className="px-3 py-2.5 hover:bg-[#FAF8F1] transition-colors text-[#202820] touch-manipulation min-w-[36px] min-h-[36px] flex items-center justify-center"
                    aria-label="Decrease quantity"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="px-3 sm:px-4 text-xs font-bold text-[#202820]">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    disabled={isOutOfStock}
                    className="px-3 py-2.5 hover:bg-[#FAF8F1] transition-colors text-[#202820] touch-manipulation min-w-[36px] min-h-[36px] flex items-center justify-center"
                    aria-label="Increase quantity"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="flex sm:hidden items-center gap-2">
                  {/* Mobile Wishlist */}
                  <button
                    onClick={() => toggleWishlist(product._id)}
                    className="p-2.5 border border-[#E5E8E0] bg-white rounded-lg hover:border-[#214E34] transition-colors shrink-0 touch-manipulation"
                    aria-label="Save to Wishlist"
                    title={isWishlisted ? "In Wishlist" : "Save to Wishlist"}
                  >
                    <Heart
                      className={`w-5 h-5 ${
                        isWishlisted ? 'fill-[#B86F4B] text-[#B86F4B]' : 'text-[#687168]'
                      }`}
                    />
                  </button>

                  {/* Mobile Share */}
                  <button
                    type="button"
                    onClick={handleShare}
                    className="p-2.5 border border-[#E5E8E0] bg-white rounded-lg hover:border-[#214E34] text-[#687168] transition-colors shrink-0 touch-manipulation"
                    aria-label="Share formulation"
                    title="Share this formulation"
                  >
                    <Share2 className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Add to Basket */}
              <button
                onClick={handleAddToCart}
                disabled={isOutOfStock}
                className={`w-full sm:flex-1 py-3 px-4 sm:px-6 min-h-[46px] text-xs sm:text-sm font-semibold rounded-lg shadow-sm transition-colors flex items-center justify-center gap-2 touch-manipulation ${
                  isOutOfStock
                    ? 'bg-gray-200 text-gray-500 cursor-not-allowed border border-gray-300'
                    : 'bg-[#214E34] hover:bg-[#163A28] text-white'
                }`}
              >
                <span>{isOutOfStock ? 'Sold Out / Out of Stock' : 'Add to Ayurvedic Basket'}</span>
              </button>

              {/* Desktop Wishlist */}
              <button
                onClick={() => toggleWishlist(product._id)}
                className="hidden sm:block p-3 border border-[#E5E8E0] bg-white rounded-lg hover:border-[#214E34] transition-colors shrink-0 touch-manipulation"
                aria-label="Save to Wishlist"
                title={isWishlisted ? "In Wishlist" : "Save to Wishlist"}
              >
                <Heart
                  className={`w-5 h-5 ${
                    isWishlisted ? 'fill-[#B86F4B] text-[#B86F4B]' : 'text-[#687168]'
                  }`}
                />
              </button>

              {/* Desktop Share Button with Dropdown */}
              <div className="relative hidden sm:block shrink-0">
                <button
                  type="button"
                  onClick={handleShare}
                  className="p-3 border border-[#E5E8E0] bg-white rounded-lg hover:border-[#214E34] hover:text-[#214E34] text-[#687168] transition-colors flex items-center justify-center cursor-pointer touch-manipulation"
                  aria-label="Share formulation"
                  title="Share this formulation"
                >
                  <Share2 className="w-5 h-5" />
                </button>

                {/* Share Link Copied Toast */}
                {shareCopied && (
                  <div className="absolute right-0 bottom-full mb-2 bg-[#214E34] text-white text-[11px] font-semibold py-1.5 px-3 rounded-lg shadow-xl whitespace-nowrap animate-in fade-in flex items-center gap-1.5 z-30">
                    <Check className="w-3.5 h-3.5 text-amber-300" />
                    <span>Link Copied!</span>
                  </div>
                )}

                {/* Share Dropdown */}
                {showShareDropdown && !shareCopied && (
                  <div className="absolute right-0 bottom-full mb-2 bg-white border border-[#E5E8E0] rounded-xl shadow-xl p-2 w-52 z-30 space-y-1">
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
                      className="w-full flex items-center gap-2 px-2.5 py-2 text-xs font-medium text-[#202820] hover:bg-[#FAF8F1] rounded-md transition-colors"
                    >
                      <Copy className="w-3.5 h-3.5 text-[#214E34]" />
                      <span>Copy Product Link</span>
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

            {/* Buy Now */}
            <button
              onClick={handleBuyNow}
              disabled={isOutOfStock}
              className={`w-full py-3 px-4 sm:px-6 min-h-[46px] text-xs sm:text-sm font-bold rounded-lg shadow-sm transition-colors text-center touch-manipulation ${
                isOutOfStock
                  ? 'bg-gray-100 text-gray-400 border border-gray-200 cursor-not-allowed'
                  : 'bg-[#B86F4B] hover:bg-[#a05e3d] text-white'
              }`}
            >
              {isOutOfStock ? 'Batch Currently Unavailable' : 'Buy Now with 1-Click Checkout'}
            </button>
          </div>

          {/* Quick Specifications list */}
          <div className="grid grid-cols-2 gap-3 text-xs text-[#202820]">
            <div className="p-3 bg-[#FAF8F1] rounded-lg border border-[#E5E8E0]/70">
              <span className="text-[#687168] block text-[10px] uppercase font-semibold">AYUSH License</span>
              <span className="font-bold text-[#214E34] truncate block">{product.ayushLicenseNumber}</span>
            </div>
            <div className="p-3 bg-[#FAF8F1] rounded-lg border border-[#E5E8E0]/70">
              <span className="text-[#687168] block text-[10px] uppercase font-semibold">Batch & Expiry</span>
              <span className="font-bold text-[#214E34] truncate block">{product.batchNumber} • {product.expiryMonths} Mos</span>
            </div>
          </div>

          {/* Cancellation & No Return/Exchange Policy Strip */}
          <div className="p-3.5 bg-[#FAF8F1] rounded-xl border border-[#E5E8E0] space-y-2 text-xs">
            <div className="flex items-start gap-2 text-[#202820]">
              <Clock className="w-4 h-4 text-[#214E34] shrink-0 mt-0.5" />
              <div>
                <strong className="text-[#214E34]">Order Cancellation:</strong> Permitted{' '}
                <span className="font-semibold text-[#B86F4B]">strictly before dispensary shipping dispatch</span>.
              </div>
            </div>
            <div className="flex items-start gap-2 text-[#202820] pt-1.5 border-t border-[#E5E8E0]/60">
              <ShieldAlert className="w-4 h-4 text-[#B86F4B] shrink-0 mt-0.5" />
              <div>
                <strong className="text-[#214E34]">No Return & No Exchange:</strong> In adherence to Ayurvedic clinical hygiene, pure oil sterilization, and safety standards, products once shipped/delivered cannot be returned or exchanged.
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs Section: Ingredients, Directions, Full Specs, Reviews */}
      <div className="bg-white rounded-2xl border border-[#E5E8E0] p-4 sm:p-6 md:p-8 space-y-6">
        {/* Tab Headers */}
        <div className="flex border-b border-[#E5E8E0] gap-4 sm:gap-8 overflow-x-auto no-scrollbar text-xs sm:text-sm font-bold">
          <button
            onClick={() => setActiveTab('ingredients')}
            className={`pb-3 border-b-2 transition-colors flex items-center gap-1.5 whitespace-nowrap ${
              activeTab === 'ingredients'
                ? 'border-[#214E34] text-[#214E34]'
                : 'border-transparent text-[#687168] hover:text-[#202820]'
            }`}
          >
            <Leaf className="w-4 h-4 text-[#B86F4B]" /> Authentic Ingredients ({product.keyIngredients.length})
          </button>
          <button
            onClick={() => setActiveTab('dosage')}
            className={`pb-3 border-b-2 transition-colors flex items-center gap-1.5 whitespace-nowrap ${
              activeTab === 'dosage'
                ? 'border-[#214E34] text-[#214E34]'
                : 'border-transparent text-[#687168] hover:text-[#202820]'
            }`}
          >
            <Sparkles className="w-4 h-4 text-[#B86F4B]" /> Dosage & Anupana
          </button>
          <button
            onClick={() => setActiveTab('details')}
            className={`pb-3 border-b-2 transition-colors flex items-center gap-1.5 whitespace-nowrap ${
              activeTab === 'details'
                ? 'border-[#214E34] text-[#214E34]'
                : 'border-transparent text-[#687168] hover:text-[#202820]'
            }`}
          >
            <Info className="w-4 h-4 text-[#B86F4B]" /> Full Classical Description
          </button>
          <button
            onClick={() => setActiveTab('reviews')}
            className={`pb-3 border-b-2 transition-colors flex items-center gap-1.5 whitespace-nowrap ${
              activeTab === 'reviews'
                ? 'border-[#214E34] text-[#214E34]'
                : 'border-transparent text-[#687168] hover:text-[#202820]'
            }`}
          >
            <Star className="w-4 h-4 text-[#B86F4B]" /> Verified Reviews ({product.reviewCount})
          </button>
        </div>

        {/* Tab 1: Key Ingredients */}
        {activeTab === 'ingredients' && (
          <div className="space-y-4">
            <p className="text-xs text-[#687168] leading-relaxed">
              Every herb in this classical formulation is harvested wild and tested for purity, pesticide absence, and active withanolide/tannin bio-markers.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {product.keyIngredients.map((ing, i) => (
                <div
                  key={i}
                  className="p-4 rounded-xl bg-[#FAF8F1] border border-[#E5E8E0] space-y-1"
                >
                  <div className="flex items-baseline justify-between">
                    <h4 className="text-xs font-bold text-[#214E34]">{ing.name}</h4>
                    {ing.portion && (
                      <span className="text-[10px] font-mono text-[#B86F4B] font-semibold">
                        {ing.portion}
                      </span>
                    )}
                  </div>
                  <p className="text-[11px] font-mono italic text-[#687168]">
                    Botanical: {ing.botanicalName}
                  </p>
                  <p className="text-xs text-[#202820] pt-1">{ing.benefit}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 2: Dosage & Anupana */}
        {activeTab === 'dosage' && (
          <div className="space-y-4 text-xs text-[#202820] leading-relaxed max-w-2xl">
            <div className="p-4 bg-[#FAF8F1] rounded-xl border border-[#E5E8E0] space-y-2">
              <h4 className="font-bold text-[#214E34]">Prescribed Administration:</h4>
              <p>{product.dosageInstructions}</p>
            </div>
            {product.anupana && (
              <div className="p-4 bg-[#DDE7D9]/40 rounded-xl border border-[#214E34]/20 space-y-2">
                <h4 className="font-bold text-[#214E34]">Classical Anupana (Herbal Carrier):</h4>
                <p>{product.anupana}</p>
                <p className="text-[11px] text-[#687168]">
                  *Anupana acts as a vehicle in Ayurveda to transport active phytochemicals directly to targeted Dhatus (tissues).
                </p>
              </div>
            )}
            <div className="p-4 bg-white rounded-xl border border-[#E5E8E0] space-y-1">
              <h4 className="font-bold text-[#202820]">Storage & Warnings:</h4>
              <p>{product.storageInstructions}</p>
              {product.warnings && <p className="text-red-700 font-medium">{product.warnings}</p>}
            </div>
          </div>
        )}

        {/* Tab 3: Full Description */}
        {activeTab === 'details' && (
          <div className="space-y-4 text-xs text-[#202820] leading-relaxed max-w-3xl">
            <p className="text-sm leading-relaxed">{product.description}</p>
            <div className="pt-4 border-t border-[#E5E8E0] grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
              <div>
                <span className="text-[#687168] block">Classical Format</span>
                <span className="font-bold text-[#214E34]">{product.format}</span>
              </div>
              <div>
                <span className="text-[#687168] block">Primary Dosha</span>
                <span className="font-bold text-[#214E34]">{product.doshaBalancing?.primaryDosha}</span>
              </div>
              <div>
                <span className="text-[#687168] block">Country of Origin</span>
                <span className="font-bold text-[#214E34]">India (Bharat)</span>
              </div>
              <div>
                <span className="text-[#687168] block">Manufacturer</span>
                <span className="font-bold text-[#214E34]">Axmin Prana Ayurveda</span>
              </div>
            </div>
          </div>
        )}

        {/* Tab 4: Reviews & Review Form */}
        {activeTab === 'reviews' && (
          <div className="space-y-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 bg-[#FAF8F1] rounded-xl border border-[#E5E8E0]">
              <div>
                <span className="text-2xl font-bold text-[#214E34]">{product.rating} / 5.0</span>
                <p className="text-xs text-[#687168]">Based on {product.reviewCount} customer reviews</p>
              </div>
              <div className="flex items-center gap-1 text-[#B86F4B]">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-[#B86F4B]" />
                ))}
              </div>
            </div>

            {/* Add Review Form */}
            <div className="bg-[#FAF8F1] p-5 rounded-xl border border-[#E5E8E0] space-y-3">
              <h4 className="text-xs font-bold text-[#214E34] uppercase tracking-wider">
                Write a Verified Experience Review
              </h4>
              {reviewSubmitted ? (
                <div className="p-3 bg-green-100 border border-green-300 text-green-800 rounded-md text-xs font-semibold">
                  Thank you! Your verified review has been recorded and will reflect on this product.
                </div>
              ) : (
                <form onSubmit={handleReviewSubmit} className="space-y-3 text-xs">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[#687168] mb-1 font-medium">Your Full Name</label>
                      <input
                        type="text"
                        required
                        value={reviewAuthor}
                        onChange={e => setReviewAuthor(e.target.value)}
                        placeholder="e.g. Ramesh Iyer"
                        className="w-full px-3 py-2 border border-[#E5E8E0] rounded-md bg-white"
                      />
                    </div>
                    <div>
                      <label className="block text-[#687168] mb-1 font-medium">Rating</label>
                      <select
                        value={reviewRating}
                        onChange={e => setReviewRating(Number(e.target.value))}
                        className="w-full px-3 py-2 border border-[#E5E8E0] rounded-md bg-white"
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
                      placeholder="e.g. Noticeable energy shift within 2 weeks"
                      className="w-full px-3 py-2 border border-[#E5E8E0] rounded-md bg-white"
                    />
                  </div>
                  <div>
                    <label className="block text-[#687168] mb-1 font-medium">Your Detailed Feedback</label>
                    <textarea
                      rows={3}
                      required
                      value={reviewComment}
                      onChange={e => setReviewComment(e.target.value)}
                      placeholder="Describe the herbs' effect on your wellness, sleep, or digestion..."
                      className="w-full px-3 py-2 border border-[#E5E8E0] rounded-md bg-white"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={reviewSubmitting}
                    className="px-5 py-2.5 bg-[#214E34] text-white font-semibold rounded-md hover:bg-[#163A28] disabled:opacity-50"
                  >
                    {reviewSubmitting ? 'Submitting...' : 'Post Verified Review'}
                  </button>
                </form>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Related Ayurvedic Products */}
      {product.related && product.related.length > 0 && (
        <div className="space-y-6 pt-6">
          <div className="border-b border-[#E5E8E0] pb-3">
            <span className="text-xs font-bold tracking-widest uppercase text-[#B86F4B]">
              Synergistic Formulations
            </span>
            <h3 className="text-xl sm:text-2xl font-serif-brand font-bold text-[#214E34] mt-0.5">
              Pairs Harmoniously With
            </h3>
          </div>
          <div className="grid grid-cols-1 min-[360px]:grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3.5 sm:gap-6">
            {product.related.map(rel => (
              <ProductCard key={rel._id} product={rel} />
            ))}
          </div>
        </div>
      )}

      {/* Mobile Sticky Bottom Action Bar (Kama Ayurveda & Forest Essentials Pattern) */}
      <div className="lg:hidden fixed bottom-0 inset-x-0 z-40 bg-white/95 backdrop-blur-md border-t border-[#E5E8E0] px-4 py-2.5 shadow-lg flex items-center justify-between gap-3 safe-area-inset-bottom">
        <div className="min-w-0">
          <p className="text-[11px] text-[#687168] truncate font-medium">{product.name}</p>
          <div className="flex items-baseline gap-1.5">
            <span className="text-base font-bold text-[#214E34]">₹{activePrice}</span>
            {originalPrice > activePrice && (
              <span className="text-[11px] text-[#687168] line-through">₹{originalPrice}</span>
            )}
          </div>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={handleAddToCart}
            className="px-4 py-2 bg-[#214E34] text-white text-xs font-bold rounded-lg shadow-xs hover:bg-[#163A28] transition-colors"
          >
            Add to Basket
          </button>
          <button
            onClick={handleBuyNow}
            className="px-4 py-2 bg-[#B86F4B] text-white text-xs font-bold rounded-lg shadow-xs hover:bg-[#a05e3d] transition-colors"
          >
            Buy Now
          </button>
        </div>
      </div>
    </div>
  );
};
