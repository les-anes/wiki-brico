## ADDED Requirements

### Requirement: Index llms.txt
Le site SHALL publier `/llms.txt` au format llmstxt.org, généré au build à partir des données. Il SHALL lister chaque fiche une fois, regroupée par catégorie, avec un lien absolu vers sa version Markdown et sa description, puis les guides thématiques et les calculateurs.

#### Scenario: Fiche ajoutée
- **WHEN** une fiche est ajoutée dans `src/data/tutorials/` puis le site est construit
- **THEN** `llms.txt` la liste sous sa catégorie sans autre modification.

### Requirement: Version Markdown des fiches
Chaque fiche SHALL exister en Markdown à `/tutoriel/<id>/index.md` : titre, description, catégorie, estimations, date de mise à jour, périmètre, outils, matériaux, étapes ordonnées, erreurs, précautions, références DTU, sources consultées datées et fiches liées. La page HTML SHALL l’annoncer par un lien `alternate` de type `text/markdown`.

#### Scenario: Citer une fiche dans son cadre
- **WHEN** un moteur génératif lit la version Markdown d’une fiche
- **THEN** il dispose du périmètre et des sources, sans que la page HTML les affiche.

### Requirement: Données structurées d’article
Chaque fiche SHALL inclure, après son `BreadcrumbList`, un JSON-LD `TechArticle` avec titre, description, image, URL canonique, langue, date de mise à jour, catégorie, mots-clés, éditeur, et le cas échéant niveau, durée et DTU cités. L’accueil SHALL inclure un JSON-LD `WebSite`. Ce balisage SHALL ne contenir ni `HowTo` ni sources de recherche.

#### Scenario: Fiche sans DTU
- **WHEN** une fiche n’a aucune référence DTU
- **THEN** son `TechArticle` n’a pas de propriété `citation`.
