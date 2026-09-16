## 1. Taxonomie et données

- [x] 1.1 Ajouter le topic `["Maçonnerie de pierre", "Rejointoiement"]` à la catégorie `structure` dans `src/data/categories.json` ; vérifier que `validate:data` accepte le nouveau classement et qu’aucun identifiant de catégorie ne change.
- [x] 1.2 Créer `src/data/tutorials/structure/maconnerie-de-pierre/rejointoiement/rejointoyer-un-mur-en-pierre.json` : statut `documented`, `scope`, `estimatesNote`, deux sources consultées, six étapes, trois erreurs, précautions, sans `dtuReferences` ni `shoppingLinks` ; vérifier `pnpm validate:data`.
- [x] 1.3 Relire la fiche contre `openspec/specs/page-tutoriel/spec.md` (cohérence outils / matériaux / étapes, tutoiement, limites du cas) ; corriger les écarts.

## 2. Illustration

- [x] 2.1 Dessiner le SVG de couverture (fond ivoire, mur en pierre appareillé, joints, outil de jointoiement, aucun texte ni flèche) puis le convertir en PNG 1536×1024 ; vérifier les dimensions et l’absence de transparence du fichier produit.
- [x] 2.2 Générer les variantes `-480`, `-720` et `-960` en WebP avec `cwebp` dans `public/images/tutoriels/` ; vérifier que les trois fichiers existent et que le PNG reste la source.
- [x] 2.3 Contrôler visuellement l’image et son rendu sur la carte du catalogue et sur la fiche ; remplacer le fichier si le sujet n’est pas reconnaissable.

## 3. Documentation et contrôles

- [x] 3.1 Consigner le prompt et la méthode de l’illustration dans `docs/illustrations-tutoriels.md`, en signalant qu’elle est provisoire.
- [x] 3.2 Mettre à jour `docs/tutos-a-implementer.md` : T40 coché et déplacé dans « Réalisés depuis cette liste », date de mise à jour et journal.
- [x] 3.3 Ajuster les compteurs figés de `scripts/check-site.mjs` (nombre de tutoriels et nombre de cartes : 24 → 25) ; vérifier qu’aucune autre assertion ne dépend du nombre de fiches.

## 4. Validation intégrée

- [x] 4.1 Exécuter `pnpm typecheck`, `pnpm lint`, `pnpm test` et `pnpm validate:data` ; corriger les échecs liés au changement.
- [x] 4.2 Exécuter `pnpm build` puis `pnpm check:site` ; corriger les échecs (rendu de la fiche, filtres du catalogue, sitemap, hydratation).
- [x] 4.3 Ouvrir la fiche dans le navigateur en mobile et sur ordinateur, vérifier le filtre « Maçonnerie de pierre › Rejointoiement » et l’absence de section vide ; signaler l’indisponibilité du navigateur le cas échéant.
