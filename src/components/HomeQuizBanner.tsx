'use client';

import React from 'react';
import { Sparkles, ArrowRight, Wind, Flame, Mountain, Compass } from 'lucide-react';
import { useQuiz } from '../context/QuizContext';

export const HomeQuizBanner: React.FC = () => {
  const { openQuiz } = useQuiz();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#214E34] via-[#1a422c] to-[#123021] text-white p-6 sm:p-10 shadow-xl border border-amber-500/30">
        {/* Subtle Decorative Background Rings */}
        <div className="absolute -right-12 -top-12 w-64 h-64 rounded-full bg-white/5 blur-2xl pointer-events-none" />
        <div className="absolute -left-12 -bottom-12 w-64 h-64 rounded-full bg-[#B86F4B]/15 blur-2xl pointer-events-none" />

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-8 space-y-3.5 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-xs border border-amber-300/30 text-amber-200 text-[11px] font-bold tracking-wider uppercase">
              <Compass className="w-3.5 h-3.5 text-amber-300" />
              <span>Personalized Ayurvedic Consultation</span>
            </div>

            <h3 className="text-2xl sm:text-4xl font-serif-brand font-bold leading-tight">
              Unsure of Your Dosha? <br className="hidden sm:inline" />
              <span className="text-amber-200 font-normal italic">
                Take the 60-Second Classical Prakriti Assessment
              </span>
            </h3>

            <p className="text-xs sm:text-sm text-[#DDE7D9]/90 max-w-2xl leading-relaxed">
              Every person is born with a unique proportion of Vata (Air), Pitta (Fire), and Kapha (Earth). Discover which energies dominate your constitution and receive personalized classical formulas for deep restorative sleep, skin glow, and digestive balance.
            </p>

            {/* Micro badges */}
            <div className="pt-2 flex flex-wrap items-center justify-center lg:justify-start gap-4 text-xs text-[#DDE7D9]/80 font-medium">
              <span className="flex items-center gap-1.5">
                <Wind className="w-3.5 h-3.5 text-amber-300" /> Vata
              </span>
              <span>•</span>
              <span className="flex items-center gap-1.5">
                <Flame className="w-3.5 h-3.5 text-amber-300" /> Pitta
              </span>
              <span>•</span>
              <span className="flex items-center gap-1.5">
                <Mountain className="w-3.5 h-3.5 text-amber-300" /> Kapha
              </span>
              <span>•</span>
              <span className="text-amber-200 font-semibold">100% Free & Instant</span>
            </div>
          </div>

          <div className="lg:col-span-4 flex flex-col items-center lg:items-end justify-center">
            <button
              onClick={openQuiz}
              className="group px-8 py-4 bg-gradient-to-r from-[#B86F4B] to-[#cf825c] hover:from-[#a05e3d] hover:to-[#B86F4B] text-white text-xs sm:text-sm font-bold rounded-2xl shadow-xl border border-amber-300/40 hover:border-amber-300 transition-all hover:scale-105 active:scale-95 flex items-center gap-2.5"
            >
              <Sparkles className="w-4 h-4 text-amber-200" />
              <span>Start Prakriti Diagnostic</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
            <span className="text-[11px] text-[#DDE7D9]/60 mt-2 text-center lg:text-right">
              Takes less than 1 minute • No sign-up required
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
