'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { StorageService } from '@/lib/storage';
import { useAuth } from '@/context/AuthContext';
import { Listing, Order, Inquiry } from '@/types';
import {
  Package,
  Scale,
  TrendingUp,
  Clock,
  CheckCircle2,
  PlusCircle,
  BarChart3,
  Building2,
  ArrowRight,
  ShieldCheck,
  Eye,
} from 'lucide-react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  CartesianGrid,
} from 'recharts';

export default function SellerDashboardPage() {
  const { user } = useAuth();
  const [listings, setListings] = useState<Listing[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);

  useEffect(() => {
    if (!user) return;
    const allListings = StorageService.getListings();
    const allOrders = StorageService.getOrders();
    const allInquiries = StorageService.getInquiries();

    // Listings owned by seller or all for demo if fewer
    const sellerListings = allListings.filter((l) => l.sellerId === user.id);
    setListings(sellerListings.length > 0 ? sellerListings : allListings.slice(0, 8));

    const sellerOrders = allOrders.filter((o) => o.sellerId === user.id);
    setOrders(sellerOrders.length > 0 ? sellerOrders : allOrders);

    const sellerInquiries = allInquiries.filter((i) => i.sellerId === user.id);
    setInquiries(sellerInquiries.length > 0 ? sellerInquiries : allInquiries);
  }, [user]);

  const activeListings = listings.filter((l) => l.status === 'active');
  const totalQuantityListed = listings.reduce((sum, l) => sum + l.quantity, 0);
  const totalSalesAmount = orders.reduce((sum, o) => sum + o.totalAmount, 0);
  const pendingRequests = inquiries.filter((i) => i.status === 'pending');
  const completedOrders = orders.filter((o) => o.status === 'Completed' || o.status === 'Delivered');

  // Chart Data: Monthly Sales Trend (Fictional realistic data based on actual volume)
  const monthlySalesData = [
    { month: 'Oct', sales: 42000, tons: 8.5 },
    { month: 'Nov', sales: 68000, tons: 14.2 },
    { month: 'Dec', sales: 94000, tons: 19.8 },
    { month: 'Jan', sales: 125000, tons: 24.0 },
    { month: 'Feb', sales: 180000, tons: 32.5 },
    { month: 'Mar', sales: totalSalesAmount || 232500, tons: 38.0 },
  ];

  // Category Distribution
  const categoryCount: Record<string, number> = {};
  listings.forEach((l) => {
    categoryCount[l.category] = (categoryCount[l.category] || 0) + 1;
  });

  const categoryChartData = Object.entries(categoryCount).map(([name, value]) => ({
    name,
    value,
  }));

  const COLORS = ['#14532D', '#10B981', '#3B82F6', '#F59E0B', '#8B5CF6', '#EC4899'];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Top Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 sm:p-8 rounded-3xl border border-gray-200 shadow-sm">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-forest-100 text-[#14532D]">
              Seller Operational Portal
            </span>
            <span className="text-xs text-gray-400">•</span>
            <span className="text-xs text-emerald font-semibold flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5" /> Direct Mill Access
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight">
            Industrial Seller Analytics
          </h1>
          <p className="text-xs text-gray-500">
            Track material inventory turnover, monthly salvage sales, and active buyer purchase requests.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Link
            href="/dashboard/add-listing"
            className="inline-flex items-center gap-2 px-5 py-3 bg-[#14532D] hover:bg-forest-800 text-white font-bold text-xs rounded-xl shadow transition-all"
          >
            <PlusCircle className="w-4 h-4 text-emerald" /> Post New Material Lot
          </Link>
          <Link
            href="/dashboard/listings"
            className="inline-flex items-center gap-2 px-4 py-3 bg-gray-100 hover:bg-gray-200 text-gray-800 font-bold text-xs rounded-xl transition-colors"
          >
            Manage Listings
          </Link>
        </div>
      </div>

      {/* 6 Core KPI Metrics */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
        <div className="p-5 rounded-2xl bg-white border border-gray-200 shadow-sm space-y-1">
          <div className="flex items-center justify-between text-gray-500 mb-1">
            <span className="text-[11px] font-bold uppercase tracking-wider">Active Lots</span>
            <Package className="w-4 h-4 text-[#14532D]" />
          </div>
          <p className="text-2xl font-black text-[#14532D]">{activeListings.length}</p>
          <p className="text-[10px] text-gray-400">Total listed: {listings.length}</p>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-gray-200 shadow-sm space-y-1">
          <div className="flex items-center justify-between text-gray-500 mb-1">
            <span className="text-[11px] font-bold uppercase tracking-wider">Stock Volume</span>
            <Scale className="w-4 h-4 text-emerald" />
          </div>
          <p className="text-2xl font-black text-gray-900">
            {totalQuantityListed.toLocaleString('en-IN')}
          </p>
          <p className="text-[10px] text-gray-400">Combined lot units</p>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-gray-200 shadow-sm space-y-1">
          <div className="flex items-center justify-between text-gray-500 mb-1">
            <span className="text-[11px] font-bold uppercase tracking-wider">Contracted Sales</span>
            <TrendingUp className="w-4 h-4 text-[#14532D]" />
          </div>
          <p className="text-2xl font-black text-[#14532D]">
            ₹{(totalSalesAmount / 1000).toFixed(1)}k
          </p>
          <p className="text-[10px] text-gray-400">Cumulative sales value</p>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-gray-200 shadow-sm space-y-1">
          <div className="flex items-center justify-between text-gray-500 mb-1">
            <span className="text-[11px] font-bold uppercase tracking-wider">Pending Requests</span>
            <Clock className="w-4 h-4 text-amber-500" />
          </div>
          <p className="text-2xl font-black text-amber-600">{pendingRequests.length}</p>
          <p className="text-[10px] text-gray-400">Action required</p>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-gray-200 shadow-sm space-y-1">
          <div className="flex items-center justify-between text-gray-500 mb-1">
            <span className="text-[11px] font-bold uppercase tracking-wider">Completed Orders</span>
            <CheckCircle2 className="w-4 h-4 text-emerald" />
          </div>
          <p className="text-2xl font-black text-emerald-700">{completedOrders.length}</p>
          <p className="text-[10px] text-gray-400">Delivered & verified</p>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Monthly Sales Revenue Chart (7 cols) */}
        <div className="lg:col-span-7 bg-white p-6 rounded-3xl border border-gray-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-gray-100 pb-3">
            <div>
              <h3 className="font-bold text-gray-900 text-sm">Monthly Scrap Sales Realization (INR)</h3>
              <p className="text-[11px] text-gray-500">Gross salvage recovery trend across 6-month cycle</p>
            </div>
            <span className="text-[11px] font-bold text-emerald bg-forest-50 px-2 py-0.5 rounded">
              +24% MoM
            </span>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={monthlySalesData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                <XAxis dataKey="month" stroke="#9ca3af" fontSize={11} />
                <YAxis stroke="#9ca3af" fontSize={11} tickFormatter={(val) => `₹${val / 1000}k`} />
                <Tooltip
                  formatter={(value: any) => [`₹${Number(value).toLocaleString('en-IN')}`, 'Sales']}
                  contentStyle={{ backgroundColor: '#fff', borderRadius: '12px', fontSize: '12px' }}
                />
                <Bar dataKey="sales" fill="#14532D" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Category Distribution Chart (5 cols) */}
        <div className="lg:col-span-5 bg-white p-6 rounded-3xl border border-gray-200 shadow-sm space-y-4">
          <div className="border-b border-gray-100 pb-3">
            <h3 className="font-bold text-gray-900 text-sm">Inventory Category Breakdown</h3>
            <p className="text-[11px] text-gray-500">Active lots distributed by material type</p>
          </div>

          <div className="h-52 w-full flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={categoryChartData}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={75}
                  paddingAngle={4}
                  dataKey="value"
                >
                  {categoryChartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="flex flex-wrap gap-2 justify-center text-[10px]">
            {categoryChartData.map((item, idx) => (
              <span key={item.name} className="flex items-center gap-1 text-gray-600">
                <span
                  className="w-2.5 h-2.5 rounded-full"
                  style={{ backgroundColor: COLORS[idx % COLORS.length] }}
                />
                {item.name} ({item.value})
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Pending Inquiries & Fast Action Table */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-200 shadow-sm space-y-6">
        <div className="flex items-center justify-between border-b border-gray-100 pb-4">
          <div>
            <h3 className="text-base font-bold text-gray-900">Incoming Buyer Offers & Inquiries</h3>
            <p className="text-xs text-gray-500 mt-0.5">Direct requests needing your review, acceptance, or counteroffer</p>
          </div>
          <Link
            href="/dashboard/inquiries"
            className="text-xs font-bold text-[#14532D] hover:text-emerald flex items-center gap-1"
          >
            Go to Inquiries Hub <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {inquiries.length === 0 ? (
          <div className="p-8 text-center text-xs text-gray-500">
            No active buyer inquiries at this moment.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#F8FAF7] text-gray-500 font-bold uppercase tracking-wider">
                <tr>
                  <th className="p-3 rounded-l-xl">Material</th>
                  <th className="p-3">Buyer Company</th>
                  <th className="p-3">Requested Vol</th>
                  <th className="p-3">Offered Rate</th>
                  <th className="p-3">Total Value</th>
                  <th className="p-3">Status</th>
                  <th className="p-3 rounded-r-xl text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {inquiries.slice(0, 5).map((inq) => (
                  <tr key={inq.id} className="hover:bg-gray-50">
                    <td className="p-3 font-medium text-gray-900">{inq.listingTitle}</td>
                    <td className="p-3 text-gray-700">{inq.buyerBusiness}</td>
                    <td className="p-3 text-gray-600">
                      {inq.requestedQuantity.toLocaleString('en-IN')} {inq.unit}
                    </td>
                    <td className="p-3 font-bold text-[#14532D]">
                      ₹{inq.offeredPrice.toLocaleString('en-IN')}/{inq.unit}
                    </td>
                    <td className="p-3 font-bold text-gray-900">
                      ₹{inq.totalAmount.toLocaleString('en-IN')}
                    </td>
                    <td className="p-3">
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-800 capitalize">
                        {inq.status}
                      </span>
                    </td>
                    <td className="p-3 text-right">
                      <Link
                        href="/dashboard/inquiries"
                        className="text-xs font-bold text-[#14532D] hover:underline"
                      >
                        Respond →
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
