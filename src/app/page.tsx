import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  ArrowRight,
  ShieldCheck,
  Award,
  Leaf,
  Sparkles,
  Compass,
  CheckCircle2,
  Star,
  Quote,
  BookOpen,
  ChevronRight,
  Heart,
  Building2,
  FileCheck2,
  Truck
} from 'lucide-react';
import { IProduct, ICategory, IArticle, API_BASE } from '../lib/api';
import { ProductCard } from '../components/ProductCard';
import { HomeQuizBanner } from '../components/HomeQuizBanner';
import { HeroSection } from '../components/HeroSection';
import { CategoryNavStrip } from '../components/CategoryNavStrip';
import { ArchCategories } from '../components/ArchCategories';

async function getHomeData() {
  try {
    const [bestsellersRes, categoriesRes, articlesRes] = await Promise.all([
      fetch(`${API_BASE}/products/bestsellers`, { next: { revalidate: 60 } }),
      fetch(`${API_BASE}/categories`, { next: { revalidate: 300 } }),
      fetch(`${API_BASE}/articles`, { next: { revalidate: 300 } })
    ]);

    const bestsellersData = await bestsellersRes.json();
    const categoriesData = await categoriesRes.json();
    const articlesData = await articlesRes.json();

    return {
      bestsellers: (bestsellersData.data || []) as IProduct[],
      categories: (categoriesData.data || []) as ICategory[],
      articles: (articlesData.data || []) as IArticle[]
    };
  } catch (error) {
    console.error('Error fetching home data:', error);
    return { bestsellers: [], categories: [], articles: [] };
  }
}

export default async function HomePage() {
  const { bestsellers, categories, articles } = await getHomeData();

  // Filter products by oils vs churnas for VedaOils section layout
  const oilProducts = bestsellers.filter(p => p.format === 'Oil' || p.category.includes('Radiance') || p.category.includes('Hair'));
  const herbalFormulations = bestsellers.filter(p => p.format !== 'Oil');

  const concernCategories = [
    {
      title: 'Skin Glow & Radiance',
      subtitle: 'Pure Kashmiri Saffron & Red Sandalwood',
      image: 'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?auto=format&fit=crop&w=600&q=80',
      link: '/shop?category=Skin%20Radiance%20%26%20Kanti'
    },
    {
      title: 'Hair Fall & Scalp Nourishment',
      subtitle: 'Cold-Pressed Bringadi & Indigofera',
      image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=600&q=80',
      link: '/shop?category=Hair%20Therapy%20%26%20Keshya'
    },
    {
      title: 'Stress Relief & Deep Sleep',
      subtitle: 'Standardized Ashwagandha KSM-66®',
      image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=600&q=80',
      link: '/shop?category=Stress%20%26%20Cognitive%20Health'
    },
    {
      title: 'Digestive Agni & Bio-Detox',
      subtitle: 'Micro-Pulverized Pure Triphala',
      image: 'https://images.unsplash.com/photo-1509358271058-acd22cc93898?auto=format&fit=crop&w=600&q=80',
      link: '/shop?category=Digestive%20%26%20Gut%20Health'
    }
  ];

  return (
    <div className="space-y-12 sm:space-y-16 pb-16 bg-[#FAF7F2]">
      {/* 1. VedaOils Category Navigation Strip (Directly beneath Header & Search) */}
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

      {/* 5. Interactive Dosha Diagnostic Banner */}
      <HomeQuizBanner />

      {/* 6. As Seen In / Media Trust Strip */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl border border-[#EDE8E0] p-6">
          <div className="text-center mb-4">
            <span className="text-[10px] sm:text-xs uppercase tracking-[0.2em] font-medium text-[#888]">
              Featured & Recognized In
            </span>
          </div>
          <div className="flex flex-wrap items-center justify-around gap-6 sm:gap-12 opacity-65 grayscale hover:grayscale-0 transition-all text-[#1A1A1A]">
            <span className="font-serif text-xl sm:text-2xl font-bold tracking-widest">ELLE</span>
            <span className="font-serif text-xl sm:text-2xl font-bold tracking-widest">VOGUE</span>
            <span className="font-serif text-xl sm:text-2xl font-medium tracking-wider">LOKMAT</span>
            <span className="font-sans text-xl sm:text-2xl font-extrabold uppercase tracking-tight">MID-DAY</span>
            <span className="font-serif text-xl sm:text-2xl font-bold tracking-widest">GRAZIA</span>
          </div>
        </div>
      </section>

      {/* 6. Section 2: Classical Churnas & Rasayanas */}
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


      {/* 8. Shop by Wellness Concern */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-6 pb-2 border-b border-[#EAE5DC]">
          <div>
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-serif font-bold text-[#2C1D11] tracking-tight">
              Shop by Wellness Concern — <span className="font-normal text-[#666] text-base sm:text-xl lg:text-2xl">Targeted Holistic Healing</span>
            </h2>
          </div>
          <Link
            href="/shop"
            className="px-4 py-1.5 rounded-full bg-[#F0ECE4] hover:bg-[#E5E0D5] text-[#2C1D11] text-xs font-bold transition-colors shrink-0"
          >
            View all
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {concernCategories.map((item, idx) => (
            <Link
              key={idx}
              href={item.link}
              className="group relative rounded-2xl overflow-hidden shadow-xs border border-[#EAE5DC] aspect-4/3 flex flex-col justify-end p-5 transition-transform hover:-translate-y-1"
            >
              <Image
                src={item.image}
                alt={item.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent" />
              <div className="relative z-10 text-white space-y-1">
                <span className="text-[10px] text-[#E5D5BA] font-medium tracking-wide block uppercase">
                  {item.subtitle}
                </span>
                <h3 className="text-base font-bold font-serif text-white group-hover:text-[#E5D5BA] transition-colors">
                  {item.title}
                </h3>
                <span className="text-xs font-semibold text-[#C59B27] flex items-center gap-1 pt-1">
                  Explore Rituals &rarr;
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

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

      {/* 11. Educational Ayurveda Journal */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-6 pb-2 border-b border-[#EAE5DC]">
          <div>
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-serif font-bold text-[#2C1D11] tracking-tight">
              Ayurveda Health Journal — <span className="font-normal text-[#666] text-base sm:text-xl lg:text-2xl">Vedic Wellness & Guides</span>
            </h2>
          </div>
          <Link
            href="/articles"
            className="px-4 py-1.5 rounded-full bg-[#F0ECE4] hover:bg-[#E5E0D5] text-[#2C1D11] text-xs font-bold transition-colors shrink-0"
          >
            Read all
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {articles.slice(0, 3).map(art => (
            <Link
              key={art._id}
              href={`/articles/${art.slug}`}
              className="group bg-white rounded-2xl border border-[#EAE5DC] overflow-hidden shadow-2xs hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                <div className="relative aspect-16/10 w-full overflow-hidden bg-[#FAF7F2]">
                  <Image
                    src={art.image}
                    alt={art.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <span className="absolute top-3 left-3 bg-[#1F4E34] text-white text-[10px] font-bold px-2.5 py-1 rounded-full shadow-xs">
                    {art.category}
                  </span>
                </div>
                <div className="p-4 sm:p-5">
                  <span className="text-[11px] text-[#777] font-medium">{art.readTime} • By {art.author}</span>
                  <h3 className="text-sm sm:text-base font-bold text-[#1A1A1A] group-hover:text-[#1F4E34] transition-colors mt-1.5 leading-snug">
                    {art.title}
                  </h3>
                  <p className="text-xs text-[#666] mt-2 line-clamp-2 leading-relaxed">
                    {art.excerpt}
                  </p>
                </div>
              </div>
              <div className="px-4 pb-4 sm:px-5 sm:pb-5">
                <span className="text-xs font-bold text-[#C59B27] flex items-center gap-1 group-hover:underline">
                  Read article <ArrowRight className="w-3 h-3" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

    </div>
  );
}
