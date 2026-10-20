'use client';

import React, { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';
import {
  Lock,
  Mail,
  ArrowRight,
  ShieldCheck,
  Eye,
  EyeOff,
  KeyRound,
  CheckCircle2,
  RefreshCw
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectUrl = searchParams.get('redirect') || '';
  const { login, sendOtp, verifyOtp, isAuthenticated, isAdmin } = useAuth();

  // Mode: 'password' | 'otp' - default to OTP
  const [loginMode, setLoginMode] = useState<'password' | 'otp'>('otp');

  // Common State
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  // OTP State
  const [otpStep, setOtpStep] = useState<'input-email' | 'enter-otp'>('input-email');
  const [otp, setOtp] = useState('');
  const [otpSentMessage, setOtpSentMessage] = useState('');
  const [resendCooldown, setResendCooldown] = useState(0);

  // Loading & Error States
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Fix: Move router.push to useEffect so it NEVER runs during render
  useEffect(() => {
    if (isAuthenticated) {
      if (redirectUrl) {
        router.push(redirectUrl);
      } else if (isAdmin) {
        router.push('/admin');
      } else {
        router.push('/account');
      }
    }
  }, [isAuthenticated, isAdmin, redirectUrl, router]);

  // Cooldown countdown for OTP resend
  useEffect(() => {
    if (resendCooldown <= 0) return;
    const interval = setInterval(() => {
      setResendCooldown(prev => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, [resendCooldown]);

  if (isAuthenticated) {
    return (
      <div className="max-w-md mx-auto px-4 py-20 text-center">
        <div className="p-6 bg-white rounded-2xl border border-[#E5E8E0] shadow-sm space-y-3">
          <div className="w-10 h-10 mx-auto rounded-full bg-green-100 flex items-center justify-center text-green-700">
            <CheckCircle2 className="w-6 h-6" />
          </div>
          <h2 className="text-base font-bold text-[#214E34]">Authenticated</h2>
          <p className="text-xs text-[#687168]">Directing to your wellness portal...</p>
        </div>
      </div>
    );
  }

  // Handle Standard Password Login
  const handlePasswordLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const res = await login(email, password);
    setLoading(false);
    if (!res.success) {
      setError(res.message || 'Invalid email or password');
    } else {
      if (redirectUrl) {
        router.push(redirectUrl);
      } else if (res.role === 'admin') {
        router.push('/admin');
      } else {
        router.push('/account');
      }
    }
  };

  // Handle OTP Dispatch
  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      setError('Please provide your email address');
      return;
    }
    setLoading(true);
    setError('');

    const res = await sendOtp(email);
    setLoading(false);
    if (!res.success) {
      setError(res.message || 'Failed to dispatch verification code');
    } else {
      setOtpStep('enter-otp');
      setOtpSentMessage(res.message || `Verification code dispatched to ${email}`);
      setResendCooldown(60);
    }
  };

  // Handle OTP Verification
  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (otp.length < 4) {
      setError('Please enter the 6-digit verification code');
      return;
    }
    setLoading(true);
    setError('');

    const res = await verifyOtp(email, otp);
    setLoading(false);
    if (!res.success) {
      setError(res.message || 'Invalid or expired verification code');
    } else {
      if (redirectUrl) {
        router.push(redirectUrl);
      } else if (res.role === 'admin') {
        router.push('/admin');
      } else {
        router.push('/account');
      }
    }
  };

  return (
    <div className="max-w-md mx-auto px-4 py-12 sm:py-20">
      <div className="bg-white p-6 sm:p-8 rounded-2xl border border-[#E5E8E0] shadow-sm space-y-6">
        {/* Brand Header */}
        <div className="text-center space-y-2">
          <div className="w-16 h-16 rounded-full overflow-hidden mx-auto border border-[#214E34]/20 shadow-sm bg-[#FAF8F1]">
            <Image
              src="/images/logo.png"
              alt="Axmin Prana Logo"
              width={64}
              height={64}
              className="w-full h-full object-contain"
            />
          </div>
          <span className="text-[10px] font-bold tracking-widest uppercase text-[#B86F4B] block">
            Vedic Wellness Portal
          </span>
          <h1 className="text-2xl font-serif-brand font-bold text-[#214E34]">Sign In to Axmin Prana</h1>
          <p className="text-xs text-[#687168]">
            Access your herbal dispensations, track consignments, and inspect personalized wellness records.
          </p>
        </div>

        {/* Tab switcher: Sign In vs Create Account */}
        <div className="flex bg-[#FAF8F1] p-1 rounded-xl border border-[#E5E8E0]">
          <Link
            href="/login"
            className="flex-1 py-2 text-center text-xs font-bold rounded-lg bg-[#214E34] text-white shadow-xs transition-all"
          >
            Sign In
          </Link>
          <Link
            href="/signup"
            className="flex-1 py-2 text-center text-xs font-bold rounded-lg text-[#687168] hover:text-[#214E34] transition-all"
          >
            Create Account
          </Link>
        </div>

        {/* Toggle between Password Login and OTP Login */}
        <div className="flex border-b border-[#E5E8E0] text-xs font-semibold">
          <button
            type="button"
            onClick={() => {
              setLoginMode('password');
              setError('');
            }}
            className={`flex-1 pb-2 border-b-2 transition-all flex items-center justify-center gap-1.5 ${
              loginMode === 'password'
                ? 'border-[#214E34] text-[#214E34] font-bold'
                : 'border-transparent text-[#687168] hover:text-[#214E34]'
            }`}
          >
            <Lock className="w-3.5 h-3.5" /> Password Sign In
          </button>
          <button
            type="button"
            onClick={() => {
              setLoginMode('otp');
              setError('');
            }}
            className={`flex-1 pb-2 border-b-2 transition-all flex items-center justify-center gap-1.5 ${
              loginMode === 'otp'
                ? 'border-[#214E34] text-[#214E34] font-bold'
                : 'border-transparent text-[#687168] hover:text-[#214E34]'
            }`}
          >
            <KeyRound className="w-3.5 h-3.5" /> Email OTP Verification
          </button>
        </div>

        {error && (
          <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded-md">
            {error}
          </div>
        )}

        {/* MODE 1: Standard Password Login */}
        {loginMode === 'password' && (
          <form onSubmit={handlePasswordLogin} className="space-y-4 text-xs">
            <div>
              <label className="block text-[#687168] mb-1 font-semibold">Email Address *</label>
              <div className="relative">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="customer@axminprana.com"
                  className="w-full pl-9 pr-3 py-2.5 border border-[#E5E8E0] rounded-lg bg-[#FAF8F1] focus:bg-white text-base sm:text-xs outline-none focus:border-[#214E34]"
                />
                <Mail className="absolute left-3 top-3 w-4 h-4 text-[#687168]" />
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="block text-[#687168] font-semibold">Password *</label>
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="text-[11px] text-[#214E34] font-semibold hover:underline flex items-center gap-1"
                >
                  {showPassword ? <EyeOff className="w-3 h-3" /> : <Eye className="w-3 h-3 text-[#214E34]" />}
                  <span>{showPassword ? 'Hide Password' : 'Show Password'}</span>
                </button>
              </div>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-9 pr-10 py-2.5 border border-[#E5E8E0] rounded-lg bg-[#FAF8F1] focus:bg-white text-base sm:text-xs outline-none focus:border-[#214E34]"
                />
                <Lock className="absolute left-3 top-3 w-4 h-4 text-[#687168]" />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-2.5 text-[#687168] hover:text-[#214E34] p-1"
                  aria-label="Toggle password visibility"
                >
                  {showPassword ? <EyeOff className="w-4 h-4 text-[#214E34]" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-[#214E34] hover:bg-[#163A28] text-white text-xs font-bold rounded-lg shadow-sm transition-colors flex items-center justify-center gap-2 disabled:opacity-50 cursor-pointer"
            >
              {loading ? 'Authenticating...' : 'Sign In with Password'} <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </form>
        )}

        {/* MODE 2: OTP Verification Login */}
        {loginMode === 'otp' && (
          <div className="space-y-4 text-xs">
            {otpStep === 'input-email' ? (
              <form onSubmit={handleSendOtp} className="space-y-4">
                <div>
                  <label className="block text-[#687168] mb-1 font-semibold">Registered Email Address *</label>
                  <div className="relative">
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      placeholder="customer@axminprana.com"
                      className="w-full pl-9 pr-3 py-2.5 border border-[#E5E8E0] rounded-lg bg-[#FAF8F1] focus:bg-white text-base sm:text-xs outline-none focus:border-[#214E34]"
                    />
                    <Mail className="absolute left-3 top-3 w-4 h-4 text-[#687168]" />
                  </div>
                </div>

                <div className="p-3 bg-[#FAF8F1] rounded-lg border border-[#E5E8E0] text-[11px] text-[#687168] flex items-start gap-2">
                  <ShieldCheck className="w-4 h-4 text-[#214E34] shrink-0 mt-0.5" />
                  <span>We will dispatch a secure 6-digit verification code from <strong>axminprana@gmail.com</strong>.</span>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3 bg-[#214E34] hover:bg-[#163A28] text-white text-xs font-bold rounded-lg shadow-sm transition-colors flex items-center justify-center gap-2 disabled:opacity-50 cursor-pointer"
                >
                  {loading ? 'Dispatching OTP Code...' : 'Send Verification Code (OTP)'} <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </form>
            ) : (
              <form onSubmit={handleVerifyOtp} className="space-y-4">
                {otpSentMessage && (
                  <div className="p-3 bg-green-50 border border-green-200 text-green-800 text-xs rounded-lg flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-700 shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold">{otpSentMessage}</p>
                      <button
                        type="button"
                        onClick={() => {
                          setOtpStep('input-email');
                          setError('');
                        }}
                        className="text-[11px] text-[#214E34] underline font-bold mt-1"
                      >
                        Change Email ({email})
                      </button>
                    </div>
                  </div>
                )}

                <div>
                  <label className="block text-[#687168] mb-1 font-semibold">Enter 6-Digit Verification Code *</label>
                  <div className="relative">
                    <input
                      type="text"
                      maxLength={6}
                      required
                      value={otp}
                      onChange={e => setOtp(e.target.value.replace(/\D/g, ''))}
                      placeholder="e.g. 822296"
                      className="w-full pl-9 pr-3 py-3 border-2 border-[#214E34] rounded-lg bg-white text-center font-mono text-lg font-bold tracking-widest outline-none"
                    />
                    <KeyRound className="absolute left-3 top-3.5 w-4 h-4 text-[#214E34]" />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading || otp.length < 4}
                  className="w-full py-3 bg-[#214E34] hover:bg-[#163A28] text-white text-xs font-bold rounded-lg shadow-sm transition-colors flex items-center justify-center gap-2 disabled:opacity-50 cursor-pointer"
                >
                  {loading ? 'Verifying...' : 'Verify Code & Sign In'} <ArrowRight className="w-3.5 h-3.5" />
                </button>

                <div className="text-center pt-1 flex items-center justify-center gap-3">
                  <button
                    type="button"
                    disabled={resendCooldown > 0 || loading}
                    onClick={handleSendOtp}
                    className="text-[11px] font-semibold text-[#214E34] hover:underline disabled:text-[#A0AEC0] flex items-center gap-1"
                  >
                    <RefreshCw className="w-3 h-3" />
                    {resendCooldown > 0 ? `Resend Code in ${resendCooldown}s` : 'Resend Code'}
                  </button>
                </div>
              </form>
            )}
          </div>
        )}

        <div className="text-center text-xs text-[#687168] pt-3 border-t border-[#E5E8E0]">
          New to Axmin Prana Ayurveda?{' '}
          <Link href="/signup" className="text-[#214E34] font-bold hover:underline">
            Register here
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="p-12 text-center text-xs text-[#687168]">Loading portal...</div>}>
      <LoginForm />
    </Suspense>
  );
}
