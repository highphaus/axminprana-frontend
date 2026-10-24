import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  ArrowRight,
  ShieldCheck,
  Award,
  Leaf,
  Sparkles,
  CheckCircle2,
  Star,
  Quote,
  ChevronRight,
  Building2,
  FileCheck2,
  Truck
} from 'lucide-react';
import { IProduct, ICategory, API_BASE } from '../lib/api';
import { ProductCard } from '../components/ProductCard';
import { HeroSection } from '../components/HeroSection';
import { CategoryNavStrip } from '../components/CategoryNavStrip';
import { ArchCategories } from '../components/ArchCategories';
import { WellnessConcernCarousel } from '../components/WellnessConcernCarousel';

async function getHomeData() {
  try {
    const [bestsellersRes, categoriesRes] = await Promise.all([
      fetch(`${API_BASE}/products/bestsellers`, { next: { revalidate: 60 } }),
      fetch(`${API_BASE}/categories`, { next: { revalidate: 300 } })
    ]);

    const bestsellersData = await bestsellersRes.json();
    const categoriesData = await categoriesRes.json();

    return {
      bestsellers: (bestsellersData.data || []) as IProduct[],
      categories: (categoriesData.data || []) as ICategory[]
    };
  } catch (error) {
    console.error('Error fetching home data:', error);
    return { bestsellers: [], categories: [] };
  }
}

export default async function HomePage() {
  const { bestsellers, categories } = await getHomeData();

  // Filter products by oils vs churnas for VedaOils section layout
  const oilProducts = bestsellers.filter(p => p.format === 'Oil' || p.category.includes('Radiance') || p.category.includes('Hair'));
  const herbalFormulations = bestsellers.filter(p => p.format !== 'Oil');

  return (
    <div className="space-y-12 sm:space-y-16 pb-16 bg-[#FAF7F2]">
      {/* 1. Category Navigation Strip */}
      <CategoryNavStrip />

      {/* 2. Full-Width Campaign Carousel Banner + Trust Highlights Row */}
      <HeroSection initialProducts={bestsellers} />

      {/* 3. VedaOils Signature Scalloped Indian Palace Arch Categories */}
      <ArchCategories />

      {/* 4. Section 1: Carrier & Classical Oils */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl sm:text-2xl font-serif font-bold text-[#1A1A1A] tracking-tight">
              Carrier & Classical Oils
            </h2>
            <p className="text-xs sm:text-sm text-[#777] mt-0.5 font-normal">
              100% Pure, Cold-Pressed and Formulated from Classical Texts
            </p>
          </div>
          <Link
            href="/shop?format=Oil"
            className="text-xs sm:text-sm font-medium text-[#1A1A1A] hover:text-[#1F4E34] hover:underline transition-colors shrink-0"
          >
            View all &rarr;
          </Link>
        </div>

        {/* Product Cards Grid: 2 cols on mobile, 3 on tablet, 4 on desktop */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3.5 sm:gap-6">
          {(oilProducts.length > 0 ? oilProducts : bestsellers.slice(0, 4)).map(product => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      </section>

      {/* 5. Section 2: Classical Churnas & Rasayanas */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl sm:text-2xl font-serif font-bold text-[#1A1A1A] tracking-tight">
              Herbal Churnas & Medicines
            </h2>
            <p className="text-xs sm:text-sm text-[#777] mt-0.5 font-normal">
              Ancient Charaka Samhita Formulas Prepared with Active Botanicals
            </p>
          </div>
          <Link
            href="/shop"
            className="text-xs sm:text-sm font-medium text-[#1A1A1A] hover:text-[#1F4E34] hover:underline transition-colors shrink-0"
          >
            View all &rarr;
          </Link>
        </div>

        {/* Product Cards Grid: 2 cols on mobile, 3 on tablet, 4 on desktop */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3.5 sm:gap-6">
          {(herbalFormulations.length > 0 ? herbalFormulations : bestsellers).map(product => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      </section>

      {/* 6. Shop by Wellness Concern (Interactive Carousel) */}
      <WellnessConcernCarousel />

      {/* 9. Verified Customer Experiences */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-10">
          <span className="text-[11px] font-bold tracking-widest uppercase text-[#C59B27]">
            Verified Customer Reviews
          </span>
          <h2 className="section-title font-serif font-bold text-[#2C1D11] mt-1">
            Words of Trust from Our Customers
          </h2>
          <p className="body-text text-[#666] mt-2 max-w-lg mx-auto">
            Honest experiences from seekers of classical healing across India
          </p>
        </div>

        {/* Responsive Review Cards: Swipe Carousel on Mobile, Balanced 3-Col Grid on Desktop */}
        <div className="flex md:grid md:grid-cols-3 overflow-x-auto md:overflow-visible snap-x snap-mandatory gap-4 sm:gap-6 pb-4 md:pb-0 -mx-4 px-4 sm:mx-0 sm:px-0 no-scrollbar">
          {/* Card 1: Kumkumadi */}
          <div className="w-[85vw] max-w-[340px] md:w-auto snap-center shrink-0 bg-white p-5 sm:p-6 rounded-2xl border border-[#EAE5DC] shadow-2xs hover:shadow-md transition-all flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-1 text-[#E5A823]">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-[#E5A823]" />
                  ))}
                </div>
                <span className="text-[10px] text-[#888] font-medium">3 weeks ago</span>
              </div>
              <Quote className="w-6 h-6 text-[#C59B27]/40 mb-2" />
              <p className="review-text text-[#333] italic leading-relaxed">
                &quot;The Kumkumadi Tailam is sublime. Within three weeks of nighttime use, my stubborn pigmentation faded significantly, and my skin has a genuine inner radiance that chemical serums never gave me.&quot;
              </p>
            </div>
            <div className="mt-5 pt-4 border-t border-[#F0ECE4] flex items-center justify-between gap-2">
              <div className="flex items-center gap-2.5 min-w-0">
                <div className="w-8 h-8 rounded-full bg-[#1F4E34]/10 text-[#1F4E34] font-bold text-xs flex items-center justify-center shrink-0 border border-[#1F4E34]/20">
                  MN
                </div>
                <div className="min-w-0">
                  <h4 className="text-xs font-bold text-[#1A1A1A] truncate">Meera Nambiar</h4>
                  <p className="text-[10px] text-[#777] truncate">Verified Buyer • Kochi, Kerala</p>
                </div>
              </div>
              <span className="text-[9px] sm:text-[10px] bg-[#FAF7F2] text-[#1F4E34] font-bold px-2 py-0.5 rounded border border-[#EAE5DC] shrink-0">
                Kumkumadi Tailam
              </span>
            </div>
          </div>

          {/* Card 2: Ashwagandha */}
          <div className="w-[85vw] max-w-[340px] md:w-auto snap-center shrink-0 bg-white p-5 sm:p-6 rounded-2xl border border-[#EAE5DC] shadow-2xs hover:shadow-md transition-all flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-1 text-[#E5A823]">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-[#E5A823]" />
                  ))}
                </div>
                <span className="text-[10px] text-[#888] font-medium">1 month ago</span>
              </div>
              <Quote className="w-6 h-6 text-[#C59B27]/40 mb-2" />
              <p className="review-text text-[#333] italic leading-relaxed">
                &quot;As a corporate consultant dealing with high cortisol, the Ashwagandha KSM-66 capsules have revolutionized my evening unwinding. Deep, restorative sleep without any morning grogginess.&quot;
              </p>
            </div>
            <div className="mt-5 pt-4 border-t border-[#F0ECE4] flex items-center justify-between gap-2">
              <div className="flex items-center gap-2.5 min-w-0">
                <div className="w-8 h-8 rounded-full bg-[#1F4E34]/10 text-[#1F4E34] font-bold text-xs flex items-center justify-center shrink-0 border border-[#1F4E34]/20">
                  VS
                </div>
                <div className="min-w-0">
                  <h4 className="text-xs font-bold text-[#1A1A1A] truncate">Vikram Singhania</h4>
                  <p className="text-[10px] text-[#777] truncate">Verified Buyer • Gurgaon, Haryana</p>
                </div>
              </div>
              <span className="text-[9px] sm:text-[10px] bg-[#FAF7F2] text-[#1F4E34] font-bold px-2 py-0.5 rounded border border-[#EAE5DC] shrink-0">
                Ashwagandha KSM-66
              </span>
            </div>
          </div>

          {/* Card 3: Triphala */}
          <div className="w-[85vw] max-w-[340px] md:w-auto snap-center shrink-0 bg-white p-5 sm:p-6 rounded-2xl border border-[#EAE5DC] shadow-2xs hover:shadow-md transition-all flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-1 text-[#E5A823]">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-[#E5A823]" />
                  ))}
                </div>
                <span className="text-[10px] text-[#888] font-medium">2 weeks ago</span>
              </div>
              <Quote className="w-6 h-6 text-[#C59B27]/40 mb-2" />
              <p className="review-text text-[#333] italic leading-relaxed">
                &quot;The Triphala churna is pure stone-ground quality. The taste is authentic and it gently normalized my digestion after years of chronic gut distress. Unmatched authenticity.&quot;
              </p>
            </div>
            <div className="mt-5 pt-4 border-t border-[#F0ECE4] flex items-center justify-between gap-2">
              <div className="flex items-center gap-2.5 min-w-0">
                <div className="w-8 h-8 rounded-full bg-[#1F4E34]/10 text-[#1F4E34] font-bold text-xs flex items-center justify-center shrink-0 border border-[#1F4E34]/20">
                  AR
                </div>
                <div className="min-w-0">
                  <h4 className="text-xs font-bold text-[#1A1A1A] truncate">Dr. Ananya Roy</h4>
                  <p className="text-[10px] text-[#777] truncate">Verified Buyer • Kolkata, West Bengal</p>
                </div>
              </div>
              <span className="text-[9px] sm:text-[10px] bg-[#FAF7F2] text-[#1F4E34] font-bold px-2 py-0.5 rounded border border-[#EAE5DC] shrink-0">
                Triphala Churna
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* 10. Commercial B2B Wholesale & Bulk Supply Feature */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-[#2C1D11] to-[#452C1C] text-white rounded-3xl p-6 sm:p-10 shadow-lg relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            <div className="lg:col-span-8 space-y-3">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold tracking-widest uppercase bg-[#C59B27] text-black">
                <Building2 className="w-3.5 h-3.5" /> Commercial B2B & Wholesale Supply
              </span>
              <h3 className="text-2xl sm:text-4xl font-serif font-bold text-white leading-tight">
                Direct-From-Dispensary Wholesale Classical Oils & Botanicals
              </h3>
              <p className="text-xs sm:text-sm text-[#E5D5BA] max-w-2xl font-light leading-relaxed">
                Supplying premier Ayurvedic resort spas, holistic clinics, cosmetic formulators, and wellness retailers with lab-tested raw tailams, unrefined oils, and standardized herbal churnas. Batch COA & GC/MS reports provided.
              </p>
              <div className="flex flex-wrap gap-4 pt-1 text-xs text-white/90 font-medium">
                <span className="flex items-center gap-1.5">
                  <FileCheck2 className="w-4 h-4 text-[#C59B27]" /> Batch-Wise COA & Lab Reports
                </span>
                <span className="flex items-center gap-1.5">
                  <Truck className="w-4 h-4 text-[#C59B27]" /> Pan-India Express Freight & Pallet Dispatches
                </span>
              </div>
            </div>

            <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-3 justify-center">
              <Link
                href="/bulk-orders"
                className="px-6 py-3.5 bg-[#C59B27] hover:bg-[#A67C1E] text-black text-xs sm:text-sm font-bold rounded-full shadow-md transition-all text-center flex items-center justify-center gap-2"
              >
                <span>Request Wholesale Quotation</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <a
                href="tel:+917561836584"
                className="px-6 py-3 bg-white/10 hover:bg-white/20 border border-white/20 text-white text-xs font-semibold rounded-full transition-colors text-center"
              >
                Call B2B Desk: +91 75618 36584
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
