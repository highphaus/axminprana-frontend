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
  Heart
} from 'lucide-react';
import { IProduct, ICategory, IArticle, API_BASE } from '../lib/api';
import { ProductCard } from '../components/ProductCard';

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

  const concernCategories = [
    {
      title: 'Skin Glow & Radiance',
      subtitle: 'Pure Kashmiri Saffron & Red Sandalwood',
      image: 'https://images.unsplash.com/photo-1608248597359-0091d3d6e5a4?auto=format&fit=crop&w=600&q=80',
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
    <div className="space-y-16 sm:space-y-24 pb-12">
      {/* 1. Hero Section - Inspired by Forest Essentials & Kama Ayurveda */}
      <section className="relative bg-[#163A28] text-white overflow-hidden py-14 sm:py-20 lg:py-24">
        {/* Subtle Luxury Gradient Overlay */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-[#214E34]/80 via-[#163A28] to-[#0f281b]" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#214E34] border border-[#DDE7D9]/20 text-[#DDE7D9] text-[11px] font-semibold tracking-wider uppercase">
              <Sparkles className="w-3.5 h-3.5 text-[#B86F4B]" />
              <span>Classical Ayurvedic Treatise Formulations</span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-serif-brand font-bold tracking-tight leading-[1.12]">
              Ancient Ayurvedic Wisdom. <br />
              <span className="text-[#DDE7D9] font-normal italic">Thoughtfully Made for Today.</span>
            </h1>

            <p className="text-sm sm:text-base text-[#DDE7D9]/85 max-w-xl mx-auto lg:mx-0 leading-relaxed font-normal">
              Discover Ayurvedic products inspired by traditional wellness practices and crafted for your everyday rituals. Standardized full-spectrum botanicals formulated without synthetic fillers.
            </p>

            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-2">
              <Link
                href="/shop"
                className="px-7 py-3.5 bg-[#B86F4B] hover:bg-[#a05e3d] text-white text-xs sm:text-sm font-bold rounded-md shadow-md transition-all flex items-center gap-2"
              >
                Shop All Products <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/about"
                className="px-7 py-3.5 bg-transparent border border-[#DDE7D9]/40 hover:bg-white/10 text-[#FAF8F1] text-xs sm:text-sm font-semibold rounded-md transition-colors"
              >
                Explore Our Story
              </Link>
            </div>

            {/* Trust Highlights */}
            <div className="pt-6 border-t border-white/10 grid grid-cols-3 gap-1.5 sm:gap-4 text-[#DDE7D9] text-left">
              <div className="flex items-center gap-1.5 sm:gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#B86F4B] shrink-0" />
                <span className="text-[10px] sm:text-xs font-medium leading-tight">AYUSH Certified</span>
              </div>
              <div className="flex items-center gap-1.5 sm:gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#B86F4B] shrink-0" />
                <span className="text-[10px] sm:text-xs font-medium leading-tight">100% Plant Active</span>
              </div>
              <div className="flex items-center gap-1.5 sm:gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#B86F4B] shrink-0" />
                <span className="text-[10px] sm:text-xs font-medium leading-tight">NABL Tested</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 relative">
            <div className="relative aspect-4/5 w-full rounded-2xl overflow-hidden shadow-2xl border border-white/10">
              <Image
                src="https://images.unsplash.com/photo-1615485290382-441e4d049cb5?auto=format&fit=crop&w=1000&q=80"
                alt="Ayurvedic herbs and formulations"
                fill
                priority
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-md p-4 rounded-xl text-[#202820] shadow-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-[10px] font-bold tracking-wider text-[#B86F4B] uppercase">Premier Formulation</span>
                    <h4 className="text-xs sm:text-sm font-bold text-[#214E34]">Ashwagandha Supreme KSM-66®</h4>
                    <span className="text-[11px] text-[#687168]">Charaka Samhita Rasayana</span>
                  </div>
                  <div className="text-right">
                    <span className="text-sm font-bold text-[#214E34] block">₹849</span>
                    <span className="text-[10px] text-[#687168] line-through">₹999</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Shop by Category - Curated Ayurveda Catalog Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4 border-b border-[#E5E8E0] pb-4">
          <div>
            <span className="text-xs font-bold tracking-widest uppercase text-[#B86F4B]">Targeted Wellness</span>
            <h2 className="text-2xl sm:text-3xl font-serif-brand font-bold text-[#214E34] mt-1">
              Shop by Category
            </h2>
          </div>
          <Link
            href="/shop"
            className="text-xs font-semibold text-[#214E34] hover:text-[#B86F4B] flex items-center gap-1 transition-colors"
          >
            View all categories <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {categories.map(cat => (
            <Link
              key={cat._id}
              href={`/shop?category=${encodeURIComponent(cat.name)}`}
              className="group bg-white rounded-xl border border-[#E5E8E0] hover:border-[#214E34] hover:shadow-md transition-all p-3 text-center flex flex-col items-center justify-between"
            >
              <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-full overflow-hidden bg-[#FAF8F1] mb-3 border border-[#E5E8E0] group-hover:scale-105 transition-transform">
                <Image
                  src={cat.image}
                  alt={cat.name}
                  fill
                  className="object-cover"
                />
              </div>
              <h3 className="text-xs font-bold text-[#202820] group-hover:text-[#214E34] transition-colors leading-snug">
                {cat.name}
              </h3>
              <p className="text-[10px] text-[#687168] mt-1 font-medium">{cat.doshaAffinity || 'All Doshas'}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* 3. Bestsellers - Desktop Grid + Smooth Mobile Scroll */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4 border-b border-[#E5E8E0] pb-4">
          <div>
            <span className="text-xs font-bold tracking-widest uppercase text-[#B86F4B]">Time-Tested Classical Remedies</span>
            <h2 className="text-2xl sm:text-3xl font-serif-brand font-bold text-[#214E34] mt-1">
              Bestselling Ayurvedic Formulations
            </h2>
          </div>
          <Link
            href="/shop?sort=popularity"
            className="text-xs font-semibold text-[#214E34] hover:text-[#B86F4B] flex items-center gap-1 transition-colors"
          >
            Explore all bestsellers <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Mobile Horizontal Scroller + Desktop Grid */}
        <div className="flex sm:grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3.5 sm:gap-6 overflow-x-auto sm:overflow-visible pb-4 sm:pb-0 no-scrollbar snap-x">
          {bestsellers.map(product => (
            <div key={product._id} className="min-w-[220px] xs:min-w-[260px] sm:min-w-0 snap-start">
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </section>

      {/* 4. Shop by Concern or Use - Inspired by Kama Ayurveda & Forest Essentials */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs font-bold tracking-widest uppercase text-[#B86F4B]">Customized Remedies</span>
          <h2 className="text-2xl sm:text-3xl font-serif-brand font-bold text-[#214E34] mt-1">
            Shop by Wellness Concern
          </h2>
          <p className="text-xs sm:text-sm text-[#687168] mt-2">
            Target your daily routine with classical Ayurvedic herbs tailored to specific bodily systems and doshas.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {concernCategories.map((item, idx) => (
            <Link
              key={idx}
              href={item.link}
              className="group relative rounded-2xl overflow-hidden shadow-sm border border-[#E5E8E0] aspect-4/3 flex flex-col justify-end p-5 transition-transform hover:-translate-y-1"
            >
              <Image
                src={item.image}
                alt={item.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
              <div className="relative z-10 text-white space-y-1">
                <span className="text-[10px] text-[#DDE7D9] font-medium tracking-wide block uppercase">
                  {item.subtitle}
                </span>
                <h3 className="text-base font-bold font-serif-brand text-white group-hover:text-[#DDE7D9] transition-colors">
                  {item.title}
                </h3>
                <span className="text-xs font-semibold text-[#B86F4B] flex items-center gap-1 pt-1">
                  Explore Rituals &rarr;
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 5. Featured Collections Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#DDE7D9]/50 border border-[#214E34]/20 rounded-2xl p-6 sm:p-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-8 space-y-4">
            <span className="text-xs font-bold tracking-widest uppercase text-[#B86F4B]">Classical Ayurvedic Alchemy</span>
            <h3 className="text-2xl sm:text-3xl font-serif-brand font-bold text-[#214E34]">
              Kumkumadi & Bringadi Royal Beauty Rituals
            </h3>
            <p className="text-xs sm:text-sm text-[#202820] max-w-xl leading-relaxed">
              Formulated according to the Ashtanga Hridaya. Each batch of our facial and hair tailams is simmered over woodfire for up to 96 hours in pure copper caldrons with saffron, goat milk, and cold-pressed sesame.
            </p>
            <div className="flex flex-wrap gap-3 pt-2">
              <Link
                href="/product/kumkumadi-radiant-tailam"
                className="px-5 py-2.5 bg-[#214E34] text-white text-xs font-semibold rounded-md hover:bg-[#163A28] shadow-2xs"
              >
                Kumkumadi Radiant Tailam
              </Link>
              <Link
                href="/product/bringadi-hair-therapy-tailam"
                className="px-5 py-2.5 bg-white border border-[#214E34] text-[#214E34] text-xs font-semibold rounded-md hover:bg-[#FAF8F1] shadow-2xs"
              >
                Bringadi Scalp Therapy Tailam
              </Link>
            </div>
          </div>
          <div className="lg:col-span-4 text-center lg:text-right">
            <div className="p-4 bg-white/80 rounded-xl border border-[#214E34]/20 text-center space-y-1">
              <span className="text-[10px] uppercase font-bold text-[#B86F4B]">Special Inaugural Offer</span>
              <p className="text-xs font-bold text-[#202820]">10% Off Your Entire First Order</p>
              <span className="inline-block font-mono text-xs font-bold bg-[#214E34] text-white px-3 py-1 rounded">
                PRANA10
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Brand Story - Kerala & Haridwar Classical Lineage */}
      <section className="bg-[#FAF8F1] border-y border-[#E5E8E0] py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-5">
            <span className="text-xs font-bold tracking-widest uppercase text-[#B86F4B]">Our Vedic Heritage</span>
            <h2 className="text-2xl sm:text-4xl font-serif-brand font-bold text-[#214E34] leading-tight">
              The Unbroken Lineage of Charaka & Sushruta
            </h2>
            <p className="text-xs sm:text-sm text-[#202820] leading-relaxed">
              Every formulation at Axmin Prana is crafted according to strict classical methods (Samskara). We never cut corners with solvent extractions or artificial fragrances. Our oils are simmered for up to 96 hours in pure copper caldrons using wood fire and raw herbs wildcrafted from organic sanctuaries in Uttarakhand and Kerala.
            </p>
            <div className="space-y-3 pt-2 text-xs text-[#202820]">
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#B86F4B] shrink-0 mt-0.5" />
                <span><strong>Ethical Wild-Harvesting:</strong> Sourced sustainably during peak botanical potency seasons (Ritu-Charya).</span>
              </div>
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#B86F4B] shrink-0 mt-0.5" />
                <span><strong>Zero Dilution:</strong> No synthetic silicones, mineral oils, paraffin, or parabens.</span>
              </div>
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#B86F4B] shrink-0 mt-0.5" />
                <span><strong>Government Certified:</strong> Approved under Ministry of AYUSH regulatory frameworks.</span>
              </div>
            </div>
            <div className="pt-3">
              <Link
                href="/about"
                className="inline-flex items-center gap-2 text-xs font-bold text-[#214E34] hover:text-[#B86F4B] transition-colors"
              >
                Read our full formulation manifesto &rarr;
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-4">
              <div className="relative aspect-square rounded-xl overflow-hidden shadow-md border border-[#E5E8E0]">
                <Image
                  src="https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=600&q=80"
                  alt="Ayurveda meditation and balance"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="bg-[#DDE7D9]/80 p-4 rounded-xl text-center">
                <span className="text-2xl font-serif-brand font-bold text-[#214E34]">72-96 Hrs</span>
                <p className="text-[11px] text-[#202820] mt-1 font-medium">Classical copper boiling for cellular bioavailability</p>
              </div>
            </div>
            <div className="space-y-4 pt-8">
              <div className="bg-[#214E34] text-white p-4 rounded-xl text-center">
                <span className="text-2xl font-serif-brand font-bold text-[#FAF8F1]">100%</span>
                <p className="text-[11px] text-[#DDE7D9] mt-1 font-medium">Traceable botanical ingredients from farm to jar</p>
              </div>
              <div className="relative aspect-square rounded-xl overflow-hidden shadow-md border border-[#E5E8E0]">
                <Image
                  src="https://images.unsplash.com/photo-1509358271058-acd22cc93898?auto=format&fit=crop&w=600&q=80"
                  alt="Herbal ingredients"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. Genuine Customer Reviews */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-bold tracking-widest uppercase text-[#B86F4B]">Verified Experiences</span>
          <h2 className="text-2xl sm:text-3xl font-serif-brand font-bold text-[#214E34] mt-1">
            Revered by Over 25,000 Patrons
          </h2>
          <p className="text-xs sm:text-sm text-[#687168] mt-2">
            Real feedback from customers who have transformed their sleep, skin radiance, and digestion through authentic classical Ayurveda.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-xl border border-[#E5E8E0] shadow-2xs flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-1 text-[#B86F4B] mb-3">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-[#B86F4B]" />
                ))}
              </div>
              <Quote className="w-6 h-6 text-[#DDE7D9] mb-2" />
              <p className="text-xs text-[#202820] leading-relaxed italic">
                &quot;The Kumkumadi Tailam is sublime. Within three weeks of nighttime use, my stubborn pigmentation faded significantly, and my skin has a genuine inner radiance that chemical serums never gave me.&quot;
              </p>
            </div>
            <div className="mt-5 pt-4 border-t border-[#E5E8E0] flex items-center justify-between">
              <div>
                <h4 className="text-xs font-bold text-[#202820]">Meera Nambiar</h4>
                <p className="text-[10px] text-[#687168]">Verified Buyer • Kochi, Kerala</p>
              </div>
              <span className="text-[10px] bg-[#DDE7D9] text-[#214E34] font-semibold px-2 py-0.5 rounded">
                Kumkumadi Tailam
              </span>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl border border-[#E5E8E0] shadow-2xs flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-1 text-[#B86F4B] mb-3">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-[#B86F4B]" />
                ))}
              </div>
              <Quote className="w-6 h-6 text-[#DDE7D9] mb-2" />
              <p className="text-xs text-[#202820] leading-relaxed italic">
                &quot;As a corporate consultant dealing with high cortisol, the Ashwagandha KSM-66 capsules have revolutionized my evening unwinding. Deep, restorative sleep without any morning grogginess.&quot;
              </p>
            </div>
            <div className="mt-5 pt-4 border-t border-[#E5E8E0] flex items-center justify-between">
              <div>
                <h4 className="text-xs font-bold text-[#202820]">Vikram Singhania</h4>
                <p className="text-[10px] text-[#687168]">Verified Buyer • Gurgaon, Haryana</p>
              </div>
              <span className="text-[10px] bg-[#DDE7D9] text-[#214E34] font-semibold px-2 py-0.5 rounded">
                Ashwagandha KSM-66
              </span>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl border border-[#E5E8E0] shadow-2xs flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-1 text-[#B86F4B] mb-3">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-[#B86F4B]" />
                ))}
              </div>
              <Quote className="w-6 h-6 text-[#DDE7D9] mb-2" />
              <p className="text-xs text-[#202820] leading-relaxed italic">
                &quot;The Triphala churna is pure stone-ground quality. The taste is authentic (all five rasas present) and it gently normalized my digestion after years of chronic gut distress. Unmatched authenticity.&quot;
              </p>
            </div>
            <div className="mt-5 pt-4 border-t border-[#E5E8E0] flex items-center justify-between">
              <div>
                <h4 className="text-xs font-bold text-[#202820]">Dr. Ananya Roy</h4>
                <p className="text-[10px] text-[#687168]">Verified Buyer • Kolkata, West Bengal</p>
              </div>
              <span className="text-[10px] bg-[#DDE7D9] text-[#214E34] font-semibold px-2 py-0.5 rounded">
                Triphala Churna
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* 8. Educational Ayurveda Journal */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4 border-b border-[#E5E8E0] pb-4">
          <div>
            <span className="text-xs font-bold tracking-widest uppercase text-[#B86F4B]">Vaidya Wisdom</span>
            <h2 className="text-2xl sm:text-3xl font-serif-brand font-bold text-[#214E34] mt-1">
              Ayurveda Health Journal
            </h2>
          </div>
          <Link
            href="/articles"
            className="text-xs font-semibold text-[#214E34] hover:text-[#B86F4B] flex items-center gap-1 transition-colors"
          >
            Read all articles <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {articles.slice(0, 3).map(art => (
            <Link
              key={art._id}
              href={`/articles/${art.slug}`}
              className="group bg-white rounded-xl border border-[#E5E8E0] overflow-hidden shadow-2xs hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                <div className="relative aspect-16/10 w-full overflow-hidden bg-[#FAF8F1]">
                  <Image
                    src={art.image}
                    alt={art.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <span className="absolute top-3 left-3 bg-[#214E34] text-white text-[10px] font-semibold px-2.5 py-1 rounded shadow-xs">
                    {art.category}
                  </span>
                </div>
                <div className="p-4 sm:p-5">
                  <span className="text-[11px] text-[#687168] font-medium">{art.readTime} • By {art.author}</span>
                  <h3 className="text-sm sm:text-base font-bold text-[#202820] group-hover:text-[#214E34] transition-colors mt-1.5 leading-snug">
                    {art.title}
                  </h3>
                  <p className="text-xs text-[#687168] mt-2 line-clamp-2 leading-relaxed">
                    {art.excerpt}
                  </p>
                </div>
              </div>
              <div className="px-4 pb-4 sm:px-5 sm:pb-5">
                <span className="text-xs font-semibold text-[#B86F4B] flex items-center gap-1 group-hover:underline">
                  Read article <ArrowRight className="w-3 h-3" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 9. Newsletter & Promotional Coupon Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#214E34] text-white rounded-2xl p-6 sm:p-10 lg:p-12 text-center relative overflow-hidden shadow-xl">
          <div className="relative z-10 max-w-2xl mx-auto space-y-4">
            <span className="inline-block bg-[#B86F4B] text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
              Exclusive Vedic Welcome
            </span>
            <h3 className="text-2xl sm:text-4xl font-serif-brand font-bold">
              Receive 10% Off Your First Order
            </h3>
            <p className="text-xs sm:text-sm text-[#DDE7D9] leading-relaxed">
              Use code <strong className="font-mono text-white bg-white/20 px-2 py-0.5 rounded">PRANA10</strong> at checkout. Plus receive our complimentary 28-page Dinacharya Daily Wellness Guide directly in your inbox.
            </p>
            <form className="pt-2 flex flex-col sm:flex-row gap-2 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email address"
                required
                className="flex-1 px-4 py-3 text-base sm:text-xs rounded-md bg-white text-[#202820] focus:outline-none"
              />
              <button
                type="submit"
                className="px-6 py-3 bg-[#B86F4B] hover:bg-[#a05e3d] text-white text-xs font-bold rounded-md transition-colors shrink-0"
              >
                Claim 10% Code
              </button>
            </form>
            <p className="text-[10px] text-[#DDE7D9]/60">
              Zero spam. Unsubscribe at any time. We respect your constitutional privacy.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
