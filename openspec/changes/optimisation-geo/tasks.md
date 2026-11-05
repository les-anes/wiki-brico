## 1. Génération

- [x] 1.1 `src/lib/geo.ts` : `tutorialJsonLd`, `siteJsonLd`, `tutorialMarkdown`, `llmsTxt`, couverts par `geo.test.ts`.
- [x] 1.2 `prerender.mjs` écrit `dist/llms.txt` et `dist/tutoriel/<id>/index.md`.
- [x] 1.3 `document.tsx` émet le lien `alternate` et le JSON-LD, après le `BreadcrumbList`.

## 2. Contrôles

- [x] 2.1 `check:site` vérifie `llms.txt`, chaque `.md`, le lien `alternate` et le `TechArticle`.
- [ ] 2.2 Après déploiement : vérifier l’en-tête `Content-Type` UTF-8 des `.md` et de `llms.txt` sur Netlify.
