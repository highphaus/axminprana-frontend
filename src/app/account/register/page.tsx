'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Lock, Mail, User, Phone, ArrowRight, ShieldCheck } from 'lucide-react';
import { useAuth } from '../../../context/AuthContext';

export default function RegisterPage() {
  const router = useRouter();
  const { register, isAuthenticated } = useAuth();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  if (isAuthenticated) {
    router.push('/account');
    return null;
  }

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (phone && !/^[6-9]\d{9}$/.test(phone)) {
      setError('Please provide a valid 10-digit Indian mobile number');
      return;
    }

    setLoading(true);
    setError('');

    const res = await register(name, email, password, phone);
    setLoading(false);
    if (!res.success) {
      setError(res.message || 'Registration failed');
    } else {
      router.push('/account');
    }
  };

  return (
    <div className="max-w-md mx-auto px-4 py-12 sm:py-20">
      <div className="bg-white p-6 sm:p-8 rounded-2xl border border-[#E5E8E0] shadow-sm space-y-6">
        <div className="text-center space-y-2">
          <div className="w-16 h-16 rounded-full overflow-hidden mx-auto border border-[#214E34]/20 shadow-sm bg-[#FAF8F1]">
            <Image
              src="/images/logo.png"
              alt="Axmin Prana"
              width={64}
              height={64}
              className="w-full h-full object-contain"
            />
          </div>
          <span className="text-[10px] font-bold tracking-widest uppercase text-[#B86F4B] block">
            Create Patron Profile
          </span>
          <h1 className="text-2xl font-serif-brand font-bold text-[#214E34]">Join Axmin Prana</h1>
          <p className="text-xs text-[#687168]">
            Begin your classical Ayurvedic wellness journey with personalized herbal guidance.
          </p>
        </div>

        {error && (
          <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded-md">
            {error}
          </div>
        )}

        <form onSubmit={handleRegister} className="space-y-4 text-xs">
          <div>
            <label className="block text-[#687168] mb-1 font-semibold">Full Name *</label>
            <div className="relative">
              <input
                type="text"
                required
                value={name}
                onChange={e => setName(e.target.value)}
                placeholder="e.g. Priya Sharma"
                className="w-full pl-9 pr-3 py-2.5 border border-[#E5E8E0] rounded-lg bg-[#FAF8F1] focus:bg-white text-base sm:text-xs"
              />
              <User className="absolute left-3 top-3 w-4 h-4 text-[#687168]" />
            </div>
          </div>

          <div>
            <label className="block text-[#687168] mb-1 font-semibold">Email Address *</label>
            <div className="relative">
              <input
                type="email"
                required
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="priya@example.com"
                className="w-full pl-9 pr-3 py-2.5 border border-[#E5E8E0] rounded-lg bg-[#FAF8F1] focus:bg-white text-base sm:text-xs"
              />
              <Mail className="absolute left-3 top-3 w-4 h-4 text-[#687168]" />
            </div>
          </div>

          <div>
            <label className="block text-[#687168] mb-1 font-semibold">Mobile Number</label>
            <div className="relative">
              <input
                type="tel"
                maxLength={10}
                value={phone}
                onChange={e => setPhone(e.target.value.replace(/\D/g, ''))}
                placeholder="10-digit number (e.g. 9811223344)"
                className="w-full pl-9 pr-3 py-2.5 border border-[#E5E8E0] rounded-lg bg-[#FAF8F1] focus:bg-white text-base sm:text-xs"
              />
              <Phone className="absolute left-3 top-3 w-4 h-4 text-[#687168]" />
            </div>
          </div>

          <div>
            <label className="block text-[#687168] mb-1 font-semibold">Password *</label>
            <div className="relative">
              <input
                type="password"
                required
                minLength={6}
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="Minimum 6 characters"
                className="w-full pl-9 pr-3 py-2.5 border border-[#E5E8E0] rounded-lg bg-[#FAF8F1] focus:bg-white text-base sm:text-xs"
              />
              <Lock className="absolute left-3 top-3 w-4 h-4 text-[#687168]" />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-[#214E34] hover:bg-[#163A28] text-white text-xs font-bold rounded-lg shadow-sm transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {loading ? 'Creating Account...' : 'Create Account'} <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </form>

        <div className="text-center text-xs text-[#687168] pt-2 border-t border-[#E5E8E0]">
          Already have an account?{' '}
          <Link href="/account/login" className="text-[#214E34] font-bold hover:underline">
            Sign In here
          </Link>
        </div>
      </div>
    </div>
  );
}
