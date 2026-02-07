/**
 * Feature Flags Configuration
 * 
 * Centralized configuration for all feature flags in the application.
 * Use environment variables to control feature availability.
 */

export const FEATURES = {
    /**
     * Enable/Disable Google Auth authentication
     * 
     * When false:
     * - No login required
     * - All routes are publicly accessible
     * - UserMenu is hidden
     * - Mixpanel tracking is anonymous
     * 
     * When true:
     * - Google Auth login required
     * - Route protection active
     * - UserMenu visible
     * - Mixpanel tracking with user identification
     * 
     * Default: false (public access)
     */
    AUTH_ENABLED: process.env.NEXT_PUBLIC_ENABLE_AUTH === 'true',
} as const;

// Type-safe feature flag access
export type FeatureFlags = typeof FEATURES;
