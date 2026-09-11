## Why

Le contenu vit derrière des fragments (`/#tutoriel/<id>`) : Google ne voit qu’une seule URL indexable, `sitemap.xml` renvoie une 404 et aucune page n’a son propre titre ou sa propre méta-description. Le seul canal d’acquisition gratuit du projet est donc bouché alors que quatorze fiches prêtes à être trouvées attendent d’être indexées.

## What Changes

- Remplacer le routage par fragment par des URLs réelles : `/`, `/tutoriels/`, `/tutoriel/<id>/`.
- Pré-rendre chaque page en HTML statique au build avec React 19 (`prerenderToNodeStream`), en donnant à chaque page son `<title>`, sa `description`, son `canonical` et ses métadonnées `og:*`.
- Ajouter un balisage JSON-LD `BreadcrumbList` par fiche, aligné sur le fil d’Ariane affiché. Aucun balisage `HowTo` : Google a retiré ce rich result.
- Générer `sitemap.xml`, `robots.txt` et `404.html` systématiquement, à partir d’une source de vérité unique des routes partagée avec le routeur et le prerender.
- Définir `SITE_URL=https://wikibrico.fr` pour produire des URLs absolues (canonical, sitemap, `og:url`).
- Hydrater l’application côté client (`hydrateRoot`) sans casser la recherche, les filtres ni les favoris, et sans erreur d’hydratation.
- Rediriger les anciens liens `#` vers les nouvelles routes canoniques.
- Transformer `check:site` en garde-fou de build (fichiers générés, titres par page, cohérence du sitemap, hydratation sans erreur) et ajouter `netlify.toml`.

**BREAKING** : les URLs publiques changent. Les identifiants de tutoriels restent stables et un shim couvre les anciens liens, mais tout nouveau lien de partage doit utiliser les chemins.

## Capabilities

### New Capabilities

- `referencement`: pages accessibles par URL réelle, métadonnées propres à chaque page, balisage du fil d’Ariane, HTML pré-rendu au build, sitemap, robots et page 404.

### Modified Capabilities

- `catalogue`: les pages distinctes et les filtres partageables s’appuient sur des chemins et une query string au lieu de fragments d’URL.

## Impact

- Routage et rendu : `src/App.tsx`, `src/main.tsx`, nouveau `src/routes.ts`, nouveau composant de document.
- Build et scripts : `scripts/prerender.mjs` (remplace `scripts/generate-seo.mjs`), `scripts/check-site.mjs`, `vite.config.ts`, `package.json`, `.env.production`, `index.html`.
- Déploiement et documentation : nouveau `netlify.toml`, mise à jour du README.
- Dépendance de développement ajoutée : `jsdom` (test d’hydratation). Aucune dépendance de production, aucun backend.
