/**
 * marketService.js — Frontend service for Feature 4: Market Insights & Price Advisory.
 *
 * Connects to FastAPI endpoint: GET /api/market/prices?crop=<crop_name>
 */

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api';

/**
 * Fetch market price data for a given crop.
 * @param {string} cropName - Name of the crop to look up (e.g. 'wheat', 'tomato')
 * @returns {Promise<object>} MarketPriceResponse
 */
export async function getMarketPrices(cropName = 'wheat') {
  const response = await fetch(`${API_BASE_URL}/market/prices?crop=${encodeURIComponent(cropName)}`);

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.detail || `Market price lookup failed with status ${response.status}`);
  }

  return response.json();
}
