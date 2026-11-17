from pydantic import BaseModel
from typing import Optional
from datetime import datetime

class PropertyMediaBase(BaseModel):
    media_url: str
    media_type: str = "image"
    is_cover: bool = False
    display_order: int = 0
    caption: Optional[str] = None

class PropertyMediaCreate(PropertyMediaBase):
    pass

class PropertyMediaResponse(PropertyMediaBase):
    id: str
    property_id: str
    created_at: Optional[datetime] = None

    class Config:
        from_attributes = True

class PropertyDocumentResponse(BaseModel):
    id: str
    property_id: str
    document_name: str
    storage_path: str
    created_at: datetime

    class Config:
        from_attributes = True
