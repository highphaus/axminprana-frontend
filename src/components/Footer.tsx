import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ShieldCheck, Award, Leaf, Sparkles, Phone, Mail, MapPin } from 'lucide-react';
import { InstagramIcon, FacebookIcon } from './SocialIcons';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#163A28] text-[#FAF8F1] pt-12 pb-8 border-t border-[#214E34]">
      {/* 1. Trust & Quality Banner */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-10 border-b border-white/10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 text-center">
          <div className="flex flex-col items-center p-2">
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[#214E34] flex items-center justify-center text-[#DDE7D9] mb-2 shrink-0">
              <Award className="w-4 h-4 sm:w-5 sm:h-5 text-[#B86F4B]" />
            </div>
            <h4 className="text-[11px] sm:text-xs font-bold tracking-wide">AYUSH Certified</h4>
            <p className="text-[10px] sm:text-[11px] text-[#DDE7D9]/80 mt-0.5">Licensed classical Vedic formulations</p>
          </div>

          <div className="flex flex-col items-center p-2">
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[#214E34] flex items-center justify-center text-[#DDE7D9] mb-2 shrink-0">
              <Leaf className="w-4 h-4 sm:w-5 sm:h-5 text-[#B86F4B]" />
            </div>
            <h4 className="text-[11px] sm:text-xs font-bold tracking-wide">100% Plant & Herb Based</h4>
            <p className="text-[10px] sm:text-[11px] text-[#DDE7D9]/80 mt-0.5">Zero synthetic binders or chemicals</p>
          </div>

          <div className="flex flex-col items-center p-2">
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[#214E34] flex items-center justify-center text-[#DDE7D9] mb-2 shrink-0">
              <ShieldCheck className="w-4 h-4 sm:w-5 sm:h-5 text-[#B86F4B]" />
            </div>
            <h4 className="text-[11px] sm:text-xs font-bold tracking-wide">Heavy Metal Tested</h4>
            <p className="text-[10px] sm:text-[11px] text-[#DDE7D9]/80 mt-0.5">Verified clean by NABL accredited labs</p>
          </div>

          <div className="flex flex-col items-center p-2">
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[#214E34] flex items-center justify-center text-[#DDE7D9] mb-2 shrink-0">
              <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-[#B86F4B]" />
            </div>
            <h4 className="text-[11px] sm:text-xs font-bold tracking-wide">Authentic Sourcing</h4>
            <p className="text-[10px] sm:text-[11px] text-[#DDE7D9]/80 mt-0.5">Harvested from Himalayan & Western Ghats</p>
          </div>
        </div>
      </div>

      {/* 2. Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
        {/* Brand Column */}
        <div className="lg:col-span-2 space-y-4">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative w-14 h-14 rounded-full overflow-hidden border border-white/20 bg-[#FAF8F1] shrink-0 group-hover:scale-105 transition-transform">
              <Image
                src="/images/logo.png"
                alt="Axmin Prana Logo"
                width={56}
                height={56}
                className="w-full h-full object-contain"
              />
            </div>
            <div>
              <span className="text-2xl font-serif-brand font-bold tracking-wider text-white">
                AXMIN PRANA
              </span>
              <span className="block text-[9px] tracking-[0.25em] uppercase text-[#B86F4B] font-semibold">
                Pure • Natural • Holistic
              </span>
            </div>
          </Link>
          <p className="text-xs text-[#DDE7D9]/80 leading-relaxed max-w-sm">
            Rooted in the Charaka Samhita and Sushruta traditions. We harmonize millennia of Ayurvedic botanical wisdom with modern pharmaceutical precision and rigorous NABL-certified testing.
          </p>
          <div className="pt-2 space-y-2 text-xs text-[#DDE7D9]/80">
            <div className="flex items-center gap-2">
              <MapPin className="w-3.5 h-3.5 text-[#B86F4B] shrink-0" />
              <span>Haridwar Herbal Hub, Uttarakhand 249401, India</span>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="w-3.5 h-3.5 text-[#B86F4B] shrink-0" />
              <a href="tel:+917561836584" className="hover:text-white transition-colors font-medium">
                +91 75618 36584 (Direct Care Helpline)
              </a>
            </div>
            <div className="flex items-center gap-2">
              <Mail className="w-3.5 h-3.5 text-[#B86F4B] shrink-0" />
              <a href="mailto:axminprana@gmail.com" className="hover:text-white transition-colors">
                axminprana@gmail.com
              </a>
            </div>
          </div>

          {/* Social Presence */}
          <div className="pt-3 flex items-center gap-3">
            <span className="text-[11px] text-[#DDE7D9]/60 uppercase tracking-wider font-semibold">Connect:</span>
            <a
              href="https://www.instagram.com/axmin_prana_?utm_source=ig_web_button_share_sheet&xtok=ZDNlZDc0MzIxNw=="
              target="_blank"
              rel="noopener noreferrer"
              className="w-8 h-8 rounded-full bg-[#214E34] hover:bg-[#E1306C] flex items-center justify-center text-white transition-all transform hover:scale-110 shadow-xs"
              title="Axmin Prana on Instagram"
              aria-label="Instagram"
            >
              <InstagramIcon className="w-4 h-4" />
            </a>
            <a
              href="https://www.facebook.com/profile.php?id=61594779705906"
              target="_blank"
              rel="noopener noreferrer"
              className="w-8 h-8 rounded-full bg-[#214E34] hover:bg-[#1877F2] flex items-center justify-center text-white transition-all transform hover:scale-110 shadow-xs"
              title="Axmin Prana on Facebook"
              aria-label="Facebook"
            >
              <FacebookIcon className="w-4 h-4" />
            </a>
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
