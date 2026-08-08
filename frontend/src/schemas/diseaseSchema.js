/**
 * diseaseSchema.js — Frontend-side schema definitions for Feature 1: Disease Detection.
 *
 * These objects document the expected request and response shapes.
 * They serve as living documentation and can be used for validation later.
 *
 * Matches: POST /api/disease/predict
 */

/**
 * Shape of the multipart form data sent to the backend.
 * The actual field is a File object appended as FormData under the key 'file'.
 *
 * @typedef {object} DiseaseRequest
 * @property {File} file - Crop or leaf image uploaded by the farmer
 */
export const DiseaseRequest = {
  file: null, // File — image/jpeg or image/png
};

/**
 * Shape of the JSON response returned by the backend.
 *
 * @typedef {object} DiseasePredictionResponse
 * @property {boolean}      success        - Whether the request succeeded
 * @property {string}       crop           - Detected crop type
 * @property {string}       disease        - Likely disease or pest name
 * @property {string|null}  confidence     - Qualitative confidence: 'High' | 'Medium' | 'Low'
 * @property {string|null}  observations   - Visual symptoms observed in the image
 * @property {string}       advice         - Actionable treatment advisory
 */
export const DiseasePredictionResponse = {
  success: true,
  crop: '',
  disease: '',
  confidence: null,    // 'High' | 'Medium' | 'Low' | null
  observations: null,
  advice: '',
};
