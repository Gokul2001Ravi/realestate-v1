import re
import uuid
from typing import List, Optional
from fastapi import APIRouter, Depends, HTTPException, Query, status
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, func, or_, and_, desc, asc
from backend.app.core.database import get_db
from backend.app.core.security import get_current_admin
from backend.app.models.property import PropertyModel
from backend.app.models.media import PropertyMediaModel
from backend.app.models.enquiry import EnquiryModel
from backend.app.schemas.property import (
    PropertyCreate,
    PropertyUpdate,
    PropertyPublicResponse,
    PropertyAdminResponse,
    DashboardStatsResponse,
)

router = APIRouter(prefix="/properties", tags=["Properties"])

def slugify(text: str) -> str:
    text = text.lower().strip()
    text = re.sub(r"[^\w\s-]", "", text)
    text = re.sub(r"[\s_-]+", "-", text)
    return text[:80].strip("-")

# ==========================================
# PUBLIC ENDPOINTS (Strictly Published Lands)
# ==========================================

@router.get("", response_model=List[PropertyPublicResponse])
async def list_public_properties(
    district: Optional[str] = Query(None),
    property_type: Optional[str] = Query(None),
    min_price: Optional[float] = Query(None),
    max_price: Optional[float] = Query(None),
    q: Optional[str] = Query(None),
    sort: Optional[str] = Query("latest"),
    db: AsyncSession = Depends(get_db),
):
    query = select(PropertyModel).where(PropertyModel.status == "published")

    if district:
        query = query.where(func.lower(PropertyModel.district) == district.lower())
    if property_type:
        query = query.where(PropertyModel.property_type == property_type)
    if min_price is not None:
        query = query.where(PropertyModel.total_price >= min_price)
    if max_price is not None:
        query = query.where(PropertyModel.total_price <= max_price)
    if q:
        search_filter = or_(
            PropertyModel.title.ilike(f"%{q}%"),
            PropertyModel.title_ta.ilike(f"%{q}%"),
            PropertyModel.village.ilike(f"%{q}%"),
            PropertyModel.taluk.ilike(f"%{q}%"),
            PropertyModel.district.ilike(f"%{q}%"),
        )
        query = query.where(search_filter)

    # Sorting
    if sort == "price_asc":
        query = query.order_by(asc(PropertyModel.total_price))
    elif sort == "price_desc":
        query = query.order_by(desc(PropertyModel.total_price))
    elif sort == "area_desc":
        query = query.order_by(desc(PropertyModel.land_area))
    else:
        query = query.order_by(desc(PropertyModel.created_at))

    result = await db.execute(query)
    properties = result.scalars().all()
    return properties

@router.get("/{slug}", response_model=PropertyPublicResponse)
async def get_public_property_by_slug(
    slug: str,
    db: AsyncSession = Depends(get_db),
):
    stmt = select(PropertyModel).where(
        PropertyModel.slug == slug,
        PropertyModel.status == "published"
    )
    result = await db.execute(stmt)
    property_obj = result.scalar_one_or_none()

    if not property_obj:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Property not found or not published for public viewing",
        )
    return property_obj

# ==========================================
# ADMIN PROTECTED ENDPOINTS
# ==========================================

@router.get("/admin/stats", response_model=DashboardStatsResponse)
async def get_dashboard_stats(
    db: AsyncSession = Depends(get_db),
    admin: dict = Depends(get_current_admin),
):
    total = (await db.execute(select(func.count(PropertyModel.id)))).scalar() or 0
    published = (await db.execute(select(func.count(PropertyModel.id)).where(PropertyModel.status == "published"))).scalar() or 0
    draft = (await db.execute(select(func.count(PropertyModel.id)).where(PropertyModel.status == "draft"))).scalar() or 0
    sold = (await db.execute(select(func.count(PropertyModel.id)).where(PropertyModel.status == "sold"))).scalar() or 0
    inactive = (await db.execute(select(func.count(PropertyModel.id)).where(PropertyModel.status == "inactive"))).scalar() or 0
    
    total_enquiries = (await db.execute(select(func.count(EnquiryModel.id)))).scalar() or 0
    new_enquiries = (await db.execute(select(func.count(EnquiryModel.id)).where(EnquiryModel.status == "new"))).scalar() or 0

    return DashboardStatsResponse(
        total_properties=total,
        published_properties=published,
        draft_properties=draft,
        sold_properties=sold,
        inactive_properties=inactive,
        total_enquiries=total_enquiries,
        new_enquiries=new_enquiries,
    )

@router.get("/admin/all", response_model=List[PropertyAdminResponse])
async def list_admin_properties(
    status_filter: Optional[str] = Query(None),
    db: AsyncSession = Depends(get_db),
    admin: dict = Depends(get_current_admin),
):
    query = select(PropertyModel).order_by(desc(PropertyModel.created_at))
    if status_filter:
        query = query.where(PropertyModel.status == status_filter)
    result = await db.execute(query)
    return result.scalars().all()

@router.get("/admin/get/{property_id}", response_model=PropertyAdminResponse)
async def get_admin_property(
    property_id: str,
    db: AsyncSession = Depends(get_db),
    admin: dict = Depends(get_current_admin),
):
    result = await db.execute(select(PropertyModel).where(PropertyModel.id == property_id))
    property_obj = result.scalar_one_or_none()
    if not property_obj:
        raise HTTPException(status_code=404, detail="Property not found")
    return property_obj

@router.post("", response_model=PropertyAdminResponse, status_code=status.HTTP_201_CREATED)
async def create_property(
    prop_in: PropertyCreate,
    db: AsyncSession = Depends(get_db),
    admin: dict = Depends(get_current_admin),
):
    # Generate unique slug
    base_slug = slugify(prop_in.title) or f"land-{uuid.uuid4().hex[:6]}"
    slug = base_slug
    counter = 1
    while (await db.execute(select(PropertyModel).where(PropertyModel.slug == slug))).scalar_one_or_none():
        slug = f"{base_slug}-{counter}"
        counter += 1

    property_data = prop_in.model_dump(exclude={"media"})
    property_data["slug"] = slug
    property_data["created_by"] = admin["email"]

    new_property = PropertyModel(**property_data)
    db.add(new_property)
    await db.flush()

    # Add media items if provided
    if prop_in.media:
        for idx, media_item in enumerate(prop_in.media):
            media_model = PropertyMediaModel(
                property_id=new_property.id,
                media_url=media_item.media_url,
                media_type=media_item.media_type,
                is_cover=(idx == 0 or media_item.is_cover),
                display_order=media_item.display_order or idx,
                caption=media_item.caption,
            )
            db.add(media_model)

    await db.commit()
    await db.refresh(new_property)
    return new_property

@router.put("/{property_id}", response_model=PropertyAdminResponse)
async def update_property(
    property_id: str,
    prop_in: PropertyUpdate,
    db: AsyncSession = Depends(get_db),
    admin: dict = Depends(get_current_admin),
):
    result = await db.execute(select(PropertyModel).where(PropertyModel.id == property_id))
    property_obj = result.scalar_one_or_none()
    if not property_obj:
        raise HTTPException(status_code=404, detail="Property not found")

    update_data = prop_in.model_dump(exclude_unset=True)
    for field, value in update_data.items():
        setattr(property_obj, field, value)

    await db.commit()
    await db.refresh(property_obj)
    return property_obj

@router.patch("/{property_id}/status", response_model=PropertyAdminResponse)
async def update_property_status(
    property_id: str,
    new_status: str = Query(..., regex="^(draft|published|sold|inactive)$"),
    db: AsyncSession = Depends(get_db),
    admin: dict = Depends(get_current_admin),
):
    result = await db.execute(select(PropertyModel).where(PropertyModel.id == property_id))
    property_obj = result.scalar_one_or_none()
    if not property_obj:
        raise HTTPException(status_code=404, detail="Property not found")

    property_obj.status = new_status
    await db.commit()
    await db.refresh(property_obj)
    return property_obj

@router.delete("/{property_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_property(
    property_id: str,
    db: AsyncSession = Depends(get_db),
    admin: dict = Depends(get_current_admin),
):
    result = await db.execute(select(PropertyModel).where(PropertyModel.id == property_id))
    property_obj = result.scalar_one_or_none()
    if not property_obj:
        raise HTTPException(status_code=404, detail="Property not found")

    await db.delete(property_obj)
    await db.commit()
    return None
