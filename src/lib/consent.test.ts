import assert from "node:assert/strict";
import { test } from "node:test";

import { readConsent, writeConsent } from "./consent.ts";

// localStorage factif : les tests tournent sous node, pas dans un navigateur.
const store = new Map<string, string>();
Object.assign(globalThis, {
  localStorage: {
    getItem: (key: string) => store.get(key) ?? null,
    setItem: (key: string, value: string) => void store.set(key, value),
    removeItem: (key: string) => void store.delete(key),
  },
});

test("aucun consentement enregistré → null", () => {
  store.clear();
  assert.equal(readConsent(), null);
});

test("aller-retour : état et horodatage conservés", () => {
  const written = writeConsent("granted");
  const read = readConsent();
  assert.equal(read?.state, "granted");
  assert.equal(read?.at, written.at);
  assert.ok(written.at > 0, "horodatage présent (Art. 7(1))");

  writeConsent("denied");
  assert.equal(readConsent()?.state, "denied");
});

test("valeur corrompue ou invalide → null, sans lever d’erreur", () => {
  store.set("wikibrico:consent", "{pas-du-json");
  assert.equal(readConsent(), null);
  store.set("wikibrico:consent", JSON.stringify({ state: "peut-être" }));
  assert.equal(readConsent(), null);
  store.set("wikibrico:consent", JSON.stringify({ state: "granted" }));
  assert.equal(readConsent(), null, "horodatage obligatoire");
});

test("stockage indisponible : l’écriture ne lève pas d’erreur", () => {
  const broken = {
    getItem: () => {
      throw new Error("stockage bloqué");
    },
    setItem: () => {
      throw new Error("quota dépassé");
    },
    removeItem: () => {},
  };
  Object.assign(globalThis, { localStorage: broken });
  assert.equal(readConsent(), null);
  assert.equal(writeConsent("granted").state, "granted");
  Object.assign(globalThis, {
    localStorage: {
      getItem: (key: string) => store.get(key) ?? null,
      setItem: (key: string, value: string) => void store.set(key, value),
      removeItem: (key: string) => void store.delete(key),
    },
  });
});
