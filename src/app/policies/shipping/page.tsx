import React from 'react';
import Link from 'next/link';

export const metadata = {
  title: 'Shipping & Delivery Policy | Axmin Prana Ayurveda',
  description: 'Pan-India shipping rates, delivery timelines, and carrier information.'
};

export default function ShippingPolicyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-8 text-xs sm:text-sm text-[#202820] leading-relaxed">
      <div>
        <span className="text-xs font-bold tracking-widest uppercase text-[#B86F4B]">Compliance & Logistics</span>
        <h1 className="text-2xl sm:text-4xl font-serif-brand font-bold text-[#214E34] mt-1">
          Pan-India Shipping Policy
        </h1>
        <p className="text-[#687168] mt-1 text-xs">Last updated: January 2026</p>
      </div>

      <div className="bg-white p-6 sm:p-8 rounded-2xl border border-[#E5E8E0] space-y-6">
        <section className="space-y-2">
          <h2 className="text-base font-bold text-[#214E34]">1. Pan-India Delivery Coverage</h2>
          <p>
            Axmin Prana Ayurveda delivers to all 28 states and 8 Union Territories across India, covering over 19,000+ PIN codes in partnership with Delhivery, Blue Dart, and India Post Speed Post.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-[#214E34]">2. Shipping Charges</h2>
          <p>
            • <strong>Orders Above ₹999:</strong> Eligible for <strong>FREE Pan-India Express Delivery</strong>.
            <br />
            • <strong>Orders Below ₹999:</strong> A nominal flat standard logistics fee of <strong>₹80</strong> applies across all Indian locations.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-[#214E34]">3. Estimated Transit Times</h2>
          <p>
            • <strong>Tier 1 Metros</strong> (Delhi NCR, Mumbai, Bengaluru, Hyderabad, Chennai, Kolkata): 2 to 3 Business Days.
            <br />
            • <strong>Tier 2 & 3 Cities</strong>: 3 to 5 Business Days.
            <br />
            • <strong>North-East & Remote Regions</strong>: 5 to 7 Business Days.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-[#214E34]">4. Tamper-Proof Botanical Packaging</h2>
          <p>
            Classical Ayurvedic oils and glass bottles are secured in triple-walled bubble cushioning and eco-friendly recyclable outer cartons to prevent thermal oxidation and breakage during transit.
          </p>
        </section>
      </div>
    </div>
  );
}
