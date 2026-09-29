## 1. Consentement

- [x] 1.1 Créer `src/lib/consent.ts` : lecture/écriture de `wikibrico:consent` en `localStorage` (`{ state: "granted" | "denied", at }`), `getConsent()` retourne `null` si absent ou illisible ; vérifier par un test qu'un stockage absent, corrompu ou illisible ne lève pas d'erreur et retourne `null`.
- [x] 1.2 Étendre `src/lib/analytics.ts` : `consent default` à `denied` (les quatre paramètres), chargement du script et `config` **conditionnés** à `granted`, `gtag('consent','update')` à l'acceptation ; vérifier par un test que sans consentement aucun `gtag` ni script n'est créé, qu'à `granted` le script est chargé, qu'à `denied` il ne l'est pas.
- [x] 1.3 Brancher `src/App.tsx` sur `readConsent()` : `applyConsent()` à l'hydratation et à chaque changement de choix ; vérifier que le refus puis l'acceptation dans la même session démarre la mesure sans rechargement (test « réaccord après retrait »).

## 2. Bandeau

- [x] 2.1 Créer `src/components/cookie-banner.tsx` : pré-rendu visible, masqué en `useEffect` si un choix existe ; boutons « Accepter » / « Refuser » à parité (`Button`, même taille, aucune pré-sélection), lien vers `/confidentialite/`, `<section aria-label>` ; vérifier que le HTML servi contient le bandeau et que l'hydratation ne produit aucune erreur (`pnpm check:site`, assertions `cookie-banner` / « Gérer les cookies » / absence de GA4 ajoutées dans `scripts/check-site.mjs`).
- [x] 2.2 Ajouter le lien « Gérer les cookies » en pied de page dans `src/App.tsx` : réaffiche le bandeau avec l'état courant, permet d'inverser ; vérifier qu'après retrait `initializeAnalytics()` ne reprend pas.

## 3. Routes légales

- [x] 3.1 Ajouter `/mentions-legales/` et `/confidentialite/` à `src/lib/routes.ts` (`Route` + `buildRoutes` + `matchRoute` + `pageMeta` avec titre, description, canonical, `og:*`, fil d'Ariane) ; vérifier par un test que `pageMeta` est complet pour les deux routes et qu'elles figurent dans `buildRoutes`.
- [x] 3.2 Écrire le contenu de `/mentions-legales/` : éditeur (Aymeric Dominique, Paris, contact), hébergeur (Netlify), propriété intellectuelle, droit français ; **reste à compléter : numéro de téléphone éditeur et hébergeur (art. 6-I-2° LCEN)** — voir GAPS.
- [x] 3.3 Écrire le contenu de `/confidentialite/` : responsable de traitement, finalités + bases légales, catégories de données, sous-traitants (Google, Netlify), durées (GA4 2 mois, favoris locaux), transferts (DPF + SCC), droits Art. 15–22, réclamation CNIL Art. 77, bandeau/GA4/révocation ; vérifier que chaque exigence de la spec `rgpd` correspond à une section présente.
- [x] 3.4 Ajouter « Mentions légales · Confidentialité » au pied de page ; vérifier leur présence sur toutes les pages rendues.

## 4. Validation

- [x] 4.1 `pnpm typecheck && pnpm lint && pnpm test && pnpm validate:data` — corriger les échecs liés au changement.
- [x] 4.2 `pnpm build && pnpm check:site` — vérifier le prerendu des deux pages, le sitemap (2 URLs légales), l'absence d'erreur d'hydratation.
- [x] 4.3 `pnpm validate:specs` — valider les artefacts du changement.
- [x] 4.4 Contrôle des scénarios de la spec sur les artefacts `dist/` : bandeau + « Gérer les cookies » présents dans les 120 pages, `Accepter`/`Refuser` à parité, zéro `googletagmanager` dans le HTML servi, titres/canonical des deux pages légales, sitemap (1 URL chacune). Scénarios dynamiques (chargement GA4 à l'acceptation, non-chargement au refus, révocation) verrouillés par `src/lib/analytics.test.ts` (76 tests) — **non testés dans un vrai navigateur** ; réglage rétention GA4 (2 mois) **à faire dans l'interface Google**, hors dépôt.
