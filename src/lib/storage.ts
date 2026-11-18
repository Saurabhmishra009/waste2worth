import {
  User,
  Listing,
  Inquiry,
  Order,
  Message,
  Notification,
  VerificationApplication,
  OrderStatus,
  InquiryStatus,
  UserRole,
} from '@/types';

// Key constants for LocalStorage
const STORAGE_KEYS = {
  CURRENT_USER: 'w2w_current_user',
  USERS: 'w2w_users',
  LISTINGS: 'w2w_listings',
  INQUIRIES: 'w2w_inquiries',
  ORDERS: 'w2w_orders',
  MESSAGES: 'w2w_messages',
  NOTIFICATIONS: 'w2w_notifications',
  WISHLISTS: 'w2w_wishlists',
  VERIFICATIONS: 'w2w_verifications',
  INITIALIZED: 'w2w_initialized_v2',
};

// Default Demo Users
export const DEMO_USERS: User[] = [
  {
    id: 'user_seller_1',
    name: 'Rajesh Sharma',
    businessName: 'Sharma Polymers & Recyclers',
    email: 'seller@waste2worth.demo',
    phone: '+91 98101 23456',
    businessType: 'Plastic Recycler & Extruder',
    location: 'Delhi',
    pinCode: '110020',
    role: 'seller',
    verificationStatus: 'verified',
    gstNumber: '07AAACS1429B1ZB',
    businessAddress: 'Plot 44, Okhla Industrial Area Phase III, New Delhi',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    createdAt: '2024-01-15T10:00:00Z',
  },
  {
    id: 'user_buyer_1',
    name: 'Ananya Deshmukh',
    businessName: 'Deshmukh EcoPackaging Ltd',
    email: 'buyer@waste2worth.demo',
    phone: '+91 98202 34567',
    businessType: 'Sustainable Packaging Manufacturer',
    location: 'Noida',
    pinCode: '201301',
    role: 'buyer',
    verificationStatus: 'verified',
    gstNumber: '09AABCD5678E1ZF',
    businessAddress: 'Sector 62, Electronic City, Noida, Uttar Pradesh',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
    createdAt: '2024-02-01T11:30:00Z',
  },
  {
    id: 'user_both_1',
    name: 'Vikram Singhania',
    businessName: 'Singhania Metal & Fab Works',
    email: 'both@waste2worth.demo',
    phone: '+91 97111 88990',
    businessType: 'Foundry & Secondary Smelting',
    location: 'Faridabad',
    pinCode: '121003',
    role: 'both',
    verificationStatus: 'verified',
    gstNumber: '06AAACS9988C1ZR',
    businessAddress: 'Industrial Area Sector 24, Faridabad, Haryana',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
    createdAt: '2024-02-10T09:15:00Z',
  },
  {
    id: 'user_admin_1',
    name: 'Waste2Worth Administrator',
    businessName: 'Waste2Worth Platform Ops',
    email: 'admin@waste2worth.demo',
    phone: '+91 11 4050 6070',
    businessType: 'Platform Governance & Auditing',
    location: 'New Delhi',
    pinCode: '110001',
    role: 'admin',
    verificationStatus: 'verified',
    gstNumber: '07WASTE0000A1Z9',
    businessAddress: 'Barakhamba Road, Connaught Place, New Delhi',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80',
    createdAt: '2023-12-01T00:00:00Z',
  },
];

// Initial 16 realistic Indian industrial waste listings
export const INITIAL_LISTINGS: Listing[] = [
  {
    id: 'list_1',
    title: 'Clean Post-Industrial PET Bottle Flakes (Hot Washed)',
    category: 'Plastic',
    description: 'Hot-washed and sorted clear PET flakes derived from industrial pre-forms and beverage bottles. IV > 0.72 dl/g, moisture < 1%. Ready for direct spinning into polyester staple fiber (PSF) or food-grade sheet extrusion.',
    images: [
      'https://images.unsplash.com/photo-1530587191325-3db32d826c18?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1605600659873-d808a13e4d2a?w=800&auto=format&fit=crop&q=80',
    ],
    quantity: 12000,
    originalQuantity: 15000,
    unit: 'kg',
    pricePerUnit: 38,
    negotiable: true,
    condition: 'Granules / Shredded',
    city: 'Delhi',
    pinCode: '110020',
    pickupAvailable: true,
    specifications: {
      Purity: '99.5% Clear PET',
      'Moisture Content': '< 1.0%',
      Contamination: '< 50 ppm PVC',
      Color: 'Crystal Transparent Clear',
      Packing: '1000 kg Jumbo Bags',
    },
    sellerId: 'user_seller_1',
    sellerName: 'Rajesh Sharma',
    sellerBusiness: 'Sharma Polymers & Recyclers',
    sellerVerified: true,
    status: 'active',
    createdAt: '2024-03-01T10:00:00Z',
    featured: true,
  },
  {
    id: 'list_2',
    title: 'Virgin Baled Corrugated Kraft Cardboard Boxes (OCC 95/5)',
    category: 'Cardboard',
    description: 'High-burst strength corrugated carton waste from electronics manufacturing units. Minimal tape or printing ink contamination. Moisture under 12%, tightly strapped in 400kg bales.',
    images: [
      'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800&auto=format&fit=crop&q=80',
    ],
    quantity: 25,
    originalQuantity: 25,
    unit: 't',
    pricePerUnit: 13500,
    negotiable: true,
    condition: 'Baled',
    city: 'Ghaziabad',
    pinCode: '201009',
    pickupAvailable: true,
    specifications: {
      Grade: 'Old Corrugated Containers (OCC 95/5)',
      BaleWeight: 'Approx 400 kg each',
      Moisture: 'Max 12%',
      Contaminants: 'Less than 2% outthrows',
    },
    sellerId: 'user_seller_1',
    sellerName: 'Rajesh Sharma',
    sellerBusiness: 'Sharma Polymers & Recyclers',
    sellerVerified: true,
    status: 'active',
    createdAt: '2024-03-02T14:30:00Z',
    featured: true,
  },
  {
    id: 'list_3',
    title: 'Clean 6063 Extrusion Aluminium Scrap Chunks',
    category: 'Metal',
    description: 'Offcuts and profile trims from architectural window frame extrusion plant. Pure 6063 alloy, clean, free from iron fasteners, paint or thermal break plastic.',
    images: [
      'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=800&auto=format&fit=crop&q=80',
    ],
    quantity: 8500,
    originalQuantity: 10000,
    unit: 'kg',
    pricePerUnit: 155,
    negotiable: false,
    condition: 'Raw Scrap',
    city: 'Noida',
    pinCode: '201301',
    pickupAvailable: true,
    specifications: {
      Alloy: 'Aluminium 6063 (Tata/Hindalco spec)',
      Recovery: 'Yield > 94%',
      Surface: 'Anodized & Mill Finish mix',
      Dimensions: 'Cut pieces 300mm to 1200mm',
    },
    sellerId: 'user_both_1',
    sellerName: 'Vikram Singhania',
    sellerBusiness: 'Singhania Metal & Fab Works',
    sellerVerified: true,
    status: 'active',
    createdAt: '2024-03-03T09:00:00Z',
    featured: true,
  },
  {
    id: 'list_4',
    title: 'Standard Heavy-Duty Euro & Pine Wooden Pallets (1200x1000mm)',
    category: 'Wood',
    description: 'Inspected Grade-A 4-way entry wooden pallets from pharmaceutical logistics warehouses. Heat treated (ISPM-15 compliant). Stored indoors in dry conditions.',
    images: [
      'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?w=800&auto=format&fit=crop&q=80',
    ],
    quantity: 450,
    originalQuantity: 500,
    unit: 'pcs',
    pricePerUnit: 195,
    negotiable: true,
    condition: 'Processed / Sorted',
    city: 'Lucknow',
    pinCode: '226012',
    pickupAvailable: true,
    specifications: {
      Dimensions: '1200 mm x 1000 mm x 144 mm',
      Capacity: 'Static 2500 kg / Dynamic 1200 kg',
      Treatment: 'Heat Treated ISPM-15 Certified',
      WoodType: 'Pinewood & Seasoned Hardwood',
    },
    sellerId: 'user_seller_1',
    sellerName: 'Rajesh Sharma',
    sellerBusiness: 'Sharma Polymers & Recyclers',
    sellerVerified: true,
    status: 'active',
    createdAt: '2024-03-04T16:15:00Z',
  },
  {
    id: 'list_5',
    title: 'Pure Combed Cotton Yarn & Fabric Selvage Waste',
    category: 'Textile',
    description: 'Post-industrial 100% cotton clips and selvage from export garment manufacturing plant. White and light pastels, free from poly blends, oil or grease stains.',
    images: [
      'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=800&auto=format&fit=crop&q=80',
    ],
    quantity: 6000,
    originalQuantity: 6000,
    unit: 'kg',
    pricePerUnit: 22,
    negotiable: true,
    condition: 'Baled',
    city: 'Kanpur',
    pinCode: '208001',
    pickupAvailable: true,
    specifications: {
      Composition: '100% Combed Cotton',
      ColorSort: 'White & Off-White (80%), Pastels (20%)',
      ForeignMatter: '< 0.5%',
      UseCases: 'Regenerated yarn, handmade paper, wiping rags',
    },
    sellerId: 'user_seller_1',
    sellerName: 'Rajesh Sharma',
    sellerBusiness: 'Sharma Polymers & Recyclers',
    sellerVerified: true,
    status: 'active',
    createdAt: '2024-03-05T11:45:00Z',
  },
  {
    id: 'list_6',
    title: 'Bright Bare Electrolytic Copper Wire Scrap (Berry / Candy Grade)',
    category: 'Metal',
    description: 'Unalloyed copper wire clippings from electric motor rewinding and transformer manufacturing units. 99.9% Cu content, free of brittle burnt wire, varnish, or insulation.',
    images: [
      'https://images.unsplash.com/photo-1541888946425-d0fbb186c5f7?w=800&auto=format&fit=crop&q=80',
    ],
    quantity: 1800,
    originalQuantity: 2000,
    unit: 'kg',
    pricePerUnit: 670,
    negotiable: false,
    condition: 'Processed / Sorted',
    city: 'Faridabad',
    pinCode: '121003',
    pickupAvailable: true,
    specifications: {
      Purity: '99.9% Electrolytic Copper',
      ISRI: 'Berry / Candy standard grade',
      Diameter: '1.2 mm to 4.0 mm',
      Packaging: 'Steel drums / strapped bundles',
    },
    sellerId: 'user_both_1',
    sellerName: 'Vikram Singhania',
    sellerBusiness: 'Singhania Metal & Fab Works',
    sellerVerified: true,
    status: 'active',
    createdAt: '2024-03-06T13:00:00Z',
    featured: true,
  },
  {
    id: 'list_7',
    title: 'Sorted Office White Printing Waste Paper (SOW 100%)',
    category: 'Paper',
    description: 'De-dusted sorted white ledger and photocopier paper waste collected from commercial corporate parks. Free from carbon paper, plastic sleeves and metal clips.',
    images: [
      'https://images.unsplash.com/photo-1607613009820-a29f7bb81c04?w=800&auto=format&fit=crop&q=80',
    ],
    quantity: 18,
    originalQuantity: 18,
    unit: 't',
    pricePerUnit: 16200,
    negotiable: true,
    condition: 'Baled',
    city: 'Agra',
    pinCode: '282001',
    pickupAvailable: true,
    specifications: {
      Grade: 'Sorted Office Paper (SOP/SOW)',
      Brightness: 'Above 80%',
      Moisture: '< 10%',
      BaleSize: '450 kg mechanical compressed bales',
    },
    sellerId: 'user_seller_1',
    sellerName: 'Rajesh Sharma',
    sellerBusiness: 'Sharma Polymers & Recyclers',
    sellerVerified: true,
    status: 'active',
    createdAt: '2024-03-07T15:20:00Z',
  },
  {
    id: 'list_8',
    title: 'Recycled HDPE Granules (Injection Moulding Grade - Milky White)',
    category: 'Plastic',
    description: 'Reprocessed HDPE pellets made from milk pouches and blow-moulding containers. MFI: 2.2 - 2.8 g/10min at 190°C. High impact strength and uniform coloration.',
    images: [
      'https://images.unsplash.com/photo-1591195853828-11db59a44f6b?w=800&auto=format&fit=crop&q=80',
    ],
    quantity: 7500,
    originalQuantity: 7500,
    unit: 'kg',
    pricePerUnit: 48,
    negotiable: true,
    condition: 'Granules / Shredded',
    city: 'Mathura',
    pinCode: '281001',
    pickupAvailable: true,
    specifications: {
      Polymer: 'High Density Polyethylene (HDPE)',
      MeltFlowIndex: '2.5 g/10 min (ASTM D1238)',
      Density: '0.954 g/cm³',
      Filtration: 'Twin 120 mesh screened',
      Packaging: '25 kg branded PP woven bags',
    },
    sellerId: 'user_seller_1',
    sellerName: 'Rajesh Sharma',
    sellerBusiness: 'Sharma Polymers & Recyclers',
    sellerVerified: true,
    status: 'active',
    createdAt: '2024-03-08T08:30:00Z',
  },
  {
    id: 'list_9',
    title: 'De-soldered FR4 Electronic PCB Boards (Gold-Finger Populated)',
    category: 'Electronic Waste',
    description: 'Telecom and server motherboards after component desoldering. Rich in precious metals and copper traces. Collected under E-waste management authorization with chain of custody.',
    images: [
      'https://images.unsplash.com/photo-1597733336794-12d05021d510?w=800&auto=format&fit=crop&q=80',
    ],
    quantity: 3200,
    originalQuantity: 3200,
    unit: 'kg',
    pricePerUnit: 240,
    negotiable: false,
    condition: 'Raw Scrap',
    city: 'Noida',
    pinCode: '201305',
    pickupAvailable: false,
    specifications: {
      Type: 'Multi-layer FR-4 circuit boards',
      PreciousMetals: 'High yield Au/Ag/Cu assay available',
      Compliance: 'CPCB Form 6 manifest provided',
    },
    sellerId: 'user_both_1',
    sellerName: 'Vikram Singhania',
    sellerBusiness: 'Singhania Metal & Fab Works',
    sellerVerified: true,
    status: 'active',
    createdAt: '2024-03-09T17:10:00Z',
  },
  {
    id: 'list_10',
    title: 'Steel Slag & Rebar Offcuts from Infrastructure Demolition',
    category: 'Construction Materials',
    description: 'Clean Fe500D thermo-mechanically treated (TMT) steel bar offcuts in lengths 0.5m to 2.5m. Sorted from heavy concrete debris, ideal for re-rolling mills.',
    images: [
      'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&auto=format&fit=crop&q=80',
    ],
    quantity: 42,
    originalQuantity: 50,
    unit: 't',
    pricePerUnit: 34000,
    negotiable: true,
    condition: 'Processed / Sorted',
    city: 'Ghaziabad',
    pinCode: '201010',
    pickupAvailable: true,
    specifications: {
      Material: 'TMT Steel Fe-500D Offcuts',
      YieldStrength: 'Min 500 N/mm²',
      RustLevel: 'Surface oxidation only, no pitting',
      Loading: 'Magnet crane loading included at site',
    },
    sellerId: 'user_both_1',
    sellerName: 'Vikram Singhania',
    sellerBusiness: 'Singhania Metal & Fab Works',
    sellerVerified: true,
    status: 'active',
    createdAt: '2024-03-10T12:00:00Z',
  },
  {
    id: 'list_11',
    title: 'Class F Dry Pulverized Fuel Ash (Fly Ash for AAC Blocks)',
    category: 'Industrial By-products',
    description: 'Electrostatic precipitator collected pulverized fly ash from coal thermal power facility. Conforms to IS 3812 (Part 1). High pozzolanic activity suitable for ready-mix concrete.',
    images: [
      'https://images.unsplash.com/photo-1578575437130-527eed3abbec?w=800&auto=format&fit=crop&q=80',
    ],
    quantity: 120,
    originalQuantity: 150,
    unit: 't',
    pricePerUnit: 850,
    negotiable: true,
    condition: 'Granules / Shredded',
    city: 'Delhi',
    pinCode: '110044',
    pickupAvailable: true,
    specifications: {
      Standard: 'IS 3812 (Part 1) Grade 1',
      SilicaAlumina: '> 70% combined',
      Fineness: 'Blaine spec > 320 m²/kg',
      LossOnIgnition: '< 3.5%',
    },
    sellerId: 'user_seller_1',
    sellerName: 'Rajesh Sharma',
    sellerBusiness: 'Sharma Polymers & Recyclers',
    sellerVerified: true,
    status: 'active',
    createdAt: '2024-03-11T14:40:00Z',
  },
  {
    id: 'list_12',
    title: 'Uncoated Teak & Sheesham Sawmill Wood Shavings & Offcuts',
    category: 'Wood',
    description: 'Dry kiln-seasoned hardwood chips and shavings from furniture processing cluster. High calorific value (approx 4200 kcal/kg). Ideal for biomass briquetting or particle board.',
    images: [
      'https://images.unsplash.com/photo-1546484396-fb3fc6f95f98?w=800&auto=format&fit=crop&q=80',
    ],
    quantity: 15,
    originalQuantity: 15,
    unit: 't',
    pricePerUnit: 5200,
    negotiable: true,
    condition: 'Raw Scrap',
    city: 'Faridabad',
    pinCode: '121004',
    pickupAvailable: true,
    specifications: {
      Moisture: 'Kiln dried < 9%',
      CalorificValue: '4,200 kcal/kg',
      AshContent: '< 2%',
    },
    sellerId: 'user_both_1',
    sellerName: 'Vikram Singhania',
    sellerBusiness: 'Singhania Metal & Fab Works',
    sellerVerified: true,
    status: 'active',
    createdAt: '2024-03-12T09:30:00Z',
  },
  {
    id: 'list_13',
    title: 'Polypropylene (PP) Woven Bag Scrap (Clean Cement Bags Rejected)',
    category: 'Plastic',
    description: 'Unused misprinted PP woven sacks from packaging manufacturing plant. Virgin resin base, tensile strength intact. Ideal for re-granulation or geo-textile manufacture.',
    images: [
      'https://images.unsplash.com/photo-1595278069441-2cf29f8005a4?w=800&auto=format&fit=crop&q=80',
    ],
    quantity: 4800,
    originalQuantity: 4800,
    unit: 'kg',
    pricePerUnit: 42,
    negotiable: false,
    condition: 'Baled',
    city: 'Kanpur',
    pinCode: '208022',
    pickupAvailable: true,
    specifications: {
      Polymer: '100% Polypropylene',
      Denier: '800D to 1000D woven tape',
      Contamination: 'Nil, factory reject bags',
    },
    sellerId: 'user_seller_1',
    sellerName: 'Rajesh Sharma',
    sellerBusiness: 'Sharma Polymers & Recyclers',
    sellerVerified: true,
    status: 'active',
    createdAt: '2024-03-13T10:15:00Z',
  },
  {
    id: 'list_14',
    title: 'Industrial Spent Hydraulic Oil & Mineral Lubricant (Filtered)',
    category: 'Industrial By-products',
    description: 'Settled and primary filtered industrial hydraulic oil (ISO VG 46/68) extracted from CNC machining and hydraulic pressing presses. Suitable for re-refining.',
    images: [
      'https://images.unsplash.com/photo-1628177142898-93e36e4e3a50?w=800&auto=format&fit=crop&q=80',
    ],
    quantity: 5000,
    originalQuantity: 5000,
    unit: 'L',
    pricePerUnit: 28,
    negotiable: true,
    condition: 'Processed / Sorted',
    city: 'Noida',
    pinCode: '201306',
    pickupAvailable: true,
    specifications: {
      Base: 'Mineral lubricating oil ISO VG 46/68',
      WaterContent: '< 1.5%',
      Sediment: '< 0.5% (primary 10 micron filtered)',
      Barrels: 'Supplied in 200L standard MS drums',
    },
    sellerId: 'user_both_1',
    sellerName: 'Vikram Singhania',
    sellerBusiness: 'Singhania Metal & Fab Works',
    sellerVerified: true,
    status: 'active',
    createdAt: '2024-03-14T11:00:00Z',
  },
  {
    id: 'list_15',
    title: 'Recycled Crushed Concrete Aggregate (10mm - 20mm Course Gravel)',
    category: 'Construction Materials',
    description: 'Washed and graded recycled concrete aggregate (RCA) produced from tested pavement slabs. Sieve analysis adheres to MoRTH specifications for road base course.',
    images: [
      'https://images.unsplash.com/photo-1590486803833-1c5dc8ddd4c8?w=800&auto=format&fit=crop&q=80',
    ],
    quantity: 80,
    originalQuantity: 80,
    unit: 't',
    pricePerUnit: 520,
    negotiable: true,
    condition: 'Processed / Sorted',
    city: 'Delhi',
    pinCode: '110034',
    pickupAvailable: true,
    specifications: {
      Grading: '10 mm to 20 mm course nominal size',
      CrushingValue: '< 28%',
      Application: 'PQC sub-base, non-structural concrete',
    },
    sellerId: 'user_seller_1',
    sellerName: 'Rajesh Sharma',
    sellerBusiness: 'Sharma Polymers & Recyclers',
    sellerVerified: true,
    status: 'active',
    createdAt: '2024-03-15T15:00:00Z',
  },
  {
    id: 'list_16',
    title: 'Post-Consumer PET Strap Rolls & Baling Banding Scrap',
    category: 'Plastic',
    description: 'High-tensile polyester strapping waste from bulk carton and coil unbundling stations. Green color, coiled and baled cleanly without steel crimp clips.',
    images: [
      'https://images.unsplash.com/photo-1563245372-f21724e3856d?w=800&auto=format&fit=crop&q=80',
    ],
    quantity: 4200,
    originalQuantity: 4200,
    unit: 'kg',
    pricePerUnit: 32,
    negotiable: true,
    condition: 'Baled',
    city: 'Agra',
    pinCode: '282005',
    pickupAvailable: true,
    specifications: {
      Material: '100% Polyethylene Terephthalate (PET)',
      Width: '12 mm to 19 mm band',
      ForeignMetal: '0% metal crimps removed',
    },
    sellerId: 'user_seller_1',
    sellerName: 'Rajesh Sharma',
    sellerBusiness: 'Sharma Polymers & Recyclers',
    sellerVerified: true,
    status: 'active',
    createdAt: '2024-03-16T13:45:00Z',
  },
];

// Sample Initial Inquiries
export const INITIAL_INQUIRIES: Inquiry[] = [
  {
    id: 'inq_1',
    listingId: 'list_1',
    listingTitle: 'Clean Post-Industrial PET Bottle Flakes (Hot Washed)',
    listingCategory: 'Plastic',
    listingImage: 'https://images.unsplash.com/photo-1530587191325-3db32d826c18?w=800&auto=format&fit=crop&q=80',
    buyerId: 'user_buyer_1',
    buyerName: 'Ananya Deshmukh',
    buyerBusiness: 'Deshmukh EcoPackaging Ltd',
    sellerId: 'user_seller_1',
    sellerName: 'Rajesh Sharma',
    requestedQuantity: 3000,
    unit: 'kg',
    offeredPrice: 36,
    totalAmount: 108000,
    initialMessage: 'Hi Rajesh, we manufacture thermoformed food containers. We require 3000 kg for regular monthly trials. Is ₹36/kg acceptable if we arrange our own logistics from Okhla?',
    status: 'countered',
    counterPrice: 37,
    counterNote: 'We can agree at ₹37/kg provided loading is scheduled before Friday afternoon.',
    createdAt: '2024-03-10T11:20:00Z',
    updatedAt: '2024-03-11T09:40:00Z',
  },
  {
    id: 'inq_2',
    listingId: 'list_3',
    listingTitle: 'Clean 6063 Extrusion Aluminium Scrap Chunks',
    listingCategory: 'Metal',
    listingImage: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=800&auto=format&fit=crop&q=80',
    buyerId: 'user_buyer_1',
    buyerName: 'Ananya Deshmukh',
    buyerBusiness: 'Deshmukh EcoPackaging Ltd',
    sellerId: 'user_both_1',
    sellerName: 'Vikram Singhania',
    requestedQuantity: 1500,
    unit: 'kg',
    offeredPrice: 155,
    totalAmount: 232500,
    initialMessage: 'Vikram, we need 1500 kg clean 6063 profile scrap for casting structural inserts. Ready at your listed rate of ₹155/kg.',
    status: 'accepted',
    createdAt: '2024-03-12T14:15:00Z',
    updatedAt: '2024-03-13T10:00:00Z',
  },
];

// Sample Initial Orders
export const INITIAL_ORDERS: Order[] = [
  {
    id: 'ord_101',
    inquiryId: 'inq_2',
    listingId: 'list_3',
    listingTitle: 'Clean 6063 Extrusion Aluminium Scrap Chunks',
    listingImage: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=800&auto=format&fit=crop&q=80',
    category: 'Metal',
    buyerId: 'user_buyer_1',
    buyerName: 'Ananya Deshmukh',
    buyerBusiness: 'Deshmukh EcoPackaging Ltd',
    sellerId: 'user_both_1',
    sellerName: 'Vikram Singhania',
    sellerBusiness: 'Singhania Metal & Fab Works',
    quantity: 1500,
    unit: 'kg',
    unitPrice: 155,
    totalAmount: 232500,
    status: 'Pickup Scheduled',
    pickupDate: '2024-03-25T11:00:00Z',
    pickupAddress: 'Plot 18, Industrial Area Sector 24, Faridabad, Haryana 121003',
    deliveryAddress: 'Plant 2, Sector 62, Noida, Uttar Pradesh 201301',
    materialReady: true,
    deliveryConfirmed: false,
    trackingHistory: [
      {
        status: 'Accepted',
        timestamp: '2024-03-13T10:00:00Z',
        note: 'Purchase agreement confirmed at ₹155/kg for 1500 kg.',
      },
      {
        status: 'Pickup Scheduled',
        timestamp: '2024-03-14T15:30:00Z',
        note: 'Seller confirmed material weighs 1,500 kg net and is bundled for forklift loading.',
      },
    ],
    createdAt: '2024-03-13T10:00:00Z',
    updatedAt: '2024-03-14T15:30:00Z',
  },
  {
    id: 'ord_100',
    listingId: 'list_2',
    listingTitle: 'Virgin Baled Corrugated Kraft Cardboard Boxes (OCC 95/5)',
    listingImage: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800&auto=format&fit=crop&q=80',
    category: 'Cardboard',
    buyerId: 'user_buyer_1',
    buyerName: 'Ananya Deshmukh',
    buyerBusiness: 'Deshmukh EcoPackaging Ltd',
    sellerId: 'user_seller_1',
    sellerName: 'Rajesh Sharma',
    sellerBusiness: 'Sharma Polymers & Recyclers',
    quantity: 10,
    unit: 't',
    unitPrice: 13500,
    totalAmount: 135000,
    status: 'Completed',
    pickupDate: '2024-03-05T09:00:00Z',
    pickupAddress: 'Plot 44, Okhla Industrial Area Phase III, New Delhi 110020',
    deliveryAddress: 'Sector 62, Electronic City, Noida, Uttar Pradesh 201301',
    materialReady: true,
    deliveryConfirmed: true,
    trackingHistory: [
      { status: 'Accepted', timestamp: '2024-03-04T09:00:00Z', note: 'Order accepted.' },
      { status: 'Pickup Scheduled', timestamp: '2024-03-04T12:00:00Z', note: 'Truck scheduled for 9am pickup.' },
      { status: 'In Transit', timestamp: '2024-03-05T10:30:00Z', note: 'Dispatched with weighbridge slip #8821.' },
      { status: 'Delivered', timestamp: '2024-03-05T14:00:00Z', note: 'Arrived at Noida facility.' },
      { status: 'Completed', timestamp: '2024-03-05T16:00:00Z', note: 'Full inspection verified 10 tonnes OCC.' },
    ],
    createdAt: '2024-03-04T09:00:00Z',
    updatedAt: '2024-03-05T16:00:00Z',
  },
];

// Sample Initial Messages
export const INITIAL_MESSAGES: Message[] = [
  {
    id: 'msg_1',
    senderId: 'user_buyer_1',
    senderName: 'Ananya Deshmukh',
    receiverId: 'user_seller_1',
    receiverName: 'Rajesh Sharma',
    listingId: 'list_1',
    listingTitle: 'Clean Post-Industrial PET Bottle Flakes',
    content: 'Hello Rajesh, could you share the intrinsic viscosity lab test report for this PET batch?',
    timestamp: '2024-03-10T11:22:00Z',
    read: true,
  },
  {
    id: 'msg_2',
    senderId: 'user_seller_1',
    senderName: 'Rajesh Sharma',
    receiverId: 'user_buyer_1',
    receiverName: 'Ananya Deshmukh',
    listingId: 'list_1',
    listingTitle: 'Clean Post-Industrial PET Bottle Flakes',
    content: 'Certainly Ananya, our lab report shows IV at 0.74 dl/g with PVC contamination well under 30 ppm. You are welcome to inspect samples at Okhla warehouse.',
    timestamp: '2024-03-10T12:05:00Z',
    read: true,
  },
];

// Sample Initial Notifications
export const INITIAL_NOTIFICATIONS: Notification[] = [
  {
    id: 'notif_1',
    userId: 'user_seller_1',
    title: 'New Purchase Inquiry Received',
    message: 'Ananya Deshmukh submitted an inquiry for 3000 kg PET Bottle Flakes.',
    type: 'inquiry',
    link: '/dashboard/inquiries',
    read: false,
    createdAt: '2024-03-10T11:20:00Z',
  },
  {
    id: 'notif_2',
    userId: 'user_buyer_1',
    title: 'Counteroffer Made',
    message: 'Rajesh Sharma sent a counteroffer of ₹37/kg for PET Bottle Flakes.',
    type: 'order',
    link: '/dashboard/inquiries',
    read: false,
    createdAt: '2024-03-11T09:40:00Z',
  },
  {
    id: 'notif_3',
    userId: 'user_buyer_1',
    title: 'Order Status Update: Pickup Scheduled',
    message: 'Your order #ord_101 for Aluminium Scrap has been scheduled for pickup on March 25.',
    type: 'order',
    link: '/dashboard/orders',
    read: true,
    createdAt: '2024-03-14T15:30:00Z',
  },
];

// Sample Verification Requests
export const INITIAL_VERIFICATIONS: VerificationApplication[] = [
  {
    id: 'ver_1',
    userId: 'user_seller_1',
    businessName: 'Sharma Polymers & Recyclers',
    gstin: '07AAACS1429B1ZB',
    businessAddress: 'Plot 44, Okhla Industrial Area Phase III, New Delhi 110020',
    contactPerson: 'Rajesh Sharma',
    phone: '+91 98101 23456',
    documents: [
      { name: 'GST_Certificate_SharmaPolymers.pdf', size: '1.2 MB', status: 'verified' },
      { name: 'State_Pollution_Control_Board_NOC.pdf', size: '2.8 MB', status: 'verified' },
    ],
    status: 'verified',
    submittedAt: '2024-01-20T10:00:00Z',
    reviewedAt: '2024-01-21T14:00:00Z',
    reviewerNotes: 'Verified against GST portal & Delhi Pollution Control Committee CTE.',
  },
  {
    id: 'ver_2',
    userId: 'user_both_1',
    businessName: 'Singhania Metal & Fab Works',
    gstin: '06AAACS9988C1ZR',
    businessAddress: 'Industrial Area Sector 24, Faridabad, Haryana 121003',
    contactPerson: 'Vikram Singhania',
    phone: '+91 97111 88990',
    documents: [
      { name: 'GST_Certificate_SinghaniaMetals.pdf', size: '1.4 MB', status: 'verified' },
      { name: 'Factory_License_Haryana.pdf', size: '3.1 MB', status: 'verified' },
    ],
    status: 'verified',
    submittedAt: '2024-02-12T10:00:00Z',
    reviewedAt: '2024-02-13T16:00:00Z',
    reviewerNotes: 'Factory license and Udyam Registration validated.',
  },
];

// Helper functions for safe browser storage access
const isBrowser = typeof window !== 'undefined';

function getStorageItem<T>(key: string, defaultValue: T): T {
  if (!isBrowser) return defaultValue;
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch (err) {
    console.error(`Error reading key ${key} from localStorage:`, err);
    return defaultValue;
  }
}

function setStorageItem<T>(key: string, value: T): void {
  if (!isBrowser) return;
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (err) {
    console.error(`Error setting key ${key} in localStorage:`, err);
  }
}

// Initialize LocalStorage with rich demo data if not already initialized
export function initializeStorage(): void {
  if (!isBrowser) return;
  const isInitialized = localStorage.getItem(STORAGE_KEYS.INITIALIZED);
  const existingListings = getStorageItem<Listing[]>(STORAGE_KEYS.LISTINGS, []);

  if (!isInitialized || existingListings.length < 15) {
    // Populate all defaults
    setStorageItem(STORAGE_KEYS.USERS, DEMO_USERS);
    setStorageItem(STORAGE_KEYS.LISTINGS, INITIAL_LISTINGS);
    setStorageItem(STORAGE_KEYS.INQUIRIES, INITIAL_INQUIRIES);
    setStorageItem(STORAGE_KEYS.ORDERS, INITIAL_ORDERS);
    setStorageItem(STORAGE_KEYS.MESSAGES, INITIAL_MESSAGES);
    setStorageItem(STORAGE_KEYS.NOTIFICATIONS, INITIAL_NOTIFICATIONS);
    setStorageItem(STORAGE_KEYS.VERIFICATIONS, INITIAL_VERIFICATIONS);
    // Default current user to Seller for immediate demo richness
    if (!localStorage.getItem(STORAGE_KEYS.CURRENT_USER)) {
      setStorageItem(STORAGE_KEYS.CURRENT_USER, DEMO_USERS[0]);
    }
    localStorage.setItem(STORAGE_KEYS.INITIALIZED, 'true');
  }
}

// ----------------- STORAGE SERVICE LAYER -----------------
// Designed with a clean asynchronous-compatible interface so Supabase can replace it.

export const StorageService = {
  // --- USERS & AUTH ---
  getUsers(): User[] {
    return getStorageItem<User[]>(STORAGE_KEYS.USERS, DEMO_USERS);
  },

  getCurrentUser(): User | null {
    return getStorageItem<User | null>(STORAGE_KEYS.CURRENT_USER, DEMO_USERS[0]);
  },

  setCurrentUser(user: User | null): void {
    setStorageItem(STORAGE_KEYS.CURRENT_USER, user);
  },

  switchDemoRole(role: UserRole): User {
    const users = this.getUsers();
    let target = users.find((u) => u.role === role);
    if (!target) {
      target = DEMO_USERS.find((u) => u.role === role) || DEMO_USERS[0];
    }
    this.setCurrentUser(target);
    return target;
  },

  createUser(userData: Omit<User, 'id' | 'createdAt' | 'verificationStatus'>): User {
    const users = this.getUsers();
    const newUser: User = {
      ...userData,
      id: `user_${Date.now()}`,
      verificationStatus: 'unverified',
      createdAt: new Date().toISOString(),
    };
    users.push(newUser);
    setStorageItem(STORAGE_KEYS.USERS, users);
    this.setCurrentUser(newUser);
    return newUser;
  },

  updateUser(id: string, updates: Partial<User>): User | null {
    const users = this.getUsers();
    const index = users.findIndex((u) => u.id === id);
    if (index === -1) return null;
    users[index] = { ...users[index], ...updates };
    setStorageItem(STORAGE_KEYS.USERS, users);

    const currentUser = this.getCurrentUser();
    if (currentUser?.id === id) {
      this.setCurrentUser(users[index]);
    }
    return users[index];
  },

  // --- LISTINGS ---
  getListings(): Listing[] {
    return getStorageItem<Listing[]>(STORAGE_KEYS.LISTINGS, INITIAL_LISTINGS);
  },

  getListingById(id: string): Listing | null {
    const listings = this.getListings();
    return listings.find((l) => l.id === id) || null;
  },

  createListing(listingData: Omit<Listing, 'id' | 'createdAt' | 'status'>): Listing {
    const listings = this.getListings();
    const newListing: Listing = {
      ...listingData,
      id: `list_${Date.now()}`,
      status: 'active',
      createdAt: new Date().toISOString(),
    };
    listings.unshift(newListing);
    setStorageItem(STORAGE_KEYS.LISTINGS, listings);

    // Notify matching buyers
    this.createNotification({
      userId: 'user_buyer_1',
      title: 'New Industrial Waste Listing',
      message: `${newListing.sellerBusiness} posted new ${newListing.category} waste: ${newListing.title}`,
      type: 'inquiry',
      link: `/marketplace/${newListing.id}`,
    });

    return newListing;
  },

  updateListing(id: string, updates: Partial<Listing>): Listing | null {
    const listings = this.getListings();
    const index = listings.findIndex((l) => l.id === id);
    if (index === -1) return null;
    listings[index] = { ...listings[index], ...updates };
    setStorageItem(STORAGE_KEYS.LISTINGS, listings);
    return listings[index];
  },

  deleteListing(id: string): boolean {
    const listings = this.getListings();
    const updated = listings.filter((l) => l.id !== id);
    if (updated.length === listings.length) return false;
    setStorageItem(STORAGE_KEYS.LISTINGS, updated);
    return true;
  },

  // --- INQUIRIES & OFFERS ---
  getInquiries(): Inquiry[] {
    return getStorageItem<Inquiry[]>(STORAGE_KEYS.INQUIRIES, INITIAL_INQUIRIES);
  },

  getInquiryById(id: string): Inquiry | null {
    const inquiries = this.getInquiries();
    return inquiries.find((i) => i.id === id) || null;
  },

  createInquiry(data: Omit<Inquiry, 'id' | 'createdAt' | 'updatedAt' | 'status'>): Inquiry {
    const inquiries = this.getInquiries();
    const newInquiry: Inquiry = {
      ...data,
      id: `inq_${Date.now()}`,
      status: 'pending',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    inquiries.unshift(newInquiry);
    setStorageItem(STORAGE_KEYS.INQUIRIES, inquiries);

    // Notify seller
    this.createNotification({
      userId: newInquiry.sellerId,
      title: 'New Offer Received',
      message: `${newInquiry.buyerBusiness} offered ₹${newInquiry.offeredPrice}/${newInquiry.unit} for ${newInquiry.listingTitle}`,
      type: 'inquiry',
      link: '/dashboard/inquiries',
    });

    return newInquiry;
  },

  updateInquiryStatus(id: string, status: InquiryStatus, counterPrice?: number, counterNote?: string): Inquiry | null {
    const inquiries = this.getInquiries();
    const index = inquiries.findIndex((i) => i.id === id);
    if (index === -1) return null;

    inquiries[index].status = status;
    inquiries[index].updatedAt = new Date().toISOString();
    if (counterPrice !== undefined) inquiries[index].counterPrice = counterPrice;
    if (counterNote !== undefined) inquiries[index].counterNote = counterNote;

    setStorageItem(STORAGE_KEYS.INQUIRIES, inquiries);

    const inq = inquiries[index];
    // Notify respective counterparty
    if (status === 'countered') {
      this.createNotification({
        userId: inq.buyerId,
        title: 'Counteroffer Received',
        message: `${inq.sellerName} counteroffered ₹${counterPrice}/${inq.unit} on ${inq.listingTitle}`,
        type: 'inquiry',
        link: '/dashboard/inquiries',
      });
    } else if (status === 'accepted') {
      this.createNotification({
        userId: inq.buyerId,
        title: 'Offer Accepted!',
        message: `${inq.sellerName} accepted your offer for ${inq.requestedQuantity} ${inq.unit} of ${inq.listingTitle}`,
        type: 'order',
        link: '/dashboard/orders',
      });
    } else if (status === 'rejected') {
      this.createNotification({
        userId: inq.buyerId,
        title: 'Offer Declined',
        message: `Your inquiry for ${inq.listingTitle} was declined.`,
        type: 'inquiry',
        link: '/dashboard/inquiries',
      });
    }

    return inquiries[index];
  },

  // --- ORDERS & TRANSACTION SYSTEM ---
  getOrders(): Order[] {
    return getStorageItem<Order[]>(STORAGE_KEYS.ORDERS, INITIAL_ORDERS);
  },

  getOrderById(id: string): Order | null {
    const orders = this.getOrders();
    return orders.find((o) => o.id === id) || null;
  },

  createOrderFromInquiry(inquiryId: string, customDeliveryAddress?: string): Order | null {
    const inquiry = this.getInquiryById(inquiryId);
    if (!inquiry) return null;

    const listing = this.getListingById(inquiry.listingId);
    const priceToUse = inquiry.counterPrice || inquiry.offeredPrice;
    const finalAmount = priceToUse * inquiry.requestedQuantity;

    const newOrder: Order = {
      id: `ord_${Date.now()}`,
      inquiryId: inquiry.id,
      listingId: inquiry.listingId,
      listingTitle: inquiry.listingTitle,
      listingImage: inquiry.listingImage,
      category: inquiry.listingCategory,
      buyerId: inquiry.buyerId,
      buyerName: inquiry.buyerName,
      buyerBusiness: inquiry.buyerBusiness,
      sellerId: inquiry.sellerId,
      sellerName: inquiry.sellerName,
      sellerBusiness: listing?.sellerBusiness || 'Industrial Supplier',
      quantity: inquiry.requestedQuantity,
      unit: inquiry.unit,
      unitPrice: priceToUse,
      totalAmount: finalAmount,
      status: 'Accepted',
      pickupAddress: listing ? `${listing.city}, PIN ${listing.pinCode}` : 'Seller Warehouse',
      deliveryAddress: customDeliveryAddress || 'Buyer Designated Plant Facility',
      materialReady: false,
      deliveryConfirmed: false,
      trackingHistory: [
        {
          status: 'Accepted',
          timestamp: new Date().toISOString(),
          note: `Transaction confirmed for ${inquiry.requestedQuantity} ${inquiry.unit} at ₹${priceToUse}/${inquiry.unit}.`,
        },
      ],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    const orders = this.getOrders();
    orders.unshift(newOrder);
    setStorageItem(STORAGE_KEYS.ORDERS, orders);

    // Update inquiry status to 'ordered'
    this.updateInquiryStatus(inquiry.id, 'ordered');

    // Deduct available quantity from listing
    if (listing) {
      const remaining = Math.max(0, listing.quantity - inquiry.requestedQuantity);
      this.updateListing(listing.id, {
        quantity: remaining,
        status: remaining === 0 ? 'sold' : 'active',
      });
    }

    // Notify both parties
    this.createNotification({
      userId: newOrder.buyerId,
      title: 'Order Generated',
      message: `Order #${newOrder.id} has been created. Awaiting pickup schedule.`,
      type: 'order',
      link: '/dashboard/orders',
    });
    this.createNotification({
      userId: newOrder.sellerId,
      title: 'New Confirmed Order',
      message: `Order #${newOrder.id} has been confirmed. Please schedule pickup date.`,
      type: 'order',
      link: '/dashboard/orders',
    });

    return newOrder;
  },

  updateOrderStatus(orderId: string, newStatus: OrderStatus, note?: string): Order | null {
    const orders = this.getOrders();
    const index = orders.findIndex((o) => o.id === orderId);
    if (index === -1) return null;

    const order = orders[index];
    order.status = newStatus;
    order.updatedAt = new Date().toISOString();

    if (newStatus === 'Delivered' || newStatus === 'Completed') {
      order.deliveryConfirmed = true;
    }

    order.trackingHistory.push({
      status: newStatus,
      timestamp: new Date().toISOString(),
      note: note || `Order status updated to ${newStatus}.`,
    });

    setStorageItem(STORAGE_KEYS.ORDERS, orders);

    // Notify both parties
    const notifyBuyer: Notification = {
      id: `notif_${Date.now()}_b`,
      userId: order.buyerId,
      title: `Order Update: ${newStatus}`,
      message: `Order #${order.id} (${order.listingTitle}) is now ${newStatus}.`,
      type: 'order',
      link: '/dashboard/orders',
      read: false,
      createdAt: new Date().toISOString(),
    };
    const notifySeller: Notification = {
      id: `notif_${Date.now()}_s`,
      userId: order.sellerId,
      title: `Order Update: ${newStatus}`,
      message: `Order #${order.id} (${order.listingTitle}) status changed to ${newStatus}.`,
      type: 'order',
      link: '/dashboard/orders',
      read: false,
      createdAt: new Date().toISOString(),
    };
    this.createNotification(notifyBuyer);
    this.createNotification(notifySeller);

    return order;
  },

  updateOrderLogistics(orderId: string, pickupDate: string, materialReady?: boolean): Order | null {
    const orders = this.getOrders();
    const index = orders.findIndex((o) => o.id === orderId);
    if (index === -1) return null;

    const order = orders[index];
    order.pickupDate = pickupDate;
    if (materialReady !== undefined) order.materialReady = materialReady;
    order.updatedAt = new Date().toISOString();

    if (order.status === 'Accepted') {
      order.status = 'Pickup Scheduled';
      order.trackingHistory.push({
        status: 'Pickup Scheduled',
        timestamp: new Date().toISOString(),
        note: `Pickup confirmed for ${new Date(pickupDate).toLocaleDateString('en-IN', {
          weekday: 'short',
          year: 'numeric',
          month: 'short',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
        })}.`,
      });
    }

    setStorageItem(STORAGE_KEYS.ORDERS, orders);
    return order;
  },

  // --- MESSAGING ---
  getMessages(userId1?: string, userId2?: string): Message[] {
    const msgs = getStorageItem<Message[]>(STORAGE_KEYS.MESSAGES, INITIAL_MESSAGES);
    if (!userId1) return msgs;
    if (!userId2) {
      return msgs.filter((m) => m.senderId === userId1 || m.receiverId === userId1);
    }
    return msgs.filter(
      (m) =>
        (m.senderId === userId1 && m.receiverId === userId2) ||
        (m.senderId === userId2 && m.receiverId === userId1)
    );
  },

  sendMessage(messageData: Omit<Message, 'id' | 'timestamp' | 'read'>): Message {
    const msgs = getStorageItem<Message[]>(STORAGE_KEYS.MESSAGES, INITIAL_MESSAGES);
    const newMsg: Message = {
      ...messageData,
      id: `msg_${Date.now()}`,
      timestamp: new Date().toISOString(),
      read: false,
    };
    msgs.push(newMsg);
    setStorageItem(STORAGE_KEYS.MESSAGES, msgs);

    this.createNotification({
      userId: newMsg.receiverId,
      title: `New message from ${newMsg.senderName}`,
      message: newMsg.content.slice(0, 75) + (newMsg.content.length > 75 ? '...' : ''),
      type: 'message',
      link: '/dashboard/messages',
    });

    return newMsg;
  },

  // --- NOTIFICATIONS ---
  getNotifications(userId: string): Notification[] {
    const notifs = getStorageItem<Notification[]>(STORAGE_KEYS.NOTIFICATIONS, INITIAL_NOTIFICATIONS);
    return notifs.filter((n) => n.userId === userId);
  },

  createNotification(notifData: Omit<Notification, 'id' | 'createdAt' | 'read'>): Notification {
    const notifs = getStorageItem<Notification[]>(STORAGE_KEYS.NOTIFICATIONS, INITIAL_NOTIFICATIONS);
    const newNotif: Notification = {
      ...notifData,
      id: `notif_${Date.now()}_${Math.random().toString(36).substr(2, 4)}`,
      read: false,
      createdAt: new Date().toISOString(),
    };
    notifs.unshift(newNotif);
    setStorageItem(STORAGE_KEYS.NOTIFICATIONS, notifs);
    return newNotif;
  },

  markNotificationAsRead(id: string): void {
    const notifs = getStorageItem<Notification[]>(STORAGE_KEYS.NOTIFICATIONS, INITIAL_NOTIFICATIONS);
    const index = notifs.findIndex((n) => n.id === id);
    if (index !== -1) {
      notifs[index].read = true;
      setStorageItem(STORAGE_KEYS.NOTIFICATIONS, notifs);
    }
  },

  markAllNotificationsAsRead(userId: string): void {
    const notifs = getStorageItem<Notification[]>(STORAGE_KEYS.NOTIFICATIONS, INITIAL_NOTIFICATIONS);
    notifs.forEach((n) => {
      if (n.userId === userId) n.read = true;
    });
    setStorageItem(STORAGE_KEYS.NOTIFICATIONS, notifs);
  },

  // --- WISHLIST ---
  getWishlist(userId: string): string[] {
    const lists = getStorageItem<Record<string, string[]>>(STORAGE_KEYS.WISHLISTS, {
      user_buyer_1: ['list_1', 'list_6'],
    });
    return lists[userId] || [];
  },

  toggleWishlist(userId: string, listingId: string): boolean {
    const lists = getStorageItem<Record<string, string[]>>(STORAGE_KEYS.WISHLISTS, {
      user_buyer_1: ['list_1', 'list_6'],
    });
    const userList = lists[userId] || [];
    const exists = userList.includes(listingId);
    let updated: string[];
    if (exists) {
      updated = userList.filter((id) => id !== listingId);
    } else {
      updated = [...userList, listingId];
    }
    lists[userId] = updated;
    setStorageItem(STORAGE_KEYS.WISHLISTS, lists);
    return !exists;
  },

  // --- VERIFICATION REQUESTS ---
  getVerifications(): VerificationApplication[] {
    return getStorageItem<VerificationApplication[]>(STORAGE_KEYS.VERIFICATIONS, INITIAL_VERIFICATIONS);
  },

  submitVerification(data: Omit<VerificationApplication, 'id' | 'status' | 'submittedAt'>): VerificationApplication {
    const verifications = this.getVerifications();
    const newVer: VerificationApplication = {
      ...data,
      id: `ver_${Date.now()}`,
      status: 'pending',
      submittedAt: new Date().toISOString(),
    };
    verifications.unshift(newVer);
    setStorageItem(STORAGE_KEYS.VERIFICATIONS, verifications);

    // Update user status
    this.updateUser(data.userId, {
      verificationStatus: 'pending',
      gstNumber: data.gstin,
      businessAddress: data.businessAddress,
    });

    return newVer;
  },

  reviewVerification(id: string, status: 'verified' | 'rejected', notes?: string): VerificationApplication | null {
    const verifications = this.getVerifications();
    const index = verifications.findIndex((v) => v.id === id);
    if (index === -1) return null;

    verifications[index].status = status;
    verifications[index].reviewedAt = new Date().toISOString();
    if (notes) verifications[index].reviewerNotes = notes;

    setStorageItem(STORAGE_KEYS.VERIFICATIONS, verifications);

    // Update user
    this.updateUser(verifications[index].userId, {
      verificationStatus: status,
    });

    // Notify user
    this.createNotification({
      userId: verifications[index].userId,
      title: status === 'verified' ? 'Business Verification Approved!' : 'Business Verification Update',
      message:
        status === 'verified'
          ? 'Congratulations! Your business is now verified on Waste2Worth. The verified trust badge is active on all your listings.'
          : `Your verification application could not be approved. Note: ${notes || 'Please resubmit valid documents.'}`,
      type: 'verification',
      link: '/dashboard/profile',
    });

    return verifications[index];
  },
};
