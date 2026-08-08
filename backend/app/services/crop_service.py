from app.models.crop_model import CropRecommenderModel
from app.schemas.crop_schema import (
    CropRecommendRequest,
    CropRecommendResponse
)


class CropService:
    def __init__(self):
        self.model = CropRecommenderModel()

    async def recommend_crop(
        self,
        request: CropRecommendRequest
    ) -> CropRecommendResponse:

        features = request.model_dump()

        result = self.model.predict(features)

        return CropRecommendResponse(
            success=True,
            recommended_crop=result["recommended_crop"],
            reason=result["reason"]
        )


crop_service = CropService()