'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import {
  Shield,
  TrendingUp,
  Package,
  ShoppingBag,
  Users,
  AlertTriangle,
  Plus,
  Edit,
  Trash2,
  CheckCircle2,
  Truck,
  Tag
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { fetchFromAPI } from '../../lib/api';

export default function AdminPage() {
  const router = useRouter();
  const { user, isAuthenticated, isAdmin } = useAuth();

  const [activeTab, setActiveTab] = useState<'overview' | 'products' | 'orders' | 'coupons'>('overview');
  const [stats, setStats] = useState<any>(null);
  const [products, setProducts] = useState<any[]>([]);
  const [orders, setOrders] = useState<any[]>([]);
  const [coupons, setCoupons] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // New Product Modal
  const [showProductModal, setShowProductModal] = useState(false);
  const [newProductName, setNewProductName] = useState('');
  const [newProductCategory, setNewProductCategory] = useState('Immunity & Rasayana');
  const [newProductTagline, setNewProductTagline] = useState('');
  const [newProductDescription, setNewProductDescription] = useState('');
  const [newProductPrice, setNewProductPrice] = useState(799);
  const [newProductSalePrice, setNewProductSalePrice] = useState(699);
  const [newProductSku, setNewProductSku] = useState('');
  const [newProductStock, setNewProductStock] = useState(25);
  const [newProductPackSize, setNewProductPackSize] = useState('60 Veggie Capsules');
  const [newProductFormat, setNewProductFormat] = useState('Capsule');
  const [newProductImage, setNewProductImage] = useState(
    'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?auto=format&fit=crop&w=600&q=80'
  );
  const [savingProduct, setSavingProduct] = useState(false);

  // Order Status Update Modal
  const [selectedOrder, setSelectedOrder] = useState<any>(null);
  const [newOrderStatus, setNewOrderStatus] = useState('shipped');
  const [trackingNumber, setTrackingNumber] = useState('');
  const [updatingOrder, setUpdatingOrder] = useState(false);

  // Coupon Creation State
  const [newCouponCode, setNewCouponCode] = useState('');
  const [newCouponValue, setNewCouponValue] = useState(15);
  const [newCouponMin, setNewCouponMin] = useState(1000);
  const [savingCoupon, setSavingCoupon] = useState(false);

  const loadData = async () => {
    setLoading(true);
    try {
      const [statsRes, productsRes, ordersRes, couponsRes] = await Promise.all([
        fetchFromAPI('/admin/stats'),
        fetchFromAPI('/admin/products?limit=50'),
        fetchFromAPI('/admin/orders?limit=50'),
        fetchFromAPI('/admin/coupons')
      ]);

      if (statsRes.success) setStats(statsRes.data);
      if (productsRes.success) setProducts(productsRes.data);
      if (ordersRes.success) setOrders(ordersRes.data);
      if (couponsRes.success) setCoupons(couponsRes.data);
    } catch (e) {
      console.error('Error loading admin records', e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/account/login');
      return;
    }
    if (!isAdmin) {
      router.push('/account');
      return;
    }

    loadData();
  }, [isAuthenticated, isAdmin, router]);

  if (!isAuthenticated || !isAdmin) return null;

  const handleCreateProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    setSavingProduct(true);
    try {
      await fetchFromAPI('/admin/products', {
        method: 'POST',
        body: JSON.stringify({
          name: newProductName,
          tagline: newProductTagline,
          description: newProductDescription,
          category: newProductCategory,
          price: Number(newProductPrice),
          salePrice: Number(newProductSalePrice),
          sku: newProductSku || `AP-${Date.now().toString().slice(-6)}`,
          stock: Number(newProductStock),
          packSize: newProductPackSize,
          format: newProductFormat,
          thumbnail: newProductImage,
          images: [newProductImage],
          dosageInstructions: 'Take 1 to 2 units daily with warm water.',
          storageInstructions: 'Store in a cool dry area away from direct sunlight.',
          doshaBalancing: { vata: true, pitta: false, kapha: true, primaryDosha: 'Tridoshic' },
          keyIngredients: [
            { name: 'Standardized Botanical Extract', botanicalName: 'Herba ayurvedica', portion: '500mg', benefit: 'Vitality' }
          ]
        })
      });
      setShowProductModal(false);
      await loadData();
    } catch (e) {
      alert('Failed to save product');
    } finally {
      setSavingProduct(false);
    }
  };

  const handleDeleteProduct = async (id: string) => {
    if (!confirm('Are you sure you want to remove this Ayurvedic formulation?')) return;
    try {
      await fetchFromAPI(`/admin/products/${id}`, { method: 'DELETE' });
      await loadData();
    } catch (e) {
      alert('Failed to delete product');
    }
  };

  const handleUpdateOrderStatus = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedOrder) return;
    setUpdatingOrder(true);
    try {
      await fetchFromAPI(`/admin/orders/${selectedOrder._id}/status`, {
        method: 'PUT',
        body: JSON.stringify({
          orderStatus: newOrderStatus,
          trackingNumber: trackingNumber || selectedOrder.trackingNumber,
          carrier: 'Delhivery Express Priority'
        })
      });
      setSelectedOrder(null);
      await loadData();
    } catch (e) {
      alert('Failed to update order status');
    } finally {
      setUpdatingOrder(false);
    }
  };

  const handleCreateCoupon = async (e: React.FormEvent) => {
    e.preventDefault();
    setSavingCoupon(true);
    try {
      await fetchFromAPI('/admin/coupons', {
        method: 'POST',
        body: JSON.stringify({
          code: newCouponCode.toUpperCase().trim(),
          discountType: 'percentage',
          discountValue: Number(newCouponValue),
          minOrderValue: Number(newCouponMin),
          validUntil: new Date('2028-12-31')
        })
      });
      setNewCouponCode('');
      await loadData();
    } catch (e) {
      alert('Failed to create coupon');
    } finally {
      setSavingCoupon(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      {/* Top Banner */}
      <div className="bg-[#163A28] text-white p-6 rounded-2xl mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-lg">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-full overflow-hidden bg-[#FAF8F1] border border-white/20 shrink-0 shadow-sm">
            <Image
              src="/images/logo.png"
              alt="Axmin Prana Logo"
              width={56}
              height={56}
              className="w-full h-full object-contain"
            />
          </div>
          <div>
            <span className="text-[10px] uppercase font-bold tracking-widest text-[#B86F4B]">
              Enterprise Ayurveda Administration
            </span>
            <h1 className="text-2xl font-serif-brand font-bold">Axmin Prana Control Console</h1>
            <p className="text-xs text-[#DDE7D9]/80 mt-1">
              Supervise catalogue formulations, fulfill consignments, and inspect revenue statistics.
            </p>
          </div>
        </div>
        <div className="flex gap-2">
          <Link
            href="/"
            className="px-4 py-2 border border-white/20 text-xs font-semibold rounded-md hover:bg-white/10 text-white"
          >
            Storefront View
          </Link>
          <button
            onClick={loadData}
            className="px-4 py-2 bg-[#214E34] text-xs font-semibold rounded-md hover:bg-[#B86F4B] transition-colors"
          >
            Refresh Records
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-[#E5E8E0] gap-2 mb-8 overflow-x-auto text-xs font-bold">
        <button
          onClick={() => setActiveTab('overview')}
          className={`px-4 py-2.5 rounded-t-lg transition-colors flex items-center gap-1.5 ${
            activeTab === 'overview'
              ? 'bg-[#214E34] text-white'
              : 'bg-white border border-[#E5E8E0] text-[#202820] hover:bg-[#FAF8F1]'
          }`}
        >
          <TrendingUp className="w-4 h-4" /> Overview & Sales
        </button>
        <button
          onClick={() => setActiveTab('products')}
          className={`px-4 py-2.5 rounded-t-lg transition-colors flex items-center gap-1.5 ${
            activeTab === 'products'
              ? 'bg-[#214E34] text-white'
              : 'bg-white border border-[#E5E8E0] text-[#202820] hover:bg-[#FAF8F1]'
          }`}
        >
          <Package className="w-4 h-4" /> Formulations ({products.length})
        </button>
        <button
          onClick={() => setActiveTab('orders')}
          className={`px-4 py-2.5 rounded-t-lg transition-colors flex items-center gap-1.5 ${
            activeTab === 'orders'
              ? 'bg-[#214E34] text-white'
              : 'bg-white border border-[#E5E8E0] text-[#202820] hover:bg-[#FAF8F1]'
          }`}
        >
          <ShoppingBag className="w-4 h-4" /> Orders & Shipping ({orders.length})
        </button>
        <button
          onClick={() => setActiveTab('coupons')}
          className={`px-4 py-2.5 rounded-t-lg transition-colors flex items-center gap-1.5 ${
            activeTab === 'coupons'
              ? 'bg-[#214E34] text-white'
              : 'bg-white border border-[#E5E8E0] text-[#202820] hover:bg-[#FAF8F1]'
          }`}
        >
          <Tag className="w-4 h-4" /> Promo Coupons ({coupons.length})
        </button>
      </div>

      {loading ? (
        <div className="p-12 text-center text-xs text-[#687168]">Loading administrative data...</div>
      ) : (
        <>
          {/* TAB 1: Overview */}
          {activeTab === 'overview' && stats && (
            <div className="space-y-8">
              {/* Stat Cards */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-white p-5 rounded-xl border border-[#E5E8E0] shadow-2xs">
                  <span className="text-xs font-semibold text-[#687168] block">Total Gross Revenue</span>
                  <span className="text-2xl font-bold text-[#214E34] mt-1 block">
                    ₹{stats.totalRevenue?.toLocaleString('en-IN') || 0}
                  </span>
                  <span className="text-[10px] text-green-700 font-semibold mt-1 block">
                    Paid transactions
                  </span>
                </div>

                <div className="bg-white p-5 rounded-xl border border-[#E5E8E0] shadow-2xs">
                  <span className="text-xs font-semibold text-[#687168] block">Orders Handled</span>
                  <span className="text-2xl font-bold text-[#202820] mt-1 block">{stats.totalOrders}</span>
                  <span className="text-[10px] text-[#687168] mt-1 block">Pan-India consignments</span>
                </div>

                <div className="bg-white p-5 rounded-xl border border-[#E5E8E0] shadow-2xs">
                  <span className="text-xs font-semibold text-[#687168] block">Active Catalogue</span>
                  <span className="text-2xl font-bold text-[#202820] mt-1 block">{stats.totalProducts}</span>
                  <span className="text-[10px] text-[#687168] mt-1 block">Licensed formulas</span>
                </div>

                <div className="bg-white p-5 rounded-xl border border-[#E5E8E0] shadow-2xs">
                  <span className="text-xs font-semibold text-[#687168] block">Registered Patrons</span>
                  <span className="text-2xl font-bold text-[#202820] mt-1 block">{stats.totalUsers}</span>
                  <span className="text-[10px] text-[#687168] mt-1 block">Customer profiles</span>
                </div>
              </div>

              {/* Low Stock Alerts */}
              {stats.lowStockProducts && stats.lowStockProducts.length > 0 && (
                <div className="bg-red-50/60 border border-red-200 rounded-xl p-5 space-y-3">
                  <h3 className="text-xs font-bold text-red-800 uppercase tracking-wider flex items-center gap-1.5">
                    <AlertTriangle className="w-4 h-4 text-red-600" /> Low Stock Critical Warning
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {stats.lowStockProducts.map((p: any) => (
                      <div key={p._id} className="bg-white p-3 rounded-lg border border-red-200 text-xs">
                        <p className="font-bold text-[#202820] truncate">{p.name}</p>
                        <p className="text-[11px] text-red-600 font-bold mt-0.5">
                          Only {p.stock} units left in dispensary!
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Recent Orders Overview */}
              <div className="bg-white p-6 rounded-xl border border-[#E5E8E0] shadow-2xs space-y-4">
                <h3 className="text-xs font-bold text-[#202820] uppercase tracking-wider">
                  Recent Consignments
                </h3>
                <div className="divide-y divide-[#E5E8E0]">
                  {stats.recentOrders?.map((o: any) => (
                    <div key={o._id} className="py-3 flex items-center justify-between text-xs">
                      <div>
                        <span className="font-mono font-bold text-[#214E34]">{o.orderNumber}</span>
                        <p className="text-[11px] text-[#687168]">
                          {o.shippingAddress.fullName} • {o.shippingAddress.city}, {o.shippingAddress.state}
                        </p>
                      </div>
                      <div className="text-right">
                        <span className="font-bold text-[#202820]">₹{o.totalAmount}</span>
                        <span className="block text-[10px] capitalize text-[#687168] font-semibold">
                          {o.orderStatus.replace(/_/g, ' ')}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: Products Management */}
          {activeTab === 'products' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-sm font-bold text-[#202820] uppercase tracking-wider">
                  Product Inventory Management
                </h2>
                <button
                  onClick={() => setShowProductModal(true)}
                  className="px-4 py-2 bg-[#214E34] text-white text-xs font-semibold rounded-md hover:bg-[#163A28] flex items-center gap-1.5"
                >
                  <Plus className="w-3.5 h-3.5" /> Add New Formulation
                </button>
              </div>

              {/* Add Product Modal */}
              {showProductModal && (
                <div className="bg-white p-6 rounded-2xl border-2 border-[#214E34] shadow-xl space-y-4">
                  <div className="flex justify-between items-center pb-3 border-b border-[#E5E8E0]">
                    <h3 className="text-sm font-bold text-[#214E34] uppercase tracking-wider">
                      Add New Classical Ayurvedic Formulation
                    </h3>
                    <button
                      onClick={() => setShowProductModal(false)}
                      className="text-xs text-red-600 font-semibold"
                    >
                      Close
                    </button>
                  </div>

                  <form onSubmit={handleCreateProduct} className="space-y-4 text-xs">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[#687168] mb-1 font-semibold">Product Name *</label>
                        <input
                          type="text"
                          required
                          value={newProductName}
                          onChange={e => setNewProductName(e.target.value)}
                          placeholder="e.g. Brahmi Mind Elixir"
                          className="w-full px-3 py-2 border border-[#E5E8E0] rounded-md bg-[#FAF8F1]"
                        />
                      </div>
                      <div>
                        <label className="block text-[#687168] mb-1 font-semibold">Category *</label>
                        <select
                          value={newProductCategory}
                          onChange={e => setNewProductCategory(e.target.value)}
                          className="w-full px-3 py-2 border border-[#E5E8E0] rounded-md bg-[#FAF8F1]"
                        >
                          <option value="Immunity & Rasayana">Immunity & Rasayana</option>
                          <option value="Stress & Cognitive Health">Stress & Cognitive Health</option>
                          <option value="Digestive & Gut Health">Digestive & Gut Health</option>
                          <option value="Skin Radiance & Kanti">Skin Radiance & Kanti</option>
                          <option value="Hair Therapy & Keshya">Hair Therapy & Keshya</option>
                          <option value="Joint Care & Sandhi">Joint Care & Sandhi</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-[#687168] mb-1 font-semibold">Tagline *</label>
                        <input
                          type="text"
                          required
                          value={newProductTagline}
                          onChange={e => setNewProductTagline(e.target.value)}
                          placeholder="Short therapeutic tagline"
                          className="w-full px-3 py-2 border border-[#E5E8E0] rounded-md bg-[#FAF8F1]"
                        />
                      </div>
                      <div>
                        <label className="block text-[#687168] mb-1 font-semibold">Pack Size *</label>
                        <input
                          type="text"
                          required
                          value={newProductPackSize}
                          onChange={e => setNewProductPackSize(e.target.value)}
                          placeholder="e.g. 60 Veggie Capsules / 200ml"
                          className="w-full px-3 py-2 border border-[#E5E8E0] rounded-md bg-[#FAF8F1]"
                        />
                      </div>
                      <div>
                        <label className="block text-[#687168] mb-1 font-semibold">MRP Price (₹) *</label>
                        <input
                          type="number"
                          required
                          value={newProductPrice}
                          onChange={e => setNewProductPrice(Number(e.target.value))}
                          className="w-full px-3 py-2 border border-[#E5E8E0] rounded-md bg-[#FAF8F1]"
                        />
                      </div>
                      <div>
                        <label className="block text-[#687168] mb-1 font-semibold">Sale Price (₹)</label>
                        <input
                          type="number"
                          value={newProductSalePrice}
                          onChange={e => setNewProductSalePrice(Number(e.target.value))}
                          className="w-full px-3 py-2 border border-[#E5E8E0] rounded-md bg-[#FAF8F1]"
                        />
                      </div>
                      <div>
                        <label className="block text-[#687168] mb-1 font-semibold">Dispensary Stock *</label>
                        <input
                          type="number"
                          required
                          value={newProductStock}
                          onChange={e => setNewProductStock(Number(e.target.value))}
                          className="w-full px-3 py-2 border border-[#E5E8E0] rounded-md bg-[#FAF8F1]"
                        />
                      </div>
                      <div>
                        <label className="block text-[#687168] mb-1 font-semibold">Format *</label>
                        <select
                          value={newProductFormat}
                          onChange={e => setNewProductFormat(e.target.value)}
                          className="w-full px-3 py-2 border border-[#E5E8E0] rounded-md bg-[#FAF8F1]"
                        >
                          <option value="Capsule">Capsule</option>
                          <option value="Oil">Oil (Tailam)</option>
                          <option value="Churna">Churna (Powder)</option>
                          <option value="Asava/Arishta">Asava/Arishta</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-[#687168] mb-1 font-semibold">Botanical Description *</label>
                      <textarea
                        rows={3}
                        required
                        value={newProductDescription}
                        onChange={e => setNewProductDescription(e.target.value)}
                        placeholder="Classical formulation story, Charaka Samhita reference, and therapeutic indications..."
                        className="w-full px-3 py-2 border border-[#E5E8E0] rounded-md bg-[#FAF8F1]"
                      />
                    </div>

                    <div className="flex gap-2">
                      <button
                        type="submit"
                        disabled={savingProduct}
                        className="px-5 py-2.5 bg-[#214E34] text-white font-semibold rounded-md hover:bg-[#163A28]"
                      >
                        {savingProduct ? 'Saving Formulation...' : 'Save & Publish to Store'}
                      </button>
                      <button
                        type="button"
                        onClick={() => setShowProductModal(false)}
                        className="px-4 py-2.5 border border-[#E5E8E0] rounded-md"
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                </div>
              )}

              {/* Products Table */}
              <div className="bg-white rounded-xl border border-[#E5E8E0] overflow-hidden shadow-2xs">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs min-w-[640px]">
                  <thead className="bg-[#FAF8F1] border-b border-[#E5E8E0] text-[#687168] uppercase text-[10px] font-bold">
                    <tr>
                      <th className="p-3">Formulation</th>
                      <th className="p-3">Category</th>
                      <th className="p-3">Price</th>
                      <th className="p-3">Stock</th>
                      <th className="p-3">Rating</th>
                      <th className="p-3 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#E5E8E0]">
                    {products.map(p => (
                      <tr key={p._id} className="hover:bg-[#FAF8F1]/50">
                        <td className="p-3 flex items-center gap-3">
                          <div className="relative w-10 h-10 rounded bg-[#FAF8F1] overflow-hidden shrink-0 border border-[#E5E8E0]">
                            <Image src={p.thumbnail || p.images[0]} alt={p.name} fill className="object-cover" />
                          </div>
                          <div>
                            <p className="font-bold text-[#202820]">{p.name}</p>
                            <p className="text-[10px] text-[#687168]">{p.sku} • {p.packSize}</p>
                          </div>
                        </td>
                        <td className="p-3 font-medium text-[#202820]">{p.category}</td>
                        <td className="p-3 font-bold text-[#214E34]">
                          ₹{p.salePrice || p.price}
                        </td>
                        <td className="p-3">
                          <span
                            className={`px-2 py-0.5 rounded font-bold ${
                              p.stock <= 5
                                ? 'bg-red-100 text-red-700'
                                : 'bg-green-100 text-green-800'
                            }`}
                          >
                            {p.stock} units
                          </span>
                        </td>
                        <td className="p-3 text-[#687168]">★ {p.rating} ({p.reviewCount})</td>
                        <td className="p-3 text-right">
                          <button
                            onClick={() => handleDeleteProduct(p._id)}
                            className="p-1 text-red-600 hover:text-red-800"
                            title="Delete"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: Orders Management */}
          {activeTab === 'orders' && (
            <div className="space-y-6">
              <h2 className="text-sm font-bold text-[#202820] uppercase tracking-wider">
                Consignments & Shipping Fulfillment
              </h2>

              {/* Status Update Modal */}
              {selectedOrder && (
                <div className="bg-white p-6 rounded-2xl border-2 border-[#214E34] shadow-xl space-y-4">
                  <div className="flex justify-between items-center pb-3 border-b border-[#E5E8E0]">
                    <h3 className="text-xs font-bold text-[#214E34] uppercase tracking-wider">
                      Update Order #{selectedOrder.orderNumber}
                    </h3>
                    <button onClick={() => setSelectedOrder(null)} className="text-xs text-red-600">
                      Cancel
                    </button>
                  </div>
                  <form onSubmit={handleUpdateOrderStatus} className="space-y-3 text-xs">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[#687168] mb-1 font-semibold">Order Fulfillment Status</label>
                        <select
                          value={newOrderStatus}
                          onChange={e => setNewOrderStatus(e.target.value)}
                          className="w-full px-3 py-2 border border-[#E5E8E0] rounded-md bg-[#FAF8F1]"
                        >
                          <option value="placed">Placed (Pending Processing)</option>
                          <option value="confirmed">Confirmed (Dispensary Dispensation)</option>
                          <option value="processing">Processing & Quality Packing</option>
                          <option value="shipped">Shipped (Dispatched via Delhivery)</option>
                          <option value="out_for_delivery">Out for Delivery</option>
                          <option value="delivered">Delivered Successfully</option>
                          <option value="cancelled">Cancelled & Refunded</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-[#687168] mb-1 font-semibold">Tracking Number</label>
                        <input
                          type="text"
                          value={trackingNumber}
                          onChange={e => setTrackingNumber(e.target.value)}
                          placeholder="e.g. DEL-88912401"
                          className="w-full px-3 py-2 border border-[#E5E8E0] rounded-md bg-[#FAF8F1]"
                        />
                      </div>
                    </div>
                    <button
                      type="submit"
                      disabled={updatingOrder}
                      className="px-5 py-2.5 bg-[#214E34] text-white font-semibold rounded-md hover:bg-[#163A28]"
                    >
                      {updatingOrder ? 'Updating...' : 'Update & Log Status Milestone'}
                    </button>
                  </form>
                </div>
              )}

              {/* Orders Table */}
              <div className="bg-white rounded-xl border border-[#E5E8E0] overflow-hidden shadow-2xs">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs min-w-[640px]">
                  <thead className="bg-[#FAF8F1] border-b border-[#E5E8E0] text-[#687168] uppercase text-[10px] font-bold">
                    <tr>
                      <th className="p-3">Order #</th>
                      <th className="p-3">Customer & Location</th>
                      <th className="p-3">Amount</th>
                      <th className="p-3">Payment</th>
                      <th className="p-3">Status</th>
                      <th className="p-3 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#E5E8E0]">
                    {orders.map(o => (
                      <tr key={o._id} className="hover:bg-[#FAF8F1]/50">
                        <td className="p-3">
                          <span className="font-mono font-bold text-[#214E34]">{o.orderNumber}</span>
                          <span className="block text-[10px] text-[#687168]">
                            {new Date(o.createdAt).toLocaleDateString('en-IN')}
                          </span>
                        </td>
                        <td className="p-3">
                          <p className="font-bold text-[#202820]">{o.shippingAddress.fullName}</p>
                          <p className="text-[10px] text-[#687168]">
                            {o.shippingAddress.city}, {o.shippingAddress.state} ({o.shippingAddress.pincode})
                          </p>
                        </td>
                        <td className="p-3 font-bold text-[#202820]">₹{o.totalAmount}</td>
                        <td className="p-3">
                          <span
                            className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                              o.paymentStatus === 'paid'
                                ? 'bg-green-100 text-green-800'
                                : 'bg-yellow-100 text-yellow-800'
                            }`}
                          >
                            {o.paymentStatus} ({o.paymentMethod})
                          </span>
                        </td>
                        <td className="p-3">
                          <span className="capitalize font-semibold text-[#214E34] bg-[#DDE7D9] px-2 py-0.5 rounded text-[11px]">
                            {o.orderStatus.replace(/_/g, ' ')}
                          </span>
                        </td>
                        <td className="p-3 text-right">
                          <button
                            onClick={() => {
                              setSelectedOrder(o);
                              setNewOrderStatus(o.orderStatus);
                              setTrackingNumber(o.trackingNumber || '');
                            }}
                            className="px-2.5 py-1 bg-[#214E34] text-white rounded text-[11px] font-semibold hover:bg-[#163A28]"
                          >
                            Manage
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: Coupons Management */}
          {activeTab === 'coupons' && (
            <div className="space-y-6">
              <h2 className="text-sm font-bold text-[#202820] uppercase tracking-wider">
                Promo Code & Discount Management
              </h2>

              {/* Create Coupon Form */}
              <div className="bg-white p-5 rounded-xl border border-[#E5E8E0] shadow-2xs space-y-3">
                <h3 className="text-xs font-bold text-[#214E34] uppercase tracking-wider">
                  Create Promotional Coupon
                </h3>
                <form onSubmit={handleCreateCoupon} className="flex flex-wrap gap-3 text-xs items-end">
                  <div>
                    <label className="block text-[#687168] mb-1 font-semibold">Coupon Code</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. WELLNESS25"
                      value={newCouponCode}
                      onChange={e => setNewCouponCode(e.target.value)}
                      className="px-3 py-2 border border-[#E5E8E0] rounded-md bg-[#FAF8F1] uppercase font-mono"
                    />
                  </div>
                  <div>
                    <label className="block text-[#687168] mb-1 font-semibold">Discount (%)</label>
                    <input
                      type="number"
                      required
                      value={newCouponValue}
                      onChange={e => setNewCouponValue(Number(e.target.value))}
                      className="px-3 py-2 border border-[#E5E8E0] rounded-md bg-[#FAF8F1]"
                    />
                  </div>
                  <div>
                    <label className="block text-[#687168] mb-1 font-semibold">Min Cart Value (₹)</label>
                    <input
                      type="number"
                      required
                      value={newCouponMin}
                      onChange={e => setNewCouponMin(Number(e.target.value))}
                      className="px-3 py-2 border border-[#E5E8E0] rounded-md bg-[#FAF8F1]"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={savingCoupon}
                    className="px-5 py-2.5 bg-[#214E34] text-white font-semibold rounded-md hover:bg-[#163A28]"
                  >
                    {savingCoupon ? 'Creating...' : 'Activate Coupon'}
                  </button>
                </form>
              </div>

              {/* Active Coupons Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {coupons.map(c => (
                  <div key={c._id} className="bg-white p-4 rounded-xl border border-[#E5E8E0] shadow-2xs space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="font-mono font-bold text-sm text-[#214E34] bg-[#DDE7D9] px-2 py-0.5 rounded">
                        {c.code}
                      </span>
                      <span className="text-[10px] bg-green-100 text-green-800 font-bold px-2 py-0.5 rounded">
                        Active
                      </span>
                    </div>
                    <p className="text-xs font-bold text-[#202820]">
                      {c.discountValue}% OFF on orders above ₹{c.minOrderValue}
                    </p>
                    <p className="text-[10px] text-[#687168]">
                      Redemptions logged: {c.usageCount} times
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}
