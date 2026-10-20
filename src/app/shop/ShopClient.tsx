'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { SlidersHorizontal, ArrowUpDown, X, Star, Check } from 'lucide-react';
import { IProduct, ICategory } from '../../lib/api';
import { ProductCard } from '../../components/ProductCard';

interface Props {
  products: IProduct[];
  categories: ICategory[];
  pagination: { total: number; totalPages: number; page: number };
  searchParams: {
    category?: string;
    dosha?: string;
    format?: string;
    sort?: string;
    search?: string;
    priceRange?: string;
    rating?: string;
    page?: string;
  };
}

export const ShopClient: React.FC<Props> = ({
  products,
  categories,
  pagination,
  searchParams
}) => {
  const router = useRouter();
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  const selectedCategory = searchParams.category || '';
  const selectedDosha = searchParams.dosha || '';
  const selectedFormat = searchParams.format || '';
  const selectedSort = searchParams.sort || 'popularity';
  const selectedPriceRange = searchParams.priceRange || '';
  const selectedRating = searchParams.rating || '';
  const searchQuery = searchParams.search || '';

  const doshas = ['Vata', 'Pitta', 'Kapha', 'Tridoshic'];
  const formats = ['Capsule', 'Oil', 'Churna', 'Asava/Arishta'];
  const priceRanges = [
    { label: 'Under ₹500', value: '0-500' },
    { label: '₹500 - ₹1,000', value: '500-1000' },
    { label: '₹1,000 - ₹2,000', value: '1000-2000' },
    { label: 'Above ₹2,000', value: '2000-99999' }
  ];

  const buildUrl = (overrides: Record<string, string | undefined>) => {
    const params = new URLSearchParams();
    const current = {
      category: selectedCategory,
      dosha: selectedDosha,
      format: selectedFormat,
      sort: selectedSort,
      search: searchQuery,
      priceRange: selectedPriceRange,
      rating: selectedRating,
      ...overrides
    };

    Object.entries(current).forEach(([k, v]) => {
      if (v) params.set(k, v);
    });

    return `/shop?${params.toString()}`;
  };

  const hasActiveFilters = !!(
    selectedCategory ||
    selectedDosha ||
    selectedFormat ||
    selectedPriceRange ||
    selectedRating ||
    searchQuery
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10 bg-[#FAF7F2]">
      {/* Breadcrumb Navigation */}
      <div className="mb-6">
        <div className="flex items-center gap-2 text-xs text-[#777] mb-2 font-medium">
          <Link href="/" className="hover:text-[#1F4E34]">Home</Link>
          <span>/</span>
          <span className="text-[#1A1A1A]">Ayurvedic Formulations</span>
          {selectedCategory && (
            <>
              <span>/</span>
              <span className="text-[#1F4E34] font-semibold">{selectedCategory}</span>
            </>
          )}
        </div>

        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-4xl font-serif font-bold text-[#2C1D11] tracking-tight">
              {searchQuery
                ? `Search: "${searchQuery}"`
                : selectedCategory ? `${selectedCategory} — Pure & Natural` : 'All Classical Formulations — Cold-Pressed, Lab-Tested & Pure'}
            </h1>
            <p className="text-xs sm:text-sm text-[#666] mt-1.5 max-w-2xl leading-relaxed">
              Standardized botanical medicines, Rasayana churnas, and classical oils formulated in strict accordance with the Charaka Samhita and certified under the Ministry of AYUSH.
            </p>
          </div>
          <span className="text-xs font-semibold text-[#687168] shrink-0">
            Showing <strong>{products.length}</strong> of <strong>{pagination.total}</strong> products
          </span>
        </div>
      </div>

      {/* Mobile Filter Button & Sort Bar */}
      <div className="bg-white p-3 sm:p-4 rounded-xl border border-[#E5E8E0] flex flex-wrap sm:flex-nowrap items-center justify-between gap-3 mb-6 sm:mb-8 shadow-2xs">
        <button
          onClick={() => setMobileFilterOpen(true)}
          className="lg:hidden flex items-center gap-2 px-3 py-2 bg-[#FAF8F1] border border-[#E5E8E0] rounded-lg text-xs font-bold text-[#214E34] hover:bg-[#DDE7D9]/40 transition-colors"
        >
          <SlidersHorizontal className="w-4 h-4" /> Filters {hasActiveFilters && '(Active)'}
        </button>

        {/* Active Filters Display */}
        <div className="hidden sm:flex flex-wrap items-center gap-1.5 sm:gap-2 text-xs">
          {hasActiveFilters && (
            <span className="text-[11px] text-[#687168] font-bold uppercase tracking-wider">
              Active:
            </span>
          )}
          {selectedCategory && (
            <Link
              href={buildUrl({ category: undefined, page: '1' })}
              className="inline-flex items-center gap-1 px-2.5 py-1 bg-[#DDE7D9] text-[#214E34] text-[11px] font-bold rounded-full hover:bg-red-100 hover:text-red-700 transition-colors"
            >
              {selectedCategory} <X className="w-3 h-3" />
            </Link>
          )}
          {selectedDosha && (
            <Link
              href={buildUrl({ dosha: undefined, page: '1' })}
              className="inline-flex items-center gap-1 px-2.5 py-1 bg-[#B86F4B]/15 text-[#B86F4B] text-[11px] font-bold rounded-full hover:bg-red-100 hover:text-red-700 transition-colors"
            >
              {selectedDosha} Pacifying <X className="w-3 h-3" />
            </Link>
          )}
          {selectedFormat && (
            <Link
              href={buildUrl({ format: undefined, page: '1' })}
              className="inline-flex items-center gap-1 px-2.5 py-1 bg-[#214E34]/10 text-[#214E34] text-[11px] font-bold rounded-full hover:bg-red-100 hover:text-red-700 transition-colors"
            >
              {selectedFormat} <X className="w-3 h-3" />
            </Link>
          )}
          {hasActiveFilters && (
            <Link
              href="/shop"
              className="text-xs text-[#B86F4B] hover:underline font-semibold ml-2"
            >
              Reset All
            </Link>
          )}
        </div>

        {/* Sort Controls */}
        <div className="flex items-center gap-2 text-xs ml-auto">
          <span className="text-[#687168] flex items-center gap-1 font-semibold whitespace-nowrap">
            <ArrowUpDown className="w-3.5 h-3.5 text-[#214E34]" /> <span className="hidden xs:inline">Sort By:</span>
          </span>
          <select
            value={selectedSort}
            onChange={e => router.push(buildUrl({ sort: e.target.value, page: '1' }))}
            className="text-xs font-semibold px-2.5 sm:px-3 py-1.5 sm:py-2 rounded-lg border border-[#E5E8E0] bg-[#FAF8F1] focus:bg-white text-[#202820] max-w-[170px] sm:max-w-none"
          >
            <option value="popularity">Bestsellers & Relevance</option>
            <option value="price_asc">Price: Low to High</option>
            <option value="price_desc">Price: High to Low</option>
            <option value="rating">Highest Verified Rating</option>
            <option value="newest">Newest Formulations</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Desktop Sidebar Filters - Kama Ayurveda Inspired */}
        <div className="hidden lg:block space-y-6 bg-white p-5 rounded-2xl border border-[#E5E8E0] shadow-2xs self-start sticky top-24">
          <div className="flex items-center justify-between pb-3 border-b border-[#E5E8E0]">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#214E34] flex items-center gap-1.5">
              <SlidersHorizontal className="w-4 h-4 text-[#B86F4B]" /> Filter Formulations
            </h3>
            {hasActiveFilters && (
              <Link href="/shop" className="text-xs text-[#B86F4B] hover:underline font-bold">
                Reset
              </Link>
            )}
          </div>

          {/* Categories */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#202820] mb-2.5">
              Target Category
            </h4>
            <div className="space-y-1 text-xs">
              <Link
                href={buildUrl({ category: undefined, page: '1' })}
                className={`flex items-center justify-between py-1.5 px-2 rounded-md transition-colors ${
                  !selectedCategory ? 'bg-[#214E34] text-white font-bold' : 'text-[#202820] hover:bg-[#FAF8F1]'
                }`}
              >
                <span>All Formulations</span>
              </Link>
              {categories.map(c => (
                <Link
                  key={c._id}
                  href={buildUrl({ category: c.name, page: '1' })}
                  className={`flex items-center justify-between py-1.5 px-2 rounded-md transition-colors ${
                    selectedCategory === c.name
                      ? 'bg-[#214E34] text-white font-bold'
                      : 'text-[#202820] hover:bg-[#FAF8F1]'
                  }`}
                >
                  <span>{c.name}</span>
                </Link>
              ))}
            </div>
          </div>

          {/* Dosha Affinity */}
          <div className="pt-4 border-t border-[#E5E8E0]">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#202820] mb-2.5">
              Dosha Affinity
            </h4>
            <div className="space-y-1 text-xs">
              {doshas.map(d => (
                <Link
                  key={d}
                  href={buildUrl({ dosha: selectedDosha === d ? undefined : d, page: '1' })}
                  className={`flex items-center justify-between py-1.5 px-2 rounded-md transition-colors ${
                    selectedDosha === d
                      ? 'bg-[#B86F4B] text-white font-bold'
                      : 'text-[#202820] hover:bg-[#FAF8F1]'
                  }`}
                >
                  <span>{d} Pacifying</span>
                  {selectedDosha === d && <Check className="w-3.5 h-3.5" />}
                </Link>
              ))}
            </div>
          </div>

          {/* Format */}
          <div className="pt-4 border-t border-[#E5E8E0]">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#202820] mb-2.5">
              Dosage Format
            </h4>
            <div className="space-y-1 text-xs">
              {formats.map(f => (
                <Link
                  key={f}
                  href={buildUrl({ format: selectedFormat === f ? undefined : f, page: '1' })}
                  className={`flex items-center justify-between py-1.5 px-2 rounded-md transition-colors ${
                    selectedFormat === f
                      ? 'bg-[#214E34] text-white font-bold'
                      : 'text-[#202820] hover:bg-[#FAF8F1]'
                  }`}
                >
                  <span>{f}</span>
                  {selectedFormat === f && <Check className="w-3.5 h-3.5" />}
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Product Grid Area */}
        <div className="lg:col-span-3 space-y-6">
          {products.length === 0 ? (
            <div className="bg-white rounded-2xl border border-[#E5E8E0] p-12 text-center space-y-3">
              <p className="text-base font-bold text-[#202820]">No classical formulations matched your criteria</p>
              <p className="text-xs text-[#687168] max-w-sm mx-auto">
                Try clearing active filters or searching for primary herbs like Ashwagandha, Saffron, or Triphala.
              </p>
              <Link
                href="/shop"
                className="inline-block px-5 py-2.5 bg-[#214E34] text-white text-xs font-bold rounded-md hover:bg-[#163A28]"
              >
                Clear All Filters
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 min-[360px]:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-3.5 sm:gap-6">
              {products.map(product => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
          )}

          {/* Server-Side Pagination */}
          {pagination.totalPages > 1 && (
            <div className="flex justify-center items-center gap-1.5 sm:gap-2 pt-8 border-t border-[#E5E8E0]">
              {[...Array(pagination.totalPages)].map((_, i) => (
                <Link
                  key={i + 1}
                  href={buildUrl({ page: String(i + 1) })}
                  className={`w-8 h-8 sm:w-9 sm:h-9 rounded-lg flex items-center justify-center text-xs font-bold transition-colors ${
                    pagination.page === i + 1
                      ? 'bg-[#214E34] text-white shadow-xs'
                      : 'bg-white border border-[#E5E8E0] text-[#202820] hover:bg-[#FAF8F1]'
                  }`}
                >
                  {i + 1}
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Mobile Filter Drawer Modal */}
      {mobileFilterOpen && (
        <div className="lg:hidden fixed inset-0 z-50 bg-black/50 backdrop-blur-2xs" onClick={() => setMobileFilterOpen(false)}>
          <div
            className="w-[85vw] max-w-xs h-full bg-[#FAF8F1] p-5 shadow-2xl overflow-y-auto flex flex-col justify-between border-r border-[#E5E8E0]"
            onClick={e => e.stopPropagation()}
          >
            <div className="space-y-6">
              <div className="flex items-center justify-between pb-3 border-b border-[#E5E8E0]">
                <h3 className="text-xs font-bold uppercase tracking-wider text-[#214E34]">
                  Filter Formulations
                </h3>
                <button onClick={() => setMobileFilterOpen(false)}>
                  <X className="w-5 h-5 text-[#202820]" />
                </button>
              </div>

              {/* Categories */}
              <div>
                <h4 className="text-xs font-bold uppercase text-[#202820] mb-2">Category</h4>
                <div className="space-y-1 text-xs">
                  <Link
                    href={buildUrl({ category: undefined, page: '1' })}
                    onClick={() => setMobileFilterOpen(false)}
                    className={`block py-1 px-2 rounded ${!selectedCategory ? 'bg-[#214E34] text-white font-bold' : ''}`}
                  >
                    All Formulations
                  </Link>
                  {categories.map(c => (
                    <Link
                      key={c._id}
                      href={buildUrl({ category: c.name, page: '1' })}
                      onClick={() => setMobileFilterOpen(false)}
                      className={`block py-1 px-2 rounded ${selectedCategory === c.name ? 'bg-[#214E34] text-white font-bold' : ''}`}
                    >
                      {c.name}
                    </Link>
                  ))}
                </div>
              </div>

              {/* Dosha */}
              <div className="pt-4 border-t border-[#E5E8E0]">
                <h4 className="text-xs font-bold uppercase text-[#202820] mb-2">Dosha Affinity</h4>
                <div className="space-y-1 text-xs">
                  {doshas.map(d => (
                    <Link
                      key={d}
                      href={buildUrl({ dosha: selectedDosha === d ? undefined : d, page: '1' })}
                      onClick={() => setMobileFilterOpen(false)}
                      className={`block py-1 px-2 rounded ${selectedDosha === d ? 'bg-[#B86F4B] text-white font-bold' : ''}`}
                    >
                      {d} Pacifying
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-[#E5E8E0]">
              <button
                onClick={() => setMobileFilterOpen(false)}
                className="w-full py-2.5 bg-[#214E34] text-white text-xs font-bold rounded-lg"
              >
                Apply Filters ({products.length} Results)
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
