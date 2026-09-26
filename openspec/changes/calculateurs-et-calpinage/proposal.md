## Why

Les visiteurs ont besoin de repères chiffrés pour préparer et comparer leurs projets : dimensions, quantités, implantation et coupes. Les calculateurs complètent les tutoriels sans supposer qu’un achat suivra.

## What Changes

- Illustrer les neuf outils du hub et les rendre accessibles depuis les suggestions, la recherche générale et les fiches associées.

- Ajouter un type de page `/calculateurs/` (le hub) et `/calculateurs/<slug>/` (un outil), pré-rendu au build comme le reste du site, avec `<title>`, `description`, `canonical`, fil d’Ariane et JSON-LD `BreadcrumbList`.
- Livrer sept outils : pente d’évacuation PVC, quantité de panneaux OSB, isolant et nombre de panneaux, montants et rails d’ossature, dosage mortier-béton, calepinage et escalier illustré.
- Décrire chaque outil dans une donnée JSON (libellés, unités, valeurs par défaut, bornes, formule à appliquer, tutos liés) ; les formules restent des fonctions TypeScript pures et testées.
- Calculer côté client à partir d’un état par défaut rendu au pré-rendu : la page affiche un exemple chiffré complet sans JavaScript et reste indexable ; la saisie ne modifie que les nombres affichés.
- Dessiner le calpinage en SVG : pièce, carreaux entiers, coupes de rive cotées, alerte quand une bande de rive tombe sous un demi-carreau ou sous le tiers d’un carreau.
- Relier chaque outil à ses tutoriels : la fiche qui montre le geste, et le catalogue filtré quand plusieurs fiches s’appliquent.
- Rappeler la méthode et les limites de chaque calcul, avec ses références (guide Nicoll pour la pente, NF EN 300 et abaque fabricant pour l’OSB, NF DTU 52.2 pour le calepinage), sans transformer un outil en prescription de chantier.
- Ajouter les pages au `sitemap.xml` et un accès depuis l’accueil.
- Étendre les garde-fous : `validate:data` contrôle les métadonnées des outils et l’existence des tutos liés, `check:site` les pages pré-rendues, `pnpm test` les formules.

Aucun changement cassant : les URLs existantes restent identiques.

## Capabilities

### New Capabilities

- `calculateurs`: pages d’outils de calcul pré-rendues, saisie de l’utilisateur, résultats recalculés côté client sans rechargement, plan de calpinage, limites et références affichées, liens vers les tutoriels et le catalogue.

### Modified Capabilities

- `catalogue`: l’inventaire des pages servies à une URL de chemin distinct gagne le hub `/calculateurs/` et les outils `/calculateurs/<slug>/`, atteignables depuis la navigation du site et présents dans le sitemap.

## Impact

- Routage et rendu : `src/lib/routes.ts`, `src/App.tsx`, `src/components/calculator-page.tsx` (nouveau), `src/index.css`.
- Données et moteur : `src/data/calculators.json` (nouveau), `src/lib/calculators/*` (nouveau), `src/types.ts`.
- Contrôles : `scripts/validate-data.mjs`, `scripts/check-site.mjs`, `src/lib/calculators/calculators.test.ts` (nouveau).
- Documentation : `docs/outils-calculateurs.md` (nouveau) pour la méthode et les sources de chaque outil.
- Aucune dépendance ajoutée, aucun backend, aucun `fetch` au runtime : le calcul est local et le pré-rendu reste la source du contenu.
