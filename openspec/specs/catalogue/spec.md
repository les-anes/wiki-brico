# Catalogue et navigation

## Purpose

Permettre de découvrir les tutoriels depuis un accueil, un catalogue filtrable et des fiches détaillées, en conservant des liens partageables.

## Requirements

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

### Requirement: Classements multiples

Le catalogue SHALL reconnaître les classements principaux et secondaires, ainsi que les parcours, sans dupliquer les tutoriels dans les résultats.

#### Scenario: Classement secondaire

- **WHEN** un tutoriel correspond au filtre par son champ `relatedCategories`
- **THEN** il apparaît une seule fois dans les résultats.

### Requirement: Recherche tolérante aux fautes

La recherche soumise depuis l’accueil et celle du catalogue SHALL utiliser le même moteur local, sans requête réseau. Elle SHALL ignorer la casse, les accents et l’ordre des mots, conserver les correspondances partielles et exiger une correspondance pour chaque mot saisi dans le titre, la description, les outils ou les classements. Elle SHALL tolérer une insertion, une suppression, une substitution ou une inversion de deux lettres adjacentes par mot saisi d’au moins quatre caractères ; les mots plus courts SHALL rester exacts ou partiels, sauf les acronymes techniques du référentiel de tags qui SHALL correspondre à un mot entier, sans approximation. Les tags SHALL être indexés par ce même moteur.

Les résultats SHALL placer les correspondances sans faute avant les correspondances approximatives et, dans chaque groupe, privilégier celles dont tous les mots figurent dans le titre. Une recherche vide SHALL conserver l’ordre du catalogue. Les autres filtres SHALL rester applicables et la saisie originale SHALL être conservée dans l’URL et le champ de recherche.

#### Scenario: Rechercher depuis l’accueil avec une faute

- **WHEN** un visiteur soumet « ragrage » dans « Rechercher un tutoriel »
- **THEN** le catalogue affiche le tutoriel sur le ragréage et conserve « ragrage » dans le champ et le paramètre `q`.

#### Scenario: Inverser les mots ou deux lettres

- **WHEN** un visiteur recherche « parqet poser » ou « parqeut »
- **THEN** la fiche « Poser un parquet contrecollé » figure dans les résultats.

#### Scenario: Préserver les filtres et éviter les faux résultats

- **WHEN** un visiteur cherche un mot introuvable ou active une catégorie incompatible avec les résultats
- **THEN** le catalogue n’affiche aucun tutoriel hors des correspondances et filtres demandés.

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

### Requirement: Pages piliers thématiques
Le site SHALL proposer six pages éditoriales à `/themes/<categorie>/` : plomberie, électricité, cloisons, menuiseries, finitions et cuisine/salle de bains. Chaque page SHALL présenter un titre, une introduction, des sections ordonnées avec des liens directs vers des fiches existantes, et un accès au catalogue filtré. Ces pages SHALL être pré-rendues, figurer dans le sitemap et posséder des métadonnées, une URL canonique et un fil d’Ariane propres. L’accueil et le fil d’Ariane des fiches de ces catégories SHALL permettre de les découvrir ; les filtres existants SHALL rester accessibles.

#### Scenario: Découvrir la plomberie
- **WHEN** un visiteur ouvre `/themes/plomberie/` sans JavaScript
- **THEN** il peut lire le guide thématique et suivre les liens vers les fiches, et l’URL canonique est celle du thème sans paramètres.

#### Scenario: Thème inconnu
- **WHEN** un visiteur ouvre `/themes/inexistant/`
- **THEN** la page introuvable est affichée sans ajouter cette URL au sitemap.

### Requirement: Tags techniques consultables
Chaque fiche SHALL afficher ses tags sous forme de liens vers la recherche du catalogue. Le référentiel SHALL conserver une orthographe unique par tag, notamment PER, PEHD, OSB, BA13 et PVC. Les tags décrivent le sujet réellement abordé, sans être déduits automatiquement de mots accessoires.

#### Scenario: Chercher un acronyme
- **WHEN** un visiteur recherche « PER » ou « per »
- **THEN** il trouve les fiches correspondantes sans faire correspondre les mots « couper » ou « percer » ; la recherche « BA13 » trouve les fiches explicitement taguées et « parqet » conserve la tolérance aux fautes.

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
