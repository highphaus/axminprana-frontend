'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Trash2, Plus, Minus, ArrowRight, ShieldCheck, Tag, ArrowLeft, ShoppingBag } from 'lucide-react';
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

  const handleApplyCoupon = async (codeToApply?: string) => {
    const code = (codeToApply || inputCoupon).trim();
    if (!code) return;
    setCouponLoading(true);
    setCouponError('');
    const res = await applyCoupon(code);
    setCouponLoading(false);
    if (!res.success) {
      setCouponError(res.message || 'Invalid coupon code');
    } else {
      setInputCoupon('');
    }
  };

  if (items.length === 0) {
    return (
      <div className="min-h-[70vh] bg-[#FAF7F2] flex items-center justify-center px-4 py-16">
        <div className="max-w-md w-full bg-white rounded-2xl border border-[#EDE8E0] p-8 sm:p-12 text-center shadow-xs">
          <div className="w-16 h-16 bg-[#FAF8F5] border border-[#EDE8E0] rounded-full flex items-center justify-center mx-auto mb-4 text-[#777]">
            <ShoppingBag className="w-7 h-7 stroke-1 text-[#888]" />
          </div>
          <h1 className="text-xl sm:text-2xl font-serif font-bold text-[#1A1A1A]">
            Your Shopping Cart is Empty
          </h1>
          <p className="text-xs sm:text-sm text-[#777] mt-2 leading-relaxed">
            Explore our classical Ayurvedic oils, stone-ground churnas, and botanical formulations to begin.
          </p>
          <div className="pt-6">
            <Link
              href="/shop"
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#1F4E34] hover:bg-[#163B27] text-white text-xs sm:text-sm font-medium rounded-full shadow-xs transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Explore Formulations</span>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAF7F2] py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb Navigation */}
        <nav className="flex items-center gap-2 text-xs text-[#777] mb-4">
          <Link href="/" className="hover:text-[#1F4E34] transition-colors">Home</Link>
          <span>/</span>
          <span className="text-[#1A1A1A] font-medium">Shopping Cart</span>
        </nav>

        {/* Page Header */}
        <div className="flex items-center justify-between pb-6 mb-6 border-b border-[#EDE8E0]">
          <div>
            <h1 className="text-2xl sm:text-3xl font-serif font-bold text-[#1A1A1A] tracking-tight">
              Shopping Cart
            </h1>
            <p className="text-xs sm:text-sm text-[#777] mt-0.5">
              {itemCount} {itemCount === 1 ? 'item' : 'items'} in your cart
            </p>
          </div>
          <Link
            href="/shop"
            className="text-xs sm:text-sm font-medium text-[#1F4E34] hover:underline hidden sm:flex items-center gap-1"
          >
            <span>Continue Shopping</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Free Delivery Unlock Bar */}
        <div className="bg-white border border-[#EDE8E0] rounded-xl p-4 mb-8 text-xs text-[#1A1A1A] shadow-2xs">
          {remainingForFreeShipping > 0 ? (
            <p className="font-normal text-[#555]">
              Add <strong className="text-[#1F4E34] font-bold">₹{remainingForFreeShipping}</strong> more to qualify for <span className="font-semibold text-[#1A1A1A]">FREE Pan-India Express Delivery</span>!
            </p>
          ) : (
            <p className="font-semibold text-[#1F4E34] flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-[#1F4E34]" />
              You have qualified for FREE Express Delivery!
            </p>
          )}
          <div className="w-full bg-[#FAF8F5] h-2 rounded-full mt-2.5 overflow-hidden border border-[#EDE8E0]">
            <div
              className="bg-[#1F4E34] h-full rounded-full transition-all duration-300"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left: Cart Items List */}
          <div className="lg:col-span-8 space-y-4">
            <div className="bg-white rounded-2xl border border-[#EDE8E0] divide-y divide-[#F5F2EC] overflow-hidden shadow-2xs">
              {items.map((item, idx) => (
                <div
                  key={`${item.product._id}-${item.packSize}-${idx}`}
                  className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                >
                  <div className="flex items-center gap-4">
                    <Link href={`/product/${item.product.slug}`} className="shrink-0">
                      <div className="relative w-18 h-18 sm:w-20 sm:h-20 rounded-xl overflow-hidden bg-[#FAF8F5] border border-[#EDE8E0]">
                        <Image
                          src={item.product.thumbnail || item.product.images[0]}
                          alt={item.product.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                    </Link>
                    <div>
                      <Link
                        href={`/product/${item.product.slug}`}
                        className="text-sm sm:text-base font-semibold text-[#1A1A1A] hover:text-[#1F4E34] transition-colors leading-snug line-clamp-1"
                      >
                        {item.product.name}
                      </Link>
                      <p className="text-xs text-[#777] mt-0.5">{item.packSize}</p>
                      <span className="text-xs font-bold text-[#1F4E34] sm:hidden block mt-1">
                        ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between sm:justify-end gap-6 shrink-0">
                    {/* Quantity Selector */}
                    <div className="flex items-center border border-[#DCD5C9] rounded-lg bg-white overflow-hidden">
                      <button
                        onClick={() => updateQuantity(item.product._id, item.packSize, -1)}
                        className="p-1.5 sm:p-2 hover:bg-[#FAF8F5] transition-colors text-[#1A1A1A]"
                        aria-label="Decrease quantity"
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <span className="px-3 text-xs font-semibold text-[#1A1A1A]">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.product._id, item.packSize, 1)}
                        className="p-1.5 sm:p-2 hover:bg-[#FAF8F5] transition-colors text-[#1A1A1A]"
                        aria-label="Increase quantity"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <span className="hidden sm:block text-base font-bold text-[#1A1A1A] min-w-[75px] text-right">
                      ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                    </span>

                    <button
                      onClick={() => removeFromCart(item.product._id, item.packSize)}
                      className="p-1.5 text-[#888] hover:text-red-600 transition-colors"
                      aria-label="Remove item"
                      title="Remove from cart"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex justify-between items-center pt-2 px-1 text-xs">
              <Link
                href="/shop"
                className="font-medium text-[#1F4E34] hover:underline flex items-center gap-1"
              >
                <ArrowLeft className="w-3.5 h-3.5" /> Continue Shopping
              </Link>
              <button
                onClick={clearCart}
                className="text-[#888] hover:text-red-600 transition-colors underline font-normal"
              >
                Clear Shopping Cart
              </button>
            </div>
          </div>

          {/* Right: Order Summary Card */}
          <div className="lg:col-span-4 space-y-4">
            <div className="bg-white rounded-2xl border border-[#EDE8E0] p-5 shadow-2xs space-y-4">
              <h3 className="text-sm font-bold text-[#1A1A1A] pb-3 border-b border-[#EDE8E0] uppercase tracking-wider">
                Order Summary
              </h3>

              {/* Promo Coupon Section */}
              <div className="space-y-2">
                {couponCode ? (
                  <div className="flex items-center justify-between bg-[#F5FAF6] border border-[#1F4E34]/20 p-2.5 rounded-xl text-xs">
                    <div className="flex items-center gap-1.5 text-[#1F4E34] font-medium">
                      <Tag className="w-3.5 h-3.5" />
                      <span>Code <strong>{couponCode}</strong> applied</span>
                    </div>
                    <button
                      onClick={removeCoupon}
                      className="text-xs text-red-600 hover:underline font-semibold"
                    >
                      Remove
                    </button>
                  </div>
                ) : (
                  <form onSubmit={e => { e.preventDefault(); handleApplyCoupon(); }} className="space-y-2">
                    <div className="flex gap-2">
                      <input
                        type="text"
                        placeholder="Discount code (e.g. PRANA15)"
                        value={inputCoupon}
                        onChange={e => setInputCoupon(e.target.value)}
                        className="flex-1 px-3 py-2 text-xs border border-[#DCD5C9] rounded-xl bg-[#FAF8F5] focus:bg-white uppercase font-mono outline-none"
                      />
                      <button
                        type="submit"
                        disabled={couponLoading || !inputCoupon.trim()}
                        className="px-4 py-2 bg-[#1F4E34] hover:bg-[#163B27] text-white text-xs font-semibold rounded-xl disabled:opacity-50 transition-colors"
                      >
                        {couponLoading ? '...' : 'Apply'}
                      </button>
                    </div>
                    {couponError && <p className="text-[11px] text-red-600">{couponError}</p>}
                    
                    {/* Quick Apply Chip for PRANA15 */}
                    <div className="flex items-center gap-1 text-[11px] text-[#777] pt-1">
                      <span>Available:</span>
                      <button
                        type="button"
                        onClick={() => handleApplyCoupon('PRANA15')}
                        className="px-2 py-0.5 rounded-md bg-[#FAF8F5] border border-[#DCD5C9] text-[#1F4E34] font-bold font-mono hover:bg-[#1F4E34] hover:text-white transition-colors"
                      >
                        PRANA15 (15% OFF)
                      </button>
                    </div>
                  </form>
                )}
              </div>

              {/* Price Calculations */}
              <div className="space-y-2.5 text-xs text-[#666] pt-3 border-t border-[#F5F2EC]">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-semibold text-[#1A1A1A]">₹{subtotal.toLocaleString('en-IN')}</span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex justify-between text-[#1F4E34] font-semibold">
                    <span>Discount</span>
                    <span>-₹{discountAmount.toLocaleString('en-IN')}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Tax ({taxAmount > 0 ? '5% Ayurvedic GST' : 'Inclusive'})</span>
                  <span className="font-semibold text-[#1A1A1A]">₹{taxAmount.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between">
                  <span>Express Pan-India Shipping</span>
                  <span className="font-semibold text-[#1A1A1A]">
                    {shippingFee === 0 ? <strong className="text-[#1F4E34]">FREE</strong> : `₹${shippingFee}`}
                  </span>
                </div>
                <div className="flex justify-between text-base font-bold text-[#1A1A1A] pt-3 border-t border-[#EDE8E0]">
                  <span>Total</span>
                  <span className="text-[#1F4E34] text-xl font-black">₹{totalAmount.toLocaleString('en-IN')}</span>
                </div>
              </div>

              <Link
                href="/checkout"
                className="w-full py-3.5 bg-[#1F4E34] hover:bg-[#163B27] text-white text-sm font-bold rounded-xl shadow-xs transition-colors flex items-center justify-center gap-2"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <div className="pt-2 text-center text-[10px] text-[#777] space-y-1">
                <p className="flex items-center justify-center gap-1 font-medium">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#1F4E34]" /> 256-bit Secure Encrypted Checkout
                </p>
                <p>Supports UPI, NetBanking, Debit/Credit Cards & Cash on Delivery</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
