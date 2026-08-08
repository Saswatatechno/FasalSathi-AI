from app.models.disease_model import DiseaseClassifierModel
from app.schemas.disease_schema import DiseasePredictionResponse

class DiseaseService:
    def __init__(self):
        self.model = DiseaseClassifierModel()

    async def predict_disease(self, file_bytes: bytes = None) -> DiseasePredictionResponse:
        """
        Processes leaf image file and invokes disease classifier model.
        """
        result = self.model.predict(file_bytes)
        return DiseasePredictionResponse(
            success=True,
            crop=result.get("crop", "Unknown"),
            disease=result.get("disease", "Uncertain"),
            confidence=result.get("confidence"),          # Optional[str] — qualitative
            advice=result.get("advice", "No advisory available."),
            observations=result.get("observations"),      # Optional[str]
        )

disease_service = DiseaseService()

