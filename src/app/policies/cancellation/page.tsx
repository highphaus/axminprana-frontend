import React from 'react';

export const metadata = {
  title: 'Order Cancellation Policy | Axmin Prana Ayurveda',
  description: 'Procedures and timeline for cancelling orders before dispensary dispatch.'
};

export default function CancellationPolicyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-8 text-xs sm:text-sm text-[#202820] leading-relaxed">
      <div>
        <span className="text-xs font-bold tracking-widest uppercase text-[#B86F4B]">Customer Care</span>
        <h1 className="text-2xl sm:text-4xl font-serif-brand font-bold text-[#214E34] mt-1">
          Cancellation Policy
        </h1>
        <p className="text-[#687168] mt-1 text-xs">Last updated: January 2026</p>
      </div>

      <div className="bg-white p-6 sm:p-8 rounded-2xl border border-[#E5E8E0] space-y-6">
        <section className="space-y-2">
          <h2 className="text-base font-bold text-[#214E34]">1. Cancellation Prior to Dispatch</h2>
          <p>
            You may cancel your order free of charge at any time before it has been dispatched from our Haridwar dispensary hub. Once the carrier picks up the consignment, cancellation is no longer possible.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-[#214E34]">2. Instant Cancellation via Support</h2>
          <p>
            To cancel, call 1800-209-VEDA or email care@axminprana.com with your Order Number immediately.
          </p>
        </section>
      </div>
    </div>
  );
}
