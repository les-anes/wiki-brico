## 1. Données et moteur de calcul

- [x] 1.1 Créer `src/data/calculators.json` : hub (titre, description) et six outils avec slug, titre, description, accroche, méthode, hypothèses, limites, champs bornés, tutos liés et référence technique ; vérifier la relecture par `pnpm validate:data` après l’ajout des contrôles (tâche 6.1).
- [x] 1.2 Déclarer le contrat dans `src/types.ts` : définition d’outil, champ `number`/`select`, sortie `{ headline, values, warnings }` et plan de calpinage ; vérifier par `pnpm typecheck`.
- [x] 1.3 Écrire les six formules pures dans `src/lib/calculators/` (`pente-evacuation`, `quantite-osb`, `isolant-panneaux`, `ossature-montants`, `dosage-materiaux`, `calpinage`) et le registre `index.ts` ; vérifier que le pré-rendu et le client appellent la même fonction.
- [x] 1.4 Écrire `src/lib/calculators/calculators.test.ts` (node:test) : valeurs de référence de chaque formule, arrondi d’achat à l’unité supérieure, et cas limites — surface nulle, joint plus large qu’un carreau, bande de rive sous un demi-carreau, décalage de rang ; vérifier avec `pnpm test`.

## 2. Routage et pré-rendu

- [x] 2.1 Étendre `src/lib/routes.ts` : routes `calculators` (hub) et `calculator` (outil), construction depuis le registre, `matchRoute` et `pageMeta` (titre, description, canonical, `og:*`, fil d’Ariane à trois niveaux) ; vérifier que `check:site` ou `pnpm test` couvre un slug inconnu en 404.
- [x] 2.2 Vérifier que `scripts/prerender.mjs` écrit le hub, chaque outil, et les ajoute au `sitemap.xml`, sans modification du script ; vérifier sur `dist/` après `pnpm build`.
- [x] 2.3 Brancher la route dans `src/App.tsx` (hub et outil) et ajouter les métadonnées de suivi analytics comme pour les autres pages ; vérifier qu’un changement d’outil remet le défilement en haut.

## 3. Interface des outils

- [x] 3.1 Créer `src/components/calculators-hub.tsx` (hub) et `src/components/calculator-page.tsx` : formulaire des champs, bloc de résultats, hypothèses, méthode, limites, tutos liés ; vérifier le HTML pré-rendu sans JavaScript.
- [x] 3.2 Ajouter les styles dans `src/index.css` en réutilisant `.container`, `.breadcrumb`, `.eyebrow` et les variables existantes ; vérifier le contraste et le rendu mobile.
- [x] 3.3 Rendre les champs accessibles : `<label>` associé, unité annoncée, bornes exposées (`min`/`max`/`step`), message d’erreur relié au champ fautif ; vérifier au clavier et au lecteur d’écran, et passer `pnpm lint` (règles `jsx-a11y`).
- [x] 3.4 Afficher la quantité principale, les valeurs intermédiaires, les alertes, et l’arrondi d’achat avec la quantité théorique ; vérifier sur les valeurs par défaut de chaque outil.

## 4. Calpinage

- [x] 4.1 Calculer l’agencement (pièce rectangulaire, pose droite ou décalée, départ centré ou en angle) : positions, pièces entières, pièces coupées, largeur de bande de rive, nombre de carreaux et chutes réemployables ; vérifier par les tests de 1.4.
- [x] 4.2 Dessiner le plan en SVG (composant dédié) : contour de la pièce, joints, pièces entières et coupées distinguées, cotes de rive, axe de départ ; vérifier la mise à jour à la saisie dans le navigateur.
- [x] 4.3 Alerter quand une bande de rive passe sous un demi-carreau, quelle que soit la pose, et proposer le décalage d’un demi-élément ; vérifier le seuil sur plusieurs formats.
- [x] 4.4 Plafonner l’aperçu au-delà de 2 000 pièces avec un mode simplifié qui conserve les quantités exactes, et le signaler à l’utilisateur ; vérifier sur une pièce carrelée en 10 × 10 cm.

## 5. Liens, accès et contenu éditorial

- [x] 5.1 Relier chaque outil à ses tutoriels (fiche du geste) et au catalogue filtré quand plusieurs fiches s’appliquent ; vérifier qu’aucun lien interne ne mène à une route inconnue.
- [x] 5.2 Ajouter un accès au hub depuis l’accueil et, si elle existe, depuis la navigation du site ; vérifier le rendu et l’accessibilité du lien.
- [x] 5.3 Rédiger `docs/outils-calculateurs.md` : formule, hypothèses, sources et limites de chaque outil, avec la date de consultation des références ; vérifier que chaque outil de la donnée y figure.

## 6. Garde-fous et validation intégrée

- [x] 6.1 Étendre `scripts/validate-data.mjs` : lecture de `calculators.json`, slugs uniques en kebab-case, champs non vides et bornés, cohérence des unités, hypothèses présentes, tutoriels liés existants ; vérifier qu’une entrée invalide fait échouer le script.
- [x] 6.2 Étendre `scripts/check-site.mjs` : pages du hub et des outils présentes dans `dist/`, titre et `canonical` propres, résultat pré-rendu présent, plan de calpinage présent, liens internes cohérents, compteurs de routes mis à jour ; vérifier qu’un outil sans page fait échouer le script.
- [x] 6.3 Exécuter `pnpm typecheck && pnpm lint && pnpm test && pnpm validate:data`, puis `pnpm build && pnpm check:site` ; corriger les échecs liés au changement.
- [x] 6.4 Exécuter `pnpm validate:specs` puis reporter la delta dans `openspec/specs/` (nouvelle capability `calculateurs`, requirement « Pages distinctes » de `catalogue`) ; vérifié par `pnpm validate:specs`.
- [x] 6.5 Contrôler dans le navigateur le hub, deux outils et le calpinage (saisie, recalcul, alertes, rendu mobile) ; contrôle visuel du 2026-09-24 conforme, aucun écart signalé.
- [ ] 6.6 Archiver le change dans `openspec/changes/archive/2026-09-24-calculateurs-et-calpinage/` selon la procédure du dépôt.

## 7. Relecture et escalier — extension demandée le 24 septembre 2026

- [x] 7.1 Corriger la navigation entre outils, le format décimal, les erreurs accessibles et les incohérences de pente, ossature, isolant et dosage ; couvrir les régressions.
- [x] 7.2 Vérifier et corriger les coupes fines et le mode simplifié du calepinage, avec tests géométriques.
- [x] 7.3 Ajouter le calculateur d’escalier droit ou quart tournant, avec palier ou marches rayonnantes, plan coté et profil, hypothèses et limites explicites.
- [x] 7.4 Décorréler les textes du hub et des résultats de l’achat ; mettre à jour les specs et la documentation.
- [x] 7.5 Vérifier calculs, pré-rendu, métadonnées, saisie, navigation et rendu mobile.

Validation de l’extension : 39 tests, typage, lint, données (72 fiches / 7 outils), build (88 URLs), contrôle du site et specs réussis. Captures locales ordinateur/mobile et variantes quart tournant relues ; hydratation et interactions vérifiées par `check:site`. L’archivage 6.6 reste en attente.
