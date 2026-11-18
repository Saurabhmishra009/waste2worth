'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { StorageService } from '@/lib/storage';
import { useAuth } from '@/context/AuthContext';
import { Inquiry, InquiryStatus } from '@/types';
import {
  MessageSquare,
  CheckCircle2,
  XCircle,
  ArrowRightLeft,
  Truck,
  Building2,
  Clock,
  ArrowRight,
  ShieldCheck,
  AlertCircle,
  PackageCheck,
} from 'lucide-react';

export default function InquiriesHubPage() {
  const router = useRouter();
  const { user, role } = useAuth();
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [activeTab, setActiveTab] = useState<'received' | 'sent'>('received');

  // Counteroffer Modal state
  const [counterModalOpen, setCounterModalOpen] = useState(false);
  const [selectedInquiry, setSelectedInquiry] = useState<Inquiry | null>(null);
  const [counterPrice, setCounterPrice] = useState<number>(0);
  const [counterNote, setCounterNote] = useState<string>('');

  useEffect(() => {
    loadInquiries();
  }, [user]);

  const loadInquiries = () => {
    if (!user) return;
    const all = StorageService.getInquiries();
    setInquiries(all);
  };

  const handleAcceptInquiry = (inquiry: Inquiry) => {
    if (confirm(`Accept purchase offer of ₹${inquiry.counterPrice || inquiry.offeredPrice}/${inquiry.unit} for ${inquiry.requestedQuantity} ${inquiry.unit}? This will generate a formal order.`)) {
      // 1. Update status to accepted
      StorageService.updateInquiryStatus(inquiry.id, 'accepted');
      // 2. Generate order & update listing inventory
      const newOrder = StorageService.createOrderFromInquiry(inquiry.id);
      loadInquiries();
      alert(`Order #${newOrder?.id} successfully generated! Listing stock has been automatically deducted.`);
      router.push('/dashboard/orders');
    }
  };

  const handleRejectInquiry = (id: string) => {
    if (confirm('Decline this purchase request?')) {
      StorageService.updateInquiryStatus(id, 'rejected');
      loadInquiries();
    }
  };

  const handleOpenCounter = (inquiry: Inquiry) => {
    setSelectedInquiry(inquiry);
    setCounterPrice(inquiry.offeredPrice + 2);
    setCounterNote('We can accept this volume provided pickup is completed before Friday afternoon.');
    setCounterModalOpen(true);
  };

  const handleSaveCounter = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedInquiry) return;

    StorageService.updateInquiryStatus(
      selectedInquiry.id,
      'countered',
      counterPrice,
      counterNote
    );

    setCounterModalOpen(false);
    setSelectedInquiry(null);
    loadInquiries();
  };

  const receivedInquiries = inquiries.filter(
    (i) => i.sellerId === user?.id || role === 'seller' || role === 'both'
  );
  const sentInquiries = inquiries.filter(
    (i) => i.buyerId === user?.id || role === 'buyer'
  );

  const displayedList = activeTab === 'received' ? receivedInquiries : sentInquiries;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 sm:p-8 rounded-3xl border border-gray-200 shadow-sm">
        <div>
          <span className="text-xs uppercase font-bold text-emerald tracking-wider">
            Negotiations & Purchase Requests
          </span>
          <h1 className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight mt-0.5">
            Inquiries & Counteroffers Hub
          </h1>
          <p className="text-xs text-gray-500">
            Accept commercial bids, exchange counteroffers, and lock transactions into tracked purchase orders.
          </p>
        </div>

        <Link
          href="/dashboard/orders"
          className="inline-flex items-center gap-2 px-5 py-3 bg-[#14532D] hover:bg-forest-800 text-white font-bold text-xs rounded-xl shadow transition-all self-start sm:self-auto"
        >
          <Truck className="w-4 h-4 text-emerald" /> View Active Orders
        </Link>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-gray-200 pb-2">
        <button
          onClick={() => setActiveTab('received')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            activeTab === 'received'
              ? 'bg-[#14532D] text-white shadow-sm'
              : 'bg-white text-gray-600 hover:bg-gray-100'
          }`}
        >
          Received Offers ({receivedInquiries.length})
        </button>
        <button
          onClick={() => setActiveTab('sent')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            activeTab === 'sent'
              ? 'bg-[#14532D] text-white shadow-sm'
              : 'bg-white text-gray-600 hover:bg-gray-100'
          }`}
        >
          Sent Purchase Inquiries ({sentInquiries.length})
        </button>
      </div>

      {/* Inquiries Cards List */}
      <div className="space-y-4">
        {displayedList.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 text-center border border-gray-200 space-y-3">
            <MessageSquare className="w-12 h-12 text-gray-300 mx-auto" />
            <h3 className="font-bold text-gray-900 text-sm">No Inquiries Found in this View</h3>
            <p className="text-xs text-gray-500">
              Browse the marketplace or post new industrial materials to generate purchase offers.
            </p>
            <Link
              href="/marketplace"
              className="inline-block px-4 py-2 bg-[#14532D] text-white text-xs font-bold rounded-xl"
            >
              Browse Marketplace
            </Link>
          </div>
        ) : (
          displayedList.map((inq) => {
            const isReceived = activeTab === 'received';
            const counterActive = inq.status === 'countered';

            return (
              <div
                key={inq.id}
                className="bg-white rounded-3xl p-6 border border-gray-200 shadow-sm hover:border-emerald transition-all space-y-4"
              >
                {/* Top line: listing title & status */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-gray-100 pb-3">
                  <div className="flex items-center gap-3">
                    <img
                      src={inq.listingImage}
                      alt={inq.listingTitle}
                      className="w-12 h-12 rounded-xl object-cover shrink-0 border border-gray-200"
                    />
                    <div>
                      <Link
                        href={`/marketplace/${inq.listingId}`}
                        className="font-bold text-gray-900 hover:text-[#14532D] text-sm"
                      >
                        {inq.listingTitle}
                      </Link>
                      <p className="text-xs text-gray-500 flex items-center gap-1.5 mt-0.5">
                        <Building2 className="w-3.5 h-3.5 text-gray-400" />
                        <span>
                          {isReceived ? `Buyer: ${inq.buyerBusiness} (${inq.buyerName})` : `Supplier: ${inq.sellerName}`}
                        </span>
                        <span>•</span>
                        <span className="text-gray-400 font-mono">#{inq.id}</span>
                      </p>
                    </div>
                  </div>

                  <div>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
                        inq.status === 'accepted' || inq.status === 'ordered'
                          ? 'bg-forest-100 text-[#14532D]'
                          : inq.status === 'countered'
                          ? 'bg-amber-100 text-amber-800'
                          : inq.status === 'rejected'
                          ? 'bg-red-100 text-red-800'
                          : 'bg-blue-100 text-blue-800'
                      }`}
                    >
                      {inq.status === 'ordered' ? 'Converted to Order' : inq.status}
                    </span>
                  </div>
                </div>

                {/* Offer Numbers Matrix */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                  <div className="p-3 bg-[#F8FAF7] rounded-xl border border-gray-100">
                    <span className="text-gray-500 block mb-0.5">Requested Volume</span>
                    <strong className="text-gray-900 text-sm">
                      {inq.requestedQuantity.toLocaleString('en-IN')} {inq.unit}
                    </strong>
                  </div>

                  <div className="p-3 bg-[#F8FAF7] rounded-xl border border-gray-100">
                    <span className="text-gray-500 block mb-0.5">Offered Rate</span>
                    <strong className="text-[#14532D] text-sm">
                      ₹{inq.offeredPrice.toLocaleString('en-IN')}/{inq.unit}
                    </strong>
                  </div>

                  <div className="p-3 bg-[#F8FAF7] rounded-xl border border-gray-100">
                    <span className="text-gray-500 block mb-0.5">Counteroffer Rate</span>
                    <strong className="text-amber-600 text-sm">
                      {inq.counterPrice ? `₹${inq.counterPrice.toLocaleString('en-IN')}/${inq.unit}` : 'None'}
                    </strong>
                  </div>

                  <div className="p-3 bg-[#F8FAF7] rounded-xl border border-gray-100">
                    <span className="text-gray-500 block mb-0.5">Total Deal Value</span>
                    <strong className="text-gray-900 text-sm">
                      ₹{((inq.counterPrice || inq.offeredPrice) * inq.requestedQuantity).toLocaleString('en-IN')}
                    </strong>
                  </div>
                </div>

                {/* Message & Counter Notes */}
                <div className="space-y-2 text-xs">
                  <div className="p-3 bg-gray-50 rounded-xl text-gray-700 leading-relaxed">
                    <span className="font-bold text-gray-900 block mb-0.5">Initial Message:</span>
                    {inq.initialMessage}
                  </div>

                  {inq.counterNote && (
                    <div className="p-3 bg-amber-50 rounded-xl text-amber-900 border border-amber-200 leading-relaxed">
                      <span className="font-bold block mb-0.5">Supplier Counter Note:</span>
                      {inq.counterNote}
                    </div>
                  )}
                </div>

                {/* Interactive Action Buttons */}
                <div className="pt-2 flex flex-wrap items-center justify-between gap-3 text-xs border-t border-gray-100">
                  <span className="text-gray-400">
                    Received on {new Date(inq.createdAt).toLocaleDateString('en-IN', {
                      month: 'short',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </span>

                  {inq.status !== 'ordered' && inq.status !== 'rejected' && (
                    <div className="flex items-center gap-2">
                      {/* Accept Button */}
                      <button
                        onClick={() => handleAcceptInquiry(inq)}
                        className="px-4 py-2 bg-[#14532D] hover:bg-forest-800 text-white font-bold rounded-xl flex items-center gap-1.5 shadow-sm"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald" />
                        {inq.status === 'countered' && !isReceived
                          ? 'Accept Supplier Counteroffer'
                          : 'Accept Offer & Create Order'}
                      </button>

                      {/* Make Counteroffer (If not already ordered) */}
                      {isReceived && (
                        <button
                          onClick={() => handleOpenCounter(inq)}
                          className="px-4 py-2 bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-200 font-bold rounded-xl flex items-center gap-1.5"
                        >
                          <ArrowRightLeft className="w-3.5 h-3.5" /> Make Counteroffer
                        </button>
                      )}

                      {/* Reject Button */}
                      <button
                        onClick={() => handleRejectInquiry(inq.id)}
                        className="px-3 py-2 bg-gray-100 hover:bg-red-50 text-gray-600 hover:text-red-700 font-semibold rounded-xl"
                      >
                        Decline
                      </button>
                    </div>
                  )}

                  {inq.status === 'ordered' && (
                    <Link
                      href="/dashboard/orders"
                      className="px-4 py-2 bg-forest-100 text-[#14532D] font-bold rounded-xl flex items-center gap-1"
                    >
                      <PackageCheck className="w-4 h-4 text-emerald" /> View Contracted Order →
                    </Link>
                  )}
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* COUNTEROFFER MODAL */}
      {counterModalOpen && selectedInquiry && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-gray-100 space-y-4 text-xs">
            <div className="flex items-center justify-between pb-3 border-b border-gray-100">
              <div>
                <h3 className="text-sm font-bold text-gray-900">Propose Counteroffer</h3>
                <p className="text-[11px] text-gray-500">{selectedInquiry.listingTitle}</p>
              </div>
              <button
                onClick={() => setCounterModalOpen(false)}
                className="text-gray-400 hover:text-gray-600 font-bold"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSaveCounter} className="space-y-3">
              <div>
                <label className="block font-bold text-gray-700 mb-1">
                  Counter Rate / {selectedInquiry.unit} (₹)
                </label>
                <input
                  type="number"
                  min={1}
                  value={counterPrice}
                  onChange={(e) => setCounterPrice(Number(e.target.value))}
                  required
                  className="w-full px-3 py-2 rounded-xl border border-gray-300 text-xs font-bold text-[#14532D] focus:ring-2 focus:ring-emerald focus:outline-none"
                />
                <span className="text-[10px] text-gray-400">
                  Buyer offered ₹{selectedInquiry.offeredPrice}/{selectedInquiry.unit}
                </span>
              </div>

              <div>
                <label className="block font-bold text-gray-700 mb-1">
                  Supplier Conditions / Pickup Timeline Note
                </label>
                <textarea
                  rows={3}
                  value={counterNote}
                  onChange={(e) => setCounterNote(e.target.value)}
                  required
                  className="w-full px-3 py-2 rounded-xl border border-gray-300 text-xs resize-none focus:ring-2 focus:ring-emerald focus:outline-none"
                  placeholder="e.g. Rate valid for loading before 4pm Thursday, minimum 3-tonne transport truck required..."
                />
              </div>

              <div className="p-3 bg-[#F8FAF7] rounded-xl flex items-center justify-between">
                <span className="text-gray-600 font-semibold">New Total Contract Value:</span>
                <span className="font-black text-[#14532D] text-sm">
                  ₹{(counterPrice * selectedInquiry.requestedQuantity).toLocaleString('en-IN')}
                </span>
              </div>

              <div className="pt-2 flex items-center justify-end gap-2 border-t border-gray-100">
                <button
                  type="button"
                  onClick={() => setCounterModalOpen(false)}
                  className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-xl font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#14532D] hover:bg-forest-800 text-white font-bold rounded-xl"
                >
                  Submit Counteroffer
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
