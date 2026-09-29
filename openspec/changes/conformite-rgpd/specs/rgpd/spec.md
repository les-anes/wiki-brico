## Purpose

Encadrer la mesure d'audience par un consentement explicite et donner au lecteur les informations et les moyens d'exercer ses droits prévus par le RGPD, sur un site statique sans backend.

## ADDED Requirements

### Requirement: Mesure d'audience soumise au consentement

Aucune requête de mesure d'audience (script ou événement GA4) SHALL être émise avant qu'un utilisateur n'ait donné un consentement explicite. Sans consentement enregistré, le consentement par défaut envoyé à l'outil de mesure SHALL être `denied` pour `analytics_storage`, `ad_storage`, `ad_user_data` et `ad_personalization`.

#### Scenario: Première visite sans interaction

- **WHEN** un visiteur ouvre une page sans avoir jamais tranché le consentement
- **THEN** aucun script de mesure n'est chargé et aucune requête de mesure n'est émise, y compris après le chargement complet de la page.

#### Scenario: Acceptation explicite

- **WHEN** le visiteur clique sur « Accepter »
- **THEN** le consentement est enregistré horodaté, `analytics_storage` passe à `granted` et le script de mesure est chargé pour les visites suivantes.

#### Scenario: Refus explicite

- **WHEN** le visiteur clique sur « Refuser »
- **THEN** le refus est enregistré horodaté et aucun script de mesure n'est chargé, y compris lors des navigations ultérieures dans le site.

### Requirement: Bandeau de consentement

Le site SHALL afficher un bandeau de consentement dès la première visite, proposant des actions « Accepter » et « Refuser » d'une égale accessibilité (même niveau hiérarchique visuel, aucune action pré-sélectionnée). Le bandeau SHALL être pré-rendu dans le HTML servi et ne SHALL bloquer ni la navigation ni l'accès au contenu.

#### Scenario: HTML servi à un nouveau visiteur

- **WHEN** le HTML de n'importe quelle page est inspecté sans exécuter JavaScript
- **THEN** le bandeau de consentement y figure, avec ses deux actions et un lien vers la politique de confidentialité.

#### Scenario: Navigation sans consentement

- **WHEN** le visiteur refuse puis navigue vers une autre page
- **THEN** le contenu est accessible sans obstacle et le refus n'est pas redemandé.

### Requirement: Révocation du consentement

Le site SHALL proposer sur toutes les pages un moyen de retirer ou modifier le consentement donné, au moins aussi simple que son octroi (Art. 7(3)).

#### Scenario: Retrait via le pied de page

- **WHEN** le visiteur active le lien « Gérer les cookies » en pied de page
- **THEN** le bandeau réaffiche l'état courant et permet d'inverser le choix ; après un retrait, la mesure cesse.

### Requirement: Pages légales pré-rendues

Le site SHALL publier `/mentions-legales/` et `/confidentialite/` comme routes pré-rendues, chacune avec un `pageMeta` complet (titre, description, canonical, `og:*`), référencées dans le `sitemap.xml` et atteignables sans JavaScript.

#### Scenario: Accès direct

- **WHEN** un client demande `https://wikibrico.fr/confidentialite/`
- **THEN** la page complète est servie en HTML, avec son propre titre et sa canonical, sans exiger JavaScript.

#### Scenario: Présence au sitemap

- **WHEN** le `sitemap.xml` du build est analysé
- **THEN** les deux URLs légales y figurent exactement une fois.

### Requirement: Transparence sur les données traitées

La politique de confidentialité SHALL identifier le responsable de traitement et son contact, lister les finalités et leurs bases légales (Art. 6), les catégories de données, les destinataires et sous-traitants (Art. 28), les durées de conservation (Art. 5(1)(e)), les transferts hors EEE et leur mécanisme (Art. 44–49), les droits des personnes (Art. 15–22) et la faculté de réclamation auprès de la CNIL (Art. 77). Les mentions légales SHALL identifier l'éditeur et l'hébergeur.

#### Scenario: Exercice des droits

- **WHEN** un lecteur lit la section des droits
- **THEN** il y trouve un moyen de contact unique et effectif pour exercer ses droits d'accès, de rectification, d'effacement et d'opposition.

#### Scenario: Mesure d'audience décrite

- **WHEN** le lecteur consulte la section relative aux cookies et à la mesure d'audience
- **THEN** il y trouve l'outil utilisé, la base légale (consentement), la durée de conservation et le moyen de retirer son choix.
