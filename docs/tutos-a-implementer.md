# Todo des prochains tutoriels

Dernière mise à jour : **16 septembre 2026**.

Ce document centralise les idées de nouveaux tutos WikiBrico. Il sert à choisir le prochain sujet et à suivre sa réalisation ; il ne remplace pas les specs du tutoriel.

## Comment tenir cette liste à jour

- À chaque création de tuto, vérifier cette liste et le catalogue pour éviter les doublons.
- Avant de commencer, ajouter `— En cours` à la ligne et, s’il existe, le nom du changement OpenSpec associé.
- Cocher une ligne seulement quand la fiche, son illustration et ses vérifications sont terminées. Déplacer ensuite la ligne dans « Réalisés depuis cette liste », avec la date et le lien de la page.
- À chaque ajout, retrait ou changement de priorité, mettre à jour la date en tête du document et le journal en bas.
- Revoir les priorités une fois par mois ou lors du choix d’un nouveau lot : demandes des lecteurs, recherches internes sans résultat et données de recherche disponibles passent avant les intuitions initiales.
- Conserver les identifiants `T01`, `T02`, etc. lorsqu’une idée change de priorité. Ajouter les nouvelles idées à la suite de la numérotation.

Toutes les idées ci-dessous sont **à faire**. Leur ordre à l’intérieur de chaque priorité est une proposition de réalisation.

## Pourquoi ces priorités

Le choix initial combine les problèmes courants à la maison, l’utilité immédiate, l’accès avec des outils simples et les manques du catalogue actuel. Les thèmes peinture, plomberie, sols et carrelage sont notamment présents dans le [catalogue de tutoriels Leroy Merlin](https://www.leroymerlin.fr/tutos/). Les ateliers [Castostages](https://www.castorama.fr/services/castostages) couvrent aussi la préparation des murs, le papier peint et l’aménagement de salle de bains. Sources consultées le 11 septembre 2026.

**Ce n’est pas un classement des requêtes les plus recherchées** : aucun volume de recherche n’a été mesuré. Les priorités sont des hypothèses éditoriales à ajuster avec les retours et les données du site. La priorité ne préjuge pas de la difficulté du geste.

## Priorité 2 — Finitions et rénovation d’une pièce

- [ ] **T16 — Poser une crédence carrelée au-dessus d’un plan de travail.** Cuisine & salle de bains / Crédences. Petit mur sain hors douche ; calepinage, collage et découpes, avec joints traités dans T17.
- [ ] **T17 — Faire les joints d’un carrelage neuf.** Finitions / Carrelage. Préparer le mortier à joints, garnir et nettoyer ; distinguer les joints courants des joints souples périphériques.
- [ ] **T18 — Remplacer un carreau de carrelage cassé.** Finitions / Carrelage. Cas : carreau isolé sur support sain, sans système d’étanchéité à reprendre.
- [ ] **T19 — Poser un sol vinyle clipsable.** Finitions / à classer. Cas : pièce sèche et support préparé ; ajouter une sous-catégorie « Sol vinyle » à la taxonomie lors de l’implémentation.
- [ ] **T33 — Peindre un motif au pochoir.** Finitions / Peinture. Cas : mur lisse déjà peint et sec ; fixer le pochoir, tamponner avec très peu de peinture et le retirer proprement, puis répéter le motif.

## Priorité 3 — Confort, entretien et chantiers plus longs

- [ ] **T22 — Nettoyer les bouches et entrées d’air de ventilation.** Chauffage / VMC. Entretien des éléments accessibles, sans démontage du moteur ; préserver les réglages et composants sensibles à l’eau.
- [ ] **T25 — Poser une bande à joint entre deux plaques de plâtre.** Cloisons / Placo. Bande, enduit, passes et ponçage sur plaques déjà posées ; un geste précis plutôt qu’un chantier complet.
- [ ] **T26 — Monter une petite cloison en plaques de plâtre.** Cloisons / Placo. Cas : cloison non porteuse en pièce sèche, sans porte ni réseaux intégrés ; renvoyer à T25 pour les joints.
- [ ] **T27 — Poser du carrelage au sol dans une petite pièce.** Finitions / Carrelage. Cas : support sain et préparé, hors douche et chauffage au sol ; traiter les joints dans T17.
- [ ] **T28 — Remplacer un flexible et une douchette.** Cuisine & salle de bains / Douche. Vérifier la compatibilité des raccords, poser les joints et tester les fuites.
- [ ] **T29 — Poser une étagère dans un placard sur tasseaux.** Menuiseries / Quincaillerie. Mesurer un espace entre deux parois, choisir les ancrages et découper la tablette ; différent de l’étagère sur équerres existante.
- [ ] **T30 — Organiser les travaux pour rénover une chambre.** Préparer son chantier / Ordre des travaux. Une liste de travaux dans l’ordre, de la protection aux finitions, avec des liens vers les gestes déjà documentés.

- [ ] **T39 — Fabriquer des volets battants en bois.** Menuiseries / à classer. Cas : volets simples à lames ; prendre les mesures, assembler les panneaux, poser la quincaillerie et appliquer une finition extérieure.
- [ ] **T41 — Remplacer un linteau.** Gros œuvre / à classer. Sujet structurel à cadrer avant rédaction : type de mur, ouverture, charges, maintien provisoire et appuis. Prévoir un cas précis et un niveau avancé ; ne pas proposer de dimensionnement universel.
- [ ] **T42 — Ceinturer un mur en pierre avec un chaînage en béton armé.** Gros œuvre / à classer. Sujet demandé comme « ceinturer un mur en pierre avec du ciment » ; préciser à la rédaction le type de ceinture et son objectif. Prévoir un cas structurel précis, la compatibilité avec la maçonnerie existante et un niveau avancé, sans dimensions ni ferraillage universels.

## Règles pour transformer une idée en fiche

Suivre le [modèle commun des tutoriels](../openspec/specs/page-tutoriel/spec.md) : résultat concret, cas courant, français simple, tutoiement, matériel utile, étapes courtes, erreurs fréquentes et illustration originale. Donner les gestes permettant de faire soi-même, sans déléguer le chantier à un professionnel. Garder les précautions indispensables et les limites du cas décrit, sans ajouter de formalités inutiles.

Vérifier la [taxonomie](../src/data/categories.json) avant de créer le fichier. Les classements ci-dessus sont proposés ; T19 nécessite explicitement une nouvelle sous-catégorie. Une fiche ne passe en « réalisée » qu’après relecture et validations des données, du build et du rendu du site.

## Déjà dans le catalogue — Ne pas recréer

Ces 18 fiches existaient à la création de cette liste. Elles ne sont pas des tâches à refaire : les futurs sujets doivent les compléter ou les améliorer.

- [Reboucher un petit trou](../src/data/tutorials/cloisons/enduits/reboucher-un-trou.json)
- [Fixer une étagère sur équerres](../src/data/tutorials/techniques/percer-et-fixer/poser-une-etagere.json)
- [Refaire un joint silicone](../src/data/tutorials/cuisine-salle-de-bains/joints-sanitaires/refaire-joints-silicone.json)
- [Repeindre un mur](../src/data/tutorials/finitions/peinture/peindre-un-mur.json)
- [Repeindre un meuble](../src/data/tutorials/finitions/peinture/renover-un-meuble.json)
- [Poser un parquet contrecollé](../src/data/tutorials/finitions/parquet/poser-du-parquet.json)
- [Remplacer une ampoule](../src/data/tutorials/electricite/eclairage/remplacer-une-ampoule.json)
- [Brancher un luminaire DCL](../src/data/tutorials/electricite/eclairage/brancher-un-luminaire-dcl.json)
- [Dimensionner un tableau électrique](../src/data/tutorials/electricite/tableau-electrique/dimensionner-son-tableau-electrique.json)
- [Ajouter un contacteur jour/nuit](../src/data/tutorials/electricite/tableau-electrique/ajouter-un-contacteur-jour-nuit.json)
- [Poser une évacuation PVC](../src/data/tutorials/plomberie/gestion-des-evacuations/gestion-evacuations.json)
- [Préparer le dimensionnement du réseau d’eau](../src/data/tutorials/plomberie/arrivee-d-eau/dimensionnage/dimensionnement-plomberie.json)
- [Amener l’eau en PEHD](../src/data/tutorials/plomberie/arrivee-d-eau/pehd/plomberie-pehd.json)
- [Sertir du cuivre](../src/data/tutorials/plomberie/arrivee-d-eau/cuivre/plomberie-cuivre.json)
- [Raccorder du PER à compression](../src/data/tutorials/plomberie/arrivee-d-eau/per/raccord-a-compression/per-raccord-a-compression.json)
- [Raccorder du PER à glissement](../src/data/tutorials/plomberie/arrivee-d-eau/per/raccord-a-glissement/per-raccord-a-glissement.json)
- [Sertir du PER](../src/data/tutorials/plomberie/arrivee-d-eau/per/raccord-a-sertir/per-raccord-a-sertir.json)
- [Relier du PER au cuivre](../src/data/tutorials/plomberie/arrivee-d-eau/raccord-per-vers-cuivre/raccord-per-vers-cuivre.json)

## Réalisés depuis cette liste

- [x] **T15 — Poser des plinthes et couper les angles** — terminé le 2026-09-16 — [/tutoriel/poser-des-plinthes/](/tutoriel/poser-des-plinthes/)
- [x] **T20 — Régler une porte de placard qui ferme mal** — terminé le 2026-09-16 — [/tutoriel/regler-une-porte-de-placard/](/tutoriel/regler-une-porte-de-placard/)
- [x] **T23 — Remplacer le joint d’une fenêtre qui laisse passer l’air** — terminé le 2026-09-16 — [/tutoriel/remplacer-le-joint-d-une-fenetre/](/tutoriel/remplacer-le-joint-d-une-fenetre/)
- [x] **T24 — Raboter une porte intérieure qui frotte** — terminé le 2026-09-16 — [/tutoriel/raboter-une-porte-qui-frotte/](/tutoriel/raboter-une-porte-qui-frotte/)
- [x] **T13 — Décoller du papier peint** — terminé le 2026-09-16 — [/tutoriel/decoller-du-papier-peint/](/tutoriel/decoller-du-papier-peint/)
- [x] **T36 — Peindre un mur en deux couleurs avec une séparation nette** — terminé le 2026-09-16 — [/tutoriel/peindre-deux-couleurs/](/tutoriel/peindre-deux-couleurs/)
- [x] **T37 — Repeindre un mur foncé en clair** — terminé le 2026-09-16 — [/tutoriel/repeindre-un-mur-fonce-en-clair/](/tutoriel/repeindre-un-mur-fonce-en-clair/)
- [x] **T38 — Repeindre une porte intérieure déjà peinte** — terminé le 2026-09-16 — [/tutoriel/repeindre-une-porte/](/tutoriel/repeindre-une-porte/)
- [x] **T11 — Remplacer un interrupteur simple à l’identique** — terminé le 2026-09-16 — [/tutoriel/remplacer-un-interrupteur/](/tutoriel/remplacer-un-interrupteur/)
- [x] **T12 — Poser du papier peint intissé** — terminé le 2026-09-16 — [/tutoriel/poser-du-papier-peint-intisse/](/tutoriel/poser-du-papier-peint-intisse/)
- [x] **T14 — Peindre un plafond sans traces** — terminé le 2026-09-16 — [/tutoriel/peindre-un-plafond/](/tutoriel/peindre-un-plafond/)
- [x] **T21 — Purger un radiateur à eau** — terminé le 2026-09-16 — [/tutoriel/purger-un-radiateur/](/tutoriel/purger-un-radiateur/)
- [x] **T07 — Reboucher une petite fissure stable dans un mur** — terminé le 2026-09-16 — [/tutoriel/reboucher-une-fissure/](/tutoriel/reboucher-une-fissure/)
- [x] **T08 — Choisir et poser une cheville adaptée à ton mur** — terminé le 2026-09-16 — [/tutoriel/choisir-une-cheville/](/tutoriel/choisir-une-cheville/)
- [x] **T09 — Fixer une tringle à rideaux droite** — terminé le 2026-09-16 — [/tutoriel/fixer-une-tringle-a-rideaux/](/tutoriel/fixer-une-tringle-a-rideaux/)
- [x] **T10 — Remplacer une prise électrique murale à l’identique** — terminé le 2026-09-16 — [/tutoriel/remplacer-une-prise-murale/](/tutoriel/remplacer-une-prise-murale/)
- [x] **T31 — Peindre sans bavures le long des bords et des angles** — terminé le 2026-09-16 — [/tutoriel/peindre-sans-bavures/](/tutoriel/peindre-sans-bavures/)
- [x] **T32 — Choisir sa peinture selon la pièce et le support** — terminé le 2026-09-16 — [/tutoriel/choisir-sa-peinture/](/tutoriel/choisir-sa-peinture/)
- [x] **T34 — Calculer la quantité de peinture à acheter** — terminé le 2026-09-16 — [/tutoriel/calculer-sa-peinture/](/tutoriel/calculer-sa-peinture/)
- [x] **T35 — Choisir un rouleau et un pinceau pour peindre un mur** — terminé le 2026-09-16 — [/tutoriel/choisir-rouleau-et-pinceau/](/tutoriel/choisir-rouleau-et-pinceau/)
- [x] **T40 — Rejointoyer un mur en pierre à la chaux** — terminé le 2026-09-16 — [/tutoriel/rejointoyer-un-mur-en-pierre/](/tutoriel/rejointoyer-un-mur-en-pierre/)
- [x] **T04 — Remplacer un mitigeur de lavabo** — terminé le 2026-09-16 — [/tutoriel/remplacer-mitigeur-lavabo/](/tutoriel/remplacer-mitigeur-lavabo/)
- [x] **T05 — Réparer une fuite sur un raccord à joint plat** — terminé le 2026-09-16 — [/tutoriel/reparer-fuite-joint-plat/](/tutoriel/reparer-fuite-joint-plat/)
- [x] **T06 — Lisser un mur avant de le peindre** — terminé le 2026-09-16 — [/tutoriel/lisser-un-mur/](/tutoriel/lisser-un-mur/)

- [x] **T01 — Arrêter une chasse d’eau qui coule en continu** — terminé le 2026-09-14 — [/tutoriel/arreter-chasse-eau-qui-coule/](/tutoriel/arreter-chasse-eau-qui-coule/)
- [x] **T02 — Remplacer le mécanisme d’une chasse d’eau** — terminé le 2026-09-14 — [/tutoriel/remplacer-mecanisme-chasse-eau/](/tutoriel/remplacer-mecanisme-chasse-eau/)
- [x] **T03 — Déboucher un lavabo en nettoyant son siphon** — terminé le 2026-09-14 — [/tutoriel/nettoyer-siphon-lavabo/](/tutoriel/nettoyer-siphon-lavabo/)

## Journal de mise à jour


- **2026-09-11** : création de 30 idées, réparties en trois priorités, après comparaison avec les 18 fiches existantes. Priorisation qualitative, sans volumes de recherche.
- **2026-09-11** : ajout de huit sujets peinture (T31 à T38), dont les trois demandes : éviter les bavures, choisir sa peinture et réaliser un motif au pochoir. La liste compte désormais 38 idées ; les volumes Google Trends n’ont pas été vérifiés.
- **2026-09-11** : ajout de quatre sujets demandés (T39 à T42) : volets en bois, joints de pierre à la chaux, remplacement d’un linteau et ceinture d’un mur en pierre. La liste compte désormais 42 idées ; les deux sujets structurels restent à cadrer avant rédaction.

- **2026-09-14** : début de réalisation du premier lot prioritaire : T01, T02 et T03.
- **2026-09-14** : T01, T02 et T03 terminés : fiches documentées, illustrations originales et variantes WebP, validations des données, du build et du rendu réussies. Le catalogue contient 21 tutoriels ; 39 idées restent à faire.
- **2026-09-16** : début du lot T04, T05 et T06 ; demande de rejointoiement à la chaux rattachée à T40, déjà présent, sans doublon.
- **2026-09-16** : T40 terminé seul : première fiche de gros œuvre, nouveau classement « Maçonnerie de pierre › Rejointoiement », illustration locale provisoire (à remplacer par une génération avec l’outil imagegen), contrôles TypeScript, lint, tests, données, build et rendu réussis. Le catalogue contient 25 tutoriels ; 35 idées restent à faire.
- **2026-09-16** : T04, T05 et T06 terminés : fiches documentées, illustrations originales et variantes WebP, contrôles TypeScript, lint, tests, données, build et rendu réussis. Le catalogue contient 24 tutoriels ; 36 idées restent à faire.
- **2026-09-16** : lot peinture T31, T32, T34 et T35 terminé : quatre fiches documentées, références NF DTU 59.1 quand elle s’applique et sources consultées ; illustrations provisoires (à remplacer par l’outil imagegen) et variantes WebP. Le catalogue contient 29 tutoriels ; 31 idées restent à faire.
- **2026-09-16** : lot menuiseries et plinthes T15, T20, T23 et T24 terminé : quatre fiches documentées (plinthes, réglage de porte de placard, joint de fenêtre, rabotage d’une porte), sans DTU applicable et avec sources consultées ; illustrations provisoires et variantes WebP. Le catalogue contient 45 tutoriels ; 15 idées restent à faire.
- **2026-09-16** : lot peinture avancée T13, T36, T37 et T38 terminé : quatre fiches documentées (décollage de papier peint, deux couleurs, mur foncé en clair, porte intérieure), référence NF DTU 59.1 pour les trois fiches de peinture et sources consultées ; illustrations provisoires et variantes WebP. Le catalogue contient 41 tutoriels ; 19 idées restent à faire.
