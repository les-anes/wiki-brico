const measurementId = import.meta.env.VITE_GA_MEASUREMENT_ID?.trim() ?? "";
const analyticsConfigured = /^G-[A-Z0-9]+$/.test(measurementId);
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
  // Les deploy previews et le localhost partagent l'ID de build : on ne
  // mesure que le domaine de production, sinon les vues sont gonflées.
  if (location.hostname !== "wikibrico.fr") return;
  initialized = true;
  window.dataLayer ??= [];
  window.gtag = function () {
    window.dataLayer!.push(arguments);
  };
  window.gtag("consent", "default", {
    analytics_storage: "granted",
    ad_storage: "denied",
    ad_user_data: "denied",
    ad_personalization: "denied",
  });
  window.gtag("js", new Date());
  window.gtag("config", measurementId, {
    send_page_view: false,
    allow_google_signals: false,
    allow_ad_personalization_signals: false,
  });
  const script = document.createElement("script");
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
  // Charge la balise une fois la page rendue : le script de ~170 Ko ne dispute
  // plus la bande passante au héros LCP pendant le rendu initial.
  const append = () => document.head.append(script);
  if (document.readyState === "complete") append();
  else window.addEventListener("load", append, { once: true });
}

export function trackPage(route: string) {
  if (!initialized) return;
  // Exclude search terms, filters and arbitrary fragments from analytics URLs.
  const page = `${location.origin}${location.pathname}${route ? `#${route}` : ""}`;
  if (page === lastPage) return;
  window.gtag?.("event", "page_view", {
    page_location: page,
    page_title: document.title,
    // Omet au premier page_view : gtag retombe sur document.referrer et
    // l'entrée de session garde son vrai referrant externe.
    page_referrer: lastPage || undefined,
  });
  lastPage = page;
}
