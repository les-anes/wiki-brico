import assert from "node:assert/strict";
import { test } from "node:test";

import { applyConsent, trackPage } from "./analytics.ts";

// Environnement factice : window/document/location remplacés pour observer les
// appels gtag (poussés dans dataLayer) et la création du script, sans navigateur.
const MEASUREMENT_ID = "G-TEST1234";

const scripts: { src: string; async: boolean }[] = [];
const loadListeners: (() => void)[] = [];

const fakeWindow = {
  dataLayer: undefined as unknown[] | undefined,
  gtag: undefined as ((...args: unknown[]) => void) | undefined,
  addEventListener(type: string, listener: () => void) {
    if (type === "load") loadListeners.push(listener);
  },
};
const fakeDocument = {
  readyState: "loading",
  title: "Page de test",
  head: {
    append(script: { src: string; async: boolean }) {
      scripts.push(script);
    },
  },
  createElement() {
    return { src: "", async: false };
  },
};

Object.assign(globalThis, {
  window: fakeWindow,
  document: fakeDocument,
  location: { origin: "https://wikibrico.fr", pathname: "/tutoriels/" },
});

/** Chaque appel gtag est un tuple poussé dans dataLayer. */
function gtagCalls(): { name: string; args: unknown[] }[] {
  return (fakeWindow.dataLayer ?? []).map((entry) => {
    const tuple = Array.from(entry as ArrayLike<unknown>);
    return { name: String(tuple[0]), args: tuple.slice(1) };
  });
}

function consentCalls(kind: string) {
  return gtagCalls().filter(
    (call) => call.name === "consent" && call.args[0] === kind,
  );
}

function eventCalls() {
  return gtagCalls().filter((call) => call.name === "event");
}

test("sans consentement, aucun gtag ni script ne sont créés", () => {
  applyConsent(null, MEASUREMENT_ID);
  trackPage("tutoriels");
  assert.equal(fakeWindow.gtag, undefined, "aucun gtag sans consentement");
  assert.equal(fakeWindow.dataLayer, undefined, "aucun dataLayer sans accord");
  assert.equal(scripts.length, 0, "aucun script sans consentement");
});

test("refus : rien n’est chargé et la mesure reste éteinte", () => {
  applyConsent("denied", MEASUREMENT_ID);
  trackPage("tutoriels");
  assert.equal(fakeWindow.gtag, undefined, "aucun gtag après refus");
  assert.equal(scripts.length, 0, "aucun script après refus");
});

test("acceptation : consent default refus puis accord, script chargé après load", () => {
  applyConsent("granted", MEASUREMENT_ID);

  const defaults = consentCalls("default");
  assert.equal(defaults.length, 1, "un seul consent default");
  assert.deepEqual(defaults[0].args[1], {
    analytics_storage: "denied",
    ad_storage: "denied",
    ad_user_data: "denied",
    ad_personalization: "denied",
  });

  const updates = consentCalls("update");
  assert.equal(updates.length, 1, "un seul consent update");
  assert.deepEqual(updates[0].args[1], { analytics_storage: "granted" });

  const config = gtagCalls().find((call) => call.name === "config");
  assert.ok(config, "config GA4 envoyé");
  assert.equal(config.args[0], MEASUREMENT_ID);
  assert.equal(
    (config.args[1] as { send_page_view?: boolean }).send_page_view,
    false,
  );

  // Le script n’attend que l’événement load (priorité au LCP).
  assert.equal(scripts.length, 0, "script différé jusqu’au load");
  fakeDocument.readyState = "complete";
  for (const listener of loadListeners.splice(0)) listener();
  assert.equal(scripts.length, 1);
  assert.match(scripts[0].src, /googletagmanager\.com\/gtag\/js/);
  assert.equal(scripts[0].async, true);
});

test("trackPage envoie un page_view puis dédoublonne la même page", () => {
  const before = eventCalls().length;
  trackPage("tutoriels");
  trackPage("tutoriels");
  const events = eventCalls();
  assert.equal(events.length, before + 1, "un seul page_view par page");
  assert.equal(events.at(-1)?.args[0], "page_view");
  const lastEvent = events.at(-1);
  assert.ok(lastEvent, "page_view émis");
  assert.equal(
    (lastEvent.args[1] as { page_location?: string }).page_location,
    "https://wikibrico.fr/tutoriels/#tutoriels",
  );
});

test("réaccord après retrait : consent update granted réémis", () => {
  // Branche `else` de applyConsent : déjà initialisé, seul l’update part.
  const beforeEvents = eventCalls().length;
  applyConsent("granted", MEASUREMENT_ID);
  const updates = consentCalls("update");
  assert.deepEqual(
    updates.at(-1)?.args[1],
    { analytics_storage: "granted" },
    "réaccord dans la même session : analytics_storage re-granted",
  );
  trackPage("tutoriel/apres-reaccord");
  trackPage("tutoriel/apres-reaccord");
  assert.equal(
    eventCalls().length,
    beforeEvents + 1,
    "les pages suivantes sont de nouveau comptées (une seule fois)",
  );
});

test("retrait du consentement : plus aucun envoi", () => {
  // Initialisation garantie pour que ce test passe aussi seul (--test-name-pattern).
  applyConsent("granted", MEASUREMENT_ID);
  applyConsent("denied");
  const updates = consentCalls("update");
  assert.deepEqual(
    updates.at(-1)?.args[1],
    { analytics_storage: "denied" },
    "consent update denied envoyé au retrait",
  );
  const before = eventCalls().length;
  trackPage("tutoriel/poser-du-parquet");
  assert.equal(eventCalls().length, before, "aucun page_view après retrait");
});
