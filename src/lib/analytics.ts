const measurementId = import.meta.env.VITE_GA_MEASUREMENT_ID?.trim() ?? "";
export const analyticsConfigured = /^G-[A-Z0-9]+$/.test(measurementId);
let initialized = false;
let lastPage = "";

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

export function initializeAnalytics() {
  if (!analyticsConfigured || initialized) return;
  initialized = true;
  window.dataLayer ??= [];
  window.gtag = function () { window.dataLayer!.push(arguments); };
  window.gtag("consent", "default", {
    analytics_storage: "granted", ad_storage: "denied",
    ad_user_data: "denied", ad_personalization: "denied",
  });
  window.gtag("js", new Date());
  window.gtag("config", measurementId, {
    send_page_view: false, allow_google_signals: false,
    allow_ad_personalization_signals: false,
  });
  const script = document.createElement("script");
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
  document.head.appendChild(script);
}

export function trackPage(route: string) {
  if (!initialized) return;
  // Exclude search terms, filters and arbitrary fragments from analytics URLs.
  const page = `${location.origin}${location.pathname}${route ? `#${route}` : ""}`;
  if (page === lastPage) return;
  window.gtag?.("event", "page_view", {
    page_location: page, page_title: document.title,
    page_referrer: lastPage,
  });
  lastPage = page;
}
