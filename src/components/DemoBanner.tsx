'use client';

import React from 'react';
import { useAuth } from '@/context/AuthContext';
import { UserRole } from '@/types';
import { ShieldCheck, UserCheck, ArrowRightLeft, Sparkles } from 'lucide-react';
import Link from 'next/link';

export default function DemoBanner() {
  const { user, role, switchRole } = useAuth();

  const roles: { id: UserRole; label: string; desc: string }[] = [
    { id: 'seller', label: 'Seller (Sharma Polymers)', desc: 'Post waste & manage sales' },
    { id: 'buyer', label: 'Buyer (Deshmukh Packaging)', desc: 'Browse, send inquiries & order' },
    { id: 'both', label: 'Buyer & Seller (Singhania)', desc: 'Dual industrial operations' },
    { id: 'admin', label: 'Admin (Platform Ops)', desc: 'Review KYC, approve verifications' },
  ];

  return (
    <div className="bg-[#14532D] text-white border-b border-forest-800 text-xs py-2 px-4 shadow-sm">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1 bg-[#10B981] text-forest-950 font-bold px-2 py-0.5 rounded text-[11px] uppercase tracking-wide">
            <Sparkles className="w-3 h-3" /> Demo Mode
          </span>
          <span className="text-gray-200 hidden sm:inline">
            Active: <strong className="text-white">{user?.name}</strong> ({user?.businessName})
          </span>
          <span className="capitalize px-1.5 py-0.5 rounded bg-forest-800 text-forest-100 font-medium">
            Role: {role}
          </span>
          {user?.verificationStatus === 'verified' && (
            <span className="inline-flex items-center gap-0.5 text-emerald font-medium">
              <ShieldCheck className="w-3.5 h-3.5" /> Verified
            </span>
          )}
        </div>

        <div className="flex items-center gap-1.5 flex-wrap justify-center">
          <span className="text-gray-300 flex items-center gap-1 font-medium mr-1">
            <ArrowRightLeft className="w-3 h-3" /> Quick Switch:
          </span>
          {roles.map((r) => {
            const isActive = role === r.id;
            return (
              <button
                key={r.id}
                onClick={() => switchRole(r.id)}
                title={r.desc}
                className={`px-2.5 py-1 rounded transition-colors font-medium text-[11px] ${
                  isActive
                    ? 'bg-emerald text-forest-950 font-bold shadow-sm'
                    : 'bg-forest-800 hover:bg-forest-700 text-gray-200'
                }`}
              >
                {r.label.split(' ')[0]}
              </button>
            );
          })}
          {role === 'admin' && (
            <Link
              href="/admin"
              className="ml-2 bg-amber-400 text-amber-950 font-bold px-2.5 py-1 rounded hover:bg-amber-300 transition-colors"
            >
              Open Admin Panel
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
