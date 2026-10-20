'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Building2,
  Mail,
  Phone,
  Send,
  CheckCircle2,
  ShieldCheck,
  Package,
  Layers,
  Sparkles,
  Award,
  FileCheck2,
  Truck
} from 'lucide-react';
import { API_BASE } from '../../lib/api';

export default function BulkOrdersPage() {
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    businessType: 'Spa & Wellness Center',
    productInterest: 'Kumkumadi Miraculous Radiant Tailam (Wholesale)',
    quantity: '10 to 50 Litres / Units',
    message: ''
  });

  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage(null);
    setSuccessMessage(null);

    try {
      const res = await fetch(`${API_BASE}/enquiries`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message || 'Failed to submit bulk enquiry');
      }

      setSuccessMessage(
        data.message ||
          'Your bulk order enquiry has been received. Our wholesale team will prepare your custom quotation with COA documentation within 24 business hours.'
      );
      setFormData({
        name: '',
        company: '',
        email: '',
        phone: '',
        businessType: 'Spa & Wellness Center',
        productInterest: 'Kumkumadi Miraculous Radiant Tailam (Wholesale)',
        quantity: '10 to 50 Litres / Units',
        message: ''
      });
    } catch (err: any) {
      setErrorMessage(err.message || 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-16 pb-16">
      {/* 1. Hero Banner */}
      <section className="bg-gradient-to-b from-[#163A28] to-[#214E34] text-white py-16 sm:py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="max-w-7xl mx-auto relative z-10 text-center space-y-4">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold tracking-widest uppercase bg-[#FAF8F1]/10 text-[#FAF8F1] border border-[#FAF8F1]/20">
            <Building2 className="w-3.5 h-3.5 text-[#B86F4B]" /> Commercial B2B & Wholesale Dispensary
          </span>
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-serif-brand font-bold text-[#FAF8F1] max-w-4xl mx-auto leading-tight">
            Wholesale Classical Formulations & Bulk Botanical Extracts
          </h1>
          <p className="text-sm sm:text-base text-[#DDE7D9] max-w-2xl mx-auto font-light">
            Direct-from-source Ayurvedic tailams, organic churnas, and standardized extracts for luxury resort spas, Ayurvedic clinics, premium cosmetic formulators, and wellness retailers.
          </p>

          <div className="pt-4 flex flex-wrap justify-center gap-6 text-xs text-[#FAF8F1]/90">
            <span className="flex items-center gap-1.5">
              <FileCheck2 className="w-4 h-4 text-[#B86F4B]" /> Batch-Wise GC/MS & COA Reports
            </span>
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-[#B86F4B]" /> AYUSH GMP Certified Manufacturing
            </span>
            <span className="flex items-center gap-1.5">
              <Truck className="w-4 h-4 text-[#B86F4B]" /> Pan-India Express Freight & Global Shipping
            </span>
          </div>
        </div>
      </section>

      {/* 2. Main RFQ Form & Highlights */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 sm:gap-12 items-start">
          {/* Left Column: Form */}
          <div className="lg:col-span-7 bg-white rounded-2xl border border-[#E5E8E0] shadow-sm p-6 sm:p-10 space-y-6">
            <div className="border-b border-[#E5E8E0] pb-4">
              <h2 className="text-2xl font-serif-brand font-bold text-[#214E34]">
                Request a Bulk Quotation (RFQ)
              </h2>
              <p className="text-xs text-[#687168] mt-1">
                Fill in your commercial requirements below. Our Chief Pharmacist will review your parameters and provide tiered wholesale pricing with lab specs.
              </p>
            </div>

            {successMessage && (
              <div className="p-4 bg-green-50 border border-green-200 rounded-xl flex items-start gap-3 text-green-800 text-xs">
                <CheckCircle2 className="w-5 h-5 text-green-600 shrink-0 mt-0.5" />
                <div>
                  <strong className="block font-bold">Enquiry Registered Successfully!</strong>
                  <p className="mt-0.5">{successMessage}</p>
                </div>
              </div>
            )}

            {errorMessage && (
              <div className="p-4 bg-red-50 border border-red-200 rounded-xl text-red-700 text-xs font-semibold">
                {errorMessage}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="font-bold text-[#202820]">Contact Person Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Dr. Rajesh Sharma"
                    value={formData.name}
                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3 py-2.5 rounded-lg border border-[#E5E8E0] bg-[#FAF8F1] focus:bg-white focus:outline-none focus:border-[#214E34]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-[#202820]">Organization / Clinic / Brand Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Ananda Wellness Retreats"
                    value={formData.company}
                    onChange={e => setFormData({ ...formData, company: e.target.value })}
                    className="w-full px-3 py-2.5 rounded-lg border border-[#E5E8E0] bg-[#FAF8F1] focus:bg-white focus:outline-none focus:border-[#214E34]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="font-bold text-[#202820]">Official Business Email *</label>
                  <input
                    type="email"
                    required
                    placeholder="procurement@company.com"
                    value={formData.email}
                    onChange={e => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-3 py-2.5 rounded-lg border border-[#E5E8E0] bg-[#FAF8F1] focus:bg-white focus:outline-none focus:border-[#214E34]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-[#202820]">Direct Phone / WhatsApp Number *</label>
                  <input
                    type="tel"
                    required
                    placeholder="+91 98765 43210"
                    value={formData.phone}
                    onChange={e => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-3 py-2.5 rounded-lg border border-[#E5E8E0] bg-[#FAF8F1] focus:bg-white focus:outline-none focus:border-[#214E34]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="font-bold text-[#202820]">Business Type</label>
                  <select
                    value={formData.businessType}
                    onChange={e => setFormData({ ...formData, businessType: e.target.value })}
                    className="w-full px-3 py-2.5 rounded-lg border border-[#E5E8E0] bg-[#FAF8F1] focus:bg-white focus:outline-none focus:border-[#214E34]"
                  >
                    <option value="Spa & Wellness Center">Spa & Ayurvedic Wellness Center</option>
                    <option value="Ayurvedic Clinic / Vaidya">Ayurvedic Clinic / Vaidya Practice</option>
                    <option value="Cosmetic / Skincare Brand">Cosmetic & Skincare Brand / Formulator</option>
                    <option value="Retail Store / Pharmacy">Retail Store / Holistic Pharmacy</option>
                    <option value="Exporter / Distributor">International Exporter / Distributor</option>
                    <option value="Other">Other Institutional Buyer</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-[#202820]">Product / Category of Interest *</label>
                  <select
                    value={formData.productInterest}
                    onChange={e => setFormData({ ...formData, productInterest: e.target.value })}
                    className="w-full px-3 py-2.5 rounded-lg border border-[#E5E8E0] bg-[#FAF8F1] focus:bg-white focus:outline-none focus:border-[#214E34]"
                  >
                    <option value="Kumkumadi Miraculous Radiant Tailam (Wholesale)">Kumkumadi Miraculous Radiant Tailam</option>
                    <option value="Bringadi Hair Therapy Tailam (Wholesale)">Bringadi Hair Therapy Tailam</option>
                    <option value="Ashwagandha Supreme KSM-66 Extract (Bulk)">Ashwagandha Supreme KSM-66® Extract</option>
                    <option value="Triphala Bio-Active Churna (Bulk)">Triphala Bio-Active Churna (Equal Ratio)</option>
                    <option value="Chyawanprash Supreme Awaleha (A2 Ghee Bulk)">Chyawanprash Supreme Awaleha (A2 Ghee)</option>
                    <option value="Brahmi & Shankhpushpi Memory Capsules (Bulk)">Brahmi & Shankhpushpi Extract</option>
                    <option value="Mahanarayan Joint Therapy Tailam (Wholesale)">Mahanarayan Joint Therapy Tailam</option>
                    <option value="Custom Classical Formulation Batch">Custom Classical Formulation Batch</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1">
                <label className="font-bold text-[#202820]">Estimated Order Volume / Quantity *</label>
                <select
                  value={formData.quantity}
                  onChange={e => setFormData({ ...formData, quantity: e.target.value })}
                  className="w-full px-3 py-2.5 rounded-lg border border-[#E5E8E0] bg-[#FAF8F1] focus:bg-white focus:outline-none focus:border-[#214E34]"
                >
                  <option value="5 to 10 Litres / 20 Units (Trial Batch)">5 to 10 Litres / 20 Units (Trial Wholesale Batch)</option>
                  <option value="10 to 50 Litres / Units">10 to 50 Litres / Units (Standard Clinic Tier)</option>
                  <option value="50 to 200 Litres / Units">50 to 200 Litres / Units (Commercial Tier)</option>
                  <option value="200+ Litres / Metric Drums">200+ Litres / Metric Drums (Industrial / Export Tier)</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="font-bold text-[#202820]">Project Scope, Delivery Pincode & Notes</label>
                <textarea
                  rows={4}
                  placeholder="Mention delivery location, desired packaging (e.g. 1L aluminium containers, 5L carboys, or white-label retail bottles), target schedule..."
                  value={formData.message}
                  onChange={e => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg border border-[#E5E8E0] bg-[#FAF8F1] focus:bg-white focus:outline-none focus:border-[#214E34]"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 bg-[#214E34] hover:bg-[#163A28] text-white font-bold rounded-lg shadow-sm transition-colors flex items-center justify-center gap-2 disabled:opacity-50 text-sm"
              >
                {loading ? (
                  <span>Submitting Enquiry...</span>
                ) : (
                  <>
                    <Send className="w-4 h-4" /> Submit Request for Quotation
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Right Column: Why Source from Axmin Prana */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-[#FAF8F1] p-6 sm:p-8 rounded-2xl border border-[#E5E8E0] space-y-6">
              <h3 className="text-xl font-serif-brand font-bold text-[#214E34]">
                The Axmin Prana Wholesale Guarantee
              </h3>

              <div className="space-y-4 text-xs">
                <div className="flex items-start gap-3.5">
                  <div className="w-8 h-8 rounded-lg bg-[#214E34]/10 text-[#214E34] flex items-center justify-center shrink-0">
                    <ShieldCheck className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-bold text-[#202820]">100% Unadulterated Classical Formulas</h4>
                    <p className="text-[#687168] mt-0.5">
                      No synthetic fillers, paraffin, mineral oil, or artificial dyes. Simmered strictly in certified copper and bronze vessels.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="w-8 h-8 rounded-lg bg-[#214E34]/10 text-[#214E34] flex items-center justify-center shrink-0">
                    <FileCheck2 className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-bold text-[#202820]">Comprehensive Batch COA & Heavy Metal Testing</h4>
                    <p className="text-[#687168] mt-0.5">
                      Every production run is certified free from Lead, Cadmium, Arsenic, and microbial contaminants according to Pharmacopoeial standards.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="w-8 h-8 rounded-lg bg-[#214E34]/10 text-[#214E34] flex items-center justify-center shrink-0">
                    <Package className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-bold text-[#202820]">Industrial Food-Grade & UV-Protected Packaging</h4>
                    <p className="text-[#687168] mt-0.5">
                      Dispatched in nitrogen-purged epoxy lined drums, amber HDPE carboys, or food-grade multi-layer moisture barriers.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="w-8 h-8 rounded-lg bg-[#214E34]/10 text-[#214E34] flex items-center justify-center shrink-0">
                    <Truck className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-bold text-[#202820]">Door-to-Door Insured Logistics</h4>
                    <p className="text-[#687168] mt-0.5">
                      Direct freight partnerships across India and global customs clearance assistance for institutional exporters.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Direct Helpline Box */}
            <div className="bg-[#163A28] text-white p-6 rounded-2xl space-y-4 text-xs">
              <h4 className="text-sm font-serif-brand font-bold text-[#FAF8F1]">
                Urgent Institutional Procurement?
              </h4>
              <p className="text-[#DDE7D9]/80">
                Speak directly with our Head of Formulations and B2B Operations:
              </p>
              <div className="space-y-2">
                <a
                  href="tel:+917561836584"
                  className="flex items-center gap-2 text-white hover:text-[#B86F4B] transition-colors font-bold"
                >
                  <Phone className="w-4 h-4 text-[#B86F4B]" /> +91 75618 36584
                </a>
                <a
                  href="mailto:axminprana@gmail.com"
                  className="flex items-center gap-2 text-white hover:text-[#B86F4B] transition-colors font-bold"
                >
                  <Mail className="w-4 h-4 text-[#B86F4B]" /> axminprana@gmail.com
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
