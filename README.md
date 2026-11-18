# Waste2Worth — AI-Powered B2B Industrial Waste Exchange Marketplace

> **Tagline:** *Your Waste. Someone Else's Resource.*

Waste2Worth is a digital circular economy marketplace engineered for the Indian industrial ecosystem. It connects factories generating surplus recyclable materials, offcuts, and manufacturing by-products with secondary recyclers, extruders, foundries, packaging mills, and raw material purchasers.

---

## 🚀 Live Demo & Local Server

- **Localhost URL:** [http://localhost:3000](http://localhost:3000)
- **Currency:** Indian Rupee (INR - ₹)
- **Target Geography:** Indian Industrial Nodes (Delhi NCR, Noida, Ghaziabad, Faridabad, Kanpur, Lucknow, Agra, Mathura, Mumbai, Pune)

---

## 🔑 Demo Account Credentials

A quick one-click role switcher is mounted at the top banner across all pages, allowing instant role switching without re-entering credentials.

| Role | Business Entity | Contact Person | Demo Email | Password |
|---|---|---|---|---|
| **Seller** | Sharma Polymers & Recyclers (Delhi) | Rajesh Sharma | `seller@waste2worth.demo` | `demo1234` |
| **Buyer** | Deshmukh EcoPackaging Ltd (Noida) | Ananya Deshmukh | `buyer@waste2worth.demo` | `demo1234` |
| **Both** | Singhania Metal & Fab Works (Faridabad) | Vikram Singhania | `both@waste2worth.demo` | `demo1234` |
| **Admin** | Waste2Worth Platform Ops (New Delhi) | Administrator | `admin@waste2worth.demo` | `demo1234` |

---

## 🛠️ Technology Stack

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript 5
- **Styling:** Tailwind CSS 3 (Custom Forest Green `#14532D`, Emerald `#10B981`, Light Green `#DCFCE7`, Clean Background `#F8FAF7`)
- **Icons:** Lucide React
- **Data Visualizations:** Recharts (Monthly sales trend, category distribution)
- **Data Persistence:** LocalStorage service layer with modular abstraction ready for direct migration to Supabase PostgreSQL & Auth.

---

## ✨ Features Implemented

### 1. Public Portal & Discovery
- **Hero & Landing Page (`/`):** Custom industrial typography, real-time material ticker, circular impact statistics, category cards, featured lots, and testimonials.
- **Marketplace (`/marketplace`):** Multi-attribute search, category pills, price range, city filter, verified seller filter, and sorting.
- **Listing Details (`/marketplace/[id]`):** Image gallery, comprehensive laboratory specification sheets, verified seller card, and direct negotiation modals.
- **How It Works (`/how-it-works`):** 4-step explanation of B2B scrap transaction lifecycle and audited governance.
- **About (`/about`):** Circular economy vision, informal scrap trade challenges, and platform principles.
- **Sustainability Dashboard (`/sustainability`):** Live calculated material recovery (tonnes diverted), completed deals, circulated value, and category distribution.

### 2. AI-Powered Innovations
- **Feature 10A: AI Waste Image Classification:**
  - Evaluates industrial material imagery or presets (PET flakes, baled OCC, aluminium trims, wooden pallets, textile clips, copper wire).
  - Automatically suggests category, material name, listing title, specifications, and realistic Indian price ranges (fully editable by seller).
- **Feature 10B: Smart Buyer Matching Engine:**
  - Deterministic mathematical algorithm calculating compatibility (0–100%) based on:
    - Material category alignment (35%)
    - Volume availability vs requested batch (25%)
    - Target unit budget / price threshold (20%)
    - Geographic cluster logistics proximity (10%)
    - Condition and KYC audit bonus (10%)
  - Highlights specific matching reasons for each recommendation.

### 3. B2B Transaction & Negotiation Workflow
- **Buyer Inquiry & Offer:** Submit requested quantity, offered unit rate, and logistics notes with real-time total amount calculations.
- **Supplier Decision Center:** Accept offers, decline, or issue counteroffers.
- **Automated Order Generation:** Accepting an offer creates a formal purchase order and automatically deducts stock from the listing inventory.

### 4. Logistics & Order Tracking (8 Stages)
- **Interactive Lifecycle Timeline:** Pending → Negotiation → Accepted → Pickup Scheduled → In Transit → Delivered → Completed.
- **Logistics Management:** Seller schedules pickup date, marks materials ready at warehouse, and buyer confirms weighbridge delivery receipt.

### 5. Governance & Admin Portal (`/admin`)
- Restricted access guard separating platform governance from public registration.
- **KYC Verification:** Review GSTIN, factory licenses, and pollution board consents with one-click Approve / Reject actions that issue the Verified Trust Badge.
- **Listings Moderation:** Feature premium lots or remove non-compliant listings.
- **Platform Analytics & Order Monitoring:** Full oversight across all transactions.

### 6. Messaging & Notifications
- In-app notification center with real-time unread badges and one-click jump to orders.
- Direct B2B conversation messaging interface with listing references and timestamps.

---

## 📦 Project Setup Instructions

```bash
# 1. Clone repository & install dependencies
npm install

# 2. Build production bundle
npm run build

# 3. Start production server
npm start
# Server listens at http://localhost:3000

# For local hot-reload development:
npm run dev
```

---

## ⚠️ Known Limitations & Future Roadmap

1. **Storage Layer:** The current MVP utilizes resilient browser `LocalStorage` with an asynchronous service facade. For multi-tenant production deployments with concurrent bidding, connect to Supabase PostgreSQL using the schema defined in `.env.example`.
2. **Transportation Execution:** Transportation coordination is manual; fleet booking APIs (e.g. WheelsEye, BlackBuck) can be integrated in Phase 2.
3. **Chemical Testing:** AI classification uses pattern and texture analysis; actual chemical purity testing requires physical laboratory weighbridge assay certificates.
