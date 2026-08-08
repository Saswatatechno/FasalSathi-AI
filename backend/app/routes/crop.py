from fastapi import APIRouter, HTTPException
from app.schemas.crop_schema import CropRecommendRequest, CropRecommendResponse
from app.services.crop_service import crop_service

router = APIRouter(prefix="/crop", tags=["Crop Recommendation"])


@router.post("/recommend", response_model=CropRecommendResponse)
async def recommend_crop(request: CropRecommendRequest):
    """
    POST /api/crop/recommend
    Accepts soil and environmental parameters to recommend a suitable crop.
    """
    try:
        return await crop_service.recommend_crop(request)

    except Exception as e:
        import traceback
        traceback.print_exc()

        raise HTTPException(
            status_code=500,
            detail=f"Crop recommendation failed: {type(e).__name__}: {str(e)}"
        )