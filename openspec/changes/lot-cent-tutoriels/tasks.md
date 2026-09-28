## 1. Recherche et cadrage du lot

- [x] 1.1 Consigner dans `docs/tutos-a-implementer.md` les neuf nouvelles idées T57 à T65 (sujet, catégorie, thème) avec la mention « — En cours — lot-cent-tutoriels ».
- [x] 1.2 Vérifier l’absence de doublons avec le catalogue et la présence des neuf classements dans `src/data/categories.json`.

## 2. Tags et fiches — lot A (isolation, extérieurs, assainissement)

- [x] 2.1 Ajouter les tags `isolation`, `terrasse`, `eau de pluie`, `gouttière` et `plan de travail` à `src/data/tags.json` (sans doublon insensible à la casse).
- [x] 2.2 Écrire `isoler-ses-combles-perdus.json` et `isoler-un-mur-par-l-interieur.json` (statut `documented`, sources datées, 5–6 étapes, 3 erreurs).
- [x] 2.3 Écrire `poser-une-terrasse-en-bois.json` et `installer-un-recuperateur-d-eau-de-pluie.json`.
- [x] 2.4 Contrôler `pnpm validate:data` sur les quatre fiches du lot A.

## 3. Fiches — lot B (toiture, cuisine, menuiseries, cloisons, plomberie)

- [x] 3.1 Écrire `nettoyer-ses-gouttieres.json` et `poser-un-plan-de-travail.json`.
- [x] 3.2 Écrire `regler-une-fenetre-qui-ferme-mal.json` et `poser-un-faux-plafond.json`.
- [x] 3.3 Écrire `remplacer-un-chauffe-eau.json`.
- [x] 3.4 Contrôler `pnpm validate:data` sur les cinq fiches du lot B.

## 4. Illustrations provisoires

- [x] 4.1 Produire les neuf PNG 1536×1024 et les 27 variantes WebP (480/720/960, qualité 82) dans `public/images/tutoriels/`.
- [x] 4.2 Consigner les prompts de remplacement dans `docs/illustrations-tutoriels.md` et les sources PNG/prompts dans `output/imagegen/`.
- [x] 4.3 Contrôler visuellement chaque couverture (sujet lisible, aucun texte, cadrage mobile).

## 5. Suivi et contrôles figés

- [x] 5.1 Mettre à jour `scripts/check-site.mjs` : 91 → 100 fiches et cartes du catalogue.
- [x] 5.2 Déplacer les neuf idées dans « Réalisés depuis cette liste » de `docs/tutos-a-implementer.md` avec la date, rafraîchir le relevé « Thèmes sans fiche » et ajouter une entrée au journal.
- [x] 5.3 Vérifier qu’aucune autre assertion de `check-site.mjs`, `validate-data.mjs` ni test ne dépend du nombre de fiches.

## 6. Validation intégrée et PR

- [x] 6.1 Exécuter `pnpm format:check && pnpm lint && pnpm typecheck && pnpm test && pnpm validate:data && pnpm validate:specs` ; corriger les échecs.
- [x] 6.2 Exécuter `pnpm build && pnpm check:site` ; corriger les échecs de rendu, filtres ou compteurs.
- [x] 6.3 Relire les neuf fiches contre `openspec/specs/page-tutoriel/spec.md` (cohérence outils / matériaux / étapes, tutoiement, limites, aucune délégation).
- [x] 6.4 Pousser la branche et ouvrir la PR vers `main`, avec le récapitulatif du lot (91 → 100, sujets, couverture des vides).
