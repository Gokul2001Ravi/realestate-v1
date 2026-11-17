import uuid
from datetime import datetime
from sqlalchemy import Column, String, DateTime, ForeignKey
from sqlalchemy.orm import relationship
from backend.app.core.database import Base

class PropertyDocumentModel(Base):
    __tablename__ = "property_documents"

    id = Column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    property_id = Column(String(36), ForeignKey("properties.id", ondelete="CASCADE"), nullable=False, index=True)
    
    document_name = Column(String(255), nullable=False)  # Patta Copy, FMB Sketch, Encumbrance
    storage_path = Column(String(500), nullable=False)   # Private secure path
    created_at = Column(DateTime, default=datetime.utcnow, nullable=False)

    property = relationship("PropertyModel", back_populates="documents")
