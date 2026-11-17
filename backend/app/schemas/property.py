from pydantic import BaseModel, Field
from typing import Optional, List
from datetime import datetime
from backend.app.schemas.media import PropertyMediaResponse, PropertyDocumentResponse, PropertyMediaCreate

class PropertyBase(BaseModel):
    title: str
    title_ta: Optional[str] = None
    description_en: str
    description_ta: Optional[str] = None
    property_type: str  # agricultural_land, residential_plot, commercial_land, farm_land, other_land
    state: str = "Tamil Nadu"
    district: str
    taluk: str
    village: str
    address: Optional[str] = None
    latitude: Optional[float] = None
    longitude: Optional[float] = None
    land_area: float
    land_area_unit: str = "acres"  # acres, cents, sq_ft, hectares
    total_price: float
    price_per_cent: Optional[float] = None
    negotiable: bool = False
    road_access: str
    road_access_ta: Optional[str] = None
    road_width_ft: Optional[int] = None
    water_availability: str
    water_availability_ta: Optional[str] = None
    electricity_availability: str
    electricity_availability_ta: Optional[str] = None
    land_classification: str
    land_classification_ta: Optional[str] = None
    approval_details: Optional[str] = None
    approval_details_ta: Optional[str] = None
    patta_available: bool = True
    chitta_adangal_available: bool = True
    fmb_available: bool = True
    is_featured: bool = False

class PropertyCreate(PropertyBase):
    slug: Optional[str] = None
    status: str = "draft"
    # Private Admin fields:
    private_brokerage_notes: Optional[str] = None
    private_survey_number: Optional[str] = None
    owner_name: Optional[str] = None
    owner_phone: Optional[str] = None
    media: Optional[List[PropertyMediaCreate]] = []

class PropertyUpdate(BaseModel):
    title: Optional[str] = None
    title_ta: Optional[str] = None
    description_en: Optional[str] = None
    description_ta: Optional[str] = None
    property_type: Optional[str] = None
    state: Optional[str] = None
    district: Optional[str] = None
    taluk: Optional[str] = None
    village: Optional[str] = None
    address: Optional[str] = None
    latitude: Optional[float] = None
    longitude: Optional[float] = None
    land_area: Optional[float] = None
    land_area_unit: Optional[str] = None
    total_price: Optional[float] = None
    price_per_cent: Optional[float] = None
    negotiable: Optional[bool] = None
    road_access: Optional[str] = None
    road_access_ta: Optional[str] = None
    road_width_ft: Optional[int] = None
    water_availability: Optional[str] = None
    water_availability_ta: Optional[str] = None
    electricity_availability: Optional[str] = None
    electricity_availability_ta: Optional[str] = None
    land_classification: Optional[str] = None
    land_classification_ta: Optional[str] = None
    approval_details: Optional[str] = None
    approval_details_ta: Optional[str] = None
    patta_available: Optional[bool] = None
    chitta_adangal_available: Optional[bool] = None
    fmb_available: Optional[bool] = None
    status: Optional[str] = None
    is_featured: Optional[bool] = None
    private_brokerage_notes: Optional[str] = None
    private_survey_number: Optional[str] = None
    owner_name: Optional[str] = None
    owner_phone: Optional[str] = None

# STRICT PUBLIC RESPONSE - Zero private data exposed
class PropertyPublicResponse(PropertyBase):
    id: str
    slug: str
    status: str
    created_at: datetime
    updated_at: datetime
    media: List[PropertyMediaResponse] = []

    class Config:
        from_attributes = True

# ADMIN RESPONSE - Full details including private vault
class PropertyAdminResponse(PropertyPublicResponse):
    private_brokerage_notes: Optional[str] = None
    private_survey_number: Optional[str] = None
    owner_name: Optional[str] = None
    owner_phone: Optional[str] = None
    created_by: Optional[str] = None
    documents: List[PropertyDocumentResponse] = []

    class Config:
        from_attributes = True

class DashboardStatsResponse(BaseModel):
    total_properties: int
    published_properties: int
    draft_properties: int
    sold_properties: int
    inactive_properties: int
    total_enquiries: int
    new_enquiries: int
