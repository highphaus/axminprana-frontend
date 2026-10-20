'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ShieldCheck, Award, Leaf, Sparkles, Phone, Mail, MapPin, CheckCircle2, Lock, ArrowRight } from 'lucide-react';
import { InstagramIcon, FacebookIcon } from './SocialIcons';

export const Footer: React.FC = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 5000);
    }
  };

  return (
    <footer className="bg-[#24170D] text-[#FAF7F2] pt-10 sm:pt-14 pb-24 sm:pb-10 border-t border-[#3D2717]">
      {/* 1. Trust & Quality Banner (Fits Screen Horizontally on All Devices) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8 sm:pb-10 border-b border-white/10">
        <div className="grid grid-cols-4 gap-1.5 sm:gap-4 lg:gap-6 items-center text-center sm:text-left">
          {/* Badge 1: AYUSH Certified */}
          <div className="flex flex-col sm:flex-row items-center gap-1 sm:gap-3 p-1.5 sm:p-2.5 rounded-xl bg-white/[0.04] sm:bg-transparent border border-white/10 sm:border-0 min-w-0">
            <div className="w-7 h-7 sm:w-10 sm:h-10 rounded-full bg-[#1F4E34] flex items-center justify-center text-[#DDE7D9] shrink-0 border border-white/10 shadow-xs">
              <Award className="w-3.5 h-3.5 sm:w-5 sm:h-5 text-[#C59B27]" />
            </div>
            <div className="min-w-0">
              <h4 className="text-[10px] sm:text-sm font-bold tracking-wide text-white leading-tight truncate">
                AYUSH
              </h4>
              <p className="text-[8px] sm:text-[11px] text-[#DDE7D9]/75 mt-0.5 leading-tight truncate">
                <span className="hidden sm:inline">Licensed Classical Formulations</span>
                <span className="sm:hidden">Certified</span>
              </p>
            </div>
          </div>

          {/* Badge 2: 100% Plant Based */}
          <div className="flex flex-col sm:flex-row items-center gap-1 sm:gap-3 p-1.5 sm:p-2.5 rounded-xl bg-white/[0.04] sm:bg-transparent border border-white/10 sm:border-0 min-w-0">
            <div className="w-7 h-7 sm:w-10 sm:h-10 rounded-full bg-[#1F4E34] flex items-center justify-center text-[#DDE7D9] shrink-0 border border-white/10 shadow-xs">
              <Leaf className="w-3.5 h-3.5 sm:w-5 sm:h-5 text-[#C59B27]" />
            </div>
            <div className="min-w-0">
              <h4 className="text-[10px] sm:text-sm font-bold tracking-wide text-white leading-tight truncate">
                100% Plant
              </h4>
              <p className="text-[8px] sm:text-[11px] text-[#DDE7D9]/75 mt-0.5 leading-tight truncate">
                <span className="hidden sm:inline">Zero Synthetic Chemicals</span>
                <span className="sm:hidden">Pure Herbs</span>
              </p>
            </div>
          </div>

          {/* Badge 3: Heavy Metal Tested */}
          <div className="flex flex-col sm:flex-row items-center gap-1 sm:gap-3 p-1.5 sm:p-2.5 rounded-xl bg-white/[0.04] sm:bg-transparent border border-white/10 sm:border-0 min-w-0">
            <div className="w-7 h-7 sm:w-10 sm:h-10 rounded-full bg-[#1F4E34] flex items-center justify-center text-[#DDE7D9] shrink-0 border border-white/10 shadow-xs">
              <ShieldCheck className="w-3.5 h-3.5 sm:w-5 sm:h-5 text-[#C59B27]" />
            </div>
            <div className="min-w-0">
              <h4 className="text-[10px] sm:text-sm font-bold tracking-wide text-white leading-tight truncate">
                Heavy Metal
              </h4>
              <p className="text-[8px] sm:text-[11px] text-[#DDE7D9]/75 mt-0.5 leading-tight truncate">
                <span className="hidden sm:inline">NABL Accredited Lab Verified</span>
                <span className="sm:hidden">Tested Clean</span>
              </p>
            </div>
          </div>

          {/* Badge 4: Authentic Sourcing */}
          <div className="flex flex-col sm:flex-row items-center gap-1 sm:gap-3 p-1.5 sm:p-2.5 rounded-xl bg-white/[0.04] sm:bg-transparent border border-white/10 sm:border-0 min-w-0">
            <div className="w-7 h-7 sm:w-10 sm:h-10 rounded-full bg-[#1F4E34] flex items-center justify-center text-[#DDE7D9] shrink-0 border border-white/10 shadow-xs">
              <Sparkles className="w-3.5 h-3.5 sm:w-5 sm:h-5 text-[#C59B27]" />
            </div>
            <div className="min-w-0">
              <h4 className="text-[10px] sm:text-sm font-bold tracking-wide text-white leading-tight truncate">
                Authentic
              </h4>
              <p className="text-[8px] sm:text-[11px] text-[#DDE7D9]/75 mt-0.5 leading-tight truncate">
                <span className="hidden sm:inline">Harvested from Himalayas & Ghats</span>
                <span className="sm:hidden">Wildcrafted</span>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Main Footer Navigation & Brand Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          {/* Brand & Connect Column (5 cols on Desktop) */}
          <div className="lg:col-span-5 space-y-4">
            <Link href="/" className="flex items-center gap-3 group w-fit">
              <div className="relative w-12 h-12 sm:w-14 sm:h-14 rounded-full overflow-hidden border border-white/20 bg-[#FAF8F1] shrink-0 group-hover:scale-105 transition-transform shadow-sm">
                <Image
                  src="/images/logo.png"
                  alt="Axmin Prana Logo"
                  width={56}
                  height={56}
                  className="w-full h-full object-contain"
                />
              </div>
              <div>
                <span className="text-xl sm:text-2xl font-serif-brand font-bold tracking-wider text-white block">
                  AXMIN PRANA
                </span>
                <span className="block text-[8px] sm:text-[9px] tracking-[0.25em] uppercase text-[#C59B27] font-semibold">
                  Pure • Natural • Classical Ayurveda
                </span>
              </div>
            </Link>

            <p className="text-xs text-[#DDE7D9]/80 leading-relaxed max-w-md">
              Rooted in the Charaka Samhita and Sushruta traditions. We harmonize millennia of Ayurvedic botanical wisdom with modern pharmaceutical precision and rigorous NABL-certified purity testing.
            </p>

            {/* Direct Contact Links */}
            <div className="pt-1 space-y-2 text-xs text-[#DDE7D9]/85">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#C59B27] shrink-0 mt-0.5" />
                <span className="leading-snug">Dispensary Hub: Haridwar, Uttarakhand 249401, India</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#C59B27] shrink-0" />
                <a href="tel:+917561836584" className="hover:text-white transition-colors font-medium">
                  +91 75618 36584 (Direct Care Helpline)
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#C59B27] shrink-0" />
                <a href="mailto:axminprana@gmail.com" className="hover:text-white transition-colors">
                  axminprana@gmail.com
                </a>
              </div>
            </div>

            {/* Newsletter Subscription */}
            <div className="pt-2 max-w-md">
              <span className="text-xs font-bold uppercase tracking-wider text-white block mb-1">
                Join The Prana Circle
              </span>
              <p className="text-[11px] text-[#DDE7D9]/70 mb-2 leading-snug">
                Receive authentic seasonal Ritucharya guides, classical formulations & savings.
              </p>
              {subscribed ? (
                <div className="p-2.5 rounded-lg bg-[#1F4E34]/80 border border-[#1F4E34] text-xs text-white flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#C59B27]" />
                  <span>Thank you! Welcome to the Axmin Prana Circle.</span>
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="flex gap-2">
                  <input
                    type="email"
                    required
                    placeholder="Enter email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-xs text-white placeholder-white/40 focus:outline-none focus:border-[#C59B27] flex-1 min-w-0"
                  />
                  <button
                    type="submit"
                    className="bg-[#C59B27] hover:bg-[#A67C1E] text-black font-bold px-4 py-2 rounded-lg text-xs transition-colors shrink-0 flex items-center gap-1.5"
                  >
                    <span>Join</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </form>
              )}
            </div>

            {/* Social Presence */}
            <div className="pt-2 flex items-center gap-3">
              <span className="text-[11px] text-[#DDE7D9]/60 uppercase tracking-wider font-semibold">Connect:</span>
              <a
                href="https://www.instagram.com/axmin_prana_?utm_source=ig_web_button_share_sheet&xtok=ZDNlZDc0MzIxNw=="
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full bg-[#1F4E34] hover:bg-[#E1306C] flex items-center justify-center text-white transition-all transform hover:scale-110 shadow-xs"
                title="Axmin Prana on Instagram"
                aria-label="Instagram"
              >
                <InstagramIcon className="w-4 h-4" />
              </a>
              <a
                href="https://www.facebook.com/profile.php?id=61594779705906"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full bg-[#1F4E34] hover:bg-[#1877F2] flex items-center justify-center text-white transition-all transform hover:scale-110 shadow-xs"
                title="Axmin Prana on Facebook"
                aria-label="Facebook"
              >
                <FacebookIcon className="w-4 h-4" />
              </a>
            </div>

            <p className="text-[10px] text-[#DDE7D9]/50 pt-1">
              Govt. of India AYUSH License: AYU/DL/IND-2024-8841 | GSTIN: 07AAACA1234F1Z8
            </p>
          </div>

          {/* Navigation Links Columns (2 cols on Mobile, 3 cols on Tablet & Desktop) */}
          <div className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-6 sm:gap-8 pt-4 lg:pt-0">
            {/* Column 1: Classical Formulations */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-3 pb-1 border-b border-white/10">
                Formulations
              </h4>
              <ul className="space-y-2.5 text-xs text-[#DDE7D9]/80">
                <li>
                  <Link href="/shop?category=Immunity%20%26%20Rasayana" className="hover:text-white transition-colors block">
                    Immunity & Rasayana
                  </Link>
                </li>
                <li>
                  <Link href="/shop?category=Stress%20%26%20Cognitive%20Health" className="hover:text-white transition-colors block">
                    Stress & Sleep
                  </Link>
                </li>
                <li>
                  <Link href="/shop?category=Skin%20Radiance%20%26%20Kanti" className="hover:text-white transition-colors block">
                    Skin Radiance
                  </Link>
                </li>
                <li>
                  <Link href="/shop?category=Hair%20Therapy%20%26%20Keshya" className="hover:text-white transition-colors block">
                    Hair Therapy
                  </Link>
                </li>
                <li>
                  <Link href="/shop?category=Digestive%20%26%20Gut%20Health" className="hover:text-white transition-colors block">
                    Gut Health (Triphala)
                  </Link>
                </li>
                <li>
                  <Link href="/shop?category=Joint%20Care%20%26%20Sandhi" className="hover:text-white transition-colors block">
                    Joint & Muscle Relief
                  </Link>
                </li>
                <li>
                  <Link href="/shop" className="text-[#C59B27] hover:underline font-semibold block pt-1">
                    All Classical Oils →
                  </Link>
                </li>
              </ul>
            </div>

            {/* Column 2: Ayurveda Science & Heritage */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-3 pb-1 border-b border-white/10">
                Ayurveda Science
              </h4>
              <ul className="space-y-2.5 text-xs text-[#DDE7D9]/80">
                <li>
                  <Link href="/education" className="hover:text-white transition-colors block">
                    Dosha Prakriti Guide
                  </Link>
                </li>
                <li>
                  <Link href="/articles" className="hover:text-white transition-colors block">
                    Vedic Journal
                  </Link>
                </li>
                <li>
                  <Link href="/about" className="hover:text-white transition-colors block">
                    Heritage & Quality
                  </Link>
                </li>
                <li>
                  <Link href="/faqs" className="hover:text-white transition-colors block">
                    Frequently Asked Questions
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="hover:text-white transition-colors block">
                    Contact Our Vaidyas
                  </Link>
                </li>
                <li>
                  <Link href="/bulk-orders" className="text-[#C59B27] hover:text-white font-bold transition-colors block">
                    Wholesale B2B Supply
                  </Link>
                </li>
              </ul>
            </div>

            {/* Column 3: Customer Care & Policies */}
            <div className="col-span-2 sm:col-span-1">
              <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-3 pb-1 border-b border-white/10">
                Policies & Care
              </h4>
              <ul className="grid grid-cols-2 sm:grid-cols-1 gap-2.5 text-xs text-[#DDE7D9]/80">
                <li>
                  <Link href="/track-order" className="hover:text-white transition-colors block">
                    Track Your Order
                  </Link>
                </li>
                <li>
                  <Link href="/policies/shipping" className="hover:text-white transition-colors block">
                    Shipping Policy
                  </Link>
                </li>
                <li>
                  <Link href="/policies/returns" className="hover:text-white transition-colors block">
                    Return & Refund
                  </Link>
                </li>
                <li>
                  <Link href="/policies/cancellation" className="hover:text-white transition-colors block">
                    Cancellation
                  </Link>
                </li>
                <li>
                  <Link href="/policies/privacy" className="hover:text-white transition-colors block">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="/policies/terms" className="hover:text-white transition-colors block">
                    Terms of Service
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Bottom Bar: Copyright & Security Guarantees */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-[#DDE7D9]/60">
        <p className="text-center sm:text-left">
          © {new Date().getFullYear()} Axmin Prana Ayurveda Pvt. Ltd. All rights reserved. Classical Vedic Formulations.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3 text-[10px] text-[#DDE7D9]/80">
          <span className="flex items-center gap-1 text-[#C59B27]">
            <Lock className="w-3 h-3" /> 256-Bit SSL Encrypted
          </span>
          <span className="text-white/20">•</span>
          <span>UPI • Cards • NetBanking • Cash on Delivery</span>
        </div>
      </div>
    </footer>
  );
};
