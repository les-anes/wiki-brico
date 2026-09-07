## Why

Le tutoriel PEHD accumule des précisions qui empêchent un novice de comprendre rapidement comment amener l’eau potable du compteur à sa maison. Il doit retrouver le ton direct d’un amateur passionné qui montre les gestes essentiels.

## What Changes

- Réécrire la fiche PEHD : introduction courte définissant « polyéthylène haute densité », matériel accessible, cinq ou six étapes et trois erreurs principales.
- Choisir un montage à compression concret pour éviter les variantes et les listes d’outils conditionnelles ; conserver les précautions indispensables dans un langage courant.
- Supprimer l’affichage « Ce que couvre ce guide » du modèle de fiche et alléger la présentation des références.
- Réserver les références techniques visibles aux DTU pertinents et vérifiés. Conserver les documents de recherche dans les données éditoriales, sans les afficher dans cette rubrique.
- Ajouter « Où trouver le matériel », avec des liens d’enseignes françaises de bricolage en `.fr` uniquement.
- Conserver les identifiants et le classement des tutoriels. La réécriture éditoriale porte sur le PEHD ; les règles de présentation et de séparation des liens s’appliquent au modèle commun.

## Capabilities

### New Capabilities

Aucune.

### Modified Capabilities

- `contenus-tutoriels` : lecture débutant de la fiche PEHD, références DTU distinctes des sources de recherche et liens d’achat limités aux enseignes autorisées.

## Impact

Fiche `plomberie-pehd.json`, types de données, rendu des fiches dans `src/App.tsx`, styles si nécessaire, validation JSON, contrôles de rendu et documentation. Les JSON existants devront distinguer les DTU des autres sources sans perdre leur traçabilité. Aucune nouvelle dépendance ni backend.
