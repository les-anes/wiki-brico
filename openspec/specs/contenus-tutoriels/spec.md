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
Chaque fiche SHALL respecter le contrat `Tutorial` de `src/types.ts`, avec outils, matériaux, étapes, erreurs à éviter et sécurité. Les classifications SHALL référencer la taxonomie du projet. Le fond et la présentation SHALL suivre `openspec/specs/page-tutoriel/spec.md`.

#### Scenario: Contrôle des données
- **WHEN** `npm run validate:data` est exécuté
- **THEN** un chemin incohérent, un identifiant dupliqué ou une classification inconnue provoque un échec.

### Requirement: Contenus documentés traçables
Une fiche au statut `documented` SHALL fournir `scope`, `estimatesNote`, des sources consultées et l’origine de son image (illustration originale ou crédits conservés dans les données). Ce statut ne vaut pas validation professionnelle.

#### Scenario: Source absente
- **WHEN** une fiche documentée ne fournit aucune source
- **THEN** la validation des données échoue.

### Requirement: Tutoriel PEHD accessible aux novices
La fiche PEHD SHALL expliquer « polyéthylène haute densité » dès sa première mention dans l’introduction. Elle SHALL présenter une introduction de deux phrases au maximum, des listes courtes de matériel et d’outils, cinq ou six étapes concrètes de une à trois phrases chacune, et trois erreurs principales à éviter. Le ton SHALL être direct et courant, avec une action identifiable dans chaque étape.

#### Scenario: Première lecture
- **WHEN** un novice ouvre la fiche PEHD
- **THEN** il découvre la signification de PEHD et les actions pour relier la sortie privée du compteur à l’entrée de la maison sans devoir lire un exposé sur les classes de matériaux.

### Requirement: Montage concret et précautions essentielles
La fiche PEHD SHALL décrire un exemple identifié de raccord à compression, avec des outils réellement adaptés à ce montage, sans liste de variantes ni mention conditionnelle de clé dynamométrique. Elle SHALL expliquer simplement le rôle du joint, de la bague et de l’écrou. Elle SHALL conserver les points essentiels : choix du diamètre selon le trajet et le débit, repérage des réseaux avant terrassement, protection contre le gel, coupure de l’eau et contrôle des fuites avant remblaiement.

#### Scenario: Compréhension du raccord
- **WHEN** le lecteur consulte les étapes d’assemblage
- **THEN** il comprend comment préparer, insérer et serrer le tube pour le modèle présenté sans confondre les clés de serrage avec des clés Allen.

#### Scenario: Dimensionnement honnête
- **WHEN** le lecteur rencontre le diamètre de l’exemple
- **THEN** ce diamètre n’est pas présenté comme convenant à toutes les maisons et le texte ne prétend pas qu’élargir le tube fait perdre de la pression.

### Requirement: Présentation allégée des fiches
Les fiches SHALL supprimer la section visible « Ce que couvre ce guide ». Les métadonnées éditoriales de périmètre SHALL rester conservées dans les données. La fiche PEHD SHALL limiter sa note de budget et de durée à deux phrases sans présenter le prix du tube comme celui du chantier complet.

#### Scenario: Métadonnées conservées
- **WHEN** une fiche possède un périmètre éditorial
- **THEN** ce périmètre reste disponible dans les données mais ne génère pas de section « Ce que couvre ce guide » dans la page.

### Requirement: Références DTU uniquement
La rubrique visible des références techniques SHALL contenir uniquement des liens vers des DTU identifiés, pertinents pour les points traités et vérifiés auprès de leur éditeur. Les références de recherche non DTU SHALL rester distinctes et ne pas apparaître dans cette rubrique. Les légendes et crédits photographiques SHALL ne pas être affichés dans les fiches ; les données éditoriales existantes restent conservées.

#### Scenario: Aucun DTU vérifié
- **WHEN** une fiche ne dispose d’aucune référence DTU vérifiée
- **THEN** la rubrique est absente, sans lien marchand de substitution ni référence inventée.

#### Scenario: Sources mixtes
- **WHEN** une fiche dispose d’un DTU et d’une notice fabricant utilisée pour la recherche
- **THEN** seul le DTU apparaît dans les références techniques visibles.

### Requirement: Achat de matériel auprès d’enseignes françaises
Une rubrique distincte « Où trouver le matériel » SHALL afficher les liens d’achat renseignés, avec le matériel concerné et l’enseigne. Les liens SHALL utiliser HTTPS et un domaine `.fr` appartenant à une enseigne française de bricolage explicitement autorisée. Les liens vers des plateformes étrangères, redirections affiliées ou vendeurs tiers de marketplace SHALL être exclus.

#### Scenario: Lien autorisé
- **WHEN** une fiche propose un lien de matériel vendu directement par une enseigne autorisée
- **THEN** ce lien apparaît uniquement dans « Où trouver le matériel » et pas dans les références DTU.

#### Scenario: Domaine trompeur
- **WHEN** un lien utilise un domaine non autorisé, même terminé par `.fr`, ou imite le nom d’une enseigne dans son chemin
- **THEN** la validation des données le rejette.

#### Scenario: Aucun lien d’achat
- **WHEN** une fiche ne possède aucun lien d’achat
- **THEN** elle n’affiche pas de rubrique d’achat vide.

#### Scenario: Image sans légende
- **WHEN** un lecteur ouvre une fiche dont les données contiennent des crédits photo
- **THEN** l’image apparaît sans légende, attribution ou lien de licence visible.
