'use client';

import React, { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { StorageService } from '@/lib/storage';
import {
  Building2,
  ShieldCheck,
  FileText,
  Upload,
  CheckCircle2,
  AlertCircle,
  MapPin,
  Clock,
  Save,
  FileCheck2,
} from 'lucide-react';

export default function BusinessProfilePage() {
  const { user, updateUser, submitVerification } = useAuth();

  const [businessName, setBusinessName] = useState(user?.businessName || '');
  const [name, setName] = useState(user?.name || '');
  const [phone, setPhone] = useState(user?.phone || '');
  const [businessType, setBusinessType] = useState(user?.businessType || 'Plastic Recycler & Extruder');
  const [location, setLocation] = useState(user?.location || 'Delhi');
  const [pinCode, setPinCode] = useState(user?.pinCode || '110020');
  const [businessAddress, setBusinessAddress] = useState(
    user?.businessAddress || 'Plot 44, Okhla Industrial Area Phase III, New Delhi'
  );
  const [profileSaved, setProfileSaved] = useState(false);

  // Verification Application Form
  const [gstin, setGstin] = useState(user?.gstNumber || '07AAACS1429B1ZB');
  const [selectedDocs, setSelectedDocs] = useState([
    { name: 'GST_Registration_Certificate.pdf', size: '1.4 MB', status: 'ready' },
    { name: 'State_Pollution_Control_Board_CTE.pdf', size: '2.8 MB', status: 'ready' },
  ]);
  const [verificationSubmitted, setVerificationSubmitted] = useState(false);

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    updateUser({
      businessName,
      name,
      phone,
      businessType,
      location,
      pinCode,
      businessAddress,
    });
    setProfileSaved(true);
    setTimeout(() => setProfileSaved(false), 2000);
  };

  const handleApplyVerification = (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    submitVerification({
      userId: user.id,
      businessName: businessName || user.businessName,
      gstin,
      businessAddress,
      contactPerson: name || user.name,
      phone: phone || user.phone,
      documents: selectedDocs,
    });

    setVerificationSubmitted(true);
  };

  const verificationStatus = user?.verificationStatus || 'unverified';

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 sm:p-8 rounded-3xl border border-gray-200 shadow-sm">
        <div>
          <span className="text-xs uppercase font-bold text-emerald tracking-wider flex items-center gap-1">
            <Building2 className="w-3.5 h-3.5 text-emerald" /> Entity Governance
          </span>
          <h1 className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight mt-0.5">
            Business Profile & KYC Verification
          </h1>
          <p className="text-xs text-gray-500">
            Maintain your industrial registration records, tax credentials, and statutory pollution board documents.
          </p>
        </div>

        {/* Verification Status Badge */}
        <div className="flex items-center gap-2">
          {verificationStatus === 'verified' && (
            <div className="px-4 py-2 rounded-2xl bg-forest-100 text-[#14532D] border border-forest-200 font-extrabold text-xs flex items-center gap-1.5 shadow-xs">
              <ShieldCheck className="w-5 h-5 text-emerald" />
              <span>Verified Enterprise</span>
            </div>
          )}
          {verificationStatus === 'pending' && (
            <div className="px-4 py-2 rounded-2xl bg-amber-100 text-amber-900 border border-amber-200 font-extrabold text-xs flex items-center gap-1.5 shadow-xs">
              <Clock className="w-5 h-5 text-amber-600 animate-spin" />
              <span>Verification Pending Review</span>
            </div>
          )}
          {verificationStatus === 'unverified' && (
            <div className="px-4 py-2 rounded-2xl bg-gray-100 text-gray-700 font-extrabold text-xs flex items-center gap-1.5 shadow-xs">
              <AlertCircle className="w-5 h-5 text-gray-400" />
              <span>Unverified Account</span>
            </div>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Business Profile Form (7 cols) */}
        <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 border border-gray-200 shadow-sm space-y-6 text-xs">
          <div className="border-b border-gray-100 pb-3">
            <h3 className="font-bold text-gray-900 text-base">Corporate Profile Information</h3>
            <p className="text-gray-500 text-[11px]">Visible to verified counterparties on quotes and invoices</p>
          </div>

          <form onSubmit={handleSaveProfile} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-bold text-gray-700 mb-1">Company / Entity Name</label>
                <input
                  type="text"
                  value={businessName}
                  onChange={(e) => setBusinessName(e.target.value)}
                  required
                  className="w-full px-3 py-2 rounded-xl border border-gray-300 focus:ring-2 focus:ring-emerald focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-bold text-gray-700 mb-1">Authorized Contact</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="w-full px-3 py-2 rounded-xl border border-gray-300 focus:ring-2 focus:ring-emerald focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-bold text-gray-700 mb-1">Contact Phone</label>
                <input
                  type="text"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                  className="w-full px-3 py-2 rounded-xl border border-gray-300 focus:ring-2 focus:ring-emerald focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-bold text-gray-700 mb-1">Industry Vertical</label>
                <input
                  type="text"
                  value={businessType}
                  onChange={(e) => setBusinessType(e.target.value)}
                  required
                  className="w-full px-3 py-2 rounded-xl border border-gray-300 focus:ring-2 focus:ring-emerald focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-bold text-gray-700 mb-1">Primary Operating City</label>
                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  required
                  className="w-full px-3 py-2 rounded-xl border border-gray-300 focus:ring-2 focus:ring-emerald focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-bold text-gray-700 mb-1">Postal PIN Code</label>
                <input
                  type="text"
                  value={pinCode}
                  onChange={(e) => setPinCode(e.target.value)}
                  required
                  className="w-full px-3 py-2 rounded-xl border border-gray-300 focus:ring-2 focus:ring-emerald focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block font-bold text-gray-700 mb-1">Factory / Warehouse Address</label>
              <textarea
                rows={3}
                value={businessAddress}
                onChange={(e) => setBusinessAddress(e.target.value)}
                required
                className="w-full px-3 py-2 rounded-xl border border-gray-300 focus:ring-2 focus:ring-emerald focus:outline-none resize-none leading-relaxed"
              />
            </div>

            <div className="pt-2 flex items-center justify-between">
              {profileSaved ? (
                <span className="text-emerald font-bold flex items-center gap-1">
                  <CheckCircle2 className="w-4 h-4" /> Profile Updated
                </span>
              ) : (
                <span className="text-gray-400 text-[11px]">Saved in browser LocalStorage</span>
              )}

              <button
                type="submit"
                className="px-6 py-2.5 bg-[#14532D] hover:bg-forest-800 text-white font-bold rounded-xl shadow transition-all flex items-center gap-1.5"
              >
                <Save className="w-4 h-4 text-emerald" /> Save Changes
              </button>
            </div>
          </form>
        </div>

        {/* Right Column: Business Verification Application (5 cols) */}
        <div className="lg:col-span-5 bg-white rounded-3xl p-6 sm:p-8 border border-gray-200 shadow-sm space-y-6 text-xs">
          <div className="border-b border-gray-100 pb-3">
            <h3 className="font-bold text-gray-900 text-base flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-emerald" /> Apply for Trust Badge
            </h3>
            <p className="text-gray-500 text-[11px]">
              Verified badge unlocks top search ranking and increases buyer response by 3.4x
            </p>
          </div>

          {verificationStatus === 'verified' ? (
            <div className="p-6 bg-forest-50/70 rounded-2xl border border-forest-200 text-center space-y-3">
              <div className="w-12 h-12 bg-[#14532D] text-emerald rounded-full flex items-center justify-center mx-auto shadow-md">
                <ShieldCheck className="w-7 h-7" />
              </div>
              <h4 className="font-bold text-sm text-[#14532D]">Your Business is Verified</h4>
              <p className="text-[11px] text-forest-800 leading-relaxed">
                GSTIN {user?.gstNumber || '07AAACS1429B1ZB'} is validated. All your listings prominently show the Green Verified Trust Badge.
              </p>
            </div>
          ) : (
            <form onSubmit={handleApplyVerification} className="space-y-4">
              <div>
                <label className="block font-bold text-gray-700 mb-1">
                  Goods & Services Tax Identification Number (GSTIN)
                </label>
                <input
                  type="text"
                  placeholder="e.g. 07AAACS1429B1ZB"
                  value={gstin}
                  onChange={(e) => setGstin(e.target.value.toUpperCase())}
                  required
                  className="w-full px-3 py-2 rounded-xl border border-gray-300 font-mono font-bold text-gray-900 focus:ring-2 focus:ring-emerald focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-bold text-gray-700 mb-1">
                  Simulated Supporting Documents
                </label>
                <div className="space-y-2">
                  {selectedDocs.map((doc, idx) => (
                    <div
                      key={idx}
                      className="p-3 bg-[#F8FAF7] rounded-xl border border-gray-200 flex items-center justify-between"
                    >
                      <div className="flex items-center gap-2">
                        <FileCheck2 className="w-4 h-4 text-emerald" />
                        <div>
                          <p className="font-bold text-gray-900 line-clamp-1">{doc.name}</p>
                          <span className="text-[10px] text-gray-400">{doc.size}</span>
                        </div>
                      </div>
                      <span className="text-[10px] font-bold text-emerald bg-emerald-50 px-2 py-0.5 rounded">
                        Simulated Upload
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 text-amber-900 text-[11px] leading-relaxed">
                <strong>Demo Mode Compliance:</strong> For this demonstration environment, documents are simulated. Submitting will send an application to the Admin Review Panel where you can approve or reject it.
              </div>

              {verificationSubmitted ? (
                <div className="p-3 bg-forest-100 text-[#14532D] font-bold rounded-xl text-center">
                  Application Submitted! Switch to Admin role to approve.
                </div>
              ) : (
                <button
                  type="submit"
                  className="w-full py-3 bg-[#14532D] hover:bg-forest-800 text-white font-bold rounded-xl shadow transition-all flex items-center justify-center gap-1.5"
                >
                  <ShieldCheck className="w-4 h-4 text-emerald" /> Submit Verification Request
                </button>
              )}
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
