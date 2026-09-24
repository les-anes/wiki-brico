# Outils de calcul

Dernière mise à jour : **24 septembre 2026**.

Les pages `/calculateurs/` et `/calculateurs/<slug>/` répondent aux questions chiffrées pour préparer un projet : pente, quantités, dosages, calepinage. Chaque outil affiche sa méthode, ses hypothèses et ses limites, puis renvoie vers les tutoriels du geste.

## Comment un outil est fait

- `src/data/calculators.json` porte le contenu : slug, titre, description, accroche, méthode, hypothèses, limites, champs bornés, référence et tutoriels liés.
- `src/lib/calculators/<slug>.ts` porte la formule, en fonction pure `compute(inputs) → { headline, values, warnings }`. Le même appel sert au pré-rendu et au navigateur : la page affiche donc un exemple chiffré complet sans JavaScript.
- `src/lib/calculators/index.ts` assemble les deux. Un outil déclaré sans formule fait échouer le chargement, exprès.
- Le calpinage renvoie en plus un plan, dessiné en SVG par `src/components/calpinage-plan.tsx`.

Contrôles : `pnpm validate:data` (champs, bornes, tutoriels liés), `pnpm test` (formules et cas limites), `pnpm check:site` (pages pré-rendues, résultat présent, plan dessiné, recalcul après saisie, saisie invalide).

## Les neuf outils

| Outil | Formule | Hypothèses | Référence |
| --- | --- | --- | --- |
| Pente d’évacuation PVC | descente = longueur × pente ; degrés = arctan(pente ÷ 100) | pente régulière, tronçon gravitaire intérieur, minimum 1 cm/m | Nicoll, guide PVC évacuation GTEVAC12 (p. 23), consulté le 11/09/2026 |
| Quantité d’OSB | rangées × panneaux par rangée, majoré de la chute | grand côté en travers des solives, solivage sain, chute 10 % | FCBA, guide des applications des panneaux, consulté le 17/09/2026 |
| Isolant | surface majorée de la chute ÷ surface du conditionnement | surface rectangulaire, une seule épaisseur | NF DTU 25.41, fiche éditeur, consultée le 16/09/2026 |
| Montants et rails | montants = plafond(longueur ÷ entraxe) + 1 ; rails = 2 longueurs ; vis espacées au plus de 27,5 cm sur deux faces, extrémités comprises | cloison non porteuse en pièce sèche, barres de 3 m | NF DTU 25.41, fiche éditeur, consultée le 16/09/2026 |
| Dosage mortier et béton | volume × chaque dosage saisi | recette préalablement définie par m³ de mélange fini, sacs de liant seul | Infociments, Ciments et bétons B51, consulté le 24/09/2026 |
| Calepinage | positions espacées d’un carreau + joint ; coupes conservées ; trait de coupe réservé pour le réemploi | pièce rectangulaire d’équerre, pose droite ou décalée d’un demi-carreau | NF DTU 52.2, fiche éditeur, consultée le 16/09/2026 |
| Escalier | h = H/N ; droit : g = reculement/(N−1) ; quart tournant : répartition entière dans deux branches | palier carré ou marches rayonnantes autour d’un jour carré, largeur utile hors limons | Lapeyre, dimensions d’un escalier, consulté le 24/09/2026 |
| Rejointoiement à la chaux | part des joints = 1 − (H × L) ÷ ((H + j) × (L + j)) ; volume = surface × profondeur × part, majoré de la perte ; chaux et sable répartis au volume | appareillage assimilé à une trame régulière, profondeur constante, 1 volume de chaux pour 2 à 3 volumes de sable | Socli (Heidelberg Materials), rejointoiement et choix du mortier, consulté le 24/09/2026 |
| Puissance d’un radiateur | puissance théorique = volume × coefficient d’isolation ; conseillée = théorique majorée de la marge ; modèle = puissance commerciale juste au-dessus | pièce rectangulaire, hauteur sous plafond connue, coefficient de 28 à 50 W/m³ selon l’isolation | choisir-son-chauffage.fr, chauffage électrique mural : guide du choix (d’après les guides Thermor), consulté le 24/09/2026 |

## Ce que les outils ne font pas

- L’escalier compare la géométrie, sans calculer trémie, échappée, garde-corps ou résistance. Les marches rayonnantes ne sont pas des marches balancées.
- Le rejointoiement donne un volume de mortier, pas une recette : le liant se choisit selon la dureté de la pierre et se convertit en sacs avec le volume indiqué sur l’emballage.
- Aucun dimensionnement structurel : ni section de solive, ni calibre de circuit, ni diamètre d’évacuation, ni ferraillage.
- Aucun prix : les quantités sont arrondies à l’unité vendable, pas chiffrées en euros.
- Aucune sauvegarde de saisie : la valeur vit dans l’état de la page, pas dans l’URL ni dans le navigateur.
- Le calpinage ne traite pas les pièces en L, la pose diagonale ni les motifs. Au-delà de 2 000 pièces, l’aperçu passe en trame simplifiée : les quantités estimées restent identiques, le dessin détaillé non.

## Ajouter un outil

1. Ajouter l’entrée dans `src/data/calculators.json` (champs bornés, méthode, hypothèses, limites, référence, tutoriels liés).
2. Écrire la formule dans `src/lib/calculators/<slug>.ts` et l’enregistrer dans `index.ts`.
3. Couvrir la formule et ses cas limites dans `src/lib/calculators/calculators.test.ts`.
4. `pnpm validate:data && pnpm test && pnpm build && pnpm check:site`.

La route, la page, le `sitemap.xml` et le hub suivent automatiquement : ils sont dérivés du registre.

## Relecture du 24 septembre 2026

Corrections vérifiées : virgule conservée au formatage décimal, remise à zéro des champs au changement d’outil, messages d’erreur associés aux champs, référence au sol pour la hauteur d’arrivée négative, refus des aboutages de montants, retrait des prescriptions non justifiées sur les chutes d’OSB et l’isolant. Le dosage reprend désormais une recette saisie au lieu de déduire les granulats d’une masse volumique supposée. Le calepinage conserve les coupes fines, réserve le trait de coupe et dessine effectivement la trame en mode simplifié.

Les URLs livrées restent stables, notamment `/calculateurs/calpinage/` malgré la correction orthographique du titre affiché. Les résultats et les liens internes existent dans le HTML pré-rendu. Les contrôles couvrent aussi le changement de forme et de sens de l’escalier, ainsi que le passage direct vers un autre outil.

Vérification visuelle : captures Chrome local sur ordinateur et en mise en page mobile, plus les quatre variantes quart tournant (palier/rayonnant, gauche/droite). Le navigateur intégré était indisponible ; les interactions et l’hydratation sont contrôlées par `check:site`.
