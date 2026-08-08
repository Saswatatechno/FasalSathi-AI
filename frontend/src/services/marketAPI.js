const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api';

export async function getMarketPrices(cropName = 'tomato') {
  const params = new URLSearchParams({ crop: cropName });
  const response = await fetch(`${API_BASE_URL}/market/prices?${params.toString()}`);

  if (!response.ok) {
    throw new Error(`Market prices error: ${response.statusText}`);
  }

  return response.json();
}
