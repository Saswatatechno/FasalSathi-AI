# FasalSathi AI — Development Plan

## Feature Status

1. Crop Disease / Pest Detection — COMPLETED
2. Crop Suggestion / Crop Recommendation — COMPLETED
3. Irrigation & Fertilizer Advisory — COMPLETED
4. Market Price Comparison — NOT STARTED

## Feature 3 Implementation

The irrigation and fertilizer advisory uses a transparent rule-based engine rather than a separate ML model.

### Backend

- `POST /api/irrigation/recommend`
- Pydantic request validation
- Irrigation recommendation based on crop, growth stage, soil moisture, temperature and rainfall probability
- NPK screening for possible nutrient deficiencies
- Human-readable reasons for every advisory
- Dedicated API tests for valid and invalid inputs

### Frontend

- Existing `/irrigation` page connected to the backend
- Crop, growth stage, soil moisture, temperature, rainfall probability and NPK inputs
- Loading and error states
- Separate irrigation and fertilizer result cards
- Explanations displayed with each recommendation

The feature intentionally avoids exact fertilizer dosage recommendations. Final fertilizer decisions should use a local soil test and crop-specific agricultural guidance.
