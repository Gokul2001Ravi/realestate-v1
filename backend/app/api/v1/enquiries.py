from typing import List, Optional
from fastapi import APIRouter, Depends, HTTPException, Query, Request, status
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, desc
from backend.app.core.database import get_db
from backend.app.core.security import get_current_admin
from backend.app.models.enquiry import EnquiryModel
from backend.app.models.property import PropertyModel
from backend.app.schemas.enquiry import EnquiryCreate, EnquiryUpdateStatus, EnquiryResponse

router = APIRouter(prefix="/enquiries", tags=["Enquiries"])

@router.post("", response_model=EnquiryResponse, status_code=status.HTTP_201_CREATED)
async def submit_public_enquiry(
    enquiry_in: EnquiryCreate,
    request: Request,
    db: AsyncSession = Depends(get_db),
):
    client_ip = request.client.host if request.client else None

    # Check property exists if property_id passed
    prop_title = None
    if enquiry_in.property_id:
        prop = (await db.execute(select(PropertyModel).where(PropertyModel.id == enquiry_in.property_id))).scalar_one_or_none()
        if prop:
            prop_title = prop.title

    new_enquiry = EnquiryModel(
        property_id=enquiry_in.property_id,
        customer_name=enquiry_in.customer_name,
        phone=enquiry_in.phone,
        email=enquiry_in.email,
        message=enquiry_in.message,
        status="new",
        ip_address=client_ip,
    )
    db.add(new_enquiry)
    await db.commit()
    await db.refresh(new_enquiry)

    res = EnquiryResponse.model_validate(new_enquiry)
    res.property_title = prop_title
    return res

@router.get("", response_model=List[EnquiryResponse])
async def list_admin_enquiries(
    status_filter: Optional[str] = Query(None),
    db: AsyncSession = Depends(get_db),
    admin: dict = Depends(get_current_admin),
):
    query = select(EnquiryModel).order_by(desc(EnquiryModel.created_at))
    if status_filter:
        query = query.where(EnquiryModel.status == status_filter)
    result = await db.execute(query)
    enquiries = result.scalars().all()

    # Populate property titles
    response_list = []
    for enq in enquiries:
        res = EnquiryResponse.model_validate(enq)
        if enq.property_id:
            prop = (await db.execute(select(PropertyModel).where(PropertyModel.id == enq.property_id))).scalar_one_or_none()
            if prop:
                res.property_title = prop.title
        response_list.append(res)
    return response_list

@router.patch("/{enquiry_id}", response_model=EnquiryResponse)
async def update_enquiry_status(
    enquiry_id: str,
    update_data: EnquiryUpdateStatus,
    db: AsyncSession = Depends(get_db),
    admin: dict = Depends(get_current_admin),
):
    result = await db.execute(select(EnquiryModel).where(EnquiryModel.id == enquiry_id))
    enquiry_obj = result.scalar_one_or_none()
    if not enquiry_obj:
        raise HTTPException(status_code=404, detail="Enquiry not found")

    enquiry_obj.status = update_data.status
    if update_data.internal_notes is not None:
        enquiry_obj.internal_notes = update_data.internal_notes

    await db.commit()
    await db.refresh(enquiry_obj)
    return enquiry_obj

@router.delete("/{enquiry_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_enquiry(
    enquiry_id: str,
    db: AsyncSession = Depends(get_db),
    admin: dict = Depends(get_current_admin),
):
    result = await db.execute(select(EnquiryModel).where(EnquiryModel.id == enquiry_id))
    enquiry_obj = result.scalar_one_or_none()
    if not enquiry_obj:
        raise HTTPException(status_code=404, detail="Enquiry not found")

    await db.delete(enquiry_obj)
    await db.commit()
    return None
