export type UserRole = 'buyer' | 'seller' | 'both' | 'admin';

export type VerificationStatus = 'unverified' | 'pending' | 'verified' | 'rejected';

export interface User {
  id: string;
  name: string;
  businessName: string;
  email: string;
  phone: string;
  businessType: string; // e.g. Manufacturer, Recycler, Scrap Dealer, MSME
  location: string; // Indian city
  pinCode: string;
  role: UserRole;
  verificationStatus: VerificationStatus;
  avatar?: string;
  gstNumber?: string;
  businessAddress?: string;
  documents?: { name: string; type: string; url: string; uploadedAt: string }[];
  createdAt: string;
}

export type ListingCategory =
  | 'Plastic'
  | 'Metal'
  | 'Paper'
  | 'Cardboard'
  | 'Wood'
  | 'Textile'
  | 'Electronic Waste'
  | 'Construction Materials'
  | 'Industrial By-products';

export type ListingUnit = 'kg' | 't' | 'L' | 'pcs';

export type MaterialCondition =
  | 'Raw Scrap'
  | 'Processed / Sorted'
  | 'Baled'
  | 'Granules / Shredded'
  | 'Mixed Lot';

export interface Listing {
  id: string;
  title: string;
  category: ListingCategory;
  description: string;
  images: string[];
  quantity: number;
  originalQuantity: number;
  unit: ListingUnit;
  pricePerUnit: number; // in INR
  negotiable: boolean;
  condition: MaterialCondition;
  city: string;
  pinCode: string;
  pickupAvailable: boolean;
  specifications: Record<string, string>;
  sellerId: string;
  sellerName: string;
  sellerBusiness: string;
  sellerVerified: boolean;
  status: 'active' | 'paused' | 'sold' | 'deleted';
  createdAt: string;
  featured?: boolean;
}

export type InquiryStatus = 'pending' | 'countered' | 'accepted' | 'rejected' | 'ordered';

export interface Inquiry {
  id: string;
  listingId: string;
  listingTitle: string;
  listingCategory: ListingCategory;
  listingImage: string;
  buyerId: string;
  buyerName: string;
  buyerBusiness: string;
  sellerId: string;
  sellerName: string;
  requestedQuantity: number;
  unit: ListingUnit;
  offeredPrice: number; // price per unit offered
  totalAmount: number;
  initialMessage: string;
  status: InquiryStatus;
  counterPrice?: number;
  counterNote?: string;
  createdAt: string;
  updatedAt: string;
}

export type OrderStatus =
  | 'Pending'
  | 'Negotiation'
  | 'Accepted'
  | 'Pickup Scheduled'
  | 'In Transit'
  | 'Delivered'
  | 'Completed'
  | 'Cancelled';

export interface OrderTrackingStep {
  status: OrderStatus;
  timestamp: string;
  note: string;
}

export interface Order {
  id: string;
  inquiryId?: string;
  listingId: string;
  listingTitle: string;
  listingImage: string;
  category: ListingCategory;
  buyerId: string;
  buyerName: string;
  buyerBusiness: string;
  sellerId: string;
  sellerName: string;
  sellerBusiness: string;
  quantity: number;
  unit: ListingUnit;
  unitPrice: number;
  totalAmount: number;
  status: OrderStatus;
  pickupDate?: string;
  pickupAddress: string;
  deliveryAddress: string;
  materialReady?: boolean;
  deliveryConfirmed?: boolean;
  trackingHistory: OrderTrackingStep[];
  createdAt: string;
  updatedAt: string;
}

export interface Message {
  id: string;
  senderId: string;
  senderName: string;
  receiverId: string;
  receiverName: string;
  listingId?: string;
  listingTitle?: string;
  content: string;
  timestamp: string;
  read: boolean;
}

export interface Notification {
  id: string;
  userId: string;
  title: string;
  message: string;
  type: 'inquiry' | 'order' | 'message' | 'verification' | 'system';
  link: string;
  read: boolean;
  createdAt: string;
}

export interface VerificationApplication {
  id: string;
  userId: string;
  businessName: string;
  gstin: string;
  businessAddress: string;
  contactPerson: string;
  phone: string;
  documents: { name: string; size: string; status: string }[];
  status: VerificationStatus;
  submittedAt: string;
  reviewedAt?: string;
  reviewerNotes?: string;
}

export interface CompatibilityResult {
  score: number; // 0 to 100
  matchingReasons: string[];
  listing: Listing;
}
