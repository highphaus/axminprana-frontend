import React from 'react';
import Link from 'next/link';
import { Compass, Sparkles, Wind, Flame, Mountain, ArrowRight } from 'lucide-react';

export const metadata = {
  title: 'Prakriti & Dosha Science | Axmin Prana Ayurveda',
  description: 'Understand Vata, Pitta, and Kapha constitution according to the Charaka Samhita. Personalize your herbal remedies.'
};

export default function EducationPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-12">
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <span className="text-xs font-bold tracking-widest uppercase text-[#B86F4B]">
          Classical Vedic Wisdom
        </span>
        <h1 className="text-3xl sm:text-5xl font-serif-brand font-bold text-[#214E34]">
          The Science of Doshas & Prakriti
        </h1>
        <p className="text-xs sm:text-sm text-[#687168] leading-relaxed">
          In Ayurveda, every individual possesses a distinct elemental composition. Restoring balance to your primary Dosha is the true secret of disease prevention and vibrant vitality.
        </p>
      </div>

      {/* The 3 Doshas Deep Dive */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Vata */}
        <div className="bg-white p-6 rounded-2xl border border-[#E5E8E0] shadow-2xs space-y-4">
          <div className="w-12 h-12 rounded-full bg-[#DDE7D9] flex items-center justify-center text-[#214E34]">
            <Wind className="w-6 h-6 text-[#214E34]" />
          </div>
          <div>
            <span className="text-[10px] uppercase font-bold text-[#687168]">Elements: Air & Ether</span>
            <h3 className="text-xl font-serif-brand font-bold text-[#214E34]">Vata Dosha</h3>
          </div>
          <p className="text-xs text-[#202820] leading-relaxed">
            Governs bodily movement, nerve impulses, breathing, and circulation. When out of balance, Vata manifests as anxiety, insomnia, constipation, dry skin, and joint crepitus.
          </p>
          <div className="p-3 bg-[#FAF8F1] rounded-lg text-xs space-y-1">
            <span className="font-bold text-[#214E34] block">Premier Balancing Herbs:</span>
            <p className="text-[#687168]">Ashwagandha, Shatavari, Sesame Oil, Dashamoola, Warm Spices</p>
          </div>
          <Link
            href="/shop?dosha=Vata"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-[#B86F4B] hover:underline pt-2"
          >
            Explore Vata Formulations <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Pitta */}
        <div className="bg-white p-6 rounded-2xl border border-[#E5E8E0] shadow-2xs space-y-4">
          <div className="w-12 h-12 rounded-full bg-[#FAF8F1] border border-[#B86F4B]/30 flex items-center justify-center text-[#B86F4B]">
            <Flame className="w-6 h-6 text-[#B86F4B]" />
          </div>
          <div>
            <span className="text-[10px] uppercase font-bold text-[#687168]">Elements: Fire & Water</span>
            <h3 className="text-xl font-serif-brand font-bold text-[#214E34]">Pitta Dosha</h3>
          </div>
          <p className="text-xs text-[#202820] leading-relaxed">
            Governs metabolism, enzymatic digestion, cellular transformation, and body temperature. Excess Pitta causes hyperacidity, skin breakouts, hair thinning, and irritability.
          </p>
          <div className="p-3 bg-[#FAF8F1] rounded-lg text-xs space-y-1">
            <span className="font-bold text-[#214E34] block">Premier Balancing Herbs:</span>
            <p className="text-[#687168]">Kumkumadi Tailam, Brahmi, Amalaki, Rose Water, Bringaraj, Neem</p>
          </div>
          <Link
            href="/shop?dosha=Pitta"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-[#B86F4B] hover:underline pt-2"
          >
            Explore Pitta Formulations <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Kapha */}
        <div className="bg-white p-6 rounded-2xl border border-[#E5E8E0] shadow-2xs space-y-4">
          <div className="w-12 h-12 rounded-full bg-[#214E34] text-white flex items-center justify-center">
            <Mountain className="w-6 h-6 text-[#DDE7D9]" />
          </div>
          <div>
            <span className="text-[10px] uppercase font-bold text-[#687168]">Elements: Earth & Water</span>
            <h3 className="text-xl font-serif-brand font-bold text-[#214E34]">Kapha Dosha</h3>
          </div>
          <p className="text-xs text-[#202820] leading-relaxed">
            Provides bodily structure, lubrication, endurance, and immune resilience. Unchecked Kapha produces sluggish metabolism, respiratory congestion, water retention, and lethargy.
          </p>
          <div className="p-3 bg-[#FAF8F1] rounded-lg text-xs space-y-1">
            <span className="font-bold text-[#214E34] block">Premier Balancing Herbs:</span>
            <p className="text-[#687168]">Triphala, Giloy (Guduchi), Ginger, Tulsi, Black Pepper, Guggulu</p>
          </div>
          <Link
            href="/shop?dosha=Kapha"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-[#B86F4B] hover:underline pt-2"
          >
            Explore Kapha Formulations <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>

      {/* Dinacharya Daily Rhythm Guide */}
      <div className="bg-[#FAF8F1] border border-[#E5E8E0] rounded-2xl p-6 sm:p-10 space-y-6">
        <div>
          <span className="text-xs font-bold tracking-widest uppercase text-[#B86F4B]">Daily Routine</span>
          <h2 className="text-2xl sm:text-3xl font-serif-brand font-bold text-[#214E34] mt-1">
            The 4 Pillars of Classical Dinacharya
          </h2>
          <p className="text-xs sm:text-sm text-[#687168] mt-1">
            Synchronize your internal clock with sunrise and sunset to elevate Ojas (vital vigor).
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
          <div className="bg-white p-4 rounded-xl border border-[#E5E8E0] space-y-2">
            <span className="font-bold text-[#B86F4B] block">01 • Brahma Muhurta</span>
            <h4 className="font-bold text-[#214E34]">Awaken Before Sunrise</h4>
            <p className="text-[#687168]">Drink copper-charged lukewarm water (Ushapan) to stimulate peristalsis naturally.</p>
          </div>
          <div className="bg-white p-4 rounded-xl border border-[#E5E8E0] space-y-2">
            <span className="font-bold text-[#B86F4B] block">02 • Jivha Nirlekhana</span>
            <h4 className="font-bold text-[#214E34]">Tongue Scraping & Oil Pulling</h4>
            <p className="text-[#687168]">Scrape tongue gently with pure copper to clear nocturnal toxins and kindle agni.</p>
          </div>
          <div className="bg-white p-4 rounded-xl border border-[#E5E8E0] space-y-2">
            <span className="font-bold text-[#B86F4B] block">03 • Abhyanga</span>
            <h4 className="font-bold text-[#214E34]">Warm Herb Oil Massage</h4>
            <p className="text-[#687168]">Apply warm Bringadi or sesame oil prior to bath to soothe somatic Vata.</p>
          </div>
          <div className="bg-white p-4 rounded-xl border border-[#E5E8E0] space-y-2">
            <span className="font-bold text-[#B86F4B] block">04 • Ahara Samyama</span>
            <h4 className="font-bold text-[#214E34]">Mindful Rasayana Consumption</h4>
            <p className="text-[#687168]">Take Ashwagandha or Triphala with anupana suited to your seasonal state.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
