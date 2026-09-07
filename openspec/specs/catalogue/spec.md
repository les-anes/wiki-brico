# Catalogue et navigation

## Purpose
Permettre de découvrir les tutoriels depuis un accueil, un catalogue filtrable et des fiches détaillées, en conservant des liens partageables.

## Requirements

### Requirement: Pages distinctes
Le site SHALL proposer un accueil, un catalogue « On s’y met ce week-end ? » et une fiche par identifiant de tutoriel.

#### Scenario: Accès au catalogue
- **WHEN** un visiteur ouvre `/#tutoriels`
- **THEN** le catalogue et ses filtres sont affichés sur une page distincte de l’accueil.

### Requirement: Filtres partageables
Le catalogue SHALL lire les filtres de catégorie, sous-catégorie, parcours, recherche, difficulté et favoris depuis les paramètres du fragment URL.

#### Scenario: Lien vers la plomberie
- **WHEN** un visiteur ouvre `/#tutoriels?categorie=plomberie`
- **THEN** seuls les tutoriels correspondant à ce classement sont affichés.

### Requirement: Classements multiples
Le catalogue SHALL reconnaître les classements principaux et secondaires, ainsi que les parcours, sans dupliquer les tutoriels dans les résultats.

#### Scenario: Classement secondaire
- **WHEN** un tutoriel correspond au filtre par son champ `relatedCategories`
- **THEN** il apparaît une seule fois dans les résultats.
