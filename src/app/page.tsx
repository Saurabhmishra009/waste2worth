'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { StorageService } from '@/lib/storage';
import { Listing } from '@/types';
import ListingCard from '@/components/ListingCard';
import {
  Recycle,
  ArrowRight,
  ShieldCheck,
  Sparkles,
  TrendingUp,
  Truck,
  Leaf,
  CheckCircle2,
  Building2,
  Cpu,
  Boxes,
  Layers,
  Flame,
  Award,
} from 'lucide-react';

export default function HomePage() {
  const [featuredListings, setFeaturedListings] = useState<Listing[]>([]);

  useEffect(() => {
    const all = StorageService.getListings();
    setFeaturedListings(all.slice(0, 4));
  }, []);

  const categories = [
    { name: 'Plastic', count: '120+ Lots', icon: Boxes, desc: 'PET flakes, HDPE/PP granules, LDPE films' },
    { name: 'Metal', count: '85+ Lots', icon: Flame, desc: '6063 Aluminium, Berry copper, Brass, MS scrap' },
    { name: 'Cardboard', count: '65+ Lots', icon: Layers, desc: 'OCC 95/5, Kraft bales, Duplex board offcuts' },
    { name: 'Wood', count: '45+ Lots', icon: Building2, desc: 'Euro pine pallets, Kiln-dried hardwood sawdust' },
    { name: 'Textile', count: '55+ Lots', icon: Leaf, desc: 'Combed cotton clips, Polyester yarn waste' },
    { name: 'Electronic Waste', count: '30+ Lots', icon: Cpu, desc: 'FR4 PCBs, Telecommunication scrap, Connectors' },
  ];

  const demonstrationStats = [
    { label: 'Industrial Waste Reclaimed', value: '14,850+ MT', desc: 'Diverted from Indian landfills' },
    { label: 'Circulated Economic Value', value: '₹18.4 Cr', desc: 'Transacted between verified SMBs' },
    { label: 'Verified Industrial Nodes', value: '450+ Units', desc: 'Across Delhi NCR, UP & Maharashtra' },
    { label: 'Material Match Precision', value: '94.2%', desc: 'AI-assisted buyer-seller alignment' },
  ];

  return (
    <div className="space-y-20 pb-20">
      {/* HERO SECTION */}
      <section className="relative overflow-hidden bg-gradient-to-b from-forest-50/80 via-[#F8FAF7] to-[#F8FAF7] pt-12 pb-24 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-forest-100/90 border border-forest-200 text-xs font-bold text-[#14532D]">
                <Sparkles className="w-4 h-4 text-emerald" />
                <span>Next-Gen Circular Economy Platform for India</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-gray-900 tracking-tight leading-tight">
                Your Waste Is Someone Else’s{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#14532D] via-forest-700 to-[#10B981]">
                  Opportunity.
                </span>
              </h1>

              <p className="text-lg sm:text-xl text-gray-600 max-w-2xl leading-relaxed">
                Transform industrial surplus, scrap, and manufacturing by-products into high-value revenue streams. Connect directly with verified recyclers, manufacturers, and buyers across India.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
                <Link
                  href="/marketplace"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-3.5 text-sm font-bold text-white bg-[#14532D] hover:bg-forest-800 rounded-xl shadow-lg hover:shadow-xl transition-all"
                >
                  Explore Marketplace <ArrowRight className="w-4 h-4 text-[#10B981]" />
                </Link>
                <Link
                  href="/dashboard/add-listing"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 text-sm font-bold text-[#14532D] bg-white hover:bg-forest-50 border-2 border-[#14532D]/30 rounded-xl transition-all shadow-sm"
                >
                  <Recycle className="w-4 h-4 text-emerald" />
                  Start Selling Waste
                </Link>
              </div>

              {/* Trust Indicators */}
              <div className="pt-6 grid grid-cols-3 gap-4 border-t border-gray-200 text-xs text-gray-600 max-w-lg mx-auto lg:mx-0">
                <div className="flex items-center gap-1.5 font-medium">
                  <ShieldCheck className="w-4 h-4 text-emerald shrink-0" />
                  <span>GST-Verified MSMEs</span>
                </div>
                <div className="flex items-center gap-1.5 font-medium">
                  <Truck className="w-4 h-4 text-[#14532D] shrink-0" />
                  <span>Weighbridge Audited</span>
                </div>
                <div className="flex items-center gap-1.5 font-medium">
                  <CheckCircle2 className="w-4 h-4 text-emerald shrink-0" />
                  <span>Transparent INR Pricing</span>
                </div>
              </div>
            </div>

            {/* Right Hero Visual Card */}
            <div className="lg:col-span-5 relative">
              <div className="relative mx-auto max-w-md lg:max-w-none">
                {/* Background Glow */}
                <div className="absolute -inset-2 bg-gradient-to-r from-emerald/20 to-forest-500/20 rounded-3xl blur-2xl opacity-70" />

                <div className="relative rounded-3xl bg-white p-6 shadow-2xl border border-gray-100 space-y-5">
                  <div className="flex items-center justify-between pb-3 border-b border-gray-100">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-emerald animate-ping" />
                      <span className="text-xs font-bold text-gray-900 uppercase tracking-wider">
                        Live Material Stream
                      </span>
                    </div>
                    <span className="text-[11px] font-semibold text-emerald bg-forest-50 px-2 py-0.5 rounded">
                      North India Hub
                    </span>
                  </div>

                  {/* Highlighted Live Card */}
                  <div className="relative rounded-2xl overflow-hidden border border-gray-200">
                    <img
                      src="https://images.unsplash.com/photo-1530587191325-3db32d826c18?w=800&auto=format&fit=crop&q=80"
                      alt="PET Flakes"
                      className="w-full h-44 object-cover"
                    />
                    <div className="p-4 bg-white space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded">
                          Plastic • Granules
                        </span>
                        <span className="text-sm font-black text-[#14532D]">₹38 / kg</span>
                      </div>
                      <h4 className="text-sm font-bold text-gray-900 leading-snug">
                        Hot Washed Post-Industrial PET Flakes (12,000 kg)
                      </h4>
                      <p className="text-xs text-gray-500 flex items-center justify-between">
                        <span>Okhla Phase III, Delhi</span>
                        <span className="text-emerald font-semibold flex items-center gap-1">
                          <CheckCircle2 className="w-3 h-3" /> 98% Smart Match
                        </span>
                      </p>
                    </div>
                  </div>

                  {/* Live Transaction Badge */}
                  <div className="bg-[#14532D] text-white p-3.5 rounded-xl text-xs space-y-1 shadow-md">
                    <div className="flex items-center justify-between font-semibold">
                      <span className="flex items-center gap-1.5">
                        <TrendingUp className="w-4 h-4 text-emerald" /> Recent Completed Order
                      </span>
                      <span className="text-emerald font-bold">₹1,35,000</span>
                    </div>
                    <p className="text-forest-100 text-[11px]">
                      10 Tonnes Baled OCC Kraft transferred from Ghaziabad to Noida.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PLATFORM DEMONSTRATION STATISTICS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-10 space-y-2">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900">
            Industrial Scale, Measurable Circular Impact
          </h2>
          <p className="text-sm text-gray-600">
            Fictional platform metrics demonstrating capacity, recovery benchmarks, and circular transactions.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {demonstrationStats.map((stat, idx) => (
            <div
              key={idx}
              className="p-6 rounded-2xl bg-white border border-gray-200 shadow-sm hover:border-emerald hover:shadow-md transition-all text-center space-y-2"
            >
              <p className="text-3xl sm:text-4xl font-black text-[#14532D]">{stat.value}</p>
              <h3 className="font-bold text-gray-900 text-sm">{stat.label}</h3>
              <p className="text-xs text-gray-500">{stat.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* MATERIAL CATEGORIES */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mb-10">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-emerald">
              Streamlined B2B Exchange
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 mt-1">
              Browse Industrial Categories
            </h2>
          </div>
          <Link
            href="/marketplace"
            className="text-sm font-bold text-[#14532D] hover:text-emerald flex items-center gap-1 transition-colors"
          >
            Explore all 9 categories <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((cat) => {
            const Icon = cat.icon;
            return (
              <Link
                key={cat.name}
                href={`/marketplace?category=${encodeURIComponent(cat.name)}`}
                className="group p-6 rounded-2xl bg-white border border-gray-200 hover:border-emerald hover:shadow-lg transition-all duration-200 flex items-start gap-4"
              >
                <div className="w-12 h-12 rounded-xl bg-forest-50 group-hover:bg-[#14532D] text-[#14532D] group-hover:text-white flex items-center justify-center shrink-0 transition-colors">
                  <Icon className="w-6 h-6" />
                </div>
                <div className="flex-1 space-y-1">
                  <div className="flex items-center justify-between">
                    <h3 className="font-bold text-gray-900 group-hover:text-[#14532D] transition-colors">
                      {cat.name}
                    </h3>
                    <span className="text-[11px] font-semibold text-emerald bg-emerald-50 px-2 py-0.5 rounded-full">
                      {cat.count}
                    </span>
                  </div>
                  <p className="text-xs text-gray-500 leading-relaxed">{cat.desc}</p>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* FEATURED LISTINGS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mb-8">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-emerald">
              Verified Ready for Dispatch
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 mt-1">
              Featured Available Materials
            </h2>
          </div>
          <Link
            href="/marketplace"
            className="text-sm font-bold text-[#14532D] hover:text-emerald flex items-center gap-1"
          >
            View all 16+ live lots <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredListings.map((listing) => (
            <ListingCard key={listing.id} listing={listing} />
          ))}
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="bg-white py-16 border-y border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14 space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald">
              Transparent 4-Step Process
            </span>
            <h2 className="text-3xl font-extrabold text-gray-900">
              How Industrial Waste Becomes Worth
            </h2>
            <p className="text-sm text-gray-600">
              Waste2Worth eliminates informal scrap middlemen by offering verified B2B matching, fair pricing, and reliable logistics.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="p-6 rounded-2xl bg-[#F8FAF7] border border-gray-200 space-y-3 relative">
              <span className="w-8 h-8 rounded-full bg-[#14532D] text-white flex items-center justify-center font-bold text-sm">
                1
              </span>
              <h3 className="font-bold text-gray-900 text-base">List Industrial Waste</h3>
              <p className="text-xs text-gray-600 leading-relaxed">
                Upload material photos, specify purity, volume, unit (kg, tonnes, L) and location. AI assists with automatic classification.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#F8FAF7] border border-gray-200 space-y-3 relative">
              <span className="w-8 h-8 rounded-full bg-[#10B981] text-forest-950 font-bold text-sm">
                2
              </span>
              <h3 className="font-bold text-gray-900 text-base">AI Smart Matching</h3>
              <p className="text-xs text-gray-600 leading-relaxed">
                Our algorithm matches buyers based on volume capacity, target budget, and geographic proximity to reduce transport freight.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#F8FAF7] border border-gray-200 space-y-3 relative">
              <span className="w-8 h-8 rounded-full bg-[#14532D] text-white flex items-center justify-center font-bold text-sm">
                3
              </span>
              <h3 className="font-bold text-gray-900 text-base">Negotiate & Lock Deal</h3>
              <p className="text-xs text-gray-600 leading-relaxed">
                Submit inquiries, negotiate counteroffers directly, and generate purchase orders with transparent GST terms.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#F8FAF7] border border-gray-200 space-y-3 relative">
              <span className="w-8 h-8 rounded-full bg-[#10B981] text-forest-950 font-bold text-sm">
                4
              </span>
              <h3 className="font-bold text-gray-900 text-base">Coordinated Dispatch</h3>
              <p className="text-xs text-gray-600 leading-relaxed">
                Track pickup dates, weighbridge slips, and delivery confirmation with real-time audit milestones and sustainability metrics.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald">
            Industry Endorsements
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900">
            Trusted by Indian Recyclers & Manufacturers
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl bg-white border border-gray-200 shadow-sm space-y-4">
            <p className="text-xs text-gray-600 italic leading-relaxed">
              &ldquo;We used to dispose of our PET trims to local scrap cartels at erratic prices. Through Waste2Worth, we connect directly with fiber extruders in Panipat and get ₹4/kg higher recovery on every batch.&rdquo;
            </p>
            <div className="flex items-center gap-3 pt-2 border-t border-gray-100">
              <img
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80"
                alt="Rajesh Sharma"
                className="w-10 h-10 rounded-full object-cover"
              />
              <div>
                <p className="font-bold text-xs text-gray-900">Rajesh Sharma</p>
                <p className="text-[11px] text-gray-500">Sharma Polymers, Delhi</p>
              </div>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-gray-200 shadow-sm space-y-4">
            <p className="text-xs text-gray-600 italic leading-relaxed">
              &ldquo;Finding consistent OCC cardboard bales with verified moisture levels was a recurring hurdle for our packaging mill. The AI smart matching pairs us with certified industrial suppliers within a 60km radius.&rdquo;
            </p>
            <div className="flex items-center gap-3 pt-2 border-t border-gray-100">
              <img
                src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100&auto=format&fit=crop&q=80"
                alt="Ananya Deshmukh"
                className="w-10 h-10 rounded-full object-cover"
              />
              <div>
                <p className="font-bold text-xs text-gray-900">Ananya Deshmukh</p>
                <p className="text-[11px] text-gray-500">Deshmukh EcoPackaging, Noida</p>
              </div>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-gray-200 shadow-sm space-y-4">
            <p className="text-xs text-gray-600 italic leading-relaxed">
              &ldquo;As a foundry, metal purity is paramount. The clear specification sheets, alloy certificates, and transparent tracking have made secondary aluminium procurement predictable and auditable.&rdquo;
            </p>
            <div className="flex items-center gap-3 pt-2 border-t border-gray-100">
              <img
                src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=80"
                alt="Vikram Singhania"
                className="w-10 h-10 rounded-full object-cover"
              />
              <div>
                <p className="font-bold text-xs text-gray-900">Vikram Singhania</p>
                <p className="text-[11px] text-gray-500">Singhania Metal Works, Faridabad</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FINAL CALL TO ACTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-[#14532D] p-8 sm:p-14 text-white text-center space-y-6 relative overflow-hidden shadow-2xl">
          <div className="relative z-10 max-w-2xl mx-auto space-y-4">
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight">
              Ready to Turn Industrial Scrap into Sustainable Value?
            </h2>
            <p className="text-forest-100 text-sm sm:text-base leading-relaxed">
              Join hundreds of manufacturers, recyclers, and raw material purchasers transforming industrial supply chains across India.
            </p>
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link
                href="/register"
                className="w-full sm:w-auto px-8 py-3.5 bg-emerald hover:bg-emerald-400 text-forest-950 font-extrabold text-sm rounded-xl shadow-lg transition-all"
              >
                Register Your Business Free
              </Link>
              <Link
                href="/marketplace"
                className="w-full sm:w-auto px-8 py-3.5 bg-forest-800 hover:bg-forest-700 text-white font-bold text-sm rounded-xl border border-forest-600 transition-all"
              >
                Browse All Waste Listings
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
