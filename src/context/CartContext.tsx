'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { IProduct, fetchFromAPI } from '../lib/api';

export interface ICartItem {
  product: IProduct;
  quantity: number;
  packSize: string;
  price: number;
}

interface CartContextType {
  items: ICartItem[];
  itemCount: number;
  subtotal: number;
  discountAmount: number;
  couponCode: string | null;
  taxAmount: number;
  shippingFee: number;
  totalAmount: number;
  isDrawerOpen: boolean;
  addToCart: (product: IProduct, quantity?: number, packSize?: string, price?: number) => void;
  removeFromCart: (productId: string, packSize: string) => void;
  updateQuantity: (productId: string, packSize: string, delta: number) => void;
  clearCart: () => void;
  applyCoupon: (code: string) => Promise<{ success: boolean; message?: string }>;
  removeCoupon: () => void;
  openDrawer: () => void;
  closeDrawer: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<ICartItem[]>([]);
  const [couponCode, setCouponCode] = useState<string | null>(null);
  const [discountAmount, setDiscountAmount] = useState<number>(0);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  // Load from local storage
  useEffect(() => {
    try {
      const saved = localStorage.getItem('axmin_cart');
      if (saved) {
        setItems(JSON.parse(saved));
      }
      const savedCoupon = localStorage.getItem('axmin_coupon');
      if (savedCoupon) {
        setCouponCode(savedCoupon);
      }
    } catch (e) {
      console.error('Failed to parse cart from storage', e);
    }
  }, []);

  // Save to local storage
  useEffect(() => {
    try {
      localStorage.setItem('axmin_cart', JSON.stringify(items));
    } catch (e) {
      console.error('Failed to save cart to storage', e);
    }
  }, [items]);

  const addToCart = (product: IProduct, quantity = 1, packSize?: string, price?: number) => {
    const selectedPackSize = packSize || product.packSize;
    const unitPrice = price || (product.salePrice && product.salePrice > 0 ? product.salePrice : product.price);

    setItems(prev => {
      const existingIndex = prev.findIndex(
        i => i.product._id === product._id && i.packSize === selectedPackSize
      );

      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex].quantity += quantity;
        return updated;
      } else {
        return [...prev, { product, quantity, packSize: selectedPackSize, price: unitPrice }];
      }
    });

    setIsDrawerOpen(true);
  };

  const removeFromCart = (productId: string, packSize: string) => {
    setItems(prev => prev.filter(i => !(i.product._id === productId && i.packSize === packSize)));
  };

  const updateQuantity = (productId: string, packSize: string, delta: number) => {
    setItems(prev =>
      prev
        .map(item => {
          if (item.product._id === productId && item.packSize === packSize) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as ICartItem[]
    );
  };

  const clearCart = () => {
    setItems([]);
    setCouponCode(null);
    setDiscountAmount(0);
    localStorage.removeItem('axmin_cart');
    localStorage.removeItem('axmin_coupon');
  };

  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  // Apply Coupon
  const applyCoupon = async (code: string) => {
    try {
      const res = await fetchFromAPI('/coupons/validate', {
        method: 'POST',
        body: JSON.stringify({ code, cartTotal: subtotal }),
      });

      if (res.success) {
        setCouponCode(res.data.code);
        setDiscountAmount(res.data.calculatedDiscount);
        localStorage.setItem('axmin_coupon', res.data.code);
        return { success: true };
      } else {
        return { success: false, message: res.message || 'Invalid coupon' };
      }
    } catch (err: any) {
      return { success: false, message: err.message || 'Failed to apply coupon' };
    }
  };

  const removeCoupon = () => {
    setCouponCode(null);
    setDiscountAmount(0);
    localStorage.removeItem('axmin_coupon');
  };

  const taxableAmount = Math.max(0, subtotal - discountAmount);
  // Indian Ayurveda GST at 5%
  const taxAmount = Math.round(taxableAmount * 0.05);
  // Free shipping over ₹999
  const shippingFee = subtotal > 0 && taxableAmount >= 999 ? 0 : subtotal > 0 ? 80 : 0;
  const totalAmount = taxableAmount + taxAmount + shippingFee;
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        items,
        itemCount,
        subtotal,
        discountAmount,
        couponCode,
        taxAmount,
        shippingFee,
        totalAmount,
        isDrawerOpen,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        applyCoupon,
        removeCoupon,
        openDrawer: () => setIsDrawerOpen(true),
        closeDrawer: () => setIsDrawerOpen(false),
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart must be used within CartProvider');
  return context;
};
