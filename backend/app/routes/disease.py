from fastapi import APIRouter, UploadFile, File, HTTPException
from typing import Optional
from app.schemas.disease_schema import DiseasePredictionResponse
from app.services.disease_service import disease_service

router = APIRouter(prefix="/disease", tags=["Disease Detection"])

@router.post("/predict", response_model=DiseasePredictionResponse)
async def predict_disease(file: Optional[UploadFile] = File(None)):
    """
    POST /api/disease/predict
    Accepts an uploaded leaf/crop image and returns disease prediction and advisory.
    """
    try:
        file_bytes = None
        if file is not None:
            file_bytes = await file.read()
        return await disease_service.predict_disease(file_bytes)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Disease prediction failed: {str(e)}")
