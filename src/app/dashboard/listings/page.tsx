'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { StorageService } from '@/lib/storage';
import { useAuth } from '@/context/AuthContext';
import { Listing, Inquiry } from '@/types';
import {
  Package,
  PlusCircle,
  Edit2,
  Trash2,
  Pause,
  Play,
  CheckCircle,
  Eye,
  MessageSquare,
  Scale,
  MapPin,
  Search,
  ExternalLink,
} from 'lucide-react';

export default function MyListingsPage() {
  const { user } = useAuth();
  const [listings, setListings] = useState<Listing[]>([]);
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [searchTerm, setSearchTerm] = useState('');

  // Editing state
  const [editingListing, setEditingListing] = useState<Listing | null>(null);

  useEffect(() => {
    loadListings();
  }, [user]);

  const loadListings = () => {
    if (!user) return;
    const all = StorageService.getListings();
    const allInq = StorageService.getInquiries();
    setInquiries(allInq);

    // Filter for current seller or show all for demo if few
    const mine = all.filter((l) => l.sellerId === user.id);
    setListings(mine.length > 0 ? mine : all);
  };

  const handleToggleStatus = (id: string, current: string) => {
    const nextStatus = current === 'active' ? 'paused' : 'active';
    StorageService.updateListing(id, { status: nextStatus as any });
    loadListings();
  };

  const handleMarkAsSold = (id: string) => {
    StorageService.updateListing(id, { status: 'sold', quantity: 0 });
    loadListings();
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to remove this industrial waste listing?')) {
      StorageService.deleteListing(id);
      loadListings();
    }
  };

  const handleSaveEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingListing) return;

    StorageService.updateListing(editingListing.id, {
      title: editingListing.title,
      pricePerUnit: editingListing.pricePerUnit,
      quantity: editingListing.quantity,
      negotiable: editingListing.negotiable,
      city: editingListing.city,
    });

    setEditingListing(null);
    loadListings();
  };

  const filtered = listings.filter((l) =>
    l.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    l.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 sm:p-8 rounded-3xl border border-gray-200 shadow-sm">
        <div>
          <span className="text-xs uppercase font-bold text-emerald tracking-wider">
            Inventory & Material Management
          </span>
          <h1 className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight mt-0.5">
            My Waste Inventory Lots
          </h1>
          <p className="text-xs text-gray-500">
            Publish, edit, pause, or mark lots as sold. Monitor incoming buyer inquiries per batch.
          </p>
        </div>

        <Link
          href="/dashboard/add-listing"
          className="inline-flex items-center gap-2 px-5 py-3 bg-[#14532D] hover:bg-forest-800 text-white font-bold text-xs rounded-xl shadow transition-all self-start sm:self-auto"
        >
          <PlusCircle className="w-4 h-4 text-emerald" /> Post New Material
        </Link>
      </div>

      {/* Search & Counter Toolbar */}
      <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Filter listings by name or category..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-3 py-2 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-emerald text-xs"
          />
        </div>
        <div className="text-gray-500 font-semibold self-end sm:self-auto">
          Total: <strong className="text-gray-900">{filtered.length}</strong> material lots managed
        </div>
      </div>

      {/* Listings Table / Cards */}
      <div className="bg-white rounded-3xl border border-gray-200 shadow-sm overflow-hidden">
        {filtered.length === 0 ? (
          <div className="p-12 text-center space-y-3">
            <Package className="w-12 h-12 text-gray-300 mx-auto" />
            <h3 className="font-bold text-gray-800 text-sm">No Material Lots Found</h3>
            <p className="text-xs text-gray-500">You haven’t posted any industrial waste lots matching this filter.</p>
            <Link
              href="/dashboard/add-listing"
              className="inline-block px-4 py-2 bg-[#14532D] text-white text-xs font-bold rounded-xl"
            >
              Post First Lot
            </Link>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#F8FAF7] text-gray-500 font-bold uppercase tracking-wider border-b border-gray-100">
                <tr>
                  <th className="p-4">Material Lot</th>
                  <th className="p-4">Category</th>
                  <th className="p-4">Available Stock</th>
                  <th className="p-4">Rate / Unit</th>
                  <th className="p-4">Location</th>
                  <th className="p-4">Status</th>
                  <th className="p-4">Inquiries</th>
                  <th className="p-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filtered.map((item) => {
                  const inqCount = inquiries.filter((i) => i.listingId === item.id).length;

                  return (
                    <tr key={item.id} className="hover:bg-gray-50/80 transition-colors">
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <img
                            src={item.images[0]}
                            alt={item.title}
                            className="w-12 h-12 rounded-xl object-cover shrink-0 border border-gray-200"
                          />
                          <div>
                            <Link
                              href={`/marketplace/${item.id}`}
                              className="font-bold text-gray-900 hover:text-[#14532D] line-clamp-1 max-w-xs"
                            >
                              {item.title}
                            </Link>
                            <span className="text-[10px] text-gray-400 font-medium">
                              {item.condition}
                            </span>
                          </div>
                        </div>
                      </td>

                      <td className="p-4 font-semibold text-gray-700">{item.category}</td>

                      <td className="p-4">
                        <span className="font-bold text-gray-900">
                          {item.quantity.toLocaleString('en-IN')}
                        </span>{' '}
                        <span className="text-gray-500">{item.unit}</span>
                      </td>

                      <td className="p-4">
                        <span className="font-extrabold text-[#14532D]">
                          ₹{item.pricePerUnit.toLocaleString('en-IN')}
                        </span>
                        <span className="text-gray-500">/{item.unit}</span>
                        {item.negotiable && (
                          <span className="block text-[10px] text-emerald font-semibold">
                            Negotiable
                          </span>
                        )}
                      </td>

                      <td className="p-4 text-gray-600">{item.city}</td>

                      <td className="p-4">
                        <span
                          className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                            item.status === 'active'
                              ? 'bg-forest-100 text-[#14532D]'
                              : item.status === 'sold'
                              ? 'bg-purple-100 text-purple-800'
                              : 'bg-amber-100 text-amber-800'
                          }`}
                        >
                          {item.status}
                        </span>
                      </td>

                      <td className="p-4">
                        <Link
                          href="/dashboard/inquiries"
                          className="inline-flex items-center gap-1 font-bold text-emerald hover:underline"
                        >
                          <MessageSquare className="w-3.5 h-3.5" />
                          <span>{inqCount} offers</span>
                        </Link>
                      </td>

                      <td className="p-4 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          {/* Pause / Resume */}
                          <button
                            onClick={() => handleToggleStatus(item.id, item.status)}
                            className="p-1.5 text-gray-500 hover:text-amber-600 hover:bg-amber-50 rounded-lg transition-colors"
                            title={item.status === 'active' ? 'Pause Listing' : 'Resume Listing'}
                          >
                            {item.status === 'active' ? (
                              <Pause className="w-4 h-4" />
                            ) : (
                              <Play className="w-4 h-4" />
                            )}
                          </button>

                          {/* Mark Sold */}
                          {item.status !== 'sold' && (
                            <button
                              onClick={() => handleMarkAsSold(item.id)}
                              className="p-1.5 text-gray-500 hover:text-emerald hover:bg-forest-50 rounded-lg transition-colors"
                              title="Mark Lot as Sold"
                            >
                              <CheckCircle className="w-4 h-4" />
                            </button>
                          )}

                          {/* Quick Edit */}
                          <button
                            onClick={() => setEditingListing(item)}
                            className="p-1.5 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                            title="Quick Edit"
                          >
                            <Edit2 className="w-4 h-4" />
                          </button>

                          {/* Delete */}
                          <button
                            onClick={() => handleDelete(item.id)}
                            className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                            title="Delete"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* EDIT LISTING MODAL */}
      {editingListing && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-gray-100 space-y-4 text-xs">
            <div className="flex items-center justify-between pb-3 border-b border-gray-100">
              <h3 className="text-sm font-bold text-gray-900">Edit Material Lot Parameters</h3>
              <button
                onClick={() => setEditingListing(null)}
                className="text-gray-400 hover:text-gray-600 font-bold"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSaveEdit} className="space-y-3">
              <div>
                <label className="block font-bold text-gray-700 mb-1">Listing Title</label>
                <input
                  type="text"
                  value={editingListing.title}
                  onChange={(e) => setEditingListing({ ...editingListing, title: e.target.value })}
                  required
                  className="w-full px-3 py-2 rounded-xl border border-gray-300 text-xs focus:ring-2 focus:ring-emerald focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-gray-700 mb-1">
                    Available Quantity ({editingListing.unit})
                  </label>
                  <input
                    type="number"
                    value={editingListing.quantity}
                    onChange={(e) =>
                      setEditingListing({ ...editingListing, quantity: Number(e.target.value) })
                    }
                    required
                    className="w-full px-3 py-2 rounded-xl border border-gray-300 text-xs focus:ring-2 focus:ring-emerald focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block font-bold text-gray-700 mb-1">
                    Rate / {editingListing.unit} (₹)
                  </label>
                  <input
                    type="number"
                    value={editingListing.pricePerUnit}
                    onChange={(e) =>
                      setEditingListing({ ...editingListing, pricePerUnit: Number(e.target.value) })
                    }
                    required
                    className="w-full px-3 py-2 rounded-xl border border-gray-300 text-xs focus:ring-2 focus:ring-emerald focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 items-center">
                <div>
                  <label className="block font-bold text-gray-700 mb-1">Dispatch City</label>
                  <input
                    type="text"
                    value={editingListing.city}
                    onChange={(e) =>
                      setEditingListing({ ...editingListing, city: e.target.value })
                    }
                    required
                    className="w-full px-3 py-2 rounded-xl border border-gray-300 text-xs focus:ring-2 focus:ring-emerald focus:outline-none"
                  />
                </div>

                <div className="pt-4">
                  <label className="flex items-center gap-2 cursor-pointer font-bold text-gray-700">
                    <input
                      type="checkbox"
                      checked={editingListing.negotiable}
                      onChange={(e) =>
                        setEditingListing({ ...editingListing, negotiable: e.target.checked })
                      }
                      className="w-4 h-4 rounded text-emerald"
                    />
                    <span>Negotiable Rate</span>
                  </label>
                </div>
              </div>

              <div className="pt-3 flex items-center justify-end gap-2 border-t border-gray-100">
                <button
                  type="button"
                  onClick={() => setEditingListing(null)}
                  className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#14532D] text-white font-bold rounded-xl hover:bg-forest-800"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
