import uuid
from datetime import datetime
from sqlalchemy import Column, String, DateTime
from backend.app.core.database import Base

class ProfileModel(Base):
    __tablename__ = "profiles"

    id = Column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    email = Column(String(150), unique=True, index=True, nullable=False)
    hashed_password = Column(String(255), nullable=False)
    full_name = Column(String(150), nullable=False)
    role = Column(String(50), default="admin", nullable=False)  # super_admin, admin
    created_at = Column(DateTime, default=datetime.utcnow, nullable=False)
