# AGENTS.md — WikiBrico

Instructions pour tout agent de codage (Claude Code, Cursor, Codex, pi…). Ce fichier
**complète** les règles propres à ton agent, il ne les remplace pas. Tout se passe en
français, comme le reste du dépôt.

## Le projet

Encyclopédie française du bricolage et de la rénovation. Site **statique pré-rendu**, sans
backend : React 19 + TypeScript + Vite 6 + Tailwind 3, composants de style shadcn/ui.

- Routes réelles pré-rendues au build : `/`, `/tutoriels/`, `/tutoriel/<id>/`, `404.html`.
  Les anciens liens à fragment (`/#tutoriel/<id>`) sont redirigés par un court script en ligne.
- `src/lib/routes.ts` = routage maison (pas de react-router). `src/document.tsx` = le document
  HTML complet, hydraté par `hydrateRoot(document, …)` depuis `src/main.tsx`.
- `scripts/prerender.mjs` écrit chaque route + `404.html` + `sitemap.xml` + `robots.txt`, et
  lance `validate-data` en première ligne.
- Le contenu est de la **donnée JSON** sous `src/data/tutorials/`. Contrat : `src/types.ts`.
  Taxonomie : `src/data/categories.json` (catégories) et `src/data/journeys.json` (parcours).
- Les specs OpenSpec (`openspec/specs/`) décrivent les comportements attendus. Un changement de
  comportement observable passe par là.

Avant de toucher un domaine, ouvre la spec correspondante (`catalogue`, `page-tutoriel`,
`contenus-tutoriels`) et lis `src/types.ts`.

## Échelle de paresse — avant d'écrire une ligne

Arrête-toi à la **première marche** qui tient :

1. Faut-il vraiment le construire ? (YAGNI)
2. Existe-t-il déjà ici ? Réutilise le helper de `src/lib/`, le composant de `src/components/`
   ou le pattern déjà en place.
3. La bibliothèque standard le fait-elle ?
4. Une fonctionnalité native de la plateforme le couvre-t-elle ?
5. Une dépendance **déjà installée** le résout-elle ?
6. Tenable en une ligne ? Une ligne.
7. Sinon seulement : le minimum de code qui marche.

L'échelle se gravit **après** avoir compris le problème, pas à la place. Remonte le flux réel de
bout en bout avant de choisir une marche.

- Pas d'abstraction non demandée. Pas de dépendance nouvelle sans raison. Pas de code « au cas où ».
- Suppression avant ajout. Ennuyeux avant malin. Le plus petit diff qui marche — mais au bon endroit.
- Si tu coupes volontairement un coin (verrou grossier, scan O(n²), heuristique naïve), marque-le
  d'un commentaire qui nomme le plafond et la voie d'amélioration.
- Dis toujours à l'utilisateur ce que tu as sauté.

**Paresse ≠ négligence.** Ne coupe jamais la validation aux frontières, la gestion d'erreur qui
évite une perte de données, la sécurité, l'**accessibilité**, ni la compréhension du problème. Un
petit diff que tu ne comprends pas n'est pas de la paresse, c'est un second bug.

## Quatre règles de conduite

1. **Réfléchis avant de coder.** Énonce tes hypothèses. S'il existe plusieurs interprétations,
   présente-les — ne choisis pas en silence. Si quelque chose est flou, arrête-toi et demande.
   Pour un changement de fond, aligne-toi d'abord.
2. **Simplicité d'abord.** Le minimum de code qui résout le problème. Pose-toi la question :
   « un ingénieur senior jugerait-il ça trop compliqué ? » Si oui, simplifie.
3. **Changements chirurgicaux.** Chaque ligne modifiée doit tracer directement à la demande. Ne
   réécris pas le code adjacent, ne reformate pas, ne refactore pas ce qui marche. Signale le code
   mort, ne le supprime pas sans demande.
4. **Exécution guidée par objectif.** Transforme la tâche en objectif vérifiable, puis boucle
   jusqu'à vérification. Pour une tâche en plusieurs étapes, écris un plan court où chaque étape
   porte le contrôle qui la valide.

## Contraintes du dépôt

- **Langue.** Contenu, libellés et commentaires en français. Les en-têtes OpenSpec et les
  mots-clés SHALL/MUST restent en anglais.
- **Tout est statique.** Pas de serveur, pas de `fetch` au runtime (seul l'analytics tiers se
  charge, après `window.load`). Toute donnée est pré-rendue au build.
- **Ne casse pas le pré-rendu.** `src/document.tsx`, `scripts/prerender.mjs` et `src/lib/routes.ts`
  restent cohérents : une route sans `pageMeta` casse le SEO et le sitemap.
- **Le contenu est de la donnée.** Pour un tutoriel, édite le JSON dans `src/data/tutorials/`.
  Garde `id` et `image` stables : liens, favoris et noms de fichiers en dépendent.
- **Images.** `<id>.png` dans `public/images/tutoriels/`, plus les variantes
  `<id>-480|720|960.webp`. Passe par `responsiveImage()` (`src/lib/images.ts`) et un `<picture>`
  avec repli PNG. Format `landscape` 1536×1024.
- **CSS.** Feuille unique `src/index.css` + Tailwind. Pas de CSS-in-JS.
- **Perf et accessibilité :** cible 100 sur Lighthouse. Le budget critique (LCP, CLS, contraste)
  est du contenu partagé, pas un détail. Le lint `jsx-a11y` fait partie du gate.

## Commandes

```sh
pnpm dev            # serveur de développement
pnpm build          # tsc + vite + pré-rendu (lance validate:data)
pnpm test           # node:test (src/lib/routes.test.ts)
pnpm lint           # oxlint
pnpm format         # oxfmt --write
pnpm typecheck      # tsc --noEmit
pnpm knip           # code et dépendances morts
pnpm validate:data  # chemins, ids, taxonomie, sources, images
pnpm check:site     # rendu, filtres, sitemap, fil d'Ariane, hydratation (sans navigateur)
pnpm validate:specs # openspec validate --all --strict
```

## Fini quand

- `pnpm typecheck && pnpm lint && pnpm test && pnpm validate:data` passent.
- Toute modification de rendu passe `pnpm check:site` (ou est vérifiée dans le navigateur).
- La logique non triviale laisse **un** contrôle exécutable derrière elle : le plus petit qui
  échoue si la logique casse. Un one-liner trivial n'a pas besoin de test.
- Aucune dépendance ajoutée sans justification.

## Ne fais pas

- Ajouter react-router, un gestionnaire d'état ou du CSS-in-JS.
- Renommer ou renuméroter l'`id` d'un tutoriel, ni son fichier image.
- Supprimer le repli PNG des `<picture>` (OG, validation, `check:site` en dépendent).
- Éditer `dist/` (généré) ou dupliquer un tutoriel pour lui donner plusieurs accès — utilise
  `relatedCategories` et `journeys`.
- Introduire un `fetch` au runtime ou un backend.

## Git

Commit conventionnel, **message en français**, une intention par commit. Exemples :
`perf(lighthouse): 100 partout`, `fix(catalogue): corriger l'ordre des titres`,
`docs(contenus): ajouter les sources du tutoriel plomberie`.
