'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, ShoppingCart, Heart, User, Menu, X } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { useMobileMenu } from '../context/MobileMenuContext';

export const MobileBottomBar: React.FC = () => {
  const pathname = usePathname();
  const { isAuthenticated, isAdmin, wishlist } = useAuth();
  const { itemCount, openDrawer } = useCart();
  const { isMobileMenuOpen, toggleMobileMenu } = useMobileMenu();

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-[#EDE8E0] flex items-center justify-around py-2 md:hidden shadow-md safe-area-inset-bottom">
      {/* 1. LEFT: Menu Drawer Toggle Button */}
      <button
        onClick={toggleMobileMenu}
        className={`flex flex-col items-center gap-0.5 text-[10px] font-medium transition-colors cursor-pointer ${
          isMobileMenuOpen ? 'text-[#1F4E34] font-bold' : 'text-[#666] hover:text-[#1F4E34]'
        }`}
        aria-label="Toggle navigation menu"
        aria-expanded={isMobileMenuOpen}
      >
        <div className={`p-0.5 rounded-md transition-colors ${isMobileMenuOpen ? 'bg-[#1F4E34]/10 text-[#1F4E34]' : ''}`}>
          {isMobileMenuOpen ? (
            <X className="w-5 h-5 text-[#1F4E34]" />
          ) : (
            <Menu className="w-5 h-5" />
          )}
        </div>
        <span className={isMobileMenuOpen ? 'text-[#1F4E34] font-bold' : ''}>Menu</span>
      </button>

      {/* 2. Wishlist */}
      <Link
        href="/wishlist"
        className={`flex flex-col items-center gap-0.5 text-[10px] font-medium transition-colors relative ${
          pathname === '/wishlist' && !isMobileMenuOpen ? 'text-[#1F4E34] font-bold' : 'text-[#666]'
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

      {/* 3. CENTER: Home */}
      <Link
        href="/"
        className={`flex flex-col items-center gap-0.5 text-[10px] font-medium transition-colors ${
          pathname === '/' && !isMobileMenuOpen ? 'text-[#1F4E34] font-bold' : 'text-[#666]'
        }`}
      >
        <div className={`p-0.5 rounded-md transition-colors ${pathname === '/' && !isMobileMenuOpen ? 'text-[#1F4E34]' : ''}`}>
          <Home className="w-5 h-5" />
        </div>
        <span className={pathname === '/' && !isMobileMenuOpen ? 'text-[#1F4E34] font-bold' : ''}>Home</span>
      </Link>

      {/* 4. Cart Drawer Trigger */}
      <button
        onClick={openDrawer}
        className="flex flex-col items-center gap-0.5 text-[10px] font-medium text-[#666] hover:text-[#1F4E34] relative cursor-pointer"
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

      {/* 5. Profile */}
      <Link
        href={isAuthenticated ? (isAdmin ? '/admin' : '/account') : '/login'}
        className={`flex flex-col items-center gap-0.5 text-[10px] font-medium transition-colors ${
          (pathname.startsWith('/admin') || pathname.startsWith('/account') || pathname.startsWith('/login')) && !isMobileMenuOpen
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
