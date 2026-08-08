/**
 * validators.js — Frontend input validation utilities shared across feature forms.
 *
 * Implementation will be completed during the UI build step.
 */

/**
 * Validate a crop recommendation form payload.
 * @param {object} data - CropRecommendationRequest
 * @returns {{ valid: boolean, errors: object }}
 */
export function validateCropForm(data) {
  // TODO: implement during UI build step
  return { valid: true, errors: {} };
}

/**
 * Validate an irrigation form payload.
 * @param {object} data - IrrigationRequest
 * @returns {{ valid: boolean, errors: object }}
 */
export function validateIrrigationForm(data) {
  // TODO: implement during UI build step
  return { valid: true, errors: {} };
}

/**
 * Check that an uploaded file is a supported image type.
 * @param {File} file
 * @returns {boolean}
 */
export function isValidImageFile(file) {
  if (!file) return false;
  const ALLOWED = ['image/jpeg', 'image/png', 'image/webp'];
  return ALLOWED.includes(file.type);
}
