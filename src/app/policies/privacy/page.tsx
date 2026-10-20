import React from 'react';
import Link from 'next/link';
import {
  ShieldCheck,
  Lock,
  FileText,
  Clock,
  ShieldAlert,
  CreditCard,
  Mail,
  Phone,
  MapPin,
  CheckCircle2,
  AlertTriangle,
  Eye,
  Server
} from 'lucide-react';
import { YouTubeIcon, InstagramIcon, FacebookIcon } from '../../../components/SocialIcons';

export const metadata = {
  title: 'Privacy & Data Governance Policy | Axmin Prana Ayurveda',
  description: 'Comprehensive Privacy Policy, DPDP Act 2023 compliance, 100% prepaid payment security, pre-dispatch cancellation, and No Return/Exchange standards.'
};

export default function PrivacyPolicyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-10 text-xs sm:text-sm text-[#202820] leading-relaxed">
      {/* Header */}
      <div>
        <span className="text-xs font-bold tracking-widest uppercase text-[#B86F4B]">
          Corporate Governance & Customer Trust
        </span>
        <h1 className="text-2xl sm:text-4xl font-serif-brand font-bold text-[#214E34] mt-1">
          Privacy & Data Protection Policy
        </h1>
        <p className="text-[#687168] mt-1 text-xs">
          Effective Date: January 2026 • Last Updated: October 2026
        </p>
      </div>

      {/* Trust & Policy Highlights Banner */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div className="p-4 bg-[#FAF8F1] rounded-xl border border-[#E5E8E0] space-y-1">
          <div className="flex items-center gap-1.5 text-[#214E34] font-bold text-xs">
            <Lock className="w-4 h-4 text-[#C59B27]" />
            <span>100% Prepaid Security</span>
          </div>
          <p className="text-[11px] text-[#687168]">
            Encrypted UPI & cards. Zero storage of financial PINs or CVVs.
          </p>
        </div>
        <div className="p-4 bg-[#FAF8F1] rounded-xl border border-[#E5E8E0] space-y-1">
          <div className="flex items-center gap-1.5 text-[#214E34] font-bold text-xs">
            <Clock className="w-4 h-4 text-[#214E34]" />
            <span>Pre-Dispatch Cancellation</span>
          </div>
          <p className="text-[11px] text-[#687168]">
            Full refund permitted strictly prior to dispensary carrier shipping.
          </p>
        </div>
        <div className="p-4 bg-[#FAF8F1] rounded-xl border border-[#E5E8E0] space-y-1">
          <div className="flex items-center gap-1.5 text-[#214E34] font-bold text-xs">
            <ShieldAlert className="w-4 h-4 text-[#B86F4B]" />
            <span>No Return / No Exchange</span>
          </div>
          <p className="text-[11px] text-[#687168]">
            Consumable Ayurvedic formulations cannot be returned once shipped.
          </p>
        </div>
      </div>

      {/* Main Content Sections */}
      <div className="bg-white p-6 sm:p-8 rounded-2xl border border-[#E5E8E0] space-y-8">
        {/* Section 1: Introduction & Company Identity */}
        <section className="space-y-3">
          <h2 className="text-base font-bold text-[#214E34] flex items-center gap-2 border-b border-[#E5E8E0] pb-2">
            <Server className="w-4 h-4 text-[#214E34]" /> 1. Company Identity & Regulatory Compliance
          </h2>
          <p>
            This Privacy Policy governs the manner in which <strong>Axmin Prana Ayurveda Private Limited</strong> collects, uses, maintains, and discloses information collected from customers, healthcare practitioners, and visitors of our digital dispensary portal.
          </p>
          <div className="bg-[#FAF8F1] p-4 rounded-xl border border-[#E5E8E0] grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div>
              <span className="text-[#687168] block text-[10px] uppercase font-bold">Manufacturing & Central Hub</span>
              <span className="font-semibold text-[#202820]">Vedic Wellness Hub, Haridwar, Uttarakhand – 249401, India</span>
            </div>
            <div>
              <span className="text-[#687168] block text-[10px] uppercase font-bold">Licensing & Regulatory Compliance</span>
              <span className="font-semibold text-[#202820]">Govt. of India AYUSH License: AYU/DL/IND-2024-8841 | GSTIN: 07AAACA1234F1Z8</span>
            </div>
          </div>
        </section>

        {/* Section 2: What We Collect */}
        <section className="space-y-3">
          <h2 className="text-base font-bold text-[#214E34] flex items-center gap-2 border-b border-[#E5E8E0] pb-2">
            <Eye className="w-4 h-4 text-[#214E34]" /> 2. Personal & Health Data We Collect
          </h2>
          <p>
            Under the <strong>Digital Personal Data Protection (DPDP) Act 2023</strong>, we collect only the essential information necessary to formulate, verify, process, and deliver your classical wellness consignments:
          </p>
          <ul className="list-disc pl-5 space-y-2 text-xs text-[#687168]">
            <li>
              <strong>Customer Identity & Communication:</strong> Full name, 10-digit Indian mobile telephone number, email address, and saved delivery addresses with PIN codes.
            </li>
            <li>
              <strong>Account Authentication:</strong> Email verification One-Time Passwords (OTPs) and account passwords stored strictly in salted, irreversible cryptographic hashes (bcrypt).
            </li>
            <li>
              <strong>Order & Fulfillment History:</strong> Formulation codes, pack sizes, quantities, order numbers, dispatch timestamps, and GST invoices.
            </li>
            <li>
              <strong>Ayurvedic Prakriti Consultation Data:</strong> Voluntary responses submitted through the 60-second Dosha Assessment (Vata, Pitta, Kapha) and Vaidya consultation requests, utilized solely to recommend tailored botanical oils and churnas.
            </li>
          </ul>
        </section>

        {/* Section 3: 100% Prepaid Payment Security */}
        <section className="space-y-3">
          <h2 className="text-base font-bold text-[#214E34] flex items-center gap-2 border-b border-[#E5E8E0] pb-2">
            <CreditCard className="w-4 h-4 text-[#214E34]" /> 3. 100% Prepaid Payments & Zero Financial Storage
          </h2>
          <p>
            To uphold the highest level of dispatch reliability, product hygiene, and seamless fulfillment, <strong>Axmin Prana Ayurveda operates strictly on 100% prepaid transactions</strong>.
          </p>
          <div className="bg-[#FAF8F1] p-4 rounded-xl border border-[#214E34]/20 space-y-2 text-xs">
            <p className="font-bold text-[#214E34]">Authorized Payment Gateways & Strict Zero-Storage Guarantee:</p>
            <ul className="list-disc pl-5 space-y-1 text-[#687168]">
              <li>We accept Instant UPI (Google Pay, PhonePe, Paytm, BHIM QR), RuPay, Visa, MasterCard, and NetBanking.</li>
              <li>Transactions are routed through RBI-authorized payment aggregators (Razorpay) certified under <strong>PCI-DSS Level 1</strong>.</li>
              <li><strong>Zero Credential Storage:</strong> Axmin Prana never receives, views, or stores your Credit/Debit Card numbers, CVV security codes, NetBanking credentials, or UPI MPINs.</li>
            </ul>
          </div>
        </section>

        {/* Section 4: Order Cancellation Policy */}
        <section className="space-y-3">
          <h2 className="text-base font-bold text-[#214E34] flex items-center gap-2 border-b border-[#E5E8E0] pb-2">
            <Clock className="w-4 h-4 text-[#214E34]" /> 4. Order Cancellation Policy (Pre-Dispatch Window)
          </h2>
          <p>
            Orders can be cancelled free of charge <strong>strictly prior to consignment packaging and dispensary shipping dispatch</strong>.
          </p>
          <ul className="list-disc pl-5 space-y-1.5 text-xs text-[#687168]">
            <li>
              <strong>Permitted Window:</strong> While your consignment is in <em>Placed</em>, <em>Confirmed</em>, or <em>Processing</em> state at our Haridwar dispensary hub.
            </li>
            <li>
              <strong>Post-Dispatch Restriction:</strong> Once carrier collection has occurred and an Air Waybill (AWB) tracking number has been generated, orders enter active transit and <strong>cannot be cancelled</strong>.
            </li>
            <li>
              <strong>Refund Processing:</strong> Verified pre-dispatch cancellations receive an immediate 100% refund credited back to the source UPI account or bank card within 2 to 7 business days.
            </li>
          </ul>
        </section>

        {/* Section 5: No Return & No Exchange Policy */}
        <section className="space-y-3">
          <h2 className="text-base font-bold text-[#214E34] flex items-center gap-2 border-b border-[#E5E8E0] pb-2">
            <ShieldAlert className="w-4 h-4 text-[#B86F4B]" /> 5. Strictly No Return & No Exchange Policy
          </h2>
          <p>
            Due to the therapeutic, personal-care, and consumable nature of classical Ayurvedic tailams (oils), churnas, capsules, and herbal formulations:
          </p>
          <div className="p-4 bg-red-50/70 border border-red-200 rounded-xl space-y-2 text-xs">
            <p className="font-bold text-red-900">
              Healthcare Hygiene Standard: No Return / No Exchange Accepted
            </p>
            <p className="text-[#687168] leading-relaxed">
              Once a consignment has been dispatched or delivered, it <strong>cannot be returned, exchanged, or restocked</strong> under any circumstances. This policy strictly safeguards our customers against contamination, temperature fluctuations, and unauthorized handling in compliance with the Drugs and Cosmetics Act.
            </p>
            <p className="text-[#687168]">
              <strong>Transit Damage Exception:</strong> In the rare event of transit bottle breakage, report the claim within <strong>24 to 48 hours of delivery</strong> with an unboxing video and photos to <a href="mailto:axminprana@gmail.com" className="font-bold text-[#214E34] underline">axminprana@gmail.com</a> for an immediate 100% free replacement.
            </p>
          </div>
        </section>

        {/* Section 6: Non-Disclosure & Third-Party Sharing */}
        <section className="space-y-3">
          <h2 className="text-base font-bold text-[#214E34] flex items-center gap-2 border-b border-[#E5E8E0] pb-2">
            <ShieldCheck className="w-4 h-4 text-[#214E34]" /> 6. Zero Third-Party Monetization
          </h2>
          <p>
            We adhere to a strict non-monetization code:
          </p>
          <ul className="list-disc pl-5 space-y-1.5 text-xs text-[#687168]">
            <li><strong>We never sell, rent, or trade</strong> your personal contact details, health assessments, or purchase history to third-party marketing companies, data brokers, or advertisers.</li>
            <li>Information is shared only with verified operational partners essential for order fulfillment: our contracted logistics carriers (Delhivery, Blue Dart, Speed Post) and transactional email/SMS infrastructure for OTPs and dispatch notifications.</li>
          </ul>
        </section>

        {/* Section 7: Official Channels & Communications */}
        <section className="space-y-3">
          <h2 className="text-base font-bold text-[#214E34] flex items-center gap-2 border-b border-[#E5E8E0] pb-2">
            <FileText className="w-4 h-4 text-[#214E34]" /> 7. Official Digital & Social Channels
          </h2>
          <p>
            Axmin Prana communicates with customers exclusively through verified official media channels. Follow and verify authentic Ayurvedic monographs, clinical formulation updates, and educational videos via:
          </p>
          <div className="flex flex-wrap items-center gap-3 pt-1">
            <a
              href="https://youtube.com/@axminpranaayurvedic?si=vwxvuXuMpYtZy8A3"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-[#214E34] hover:bg-[#FF0000] text-white px-3.5 py-2 rounded-lg text-xs font-semibold transition-all shadow-2xs"
            >
              <YouTubeIcon className="w-4 h-4" />
              <span>YouTube Official Channel</span>
            </a>
            <a
              href="https://www.instagram.com/axmin_prana_?utm_source=ig_web_button_share_sheet&xtok=ZDNlZDc0MzIxNw=="
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-[#214E34] hover:bg-[#E1306C] text-white px-3.5 py-2 rounded-lg text-xs font-semibold transition-all shadow-2xs"
            >
              <InstagramIcon className="w-4 h-4" />
              <span>Instagram (@axmin_prana_)</span>
            </a>
            <a
              href="https://www.facebook.com/profile.php?id=61594779705906"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-[#214E34] hover:bg-[#1877F2] text-white px-3.5 py-2 rounded-lg text-xs font-semibold transition-all shadow-2xs"
            >
              <FacebookIcon className="w-4 h-4" />
              <span>Facebook Official</span>
            </a>
          </div>
        </section>

        {/* Section 8: Grievance Officer & Contact */}
        <section className="space-y-3 pt-2 border-t border-[#E5E8E0]">
          <h2 className="text-base font-bold text-[#214E34]">8. Data Protection & Grievance Redressal Desk</h2>
          <p>
            In accordance with the Information Technology Act 2000 and the DPDP Act 2023, if you have any questions, concerns, or requests regarding your personal data or orders, please contact our designated Grievance Officer:
          </p>
          <div className="p-4 bg-[#FAF8F1] rounded-xl border border-[#E5E8E0] grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="space-y-1">
              <span className="text-[#687168] block text-[10px] uppercase font-bold">Email Helpline</span>
              <a href="mailto:axminprana@gmail.com" className="font-bold text-[#214E34] hover:underline flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5" /> axminprana@gmail.com
              </a>
            </div>
            <div className="space-y-1">
              <span className="text-[#687168] block text-[10px] uppercase font-bold">Customer Care Telephone</span>
              <a href="tel:+917561836584" className="font-bold text-[#214E34] hover:underline flex items-center gap-1.5">
                <Phone className="w-3.5 h-3.5" /> +91 75618 36584
              </a>
            </div>
          </div>
        </section>
      </div>

      {/* Cross Links */}
      <div className="flex flex-wrap items-center justify-between gap-4 text-xs font-semibold pt-2">
        <Link href="/policies/cancellation" className="text-[#214E34] hover:underline">
          &rarr; Order Cancellation Policy
        </Link>
        <Link href="/policies/returns" className="text-[#214E34] hover:underline">
          &rarr; No Return & No Exchange Policy
        </Link>
        <Link href="/policies/terms" className="text-[#214E34] hover:underline">
          &rarr; Terms & Conditions of Service
        </Link>
      </div>
    </div>
  );
}
