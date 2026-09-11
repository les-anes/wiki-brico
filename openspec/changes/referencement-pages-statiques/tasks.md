## 1. Routage et rendu pré-rendu

- [x] 1.1 Créer `src/routes.ts` : liste canonique des routes dérivée de `tutorials`, `matchRoute(pathname)` et `pageMeta(route)` (titre, description, canonical, `og:*`, fil d’Ariane) ; vérifier par un test que chaque tutoriel produit une route unique et un `pageMeta` complet.
- [x] 1.2 Confirmer par un spike que `prerenderToNodeStream` hisse `<title>`, `<meta>` et le JSON-LD dans le `<head>` rendu ; sinon appliquer le repli documenté (métadonnées rendues directement dans le document) ; vérifier en inspectant le HTML produit.
- [x] 1.3 Créer le composant `Document` (document complet : `<head>` avec métadonnées et `BreadcrumbList`, `<body>` avec la racine, script du shim) et le routeur (état de route, `popstate`, `navigate` via `history.pushState`) ; vérifier qu’une navigation change l’URL et le titre sans rechargement.
- [x] 1.4 Refactoriser `App.tsx` pour recevoir la route et `navigate`, charger les favoris dans un `useEffect` et brancher `main.tsx` sur `hydrateRoot(document, …)` ; vérifier l’absence d’erreur d’hydratation.

## 2. Génération statique

- [x] 2.1 Écrire `scripts/prerender.mjs` : lire le manifeste Vite, rendre chaque route via `prerenderToNodeStream` et écrire `dist/<route>/index.html` ainsi que `dist/404.html` ; vérifier la présence des 16 pages plus la 404 et le bon `<title>` de chacune.
- [x] 2.2 Générer `sitemap.xml` (URLs absolues, `lastmod` issu de `updatedAt`) et `robots.txt` (toujours, avec la ligne `Sitemap:`) depuis `src/routes.ts` ; vérifier l’égalité stricte entre le sitemap et la liste de routes.
- [x] 2.3 Ajouter le shim des anciens liens à fragment dans `Document` ; vérifier que `/#tutoriel/<id>` et `/#tutoriels?...` sont redirigés vers les URLs canoniques.

## 3. Build et développement

- [x] 3.1 Configurer `vite.config.ts` : `appType: "custom"`, plugin middleware SSR de développement, `build.rollupOptions.input = "src/main.tsx"` et `build.manifest = true` ; supprimer `index.html` ; vérifier que `npm run dev` sert `/`, `/tutoriels/` et `/tutoriel/<id>/` et que `npm run build` réussit.
- [x] 3.2 Définir `SITE_URL=https://wikibrico.fr` dans `.env.production`, brancher `prerender.mjs` dans le script `build` et retirer `scripts/generate-seo.mjs` ; vérifier que le build produit des `canonical`, sitemap et `og:url` absolus.

## 4. Garde-fous et déploiement

- [x] 4.1 Ajouter `jsdom` en dépendance de développement et étendre `check:site` : existence des pages, `<title>` et `canonical` par page, cohérence du sitemap, présence du `BreadcrumbList` et hydratation sans `console.error` ; vérifier que le script échoue lorsqu’une page ou un titre manque.
- [x] 4.2 Ajouter `netlify.toml` (`command = "npm run build && npm run check:site"`, `publish = "dist"`, `NODE_VERSION`) ; vérifier la configuration par un `npm run build && npm run check:site` local.
- [x] 4.3 Mettre à jour le README (URLs, prerender, sitemap, déploiement) ; vérifier que les mentions de fragments et de `SITE_URL` conditionnel sont corrigées.

## 5. Validation intégrée

- [x] 5.1 Exécuter `npm run validate:specs`, `npm run validate:data`, `npm run check:site` et `npm run build` ; corriger les échecs liés au changement et consigner les résultats.
- [x] 5.2 Contrôler visuellement sur mobile et ordinateur via agent-browser (accueil, catalogue, une fiche, page 404 et ancien lien `#`) ; joindre les captures ou signaler l’indisponibilité du navigateur.
