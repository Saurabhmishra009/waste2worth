'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { StorageService } from '@/lib/storage';
import { ListingCategory, ListingUnit, MaterialCondition } from '@/types';
import {
  classifyWasteImage,
  PRESET_IMAGE_SAMPLES,
  ClassificationSuggestion,
} from '@/lib/ai-classifier';
import {
  Upload,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  Plus,
  Trash2,
  ArrowRight,
  ShieldCheck,
  Building2,
  Image as ImageIcon,
} from 'lucide-react';

export default function AddListingPage() {
  const router = useRouter();
  const { user } = useAuth();

  // Form State
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<ListingCategory>('Plastic');
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState(
    'https://images.unsplash.com/photo-1530587191325-3db32d826c18?w=800&auto=format&fit=crop&q=80'
  );
  const [quantity, setQuantity] = useState<number>(5000);
  const [unit, setUnit] = useState<ListingUnit>('kg');
  const [pricePerUnit, setPricePerUnit] = useState<number>(38);
  const [negotiable, setNegotiable] = useState(true);
  const [condition, setCondition] = useState<MaterialCondition>('Granules / Shredded');
  const [city, setCity] = useState(user?.location || 'Delhi');
  const [pinCode, setPinCode] = useState(user?.pinCode || '110020');
  const [pickupAvailable, setPickupAvailable] = useState(true);

  // Specifications
  const [specs, setSpecs] = useState<Record<string, string>>({
    Purity: '99% Clean',
    'Moisture Level': '< 1.5%',
    Contamination: 'Nil PVC',
    Packaging: '500 kg jumbo sacks',
  });
  const [newSpecKey, setNewSpecKey] = useState('');
  const [newSpecVal, setNewSpecVal] = useState('');

  // AI Classification Feedback
  const [aiSuggestion, setAiSuggestion] = useState<ClassificationSuggestion | null>(null);
  const [aiAnalyzing, setAiAnalyzing] = useState(false);

  const categories: ListingCategory[] = [
    'Plastic',
    'Metal',
    'Cardboard',
    'Paper',
    'Wood',
    'Textile',
    'Electronic Waste',
    'Construction Materials',
    'Industrial By-products',
  ];

  const units: { id: ListingUnit; label: string }[] = [
    { id: 'kg', label: 'Kilograms (kg)' },
    { id: 't', label: 'Tonnes (t)' },
    { id: 'L', label: 'Litres (L)' },
    { id: 'pcs', label: 'Pieces (pcs)' },
  ];

  const conditions: MaterialCondition[] = [
    'Raw Scrap',
    'Processed / Sorted',
    'Baled',
    'Granules / Shredded',
    'Mixed Lot',
  ];

  const runAiClassification = (imgUrl: string, hint: string) => {
    setAiAnalyzing(true);
    setTimeout(() => {
      const result = classifyWasteImage(hint);
      setAiSuggestion(result);
      setCategory(result.category);
      setTitle(result.suggestedTitle);
      setDescription(result.suggestedDescription);
      setCondition(result.suggestedCondition);
      setUnit(result.suggestedUnit);
      setPricePerUnit(result.defaultPriceRange.min);
      setAiAnalyzing(false);
    }, 600);
  };

  const handleSelectPresetSample = (sample: (typeof PRESET_IMAGE_SAMPLES)[0]) => {
    setImageUrl(sample.url);
    runAiClassification(sample.url, sample.label);
  };

  const handleCustomImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const url = reader.result as string;
        setImageUrl(url);
        runAiClassification(url, file.name);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddSpec = () => {
    if (newSpecKey.trim() && newSpecVal.trim()) {
      setSpecs({ ...specs, [newSpecKey.trim()]: newSpecVal.trim() });
      setNewSpecKey('');
      setNewSpecVal('');
    }
  };

  const handleRemoveSpec = (key: string) => {
    const copy = { ...specs };
    delete copy[key];
    setSpecs(copy);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim() || !description.trim() || quantity <= 0 || pricePerUnit <= 0) {
      alert('Please fill in all mandatory fields with valid values.');
      return;
    }

    StorageService.createListing({
      title,
      category,
      description,
      images: [imageUrl],
      quantity,
      originalQuantity: quantity,
      unit,
      pricePerUnit,
      negotiable,
      condition,
      city,
      pinCode,
      pickupAvailable,
      specifications: specs,
      sellerId: user?.id || 'user_seller_1',
      sellerName: user?.name || 'Rajesh Sharma',
      sellerBusiness: user?.businessName || 'Sharma Polymers & Recyclers',
      sellerVerified: user?.verificationStatus === 'verified',
    });

    router.push('/dashboard/listings');
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Header */}
      <div className="border-b border-gray-200 pb-5 space-y-1">
        <span className="text-xs uppercase font-bold text-emerald tracking-wider flex items-center gap-1">
          <Building2 className="w-3.5 h-3.5 text-emerald" /> Seller Procurement Network
        </span>
        <h1 className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight">
          List Industrial Waste / Reusable By-Product
        </h1>
        <p className="text-xs text-gray-500">
          Create a verified material listing. Use AI assistance to auto-populate specifications from sample photos.
        </p>
      </div>

      {/* AI CLASSIFICATION SECTION */}
      <div className="bg-forest-900 text-white rounded-3xl p-6 sm:p-8 space-y-5 border border-forest-800 shadow-xl">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-emerald" />
            <h2 className="text-base font-bold">Feature 10A: AI Waste Image Classification</h2>
          </div>
          <span className="text-[10px] font-bold bg-[#10B981] text-forest-950 px-2.5 py-0.5 rounded-full uppercase tracking-wider">
            Rule-Based Demo Model
          </span>
        </div>

        <p className="text-xs text-forest-200 leading-relaxed">
          Select a sample industrial material image or upload your factory photo. Our demonstration model analyzes texture, polymer, or alloy geometry to automatically generate title, category, description, and market rate suggestions. All suggestions remain completely editable by you.
        </p>

        {/* Preset sample buttons */}
        <div>
          <span className="block text-[11px] font-bold text-forest-300 uppercase tracking-wider mb-2">
            Quick Test: Click Any Industrial Sample Image
          </span>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
            {PRESET_IMAGE_SAMPLES.map((sample) => (
              <button
                key={sample.label}
                type="button"
                onClick={() => handleSelectPresetSample(sample)}
                className={`p-2 rounded-xl border text-left transition-all ${
                  imageUrl === sample.url
                    ? 'border-emerald bg-forest-800 ring-2 ring-emerald/40'
                    : 'border-forest-700 bg-forest-800/60 hover:bg-forest-800'
                }`}
              >
                <img
                  src={sample.url}
                  alt={sample.label}
                  className="w-full h-16 object-cover rounded-lg mb-1"
                />
                <p className="text-[10px] font-bold text-gray-200 truncate">{sample.label}</p>
              </button>
            ))}
          </div>
        </div>

        {/* AI Suggestion Alert Card */}
        {aiAnalyzing ? (
          <div className="p-4 bg-forest-800 rounded-2xl flex items-center gap-3 animate-pulse text-xs text-forest-200">
            <Sparkles className="w-4 h-4 text-emerald animate-spin" />
            <span>Analyzing material geometry and classifying industrial polymer/metal...</span>
          </div>
        ) : (
          aiSuggestion && (
            <div className="p-4 bg-forest-800/80 rounded-2xl border border-forest-700 text-xs space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-bold text-emerald flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4" /> AI Suggestion Applied ({Math.round(aiSuggestion.confidence * 100)}% Confidence)
                </span>
                <span className="text-[10px] text-forest-300">
                  Detected: {aiSuggestion.detectedFeatures.join(', ')}
                </span>
              </div>
              <p className="text-forest-100 text-[11px]">
                Suggested Material: <strong>{aiSuggestion.materialName}</strong> • Market Range: ₹{aiSuggestion.defaultPriceRange.min} - ₹{aiSuggestion.defaultPriceRange.max}/{aiSuggestion.suggestedUnit}
              </p>
            </div>
          )
        )}
      </div>

      {/* MAIN LISTING FORM */}
      <form onSubmit={handleSubmit} className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-200 shadow-sm space-y-6 text-xs">
        {/* Title */}
        <div>
          <label className="block font-bold text-gray-900 mb-1">
            Material Listing Title <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            placeholder="e.g. Clean Post-Industrial PET Bottle Flakes (Hot Washed)"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 focus:ring-2 focus:ring-emerald focus:outline-none text-sm font-semibold"
          />
        </div>

        {/* Category & Condition */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block font-bold text-gray-900 mb-1">
              Industrial Material Category <span className="text-red-500">*</span>
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value as ListingCategory)}
              className="w-full px-3 py-2.5 rounded-xl border border-gray-300 focus:ring-2 focus:ring-emerald focus:outline-none font-medium"
            >
              {categories.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block font-bold text-gray-900 mb-1">
              Physical Material Condition <span className="text-red-500">*</span>
            </label>
            <select
              value={condition}
              onChange={(e) => setCondition(e.target.value as MaterialCondition)}
              className="w-full px-3 py-2.5 rounded-xl border border-gray-300 focus:ring-2 focus:ring-emerald focus:outline-none font-medium"
            >
              {conditions.map((cond) => (
                <option key={cond} value={cond}>
                  {cond}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Description */}
        <div>
          <label className="block font-bold text-gray-900 mb-1">
            Detailed Description & Production Provenance <span className="text-red-500">*</span>
          </label>
          <textarea
            rows={4}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 focus:ring-2 focus:ring-emerald focus:outline-none resize-none leading-relaxed"
            placeholder="Describe origin (e.g. extrusion offcuts, warehouse packaging), moisture level, contamination limits, and packing format..."
          />
        </div>

        {/* Quantity, Unit & Price */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block font-bold text-gray-900 mb-1">
              Available Quantity <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              min={1}
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
              required
              className="w-full px-3 py-2.5 rounded-xl border border-gray-300 focus:ring-2 focus:ring-emerald focus:outline-none font-bold"
            />
          </div>

          <div>
            <label className="block font-bold text-gray-900 mb-1">
              Measurement Unit <span className="text-red-500">*</span>
            </label>
            <select
              value={unit}
              onChange={(e) => setUnit(e.target.value as ListingUnit)}
              className="w-full px-3 py-2.5 rounded-xl border border-gray-300 focus:ring-2 focus:ring-emerald focus:outline-none font-semibold"
            >
              {units.map((u) => (
                <option key={u.id} value={u.id}>
                  {u.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block font-bold text-gray-900 mb-1">
              Expected Ex-Factory Rate (₹) <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              min={1}
              value={pricePerUnit}
              onChange={(e) => setPricePerUnit(Number(e.target.value))}
              required
              className="w-full px-3 py-2.5 rounded-xl border border-gray-300 focus:ring-2 focus:ring-emerald focus:outline-none font-bold text-[#14532D]"
            />
          </div>
        </div>

        {/* Location & Logistics */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-center">
          <div>
            <label className="block font-bold text-gray-900 mb-1">
              Location City <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              required
              className="w-full px-3 py-2.5 rounded-xl border border-gray-300 focus:ring-2 focus:ring-emerald focus:outline-none"
            />
          </div>

          <div>
            <label className="block font-bold text-gray-900 mb-1">
              PIN Code <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={pinCode}
              onChange={(e) => setPinCode(e.target.value)}
              required
              className="w-full px-3 py-2.5 rounded-xl border border-gray-300 focus:ring-2 focus:ring-emerald focus:outline-none"
            />
          </div>

          <div className="pt-4 flex flex-col gap-2">
            <label className="flex items-center gap-2 cursor-pointer font-bold text-gray-700">
              <input
                type="checkbox"
                checked={negotiable}
                onChange={(e) => setNegotiable(e.target.checked)}
                className="w-4 h-4 rounded text-emerald focus:ring-emerald"
              />
              <span>Price is Negotiable</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer font-bold text-gray-700">
              <input
                type="checkbox"
                checked={pickupAvailable}
                onChange={(e) => setPickupAvailable(e.target.checked)}
                className="w-4 h-4 rounded text-emerald focus:ring-emerald"
              />
              <span>Buyer Pickup Available at Plant</span>
            </label>
          </div>
        </div>

        {/* Technical Specifications Sheet Manager */}
        <div className="pt-2 space-y-3">
          <div className="flex items-center justify-between border-b border-gray-100 pb-2">
            <label className="font-bold text-gray-900">
              Technical Specifications & Lab Parameters
            </label>
            <span className="text-gray-400 text-[11px]">Key-value specification pairs</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {Object.entries(specs).map(([k, v]) => (
              <div
                key={k}
                className="flex items-center justify-between p-2.5 bg-[#F8FAF7] rounded-xl border border-gray-100"
              >
                <div>
                  <span className="text-gray-500 font-semibold">{k}: </span>
                  <span className="font-bold text-gray-900">{v}</span>
                </div>
                <button
                  type="button"
                  onClick={() => handleRemoveSpec(k)}
                  className="text-gray-400 hover:text-red-600 p-1"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>

          {/* Add new spec line */}
          <div className="flex items-center gap-2 pt-1">
            <input
              type="text"
              placeholder="Spec name (e.g. Tensile Strength, Density)"
              value={newSpecKey}
              onChange={(e) => setNewSpecKey(e.target.value)}
              className="flex-1 px-3 py-1.5 rounded-lg border border-gray-300 text-xs"
            />
            <input
              type="text"
              placeholder="Value (e.g. 24 MPa, 0.94 g/cm³)"
              value={newSpecVal}
              onChange={(e) => setNewSpecVal(e.target.value)}
              className="flex-1 px-3 py-1.5 rounded-lg border border-gray-300 text-xs"
            />
            <button
              type="button"
              onClick={handleAddSpec}
              className="px-3 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold rounded-lg flex items-center gap-1"
            >
              <Plus className="w-3.5 h-3.5" /> Add
            </button>
          </div>
        </div>

        {/* Submit Button */}
        <div className="pt-4 border-t border-gray-100 flex items-center justify-end gap-3">
          <button
            type="button"
            onClick={() => router.back()}
            className="px-5 py-2.5 text-gray-600 hover:bg-gray-100 rounded-xl font-semibold"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-7 py-3 bg-[#14532D] hover:bg-forest-800 text-white font-bold rounded-xl shadow-md transition-all flex items-center gap-2"
          >
            <span>Publish Industrial Listing</span>
            <ArrowRight className="w-4 h-4 text-emerald" />
          </button>
        </div>
      </form>
    </div>
  );
}
