/**
 * marketSchema.js — Frontend-side schema definitions for Feature 4: Market Insights.
 *
 * Matches: GET /api/market/prices?crop=<crop_name>
 */

/**
 * @typedef {object} MarketPriceResponse
 * @property {boolean} success            - Whether the request succeeded
 * @property {string}  crop               - Crop name
 * @property {number}  price_per_quintal  - Current market price per quintal (₹)
 * @property {string}  market             - Market/mandi name
 * @property {string}  trend              - Price trend: 'rising' | 'falling' | 'stable'
 * @property {string}  advisory           - Selling timing advice for the farmer
 */
export const MarketPriceResponse = {
  success: true,
  crop: '',
  price_per_quintal: 0,
  market: '',
  trend: '',
  advisory: '',
};
