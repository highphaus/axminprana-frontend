'use client';

import React, { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Search, Truck, CheckCircle2, Clock, MapPin, Package, ArrowRight } from 'lucide-react';
import { fetchFromAPI } from '../../lib/api';

function TrackOrderContent() {
  const searchParams = useSearchParams();
  const initialNumber = searchParams.get('orderNumber') || '';

  const [orderNumber, setOrderNumber] = useState(initialNumber);
  const [loading, setLoading] = useState(false);
  const [orderData, setOrderData] = useState<any>(null);
  const [error, setError] = useState('');

  const fetchTracking = async (numberToSearch: string) => {
    if (!numberToSearch.trim()) return;
    setLoading(true);
    setError('');
    setOrderData(null);

    try {
      const res = await fetchFromAPI(`/orders/track/${encodeURIComponent(numberToSearch.trim())}`);
      if (res.success && res.data) {
        setOrderData(res.data);
      } else {
        setError(res.message || 'Order number not found');
      }
    } catch (err: any) {
      setError(err.message || 'Unable to find tracking records for this order number');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (initialNumber) {
      fetchTracking(initialNumber);
    }
  }, [initialNumber]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    fetchTracking(orderNumber);
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-8">
      <div className="text-center space-y-2">
        <span className="text-xs font-bold tracking-widest uppercase text-[#B86F4B]">
          Consignment Tracking
        </span>
        <h1 className="text-2xl sm:text-4xl font-serif-brand font-bold text-[#214E34]">
          Track Your Ayurveda Consignment
        </h1>
        <p className="text-xs sm:text-sm text-[#687168] max-w-md mx-auto">
          Enter your Order ID (found on your order confirmation SMS or receipt, e.g. AP-2026-XXXXXX)
        </p>
      </div>

      {/* Search Input */}
      <form onSubmit={handleSearch} className="bg-white p-2 rounded-xl border border-[#E5E8E0] shadow-sm flex gap-2">
        <div className="relative flex-1">
          <input
            type="text"
            required
            placeholder="Enter Order Number (e.g. AP-2026-981245)"
            value={orderNumber}
            onChange={e => setOrderNumber(e.target.value)}
            className="w-full pl-10 pr-4 py-3 text-base sm:text-sm uppercase font-mono bg-transparent focus:outline-none text-[#202820]"
          />
          <Search className="absolute left-3.5 top-3.5 w-4 h-4 text-[#687168]" />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="px-6 py-3 bg-[#214E34] hover:bg-[#163A28] text-white text-xs sm:text-sm font-semibold rounded-lg transition-colors shrink-0 disabled:opacity-50"
        >
          {loading ? 'Searching...' : 'Track'}
        </button>
      </form>

      {error && (
        <div className="p-4 bg-red-50 border border-red-200 text-red-700 text-xs rounded-xl text-center">
          {error}
        </div>
      )}

      {/* Tracking Results Card */}
      {orderData && (
        <div className="bg-white rounded-2xl border border-[#E5E8E0] p-6 sm:p-8 shadow-xs space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-[#E5E8E0] gap-2">
            <div>
              <span className="text-xs text-[#687168]">Consignment Status</span>
              <h3 className="text-lg font-bold text-[#214E34] capitalize">
                {orderData.orderStatus.replace(/_/g, ' ')}
              </h3>
            </div>
            <div className="text-left sm:text-right text-xs">
              <span className="text-[#687168] block">Delhivery Tracking AWN</span>
              <span className="font-mono font-bold text-[#202820]">{orderData.trackingNumber}</span>
            </div>
          </div>

          {/* Timeline */}
          <div className="space-y-4 pt-2">
            <h4 className="text-xs font-bold text-[#202820] uppercase tracking-wider">
              Transit Milestones
            </h4>
            <div className="space-y-4">
              {orderData.timeline?.map((milestone: any, i: number) => (
                <div key={i} className="flex gap-3 text-xs">
                  <div className="flex flex-col items-center">
                    <div className="w-3.5 h-3.5 rounded-full bg-[#214E34] ring-4 ring-[#DDE7D9]" />
                    {i < orderData.timeline.length - 1 && <div className="w-0.5 h-full bg-[#E5E8E0] my-1" />}
                  </div>
                  <div className="pb-3">
                    <p className="font-bold text-[#202820] capitalize">{milestone.status.replace(/_/g, ' ')}</p>
                    <p className="text-[#687168] mt-0.5">{milestone.message}</p>
                    <div className="text-[10px] text-[#687168]/80 mt-1 flex items-center gap-2">
                      <span>{new Date(milestone.timestamp).toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}</span>
                      {milestone.location && (
                        <span className="flex items-center gap-0.5 text-[#B86F4B]">
                          <MapPin className="w-3 h-3" /> {milestone.location}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Summary Box */}
          <div className="p-4 bg-[#FAF8F1] rounded-xl border border-[#E5E8E0] grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
            <div>
              <span className="text-[#687168] block">Destination</span>
              <span className="font-bold text-[#202820]">
                {orderData.shippingAddress.city}, {orderData.shippingAddress.state} ({orderData.shippingAddress.pincode})
              </span>
            </div>
            <div>
              <span className="text-[#687168] block">Payment</span>
              <span className="font-bold text-[#214E34] uppercase">{orderData.paymentStatus}</span>
            </div>
            <div>
              <span className="text-[#687168] block">Total Amount</span>
              <span className="font-bold text-[#202820]">₹{orderData.totalAmount}</span>
            </div>
          </div>

          {/* Cancellation & No Return Notice */}
          <div className="p-3.5 bg-white rounded-xl border border-[#E5E8E0] space-y-1 text-xs">
            <span className="font-bold text-[#214E34] block">Consignment Guidelines:</span>
            <p className="text-[#687168] text-[11px] leading-relaxed">
              • <strong>Cancellation Window:</strong> Cancellations are permitted strictly before the consignment is dispatched. Once shipped, transit cancellation is closed.
              <br />
              • <strong>Strictly No Return & No Exchange:</strong> Due to botanical clinical purity and consumable hygiene standards, delivered products cannot be returned or exchanged.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export default function TrackOrderPage() {
  return (
    <Suspense fallback={<div className="p-12 text-center text-xs">Loading tracking console...</div>}>
      <TrackOrderContent />
    </Suspense>
  );
}
