import React from 'react';
import Link from 'next/link';
import { ShieldCheck, Award, Leaf, Sparkles, Phone, Mail, MapPin } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#163A28] text-[#FAF8F1] pt-12 pb-8 border-t border-[#214E34]">
      {/* 1. Trust & Quality Banner */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-10 border-b border-white/10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div className="flex flex-col items-center">
            <div className="w-10 h-10 rounded-full bg-[#214E34] flex items-center justify-center text-[#DDE7D9] mb-2">
              <Award className="w-5 h-5 text-[#B86F4B]" />
            </div>
            <h4 className="text-xs font-bold tracking-wide">AYUSH Certified</h4>
            <p className="text-[11px] text-[#DDE7D9]/80 mt-0.5">Licensed classical Vedic formulations</p>
          </div>

          <div className="flex flex-col items-center">
            <div className="w-10 h-10 rounded-full bg-[#214E34] flex items-center justify-center text-[#DDE7D9] mb-2">
              <Leaf className="w-5 h-5 text-[#B86F4B]" />
            </div>
            <h4 className="text-xs font-bold tracking-wide">100% Plant & Herb Based</h4>
            <p className="text-[11px] text-[#DDE7D9]/80 mt-0.5">Zero synthetic binders or chemicals</p>
          </div>

          <div className="flex flex-col items-center">
            <div className="w-10 h-10 rounded-full bg-[#214E34] flex items-center justify-center text-[#DDE7D9] mb-2">
              <ShieldCheck className="w-5 h-5 text-[#B86F4B]" />
            </div>
            <h4 className="text-xs font-bold tracking-wide">Heavy Metal Tested</h4>
            <p className="text-[11px] text-[#DDE7D9]/80 mt-0.5">Verified clean by NABL accredited labs</p>
          </div>

          <div className="flex flex-col items-center">
            <div className="w-10 h-10 rounded-full bg-[#214E34] flex items-center justify-center text-[#DDE7D9] mb-2">
              <Sparkles className="w-5 h-5 text-[#B86F4B]" />
            </div>
            <h4 className="text-xs font-bold tracking-wide">Authentic Sourcing</h4>
            <p className="text-[11px] text-[#DDE7D9]/80 mt-0.5">Harvested from Himalayan & Western Ghats</p>
          </div>
        </div>
      </div>

      {/* 2. Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
        {/* Brand Column */}
        <div className="lg:col-span-2 space-y-4">
          <Link href="/" className="inline-block">
            <span className="text-2xl font-serif-brand font-bold tracking-wider text-white">
              AXMIN PRANA
            </span>
            <span className="block text-[10px] tracking-[0.25em] uppercase text-[#B86F4B] font-semibold">
              Vedic Heritage & Wellness
            </span>
          </Link>
          <p className="text-xs text-[#DDE7D9]/80 leading-relaxed max-w-sm">
            Rooted in the Charaka Samhita and Sushruta traditions. We harmonize millennia of Ayurvedic botanical wisdom with modern pharmaceutical precision and rigorous NABL-certified testing.
          </p>
          <div className="pt-2 space-y-1.5 text-xs text-[#DDE7D9]/70">
            <div className="flex items-center gap-2">
              <MapPin className="w-3.5 h-3.5 text-[#B86F4B]" />
              <span>Haridwar Herbal Hub, Uttarakhand 249401, India</span>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="w-3.5 h-3.5 text-[#B86F4B]" />
              <span>+91 1800-209-VEDA (Toll Free, 9 AM - 6 PM IST)</span>
            </div>
            <div className="flex items-center gap-2">
              <Mail className="w-3.5 h-3.5 text-[#B86F4B]" />
              <span>care@axminprana.com</span>
            </div>
          </div>
          <p className="text-[10px] text-[#DDE7D9]/50">
            Govt. of India AYUSH License: AYU/DL/IND-2024-8841 | GSTIN: 07AAACA1234F1Z8
          </p>
        </div>

        {/* Formulations Column */}
        <div>
          <h4 className="text-xs font-bold uppercase tracking-wider text-[#FAF8F1] mb-3">
            Formulations
          </h4>
          <ul className="space-y-2 text-xs text-[#DDE7D9]/80">
            <li><Link href="/shop?category=Immunity%20%26%20Rasayana" className="hover:text-white transition-colors">Immunity & Rasayana</Link></li>
            <li><Link href="/shop?category=Stress%20%26%20Cognitive%20Health" className="hover:text-white transition-colors">Stress & Sleep (Ashwagandha)</Link></li>
            <li><Link href="/shop?category=Skin%20Radiance%20%26%20Kanti" className="hover:text-white transition-colors">Skin Radiance (Kumkumadi)</Link></li>
            <li><Link href="/shop?category=Hair%20Therapy%20%26%20Keshya" className="hover:text-white transition-colors">Hair Therapy (Bringadi)</Link></li>
            <li><Link href="/shop?category=Digestive%20%26%20Gut%20Health" className="hover:text-white transition-colors">Gut Health (Triphala)</Link></li>
            <li><Link href="/shop?category=Joint%20Care%20%26%20Sandhi" className="hover:text-white transition-colors">Joint & Muscle Relief</Link></li>
          </ul>
        </div>

        {/* Education & About */}
        <div>
          <h4 className="text-xs font-bold uppercase tracking-wider text-[#FAF8F1] mb-3">
            Ayurveda Science
          </h4>
          <ul className="space-y-2 text-xs text-[#DDE7D9]/80">
            <li><Link href="/education" className="hover:text-white transition-colors">Dosha Prakriti Guide</Link></li>
            <li><Link href="/articles" className="hover:text-white transition-colors">Vedic Wellness Journal</Link></li>
            <li><Link href="/about" className="hover:text-white transition-colors">Heritage & Quality</Link></li>
            <li><Link href="/faqs" className="hover:text-white transition-colors">Frequently Asked Questions</Link></li>
            <li><Link href="/contact" className="hover:text-white transition-colors">Contact Our Vaidyas</Link></li>
          </ul>
        </div>

        {/* Customer Care & Policies */}
        <div>
          <h4 className="text-xs font-bold uppercase tracking-wider text-[#FAF8F1] mb-3">
            Policies & Care
          </h4>
          <ul className="space-y-2 text-xs text-[#DDE7D9]/80">
            <li><Link href="/track-order" className="hover:text-white transition-colors">Track Your Order</Link></li>
            <li><Link href="/policies/shipping" className="hover:text-white transition-colors">Shipping Policy (Pan-India)</Link></li>
            <li><Link href="/policies/returns" className="hover:text-white transition-colors">Return & Refund Policy</Link></li>
            <li><Link href="/policies/cancellation" className="hover:text-white transition-colors">Order Cancellation</Link></li>
            <li><Link href="/policies/privacy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
            <li><Link href="/policies/terms" className="hover:text-white transition-colors">Terms of Service</Link></li>
          </ul>
        </div>
      </div>

      {/* 3. Bottom Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-[#DDE7D9]/60">
        <p>© {new Date().getFullYear()} Axmin Prana Ayurveda Pvt. Ltd. All rights reserved.</p>
        <div className="flex items-center gap-3">
          <span className="bg-[#214E34] px-2.5 py-1 rounded text-white text-[10px] font-semibold">
            INR (₹) Accepted
          </span>
          <span className="text-[10px] text-[#DDE7D9]/80">
            UPI • NetBanking • Credit/Debit Cards • Cash on Delivery
          </span>
        </div>
      </div>
    </footer>
  );
};
