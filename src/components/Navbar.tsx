'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import NotificationDropdown from './NotificationDropdown';
import {
  Recycle,
  PlusCircle,
  LayoutDashboard,
  ShieldCheck,
  Heart,
  MessageSquare,
  Package,
  Layers,
  Menu,
  X,
  User as UserIcon,
  ChevronDown,
  LogOut,
  Building2,
} from 'lucide-react';

export default function Navbar() {
  const pathname = usePathname();
  const { user, role, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/marketplace', label: 'Marketplace' },
    { href: '/how-it-works', label: 'How It Works' },
    { href: '/sustainability', label: 'Sustainability' },
    { href: '/about', label: 'About' },
  ];

  const isActive = (path: string) => {
    if (path === '/' && pathname !== '/') return false;
    return pathname.startsWith(path);
  };

  return (
    <nav className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#14532D] to-[#10B981] flex items-center justify-center text-white shadow-md group-hover:scale-105 transition-transform">
              <Recycle className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <span className="font-extrabold text-xl tracking-tight text-[#14532D]">
                Waste<span className="text-[#10B981]">2</span>Worth
              </span>
              <span className="block text-[10px] uppercase font-bold tracking-widest text-gray-500">
                Circular B2B Exchange
              </span>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <div className="hidden lg:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-semibold transition-colors py-1 relative ${
                  isActive(link.href)
                    ? 'text-[#14532D] border-b-2 border-[#10B981]'
                    : 'text-gray-600 hover:text-[#14532D]'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Right Action Icons & Profile */}
          <div className="hidden md:flex items-center gap-3">
            {/* CTA Sell Your Waste */}
            <Link
              href="/dashboard/add-listing"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold text-white bg-[#14532D] hover:bg-[#15803d] rounded-lg shadow-sm hover:shadow transition-all"
            >
              <PlusCircle className="w-4 h-4 text-[#10B981]" />
              Sell Your Waste
            </Link>

            {/* Wishlist Link */}
            <Link
              href="/dashboard/wishlist"
              className="p-2 text-gray-600 hover:text-emerald hover:bg-forest-50 rounded-full transition-colors"
              title="Saved Materials"
            >
              <Heart className="w-5 h-5" />
            </Link>

            {/* Messages Link */}
            <Link
              href="/dashboard/messages"
              className="p-2 text-gray-600 hover:text-emerald hover:bg-forest-50 rounded-full transition-colors"
              title="Messages"
            >
              <MessageSquare className="w-5 h-5" />
            </Link>

            {/* Notification Dropdown */}
            <NotificationDropdown />

            {/* User Profile / Dashboard Menu */}
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  className="flex items-center gap-2 pl-2 pr-3 py-1.5 rounded-full border border-gray-200 hover:border-[#10B981] transition-all bg-white"
                >
                  <img
                    src={user.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80'}
                    alt={user.name}
                    className="w-7 h-7 rounded-full object-cover ring-2 ring-[#10B981]/30"
                  />
                  <div className="text-left text-xs leading-tight hidden xl:block">
                    <p className="font-bold text-gray-900 truncate max-w-[110px]">{user.name.split(' ')[0]}</p>
                    <p className="text-[10px] text-gray-500 capitalize">{role}</p>
                  </div>
                  <ChevronDown className="w-3.5 h-3.5 text-gray-400" />
                </button>

                {userDropdownOpen && (
                  <div
                    onMouseLeave={() => setUserDropdownOpen(false)}
                    className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-xl border border-gray-100 py-2 z-50 text-xs animate-in fade-in slide-in-from-top-2"
                  >
                    <div className="px-4 py-3 border-b border-gray-100 bg-[#F8FAF7]">
                      <p className="font-bold text-gray-900 text-sm truncate">{user.name}</p>
                      <p className="text-gray-500 truncate flex items-center gap-1 mt-0.5">
                        <Building2 className="w-3 h-3 text-gray-400" /> {user.businessName}
                      </p>
                      <div className="flex items-center gap-1.5 mt-2">
                        <span className="capitalize px-2 py-0.5 rounded text-[10px] font-semibold bg-forest-100 text-[#14532D]">
                          {user.role} role
                        </span>
                        {user.verificationStatus === 'verified' && (
                          <span className="inline-flex items-center gap-0.5 text-emerald font-semibold text-[10px]">
                            <ShieldCheck className="w-3 h-3" /> KYC Verified
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="py-1">
                      <Link
                        href="/dashboard"
                        onClick={() => setUserDropdownOpen(false)}
                        className="flex items-center gap-2.5 px-4 py-2 hover:bg-forest-50 text-gray-700 font-medium"
                      >
                        <LayoutDashboard className="w-4 h-4 text-[#14532D]" /> Dashboard Overview
                      </Link>
                      <Link
                        href="/dashboard/buyer"
                        onClick={() => setUserDropdownOpen(false)}
                        className="flex items-center gap-2.5 px-4 py-2 hover:bg-forest-50 text-gray-700 font-medium"
                      >
                        <Layers className="w-4 h-4 text-emerald" /> Buyer Center & Matching
                      </Link>
                      <Link
                        href="/dashboard/seller"
                        onClick={() => setUserDropdownOpen(false)}
                        className="flex items-center gap-2.5 px-4 py-2 hover:bg-forest-50 text-gray-700 font-medium"
                      >
                        <Building2 className="w-4 h-4 text-[#14532D]" /> Seller Analytics
                      </Link>
                      <Link
                        href="/dashboard/listings"
                        onClick={() => setUserDropdownOpen(false)}
                        className="flex items-center gap-2.5 px-4 py-2 hover:bg-forest-50 text-gray-700 font-medium"
                      >
                        <Package className="w-4 h-4 text-emerald" /> My Inventory & Listings
                      </Link>
                      <Link
                        href="/dashboard/orders"
                        onClick={() => setUserDropdownOpen(false)}
                        className="flex items-center gap-2.5 px-4 py-2 hover:bg-forest-50 text-gray-700 font-medium"
                      >
                        <Package className="w-4 h-4 text-forest-700" /> Orders & Logistics
                      </Link>
                      <Link
                        href="/dashboard/inquiries"
                        onClick={() => setUserDropdownOpen(false)}
                        className="flex items-center gap-2.5 px-4 py-2 hover:bg-forest-50 text-gray-700 font-medium"
                      >
                        <MessageSquare className="w-4 h-4 text-blue-600" /> Inquiries & Offers
                      </Link>
                      <Link
                        href="/dashboard/profile"
                        onClick={() => setUserDropdownOpen(false)}
                        className="flex items-center gap-2.5 px-4 py-2 hover:bg-forest-50 text-gray-700 font-medium"
                      >
                        <UserIcon className="w-4 h-4 text-gray-500" /> Business Profile & KYC
                      </Link>
                      {role === 'admin' && (
                        <Link
                          href="/admin"
                          onClick={() => setUserDropdownOpen(false)}
                          className="flex items-center gap-2.5 px-4 py-2 hover:bg-amber-50 text-amber-900 font-bold border-t border-gray-100"
                        >
                          <ShieldCheck className="w-4 h-4 text-amber-600" /> Admin Moderation Panel
                        </Link>
                      )}
                    </div>

                    <div className="pt-1 border-t border-gray-100">
                      <button
                        onClick={() => {
                          logout();
                          setUserDropdownOpen(false);
                        }}
                        className="flex items-center gap-2.5 px-4 py-2 w-full text-left text-red-600 hover:bg-red-50 font-medium"
                      >
                        <LogOut className="w-4 h-4" /> Sign Out
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link
                  href="/login"
                  className="px-3 py-1.5 text-xs font-semibold text-gray-700 hover:text-[#14532D]"
                >
                  Sign In
                </Link>
                <Link
                  href="/register"
                  className="px-3 py-1.5 text-xs font-bold text-white bg-[#14532D] hover:bg-[#10B981] rounded-lg transition-colors"
                >
                  Register
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu hamburger */}
          <div className="flex items-center md:hidden gap-2">
            <NotificationDropdown />
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-gray-700 hover:text-[#14532D] rounded-lg"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-gray-200 bg-white px-4 pt-3 pb-6 space-y-3 shadow-lg">
          <div className="space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`block px-3 py-2 rounded-lg text-sm font-semibold ${
                  isActive(link.href)
                    ? 'bg-forest-100 text-[#14532D]'
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="pt-3 border-t border-gray-100 space-y-1 text-sm font-medium">
            <Link
              href="/dashboard"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-2 px-3 py-2 text-gray-800 hover:bg-forest-50 rounded-lg"
            >
              <LayoutDashboard className="w-4 h-4 text-[#14532D]" /> Dashboard
            </Link>
            <Link
              href="/dashboard/buyer"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-2 px-3 py-2 text-gray-800 hover:bg-forest-50 rounded-lg"
            >
              <Layers className="w-4 h-4 text-emerald" /> Buyer Center
            </Link>
            <Link
              href="/dashboard/seller"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-2 px-3 py-2 text-gray-800 hover:bg-forest-50 rounded-lg"
            >
              <Building2 className="w-4 h-4 text-[#14532D]" /> Seller Dashboard
            </Link>
            <Link
              href="/dashboard/add-listing"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-2 px-3 py-2 text-[#14532D] font-bold bg-forest-50 rounded-lg"
            >
              <PlusCircle className="w-4 h-4 text-emerald" /> Sell Your Waste
            </Link>
            <Link
              href="/dashboard/orders"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-2 px-3 py-2 text-gray-800 hover:bg-forest-50 rounded-lg"
            >
              <Package className="w-4 h-4 text-forest-700" /> Orders & Tracking
            </Link>
            <Link
              href="/dashboard/messages"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-2 px-3 py-2 text-gray-800 hover:bg-forest-50 rounded-lg"
            >
              <MessageSquare className="w-4 h-4 text-blue-600" /> Messages
            </Link>
            <Link
              href="/dashboard/wishlist"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-2 px-3 py-2 text-gray-800 hover:bg-forest-50 rounded-lg"
            >
              <Heart className="w-4 h-4 text-red-500" /> Saved Wishlist
            </Link>
            <Link
              href="/dashboard/profile"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-2 px-3 py-2 text-gray-800 hover:bg-forest-50 rounded-lg"
            >
              <UserIcon className="w-4 h-4 text-gray-600" /> Business KYC & Profile
            </Link>
            {role === 'admin' && (
              <Link
                href="/admin"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-2 px-3 py-2 text-amber-900 font-bold bg-amber-50 rounded-lg"
              >
                <ShieldCheck className="w-4 h-4 text-amber-600" /> Admin Panel
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
