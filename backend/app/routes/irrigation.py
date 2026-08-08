from fastapi import APIRouter, HTTPException

from app.schemas.irrigation_schema import (
    IrrigationRecommendRequest,
    IrrigationRecommendResponse,
)
from app.services.irrigation_service import irrigation_service

router = APIRouter(
    prefix="/irrigation",
    tags=["Irrigation & Fertilizer Advisory"],
)


@router.post("/recommend", response_model=IrrigationRecommendResponse)
async def recommend_irrigation(request: IrrigationRecommendRequest):
    """
    POST /api/irrigation/recommend
    Provides transparent irrigation and fertilizer decision-support guidance.
    """
    try:
        return await irrigation_service.recommend_irrigation(request)
    except Exception:
        raise HTTPException(
            status_code=500,
            detail="Unable to generate irrigation and fertilizer advice.",
        )
