'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Star, Heart, ShoppingBag, Check } from 'lucide-react';
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

  const discountPercent =
    product.salePrice && product.salePrice < product.price
      ? Math.round(((product.price - product.salePrice) / product.price) * 100)
      : 0;

  return (
    <div className="group bg-white rounded-lg border border-[#E5E8E0] hover:border-[#214E34]/40 hover:shadow-md transition-all flex flex-col h-full overflow-hidden relative">
      <Link href={`/product/${product.slug}`} className="flex flex-col flex-1 justify-between h-full">
        <div>
          {/* Image Container */}
          <div className="relative aspect-square w-full bg-[#FAF8F1] overflow-hidden">
            <Image
              src={product.thumbnail || product.images[0]}
              alt={product.name}
              fill
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
              className="object-cover group-hover:scale-105 transition-transform duration-500"
            />

            {/* Badges */}
            <div className="absolute top-2 left-2 flex flex-col gap-1 z-10">
              {discountPercent > 0 && (
                <span className="bg-[#B86F4B] text-white text-[10px] font-bold px-2 py-0.5 rounded shadow-xs">
                  {discountPercent}% OFF
                </span>
              )}
              {product.isBestseller && (
                <span className="bg-[#214E34] text-white text-[10px] font-semibold px-2 py-0.5 rounded shadow-xs">
                  Bestseller
                </span>
              )}
            </div>

            {/* Wishlist Button */}
            <button
              onClick={handleWishlistClick}
              className="absolute top-2 right-2 w-8 h-8 rounded-full bg-white/95 hover:bg-white text-[#214E34] flex items-center justify-center shadow-xs transition-colors z-10"
              aria-label="Save to wishlist"
            >
              <Heart
                className={`w-4 h-4 transition-colors ${
                  isWishlisted ? 'fill-[#B86F4B] text-[#B86F4B]' : 'text-[#687168]'
                }`}
              />
            </button>

            {/* Dosha Tag */}
            {product.doshaBalancing?.primaryDosha && (
              <div className="absolute bottom-2 left-2 bg-white/90 backdrop-blur-xs text-[10px] font-semibold text-[#214E34] px-2 py-0.5 rounded border border-[#E5E8E0]">
                {product.doshaBalancing.primaryDosha}
              </div>
            )}
          </div>

          {/* Content */}
          <div className="p-3 sm:p-4">
            <div className="flex items-center gap-1 text-[#B86F4B] text-[11px] mb-1">
              <Star className="w-3.5 h-3.5 fill-[#B86F4B]" />
              <span className="font-bold text-[#202820]">{product.rating}</span>
              <span className="text-[#687168]">({product.reviewCount})</span>
            </div>

            <h3 className="text-xs sm:text-sm font-semibold text-[#202820] line-clamp-2 group-hover:text-[#214E34] transition-colors leading-snug">
              {product.name}
            </h3>

            <p className="text-[11px] text-[#687168] mt-1 font-medium">{product.packSize}</p>
          </div>
        </div>

        <div className="p-3 sm:p-4 pt-0">
          <div className="pt-2 border-t border-[#E5E8E0]/70 flex items-center justify-between">
            <div>
              <div className="flex items-baseline gap-1.5">
                <span className="text-sm sm:text-base font-bold text-[#214E34]">
                  ₹{product.salePrice || product.price}
                </span>
                {product.salePrice && product.salePrice < product.price && (
                  <span className="text-[11px] text-[#687168] line-through">
                    ₹{product.price}
                  </span>
                )}
              </div>
            </div>

            {/* Add to Basket Button */}
            <button
              onClick={handleAddToCart}
              disabled={isAdding || product.stock <= 0}
              className={`min-w-[36px] min-h-[36px] p-2 rounded-md transition-all flex items-center justify-center ${
                justAdded
                  ? 'bg-green-700 text-white'
                  : 'bg-[#214E34] text-white hover:bg-[#163A28]'
              } disabled:opacity-50`}
              aria-label="Add to cart"
            >
              {justAdded ? (
                <Check className="w-4 h-4" />
              ) : (
                <ShoppingBag className="w-4 h-4" />
              )}
            </button>
          </div>
        </div>
      </Link>
    </div>
  );
};
