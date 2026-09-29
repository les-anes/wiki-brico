import type { ConsentState } from "./consent";

let measurementId = "";
let initialized = false;
let active = false;
let lastPage = "";

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

/**
 * Applique le consentement à la mesure d’audience (Consent Mode v2) :
 * sans consentement explicite, rien n’est chargé ni envoyé ; l’acceptation
 * démarre GA4 avec l’identifiant de mesure, le refus ou le retrait le
 * maintient éteint. L’identifiant vient de `VITE_GA_MEASUREMENT_ID`, injecté
 * par l’appelant pour rester lisible hors bundle Vite (tests).
 */
export function applyConsent(consent: ConsentState | null, id?: string): void {
  if (consent === "granted") {
    if (id !== undefined) measurementId = id.trim();
    active = true;
    if (!initialized) initializeAnalytics();
    else window.gtag?.("consent", "update", { analytics_storage: "granted" });
    return;
  }
  active = false;
  if (initialized)
    window.gtag?.("consent", "update", { analytics_storage: "denied" });
}

function initializeAnalytics() {
  if (!/^G-[A-Z0-9]+$/.test(measurementId)) return;
  // Les deploy previews et le localhost partagent l’ID de build : on ne
  // mesure que le domaine de production, sinon les vues sont gonflées.
  if (location.hostname !== "wikibrico.fr") return;

  initialized = true;
  window.dataLayer ??= [];
  window.gtag = function () {
    window.dataLayer!.push(arguments);
  };
  // Consent Mode : refus par défaut sur les quatre paramètres ; le passage à
  // « granted » pour analytics_storage est piloté par applyConsent().
  window.gtag("consent", "default", {
    analytics_storage: "denied",
    ad_storage: "denied",
    ad_user_data: "denied",
    ad_personalization: "denied",
  });
  window.gtag("consent", "update", { analytics_storage: "granted" });
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
  if (!active || !initialized) return;
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
