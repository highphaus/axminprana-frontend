'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Trash2, Plus, Minus, ArrowRight, ShieldCheck, Tag, ArrowLeft } from 'lucide-react';
import { useCart } from '../../context/CartContext';

export default function CartPage() {
  const {
    items,
    itemCount,
    subtotal,
    discountAmount,
    couponCode,
    taxAmount,
    shippingFee,
    totalAmount,
    updateQuantity,
    removeFromCart,
    clearCart,
    applyCoupon,
    removeCoupon
  } = useCart();

  const [inputCoupon, setInputCoupon] = useState('');
  const [couponError, setCouponError] = useState('');
  const [couponLoading, setCouponLoading] = useState(false);

  const freeShippingThreshold = 999;
  const remainingForFreeShipping = Math.max(0, freeShippingThreshold - subtotal);
  const progressPercent = Math.min(100, Math.round((subtotal / freeShippingThreshold) * 100));

  const handleApplyCoupon = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputCoupon.trim()) return;
    setCouponLoading(true);
    setCouponError('');
    const res = await applyCoupon(inputCoupon);
    setCouponLoading(false);
    if (!res.success) {
      setCouponError(res.message || 'Invalid coupon');
    } else {
      setInputCoupon('');
    }
  };

  if (items.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center">
        <div className="w-20 h-20 bg-[#DDE7D9] rounded-full flex items-center justify-center mx-auto mb-4 text-[#214E34]">
          <Tag className="w-10 h-10" />
        </div>
        <h1 className="text-2xl font-serif-brand font-bold text-[#214E34]">Your Ayurvedic Basket is Empty</h1>
        <p className="text-xs sm:text-sm text-[#687168] mt-2 max-w-md mx-auto">
          Explore our time-tested formulations to nourish your mind, body, and vital energies.
        </p>
        <Link
          href="/shop"
          className="mt-6 inline-flex items-center gap-2 px-6 py-3 bg-[#214E34] text-white text-xs font-semibold rounded-md hover:bg-[#163A28] transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Explore Classical Formulations
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      <div className="mb-6">
        <div className="flex items-center gap-2 text-xs text-[#687168] mb-1">
          <Link href="/" className="hover:text-[#214E34]">Home</Link>
          <span>/</span>
          <span className="text-[#202820] font-medium">Shopping Basket</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-serif-brand font-bold text-[#214E34]">
          Your Ayurvedic Basket ({itemCount} {itemCount === 1 ? 'item' : 'items'})
        </h1>
      </div>

      {/* Free Delivery Bar */}
      <div className="bg-[#DDE7D9]/60 border border-[#214E34]/20 rounded-xl p-4 mb-8 text-xs text-[#214E34]">
        {remainingForFreeShipping > 0 ? (
          <p className="font-medium">
            Add <span className="font-bold text-[#B86F4B]">₹{remainingForFreeShipping}</span> more to unlock <span className="font-bold">FREE Pan-India Express Delivery</span>!
          </p>
        ) : (
          <p className="font-semibold flex items-center gap-1.5 text-green-800">
            <ShieldCheck className="w-4 h-4 text-[#214E34]" /> Congratulations! You have unlocked FREE Express Delivery.
          </p>
        )}
        <div className="w-full bg-white h-2 rounded-full mt-2 overflow-hidden border border-[#E5E8E0]">
          <div
            className="bg-[#214E34] h-full rounded-full transition-all duration-300"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left: Items Table */}
        <div className="lg:col-span-8 space-y-4">
          <div className="bg-white rounded-xl border border-[#E5E8E0] divide-y divide-[#E5E8E0] overflow-hidden shadow-2xs">
            {items.map((item, idx) => (
              <div
                key={`${item.product._id}-${item.packSize}-${idx}`}
                className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
              >
                <div className="flex items-center gap-4">
                  <div className="relative w-18 h-18 sm:w-20 sm:h-20 rounded-lg overflow-hidden bg-[#FAF8F1] shrink-0 border border-[#E5E8E0]">
                    <Image
                      src={item.product.thumbnail || item.product.images[0]}
                      alt={item.product.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <Link
                      href={`/product/${item.product.slug}`}
                      className="text-sm sm:text-base font-bold text-[#202820] hover:text-[#214E34] transition-colors leading-snug"
                    >
                      {item.product.name}
                    </Link>
                    <p className="text-xs text-[#687168] mt-0.5">{item.packSize}</p>
                    <span className="text-xs font-bold text-[#214E34] sm:hidden block mt-1">
                      ₹{item.price * item.quantity}
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between sm:justify-end gap-6">
                  {/* Quantity */}
                  <div className="flex items-center border border-[#E5E8E0] rounded-lg bg-[#FAF8F1]">
                    <button
                      onClick={() => updateQuantity(item.product._id, item.packSize, -1)}
                      className="p-2 hover:bg-[#DDE7D9] transition-colors text-[#202820]"
                      aria-label="Decrease quantity"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="px-3 text-xs font-bold text-[#202820]">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateQuantity(item.product._id, item.packSize, 1)}
                      className="p-2 hover:bg-[#DDE7D9] transition-colors text-[#202820]"
                      aria-label="Increase quantity"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <span className="hidden sm:block text-base font-bold text-[#214E34] min-w-[70px] text-right">
                    ₹{item.price * item.quantity}
                  </span>

                  <button
                    onClick={() => removeFromCart(item.product._id, item.packSize)}
                    className="p-2 text-[#687168] hover:text-red-600 transition-colors"
                    aria-label="Remove item"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-between items-center pt-2">
            <Link
              href="/shop"
              className="text-xs font-semibold text-[#214E34] hover:text-[#B86F4B] flex items-center gap-1"
            >
              <ArrowLeft className="w-3.5 h-3.5" /> Continue Shopping
            </Link>
            <button
              onClick={clearCart}
              className="text-xs text-[#687168] hover:text-red-600 underline font-medium"
            >
              Clear Basket
            </button>
          </div>
        </div>

        {/* Right: Order Summary & Coupon */}
        <div className="lg:col-span-4 space-y-4">
          <div className="bg-white rounded-xl border border-[#E5E8E0] p-5 shadow-2xs space-y-4">
            <h3 className="text-sm font-bold text-[#202820] pb-3 border-b border-[#E5E8E0] uppercase tracking-wider">
              Order Summary
            </h3>

            {/* Coupon Code Section */}
            <div>
              {couponCode ? (
                <div className="flex items-center justify-between bg-[#DDE7D9]/50 border border-[#214E34]/20 p-2.5 rounded-lg text-xs">
                  <div className="flex items-center gap-1.5 text-[#214E34] font-medium">
                    <Tag className="w-3.5 h-3.5 text-[#B86F4B]" />
                    <span>Coupon <strong>{couponCode}</strong> applied</span>
                  </div>
                  <button
                    onClick={removeCoupon}
                    className="text-xs text-red-600 hover:underline font-semibold"
                  >
                    Remove
                  </button>
                </div>
              ) : (
                <form onSubmit={handleApplyCoupon} className="space-y-1.5">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Coupon (e.g. PRANA10)"
                      value={inputCoupon}
                      onChange={e => setInputCoupon(e.target.value)}
                      className="flex-1 px-3 py-2 text-xs border border-[#E5E8E0] rounded-md bg-[#FAF8F1] focus:bg-white uppercase font-mono"
                    />
                    <button
                      type="submit"
                      disabled={couponLoading || !inputCoupon.trim()}
                      className="px-4 py-2 bg-[#214E34] text-white text-xs font-semibold rounded-md hover:bg-[#163A28] disabled:opacity-50"
                    >
                      {couponLoading ? '...' : 'Apply'}
                    </button>
                  </div>
                  {couponError && <p className="text-[11px] text-red-600">{couponError}</p>}
                </form>
              )}
            </div>

            {/* Price Calculations */}
            <div className="space-y-2 text-xs text-[#687168] pt-2 border-t border-[#E5E8E0]">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-bold text-[#202820]">₹{subtotal}</span>
              </div>
              {discountAmount > 0 && (
                <div className="flex justify-between text-[#B86F4B] font-semibold">
                  <span>Coupon Discount</span>
                  <span>-₹{discountAmount}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>GST (5% Ayurvedic Healthcare)</span>
                <span className="font-bold text-[#202820]">₹{taxAmount}</span>
              </div>
              <div className="flex justify-between">
                <span>Pan-India Delivery</span>
                <span className="font-bold text-[#202820]">
                  {shippingFee === 0 ? <strong className="text-[#214E34]">FREE</strong> : `₹${shippingFee}`}
                </span>
              </div>
              <div className="flex justify-between text-base font-bold text-[#202820] pt-3 border-t border-[#E5E8E0]">
                <span>Total Amount</span>
                <span className="text-[#214E34] text-xl">₹{totalAmount}</span>
              </div>
            </div>

            <Link
              href="/checkout"
              className="w-full py-3.5 bg-[#214E34] hover:bg-[#163A28] text-white text-xs sm:text-sm font-bold rounded-lg shadow-md transition-colors flex items-center justify-center gap-2"
            >
              Proceed to Secure Checkout <ArrowRight className="w-4 h-4" />
            </Link>

            <div className="pt-2 text-center text-[10px] text-[#687168] space-y-1">
              <p className="flex items-center justify-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-[#214E34]" /> 256-bit Encrypted SSL Checkout
              </p>
              <p>Supports UPI, NetBanking, Cards, and Cash on Delivery</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
