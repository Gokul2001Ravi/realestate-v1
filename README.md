# Nilam Prime (நிலம் பிரைம்)
### Premium Land Discovery & Personal Real Estate Brokerage Platform

A production-ready, mobile-first land discovery platform engineered for an individual real-estate broker in Tamil Nadu, India. Focuses exclusively on agricultural acreage, coconut farms, hillside estates, and verified residential/commercial plots.

---

## 1. Core Principles & Business Model

- **Curated Private Brokerage (Not a Public Open Marketplace)**:
  - Public visitors **cannot** register as sellers or publish listings.
  - Only **two authorized administrators** (The Principal Broker & Brokerage Assistant) can create, edit, manage, and publish land parcels.
- **Title Rigour & Document Transparency**:
  - Every acre is physically inspected, surveyed with 4K drones, and pre-vetted (Patta, Chitta, Adangal, FMB sketches, EC).
  - Private owner details and survey numbers are guarded in a confidential vault and **never** exposed over public APIs.
- **Bilingual Experience**:
  - Instant toggle between **English** and **Tamil (தமிழ்)** across all navigation, search filters, specifications, badges, and ground reality descriptions.

---

## 2. Technology Stack

| Layer | Technology | Key Role |
|---|---|---|
| **Frontend** | Next.js 15 (App Router), TypeScript, Tailwind CSS, Lucide React | Mobile-first responsive UI, dynamic i18n, drone video players, lightbox galleries, sticky contact CTA |
| **Backend** | Python 3.11, FastAPI, Pydantic v2 | High-performance asynchronous REST API, rate-limiting, JWT authentication, role verification |
| **Database** | PostgreSQL / Supabase, SQLAlchemy 2.0 (Async), Alembic | Relational data persistence with strict Row Level Security (RLS) policies |
| **Media Storage** | Cloudinary | 4K drone footage, aerial photography, and walkthrough video hosting |
| **Messaging** | WhatsApp Lead Generation | Pre-filled dynamic inquiries linking property title, district, and URL |

---

## 3. Visual Design System

- **Primary Colors**:
  - Deep Forest Green (`#182c1b` / `#0c170e`): Conveys nature, fertile soils, and institutional solidity.
  - Warm Ivory & Off-White (`#fdfcf9` / `#faf7f0`): Generous whitespace and airy readability.
  - Muted Gold (`#b58c49` / `#d4be98`): Subtle luxury accents for verified badges and price metrics.
  - Charcoal (`#1a1d23`): High-contrast typography.

---

## 4. Application Architecture

```
realestate-v1/
├── frontend/
│   ├── app/
│   │   ├── page.tsx                     # Cinematic Drone Hero, Quick Filters, Featured Lands
│   │   ├── properties/
│   │   │   ├── page.tsx                 # Explore Lands with multi-attribute filtering & sorting
│   │   │   └── [slug]/page.tsx          # Immersive Details, Specs Table, Lightbox, Enquiry Sidebar
│   │   ├── about/page.tsx               # Authentic Brokerage Story & Service Corridors
│   │   ├── contact/page.tsx             # Broker Contact Card, WhatsApp Action & Direct Enquiry
│   │   └── admin/
│   │       ├── login/page.tsx           # Private Admin Authentication
│   │       ├── dashboard/page.tsx       # KPI Stats (Published, Draft, Sold, Leads)
│   │       ├── properties/
│   │       │   ├── page.tsx             # Inventory Management (Status changes, Delete, Edit)
│   │       │   └── new/page.tsx         # Multi-step Property Creation & Media Uploader
│   │       └── enquiries/page.tsx       # Buyer Lead Pipeline (Notes, Call, WhatsApp)
│   ├── components/                      # Reusable components (Navbar, Footer, PropertyCard, etc.)
│   ├── context/                         # LanguageContext (EN / TA)
│   ├── lib/                             # brandConfig, sampleData, translations, utils
│   └── types/                           # TypeScript interfaces
│
├── backend/
│   ├── app/
│   │   ├── api/v1/                      # auth.py, properties.py, enquiries.py, media.py
│   │   ├── core/                        # config.py, database.py, security.py
│   │   ├── models/                      # SQLAlchemy 2.0 models (Property, Media, Enquiry, Profile)
│   │   ├── schemas/                     # Pydantic v2 validation schemas
│   │   └── main.py                      # FastAPI lifespan & router registration
│   ├── alembic/                         # Async migration environment
│   ├── supabase_schema_rls.sql          # Complete Supabase DDL + RLS security policies
│   └── requirements.txt
│
└── README.md
```

---

## 5. Security & Row Level Security (RLS)

- **Database Policies (`backend/supabase_schema_rls.sql`)**:
  - `properties`: Public visitors can **only** read `status = 'published'`. Sold/drafts are hidden.
  - `property_documents`: Public access is **strictly blocked** (`USING (false)`).
  - `enquiries`: Public visitors can submit leads; only authenticated admins can inspect or edit them.
- **Two Authorized Administrators**:
  - **Admin 1 (Principal Broker)**: `broker@nilamprime.com` (Super Admin)
  - **Admin 2 (Brokerage Assistant)**: `assistant@nilamprime.com` (Admin)

---

## 6. Getting Started

### Frontend Setup
```bash
cd frontend
npm install
npm run dev
# Running on http://localhost:3000
```

### Backend Setup
```bash
cd backend
python -m venv venv
.\venv\Scripts\activate   # On Windows
pip install -r requirements.txt
uvicorn backend.app.main:app --reload --port 8000
# API docs available at http://localhost:8000/docs
```

---

## 7. Deployment Instructions

- **Frontend (Vercel)**:
  - Connect repository and select root directory as `frontend`.
  - Set Environment Variables: `NEXT_PUBLIC_BRAND_NAME`, `NEXT_PUBLIC_API_URL`.
- **Backend (Render / Railway)**:
  - Build command: `pip install -r backend/requirements.txt`
  - Start command: `uvicorn backend.app.main:app --host 0.0.0.0 --port $PORT`
  - Set Environment Variables: `DATABASE_URL` (Supabase connection string), `SECRET_KEY`, `CLOUDINARY_*`.
