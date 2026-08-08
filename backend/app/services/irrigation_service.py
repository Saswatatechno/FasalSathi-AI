from app.schemas.irrigation_schema import (
    FertilizerAdvisory,
    IrrigationAdvisory,
    IrrigationAdvisoryData,
    IrrigationRecommendRequest,
    IrrigationRecommendResponse,
)


# Broad screening thresholds for an MVP. They are intentionally not fertilizer
# prescriptions; actual recommendations should use a local soil test and crop guidance.
NUTRIENT_LOW_THRESHOLDS = {
    "Nitrogen": 50.0,
    "Phosphorus": 20.0,
    "Potassium": 80.0,
}

# Approximate soil-moisture levels at which irrigation should start being considered.
BASE_MOISTURE_THRESHOLDS = {
    "Rice": 40.0,
    "Sugarcane": 45.0,
    "Cotton": 35.0,
    "Wheat": 35.0,
    "Corn": 35.0,
    "Maize": 35.0,
    "Tomato": 35.0,
    "Potato": 35.0,
    "Soybean": 35.0,
}

SENSITIVE_GROWTH_STAGES = {"Flowering", "Yield Formation"}


class IrrigationService:
    """Transparent rule-based advisory engine for the hackathon MVP."""

    def _irrigation_advisory(self, request: IrrigationRecommendRequest) -> IrrigationAdvisory:
        threshold = BASE_MOISTURE_THRESHOLDS.get(request.crop, 35.0)

        if request.growth_stage in SENSITIVE_GROWTH_STAGES:
            threshold += 5.0

        moisture = request.soil_moisture
        rain = request.rainfall_probability
        temperature = request.temperature

        if rain >= 60 and moisture <= threshold:
            return IrrigationAdvisory(
                recommendation="Consider delaying irrigation and monitor soil moisture.",
                reason=(
                    f"Soil moisture is {moisture:.0f}%, but forecast rainfall probability "
                    f"is {rain:.0f}%, so immediate watering may be unnecessary."
                ),
            )

        if moisture < threshold:
            if temperature >= 32:
                reason = (
                    f"Soil moisture is {moisture:.0f}%, below the {threshold:.0f}% "
                    f"screening level for {request.crop} at the {request.growth_stage.lower()} stage, "
                    f"and the temperature is relatively high at {temperature:.1f}°C."
                )
            else:
                reason = (
                    f"Soil moisture is {moisture:.0f}%, below the {threshold:.0f}% "
                    f"screening level for {request.crop} at the {request.growth_stage.lower()} stage."
                )

            return IrrigationAdvisory(
                recommendation="Irrigation may be required.",
                reason=reason,
            )

        if moisture < threshold + 10:
            return IrrigationAdvisory(
                recommendation="Monitor soil moisture and consider irrigation soon.",
                reason=(
                    f"Soil moisture is {moisture:.0f}%, close to the {threshold:.0f}% "
                    f"screening level. Rainfall probability is {rain:.0f}%."
                ),
            )

        return IrrigationAdvisory(
            recommendation="Irrigation may not be required immediately.",
            reason=(
                f"Soil moisture is {moisture:.0f}%, above the {threshold:.0f}% "
                f"screening level for the selected crop and growth stage."
            ),
        )

    def _fertilizer_advisory(self, request: IrrigationRecommendRequest) -> FertilizerAdvisory:
        nutrients = {
            "Nitrogen": request.nitrogen,
            "Phosphorus": request.phosphorus,
            "Potassium": request.potassium,
        }

        low = [
            nutrient
            for nutrient, value in nutrients.items()
            if value < NUTRIENT_LOW_THRESHOLDS[nutrient]
        ]

        if not low:
            return FertilizerAdvisory(
                recommendation="No clear NPK deficiency is indicated by the provided values.",
                reason=(
                    "Nitrogen, phosphorus, and potassium are all above the MVP screening "
                    "thresholds. Use a soil test and crop-specific guidance before applying fertilizer."
                ),
            )

        names = ", ".join(low)
        details = "; ".join(
            f"{name} is {nutrients[name]:.1f} mg/kg "
            f"(screening level {NUTRIENT_LOW_THRESHOLDS[name]:.0f} mg/kg)"
            for name in low
        )

        return FertilizerAdvisory(
            recommendation=f"{names} availability may require attention.",
            reason=(
                f"The provided soil values suggest possible low availability of {names}. "
                f"{details}. Confirm with a local soil test before choosing a fertilizer or application rate."
            ),
            nutrients_needing_attention=low,
        )

    async def recommend_irrigation(
        self, request: IrrigationRecommendRequest
    ) -> IrrigationRecommendResponse:
        return IrrigationRecommendResponse(
            success=True,
            data=IrrigationAdvisoryData(
                irrigation=self._irrigation_advisory(request),
                fertilizer=self._fertilizer_advisory(request),
            ),
        )


irrigation_service = IrrigationService()
