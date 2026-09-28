## ADDED Requirements

### Requirement: Lot des cent tutoriels — neuf fiches documentées
Le catalogue SHALL compter au moins 100 tutoriels après ce changement. Chacune des neuf fiches du lot (`isoler-ses-combles-perdus`, `isoler-un-mur-par-l-interieur`, `poser-une-terrasse-en-bois`, `installer-un-recuperateur-d-eau-de-pluie`, `nettoyer-ses-gouttieres`, `poser-un-plan-de-travail`, `regler-une-fenetre-qui-ferme-mal`, `poser-un-faux-plafond`, `remplacer-un-chauffe-eau`) SHALL être au statut `documented` et respecter `openspec/specs/page-tutoriel/spec.md` : cinq ou six étapes, exactement trois erreurs, sources consultées datées, périmètre et note d’estimation dans les métadonnées, illustration locale originale.

#### Scenario: Validation du lot
- **WHEN** `pnpm validate:data` puis `pnpm build && pnpm check:site` sont exécutés
- **THEN** les 100 fiches sont comptées, les neuf nouvelles illustrations et leurs variantes WebP sont présentes, et aucune assertion de compte ne reste obsolète.

#### Scenario: Aucune délégation dans les neuf fiches
- **WHEN** un lecteur suit les étapes d’une fiche du lot
- **THEN** aucun contenu ne renvoie à un professionnel, un « spécialiste » ou une validation par un tiers : les contrôles, prérequis et conditions d’arrêt sont décrits pour être faits soi-même.

### Requirement: Ouverture des catégories et thèmes vides
Les neuf fiches SHALL remplir des emplacements de taxonomie jusqu’ici sans aucune fiche : les catégories `isolation`, `assainissement` et `exterieurs` pour leurs premières fiches, et les thèmes `Gouttières`, `Plans de travail`, `Fenêtres`, `Faux plafonds` et `Chauffe-eau` pour leurs premières fiches. Chaque classement SHALL exister dans `src/data/categories.json` sans modification de la taxonomie, et chaque fichier SHALL être placé dans le chemin attendu par son identifiant.

#### Scenario: Filtres non vides
- **WHEN** un visiteur ouvre le catalogue filtré sur l’une de ces catégories ou l’un de ces thèmes
- **THEN** il trouve au moins une fiche au lieu d’un catalogue vide, sans qu’aucune route ni URL existante n’ait changé.

#### Scenario: Taxonomie préservée
- **WHEN** `pnpm validate:data` contrôle le placement des neuf fiches
- **THEN** chaque `category` et `topicPath` est reconnu tel quel, sans nouvelle catégorie ni renommage d’identifiant.

### Requirement: Cadrage de chaque fiche du lot
Chaque fiche du lot SHALL délimiter son cas courant dans `scope` (support, matériau ou situation traités, et cas exclus) et donner ses conditions d’arrêt dans les étapes ou les précautions : chantier humide ou instable, accès en hauteur non sécurisé, présence d’eau ou d’électricité à mettre hors tension, mesure non réalisable avec l’outillage du quotidien. Le matériel et les matériaux listés SHALL correspondre aux outils et consommables réellement utilisés dans les étapes.

#### Scenario: Cas non couvert identifiable
- **WHEN** le lecteur rencontre une situation hors du cas décrit (autre matériau, désordre structurel, chantier nécessitant un autre niveau d’accès)
- **THEN** la fiche précise la limite et ce qui manque pour poursuivre, sans proposer un geste hors périmètre ni renvoyer à un professionnel.

#### Scenario: Matériel non utilisé
- **WHEN** un outil figure dans une liste de la fiche
- **THEN** une étape l’utilise réellement ; inversement, tout consommable utilisé en étape figure dans les matériaux.

### Requirement: Illustrations provisoires traçables du lot
Les neuf fiches SHALL disposer d’une illustration PNG locale de 1536×1024 avec ses variantes WebP `-480`, `-720` et `-960`, classée `imageOrigin: "original"` sans crédit. Comme la génération d’images définitives est hors périmètre, le prompt de remplacement de chaque couverture SHALL être consigné dans `docs/illustrations-tutoriels.md`, à la manière des illustrations provisoires déjà produites.

#### Scenario: Illustration manquante
- **WHEN** `pnpm validate:data` vérifie les neuf fiches
- **THEN** chaque `image` pointe vers un fichier existant et les trois variantes WebP existent également.

#### Scenario: Prompt de remplacement disponible
- **WHEN** l’équipe souhaite régénérer les couvertures du lot
- **THEN** chaque prompt est retrouvable dans `docs/illustrations-tutoriels.md` sans reconstruire la fiche.
