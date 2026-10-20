import React from 'react';
import Link from 'next/link';
import { AlertCircle, Clock, CheckCircle2, ShieldAlert, Phone, Mail } from 'lucide-react';

export const metadata = {
  title: 'Order Cancellation Policy | Axmin Prana Ayurveda',
  description: 'Order cancellation terms: cancellations are accepted exclusively prior to shipment and dispensary dispatch.'
};

export default function CancellationPolicyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-8 text-xs sm:text-sm text-[#202820] leading-relaxed">
      <div>
        <span className="text-xs font-bold tracking-widest uppercase text-[#B86F4B]">Customer Care & Integrity</span>
        <h1 className="text-2xl sm:text-4xl font-serif-brand font-bold text-[#214E34] mt-1">
          Order Cancellation Policy
        </h1>
        <p className="text-[#687168] mt-1 text-xs">Last updated: October 2026</p>
      </div>

      {/* Critical Highlight Notice */}
      <div className="bg-[#FAF8F1] border-2 border-[#214E34]/30 rounded-2xl p-5 sm:p-6 space-y-2">
        <div className="flex items-center gap-2 text-[#214E34] font-bold text-sm sm:text-base">
          <Clock className="w-5 h-5 text-[#B86F4B] shrink-0" />
          <span>Cancellation Window: Strictly Prior to Shipping</span>
        </div>
        <p className="text-xs sm:text-sm text-[#202820] leading-relaxed">
          Orders placed on Axmin Prana Ayurveda can be cancelled <strong>free of charge only before the consignment has been packed and handed over to our shipping carriers</strong>. Once a consignment has been marked as <em>Shipped</em> and dispatched from our dispensary, cancellation is strictly not possible.
        </p>
      </div>

      <div className="bg-white p-6 sm:p-8 rounded-2xl border border-[#E5E8E0] space-y-6">
        <section className="space-y-2">
          <h2 className="text-base font-bold text-[#214E34] flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-[#214E34]" /> 1. Cancellation Before Dispatch
          </h2>
          <p>
            If you need to cancel your order or change delivery details, you must contact our care desk immediately before dispatch. Upon confirmation of pre-dispatch cancellation, your order status will be updated to <em>Cancelled</em>, and a 100% full refund will be initiated instantly to your original payment source.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-[#214E34] flex items-center gap-2">
            <ShieldAlert className="w-4 h-4 text-[#B86F4B]" /> 2. No Cancellation Post-Dispatch
          </h2>
          <p>
            Once our carrier (Delhivery / Speed Post) has received your parcel and issued an Air Waybill (AWB) tracking number, the shipment enters active transit. At this stage:
          </p>
          <ul className="list-disc pl-5 space-y-1 text-xs text-[#687168]">
            <li>The order cannot be recalled or cancelled while in transit.</li>
            <li>Refusal to accept the delivery does not qualify as an authorized cancellation.</li>
            <li>In accordance with our health safety standards, <strong>No Returns & No Exchanges</strong> are accepted once an order has been shipped or delivered.</li>
          </ul>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-[#214E34]">3. Refund Timeline for Cancelled Orders</h2>
          <p>
            For verified pre-dispatch cancellations:
          </p>
          <ul className="list-disc pl-5 space-y-1 text-xs text-[#687168]">
            <li><strong>UPI & Net Banking:</strong> 2 to 4 business days.</li>
            <li><strong>Debit / Credit Cards:</strong> 4 to 7 business days, depending on your issuing bank.</li>
            <li><strong>Prepaid Online Orders:</strong> All orders on Axmin Prana are 100% prepaid online; refunds are credited directly back to the original source account without deductions.</li>
          </ul>
        </section>

        <section className="space-y-3 pt-2 border-t border-[#E5E8E0]">
          <h2 className="text-base font-bold text-[#214E34]">4. How to Request Cancellation</h2>
          <p>
            To ensure your request is intercepted before the parcel leaves our dispatch unit, reach out immediately via:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
            <div className="p-3 bg-[#FAF8F1] rounded-xl border border-[#E5E8E0] flex items-center gap-3">
              <Phone className="w-5 h-5 text-[#214E34] shrink-0" />
              <div>
                <span className="text-[10px] text-[#687168] uppercase font-bold block">Telephone Helpline</span>
                <a href="tel:+917561836584" className="font-bold text-[#214E34] hover:underline">
                  +91 75618 36584
                </a>
              </div>
            </div>
            <div className="p-3 bg-[#FAF8F1] rounded-xl border border-[#E5E8E0] flex items-center gap-3">
              <Mail className="w-5 h-5 text-[#214E34] shrink-0" />
              <div>
                <span className="text-[10px] text-[#687168] uppercase font-bold block">Email Care Desk</span>
                <a href="mailto:axminprana@gmail.com" className="font-bold text-[#214E34] hover:underline">
                  axminprana@gmail.com
                </a>
              </div>
            </div>
          </div>
          <p className="text-[11px] text-[#687168] italic">
            Please have your Order Number (e.g. AP-2026-XXXXXX) ready for expedited processing.
          </p>
        </section>
      </div>

      <div className="text-center pt-2">
        <Link href="/policies/returns" className="text-xs font-semibold text-[#214E34] hover:underline">
          Read our No Return & No Exchange Policy &rarr;
        </Link>
      </div>
    </div>
  );
}
