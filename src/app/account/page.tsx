'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import {
  User,
  Package,
  MapPin,
  Heart,
  LogOut,
  Shield,
  Truck,
  Plus,
  Trash2,
  ExternalLink
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { fetchFromAPI } from '../../lib/api';

export default function AccountDashboardPage() {
  const router = useRouter();
  const { user, token, isAuthenticated, isAdmin, logout, refreshUser } = useAuth();

  const [activeTab, setActiveTab] = useState<'orders' | 'addresses' | 'profile'>('orders');
  const [orders, setOrders] = useState<any[]>([]);
  const [loadingOrders, setLoadingOrders] = useState(true);

  // New Address Form State
  const [showAddressModal, setShowAddressModal] = useState(false);
  const [newFullName, setNewFullName] = useState('');
  const [newPhone, setNewPhone] = useState('');
  const [newAddressLine1, setNewAddressLine1] = useState('');
  const [newAddressLine2, setNewAddressLine2] = useState('');
  const [newCity, setNewCity] = useState('');
  const [newState, setNewState] = useState('Uttarakhand');
  const [newPincode, setNewPincode] = useState('');
  const [savingAddress, setSavingAddress] = useState(false);

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/account/login');
      return;
    }

    const loadOrders = async () => {
      try {
        const res = await fetchFromAPI('/orders/my-orders');
        if (res.success && res.data) {
          setOrders(res.data);
        }
      } catch (e) {
        console.error('Failed to load orders', e);
      } finally {
        setLoadingOrders(false);
      }
    };

    loadOrders();
  }, [isAuthenticated, router]);

  if (!isAuthenticated) return null;

  const handleAddAddress = async (e: React.FormEvent) => {
    e.preventDefault();
    setSavingAddress(true);
    try {
      await fetchFromAPI('/auth/addresses', {
        method: 'POST',
        body: JSON.stringify({
          fullName: newFullName,
          phone: newPhone,
          addressLine1: newAddressLine1,
          addressLine2: newAddressLine2,
          city: newCity,
          state: newState,
          pincode: newPincode,
          isDefault: true
        })
      });
      await refreshUser();
      setShowAddressModal(false);
      setNewFullName('');
      setNewPhone('');
      setNewAddressLine1('');
      setNewAddressLine2('');
      setNewCity('');
      setNewPincode('');
    } catch (e) {
      alert('Failed to save address');
    } finally {
      setSavingAddress(false);
    }
  };

  const handleDeleteAddress = async (addressId: string) => {
    try {
      await fetchFromAPI(`/auth/addresses/${addressId}`, { method: 'DELETE' });
      await refreshUser();
    } catch (e) {
      alert('Failed to delete address');
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      {/* Header Profile Bar */}
      <div className="bg-white rounded-2xl border border-[#E5E8E0] p-6 mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-2xs">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-full bg-[#214E34] text-white flex items-center justify-center font-bold text-lg font-serif-brand">
            {user?.name?.charAt(0) || 'P'}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-lg sm:text-xl font-bold text-[#202820]">{user?.name}</h1>
              {isAdmin && (
                <span className="bg-[#214E34] text-white text-[10px] font-bold px-2 py-0.5 rounded">
                  Admin Privileges
                </span>
              )}
            </div>
            <p className="text-xs text-[#687168]">{user?.email} • {user?.phone || 'No phone provided'}</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {isAdmin && (
            <Link
              href="/admin"
              className="px-4 py-2 bg-[#214E34] text-white text-xs font-semibold rounded-md hover:bg-[#163A28] flex items-center gap-1.5"
            >
              <Shield className="w-3.5 h-3.5" /> Admin Console
            </Link>
          )}
          <button
            onClick={logout}
            className="px-3 py-2 border border-[#E5E8E0] text-red-600 hover:bg-red-50 text-xs font-semibold rounded-md flex items-center gap-1.5 transition-colors"
          >
            <LogOut className="w-3.5 h-3.5" /> Sign Out
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Navigation Sidebar */}
        <div className="lg:col-span-3 space-y-2">
          <button
            onClick={() => setActiveTab('orders')}
            className={`w-full text-left px-4 py-3 rounded-lg text-xs font-semibold flex items-center gap-2.5 transition-all ${
              activeTab === 'orders'
                ? 'bg-[#214E34] text-white shadow-xs'
                : 'bg-white border border-[#E5E8E0] text-[#202820] hover:bg-[#FAF8F1]'
            }`}
          >
            <Package className="w-4 h-4" /> Order History ({orders.length})
          </button>
          <button
            onClick={() => setActiveTab('addresses')}
            className={`w-full text-left px-4 py-3 rounded-lg text-xs font-semibold flex items-center gap-2.5 transition-all ${
              activeTab === 'addresses'
                ? 'bg-[#214E34] text-white shadow-xs'
                : 'bg-white border border-[#E5E8E0] text-[#202820] hover:bg-[#FAF8F1]'
            }`}
          >
            <MapPin className="w-4 h-4" /> Delivery Addresses ({user?.addresses?.length || 0})
          </button>
          <button
            onClick={() => setActiveTab('profile')}
            className={`w-full text-left px-4 py-3 rounded-lg text-xs font-semibold flex items-center gap-2.5 transition-all ${
              activeTab === 'profile'
                ? 'bg-[#214E34] text-white shadow-xs'
                : 'bg-white border border-[#E5E8E0] text-[#202820] hover:bg-[#FAF8F1]'
            }`}
          >
            <User className="w-4 h-4" /> Account Details
          </button>
        </div>

        {/* Tab Content Area */}
        <div className="lg:col-span-9 space-y-6">
          {/* TAB 1: Orders */}
          {activeTab === 'orders' && (
            <div className="space-y-4">
              <h2 className="text-sm font-bold text-[#202820] uppercase tracking-wider pb-2 border-b border-[#E5E8E0]">
                Your Classical Formulations Orders
              </h2>

              {loadingOrders ? (
                <div className="p-8 text-center text-xs text-[#687168]">Loading your order history...</div>
              ) : orders.length === 0 ? (
                <div className="bg-white p-8 rounded-xl border border-[#E5E8E0] text-center space-y-3">
                  <p className="text-sm font-semibold text-[#202820]">You haven&apos;t placed any orders yet</p>
                  <p className="text-xs text-[#687168]">Experience the purity of traditional Ayurvedic wellness.</p>
                  <Link
                    href="/shop"
                    className="inline-block px-5 py-2.5 bg-[#214E34] text-white text-xs font-semibold rounded-md"
                  >
                    Explore Formulations
                  </Link>
                </div>
              ) : (
                orders.map(order => (
                  <div
                    key={order._id}
                    className="bg-white rounded-xl border border-[#E5E8E0] p-5 shadow-2xs space-y-4"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-[#E5E8E0] gap-2">
                      <div>
                        <span className="text-[11px] text-[#687168]">Order Number</span>
                        <h3 className="text-sm font-mono font-bold text-[#214E34]">{order.orderNumber}</h3>
                      </div>
                      <div className="flex items-center gap-3 text-xs">
                        <span className="capitalize px-2.5 py-1 rounded bg-[#DDE7D9] text-[#214E34] font-bold">
                          {order.orderStatus.replace(/_/g, ' ')}
                        </span>
                        <Link
                          href={`/track-order?orderNumber=${order.orderNumber}`}
                          className="text-[#214E34] font-semibold hover:underline flex items-center gap-1"
                        >
                          <Truck className="w-3.5 h-3.5" /> Track Consignment
                        </Link>
                      </div>
                    </div>

                    {/* Items */}
                    <div className="space-y-2">
                      {order.items.map((item: any, i: number) => (
                        <div key={i} className="flex items-center justify-between text-xs">
                          <div className="flex items-center gap-3">
                            <div className="relative w-10 h-10 rounded bg-[#FAF8F1] overflow-hidden shrink-0 border border-[#E5E8E0]">
                              <Image src={item.thumbnail} alt={item.name} fill className="object-cover" />
                            </div>
                            <div>
                              <p className="font-semibold text-[#202820]">{item.name}</p>
                              <p className="text-[10px] text-[#687168]">{item.packSize} • Qty: {item.quantity}</p>
                            </div>
                          </div>
                          <span className="font-bold text-[#214E34]">₹{item.total}</span>
                        </div>
                      ))}
                    </div>

                    <div className="pt-3 border-t border-[#E5E8E0] flex justify-between items-center text-xs">
                      <span className="text-[#687168]">
                        Placed on: {new Date(order.createdAt).toLocaleDateString('en-IN', { timeZone: 'Asia/Kolkata' })}
                      </span>
                      <span className="font-bold text-sm text-[#202820]">
                        Total: <strong className="text-[#214E34]">₹{order.totalAmount}</strong>
                      </span>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}

          {/* TAB 2: Addresses */}
          {activeTab === 'addresses' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-2 border-b border-[#E5E8E0]">
                <h2 className="text-sm font-bold text-[#202820] uppercase tracking-wider">
                  Saved Pan-India Addresses
                </h2>
                <button
                  onClick={() => setShowAddressModal(true)}
                  className="px-3 py-1.5 bg-[#214E34] text-white text-xs font-semibold rounded-md flex items-center gap-1"
                >
                  <Plus className="w-3.5 h-3.5" /> Add Address
                </button>
              </div>

              {/* Address Modal */}
              {showAddressModal && (
                <div className="bg-[#FAF8F1] p-5 rounded-xl border border-[#214E34]/30 space-y-3">
                  <h3 className="text-xs font-bold text-[#214E34] uppercase tracking-wider">
                    Add New Shipping Address
                  </h3>
                  <form onSubmit={handleAddAddress} className="space-y-3 text-xs">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[#687168] mb-1 font-semibold">Full Name *</label>
                        <input
                          type="text"
                          required
                          value={newFullName}
                          onChange={e => setNewFullName(e.target.value)}
                          className="w-full px-3 py-2 border border-[#E5E8E0] rounded-md bg-white"
                        />
                      </div>
                      <div>
                        <label className="block text-[#687168] mb-1 font-semibold">Phone *</label>
                        <input
                          type="tel"
                          required
                          maxLength={10}
                          value={newPhone}
                          onChange={e => setNewPhone(e.target.value.replace(/\D/g, ''))}
                          placeholder="10-digit number"
                          className="w-full px-3 py-2 border border-[#E5E8E0] rounded-md bg-white"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-[#687168] mb-1 font-semibold">Address Line 1 *</label>
                      <input
                        type="text"
                        required
                        value={newAddressLine1}
                        onChange={e => setNewAddressLine1(e.target.value)}
                        placeholder="House / Street / Flat"
                        className="w-full px-3 py-2 border border-[#E5E8E0] rounded-md bg-white"
                      />
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <div>
                        <label className="block text-[#687168] mb-1 font-semibold">City *</label>
                        <input
                          type="text"
                          required
                          value={newCity}
                          onChange={e => setNewCity(e.target.value)}
                          className="w-full px-3 py-2 border border-[#E5E8E0] rounded-md bg-white"
                        />
                      </div>
                      <div>
                        <label className="block text-[#687168] mb-1 font-semibold">State *</label>
                        <input
                          type="text"
                          required
                          value={newState}
                          onChange={e => setNewState(e.target.value)}
                          className="w-full px-3 py-2 border border-[#E5E8E0] rounded-md bg-white"
                        />
                      </div>
                      <div>
                        <label className="block text-[#687168] mb-1 font-semibold">PIN Code *</label>
                        <input
                          type="text"
                          required
                          maxLength={6}
                          value={newPincode}
                          onChange={e => setNewPincode(e.target.value.replace(/\D/g, ''))}
                          className="w-full px-3 py-2 border border-[#E5E8E0] rounded-md bg-white"
                        />
                      </div>
                    </div>
                    <div className="flex gap-2 pt-2">
                      <button
                        type="submit"
                        disabled={savingAddress}
                        className="px-4 py-2 bg-[#214E34] text-white font-semibold rounded-md hover:bg-[#163A28]"
                      >
                        {savingAddress ? 'Saving...' : 'Save Address'}
                      </button>
                      <button
                        type="button"
                        onClick={() => setShowAddressModal(false)}
                        className="px-4 py-2 border border-[#E5E8E0] bg-white font-semibold rounded-md"
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                </div>
              )}

              {user?.addresses && user.addresses.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {user.addresses.map((addr: any) => (
                    <div
                      key={addr._id}
                      className="bg-white p-4 rounded-xl border border-[#E5E8E0] shadow-2xs space-y-2 relative"
                    >
                      {addr.isDefault && (
                        <span className="bg-[#DDE7D9] text-[#214E34] text-[10px] font-bold px-2 py-0.5 rounded">
                          Default Shipping Address
                        </span>
                      )}
                      <h4 className="text-xs font-bold text-[#202820]">{addr.fullName}</h4>
                      <p className="text-xs text-[#687168] leading-relaxed">
                        {addr.addressLine1} {addr.addressLine2 ? `, ${addr.addressLine2}` : ''}<br />
                        {addr.city}, {addr.state} - {addr.pincode}
                      </p>
                      <p className="text-xs font-mono text-[#202820]">Phone: +91 {addr.phone}</p>
                      <button
                        onClick={() => handleDeleteAddress(addr._id)}
                        className="text-xs text-red-600 hover:underline flex items-center gap-1 pt-1"
                      >
                        <Trash2 className="w-3.5 h-3.5" /> Remove
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="bg-white p-8 rounded-xl border border-[#E5E8E0] text-center text-xs text-[#687168]">
                  No delivery addresses saved yet. Click &quot;Add Address&quot; above.
                </div>
              )}
            </div>
          )}

          {/* TAB 3: Profile */}
          {activeTab === 'profile' && (
            <div className="bg-white p-6 rounded-xl border border-[#E5E8E0] space-y-4">
              <h2 className="text-sm font-bold text-[#202820] uppercase tracking-wider pb-2 border-b border-[#E5E8E0]">
                Customer Profile & Vedic Records
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div>
                  <span className="text-[#687168] block">Registered Name</span>
                  <span className="font-bold text-[#202820] text-sm">{user?.name}</span>
                </div>
                <div>
                  <span className="text-[#687168] block">Email Address</span>
                  <span className="font-bold text-[#202820] text-sm">{user?.email}</span>
                </div>
                <div>
                  <span className="text-[#687168] block">Mobile Phone</span>
                  <span className="font-bold text-[#202820] text-sm">{user?.phone || 'Not provided'}</span>
                </div>
                <div>
                  <span className="text-[#687168] block">Account Role</span>
                  <span className="font-bold text-[#214E34] text-sm capitalize">{user?.role}</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
