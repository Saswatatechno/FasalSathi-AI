# FasalSathi AI — API Contract

## Irrigation & Fertilizer Advisory

### `POST /api/irrigation/recommend`

Content-Type: `application/json`

#### Request

```json
{
  "crop": "Tomato",
  "soil_moisture": 30,
  "temperature": 32,
  "rainfall_probability": 20,
  "growth_stage": "Vegetative",
  "nitrogen": 40,
  "phosphorus": 30,
  "potassium": 70
}
```

### Validation

- `crop`: supported crop name.
- `soil_moisture`: `0–100` percent.
- `temperature`: `-20–60` °C.
- `rainfall_probability`: `0–100` percent.
- `growth_stage`: `Seedling`, `Vegetative`, `Flowering`, `Yield Formation`, or `Ripening`.
- `nitrogen`, `phosphorus`, `potassium`: `0–500` mg/kg.

All fields are required because NPK values are needed to produce the fertilizer advisory.

### Response

```json
{
  "success": true,
  "data": {
    "irrigation": {
      "recommendation": "Irrigation may be required.",
      "reason": "Soil moisture is 30%, below the 35% screening level for Tomato at the vegetative stage."
    },
    "fertilizer": {
      "recommendation": "Nitrogen availability may require attention.",
      "reason": "The provided soil values suggest possible low availability of Nitrogen. Confirm with a local soil test before choosing a fertilizer or application rate.",
      "nutrients_needing_attention": ["Nitrogen"]
    }
  }
}
```

The irrigation and fertilizer engine is intentionally rule-based for the hackathon MVP. Thresholds are screening-level decision-support values, not exact fertilizer prescriptions.
