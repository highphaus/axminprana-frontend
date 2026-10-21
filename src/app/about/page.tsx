import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Award, ShieldCheck, Leaf, Sparkles, CheckCircle2, ArrowRight } from 'lucide-react';

export const metadata = {
  title: 'Our Vedic Heritage & Formulation Manifesto | Axmin Prana',
  description: 'Learn about Axmin Prana Ayurveda, our classical Kerala manufacturing traditions, AYUSH licenses, and wildcrafting practices.'
};

export default function AboutPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-16">
      <div className="max-w-3xl space-y-4">
        <span className="text-xs font-bold tracking-widest uppercase text-[#B86F4B]">
          Authentic Classical Lineage
        </span>
        <h1 className="text-3xl sm:text-5xl font-serif-brand font-bold text-[#214E34] leading-tight">
          Where Ancient Charaka Samhita Traditions Meet Modern Pharmaceutical Rigour
        </h1>
        <p className="text-xs sm:text-sm text-[#687168] leading-relaxed">
          Founded in the heart of Kerala (Kallara, Trivandrum), the cradle of authentic Ayurveda, Axmin Prana was born to rescue classical wellness from modern industrial compromises.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div className="space-y-4 text-xs sm:text-sm text-[#202820] leading-relaxed">
          <p>
            For thousands of years, the masters of the Charaka Samhita, Sushruta Samhita, and Ashtanga Hridaya codified an unbroken science of life. They knew that an herb’s efficacy depends not just on its chemical composition, but on when it was harvested, which soil nourished it, and how it was processed.
          </p>
          <p>
            While commercial mass-market brands substitute genuine cold-pressed sesame tailams with cheap mineral oils and artificial fragrances, Axmin Prana honors classical boiling rituals lasting up to 96 continuous hours in copper vessels.
          </p>
          <div className="pt-2 space-y-2 text-xs">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#214E34]" />
              <span><strong>100% Traceable Botanicals:</strong> Harvested ethically from organic botanical sanctuaries across Kerala and India.</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#214E34]" />
              <span><strong>NABL Laboratory Verified:</strong> Screened for zero heavy metals (Lead, Mercury, Arsenic, Cadmium).</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#214E34]" />
              <span><strong>Standardized Bio-Actives:</strong> Standardized withanolides, curcuminoids, and tannins in every batch.</span>
            </div>
          </div>
        </div>

        <div className="relative aspect-4/3 rounded-2xl overflow-hidden shadow-xl border border-[#E5E8E0]">
          <Image
            src="https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=1000&q=80"
            alt="Ayurvedic preparation and heritage"
            fill
            className="object-cover"
          />
        </div>
      </div>

      {/* Institutional Credentials */}
      <div className="bg-[#FAF8F1] border border-[#E5E8E0] rounded-2xl p-8 sm:p-12 text-center space-y-6">
        <h2 className="text-2xl font-serif-brand font-bold text-[#214E34]">
          Our Uncompromising Production Standards
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-xs text-[#202820]">
          <div className="p-4 bg-white rounded-xl border border-[#E5E8E0]">
            <Award className="w-6 h-6 text-[#B86F4B] mx-auto mb-2" />
            <span className="font-bold block">Ministry of AYUSH</span>
            <span className="text-[11px] text-[#687168]">License: AYU/DL/IND-2024-8841</span>
          </div>
          <div className="p-4 bg-white rounded-xl border border-[#E5E8E0]">
            <ShieldCheck className="w-6 h-6 text-[#B86F4B] mx-auto mb-2" />
            <span className="font-bold block">WHO-GMP Facility</span>
            <span className="text-[11px] text-[#687168]">Certified Cleanroom Processing</span>
          </div>
          <div className="p-4 bg-white rounded-xl border border-[#E5E8E0]">
            <Leaf className="w-6 h-6 text-[#B86F4B] mx-auto mb-2" />
            <span className="font-bold block">Zero Preservatives</span>
            <span className="text-[11px] text-[#687168]">100% Plant & Herb Active</span>
          </div>
          <div className="p-4 bg-white rounded-xl border border-[#E5E8E0]">
            <Sparkles className="w-6 h-6 text-[#B86F4B] mx-auto mb-2" />
            <span className="font-bold block">Cruelty-Free</span>
            <span className="text-[11px] text-[#687168]">Ahimsa Ethical Ethics</span>
          </div>
        </div>
      </div>
    </div>
  );
}
