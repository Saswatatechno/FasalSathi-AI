/**
 * api.js — Centralized HTTP client for FasalSathi AI.
 * Reads base URL from VITE_API_BASE_URL (or VITE_API_URL).
 */

export const API_BASE_URL = 
  import.meta.env.VITE_API_BASE_URL || 
  import.meta.env.VITE_API_URL || 
  'http://localhost:8000/api';

export async function postJSON(endpoint, body) {
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.detail || `Request to ${endpoint} failed (${response.status})`);
  }

  return response.json();
}

export async function postFormData(endpoint, formData) {
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    method: 'POST',
    body: formData,
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.detail || `Upload to ${endpoint} failed (${response.status})`);
  }

  return response.json();
}

export async function getJSON(endpoint) {
  const response = await fetch(`${API_BASE_URL}${endpoint}`);

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.detail || `Request to ${endpoint} failed (${response.status})`);
  }

  return response.json();
}
