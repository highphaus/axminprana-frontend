import React from 'react';
import Link from 'next/link';
import {
  Scale,
  ShieldCheck,
  CreditCard,
  Clock,
  ShieldAlert,
  Truck,
  Award,
  AlertTriangle,
  Mail,
  Phone
} from 'lucide-react';

export const metadata = {
  title: 'Terms & Conditions of Service | Axmin Prana Ayurveda',
  description: 'Terms of service governing 100% prepaid ordering, pre-dispatch cancellations, strictly No Return & No Exchange standards, and AYUSH compliance.'
};

export default function TermsPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-10 text-xs sm:text-sm text-[#202820] leading-relaxed">
      <div>
        <span className="text-xs font-bold tracking-widest uppercase text-[#B86F4B]">
          Legal Framework & Agreement
        </span>
        <h1 className="text-2xl sm:text-4xl font-serif-brand font-bold text-[#214E34] mt-1">
          Terms & Conditions of Service
        </h1>
        <p className="text-[#687168] mt-1 text-xs">
          Effective Date: January 2026 • Last Updated: October 2026
        </p>
      </div>

      <div className="bg-white p-6 sm:p-8 rounded-2xl border border-[#E5E8E0] space-y-8">
        {/* Section 1: Agreement to Terms */}
        <section className="space-y-3">
          <h2 className="text-base font-bold text-[#214E34] flex items-center gap-2 border-b border-[#E5E8E0] pb-2">
            <Scale className="w-4 h-4 text-[#214E34]" /> 1. Agreement to Terms
          </h2>
          <p>
            By accessing or purchasing from <strong>Axmin Prana Ayurveda Private Limited</strong> (&quot;Axmin Prana&quot;, &quot;we&quot;, &quot;us&quot;, or &quot;our&quot;), you acknowledge that you have read, understood, and agreed to be legally bound by these Terms and Conditions, our Privacy Policy, Cancellation Policy, and No Return & No Exchange Policy.
          </p>
        </section>

        {/* Section 2: 100% Prepaid Orders & Payments */}
        <section className="space-y-3">
          <h2 className="text-base font-bold text-[#214E34] flex items-center gap-2 border-b border-[#E5E8E0] pb-2">
            <CreditCard className="w-4 h-4 text-[#214E34]" /> 2. 100% Prepaid Payment Terms
          </h2>
          <p>
            To guarantee pristine thermal preservation and clinical dispatch priority:
          </p>
          <ul className="list-disc pl-5 space-y-1.5 text-xs text-[#687168]">
            <li>All orders must be completed via <strong>100% prepaid online transactions</strong> at checkout.</li>
            <li>We accept Instant UPI (Google Pay, PhonePe, Paytm, BHIM QR), RuPay, Visa, MasterCard, and NetBanking via 256-bit SSL encrypted RBI-authorized gateways.</li>
            <li><strong>No Cash on Delivery:</strong> Offline payment methods or cash collection upon delivery are strictly not supported.</li>
            <li>All product prices are quoted in Indian Rupees (₹ INR) inclusive of applicable Ayurvedic Goods and Services Tax (GST).</li>
          </ul>
        </section>

        {/* Section 3: Cancellation Terms (Pre-Dispatch Only) */}
        <section className="space-y-3">
          <h2 className="text-base font-bold text-[#214E34] flex items-center gap-2 border-b border-[#E5E8E0] pb-2">
            <Clock className="w-4 h-4 text-[#214E34]" /> 3. Order Cancellation (Pre-Dispatch Window)
          </h2>
          <p>
            Orders can be cancelled free of charge <strong>exclusively prior to carrier dispatch</strong>:
          </p>
          <ul className="list-disc pl-5 space-y-1.5 text-xs text-[#687168]">
            <li>Cancellations are accepted only while the order remains in <em>Placed</em>, <em>Confirmed</em>, or <em>Processing</em> status at our central dispensary.</li>
            <li>Once an order has been marked as <em>Shipped</em> and handed over to Delhivery / India Post, cancellation is strictly closed and non-negotiable.</li>
            <li>Upon valid pre-dispatch cancellation, 100% of the payment is credited directly back to the original source account within 2–7 business days.</li>
          </ul>
        </section>

        {/* Section 4: Strictly No Return & No Exchange */}
        <section className="space-y-3">
          <h2 className="text-base font-bold text-[#214E34] flex items-center gap-2 border-b border-[#E5E8E0] pb-2">
            <ShieldAlert className="w-4 h-4 text-[#B86F4B]" /> 4. Strictly No Return & No Exchange Policy
          </h2>
          <div className="bg-[#FAF8F1] p-4 rounded-xl border border-[#E5E8E0] space-y-2 text-xs">
            <p className="font-bold text-[#214E34]">Ayurvedic Consumable Hygiene & Safety Standard:</p>
            <p className="text-[#687168] leading-relaxed">
              All classical formulations, botanical tailams (oils), churnas, rasayanas, and herbal tablets are consumable healthcare items packaged under sterile clean-room conditions. In compliance with the Drugs and Cosmetics Act and quality safety standards, <strong>we strictly enforce a No Return and No Exchange policy once products are dispatched or delivered.</strong>
            </p>
            <p className="text-[#687168]">
              <strong>Transit Breakage Guarantee:</strong> If a bottle arrives physically broken or damaged during transit, you must notify our care desk within <strong>24 to 48 hours of delivery</strong> with an unedited unboxing video and clear photographs. Verified claims will receive an immediate free replacement.
            </p>
          </div>
        </section>

        {/* Section 5: Pan-India Logistics & Delivery */}
        <section className="space-y-3">
          <h2 className="text-base font-bold text-[#214E34] flex items-center gap-2 border-b border-[#E5E8E0] pb-2">
            <Truck className="w-4 h-4 text-[#214E34]" /> 5. Pan-India Logistics & Delivery
          </h2>
          <p>
            We deliver to over 19,000+ PIN codes across India in partnership with Delhivery Priority and India Post Speed Post. Orders above ₹999 qualify for <strong>Free Express Delivery</strong>. Standard transit times are 2–3 business days for major metros and 3–5 business days for regional areas.
          </p>
        </section>

        {/* Section 6: AYUSH Compliance & Health Disclaimer */}
        <section className="space-y-3">
          <h2 className="text-base font-bold text-[#214E34] flex items-center gap-2 border-b border-[#E5E8E0] pb-2">
            <Award className="w-4 h-4 text-[#214E34]" /> 6. Classical AYUSH Formulation Standards & Disclaimer
          </h2>
          <p>
            Every formulation is manufactured under authentic licenses granted by the State AYUSH Licensing Authority (License No. AYU/DL/IND-2024-8841) following classical treatises (Charaka Samhita, Sushruta Samhita, Astanga Hridaya, and Ayurvedic Pharmacopoeia of India).
          </p>
          <p className="text-xs text-[#687168]">
            Ayurvedic wellness products and Prakriti assessments are designed for preventative health, Rasayana rejuvenation, and holistic constitutional balance. They are not intended as substitutes for emergency allopathic medical procedures or surgical diagnoses.
          </p>
        </section>

        {/* Section 7: Jurisdiction */}
        <section className="space-y-3 pt-2 border-t border-[#E5E8E0]">
          <h2 className="text-base font-bold text-[#214E34]">7. Governing Law & Jurisdiction</h2>
          <p>
            These Terms and any contractual disputes shall be governed by and construed in accordance with the substantive laws of India. Any legal proceedings or dispute arbitrations shall be submitted exclusively to the competent courts of <strong>Haridwar / Dehradun, Uttarakhand, India</strong>.
          </p>
        </section>

        {/* Section 8: Contact */}
        <section className="space-y-2 pt-2 border-t border-[#E5E8E0]">
          <h2 className="text-base font-bold text-[#214E34]">8. Customer Care & Inquiries</h2>
          <p>
            For assistance with your orders, pre-dispatch cancellations, or formulation questions:
          </p>
          <div className="flex flex-wrap items-center gap-4 pt-1 text-xs">
            <a href="mailto:axminprana@gmail.com" className="font-bold text-[#214E34] hover:underline flex items-center gap-1.5">
              <Mail className="w-3.5 h-3.5" /> axminprana@gmail.com
            </a>
            <a href="tel:+917561836584" className="font-bold text-[#214E34] hover:underline flex items-center gap-1.5">
              <Phone className="w-3.5 h-3.5" /> +91 75618 36584
            </a>
          </div>
        </section>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-4 text-xs font-semibold pt-2">
        <Link href="/policies/privacy" className="text-[#214E34] hover:underline">
          &larr; Privacy Policy
        </Link>
        <Link href="/policies/cancellation" className="text-[#214E34] hover:underline">
          Order Cancellation Policy &rarr;
        </Link>
        <Link href="/policies/returns" className="text-[#214E34] hover:underline">
          No Return & No Exchange Policy &rarr;
        </Link>
      </div>
    </div>
  );
}
