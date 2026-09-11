## Purpose

Rendre chaque page du site indexable et partageable par une URL réelle et des métadonnées propres, au lieu d’un contenu unique caché derrière des fragments d’URL.

## ADDED Requirements

### Requirement: Pages accessibles par une URL réelle

Chaque page du site (accueil, catalogue, fiche de tutoriel) SHALL être servie à une URL de chemin distincte : `/`, `/tutoriels/` et `/tutoriel/<id>/`. Le serveur statique SHALL renvoyer le HTML de la page demandée pour un accès direct, sans exiger l’exécution de JavaScript ni une navigation préalable.

#### Scenario: Accès direct à une fiche

- **WHEN** un client demande `https://wikibrico.fr/tutoriel/poser-du-parquet/`
- **THEN** la réponse contient le HTML complet de cette fiche (titre, étapes, matériaux), sans fragment et sans nécessiter JavaScript.

#### Scenario: Forme canonique unique

- **WHEN** une même page est demandée avec ou sans slash final
- **THEN** une seule forme est déclarée canonique et l’autre est dé-dupliquée par le lien `canonical`.

### Requirement: Métadonnées propres à chaque page

Chaque page SHALL fournir dans son HTML servi un `<title>` unique, une méta-description, un lien `canonical` absolu et des métadonnées de partage (`og:title`, `og:description`, `og:url`, `og:image`). Pour une fiche, ces valeurs SHALL dériver des données du tutoriel et l’`og:image` SHALL pointer vers l’illustration locale de la fiche.

#### Scenario: Métadonnées d’une fiche

- **WHEN** le HTML d’une fiche est inspecté sans exécuter JavaScript
- **THEN** son `<title>`, sa méta-description et son `canonical` correspondent au tutoriel demandé, et non au titre générique du site.

### Requirement: Balisage du fil d’Ariane

Chaque fiche SHALL inclure un balisage de données structurées `BreadcrumbList` en JSON-LD, reflétant le fil d’Ariane affiché, avec des URLs absolues et des positions ordonnées. Le site SHALL ne pas émettre de balisage `HowTo`, retiré des résultats de recherche Google.

#### Scenario: Données structurées d’une fiche

- **WHEN** le HTML d’une fiche est analysé
- **THEN** il contient un `BreadcrumbList` valide (accueil, tutoriels, catégorie, fiche) et aucun `HowTo`.

### Requirement: Sitemap et robots générés

Le build SHALL produire un `sitemap.xml` listant l’ensemble des URLs canoniques publiques et un `robots.txt` autorisant l’exploration et référençant le sitemap. Le sitemap SHALL contenir exactement les pages générées, sans URL de filtre et sans doublon. Pour une fiche, la date de dernière modification SHALL refléter `updatedAt`.

#### Scenario: Sitemap cohérent avec les pages

- **WHEN** le sitemap est comparé aux pages générées au build
- **THEN** chaque URL canonique y figure une seule fois et aucune page générée ne manque.

### Requirement: Page 404 dédiée

Une requête vers un chemin inconnu SHALL renvoyer une page d’erreur dédiée accompagnée d’un statut HTTP 404.

#### Scenario: Fiche inexistante

- **WHEN** un visiteur ouvre `/tutoriel/inexistant/`
- **THEN** une page « introuvable » est affichée avec le statut 404, sans redirection vers l’accueil.

### Requirement: Compatibilité des anciens liens

Le site SHALL rediriger un ancien lien à fragment (`/#tutoriels`, `/#tutoriel/<id>`) vers l’URL canonique correspondante.

#### Scenario: Ancien lien à fragment

- **WHEN** un visiteur ouvre `https://wikibrico.fr/#tutoriel/poser-du-parquet`
- **THEN** le navigateur est redirigé vers `/tutoriel/poser-du-parquet/`.

### Requirement: Contenu lisible sans JavaScript

Le contenu principal de chaque page SHALL être présent dans le HTML servi sans exécution de JavaScript, et l’hydratation côté client SHALL ajouter l’interactivité sans erreur et sans modifier ce contenu.

#### Scenario: Hydratation sans erreur

- **WHEN** une page pré-rendue est hydratée dans un navigateur
- **THEN** aucune erreur d’hydratation n’est produite et la recherche, les filtres et les favoris restent fonctionnels.
