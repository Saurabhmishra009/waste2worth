'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { StorageService } from '@/lib/storage';
import { useAuth } from '@/context/AuthContext';
import {
  User,
  Listing,
  Order,
  Inquiry,
  VerificationApplication,
} from '@/types';
import {
  ShieldCheck,
  CheckCircle2,
  XCircle,
  Building2,
  Package,
  Truck,
  Users,
  AlertCircle,
  Star,
  Trash2,
  Lock,
  ArrowRight,
  TrendingUp,
  FileCheck2,
} from 'lucide-react';

export default function AdminDashboardPage() {
  const { user, role, switchRole } = useAuth();

  const [users, setUsers] = useState<User[]>([]);
  const [listings, setListings] = useState<Listing[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [verifications, setVerifications] = useState<VerificationApplication[]>([]);
  const [activeSection, setActiveSection] = useState<'verifications' | 'listings' | 'businesses' | 'orders'>('verifications');

  useEffect(() => {
    loadAllAdminData();
  }, [user]);

  const loadAllAdminData = () => {
    setUsers(StorageService.getUsers());
    setListings(StorageService.getListings());
    setOrders(StorageService.getOrders());
    setInquiries(StorageService.getInquiries());
    setVerifications(StorageService.getVerifications());
  };

  const handleApproveVerification = (id: string) => {
    StorageService.reviewVerification(id, 'verified', 'Approved by Waste2Worth Platform Compliance Officer.');
    loadAllAdminData();
    alert('Verification approved! The user and all their listings now display the Verified Trust Badge.');
  };

  const handleRejectVerification = (id: string) => {
    const reason = prompt('Please specify reason for rejection:', 'GSTIN document mismatch or blurry copy');
    if (reason) {
      StorageService.reviewVerification(id, 'rejected', reason);
      loadAllAdminData();
    }
  };

  const handleToggleFeatured = (id: string, current: boolean) => {
    StorageService.updateListing(id, { featured: !current });
    loadAllAdminData();
  };

  const handleDeleteListing = (id: string) => {
    if (confirm('Admin action: Permanently remove this listing from the marketplace?')) {
      StorageService.deleteListing(id);
      loadAllAdminData();
    }
  };

  // If user is not Admin, show guarded access screen with one-click demo switcher
  if (role !== 'admin') {
    return (
      <div className="max-w-2xl mx-auto px-4 py-20 text-center space-y-5">
        <div className="w-16 h-16 rounded-3xl bg-amber-100 text-amber-800 flex items-center justify-center mx-auto shadow-md">
          <Lock className="w-8 h-8" />
        </div>
        <h1 className="text-2xl font-black text-gray-900">Admin Portal Restricted</h1>
        <p className="text-xs text-gray-500 max-w-md mx-auto leading-relaxed">
          This portal is reserved for platform administrators to review business KYC applications, moderate listings, and oversee transactions.
        </p>
        <div className="pt-2">
          <button
            onClick={() => switchRole('admin')}
            className="px-6 py-3 bg-[#14532D] text-white text-xs font-bold rounded-xl shadow hover:bg-forest-800 transition-colors"
          >
            Switch to Admin Role (Demo Access)
          </button>
        </div>
      </div>
    );
  }

  const pendingVerifications = verifications.filter((v) => v.status === 'pending');
  const completedOrders = orders.filter((o) => o.status === 'Completed' || o.status === 'Delivered');

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 sm:p-8 rounded-3xl border border-gray-200 shadow-sm">
        <div>
          <span className="text-xs uppercase font-bold text-amber-600 tracking-wider flex items-center gap-1">
            <ShieldCheck className="w-4 h-4 text-amber-600" /> Platform Governance Console
          </span>
          <h1 className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight mt-0.5">
            Admin Verification & Oversight Panel
          </h1>
          <p className="text-xs text-gray-500">
            Audit business credentials, approve GSTIN verification requests, and monitor marketplace activities.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="px-3 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-900">
            Admin Session Active
          </span>
        </div>
      </div>

      {/* 6 Core Admin Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 text-xs">
        <div className="p-4 rounded-2xl bg-white border border-gray-200 shadow-sm space-y-1">
          <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">Total Businesses</span>
          <p className="text-2xl font-black text-gray-900">{users.length + 42}</p>
          <p className="text-[10px] text-gray-500">Registered units</p>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-gray-200 shadow-sm space-y-1">
          <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">Total Listings</span>
          <p className="text-2xl font-black text-[#14532D]">{listings.length}</p>
          <p className="text-[10px] text-gray-500">Published lots</p>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-gray-200 shadow-sm space-y-1">
          <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">Total Orders</span>
          <p className="text-2xl font-black text-gray-900">{orders.length}</p>
          <p className="text-[10px] text-gray-500">B2B transactions</p>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-gray-200 shadow-sm space-y-1">
          <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">Pending Inquiries</span>
          <p className="text-2xl font-black text-blue-600">
            {inquiries.filter((i) => i.status === 'pending').length}
          </p>
          <p className="text-[10px] text-gray-500">Active negotiations</p>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-gray-200 shadow-sm space-y-1">
          <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">Completed Orders</span>
          <p className="text-2xl font-black text-emerald">{completedOrders.length}</p>
          <p className="text-[10px] text-gray-500">Full cycle closed</p>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-gray-200 shadow-sm space-y-1">
          <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">Pending Verification</span>
          <p className="text-2xl font-black text-amber-600">{pendingVerifications.length}</p>
          <p className="text-[10px] text-gray-500">Awaiting audit</p>
        </div>
      </div>

      {/* Navigation Sections Tabs */}
      <div className="flex items-center gap-2 border-b border-gray-200 pb-2">
        <button
          onClick={() => setActiveSection('verifications')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            activeSection === 'verifications'
              ? 'bg-[#14532D] text-white shadow-sm'
              : 'bg-white text-gray-600 hover:bg-gray-100'
          }`}
        >
          KYC Verifications ({verifications.length})
        </button>
        <button
          onClick={() => setActiveSection('listings')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            activeSection === 'listings'
              ? 'bg-[#14532D] text-white shadow-sm'
              : 'bg-white text-gray-600 hover:bg-gray-100'
          }`}
        >
          Listings Moderation ({listings.length})
        </button>
        <button
          onClick={() => setActiveSection('orders')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            activeSection === 'orders'
              ? 'bg-[#14532D] text-white shadow-sm'
              : 'bg-white text-gray-600 hover:bg-gray-100'
          }`}
        >
          All Orders ({orders.length})
        </button>
      </div>

      {/* SECTION 1: VERIFICATIONS MANAGEMENT */}
      {activeSection === 'verifications' && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-200 shadow-sm space-y-6">
          <div className="flex items-center justify-between border-b border-gray-100 pb-4">
            <div>
              <h3 className="font-bold text-base text-gray-900">
                Business Verification & KYC Applications
              </h3>
              <p className="text-xs text-gray-500 mt-0.5">
                Review simulated statutory documentation and approve or reject verification trust badges
              </p>
            </div>
            {pendingVerifications.length > 0 && (
              <span className="text-xs font-bold text-amber-800 bg-amber-100 px-3 py-1 rounded-full">
                {pendingVerifications.length} Pending Approval
              </span>
            )}
          </div>

          <div className="space-y-4">
            {verifications.map((ver) => (
              <div
                key={ver.id}
                className="p-5 rounded-2xl bg-[#F8FAF7] border border-gray-200 space-y-3 text-xs"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-gray-200 pb-2">
                  <div className="flex items-center gap-2">
                    <Building2 className="w-4 h-4 text-[#14532D]" />
                    <span className="font-bold text-gray-900 text-sm">{ver.businessName}</span>
                    <span className="font-mono text-gray-500">({ver.gstin})</span>
                  </div>
                  <div>
                    <span
                      className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                        ver.status === 'verified'
                          ? 'bg-emerald-100 text-emerald-900'
                          : ver.status === 'rejected'
                          ? 'bg-red-100 text-red-900'
                          : 'bg-amber-100 text-amber-900'
                      }`}
                    >
                      {ver.status}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-gray-600">
                  <p>
                    <strong>Contact Person:</strong> {ver.contactPerson} ({ver.phone})
                  </p>
                  <p>
                    <strong>Address:</strong> {ver.businessAddress}
                  </p>
                </div>

                {/* Documents list */}
                <div className="flex flex-wrap gap-2 pt-1">
                  {ver.documents.map((doc, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-1 rounded-lg bg-white border border-gray-200 text-[11px] font-medium flex items-center gap-1.5 text-gray-700"
                    >
                      <FileCheck2 className="w-3.5 h-3.5 text-emerald" /> {doc.name} ({doc.size})
                    </span>
                  ))}
                </div>

                {ver.reviewerNotes && (
                  <p className="text-[11px] text-gray-500 italic bg-white p-2 rounded-lg border border-gray-100">
                    Audit Note: {ver.reviewerNotes}
                  </p>
                )}

                {/* Action buttons */}
                {ver.status === 'pending' && (
                  <div className="pt-2 flex items-center gap-2">
                    <button
                      onClick={() => handleApproveVerification(ver.id)}
                      className="px-4 py-2 bg-[#14532D] hover:bg-forest-800 text-white font-bold rounded-xl flex items-center gap-1.5 shadow-sm"
                    >
                      <CheckCircle2 className="w-4 h-4 text-emerald" /> Approve & Issue Trust Badge
                    </button>
                    <button
                      onClick={() => handleRejectVerification(ver.id)}
                      className="px-4 py-2 bg-red-100 hover:bg-red-200 text-red-800 font-bold rounded-xl flex items-center gap-1.5"
                    >
                      <XCircle className="w-4 h-4 text-red-600" /> Reject Application
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SECTION 2: LISTINGS MODERATION */}
      {activeSection === 'listings' && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-200 shadow-sm space-y-6">
          <div className="border-b border-gray-100 pb-4">
            <h3 className="font-bold text-base text-gray-900">Marketplace Listings Moderation</h3>
            <p className="text-xs text-gray-500 mt-0.5">Feature premium lots or remove non-compliant listings</p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#F8FAF7] text-gray-500 font-bold uppercase tracking-wider">
                <tr>
                  <th className="p-3 rounded-l-xl">Material</th>
                  <th className="p-3">Category</th>
                  <th className="p-3">Supplier</th>
                  <th className="p-3">Rate</th>
                  <th className="p-3">Stock</th>
                  <th className="p-3">Featured</th>
                  <th className="p-3 rounded-r-xl text-right">Moderation Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {listings.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-50">
                    <td className="p-3 font-medium text-gray-900 max-w-xs truncate">{item.title}</td>
                    <td className="p-3 text-gray-700">{item.category}</td>
                    <td className="p-3 text-gray-600">{item.sellerBusiness}</td>
                    <td className="p-3 font-bold text-[#14532D]">₹{item.pricePerUnit}/{item.unit}</td>
                    <td className="p-3 text-gray-600">{item.quantity} {item.unit}</td>
                    <td className="p-3">
                      <button
                        onClick={() => handleToggleFeatured(item.id, !!item.featured)}
                        className={`p-1.5 rounded-lg transition-colors ${
                          item.featured ? 'text-amber-500 bg-amber-50' : 'text-gray-400 hover:text-amber-500'
                        }`}
                        title="Toggle Featured"
                      >
                        <Star className={`w-4 h-4 ${item.featured ? 'fill-amber-400' : ''}`} />
                      </button>
                    </td>
                    <td className="p-3 text-right">
                      <button
                        onClick={() => handleDeleteListing(item.id)}
                        className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        title="Remove listing"
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
      )}

      {/* SECTION 3: ORDERS MONITORING */}
      {activeSection === 'orders' && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-200 shadow-sm space-y-6">
          <div className="border-b border-gray-100 pb-4">
            <h3 className="font-bold text-base text-gray-900">Platform-Wide Transaction Oversight</h3>
            <p className="text-xs text-gray-500 mt-0.5">Real-time status of all B2B secondary material contracts</p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#F8FAF7] text-gray-500 font-bold uppercase tracking-wider">
                <tr>
                  <th className="p-3 rounded-l-xl">Order ID</th>
                  <th className="p-3">Material Lot</th>
                  <th className="p-3">Buyer Company</th>
                  <th className="p-3">Seller Company</th>
                  <th className="p-3">Contract Value</th>
                  <th className="p-3">Status</th>
                  <th className="p-3 rounded-r-xl text-right">Created</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {orders.map((ord) => (
                  <tr key={ord.id} className="hover:bg-gray-50">
                    <td className="p-3 font-mono font-bold text-gray-900">#{ord.id}</td>
                    <td className="p-3 font-medium text-gray-900 max-w-xs truncate">{ord.listingTitle}</td>
                    <td className="p-3 text-gray-700">{ord.buyerBusiness}</td>
                    <td className="p-3 text-gray-700">{ord.sellerBusiness}</td>
                    <td className="p-3 font-bold text-[#14532D]">₹{ord.totalAmount.toLocaleString('en-IN')}</td>
                    <td className="p-3">
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-forest-100 text-[#14532D]">
                        {ord.status}
                      </span>
                    </td>
                    <td className="p-3 text-right text-gray-400">
                      {new Date(ord.createdAt).toLocaleDateString('en-IN')}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
