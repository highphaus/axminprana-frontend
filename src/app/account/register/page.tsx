'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Mail, User, Phone, Lock, Eye, EyeOff, ShieldCheck, KeyRound, CheckCircle2, RefreshCw } from 'lucide-react';
import { useAuth } from '../../../context/AuthContext';

export default function RegisterPage() {
  const router = useRouter();
  const { sendOtp, verifyOtp, isAuthenticated } = useAuth();

  // Registration step: 'details' | 'otp'
  const [step, setStep] = useState<'details' | 'otp'>('details');

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const [otp, setOtp] = useState('');
  const [otpSentMessage, setOtpSentMessage] = useState('');
  const [resendCooldown, setResendCooldown] = useState(0);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (isAuthenticated) {
      router.push('/account');
    }
  }, [isAuthenticated, router]);

  // Countdown timer for resend
  useEffect(() => {
    if (resendCooldown <= 0) return;
    const interval = setInterval(() => {
      setResendCooldown(prev => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, [resendCooldown]);

  if (isAuthenticated) {
    return null;
  }

  // Step 1: Send OTP to verify email for registration
  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setError('Please provide your full name');
      return;
    }
    if (!email.trim()) {
      setError('Please provide a valid email address');
      return;
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }
    if (phone && !/^[6-9]\d{9}$/.test(phone)) {
      setError('Please provide a valid 10-digit Indian mobile number');
      return;
    }

    setLoading(true);
    setError('');

    const res = await sendOtp(email.trim(), name.trim(), phone.trim(), password);
    setLoading(false);

    if (!res.success) {
      setError(res.message || 'Failed to dispatch verification code. Please try again.');
    } else {
      setStep('otp');
      setOtpSentMessage(res.message || `A 6-digit verification code has been dispatched to ${email}`);
      setResendCooldown(60);
    }
  };

  // Step 2: Verify OTP and complete registration
  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (otp.length < 4) {
      setError('Please enter the 6-digit verification code');
      return;
    }

    setLoading(true);
    setError('');

    const res = await verifyOtp(email.trim(), otp.trim(), name.trim(), phone.trim(), password);
    setLoading(false);

    if (!res.success) {
      setError(res.message || 'Invalid or expired verification code');
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
            Customer Registration
          </span>
          <h1 className="text-2xl font-serif-brand font-bold text-[#214E34]">Create Customer Profile</h1>
          <p className="text-xs text-[#687168]">
            {step === 'details'
              ? 'Enter your customer credentials and verify your email with a secure one-time passcode.'
              : `Enter the 6-digit security code dispatched to ${email}.`}
          </p>
        </div>

        {error && (
          <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded-md">
            {error}
          </div>
        )}

        {step === 'details' ? (
          <form onSubmit={handleSendOtp} className="space-y-4 text-xs">
            <div>
              <label className="block text-[#687168] mb-1 font-semibold">Full Name *</label>
              <div className="relative">
                <input
                  type="text"
                  required
                  value={name}
                  onChange={e => setName(e.target.value)}
                  placeholder="e.g. Priya Sharma"
                  className="w-full pl-9 pr-3 py-2.5 border border-[#E5E8E0] rounded-lg bg-[#FAF8F1] focus:bg-white text-base sm:text-xs outline-none focus:border-[#214E34]"
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
                  className="w-full pl-9 pr-3 py-2.5 border border-[#E5E8E0] rounded-lg bg-[#FAF8F1] focus:bg-white text-base sm:text-xs outline-none focus:border-[#214E34]"
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
                  className="w-full pl-9 pr-3 py-2.5 border border-[#E5E8E0] rounded-lg bg-[#FAF8F1] focus:bg-white text-base sm:text-xs outline-none focus:border-[#214E34]"
                />
                <Phone className="absolute left-3 top-3 w-4 h-4 text-[#687168]" />
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="block text-[#687168] font-semibold">Password *</label>
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="text-[11px] text-[#214E34] font-semibold hover:underline flex items-center gap-1 cursor-pointer"
                >
                  {showPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                  <span>{showPassword ? 'Hide Password' : 'Show Password'}</span>
                </button>
              </div>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  minLength={6}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="Minimum 6 characters"
                  className="w-full pl-9 pr-10 py-2.5 border border-[#E5E8E0] rounded-lg bg-[#FAF8F1] focus:bg-white text-base sm:text-xs outline-none focus:border-[#214E34]"
                />
                <Lock className="absolute left-3 top-3 w-4 h-4 text-[#687168]" />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-2.5 text-[#687168] hover:text-[#214E34] p-1 cursor-pointer"
                  aria-label="Toggle password visibility"
                >
                  {showPassword ? <EyeOff className="w-4 h-4 text-[#214E34]" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-[#214E34] hover:bg-[#163A28] text-white font-bold rounded-lg transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-xs disabled:opacity-50"
            >
              {loading ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>Sending Verification Code...</span>
                </>
              ) : (
                <>
                  <KeyRound className="w-4 h-4" />
                  <span>Send OTP & Register</span>
                </>
              )}
            </button>
          </form>
        ) : (
          <form onSubmit={handleVerifyOtp} className="space-y-4 text-xs">
            {otpSentMessage && (
              <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs rounded-lg flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-600" />
                <span>{otpSentMessage}</span>
              </div>
            )}

            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="block text-[#687168] font-semibold">
                  6-Digit Verification Code *
                </label>
                <button
                  type="button"
                  onClick={() => setStep('details')}
                  className="text-[11px] text-[#B86F4B] hover:underline cursor-pointer"
                >
                  Edit details
                </button>
              </div>
              <div className="relative">
                <input
                  type="text"
                  required
                  maxLength={6}
                  value={otp}
                  onChange={e => setOtp(e.target.value.replace(/\D/g, ''))}
                  placeholder="• • • • • •"
                  className="w-full py-3 px-4 text-center tracking-[0.5em] font-mono text-xl border border-[#E5E8E0] rounded-lg bg-[#FAF8F1] focus:bg-white outline-none focus:border-[#214E34] font-bold text-[#214E34]"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading || otp.length < 4}
              className="w-full py-3 bg-[#214E34] hover:bg-[#163A28] text-white font-bold rounded-lg transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-xs disabled:opacity-50"
            >
              {loading ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>Verifying Code...</span>
                </>
              ) : (
                <>
                  <ShieldCheck className="w-4 h-4" />
                  <span>Verify OTP & Complete Registration</span>
                </>
              )}
            </button>

            <div className="text-center pt-2">
              {resendCooldown > 0 ? (
                <span className="text-[11px] text-[#687168]">
                  Resend code in <strong className="font-mono text-[#214E34]">{resendCooldown}s</strong>
                </span>
              ) : (
                <button
                  type="button"
                  onClick={handleSendOtp}
                  disabled={loading}
                  className="text-xs text-[#214E34] hover:underline font-bold cursor-pointer"
                >
                  Did not receive code? Resend OTP
                </button>
              )}
            </div>
          </form>
        )}

        <div className="pt-4 border-t border-[#E5E8E0] text-center text-xs text-[#687168]">
          Already have an account?{' '}
          <Link href="/account/login" className="text-[#214E34] font-bold hover:underline">
            Sign In
          </Link>
        </div>
      </div>
    </div>
  );
}
