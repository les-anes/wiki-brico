# Contenus des tutoriels

## Purpose
Conserver des fiches de rénovation structurées dans des fichiers JSON statiques, avec une arborescence cohérente et une traçabilité éditoriale.

## Requirements

### Requirement: Fichier unique et identifiant stable
Chaque tutoriel SHALL posséder un JSON unique dans `src/data/tutorials/<category>/<topicPath-en-slugs>/<id>.json`. Son identifiant reste stable lors d’un reclassement.

#### Scenario: Déplacement dans la taxonomie
- **WHEN** le classement principal d’un tutoriel change
- **THEN** son fichier est déplacé dans le chemin correspondant tout en conservant son identifiant et son lien de fiche.

### Requirement: Structure commune
Chaque fiche SHALL respecter le contrat `Tutorial` de `src/types.ts`, avec outils, matériaux, étapes, erreurs à éviter et sécurité. Les classifications SHALL référencer la taxonomie du projet.

#### Scenario: Contrôle des données
- **WHEN** `npm run validate:data` est exécuté
- **THEN** un chemin incohérent, un identifiant dupliqué ou une classification inconnue provoque un échec.

### Requirement: Contenus documentés traçables
Une fiche au statut `documented` SHALL fournir `scope`, `estimatesNote`, des sources consultées et les crédits de son image. Ce statut ne vaut pas validation professionnelle.

#### Scenario: Source absente
- **WHEN** une fiche documentée ne fournit aucune source
- **THEN** la validation des données échoue.
