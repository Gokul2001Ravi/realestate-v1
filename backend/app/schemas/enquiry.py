from pydantic import BaseModel, EmailStr
from typing import Optional
from datetime import datetime

class EnquiryCreate(BaseModel):
    property_id: Optional[str] = None
    customer_name: str
    phone: str
    email: Optional[EmailStr] = None
    message: str

class EnquiryUpdateStatus(BaseModel):
    status: str  # new, contacted, closed
    internal_notes: Optional[str] = None

class EnquiryResponse(BaseModel):
    id: str
    property_id: Optional[str] = None
    customer_name: str
    phone: str
    email: Optional[str] = None
    message: str
    status: str
    internal_notes: Optional[str] = None
    created_at: datetime
    updated_at: Optional[datetime] = None
    property_title: Optional[str] = None

    class Config:
        from_attributes = True
