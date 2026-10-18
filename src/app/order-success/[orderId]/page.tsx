import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { CheckCircle2, Package, Truck, ArrowRight, ShieldCheck, MapPin, Printer } from 'lucide-react';

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

interface PageProps {
  params: Promise<{ orderId: string }>;
}

async function getOrder(orderId: string) {
  try {
    const res = await fetch(`${API_BASE}/orders/${orderId}`, { cache: 'no-store' });
    if (!res.ok) return null;
    const data = await res.json();
    return data.data || null;
  } catch (e) {
    return null;
  }
}

export default async function OrderSuccessPage({ params }: PageProps) {
  const { orderId } = await params;
  const order = await getOrder(orderId);

  if (!order) {
    notFound();
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-8">
      {/* Success Banner */}
      <div className="bg-[#FAF8F1] border border-[#214E34]/20 rounded-2xl p-6 sm:p-8 text-center space-y-3">
        <div className="w-16 h-16 bg-[#214E34] text-white rounded-full flex items-center justify-center mx-auto shadow-md">
          <CheckCircle2 className="w-8 h-8 text-[#DDE7D9]" />
        </div>
        <span className="inline-block bg-[#DDE7D9] text-[#214E34] text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
          Order Confirmed & Logged
        </span>
        <h1 className="text-2xl sm:text-3xl font-serif-brand font-bold text-[#214E34]">
          Dhanyawad for Choosing Classical Ayurveda
        </h1>
        <p className="text-xs sm:text-sm text-[#687168] max-w-lg mx-auto leading-relaxed">
          Your order has been recorded in our Ayurvedic dispensary. Our Vaidyas are preparing your batch with classical precision.
        </p>
        <div className="pt-2 flex flex-wrap justify-center gap-4 text-xs font-mono font-bold text-[#202820]">
          <span className="bg-white px-3 py-1.5 rounded border border-[#E5E8E0]">
            Order #: <strong>{order.orderNumber}</strong>
          </span>
          <span className="bg-white px-3 py-1.5 rounded border border-[#E5E8E0]">
            Tracking #: <strong>{order.trackingNumber}</strong>
          </span>
        </div>
      </div>

      {/* Delhivery Express Status Timeline */}
      <div className="bg-white rounded-xl border border-[#E5E8E0] p-6 shadow-2xs space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-[#E5E8E0]">
          <h3 className="text-xs font-bold text-[#202820] uppercase tracking-wider flex items-center gap-2">
            <Truck className="w-4 h-4 text-[#214E34]" /> Fulfillment & Dispatch Status
          </h3>
          <span className="text-xs font-semibold text-[#214E34] capitalize">
            Carrier: {order.carrier}
          </span>
        </div>

        <div className="space-y-4">
          {order.timeline && order.timeline.length > 0 ? (
            order.timeline.map((event: any, i: number) => (
              <div key={i} className="flex gap-3 text-xs">
                <div className="flex flex-col items-center">
                  <div className="w-3 h-3 rounded-full bg-[#214E34] ring-4 ring-[#DDE7D9]" />
                  {i < order.timeline.length - 1 && <div className="w-0.5 h-full bg-[#E5E8E0] my-1" />}
                </div>
                <div className="pb-2">
                  <p className="font-bold text-[#202820] capitalize">{event.status.replace(/_/g, ' ')}</p>
                  <p className="text-[#687168]">{event.message}</p>
                  <span className="text-[10px] text-[#687168]/70 block mt-0.5">
                    {new Date(event.timestamp).toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}
                    {event.location ? ` • ${event.location}` : ''}
                  </span>
                </div>
              </div>
            ))
          ) : (
            <p className="text-xs text-[#687168]">Order logged. Awaiting dispensary batch preparation.</p>
          )}
        </div>
      </div>

      {/* Order Items & Receipt */}
      <div className="bg-white rounded-xl border border-[#E5E8E0] p-6 shadow-2xs space-y-4">
        <h3 className="text-xs font-bold text-[#202820] uppercase tracking-wider pb-3 border-b border-[#E5E8E0]">
          Itemized Invoice & Formulations
        </h3>

        <div className="divide-y divide-[#E5E8E0]">
          {order.items.map((item: any, i: number) => (
            <div key={i} className="py-3 flex items-center justify-between gap-4 text-xs">
              <div className="flex items-center gap-3">
                <div className="relative w-12 h-12 rounded bg-[#FAF8F1] overflow-hidden shrink-0 border border-[#E5E8E0]">
                  <Image src={item.thumbnail} alt={item.name} fill className="object-cover" />
                </div>
                <div>
                  <h4 className="font-bold text-[#202820]">{item.name}</h4>
                  <p className="text-[11px] text-[#687168]">{item.packSize} • Qty: {item.quantity}</p>
                </div>
              </div>
              <span className="font-bold text-[#214E34]">₹{item.total}</span>
            </div>
          ))}
        </div>

        {/* Pricing Summary */}
        <div className="space-y-1.5 text-xs text-[#687168] pt-3 border-t border-[#E5E8E0]">
          <div className="flex justify-between">
            <span>Subtotal</span>
            <span className="font-medium text-[#202820]">₹{order.subtotal}</span>
          </div>
          {order.discountAmount > 0 && (
            <div className="flex justify-between text-[#B86F4B] font-semibold">
              <span>Coupon Discount ({order.couponCode})</span>
              <span>-₹{order.discountAmount}</span>
            </div>
          )}
          <div className="flex justify-between">
            <span>GST (5% Ayurvedic Healthcare)</span>
            <span className="font-medium text-[#202820]">₹{order.taxAmount}</span>
          </div>
          <div className="flex justify-between">
            <span>Delivery Fee</span>
            <span className="font-medium text-[#202820]">
              {order.shippingFee === 0 ? <strong className="text-[#214E34]">FREE</strong> : `₹${order.shippingFee}`}
            </span>
          </div>
          <div className="flex justify-between text-sm font-bold text-[#202820] pt-2 border-t border-[#E5E8E0]">
            <span>Total Paid ({order.paymentMethod.toUpperCase()})</span>
            <span className="text-[#214E34] text-base">₹{order.totalAmount}</span>
          </div>
        </div>

        {/* Shipping Address */}
        <div className="pt-4 border-t border-[#E5E8E0] text-xs">
          <span className="font-bold text-[#202820] block mb-1">Delivering To:</span>
          <p className="text-[#687168]">
            {order.shippingAddress.fullName} • +91 {order.shippingAddress.phone}
          </p>
          <p className="text-[#687168]">
            {order.shippingAddress.addressLine1}
            {order.shippingAddress.addressLine2 ? `, ${order.shippingAddress.addressLine2}` : ''}
          </p>
          <p className="text-[#687168]">
            {order.shippingAddress.city}, {order.shippingAddress.state} - {order.shippingAddress.pincode}
          </p>
        </div>
      </div>

      {/* Action Navigation */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-center pt-2">
        <Link
          href={`/track-order?orderNumber=${order.orderNumber}`}
          className="w-full sm:w-auto px-6 py-3 bg-[#214E34] hover:bg-[#163A28] text-white text-xs font-semibold rounded-md text-center transition-colors"
        >
          Track Live Consignment
        </Link>
        <Link
          href="/shop"
          className="w-full sm:w-auto px-6 py-3 border border-[#214E34] text-[#214E34] hover:bg-[#DDE7D9]/40 text-xs font-semibold rounded-md text-center transition-colors"
        >
          Explore More Formulations &rarr;
        </Link>
      </div>
    </div>
  );
}
