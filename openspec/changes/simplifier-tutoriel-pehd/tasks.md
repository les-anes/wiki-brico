## 1. Références et données

- [x] 1.1 Vérifier auprès des éditeurs la portée et l’édition des DTU candidats pour la fiche PEHD ; consigner pour chaque référence retenue le point couvert, le lien officiel et la date de consultation, sans prétendre avoir lu un texte inaccessible.
- [x] 1.2 Choisir un raccord à compression documenté et des liens de matériel chez les enseignes autorisées ; vérifier manuellement le produit, son vendeur direct et la cohérence entre le montage retenu et sa notice.
- [x] 1.3 Ajouter les collections optionnelles `dtuReferences` et `shoppingLinks` au contrat et à la validation des données ; vérifier l’acceptation des fiches historiques et le rejet des URL non HTTPS, domaines trompeurs ou marchands non autorisés.

## 2. Contenu et présentation

- [x] 2.1 Réécrire `plomberie-pehd.json` avec la définition « polyéthylène haute densité », cinq ou six étapes courtes et trois erreurs principales ; relire contre les critères de la spec, y compris les précautions essentielles et l’absence de liste d’outils conditionnelle.
- [x] 2.2 Renseigner les liens d’achat et les DTU effectivement vérifiés, conserver les sources de recherche et limiter la note d’estimation ; vérifier que l’identifiant, le classement et les crédits restent valides avec `npm run validate:data`.
- [x] 2.3 Retirer le bloc visible de périmètre et afficher séparément « Références DTU » et « Où trouver le matériel » dans le modèle commun ; vérifier sur une fiche renseignée et une fiche sans ces collections l’absence de section vide, de notice fabricant visible et de lien marchand dans les DTU.
- [x] 2.4 Adapter les contrôles de rendu existants à la nouvelle séparation des sources et documenter les champs dans le README ; vérifier que les contrôles couvrent encore les quatorze fiches et leurs crédits.

## 3. Validation intégrée

- [x] 3.1 Exécuter `npm run validate:specs`, `npm run validate:data`, `npm run check:site` et `npm run build` ; corriger les échecs liés au changement et consigner les résultats.
- [x] 3.2 Contrôler la lecture de la fiche PEHD sur mobile et ordinateur, ainsi qu’une autre fiche ; vérifier listes, étapes et liens, ou signaler explicitement l’indisponibilité du navigateur si elle empêche ce contrôle.

## Notes de vérification

- 2026-09-07 : NF DTU 60.1, édition décembre 2019, identifié sur la fiche officielle CSTB ; sommaire P1-1-1 consulté sur https://norminfo.afnor.org/consultation/40496 (PE, traversée des parois, pose enterrée, essais). Retenu comme référence pour la plomberie du bâtiment ; texte intégral non consulté.
- NF DTU 60.11 P1-1, août 2013 : résumé AFNOR consulté, explicitement limité aux installations intérieures ; non affiché comme référence de dimensionnement de la conduite extérieure.
- Achat : pages Leroy Merlin 70404600 (tube eau potable), 63780500 (raccord Ø25) et 63775544 (coude Ø25) consultées ; vente directe par Leroy Merlin constatée. Montage fondé sur la notice Plasson Série 7 déjà conservée dans les sources de recherche. Les dimensions de transition restent à choisir selon les équipements présents.

- Validation : OpenSpec strict, 14 JSON, contrôles de rendu des 14 fiches et compilation réussis. Les contrôles incluent séparation DTU/achats, crédits et rejet des domaines trompeurs.
- Contrôle visuel mobile/ordinateur non effectué : connexion au navigateur indisponible (`sandboxPolicy` manquant). La tâche 3.2 autorise explicitement ce signalement ; les contrôles de rendu automatisés ont été exécutés.
