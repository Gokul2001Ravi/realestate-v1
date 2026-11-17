import uuid
from datetime import datetime
from sqlalchemy import (
    Column,
    String,
    Text,
    Numeric,
    Boolean,
    DateTime,
    ForeignKey,
    Enum,
    Integer,
    Float,
)
from sqlalchemy.orm import relationship
from backend.app.core.database import Base

class PropertyModel(Base):
    __tablename__ = "properties"

    id = Column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    title = Column(String(255), nullable=False)
    title_ta = Column(String(255), nullable=True)
    slug = Column(String(255), unique=True, index=True, nullable=False)
    
    description_en = Column(Text, nullable=False)
    description_ta = Column(Text, nullable=True)
    
    # Category: agricultural_land, residential_plot, commercial_land, farm_land, other_land
    property_type = Column(String(50), nullable=False, index=True)
    
    # Location Hierarchy
    state = Column(String(100), default="Tamil Nadu", nullable=False)
    district = Column(String(100), nullable=False, index=True)
    taluk = Column(String(100), nullable=False)
    village = Column(String(150), nullable=False)
    address = Column(String(255), nullable=True)
    
    latitude = Column(Float, nullable=True)
    longitude = Column(Float, nullable=True)
    
    # Land Area & Units (acres, cents, sq_ft, hectares)
    land_area = Column(Float, nullable=False)
    land_area_unit = Column(String(20), default="acres", nullable=False)
    
    # Financials
    total_price = Column(Numeric(14, 2), nullable=False)
    price_per_cent = Column(Numeric(14, 2), nullable=True)
    negotiable = Column(Boolean, default=False)
    
    # Specifications
    road_access = Column(String(255), nullable=False)
    road_access_ta = Column(String(255), nullable=True)
    road_width_ft = Column(Integer, nullable=True)
    
    water_availability = Column(String(255), nullable=False)
    water_availability_ta = Column(String(255), nullable=True)
    
    electricity_availability = Column(String(255), nullable=False)
    electricity_availability_ta = Column(String(255), nullable=True)
    
    land_classification = Column(String(100), nullable=False)  # Nansei, Punsei, Natham
    land_classification_ta = Column(String(100), nullable=True)
    
    approval_details = Column(String(255), nullable=True)
    approval_details_ta = Column(String(255), nullable=True)
    
    patta_available = Column(Boolean, default=True)
    chitta_adangal_available = Column(Boolean, default=True)
    fmb_available = Column(Boolean, default=True)
    
    # Lifecycle Status: draft, published, sold, inactive
    status = Column(String(20), default="draft", index=True, nullable=False)
    is_featured = Column(Boolean, default=False)
    
    # PRIVATE ADMIN ONLY FIELDS (Strictly confidential)
    private_brokerage_notes = Column(Text, nullable=True)
    private_survey_number = Column(String(100), nullable=True)
    owner_name = Column(String(150), nullable=True)
    owner_phone = Column(String(50), nullable=True)
    created_by = Column(String(150), nullable=True)
    
    created_at = Column(DateTime, default=datetime.utcnow, nullable=False)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow, nullable=False)

    # Relationships
    media = relationship("PropertyMediaModel", back_populates="property", cascade="all, delete-orphan", lazy="selectin")
    documents = relationship("PropertyDocumentModel", back_populates="property", cascade="all, delete-orphan", lazy="selectin")
    enquiries = relationship("EnquiryModel", back_populates="property", cascade="all, delete-orphan")
