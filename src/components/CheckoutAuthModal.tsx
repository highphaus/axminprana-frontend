'use client';

import React, { useState, useEffect } from 'react';
import {
  Lock,
  Mail,
  User,
  Phone,
  ShieldCheck,
  Eye,
  EyeOff,
  X,
  KeyRound,
  CheckCircle2,
  RefreshCw,
  Sparkles
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

interface CheckoutAuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAuthenticated: () => void;
  initialName?: string;
  initialEmail?: string;
  initialPhone?: string;
}

export const CheckoutAuthModal: React.FC<CheckoutAuthModalProps> = ({
  isOpen,
  onClose,
  onAuthenticated,
  initialName = '',
  initialEmail = '',
  initialPhone = ''
}) => {
  const { login, register, sendOtp, verifyOtp, isAuthenticated } = useAuth();

  // Active Tab: 'signin' | 'signup'
  const [activeTab, setActiveTab] = useState<'signin' | 'signup'>('signin');

  // Sign In mode: 'otp' | 'password'
  const [loginMode, setLoginMode] = useState<'otp' | 'password'>('otp');

  // Form Fields
  const [name, setName] = useState(initialName);
  const [email, setEmail] = useState(initialEmail);
  const [phone, setPhone] = useState(initialPhone);
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  // OTP Flow
  const [otpStep, setOtpStep] = useState<'input' | 'verify'>('input');
  const [otp, setOtp] = useState('');
  const [otpNotice, setOtpNotice] = useState('');
  const [resendCooldown, setResendCooldown] = useState(0);

  // Status
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  // Update pre-filled values if props change
  useEffect(() => {
    if (initialName && !name) setName(initialName);
    if (initialEmail && !email) setEmail(initialEmail);
    if (initialPhone && !phone) setPhone(initialPhone);
  }, [initialName, initialEmail, initialPhone]);

  // Resend OTP countdown
  useEffect(() => {
    if (resendCooldown <= 0) return;
    const interval = setInterval(() => {
      setResendCooldown(prev => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, [resendCooldown]);

  // If already authenticated, close and trigger callback
  useEffect(() => {
    if (isOpen && isAuthenticated) {
      setSuccessMsg('Authenticated! Proceeding to secure payment...');
      const timer = setTimeout(() => {
        onAuthenticated();
      }, 700);
      return () => clearTimeout(timer);
    }
  }, [isOpen, isAuthenticated, onAuthenticated]);

  if (!isOpen) return null;

  // Handle Sign In with Password
  const handlePasswordLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !password) {
      setError('Please provide email and password');
      return;
    }
    setLoading(true);
    setError('');

    const res = await login(email.trim(), password);
    setLoading(false);

    if (res.success) {
      setSuccessMsg('Signed in successfully! Launching payment gateway...');
      setTimeout(() => onAuthenticated(), 600);
    } else {
      setError(res.message || 'Invalid email or password');
    }
  };

  // Handle Sending OTP for Sign In or Sign Up
  const handleSendOtp = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!email.trim()) {
      setError('Please enter your email address');
      return;
    }

    setLoading(true);
    setError('');

    const res = await sendOtp(
      email.trim(),
      activeTab === 'signup' ? name.trim() : undefined,
      activeTab === 'signup' ? phone.trim() : undefined,
      activeTab === 'signup' ? password : undefined
    );
    setLoading(false);

    if (res.success) {
      setOtpStep('verify');
      setOtpNotice(res.message || `A 6-digit verification code was sent to ${email.trim()}`);
      setResendCooldown(60);
    } else {
      setError(res.message || 'Could not send verification OTP. Try password login or verify your email.');
    }
  };

  // Handle Verifying OTP
  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (otp.trim().length < 4) {
      setError('Please enter the 6-digit verification code');
      return;
    }

    setLoading(true);
    setError('');

    const res = await verifyOtp(
      email.trim(),
      otp.trim(),
      activeTab === 'signup' ? name.trim() : undefined,
      activeTab === 'signup' ? phone.trim() : undefined,
      activeTab === 'signup' ? password : undefined
    );
    setLoading(false);

    if (res.success) {
      setSuccessMsg('Verified successfully! Launching payment gateway...');
      setTimeout(() => onAuthenticated(), 600);
    } else {
      setError(res.message || 'Invalid or expired OTP code');
    }
  };

  // Handle Direct Sign Up (with password)
  const handleDirectSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setError('Please enter your full name');
      return;
    }
    if (!email.trim()) {
      setError('Please enter your email address');
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

    const res = await register(name.trim(), email.trim(), password, phone.trim());
    setLoading(false);

    if (res.success) {
      setSuccessMsg('Account created successfully! Launching payment gateway...');
      setTimeout(() => onAuthenticated(), 600);
    } else {
      // If user already exists, suggest sign in
      if (res.message?.toLowerCase().includes('already exists')) {
        setError('An account with this email already exists. Please switch to Sign In tab.');
      } else {
        setError(res.message || 'Registration failed. Please try again.');
      }
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl border border-[#EDE8E0] overflow-hidden"
        onClick={e => e.stopPropagation()}
      >
        {/* Top Header Banner */}
        <div className="bg-[#1F4E34] text-white px-6 py-5 relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-white/70 hover:text-white p-1 rounded-full hover:bg-white/10 transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2 mb-1">
            <span className="w-7 h-7 rounded-full bg-[#C59B27] flex items-center justify-center text-white text-xs font-bold shadow-xs">
              <Lock className="w-3.5 h-3.5" />
            </span>
            <span className="text-[11px] font-bold uppercase tracking-widest text-[#E5D5BA]">
              Customer Authentication
            </span>
          </div>

          <h3 className="text-xl font-serif font-bold text-white">
            {activeTab === 'signin' ? 'Sign In to Complete Order' : 'Create an Account to Place Order'}
          </h3>
          <p className="text-xs text-white/80 mt-1">
            Authentic dispensary orders require verified customer identification for order tracking and dispatch updates.
          </p>
        </div>

        {/* Tab Selector */}
        <div className="flex border-b border-[#EDE8E0] bg-[#FAF8F1] text-xs font-bold">
          <button
            type="button"
            onClick={() => {
              setActiveTab('signin');
              setError('');
              setOtpStep('input');
            }}
            className={`flex-1 py-3 text-center border-b-2 transition-all ${
              activeTab === 'signin'
                ? 'border-[#1F4E34] text-[#1F4E34] bg-white'
                : 'border-transparent text-[#666] hover:text-[#1A1A1A]'
            }`}
          >
            Sign In (Existing Customer)
          </button>
          <button
            type="button"
            onClick={() => {
              setActiveTab('signup');
              setError('');
              setOtpStep('input');
            }}
            className={`flex-1 py-3 text-center border-b-2 transition-all ${
              activeTab === 'signup'
                ? 'border-[#1F4E34] text-[#1F4E34] bg-white'
                : 'border-transparent text-[#666] hover:text-[#1A1A1A]'
            }`}
          >
            Create Account (New Customer)
          </button>
        </div>

        <div className="p-6">
          {/* Alerts */}
          {error && (
            <div className="mb-4 p-3 rounded-lg bg-red-50 border border-red-200 text-red-700 text-xs font-medium">
              {error}
            </div>
          )}
          {successMsg && (
            <div className="mb-4 p-3 rounded-lg bg-green-50 border border-green-200 text-green-700 text-xs font-medium flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 shrink-0 text-green-600" />
              <span>{successMsg}</span>
            </div>
          )}

          {/* ===================== TAB 1: SIGN IN ===================== */}
          {activeTab === 'signin' && (
            <div>
              {/* Login Method Toggle */}
              <div className="flex gap-2 mb-4 p-1 bg-[#FAF8F1] rounded-lg border border-[#EDE8E0] text-xs">
                <button
                  type="button"
                  onClick={() => {
                    setLoginMode('otp');
                    setError('');
                  }}
                  className={`flex-1 py-1.5 rounded-md font-semibold transition-all ${
                    loginMode === 'otp'
                      ? 'bg-white text-[#1F4E34] shadow-xs'
                      : 'text-[#666] hover:text-[#1A1A1A]'
                  }`}
                >
                  Instant OTP Login
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setLoginMode('password');
                    setError('');
                  }}
                  className={`flex-1 py-1.5 rounded-md font-semibold transition-all ${
                    loginMode === 'password'
                      ? 'bg-white text-[#1F4E34] shadow-xs'
                      : 'text-[#666] hover:text-[#1A1A1A]'
                  }`}
                >
                  Password Login
                </button>
              </div>

              {loginMode === 'otp' ? (
                otpStep === 'input' ? (
                  <form onSubmit={handleSendOtp} className="space-y-4">
                    <div>
                      <label className="block text-xs font-semibold text-[#333] mb-1">
                        Registered Email Address
                      </label>
                      <div className="relative">
                        <Mail className="w-4 h-4 absolute left-3 top-2.5 text-[#888]" />
                        <input
                          type="email"
                          required
                          value={email}
                          onChange={e => setEmail(e.target.value)}
                          placeholder="aditi@example.com"
                          className="w-full pl-9 pr-3 py-2 text-xs border border-[#EDE8E0] rounded-lg focus:outline-hidden focus:border-[#1F4E34]"
                        />
                      </div>
                    </div>

                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full py-2.5 bg-[#1F4E34] hover:bg-[#163A28] text-white text-xs font-bold rounded-lg shadow-sm transition-all disabled:opacity-50"
                    >
                      {loading ? 'Sending Code...' : 'Send 6-Digit Verification Code'}
                    </button>
                  </form>
                ) : (
                  <form onSubmit={handleVerifyOtp} className="space-y-4">
                    <p className="text-xs text-[#555]">{otpNotice}</p>

                    <div>
                      <label className="block text-xs font-semibold text-[#333] mb-1">
                        Enter 6-Digit OTP Code
                      </label>
                      <div className="relative">
                        <KeyRound className="w-4 h-4 absolute left-3 top-2.5 text-[#888]" />
                        <input
                          type="text"
                          required
                          maxLength={6}
                          value={otp}
                          onChange={e => setOtp(e.target.value.replace(/\D/g, ''))}
                          placeholder="123456"
                          className="w-full pl-9 pr-3 py-2 text-sm tracking-widest text-center font-bold border border-[#EDE8E0] rounded-lg focus:outline-hidden focus:border-[#1F4E34]"
                        />
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-[11px]">
                      <button
                        type="button"
                        onClick={() => setOtpStep('input')}
                        className="text-[#1F4E34] hover:underline"
                      >
                        Change Email
                      </button>
                      <button
                        type="button"
                        disabled={resendCooldown > 0 || loading}
                        onClick={() => handleSendOtp()}
                        className="text-[#C59B27] font-semibold hover:underline disabled:opacity-40"
                      >
                        {resendCooldown > 0 ? `Resend in ${resendCooldown}s` : 'Resend Code'}
                      </button>
                    </div>

                    <button
                      type="submit"
                      disabled={loading || otp.length < 4}
                      className="w-full py-2.5 bg-[#1F4E34] hover:bg-[#163A28] text-white text-xs font-bold rounded-lg shadow-sm transition-all disabled:opacity-50"
                    >
                      {loading ? 'Verifying...' : 'Verify & Proceed to Payment'}
                    </button>
                  </form>
                )
              ) : (
                <form onSubmit={handlePasswordLogin} className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-[#333] mb-1">
                      Email Address
                    </label>
                    <div className="relative">
                      <Mail className="w-4 h-4 absolute left-3 top-2.5 text-[#888]" />
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        placeholder="aditi@example.com"
                        className="w-full pl-9 pr-3 py-2 text-xs border border-[#EDE8E0] rounded-lg focus:outline-hidden focus:border-[#1F4E34]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#333] mb-1">Password</label>
                    <div className="relative">
                      <Lock className="w-4 h-4 absolute left-3 top-2.5 text-[#888]" />
                      <input
                        type={showPassword ? 'text' : 'password'}
                        required
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        placeholder="Your account password"
                        className="w-full pl-9 pr-9 py-2 text-xs border border-[#EDE8E0] rounded-lg focus:outline-hidden focus:border-[#1F4E34]"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-2.5 text-[#888] hover:text-[#333]"
                      >
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-2.5 bg-[#1F4E34] hover:bg-[#163A28] text-white text-xs font-bold rounded-lg shadow-sm transition-all disabled:opacity-50"
                  >
                    {loading ? 'Authenticating...' : 'Sign In & Proceed to Payment'}
                  </button>
                </form>
              )}
            </div>
          )}

          {/* ===================== TAB 2: SIGN UP ===================== */}
          {activeTab === 'signup' && (
            <div>
              {otpStep === 'input' ? (
                <form onSubmit={handleDirectSignUp} className="space-y-3">
                  <div>
                    <label className="block text-xs font-semibold text-[#333] mb-1">Full Name *</label>
                    <div className="relative">
                      <User className="w-4 h-4 absolute left-3 top-2.5 text-[#888]" />
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={e => setName(e.target.value)}
                        placeholder="e.g. Aditi Sharma"
                        className="w-full pl-9 pr-3 py-2 text-xs border border-[#EDE8E0] rounded-lg focus:outline-hidden focus:border-[#1F4E34]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#333] mb-1">Email Address *</label>
                    <div className="relative">
                      <Mail className="w-4 h-4 absolute left-3 top-2.5 text-[#888]" />
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        placeholder="aditi@example.com"
                        className="w-full pl-9 pr-3 py-2 text-xs border border-[#EDE8E0] rounded-lg focus:outline-hidden focus:border-[#1F4E34]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#333] mb-1">Mobile Number (Optional)</label>
                    <div className="relative">
                      <Phone className="w-4 h-4 absolute left-3 top-2.5 text-[#888]" />
                      <input
                        type="tel"
                        maxLength={10}
                        value={phone}
                        onChange={e => setPhone(e.target.value.replace(/\D/g, ''))}
                        placeholder="10-digit phone (e.g. 9876543210)"
                        className="w-full pl-9 pr-3 py-2 text-xs border border-[#EDE8E0] rounded-lg focus:outline-hidden focus:border-[#1F4E34]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#333] mb-1">Create Password *</label>
                    <div className="relative">
                      <Lock className="w-4 h-4 absolute left-3 top-2.5 text-[#888]" />
                      <input
                        type={showPassword ? 'text' : 'password'}
                        required
                        minLength={6}
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        placeholder="At least 6 characters"
                        className="w-full pl-9 pr-9 py-2 text-xs border border-[#EDE8E0] rounded-lg focus:outline-hidden focus:border-[#1F4E34]"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-2.5 text-[#888] hover:text-[#333]"
                      >
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  <div className="pt-2 flex flex-col gap-2">
                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full py-2.5 bg-[#1F4E34] hover:bg-[#163A28] text-white text-xs font-bold rounded-lg shadow-sm transition-all disabled:opacity-50"
                    >
                      {loading ? 'Creating Account...' : 'Create Account & Place Order'}
                    </button>

                    <button
                      type="button"
                      onClick={() => handleSendOtp()}
                      disabled={loading || !email}
                      className="w-full py-2 bg-[#FAF8F1] hover:bg-[#EDE8E0] text-[#1F4E34] text-xs font-semibold rounded-lg border border-[#EDE8E0] transition-colors"
                    >
                      Verify via Email OTP Instead
                    </button>
                  </div>
                </form>
              ) : (
                <form onSubmit={handleVerifyOtp} className="space-y-4">
                  <p className="text-xs text-[#555]">{otpNotice}</p>

                  <div>
                    <label className="block text-xs font-semibold text-[#333] mb-1">
                      Enter 6-Digit OTP Code
                    </label>
                    <div className="relative">
                      <KeyRound className="w-4 h-4 absolute left-3 top-2.5 text-[#888]" />
                      <input
                        type="text"
                        required
                        maxLength={6}
                        value={otp}
                        onChange={e => setOtp(e.target.value.replace(/\D/g, ''))}
                        placeholder="123456"
                        className="w-full pl-9 pr-3 py-2 text-sm tracking-widest text-center font-bold border border-[#EDE8E0] rounded-lg focus:outline-hidden focus:border-[#1F4E34]"
                      />
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-[11px]">
                    <button
                      type="button"
                      onClick={() => setOtpStep('input')}
                      className="text-[#1F4E34] hover:underline"
                    >
                      Edit Info
                    </button>
                    <button
                      type="button"
                      disabled={resendCooldown > 0 || loading}
                      onClick={() => handleSendOtp()}
                      className="text-[#C59B27] font-semibold hover:underline disabled:opacity-40"
                    >
                      {resendCooldown > 0 ? `Resend in ${resendCooldown}s` : 'Resend Code'}
                    </button>
                  </div>

                  <button
                    type="submit"
                    disabled={loading || otp.length < 4}
                    className="w-full py-2.5 bg-[#1F4E34] hover:bg-[#163A28] text-white text-xs font-bold rounded-lg shadow-sm transition-all disabled:opacity-50"
                  >
                    {loading ? 'Verifying...' : 'Verify OTP & Place Order'}
                  </button>
                </form>
              )}
            </div>
          )}

          {/* Secure Trust Notice */}
          <div className="mt-4 pt-3 border-t border-[#EDE8E0] text-[11px] text-[#666] flex items-center justify-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-[#1F4E34]" />
            <span>256-bit SSL Encrypted • AYUSH Licensed Dispensary</span>
          </div>
        </div>
      </div>
    </div>
  );
};
