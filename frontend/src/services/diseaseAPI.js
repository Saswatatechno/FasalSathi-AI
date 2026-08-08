const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api';

export async function predictDisease(imageFile) {
  const formData = new FormData();
  if (imageFile) {
    formData.append('file', imageFile);
  }

  const response = await fetch(`${API_BASE_URL}/disease/predict`, {
    method: 'POST',
    body: formData,
  });

  if (!response.ok) {
    throw new Error(`Disease prediction error: ${response.statusText}`);
  }

  return response.json();
}
