import React from 'react';
import Link from 'next/link';
import {
  Recycle,
  Sparkles,
  ShieldCheck,
  Truck,
  ArrowRight,
  Scale,
  FileCheck2,
  CheckCircle2,
  Building2,
  TrendingUp,
} from 'lucide-react';

export default function HowItWorksPage() {
  const steps = [
    {
      num: '01',
      title: 'List Industrial Waste with AI Assistance',
      subtitle: 'Fast, standardized material listing in minutes',
      desc: 'Sellers upload photos of scrap, offcuts, or by-products. Our rule-based AI classifier recommends the material classification, estimated title, technical specifications, and Indian price ranges. Specify lot size in kg, tonnes, litres, or pieces.',
      features: ['Image-guided specification', 'Custom chemical/physical parameters', 'Disaster-proof local storage'],
      icon: Sparkles,
    },
    {
      num: '02',
      title: 'Algorithmic Smart Buyer Matching',
      subtitle: 'Hyper-local & category-driven buyer discovery',
      desc: 'Instead of waiting for scrap dealers, Waste2Worth calculates real-time compatibility scores for verified industrial buyers based on required volume, price threshold, and transportation cluster proximity (NCR, Western UP, Haryana corridors).',
      features: ['Mathematically calculated match scores', 'Zero arbitrary random metrics', 'Reduced inter-state logistics costs'],
      icon: Recycle,
    },
    {
      num: '03',
      title: 'Transparent Offer & Negotiation System',
      subtitle: 'Direct B2B negotiations without middlemen deductions',
      desc: 'Buyers submit purchase offers specifying required quantities and bid rates per unit. Sellers can accept, decline, or counteroffer. Upon mutual agreement, a formal purchase order is generated with full tracking milestones.',
      features: ['Counteroffer workflow', 'Immediate quantity inventory deduction', 'Audit-ready transaction records'],
      icon: Scale,
    },
    {
      num: '04',
      title: 'Pickup Scheduling & Weighbridge Audit',
      subtitle: 'Streamlined logistics & material handover',
      desc: 'After acceptance, seller and buyer agree on a pickup window. The seller marks materials ready at warehouse, weighbridge slips are logged, and delivery confirmation closes the loop, adding to platform circularity metrics.',
      features: ['8-stage order tracking timeline', 'Pickup date scheduler', 'Delivery confirmation verification'],
      icon: Truck,
    },
  ];

  return (
    <div className="space-y-16 py-12">
      {/* Header */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-forest-100 text-xs font-bold text-[#14532D]">
          <Recycle className="w-4 h-4 text-emerald" /> Operational Architecture
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-gray-900 tracking-tight">
          How Waste2Worth Powers India’s Industrial Circular Economy
        </h1>
        <p className="text-sm sm:text-base text-gray-600 max-w-2xl mx-auto leading-relaxed">
          From unorganized scrap yards to a structured, digital, and auditable B2B materials exchange platform.
        </p>
      </section>

      {/* Step by step cards */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-8">
          {steps.map((s, idx) => {
            const Icon = s.icon;
            const isEven = idx % 2 === 1;

            return (
              <div
                key={s.num}
                className={`flex flex-col lg:flex-row items-center gap-8 p-8 rounded-3xl bg-white border border-gray-200 shadow-sm hover:border-emerald transition-all ${
                  isEven ? 'lg:flex-row-reverse' : ''
                }`}
              >
                <div className="w-full lg:w-1/2 space-y-4">
                  <div className="flex items-center gap-3">
                    <span className="text-3xl font-black text-[#10B981]">{s.num}</span>
                    <span className="text-xs font-bold uppercase tracking-wider text-gray-400">
                      Phase {idx + 1}
                    </span>
                  </div>
                  <h2 className="text-2xl font-black text-gray-900">{s.title}</h2>
                  <p className="text-xs font-semibold text-emerald">{s.subtitle}</p>
                  <p className="text-sm text-gray-600 leading-relaxed">{s.desc}</p>
                  <div className="space-y-2 pt-2">
                    {s.features.map((feat, fidx) => (
                      <div key={fidx} className="flex items-center gap-2 text-xs text-gray-700">
                        <CheckCircle2 className="w-4 h-4 text-emerald shrink-0" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="w-full lg:w-1/2 bg-[#F8FAF7] rounded-2xl p-8 border border-gray-100 flex items-center justify-center">
                  <div className="w-24 h-24 rounded-3xl bg-[#14532D] text-white flex items-center justify-center shadow-xl">
                    <Icon className="w-12 h-12 text-emerald" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Business Verification Highlight */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-forest-900 text-white p-8 sm:p-12 space-y-6 border border-forest-800 shadow-xl">
          <div className="max-w-3xl space-y-3">
            <span className="text-xs uppercase font-bold text-emerald tracking-wider flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald" /> Audited Governance
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold">
              Strict KYC and Business Verification System
            </h2>
            <p className="text-xs sm:text-sm text-forest-100 leading-relaxed">
              Every participating industrial enterprise can apply for verification by submitting their GSTIN, factory license, or State Pollution Control Board consents. Administrators audit documents before issuing the verified trust badge.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2 text-xs">
            <div className="p-4 rounded-xl bg-forest-800 border border-forest-700 space-y-1">
              <p className="font-bold text-white">GSTIN Validation</p>
              <p className="text-forest-200 text-[11px]">Cross-checked with corporate registration tax records.</p>
            </div>
            <div className="p-4 rounded-xl bg-forest-800 border border-forest-700 space-y-1">
              <p className="font-bold text-white">CPCB Manifest Alignment</p>
              <p className="text-forest-200 text-[11px]">Supports Form-6 manifests for hazardous & electronic waste.</p>
            </div>
            <div className="p-4 rounded-xl bg-forest-800 border border-forest-700 space-y-1">
              <p className="font-bold text-white">Trust Badge Integrity</p>
              <p className="text-forest-200 text-[11px]">Badge appears across cards and gives priority ranking.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-4xl mx-auto px-4 text-center space-y-4">
        <h2 className="text-2xl font-bold text-gray-900">Experience the Marketplace Now</h2>
        <p className="text-xs text-gray-500">
          Try the demo right now — no external setup required. Switch between Buyer and Seller roles anytime.
        </p>
        <div className="flex items-center justify-center gap-3 pt-2">
          <Link
            href="/marketplace"
            className="px-6 py-3 bg-[#14532D] text-white text-xs font-bold rounded-xl shadow hover:bg-forest-800 transition-colors"
          >
            Explore Waste Listings
          </Link>
          <Link
            href="/dashboard/add-listing"
            className="px-6 py-3 bg-white text-[#14532D] border border-gray-300 text-xs font-bold rounded-xl hover:bg-gray-50 transition-colors"
          >
            Post Material
          </Link>
        </div>
      </section>
    </div>
  );
}
