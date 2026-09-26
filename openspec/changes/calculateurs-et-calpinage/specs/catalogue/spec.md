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

### Requirement: Suggestions de recherche sur l’accueil

Le champ « Rechercher un tutoriel ou un calculateur » de l’accueil SHALL afficher sous la saisie jusqu’à cinq tutoriels et trois calculateurs, issus du même moteur de correspondance locale. Chaque suggestion SHALL afficher le titre et le type de contenu, ainsi que la catégorie pour un tutoriel, et ouvrir directement la fiche ou le calculateur. Une saisie vide SHALL masquer la liste ; une saisie sans résultat SHALL afficher un message explicite. Un bouton SHALL permettre d’afficher tous les résultats dans le catalogue.

#### Scenario: Sélectionner une suggestion au clavier

- **WHEN** un visiteur saisit « parqet », parcourt les suggestions avec les flèches haut/bas puis appuie sur Entrée
- **THEN** la fiche sélectionnée s’ouvre ; le champ conserve le focus pendant le parcours et annonce la sélection aux technologies d’assistance via le modèle combobox/listbox.

#### Scenario: Fermer ou poursuivre la recherche

- **WHEN** un visiteur appuie sur Échap, sur Tab ou quitte le composant
- **THEN** la liste se ferme sans effacer sa saisie ; Entrée sans sélection ou le bouton de recherche ouvre le catalogue filtré.

#### Scenario: Choisir avec le pointeur

- **WHEN** un visiteur clique ou touche une suggestion
- **THEN** sa fiche s’ouvre directement sans qu’une perte de focus empêche la sélection.


## ADDED Requirements

### Requirement: Calculateurs dans la recherche générale

La recherche SHALL utiliser pour les calculateurs les mêmes règles d’accents, de fautes et d’acronymes que pour les tutoriels. Le catalogue SHALL afficher les calculateurs correspondants dans une section séparée lorsque la recherche ne comporte pas de filtre supplémentaire. Les compteurs et filtres de tutoriels SHALL conserver leur sens.

#### Scenario: Ouvrir un calculateur depuis l’accueil
- **WHEN** le visiteur saisit « escalier » puis sélectionne la suggestion du calculateur au clavier ou au pointeur
- **THEN** `/calculateurs/escalier/` s’ouvre directement.

#### Scenario: Soumettre la recherche
- **WHEN** le visiteur soumet « escalier » sans sélectionner de suggestion
- **THEN** le catalogue conserve la requête et affiche le calculateur correspondant dans une section distincte, même sans tutoriel correspondant.

#### Scenario: Préserver les filtres
- **WHEN** un filtre de catégorie, parcours, difficulté ou favoris est activé
- **THEN** la section complémentaire de calculateurs est masquée et le catalogue continue à filtrer les tutoriels normalement.
