from pydantic import BaseModel, Field
from typing import Optional

class IrrigationRecommendRequest(BaseModel):
    crop: str = Field(default="Tomato", description="Target crop name")
    soil_moisture: float = Field(default=30.0, description="Current soil moisture (%)")
    temperature: float = Field(default=28.0, description="Ambient temperature (°C)")
    rainfall_probability: float = Field(default=10.0, description="Rainfall probability (%)")
    growth_stage: str = Field(default="Vegetative", description="Crop growth stage (e.g. Seedling, Vegetative, Flowering, Harvesting)")
    soil_type: Optional[str] = Field(default="Loamy", description="Soil type (e.g. Clay, Sandy, Loamy)")

class IrrigationRecommendResponse(BaseModel):
    success: bool = Field(default=True, description="Indicates if request succeeded")
    irrigation: str = Field(default="Recommendation engine not implemented", description="Irrigation recommendation")
    fertilizer: str = Field(default="Recommendation engine not implemented", description="Fertilizer recommendation")
