'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ChevronDown, HelpCircle, ArrowRight } from 'lucide-react';

const FAQS = [
  {
    q: 'Are your formulations approved by the Ministry of AYUSH?',
    a: 'Yes. Every herbal tablet, tailam (oil), churna, and rasayana produced by Axmin Prana holds an authentic manufacturing license granted under the State AYUSH Licensing Authority (Govt. of India License No. AYU/DL/IND-2024-8841).'
  },
  {
    q: 'How are your herbs tested for heavy metals and pesticide residues?',
    a: 'Every botanical batch undergoes ICP-MS screening at NABL-accredited testing laboratories to verify Lead, Mercury, Arsenic, and Cadmium levels are far below strict permissible limits codified in the Ayurvedic Pharmacopoeia of India (API).'
  },
  {
    q: 'What is the standard delivery timeline across India?',
    a: 'Orders shipped to major metros (Delhi NCR, Mumbai, Bengaluru, Chennai, Hyderabad, Kolkata, Pune) are delivered within 2 business days via Delhivery Priority. Other regions and non-metro districts receive deliveries within 3 to 5 business days.'
  },
  {
    q: 'What payment modes are accepted for orders?',
    a: 'All orders on Axmin Prana are 100% prepaid online. We accept Instant UPI (Google Pay, PhonePe, Paytm, BHIM QR), all major Debit/Credit Cards (RuPay, Visa, MasterCard), and secure NetBanking via our encrypted 256-bit gateway. Orders are dispatched immediately upon payment confirmation.'
  },
  {
    q: 'What is Anupana and why is it important?',
    a: 'In classical Ayurveda, Anupana is the vehicle (such as warm milk, honey, ghee, or lukewarm water) taken alongside an herbal formulation. It facilitates cellular absorption and directs the herbal potency directly to targeted bodily tissues (Dhatus).'
  },
  {
    q: 'Can I consume multiple Ayurvedic formulations together?',
    a: 'Most classical Rasayanas (like Ashwagandha with Triphala) work harmoniously together. However, we advise spacing out internal churnas or capsules by at least 30 minutes. You can also consult our in-house Vaidyas via our Contact page for tailored guidance.'
  },
  {
    q: 'Can I cancel my order after placing it?',
    a: 'Yes, you may cancel your order free of charge strictly before it has been dispatched from our Haridwar dispensary hub. Once Delhivery or our logistics partner picks up the consignment and tracking is generated, cancellation is no longer possible.'
  },
  {
    q: 'What is your return and exchange policy?',
    a: 'Due to the therapeutic, sterile, and consumable nature of Ayurvedic tailams (oils), churnas, and herbal formulations, we strictly maintain a No Return and No Exchange policy once orders have shipped or been delivered. If your shipment arrives damaged in transit, please share unboxing photos/video within 24–48 hours to receive a free replacement.'
  }
];

export default function FaqsPage() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-10">
      <div className="text-center space-y-2">
        <span className="text-xs font-bold tracking-widest uppercase text-[#B86F4B]">
          Answers to Customer Queries
        </span>
        <h1 className="text-3xl sm:text-4xl font-serif-brand font-bold text-[#214E34]">
          Frequently Asked Questions
        </h1>
        <p className="text-xs sm:text-sm text-[#687168]">
          Learn about our formulations, regulatory compliance, pan-India logistics, and dosage guidelines.
        </p>
      </div>

      <div className="space-y-3">
        {FAQS.map((faq, i) => (
          <div
            key={i}
            className="bg-white rounded-xl border border-[#E5E8E0] overflow-hidden transition-all shadow-2xs"
          >
            <button
              onClick={() => setOpenIdx(openIdx === i ? null : i)}
              className="w-full text-left p-4 sm:p-5 flex items-center justify-between gap-4 text-xs sm:text-sm font-bold text-[#202820]"
            >
              <span>{faq.q}</span>
              <ChevronDown
                className={`w-4 h-4 text-[#214E34] transition-transform ${
                  openIdx === i ? 'rotate-180' : ''
                }`}
              />
            </button>
            {openIdx === i && (
              <div className="px-4 pb-5 sm:px-5 sm:pb-5 text-xs text-[#687168] leading-relaxed border-t border-[#E5E8E0]/60 pt-3">
                {faq.a}
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="bg-[#FAF8F1] border border-[#214E34]/20 rounded-2xl p-6 text-center space-y-3">
        <h3 className="text-sm font-bold text-[#214E34]">Have a question about your personal Prakriti?</h3>
        <p className="text-xs text-[#687168]">Our certified Ayurvedic physicians are available to advise you.</p>
        <Link
          href="/contact"
          className="inline-flex items-center gap-1.5 px-5 py-2.5 bg-[#214E34] text-white text-xs font-semibold rounded-md hover:bg-[#163A28]"
        >
          Contact Our Vaidyas <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  );
}
