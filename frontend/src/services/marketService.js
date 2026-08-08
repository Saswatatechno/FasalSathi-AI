/**
 * Frontend service for Market Price Comparison.
 * Talks only to the FastAPI backend; market-source credentials stay server-side.
 */

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api';

export async function getMarketPrices(cropName = 'wheat', location = '') {
  const params = new URLSearchParams({ crop: cropName });
  if (location?.trim()) params.set('location', location.trim());

  const response = await fetch(`${API_BASE_URL}/market/prices?${params.toString()}`);

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.detail || `Market price lookup failed with status ${response.status}`);
  }

  return response.json();
}
