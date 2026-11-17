import os
from typing import List
from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    PROJECT_NAME: str = "Premium Land Discovery API"
    VERSION: str = "1.0.0"
    API_V1_STR: str = "/api/v1"
    
    # Secret Key for JWT
    SECRET_KEY: str = os.getenv("SECRET_KEY", "nilam-prime-super-secret-jwt-key-2026-production")
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 60 * 24 * 7  # 7 days
    
    # Supabase PostgreSQL Database URL
    DATABASE_URL: str = os.getenv(
        "DATABASE_URL", 
        "postgresql+asyncpg://postgres:Gokul%407639709810@db.wvhjwksdeqommzzaxvja.supabase.co:5432/postgres"
    )
    
    # Cloudinary configuration
    CLOUDINARY_CLOUD_NAME: str = os.getenv("CLOUDINARY_CLOUD_NAME", "")
    CLOUDINARY_API_KEY: str = os.getenv("CLOUDINARY_API_KEY", "")
    CLOUDINARY_API_SECRET: str = os.getenv("CLOUDINARY_API_SECRET", "")
    
    # Authorized 2 Administrator accounts
    ADMIN_1_EMAIL: str = os.getenv("ADMIN_1_EMAIL", "broker@nilamprime.com")
    ADMIN_1_PASSWORD: str = os.getenv("ADMIN_1_PASSWORD", "BrokerPrime@2026")
    ADMIN_1_NAME: str = "K. Sundaralingam (Principal Broker)"
    
    ADMIN_2_EMAIL: str = os.getenv("ADMIN_2_EMAIL", "assistant@nilamprime.com")
    ADMIN_2_PASSWORD: str = os.getenv("ADMIN_2_PASSWORD", "AssistantPrime@2026")
    ADMIN_2_NAME: str = "S. Vignesh (Brokerage Assistant)"
    
    # CORS Origins
    BACKEND_CORS_ORIGINS: List[str] = [
        "http://localhost:3000",
        "http://127.0.0.1:3000",
        "https://nilamprime.vercel.app",
    ]

    class Config:
        env_file = [".env", "backend/.env"]
        case_sensitive = True
        extra = "allow"

settings = Settings()
