'use client';

import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle2, Clock } from 'lucide-react';
import { InstagramIcon, WhatsAppIcon, FacebookIcon, YouTubeIcon } from '../../components/SocialIcons';

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', message: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-12">
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <span className="text-xs font-bold tracking-widest uppercase text-[#B86F4B]">
          Connect with Our Vaidyas
        </span>
        <h1 className="text-3xl sm:text-5xl font-serif-brand font-bold text-[#214E34]">
          Get in Touch
        </h1>
        <p className="text-xs sm:text-sm text-[#687168]">
          Have questions regarding an order, batch certificates, or personalized dosage? We are here to support your holistic wellness.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Contact Info Card */}
        <div className="lg:col-span-5 bg-[#163A28] text-white p-6 sm:p-8 rounded-2xl shadow-md space-y-6">
          <div>
            <h3 className="text-lg font-serif-brand font-bold">Kerala Wellness Hub</h3>
            <p className="text-xs text-[#DDE7D9]/80 mt-1">Axmin Prana Ayurveda Corporate & Dispensary Facility</p>
          </div>

          <div className="space-y-4 text-xs">
            <div className="flex items-start gap-3">
              <MapPin className="w-4 h-4 text-[#B86F4B] shrink-0 mt-0.5" />
              <div>
                <strong className="block text-white">Registered Dispensary:</strong>
                <span className="text-[#DDE7D9]/80">
                  Kallara, Trivandrum, Kerala – 695608, India
                </span>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Phone className="w-4 h-4 text-[#B86F4B] shrink-0 mt-0.5" />
              <div>
                <strong className="block text-white">Direct Helpline & Support:</strong>
                <a href="tel:+917561836584" className="text-[#DDE7D9] hover:text-white transition-colors font-medium">
                  +91 75618 36584 (Mon - Sat, 9 AM - 6 PM IST)
                </a>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Mail className="w-4 h-4 text-[#B86F4B] shrink-0 mt-0.5" />
              <div>
                <strong className="block text-white">Direct Email Correspondence:</strong>
                <a href="mailto:axminprana@gmail.com" className="text-[#DDE7D9] hover:text-white transition-colors font-medium">
                  axminprana@gmail.com
                </a>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Clock className="w-4 h-4 text-[#B86F4B] shrink-0 mt-0.5" />
              <div>
                <strong className="block text-white">Dispensary Hours:</strong>
                <span className="text-[#DDE7D9]/80">Monday through Saturday: 09:00 - 18:00 IST</span>
              </div>
            </div>
          </div>

          {/* Social Channels */}
          <div className="pt-4 border-t border-white/10 space-y-2">
            <span className="block text-[11px] font-bold uppercase tracking-wider text-[#DDE7D9]/70">
              Official Social Channels:
            </span>
            <div className="flex flex-wrap items-center gap-2.5">
              <a
                href="https://www.instagram.com/axmin_prana_?utm_source=ig_web_button_share_sheet&xtok=ZDNlZDc0MzIxNw=="
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 bg-[#214E34] hover:bg-[#E1306C] text-white px-3 py-1.5 rounded-lg text-xs font-medium transition-all shadow-xs"
              >
                <InstagramIcon className="w-3.5 h-3.5" />
                <span>Instagram</span>
              </a>
              <a
                href="https://wa.me/917561836584?text=Hello%20Axmin%20Prana%20Ayurveda"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 bg-[#214E34] hover:bg-[#25D366] text-white px-3 py-1.5 rounded-lg text-xs font-medium transition-all shadow-xs"
              >
                <WhatsAppIcon className="w-3.5 h-3.5" />
                <span>WhatsApp (+91 75618 36584)</span>
              </a>
              <a
                href="https://www.facebook.com/profile.php?id=61594779705906"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 bg-[#214E34] hover:bg-[#1877F2] text-white px-3 py-1.5 rounded-lg text-xs font-medium transition-all shadow-xs"
              >
                <FacebookIcon className="w-3.5 h-3.5" />
                <span>Facebook</span>
              </a>
              <a
                href="https://youtube.com/@axminpranaayurvedic?si=vwxvuXuMpYtZy8A3"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 bg-[#214E34] hover:bg-[#FF0000] text-white px-3 py-1.5 rounded-lg text-xs font-medium transition-all shadow-xs"
              >
                <YouTubeIcon className="w-3.5 h-3.5" />
                <span>YouTube</span>
              </a>
            </div>
          </div>

          <div className="pt-2 text-[11px] text-[#DDE7D9]/60">
            Govt. of India AYUSH License: AYU/DL/IND-2024-8841
          </div>
        </div>

        {/* Contact Form */}
        <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-2xl border border-[#E5E8E0] shadow-2xs">
          {submitted ? (
            <div className="p-8 text-center space-y-3">
              <div className="w-12 h-12 bg-green-100 text-green-700 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-[#214E34]">Message Received</h3>
              <p className="text-xs text-[#687168] max-w-sm mx-auto">
                Thank you for reaching out. One of our clinical Vaidyas or customer care specialists will reply within 24 business hours.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <h3 className="text-sm font-bold text-[#202820] uppercase tracking-wider pb-2 border-b border-[#E5E8E0]">
                Send an Inquiry to Our Ayurvedic Panel
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[#687168] mb-1 font-semibold">Your Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3 py-2 border border-[#E5E8E0] rounded-md bg-[#FAF8F1] focus:bg-white text-base sm:text-xs"
                  />
                </div>
                <div>
                  <label className="block text-[#687168] mb-1 font-semibold">Email Address *</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={e => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-3 py-2 border border-[#E5E8E0] rounded-md bg-[#FAF8F1] focus:bg-white text-base sm:text-xs"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[#687168] mb-1 font-semibold">Mobile Number</label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={e => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="10-digit number"
                  className="w-full px-3 py-2 border border-[#E5E8E0] rounded-md bg-[#FAF8F1] focus:bg-white text-base sm:text-xs"
                />
              </div>

              <div>
                <label className="block text-[#687168] mb-1 font-semibold">Your Inquiry / Health Concerns *</label>
                <textarea
                  rows={4}
                  required
                  value={formData.message}
                  onChange={e => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Detail your question regarding products, batch info, or orders..."
                  className="w-full px-3 py-2 border border-[#E5E8E0] rounded-md bg-[#FAF8F1] focus:bg-white text-base sm:text-xs"
                />
              </div>

              <button
                type="submit"
                className="px-6 py-3 bg-[#214E34] hover:bg-[#163A28] text-white font-semibold rounded-md flex items-center gap-2 transition-colors"
              >
                <Send className="w-3.5 h-3.5" /> Submit Inquiry
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
