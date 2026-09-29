## Why

Le site charge Google Analytics (GA4) à chaque visite, avec `analytics_storage: "granted"` par défaut et aucun mécanisme de choix. Cela contredit l'obligation de consentement préalable pour l'accès ou la stockage d'informations sur le terminal de l'utilisateur (ePrivacy, art. 57 de la loi Informatique et Libertés) et prive la mesure d'audience d'une base légale (Art. 6(1)(a) RGPD).

Par ailleurs, le site ne publie ni mentions légales (art. 6 LCEN) ni politique de confidentialité (Art. 12–13 RGPD) : aucun moyen pour un lecteur d'identifier l'éditeur, d'exercer ses droits (Art. 15–22) ou de saisir la CNIL (Art. 77).

## What Changes

- Ajouter un consentement horodaté stocké côté client (`localStorage`) et **conditionner tout chargement de GA4** à un consentement explicite ; `consent default` passe à `denied`, la première visite n'émet aucun appel de mesure.
- Ajouter un bandeau de consentement pré-rendu visible par défaut (pas de flash ni de diff d'hydratation), avec « Accepter » et « Refuser » à parité visuelle, sans blocage de la navigation.
- Ajouter un lien « Gérer les cookies » en pied de page, sur toutes les pages, permettant de retirer ou modifier le consentement (Art. 7(3)).
- Ajouter deux routes pré-rendues : `/mentions-legales/` (éditeur, hébergeur, propriété intellectuelle, droit applicable) et `/confidentialite/` (finalités, bases légales, sous-traitants, durées, transferts, droits, réclamation CNIL).
- Ajouter « Mentions légales · Confidentialité » en pied de page.

Aucune dépendance ajoutée, aucun backend, aucun nouveau cookie : le choix de consentement est stocké en `localStorage`.

## Capabilities

### New Capabilities

- `rgpd`: mesure d'audience soumise au consentement, révocation du consentement, pages légales pré-rendues et transparence sur les données traitées.

### Modified Capabilities

- aucune capacité existante n'est modifiée (le routage, le catalogue et les fiches restent inchangés ; les nouvelles routes s'ajoutent à `buildRoutes`).

## Impact

- Code : `src/lib/analytics.ts` (consentement conditionnel), nouveau `src/lib/consent.ts`, nouveau `src/components/cookie-banner.tsx`, `src/App.tsx` (footer, nouvelles routes), `src/document.tsx` si nécessaire, `src/lib/routes.ts` (deux routes + `pageMeta`).
- Contenu : deux nouveaux composants de page légale.
- Tests : `src/lib/consent.test.ts` et/ou `src/lib/analytics.test.ts` verrouillant le chargement conditionnel de GA4.
- Build : `scripts/prerender.mjs` et le sitemap suivent `buildRoutes` sans changement ; `scripts/check-site.mjs` dérive des routes sans liste en dur.
- Réglage hors code (côté éditeur Google) : durée de conservation GA4 à 2 mois — à faire dans l'interface GA4, pas dans ce dépôt.
