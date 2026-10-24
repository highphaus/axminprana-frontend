'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import {
  Search,
  ShoppingCart,
  Heart,
  User as UserIcon,
  Menu,
  X,
  ChevronDown,
  Sparkles,
  ArrowRight,
  Phone,
  Building2,
  ChevronRight,
  MapPin,
  Truck,
  ExternalLink
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useQuiz } from '../context/QuizContext';
import { fetchFromAPI, IProduct } from '../lib/api';

export const Header: React.FC = () => {
  const router = useRouter();
  const { itemCount, subtotal, openDrawer } = useCart();
  const { user, isAuthenticated, isAdmin, wishlist, logout } = useAuth();
  const { openQuiz } = useQuiz();

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [mobileExpandedSection, setMobileExpandedSection] = useState<string | null>(null);
  const [activeMegaMenu, setActiveMegaMenu] = useState<string | null>(null);

  // Search state
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<IProduct[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [showSearchDropdown, setShowSearchDropdown] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const megaMenuTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Address popover state
  const [showAddressDropdown, setShowAddressDropdown] = useState(false);
  const addressRef = useRef<HTMLDivElement>(null);

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
        const res = await fetchFromAPI(`/products?search=${encodeURIComponent(searchQuery)}&limit=6`);
        if (res.success && res.data) {
          setSearchResults(res.data);
          setShowSearchDropdown(true);
        }
      } catch (err) {
        console.error('Search error', err);
      } finally {
        setIsSearching(false);
      }
    }, 200);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  // Click outside search & address dismiss
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowSearchDropdown(false);
      }
      if (addressRef.current && !addressRef.current.contains(event.target as Node)) {
        setShowAddressDropdown(false);
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
    }, 180);
  };

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-[#EDE8E0]">
      {/* MAIN HEADER ROW (Unified MNC Standard: Logo | Embedded Search | Actions) */}
      <div className="bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5">
          <div className="flex items-center justify-between gap-4 lg:gap-8">
            
            {/* LEFT: Mobile Menu Toggle + MNC Brand Logo + Deliver To Location */}
            <div className="flex items-center gap-3 shrink-0">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="lg:hidden p-2 -ml-2 text-[#241A14] hover:bg-[#F5F2EC] rounded-lg transition-colors"
                aria-label="Toggle navigation menu"
              >
                {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>

              {/* Luxury Royal Ayurvedic Logo Lockup */}
              <Link href="/" className="flex items-center gap-3 group select-none">
                <div className="relative w-10 h-10 sm:w-12 sm:h-12 rounded-full overflow-hidden bg-white border-2 border-[#C59B27]/40 shadow-xs shrink-0 flex items-center justify-center group-hover:border-[#C59B27] group-hover:shadow-md transition-all transform group-hover:scale-105">
                  <Image
                    src="/images/Logo/logo.png"
                    alt="Axmin Prana Ayurveda"
                    width={48}
                    height={48}
                    className="w-full h-full object-contain"
                    priority
                  />
                </div>
                <div className="flex flex-col justify-center">
                  <span className="font-wishlist-heading text-xl sm:text-2xl font-bold text-[#1A1A1A] tracking-tight group-hover:text-[#1F4E34] transition-colors leading-none">
                    Axmin Prana
                  </span>
                </div>
              </Link>

              {/* DESKTOP DELIVER TO (Amazon / Tata 1mg Standard Placement beside Logo) */}
              <div className="hidden lg:flex items-center pl-2">
                <div className="h-8 w-[1px] bg-[#EDE8E0] mr-3" />
                <div className="relative" ref={addressRef}>
                  <button
                    type="button"
                    onClick={() => setShowAddressDropdown(!showAddressDropdown)}
                    className="flex items-center gap-2.5 px-3 py-1.5 rounded-xl hover:bg-[#FAF8F5] border border-transparent hover:border-[#EDE8E0] transition-all text-left group cursor-pointer"
                    aria-label="View Dispensary and Delivery Address"
                    aria-expanded={showAddressDropdown}
                  >
                    <div className="w-7 h-7 rounded-full bg-[#1F4E34]/10 text-[#1F4E34] flex items-center justify-center shrink-0 group-hover:bg-[#1F4E34] group-hover:text-white transition-colors">
                      <MapPin className="w-3.5 h-3.5" />
                    </div>
                    <div className="flex flex-col justify-center">
                      <span className="text-[10px] font-semibold uppercase tracking-wider text-[#777] leading-tight flex items-center gap-1">
                        Deliver to
                        <ChevronDown className={`w-3 h-3 text-[#999] transition-transform ${showAddressDropdown ? 'rotate-180' : ''}`} />
                      </span>
                      <span className="text-xs font-bold text-[#1A1A1A] leading-tight whitespace-nowrap">
                        Kallara, Trivandrum 695608
                      </span>
                    </div>
                  </button>

                  {/* Desktop Popover Card */}
                  {showAddressDropdown && (
                    <div className="absolute left-0 top-full mt-2 w-84 bg-white border border-[#EDE8E0] rounded-2xl shadow-xl p-4 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                      <div className="flex items-start justify-between pb-3 border-b border-[#EDE8E0]">
                        <div className="flex items-center gap-2.5">
                          <div className="w-8 h-8 rounded-full bg-[#1F4E34] text-white flex items-center justify-center shrink-0 shadow-xs">
                            <MapPin className="w-4 h-4 text-[#C59B27]" />
                          </div>
                          <div>
                            <h4 className="text-xs font-bold text-[#1A1A1A] leading-tight">
                              Axmin Prana Dispensary Hub
                            </h4>
                            <span className="text-[10px] text-[#777]">Classical Ayurvedic Pharmacy & Dispatch</span>
                          </div>
                        </div>
                        <button
                          type="button"
                          onClick={() => setShowAddressDropdown(false)}
                          className="p-1 rounded-md text-[#999] hover:text-[#1A1A1A] hover:bg-[#FAF8F5] transition-colors"
                          aria-label="Close address details"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>

                      <div className="py-3.5 space-y-3 text-xs">
                        <div className="flex items-start gap-2.5 text-[#444]">
                          <MapPin className="w-4 h-4 text-[#1F4E34] shrink-0 mt-0.5" />
                          <div className="leading-snug">
                            <p className="font-semibold text-[#1A1A1A]">Registered Dispensary Hub:</p>
                            <p className="text-[#666]">Kallara, Trivandrum, Kerala – 695608, India</p>
                          </div>
                        </div>

                        <div className="flex items-start gap-2.5 text-[#444]">
                          <Truck className="w-4 h-4 text-[#1F4E34] shrink-0 mt-0.5" />
                          <div className="leading-snug">
                            <p className="font-semibold text-[#1A1A1A]">Pan-India Express Delivery:</p>
                            <p className="text-[#666]">Serving all PIN codes across India • Free shipping above ₹499</p>
                          </div>
                        </div>

                        <div className="flex items-start gap-2.5 text-[#444]">
                          <Phone className="w-4 h-4 text-[#1F4E34] shrink-0 mt-0.5" />
                          <div className="leading-snug">
                            <p className="font-semibold text-[#1A1A1A]">Direct Care Helpline:</p>
                            <a href="tel:+917561836584" className="text-[#1F4E34] font-bold hover:underline">
                              +91 75618 36584
                            </a>
                          </div>
                        </div>
                      </div>

                      <div className="pt-3 border-t border-[#EDE8E0] flex items-center justify-between gap-2.5">
                        <a
                          href="https://maps.app.goo.gl/593CoPREJZsqTLRD9"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex-1 py-2 px-3 bg-[#1F4E34] hover:bg-[#163B27] text-white text-xs font-semibold rounded-xl text-center flex items-center justify-center gap-1.5 transition-colors shadow-2xs"
                        >
                          <span>Get Directions</span>
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                        <Link
                          href="/contact"
                          onClick={() => setShowAddressDropdown(false)}
                          className="py-2 px-3.5 bg-[#FAF8F5] hover:bg-[#EDE8E0] text-[#1A1A1A] text-xs font-semibold rounded-xl transition-colors"
                        >
                          Contact Us
                        </Link>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* CENTER: Minimalist Embedded Search Bar */}
            <div className="hidden lg:flex flex-1 max-w-lg mx-auto relative" ref={searchRef}>
              <form onSubmit={handleSearchSubmit} className="relative w-full">
                <div className="relative flex items-center">
                  <input
                    type="text"
                    placeholder="Search classical tailams, herbal churnas, rasayanas..."
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
                    onFocus={() => {
                      if (searchResults.length > 0) setShowSearchDropdown(true);
                    }}
                    className="w-full pl-10 pr-20 py-2.5 text-xs rounded-full border border-[#DCD5C9] bg-[#FAF8F5] focus:bg-white focus:border-[#2C1D11] shadow-none transition-all text-[#1A1A1A] placeholder-[#8C867E] outline-none"
                  />
                  <Search className="absolute left-3.5 w-4 h-4 text-[#8C867E]" />
                  
                  {searchQuery && (
                    <button
                      type="button"
                      onClick={() => setSearchQuery('')}
                      className="absolute right-16 text-[#888] hover:text-black p-1"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  )}

                  <button
                    type="submit"
                    className="absolute right-1 px-3.5 py-1.5 bg-[#1F4E34] hover:bg-[#163B27] text-white text-xs font-medium rounded-full transition-colors"
                  >
                    Search
                  </button>
                </div>
              </form>

              {/* Instant Search Dropdown Modal */}
              {showSearchDropdown && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl border border-[#EDE8E0] shadow-xl overflow-hidden z-50">
                  <div className="p-3 border-b border-[#F0ECE4] bg-[#FAF8F5] flex justify-between items-center text-xs text-[#666]">
                    <span className="font-semibold text-[#1A1A1A]">Matching Formulations</span>
                    {isSearching && <span className="text-[#1F4E34] font-medium">Searching...</span>}
                  </div>
                  <div className="max-h-80 overflow-y-auto divide-y divide-[#F5F2EC]">
                    {searchResults.length === 0 ? (
                      <div className="p-6 text-center text-xs text-[#888]">
                        No formulations found for &quot;{searchQuery}&quot;
                      </div>
                    ) : (
                      searchResults.map(item => (
                        <Link
                          key={item._id}
                          href={`/product/${item.slug}`}
                          onClick={() => setShowSearchDropdown(false)}
                          className="p-3 hover:bg-[#FAF8F5] flex items-center justify-between gap-3 transition-colors group"
                        >
                          <div className="flex items-center gap-3">
                            <div className="relative w-11 h-11 rounded-lg overflow-hidden bg-white shrink-0 border border-[#EDE8E0]">
                              <Image
                                src={item.thumbnail || item.images[0]}
                                alt={item.name}
                                fill
                                className="object-cover"
                              />
                            </div>
                            <div>
                              <h4 className="text-xs font-semibold text-[#1A1A1A] group-hover:text-[#1F4E34] transition-colors line-clamp-1">
                                {item.name}
                              </h4>
                              <span className="text-[10px] text-[#777]">{item.packSize} • {item.category}</span>
                            </div>
                          </div>
                          <div className="text-right shrink-0">
                            <span className="text-xs font-bold text-[#1F4E34]">
                              ₹{item.salePrice || item.price}
                            </span>
                          </div>
                        </Link>
                      ))
                    )}
                  </div>
                  <div className="p-2.5 bg-[#FAF8F5] border-t border-[#EDE8E0] text-center">
                    <Link
                      href={`/shop?search=${encodeURIComponent(searchQuery)}`}
                      onClick={() => setShowSearchDropdown(false)}
                      className="text-xs font-medium text-[#1F4E34] hover:underline inline-flex items-center gap-1"
                    >
                      <span>View all search results</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              )}
            </div>

            {/* RIGHT: Direct Care Helpline & Order Tracking (Balances header symmetrically) */}
            <div className="hidden lg:flex items-center gap-3 shrink-0">
              <a
                href="tel:+917561836584"
                className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[#FAF8F5] hover:bg-[#F5F2EC] border border-[#EDE8E0] text-xs font-semibold text-[#1A1A1A] transition-colors group"
                title="Call Ayurvedic Care Helpline"
              >
                <div className="w-6 h-6 rounded-full bg-[#1F4E34] text-white flex items-center justify-center shrink-0">
                  <Phone className="w-3 h-3 text-[#C59B27]" />
                </div>
                <div className="flex flex-col text-left leading-tight">
                  <span className="text-[9px] uppercase tracking-wider text-[#777] font-semibold">Direct Care</span>
                  <span className="text-[11px] font-bold text-[#1F4E34] group-hover:underline">+91 75618 36584</span>
                </div>
              </a>

              <Link
                href="/track-order"
                className="flex items-center gap-1.5 text-xs font-semibold text-[#444] hover:text-[#1F4E34] transition-colors px-2.5 py-1.5 rounded-lg hover:bg-[#FAF8F5]"
              >
                <Truck className="w-4 h-4 text-[#C59B27]" />
                <span>Track Order</span>
              </Link>
            </div>

            {/* MOBILE RIGHT: Quick Direct Helpline Link */}
            <div className="lg:hidden flex items-center gap-2 shrink-0">
              <a
                href="tel:+917561836584"
                className="p-1.5 px-2.5 text-[#1F4E34] hover:bg-[#FAF8F5] rounded-lg transition-colors flex items-center gap-1 border border-[#EDE8E0] bg-[#FAF8F5]"
                title="Call Helpline"
                aria-label="Call Helpline"
              >
                <Phone className="w-3.5 h-3.5 text-[#1F4E34]" />
                <span className="text-[11px] font-bold text-[#1F4E34]">Call</span>
              </a>
            </div>
          </div>

          {/* MOBILE SEARCH BAR (Compact on mobile) */}
          <div className="lg:hidden mt-2.5 relative" ref={searchRef}>
            <form onSubmit={handleSearchSubmit} className="relative w-full">
              <input
                type="text"
                placeholder="Search oils, churnas, rasayanas..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-8 py-2 text-xs rounded-full border border-[#DCD5C9] bg-[#FAF8F5] focus:bg-white focus:border-[#2C1D11] outline-none text-[#1A1A1A] placeholder-[#8C867E]"
              />
              <Search className="absolute left-3 top-2.5 w-3.5 h-3.5 text-[#8C867E]" />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-2 text-[#888] hover:text-black"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </form>
          </div>

          {/* MOBILE DEDICATED LOCATION STRIP (Amazon / Tata 1mg Standard) */}
          <div className="lg:hidden bg-[#FAF8F5] border-t border-b border-[#EDE8E0] -mx-4 sm:-mx-6 px-4 sm:px-6 py-2 mt-2.5">
            <button
              type="button"
              onClick={() => setShowAddressDropdown(true)}
              className="flex items-center gap-2 w-full text-left cursor-pointer"
            >
              <MapPin className="w-3.5 h-3.5 text-[#1F4E34] shrink-0" />
              <span className="text-[#777] text-[11px]">Deliver to:</span>
              <span className="font-bold text-[#1A1A1A] text-xs truncate">
                Kallara, Trivandrum – 695608
              </span>
              <ChevronDown className="w-3.5 h-3.5 text-[#888] shrink-0 ml-auto" />
            </button>
          </div>

          {/* Mobile Address Modal (Opens when mobile delivery strip is clicked) */}
          {showAddressDropdown && (
            <div className="lg:hidden fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in duration-200">
              <div
                className="w-full max-w-sm bg-white rounded-2xl border border-[#EDE8E0] shadow-2xl p-5 space-y-4"
                onClick={e => e.stopPropagation()}
              >
                <div className="flex items-start justify-between pb-3 border-b border-[#EDE8E0]">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-full bg-[#1F4E34] text-white flex items-center justify-center shrink-0 shadow-xs">
                      <MapPin className="w-4 h-4 text-[#C59B27]" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-[#1A1A1A] leading-tight">
                        Axmin Prana Dispensary Hub
                      </h4>
                      <span className="text-[10px] text-[#777]">Classical Ayurvedic Pharmacy & Dispatch</span>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => setShowAddressDropdown(false)}
                    className="p-1 rounded-md text-[#999] hover:text-[#1A1A1A] hover:bg-[#FAF8F5] transition-colors"
                    aria-label="Close address details"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                <div className="space-y-3 text-xs">
                  <div className="flex items-start gap-2.5 text-[#444]">
                    <MapPin className="w-4 h-4 text-[#1F4E34] shrink-0 mt-0.5" />
                    <div className="leading-snug">
                      <p className="font-semibold text-[#1A1A1A]">Registered Dispensary Hub:</p>
                      <p className="text-[#666]">Kallara, Trivandrum, Kerala – 695608, India</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-2.5 text-[#444]">
                    <Truck className="w-4 h-4 text-[#1F4E34] shrink-0 mt-0.5" />
                    <div className="leading-snug">
                      <p className="font-semibold text-[#1A1A1A]">Pan-India Express Delivery:</p>
                      <p className="text-[#666]">Serving all PIN codes across India • Free shipping above ₹499</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-2.5 text-[#444]">
                    <Phone className="w-4 h-4 text-[#1F4E34] shrink-0 mt-0.5" />
                    <div className="leading-snug">
                      <p className="font-semibold text-[#1A1A1A]">Direct Care Helpline:</p>
                      <a href="tel:+917561836584" className="text-[#1F4E34] font-bold hover:underline">
                        +91 75618 36584
                      </a>
                    </div>
                  </div>
                </div>

                <div className="pt-3 border-t border-[#EDE8E0] flex items-center justify-between gap-2.5">
                  <a
                    href="https://maps.app.goo.gl/593CoPREJZsqTLRD9"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 py-2.5 px-3 bg-[#1F4E34] hover:bg-[#163B27] text-white text-xs font-semibold rounded-xl text-center flex items-center justify-center gap-1.5 transition-colors shadow-2xs"
                  >
                    <span>Get Directions</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                  <button
                    type="button"
                    onClick={() => setShowAddressDropdown(false)}
                    className="py-2.5 px-4 bg-[#FAF8F5] hover:bg-[#EDE8E0] text-[#1A1A1A] text-xs font-semibold rounded-xl transition-colors"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* 3. DESKTOP CATEGORY NAVIGATION BAR (Arranged strictly on ONE clean line with NO underline bars) */}
      <nav className="hidden lg:block bg-white border-t border-[#EDE8E0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center gap-8 py-3 text-[13px] font-medium text-[#241A14] tracking-normal whitespace-nowrap">
            
            {/* Shop All */}
            <Link
              href="/shop"
              className="hover:text-[#1F4E34] transition-colors whitespace-nowrap"
            >
              Shop All
            </Link>

            {/* Classical Oils & Tailams Mega Menu */}
            <div
              className="relative"
              onMouseEnter={() => handleMouseEnter('oils')}
              onMouseLeave={handleMouseLeave}
            >
              <Link
                href="/shop?format=Oil"
                className={`flex items-center gap-1 transition-colors whitespace-nowrap ${
                  activeMegaMenu === 'oils' ? 'text-[#1F4E34]' : 'hover:text-[#1F4E34]'
                }`}
              >
                <span>Classical Oils & Tailams</span>
                <ChevronDown className={`w-3.5 h-3.5 text-[#888] transition-transform ${activeMegaMenu === 'oils' ? 'rotate-180 text-[#1F4E34]' : ''}`} />
              </Link>

              {/* Mega Dropdown Panel for Oils */}
              {activeMegaMenu === 'oils' && (
                <div className="absolute left-1/2 -translate-x-1/2 top-full mt-3 w-[780px] bg-white rounded-2xl border border-[#EDE8E0] shadow-xl p-6 z-50 animate-in fade-in duration-150">
                  <div className="grid grid-cols-12 gap-6 text-left">
                    {/* Col 1 */}
                    <div className="col-span-4 space-y-2.5 border-r border-[#F0ECE4] pr-4">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-[#777] block mb-1">
                        Classical Formulations
                      </span>
                      <ul className="space-y-2 text-xs text-[#333]">
                        <li>
                          <Link href="/product/kumkumadi-radiant-tailam" className="hover:text-[#1F4E34] transition-colors block font-semibold text-[#111]">
                            Kumkumadi Radiant Tailam
                            <span className="block text-[10px] text-[#777] font-normal">Kashmiri Saffron & Sandalwood</span>
                          </Link>
                        </li>
                        <li>
                          <Link href="/product/bringadi-hair-therapy-tailam" className="hover:text-[#1F4E34] transition-colors block font-semibold text-[#111]">
                            Bringadi Hair Therapy Tailam
                            <span className="block text-[10px] text-[#777] font-normal">Indigofera & Eclipta Alba</span>
                          </Link>
                        </li>
                        <li>
                          <Link href="/shop?format=Oil" className="hover:text-[#1F4E34] transition-colors block">
                            Mahanarayan Joint Care Tailam
                          </Link>
                        </li>
                        <li>
                          <Link href="/shop?format=Oil" className="hover:text-[#1F4E34] transition-colors block">
                            Ksheerabala Scalp & Sleep Tailam
                          </Link>
                        </li>
                      </ul>
                    </div>

                    {/* Col 2 */}
                    <div className="col-span-4 space-y-2.5 border-r border-[#F0ECE4] pr-4">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-[#777] block mb-1">
                        Cold-Pressed Carrier Oils
                      </span>
                      <ul className="space-y-2 text-xs text-[#333]">
                        <li>
                          <Link href="/shop?format=Oil" className="hover:text-[#1F4E34] transition-colors block">
                            Virgin Sweet Almond Oil (Badam)
                          </Link>
                        </li>
                        <li>
                          <Link href="/shop?format=Oil" className="hover:text-[#1F4E34] transition-colors block">
                            Cold-Pressed Black Sesame Tailam
                          </Link>
                        </li>
                        <li>
                          <Link href="/shop?format=Oil" className="hover:text-[#1F4E34] transition-colors block">
                            Extra Virgin Coconut Oil (Narikela)
                          </Link>
                        </li>
                        <li>
                          <Link href="/shop?format=Oil" className="hover:text-[#1F4E34] transition-colors block">
                            Golden Jojoba & Castor Oils
                          </Link>
                        </li>
                      </ul>
                    </div>

                    {/* Col 3 */}
                    <div className="col-span-4">
                      <div className="bg-[#FAF8F5] rounded-xl p-3.5 border border-[#EDE8E0] flex flex-col justify-between h-full">
                        <div>
                          <span className="text-[10px] font-semibold text-[#8C6207] uppercase">Featured</span>
                          <div className="relative w-full aspect-[4/3] rounded-lg overflow-hidden my-2 bg-white">
                            <Image
                              src="https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?auto=format&fit=crop&w=400&q=80"
                              alt="Kumkumadi"
                              fill
                              className="object-cover"
                            />
                          </div>
                          <h5 className="font-semibold text-xs text-[#111]">Kumkumadi Radiant Tailam</h5>
                          <p className="text-[10px] text-[#666]">Charaka Samhita Classical Formulation</p>
                        </div>
                        <Link
                          href="/product/kumkumadi-radiant-tailam"
                          className="mt-2 w-full py-1.5 bg-[#1F4E34] text-white text-[11px] font-medium rounded-lg text-center hover:bg-[#163B27] transition-colors"
                        >
                          View Product
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Herbal Churnas Mega Menu */}
            <div
              className="relative"
              onMouseEnter={() => handleMouseEnter('churnas')}
              onMouseLeave={handleMouseLeave}
            >
              <Link
                href="/shop?format=Churna"
                className={`flex items-center gap-1 transition-colors whitespace-nowrap ${
                  activeMegaMenu === 'churnas' ? 'text-[#1F4E34]' : 'hover:text-[#1F4E34]'
                }`}
              >
                <span>Herbal Churnas & Medicines</span>
                <ChevronDown className={`w-3.5 h-3.5 text-[#888] transition-transform ${activeMegaMenu === 'churnas' ? 'rotate-180 text-[#1F4E34]' : ''}`} />
              </Link>

              {/* Mega Dropdown Panel for Churnas */}
              {activeMegaMenu === 'churnas' && (
                <div className="absolute left-1/2 -translate-x-1/2 top-full mt-3 w-[780px] bg-white rounded-2xl border border-[#EDE8E0] shadow-xl p-6 z-50 animate-in fade-in duration-150">
                  <div className="grid grid-cols-12 gap-6 text-left">
                    {/* Col 1 */}
                    <div className="col-span-4 space-y-2.5 border-r border-[#F0ECE4] pr-4">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-[#777] block mb-1">
                        Classical Churnas
                      </span>
                      <ul className="space-y-2 text-xs text-[#333]">
                        <li>
                          <Link href="/product/triphala-bio-active-churna" className="hover:text-[#1F4E34] transition-colors block font-semibold text-[#111]">
                            Triphala Bio-Active Gut Cleanse
                            <span className="block text-[10px] text-[#777] font-normal">Haritaki, Bibhitaki & Amla</span>
                          </Link>
                        </li>
                        <li>
                          <Link href="/shop?format=Churna" className="hover:text-[#1F4E34] transition-colors block">
                            Avipattikar Churna (Digestive Agni)
                          </Link>
                        </li>
                        <li>
                          <Link href="/shop?format=Churna" className="hover:text-[#1F4E34] transition-colors block">
                            Sitopaladi Churna (Respiratory Prana)
                          </Link>
                        </li>
                        <li>
                          <Link href="/shop?format=Churna" className="hover:text-[#1F4E34] transition-colors block">
                            Trikatu Bio-Metabolic Churna
                          </Link>
                        </li>
                      </ul>
                    </div>

                    {/* Col 2 */}
                    <div className="col-span-4 space-y-2.5 border-r border-[#F0ECE4] pr-4">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-[#777] block mb-1">
                        Rasayanas & Single Roots
                      </span>
                      <ul className="space-y-2 text-xs text-[#333]">
                        <li>
                          <Link href="/product/ashwagandha-supreme-ksm66" className="hover:text-[#1F4E34] transition-colors block font-semibold text-[#111]">
                            Ashwagandha KSM-66® Organic
                            <span className="block text-[10px] text-[#777] font-normal">Stress Cortisol Balance</span>
                          </Link>
                        </li>
                        <li>
                          <Link href="/product/chyawanprash-supreme-awaleha" className="hover:text-[#1F4E34] transition-colors block font-semibold text-[#111]">
                            Chyawanprash Awaleha (A2 Ghee)
                            <span className="block text-[10px] text-[#777] font-normal">Wild Amla Rejuvenation</span>
                          </Link>
                        </li>
                        <li>
                          <Link href="/shop?category=Immunity%20%26%20Rasayana" className="hover:text-[#1F4E34] transition-colors block">
                            Brahmi Bacopa Cognitive Elixir
                          </Link>
                        </li>
                        <li>
                          <Link href="/shop?category=Immunity%20%26%20Rasayana" className="hover:text-[#1F4E34] transition-colors block">
                            Shatavari Root Vitality Churna
                          </Link>
                        </li>
                      </ul>
                    </div>

                    {/* Col 3 */}
                    <div className="col-span-4">
                      <div className="bg-[#FAF8F5] rounded-xl p-3.5 border border-[#EDE8E0] flex flex-col justify-between h-full">
                        <div>
                          <span className="text-[10px] font-semibold text-[#1F4E34] uppercase">AYUSH Certified</span>
                          <div className="relative w-full aspect-[4/3] rounded-lg overflow-hidden my-2 bg-white">
                            <Image
                              src="https://images.unsplash.com/photo-1547887537-6158d64c35b3?auto=format&fit=crop&w=400&q=80"
                              alt="Ashwagandha"
                              fill
                              className="object-cover"
                            />
                          </div>
                          <h5 className="font-semibold text-xs text-[#111]">Ashwagandha KSM-66®</h5>
                          <p className="text-[10px] text-[#666]">Standardized Organic Root Extract</p>
                        </div>
                        <Link
                          href="/product/ashwagandha-supreme-ksm66"
                          className="mt-2 w-full py-1.5 bg-[#1F4E34] text-white text-[11px] font-medium rounded-lg text-center hover:bg-[#163B27] transition-colors"
                        >
                          View Product
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Direct Category Links (Arranged on ONE Clean Line) */}
            <Link
              href="/shop?category=Skin%20Radiance%20%26%20Kanti"
              className="hover:text-[#1F4E34] transition-colors whitespace-nowrap"
            >
              Skin Radiance
            </Link>

            <Link
              href="/shop?category=Hair%20Therapy%20%26%20Keshya"
              className="hover:text-[#1F4E34] transition-colors whitespace-nowrap"
            >
              Hair Therapy
            </Link>

            <Link
              href="/bulk-orders"
              className="hover:text-[#1F4E34] transition-colors whitespace-nowrap"
            >
              Bulk & Wholesale
            </Link>

            <Link
              href="/articles"
              className="hover:text-[#1F4E34] transition-colors whitespace-nowrap"
            >
              Vedic Journal
            </Link>

            {/* Prakriti Dosha Quiz Button (Minimalist, No Tacky Borders) */}
            <button
              onClick={openQuiz}
              className="hover:text-[#1F4E34] transition-colors inline-flex items-center gap-1.5 whitespace-nowrap font-medium"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#C59B27]" />
              <span>Prakriti Quiz</span>
            </button>
          </div>
        </div>
      </nav>

      {/* 4. MOBILE SLIDE-OUT DRAWER MENU (MNC Standard) */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs lg:hidden animate-in fade-in duration-200"
          onClick={() => setIsMobileMenuOpen(false)}
        >
          <div
            className="w-[85vw] max-w-sm h-full bg-white p-5 shadow-2xl overflow-y-auto flex flex-col justify-between"
            onClick={e => e.stopPropagation()}
          >
            <div className="space-y-5">
              {/* Drawer Header */}
              <div className="flex items-center justify-between pb-3.5 border-b border-[#EDE8E0]">
                <div className="flex items-center gap-2.5">
                  <div className="w-10 h-10 rounded-full overflow-hidden border border-[#C59B27]/40 bg-white flex items-center justify-center p-0.5 shadow-xs">
                    <Image src="/images/Logo/logo.png" alt="Axmin Prana Logo" width={40} height={40} className="w-full h-full object-contain" priority />
                  </div>
                  <div className="flex flex-col justify-center">
                    <span className="font-wishlist-heading font-bold text-[#1A1A1A] tracking-tight text-lg block leading-none">
                      Axmin Prana
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-1 rounded-lg text-[#666] hover:text-black hover:bg-[#F5F2EC] transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Navigation Links */}
              <div className="space-y-1 text-sm font-medium text-[#241A14]">
                <Link
                  href="/shop"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block py-2.5 px-3 rounded-lg hover:bg-[#FAF8F5] transition-colors"
                >
                  Shop All Formulations
                </Link>

                {/* Oils Accordion */}
                <div className="border-b border-[#F0ECE4] pb-1">
                  <button
                    onClick={() => setMobileExpandedSection(mobileExpandedSection === 'oils' ? null : 'oils')}
                    className="w-full flex items-center justify-between py-2.5 px-3 rounded-lg hover:bg-[#FAF8F5] text-left transition-colors"
                  >
                    <span>Classical Oils & Tailams</span>
                    <ChevronDown className={`w-4 h-4 text-[#888] transition-transform ${mobileExpandedSection === 'oils' ? 'rotate-180' : ''}`} />
                  </button>
                  {mobileExpandedSection === 'oils' && (
                    <div className="pl-6 pr-3 py-1.5 space-y-2 text-xs text-[#555]">
                      <Link
                        href="/product/kumkumadi-radiant-tailam"
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="block py-1 hover:text-[#1F4E34]"
                      >
                        Kumkumadi Radiant Tailam
                      </Link>
                      <Link
                        href="/product/bringadi-hair-therapy-tailam"
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="block py-1 hover:text-[#1F4E34]"
                      >
                        Bringadi Hair Therapy Tailam
                      </Link>
                      <Link
                        href="/shop?format=Oil"
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="block py-1 hover:text-[#1F4E34]"
                      >
                        All Cold-Pressed Oils
                      </Link>
                    </div>
                  )}
                </div>

                {/* Churnas Accordion */}
                <div className="border-b border-[#F0ECE4] pb-1">
                  <button
                    onClick={() => setMobileExpandedSection(mobileExpandedSection === 'churnas' ? null : 'churnas')}
                    className="w-full flex items-center justify-between py-2.5 px-3 rounded-lg hover:bg-[#FAF8F5] text-left transition-colors"
                  >
                    <span>Herbal Churnas & Medicines</span>
                    <ChevronDown className={`w-4 h-4 text-[#888] transition-transform ${mobileExpandedSection === 'churnas' ? 'rotate-180' : ''}`} />
                  </button>
                  {mobileExpandedSection === 'churnas' && (
                    <div className="pl-6 pr-3 py-1.5 space-y-2 text-xs text-[#555]">
                      <Link
                        href="/product/triphala-bio-active-churna"
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="block py-1 hover:text-[#1F4E34]"
                      >
                        Triphala Bio-Active Gut Cleanse
                      </Link>
                      <Link
                        href="/product/ashwagandha-supreme-ksm66"
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="block py-1 hover:text-[#1F4E34]"
                      >
                        Ashwagandha KSM-66® Organic
                      </Link>
                      <Link
                        href="/product/chyawanprash-supreme-awaleha"
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="block py-1 hover:text-[#1F4E34]"
                      >
                        Chyawanprash Awaleha (A2 Ghee)
                      </Link>
                      <Link
                        href="/shop?format=Churna"
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="block py-1 hover:text-[#1F4E34]"
                      >
                        All Herbal Churnas
                      </Link>
                    </div>
                  )}
                </div>

                <Link
                  href="/shop?category=Skin%20Radiance%20%26%20Kanti"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block py-2.5 px-3 rounded-lg hover:bg-[#FAF8F5] transition-colors"
                >
                  Skin Radiance
                </Link>

                <Link
                  href="/shop?category=Hair%20Therapy%20%26%20Keshya"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block py-2.5 px-3 rounded-lg hover:bg-[#FAF8F5] transition-colors"
                >
                  Hair Therapy
                </Link>

                <Link
                  href="/bulk-orders"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block py-2.5 px-3 rounded-lg hover:bg-[#FAF8F5] transition-colors"
                >
                  Bulk & Wholesale (B2B)
                </Link>

                <Link
                  href="/articles"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block py-2.5 px-3 rounded-lg hover:bg-[#FAF8F5] transition-colors"
                >
                  Vedic Journal
                </Link>

                <button
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    openQuiz();
                  }}
                  className="w-full text-left py-2.5 px-3 rounded-lg text-[#1F4E34] font-medium flex items-center justify-between hover:bg-[#FAF8F5] transition-colors"
                >
                  <span className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-[#C59B27]" />
                    Prakriti Dosha Diagnostic
                  </span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Bottom Support & Info */}
            <div className="pt-4 border-t border-[#EDE8E0] space-y-2.5 text-xs">
              <a
                href="tel:+917561836584"
                className="flex items-center gap-2.5 text-[#1A1A1A] font-medium"
              >
                <Phone className="w-4 h-4 text-[#1F4E34]" />
                <span>+91 75618 36584 (Helpline)</span>
              </a>
              <p className="text-[10px] text-[#888]">
                © {new Date().getFullYear()} Axmin Prana Ayurveda • AYUSH Certified
              </p>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
