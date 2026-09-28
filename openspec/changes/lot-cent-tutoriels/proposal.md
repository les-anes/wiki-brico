## Why

Le catalogue compte 91 tutoriels et aucune des 56 idées historiques de `docs/tutos-a-implementer.md` ne reste à faire : la barre des 100 ne se atteindra plus en épuisant la liste. Trois catégories entières (isolation, assainissement, extérieurs) n’ont aucune fiche, et cinquante-six thèmes du menu ouvrent un catalogue vide. Un relevé de popularité (prises de bec les plus réalisées à la maison, guides des enseignes de bricolage, thèmes les plus recherchés sur l’isolation et l’extérieur) convergent vers les mêmes manques : isolation des combles et des murs, terrasse, gouttières, plan de travail, réglage de fenêtre, faux plafond, chauffe-eau et récupération d’eau de pluie.

## What Changes

- Ajouter neuf fiches au statut `documented`, ce qui porte le catalogue de 91 à 100 tutoriels :
  - `isoler-ses-combles-perdus` (isolation › Toiture) et `isoler-un-mur-par-l-interieur` (isolation › Murs), qui ouvrent la catégorie isolation ;
  - `poser-une-terrasse-en-bois` (extérieurs › Terrasse), qui ouvre la catégorie extérieurs ;
  - `installer-un-recuperateur-d-eau-de-pluie` (assainissement › Récupération d’eau), qui ouvre la catégorie assainissement ;
  - `nettoyer-ses-gouttieres` (toiture › Gouttières), `poser-un-plan-de-travail` (cuisine & salle de bains › Plans de travail), `regler-une-fenetre-qui-ferme-mal` (menuiseries › Fenêtres), `poser-un-faux-plafond` (cloisons › Faux plafonds) et `remplacer-un-chauffe-eau` (plomberie › Chauffe-eau), qui remplissent cinq thèmes vides déjà existants dans la taxonomie.
- Rédiger chaque fiche selon `openspec/specs/page-tutoriel/spec.md` : cinq ou six étapes, trois erreurs, sources consultées datées, périmètre et estimations dans les métadonnées, aucun renvoi à un professionnel.
- Produire pour chaque fiche une illustration provisoire (PNG 1536×1024 local, variantes WebP 480/720/960, `imageOrigin: "original"`) et consigner le prompt de remplacement dans `docs/illustrations-tutoriels.md` ; la génération d’images définitives est hors périmètre de ce changement.
- Ajouter les tags éditoriaux nécessaires à `src/data/tags.json` et les liens complémentaires (trois à cinq fiches existantes) à chaque nouvelle fiche.
- Mettre à jour les compteurs figés de `scripts/check-site.mjs` (91 → 100) et le suivi éditorial : journal et relevé « Thèmes sans fiche » de `docs/tutos-a-implementer.md`.

Aucune route, aucun composant, aucune dépendance : les fiches empruntent le modèle de page existant.

## Capabilities

### New Capabilities

Aucune.

### Modified Capabilities

- `contenus-tutoriels` : ajout des exigences propres aux neuf fiches du lot — cadrage de chacune (périmètre, conditions d’arrêt, matériel cohérent avec les étapes) et couverture des trois catégories jusqu’ici sans fiche.

## Impact

- Données : neuf nouveaux JSON sous `src/data/tutorials/` (isolation, extérieurs, assainissement, toiture, cuisine & salle de bains, menuiseries, cloisons, plomberie), ajout de tags dans `src/data/tags.json`.
- Images : 9 PNG dans `public/images/tutoriels/` et 27 variantes WebP ; prompts dans `output/imagegen/` et `docs/illustrations-tutoriels.md`.
- Contrôles : `scripts/check-site.mjs` (nombre de fiches et cartes du catalogue).
- Documentation : `docs/tutos-a-implementer.md` (journal, relevé des thèmes vides).
- Aucune dépendance ajoutée, aucun backend, aucun changement de rendu ni d’URL existante.
