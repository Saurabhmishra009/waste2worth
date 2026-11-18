'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { StorageService } from '@/lib/storage';
import { useAuth } from '@/context/AuthContext';
import { Listing, Order, Inquiry, ListingCategory, MaterialCondition } from '@/types';
import { findSmartMatches, BuyerRequirement } from '@/lib/ai-matcher';
import ListingCard from '@/components/ListingCard';
import {
  Layers,
  Sparkles,
  Search,
  Truck,
  Clock,
  Heart,
  Scale,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Building2,
} from 'lucide-react';

export default function BuyerDashboardPage() {
  const { user } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [allListings, setAllListings] = useState<Listing[]>([]);
  const [wishlistCount, setWishlistCount] = useState<number>(0);

  // Smart Matcher State
  const [buyerReq, setBuyerReq] = useState<BuyerRequirement>({
    category: 'Plastic',
    targetQuantity: 3000,
    unit: 'kg',
    maxBudgetPerUnit: 40,
    preferredCity: 'Delhi',
    preferredCondition: 'Granules / Shredded',
  });

  const categories: ListingCategory[] = [
    'Plastic',
    'Metal',
    'Cardboard',
    'Paper',
    'Wood',
    'Textile',
    'Electronic Waste',
    'Construction Materials',
    'Industrial By-products',
  ];

  const cities = ['Delhi', 'Noida', 'Ghaziabad', 'Faridabad', 'Kanpur', 'Lucknow', 'Agra', 'Mathura'];

  useEffect(() => {
    if (!user) return;
    const all = StorageService.getListings();
    setAllListings(all);

    const userOrders = StorageService.getOrders().filter((o) => o.buyerId === user.id);
    setOrders(userOrders);

    const userInquiries = StorageService.getInquiries().filter((i) => i.buyerId === user.id);
    setInquiries(userInquiries);

    const saved = StorageService.getWishlist(user.id);
    setWishlistCount(saved.length);
  }, [user]);

  const recommendedMatches = findSmartMatches(buyerReq, allListings).slice(0, 3);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Top Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 sm:p-8 rounded-3xl border border-gray-200 shadow-sm">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-forest-100 text-[#14532D]">
              Procurement & Buyer Center
            </span>
            <span className="text-xs text-gray-400">•</span>
            <span className="text-xs text-emerald font-semibold flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5" /> Direct Factory Lots
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight">
            Raw Material Procurement Hub
          </h1>
          <p className="text-xs text-gray-500">
            Discover verified industrial secondary scrap feedstocks, run algorithmic matching, and track dispatches.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Link
            href="/marketplace"
            className="inline-flex items-center gap-2 px-5 py-3 bg-[#14532D] hover:bg-forest-800 text-white font-bold text-xs rounded-xl shadow transition-all"
          >
            <Search className="w-4 h-4 text-emerald" /> Browse Full Marketplace
          </Link>
          <Link
            href="/dashboard/wishlist"
            className="inline-flex items-center gap-2 px-4 py-3 bg-red-50 hover:bg-red-100 text-red-700 font-bold text-xs rounded-xl transition-colors border border-red-100"
          >
            <Heart className="w-4 h-4 fill-red-600 text-red-600" /> Wishlist ({wishlistCount})
          </Link>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl bg-white border border-gray-200 shadow-sm space-y-1">
          <div className="flex items-center justify-between text-gray-500 mb-1">
            <span className="text-[11px] font-bold uppercase tracking-wider">Active Inquiries</span>
            <Clock className="w-4 h-4 text-amber-500" />
          </div>
          <p className="text-2xl font-black text-amber-600">
            {inquiries.filter((i) => i.status === 'pending' || i.status === 'countered').length}
          </p>
          <p className="text-[10px] text-gray-400">Awaiting supplier confirmation</p>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-gray-200 shadow-sm space-y-1">
          <div className="flex items-center justify-between text-gray-500 mb-1">
            <span className="text-[11px] font-bold uppercase tracking-wider">Orders in Transit</span>
            <Truck className="w-4 h-4 text-blue-600" />
          </div>
          <p className="text-2xl font-black text-blue-700">
            {orders.filter((o) => o.status === 'In Transit' || o.status === 'Pickup Scheduled').length}
          </p>
          <p className="text-[10px] text-gray-400">Scheduled / On the road</p>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-gray-200 shadow-sm space-y-1">
          <div className="flex items-center justify-between text-gray-500 mb-1">
            <span className="text-[11px] font-bold uppercase tracking-wider">Completed Batches</span>
            <CheckCircle2 className="w-4 h-4 text-emerald" />
          </div>
          <p className="text-2xl font-black text-[#14532D]">
            {orders.filter((o) => o.status === 'Completed' || o.status === 'Delivered').length}
          </p>
          <p className="text-[10px] text-gray-400">Inspected & delivered</p>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-gray-200 shadow-sm space-y-1">
          <div className="flex items-center justify-between text-gray-500 mb-1">
            <span className="text-[11px] font-bold uppercase tracking-wider">Procured Value</span>
            <Scale className="w-4 h-4 text-emerald" />
          </div>
          <p className="text-2xl font-black text-gray-900">
            ₹{(orders.reduce((sum, o) => sum + o.totalAmount, 0) / 1000).toFixed(1)}k
          </p>
          <p className="text-[10px] text-gray-400">Total volume committed</p>
        </div>
      </div>

      {/* AI SMART BUYER MATCHING SECTION */}
      <div className="bg-gradient-to-br from-[#14532D] to-forest-900 text-white p-6 sm:p-8 rounded-3xl shadow-xl space-y-6 border border-emerald/30">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-forest-700 pb-4">
          <div>
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-emerald" />
              <h2 className="text-xl font-bold">AI Smart Matching Algorithm</h2>
            </div>
            <p className="text-xs text-forest-200 mt-1">
              Set your target procurement requirements to compute real-time compatibility scores across all factory listings.
            </p>
          </div>
          <span className="text-xs font-bold text-forest-950 bg-emerald px-3 py-1 rounded-full self-start">
            Deterministic Engine
          </span>
        </div>

        {/* Input parameters */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 text-xs">
          <div>
            <label className="block text-[11px] font-bold text-forest-200 uppercase mb-1">
              Material Category
            </label>
            <select
              value={buyerReq.category}
              onChange={(e) => setBuyerReq({ ...buyerReq, category: e.target.value as ListingCategory })}
              className="w-full bg-forest-800 border border-forest-600 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-emerald"
            >
              {categories.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-[11px] font-bold text-forest-200 uppercase mb-1">
              Required Volume
            </label>
            <input
              type="number"
              value={buyerReq.targetQuantity}
              onChange={(e) => setBuyerReq({ ...buyerReq, targetQuantity: Number(e.target.value) })}
              className="w-full bg-forest-800 border border-forest-600 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-emerald"
            />
          </div>

          <div>
            <label className="block text-[11px] font-bold text-forest-200 uppercase mb-1">
              Unit
            </label>
            <select
              value={buyerReq.unit}
              onChange={(e) => setBuyerReq({ ...buyerReq, unit: e.target.value })}
              className="w-full bg-forest-800 border border-forest-600 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-emerald"
            >
              <option value="kg">kg (Kilograms)</option>
              <option value="t">t (Tonnes)</option>
              <option value="L">L (Litres)</option>
              <option value="pcs">pcs (Pieces)</option>
            </select>
          </div>

          <div>
            <label className="block text-[11px] font-bold text-forest-200 uppercase mb-1">
              Max Target Rate (₹)
            </label>
            <input
              type="number"
              value={buyerReq.maxBudgetPerUnit}
              onChange={(e) => setBuyerReq({ ...buyerReq, maxBudgetPerUnit: Number(e.target.value) })}
              className="w-full bg-forest-800 border border-forest-600 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-emerald"
            />
          </div>

          <div>
            <label className="block text-[11px] font-bold text-forest-200 uppercase mb-1">
              Preferred Hub
            </label>
            <select
              value={buyerReq.preferredCity || ''}
              onChange={(e) => setBuyerReq({ ...buyerReq, preferredCity: e.target.value })}
              className="w-full bg-forest-800 border border-forest-600 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-emerald"
            >
              {cities.map((city) => (
                <option key={city} value={city}>
                  {city}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Recommended Results Cards */}
        <div className="pt-2 space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-xs uppercase font-bold text-emerald tracking-wider">
              Top Algorithmic Matches For Your Specifications
            </h3>
            <span className="text-xs text-forest-200">Sorted by compatibility</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {recommendedMatches.map((res) => (
              <ListingCard
                key={res.listing.id}
                listing={res.listing}
                showMatchScore={res.score}
                matchReasons={res.matchingReasons}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Active Inquiries & Offers Tracker */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-200 shadow-sm space-y-6">
        <div className="flex items-center justify-between border-b border-gray-100 pb-4">
          <div>
            <h3 className="text-base font-bold text-gray-900">My Submitted Purchase Requests</h3>
            <p className="text-xs text-gray-500 mt-0.5">Track seller counteroffers and acceptances</p>
          </div>
          <Link
            href="/dashboard/inquiries"
            className="text-xs font-bold text-[#14532D] hover:text-emerald flex items-center gap-1"
          >
            Manage Inquiries <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {inquiries.length === 0 ? (
          <div className="p-8 text-center text-xs text-gray-500">
            No purchase offers submitted yet. Browse the marketplace to submit your first offer.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#F8FAF7] text-gray-500 font-bold uppercase tracking-wider">
                <tr>
                  <th className="p-3 rounded-l-xl">Material</th>
                  <th className="p-3">Seller</th>
                  <th className="p-3">Requested Vol</th>
                  <th className="p-3">My Offer</th>
                  <th className="p-3">Counteroffer</th>
                  <th className="p-3">Status</th>
                  <th className="p-3 rounded-r-xl text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {inquiries.map((inq) => (
                  <tr key={inq.id} className="hover:bg-gray-50">
                    <td className="p-3 font-medium text-gray-900">{inq.listingTitle}</td>
                    <td className="p-3 text-gray-700">{inq.sellerName}</td>
                    <td className="p-3 text-gray-600">
                      {inq.requestedQuantity.toLocaleString('en-IN')} {inq.unit}
                    </td>
                    <td className="p-3 font-bold text-[#14532D]">
                      ₹{inq.offeredPrice.toLocaleString('en-IN')}/{inq.unit}
                    </td>
                    <td className="p-3 font-bold text-amber-600">
                      {inq.counterPrice ? `₹${inq.counterPrice}/${inq.unit}` : '—'}
                    </td>
                    <td className="p-3">
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-forest-100 text-[#14532D] capitalize">
                        {inq.status}
                      </span>
                    </td>
                    <td className="p-3 text-right">
                      <Link
                        href="/dashboard/inquiries"
                        className="text-xs font-bold text-[#14532D] hover:underline"
                      >
                        Review →
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
