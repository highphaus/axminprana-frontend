'use client';

import React, { useState } from 'react';
import { usePathname } from 'next/navigation';
import { MessageCircle, Phone, X, Sparkles, ShieldCheck } from 'lucide-react';

export const FloatingVaidyaButton: React.FC = () => {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  // If on checkout or admin page, do not render to avoid distraction
  if (pathname?.startsWith('/checkout') || pathname?.startsWith('/admin')) {
    return null;
  }

  // On product detail page, position higher so it doesn't collide with the mobile sticky ATC bar
  const isProductPage = pathname?.startsWith('/product/');
  const positionClasses = isProductPage
    ? 'bottom-20 lg:bottom-6 right-4 sm:right-6'
    : 'bottom-5 right-4 sm:right-6';

  const whatsappUrl = `https://wa.me/917561836584?text=${encodeURIComponent(
    'Namaste Axmin Prana, I would like personal Ayurvedic wellness guidance regarding classical formulations.'
  )}`;

  return (
    <div className={`fixed ${positionClasses} z-40 transition-all duration-300`}>
      {/* Popover Card */}
      {isOpen && (
        <div className="mb-3 w-72 sm:w-80 bg-white rounded-2xl border border-[#214E34]/20 shadow-2xl p-4 text-[#202820] animate-in fade-in slide-in-from-bottom-2 duration-200">
          <div className="flex items-center justify-between pb-2 border-b border-[#E5E8E0]">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-green-600 animate-pulse" />
              <span className="text-xs font-bold text-[#214E34] uppercase tracking-wider">
                Certified Ayurvedic Panel
              </span>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-[#687168] hover:text-[#202820] p-1 rounded-md"
              aria-label="Close consultation modal"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="py-3 space-y-2">
            <h4 className="text-sm font-serif-brand font-bold text-[#214E34]">
              Speak with a BAMS Vaidya
            </h4>
            <p className="text-xs text-[#687168] leading-relaxed">
              Have questions about your Dosha, classical anupana, or dosage? Our clinical physicians in Haridwar offer complimentary wellness consultations.
            </p>
          </div>

          <div className="space-y-2 pt-1">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-2.5 px-3 bg-[#25D366] hover:bg-[#20ba59] text-white text-xs font-bold rounded-lg flex items-center justify-center gap-2 shadow-sm transition-all"
            >
              <MessageCircle className="w-4 h-4 fill-white text-white" />
              <span>Chat on WhatsApp (+91 75618 36584)</span>
            </a>

            <a
              href="tel:+917561836584"
              className="w-full py-2 px-3 bg-[#FAF8F1] hover:bg-[#DDE7D9] text-[#214E34] text-xs font-semibold rounded-lg flex items-center justify-center gap-2 border border-[#E5E8E0] transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-[#B86F4B]" />
              <span>Call Helpline Directly</span>
            </a>
          </div>

          <div className="mt-3 pt-2 border-t border-[#E5E8E0] flex items-center justify-between text-[10px] text-[#687168]">
            <span className="flex items-center gap-1 text-[#214E34] font-medium">
              <ShieldCheck className="w-3 h-3 text-[#214E34]" /> AYUSH Licensed
            </span>
            <span>Mon–Sat: 9 AM–6 PM IST</span>
          </div>
        </div>
      )}

      {/* Trigger Pill Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="group flex items-center gap-2 px-4 py-2.5 sm:py-3 bg-[#214E34] hover:bg-[#163A28] text-white rounded-full shadow-xl border border-amber-400/40 hover:border-amber-400 transition-all hover:scale-105 active:scale-95"
        aria-label="Open Ayurvedic Vaidya Consultation"
      >
        <span className="relative flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-[#B86F4B]"></span>
        </span>
        <MessageCircle className="w-4 h-4 text-[#DDE7D9] group-hover:rotate-12 transition-transform" />
        <span className="text-xs font-bold tracking-wide">
          Ask a Vaidya <span className="hidden sm:inline text-amber-200">| Free Consultation</span>
        </span>
      </button>
    </div>
  );
};
