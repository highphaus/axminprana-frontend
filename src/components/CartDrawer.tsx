'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { X, Trash2, Plus, Minus, ArrowRight, Tag } from 'lucide-react';
import { useCart } from '../context/CartContext';

export const CartDrawer: React.FC = () => {
  const {
    items,
    itemCount,
    subtotal,
    discountAmount,
    couponCode,
    taxAmount,
    shippingFee,
    totalAmount,
    isDrawerOpen,
    closeDrawer,
    updateQuantity,
    removeFromCart,
    applyCoupon,
    removeCoupon
  } = useCart();

  const [inputCoupon, setInputCoupon] = useState('');
  const [couponError, setCouponError] = useState('');
  const [couponLoading, setCouponLoading] = useState(false);

  if (!isDrawerOpen) return null;



  const handleApplyCoupon = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputCoupon.trim()) return;
    setCouponLoading(true);
    setCouponError('');
    const res = await applyCoupon(inputCoupon);
    setCouponLoading(false);
    if (!res.success) {
      setCouponError(res.message || 'Invalid coupon code');
    } else {
      setInputCoupon('');
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-xs transition-opacity"
        onClick={closeDrawer}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-0 sm:pl-10 w-full sm:w-auto">
        <div className="w-full sm:w-[420px] max-w-full bg-[#FAF8F1] shadow-2xl flex flex-col border-l border-[#E5E8E0] h-full">
          {/* Header */}
          <div className="p-3.5 sm:p-4 bg-[#214E34] text-white flex items-center justify-between shrink-0">
            <div className="flex items-center gap-2">
              <h2 className="text-lg font-medium tracking-wide">Your Ayurvedic Basket</h2>
              <span className="bg-[#B86F4B] text-white text-xs px-2 py-0.5 rounded-full font-semibold">
                {itemCount}
              </span>
            </div>
            <button
              onClick={closeDrawer}
              className="p-1.5 rounded-md hover:bg-white/10 transition-colors text-white"
              aria-label="Close cart drawer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>



          {/* Items List */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {items.length === 0 ? (
              <div className="text-center py-12">
                <div className="w-16 h-16 rounded-full bg-[#DDE7D9] flex items-center justify-center mx-auto mb-3 text-[#214E34]">
                  <Tag className="w-8 h-8" />
                </div>
                <h3 className="text-base font-semibold text-[#202820]">Your basket is empty</h3>
                <p className="text-xs text-[#687168] mt-1 max-w-xs mx-auto">
                  Explore our authentic Ayurvedic formulations, tailored for your Dosha and well-being.
                </p>
                <button
                  onClick={closeDrawer}
                  className="mt-5 px-6 py-2.5 bg-[#214E34] text-white text-xs font-semibold rounded-md hover:bg-[#163A28] transition-colors"
                >
                  Explore Formulations
                </button>
              </div>
            ) : (
              items.map((item, idx) => (
                <div
                  key={`${item.product._id}-${item.packSize}-${idx}`}
                  className="flex gap-3 bg-white p-3 rounded-lg border border-[#E5E8E0] shadow-2xs"
                >
                  <div className="relative w-16 h-16 rounded-md overflow-hidden bg-[#FAF8F1] shrink-0 border border-[#E5E8E0]">
                    <Image
                      src={item.product.thumbnail || item.product.images[0]}
                      alt={item.product.name}
                      fill
                      className="object-cover"
                    />
                  </div>

                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-semibold text-[#202820] truncate">
                      {item.product.name}
                    </h4>
                    <p className="text-xs text-[#687168] mt-0.5">{item.packSize}</p>
                    <div className="flex items-center justify-between mt-2">
                      <span className="text-sm font-bold text-[#214E34]">
                        ₹{item.price * item.quantity}
                      </span>

                      {/* Quantity Controls */}
                      <div className="flex items-center border border-[#E5E8E0] rounded-md overflow-hidden bg-[#FAF8F1]">
                        <button
                          onClick={() => updateQuantity(item.product._id, item.packSize, -1)}
                          className="p-1 hover:bg-[#DDE7D9] transition-colors text-[#202820]"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="px-2 text-xs font-medium text-[#202820]">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.product._id, item.packSize, 1)}
                          className="p-1 hover:bg-[#DDE7D9] transition-colors text-[#202820]"
                          aria-label="Increase quantity"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <button
                        onClick={() => removeFromCart(item.product._id, item.packSize)}
                        className="text-[#687168] hover:text-red-600 transition-colors p-1"
                        aria-label="Remove item"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer & Checkout */}
          {items.length > 0 && (
            <div className="p-4 bg-white border-t border-[#E5E8E0] space-y-3">
              {/* Coupon Form */}
              {couponCode ? (
                <div className="flex items-center justify-between bg-[#DDE7D9]/50 border border-[#214E34]/20 px-3 py-2 rounded-md text-xs">
                  <div className="flex items-center gap-1.5 text-[#214E34] font-medium">
                    <Tag className="w-3.5 h-3.5 text-[#B86F4B]" />
                    <span>Coupon <strong>{couponCode}</strong> applied</span>
                  </div>
                  <button
                    onClick={removeCoupon}
                    className="text-xs text-red-600 hover:underline font-medium"
                  >
                    Remove
                  </button>
                </div>
              ) : (
                <form onSubmit={handleApplyCoupon} className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Enter Coupon Code"
                    value={inputCoupon}
                    onChange={e => setInputCoupon(e.target.value)}
                    className="flex-1 text-xs px-3 py-2 rounded-md border border-[#E5E8E0] bg-[#FAF8F1] focus:bg-white uppercase font-mono"
                  />
                  <button
                    type="submit"
                    disabled={couponLoading || !inputCoupon.trim()}
                    className="px-4 py-2 bg-[#214E34] text-white text-xs font-semibold rounded-md hover:bg-[#163A28] disabled:opacity-50 transition-colors"
                  >
                    {couponLoading ? '...' : 'Apply'}
                  </button>
                </form>
              )}
              {couponError && <p className="text-[11px] text-red-600">{couponError}</p>}

              {/* Price Breakdown */}
              <div className="space-y-1.5 text-xs text-[#687168] pt-2 border-t border-[#E5E8E0]">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-medium text-[#202820]">₹{subtotal}</span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex justify-between text-[#B86F4B] font-medium">
                    <span>Discount</span>
                    <span>-₹{discountAmount}</span>
                  </div>
                )}

                <div className="flex justify-between text-sm font-bold text-[#202820] pt-2 border-t border-[#E5E8E0]">
                  <span>Total Amount</span>
                  <span className="text-[#214E34] text-base">₹{totalAmount}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-2 gap-2 pt-2">
                <Link
                  href="/cart"
                  onClick={closeDrawer}
                  className="w-full py-2.5 text-center text-xs font-semibold border border-[#214E34] text-[#214E34] rounded-md hover:bg-[#DDE7D9]/40 transition-colors"
                >
                  View Full Cart
                </Link>
                <Link
                  href="/checkout"
                  onClick={closeDrawer}
                  className="w-full py-2.5 text-center text-xs font-semibold bg-[#214E34] text-white rounded-md hover:bg-[#163A28] flex items-center justify-center gap-1.5 shadow-sm transition-colors"
                >
                  Checkout <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
