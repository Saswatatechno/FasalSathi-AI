const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api';

export async function recommendIrrigation(irrigationData) {
  const response = await fetch(`${API_BASE_URL}/irrigation/recommend`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(irrigationData),
  });

  if (!response.ok) {
    throw new Error(`Irrigation recommendation error: ${response.statusText}`);
  }

  return response.json();
}
