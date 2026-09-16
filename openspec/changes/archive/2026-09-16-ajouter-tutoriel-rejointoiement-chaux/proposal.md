## Why

Le catalogue ne compte aucun tutoriel de gros œuvre et la maçonnerie de pierre n’existe pas encore dans la taxonomie. Un lecteur dont les joints de mur en pierre se creusent ou s’effritent n’a donc aucun geste documenté à suivre. T40 est la prochaine idée de `docs/tutos-a-implementer.md` qui reste réalisable sans cadrage structurel préalable, contrairement à T41 et T42.

## What Changes

- Ajouter la fiche `rejointoyer-un-mur-en-pierre.json` au statut `documented` : cas d’un mur en pierre stable dont les joints sont creusés ou friables, avec préparation des joints, choix d’un mortier de chaux compatible, garnissage et finition.
- Ajouter le topic « Maçonnerie de pierre » et son sous-topic « Rejointoiement » à la catégorie `structure` de `src/data/categories.json`, ce qui crée la première fiche de cette catégorie.
- Produire l’illustration originale `rejointoyer-un-mur-en-pierre.png`, ses variantes WebP responsives et consigner son prompt dans `docs/illustrations-tutoriels.md`.
- Passer T40 en « réalisé » dans `docs/tutos-a-implementer.md` et mettre à jour sa date et son journal.
- Ajuster les compteurs figés de `scripts/check-site.mjs` pour la fiche et le topic supplémentaires.

Aucune route, aucun composant et aucune dépendance ne changent : la fiche emprunte le modèle de page existant.

## Capabilities

### New Capabilities

Aucune.

### Modified Capabilities

- `contenus-tutoriels` : ajout d’une exigence propre à la nouvelle fiche — lecture par un débutant du rejointoiement à la chaux, périmètre limité à un mur stable et gestes de contrôle du résultat.

## Impact

- Données : nouveau `src/data/tutorials/structure/maçonnerie-de-pierre/rejointoiement/rejointoyer-un-mur-en-pierre.json`, modification de `src/data/categories.json`.
- Images : `public/images/tutoriels/rejointoyer-un-mur-en-pierre.png` et les variantes `-480`, `-720`, `-960` en WebP.
- Contrôles : `scripts/check-site.mjs` (nombre de fiches, nombre de cartes du catalogue).
- Documentation : `docs/tutos-a-implementer.md`, `docs/illustrations-tutoriels.md`.
- Aucune dépendance ajoutée, aucun backend, aucun changement de rendu.

Note : l’illustration est produite localement dans cet environnement, sans l’outil de génération d’images utilisé pour les fiches précédentes. Elle respecte le contrat (PNG 1536×1024, variantes WebP, `imageOrigin: "original"`) et son prompt de remplacement est consigné dans `docs/illustrations-tutoriels.md`.
