'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { StorageService } from '@/lib/storage';
import { useAuth } from '@/context/AuthContext';
import { Order, OrderStatus } from '@/types';
import OrderTimeline from '@/components/OrderTimeline';
import {
  Truck,
  CheckCircle2,
  Calendar,
  Building2,
  MapPin,
  Clock,
  ArrowRight,
  PackageCheck,
  AlertCircle,
  ShieldCheck,
  FileCheck2,
} from 'lucide-react';

export default function OrdersLogisticsPage() {
  const { user, role } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);
  const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null);

  // Logistics update form
  const [newPickupDate, setNewPickupDate] = useState<string>('');
  const [statusNote, setStatusNote] = useState<string>('');

  useEffect(() => {
    loadOrders();
  }, [user]);

  const loadOrders = () => {
    if (!user) return;
    const all = StorageService.getOrders();
    setOrders(all);
    if (all.length > 0 && !selectedOrderId) {
      setSelectedOrderId(all[0].id);
    }
  };

  const selectedOrder = orders.find((o) => o.id === selectedOrderId) || orders[0];

  const handleUpdateStatus = (status: OrderStatus) => {
    if (!selectedOrder) return;
    const note = statusNote.trim() || `Status updated to ${status} via logistics tracker.`;
    StorageService.updateOrderStatus(selectedOrder.id, status, note);
    setStatusNote('');
    loadOrders();
  };

  const handleSchedulePickup = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedOrder || !newPickupDate) return;
    StorageService.updateOrderLogistics(selectedOrder.id, newPickupDate, true);
    setNewPickupDate('');
    loadOrders();
    alert(`Pickup scheduled for ${new Date(newPickupDate).toLocaleDateString('en-IN')}`);
  };

  const handleMarkMaterialReady = () => {
    if (!selectedOrder) return;
    StorageService.updateOrderLogistics(
      selectedOrder.id,
      selectedOrder.pickupDate || new Date().toISOString(),
      true
    );
    StorageService.updateOrderStatus(
      selectedOrder.id,
      'Pickup Scheduled',
      'Seller marked material lot weighed, bundled, and ready for truck dispatch.'
    );
    loadOrders();
  };

  const handleConfirmDelivery = () => {
    if (!selectedOrder) return;
    StorageService.updateOrderStatus(
      selectedOrder.id,
      'Delivered',
      'Buyer verified receipt and confirmed weighbridge certificate at plant facility.'
    );
    loadOrders();
  };

  const handleCompleteOrder = () => {
    if (!selectedOrder) return;
    StorageService.updateOrderStatus(
      selectedOrder.id,
      'Completed',
      'Transaction successfully completed and recorded into sustainability impact metrics.'
    );
    loadOrders();
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 sm:p-8 rounded-3xl border border-gray-200 shadow-sm">
        <div>
          <span className="text-xs uppercase font-bold text-emerald tracking-wider flex items-center gap-1">
            <Truck className="w-3.5 h-3.5 text-emerald" /> Fulfillment & Logistics
          </span>
          <h1 className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight mt-0.5">
            Purchase Orders & Dispatch Logistics
          </h1>
          <p className="text-xs text-gray-500">
            End-to-end 8-stage tracking timeline from transaction acceptance to final weighbridge confirmation.
          </p>
        </div>

        <Link
          href="/marketplace"
          className="inline-flex items-center gap-2 px-5 py-3 bg-[#14532D] hover:bg-forest-800 text-white font-bold text-xs rounded-xl shadow transition-all self-start sm:self-auto"
        >
          Marketplace Feed
        </Link>
      </div>

      {orders.length === 0 ? (
        <div className="bg-white rounded-3xl p-12 text-center border border-gray-200 space-y-3">
          <Truck className="w-12 h-12 text-gray-300 mx-auto" />
          <h3 className="font-bold text-gray-900 text-sm">No Active Purchase Orders</h3>
          <p className="text-xs text-gray-500">
            Accept an offer in the Inquiries Hub or submit an offer on the marketplace to generate orders.
          </p>
          <Link
            href="/dashboard/inquiries"
            className="inline-block px-4 py-2 bg-[#14532D] text-white text-xs font-bold rounded-xl"
          >
            Go to Inquiries Hub
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Orders Roster (4 cols) */}
          <div className="lg:col-span-4 space-y-3">
            <h3 className="font-bold text-gray-900 text-xs uppercase tracking-wider px-1">
              Active Orders List ({orders.length})
            </h3>
            <div className="space-y-3 max-h-[750px] overflow-y-auto pr-1">
              {orders.map((ord) => {
                const isSelected = selectedOrderId === ord.id;
                return (
                  <div
                    key={ord.id}
                    onClick={() => setSelectedOrderId(ord.id)}
                    className={`cursor-pointer p-4 rounded-2xl border transition-all text-xs space-y-2.5 ${
                      isSelected
                        ? 'bg-white border-[#14532D] ring-2 ring-emerald/30 shadow-md'
                        : 'bg-white/70 hover:bg-white border-gray-200'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-mono font-bold text-gray-900">#{ord.id}</span>
                      <span
                        className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                          ord.status === 'Completed'
                            ? 'bg-emerald-100 text-emerald-900'
                            : ord.status === 'In Transit'
                            ? 'bg-blue-100 text-blue-900'
                            : 'bg-forest-100 text-[#14532D]'
                        }`}
                      >
                        {ord.status}
                      </span>
                    </div>

                    <h4 className="font-bold text-gray-900 line-clamp-1">{ord.listingTitle}</h4>

                    <div className="flex items-center justify-between text-gray-500 text-[11px]">
                      <span>
                        {ord.quantity.toLocaleString('en-IN')} {ord.unit}
                      </span>
                      <strong className="text-[#14532D]">
                        ₹{ord.totalAmount.toLocaleString('en-IN')}
                      </strong>
                    </div>

                    <div className="pt-1 border-t border-gray-100 flex items-center justify-between text-[10px] text-gray-400">
                      <span>Buyer: {ord.buyerBusiness.split(' ')[0]}</span>
                      <span>
                        {new Date(ord.createdAt).toLocaleDateString('en-IN', {
                          month: 'short',
                          day: 'numeric',
                        })}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Column: Detailed Order Inspector & Interactive Timeline (8 cols) */}
          {selectedOrder && (
            <div className="lg:col-span-8 space-y-6">
              {/* Order Card Header */}
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-200 shadow-sm space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-gray-100 pb-4">
                  <div>
                    <div className="flex items-center gap-2">
                      <h2 className="text-xl font-black text-gray-900">Order #{selectedOrder.id}</h2>
                      <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-forest-100 text-[#14532D]">
                        {selectedOrder.status}
                      </span>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">
                      {selectedOrder.listingTitle} • Category: {selectedOrder.category}
                    </p>
                  </div>

                  <div className="text-right">
                    <span className="text-[11px] text-gray-400 font-semibold block">Total Contract Value</span>
                    <span className="text-2xl font-black text-[#14532D]">
                      ₹{selectedOrder.totalAmount.toLocaleString('en-IN')}
                    </span>
                  </div>
                </div>

                {/* Interactive Order Timeline Component */}
                <div className="p-4 bg-[#F8FAF7] rounded-2xl border border-gray-100">
                  <OrderTimeline
                    currentStatus={selectedOrder.status}
                    trackingHistory={selectedOrder.trackingHistory}
                  />
                </div>

                {/* Parties & Logistics Address Matrix */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100 space-y-1.5">
                    <span className="text-[11px] font-bold text-gray-500 uppercase tracking-wider block">
                      Origin / Seller Warehouse
                    </span>
                    <p className="font-bold text-gray-900 text-sm">{selectedOrder.sellerBusiness}</p>
                    <p className="text-gray-600">Contact: {selectedOrder.sellerName}</p>
                    <p className="text-gray-500 flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-emerald" /> {selectedOrder.pickupAddress}
                    </p>
                  </div>

                  <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100 space-y-1.5">
                    <span className="text-[11px] font-bold text-gray-500 uppercase tracking-wider block">
                      Destination / Buyer Facility
                    </span>
                    <p className="font-bold text-gray-900 text-sm">{selectedOrder.buyerBusiness}</p>
                    <p className="text-gray-600">Contact: {selectedOrder.buyerName}</p>
                    <p className="text-gray-500 flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-[#14532D]" /> {selectedOrder.deliveryAddress}
                    </p>
                  </div>
                </div>

                {/* LOGISTICS ACTIONS BOX (Section 14 Implementation) */}
                <div className="p-5 rounded-2xl bg-forest-50/70 border border-forest-200 space-y-4 text-xs">
                  <div className="flex items-center justify-between border-b border-forest-200 pb-2">
                    <h3 className="font-bold text-[#14532D] text-sm flex items-center gap-2">
                      <Truck className="w-4 h-4 text-emerald" /> Logistics Coordination & Milestone Actions
                    </h3>
                    <span className="text-[11px] text-gray-500">Live State Update</span>
                  </div>

                  {/* Scheduled Pickup Banner */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-3.5 rounded-xl border border-forest-100">
                    <div>
                      <span className="font-semibold text-gray-500 block">Proposed Pickup Window:</span>
                      <strong className="text-gray-900 text-sm">
                        {selectedOrder.pickupDate
                          ? new Date(selectedOrder.pickupDate).toLocaleDateString('en-IN', {
                              weekday: 'short',
                              year: 'numeric',
                              month: 'short',
                              day: 'numeric',
                              hour: '2-digit',
                              minute: '2-digit',
                            })
                          : 'Not scheduled yet'}
                      </strong>
                    </div>

                    {/* Propose Pickup Date Form */}
                    <form onSubmit={handleSchedulePickup} className="flex items-center gap-2">
                      <input
                        type="datetime-local"
                        value={newPickupDate}
                        onChange={(e) => setNewPickupDate(e.target.value)}
                        required
                        className="px-2.5 py-1.5 rounded-lg border border-gray-300 text-xs focus:ring-2 focus:ring-emerald focus:outline-none"
                      />
                      <button
                        type="submit"
                        className="px-3 py-1.5 bg-[#14532D] text-white font-bold rounded-lg hover:bg-forest-800 transition-colors shrink-0"
                      >
                        Set Pickup Date
                      </button>
                    </form>
                  </div>

                  {/* Action Step Triggers */}
                  <div className="space-y-2">
                    <span className="font-bold text-gray-700 block">Advance Order Status:</span>
                    <div className="flex flex-wrap items-center gap-2">
                      {/* Step 1: Mark Material Ready */}
                      <button
                        onClick={handleMarkMaterialReady}
                        disabled={selectedOrder.status === 'Completed' || selectedOrder.materialReady}
                        className={`px-3.5 py-2 rounded-xl font-bold flex items-center gap-1.5 transition-all ${
                          selectedOrder.materialReady
                            ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                            : 'bg-white hover:bg-forest-100 text-[#14532D] border border-forest-300'
                        }`}
                      >
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald" />
                        {selectedOrder.materialReady ? 'Material Ready Confirmed' : 'Mark Material Ready'}
                      </button>

                      {/* Step 2: In Transit */}
                      <button
                        onClick={() => handleUpdateStatus('In Transit')}
                        disabled={selectedOrder.status === 'In Transit' || selectedOrder.status === 'Delivered' || selectedOrder.status === 'Completed'}
                        className="px-3.5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold flex items-center gap-1.5 transition-all disabled:opacity-50"
                      >
                        <Truck className="w-3.5 h-3.5" /> Dispatch / Mark In Transit
                      </button>

                      {/* Step 3: Delivered */}
                      <button
                        onClick={handleConfirmDelivery}
                        disabled={selectedOrder.status === 'Delivered' || selectedOrder.status === 'Completed'}
                        className="px-3.5 py-2 bg-emerald hover:bg-emerald-600 text-forest-950 rounded-xl font-bold flex items-center gap-1.5 transition-all disabled:opacity-50"
                      >
                        <PackageCheck className="w-3.5 h-3.5" /> Confirm Plant Delivery
                      </button>

                      {/* Step 4: Complete */}
                      {selectedOrder.status === 'Delivered' && (
                        <button
                          onClick={handleCompleteOrder}
                          className="px-4 py-2 bg-[#14532D] hover:bg-forest-800 text-white rounded-xl font-black shadow-md flex items-center gap-1.5 transition-all animate-bounce"
                        >
                          <ShieldCheck className="w-4 h-4 text-emerald" /> Finalize & Complete Order
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
