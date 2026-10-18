'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import {
  Search,
  ShoppingBag,
  Heart,
  User as UserIcon,
  Menu,
  X,
  ChevronDown,
  Sparkles,
  ShieldCheck,
  Compass,
  ArrowRight,
  Flame,
  Wind,
  Mountain,
  ChevronRight
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { fetchFromAPI, IProduct } from '../lib/api';

export const Header: React.FC = () => {
  const router = useRouter();
  const { itemCount, openDrawer } = useCart();
  const { user, isAuthenticated, isAdmin, wishlist, logout } = useAuth();

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeMegaMenu, setActiveMegaMenu] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<IProduct[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [showSearchDropdown, setShowSearchDropdown] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const megaMenuTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Debounced search
  useEffect(() => {
    if (!searchQuery.trim() || searchQuery.length < 2) {
      setSearchResults([]);
      setShowSearchDropdown(false);
      return;
    }

    const timer = setTimeout(async () => {
      setIsSearching(true);
      try {
        const res = await fetchFromAPI(`/products?search=${encodeURIComponent(searchQuery)}&limit=5`);
        if (res.success && res.data) {
          setSearchResults(res.data);
          setShowSearchDropdown(true);
        }
      } catch (err) {
        console.error('Search error', err);
      } finally {
        setIsSearching(false);
      }
    }, 250);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  // Click outside search dismiss
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowSearchDropdown(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setShowSearchDropdown(false);
      router.push(`/shop?search=${encodeURIComponent(searchQuery)}`);
    }
  };

  const handleMouseEnter = (menuName: string) => {
    if (megaMenuTimeoutRef.current) clearTimeout(megaMenuTimeoutRef.current);
    setActiveMegaMenu(menuName);
  };

  const handleMouseLeave = () => {
    megaMenuTimeoutRef.current = setTimeout(() => {
      setActiveMegaMenu(null);
    }, 200);
  };

  return (
    <header className="sticky top-0 z-40 bg-[#FAF8F1] border-b border-[#E5E8E0]">
      {/* 1. Announcement Bar */}
      <div className="bg-[#163A28] text-white text-[11px] sm:text-xs py-2 px-4 font-medium tracking-wide">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2 mx-auto sm:mx-0 text-center">
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#B86F4B] animate-pulse"></span>
            <span>Complimentary Pan-India Express Delivery on Orders Above ₹999</span>
            <span className="hidden md:inline text-white/40">|</span>
            <span className="hidden md:inline text-[#DDE7D9]">100% Certified Classical Ayurvedic Formulations</span>
          </div>
          <div className="hidden sm:flex items-center gap-5 text-[11px] text-[#DDE7D9]">
            <Link href="/track-order" className="hover:text-white transition-colors">
              Track Order
            </Link>
            <Link href="/education" className="hover:text-white transition-colors">
              Prakriti & Dosha Science
            </Link>
          </div>
        </div>
      </div>

      {/* 2. Main Header Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-4 flex items-center justify-between gap-4">
        {/* Mobile Hamburger Button */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="lg:hidden p-1.5 text-[#214E34] hover:bg-[#DDE7D9]/50 rounded-md transition-colors"
          aria-label="Toggle mobile menu"
        >
          {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>

        {/* Brand Logo - Inspired by Luxury Heritage Brands */}
        <Link href="/" className="flex flex-col items-start select-none">
          <span className="text-xl sm:text-2xl font-serif-brand font-bold tracking-[0.08em] text-[#214E34]">
            AXMIN PRANA
          </span>
          <span className="text-[9px] tracking-[0.28em] uppercase text-[#B86F4B] font-semibold -mt-1">
            Vedic Heritage & Wellness
          </span>
        </Link>

        {/* Live Search Bar - Desktop */}
        <div ref={searchRef} className="hidden md:flex flex-1 max-w-md mx-6 relative">
          <form onSubmit={handleSearchSubmit} className="w-full relative">
            <input
              type="text"
              placeholder="Search formulations, herbs (e.g. Ashwagandha, Triphala, Saffron)..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              onFocus={() => {
                if (searchResults.length > 0) setShowSearchDropdown(true);
              }}
              className="w-full pl-9 pr-4 py-2 text-xs rounded-full border border-[#E5E8E0] bg-white focus:bg-[#FAF8F1] focus:border-[#214E34] transition-all text-[#202820] placeholder-[#687168]"
            />
            <Search className="absolute left-3 top-2.5 w-4 h-4 text-[#687168]" />
          </form>

          {/* Search Dropdown Preview */}
          {showSearchDropdown && (
            <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-lg border border-[#E5E8E0] shadow-xl overflow-hidden z-50">
              <div className="p-2 border-b border-[#E5E8E0] bg-[#FAF8F1] flex justify-between items-center text-[11px] text-[#687168]">
                <span>Matching Formulations</span>
                {isSearching && <span className="animate-pulse">Searching...</span>}
              </div>
              <div className="max-h-72 overflow-y-auto divide-y divide-[#E5E8E0]">
                {searchResults.length === 0 ? (
                  <div className="p-4 text-center text-xs text-[#687168]">
                    No formulations found for &quot;{searchQuery}&quot;
                  </div>
                ) : (
                  searchResults.map(item => (
                    <Link
                      key={item._id}
                      href={`/product/${item.slug}`}
                      onClick={() => setShowSearchDropdown(false)}
                      className="flex items-center gap-3 p-2.5 hover:bg-[#FAF8F1] transition-colors"
                    >
                      <div className="relative w-10 h-10 rounded overflow-hidden bg-[#FAF8F1] shrink-0 border border-[#E5E8E0]">
                        <Image
                          src={item.thumbnail || item.images[0]}
                          alt={item.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-semibold text-[#202820] truncate">{item.name}</p>
                        <p className="text-[10px] text-[#687168]">{item.packSize}</p>
                      </div>
                      <span className="text-xs font-bold text-[#214E34] shrink-0">
                        ₹{item.salePrice || item.price}
                      </span>
                    </Link>
                  ))
                )}
              </div>
              <div className="p-2 bg-[#FAF8F1] border-t border-[#E5E8E0] text-center">
                <Link
                  href={`/shop?search=${encodeURIComponent(searchQuery)}`}
                  onClick={() => setShowSearchDropdown(false)}
                  className="text-xs font-semibold text-[#214E34] hover:text-[#B86F4B] transition-colors"
                >
                  View all results &rarr;
                </Link>
              </div>
            </div>
          )}
        </div>

        {/* Right Action Icons */}
        <div className="flex items-center gap-3 sm:gap-4">
          {/* Wishlist */}
          <Link
            href="/account"
            className="relative p-2 text-[#214E34] hover:text-[#B86F4B] transition-colors"
            title="Wishlist"
          >
            <Heart className="w-5 h-5" />
            {wishlist.length > 0 && (
              <span className="absolute top-1 right-1 w-4 h-4 bg-[#B86F4B] text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                {wishlist.length}
              </span>
            )}
          </Link>

          {/* Account */}
          {isAuthenticated ? (
            <div className="relative group">
              <Link
                href="/account"
                className="flex items-center gap-1.5 p-1.5 text-xs font-medium text-[#214E34] hover:text-[#B86F4B] transition-colors rounded-md"
              >
                <UserIcon className="w-5 h-5" />
                <span className="hidden sm:inline font-semibold">{user?.name?.split(' ')[0]}</span>
                <ChevronDown className="w-3.5 h-3.5 hidden sm:inline" />
              </Link>
              <div className="absolute right-0 top-full mt-1 w-48 bg-white border border-[#E5E8E0] rounded-lg shadow-lg py-1 hidden group-hover:block z-50">
                <Link href="/account" className="block px-4 py-2 text-xs text-[#202820] hover:bg-[#FAF8F1]">
                  My Account & Orders
                </Link>
                {isAdmin && (
                  <Link href="/admin" className="block px-4 py-2 text-xs text-[#214E34] font-bold hover:bg-[#DDE7D9]/50">
                    Admin Console
                  </Link>
                )}
                <button
                  onClick={logout}
                  className="w-full text-left px-4 py-2 text-xs text-red-600 hover:bg-[#FAF8F1]"
                >
                  Sign Out
                </button>
              </div>
            </div>
          ) : (
            <Link
              href="/account/login"
              className="flex items-center gap-1.5 p-1.5 text-xs font-semibold text-[#214E34] hover:text-[#B86F4B] transition-colors"
            >
              <UserIcon className="w-5 h-5" />
              <span className="hidden sm:inline">Sign In</span>
            </Link>
          )}

          {/* Cart Trigger */}
          <button
            onClick={openDrawer}
            className="flex items-center gap-2 px-3.5 py-1.5 bg-[#214E34] hover:bg-[#163A28] text-white rounded-full transition-all shadow-xs"
            aria-label="Open shopping basket"
          >
            <ShoppingBag className="w-4 h-4" />
            <span className="text-xs font-bold">{itemCount}</span>
          </button>
        </div>
      </div>

      {/* 3. Luxury Category Mega-Menu Navigation (Desktop) */}
      <nav className="hidden lg:block bg-white border-t border-[#E5E8E0] py-2.5 px-4 relative">
        <div className="max-w-7xl mx-auto flex items-center justify-center gap-8 text-xs font-semibold text-[#202820] tracking-wide uppercase">
          <Link href="/shop" className="hover:text-[#214E34] transition-colors">
            Shop All
          </Link>

          {/* Skin Care Dropdown */}
          <div
            className="relative"
            onMouseEnter={() => handleMouseEnter('skincare')}
            onMouseLeave={handleMouseLeave}
          >
            <Link
              href="/shop?category=Skin%20Radiance%20%26%20Kanti"
              className="hover:text-[#214E34] flex items-center gap-1 transition-colors py-1"
            >
              Skin Care <ChevronDown className="w-3 h-3 text-[#687168]" />
            </Link>
            {activeMegaMenu === 'skincare' && (
              <div className="absolute left-1/2 -translate-x-1/2 top-full mt-2 w-72 bg-white rounded-xl border border-[#E5E8E0] shadow-xl p-4 z-50 text-left normal-case">
                <span className="text-[10px] font-bold text-[#B86F4B] uppercase tracking-wider block mb-2">
                  Kanti Vardhaka Rituals
                </span>
                <div className="space-y-2 text-xs">
                  <Link href="/product/kumkumadi-radiant-tailam" className="block text-[#202820] hover:text-[#214E34] font-medium">
                    Kumkumadi Miraculous Radiant Tailam
                  </Link>
                  <Link href="/shop?category=Skin%20Radiance%20%26%20Kanti" className="block text-[#687168] hover:text-[#214E34]">
                    Red Sandalwood & Saffron Elixirs
                  </Link>
                  <Link href="/shop?category=Skin%20Radiance%20%26%20Kanti" className="block text-[#687168] hover:text-[#214E34]">
                    Pure Rose Floral Water (Gulab Jal)
                  </Link>
                </div>
              </div>
            )}
          </div>

          {/* Hair Care Dropdown */}
          <div
            className="relative"
            onMouseEnter={() => handleMouseEnter('haircare')}
            onMouseLeave={handleMouseLeave}
          >
            <Link
              href="/shop?category=Hair%20Therapy%20%26%20Keshya"
              className="hover:text-[#214E34] flex items-center gap-1 transition-colors py-1"
            >
              Hair Care <ChevronDown className="w-3 h-3 text-[#687168]" />
            </Link>
            {activeMegaMenu === 'haircare' && (
              <div className="absolute left-1/2 -translate-x-1/2 top-full mt-2 w-72 bg-white rounded-xl border border-[#E5E8E0] shadow-xl p-4 z-50 text-left normal-case">
                <span className="text-[10px] font-bold text-[#B86F4B] uppercase tracking-wider block mb-2">
                  Keshya Scalp Therapy
                </span>
                <div className="space-y-2 text-xs">
                  <Link href="/product/bringadi-hair-therapy-tailam" className="block text-[#202820] hover:text-[#214E34] font-medium">
                    Bringadi Intensive Scalp & Hair Tailam
                  </Link>
                  <Link href="/shop?category=Hair%20Therapy%20%26%20Keshya" className="block text-[#687168] hover:text-[#214E34]">
                    Amla & Reetha Herbal Cleansers
                  </Link>
                </div>
              </div>
            )}
          </div>

          {/* Ayurvedic Medicines & Rasayanas */}
          <div
            className="relative"
            onMouseEnter={() => handleMouseEnter('medicines')}
            onMouseLeave={handleMouseLeave}
          >
            <Link
              href="/shop?category=Immunity%20%26%20Rasayana"
              className="hover:text-[#214E34] flex items-center gap-1 transition-colors py-1"
            >
              Ayurvedic Medicines <ChevronDown className="w-3 h-3 text-[#687168]" />
            </Link>
            {activeMegaMenu === 'medicines' && (
              <div className="absolute left-1/2 -translate-x-1/2 top-full mt-2 w-80 bg-white rounded-xl border border-[#E5E8E0] shadow-xl p-4 z-50 text-left normal-case">
                <span className="text-[10px] font-bold text-[#B86F4B] uppercase tracking-wider block mb-2">
                  Classical Rasayanas & Churnas
                </span>
                <div className="space-y-2 text-xs">
                  <Link href="/product/chyawanprash-supreme-awaleha" className="block text-[#202820] hover:text-[#214E34] font-medium">
                    Chyawanprash Supreme (A2 Gir Cow Ghee)
                  </Link>
                  <Link href="/product/ashwagandha-supreme-ksm66" className="block text-[#202820] hover:text-[#214E34] font-medium">
                    Ashwagandha KSM-66® Organic Capsules
                  </Link>
                  <Link href="/product/triphala-bio-active-churna" className="block text-[#202820] hover:text-[#214E34] font-medium">
                    Triphala Bio-Active Gut Cleanse Churna
                  </Link>
                  <Link href="/product/brahmi-shankhpushpi-elixir" className="block text-[#202820] hover:text-[#214E34] font-medium">
                    Brahmi & Shankhpushpi Cognitive Elixir
                  </Link>
                  <Link href="/product/organic-guduchi-giloy-drops" className="block text-[#202820] hover:text-[#214E34] font-medium">
                    Organic Giloy (Guduchi) Amrita Drops
                  </Link>
                </div>
              </div>
            )}
          </div>

          {/* Herbal Oils */}
          <Link href="/shop?format=Oil" className="hover:text-[#214E34] transition-colors">
            Herbal Oils
          </Link>

          {/* By Concern / Wellness Goals */}
          <div
            className="relative"
            onMouseEnter={() => handleMouseEnter('concern')}
            onMouseLeave={handleMouseLeave}
          >
            <span className="hover:text-[#214E34] flex items-center gap-1 cursor-pointer transition-colors py-1">
              Shop by Concern <ChevronDown className="w-3 h-3 text-[#687168]" />
            </span>
            {activeMegaMenu === 'concern' && (
              <div className="absolute left-1/2 -translate-x-1/2 top-full mt-2 w-72 bg-white rounded-xl border border-[#E5E8E0] shadow-xl p-4 z-50 text-left normal-case">
                <span className="text-[10px] font-bold text-[#B86F4B] uppercase tracking-wider block mb-2">
                  Targeted Health Needs
                </span>
                <div className="space-y-2 text-xs">
                  <Link href="/shop?category=Stress%20%26%20Cognitive%20Health" className="block text-[#202820] hover:text-[#214E34]">
                    Stress, Anxiety & Restful Sleep
                  </Link>
                  <Link href="/shop?category=Digestive%20%26%20Gut%20Health" className="block text-[#202820] hover:text-[#214E34]">
                    Gut Health & Bio-Detox (Triphala)
                  </Link>
                  <Link href="/shop?category=Skin%20Radiance%20%26%20Kanti" className="block text-[#202820] hover:text-[#214E34]">
                    Skin Glow & Hyperpigmentation
                  </Link>
                  <Link href="/shop?category=Joint%20Care%20%26%20Sandhi" className="block text-[#202820] hover:text-[#214E34]">
                    Joint Mobility & Back Relief
                  </Link>
                </div>
              </div>
            )}
          </div>

          {/* Prakriti & Dosha Science */}
          <Link href="/education" className="flex items-center gap-1 text-[#B86F4B] font-bold hover:underline transition-colors normal-case">
            <Compass className="w-3.5 h-3.5" /> Dosha Guide
          </Link>
        </div>
      </nav>

      {/* 4. Mobile Menu Drawer */}
      {isMobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-50 bg-black/50" onClick={() => setIsMobileMenuOpen(false)}>
          <div
            className="w-4/5 max-w-sm h-full bg-[#FAF8F1] p-5 shadow-2xl flex flex-col justify-between overflow-y-auto"
            onClick={e => e.stopPropagation()}
          >
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-[#E5E8E0]">
                <span className="font-serif-brand font-bold text-lg text-[#214E34]">
                  AXMIN PRANA
                </span>
                <button onClick={() => setIsMobileMenuOpen(false)} aria-label="Close menu">
                  <X className="w-6 h-6 text-[#202820]" />
                </button>
              </div>

              {/* Mobile Search */}
              <form onSubmit={handleSearchSubmit} className="mt-4 relative">
                <input
                  type="text"
                  placeholder="Search herbs & formulas..."
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 text-xs rounded-md border border-[#E5E8E0] bg-white text-[#202820]"
                />
                <Search className="absolute left-3 top-2.5 w-4 h-4 text-[#687168]" />
              </form>

              {/* Mobile Links */}
              <div className="mt-6 space-y-3 text-sm font-medium text-[#202820]">
                <Link
                  href="/shop"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block py-1.5 hover:text-[#214E34] font-bold"
                >
                  Shop All Formulations
                </Link>
                <Link
                  href="/shop?category=Skin%20Radiance%20%26%20Kanti"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block py-1.5 hover:text-[#214E34]"
                >
                  Skin Care (Kumkumadi)
                </Link>
                <Link
                  href="/shop?category=Hair%20Therapy%20%26%20Keshya"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block py-1.5 hover:text-[#214E34]"
                >
                  Hair Therapy (Bringadi)
                </Link>
                <Link
                  href="/shop?category=Immunity%20%26%20Rasayana"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block py-1.5 hover:text-[#214E34]"
                >
                  Immunity & Rasayanas (Chyawanprash)
                </Link>
                <Link
                  href="/shop?category=Stress%20%26%20Cognitive%20Health"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block py-1.5 hover:text-[#214E34]"
                >
                  Stress & Sleep (Ashwagandha)
                </Link>
                <Link
                  href="/shop?category=Digestive%20%26%20Gut%20Health"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block py-1.5 hover:text-[#214E34]"
                >
                  Gut Health & Detox (Triphala)
                </Link>
                <Link
                  href="/education"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block py-1.5 text-[#B86F4B] font-semibold"
                >
                  Dosha & Prakriti Guide
                </Link>
                <Link
                  href="/articles"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block py-1.5 hover:text-[#214E34]"
                >
                  Ayurveda Journal
                </Link>
                <Link
                  href="/about"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block py-1.5 hover:text-[#214E34]"
                >
                  Our Vedic Heritage
                </Link>
                <Link
                  href="/track-order"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block py-1.5 text-[#214E34]"
                >
                  Track Order
                </Link>
                {isAdmin && (
                  <Link
                    href="/admin"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block py-1.5 text-[#214E34] font-bold"
                  >
                    Admin Console
                  </Link>
                )}
              </div>
            </div>

            {/* Mobile Footer Auth */}
            <div className="pt-6 border-t border-[#E5E8E0]">
              {isAuthenticated ? (
                <div className="space-y-2">
                  <p className="text-xs text-[#687168]">Signed in as {user?.name}</p>
                  <Link
                    href="/account"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block w-full py-2 text-center text-xs font-semibold bg-[#214E34] text-white rounded-md"
                  >
                    My Account
                  </Link>
                  <button
                    onClick={() => {
                      logout();
                      setIsMobileMenuOpen(false);
                    }}
                    className="block w-full py-1.5 text-center text-xs text-red-600"
                  >
                    Sign Out
                  </button>
                </div>
              ) : (
                <Link
                  href="/account/login"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block w-full py-2.5 text-center text-xs font-semibold bg-[#214E34] text-white rounded-md"
                >
                  Sign In / Create Account
                </Link>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
