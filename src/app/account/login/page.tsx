'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Lock, Mail, ArrowRight, ShieldCheck, UserCheck } from 'lucide-react';
import { useAuth } from '../../../context/AuthContext';

export default function LoginPage() {
  const router = useRouter();
  const { login, isAuthenticated } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  if (isAuthenticated) {
    router.push('/account');
    return null;
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const res = await login(email, password);
    setLoading(false);
    if (!res.success) {
      setError(res.message || 'Invalid email or password');
    } else {
      router.push('/account');
    }
  };

  const handleQuickDemoCustomer = () => {
    setEmail('customer@axminprana.com');
    setPassword('Customer@12345');
  };

  const handleQuickDemoAdmin = () => {
    setEmail('admin@axminprana.com');
    setPassword('Admin@12345');
  };

  return (
    <div className="max-w-md mx-auto px-4 py-12 sm:py-20">
      <div className="bg-white p-6 sm:p-8 rounded-2xl border border-[#E5E8E0] shadow-sm space-y-6">
        <div className="text-center space-y-1">
          <span className="text-[10px] font-bold tracking-widest uppercase text-[#B86F4B]">
            Vedic Wellness Portal
          </span>
          <h1 className="text-2xl font-serif-brand font-bold text-[#214E34]">Sign In to Your Account</h1>
          <p className="text-xs text-[#687168]">Access past orders, saved addresses, and tailored Prakriti wellness records.</p>
        </div>

        {/* Demo Fast Login Pills */}
        <div className="bg-[#FAF8F1] p-3 rounded-lg border border-[#E5E8E0] space-y-2">
          <span className="text-[10px] font-bold uppercase tracking-wider text-[#214E34] block">
            Quick Client Testing Credentials:
          </span>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={handleQuickDemoCustomer}
              className="flex-1 py-1 px-2 bg-white border border-[#E5E8E0] rounded text-[11px] font-semibold text-[#202820] hover:border-[#214E34]"
            >
              Fill Demo Customer
            </button>
            <button
              type="button"
              onClick={handleQuickDemoAdmin}
              className="flex-1 py-1 px-2 bg-[#214E34] text-white rounded text-[11px] font-semibold hover:bg-[#163A28]"
            >
              Fill Demo Admin
            </button>
          </div>
        </div>

        {error && (
          <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded-md">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4 text-xs">
          <div>
            <label className="block text-[#687168] mb-1 font-semibold">Email Address</label>
            <div className="relative">
              <input
                type="email"
                required
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="you@domain.com"
                className="w-full pl-9 pr-3 py-2.5 border border-[#E5E8E0] rounded-lg bg-[#FAF8F1] focus:bg-white text-xs"
              />
              <Mail className="absolute left-3 top-3 w-4 h-4 text-[#687168]" />
            </div>
          </div>

          <div>
            <label className="block text-[#687168] mb-1 font-semibold">Password</label>
            <div className="relative">
              <input
                type="password"
                required
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-9 pr-3 py-2.5 border border-[#E5E8E0] rounded-lg bg-[#FAF8F1] focus:bg-white text-xs"
              />
              <Lock className="absolute left-3 top-3 w-4 h-4 text-[#687168]" />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-[#214E34] hover:bg-[#163A28] text-white text-xs font-bold rounded-lg shadow-sm transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {loading ? 'Authenticating...' : 'Sign In'} <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </form>

        <div className="text-center text-xs text-[#687168] pt-2 border-t border-[#E5E8E0]">
          Don&apos;t have an account yet?{' '}
          <Link href="/account/register" className="text-[#214E34] font-bold hover:underline">
            Register here
          </Link>
        </div>
      </div>
    </div>
  );
}
