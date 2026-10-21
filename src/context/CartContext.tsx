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
  purgeStaleProduct: (productId: string) => void;
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

  // Load from local storage and auto-heal stale/reseeded products against DB
  useEffect(() => {
    let parsed: ICartItem[] = [];
    try {
      const saved = localStorage.getItem('axmin_cart');
      if (saved) {
        parsed = JSON.parse(saved);
        setItems(parsed);
      }
      const savedCoupon = localStorage.getItem('axmin_coupon');
      if (savedCoupon) {
        setCouponCode(savedCoupon);
      }
    } catch (e) {
      console.error('Failed to parse cart from storage', e);
    }

    // Auto-heal cart items against active catalog (fixes old IDs like 6ad4eb0b461987e2badbe91a)
    const healCartItems = async () => {
      try {
        const res = await fetchFromAPI('/products?limit=100');
        if (res.success && Array.isArray(res.data)) {
          const activeProducts: IProduct[] = res.data;
          const mapById = new Map<string, IProduct>(activeProducts.map(p => [p._id, p]));
          const mapBySlug = new Map<string, IProduct>(activeProducts.map(p => [p.slug, p]));

          setItems(prev => {
            if (!prev || prev.length === 0) return prev;
            let modified = false;
            const healed: ICartItem[] = [];

            for (const item of prev) {
              const currentById = mapById.get(item.product?._id);
              if (currentById) {
                // Keep with latest product details
                healed.push({
                  ...item,
                  product: currentById
                });
              } else {
                // If ID is stale (e.g. from previous database seed), match by slug
                const currentBySlug = item.product?.slug ? mapBySlug.get(item.product.slug) : undefined;
                if (currentBySlug) {
                  healed.push({
                    ...item,
                    product: currentBySlug,
                    price: currentBySlug.salePrice && currentBySlug.salePrice > 0 ? currentBySlug.salePrice : currentBySlug.price
                  });
                  modified = true;
                } else {
                  // Completely removed product
                  modified = true;
                }
              }
            }

            if (modified) {
              localStorage.setItem('axmin_cart', JSON.stringify(healed));
            }
            return healed;
          });
        }
      } catch (e) {
        // Non-fatal if offline
      }
    };

    healCartItems();
  }, []);

  // Save to local storage
  useEffect(() => {
    try {
      localStorage.setItem('axmin_cart', JSON.stringify(items));
    } catch (e) {
      console.error('Failed to save cart to storage', e);
    }
  }, [items]);

  const purgeStaleProduct = (productId: string) => {
    setItems(prev => {
      const filtered = prev.filter(i => i.product._id !== productId);
      try {
        localStorage.setItem('axmin_cart', JSON.stringify(filtered));
      } catch (e) {}
      return filtered;
    });
  };

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
  const taxAmount = 0;
  const shippingFee = 0;
  const totalAmount = taxableAmount;
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
        purgeStaleProduct,
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
