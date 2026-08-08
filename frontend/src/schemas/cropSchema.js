/**
 * cropSchema.js — Frontend-side schema definitions for Feature 2: Crop Recommendation.
 *
 * Matches: POST /api/crop/recommend
 */

/**
 * @typedef {object} CropRecommendationRequest
 * @property {number} nitrogen    - Nitrogen (N) content in soil (mg/kg)
 * @property {number} phosphorus  - Phosphorus (P) content in soil (mg/kg)
 * @property {number} potassium   - Potassium (K) content in soil (mg/kg)
 * @property {number} ph          - Soil pH value (0–14)
 * @property {number} temperature - Temperature in °C
 * @property {number} humidity    - Relative humidity in %
 * @property {number} rainfall    - Rainfall in mm
 */
export const CropRecommendationRequest = {
  nitrogen: 0,
  phosphorus: 0,
  potassium: 0,
  ph: 7.0,
  temperature: 25.0,
  humidity: 60.0,
  rainfall: 100.0,
};

/**
 * @typedef {object} CropRecommendationResponse
 * @property {boolean} success          - Whether the request succeeded
 * @property {string}  recommended_crop - Name of the recommended crop
 * @property {string}  reason           - Explanation for the recommendation
 */
export const CropRecommendationResponse = {
  success: true,
  recommended_crop: '',
  reason: '',
};
