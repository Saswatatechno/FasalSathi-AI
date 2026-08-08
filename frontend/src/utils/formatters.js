/**
 * formatters.js — Generic display formatting utilities shared across all features.
 *
 * Implementation will be completed during the UI build step.
 */

/**
 * Format a currency value in Indian Rupees.
 * @param {number} value
 * @returns {string} e.g. '₹2,400'
 */
export function formatCurrency(value) {
  // TODO: implement during UI build step
  return `₹${value}`;
}

/**
 * Capitalise the first letter of a string.
 * @param {string} str
 * @returns {string}
 */
export function capitalise(str) {
  if (!str) return '';
  return str.charAt(0).toUpperCase() + str.slice(1);
}

/**
 * Map a qualitative confidence string to a display colour class.
 * @param {'High'|'Medium'|'Low'|null} confidence
 * @returns {string} Tailwind colour class
 */
export function confidenceColour(confidence) {
  // TODO: complete colour mapping during UI build step
  return '';
}
