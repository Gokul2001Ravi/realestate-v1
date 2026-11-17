from typing import Optional
from fastapi import APIRouter, Depends, HTTPException, UploadFile, File, Form, status
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from backend.app.core.config import settings
from backend.app.core.database import get_db
from backend.app.core.security import get_current_admin
from backend.app.models.media import PropertyMediaModel
from backend.app.schemas.media import PropertyMediaResponse
import cloudinary
import cloudinary.uploader

router = APIRouter(prefix="/media", tags=["Media"])

if settings.CLOUDINARY_CLOUD_NAME and settings.CLOUDINARY_API_KEY:
    cloudinary.config(
        cloud_name=settings.CLOUDINARY_CLOUD_NAME,
        api_key=settings.CLOUDINARY_API_KEY,
        api_secret=settings.CLOUDINARY_API_SECRET,
        secure=True,
    )

@router.post("/upload", response_model=PropertyMediaResponse)
async def upload_property_media(
    property_id: str = Form(...),
    media_type: str = Form("image"),  # image, drone_photo, drone_video
    caption: Optional[str] = Form(None),
    is_cover: bool = Form(False),
    file: UploadFile = File(...),
    db: AsyncSession = Depends(get_db),
    admin: dict = Depends(get_current_admin),
):
    media_url = ""

    # If Cloudinary is configured, upload to Cloudinary
    if settings.CLOUDINARY_CLOUD_NAME and settings.CLOUDINARY_API_KEY:
        try:
            resource_type = "video" if "video" in media_type else "image"
            upload_result = cloudinary.uploader.upload(
                file.file,
                folder=f"nilam_prime/properties/{property_id}",
                resource_type=resource_type,
            )
            media_url = upload_result.get("secure_url")
        except Exception as e:
            raise HTTPException(
                status_code=500,
                detail=f"Cloudinary upload failed: {str(e)}"
            )
    else:
        # Fallback placeholder when Cloudinary credentials are being configured
        media_url = f"https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1600&q=80"

    # If setting as cover, unset other covers for this property
    if is_cover:
        existing_covers = await db.execute(
            select(PropertyMediaModel).where(
                PropertyMediaModel.property_id == property_id,
                PropertyMediaModel.is_cover == True,
            )
        )
        for cov in existing_covers.scalars().all():
            cov.is_cover = False

    new_media = PropertyMediaModel(
        property_id=property_id,
        media_url=media_url,
        media_type=media_type,
        caption=caption or file.filename,
        is_cover=is_cover,
        display_order=0,
    )
    db.add(new_media)
    await db.commit()
    await db.refresh(new_media)
    return new_media

@router.delete("/{media_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_property_media(
    media_id: str,
    db: AsyncSession = Depends(get_db),
    admin: dict = Depends(get_current_admin),
):
    result = await db.execute(select(PropertyMediaModel).where(PropertyMediaModel.id == media_id))
    media_obj = result.scalar_one_or_none()
    if not media_obj:
        raise HTTPException(status_code=404, detail="Media not found")

    await db.delete(media_obj)
    await db.commit()
    return None
