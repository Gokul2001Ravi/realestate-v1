from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm
from backend.app.core.config import settings
from backend.app.core.security import (
    create_access_token,
    verify_password,
    get_password_hash,
    get_current_admin,
)
from backend.app.schemas.auth import Token, AdminLoginRequest, AdminProfile

router = APIRouter(prefix="/auth", tags=["Admin Authentication"])

@router.post("/login", response_model=Token)
async def login(credentials: AdminLoginRequest):
    # Check Admin 1
    if credentials.email == settings.ADMIN_1_EMAIL and credentials.password == settings.ADMIN_1_PASSWORD:
        access_token = create_access_token(subject=settings.ADMIN_1_EMAIL)
        return Token(
            access_token=access_token,
            token_type="bearer",
            admin_name=settings.ADMIN_1_NAME,
            email=settings.ADMIN_1_EMAIL,
            role="super_admin",
        )
    # Check Admin 2
    elif credentials.email == settings.ADMIN_2_EMAIL and credentials.password == settings.ADMIN_2_PASSWORD:
        access_token = create_access_token(subject=settings.ADMIN_2_EMAIL)
        return Token(
            access_token=access_token,
            token_type="bearer",
            admin_name=settings.ADMIN_2_NAME,
            email=settings.ADMIN_2_EMAIL,
            role="admin",
        )
    else:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid administrator credentials or unauthorized account",
            headers={"WWW-Authenticate": "Bearer"},
        )

@router.get("/me", response_model=AdminProfile)
async def get_current_admin_profile(current_admin: dict = Depends(get_current_admin)):
    return AdminProfile(
        email=current_admin["email"],
        name=current_admin["name"],
        role=current_admin["role"],
    )
