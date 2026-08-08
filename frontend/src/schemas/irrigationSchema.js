/**
 * irrigationSchema.js — Frontend-side schema definitions for Feature 3: Irrigation & Fertilizer Advisory.
 *
 * Matches: POST /api/irrigation/recommend
 */

/**
 * @typedef {object} IrrigationRequest
 * @property {string} crop               - Crop name (e.g. 'rice', 'wheat')
 * @property {number} soil_moisture      - Current soil moisture level (%)
 * @property {number} temperature        - Current temperature (°C)
 * @property {number} humidity           - Relative humidity (%)
 * @property {number} rainfall_forecast  - Forecasted rainfall in next 7 days (mm)
 */
export const IrrigationRequest = {
  crop: '',
  soil_moisture: 0,
  temperature: 0,
  humidity: 0,
  rainfall_forecast: 0,
};

/**
 * @typedef {object} IrrigationAdvisoryResponse
 * @property {boolean} success               - Whether the request succeeded
 * @property {boolean} irrigation_needed     - Whether irrigation is recommended
 * @property {string}  irrigation_advisory   - Irrigation recommendation details
 * @property {string}  fertilizer_advisory   - Fertilizer recommendation details
 * @property {string}  reasoning             - Explanation of the advisory
 */
export const IrrigationAdvisoryResponse = {
  success: true,
  irrigation_needed: false,
  irrigation_advisory: '',
  fertilizer_advisory: '',
  reasoning: '',
};
