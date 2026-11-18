'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { useSearchParams } from 'next/navigation';
import { StorageService } from '@/lib/storage';
import { Listing, ListingCategory, MaterialCondition } from '@/types';
import ListingCard from '@/components/ListingCard';
import {
  Search,
  SlidersHorizontal,
  RotateCcw,
  ShieldCheck,
  Sparkles,
  MapPin,
  ArrowUpDown,
  Filter,
  CheckCircle,
} from 'lucide-react';
import { findSmartMatches, BuyerRequirement } from '@/lib/ai-matcher';

export default function MarketplacePage() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get('category') || '';

  const [listings, setListings] = useState<Listing[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory);
  const [selectedCity, setSelectedCity] = useState<string>('');
  const [minPrice, setMinPrice] = useState<string>('');
  const [maxPrice, setMaxPrice] = useState<string>('');
  const [onlyVerified, setOnlyVerified] = useState(false);
  const [sortBy, setSortBy] = useState<'newest' | 'price_low' | 'price_high'>('newest');

  // AI Matching Drawer / Mode
  const [smartMatchingActive, setSmartMatchingActive] = useState(false);
  const [buyerReq, setBuyerReq] = useState<BuyerRequirement>({
    category: 'Plastic',
    targetQuantity: 3000,
    unit: 'kg',
    maxBudgetPerUnit: 45,
    preferredCity: 'Delhi',
    preferredCondition: 'Granules / Shredded',
  });

  useEffect(() => {
    setListings(StorageService.getListings());
  }, []);

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

  // Smart matches calculation if smart matching is enabled
  const smartMatches = useMemo(() => {
    if (!smartMatchingActive) return null;
    return findSmartMatches(buyerReq, listings);
  }, [smartMatchingActive, buyerReq, listings]);

  // Regular filtered listings
  const filteredListings = useMemo(() => {
    if (smartMatchingActive && smartMatches) {
      return smartMatches.map((m) => m.listing);
    }

    return listings
      .filter((item) => {
        if (item.status === 'deleted') return false;

        // Search text
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase();
          const matchTitle = item.title.toLowerCase().includes(q);
          const matchDesc = item.description.toLowerCase().includes(q);
          const matchSeller = item.sellerBusiness.toLowerCase().includes(q);
          const matchCity = item.city.toLowerCase().includes(q);
          if (!matchTitle && !matchDesc && !matchSeller && !matchCity) return false;
        }

        // Category
        if (selectedCategory && item.category !== selectedCategory) {
          return false;
        }

        // City
        if (selectedCity && item.city.toLowerCase() !== selectedCity.toLowerCase()) {
          return false;
        }

        // Price range
        if (minPrice && item.pricePerUnit < Number(minPrice)) return false;
        if (maxPrice && item.pricePerUnit > Number(maxPrice)) return false;

        // Verified seller
        if (onlyVerified && !item.sellerVerified) return false;

        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'price_low') return a.pricePerUnit - b.pricePerUnit;
        if (sortBy === 'price_high') return b.pricePerUnit - a.pricePerUnit;
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      });
  }, [
    listings,
    searchQuery,
    selectedCategory,
    selectedCity,
    minPrice,
    maxPrice,
    onlyVerified,
    sortBy,
    smartMatchingActive,
    smartMatches,
  ]);

  const resetFilters = () => {
    setSearchQuery('');
    setSelectedCategory('');
    setSelectedCity('');
    setMinPrice('');
    setMaxPrice('');
    setOnlyVerified(false);
    setSortBy('newest');
    setSmartMatchingActive(false);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-gray-200 pb-6">
        <div>
          <h1 className="text-3xl font-black text-gray-900 tracking-tight">
            Industrial Waste Marketplace
          </h1>
          <p className="text-sm text-gray-600 mt-1">
            Discover verified surplus materials, recyclable scraps, and industrial by-products directly from manufacturers.
          </p>
        </div>

        {/* AI Smart Match Assistant Toggle */}
        <button
          onClick={() => setSmartMatchingActive(!smartMatchingActive)}
          className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs transition-all shadow-sm ${
            smartMatchingActive
              ? 'bg-[#14532D] text-white ring-2 ring-emerald'
              : 'bg-emerald-50 text-emerald-950 hover:bg-emerald-100 border border-emerald-200'
          }`}
        >
          <Sparkles className="w-4 h-4 text-emerald" />
          <span>{smartMatchingActive ? 'AI Match Mode Active' : 'Enable Smart Buyer Matching'}</span>
        </button>
      </div>

      {/* AI Smart Match Parameter Configurator */}
      {smartMatchingActive && (
        <div className="bg-gradient-to-r from-forest-900 via-forest-800 to-[#14532D] text-white p-6 rounded-2xl shadow-xl space-y-4 border border-emerald/30 animate-in fade-in">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-emerald" />
              <h3 className="font-bold text-base">Smart Matcher: Algorithm-Guided Material Compatibility</h3>
            </div>
            <span className="text-xs bg-emerald text-forest-950 font-bold px-2 py-0.5 rounded">
              Real Compatibility Engine
            </span>
          </div>

          <p className="text-xs text-forest-100 leading-relaxed max-w-3xl">
            Our multi-parameter algorithm computes exact compatibility scores by analyzing your required category, quantity threshold, target unit budget, and geographic hub proximity to reduce freight expenditure.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 pt-2">
            <div>
              <label className="block text-[11px] font-bold text-forest-200 uppercase tracking-wider mb-1">
                Target Category
              </label>
              <select
                value={buyerReq.category}
                onChange={(e) => setBuyerReq({ ...buyerReq, category: e.target.value as ListingCategory })}
                className="w-full bg-forest-800 border border-forest-600 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald"
              >
                {categories.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-[11px] font-bold text-forest-200 uppercase tracking-wider mb-1">
                Required Volume
              </label>
              <input
                type="number"
                value={buyerReq.targetQuantity}
                onChange={(e) => setBuyerReq({ ...buyerReq, targetQuantity: Number(e.target.value) })}
                className="w-full bg-forest-800 border border-forest-600 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald"
              />
            </div>

            <div>
              <label className="block text-[11px] font-bold text-forest-200 uppercase tracking-wider mb-1">
                Unit
              </label>
              <select
                value={buyerReq.unit}
                onChange={(e) => setBuyerReq({ ...buyerReq, unit: e.target.value })}
                className="w-full bg-forest-800 border border-forest-600 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald"
              >
                <option value="kg">kg (Kilograms)</option>
                <option value="t">t (Tonnes)</option>
                <option value="L">L (Litres)</option>
                <option value="pcs">pcs (Pieces)</option>
              </select>
            </div>

            <div>
              <label className="block text-[11px] font-bold text-forest-200 uppercase tracking-wider mb-1">
                Max Budget / Unit (₹)
              </label>
              <input
                type="number"
                value={buyerReq.maxBudgetPerUnit}
                onChange={(e) => setBuyerReq({ ...buyerReq, maxBudgetPerUnit: Number(e.target.value) })}
                className="w-full bg-forest-800 border border-forest-600 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald"
              />
            </div>

            <div>
              <label className="block text-[11px] font-bold text-forest-200 uppercase tracking-wider mb-1">
                Preferred Hub
              </label>
              <select
                value={buyerReq.preferredCity || ''}
                onChange={(e) => setBuyerReq({ ...buyerReq, preferredCity: e.target.value })}
                className="w-full bg-forest-800 border border-forest-600 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald"
              >
                {cities.map((city) => (
                  <option key={city} value={city}>
                    {city}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      )}

      {/* Search & Filter Toolbar */}
      <div className="bg-white p-4 sm:p-5 rounded-2xl border border-gray-200 shadow-sm space-y-4">
        {/* Top Search Line */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
          <div className="md:col-span-8 relative">
            <Search className="w-5 h-5 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by material (e.g. PET flakes, 6063 aluminium, pallets, copper)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-4 py-2.5 rounded-xl border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#10B981] focus:border-transparent transition-all"
            />
          </div>

          <div className="md:col-span-4 flex items-center gap-2">
            {/* Sort Dropdown */}
            <div className="flex-1 relative">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="w-full py-2.5 px-3 rounded-xl border border-gray-300 text-xs font-semibold text-gray-700 bg-white focus:outline-none focus:ring-2 focus:ring-[#10B981]"
              >
                <option value="newest">Sort: Newest Listings</option>
                <option value="price_low">Sort: Price (Low to High)</option>
                <option value="price_high">Sort: Price (High to Low)</option>
              </select>
            </div>

            {/* Reset */}
            {(selectedCategory || selectedCity || minPrice || maxPrice || onlyVerified || searchQuery) && (
              <button
                onClick={resetFilters}
                className="p-2.5 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-xl border border-gray-200 transition-colors"
                title="Reset all filters"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {/* Category Pills Bar */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          <button
            onClick={() => setSelectedCategory('')}
            className={`px-3.5 py-1.5 rounded-full text-xs font-bold shrink-0 transition-colors ${
              selectedCategory === ''
                ? 'bg-[#14532D] text-white shadow-sm'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            All Categories ({listings.length})
          </button>
          {categories.map((cat) => {
            const count = listings.filter((l) => l.category === cat).length;
            const isSelected = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(isSelected ? '' : cat)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold shrink-0 transition-colors ${
                  isSelected
                    ? 'bg-[#14532D] text-white shadow-sm font-bold'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {cat} ({count})
              </button>
            );
          })}
        </div>

        {/* Detailed Secondary Filters Row */}
        <div className="pt-2 border-t border-gray-100 grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-3 items-center text-xs">
          {/* City Filter */}
          <div>
            <label className="block text-[10px] uppercase font-bold text-gray-500 mb-0.5">Location</label>
            <select
              value={selectedCity}
              onChange={(e) => setSelectedCity(e.target.value)}
              className="w-full py-1.5 px-2 rounded-lg border border-gray-300 text-xs text-gray-700 focus:outline-none focus:border-emerald"
            >
              <option value="">All Indian Cities</option>
              {cities.map((city) => (
                <option key={city} value={city}>
                  {city}
                </option>
              ))}
            </select>
          </div>

          {/* Min Price */}
          <div>
            <label className="block text-[10px] uppercase font-bold text-gray-500 mb-0.5">Min Rate (₹)</label>
            <input
              type="number"
              placeholder="Min ₹"
              value={minPrice}
              onChange={(e) => setMinPrice(e.target.value)}
              className="w-full py-1.5 px-2 rounded-lg border border-gray-300 text-xs focus:outline-none focus:border-emerald"
            />
          </div>

          {/* Max Price */}
          <div>
            <label className="block text-[10px] uppercase font-bold text-gray-500 mb-0.5">Max Rate (₹)</label>
            <input
              type="number"
              placeholder="Max ₹"
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
              className="w-full py-1.5 px-2 rounded-lg border border-gray-300 text-xs focus:outline-none focus:border-emerald"
            />
          </div>

          {/* Verified Seller Toggle */}
          <div className="col-span-2 sm:col-span-1 flex items-center pt-3">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={onlyVerified}
                onChange={(e) => setOnlyVerified(e.target.checked)}
                className="w-4 h-4 rounded text-emerald focus:ring-emerald border-gray-300"
              />
              <span className="font-semibold text-gray-700 flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald" /> Verified Only
              </span>
            </label>
          </div>

          <div className="col-span-2 sm:col-span-2 text-right text-gray-500 font-medium pt-3">
            Showing <strong className="text-gray-900">{filteredListings.length}</strong> available lots
          </div>
        </div>
      </div>

      {/* Listings Grid */}
      {filteredListings.length === 0 ? (
        <div className="bg-white rounded-2xl border border-gray-200 p-12 text-center space-y-4">
          <div className="w-16 h-16 bg-forest-50 text-emerald rounded-full flex items-center justify-center mx-auto">
            <SlidersHorizontal className="w-8 h-8" />
          </div>
          <h3 className="text-lg font-bold text-gray-900">No Industrial Waste Matches Found</h3>
          <p className="text-sm text-gray-500 max-w-md mx-auto">
            Try adjusting your search query, clearing price boundaries, or choosing another industrial material category.
          </p>
          <button
            onClick={resetFilters}
            className="px-5 py-2.5 bg-[#14532D] text-white text-xs font-bold rounded-xl shadow hover:bg-forest-800 transition-colors"
          >
            Reset All Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredListings.map((listing) => {
            const matchInfo = smartMatches?.find((m) => m.listing.id === listing.id);
            return (
              <ListingCard
                key={listing.id}
                listing={listing}
                showMatchScore={matchInfo ? matchInfo.score : undefined}
                matchReasons={matchInfo ? matchInfo.matchingReasons : undefined}
              />
            );
          })}
        </div>
      )}
    </div>
  );
}
