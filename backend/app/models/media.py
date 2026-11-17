import uuid
from datetime import datetime
from sqlalchemy import Column, String, Integer, Boolean, DateTime, ForeignKey
from sqlalchemy.orm import relationship
from backend.app.core.database import Base

class PropertyMediaModel(Base):
    __tablename__ = "property_media"

    id = Column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    property_id = Column(String(36), ForeignKey("properties.id", ondelete="CASCADE"), nullable=False, index=True)
    
    media_url = Column(String(500), nullable=False)
    # image, drone_photo, drone_video, walkthrough_video
    media_type = Column(String(50), default="image", nullable=False)
    is_cover = Column(Boolean, default=False)
    display_order = Column(Integer, default=0)
    caption = Column(String(255), nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow, nullable=False)

    property = relationship("PropertyModel", back_populates="media")
