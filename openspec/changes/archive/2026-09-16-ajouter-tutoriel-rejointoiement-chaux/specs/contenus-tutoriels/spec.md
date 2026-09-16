## ADDED Requirements

### Requirement: Fiche de rejointoiement à la chaux lisible par un débutant
La fiche `rejointoyer-un-mur-en-pierre` SHALL expliquer « rejointoyer » et le rôle du mortier de chaux dès l’introduction, en deux phrases au maximum. Elle SHALL présenter cinq ou six étapes concrètes de une à trois phrases, trois erreurs fréquentes et des précautions propres au travail en hauteur, à la poussière de mortier et à la manipulation de la chaux.

#### Scenario: Première lecture
- **WHEN** un novice ouvre la fiche
- **THEN** il comprend qu’il va retirer la partie friable des joints puis les regarnir d’un mortier souple, sans devoir lire un exposé sur les familles de chaux.

#### Scenario: Matériel cohérent avec les étapes
- **WHEN** une étape utilise un outil ou un consommable
- **THEN** cet élément figure dans les listes d’outils ou de matériaux de la fiche.

### Requirement: Périmètre et conditions d’arrêt du rejointoiement à la chaux
La fiche SHALL limiter son périmètre à un mur en pierre stable et sec dont les joints sont creusés ou friables. Elle SHALL exclure le mur en pierre sèche, la reprise d’un enduit de finition, ainsi que le mur dont les pierres bougent, dont une fissure évolue ou dont l’humidité provient d’une eau active.

#### Scenario: Désordre structurel
- **WHEN** les pierres bougent, qu’une fissure évolue ou qu’une eau active traverse le mur
- **THEN** la fiche indique de ne pas rejointoyer avant d’avoir traité la cause, et précise les vérifications à faire soi-même sans renvoyer à un professionnel.

#### Scenario: Joint plus dur que la pierre
- **WHEN** le lecteur choisit son liant et son dosage
- **THEN** la fiche explique qu’un mortier de ciment ou trop dosé en liant devient plus dur que la pierre, et renvoie aux indications du produit choisi plutôt qu’à un dosage universel.

#### Scenario: Joints encore sains
- **WHEN** le lecteur prépare son chantier
- **THEN** la fiche indique de ne dégarnir que les joints dégradés et de conserver les joints encore sains.
