from pydantic import BaseModel, Field, field_validator


SUPPORTED_CROPS = {
    "wheat",
    "rice",
    "corn",
    "maize",
    "cotton",
    "sugarcane",
    "tomato",
    "potato",
    "soybean",
}

SUPPORTED_GROWTH_STAGES = {
    "seedling",
    "vegetative",
    "flowering",
    "yield formation",
    "ripening",
}


class IrrigationRecommendRequest(BaseModel):
    """Validated inputs for the irrigation and fertilizer advisory."""

    crop: str = Field(..., min_length=2, max_length=50, description="Crop name")
    soil_moisture: float = Field(..., ge=0, le=100, description="Current soil moisture (%)")
    temperature: float = Field(..., ge=-20, le=60, description="Ambient temperature (°C)")
    rainfall_probability: float = Field(..., ge=0, le=100, description="Forecast rainfall probability (%)")
    growth_stage: str = Field(..., min_length=2, max_length=30, description="Crop growth stage")
    nitrogen: float = Field(..., ge=0, le=500, description="Soil nitrogen (mg/kg)")
    phosphorus: float = Field(..., ge=0, le=500, description="Soil phosphorus (mg/kg)")
    potassium: float = Field(..., ge=0, le=500, description="Soil potassium (mg/kg)")

    @field_validator("crop")
    @classmethod
    def validate_crop(cls, value: str) -> str:
        value = value.strip()
        if value.lower() not in SUPPORTED_CROPS:
            supported = ", ".join(sorted(SUPPORTED_CROPS))
            raise ValueError(f"Unsupported crop. Supported crops: {supported}")
        return value.title()

    @field_validator("growth_stage")
    @classmethod
    def validate_growth_stage(cls, value: str) -> str:
        value = value.strip().lower()
        normalized = {
            "seedling": "Seedling",
            "vegetative": "Vegetative",
            "flowering": "Flowering",
            "yield formation": "Yield Formation",
            "ripening": "Ripening",
        }
        if value not in SUPPORTED_GROWTH_STAGES:
            supported = ", ".join(sorted(SUPPORTED_GROWTH_STAGES))
            raise ValueError(f"Unsupported growth stage. Supported stages: {supported}")
        return normalized[value]


class IrrigationAdvisory(BaseModel):
    recommendation: str
    reason: str


class FertilizerAdvisory(BaseModel):
    recommendation: str
    reason: str
    nutrients_needing_attention: list[str] = Field(default_factory=list)


class IrrigationAdvisoryData(BaseModel):
    irrigation: IrrigationAdvisory
    fertilizer: FertilizerAdvisory


class IrrigationRecommendResponse(BaseModel):
    success: bool = True
    data: IrrigationAdvisoryData
