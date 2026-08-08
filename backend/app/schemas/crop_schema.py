from pydantic import BaseModel, Field


class CropRecommendRequest(BaseModel):
    nitrogen: float = Field(
        ...,
        description="Nitrogen (N) content in soil (mg/kg)"
    )
    phosphorus: float = Field(
        ...,
        description="Phosphorus (P) content in soil (mg/kg)"
    )
    potassium: float = Field(
        ...,
        description="Potassium (K) content in soil (mg/kg)"
    )
    ph: float = Field(
        ...,
        description="Soil pH value"
    )
    temperature: float = Field(
        ...,
        description="Ambient temperature (°C)"
    )
    humidity: float = Field(
        ...,
        description="Relative humidity (%)"
    )
    rainfall: float = Field(
        ...,
        description="Rainfall (mm)"
    )


class CropRecommendResponse(BaseModel):
    success: bool = True
    recommended_crop: str
    reason: str