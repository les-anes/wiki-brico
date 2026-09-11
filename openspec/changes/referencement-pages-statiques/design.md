## Context

Voir `proposal.md` — Why. L’application actuelle est un SPA React 19 + Vite 6 : `src/main.tsx` monte `<App/>` dans `#root`, `index.html` porte le document, et `App.tsx` lit la route dans `location.hash`. `scripts/check-site.mjs` rend les composants hors navigateur avec `renderToStaticMarkup`, que la documentation React décrit comme **non hydratable** : ce pattern ne peut pas servir à générer de vraies pages. Le build actuel génère un `sitemap.xml` limité à l’accueil et seulement si `SITE_URL` est défini, propriété absente de `.env.production`.

Contraintes : site entièrement statique (aucun backend), hébergement Netlify, quatorze fiches en JSON, identifiants de tutoriels stables, et volonté de coller aux pratiques recommandées plutôt qu’à du code de rendu maison.

## Goals / Non-Goals

**Goals :**

- Une source de vérité unique des routes, consommée par le routeur, le prerender et le sitemap.
- Un seul chemin de rendu (le même composant de document) en développement et en production.
- Des métadonnées par page dérivées des données, sans duplication de logique serveur/client.

**Non-Goals :**

- Ne pas réécrire les fiches ni la taxonomie.
- Ne pas ajouter de backend, de rendu à la requête ou de données dynamiques.
- Ne pas générer de pages de catégorie ou de filtre (contenu mince).
- Ne pas optimiser les images ni remplacer l’image d’accueil Unsplash.

## Decisions

1. **Prerender statique avec React 19 `prerenderToNodeStream` (`react-dom/static`), et non un outil tiers.**
   Alternatives écartées : `vite-react-ssg` (impose `react-router-dom` en peer deps), `vike` (migration de framework), `react-snap` (non maintenu depuis 2018), Astro (réécriture du routage et du layout). L’API React est first-party, **hydratable** via `hydrateRoot`, et documentée pour la génération statique. Elle remplace le recours à `renderToStaticMarkup`.

2. **Le nœud racine rend le document entier.**
   Un composant `Document` rend `<html>`, `<head>` et `<body><div id="root"><App/></div></body>`. `prerenderToNodeStream(<Document/>, { bootstrapModules })` produit un fichier HTML complet ; aucune injection de chaîne dans un template. `main.tsx` fait `hydrateRoot(document, <Document/>)` : le même arbre est rendu côté serveur et hydraté côté client, ce qui rend la parité du `<head>` structurelle.

3. **Le routage vit dans `Document`, pas dans `App`.**
   `Document` détient l’état de route, écoute `popstate` et expose `navigate` (via `history.pushState`). `App` reçoit la route et `navigate` en props. Le défilement, le focus et l’analytics restent inchangés.

4. **Source de vérité des routes : `src/routes.ts`.**
   Expose la liste des routes canoniques dérivée de `tutorials`, `matchRoute(pathname)` et `pageMeta(route)` (titre, description, canonical, `og:*`, fil d’Ariane). `pageMeta` est appelé par le rendu React **et** par le script de prerender pour le sitemap : une seule dérivation, aucune dérive entre pages, sitemap, balisage et navigation.

5. **Développement servi par un middleware SSR Vite minimal, sans `index.html`.**
   Un plugin inline dans `vite.config.ts` (`appType: "custom"`) répond aux requêtes HTML en appelant le même `prerenderToNodeStream(<Document/>, { bootstrapModules: ["/@vite/client", "/src/main.tsx"] })`. Avantage : un seul chemin de rendu en dev et en prod, donc les tests d’hydratation couvrent le chemin réel. `index.html` est supprimé ; le build utilise `build.rollupOptions.input = "src/main.tsx"` avec `build.manifest = true`.

6. **Le script de build `scripts/prerender.mjs` remplace `scripts/generate-seo.mjs`.**
   Il importe `src/routes.ts`, lit `dist/.vite/manifest.json` pour les assets (entrée JS et CSS) et écrit, à partir de la même liste de routes : `dist/<route>/index.html`, `dist/index.html`, `dist/404.html`, `dist/sitemap.xml` et `dist/robots.txt`. `SITE_URL=https://wikibrico.fr` est lu depuis `.env.production` pour les URLs absolues. Le sitemap et `robots.txt` sont **toujours** générés (la condition actuelle sur `SITE_URL` disparaît).

7. **Hydratation sûre.**
   `readSaved()` lit `localStorage` dans l’initialiseur de `useState` : prerendu = `[]`, client = liste → mismatch. Les favoris sont chargés dans un `useEffect`. L’analytics reste déclenchée dans un `useEffect`. C’est le seul piège d’hydratation identifié et il est couvert par un test.

8. **Garde-fou dans `check:site`.**
   Le script vérifie l’existence des 16 pages et de `404.html`, la présence du bon `<title>` et du `canonical` par page, l’égalité stricte entre le sitemap et la liste de routes, puis hydrate chaque page dans `jsdom` en échouant sur toute `console.error`. `netlify.toml` exécute `npm run build && npm run check:site`.

9. **Shim des anciens liens à fragment.**
   Un `<script>` inline rendu par `Document` réécrit `/#tutoriel/<id>` et `/#tutoriels?...` vers les URLs canoniques. Les fragments n’atteignent jamais le serveur : la redirection est nécessairement côté client.

10. **Données structurées limitées au fil d’Ariane.**
    Chaque fiche émet un `BreadcrumbList` JSON-LD dérivé du même `pageMeta()`. `HowTo` est **exclu** : Google a supprimé sa documentation et ce rich result n’apparaît plus (desktop et mobile). `Article`/`TechArticle` et `WebSite`/`SearchAction` sont également écartés (ROI nul). Un seul type, un seul endroit.

## Risks / Trade-offs

- **Hissage des métadonnées incertain avec `prerenderToNodeStream`.** Confirmé par spike : `prerenderToNodeStream` hisse bien `<title>` et `<meta>` dans le `<head>` du document rendu, même quand les composants les rendent au fond du `<body>`. En revanche le `<script type="application/ld+json">` n’est pas hissé : le `BreadcrumbList` est donc rendu explicitement dans le `<head>` de `Document`, à partir de `pageMeta()`. Aucun repli nécessaire pour les métadonnées.
- **Middleware de dev à écrire et maintenir.** → Le garder minimal (une fonction de réponse HTML) et couvert par le test d’hydratation sur le build.
- **Suppression de `index.html`.** Vite n’a plus d’entrée HTML par défaut ; oublier `rollupOptions.input` casserait le build. → Le build est vérifié par `check:site` en CI.
- **Test d’hydratation en `jsdom` moins fidèle qu’un navigateur.** → Compléter par une validation visuelle manuelle via agent-browser avant fusion.
- **Contenu dupliqué des URLs filtrées.** → Les filtres restent en query string et le `canonical` de `/tutoriels/` pointe toujours vers la forme nue.
- **Balisage structuré désynchronisé du fil d’Ariane affiché.** → `BreadcrumbList` et le fil visible sont tous deux dérivés de `pageMeta()` ; le test de `check:site` vérifie la présence du balisage par fiche.
- **Bascule d’URL pour les visiteurs et backlinks.** → Shim côté client et conservation stricte des identifiants de tutoriels.
- **Origine absolue recalculée côté client.** `location.origin` diffère de `SITE_URL` sur une URL de prévisualisation Netlify : `canonical`, `og:*` et `BreadcrumbList` divergeaient du rendu serveur et cassaient l’hydratation (React #418). → `Document` porte `data-site-url` sur `<html>` et `main.tsx` reprend cette origine au lieu de `location.origin` ; `check:site` hydrate depuis une origine volontairement différente pour verrouiller le comportement.

## Migration Plan

1. Introduire `src/routes.ts`, `Document`, le routeur et l’hydratation ; garder temporairement le shim des fragments.
2. Brancher le middleware de dev, supprimer `index.html`, régler `vite.config.ts` et `main.tsx`.
3. Écrire `scripts/prerender.mjs`, retirer `scripts/generate-seo.mjs`, mettre à jour `package.json`, `.env.production` et `netlify.toml`.
4. Étendre `check:site`, lancer `validate:specs`, `validate:data`, `check:site` et `build`.
5. Contrôle visuel mobile/ordinateur via agent-browser.

Retour arrière : l’ensemble du changement est un commit isolé ; le rétablir restaure le routage par fragment et l’ancien script. Aucun identifiant ni donnée n’est modifié.

## Open Questions

- Emplacement exact de l’image sociale par fiche : l’illustration locale suffit-elle (ratio variable) ou faut-il une image dédiée aux dimensions de partage ? Reportable sans changer les specs ni les tâches.
