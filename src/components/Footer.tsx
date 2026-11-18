import React from 'react';
import Link from 'next/link';
import { Recycle, Mail, Phone, MapPin, ShieldCheck, Leaf, ArrowUpRight } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#14532D] text-white border-t border-forest-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand Column */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald to-forest-500 flex items-center justify-center text-forest-950 font-bold shadow-md">
                <Recycle className="w-6 h-6 text-white" />
              </div>
              <span className="font-extrabold text-2xl tracking-tight text-white">
                Waste<span className="text-[#10B981]">2</span>Worth
              </span>
            </div>
            <p className="text-forest-100 text-sm max-w-sm leading-relaxed">
              India’s premier AI-powered B2B industrial waste exchange marketplace. Turning factory surplus, scrap, and by-products into high-value raw material inputs for a circular economy.
            </p>
            <div className="pt-2 flex items-center gap-2 text-xs text-forest-200">
              <ShieldCheck className="w-4 h-4 text-emerald" />
              <span>CPCB & State Pollution Board Aligned Framework</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-forest-200">
              <MapPin className="w-4 h-4 text-emerald" />
              <span>Primary Nodes: Delhi NCR, Kanpur, Faridabad, Ghaziabad, Agra</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-emerald font-bold text-sm tracking-wider uppercase">Marketplace</h4>
            <ul className="space-y-2 text-sm text-forest-100">
              <li>
                <Link href="/marketplace?category=Plastic" className="hover:text-white transition-colors">
                  Recycled Plastics (PET, HDPE)
                </Link>
              </li>
              <li>
                <Link href="/marketplace?category=Metal" className="hover:text-white transition-colors">
                  Non-Ferrous & Ferrous Metals
                </Link>
              </li>
              <li>
                <Link href="/marketplace?category=Cardboard" className="hover:text-white transition-colors">
                  Industrial Baled OCC
                </Link>
              </li>
              <li>
                <Link href="/marketplace?category=Textile" className="hover:text-white transition-colors">
                  Cotton & Yarn Cuttings
                </Link>
              </li>
              <li>
                <Link href="/marketplace?category=Wood" className="hover:text-white transition-colors">
                  Wooden Euro Pallets
                </Link>
              </li>
              <li>
                <Link href="/marketplace" className="text-emerald font-semibold hover:underline inline-flex items-center gap-1">
                  View All Materials <ArrowUpRight className="w-3 h-3" />
                </Link>
              </li>
            </ul>
          </div>

          {/* Platform Navigation */}
          <div className="space-y-3">
            <h4 className="text-emerald font-bold text-sm tracking-wider uppercase">Platform</h4>
            <ul className="space-y-2 text-sm text-forest-100">
              <li>
                <Link href="/how-it-works" className="hover:text-white transition-colors">
                  How It Works
                </Link>
              </li>
              <li>
                <Link href="/sustainability" className="hover:text-white transition-colors">
                  Sustainability Metrics
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-white transition-colors">
                  About Us & Vision
                </Link>
              </li>
              <li>
                <Link href="/dashboard" className="hover:text-white transition-colors">
                  Supplier Dashboard
                </Link>
              </li>
              <li>
                <Link href="/admin" className="hover:text-white transition-colors">
                  Admin Verification Portal
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact & Support */}
          <div className="space-y-3">
            <h4 className="text-emerald font-bold text-sm tracking-wider uppercase">Corporate Office</h4>
            <div className="space-y-2.5 text-xs text-forest-100 leading-relaxed">
              <p className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-emerald shrink-0 mt-0.5" />
                <span>Barakhamba Road, Connaught Place, New Delhi, 110001, India</span>
              </p>
              <p className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-emerald shrink-0" />
                <span>+91 11 4050 6070 (Toll Free)</span>
              </p>
              <p className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-emerald shrink-0" />
                <span>partner@waste2worth.demo</span>
              </p>
              <div className="pt-2">
                <span className="inline-block bg-forest-800 text-forest-100 text-[11px] px-2.5 py-1 rounded border border-forest-700">
                  Currency: INR (₹)
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Fictional Demonstration Notice & Copyright */}
        <div className="mt-12 pt-6 border-t border-forest-800 flex flex-col md:flex-row items-center justify-between text-xs text-forest-200 gap-4">
          <p className="flex items-center gap-1.5 text-center md:text-left">
            <Leaf className="w-4 h-4 text-emerald" />
            <span>
              <strong>Demonstration Notice:</strong> Waste2Worth is an educational, interactive B2B MVP prototype. Prices, listings, and transactions shown are realistic simulated demonstration data.
            </span>
          </p>
          <p className="shrink-0 text-center md:text-right">
            © {new Date().getFullYear()} Waste2Worth Technologies Private Limited. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
