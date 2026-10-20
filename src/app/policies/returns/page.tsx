import React from 'react';
import Link from 'next/link';
import { ShieldAlert, AlertTriangle, CheckCircle2, ShieldCheck, Mail, Phone } from 'lucide-react';

export const metadata = {
  title: 'No Return & No Exchange Policy | Axmin Prana Ayurveda',
  description: 'Strict No Return and No Exchange policy on authentic Ayurvedic consumable formulations and botanical oils.'
};

export default function ReturnsPolicyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-8 text-xs sm:text-sm text-[#202820] leading-relaxed">
      <div>
        <span className="text-xs font-bold tracking-widest uppercase text-[#B86F4B]">Quality & Purity Standards</span>
        <h1 className="text-2xl sm:text-4xl font-serif-brand font-bold text-[#214E34] mt-1">
          No Return & No Exchange Policy
        </h1>
        <p className="text-[#687168] mt-1 text-xs">Last updated: October 2026</p>
      </div>

      {/* Hero Notice Banner */}
      <div className="bg-red-50/70 border-2 border-red-200 rounded-2xl p-5 sm:p-6 space-y-2">
        <div className="flex items-center gap-2 text-red-800 font-bold text-sm sm:text-base">
          <ShieldAlert className="w-5 h-5 text-red-600 shrink-0" />
          <span>Strict Policy: No Return & No Exchange Accepted</span>
        </div>
        <p className="text-xs sm:text-sm text-[#202820] leading-relaxed">
          At Axmin Prana Ayurveda, all classical formulations, medicinal oils (tailams), herbal churnas, and dietary rasayanas are manufactured, sealed, and packed under sterile, climate-monitored conditions. To maintain clinical hygiene, therapeutic efficacy, and patient safety, <strong>we strictly follow a No Return and No Exchange policy once orders have been dispatched or delivered.</strong>
        </p>
      </div>

      <div className="bg-white p-6 sm:p-8 rounded-2xl border border-[#E5E8E0] space-y-6">
        <section className="space-y-2">
          <h2 className="text-base font-bold text-[#214E34] flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-[#214E34]" /> 1. Rationale for No Return & No Exchange
          </h2>
          <p>
            Ayurvedic medicines, botanical oils, and organic herbal supplements are consumable healthcare items. Once a shipment leaves our dispensary or is received by a customer:
          </p>
          <ul className="list-disc pl-5 space-y-1.5 text-xs text-[#687168]">
            <li>The integrity of internal herbal seals and environmental storage (temperature, humidity, sunlight exposure) cannot be guaranteed if returned.</li>
            <li>Re-stocking or re-selling returned consumable items violates strict Ayurvedic pharmacy protocols and statutory health regulations under the Drugs and Cosmetics Act.</li>
            <li>For these critical reasons, <strong>we do not accept returns, exchanges, or change-of-mind refunds on any delivered product.</strong></li>
          </ul>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-[#214E34] flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-[#B86F4B]" /> 2. Damaged or Tampered Consignments in Transit
          </h2>
          <p>
            We take extreme care in triple-cushion packaging for glass bottles and oils. In the very rare event that your consignment arrives <strong>physically broken, severely damaged in transit, or missing items</strong>:
          </p>
          <div className="bg-[#FAF8F1] p-4 rounded-xl border border-[#E5E8E0] space-y-2 text-xs">
            <p className="font-semibold text-[#214E34]">
              Mandatory Transit Claim Protocol:
            </p>
            <ol className="list-decimal pl-5 space-y-1 text-[#687168]">
              <li>You must notify us within <strong>24 to 48 hours of delivery</strong>.</li>
              <li>Provide an unedited <strong>unboxing video and clear photographs</strong> of the outer parcel label, barcode, and the damaged bottle.</li>
              <li>Upon verification with our carrier partner, we will dispatch an immediate <strong>100% free replacement</strong> of the damaged item at no additional shipping fee.</li>
            </ol>
          </div>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-[#214E34] flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-[#214E34]" /> 3. Pre-Dispatch Cancellation
          </h2>
          <p>
            If you wish to cancel an order, you must do so <strong>before the package is dispatched</strong> from our dispensary. Once handed over to Delhivery / logistics carriers, cancellation, return, or exchange is strictly impossible.
          </p>
          <p className="text-xs">
            Read full instructions in our{' '}
            <Link href="/policies/cancellation" className="text-[#214E34] font-bold underline">
              Order Cancellation Policy
            </Link>.
          </p>
        </section>

        <section className="space-y-3 pt-2 border-t border-[#E5E8E0]">
          <h2 className="text-base font-bold text-[#214E34]">4. Need Help with an Order?</h2>
          <p>
            Our customer care team is dedicated to addressing genuine transit damage or dispatch issues promptly:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
            <div className="p-3 bg-[#FAF8F1] rounded-xl border border-[#E5E8E0] flex items-center gap-3">
              <Phone className="w-5 h-5 text-[#214E34] shrink-0" />
              <div>
                <span className="text-[10px] text-[#687168] uppercase font-bold block">Customer Support</span>
                <a href="tel:+917561836584" className="font-bold text-[#214E34] hover:underline">
                  +91 75618 36584
                </a>
              </div>
            </div>
            <div className="p-3 bg-[#FAF8F1] rounded-xl border border-[#E5E8E0] flex items-center gap-3">
              <Mail className="w-5 h-5 text-[#214E34] shrink-0" />
              <div>
                <span className="text-[10px] text-[#687168] uppercase font-bold block">Email Inquiries</span>
                <a href="mailto:axminprana@gmail.com" className="font-bold text-[#214E34] hover:underline">
                  axminprana@gmail.com
                </a>
              </div>
            </div>
          </div>
        </section>
      </div>

      <div className="text-center pt-2">
        <Link href="/shop" className="text-xs font-semibold text-[#214E34] hover:underline">
          &larr; Return to Authentic Formulations Store
        </Link>
      </div>
    </div>
  );
}
