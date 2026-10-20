'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Heart, ShoppingCart, Trash2, ArrowRight, ArrowLeft, Star, ShieldCheck } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';
import { fetchFromAPI, IProduct } from '../../lib/api';

export default function WishlistPage() {
  const { wishlist, toggleWishlist } = useAuth();
  const { addToCart, openDrawer } = useCart();

  const [products, setProducts] = useState<IProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [bestsellers, setBestsellers] = useState<IProduct[]>([]);
  const [addedIds, setAddedIds] = useState<string[]>([]);

  // Fetch wishlisted products
  useEffect(() => {
    async function loadWishlistProducts() {
      if (!wishlist || wishlist.length === 0) {
        setProducts([]);
        setLoading(false);
        return;
      }

      setLoading(true);
      try {
        const idsParam = wishlist.join(',');
        const res = await fetchFromAPI(`/products?ids=${encodeURIComponent(idsParam)}&limit=50`);
        if (res.success && res.data) {
          setProducts(res.data);
        } else {
          setProducts([]);
        }
      } catch (e) {
        console.error('Error fetching wishlist products:', e);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    }

    loadWishlistProducts();
  }, [wishlist]);

  // Load recommendations for empty or browse state
  useEffect(() => {
    async function loadBestsellers() {
      try {
        const res = await fetchFromAPI('/products/bestsellers');
        if (res.success && res.data) {
          setBestsellers(res.data.slice(0, 4));
        }
      } catch (e) {
        console.error('Error loading bestsellers', e);
      }
    }
    loadBestsellers();
  }, []);

  const handleAddToCart = (product: IProduct) => {
    addToCart(product, 1);
    setAddedIds(prev => [...prev, product._id]);
    setTimeout(() => {
      setAddedIds(prev => prev.filter(id => id !== product._id));
      openDrawer();
    }, 600);
  };

  const handleRemove = (productId: string) => {
    toggleWishlist(productId);
    setProducts(prev => prev.filter(p => p._id !== productId));
  };

  return (
    <div className="min-h-screen bg-[#FAF7F2] py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb Navigation */}
        <nav className="flex items-center gap-2 text-xs text-[#777] mb-4">
          <Link href="/" className="hover:text-[#1F4E34] transition-colors">Home</Link>
          <span>/</span>
          <span className="text-[#1A1A1A] font-medium">Wishlist</span>
        </nav>

        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 mb-8 border-b border-[#EDE8E0] gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-serif font-bold text-[#1A1A1A] tracking-tight">
              My Saved Formulations
            </h1>
            <p className="text-xs sm:text-sm text-[#777] mt-1 font-normal">
              {wishlist.length} {wishlist.length === 1 ? 'formulation saved' : 'formulations saved'} in your Ayurvedic collection
            </p>
          </div>

          {products.length > 0 && (
            <Link
              href="/shop"
              className="text-xs sm:text-sm font-medium text-[#1F4E34] hover:underline self-start sm:self-auto flex items-center gap-1"
            >
              <span>Continue Shopping</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          )}
        </div>

        {/* Loading State */}
        {loading ? (
          <div className="py-24 text-center">
            <div className="w-8 h-8 border-2 border-[#1F4E34] border-t-transparent rounded-full animate-spin mx-auto mb-3" />
            <p className="text-xs text-[#777]">Loading your saved formulations...</p>
          </div>
        ) : products.length === 0 ? (
          /* Empty State */
          <div className="max-w-lg mx-auto bg-white rounded-2xl border border-[#EDE8E0] p-8 sm:p-12 text-center shadow-xs my-8">
            <div className="w-16 h-16 rounded-full bg-[#FAF8F5] border border-[#EDE8E0] flex items-center justify-center mx-auto mb-4 text-[#888]">
              <Heart className="w-8 h-8 stroke-1 text-[#888]" />
            </div>
            <h2 className="text-xl sm:text-2xl font-serif font-bold text-[#1A1A1A]">
              Your Wishlist is Empty
            </h2>
            <p className="text-xs sm:text-sm text-[#777] mt-2 leading-relaxed">
              You haven&apos;t saved any classical Ayurvedic tailams, churnas, or rasayanas to your wishlist yet.
            </p>
            <div className="pt-6">
              <Link
                href="/shop"
                className="inline-flex items-center gap-2 px-6 py-3 bg-[#1F4E34] hover:bg-[#163B27] text-white text-xs sm:text-sm font-medium rounded-full shadow-xs transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Explore Classical Formulations</span>
              </Link>
            </div>
          </div>
        ) : (
          /* Wishlist Items Grid */
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {products.map(product => {
              const activePrice = product.salePrice || product.price;
              const originalPrice = product.price;
              const isAdded = addedIds.includes(product._id);

              return (
                <div
                  key={product._id}
                  className="group bg-white rounded-2xl border border-[#EDE8E0] hover:border-[#1F4E34]/50 shadow-2xs hover:shadow-md transition-all flex flex-col justify-between overflow-hidden relative"
                >
                  {/* Top Image + Remove Button */}
                  <div className="p-3 pb-0 relative">
                    <button
                      onClick={() => handleRemove(product._id)}
                      className="absolute top-4 right-4 z-10 w-8 h-8 rounded-full bg-white/90 backdrop-blur-xs border border-[#EDE8E0] flex items-center justify-center text-[#777] hover:text-red-600 hover:border-red-200 transition-colors shadow-2xs"
                      title="Remove from wishlist"
                      aria-label={`Remove ${product.name} from wishlist`}
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>

                    <Link href={`/product/${product.slug}`} className="block">
                      <div className="relative aspect-square w-full rounded-xl overflow-hidden bg-[#FAF8F5]">
                        <Image
                          src={product.thumbnail || (product.images && product.images[0]) || 'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?auto=format&fit=crop&w=400&q=80'}
                          alt={product.name}
                          fill
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                    </Link>
                  </div>

                  {/* Body Content */}
                  <div className="p-4 flex flex-col flex-1 justify-between space-y-3">
                    <div>
                      <span className="text-[10px] uppercase font-bold tracking-wider text-[#8C6207]">
                        {product.category}
                      </span>
                      <Link href={`/product/${product.slug}`}>
                        <h3 className="font-semibold text-sm text-[#1A1A1A] group-hover:text-[#1F4E34] transition-colors line-clamp-1 mt-0.5">
                          {product.name}
                        </h3>
                      </Link>

                      <div className="flex items-center gap-1.5 mt-1 text-xs">
                        <div className="flex items-center text-[#E5A823]">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className="w-3 h-3 fill-[#E5A823]" />
                          ))}
                        </div>
                        <span className="text-[10px] text-[#777] font-medium">
                          ({product.reviewCount || 120})
                        </span>
                      </div>

                      <p className="text-[11px] text-[#777] mt-1">{product.packSize}</p>
                    </div>

                    {/* Price and Add to Cart Action */}
                    <div className="pt-2 border-t border-[#F5F2EC] flex items-center justify-between">
                      <div className="flex items-baseline gap-1.5">
                        <span className="text-base font-bold text-[#1A1A1A]">
                          ₹{activePrice}
                        </span>
                        {originalPrice > activePrice && (
                          <span className="text-xs text-[#888] line-through font-normal">
                            ₹{originalPrice}
                          </span>
                        )}
                      </div>

                      <button
                        onClick={() => handleAddToCart(product)}
                        className={`px-3 py-1.5 rounded-full text-xs font-semibold flex items-center gap-1.5 transition-all shadow-2xs ${
                          isAdded
                            ? 'bg-[#1F4E34] text-white'
                            : 'bg-[#1F4E34] hover:bg-[#163B27] text-white'
                        }`}
                      >
                        <ShoppingCart className="w-3.5 h-3.5" />
                        <span>{isAdded ? 'Added' : 'Move to Cart'}</span>
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Recommended Formulations Strip */}
        {bestsellers.length > 0 && (
          <div className="mt-16 pt-12 border-t border-[#EDE8E0]">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-lg sm:text-xl font-serif font-bold text-[#1A1A1A]">
                  Popular Classical Formulations
                </h3>
                <p className="text-xs text-[#777] mt-0.5">
                  Frequently prescribed remedies crafted from ancient Charaka Samhita texts
                </p>
              </div>
              <Link
                href="/shop"
                className="text-xs font-medium text-[#1F4E34] hover:underline"
              >
                View all &rarr;
              </Link>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-6">
              {bestsellers.map(b => (
                <Link
                  key={b._id}
                  href={`/product/${b.slug}`}
                  className="bg-white rounded-xl border border-[#EDE8E0] p-3 hover:border-[#1F4E34]/50 transition-all group flex flex-col justify-between"
                >
                  <div>
                    <div className="relative aspect-square w-full rounded-lg overflow-hidden bg-[#FAF8F5] mb-2">
                      <Image
                        src={b.thumbnail || b.images[0]}
                        alt={b.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform"
                      />
                    </div>
                    <h4 className="text-xs font-semibold text-[#1A1A1A] group-hover:text-[#1F4E34] transition-colors line-clamp-1">
                      {b.name}
                    </h4>
                    <p className="text-[10px] text-[#777] mt-0.5">{b.packSize}</p>
                  </div>
                  <div className="mt-2 text-xs font-bold text-[#1F4E34]">
                    ₹{b.salePrice || b.price}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
