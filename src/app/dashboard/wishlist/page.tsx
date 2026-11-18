'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { StorageService } from '@/lib/storage';
import { useAuth } from '@/context/AuthContext';
import { Listing } from '@/types';
import ListingCard from '@/components/ListingCard';
import { Heart, Search, ArrowRight, Package } from 'lucide-react';

export default function WishlistPage() {
  const { user } = useAuth();
  const [savedListings, setSavedListings] = useState<Listing[]>([]);

  useEffect(() => {
    if (!user) return;
    const wishlistIds = StorageService.getWishlist(user.id);
    const all = StorageService.getListings();
    const matched = all.filter((l) => wishlistIds.includes(l.id));
    setSavedListings(matched);
  }, [user]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 sm:p-8 rounded-3xl border border-gray-200 shadow-sm">
        <div>
          <span className="text-xs uppercase font-bold text-red-600 tracking-wider flex items-center gap-1">
            <Heart className="w-3.5 h-3.5 fill-red-600" /> Procurement Watchlist
          </span>
          <h1 className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight mt-0.5">
            Saved Industrial Materials
          </h1>
          <p className="text-xs text-gray-500">
            Bookmarked lots for upcoming production cycles, feedstock comparison, and fast quoting.
          </p>
        </div>

        <Link
          href="/marketplace"
          className="inline-flex items-center gap-2 px-5 py-3 bg-[#14532D] hover:bg-forest-800 text-white font-bold text-xs rounded-xl shadow transition-all self-start sm:self-auto"
        >
          <Search className="w-4 h-4 text-emerald" /> Discover More Lots
        </Link>
      </div>

      {savedListings.length === 0 ? (
        <div className="bg-white rounded-3xl p-12 text-center border border-gray-200 space-y-3">
          <Heart className="w-12 h-12 text-gray-300 mx-auto" />
          <h3 className="font-bold text-gray-900 text-sm">Your Wishlist is Empty</h3>
          <p className="text-xs text-gray-500 max-w-sm mx-auto">
            Click the heart icon on any material card across the marketplace to save lots to this list for quick review.
          </p>
          <Link
            href="/marketplace"
            className="inline-block px-5 py-2.5 bg-[#14532D] text-white text-xs font-bold rounded-xl"
          >
            Explore Marketplace
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {savedListings.map((listing) => (
            <ListingCard key={listing.id} listing={listing} />
          ))}
        </div>
      )}
    </div>
  );
}
