'use client';

import React, { useState } from 'react';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import { MessageCircle, Phone, X, ShieldCheck } from 'lucide-react';

export const FloatingVaidyaButton: React.FC = () => {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  // If on checkout or admin page, do not render to avoid distraction
  if (pathname?.startsWith('/checkout') || pathname?.startsWith('/admin')) {
    return null;
  }

  const whatsappUrl = `https://wa.me/917561836584?text=${encodeURIComponent(
    'Namaste Axmin Prana, I would like personal Ayurvedic wellness guidance regarding classical formulations.'
  )}`;

  return (
    <div className="fixed bottom-16 sm:bottom-6 right-3 sm:right-6 z-40 transition-all duration-300">
      {/* Popover Card (Matching VedaOils "Find out the right product for you" Modal) */}
      {isOpen && (
        <div className="mb-3 w-72 sm:w-80 bg-white rounded-3xl border border-[#EAE5DC] shadow-2xl p-5 text-[#1A1A1A] animate-in fade-in slide-in-from-bottom-2 duration-200">
          <div className="flex items-center justify-between pb-2 border-b border-[#F0ECE4]">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-[10px] font-bold text-[#1F4E34] uppercase tracking-wider">
                Vaidya Available Online
              </span>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-[#888] hover:text-black p-1 rounded-md"
              aria-label="Close consultation modal"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="py-3 text-center space-y-2">
            <div className="w-14 h-14 rounded-full overflow-hidden mx-auto border-2 border-[#C59B27] shadow-sm relative">
              <Image
                src="https://images.unsplash.com/photo-1594824813576-905164eb3c30?auto=format&fit=crop&w=150&q=80"
                alt="Ayurvedic Doctor Consultation"
                fill
                className="object-cover"
              />
            </div>
            <h4 className="text-base font-serif font-bold text-[#2C1D11]">
              Find out the right formulation for you.
            </h4>
            <p className="text-xs text-[#666] leading-relaxed">
              We have a wide range of classical Ayurvedic oils and churnas for your every wellness goal!
            </p>
          </div>

          <div className="space-y-2 pt-1">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3 px-4 bg-[#1F4E34] hover:bg-[#163A28] text-white text-xs font-bold rounded-full flex items-center justify-center gap-2 shadow-md transition-all"
            >
              <MessageCircle className="w-4 h-4 fill-white text-white" />
              <span>Talk Now (WhatsApp)</span>
            </a>

            <a
              href="tel:+917561836584"
              className="w-full py-2.5 px-4 bg-[#FAF7F2] hover:bg-[#EAE5DC] text-[#2C1D11] text-xs font-bold rounded-full flex items-center justify-center gap-2 border border-[#EAE5DC] transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-[#C59B27]" />
              <span>Call +91 75618 36584</span>
            </a>
          </div>

          <div className="mt-3 pt-2 border-t border-[#F0ECE4] flex items-center justify-between text-[10px] text-[#777]">
            <span className="flex items-center gap-1 text-[#1F4E34] font-semibold">
              <ShieldCheck className="w-3 h-3 text-[#1F4E34]" /> AYUSH Certified
            </span>
            <span>Free Guidance</span>
          </div>
        </div>
      )}

      {/* VedaOils Avatar Trigger with Glowing Green Online Indicator */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="group relative flex items-center gap-2.5 p-1 sm:px-4 sm:py-2.5 bg-white text-[#2C1D11] rounded-full shadow-xl border-2 border-[#1F4E34]/40 hover:border-[#1F4E34] transition-all hover:scale-105 active:scale-95"
        aria-label="Open Ayurvedic Vaidya Consultation"
      >
        <div className="relative w-11 h-11 rounded-full overflow-hidden border-2 border-white shadow-xs shrink-0">
          <Image
            src="https://images.unsplash.com/photo-1594824813576-905164eb3c30?auto=format&fit=crop&w=150&q=80"
            alt="Ayurveda Vaidya"
            fill
            className="object-cover"
          />
          <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-emerald-500 border-2 border-white animate-pulse" />
        </div>

        <span className="hidden sm:flex flex-col text-left pr-1 leading-tight">
          <span className="text-[10px] text-[#C59B27] font-bold uppercase tracking-wider">Free Consultation</span>
          <span className="text-xs font-extrabold text-[#1F4E34]">Ask a Vaidya</span>
        </span>
      </button>
    </div>
  );
};
