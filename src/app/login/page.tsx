'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { UserRole } from '@/types';
import {
  Recycle,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Building2,
  Lock,
  Mail,
  UserCheck,
} from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const { login, switchRole } = useAuth();

  const [email, setEmail] = useState('seller@waste2worth.demo');
  const [password, setPassword] = useState('demo1234');
  const [role, setRole] = useState<UserRole>('seller');

  const demoAccounts: {
    role: UserRole;
    name: string;
    business: string;
    email: string;
    desc: string;
  }[] = [
    {
      role: 'seller',
      name: 'Rajesh Sharma',
      business: 'Sharma Polymers & Recyclers',
      email: 'seller@waste2worth.demo',
      desc: 'Seller: Add, manage and sell industrial scrap lots',
    },
    {
      role: 'buyer',
      name: 'Ananya Deshmukh',
      business: 'Deshmukh EcoPackaging Ltd',
      email: 'buyer@waste2worth.demo',
      desc: 'Buyer: Browse materials, send offers, track orders',
    },
    {
      role: 'both',
      name: 'Vikram Singhania',
      business: 'Singhania Metal & Fab Works',
      email: 'both@waste2worth.demo',
      desc: 'Dual: Foundry trading scrap & buying raw inputs',
    },
    {
      role: 'admin',
      name: 'Waste2Worth Ops',
      business: 'Platform Governance',
      email: 'admin@waste2worth.demo',
      desc: 'Admin: Verify business KYC & moderate marketplace',
    },
  ];

  const handleQuickLogin = (demoRole: UserRole) => {
    switchRole(demoRole);
    if (demoRole === 'admin') {
      router.push('/admin');
    } else {
      router.push('/dashboard');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login(email, role);
    if (role === 'admin') {
      router.push('/admin');
    } else {
      router.push('/dashboard');
    }
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#14532D] to-[#10B981] text-white flex items-center justify-center mx-auto shadow-md">
            <Recycle className="w-7 h-7" />
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight">
            Sign in to Waste2Worth
          </h2>
          <p className="text-xs text-gray-500">
            Select a verified demo account or sign in with your business credentials
          </p>
        </div>

        {/* Demo Fast Login Box */}
        <div className="bg-forest-50 border border-forest-200 rounded-2xl p-5 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-[#14532D] uppercase tracking-wider flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5 text-emerald" /> One-Click Demo Access
            </span>
            <span className="text-[10px] font-bold bg-[#10B981] text-forest-950 px-2 py-0.5 rounded">
              Instant
            </span>
          </div>
          <div className="grid grid-cols-2 gap-2">
            {demoAccounts.map((account) => (
              <button
                key={account.role}
                type="button"
                onClick={() => handleQuickLogin(account.role)}
                className="text-left p-2.5 bg-white hover:bg-forest-100 rounded-xl border border-forest-100 transition-all shadow-2xs group"
              >
                <p className="font-bold text-xs text-gray-900 capitalize group-hover:text-[#14532D]">
                  {account.role} Account
                </p>
                <p className="text-[10px] text-gray-500 truncate">{account.business}</p>
              </button>
            ))}
          </div>
        </div>

        {/* Manual Form */}
        <form onSubmit={handleSubmit} className="bg-white p-6 sm:p-8 rounded-3xl border border-gray-200 shadow-sm space-y-4">
          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">
              Corporate Email Address
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-gray-300 focus:ring-2 focus:ring-emerald focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">
              Password
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-gray-300 focus:ring-2 focus:ring-emerald focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">
              Active Operational Role
            </label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value as UserRole)}
              className="w-full px-3 py-2 text-xs rounded-xl border border-gray-300 focus:ring-2 focus:ring-emerald focus:outline-none capitalize"
            >
              <option value="seller">Seller (Sharma Polymers)</option>
              <option value="buyer">Buyer (Deshmukh EcoPackaging)</option>
              <option value="both">Both Buyer & Seller (Singhania Metals)</option>
              <option value="admin">Admin (Platform Ops)</option>
            </select>
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-[#14532D] hover:bg-forest-800 text-white font-bold text-xs rounded-xl shadow-md transition-all flex items-center justify-center gap-1.5"
          >
            <span>Sign In to Dashboard</span>
            <ArrowRight className="w-3.5 h-3.5 text-emerald" />
          </button>

          <p className="text-center text-xs text-gray-500 pt-2">
            New to Waste2Worth?{' '}
            <Link href="/register" className="text-[#14532D] font-bold hover:underline">
              Register your business
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
