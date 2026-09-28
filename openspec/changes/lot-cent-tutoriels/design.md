## Context

Voir `proposal.md`. Le catalogue est à 91 fiches, la liste historique des idées est épuisée, et le relevé « Thèmes sans fiche » du 27 septembre 2026 (`docs/tutos-a-implementer.md`) recense 56 thèmes ouvrant un catalogue vide, dont trois catégories entières : isolation, assainissement, extérieurs.

La recherche de popularité faite pour ce lot (prises de bec les plus réalisées à la maison en 2026, guides des enseignes de bricolage, thèmes les plus consultés sur l’isolation, l’extérieur, la cuisine et l’entretien) situe les sujets à plus fort retour lecteur dans : l’isolation (combles et murs), la terrasse, l’entretien de toiture, la cuisine (plan de travail), le réglage de fenêtre, le faux plafond, le chauffe-eau et la récupération d’eau de pluie.

Contraintes : site statique sans backend, aucune dépendance nouvelle, `validate:data` exige un fichier image réel et un `topicPath` existant, `check-site` fige le nombre de fiches et de cartes, et la génération d’images définitives n’est pas disponible dans cet environnement.

## Goals / Non-Goals

**Goals :**

- Porter le catalogue à 100 fiches avec neuf sujets choisis à l’intersection popularité et couverture des vides.
- Ouvrir les catégories isolation, assainissement et extérieurs, et cinq thèmes vides déjà déclarés.
- Garder chaque fiche au format du modèle commun, avec des sources réellement consultées et un cadrage vérifiable.
- Laisser la porte ouverte à la régénération des illustrations : prompts consignés.

**Non-Goals :**

- Ne pas produire les illustrations définitives à l’imagegen ni ajouter d’outil de génération au dépôt.
- Ne pas modifier `src/data/categories.json`, les routes, les composants ou les dépendances.
- Ne pas ajouter de page pilier ni de parcours pour ces neuf fiches.
- Ne pas rouvrir les idées historiques de `docs/tutos-a-implementer.md`.

## Decisions

1. **Neuf sujets retenus par double filtre popularité / couverture.** Chaque sujet remplit au moins un emplacement vide (catégorie ou thème) et figure dans les recherches de popularité du moment. Écartés au profit d’une couverture plus large : d’autres sujets de peinture et de carrelage (déjà servis à 30 fiches), le montage de meuble (hors périmètre rénovation) et les techniques de base type « visser » (faible valeur éditoriale).

2. **Aucune modification de taxonomie.** Les neuf classements existent déjà dans `src/data/categories.json`. Alternatives écartées : créer des sous-thèmes (« Combles » sous isolation) — le catalogue dérive ses filtres du `topicPath` seul et un thème existant déjà vide suffit à l’usage.

3. **Sources : guides d’enseignes et médias de la rénovation, une à deux pages consultées par fiche.** Les sources vivent dans les métadonnées `sources` avec `accessedAt` daté et ne sont pas affichées dans la page. Aucun DTU n’est ajouté : aucun texte AFNOR n’a été vérifié auprès de son éditeur pour ces neuf gestes dans ce lot, donc la rubrique « Références DTU » reste masquée plutôt que remplie d’une approximation. Aucun lien d’achat n’est ajouté non plus.

4. **Illustrations provisoires produites localement, prompts consignés.** Comme pour T40, le PNG 1536×1024 est produit dans l’environnement (SVG rastérisé par Chromium headless), les variantes WebP avec `cwebp` qualité 82. Aucun script de génération n’est ajouté au dépôt ; le prompt de remplacement partagé est consigné par fiche dans `docs/illustrations-tutoriels.md` et le gabarit reste `output/imagegen/_gabarit.txt`.

5. **Tags : cinq ajouts à `src/data/tags.json`.** `isolation`, `terrasse`, `gouttière`, `eau de pluie`, `plan de travail` n’existent pas dans le référentiel ; ils sont ajoutés pour que les neuf fiches restent trouvables par la recherche à facettes, sans doublon insensible à la casse.

6. **Compteurs figés de `check-site`.** Les valeurs 91 (fiches uniques) et 91 (cartes du catalogue) passent à 100 ; les autres assertions par catégorie ne concernent que des catégories non touchées par le lot.

## Risks / Trade-offs

- **Illustrations provisoires éloignées du rendu gouache maison.** → Contrat technique respecté (dimensions, variantes, origine, alt) et prompts prêts ; les couvertures seront régénérées sans toucher aux données.
- **Sujets techniques présentés trop simplement.** → Chaque fiche porte son `scope`, ses conditions d’arrêt et, pour l’hauteur et l’électricité, des précautions propres au chantier.
- **Une seule source par fiche affaiblit la traçabilité.** → Chaque fiche vise une à deux pages réellement consultées ; une source suffisante et datée est préférée à deux sources décoratives.

## Migration Plan

Aucune migration : neuf fiches nouvelles, aucun identifiant ni URL existant modifié. Retour arrière = suppression des neuf JSON, des images et des tags ajoutés.

## Open Questions

- Quand régénérer les neuf couvertures avec l’outil d’imagegen ? À trancher après le merge, sans impact sur les données.
