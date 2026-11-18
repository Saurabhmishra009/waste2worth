'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { UserRole } from '@/types';
import {
  Recycle,
  Building2,
  Mail,
  Phone,
  Lock,
  MapPin,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
} from 'lucide-react';

export default function RegisterPage() {
  const router = useRouter();
  const { register } = useAuth();

  const [name, setName] = useState('');
  const [businessName, setBusinessName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [businessType, setBusinessType] = useState('Plastic Recycler & Extruder');
  const [location, setLocation] = useState('Delhi');
  const [pinCode, setPinCode] = useState('110020');
  const [role, setRole] = useState<UserRole>('seller');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    register({
      name,
      businessName,
      email,
      phone,
      businessType,
      location,
      pinCode,
      role,
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    });

    router.push('/dashboard');
  };

  return (
    <div className="max-w-2xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <div className="bg-white rounded-3xl p-6 sm:p-10 border border-gray-200 shadow-xl space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#14532D] to-[#10B981] text-white flex items-center justify-center mx-auto shadow-md">
            <Recycle className="w-7 h-7" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight">
            Register Your Industrial Enterprise
          </h1>
          <p className="text-xs text-gray-500 max-w-md mx-auto">
            Connect with verified secondary raw material processors, extruders, foundries, and paper mills across India.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          {/* Role Selection Tabs */}
          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1.5">
              Select Your Primary Commercial Role
            </label>
            <div className="grid grid-cols-3 gap-2">
              {[
                { id: 'seller', label: 'Waste Seller', desc: 'Generate & sell factory scrap' },
                { id: 'buyer', label: 'Raw Material Buyer', desc: 'Procure scrap for reprocessing' },
                { id: 'both', label: 'Both Buyer & Seller', desc: 'Dual manufacturing operations' },
              ].map((r) => (
                <button
                  key={r.id}
                  type="button"
                  onClick={() => setRole(r.id as UserRole)}
                  className={`p-3 rounded-xl border text-left transition-all ${
                    role === r.id
                      ? 'border-[#14532D] bg-forest-50/80 ring-2 ring-[#10B981]/30 font-bold'
                      : 'border-gray-200 hover:bg-gray-50'
                  }`}
                >
                  <p className="text-gray-900 font-bold text-xs">{r.label}</p>
                  <p className="text-[10px] text-gray-500 mt-0.5">{r.desc}</p>
                </button>
              ))}
            </div>
          </div>

          {/* Business & Personal Info */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            <div>
              <label className="block font-bold text-gray-700 mb-1">Authorized Contact Person</label>
              <input
                type="text"
                placeholder="e.g. Sunil Verma"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full px-3 py-2 rounded-xl border border-gray-300 focus:ring-2 focus:ring-emerald focus:outline-none"
              />
            </div>

            <div>
              <label className="block font-bold text-gray-700 mb-1">Registered Business Name</label>
              <input
                type="text"
                placeholder="e.g. Verma Extrusions Pvt Ltd"
                value={businessName}
                onChange={(e) => setBusinessName(e.target.value)}
                required
                className="w-full px-3 py-2 rounded-xl border border-gray-300 focus:ring-2 focus:ring-emerald focus:outline-none"
              />
            </div>

            <div>
              <label className="block font-bold text-gray-700 mb-1">Corporate Email</label>
              <input
                type="email"
                placeholder="sunil@vermaextrusions.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-3 py-2 rounded-xl border border-gray-300 focus:ring-2 focus:ring-emerald focus:outline-none"
              />
            </div>

            <div>
              <label className="block font-bold text-gray-700 mb-1">Phone Number</label>
              <input
                type="tel"
                placeholder="+91 98123 45678"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
                className="w-full px-3 py-2 rounded-xl border border-gray-300 focus:ring-2 focus:ring-emerald focus:outline-none"
              />
            </div>

            <div>
              <label className="block font-bold text-gray-700 mb-1">Industry Classification</label>
              <select
                value={businessType}
                onChange={(e) => setBusinessType(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-gray-300 focus:ring-2 focus:ring-emerald focus:outline-none"
              >
                <option value="Plastic Recycler & Extruder">Plastic Recycler & Extruder</option>
                <option value="Metal Foundry & Secondary Smelter">Metal Foundry & Secondary Smelter</option>
                <option value="Packaging & Paper Mill">Packaging & Paper Mill</option>
                <option value="Automotive Parts Manufacturer">Automotive Parts Manufacturer</option>
                <option value="Electronics Assembly Plant">Electronics Assembly Plant</option>
                <option value="Textile Spinning & Weaving">Textile Spinning & Weaving</option>
                <option value="Scrap Aggregator / Processor">Scrap Aggregator / Processor</option>
              </select>
            </div>

            <div>
              <label className="block font-bold text-gray-700 mb-1">Account Password</label>
              <input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-3 py-2 rounded-xl border border-gray-300 focus:ring-2 focus:ring-emerald focus:outline-none"
              />
            </div>

            <div>
              <label className="block font-bold text-gray-700 mb-1">Operational City</label>
              <select
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-gray-300 focus:ring-2 focus:ring-emerald focus:outline-none"
              >
                <option value="Delhi">Delhi</option>
                <option value="Noida">Noida</option>
                <option value="Ghaziabad">Ghaziabad</option>
                <option value="Faridabad">Faridabad</option>
                <option value="Kanpur">Kanpur</option>
                <option value="Lucknow">Lucknow</option>
                <option value="Agra">Agra</option>
                <option value="Mathura">Mathura</option>
                <option value="Mumbai">Mumbai</option>
                <option value="Pune">Pune</option>
              </select>
            </div>

            <div>
              <label className="block font-bold text-gray-700 mb-1">Postal PIN Code</label>
              <input
                type="text"
                placeholder="e.g. 110020"
                value={pinCode}
                onChange={(e) => setPinCode(e.target.value)}
                required
                className="w-full px-3 py-2 rounded-xl border border-gray-300 focus:ring-2 focus:ring-emerald focus:outline-none"
              />
            </div>
          </div>

          <div className="p-3 bg-[#F8FAF7] rounded-xl border border-gray-100 flex items-start gap-2 text-[11px] text-gray-600">
            <ShieldCheck className="w-4 h-4 text-emerald shrink-0 mt-0.5" />
            <p>
              Your business can immediately post and discover materials upon registration. You can apply for verified trust status anytime in the profile tab.
            </p>
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-[#14532D] hover:bg-forest-800 text-white font-bold text-xs rounded-xl shadow-md transition-all flex items-center justify-center gap-1.5"
          >
            <span>Create Account & Enter Platform</span>
            <ArrowRight className="w-3.5 h-3.5 text-emerald" />
          </button>

          <p className="text-center text-gray-500 pt-1">
            Already registered?{' '}
            <Link href="/login" className="text-[#14532D] font-bold hover:underline">
              Sign in with demo account
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
