'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { StorageService } from '@/lib/storage';
import { Listing } from '@/types';
import { useAuth } from '@/context/AuthContext';
import {
  MapPin,
  ShieldCheck,
  Heart,
  Scale,
  Truck,
  Building2,
  Calendar,
  Send,
  MessageSquare,
  ArrowLeft,
  CheckCircle2,
  AlertCircle,
  FileText,
  BadgeCheck,
} from 'lucide-react';

export default function ListingDetailPage() {
  const params = useParams();
  const searchParams = useSearchParams();
  const router = useRouter();
  const { user } = useAuth();

  const listingId = params.id as string;
  const autoInquire = searchParams.get('action') === 'inquire';

  const [listing, setListing] = useState<Listing | null>(null);
  const [selectedImage, setSelectedImage] = useState<string>('');
  const [isSaved, setIsSaved] = useState(false);

  // Inquiry / Offer Modal
  const [inquiryModalOpen, setInquiryModalOpen] = useState(autoInquire);
  const [requestedQty, setRequestedQty] = useState<number>(0);
  const [offeredRate, setOfferedRate] = useState<number>(0);
  const [buyerMessage, setBuyerMessage] = useState<string>('');
  const [submittedInquiryId, setSubmittedInquiryId] = useState<string | null>(null);

  // Direct Message Modal
  const [directMessageOpen, setDirectMessageOpen] = useState(false);
  const [chatMessage, setChatMessage] = useState('');
  const [chatSent, setChatSent] = useState(false);

  useEffect(() => {
    const item = StorageService.getListingById(listingId);
    if (item) {
      setListing(item);
      setSelectedImage(item.images[0]);
      setRequestedQty(Math.min(item.quantity, 1000));
      setOfferedRate(item.pricePerUnit);
      setBuyerMessage(
        `Hello ${item.sellerName}, we are interested in procuring ${item.title}. We can arrange pickup from your facility.`
      );
    }
    if (user) {
      const saved = StorageService.getWishlist(user.id);
      setIsSaved(saved.includes(listingId));
    }
  }, [listingId, user]);

  if (!listing) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center space-y-4">
        <h2 className="text-2xl font-bold text-gray-800">Industrial Material Not Found</h2>
        <p className="text-sm text-gray-500">
          The requested waste lot may have been sold, archived, or is unavailable.
        </p>
        <Link
          href="/marketplace"
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#14532D] text-white text-xs font-bold rounded-xl"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Marketplace
        </Link>
      </div>
    );
  }

  const handleToggleWishlist = () => {
    if (!user) {
      router.push('/login');
      return;
    }
    const added = StorageService.toggleWishlist(user.id, listing.id);
    setIsSaved(added);
  };

  const handleSendOffer = (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      router.push('/login');
      return;
    }

    if (requestedQty <= 0 || requestedQty > listing.quantity) {
      alert(`Please enter a quantity between 1 and ${listing.quantity.toLocaleString('en-IN')} ${listing.unit}`);
      return;
    }

    const newInquiry = StorageService.createInquiry({
      listingId: listing.id,
      listingTitle: listing.title,
      listingCategory: listing.category,
      listingImage: listing.images[0],
      buyerId: user.id,
      buyerName: user.name,
      buyerBusiness: user.businessName,
      sellerId: listing.sellerId,
      sellerName: listing.sellerName,
      requestedQuantity: requestedQty,
      unit: listing.unit,
      offeredPrice: offeredRate,
      totalAmount: requestedQty * offeredRate,
      initialMessage: buyerMessage,
    });

    setSubmittedInquiryId(newInquiry.id);
  };

  const handleSendDirectMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      router.push('/login');
      return;
    }

    StorageService.sendMessage({
      senderId: user.id,
      senderName: user.name,
      receiverId: listing.sellerId,
      receiverName: listing.sellerName,
      listingId: listing.id,
      listingTitle: listing.title,
      content: chatMessage,
    });

    setChatSent(true);
    setTimeout(() => {
      setDirectMessageOpen(false);
      setChatSent(false);
      setChatMessage('');
    }, 1500);
  };

  const totalCalculated = requestedQty * offeredRate;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Navigation Breadcrumb */}
      <div className="flex items-center gap-2 text-xs text-gray-500">
        <Link href="/marketplace" className="hover:text-[#14532D] flex items-center gap-1 font-semibold">
          <ArrowLeft className="w-3.5 h-3.5" /> Marketplace
        </Link>
        <span>/</span>
        <span className="text-gray-400">{listing.category}</span>
        <span>/</span>
        <span className="text-gray-800 font-bold truncate max-w-sm">{listing.title}</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Image Gallery & Specifications (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          {/* Main Hero Image */}
          <div className="relative rounded-3xl overflow-hidden bg-gray-100 border border-gray-200 aspect-[4/3] shadow-sm">
            <img
              src={selectedImage || listing.images[0]}
              alt={listing.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute top-4 left-4 flex gap-2">
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-[#14532D] text-white shadow">
                {listing.category}
              </span>
              <span className="px-3 py-1 rounded-full text-xs font-semibold bg-white/90 text-gray-800 backdrop-blur-sm shadow">
                {listing.condition}
              </span>
            </div>
            <button
              onClick={handleToggleWishlist}
              className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center text-gray-400 hover:text-red-500 transition-colors"
            >
              <Heart className={`w-5 h-5 ${isSaved ? 'fill-red-500 text-red-500' : ''}`} />
            </button>
          </div>

          {/* Thumbnail Strip */}
          {listing.images.length > 1 && (
            <div className="flex gap-3 overflow-x-auto pb-1">
              {listing.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(img)}
                  className={`w-20 h-20 rounded-xl overflow-hidden border-2 transition-all ${
                    selectedImage === img ? 'border-emerald ring-2 ring-emerald/30' : 'border-gray-200 opacity-70 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}

          {/* Description Card */}
          <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm space-y-4">
            <h3 className="text-base font-bold text-gray-900 border-b border-gray-100 pb-3">
              Material Description & Provenance
            </h3>
            <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-line">
              {listing.description}
            </p>
          </div>

          {/* Specifications Table */}
          <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
              <h3 className="text-base font-bold text-gray-900 flex items-center gap-2">
                <FileText className="w-4 h-4 text-emerald" /> Technical Specification Sheet
              </h3>
              <span className="text-[11px] text-gray-500 font-medium">Standardized Lab Verification</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              {Object.entries(listing.specifications).map(([key, val]) => (
                <div key={key} className="p-3 bg-[#F8FAF7] rounded-xl border border-gray-100">
                  <span className="block text-gray-500 font-semibold mb-0.5">{key}</span>
                  <span className="font-bold text-gray-900 text-sm">{val}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Pricing, Seller Profile & Actions (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          {/* Commercial Terms Card */}
          <div className="bg-white rounded-3xl p-6 sm:p-7 border border-gray-200 shadow-lg space-y-6">
            <div>
              <span className="text-xs uppercase font-bold text-emerald tracking-wider">
                Industrial Quotation
              </span>
              <h1 className="text-2xl font-black text-gray-900 mt-1 leading-snug">
                {listing.title}
              </h1>
              <p className="text-xs text-gray-500 flex items-center gap-1.5 mt-2">
                <MapPin className="w-3.5 h-3.5 text-[#14532D]" />
                <span>{listing.city}, PIN {listing.pinCode}</span>
                <span className="text-gray-300">•</span>
                <span>Listed on {new Date(listing.createdAt).toLocaleDateString('en-IN', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
              </p>
            </div>

            {/* Price Banner */}
            <div className="p-4 rounded-2xl bg-forest-50/80 border border-forest-100 space-y-1">
              <div className="flex items-baseline justify-between">
                <div>
                  <span className="text-xs text-gray-500 font-semibold">Ex-Factory Unit Rate: </span>
                  <span className="text-3xl font-black text-[#14532D]">
                    ₹{listing.pricePerUnit.toLocaleString('en-IN')}
                  </span>
                  <span className="text-sm font-bold text-gray-600">/{listing.unit}</span>
                </div>
                {listing.negotiable ? (
                  <span className="text-xs font-bold text-emerald bg-emerald-100/70 px-2.5 py-1 rounded-full">
                    Rate Negotiable
                  </span>
                ) : (
                  <span className="text-xs font-semibold text-gray-500 bg-gray-200 px-2 py-0.5 rounded">
                    Fixed Price
                  </span>
                )}
              </div>
              <p className="text-[11px] text-gray-500">
                Applicable GST extra as per Indian HSN/SAC code guidelines.
              </p>
            </div>

            {/* Key Batch Stats */}
            <div className="grid grid-cols-2 gap-3 pt-1 text-xs">
              <div className="p-3 bg-gray-50 rounded-xl border border-gray-100">
                <span className="text-gray-500 flex items-center gap-1 mb-1">
                  <Scale className="w-3.5 h-3.5 text-gray-400" /> Available Stock
                </span>
                <p className="text-base font-extrabold text-gray-900">
                  {listing.quantity.toLocaleString('en-IN')} {listing.unit}
                </p>
              </div>

              <div className="p-3 bg-gray-50 rounded-xl border border-gray-100">
                <span className="text-gray-500 flex items-center gap-1 mb-1">
                  <Truck className="w-3.5 h-3.5 text-gray-400" /> Dispatch
                </span>
                <p className="text-base font-extrabold text-gray-900">
                  {listing.pickupAvailable ? 'Immediate Pickup' : 'Seller Dispatched'}
                </p>
              </div>
            </div>

            {/* Primary Action Buttons */}
            <div className="space-y-3 pt-2">
              <button
                onClick={() => setInquiryModalOpen(true)}
                className="w-full py-3.5 px-4 bg-[#14532D] hover:bg-forest-800 text-white font-extrabold text-sm rounded-xl shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4 text-emerald" />
                Make an Offer / Send Purchase Request
              </button>

              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => setDirectMessageOpen(true)}
                  className="py-2.5 px-3 bg-white hover:bg-forest-50 text-gray-800 font-bold text-xs rounded-xl border border-gray-300 transition-colors flex items-center justify-center gap-1.5"
                >
                  <MessageSquare className="w-3.5 h-3.5 text-blue-600" /> Message Seller
                </button>
                <button
                  onClick={handleToggleWishlist}
                  className={`py-2.5 px-3 font-bold text-xs rounded-xl border transition-colors flex items-center justify-center gap-1.5 ${
                    isSaved
                      ? 'bg-red-50 text-red-600 border-red-200'
                      : 'bg-white hover:bg-gray-50 text-gray-700 border-gray-300'
                  }`}
                >
                  <Heart className={`w-3.5 h-3.5 ${isSaved ? 'fill-red-600' : ''}`} />
                  {isSaved ? 'In Wishlist' : 'Save Material'}
                </button>
              </div>
            </div>
          </div>

          {/* Seller Verified Credential Card */}
          <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm space-y-4">
            <h3 className="text-xs uppercase font-bold text-gray-500 tracking-wider">
              Supplier Organization & Verification
            </h3>
            <div className="flex items-start gap-3.5">
              <div className="w-12 h-12 rounded-xl bg-forest-100 text-[#14532D] flex items-center justify-center font-bold text-lg shrink-0">
                <Building2 className="w-6 h-6" />
              </div>
              <div className="flex-1 space-y-1">
                <div className="flex items-center gap-1.5">
                  <h4 className="font-bold text-gray-900 text-sm">{listing.sellerBusiness}</h4>
                  {listing.sellerVerified && (
                    <span className="inline-flex items-center gap-0.5 text-emerald text-xs font-bold" title="KYC Audited">
                      <ShieldCheck className="w-4 h-4" />
                    </span>
                  )}
                </div>
                <p className="text-xs text-gray-500">Contact: {listing.sellerName}</p>
                <p className="text-xs text-gray-500 flex items-center gap-1">
                  <MapPin className="w-3 h-3 text-[#14532D]" /> {listing.city}, India
                </p>
              </div>
            </div>

            <div className="pt-3 border-t border-gray-100 flex items-center justify-between text-xs text-gray-600">
              <span className="flex items-center gap-1 text-emerald font-semibold">
                <BadgeCheck className="w-4 h-4" /> GSTIN Verified
              </span>
              <span className="text-[11px] text-gray-400">Response time: &lt; 2 hrs</span>
            </div>
          </div>
        </div>
      </div>

      {/* MAKE AN OFFER / INQUIRY MODAL */}
      {inquiryModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-gray-100 space-y-5 animate-in zoom-in-95 duration-150">
            {submittedInquiryId ? (
              <div className="text-center py-6 space-y-4">
                <div className="w-16 h-16 bg-emerald-100 text-emerald rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <h3 className="text-xl font-black text-gray-900">Offer Submitted Successfully!</h3>
                <p className="text-xs text-gray-600 max-w-sm mx-auto leading-relaxed">
                  Your purchase offer of ₹{offeredRate}/{listing.unit} for {requestedQty} {listing.unit} has been delivered to {listing.sellerName}. You will receive a notification when they accept or counter.
                </p>
                <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
                  <Link
                    href="/dashboard/inquiries"
                    className="w-full sm:w-auto px-5 py-2.5 bg-[#14532D] text-white text-xs font-bold rounded-xl"
                  >
                    View in Inquiries Hub
                  </Link>
                  <button
                    onClick={() => {
                      setInquiryModalOpen(false);
                      setSubmittedInquiryId(null);
                    }}
                    className="w-full sm:w-auto px-5 py-2.5 bg-gray-100 text-gray-700 text-xs font-semibold rounded-xl hover:bg-gray-200"
                  >
                    Close
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSendOffer} className="space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-gray-100">
                  <div>
                    <h3 className="text-lg font-bold text-gray-900">Submit Purchase Offer</h3>
                    <p className="text-xs text-gray-500">{listing.title}</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setInquiryModalOpen(false)}
                    className="text-gray-400 hover:text-gray-600 text-sm font-bold p-1"
                  >
                    ✕
                  </button>
                </div>

                {/* Offer inputs */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">
                      Requested Volume ({listing.unit})
                    </label>
                    <input
                      type="number"
                      min={1}
                      max={listing.quantity}
                      value={requestedQty}
                      onChange={(e) => setRequestedQty(Number(e.target.value))}
                      required
                      className="w-full px-3 py-2 rounded-xl border border-gray-300 text-xs focus:ring-2 focus:ring-[#10B981] focus:outline-none"
                    />
                    <span className="text-[10px] text-gray-400">
                      Max: {listing.quantity.toLocaleString('en-IN')} {listing.unit}
                    </span>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">
                      Offered Price / {listing.unit} (₹)
                    </label>
                    <input
                      type="number"
                      min={1}
                      value={offeredRate}
                      onChange={(e) => setOfferedRate(Number(e.target.value))}
                      required
                      className="w-full px-3 py-2 rounded-xl border border-gray-300 text-xs focus:ring-2 focus:ring-[#10B981] focus:outline-none"
                    />
                    <span className="text-[10px] text-gray-400">
                      Listed at ₹{listing.pricePerUnit}/{listing.unit}
                    </span>
                  </div>
                </div>

                {/* Calculated Total Bar */}
                <div className="p-3 bg-[#F8FAF7] rounded-xl border border-gray-200 flex items-center justify-between text-xs">
                  <span className="font-semibold text-gray-600">Calculated Order Total:</span>
                  <span className="text-base font-extrabold text-[#14532D]">
                    ₹{totalCalculated.toLocaleString('en-IN')}
                  </span>
                </div>

                {/* Note to seller */}
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">
                    Message / Logistics Preference to Supplier
                  </label>
                  <textarea
                    rows={3}
                    value={buyerMessage}
                    onChange={(e) => setBuyerMessage(e.target.value)}
                    required
                    className="w-full px-3 py-2 rounded-xl border border-gray-300 text-xs focus:ring-2 focus:ring-[#10B981] focus:outline-none resize-none"
                    placeholder="Specify delivery timeline, preferred transport mode, or quality inquiries..."
                  />
                </div>

                <div className="pt-2 flex items-center justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setInquiryModalOpen(false)}
                    className="px-4 py-2.5 text-xs font-semibold text-gray-600 hover:bg-gray-100 rounded-xl"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2.5 bg-[#14532D] hover:bg-forest-800 text-white font-bold text-xs rounded-xl shadow-md transition-all flex items-center gap-1.5"
                  >
                    <Send className="w-3.5 h-3.5 text-emerald" /> Send Purchase Request
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

      {/* DIRECT MESSAGE MODAL */}
      {directMessageOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-gray-100 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-gray-100">
              <h3 className="text-sm font-bold text-gray-900 flex items-center gap-1.5">
                <MessageSquare className="w-4 h-4 text-blue-600" /> Chat with {listing.sellerName}
              </h3>
              <button
                onClick={() => setDirectMessageOpen(false)}
                className="text-gray-400 hover:text-gray-600 font-bold"
              >
                ✕
              </button>
            </div>

            {chatSent ? (
              <div className="p-4 bg-emerald-50 rounded-xl text-center text-xs text-emerald-800 font-bold">
                Message sent successfully!
              </div>
            ) : (
              <form onSubmit={handleSendDirectMessage} className="space-y-3">
                <textarea
                  rows={4}
                  value={chatMessage}
                  onChange={(e) => setChatMessage(e.target.value)}
                  placeholder={`Hi ${listing.sellerName}, I have a question regarding ${listing.title}...`}
                  required
                  className="w-full p-3 rounded-xl border border-gray-300 text-xs focus:ring-2 focus:ring-emerald focus:outline-none resize-none"
                />
                <button
                  type="submit"
                  className="w-full py-2.5 bg-[#14532D] text-white text-xs font-bold rounded-xl hover:bg-forest-800 transition-colors"
                >
                  Send Direct Message
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
