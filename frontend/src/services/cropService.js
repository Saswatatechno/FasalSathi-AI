/**
 * cropService.js — Frontend service for Feature 2: Crop Recommendation.
 *
 * Connects to FastAPI endpoint: POST /api/crop/recommend
 */

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api';

/**
 * Submit soil NPK, pH, and climate parameters to receive crop recommendation.
 * @param {object} params - { nitrogen, phosphorus, potassium, ph, temperature, humidity, rainfall }
 * @returns {Promise<object>} CropRecommendResponse { success, recommended_crop, reason }
 */
export async function recommendCrop(params) {
  const response = await fetch(`${API_BASE_URL}/crop/recommend`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      nitrogen: Number(params.nitrogen),
      phosphorus: Number(params.phosphorus),
      potassium: Number(params.potassium),
      ph: Number(params.ph),
      temperature: Number(params.temperature),
      humidity: Number(params.humidity),
      rainfall: Number(params.rainfall),
    }),
  });

  if (!response.ok) {
    throw new Error('Unable to generate crop recommendation. Please check your inputs and try again.');
  }

  return response.json();
}
