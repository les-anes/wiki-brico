## Context

Voir `proposal.md` pour le besoin. Le rendu commun dans `src/App.tsx` affiche aujourd’hui `scope` et toutes les entrées de `sources`, y compris notices et liens marchands. Le type `Tutorial` ne distingue pas leur usage. La validation exige ces sources et le périmètre pour les fiches documentées ; ce contrat de traçabilité reste pertinent même si ces informations ne sont plus toutes affichées.

## Goals / Non-Goals

**Goals:** séparer données éditoriales, références publiques et achat ; adapter le rendu commun sans migration destructive ; proposer une fiche PEHD courte et exploitable.

**Non-Goals:** réécrire les treize autres tutoriels, refaire la navigation, ajouter un comparateur de prix ou certifier un chantier particulier.

## Decisions

1. **Conserver `sources` pour la recherche et ajouter deux collections optionnelles.** `dtuReferences` contient référence, titre, URL de l’éditeur, portée vérifiée et date de consultation. `shoppingLinks` contient matériel, enseigne et URL. Les notices existantes restent dans les JSON ; seul `dtuReferences` alimente « Références DTU ». Des collections séparées évitent de déduire la nature d’un lien de son titre ou de son domaine. Les détails de vérification restent éditoriaux ; afficher simplement les titres cliquables des DTU.

2. **Retirer le bloc de périmètre dans le composant commun.** Conserver `scope` et sa validation pour ne pas perdre le contexte de rédaction. Éviter un panneau repliable qui réintroduirait la section refusée. Suite à la demande utilisateur, retirer aussi les légendes et crédits du rendu ; conserver les métadonnées existantes dans les JSON.

3. **Limiter les marchands par domaines explicites.** Ensemble initial : `leroymerlin.fr`, `bricodepot.fr`, `bricocash.fr`, `castorama.fr`, avec leurs sous-domaines exacts. Comparer le hostname analysé par `URL`, jamais une sous-chaîne de l’URL. Vérifier manuellement que les pages choisies correspondent à des produits vendus par l’enseigne ; le suffixe `.fr` seul n’identifie ni l’entreprise ni le vendeur. Une extension future de la liste reste possible après vérification.

4. **Réécrire autour d’un seul exemple de raccord.** Partir de la gamme Plasson Série 7 déjà documentée et choisir une référence de petit diamètre dont le montage et la disponibilité française sont vérifiés. La notice sert à rédiger mais n’est pas affichée comme DTU. Si le produit exact n’est pas disponible chez les enseignes retenues, choisir un équivalent documenté et adapter toute la séquence. Ne pas mélanger des instructions de modèles différents.

5. **Structure éditoriale proposée.** Introduction définissant PEHD ; préparer le trajet ; acheter le tube et les raccords ; préparer la tranchée et dérouler ; raccorder ; mettre en eau et contrôler ; reboucher. Regrouper ces actions en cinq ou six étapes. Garder les précautions essentielles dans les étapes concernées et une liste de précautions courte. L’objectif est une lecture de quelques minutes, avec un vocabulaire quotidien.

## Risks / Trade-offs

- Simplification trompeuse → relire les étapes pour conserver les gestes essentiels, sans inventer diamètre ou profondeur universels.
- DTU inaccessible ou périmètre inadapté → vérifier l’édition et son domaine d’application ; ne pas afficher une référence simplement parce qu’elle parle de plomberie. Les NF DTU 60.1 et 60.11 sont des candidats identifiés, pas une validation acquise du branchement extérieur.
- Rubriques DTU vides sur les autres fiches → les masquer tant qu’aucune référence pertinente n’est vérifiée ; conserver leurs sources de recherche.
- Liens marchands périmés → vérifier destination, produit et vendeur lors de l’intégration, sans annoncer de disponibilité durable.

## Migration Plan

Ajouter les champs optionnels, puis adapter rendu et validateurs ensemble. Renseigner d’abord la fiche PEHD et conserver les données historiques des autres fiches. Ajuster les contrôles qui attendent actuellement toutes les sources au rendu. Retour arrière possible par restauration conjointe du composant, des types et du JSON ; aucun identifiant ni chemin de fiche ne change.
