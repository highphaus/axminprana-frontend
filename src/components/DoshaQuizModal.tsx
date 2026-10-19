'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  X,
  Sparkles,
  Wind,
  Flame,
  Mountain,
  ArrowRight,
  RotateCcw,
  CheckCircle2,
  Leaf,
  ShieldCheck
} from 'lucide-react';
import { useCart } from '../context/CartContext';

interface Question {
  id: number;
  title: string;
  subtitle: string;
  options: {
    label: string;
    description: string;
    dosha: 'Vata' | 'Pitta' | 'Kapha';
  }[];
}

const QUESTIONS: Question[] = [
  {
    id: 1,
    title: 'How does your skin typically feel?',
    subtitle: 'Skin texture reflects internal somatic moisture and metabolic heat.',
    options: [
      {
        label: 'Dry, cool, or prone to roughness',
        description: 'Tends toward dehydration, fine lines, or cracking in winter.',
        dosha: 'Vata'
      },
      {
        label: 'Sensitive, warm, or prone to redness',
        description: 'Prone to breakouts, inflammation, rosacea, or sun sensitivity.',
        dosha: 'Pitta'
      },
      {
        label: 'Smooth, thick, well-hydrated, or oily',
        description: 'Retains moisture easily, slow to wrinkle, occasional congestion.',
        dosha: 'Kapha'
      }
    ]
  },
  {
    id: 2,
    title: 'What is your natural sleep pattern?',
    subtitle: 'Nidra (sleep quality) reveals the balance of your vital air and nervous system.',
    options: [
      {
        label: 'Light, variable, or interrupted',
        description: 'Frequent midnight waking, active dreams, or race of thoughts.',
        dosha: 'Vata'
      },
      {
        label: 'Moderate but sound (6–7 hours)',
        description: 'Wakes up energized and ready to take purposeful action.',
        dosha: 'Pitta'
      },
      {
        label: 'Heavy, deep, and difficult to wake',
        description: 'Loves 8+ hours, occasional sluggishness in the morning.',
        dosha: 'Kapha'
      }
    ]
  },
  {
    id: 3,
    title: 'How is your digestion (Agni)?',
    subtitle: 'The digestive fire dictates toxic buildup (Ama) and systemic vitality.',
    options: [
      {
        label: 'Irregular appetite with bloating or gas',
        description: 'Hunger fluctuates day to day; sensitive gut motility.',
        dosha: 'Vata'
      },
      {
        label: 'Sharp, intense hunger; cannot skip meals',
        description: 'Prone to hyperacidity, heartburn, or quick irritability if hungry.',
        dosha: 'Pitta'
      },
      {
        label: 'Slow, steady appetite; feeling heavy after meals',
        description: 'Can comfortably fast; digestive transit is slow and relaxed.',
        dosha: 'Kapha'
      }
    ]
  },
  {
    id: 4,
    title: 'What is your primary wellness aspiration right now?',
    subtitle: 'Ayurveda pairs botanical remedies with your most pressing lifestyle goal.',
    options: [
      {
        label: 'Deep restorative sleep, calm mind & stress resilience',
        description: 'Soothe cortisol, nourish the nervous system, and restore stamina.',
        dosha: 'Vata'
      },
      {
        label: 'Radiant glowing skin, cooling heat & hormonal harmony',
        description: 'Purify the bloodstream, soothe skin inflammation, and restore radiance.',
        dosha: 'Pitta'
      },
      {
        label: 'Gentle metabolic detox, gut lightness & active vitality',
        description: 'Kindle slow metabolic agni, clear congestion, and shed sluggishness.',
        dosha: 'Kapha'
      }
    ]
  }
];

const DOSHA_DETAILS = {
  Vata: {
    title: 'Vata Dominant (Air & Ether)',
    tagline: 'The Force of Movement, Creativity & Vital Nerve Impulse',
    color: '#214E34',
    icon: Wind,
    characteristics:
      'Governed by the elements of Air and Ether. You possess vibrant creativity, quick intuition, and agility. When out of balance, excess dryness leads to anxiety, disrupted sleep, joint crepitus, and erratic energy.',
    balancingRituals: [
      'Warm Abhyanga self-massage with cold-pressed sesame or Bringadi oil.',
      'Grounding adaptogens like Ashwagandha Supreme to soothe somatic cortisol.',
      'Sipping warm herbal infusions with cardamom, ginger, and raw honey.'
    ],
    recommendedCategory: 'Stress & Cognitive Health',
    link: '/shop?dosha=Vata'
  },
  Pitta: {
    title: 'Pitta Dominant (Fire & Water)',
    tagline: 'The Force of Transformation, Intelligence & Metabolic Agni',
    color: '#B86F4B',
    icon: Flame,
    characteristics:
      'Governed by Fire and Water. You possess sharp intellect, focused determination, and strong metabolism. When aggravated, excess heat manifests as skin breakouts, acidity, inflammation, and perfectionistic stress.',
    balancingRituals: [
      'Soothing Kumkumadi Radiant Tailam night application with pure saffron.',
      'Cooling botanical tonics like Brahmi and Amalaki to pacify cellular heat.',
      'Avoiding harsh chemicals and hot pungent foods during peak summer.'
    ],
    recommendedCategory: 'Skin Radiance & Kanti',
    link: '/shop?dosha=Pitta'
  },
  Kapha: {
    title: 'Kapha Dominant (Earth & Water)',
    tagline: 'The Force of Stability, Immunity & Deep Cellular Structure',
    color: '#163A28',
    icon: Mountain,
    characteristics:
      'Governed by Earth and Water. You embody steadfast endurance, loyalty, and deep natural immunity. When out of balance, excess coolness causes sluggish digestion, water retention, and mental lethargy.',
    balancingRituals: [
      'Daily Triphala Churna bio-detox before sleep with warm water.',
      'Vigorous morning movement and stimulating herbal dry brushing (Garshana).',
      'Warm, pungent spices like black pepper, pippali, and holy basil (Tulsi).'
    ],
    recommendedCategory: 'Digestive & Gut Health',
    link: '/shop?dosha=Kapha'
  }
};

interface DoshaQuizModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DoshaQuizModal: React.FC<DoshaQuizModalProps> = ({ isOpen, onClose }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<('Vata' | 'Pitta' | 'Kapha')[]>([]);
  const [result, setResult] = useState<'Vata' | 'Pitta' | 'Kapha' | null>(null);

  if (!isOpen) return null;

  const handleSelectOption = (dosha: 'Vata' | 'Pitta' | 'Kapha') => {
    const nextAnswers = [...answers, dosha];
    setAnswers(nextAnswers);

    if (currentStep < QUESTIONS.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      // Calculate dominant dosha
      const counts = { Vata: 0, Pitta: 0, Kapha: 0 };
      nextAnswers.forEach(d => {
        counts[d]++;
      });

      let dominant: 'Vata' | 'Pitta' | 'Kapha' = 'Vata';
      if (counts.Pitta >= counts.Vata && counts.Pitta >= counts.Kapha) {
        dominant = 'Pitta';
      } else if (counts.Kapha >= counts.Vata && counts.Kapha >= counts.Pitta) {
        dominant = 'Kapha';
      }

      setResult(dominant);
    }
  };

  const handleReset = () => {
    setCurrentStep(0);
    setAnswers([]);
    setResult(null);
  };

  const progressPercent = Math.round(((currentStep + 1) / QUESTIONS.length) * 100);

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-xs">
      <div
        className="relative w-full max-w-2xl bg-[#FAF8F1] rounded-3xl shadow-2xl border border-[#E5E8E0] overflow-hidden my-8"
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-5 sm:p-6 bg-[#214E34] text-white flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-[#FAF8F1]/20 flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-amber-300" />
            </div>
            <div>
              <span className="text-[10px] font-bold tracking-widest uppercase text-amber-200">
                Charaka Samhita Diagnostic
              </span>
              <h3 className="text-base sm:text-lg font-serif-brand font-bold">
                Classical Prakriti & Dosha Assessment
              </h3>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg hover:bg-white/10 text-white transition-colors"
            aria-label="Close Quiz"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Quiz Body */}
        {!result ? (
          <div className="p-6 sm:p-8 space-y-6">
            {/* Progress Bar */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs text-[#687168] font-semibold">
                <span>
                  Question {currentStep + 1} of {QUESTIONS.length}
                </span>
                <span>{progressPercent}% Complete</span>
              </div>
              <div className="w-full bg-[#E5E8E0] h-2 rounded-full overflow-hidden">
                <div
                  className="bg-[#214E34] h-full rounded-full transition-all duration-300"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            </div>

            {/* Question Details */}
            <div className="space-y-1.5">
              <h2 className="text-lg sm:text-xl font-serif-brand font-bold text-[#214E34]">
                {QUESTIONS[currentStep].title}
              </h2>
              <p className="text-xs text-[#687168]">
                {QUESTIONS[currentStep].subtitle}
              </p>
            </div>

            {/* Options */}
            <div className="space-y-3">
              {QUESTIONS[currentStep].options.map((opt, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSelectOption(opt.dosha)}
                  className="w-full text-left p-4 rounded-xl border border-[#E5E8E0] bg-white hover:border-[#214E34] hover:bg-[#DDE7D9]/20 hover:shadow-sm transition-all group flex items-start justify-between gap-3"
                >
                  <div className="space-y-1">
                    <span className="text-xs sm:text-sm font-bold text-[#202820] group-hover:text-[#214E34] block">
                      {opt.label}
                    </span>
                    <p className="text-[11px] sm:text-xs text-[#687168]">
                      {opt.description}
                    </p>
                  </div>
                  <ArrowRight className="w-4 h-4 text-[#687168] group-hover:text-[#214E34] group-hover:translate-x-1 transition-all shrink-0 mt-1" />
                </button>
              ))}
            </div>

            <div className="pt-2 flex items-center justify-between text-[11px] text-[#687168]">
              <span className="flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-[#214E34]" /> Private & Confidential
              </span>
              <span>Based on Ayurvedic Tridosha Theory</span>
            </div>
          </div>
        ) : (
          /* Result View */
          <div className="p-6 sm:p-8 space-y-6 animate-in fade-in duration-300">
            {(() => {
              const info = DOSHA_DETAILS[result];
              const Icon = info.icon;
              return (
                <>
                  <div className="text-center space-y-3">
                    <div className="w-16 h-16 rounded-full bg-[#214E34] text-amber-300 flex items-center justify-center mx-auto shadow-md">
                      <Icon className="w-8 h-8" />
                    </div>
                    <span className="inline-block bg-[#DDE7D9] text-[#214E34] text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                      Your Ayurvedic Constitution
                    </span>
                    <h2 className="text-2xl sm:text-3xl font-serif-brand font-bold text-[#214E34]">
                      {info.title}
                    </h2>
                    <p className="text-xs sm:text-sm text-[#B86F4B] font-bold italic">
                      {info.tagline}
                    </p>
                    <p className="text-xs text-[#202820] max-w-lg mx-auto leading-relaxed pt-1">
                      {info.characteristics}
                    </p>
                  </div>

                  {/* Balancing Protocols */}
                  <div className="p-4 sm:p-5 bg-white rounded-2xl border border-[#E5E8E0] space-y-3 shadow-2xs">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-[#214E34] flex items-center gap-1.5">
                      <Leaf className="w-4 h-4 text-[#B86F4B]" /> Recommended Classical Dinacharya Protocols:
                    </h4>
                    <ul className="space-y-2 text-xs text-[#202820]">
                      {info.balancingRituals.map((ritual, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-green-700 shrink-0 mt-0.5" />
                          <span>{ritual}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-col sm:flex-row gap-3 pt-2">
                    <Link
                      href={info.link}
                      onClick={onClose}
                      className="flex-1 py-3 px-6 bg-[#214E34] hover:bg-[#163A28] text-white text-xs sm:text-sm font-bold rounded-xl text-center shadow-md transition-colors flex items-center justify-center gap-2"
                    >
                      <span>Explore {result} Formulations</span>
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                    <button
                      onClick={handleReset}
                      className="py-3 px-5 border border-[#214E34] text-[#214E34] hover:bg-[#DDE7D9]/40 text-xs font-semibold rounded-xl transition-colors flex items-center justify-center gap-1.5"
                    >
                      <RotateCcw className="w-3.5 h-3.5" /> Retake
                    </button>
                  </div>
                </>
              );
            })()}
          </div>
        )}
      </div>
    </div>
  );
};
