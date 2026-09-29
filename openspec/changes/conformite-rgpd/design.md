## Context

Le site est un SPA React 19 pré-rendu au build : `src/document.tsx` rend le document complet, `hydrateRoot` l'hydrate, `scripts/prerender.mjs` écrit chaque route de `buildRoutes` + `404.html` + `sitemap.xml`. Le CSS est inliné au prerender, les modules chargés avec `fetchPriority="low"`.

`src/lib/analytics.ts` initialise GA4 depuis `VITE_GA_MEASUREMENT_ID`, pousse `gtag('consent','default', …)` avec `analytics_storage: "granted"` et charge le script une fois `window.load` atteint — donc à chaque visite, sans interaction. `src/App.tsx` appelle `initializeAnalytics()` puis `trackPage()` dans un `useEffect`.

Contraintes : site 100 % statique (aucune vérification serveur possible), pré-rendu obligatoire pour toute route (SEO + sitemap), hydratation sans diff, budget Lighthouse 100 (une balise de ~170 Ko déjà différée après `load`), pas de dépendance nouvelle, contenu et commentaires en français.

## Goals / Non-Goals

**Goals :**

- Aucun appel de mesure sans consentement explicite, horodaté et démontrable.
- Consentement aussi facile à retirer qu'à donner (Art. 7(3)) : lien « Gérer les cookies » en pied de page.
- Deux pages légales pré-rendues avec `pageMeta` complet, listées dans le sitemap.
- Le site reste entièrement utilisable sans consentement (aucun mur, aucune fonctionnalité cachée).

**Non-Goals :**

- Pas de bandeau multi-catégories (un seul outil de mesure : un seul choix binaire suffit).
- Pas de régistre RoPA (Art. 30), pas de DPIA (Art. 35), pas de DPO (Art. 37 non applicable à ce site).
- Pas de changement d'outil d'analytics, pas de backend de gestion du consentement.
- Pas de réglage GA4 (rétention 2 mois) dans le dépôt : réglage d'interface Google.

## Decisions

1. **Consentement stocké en `localStorage` (`wikibrico:consent`), pas en cookie.**
   Écrire un cookie pour refuser les cookies serait auto-référent ; `localStorage` ne relève pas de l'accès au terminal au sens ePrivacy (pas de lecture/écriture automatique par le serveur) et suffit pour horodater un choix. Valeur JSON : `{ state: "granted" | "denied", at: <timestamp> }`, absente = jamais tranché. Alternatives écartées : cookie (absurde ici), stockage serveur (aucun backend), `sessionStorage` (oublie le choix à chaque session).

2. **Le bandeau est pré-rendu visible, puis masqué côté client si le choix existe.**
   Le HTML servi ne peut pas connaître le choix : pré-rendre « bandeau masqué » provoquerait un flash pour les nouveaux visiteurs et un diff d'hydratation ; pré-rendre « visible » + masquer après lecture du `localStorage` garantit la parité d'hydratation (le premier rendu client est identique au HTML), aucun flash, et la bannière reste le contenu servi par défaut — y compris sans JavaScript, où elle pointe vers la page de confidentialité. La décision (`display:none`) s'applique dans un `useEffect`, jamais pendant le rendu.

3. **GA4 n'est chargé que sur `granted` ; `consent default` devient `denied`.**
   `initializeAnalytics()` devient conditionnelle : sans consentement, aucun `gtag`, aucun script. À l'acceptation : `gtag('consent','update',{analytics_storage:'granted'})` puis chargement du script et `config`. À un refus ou à un retrait : aucun appel ; si déjà chargé lors d'un retrait, l'événement suivant n'est pas envoyé et on marque l'initialisation comme inactive. Le Consent Mode v2 de Google exige `ad_storage`/`ad_user_data`/`ad_personalization` à `denied` — conservés tels quels.

4. **Un seul composant de bandeau, rendu par `App`, avec `<section aria-label>` mais sans focus trap ni blocage.**
   La navigation reste libre (pas de mur). Le composant expose ses boutons en `aria-*` corrects, un lien vers `/confidentialite/` et, à la réouverture, l’état de consentement courant (texte, sans présélection). Un `aria-modal` serait trompeur sans piège de focus : une `<section>` nommée (`role="region"` équivalent sémantique) suffit. Refus et acceptation à parité de style (même composant `Button`, même variante).

5. **Deux routes statiques dans `buildRoutes`, avec `pageMeta` dédié.**
   `/mentions-legales/` et `/confidentialite/` sont ajoutées à `buildRoutes` (donc au sitemap et au prerender sans autre changement) et à `matchRoute` avec deux nouvelles valeurs de `kind` : `"mentions-legales"` et `"confidentialite"`. `pageMeta` fournit titre, description, canonical, `og:*` et fil d'Ariane. Alternatives écartées : une page fusionnée (URL non citable pour la transparence RGPD), des routes hors `buildRoutes` (exclues du sitemap).

6. **Contenu des pages : rédaction sur mesure, identité réutilisée, pas de template 2019.**
   L'identité provient des mentions de encadrement-loyers.fr (Aymeric Dominique, Paris, contact) ; l'hébergeur Netlify est vérifié dans `netlify.toml`. Le texte ancien (« site non déclaré à la CNIL », instructions cookies IE) est obsolète et n'est pas repris. La politique couvre : finalités (mesure d'audience), base légale (consentement, Art. 6(1)(a) + ePrivacy), sous-traitants (Google, Netlify, Art. 28), durées (GA4 : 2 mois réglés côté interface ; favoris : local, durée de vie du navigateur), transferts (DPF + SCC, Art. 46), droits (Art. 15–22 par email), réclamation (Art. 77, CNIL).

7. **Le test verrouille la logique, pas le rendu.**
   Un test `node:test` sur `consent.ts`/`analytics.ts` : sans consentement → aucun `gtag` ni script créé ; `granted` → script chargé ; `denied` → aucun. C'est le plus petit test qui échoue si la logique de conditionnement casse. Le rendu du bandeau est couvert par `check:site` (hydratation sans erreur), pas par un test unitaire supplémentaire.

## Risks / Trade-offs

- **Flash de la bannière** : le bandeau s'affiche une frame avant masquage pour un visiteur déjà consentant. Accepté : coûte quelques millisecondes une seule fois, contre un diff d'hydratation sinon. Atténué par un `useEffect` immédiat.
- **Rétroaction GA4** : un lecteur qui accepte sur une page ultérieure n'est pas compté sur les pages précédentes. Inherent à un consentement par visite ; aucun historique n'est rejoué (pas de re-signal).
- **Dépendance à `localStorage`** : navigateur en mode privé restrictif → le choix n'est pas mémorisé, la bannière reapparaît. Dégradement acceptable ; le site reste fonctionnel.
- **Poids HTML/JS** : bandeau + deux pages ajoutent du HTML pré-rendu et un composant. Le CSS reste inliné, le bandeau est hors chemin critique du LCP. Suivi via `pnpm check:site`.

## Migration

Aucune : pas de stockage existant à migrer. Les visiteurs revoyant le site après mise en ligne verront le bandeau (aucun consentement antérieur n'est présumé) et GA4 cesse de collecter jusqu'à acceptation.
