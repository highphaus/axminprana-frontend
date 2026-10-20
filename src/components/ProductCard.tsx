'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Star, Heart, Plus, Check } from 'lucide-react';
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
          {/* Top Row: Save ₹ Badge / Out of Stock & Wishlist Heart */}
          <div className="flex items-center justify-between mb-1 min-h-[24px]">
            {product.stock <= 0 ? (
              <span className="text-[10px] uppercase font-bold text-red-700 bg-red-100 px-2 py-0.5 rounded tracking-wide">
                Out of Stock
              </span>
            ) : savings > 0 ? (
              <span className="text-[11px] sm:text-xs font-semibold text-[#3A3A3A] tracking-tight">
                Save ₹{savings}
              </span>
            ) : (
              <span className="text-[10px] uppercase font-bold text-[#214E34] bg-emerald-50 px-2 py-0.5 rounded">
                Pure Herbal
              </span>
            )}

            <button
              onClick={handleWishlistClick}
              className="p-1 rounded-full text-[#888] hover:text-[#B86F4B] transition-colors"
              aria-label="Save to wishlist"
            >
              <Heart
                className={`w-4 h-4 transition-colors ${
                  isWishlisted ? 'fill-[#B86F4B] text-[#B86F4B]' : 'text-[#888]'
                }`}
              />
            </button>
          </div>

          {/* Product Image Container */}
          <div className="relative aspect-square w-full rounded-xl overflow-hidden bg-[#FAF7F2] my-2 flex items-center justify-center">
            <Image
              src={imageUrl}
              alt={product.name}
              fill
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
              className={`object-cover transition-transform duration-500 ${
                product.stock <= 0 ? 'opacity-60' : 'group-hover:scale-105'
              }`}
            />
            {product.stock <= 0 && (
              <div className="absolute inset-0 bg-white/40 flex items-center justify-center z-10">
                <span className="bg-red-700 text-white text-[10px] sm:text-[11px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider shadow-sm">
                  Out of Stock
                </span>
              </div>
            )}
          </div>

          {/* Title */}
          <h3 className="text-sm sm:text-base font-bold text-[#1A1A1A] group-hover:text-[#214E34] transition-colors line-clamp-1 leading-snug mt-1">
            {product.name}
          </h3>

          {/* Star Rating & Review Count (VedaOils exact yellow star layout) */}
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
            <span className="text-[11px] text-[#666] font-medium">
              {product.reviewCount || 120} Reviews
            </span>
          </div>

          <p className="text-[11px] text-[#777] mt-0.5">{product.packSize}</p>
        </div>

        {/* Bottom Price & Add to Cart / Out of Stock Button */}
        <div className="pt-3 mt-2 border-t border-[#F0ECE4] flex items-center justify-between">
          <div className="flex items-baseline gap-2">
            <span className="text-base sm:text-lg font-extrabold text-[#111]">
              ₹{activePrice}
            </span>
            {savings > 0 && (
              <span className="text-xs text-[#888] line-through font-normal">
                ₹{originalPrice}
              </span>
            )}
          </div>

          {product.stock <= 0 ? (
            <span className="text-[11px] font-bold text-red-700 bg-red-50 border border-red-200 px-2.5 py-1.5 rounded-lg">
              Sold Out
            </span>
          ) : (
            <button
              onClick={handleAddToCart}
              disabled={isAdding}
              className={`w-9 h-9 sm:w-10 sm:h-10 rounded-full border-2 border-[#1F4E34] flex items-center justify-center transition-all ${
                justAdded
                  ? 'bg-[#1F4E34] text-white scale-95'
                  : 'text-[#1F4E34] hover:bg-[#1F4E34] hover:text-white bg-transparent'
              } disabled:opacity-50 shrink-0 shadow-2xs`}
              aria-label="Add to cart"
              title="Add to Cart"
            >
              {justAdded ? (
                <Check className="w-5 h-5 stroke-[2.5]" />
              ) : (
                <Plus className="w-5 h-5 stroke-[2.5]" />
              )}
            </button>
          )}
        </div>
      </Link>

    </div>
  );
};
