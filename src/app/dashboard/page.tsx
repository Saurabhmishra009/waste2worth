'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { StorageService } from '@/lib/storage';
import { Listing, Order, Inquiry } from '@/types';
import {
  LayoutDashboard,
  Package,
  Layers,
  Building2,
  PlusCircle,
  MessageSquare,
  ShieldCheck,
  TrendingUp,
  Clock,
  ArrowRight,
  Sparkles,
  Truck,
  Heart,
} from 'lucide-react';

export default function DashboardOverviewPage() {
  const { user, role } = useAuth();
  const [listings, setListings] = useState<Listing[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);

  useEffect(() => {
    if (!user) return;
    const allListings = StorageService.getListings();
    const allOrders = StorageService.getOrders();
    const allInquiries = StorageService.getInquiries();

    // Filter relevant to current user
    if (role === 'seller') {
      setListings(allListings.filter((l) => l.sellerId === user.id));
      setOrders(allOrders.filter((o) => o.sellerId === user.id));
      setInquiries(allInquiries.filter((i) => i.sellerId === user.id));
    } else if (role === 'buyer') {
      setListings(allListings);
      setOrders(allOrders.filter((o) => o.buyerId === user.id));
      setInquiries(allInquiries.filter((i) => i.buyerId === user.id));
    } else {
      // both or admin
      setListings(allListings);
      setOrders(allOrders);
      setInquiries(allInquiries);
    }
  }, [user, role]);

  const activeOrdersCount = orders.filter((o) => o.status !== 'Completed' && o.status !== 'Cancelled').length;
  const pendingInquiriesCount = inquiries.filter((i) => i.status === 'pending' || i.status === 'countered').length;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Top Welcome Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 sm:p-8 rounded-3xl border border-gray-200 shadow-sm">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="capitalize text-xs font-bold px-2.5 py-0.5 rounded-full bg-forest-100 text-[#14532D]">
              {role} Account
            </span>
            {user?.verificationStatus === 'verified' && (
              <span className="inline-flex items-center gap-1 text-emerald text-xs font-bold">
                <ShieldCheck className="w-3.5 h-3.5" /> KYC Audited
              </span>
            )}
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight">
            Welcome, {user?.name}
          </h1>
          <p className="text-xs text-gray-500 flex items-center gap-1.5">
            <Building2 className="w-3.5 h-3.5 text-gray-400" />
            <span>{user?.businessName}</span>
            <span>•</span>
            <span>{user?.location}, India</span>
          </p>
        </div>

        {/* Quick Action Buttons */}
        <div className="flex items-center gap-2 flex-wrap">
          <Link
            href="/dashboard/add-listing"
            className="inline-flex items-center gap-1.5 px-4 py-2.5 bg-[#14532D] hover:bg-forest-800 text-white font-bold text-xs rounded-xl shadow transition-all"
          >
            <PlusCircle className="w-4 h-4 text-emerald" /> Post Waste Lot
          </Link>
          <Link
            href="/marketplace"
            className="inline-flex items-center gap-1.5 px-4 py-2.5 bg-forest-50 hover:bg-forest-100 text-[#14532D] font-bold text-xs rounded-xl border border-forest-200 transition-all"
          >
            <Sparkles className="w-4 h-4 text-emerald" /> Find Secondary Materials
          </Link>
        </div>
      </div>

      {/* KPI Stats Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="p-6 rounded-2xl bg-white border border-gray-200 shadow-sm space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs text-gray-500 font-semibold uppercase tracking-wider">
              {role === 'seller' ? 'My Active Lots' : 'Available Lots'}
            </span>
            <Package className="w-4 h-4 text-emerald" />
          </div>
          <p className="text-3xl font-black text-[#14532D]">{listings.length}</p>
          <p className="text-[11px] text-gray-500">Live on Waste2Worth marketplace</p>
        </div>

        <div className="p-6 rounded-2xl bg-white border border-gray-200 shadow-sm space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs text-gray-500 font-semibold uppercase tracking-wider">
              Active Orders
            </span>
            <Truck className="w-4 h-4 text-emerald" />
          </div>
          <p className="text-3xl font-black text-[#14532D]">{activeOrdersCount}</p>
          <p className="text-[11px] text-gray-500">In pickup scheduling or transit</p>
        </div>

        <div className="p-6 rounded-2xl bg-white border border-gray-200 shadow-sm space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs text-gray-500 font-semibold uppercase tracking-wider">
              Pending Offers
            </span>
            <Clock className="w-4 h-4 text-emerald" />
          </div>
          <p className="text-3xl font-black text-[#14532D]">{pendingInquiriesCount}</p>
          <p className="text-[11px] text-gray-500">Awaiting response or counteroffer</p>
        </div>

        <div className="p-6 rounded-2xl bg-white border border-gray-200 shadow-sm space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs text-gray-500 font-semibold uppercase tracking-wider">
              Order Volume
            </span>
            <TrendingUp className="w-4 h-4 text-emerald" />
          </div>
          <p className="text-3xl font-black text-[#14532D]">
            ₹{(orders.reduce((acc, o) => acc + o.totalAmount, 0) / 1000).toFixed(1)}k
          </p>
          <p className="text-[11px] text-gray-500">Total contractual value transacted</p>
        </div>
      </div>

      {/* Navigation Hub Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Link
          href="/dashboard/seller"
          className="group p-6 bg-white rounded-2xl border border-gray-200 hover:border-emerald shadow-sm hover:shadow-md transition-all space-y-3"
        >
          <div className="w-10 h-10 rounded-xl bg-forest-50 text-[#14532D] group-hover:bg-[#14532D] group-hover:text-white flex items-center justify-center transition-colors">
            <Building2 className="w-5 h-5" />
          </div>
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-gray-900 text-sm">Seller Dashboard & Sales Analytics</h3>
            <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-emerald group-hover:translate-x-1 transition-all" />
          </div>
          <p className="text-xs text-gray-500 leading-relaxed">
            Review monthly scrap sales, performance charts, and material category breakdowns.
          </p>
        </Link>

        <Link
          href="/dashboard/buyer"
          className="group p-6 bg-white rounded-2xl border border-gray-200 hover:border-emerald shadow-sm hover:shadow-md transition-all space-y-3"
        >
          <div className="w-10 h-10 rounded-xl bg-forest-50 text-[#14532D] group-hover:bg-[#14532D] group-hover:text-white flex items-center justify-center transition-colors">
            <Layers className="w-5 h-5" />
          </div>
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-gray-900 text-sm">Buyer Center & Smart AI Matcher</h3>
            <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-emerald group-hover:translate-x-1 transition-all" />
          </div>
          <p className="text-xs text-gray-500 leading-relaxed">
            Run custom matchmaking requests to find verified lots meeting your exact target specs and budget.
          </p>
        </Link>

        <Link
          href="/dashboard/orders"
          className="group p-6 bg-white rounded-2xl border border-gray-200 hover:border-emerald shadow-sm hover:shadow-md transition-all space-y-3"
        >
          <div className="w-10 h-10 rounded-xl bg-forest-50 text-[#14532D] group-hover:bg-[#14532D] group-hover:text-white flex items-center justify-center transition-colors">
            <Truck className="w-5 h-5" />
          </div>
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-gray-900 text-sm">Orders & Dispatch Logistics</h3>
            <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-emerald group-hover:translate-x-1 transition-all" />
          </div>
          <p className="text-xs text-gray-500 leading-relaxed">
            Track active dispatches with real-time timelines from pickup schedule to weighbridge delivery.
          </p>
        </Link>
      </div>

      {/* Recent Orders & Activity Table */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-200 shadow-sm space-y-6">
        <div className="flex items-center justify-between border-b border-gray-100 pb-4">
          <div>
            <h3 className="text-base font-bold text-gray-900">Recent Purchase Orders</h3>
            <p className="text-xs text-gray-500 mt-0.5">Live status and milestone tracking</p>
          </div>
          <Link
            href="/dashboard/orders"
            className="text-xs font-bold text-[#14532D] hover:text-emerald flex items-center gap-1"
          >
            View all orders <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {orders.length === 0 ? (
          <div className="p-8 text-center text-xs text-gray-500">
            No orders initiated yet. Browse the marketplace or submit an inquiry to create your first order.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#F8FAF7] text-gray-500 font-bold uppercase tracking-wider">
                <tr>
                  <th className="p-3 rounded-l-xl">Order ID</th>
                  <th className="p-3">Material Lot</th>
                  <th className="p-3">Quantity</th>
                  <th className="p-3">Total Amount</th>
                  <th className="p-3">Status</th>
                  <th className="p-3 rounded-r-xl text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {orders.slice(0, 5).map((order) => (
                  <tr key={order.id} className="hover:bg-gray-50">
                    <td className="p-3 font-mono font-bold text-gray-900">#{order.id}</td>
                    <td className="p-3 font-medium text-gray-900">{order.listingTitle}</td>
                    <td className="p-3 text-gray-600">
                      {order.quantity.toLocaleString('en-IN')} {order.unit}
                    </td>
                    <td className="p-3 font-bold text-[#14532D]">
                      ₹{order.totalAmount.toLocaleString('en-IN')}
                    </td>
                    <td className="p-3">
                      <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-forest-100 text-[#14532D]">
                        {order.status}
                      </span>
                    </td>
                    <td className="p-3 text-right">
                      <Link
                        href="/dashboard/orders"
                        className="text-xs font-bold text-[#14532D] hover:underline"
                      >
                        Track Order →
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
