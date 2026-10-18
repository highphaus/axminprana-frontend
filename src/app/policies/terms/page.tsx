import React from 'react';

export const metadata = {
  title: 'Terms & Conditions | Axmin Prana Ayurveda',
  description: 'Terms of service, product disclaimers, and legal jurisdiction.'
};

export default function TermsPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-8 text-xs sm:text-sm text-[#202820] leading-relaxed">
      <div>
        <span className="text-xs font-bold tracking-widest uppercase text-[#B86F4B]">Legal Governance</span>
        <h1 className="text-2xl sm:text-4xl font-serif-brand font-bold text-[#214E34] mt-1">
          Terms & Conditions of Service
        </h1>
        <p className="text-[#687168] mt-1 text-xs">Last updated: January 2026</p>
      </div>

      <div className="bg-white p-6 sm:p-8 rounded-2xl border border-[#E5E8E0] space-y-6">
        <section className="space-y-2">
          <h2 className="text-base font-bold text-[#214E34]">1. Ayurveda Health Disclaimer</h2>
          <p>
            The products, monographs, and articles on this platform are based on classical Ayurvedic treatises (Charaka Samhita, Sushruta Samhita) and are licensed under the Ministry of AYUSH. They are intended for preventative health, Rasayana vitality, and holistic wellness. They are not intended to replace emergency medical treatments.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-[#214E34]">2. Governing Jurisdiction</h2>
          <p>
            Any disputes arising out of the use of this service or purchase of formulations are subject to the exclusive jurisdiction of the courts at Haridwar / Dehradun, Uttarakhand, India.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-[#214E34]">3. Pricing & Taxes</h2>
          <p>
            All prices listed on this website are denominated in Indian Rupees (INR ₹) and are inclusive of applicable Indian Goods and Services Tax (GST).
          </p>
        </section>
      </div>
    </div>
  );
}
