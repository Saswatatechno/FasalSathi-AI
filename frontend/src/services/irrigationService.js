/**
 * irrigationService.js — Frontend service for Feature 3: Irrigation & Fertilizer Advisory.
 *
 * Connects to FastAPI endpoint: POST /api/irrigation/recommend
 */

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api';

/**
 * Submit crop and weather parameters to receive irrigation and fertilizer advice.
 * @param {object} params - { crop, soil_moisture, temperature, rainfall_probability, growth_stage, soil_type }
 * @returns {Promise<object>} IrrigationRecommendResponse
 */
export async function getIrrigationAdvisory(params) {
  const response = await fetch(`${API_BASE_URL}/irrigation/recommend`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      crop: params.crop || 'Wheat',
      soil_moisture: Number(params.soil_moisture || 45.0),
      temperature: Number(params.temperature || 28.0),
      rainfall_probability: Number(params.rainfall_probability || 12.0),
      growth_stage: params.growth_stage || 'Vegetative',
      soil_type: params.soil_type || 'Loamy',
    }),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.detail || `Irrigation advice failed with status ${response.status}`);
  }

  return response.json();
}
