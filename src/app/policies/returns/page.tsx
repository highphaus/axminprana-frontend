import React from 'react';

export const metadata = {
  title: 'Return & Refund Policy | Axmin Prana Ayurveda',
  description: '7-day replacement and refund policy for damaged or defective Ayurvedic shipments.'
};

export default function ReturnsPolicyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-8 text-xs sm:text-sm text-[#202820] leading-relaxed">
      <div>
        <span className="text-xs font-bold tracking-widest uppercase text-[#B86F4B]">Customer Protection</span>
        <h1 className="text-2xl sm:text-4xl font-serif-brand font-bold text-[#214E34] mt-1">
          Return, Replacement & Refund Policy
        </h1>
        <p className="text-[#687168] mt-1 text-xs">Last updated: January 2026</p>
      </div>

      <div className="bg-white p-6 sm:p-8 rounded-2xl border border-[#E5E8E0] space-y-6">
        <section className="space-y-2">
          <h2 className="text-base font-bold text-[#214E34]">1. 7-Day Replacement Guarantee</h2>
          <p>
            Due to the consumable and sterile nature of classical Ayurvedic medicines and oils, products once unsealed cannot be returned. However, if your consignment arrives damaged, expired, or defective, we provide an immediate 100% free replacement within 7 days of delivery.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-[#214E34]">2. Refund Processing</h2>
          <p>
            Approved refunds are credited back to the original payment source (UPI, Card, or NetBanking) within 4 to 7 business days. For Cash on Delivery orders, refunds are disbursed directly via NEFT/UPI bank transfer.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-[#214E34]">3. How to Initiate a Claim</h2>
          <p>
            Email clear photos of the outer box and shipping label along with your Order ID to <strong>care@axminprana.com</strong> or call our toll-free line at <strong>1800-209-VEDA</strong>.
          </p>
        </section>
      </div>
    </div>
  );
}
