/**
 * diseaseService.js — Frontend service for Feature 1: Crop Disease / Pest Detection.
 *
 * Connects to FastAPI endpoint: POST /api/disease/predict
 */

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api';

/**
 * Send a crop/leaf image to the backend for disease analysis.
 * @param {File} imageFile - The image File object from the upload input
 * @returns {Promise<object>} DiseasePredictionResponse
 */
export async function predictDisease(imageFile) {
  if (!imageFile) {
    throw new Error("Please select an image file to upload.");
  }

  const formData = new FormData();
  formData.append('file', imageFile);

  const response = await fetch(`${API_BASE_URL}/disease/predict`, {
    method: 'POST',
    body: formData,
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.detail || `Disease prediction failed with status ${response.status}`);
  }

  return response.json();
}
