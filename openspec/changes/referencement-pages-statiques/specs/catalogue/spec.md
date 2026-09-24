## MODIFIED Requirements

### Requirement: Pages distinctes

Le site SHALL proposer un accueil, un catalogue « On s’y met ce week-end ? », une fiche par identifiant de tutoriel, un hub d’outils de calcul et une page par outil. Chacune de ces pages SHALL être servie à une URL de chemin distincte — `/`, `/tutoriels/`, `/tutoriel/<id>/`, les guides thématiques `/themes/<categorie>/`, le hub `/calculateurs/` et les outils `/calculateurs/<slug>/` — et rester accessible par un accès direct.

#### Scenario: Accès au catalogue

- **WHEN** un visiteur ouvre `/tutoriels/`
- **THEN** le catalogue et ses filtres sont affichés sur une page distincte de l’accueil.

#### Scenario: Accès direct à une fiche

- **WHEN** un visiteur ouvre directement `/tutoriel/<id>/`
- **THEN** la fiche correspondante est affichée sans passer par l’accueil.

#### Scenario: Accès direct à un outil

- **WHEN** un visiteur ouvre directement `/calculateurs/<slug>/`
- **THEN** l’outil correspondant est affiché sans passer par le hub.

### Requirement: Filtres partageables

Le catalogue SHALL lire les filtres de catégorie, sous-catégorie, parcours, recherche, difficulté et favoris depuis la query string de l’URL `/tutoriels/`.

#### Scenario: Lien vers la plomberie

- **WHEN** un visiteur ouvre `/tutoriels/?categorie=plomberie`
- **THEN** seuls les tutoriels correspondant à ce classement sont affichés.

#### Scenario: Lien filtré recopié

- **WHEN** un visiteur partage l’URL courante du catalogue après avoir appliqué des filtres
- **THEN** le destinataire retrouve la même sélection de tutoriels.
