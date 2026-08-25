/**
 * Wishlet Analytics Utility
 *
 * A thin, isolated wrapper around Google Analytics (GA4).
 * All analytics calls in the application should go through this module
 * rather than calling gtag() directly. This keeps the GA4 implementation
 * details in one place and makes it easy to swap providers later.
 *
 * The GA4 Measurement ID is loaded from NEXT_PUBLIC_GA_MEASUREMENT_ID.
 * If the env var is missing or empty, all functions become safe no-ops.
 */

export const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || "";

/** Whether analytics is configured and available */
export const isAnalyticsEnabled = (): boolean => {
  return GA_MEASUREMENT_ID.length > 0;
};

// Extend window to include gtag
declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
  }
}

const isDev = process.env.NODE_ENV === "development";

/**
 * Send a GA4 page_view event.
 * Called automatically by the GoogleAnalytics component on route changes.
 */
export function trackPageView(url: string) {
  if (!isAnalyticsEnabled() || typeof window === "undefined" || !window.gtag) return;
  window.gtag("config", GA_MEASUREMENT_ID, {
    page_path: url,
    ...(isDev ? { debug_mode: true } : {}),
  });
}

/**
 * Send a custom GA4 event.
 */
export function trackEvent(action: string, params?: Record<string, unknown>) {
  if (!isAnalyticsEnabled() || typeof window === "undefined" || !window.gtag) return;
  window.gtag("event", action, {
    ...params,
    ...(isDev ? { debug_mode: true } : {}),
  });
}

// ============================================================================
// Phase 9.6B Product Funnel Events
// ============================================================================

/** Triggered when the user starts creating a Wishlet */
export function trackCreateWishStarted() {
  trackEvent("create_wish_started");
}

/** Triggered when a Wishlet has been successfully created and persisted */
export function trackWishCreated(params: { occasion: string; template: string }) {
  trackEvent("wish_created", {
    occasion: params.occasion,
    template: params.template,
  });
}

/** Triggered when the user initiates a share action */
export function trackWishShared(method: "native_share" | "whatsapp" | "copy_link") {
  trackEvent("wish_shared", {
    method,
  });
}

/** Triggered when a public /w/[slug] Wishlet is successfully loaded */
export function trackWishViewed(params: { occasion: string; template: string }) {
  trackEvent("wish_viewed", {
    occasion: params.occasion,
    template: params.template,
  });
}

