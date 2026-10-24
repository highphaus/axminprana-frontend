'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Star, Heart, Plus, Check, ShoppingCart } from 'lucide-react';
import { IProduct } from '../lib/api';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

interface ProductCardProps {
  product: IProduct;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart } = useCart();
  const { wishlist, toggleWishlist } = useAuth();
  const [isAdding, setIsAdding] = useState(false);
  const [justAdded, setJustAdded] = useState(false);

  const isWishlisted = wishlist.includes(product._id);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsAdding(true);
    addToCart(product, 1);
    setJustAdded(true);
    setTimeout(() => {
      setIsAdding(false);
      setJustAdded(false);
    }, 1500);
  };

  const handleWishlistClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product._id);
  };

  const activePrice = product.salePrice || product.price;
  const originalPrice = product.price;
  const savings = originalPrice > activePrice ? originalPrice - activePrice : 0;

  const imageUrl =
    product.thumbnail ||
    (product.images && product.images.length > 0
      ? product.images[0]
      : 'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?auto=format&fit=crop&w=600&q=80');

  return (
    <div className="group bg-white rounded-2xl border border-[#EAE5DC] hover:border-[#214E34]/40 hover:shadow-md transition-all flex flex-col h-full overflow-hidden relative">
      <Link href={`/product/${product.slug}`} className="flex flex-col flex-1 justify-between h-full p-3 sm:p-4">
        <div>
          {/* Top Row: Out of Stock / Pure Herbal & Wishlist Heart (Removed "Save ₹..." badge) */}
          <div className="flex items-center justify-between mb-1 min-h-[24px]">
            {product.stock <= 0 ? (
              <span className="text-[10px] uppercase font-bold text-red-700 bg-red-100 px-2 py-0.5 rounded tracking-wide">
                Out of Stock
              </span>
            ) : (
              <span className="text-[10px] uppercase font-bold text-[#214E34] bg-emerald-50 px-2.5 py-0.5 rounded-full">
                {product.format || 'Classical'}
              </span>
            )}

            <button
              onClick={handleWishlistClick}
              className="p-1 rounded-full text-[#888] hover:text-[#B86F4B] transition-colors ml-auto"
              aria-label="Save to wishlist"
            >
              <Heart
                className={`w-4 h-4 transition-colors ${
                  isWishlisted ? 'fill-[#B86F4B] text-[#B86F4B]' : 'text-[#888]'
                }`}
              />
            </button>
          </div>

          {/* Product Image Container (Curved rounded-2xl corners) */}
          <div className="relative aspect-square w-full rounded-2xl overflow-hidden bg-[#FAF7F2] my-2 flex items-center justify-center border border-[#EDE8E0] shadow-2xs">
            <Image
              src={imageUrl}
              alt={product.name}
              fill
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
              className={`object-cover rounded-2xl transition-transform duration-500 ${
                product.stock <= 0 ? 'opacity-60' : 'group-hover:scale-105'
              }`}
            />
            {product.stock <= 0 && (
              <div className="absolute inset-0 bg-white/40 flex items-center justify-center z-10 rounded-2xl">
                <span className="bg-red-700 text-white text-[10px] sm:text-[11px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider shadow-sm">
                  Out of Stock
                </span>
              </div>
            )}
          </div>

          {/* Title */}
          <h3 className="text-xs sm:text-sm md:text-base font-bold text-[#1A1A1A] group-hover:text-[#214E34] transition-colors line-clamp-2 min-h-[2rem] sm:min-h-[2.5rem] leading-snug mt-1">
            {product.name}
          </h3>

          {/* Star Rating & Review Count */}
          <div className="flex items-center gap-1.5 mt-1.5 text-xs">
            <div className="flex items-center text-[#E5A823]">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-3.5 h-3.5 ${
                    i < Math.floor(product.rating || 5)
                      ? 'fill-[#E5A823] text-[#E5A823]'
                      : 'text-gray-300'
                  }`}
                />
              ))}
            </div>
            <span className="text-[10px] sm:text-[11px] text-[#666] font-medium">
              {product.reviewCount || 120} Reviews
            </span>
          </div>

          <p className="text-[10px] sm:text-[11px] text-[#777] mt-0.5">{product.packSize}</p>
        </div>

        {/* Bottom Price & Add to Cart Button (Replaces round plus button) */}
        <div className="pt-3 mt-2 border-t border-[#F0ECE4] flex flex-wrap sm:flex-nowrap items-center justify-between gap-2">
          <div className="flex items-baseline gap-1.5">
            <span className="text-sm sm:text-base md:text-lg font-extrabold text-[#111]">
              ₹{activePrice}
            </span>
            {savings > 0 && (
              <span className="text-[10px] sm:text-xs text-[#888] line-through font-normal">
                ₹{originalPrice}
              </span>
            )}
          </div>

          {product.stock <= 0 ? (
            <span className="text-[10px] sm:text-[11px] font-bold text-red-700 bg-red-50 border border-red-200 px-2.5 py-1 rounded-lg">
              Sold Out
            </span>
          ) : (
            <button
              onClick={handleAddToCart}
              disabled={isAdding}
              className={`w-full sm:w-auto px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-xl text-[11px] sm:text-xs font-bold flex items-center justify-center gap-1.5 transition-all shadow-2xs cursor-pointer ${
                justAdded
                  ? 'bg-[#1F4E34] text-white scale-95'
                  : 'bg-[#1F4E34] hover:bg-[#163B27] text-white'
              } disabled:opacity-50`}
              aria-label={`Add ${product.name} to cart`}
            >
              {justAdded ? (
                <>
                  <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                  <span>Added</span>
                </>
              ) : (
                <>
                  <ShoppingCart className="w-3.5 h-3.5" />
                  <span>Add to Cart</span>
                </>
              )}
            </button>
          )}
        </div>
      </Link>

    </div>
  );
};
