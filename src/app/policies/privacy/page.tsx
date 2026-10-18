import React from 'react';

export const metadata = {
  title: 'Privacy Policy | Axmin Prana Ayurveda',
  description: 'Compliance with Indian Digital Personal Data Protection (DPDP) Act 2023.'
};

export default function PrivacyPolicyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-8 text-xs sm:text-sm text-[#202820] leading-relaxed">
      <div>
        <span className="text-xs font-bold tracking-widest uppercase text-[#B86F4B]">Data Security</span>
        <h1 className="text-2xl sm:text-4xl font-serif-brand font-bold text-[#214E34] mt-1">
          Privacy Policy
        </h1>
        <p className="text-[#687168] mt-1 text-xs">Last updated: January 2026</p>
      </div>

      <div className="bg-white p-6 sm:p-8 rounded-2xl border border-[#E5E8E0] space-y-6">
        <section className="space-y-2">
          <h2 className="text-base font-bold text-[#214E34]">1. DPDP Compliance</h2>
          <p>
            Axmin Prana Ayurveda complies strictly with the Digital Personal Data Protection (DPDP) Act 2023 of India. We only collect essential customer data (Name, Indian phone number, delivery address, and email) solely to process orders and provide logistics tracking.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-[#214E34]">2. No Third-Party Data Monetization</h2>
          <p>
            We do not sell, rent, or trade your personal health data or contact information to any third-party marketing entities.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-[#214E34]">3. Payment Gateway Security</h2>
          <p>
            Payment transactions are processed through RBI-authorized payment aggregators (Razorpay) adhering to PCI-DSS Level 1 security standards. We never store credit/debit card CVV numbers or UPI PINs.
          </p>
        </section>
      </div>
    </div>
  );
}
