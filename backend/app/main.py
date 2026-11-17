import sys
import os

# Automatically ensure parent directories are on sys.path
_current_file = os.path.abspath(__file__)
_app_dir = os.path.dirname(_current_file)          # .../backend/app
_backend_dir = os.path.dirname(_app_dir)          # .../backend
_repo_root = os.path.dirname(_backend_dir)        # .../realestate-v1

for _dir in [_repo_root, _backend_dir]:
    if _dir and _dir not in sys.path:
        sys.path.insert(0, _dir)

from contextlib import asynccontextmanager
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from backend.app.core.config import settings
from backend.app.core.database import engine, Base, AsyncSessionLocal
from backend.app.models import (
    PropertyModel,
    PropertyMediaModel,
    ProfileModel,
    EnquiryModel,
)
from backend.app.api.v1 import auth, properties, enquiries, media
from backend.app.core.security import get_password_hash
from sqlalchemy import select
import logging

logger = logging.getLogger("uvicorn.error")

@asynccontextmanager
async def lifespan(app: FastAPI):
    try:
        # Initialize database tables
        async with engine.begin() as conn:
            await conn.run_sync(Base.metadata.create_all)

        # Seed the 2 authorized administrators & initial Tamil Nadu lands if not present
        async with AsyncSessionLocal() as session:
            # Check Admin 1
            admin1 = (await session.execute(
                select(ProfileModel).where(ProfileModel.email == settings.ADMIN_1_EMAIL)
            )).scalar_one_or_none()
            if not admin1:
                session.add(ProfileModel(
                    email=settings.ADMIN_1_EMAIL,
                    full_name=settings.ADMIN_1_NAME,
                    hashed_password=get_password_hash(settings.ADMIN_1_PASSWORD),
                    role="super_admin",
                ))

            # Check Admin 2
            admin2 = (await session.execute(
                select(ProfileModel).where(ProfileModel.email == settings.ADMIN_2_EMAIL)
            )).scalar_one_or_none()
            if not admin2:
                session.add(ProfileModel(
                    email=settings.ADMIN_2_EMAIL,
                    full_name=settings.ADMIN_2_NAME,
                    hashed_password=get_password_hash(settings.ADMIN_2_PASSWORD),
                    role="admin",
                ))

            # Check initial properties
            has_props = (await session.execute(select(PropertyModel))).first()
            if not has_props:
                seed_data = [
                    {
                        "title": "4.5 Acre Lush Yielding Coconut Farm with 2 Open Wells & Free Agro Power",
                        "title_ta": "4.5 ஏக்கர் விளைச்சல் தரும் தென்னந்தோப்பு - 2 கிணறுகள் & இலவச மும்முனை மின்சாரம்",
                        "slug": "pollachi-4-5-acre-coconut-farm-wells-free-power",
                        "description_en": "A rare, high-yielding 4.5-acre coconut grove situated in the fertile Aliyar canal basin near Pollachi. Features 420 matured, well-nurtured hybrid coconut palms yielding steady commercial harvest. The land possesses two perennial open wells with abundant water even in peak summer, backed by a sanctioned 7.5 HP free agricultural electricity connection. Complete tar road frontage allowing heavy vehicle access directly to the harvest yard. Fully fenced with barbed wire and stone pillars.",
                        "description_ta": "பொள்ளாச்சி ஆழியாறு பாசனப் பகுதியில் அமைந்துள்ள 4.5 ஏக்கர் செழிப்பான தென்னந்தோப்பு. சீரான விளைச்சல் தரும் 420 பராமரிக்கப்பட்ட தென்னை மரங்கள் உள்ளன. கோடையிலும் வற்றாத 2 பெரிய வெட்டுக் கிணறுகள் மற்றும் 7.5 HP இலவச விவசாய மின் இணைப்பு வசதி உள்ளது. கனரக வாகனங்கள் வந்து செல்லும் வகையில் 30 அடி தார்ச்சாலை முகப்பு வசதி மற்றும் முழுமையான வேலி அமைக்கப்பட்டுள்ளது.",
                        "property_type": "farm_land",
                        "state": "Tamil Nadu",
                        "district": "Coimbatore",
                        "taluk": "Pollachi",
                        "village": "Anamalai Border, Pollachi South",
                        "address": "Off Aliyar Road, Near Subbegoundenpudur",
                        "latitude": 10.582,
                        "longitude": 76.985,
                        "land_area": 4.5,
                        "land_area_unit": "acres",
                        "total_price": 18000000,
                        "price_per_cent": 40000,
                        "negotiable": True,
                        "road_access": "30 Ft Panchayat Tar Road",
                        "road_access_ta": "30 அடி பஞ்சாயத்து தார்ச்சாலை",
                        "road_width_ft": 30,
                        "water_availability": "2 Open Wells + Aliyar Canal Irrigation Feeder",
                        "water_availability_ta": "2 கிணறுகள் + ஆழியாறு வாய்க்கால் பாசன வசதி",
                        "electricity_availability": "Sanctioned 7.5 HP Free Agricultural Power",
                        "electricity_availability_ta": "7.5 HP இலவச விவசாய மும்முனை மின்சாரம்",
                        "land_classification": "Nansei (Fertile Wetland)",
                        "land_classification_ta": "நன்செய் (விவசாய நிலம்)",
                        "approval_details": "Clear Single-Owner Patta (Verified 30-Year Trace)",
                        "approval_details_ta": "தனி நபர் பட்டா (30 ஆண்டுகால வில்லங்கமற்ற ஆவணம்)",
                        "patta_available": True,
                        "chitta_adangal_available": True,
                        "fmb_available": True,
                        "status": "published",
                        "is_featured": True,
                        "created_by": settings.ADMIN_1_EMAIL,
                        "private_brokerage_notes": "Owner agreed on 2% brokerage commission. All tax receipts up to date.",
                        "private_survey_number": "Survey No: 284/2B",
                        "owner_name": "R. Palanisamy",
                        "owner_phone": "+91 94433 12345",
                        "media_urls": [
                            "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1600&q=80",
                            "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=80",
                        ],
                    },
                    {
                        "title": "2.8 Acre Western Ghats Foothill Farm Land with Stream Access",
                        "title_ta": "2.8 ஏக்கர் மேற்குத் தொடர்ச்சி மலை அடிவாரப் பண்ணை நிலம் - இயற்கை ஓடை வசதி",
                        "slug": "dindigul-2-8-acre-foothills-stream-farm",
                        "description_en": "Set against the dramatic backdrop of the Kodaikanal foothills in Dindigul district, this 2.8-acre virgin agricultural parcel features rich red-loam soil and a natural mountain stream bordering the northern edge. Mild, pleasant micro-climate year-round, making it superlative for organic farming, passion fruit, avocado, spices, or a private wellness farmhouse retreat.",
                        "description_ta": "கொடைக்கானல் மலை அடிவாரத்தில் அமைந்துள்ள 2.8 ஏக்கர் செம்மண் பண்ணை நிலம். நிலத்தின் வடக்கு எல்லையில் இயற்கை மலை ஓடை ஓடுகிறது. ஆண்டு முழுவதும் இதமான தட்பவெப்ப நிலை நிலவுவதால் வெண்ணெய் பழம் (Avocado), மிளகு, வாசனைப் பயிர்கள் அல்லது அமைதியான பண்ணை வீடு அமைக்க மிகச் சிறந்த இடம்.",
                        "property_type": "farm_land",
                        "state": "Tamil Nadu",
                        "district": "Dindigul",
                        "taluk": "Batlagundu",
                        "village": "Pattiveeranpatti Foothills",
                        "address": "Off Kodaikanal Ghat Road, Batlagundu Valley",
                        "latitude": 10.18,
                        "longitude": 77.75,
                        "land_area": 2.8,
                        "land_area_unit": "acres",
                        "total_price": 9800000,
                        "price_per_cent": 35000,
                        "negotiable": False,
                        "road_access": "24 Ft Metalled All-Weather Road",
                        "road_access_ta": "24 அடி அனைத்து பருவத்திற்குமான சாலை",
                        "road_width_ft": 24,
                        "water_availability": "Natural Perennial Mountain Stream + High Groundwater Table",
                        "water_availability_ta": "வற்றாத இயற்கை மலை ஓடை + உயர்ந்த நிலத்தடி நீர் மட்டம்",
                        "electricity_availability": "Agricultural Line Available on Boundary",
                        "electricity_availability_ta": "நிலத்தின் எல்லையிலேயே மின்கம்ப வசதி",
                        "land_classification": "Punsei (Fertile Red Soil)",
                        "land_classification_ta": "புன்செய் (வளமான செம்மண் நிலம்)",
                        "approval_details": "Patta Registered under Single Family with Direct Title",
                        "approval_details_ta": "நேரடி உரிமை கொண்ட தெளிவான குடும்ப பட்டா",
                        "patta_available": True,
                        "chitta_adangal_available": True,
                        "fmb_available": True,
                        "status": "published",
                        "is_featured": True,
                        "created_by": settings.ADMIN_1_EMAIL,
                        "private_brokerage_notes": "Ancestral partition deed verified. Clean single vendor.",
                        "private_survey_number": "Survey No: 142/4",
                        "owner_name": "S. Muthukrishnan",
                        "owner_phone": "+91 98422 67890",
                        "media_urls": [
                            "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1600&q=80",
                        ],
                    },
                    {
                        "title": "48 Cents Prime Residential Plot Enclave near Madurai AIIMS Belt",
                        "title_ta": "48 சென்ட் குடியிருப்பு மனை நிலம் - மதுரை எய்ம்ஸ் வளர்ச்சி பகுதி",
                        "slug": "madurai-48-cents-prime-residential-plots-aiims",
                        "description_en": "A gated-ready 48 Cents land block located in the high-appreciation Samayanallur-Thoppur growth corridor, 15 minutes from the upcoming Madurai AIIMS campus. Perfectly rectangular plot with clear 30-foot tar road on two sides (corner property). Sweet pot-water available at merely 70 feet depth.",
                        "description_ta": "மதுரை எய்ம்ஸ் வளர்ச்சிப் பகுதியான சமயநல்லூர்-தோப்பூர் சாலையில் அமைந்துள்ள 48 சென்ட் பிரதான குடியிருப்பு மனை நிலம். இரண்டு பக்கமும் 30 அடி தார்ச்சாலை வசதி கொண்ட கார்னர் மனை (Corner Plot). 70 அடியில் சுவையான குடிநீர் ஊற்று.",
                        "property_type": "residential_plot",
                        "state": "Tamil Nadu",
                        "district": "Madurai",
                        "taluk": "Madurai West",
                        "village": "Samayanallur",
                        "address": "Off Dindigul-Madurai 4-Lane NH, Samayanallur",
                        "latitude": 9.98,
                        "longitude": 78.05,
                        "land_area": 48,
                        "land_area_unit": "cents",
                        "total_price": 7200000,
                        "price_per_cent": 150000,
                        "negotiable": False,
                        "road_access": "30 Ft Blacktop Tar Road (Dual Frontage Corner Plot)",
                        "road_access_ta": "30 அடி தார்ச்சாலை (இரண்டு பக்க முகப்பு கார்னர் மனை)",
                        "road_width_ft": 30,
                        "water_availability": "Sweet Drinking Water Well at 70 Ft Depth",
                        "water_availability_ta": "70 அடியில் சுவையான குடிநீர் கிணற்று வசதி",
                        "electricity_availability": "TNEB Domestic Lines at Gate",
                        "electricity_availability_ta": "நிலத்தின் வாசலிலேயே TNEB மின் இணைப்பு",
                        "land_classification": "Residential Plotted Land (Dry/Natham)",
                        "land_classification_ta": "குடியிருப்பு நத்தம் / வீட்டு மனை நிலம்",
                        "approval_details": "DTCP Planning Approved Boundary, Clean Single Patta",
                        "approval_details_ta": "DTCP வரைமுறைக்குட்பட்ட தெளிவான தனி நபர் பட்டா",
                        "patta_available": True,
                        "chitta_adangal_available": True,
                        "fmb_available": True,
                        "status": "published",
                        "is_featured": True,
                        "created_by": settings.ADMIN_1_EMAIL,
                        "private_brokerage_notes": "Immediate registration possible. Clean title deed.",
                        "private_survey_number": "Survey No: 58/1A",
                        "owner_name": "T. Sundaram",
                        "owner_phone": "+91 97890 54321",
                        "media_urls": [
                            "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1600&q=80",
                        ],
                    },
                ]

                for s in seed_data:
                    media_urls = s.pop("media_urls", [])
                    p = PropertyModel(**s)
                    session.add(p)
                    await session.flush()

                    for idx, m_url in enumerate(media_urls):
                        m = PropertyMediaModel(
                            property_id=p.id,
                            media_url=m_url,
                            media_type="drone_photo" if idx == 0 else "image",
                            is_cover=(idx == 0),
                            display_order=idx,
                        )
                        session.add(m)

            await session.commit()
            logger.info("✓ Connected to database and verified tables successfully.")
    except Exception as e:
        logger.warning(f"⚠️ Database connection notice during startup: {e}")
        logger.warning("The API server is running, but please check your DATABASE_URL in .env.")

    yield

app = FastAPI(
    title=settings.PROJECT_NAME,
    version=settings.VERSION,
    openapi_url=f"{settings.API_V1_STR}/openapi.json",
    lifespan=lifespan,
)

# CORS Middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.BACKEND_CORS_ORIGINS,
    allow_origin_regex=r"https://.*\.vercel\.app",
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include Routers
app.include_router(auth.router, prefix=settings.API_V1_STR)
app.include_router(properties.router, prefix=settings.API_V1_STR)
app.include_router(enquiries.router, prefix=settings.API_V1_STR)
app.include_router(media.router, prefix=settings.API_V1_STR)

@app.get("/health")
async def health_check():
    return {
        "status": "healthy",
        "service": settings.PROJECT_NAME,
        "version": settings.VERSION,
    }
