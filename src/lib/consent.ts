export type ConsentState = "granted" | "denied";

export interface ConsentRecord {
  state: ConsentState;
  /** Horodatage du choix : permet de démontrer le consentement (Art. 7(1)). */
  at: number;
}

const STORAGE_KEY = "wikibrico:consent";

/**
 * Lit le consentement enregistré. `null` si jamais tranché, illisible ou
 * stockage indisponible — jamais d'exception : le site doit fonctionner sans.
 */
export function readConsent(): ConsentRecord | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed: unknown = JSON.parse(raw);
    if (typeof parsed !== "object" || parsed === null) return null;
    const { state, at } = parsed as { state?: unknown; at?: unknown };
    if ((state === "granted" || state === "denied") && typeof at === "number")
      return { state, at };
    return null;
  } catch {
    return null;
  }
}

/**
 * Enregistre le choix. Le stockage reste local au navigateur : sans
 * `localStorage` (mode privé restrictif), le choix vaut pour la session.
 */
export function writeConsent(state: ConsentState): ConsentRecord {
  const record: ConsentRecord = { state, at: Date.now() };
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(record));
  } catch {
    /* Stockage optionnel. */
  }
  return record;
}
