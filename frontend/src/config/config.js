/**
 * config.js — Application-level configuration for FasalSathi AI frontend.
 *
 * All environment-derived values should be read from here rather than
 * accessed directly from import.meta.env across the codebase.
 */

export const config = {
  /**
   * Base URL of the FasalSathi AI FastAPI backend.
   * Set VITE_API_BASE_URL in frontend/.env to override.
   */
  apiBaseUrl: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api',

  /**
   * Application display name.
   */
  appName: 'FasalSathi AI',

  /**
   * Application tagline shown in the UI.
   */
  appTagline: 'Smart Crop Advisory & Farm Resource Optimization for Smallholder Farmers',

  /**
   * Feature flags — set to true when a feature's backend is fully connected.
   * Allows the UI to gracefully degrade during development.
   */
  features: {
    diseaseDetection: true,
    cropRecommendation: true,
    irrigationAdvisory: true,
    marketInsights: true,
  },
};
