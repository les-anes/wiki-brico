# Modèle commun d’une page tutoriel

## Purpose

Définir le fond et la forme de tous les tutoriels WikiBrico à partir de la fiche PEHD approuvée : une lecture simple pour un novice, des gestes concrets et une illustration dessinée. Cette référence s’applique à chaque création ou révision de tutoriel ; elle ne signifie pas que les anciennes fiches ont déjà été mises à niveau.

Modèle éditorial : `src/data/tutorials/plomberie/arrivee-d-eau/pehd/plomberie-pehd.json`.
Modèle visuel : `public/images/tutoriels/plomberie-pehd.png`.
Ces fichiers illustrent le style attendu ; leurs particularités de plomberie ne sont pas des règles pour les autres métiers.

## Requirements

### Requirement: Écrire pour un novice
Chaque tutoriel SHALL employer un français courant, le tutoiement et des phrases actives, comme un amateur passionné qui explique son geste. Le titre SHALL exprimer un résultat concret avec un verbe d’action. L’introduction SHALL tenir en une ou deux phrases et expliquer les acronymes et termes indispensables dès leur première utilisation.

#### Scenario: Comprendre dès l’introduction
- **WHEN** un lecteur découvre un matériau ou une technique
- **THEN** il comprend ce qu’il va réaliser et le sens des termes essentiels sans connaissance préalable ; par exemple « PEHD » est développé en « polyéthylène haute densité ».

### Requirement: Privilégier les gestes essentiels
Le contenu SHALL se concentrer sur les actions nécessaires pour réussir le cas courant : préparation, réalisation, contrôle du résultat. Il SHALL écarter les longs exposés théoriques, catalogues de variantes, répétitions et précisions de marque secondaires. Une information qui modifie réellement le choix, le geste ou la sécurité SHALL rester présente, formulée simplement.

#### Scenario: Détail dépendant d’un produit
- **WHEN** le montage dépend du modèle choisi
- **THEN** la fiche explique le principe et renvoie brièvement à l’emballage ou à la notice pour le réglage propre au produit, sans présenter ce réglage comme universel ni multiplier les variantes.

#### Scenario: Précision indispensable
- **WHEN** une dimension ou un réglage dépend du chantier
- **THEN** le texte indique en une phrase ce qui doit être vérifié, sans inventer une valeur valable pour tous les cas.

### Requirement: Conserver une structure familière
Chaque page SHALL suivre le même ordre : titre et introduction, illustration, difficulté/durée/budget, outils et matériaux, étapes numérotées, erreurs à éviter, précautions, liens de matériel, références DTU. Les étapes SHALL avoir un titre d’action et un paragraphe bref de une à trois phrases, avec cinq ou six étapes comme cible. Si le chantier exige davantage d’explications, la rédaction SHALL privilégier plusieurs tutoriels liés plutôt qu’une fiche surchargée ; elle ne doit pas supprimer un geste essentiel pour respecter un nombre d’étapes.

#### Scenario: Parcourir la fiche rapidement
- **WHEN** le lecteur balaie les titres des étapes
- **THEN** il retrouve la progression du travail, de sa préparation jusqu’au contrôle final, avant de lire les détails.

### Requirement: Matériel et estimations utiles
Les listes SHALL nommer les outils et matériaux nécessaires avec des quantités compréhensibles. Elles SHALL éviter les références commerciales dans les désignations génériques et les longues listes d’outils conditionnels. La note de durée et de coût SHALL tenir en deux phrases au maximum et distinguer le matériel seul du chantier complet ; une estimation inconnue SHALL rester à préciser.

#### Scenario: Préparer ses achats
- **WHEN** le lecteur consulte les matériaux et le budget
- **THEN** il sait quoi acheter et ce que le prix annoncé couvre, sans confondre un prix au mètre avec le coût total des travaux.

### Requirement: Erreurs et précautions courtes
La fiche SHALL viser trois erreurs fréquentes et une courte liste de précautions concrètes propres au travail décrit. Elle SHALL éviter les avertissements génériques et les doublons tout en conservant les mesures indispensables et les situations nécessitant une intervention compétente. Un ton accessible SHALL ne pas faire passer une opération complexe pour un geste anodin.

#### Scenario: Vérifier son travail
- **WHEN** une erreur compromet le résultat ou sa sécurité
- **THEN** le lecteur trouve une consigne pratique pour l’éviter ou contrôler le résultat avant de masquer, refermer ou utiliser l’installation.

### Requirement: Illustration originale et stylisée
L’illustration principale SHALL reprendre l’esprit du dessin PEHD validé : objet ou geste reconnaissable, formes simplifiées, traits irréguliers, texture crayon/gouache et fond clair ivoire. Elle SHALL être sans texte, flèches, logo, watermark ni légende externe. Elle SHALL éviter le rendu photo produit et le schéma technique en couverture, conserver un cadrage lisible sur mobile et posséder un texte alternatif descriptif. La couleur du sujet SHALL rester reconnaissable sans imposer les bandes bleues du PEHD aux autres matériaux.

#### Scenario: Créer l’image d’un autre tutoriel
- **WHEN** une illustration est produite pour une nouvelle fiche
- **THEN** son sujet change mais son traitement dessiné reste cohérent avec `plomberie-pehd.png`, avec un fichier local et une origine correctement renseignée.

### Requirement: Références DTU séparées de la recherche
La rubrique visible « Références DTU » SHALL contenir uniquement les titres et liens de DTU pertinents vérifiés auprès de leur éditeur. Les notices fabricant et autres sources de recherche SHALL être conservées dans les métadonnées éditoriales, sans être affichées dans cette rubrique. La fiche SHALL ne pas inventer de DTU, prétendre avoir consulté un texte inaccessible ou laisser entendre qu’une référence valide l’ensemble du chantier.

#### Scenario: Aucun DTU applicable vérifié
- **WHEN** la rédaction ne dispose d’aucun DTU pertinent vérifié
- **THEN** la rubrique est masquée ; elle n’est remplie ni avec un lien marchand ni avec une référence approximative.

### Requirement: Achat auprès des enseignes autorisées
Les liens commerciaux SHALL apparaître uniquement dans « Où trouver le matériel », avec le matériel et l’enseigne. Ils SHALL pointer en HTTPS vers des sites français de bricolage en `.fr` explicitement autorisés : initialement Leroy Merlin, Brico Dépôt, Brico Cash et Castorama. La rédaction SHALL vérifier la vente directe par l’enseigne, exclure marketplaces tierces et liens d’affiliation, et ne pas considérer le suffixe `.fr` seul comme une garantie.

#### Scenario: Une marque figure sur un produit
- **WHEN** une référence commerciale aide à trouver le matériel
- **THEN** la marque peut figurer dans le lien d’achat sans envahir les outils, matériaux et étapes du tutoriel.

### Requirement: Présentation légère et cohérente
Les fiches SHALL réutiliser le modèle de page, la typographie, les espacements et les composants du site. Elles SHALL ne pas afficher « Ce que couvre ce guide », les sources de recherche, ni les légendes, crédits ou liens de licence de l’illustration. Les rubriques facultatives vides SHALL être masquées ; les informations éditoriales conservées dans les JSON ne doivent pas être recopiées dans la page.

#### Scenario: Lire sur téléphone
- **WHEN** un lecteur ouvre une fiche sur un écran étroit
- **THEN** illustration, listes et étapes restent lisibles sans défilement horizontal, avec le même ordre de lecture que sur ordinateur.

### Requirement: Vérification éditoriale et technique
Chaque création ou révision SHALL être relue selon cette référence et contrôlée avec les validations pertinentes du projet. La relecture SHALL vérifier la cohérence entre outils, matériaux et étapes, les références, les liens d’achat et l’image ; une validation automatique réussie ne remplace pas cette relecture.

#### Scenario: Matériau oublié
- **WHEN** une étape utilise un consommable absent de la liste de matériaux
- **THEN** la liste est complétée avant de considérer la fiche conforme au modèle.
