import React from 'react';
import Link from 'next/link';
import { Recycle, Target, Globe2, ShieldCheck, HeartHandshake, ArrowRight } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="space-y-16 py-12">
      {/* Hero */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-forest-100 text-xs font-bold text-[#14532D]">
          <Recycle className="w-4 h-4 text-emerald" /> Our Mission
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-gray-900 tracking-tight">
          Pioneering India’s Industrial Resource Recovery
        </h1>
        <p className="text-sm sm:text-base text-gray-600 max-w-2xl mx-auto leading-relaxed">
          Over 62 million tonnes of industrial waste is generated in India annually. Waste2Worth was built to ensure that no recyclable, reprocessable, or surplus material ever ends up in a landfill.
        </p>
      </section>

      {/* Vision & Problem */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="space-y-4">
            <span className="text-xs uppercase font-bold text-emerald tracking-wider">The Challenge</span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900">
              The Broken Informal Scrap Trade
            </h2>
            <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
              Industrial scrap transactions have historically relied on informal intermediaries, lack of weight transparency, opaque pricing, delayed payments, and unverified environmental compliance.
            </p>
            <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
              Factories struggle to realize the true salvage value of their surplus plastics, cardboard, or non-ferrous metals, while manufacturing recyclers battle inconsistent feedstocks and erratic material purity.
            </p>
          </div>

          <div className="p-8 rounded-3xl bg-white border border-gray-200 shadow-sm space-y-4">
            <span className="text-xs uppercase font-bold text-[#14532D] tracking-wider">The Waste2Worth Solution</span>
            <h3 className="text-xl font-bold text-gray-900">
              Auditable, Digital Circularity
            </h3>
            <p className="text-xs text-gray-600 leading-relaxed">
              We empower verified MSMEs and large manufacturers to discover counterparties through structured specification sheets, AI-driven matching, transparent INR price benchmarks, and end-to-end logistics tracking.
            </p>
            <div className="pt-2 grid grid-cols-2 gap-3 text-xs">
              <div className="p-3 bg-forest-50 rounded-xl">
                <p className="font-bold text-[#14532D]">Transparent Escrow</p>
                <p className="text-gray-500 text-[11px]">Fair pricing without middlemen margins.</p>
              </div>
              <div className="p-3 bg-forest-50 rounded-xl">
                <p className="font-bold text-[#14532D]">Zero Guesswork</p>
                <p className="text-gray-500 text-[11px]">Laboratory specs & certified lots.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900">Our Core Principles</h2>
          <p className="text-xs text-gray-500">How we design and operate the Waste2Worth ecosystem.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl bg-white border border-gray-200 text-center space-y-3">
            <div className="w-12 h-12 bg-forest-100 text-[#14532D] rounded-xl flex items-center justify-center mx-auto">
              <Target className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-gray-900">Radical Price Transparency</h3>
            <p className="text-xs text-gray-600 leading-relaxed">
              Eliminate arbitrary scrap markups. Real-time rates per kg and tonne reflect true market utility.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-gray-200 text-center space-y-3">
            <div className="w-12 h-12 bg-emerald-100 text-emerald-800 rounded-xl flex items-center justify-center mx-auto">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-gray-900">Verifiable Compliance</h3>
            <p className="text-xs text-gray-600 leading-relaxed">
              Rigorous KYC verification ensures that every buyer and seller has proper GST and statutory registrations.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-gray-200 text-center space-y-3">
            <div className="w-12 h-12 bg-forest-100 text-[#14532D] rounded-xl flex items-center justify-center mx-auto">
              <Globe2 className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-gray-900">Tangible Environmental ROI</h3>
            <p className="text-xs text-gray-600 leading-relaxed">
              Every completed transaction directly reports verified diverted tonnage and secondary raw material reuse.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-4xl mx-auto px-4 text-center space-y-4">
        <h2 className="text-2xl font-bold text-gray-900">Join the Circular Network</h2>
        <p className="text-xs text-gray-500">
          Whether you produce 200 kg of electronic scrap or 50 tonnes of baled kraft cardboard weekly, there is a verified buyer waiting.
        </p>
        <Link
          href="/register"
          className="inline-flex items-center gap-2 px-6 py-3 bg-[#14532D] text-white text-xs font-bold rounded-xl shadow hover:bg-forest-800 transition-colors"
        >
          Register Your Facility <ArrowRight className="w-4 h-4" />
        </Link>
      </section>
    </div>
  );
}
