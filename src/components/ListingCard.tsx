'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Listing } from '@/types';
import { useAuth } from '@/context/AuthContext';
import { StorageService } from '@/lib/storage';
import {
  MapPin,
  ShieldCheck,
  Heart,
  Scale,
  Sparkles,
  ArrowRight,
  Truck,
  CheckCircle2,
} from 'lucide-react';

interface ListingCardProps {
  listing: Listing;
  showMatchScore?: number;
  matchReasons?: string[];
}

export default function ListingCard({
  listing,
  showMatchScore,
  matchReasons,
}: ListingCardProps) {
  const { user } = useAuth();
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    if (user) {
      const saved = StorageService.getWishlist(user.id);
      setIsSaved(saved.includes(listing.id));
    }
  }, [user, listing.id]);

  const handleToggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!user) return;
    const added = StorageService.toggleWishlist(user.id, listing.id);
    setIsSaved(added);
  };

  const formattedPrice = listing.pricePerUnit.toLocaleString('en-IN');
  const formattedQuantity = listing.quantity.toLocaleString('en-IN');

  const categoryColors: Record<string, string> = {
    Plastic: 'bg-blue-100 text-blue-800 border-blue-200',
    Metal: 'bg-amber-100 text-amber-800 border-amber-200',
    Cardboard: 'bg-orange-100 text-orange-800 border-orange-200',
    Wood: 'bg-yellow-100 text-yellow-800 border-yellow-200',
    Textile: 'bg-purple-100 text-purple-800 border-purple-200',
    'Electronic Waste': 'bg-cyan-100 text-cyan-800 border-cyan-200',
    'Construction Materials': 'bg-stone-100 text-stone-800 border-stone-200',
    'Industrial By-products': 'bg-emerald-100 text-emerald-800 border-emerald-200',
    Paper: 'bg-teal-100 text-teal-800 border-teal-200',
  };

  return (
    <div className="group bg-white rounded-2xl border border-gray-200 hover:border-[#10B981] shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col overflow-hidden relative">
      {/* Compatibility Badge if provided by Smart Matching */}
      {showMatchScore !== undefined && (
        <div className="absolute top-3 left-3 z-10 bg-[#14532D] text-white px-2.5 py-1 rounded-full text-xs font-bold shadow-md flex items-center gap-1 border border-emerald">
          <Sparkles className="w-3.5 h-3.5 text-emerald" />
          <span>{showMatchScore}% AI Match</span>
        </div>
      )}

      {/* Wishlist Button */}
      <button
        onClick={handleToggleWishlist}
        className="absolute top-3 right-3 z-10 w-8 h-8 rounded-full bg-white/90 backdrop-blur-sm shadow flex items-center justify-center text-gray-400 hover:text-red-500 hover:bg-white transition-colors"
        title={isSaved ? 'Remove from wishlist' : 'Save material'}
      >
        <Heart className={`w-4 h-4 ${isSaved ? 'fill-red-500 text-red-500' : ''}`} />
      </button>

      {/* Image Container */}
      <Link href={`/marketplace/${listing.id}`} className="relative h-48 w-full bg-gray-100 overflow-hidden block">
        <img
          src={listing.images[0] || 'https://images.unsplash.com/photo-1530587191325-3db32d826c18?w=800&auto=format&fit=crop&q=80'}
          alt={listing.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-60" />

        <div className="absolute bottom-2.5 left-3 flex flex-wrap gap-1.5 items-center">
          <span
            className={`text-[11px] font-bold px-2 py-0.5 rounded-md border ${
              categoryColors[listing.category] || 'bg-gray-100 text-gray-800'
            }`}
          >
            {listing.category}
          </span>
          <span className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-black/60 text-white backdrop-blur-xs">
            {listing.condition}
          </span>
        </div>
      </Link>

      {/* Card Content */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Seller Line */}
          <div className="flex items-center justify-between text-xs text-gray-500 mb-1.5">
            <div className="flex items-center gap-1 truncate max-w-[190px]">
              <span className="truncate font-medium text-gray-700">{listing.sellerBusiness}</span>
              {listing.sellerVerified && (
                <span title="Verified Business">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald shrink-0" />
                </span>
              )}
            </div>
            <div className="flex items-center gap-1 text-[11px] text-gray-500 shrink-0">
              <MapPin className="w-3 h-3 text-[#14532D]" />
              <span>{listing.city}</span>
            </div>
          </div>

          {/* Title */}
          <Link href={`/marketplace/${listing.id}`}>
            <h3 className="font-bold text-gray-900 group-hover:text-[#14532D] transition-colors line-clamp-2 text-sm leading-snug mb-2">
              {listing.title}
            </h3>
          </Link>

          {/* Description Snippet */}
          <p className="text-xs text-gray-500 line-clamp-2 mb-3">
            {listing.description}
          </p>

          {/* Match Reasons snippet if smart matcher */}
          {matchReasons && matchReasons.length > 0 && (
            <div className="mb-3 p-2 bg-emerald-50 rounded-lg border border-emerald-100 text-[11px] text-emerald-900 space-y-0.5">
              <p className="font-semibold text-emerald-950 flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3 text-emerald" /> Match Breakdown:
              </p>
              <p className="truncate text-[10px] text-emerald-800">
                • {matchReasons[0]}
              </p>
              {matchReasons[1] && (
                <p className="truncate text-[10px] text-emerald-800">
                  • {matchReasons[1]}
                </p>
              )}
            </div>
          )}
        </div>

        {/* Price & Quantity & CTA */}
        <div className="pt-3 border-t border-gray-100">
          <div className="flex items-baseline justify-between mb-2">
            <div>
              <span className="text-[11px] text-gray-500 font-medium">Rate / Unit: </span>
              <span className="text-lg font-extrabold text-[#14532D]">
                ₹{formattedPrice}
              </span>
              <span className="text-xs text-gray-500 font-medium">/{listing.unit}</span>
            </div>
            {listing.negotiable && (
              <span className="text-[10px] text-emerald font-semibold bg-emerald-50 px-1.5 py-0.5 rounded">
                Negotiable
              </span>
            )}
          </div>

          <div className="flex items-center justify-between text-xs text-gray-600 mb-3">
            <span className="flex items-center gap-1">
              <Scale className="w-3.5 h-3.5 text-gray-400" />
              <span>Available: <strong>{formattedQuantity}</strong> {listing.unit}</span>
            </span>
            {listing.pickupAvailable && (
              <span className="flex items-center gap-1 text-[11px] text-emerald-700">
                <Truck className="w-3 h-3" /> Pickup Ready
              </span>
            )}
          </div>

          <div className="grid grid-cols-2 gap-2">
            <Link
              href={`/marketplace/${listing.id}`}
              className="w-full text-center py-2 px-3 bg-gray-50 hover:bg-gray-100 text-gray-700 font-semibold text-xs rounded-xl border border-gray-200 transition-colors"
            >
              View Specs
            </Link>
            <Link
              href={`/marketplace/${listing.id}?action=inquire`}
              className="w-full text-center py-2 px-3 bg-[#14532D] hover:bg-forest-800 text-white font-bold text-xs rounded-xl shadow-sm hover:shadow transition-all flex items-center justify-center gap-1"
            >
              Send Offer <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
