from pydantic import BaseModel, Field
from typing import Optional

class DiseasePredictionResponse(BaseModel):
    success: bool = Field(default=True, description="Indicates if request succeeded")
    crop: str = Field(default="Unknown", description="Detected crop type")
    disease: str = Field(default="Model not implemented", description="Detected disease or health status")
    confidence: Optional[str] = Field(
        default=None,
        description="Qualitative confidence level: 'High', 'Medium', or 'Low'. "
                    "Null when the model cannot assess confidence."
    )
    advice: str = Field(default="Disease detection module is under development.", description="Recommended treatment advice")
    observations: Optional[str] = Field(default=None, description="Visual symptoms observed in the image")
