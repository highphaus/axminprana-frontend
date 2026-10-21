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
  Tag,
  Building2,
  Search,
  ShieldCheck,
  UserCheck,
  UserX,
  User,
  RefreshCw,
  X,
  ChevronRight,
  Layers,
  Image as LucideImage
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { fetchFromAPI } from '../../lib/api';

export default function AdminPage() {
  const router = useRouter();
  const { user, isAuthenticated, isAdmin, loading: authLoading } = useAuth();

  const [activeTab, setActiveTab] = useState<'overview' | 'products' | 'orders' | 'coupons' | 'enquiries' | 'users'>('overview');
  const [stats, setStats] = useState<any>(null);
  const [products, setProducts] = useState<any[]>([]);
  const [orders, setOrders] = useState<any[]>([]);
  const [coupons, setCoupons] = useState<any[]>([]);
  const [enquiries, setEnquiries] = useState<any[]>([]);
  const [users, setUsers] = useState<any[]>([]);
  const [userSearchQuery, setUserSearchQuery] = useState('');
  const [userRoleFilter, setUserRoleFilter] = useState<'all' | 'customer' | 'admin'>('all');
  const [loadingUsers, setLoadingUsers] = useState(false);
  const [promotingUserId, setPromotingUserId] = useState<string | null>(null);
  const [deletingUserId, setDeletingUserId] = useState<string | null>(null);
  const [userActionMessage, setUserActionMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [loading, setLoading] = useState(true);

  // New Product Modal State
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
  // Multiple images state for New Product
  const [newProductImages, setNewProductImages] = useState<string[]>([
    'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?auto=format&fit=crop&w=600&q=80'
  ]);
  const [newProductImageInput, setNewProductImageInput] = useState('');
  // Multiple variants state for New Product
  const [newProductVariants, setNewProductVariants] = useState<
    Array<{ sku: string; packSize: string; price: number; salePrice?: number | string; stock: number }>
  >([
    { sku: '', packSize: '60 Veggie Capsules', price: 799, salePrice: 699, stock: 25 }
  ]);
  const [savingProduct, setSavingProduct] = useState(false);

  // Edit Product Modal State
  const [editingProduct, setEditingProduct] = useState<any | null>(null);
  const [editProductName, setEditProductName] = useState('');
  const [editProductCategory, setEditProductCategory] = useState('');
  const [editProductPrice, setEditProductPrice] = useState(799);
  const [editProductSalePrice, setEditProductSalePrice] = useState(699);
  const [editProductStock, setEditProductStock] = useState(25);
  const [editProductPackSize, setEditProductPackSize] = useState('60 Veggie Capsules');
  const [editProductDescription, setEditProductDescription] = useState('');
  // Multiple images & variants state for Edit Product
  const [editProductImages, setEditProductImages] = useState<string[]>([]);
  const [editProductImageInput, setEditProductImageInput] = useState('');
  const [editProductVariants, setEditProductVariants] = useState<
    Array<{ sku: string; packSize: string; price: number; salePrice?: number | string; stock: number }>
  >([]);
  const [savingEditProduct, setSavingEditProduct] = useState(false);

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

  const fetchUsers = async (search = userSearchQuery, role = userRoleFilter) => {
    setLoadingUsers(true);
    try {
      const params = new URLSearchParams();
      if (search.trim()) params.set('q', search.trim());
      if (role !== 'all') params.set('role', role);
      params.set('limit', '100');

      const res = await fetchFromAPI(`/admin/users?${params.toString()}`);
      if (res.success && res.data) {
        setUsers(res.data);
      }
    } catch (e: any) {
      console.error('Failed to fetch users', e);
    } finally {
      setLoadingUsers(false);
    }
  };

  const handleUpdateRole = async (targetUser: any, newRole: 'admin' | 'customer') => {
    const isPromoting = newRole === 'admin';
    const confirmMessage = isPromoting
      ? `Are you sure you want to promote ${targetUser.name || targetUser.email} to Administrator? They will have full administrative rights to manage formulations, inventory, orders, and promotion console.`
      : `Are you sure you want to demote ${targetUser.name || targetUser.email} to Customer? Their administrative access will be revoked.`;

    if (!confirm(confirmMessage)) return;

    setPromotingUserId(targetUser._id);
    setUserActionMessage(null);
    try {
      const res = await fetchFromAPI(`/admin/users/${targetUser._id}/role`, {
        method: 'PATCH',
        body: JSON.stringify({ role: newRole })
      });
      if (res.success) {
        setUserActionMessage({
          type: 'success',
          text: res.message || `Successfully updated ${targetUser.name || targetUser.email} to ${newRole}.`
        });
        await fetchUsers(userSearchQuery, userRoleFilter);
        await loadData();
      } else {
        setUserActionMessage({
          type: 'error',
          text: res.message || 'Failed to update user privilege'
        });
      }
    } catch (e: any) {
      setUserActionMessage({
        type: 'error',
        text: e.message || 'Error occurred while updating user privilege'
      });
    } finally {
      setPromotingUserId(null);
    }
  };

  const handleDeleteUser = async (targetUser: any) => {
    const isCurrentUser = user && (user.id === targetUser._id || (user as any)._id === targetUser._id);
    if (isCurrentUser) {
      alert('You cannot delete your own active administrator account.');
      return;
    }

    const userName = targetUser.name || targetUser.email;
    if (
      !confirm(
        `Are you sure you want to permanently delete user "${userName}"?\n\nThis will remove their profile and records from the system. This action cannot be undone.`
      )
    ) {
      return;
    }

    setDeletingUserId(targetUser._id);
    setUserActionMessage(null);
    try {
      const res = await fetchFromAPI(`/admin/users/${targetUser._id}`, {
        method: 'DELETE'
      });
      if (res.success) {
        setUserActionMessage({
          type: 'success',
          text: res.message || `User "${userName}" was deleted successfully.`
        });
        setUsers(prev => prev.filter(u => u._id !== targetUser._id));
      } else {
        setUserActionMessage({
          type: 'error',
          text: res.message || 'Failed to delete user.'
        });
      }
    } catch (e: any) {
      setUserActionMessage({
        type: 'error',
        text: e.message || 'Error occurred while deleting user.'
      });
    } finally {
      setDeletingUserId(null);
    }
  };

  const loadData = async () => {
    setLoading(true);
    try {
      const [statsRes, productsRes, ordersRes, couponsRes, enquiriesRes, usersRes] = await Promise.all([
        fetchFromAPI('/admin/stats').catch(e => {
          console.error('Failed to load stats:', e);
          return { success: false, data: null };
        }),
        fetchFromAPI('/admin/products?limit=100').catch(e => {
          console.error('Failed to load products:', e);
          return { success: false, data: [] };
        }),
        fetchFromAPI('/admin/orders?limit=100').catch(e => {
          console.error('Failed to load orders:', e);
          return { success: false, data: [] };
        }),
        fetchFromAPI('/admin/coupons').catch(e => {
          console.error('Failed to load coupons:', e);
          return { success: false, data: [] };
        }),
        fetchFromAPI('/enquiries').catch(e => {
          console.error('Failed to load enquiries:', e);
          return { success: false, data: [] };
        }),
        fetchFromAPI('/admin/users?limit=100').catch(e => {
          console.error('Failed to load users:', e);
          return { success: false, data: [] };
        })
      ]);

      if (statsRes?.success && statsRes.data) setStats(statsRes.data);
      if (productsRes?.success && Array.isArray(productsRes.data)) setProducts(productsRes.data);
      if (ordersRes?.success && Array.isArray(ordersRes.data)) setOrders(ordersRes.data);
      if (couponsRes?.success && Array.isArray(couponsRes.data)) setCoupons(couponsRes.data);
      if (enquiriesRes?.success && Array.isArray(enquiriesRes.data)) setEnquiries(enquiriesRes.data);
      if (usersRes?.success && Array.isArray(usersRes.data)) setUsers(usersRes.data);
    } catch (e) {
      console.error('Error loading admin records', e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (authLoading) return;

    if (!isAuthenticated) {
      router.push('/account/login');
      return;
    }
    if (!isAdmin) {
      router.push('/account');
      return;
    }

    loadData();
  }, [authLoading, isAuthenticated, isAdmin, router]);

  if (authLoading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center p-8 bg-[#FAF8F1]">
        <div className="text-center space-y-3">
          <div className="w-8 h-8 border-2 border-[#214E34] border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="text-xs font-semibold text-[#687168]">Verifying administrator credentials...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated || !isAdmin) return null;

  // Image and Variant Helpers for Add Product Modal
  const handleAddNewImage = () => {
    if (!newProductImageInput.trim()) return;
    setNewProductImages(prev => [...prev, newProductImageInput.trim()]);
    setNewProductImageInput('');
  };

  const handleRemoveNewImage = (idx: number) => {
    setNewProductImages(prev => prev.filter((_, i) => i !== idx));
  };

  const handleSetPrimaryNewImage = (idx: number) => {
    if (idx === 0) return;
    setNewProductImages(prev => {
      const copy = [...prev];
      const [item] = copy.splice(idx, 1);
      return [item, ...copy];
    });
  };

  const handleAddNewVariant = () => {
    setNewProductVariants(prev => [
      ...prev,
      { sku: '', packSize: '', price: newProductPrice, salePrice: newProductSalePrice, stock: 25 }
    ]);
  };

  const handleRemoveNewVariant = (idx: number) => {
    setNewProductVariants(prev => prev.filter((_, i) => i !== idx));
  };

  const handleUpdateNewVariant = (idx: number, field: string, value: any) => {
    setNewProductVariants(prev => {
      const copy = [...prev];
      copy[idx] = { ...copy[idx], [field]: value };
      return copy;
    });
  };

  // Image and Variant Helpers for Edit Product Modal
  const handleAddEditImage = () => {
    if (!editProductImageInput.trim()) return;
    setEditProductImages(prev => [...prev, editProductImageInput.trim()]);
    setEditProductImageInput('');
  };

  const handleRemoveEditImage = (idx: number) => {
    setEditProductImages(prev => prev.filter((_, i) => i !== idx));
  };

  const handleSetPrimaryEditImage = (idx: number) => {
    if (idx === 0) return;
    setEditProductImages(prev => {
      const copy = [...prev];
      const [item] = copy.splice(idx, 1);
      return [item, ...copy];
    });
  };

  const handleAddEditVariant = () => {
    setEditProductVariants(prev => [
      ...prev,
      { sku: '', packSize: '', price: editProductPrice, salePrice: editProductSalePrice, stock: 25 }
    ]);
  };

  const handleRemoveEditVariant = (idx: number) => {
    setEditProductVariants(prev => prev.filter((_, i) => i !== idx));
  };

  const handleUpdateEditVariant = (idx: number, field: string, value: any) => {
    setEditProductVariants(prev => {
      const copy = [...prev];
      copy[idx] = { ...copy[idx], [field]: value };
      return copy;
    });
  };

  const handleCreateProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    setSavingProduct(true);
    try {
      const allImages = newProductImages.filter(img => img.trim() !== '');
      if (allImages.length === 0) allImages.push(newProductImage);
      const thumbnailImg = allImages[0];

      const baseSku = newProductSku.trim() || `AP-${Date.now().toString().slice(-6)}`;
      const preparedVariants = newProductVariants
        .filter(v => v.packSize.trim() !== '')
        .map((v, i) => ({
          sku: (v.sku || '').trim() || `${baseSku}-V${i + 1}`,
          packSize: v.packSize.trim(),
          price: Number(v.price) || Number(newProductPrice),
          salePrice: v.salePrice !== undefined && v.salePrice !== '' && Number(v.salePrice) > 0 ? Number(v.salePrice) : undefined,
          stock: Math.max(0, Number(v.stock !== undefined ? v.stock : newProductStock))
        }));

      if (preparedVariants.length === 0) {
        preparedVariants.push({
          sku: baseSku,
          packSize: newProductPackSize || 'Standard Pack',
          price: Number(newProductPrice),
          salePrice: Number(newProductSalePrice) > 0 ? Number(newProductSalePrice) : undefined,
          stock: Math.max(0, Number(newProductStock))
        });
      }

      const totalStock = preparedVariants.reduce((sum, v) => sum + v.stock, 0);
      const primaryVariant = preparedVariants[0];

      await fetchFromAPI('/admin/products', {
        method: 'POST',
        body: JSON.stringify({
          name: newProductName,
          tagline: newProductTagline,
          description: newProductDescription,
          category: newProductCategory,
          price: primaryVariant.price,
          salePrice: primaryVariant.salePrice !== undefined ? primaryVariant.salePrice : Number(newProductSalePrice),
          sku: baseSku,
          stock: totalStock,
          packSize: primaryVariant.packSize,
          variants: preparedVariants,
          format: newProductFormat,
          thumbnail: thumbnailImg,
          images: allImages,
          dosageInstructions: 'Take 1 to 2 units daily with warm water.',
          storageInstructions: 'Store in a cool dry area away from direct sunlight.',
          doshaBalancing: { vata: true, pitta: false, kapha: true, primaryDosha: 'Tridoshic' },
          keyIngredients: [
            { name: 'Standardized Botanical Extract', botanicalName: 'Herba ayurvedica', portion: '500mg', benefit: 'Vitality' }
          ]
        })
      });
      setShowProductModal(false);
      // Reset form states
      setNewProductName('');
      setNewProductTagline('');
      setNewProductDescription('');
      setNewProductSku('');
      setNewProductImages([
        'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?auto=format&fit=crop&w=600&q=80'
      ]);
      setNewProductImageInput('');
      setNewProductVariants([
        { sku: '', packSize: '60 Veggie Capsules', price: 799, salePrice: 699, stock: 25 }
      ]);
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

  const openEditProduct = (p: any) => {
    setEditingProduct(p);
    setEditProductName(p.name || '');
    setEditProductCategory(p.category || 'Immunity & Rasayana');
    setEditProductPrice(p.price || 0);
    setEditProductSalePrice(p.salePrice || p.price || 0);
    setEditProductStock(p.stock !== undefined ? p.stock : 0);
    setEditProductPackSize(p.packSize || '');
    setEditProductDescription(p.description || '');

    // Initialize Images
    if (p.images && Array.isArray(p.images) && p.images.length > 0) {
      setEditProductImages([...p.images]);
    } else if (p.thumbnail) {
      setEditProductImages([p.thumbnail]);
    } else {
      setEditProductImages([]);
    }
    setEditProductImageInput('');

    // Initialize Variants
    if (p.variants && Array.isArray(p.variants) && p.variants.length > 0) {
      setEditProductVariants(
        p.variants.map((v: any) => ({
          sku: v.sku || '',
          packSize: v.packSize || '',
          price: v.price || 0,
          salePrice: v.salePrice !== undefined ? v.salePrice : '',
          stock: v.stock !== undefined ? v.stock : 0
        }))
      );
    } else {
      setEditProductVariants([
        {
          sku: p.sku || '',
          packSize: p.packSize || '',
          price: p.price || 0,
          salePrice: p.salePrice || '',
          stock: p.stock !== undefined ? p.stock : 0
        }
      ]);
    }
  };

  const handleUpdateProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProduct) return;
    setSavingEditProduct(true);
    try {
      const allImages = editProductImages.filter(img => img.trim() !== '');
      if (allImages.length === 0) {
        allImages.push(editingProduct.thumbnail || 'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?auto=format&fit=crop&w=600&q=80');
      }
      const thumbnailImg = allImages[0];

      const baseSku = editingProduct.sku || `AP-${Date.now().toString().slice(-6)}`;
      const preparedVariants = editProductVariants
        .filter(v => (v.packSize || '').trim() !== '')
        .map((v, i) => ({
          sku: (v.sku || '').trim() || `${baseSku}-V${i + 1}`,
          packSize: v.packSize.trim(),
          price: Number(v.price) || Number(editProductPrice),
          salePrice: v.salePrice !== undefined && v.salePrice !== '' && Number(v.salePrice) > 0 ? Number(v.salePrice) : undefined,
          stock: Math.max(0, Number(v.stock !== undefined ? v.stock : 0))
        }));

      if (preparedVariants.length === 0) {
        preparedVariants.push({
          sku: baseSku,
          packSize: editProductPackSize || 'Standard Pack',
          price: Number(editProductPrice),
          salePrice: Number(editProductSalePrice) > 0 ? Number(editProductSalePrice) : undefined,
          stock: Math.max(0, Number(editProductStock))
        });
      }

      const totalStock = preparedVariants.reduce((sum, v) => sum + v.stock, 0);
      const primaryVariant = preparedVariants[0];

      await fetchFromAPI(`/admin/products/${editingProduct._id}`, {
        method: 'PUT',
        body: JSON.stringify({
          name: editProductName,
          category: editProductCategory,
          price: primaryVariant.price,
          salePrice: primaryVariant.salePrice !== undefined ? primaryVariant.salePrice : Number(editProductSalePrice),
          stock: totalStock,
          packSize: primaryVariant.packSize,
          description: editProductDescription,
          images: allImages,
          thumbnail: thumbnailImg,
          variants: preparedVariants
        })
      });
      setEditingProduct(null);
      await loadData();
    } catch (e: any) {
      alert(e.message || 'Failed to update formulation');
    } finally {
      setSavingEditProduct(false);
    }
  };

  const handleQuickStockUpdate = async (id: string, newStock: number) => {
    try {
      await fetchFromAPI(`/admin/products/${id}/stock`, {
        method: 'PATCH',
        body: JSON.stringify({ stock: newStock })
      });
      await loadData();
    } catch (e: any) {
      alert(e.message || 'Failed to update stock');
    }
  };

  const handleDeleteCoupon = async (id: string) => {
    if (!confirm('Are you sure you want to delete this promotional coupon?')) return;
    try {
      await fetchFromAPI(`/admin/coupons/${id}`, { method: 'DELETE' });
      await loadData();
    } catch (e: any) {
      alert(e.message || 'Failed to delete coupon');
    }
  };

  const handleToggleCoupon = async (id: string) => {
    try {
      await fetchFromAPI(`/admin/coupons/${id}/toggle`, { method: 'PATCH' });
      await loadData();
    } catch (e: any) {
      alert(e.message || 'Failed to toggle coupon status');
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

  const handleUpdateEnquiryStatus = async (id: string, status: string) => {
    try {
      const res = await fetchFromAPI(`/enquiries/${id}/status`, {
        method: 'PATCH',
        body: JSON.stringify({ status })
      });
      if (res.success) {
        setEnquiries(prev => prev.map(e => (e._id === id ? { ...e, status } : e)));
      }
    } catch (e: any) {
      alert(e.message || 'Failed to update enquiry status');
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
        <button
          onClick={() => setActiveTab('enquiries')}
          className={`px-4 py-2.5 rounded-t-lg transition-colors flex items-center gap-1.5 ${
            activeTab === 'enquiries'
              ? 'bg-[#214E34] text-white'
              : 'bg-white border border-[#E5E8E0] text-[#202820] hover:bg-[#FAF8F1]'
          }`}
        >
          <Building2 className="w-4 h-4" /> B2B Enquiries ({enquiries.length})
        </button>
        <button
          onClick={() => {
            setActiveTab('users');
            fetchUsers(userSearchQuery, userRoleFilter);
          }}
          className={`px-4 py-2.5 rounded-t-lg transition-colors flex items-center gap-1.5 ${
            activeTab === 'users'
              ? 'bg-[#214E34] text-white'
              : 'bg-white border border-[#E5E8E0] text-[#202820] hover:bg-[#FAF8F1]'
          }`}
        >
          <Shield className="w-4 h-4 text-amber-300" /> Customers & Admins ({users.length})
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
                  <span className="text-xs font-semibold text-[#687168] block">Registered Customers</span>
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
                          {o.shippingAddress?.fullName || o.guestEmail || 'Customer'} • {o.shippingAddress?.city || 'India'}{o.shippingAddress?.state ? `, ${o.shippingAddress.state}` : ''}
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
                        <div className="flex justify-between items-center mb-1">
                          <label className="block text-[#687168] font-semibold">Dispensary Stock *</label>
                          <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                            newProductStock === 0
                              ? 'bg-red-100 text-red-700'
                              : newProductStock <= 5
                              ? 'bg-amber-100 text-amber-800'
                              : 'bg-green-100 text-green-800'
                          }`}>
                            {newProductStock === 0 ? 'Out of Stock' : `${newProductStock} In Stock`}
                          </span>
                        </div>
                        <input
                          type="number"
                          min={0}
                          required
                          value={newProductStock}
                          onChange={e => setNewProductStock(Math.max(0, Number(e.target.value)))}
                          className="w-full px-3 py-2 border border-[#E5E8E0] rounded-md bg-[#FAF8F1]"
                        />
                        {/* Out of Stock quick presets */}
                        <div className="flex items-center gap-1.5 mt-1.5">
                          <button
                            type="button"
                            onClick={() => setNewProductStock(0)}
                            className={`px-2 py-0.5 rounded text-[10px] font-bold border transition-colors ${
                              newProductStock === 0
                                ? 'bg-red-700 text-white border-red-700'
                                : 'bg-white text-red-700 border-red-300 hover:bg-red-50'
                            }`}
                          >
                            Mark 0 (Out of Stock)
                          </button>
                          <button
                            type="button"
                            onClick={() => setNewProductStock(25)}
                            className="px-2 py-0.5 rounded text-[10px] font-medium bg-white text-[#214E34] border border-[#E5E8E0] hover:border-[#214E34]"
                          >
                            25 Units
                          </button>
                          <button
                            type="button"
                            onClick={() => setNewProductStock(100)}
                            className="px-2 py-0.5 rounded text-[10px] font-medium bg-white text-[#214E34] border border-[#E5E8E0] hover:border-[#214E34]"
                          >
                            100 Bulk
                          </button>
                        </div>
                        {newProductStock === 0 && (
                          <p className="text-[10px] text-red-700 mt-1 font-semibold">
                            ⚠️ Note: Setting stock to 0 automatically marks this product as &quot;Out of Stock&quot; on customer product pages and disables purchasing.
                          </p>
                        )}
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
                          <option value="Lepam">Lepam</option>
                          <option value="Tablet">Tablet</option>
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

                    {/* Section: Multiple Images Gallery */}
                    <div className="p-4 bg-[#FAF8F1] rounded-xl border border-[#E5E8E0] space-y-3">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                        <div>
                          <label className="block text-[#214E34] font-bold text-xs uppercase tracking-wider flex items-center gap-1.5">
                            <LucideImage className="w-4 h-4 text-[#B86F4B]" /> Product Images Gallery ({newProductImages.length})
                          </label>
                          <p className="text-[11px] text-[#687168]">
                            Add multiple angles, packaging shots, and ingredient views. The first image serves as the primary storefront thumbnail.
                          </p>
                        </div>
                      </div>

                      {/* Image Thumbnails Strip */}
                      <div className="flex flex-wrap gap-2.5 items-center">
                        {newProductImages.map((img, idx) => (
                          <div
                            key={idx}
                            className="relative group w-20 h-20 rounded-lg overflow-hidden border-2 border-[#E5E8E0] bg-white shadow-2xs shrink-0"
                          >
                            <img src={img} alt={`Preview ${idx + 1}`} className="w-full h-full object-cover" />
                            {idx === 0 ? (
                              <span className="absolute top-1 left-1 bg-[#214E34] text-white text-[9px] font-bold px-1.5 py-0.5 rounded shadow-xs">
                                Primary
                              </span>
                            ) : (
                              <button
                                type="button"
                                onClick={() => handleSetPrimaryNewImage(idx)}
                                className="absolute bottom-1 left-1 right-1 bg-black/70 hover:bg-black text-white text-[8px] font-semibold py-0.5 rounded text-center opacity-0 group-hover:opacity-100 transition-opacity"
                              >
                                Make Primary
                              </button>
                            )}
                            <button
                              type="button"
                              onClick={() => handleRemoveNewImage(idx)}
                              className="absolute top-1 right-1 bg-red-600 hover:bg-red-700 text-white p-1 rounded-full opacity-90 hover:opacity-100 transition-opacity shadow-xs"
                              title="Remove image"
                            >
                              <X className="w-3 h-3" />
                            </button>
                          </div>
                        ))}

                        {newProductImages.length === 0 && (
                          <p className="text-[11px] text-[#888] italic py-2">
                            No images added yet. Paste an image URL below to add one.
                          </p>
                        )}
                      </div>

                      {/* Add Image URL Input */}
                      <div className="flex gap-2">
                        <input
                          type="url"
                          value={newProductImageInput}
                          onChange={e => setNewProductImageInput(e.target.value)}
                          onKeyDown={e => {
                            if (e.key === 'Enter') {
                              e.preventDefault();
                              handleAddNewImage();
                            }
                          }}
                          placeholder="Paste image URL (e.g. https://images.unsplash.com/... or CDN link)"
                          className="flex-1 px-3 py-2 border border-[#E5E8E0] rounded-md bg-white text-xs"
                        />
                        <button
                          type="button"
                          onClick={handleAddNewImage}
                          className="px-4 py-2 bg-[#214E34] hover:bg-[#163A28] text-white font-semibold rounded-md text-xs flex items-center gap-1 shrink-0"
                        >
                          <Plus className="w-3.5 h-3.5" /> Add Image
                        </button>
                      </div>
                    </div>

                    {/* Section: Multiple Variants & Pack Sizes */}
                    <div className="p-4 bg-[#FAF8F1] rounded-xl border border-[#E5E8E0] space-y-3">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                        <div>
                          <label className="block text-[#214E34] font-bold text-xs uppercase tracking-wider flex items-center gap-1.5">
                            <Layers className="w-4 h-4 text-[#B86F4B]" /> Product Variants & Pack Sizes ({newProductVariants.length})
                          </label>
                          <p className="text-[11px] text-[#687168]">
                            Configure multiple sizes or volumes (e.g. 60 Caps, 120 Caps, 100ml, 200ml) with individual pricing and stock inventory.
                          </p>
                        </div>
                        <button
                          type="button"
                          onClick={handleAddNewVariant}
                          className="px-3 py-1.5 bg-[#FAF8F1] hover:bg-[#EDE8E0] border border-[#214E34] text-[#214E34] font-bold rounded-md text-xs flex items-center gap-1 transition-colors self-start sm:self-auto shrink-0"
                        >
                          <Plus className="w-3.5 h-3.5" /> Add Variant
                        </button>
                      </div>

                      <div className="space-y-2">
                        {newProductVariants.map((v, idx) => (
                          <div
                            key={idx}
                            className="p-3 bg-white rounded-lg border border-[#E5E8E0] grid grid-cols-1 sm:grid-cols-12 gap-2.5 items-end shadow-2xs"
                          >
                            <div className="sm:col-span-3">
                              <label className="block text-[10px] text-[#687168] font-bold uppercase mb-1">
                                Pack Size / Volume *
                              </label>
                              <input
                                type="text"
                                required
                                value={v.packSize}
                                onChange={e => handleUpdateNewVariant(idx, 'packSize', e.target.value)}
                                placeholder="e.g. 60 Veggie Capsules"
                                className="w-full px-2.5 py-1.5 border border-[#E5E8E0] rounded bg-[#FAF8F1] text-xs"
                              />
                            </div>

                            <div className="sm:col-span-2">
                              <label className="block text-[10px] text-[#687168] font-bold uppercase mb-1">
                                MRP Price (₹) *
                              </label>
                              <input
                                type="number"
                                required
                                min={0}
                                value={v.price}
                                onChange={e => handleUpdateNewVariant(idx, 'price', Number(e.target.value))}
                                className="w-full px-2.5 py-1.5 border border-[#E5E8E0] rounded bg-[#FAF8F1] text-xs"
                              />
                            </div>

                            <div className="sm:col-span-2">
                              <label className="block text-[10px] text-[#687168] font-bold uppercase mb-1">
                                Sale Price (₹)
                              </label>
                              <input
                                type="number"
                                min={0}
                                value={v.salePrice !== undefined ? v.salePrice : ''}
                                onChange={e => handleUpdateNewVariant(idx, 'salePrice', e.target.value === '' ? '' : Number(e.target.value))}
                                className="w-full px-2.5 py-1.5 border border-[#E5E8E0] rounded bg-[#FAF8F1] text-xs"
                              />
                            </div>

                            <div className="sm:col-span-2">
                              <label className="block text-[10px] text-[#687168] font-bold uppercase mb-1">
                                Stock (Units) *
                              </label>
                              <input
                                type="number"
                                required
                                min={0}
                                value={v.stock}
                                onChange={e => handleUpdateNewVariant(idx, 'stock', Math.max(0, Number(e.target.value)))}
                                className="w-full px-2.5 py-1.5 border border-[#E5E8E0] rounded bg-[#FAF8F1] text-xs"
                              />
                            </div>

                            <div className="sm:col-span-2">
                              <label className="block text-[10px] text-[#687168] font-bold uppercase mb-1">
                                SKU (Optional)
                              </label>
                              <input
                                type="text"
                                value={v.sku}
                                onChange={e => handleUpdateNewVariant(idx, 'sku', e.target.value)}
                                placeholder="Auto-generated"
                                className="w-full px-2.5 py-1.5 border border-[#E5E8E0] rounded bg-[#FAF8F1] text-xs"
                              />
                            </div>

                            <div className="sm:col-span-1 flex justify-end">
                              <button
                                type="button"
                                disabled={newProductVariants.length === 1}
                                onClick={() => handleRemoveNewVariant(idx)}
                                className="p-2 text-red-600 hover:bg-red-50 rounded-md disabled:opacity-30 disabled:cursor-not-allowed"
                                title={newProductVariants.length === 1 ? 'At least one variant required' : 'Remove variant'}
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
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

              {/* Edit Product Modal */}
              {editingProduct && (
                <div className="bg-white p-6 rounded-2xl border-2 border-[#B86F4B] shadow-xl space-y-4">
                  <div className="flex justify-between items-center pb-3 border-b border-[#E5E8E0]">
                    <div>
                      <span className="text-[10px] uppercase font-bold text-[#B86F4B]">Edit Formulation</span>
                      <h3 className="text-sm font-bold text-[#214E34]">
                        {editingProduct.name} ({editingProduct.sku})
                      </h3>
                    </div>
                    <button
                      onClick={() => setEditingProduct(null)}
                      className="text-xs text-red-600 font-semibold"
                    >
                      Close
                    </button>
                  </div>

                  <form onSubmit={handleUpdateProduct} className="space-y-4 text-xs">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[#687168] mb-1 font-semibold">Formulation Name *</label>
                        <input
                          type="text"
                          required
                          value={editProductName}
                          onChange={e => setEditProductName(e.target.value)}
                          className="w-full px-3 py-2 border border-[#E5E8E0] rounded-md bg-[#FAF8F1]"
                        />
                      </div>
                      <div>
                        <label className="block text-[#687168] mb-1 font-semibold">Category *</label>
                        <select
                          value={editProductCategory}
                          onChange={e => setEditProductCategory(e.target.value)}
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
                        <label className="block text-[#687168] mb-1 font-semibold">Pack Size *</label>
                        <input
                          type="text"
                          required
                          value={editProductPackSize}
                          onChange={e => setEditProductPackSize(e.target.value)}
                          className="w-full px-3 py-2 border border-[#E5E8E0] rounded-md bg-[#FAF8F1]"
                        />
                      </div>
                      <div>
                        <label className="block text-[#687168] mb-1 font-semibold">MRP Price (₹) *</label>
                        <input
                          type="number"
                          required
                          value={editProductPrice}
                          onChange={e => setEditProductPrice(Number(e.target.value))}
                          className="w-full px-3 py-2 border border-[#E5E8E0] rounded-md bg-[#FAF8F1]"
                        />
                      </div>
                      <div>
                        <label className="block text-[#687168] mb-1 font-semibold">Sale Price (₹)</label>
                        <input
                          type="number"
                          value={editProductSalePrice}
                          onChange={e => setEditProductSalePrice(Number(e.target.value))}
                          className="w-full px-3 py-2 border border-[#E5E8E0] rounded-md bg-[#FAF8F1]"
                        />
                      </div>
                      <div>
                        <div className="flex justify-between items-center mb-1">
                          <label className="block text-[#687168] font-semibold">Dispensary Stock *</label>
                          <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                            editProductStock === 0
                              ? 'bg-red-100 text-red-700'
                              : editProductStock <= 5
                              ? 'bg-amber-100 text-amber-800'
                              : 'bg-green-100 text-green-800'
                          }`}>
                            {editProductStock === 0 ? 'Out of Stock' : `${editProductStock} In Stock`}
                          </span>
                        </div>
                        <input
                          type="number"
                          min={0}
                          required
                          value={editProductStock}
                          onChange={e => setEditProductStock(Math.max(0, Number(e.target.value)))}
                          className="w-full px-3 py-2 border border-[#E5E8E0] rounded-md bg-[#FAF8F1]"
                        />
                        <div className="flex items-center gap-1.5 mt-1.5">
                          <button
                            type="button"
                            onClick={() => setEditProductStock(0)}
                            className={`px-2 py-0.5 rounded text-[10px] font-bold border transition-colors ${
                              editProductStock === 0
                                ? 'bg-red-700 text-white border-red-700'
                                : 'bg-white text-red-700 border-red-300 hover:bg-red-50'
                            }`}
                          >
                            Set 0 (Out of Stock)
                          </button>
                          <button
                            type="button"
                            onClick={() => setEditProductStock(25)}
                            className="px-2 py-0.5 rounded text-[10px] font-medium bg-white text-[#214E34] border border-[#E5E8E0] hover:border-[#214E34]"
                          >
                            25 Standard
                          </button>
                          <button
                            type="button"
                            onClick={() => setEditProductStock(100)}
                            className="px-2 py-0.5 rounded text-[10px] font-medium bg-white text-[#214E34] border border-[#E5E8E0] hover:border-[#214E34]"
                          >
                            100 Units
                          </button>
                        </div>
                        {editProductStock === 0 && (
                          <p className="text-[10px] text-red-700 mt-1 font-semibold">
                            ⚠️ This formulation will be marked OUT OF STOCK immediately across the store.
                          </p>
                        )}
                      </div>
                    </div>

                    <div>
                      <label className="block text-[#687168] mb-1 font-semibold">Botanical Description *</label>
                      <textarea
                        rows={3}
                        required
                        value={editProductDescription}
                        onChange={e => setEditProductDescription(e.target.value)}
                        className="w-full px-3 py-2 border border-[#E5E8E0] rounded-md bg-[#FAF8F1]"
                      />
                    </div>

                    {/* Section: Multiple Images Gallery (Edit) */}
                    <div className="p-4 bg-[#FAF8F1] rounded-xl border border-[#E5E8E0] space-y-3">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                        <div>
                          <label className="block text-[#214E34] font-bold text-xs uppercase tracking-wider flex items-center gap-1.5">
                            <LucideImage className="w-4 h-4 text-[#B86F4B]" /> Product Images Gallery ({editProductImages.length})
                          </label>
                          <p className="text-[11px] text-[#687168]">
                            Add multiple angles, packaging shots, and ingredient views. The first image serves as the primary storefront thumbnail.
                          </p>
                        </div>
                      </div>

                      {/* Image Thumbnails Strip */}
                      <div className="flex flex-wrap gap-2.5 items-center">
                        {editProductImages.map((img, idx) => (
                          <div
                            key={idx}
                            className="relative group w-20 h-20 rounded-lg overflow-hidden border-2 border-[#E5E8E0] bg-white shadow-2xs shrink-0"
                          >
                            <img src={img} alt={`Preview ${idx + 1}`} className="w-full h-full object-cover" />
                            {idx === 0 ? (
                              <span className="absolute top-1 left-1 bg-[#214E34] text-white text-[9px] font-bold px-1.5 py-0.5 rounded shadow-xs">
                                Primary
                              </span>
                            ) : (
                              <button
                                type="button"
                                onClick={() => handleSetPrimaryEditImage(idx)}
                                className="absolute bottom-1 left-1 right-1 bg-black/70 hover:bg-black text-white text-[8px] font-semibold py-0.5 rounded text-center opacity-0 group-hover:opacity-100 transition-opacity"
                              >
                                Make Primary
                              </button>
                            )}
                            <button
                              type="button"
                              onClick={() => handleRemoveEditImage(idx)}
                              className="absolute top-1 right-1 bg-red-600 hover:bg-red-700 text-white p-1 rounded-full opacity-90 hover:opacity-100 transition-opacity shadow-xs"
                              title="Remove image"
                            >
                              <X className="w-3 h-3" />
                            </button>
                          </div>
                        ))}

                        {editProductImages.length === 0 && (
                          <p className="text-[11px] text-[#888] italic py-2">
                            No images added yet. Paste an image URL below to add one.
                          </p>
                        )}
                      </div>

                      {/* Add Image URL Input */}
                      <div className="flex gap-2">
                        <input
                          type="url"
                          value={editProductImageInput}
                          onChange={e => setEditProductImageInput(e.target.value)}
                          onKeyDown={e => {
                            if (e.key === 'Enter') {
                              e.preventDefault();
                              handleAddEditImage();
                            }
                          }}
                          placeholder="Paste image URL (e.g. https://images.unsplash.com/... or CDN link)"
                          className="flex-1 px-3 py-2 border border-[#E5E8E0] rounded-md bg-white text-xs"
                        />
                        <button
                          type="button"
                          onClick={handleAddEditImage}
                          className="px-4 py-2 bg-[#214E34] hover:bg-[#163A28] text-white font-semibold rounded-md text-xs flex items-center gap-1 shrink-0"
                        >
                          <Plus className="w-3.5 h-3.5" /> Add Image
                        </button>
                      </div>
                    </div>

                    {/* Section: Multiple Variants & Pack Sizes (Edit) */}
                    <div className="p-4 bg-[#FAF8F1] rounded-xl border border-[#E5E8E0] space-y-3">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                        <div>
                          <label className="block text-[#214E34] font-bold text-xs uppercase tracking-wider flex items-center gap-1.5">
                            <Layers className="w-4 h-4 text-[#B86F4B]" /> Product Variants & Pack Sizes ({editProductVariants.length})
                          </label>
                          <p className="text-[11px] text-[#687168]">
                            Configure multiple sizes or volumes (e.g. 60 Caps, 120 Caps, 100ml, 200ml) with individual pricing and stock inventory.
                          </p>
                        </div>
                        <button
                          type="button"
                          onClick={handleAddEditVariant}
                          className="px-3 py-1.5 bg-[#FAF8F1] hover:bg-[#EDE8E0] border border-[#214E34] text-[#214E34] font-bold rounded-md text-xs flex items-center gap-1 transition-colors self-start sm:self-auto shrink-0"
                        >
                          <Plus className="w-3.5 h-3.5" /> Add Variant
                        </button>
                      </div>

                      <div className="space-y-2">
                        {editProductVariants.map((v, idx) => (
                          <div
                            key={idx}
                            className="p-3 bg-white rounded-lg border border-[#E5E8E0] grid grid-cols-1 sm:grid-cols-12 gap-2.5 items-end shadow-2xs"
                          >
                            <div className="sm:col-span-3">
                              <label className="block text-[10px] text-[#687168] font-bold uppercase mb-1">
                                Pack Size / Volume *
                              </label>
                              <input
                                type="text"
                                required
                                value={v.packSize}
                                onChange={e => handleUpdateEditVariant(idx, 'packSize', e.target.value)}
                                placeholder="e.g. 60 Veggie Capsules"
                                className="w-full px-2.5 py-1.5 border border-[#E5E8E0] rounded bg-[#FAF8F1] text-xs"
                              />
                            </div>

                            <div className="sm:col-span-2">
                              <label className="block text-[10px] text-[#687168] font-bold uppercase mb-1">
                                MRP Price (₹) *
                              </label>
                              <input
                                type="number"
                                required
                                min={0}
                                value={v.price}
                                onChange={e => handleUpdateEditVariant(idx, 'price', Number(e.target.value))}
                                className="w-full px-2.5 py-1.5 border border-[#E5E8E0] rounded bg-[#FAF8F1] text-xs"
                              />
                            </div>

                            <div className="sm:col-span-2">
                              <label className="block text-[10px] text-[#687168] font-bold uppercase mb-1">
                                Sale Price (₹)
                              </label>
                              <input
                                type="number"
                                min={0}
                                value={v.salePrice !== undefined ? v.salePrice : ''}
                                onChange={e => handleUpdateEditVariant(idx, 'salePrice', e.target.value === '' ? '' : Number(e.target.value))}
                                className="w-full px-2.5 py-1.5 border border-[#E5E8E0] rounded bg-[#FAF8F1] text-xs"
                              />
                            </div>

                            <div className="sm:col-span-2">
                              <label className="block text-[10px] text-[#687168] font-bold uppercase mb-1">
                                Stock (Units) *
                              </label>
                              <input
                                type="number"
                                required
                                min={0}
                                value={v.stock}
                                onChange={e => handleUpdateEditVariant(idx, 'stock', Math.max(0, Number(e.target.value)))}
                                className="w-full px-2.5 py-1.5 border border-[#E5E8E0] rounded bg-[#FAF8F1] text-xs"
                              />
                            </div>

                            <div className="sm:col-span-2">
                              <label className="block text-[10px] text-[#687168] font-bold uppercase mb-1">
                                SKU (Optional)
                              </label>
                              <input
                                type="text"
                                value={v.sku}
                                onChange={e => handleUpdateEditVariant(idx, 'sku', e.target.value)}
                                placeholder="Auto-generated"
                                className="w-full px-2.5 py-1.5 border border-[#E5E8E0] rounded bg-[#FAF8F1] text-xs"
                              />
                            </div>

                            <div className="sm:col-span-1 flex justify-end">
                              <button
                                type="button"
                                disabled={editProductVariants.length === 1}
                                onClick={() => handleRemoveEditVariant(idx)}
                                className="p-2 text-red-600 hover:bg-red-50 rounded-md disabled:opacity-30 disabled:cursor-not-allowed"
                                title={editProductVariants.length === 1 ? 'At least one variant required' : 'Remove variant'}
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <button
                        type="submit"
                        disabled={savingEditProduct}
                        className="px-5 py-2.5 bg-[#214E34] text-white font-semibold rounded-md hover:bg-[#163A28]"
                      >
                        {savingEditProduct ? 'Updating...' : 'Update Formulation'}
                      </button>
                      <button
                        type="button"
                        onClick={() => setEditingProduct(null)}
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
                      <th className="p-3">Dispensary Stock</th>
                      <th className="p-3">Rating</th>
                      <th className="p-3 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#E5E8E0]">
                    {products.map(p => (
                      <tr key={p._id} className="hover:bg-[#FAF8F1]/50">
                        <td className="p-3 flex items-center gap-3">
                          <div className="relative w-10 h-10 rounded bg-[#FAF8F1] overflow-hidden shrink-0 border border-[#E5E8E0]">
                            <Image src={p.thumbnail || (p.images && p.images[0]) || '/images/logo.png'} alt={p.name} fill className="object-cover" />
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
                          <div>
                            {p.stock === 0 ? (
                              <span className="px-2.5 py-1 rounded-full font-bold bg-red-100 text-red-800 border border-red-200 inline-flex items-center gap-1">
                                <span className="w-1.5 h-1.5 rounded-full bg-red-600"></span>
                                Out of Stock (0)
                              </span>
                            ) : p.stock <= 5 ? (
                              <span className="px-2 py-0.5 rounded-full font-bold bg-amber-100 text-amber-800 border border-amber-200">
                                Low Stock ({p.stock})
                              </span>
                            ) : (
                              <span className="px-2 py-0.5 rounded-full font-bold bg-green-100 text-green-800 border border-green-200">
                                {p.stock} units
                              </span>
                            )}
                          </div>
                          {/* Quick 1-click toggle */}
                          <div className="mt-1">
                            <button
                              onClick={() => handleQuickStockUpdate(p._id, p.stock === 0 ? 25 : 0)}
                              className="text-[10px] text-[#214E34] hover:underline font-semibold"
                            >
                              {p.stock === 0 ? '⚡ Restock 25' : '⚡ Mark Out of Stock'}
                            </button>
                          </div>
                        </td>
                        <td className="p-3 text-[#687168]">★ {p.rating} ({p.reviewCount})</td>
                        <td className="p-3 text-right">
                          <div className="flex items-center justify-end gap-1.5">
                            <button
                              onClick={() => openEditProduct(p)}
                              className="p-1.5 text-[#214E34] hover:bg-[#DDE7D9] rounded"
                              title="Edit Formulation"
                            >
                              <Edit className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleDeleteProduct(p._id)}
                              className="p-1.5 text-red-600 hover:bg-red-50 rounded"
                              title="Delete Formulation"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
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
                          <p className="font-bold text-[#202820]">
                            {o.shippingAddress?.fullName || o.guestEmail || 'Customer'}
                          </p>
                          <p className="text-[10px] text-[#687168]">
                            {o.shippingAddress?.city || 'India'}{o.shippingAddress?.state ? `, ${o.shippingAddress.state}` : ''} {o.shippingAddress?.pincode ? `(${o.shippingAddress.pincode})` : ''}
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
                  <div key={c._id} className="bg-white p-4 rounded-xl border border-[#E5E8E0] shadow-2xs space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="font-mono font-bold text-sm text-[#214E34] bg-[#DDE7D9] px-2.5 py-0.5 rounded">
                        {c.code}
                      </span>
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                          c.isActive
                            ? 'bg-green-100 text-green-800'
                            : 'bg-gray-100 text-gray-600'
                        }`}
                      >
                        {c.isActive ? 'Active' : 'Inactive'}
                      </span>
                    </div>

                    <div className="space-y-1">
                      <p className="text-xs font-bold text-[#202820]">
                        {c.discountValue}% OFF on orders above ₹{c.minOrderValue}
                      </p>
                      <p className="text-[10px] text-[#687168]">
                        Redemptions logged: <strong>{c.usageCount}</strong> times
                      </p>
                      {c.validUntil && (
                        <p className="text-[10px] text-[#687168]">
                          Valid until: {new Date(c.validUntil).toLocaleDateString('en-IN')}
                        </p>
                      )}
                    </div>

                    <div className="pt-2 border-t border-[#E5E8E0] flex items-center justify-between text-xs">
                      <button
                        onClick={() => handleToggleCoupon(c._id)}
                        className={`px-2 py-1 rounded text-[11px] font-semibold transition-colors ${
                          c.isActive
                            ? 'text-amber-700 hover:bg-amber-50'
                            : 'text-green-700 hover:bg-green-50'
                        }`}
                      >
                        {c.isActive ? 'Deactivate' : 'Activate'}
                      </button>
                      <button
                        onClick={() => handleDeleteCoupon(c._id)}
                        className="px-2 py-1 rounded text-[11px] font-semibold text-red-600 hover:bg-red-50 transition-colors"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>

            </div>
          )}

          {/* TAB 5: B2B Wholesale Enquiries */}
          {activeTab === 'enquiries' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-sm font-bold text-[#202820] uppercase tracking-wider">
                  Wholesale & Bulk Order Requests ({enquiries.length})
                </h2>
              </div>

              <div className="bg-white rounded-xl border border-[#E5E8E0] shadow-2xs overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-[#FAF8F1] border-b border-[#E5E8E0] font-bold text-[#202820]">
                      <tr>
                        <th className="p-3">Company & Contact</th>
                        <th className="p-3">Email & Phone</th>
                        <th className="p-3">Product Interest</th>
                        <th className="p-3">Required Volume</th>
                        <th className="p-3">Notes</th>
                        <th className="p-3">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#E5E8E0]">
                      {enquiries.length === 0 ? (
                        <tr>
                          <td colSpan={6} className="p-6 text-center text-[#687168]">
                            No wholesale enquiries recorded yet.
                          </td>
                        </tr>
                      ) : (
                        enquiries.map(enq => (
                          <tr key={enq._id} className="hover:bg-[#FAF8F1]">
                            <td className="p-3">
                              <span className="font-bold text-[#202820] block">{enq.company}</span>
                              <span className="text-[11px] text-[#687168]">{enq.name} ({enq.businessType})</span>
                            </td>
                            <td className="p-3">
                              <a href={`mailto:${enq.email}`} className="text-[#214E34] hover:underline block font-mono">
                                {enq.email}
                              </a>
                              <a href={`tel:${enq.phone}`} className="text-[#687168] hover:text-[#202820] font-mono">
                                {enq.phone}
                              </a>
                            </td>
                            <td className="p-3 font-medium text-[#202820]">
                              {enq.productInterest}
                            </td>
                            <td className="p-3 font-semibold text-[#B86F4B]">
                              {enq.quantity}
                            </td>
                            <td className="p-3 text-[#687168] max-w-xs truncate" title={enq.message}>
                              {enq.message || '—'}
                            </td>
                            <td className="p-3">
                              <select
                                value={enq.status}
                                onChange={e => handleUpdateEnquiryStatus(enq._id, e.target.value)}
                                className={`text-[11px] font-bold rounded px-2 py-1 border ${
                                  enq.status === 'resolved'
                                    ? 'bg-green-100 text-green-800 border-green-300'
                                    : enq.status === 'contacted'
                                    ? 'bg-blue-100 text-blue-800 border-blue-300'
                                    : enq.status === 'in_progress'
                                    ? 'bg-amber-100 text-amber-800 border-amber-300'
                                    : 'bg-yellow-50 text-yellow-800 border-yellow-300'
                                }`}
                              >
                                <option value="pending">Pending</option>
                                <option value="in_progress">In Progress</option>
                                <option value="contacted">Contacted</option>
                                <option value="resolved">Resolved</option>
                              </select>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* TAB 6: Users & Admin Promotion Management */}
          {activeTab === 'users' && (
            <div className="space-y-6">
              {/* Header and Summary Cards */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h2 className="text-base font-bold text-[#202820] uppercase tracking-wider flex items-center gap-2">
                    <ShieldCheck className="w-5 h-5 text-[#B86F4B]" /> Customer & Administrative Privilege Directory
                  </h2>
                  <p className="text-xs text-[#687168] mt-0.5">
                    Search registered customers across the system, verify credentials, and promote team members to Administrators.
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <div className="bg-white border border-[#E5E8E0] px-3 py-1.5 rounded-lg text-xs font-semibold text-[#202820] shadow-2xs">
                    Total: <strong className="text-[#214E34]">{users.length}</strong>
                  </div>
                  <div className="bg-[#FAF8F1] border border-[#C59B27]/40 px-3 py-1.5 rounded-lg text-xs font-semibold text-[#8F6B12] shadow-2xs flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#C59B27]" /> Admins:{' '}
                    <strong>{users.filter(u => u.role === 'admin').length}</strong>
                  </div>
                  <div className="bg-slate-50 border border-slate-200 px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-700 shadow-2xs">
                    Customers:{' '}
                    <strong>{users.filter(u => u.role === 'customer').length}</strong>
                  </div>
                </div>
              </div>

              {/* Action Feedback Banner */}
              {userActionMessage && (
                <div
                  className={`p-3.5 rounded-xl border text-xs flex items-center justify-between gap-3 ${
                    userActionMessage.type === 'success'
                      ? 'bg-emerald-50 border-emerald-200 text-emerald-900'
                      : 'bg-red-50 border-red-200 text-red-900'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    {userActionMessage.type === 'success' ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    ) : (
                      <AlertTriangle className="w-4 h-4 text-red-600 shrink-0" />
                    )}
                    <span className="font-medium">{userActionMessage.text}</span>
                  </div>
                  <button
                    onClick={() => setUserActionMessage(null)}
                    className="p-1 rounded hover:bg-black/5 text-[#666]"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              )}

              {/* Search & Filter Controls */}
              <div className="bg-white p-4 rounded-xl border border-[#E5E8E0] shadow-2xs flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
                {/* Search Input */}
                <form
                  onSubmit={e => {
                    e.preventDefault();
                    fetchUsers(userSearchQuery, userRoleFilter);
                  }}
                  className="flex-1 flex items-center gap-2"
                >
                  <div className="relative flex-1">
                    <Search className="w-4 h-4 text-[#888] absolute left-3 top-2.5" />
                    <input
                      type="text"
                      value={userSearchQuery}
                      onChange={e => setUserSearchQuery(e.target.value)}
                      placeholder="Search customer by name, email, or mobile number to promote..."
                      className="w-full pl-9 pr-9 py-2 border border-[#E5E8E0] rounded-lg text-xs bg-[#FAF8F1] focus:bg-white text-[#202820] outline-none focus:border-[#214E34] transition-colors"
                    />
                    {userSearchQuery && (
                      <button
                        type="button"
                        onClick={() => {
                          setUserSearchQuery('');
                          fetchUsers('', userRoleFilter);
                        }}
                        className="absolute right-3 top-2.5 text-[#888] hover:text-[#202820]"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-[#214E34] hover:bg-[#163A28] text-white text-xs font-bold rounded-lg transition-colors flex items-center gap-1.5 shrink-0 shadow-2xs cursor-pointer"
                  >
                    <Search className="w-3.5 h-3.5" /> Search
                  </button>
                </form>

                {/* Role Filter & Refresh */}
                <div className="flex items-center gap-2 shrink-0">
                  <div className="flex bg-[#FAF8F1] p-1 rounded-lg border border-[#E5E8E0] text-xs font-semibold">
                    <button
                      type="button"
                      onClick={() => {
                        setUserRoleFilter('all');
                        fetchUsers(userSearchQuery, 'all');
                      }}
                      className={`px-3 py-1 rounded-md transition-colors ${
                        userRoleFilter === 'all'
                          ? 'bg-[#214E34] text-white font-bold shadow-xs'
                          : 'text-[#687168] hover:text-[#202820]'
                      }`}
                    >
                      All Roles
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setUserRoleFilter('admin');
                        fetchUsers(userSearchQuery, 'admin');
                      }}
                      className={`px-3 py-1 rounded-md transition-colors ${
                        userRoleFilter === 'admin'
                          ? 'bg-[#214E34] text-white font-bold shadow-xs'
                          : 'text-[#687168] hover:text-[#202820]'
                      }`}
                    >
                      Admins Only
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setUserRoleFilter('customer');
                        fetchUsers(userSearchQuery, 'customer');
                      }}
                      className={`px-3 py-1 rounded-md transition-colors ${
                        userRoleFilter === 'customer'
                          ? 'bg-[#214E34] text-white font-bold shadow-xs'
                          : 'text-[#687168] hover:text-[#202820]'
                      }`}
                    >
                      Customers Only
                    </button>
                  </div>

                  <button
                    type="button"
                    onClick={() => fetchUsers(userSearchQuery, userRoleFilter)}
                    title="Refresh user directory"
                    className="p-2 bg-[#FAF8F1] hover:bg-[#EDE8E0] border border-[#E5E8E0] rounded-lg text-[#202820] transition-colors cursor-pointer"
                  >
                    <RefreshCw className={`w-4 h-4 ${loadingUsers ? 'animate-spin' : ''}`} />
                  </button>
                </div>
              </div>

              {/* Users Table */}
              <div className="bg-white rounded-xl border border-[#E5E8E0] shadow-2xs overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-[#FAF8F1] border-b border-[#E5E8E0] font-bold text-[#202820]">
                      <tr>
                        <th className="p-3.5">User Profile</th>
                        <th className="p-3.5">Email Address</th>
                        <th className="p-3.5">Mobile Contact</th>
                        <th className="p-3.5">Current Role</th>
                        <th className="p-3.5">Registered On</th>
                        <th className="p-3.5 text-right">Access Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#E5E8E0]">
                      {loadingUsers ? (
                        <tr>
                          <td colSpan={6} className="p-8 text-center text-xs text-[#687168]">
                            <RefreshCw className="w-5 h-5 animate-spin mx-auto mb-2 text-[#214E34]" />
                            Searching and loading user accounts...
                          </td>
                        </tr>
                      ) : users.length === 0 ? (
                        <tr>
                          <td colSpan={6} className="p-10 text-center text-xs text-[#687168]">
                            <Users className="w-8 h-8 text-[#CCC] mx-auto mb-2" />
                            <p className="font-bold text-[#202820] text-sm">No matching customers found</p>
                            <p className="text-[#888] mt-1 max-w-sm mx-auto">
                              {userSearchQuery
                                ? `No accounts match "${userSearchQuery}". Check for spelling or try searching by email.`
                                : 'No registered users available in this role category.'}
                            </p>
                            {userSearchQuery && (
                              <button
                                onClick={() => {
                                  setUserSearchQuery('');
                                  setUserRoleFilter('all');
                                  fetchUsers('', 'all');
                                }}
                                className="mt-3 px-3.5 py-1.5 bg-[#FAF8F1] border border-[#E5E8E0] rounded-lg text-xs font-semibold text-[#214E34] hover:bg-[#EDE8E0]"
                              >
                                Clear Search Filter
                              </button>
                            )}
                          </td>
                        </tr>
                      ) : (
                        users.map(u => {
                          const isCurrentUser = user && (user.id === u._id || (user as any)._id === u._id);
                          const isAdminRole = u.role === 'admin';
                          const isProcessing = promotingUserId === u._id;

                          return (
                            <tr key={u._id} className="hover:bg-[#FAF8F1]/60 transition-colors">
                              {/* Name & Avatar */}
                              <td className="p-3.5">
                                <div className="flex items-center gap-3">
                                  <div
                                    className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-xs uppercase border shadow-2xs shrink-0 ${
                                      isAdminRole
                                        ? 'bg-[#214E34] text-white border-amber-400'
                                        : 'bg-[#FAF8F1] text-[#214E34] border-[#E5E8E0]'
                                    }`}
                                  >
                                    {u.name ? u.name[0] : u.email[0]}
                                  </div>
                                  <div>
                                    <div className="flex items-center gap-1.5">
                                      <span className="font-bold text-[#202820]">{u.name || 'Customer'}</span>
                                      {isCurrentUser && (
                                        <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-1.5 py-0.2 rounded border border-emerald-300">
                                          You
                                        </span>
                                      )}
                                    </div>
                                    <span className="text-[11px] text-[#888] block font-mono">
                                      ID: {u._id.slice(-6)}
                                    </span>
                                  </div>
                                </div>
                              </td>

                              {/* Email */}
                              <td className="p-3.5">
                                <a
                                  href={`mailto:${u.email}`}
                                  className="text-[#214E34] font-medium hover:underline font-mono"
                                >
                                  {u.email}
                                </a>
                              </td>

                              {/* Phone */}
                              <td className="p-3.5 font-mono text-[#687168]">
                                {u.phone ? (
                                  <a href={`tel:${u.phone}`} className="hover:text-[#202820]">
                                    +91 {u.phone}
                                  </a>
                                ) : (
                                  <span className="text-[#AAA] italic">Not provided</span>
                                )}
                              </td>

                              {/* Role */}
                              <td className="p-3.5">
                                {isAdminRole ? (
                                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold bg-[#C59B27]/15 text-[#8F6B12] border border-[#C59B27]/30">
                                    <ShieldCheck className="w-3.5 h-3.5 text-[#C59B27]" /> Administrator
                                  </span>
                                ) : (
                                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold bg-slate-100 text-slate-700 border border-slate-200">
                                    <User className="w-3.5 h-3.5 text-slate-500" /> Customer
                                  </span>
                                )}
                              </td>

                              {/* Registered Date */}
                              <td className="p-3.5 text-[#687168] whitespace-nowrap">
                                {u.createdAt ? new Date(u.createdAt).toLocaleDateString('en-IN', {
                                  day: 'numeric',
                                  month: 'short',
                                  year: 'numeric'
                                }) : '—'}
                              </td>

                              {/* Action Buttons */}
                              <td className="p-3.5 text-right whitespace-nowrap">
                                <div className="flex items-center justify-end gap-2">
                                  {isCurrentUser ? (
                                    <span className="text-[11px] font-semibold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                                      Active Session
                                    </span>
                                  ) : (
                                    <>
                                      {isAdminRole ? (
                                        <button
                                          type="button"
                                          onClick={() => handleUpdateRole(u, 'customer')}
                                          disabled={isProcessing || deletingUserId === u._id}
                                          className="px-2.5 py-1.5 bg-white hover:bg-amber-50 border border-amber-300 text-amber-800 text-xs font-semibold rounded-lg transition-colors inline-flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
                                          title="Demote administrator back to customer role"
                                        >
                                          <UserX className="w-3.5 h-3.5" />
                                          <span>{isProcessing ? 'Demoting...' : 'Revoke Admin'}</span>
                                        </button>
                                      ) : (
                                        <button
                                          type="button"
                                          onClick={() => handleUpdateRole(u, 'admin')}
                                          disabled={isProcessing || deletingUserId === u._id}
                                          className="px-2.5 py-1.5 bg-[#214E34] hover:bg-[#163A28] text-white text-xs font-bold rounded-lg shadow-2xs transition-all inline-flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
                                          title="Promote customer to Administrator"
                                        >
                                          <ShieldCheck className="w-3.5 h-3.5 text-[#C59B27]" />
                                          <span>{isProcessing ? 'Promoting...' : 'Promote to Admin'}</span>
                                        </button>
                                      )}

                                      {/* Delete User Button */}
                                      <button
                                        type="button"
                                        onClick={() => handleDeleteUser(u)}
                                        disabled={deletingUserId === u._id || isProcessing}
                                        className="p-1.5 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors border border-transparent hover:border-red-200 cursor-pointer disabled:opacity-50 inline-flex items-center justify-center"
                                        title={`Permanently delete user ${u.name || u.email}`}
                                        aria-label="Delete user"
                                      >
                                        <Trash2 className="w-4 h-4" />
                                      </button>
                                    </>
                                  )}
                                </div>
                              </td>
                            </tr>
                          );
                        })
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}
