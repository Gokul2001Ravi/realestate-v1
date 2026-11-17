-- =====================================================================
-- SUPABASE POSTGRESQL SCHEMA WITH ROW LEVEL SECURITY (RLS) POLICIES
-- PLATFORM: Premium Land Discovery & Real Estate Brokerage Platform
-- =====================================================================

-- 1. Enable UUID Extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 2. Profiles Table (Authorized Administrators)
CREATE TABLE IF NOT EXISTS profiles (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email VARCHAR(150) UNIQUE NOT NULL,
    hashed_password VARCHAR(255) NOT NULL,
    full_name VARCHAR(150) NOT NULL,
    role VARCHAR(50) DEFAULT 'admin' NOT NULL CHECK (role IN ('super_admin', 'admin')),
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- 3. Properties Table
CREATE TABLE IF NOT EXISTS properties (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title VARCHAR(255) NOT NULL,
    title_ta VARCHAR(255),
    slug VARCHAR(255) UNIQUE NOT NULL,
    description_en TEXT NOT NULL,
    description_ta TEXT,
    property_type VARCHAR(50) NOT NULL CHECK (property_type IN ('agricultural_land', 'residential_plot', 'commercial_land', 'farm_land', 'other_land')),
    state VARCHAR(100) DEFAULT 'Tamil Nadu' NOT NULL,
    district VARCHAR(100) NOT NULL,
    taluk VARCHAR(100) NOT NULL,
    village VARCHAR(150) NOT NULL,
    address VARCHAR(255),
    latitude NUMERIC(10, 6),
    longitude NUMERIC(10, 6),
    land_area NUMERIC(10, 2) NOT NULL,
    land_area_unit VARCHAR(20) DEFAULT 'acres' NOT NULL CHECK (land_area_unit IN ('acres', 'cents', 'sq_ft', 'hectares')),
    total_price NUMERIC(14, 2) NOT NULL,
    price_per_cent NUMERIC(14, 2),
    negotiable BOOLEAN DEFAULT FALSE NOT NULL,
    road_access VARCHAR(255) NOT NULL,
    road_access_ta VARCHAR(255),
    road_width_ft INTEGER,
    water_availability VARCHAR(255) NOT NULL,
    water_availability_ta VARCHAR(255),
    electricity_availability VARCHAR(255) NOT NULL,
    electricity_availability_ta VARCHAR(255),
    land_classification VARCHAR(100) NOT NULL,
    land_classification_ta VARCHAR(100),
    approval_details VARCHAR(255),
    approval_details_ta VARCHAR(255),
    patta_available BOOLEAN DEFAULT TRUE NOT NULL,
    chitta_adangal_available BOOLEAN DEFAULT TRUE NOT NULL,
    fmb_available BOOLEAN DEFAULT TRUE NOT NULL,
    status VARCHAR(20) DEFAULT 'draft' NOT NULL CHECK (status IN ('draft', 'published', 'sold', 'inactive')),
    is_featured BOOLEAN DEFAULT FALSE NOT NULL,
    
    -- Private Admin Confidential Columns
    private_brokerage_notes TEXT,
    private_survey_number VARCHAR(100),
    owner_name VARCHAR(150),
    owner_phone VARCHAR(50),
    created_by VARCHAR(150),
    
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_properties_district ON properties(district);
CREATE INDEX IF NOT EXISTS idx_properties_status ON properties(status);
CREATE INDEX IF NOT EXISTS idx_properties_slug ON properties(slug);

-- 4. Property Media Table
CREATE TABLE IF NOT EXISTS property_media (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    property_id UUID NOT NULL REFERENCES properties(id) ON DELETE CASCADE,
    media_url VARCHAR(500) NOT NULL,
    media_type VARCHAR(50) DEFAULT 'image' NOT NULL CHECK (media_type IN ('image', 'drone_photo', 'drone_video', 'walkthrough_video')),
    is_cover BOOLEAN DEFAULT FALSE NOT NULL,
    display_order INTEGER DEFAULT 0 NOT NULL,
    caption VARCHAR(255),
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_property_media_property_id ON property_media(property_id);

-- 5. Property Documents Table (Confidential Legal Vault)
CREATE TABLE IF NOT EXISTS property_documents (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    property_id UUID NOT NULL REFERENCES properties(id) ON DELETE CASCADE,
    document_name VARCHAR(255) NOT NULL,
    storage_path VARCHAR(500) NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- 6. Enquiries Table
CREATE TABLE IF NOT EXISTS enquiries (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    property_id UUID REFERENCES properties(id) ON DELETE SET NULL,
    customer_name VARCHAR(150) NOT NULL,
    phone VARCHAR(50) NOT NULL,
    email VARCHAR(150),
    message TEXT NOT NULL,
    status VARCHAR(20) DEFAULT 'new' NOT NULL CHECK (status IN ('new', 'contacted', 'closed')),
    internal_notes TEXT,
    ip_address VARCHAR(45),
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_enquiries_status ON enquiries(status);
CREATE INDEX IF NOT EXISTS idx_enquiries_property_id ON enquiries(property_id);

-- =====================================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- =====================================================================

-- Enable RLS on all tables
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE properties ENABLE ROW LEVEL SECURITY;
ALTER TABLE property_media ENABLE ROW LEVEL SECURITY;
ALTER TABLE property_documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE enquiries ENABLE ROW LEVEL SECURITY;

-- 1. PROFILES POLICIES
-- Only authenticated users (admins) can view profiles
CREATE POLICY "Admins can view profiles"
    ON profiles FOR SELECT
    TO authenticated
    USING (true);

-- 2. PROPERTIES POLICIES
-- Public visitors can read ONLY published properties
CREATE POLICY "Public visitors can view published properties only"
    ON properties FOR SELECT
    TO anon, authenticated
    USING (status = 'published');

-- Only authenticated administrators can insert, update, or delete properties
CREATE POLICY "Admins have full CRUD access to properties"
    ON properties FOR ALL
    TO authenticated
    USING (true)
    WITH CHECK (true);

-- 3. PROPERTY MEDIA POLICIES
-- Public visitors can read media linked to published properties
CREATE POLICY "Public visitors can view media of published properties"
    ON property_media FOR SELECT
    TO anon, authenticated
    USING (
        EXISTS (
            SELECT 1 FROM properties 
            WHERE properties.id = property_media.property_id 
            AND properties.status = 'published'
        )
    );

-- Admins full access to media
CREATE POLICY "Admins have full access to property media"
    ON property_media FOR ALL
    TO authenticated
    USING (true)
    WITH CHECK (true);

-- 4. PROPERTY DOCUMENTS POLICIES
-- Public visitors are STRICTLY DENIED access
CREATE POLICY "Public cannot access confidential documents"
    ON property_documents FOR SELECT
    TO anon
    USING (false);

-- Only authenticated administrators can access documents
CREATE POLICY "Admins can access property documents"
    ON property_documents FOR ALL
    TO authenticated
    USING (true)
    WITH CHECK (true);

-- 5. ENQUIRIES POLICIES
-- Anyone (public visitors) can submit an enquiry
CREATE POLICY "Anyone can submit an enquiry"
    ON enquiries FOR INSERT
    TO anon, authenticated
    WITH CHECK (true);

-- Only authenticated administrators can read, update, or delete enquiries
CREATE POLICY "Admins can manage enquiries"
    ON enquiries FOR SELECT
    TO authenticated
    USING (true);

CREATE POLICY "Admins can update enquiries"
    ON enquiries FOR UPDATE
    TO authenticated
    USING (true)
    WITH CHECK (true);

CREATE POLICY "Admins can delete enquiries"
    ON enquiries FOR DELETE
    TO authenticated
    USING (true);


-- =====================================================================
-- INITIAL SEED DATA: 2 AUTHORIZED ADMINS & CURATED TAMIL NADU LANDS
-- =====================================================================

-- 1. Insert 2 Authorized Administrators
INSERT INTO profiles (email, full_name, hashed_password, role)
VALUES 
(
    'broker@nilamprime.com',
    'K. Sundaralingam (Principal Broker)',
    '$2b$12$HkzCSTbXMaWFADEhNZs4cugqlki8tBiCX14swpNRlYCNziL4lLJIm',
    'super_admin'
),
(
    'assistant@nilamprime.com',
    'S. Vignesh (Brokerage Assistant)',
    '$2b$12$HkzCSTbXMaWFADEhNZs4cugqlki8tBiCX14swpNRlYCNziL4lLJIm',
    'admin'
)
ON CONFLICT (email) DO NOTHING;

-- 2. Insert Curated Tamil Nadu Land Properties
INSERT INTO properties (
    id, title, title_ta, slug, description_en, description_ta, property_type,
    state, district, taluk, village, address, latitude, longitude,
    land_area, land_area_unit, total_price, price_per_cent, negotiable,
    road_access, road_access_ta, road_width_ft, water_availability, water_availability_ta,
    electricity_availability, electricity_availability_ta, land_classification, land_classification_ta,
    approval_details, approval_details_ta, patta_available, chitta_adangal_available, fmb_available,
    status, is_featured, created_by, private_brokerage_notes, private_survey_number, owner_name, owner_phone
)
VALUES
(
    'd1a1b1c1-0001-4000-8000-000000000001',
    '4.5 Acre Lush Yielding Coconut Farm with 2 Open Wells & Free Agro Power',
    '4.5 ஏக்கர் விளைச்சல் தரும் தென்னந்தோப்பு - 2 கிணறுகள் & இலவச மும்முனை மின்சாரம்',
    'pollachi-4-5-acre-coconut-farm-wells-free-power',
    'A rare, high-yielding 4.5-acre coconut grove situated in the fertile Aliyar canal basin near Pollachi. Features 420 matured, well-nurtured hybrid coconut palms yielding steady commercial harvest. The land possesses two perennial open wells with abundant water even in peak summer, backed by a sanctioned 7.5 HP free agricultural electricity connection. Complete tar road frontage allowing heavy vehicle access directly to the harvest yard. Fully fenced with barbed wire and stone pillars.',
    'பொள்ளாச்சி ஆழியாறு பாசனப் பகுதியில் அமைந்துள்ள 4.5 ஏக்கர் செழிப்பான தென்னந்தோப்பு. சீரான விளைச்சல் தரும் 420 பராமரிக்கப்பட்ட தென்னை மரங்கள் உள்ளன. கோடையிலும் வற்றாத 2 பெரிய வெட்டுக் கிணறுகள் மற்றும் 7.5 HP இலவச விவசாய மின் இணைப்பு வசதி உள்ளது. கனரக வாகனங்கள் வந்து செல்லும் வகையில் 30 அடி தார்ச்சாலை முகப்பு வசதி மற்றும் முழுமையான வேலி அமைக்கப்பட்டுள்ளது.',
    'farm_land', 'Tamil Nadu', 'Coimbatore', 'Pollachi', 'Anamalai Border, Pollachi South',
    'Off Aliyar Road, Near Subbegoundenpudur', 10.582, 76.985, 4.5, 'acres', 18000000, 40000, true,
    '30 Ft Panchayat Tar Road', '30 அடி பஞ்சாயத்து தார்ச்சாலை', 30,
    '2 Open Wells + Aliyar Canal Irrigation Feeder', '2 கிணறுகள் + ஆழியாறு வாய்க்கால் பாசன வசதி',
    'Sanctioned 7.5 HP Free Agricultural Power', '7.5 HP இலவச விவசாய மும்முனை மின்சாரம்',
    'Nansei (Fertile Wetland)', 'நன்செய் (விவசாய நிலம்)',
    'Clear Single-Owner Patta (Verified 30-Year Trace)', 'தனி நபர் பட்டா (30 ஆண்டுகால வில்லங்கமற்ற ஆவணம்)',
    true, true, true, 'published', true, 'broker@nilamprime.com',
    'Owner agreed on 2% brokerage commission. All tax receipts up to date.', 'Survey No: 284/2B', 'R. Palanisamy', '+91 94433 12345'
),
(
    'd1a1b1c1-0002-4000-8000-000000000002',
    '2.8 Acre Western Ghats Foothill Farm Land with Stream Access',
    '2.8 ஏக்கர் மேற்குத் தொடர்ச்சி மலை அடிவாரப் பண்ணை நிலம் - இயற்கை ஓடை வசதி',
    'dindigul-2-8-acre-foothills-stream-farm',
    'Set against the dramatic backdrop of the Kodaikanal foothills in Dindigul district, this 2.8-acre virgin agricultural parcel features rich red-loam soil and a natural mountain stream bordering the northern edge. Mild, pleasant micro-climate year-round, making it superlative for organic farming, passion fruit, avocado, spices, or a private wellness farmhouse retreat. Connected by a 24-foot metalled road.',
    'கொடைக்கானல் மலை அடிவாரத்தில் அமைந்துள்ள 2.8 ஏக்கர் செம்மண் பண்ணை நிலம். நிலத்தின் வடக்கு எல்லையில் இயற்கை மலை ஓடை ஓடுகிறது. ஆண்டு முழுவதும் இதமான தட்பவெப்ப நிலை நிலவுவதால் வெண்ணெய் பழம் (Avocado), மிளகு, வாசனைப் பயிர்கள் அல்லது அமைதியான பண்ணை வீடு அமைக்க மிகச் சிறந்த இடம். 24 அடி சாலை வசதியும் உள்ளது.',
    'farm_land', 'Tamil Nadu', 'Dindigul', 'Batlagundu', 'Pattiveeranpatti Foothills',
    'Off Kodaikanal Ghat Road, Batlagundu Valley', 10.18, 77.75, 2.8, 'acres', 9800000, 35000, false,
    '24 Ft Metalled All-Weather Road', '24 அடி அனைத்து பருவத்திற்குமான சாலை', 24,
    'Natural Perennial Mountain Stream + High Groundwater Table', 'வற்றாத இயற்கை மலை ஓடை + உயர்ந்த நிலத்தடி நீர் மட்டம்',
    'Agricultural Line Available on Boundary', 'நிலத்தின் எல்லையிலேயே மின்கம்ப வசதி',
    'Punsei (Fertile Red Soil)', 'புன்செய் (வளமான செம்மண் நிலம்)',
    'Patta Registered under Single Family with Direct Title', 'நேரடி உரிமை கொண்ட தெளிவான குடும்ப பட்டா',
    true, true, true, 'published', true, 'broker@nilamprime.com',
    'Ancestral partition deed verified. Clean single vendor.', 'Survey No: 142/4', 'S. Muthukrishnan', '+91 98422 67890'
),
(
    'd1a1b1c1-0003-4000-8000-000000000003',
    '48 Cents Prime Residential Plot Enclave near Madurai AIIMS Belt',
    '48 சென்ட் குடியிருப்பு மனை நிலம் - மதுரை எய்ம்ஸ் வளர்ச்சி பகுதி',
    'madurai-48-cents-prime-residential-plots-aiims',
    'A gated-ready 48 Cents land block located in the high-appreciation Samayanallur-Thoppur growth corridor, 15 minutes from the upcoming Madurai AIIMS campus. Perfectly rectangular plot with clear 30-foot tar road on two sides (corner property). Sweet pot-water available at merely 70 feet depth.',
    'மதுரை எய்ம்ஸ் வளர்ச்சிப் பகுதியான சமயநல்லூர்-தோப்பூர் சாலையில் அமைந்துள்ள 48 சென்ட் பிரதான குடியிருப்பு மனை நிலம். இரண்டு பக்கமும் 30 அடி தார்ச்சாலை வசதி கொண்ட கார்னர் மனை (Corner Plot). 70 அடியில் சுவையான குடிநீர் ஊற்று.',
    'residential_plot', 'Tamil Nadu', 'Madurai', 'Madurai West', 'Samayanallur',
    'Off Dindigul-Madurai 4-Lane NH, Samayanallur', 9.98, 78.05, 48, 'cents', 7200000, 150000, false,
    '30 Ft Blacktop Tar Road (Dual Frontage Corner Plot)', '30 அடி தார்ச்சாலை (இரண்டு பக்க முகப்பு கார்னர் மனை)', 30,
    'Sweet Drinking Water Well at 70 Ft Depth', '70 அடியில் சுவையான குடிநீர் கிணற்று வசதி',
    'TNEB Domestic Lines at Gate', 'நிலத்தின் வாசலிலேயே TNEB மின் இணைப்பு',
    'Residential Plotted Land (Dry/Natham)', 'குடியிருப்பு நத்தம் / வீட்டு மனை நிலம்',
    'DTCP Planning Approved Boundary, Clean Single Patta', 'DTCP வரைமுறைக்குட்பட்ட தெளிவான தனி நபர் பட்டா',
    true, true, true, 'published', true, 'broker@nilamprime.com',
    'Immediate registration possible. Clean title deed.', 'Survey No: 58/1A', 'T. Sundaram', '+91 97890 54321'
)
ON CONFLICT (slug) DO NOTHING;

-- 3. Insert Property Media
INSERT INTO property_media (property_id, media_url, media_type, is_cover, display_order, caption)
VALUES
(
    'd1a1b1c1-0001-4000-8000-000000000001',
    'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1600&q=80',
    'drone_photo', true, 1, 'High-angle aerial view of coconut grove'
),
(
    'd1a1b1c1-0002-4000-8000-000000000002',
    'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1600&q=80',
    'drone_photo', true, 1, 'Scenic Western Ghats foothill parcel'
),
(
    'd1a1b1c1-0003-4000-8000-000000000003',
    'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1600&q=80',
    'drone_photo', true, 1, 'Residential plotted corner land'
)
ON CONFLICT DO NOTHING;
