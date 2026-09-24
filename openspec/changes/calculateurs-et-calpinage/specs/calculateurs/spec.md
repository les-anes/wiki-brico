## Purpose

Répondre aux questions chiffrées d’un chantier — pente, quantités de panneaux, d’isolant, d’ossature, de sacs, calepinage — par des outils de calcul utilisables sans compte, qui affichent un exemple complet sans JavaScript et renvoient vers les tutoriels du geste.

## ADDED Requirements

### Requirement: Pages d’outils pré-rendues

Le site SHALL servir un hub `/calculateurs/` listant tous les outils et une page par outil à l’URL `/calculateurs/<slug>/`. Chaque page SHALL être pré-rendue au build avec son propre `<title>`, sa `description`, son `canonical`, son fil d’Ariane et son balisage `BreadcrumbList`, et SHALL figurer dans le `sitemap.xml`.

#### Scenario: Accès direct à un outil

- **WHEN** un visiteur ouvre directement `/calculateurs/pente-evacuation-pvc/`
- **THEN** l’outil s’affiche avec son titre propre, son fil d’Ariane et le formulaire de saisie, sans passer par le hub.

#### Scenario: Outil inconnu

- **WHEN** un visiteur ouvre `/calculateurs/outil-qui-nexiste-pas/`
- **THEN** la page introuvable est affichée et l’URL est exclue de l’indexation.

#### Scenario: Hub et sitemap

- **WHEN** le site est construit
- **THEN** le hub et chaque outil produisent une page HTML, et leurs URLs absolues figurent dans le `sitemap.xml`.

### Requirement: Outils de calcul nommés

Le site SHALL fournir les outils suivants, chacun à l’URL `/calculateurs/<slug>/` : pente d’évacuation PVC (`pente-evacuation-pvc`), quantité de panneaux OSB (`quantite-osb`), isolant et nombre de panneaux (`isolant-panneaux`), montants et rails d’ossature (`ossature-montants`), dosage mortier et béton (`dosage-materiaux`) calepinage (`calpinage`) et escalier (`escalier`).

#### Scenario: Inventaire des outils

- **WHEN** un visiteur ouvre le hub
- **THEN** les sept outils sont listés avec leur titre et une phrase de description, chacun lié à sa page.

#### Scenario: Slug stable

- **WHEN** un outil est livré
- **THEN** son slug ne change pas lors des révisions suivantes, pour ne pas casser les liens partagés ni l’indexation.

### Requirement: Calcul local recalculé à chaque saisie

Chaque outil SHALL calculer ses résultats dans le navigateur, à partir des valeurs saisies, sans requête réseau. Le pré-rendu SHALL contenir les résultats calculés pour les valeurs par défaut, afin que la page reste utile et indexable sans JavaScript.

#### Scenario: Modification d’une valeur

- **WHEN** un visiteur change une longueur, une dimension de panneau ou un dosage
- **THEN** les résultats affichés sont recalculés immédiatement, sans rechargement de page ni déplacement du défilement.

#### Scenario: Page sans JavaScript

- **WHEN** le JavaScript est désactivé
- **THEN** la page affiche les valeurs par défaut et les résultats correspondants, ainsi que la méthode et les tutos liés.

#### Scenario: Saisie invalide

- **WHEN** un visiteur saisit une valeur vide, non numérique ou hors des bornes du champ
- **THEN** l’outil affiche un message relié au champ par `aria-describedby`, expose `aria-invalid` et nomme le champ et la borne, et n’affiche aucun résultat chiffré incohérent.

### Requirement: Résultats lisibles et arrondis au réel

Chaque outil SHALL afficher le résultat principal utile au projet et les valeurs intermédiaires qui le justifient. Les quantités d’éléments entiers SHALL être arrondies à l’entier supérieur ; les dimensions SHALL conserver une précision adaptée. Les unités SHALL être explicites dans chaque résultat.

#### Scenario: Arrondi des quantités

- **WHEN** le calcul donne 7,2 panneaux nécessaires
- **THEN** le résultat affiche la quantité à prévoir arrondie à l’unité supérieure et rappelle la quantité théorique calculée.

#### Scenario: Hypothèses affichées

- **WHEN** un outil applique une valeur de convention (chute de 10 %, entraxe de 60 cm, joint de 3 mm)
- **THEN** cette valeur apparaît dans les hypothèses de la page et reste modifiable quand elle dépend du chantier.

### Requirement: Calpinage dessiné

L’outil de calpinage SHALL dessiner le plan de la surface à couvrir en SVG, à partir des dimensions de la surface, du format de l’élément à poser, de la largeur de joint et du sens de pose. Le dessin SHALL distinguer les éléments entiers des éléments coupés et coter la bande de rive de chaque côté.

#### Scenario: Dessin à la saisie

- **WHEN** un visiteur change une dimension de la pièce, le format des carreaux ou la largeur du joint
- **THEN** le plan est redessiné avec le nouvel agencement, sans rechargement.

#### Scenario: Bande de rive trop faible

- **WHEN** une bande de rive tombe sous un demi-carreau dans un sens
- **THEN** l’outil l’annonce, donne sa largeur, et indique de décaler le départ d’un demi-carreau ou de centrer la pose.

#### Scenario: Décalage de rang

- **WHEN** le visiteur choisit une pose décalée
- **THEN** le plan montre le décalage d’un demi-élément entre deux rangs et la page compte les éléments supplémentaires qu’il demande.

### Requirement: Méthode, limites et références

Chaque outil SHALL afficher la formule appliquée, les hypothèses retenues, les limites du calcul et une référence technique consultable. Il SHALL rappeler qu’un résultat de quantité reste une estimation à confronter aux notices et aux règles applicables, et ne remplace pas un dimensionnement structurel.

#### Scenario: Limite du calcul

- **WHEN** un visiteur consulte l’outil de pente d’évacuation
- **THEN** la page indique la pente minimale retenue et sa source, et précise que le calcul ne traite ni le dimensionnement du réseau ni la ventilation.

#### Scenario: Quantité à confronter au produit

- **WHEN** un visiteur consulte l’outil de dosage
- **THEN** la page indique que le dosage dépend du liant et du produit acheté, et renvoie au sac et à sa notice pour la consommation réelle.

### Requirement: Liens vers les tutoriels

Chaque outil SHALL citer au moins un tutoriel du catalogue pertinent pour le geste ou la préparation du projet, sous forme de lien vers `/tutoriel/<id>/`. La page SHALL aussi proposer un lien vers le catalogue filtré quand le sujet couvre plusieurs fiches.

#### Scenario: Passage de l’outil au geste

- **WHEN** un visiteur consulte l’outil de quantité d’OSB
- **THEN** un lien mène à la fiche de pose d’un plancher OSB sur solives.

#### Scenario: Lien inconnu

- **WHEN** un outil cite un identifiant de tutoriel absent du catalogue
- **THEN** la validation des données échoue au build.

### Requirement: Accès depuis la navigation

Le hub des calculateurs SHALL être atteignable depuis l’accueil par un lien interne, et les outils SHALL apparaître dans les liens internes du site sans créer de lien mort.

#### Scenario: Découverte depuis l’accueil

- **WHEN** un visiteur consulte l’accueil
- **THEN** un lien mène vers `/calculateurs/`.

#### Scenario: Cohérence des liens internes

- **WHEN** le contrôle du site parcourt les pages générées
- **THEN** chaque lien interne vers `/calculateurs/` ou `/calculateurs/<slug>/` correspond à une route existante.

### Requirement: Escalier illustré

Le calculateur `/calculateurs/escalier/` SHALL comparer la géométrie d’un escalier droit et d’un quart tournant avec palier ou marches rayonnantes. Il SHALL prendre en compte la hauteur de sol fini à sol fini, la largeur utile, les reculements disponibles, le sens du tournant et un nombre entier de hauteurs automatique ou imposé. Il SHALL afficher hauteur de marche, giron, nombre de hauteurs et de marches, pente, relation de Blondel et emprise utilisée. Un plan coté et un profil déroulé SHALL être pré-rendus en SVG et mis à jour à la saisie.

#### Scenario: Escalier droit
- **WHEN** la hauteur vaut 280 cm, le reculement 390 cm et le nombre de hauteurs imposé 16
- **THEN** le calcul affiche 16 hauteurs de 17,5 cm, 15 marches de giron 26 cm et une relation de Blondel de 61 cm ; le plan et le profil reflètent ces mêmes dimensions.

#### Scenario: Quart tournant
- **WHEN** un quart tournant est sélectionné
- **THEN** les deux branches respectent leurs reculements, le palier ou le jour intérieur est explicite, le plan représente le sens de montée choisi et les cotes utilisées sont distinctes de l’espace disponible.

#### Scenario: Limites géométriques
- **WHEN** aucune disposition du modèle ne tient dans l’espace saisi
- **THEN** l’outil explique l’incompatibilité sans produire de faux plan ; les autres résultats signalent les écarts aux repères de confort sans revendiquer de conformité réglementaire.

#### Scenario: Préparation et fabrication
- **WHEN** un résultat est affiché
- **THEN** la page précise que la trémie, l’échappée, les garde-corps, les fixations et la résistance ne sont pas dimensionnés ; les marches rayonnantes sont distinguées des marches balancées.

### Requirement: Continuité de navigation

Le passage d’un calculateur à un autre SHALL initialiser les champs avec les valeurs par défaut du nouvel outil. Le hub SHALL présenter le calcul comme une aide à la préparation des travaux, sans imposer un objectif d’achat.

#### Scenario: Changer d’outil
- **WHEN** un visiteur quitte un calculateur modifié pour un autre outil
- **THEN** le nouvel outil affiche son exemple initial et ses propres métadonnées, sans conserver les champs du précédent.
