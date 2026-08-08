/**
 * irrigationService.js — Frontend service for Feature 3.
 *
 * Connects to POST /api/irrigation/recommend.
 */

import { postJSON } from './api';

export async function getIrrigationAdvisory(params) {
  return postJSON('/irrigation/recommend', {
    crop: params.crop,
    soil_moisture: Number(params.soil_moisture),
    temperature: Number(params.temperature),
    rainfall_probability: Number(params.rainfall_probability),
    growth_stage: params.growth_stage,
    nitrogen: Number(params.nitrogen),
    phosphorus: Number(params.phosphorus),
    potassium: Number(params.potassium),
  });
}
