## Why

Une part croissante des questions de bricolage passe par des moteurs génératifs (ChatGPT, Perplexity, Claude, AI Overviews). Ils lisent mieux un texte structuré et daté que du HTML de mise en page. Or nos fiches n’exposent ni leur date ni leur auteur en données structurées. Le périmètre et les sources, qui permettent de citer une fiche sans la sortir de son cadre, ne sont lisibles nulle part.

## What Changes

- Publier `/llms.txt` (format llmstxt.org) : description du site, fiches regroupées par catégorie, guides thématiques et calculateurs.
- Publier une version Markdown complète de chaque fiche à `/tutoriel/<id>/index.md`, avec périmètre et sources consultées, annoncée par `<link rel="alternate" type="text/markdown">`.
- Ajouter un JSON-LD `TechArticle` par fiche (date, catégorie, durée, niveau, DTU cités) et un JSON-LD `WebSite` sur l’accueil. Toujours aucun `HowTo` ; les sources de recherche restent absentes du HTML.

## Capabilities

### New Capabilities

- `moteurs-generatifs` : index `llms.txt`, versions Markdown des fiches et données structurées d’article.

### Modified Capabilities

Aucune.

## Impact

- Nouveau `src/lib/geo.ts` (+ test), `src/document.tsx`, `scripts/prerender.mjs`, `scripts/check-site.mjs`, `netlify.toml`.
- Aucune dépendance, aucun backend.
