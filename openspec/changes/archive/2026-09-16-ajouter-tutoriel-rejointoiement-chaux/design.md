## Context

Voir `proposal.md`. La préparation d’une fiche suit `openspec/specs/page-tutoriel/spec.md` : une fiche = un JSON au contrat `Tutorial`, une illustration locale, des sources de recherche dans les données et des validations automatiques. Deux points ne sont pas tranchés par les specs existantes : le classement d’un sujet de maçonnerie de pierre, absent de la taxonomie, et l’absence d’outil de génération d’images dans cet environnement.

Contraintes : site statique, aucune nouvelle dépendance, `validate:data` refuse un `topicPath` inconnu et exige une image présente sur le disque, `check-site` vérifie chaque fiche (5 à 6 étapes, 3 erreurs, illustration originale) et fige le nombre de tutoriels.

## Goals / Non-Goals

**Goals :**

- Une fiche complète au statut `documented`, réalisable par un débutant, limitée à un mur stable.
- Un classement réutilisable par les futurs sujets de maçonnerie (T41, T42).
- Une illustration au contrat d’image du projet, produite avec les moyens locaux disponibles.

**Non-Goals :**

- Ne pas ajouter de route, de composant ni de style.
- Ne pas compléter la taxonomie au-delà du topic nécessaire.
- Ne pas produire un schéma technique ni une image de référence : l’illustration reste une couverture.

## Decisions

1. **Topic `["Maçonnerie de pierre", "Rejointoiement"]` dans la catégorie `structure`.**
   C’est la première fiche de gros œuvre et aucun topic existant ne couvre la maçonnerie de pierre. Alternatives écartées : `["Murs porteurs"]`, qui détourne un topic structurel vers une finition de façade, et `techniques / ["Faire un joint"]`, réservé aux joints d’assemblage et sanitaires. Le catalogue dérive déjà ses filtres hiérarchiques de la taxonomie via `childTopics`, donc le sous-topic fonctionne sans code supplémentaire.

2. **Sources de recherche : un fabricant de mortiers et une association patrimoniale.**
   Socli (Heidelberg Materials) décrit le rôle du joint, le choix du liant selon la dureté du matériau et l’intérêt de la chaux en restauration ; Maisons Paysannes de France Vaucluse décrit la vérification préalable, la conservation des joints sains et les risques d’un mortier trop dur. Ces deux sources sont conservées dans `sources` et ne sont pas affichées dans la page.

3. **Aucune référence DTU et aucun lien d’achat.**
   Le rejointoiement d’une maçonnerie ancienne en pierre n’est pas couvert par une référence DTU vérifiée auprès de son éditeur, et aucune fiche produit d’enseigne autorisée n’a été vérifiée. Conformément à la spec, les rubriques « Références DTU » et « Où trouver le matériel » restent masquées plutôt que remplies d’approximations.

4. **Dosages et profondeurs formulés comme des repères.**
   Les sources consultées donnent des ordres de grandeur qui varient avec la pierre, la largeur du joint et le produit. La fiche donne donc une fourchette indicative et renvoie à l’emballage, au lieu de présenter un dosage ou une profondeur comme universels.

5. **Illustration écrite en SVG puis rastérisée localement.**
   L’environnement ne dispose pas de l’outil de génération d’images utilisé pour les fiches précédentes. Un SVG dessiné à la main reprend les codes demandés (fond ivoire, formes plates, contours irréguliers, sujet centré, aucun texte) puis est converti en PNG 1536×1024 avec `sips`, les variantes WebP étant produites avec `cwebp`. Aucun script de génération n’est ajouté au dépôt : l’outil est jetable et le PNG reste la source éditoriale. Le prompt de remplacement est consigné dans `docs/illustrations-tutoriels.md`.

6. **Compteurs figés mis à jour dans `check-site`.**
   Le script vérifie le nombre de tutoriels et le nombre de cartes du catalogue ; ces valeurs passent de 24 à 25.

## Risks / Trade-offs

- **Illustration provisoire éloignée du rendu gouache maison.** → Le contrat technique est respecté (PNG 1536×1024, variantes WebP, `imageOrigin: "original"`, pas de crédit) et le prompt de remplacement est prêt ; la fiche sera réillustrée sans toucher aux données.
- **Contenu technique généralisé à tort.** → Aucun dosage ni profondeur n’est présenté comme universel ; les limites du cas sont écrites dans `scope` et dans une étape dédiée.
- **Poussière de mortier ancien.** → Précautions explicites : lunettes, masque, humidification avant le burinage, et arrêt si la nature du mortier reste inconnue.
- **Un sujet de gros œuvre attire des lecteurs sur un chantier plus lourd que prévu.** → L’introduction et `scope` annoncent le cas traité ; les désordres structurels sont une condition d’arrêt.

## Migration Plan

Aucune migration de données : la fiche est nouvelle, aucun identifiant existant ni URL ne change. Retour arrière = suppression du JSON, du topic et des fichiers d’image.

## Open Questions

- Faut-il un jour une illustration « définitive » produite avec l’outil maison pour cette fiche ? À trancher lors du prochain lot, sans impact sur les données.
