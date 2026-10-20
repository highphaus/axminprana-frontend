'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Store, ShoppingCart, Heart, User } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

export const MobileBottomBar: React.FC = () => {
  const pathname = usePathname();
  const { isAuthenticated, isAdmin, wishlist } = useAuth();
  const { itemCount, openDrawer } = useCart();

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-[#EDE8E0] flex items-center justify-around py-2.5 md:hidden shadow-md">
      <Link
        href="/"
        className={`flex flex-col items-center gap-0.5 text-[10px] font-medium transition-colors ${
          pathname === '/' ? 'text-[#1F4E34] font-bold' : 'text-[#666]'
        }`}
      >
        <Home className="w-5 h-5" />
        <span>Home</span>
      </Link>

      <Link
        href="/shop"
        className={`flex flex-col items-center gap-0.5 text-[10px] font-medium transition-colors ${
          pathname === '/shop' ? 'text-[#1F4E34] font-bold' : 'text-[#666]'
        }`}
      >
        <Store className="w-5 h-5" />
        <span>Shop</span>
      </Link>

      {/* Cart Drawer Trigger */}
      <button
        onClick={openDrawer}
        className="flex flex-col items-center gap-0.5 text-[10px] font-medium text-[#666] relative"
        aria-label="Open Cart"
      >
        <div className="relative">
          <ShoppingCart className="w-5 h-5" />
          {itemCount > 0 && (
            <span className="absolute -top-1.5 -right-2 min-w-[15px] h-[15px] bg-[#1F4E34] text-white text-[9px] font-bold rounded-full flex items-center justify-center px-0.5">
              {itemCount}
            </span>
          )}
        </div>
        <span>Cart</span>
      </button>

      <Link
        href="/wishlist"
        className={`flex flex-col items-center gap-0.5 text-[10px] font-medium transition-colors relative ${
          pathname === '/wishlist' ? 'text-[#1F4E34] font-bold' : 'text-[#666]'
        }`}
      >
        <div className="relative">
          <Heart className="w-5 h-5" />
          {wishlist.length > 0 && (
            <span className="absolute -top-1.5 -right-2 min-w-[15px] h-[15px] bg-[#B03A6A] text-white text-[9px] font-bold rounded-full flex items-center justify-center px-0.5">
              {wishlist.length}
            </span>
          )}
        </div>
        <span>Wishlist</span>
      </Link>

      <Link
        href={isAuthenticated ? (isAdmin ? '/admin' : '/account') : '/login'}
        className={`flex flex-col items-center gap-0.5 text-[10px] font-medium transition-colors ${
          pathname.startsWith('/admin') || pathname.startsWith('/account') || pathname.startsWith('/login')
            ? 'text-[#1F4E34] font-bold'
            : 'text-[#666]'
        }`}
      >
        <User className="w-5 h-5" />
        <span>{isAuthenticated && isAdmin ? 'Admin' : 'Profile'}</span>
      </Link>
    </div>
  );
};
