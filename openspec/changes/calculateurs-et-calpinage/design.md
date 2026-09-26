## Context

Voir `proposal.md` — Why. Ce qui contraint l’approche :

- **Une source de vérité pour les URLs.** `src/lib/routes.ts` (`buildRoutes`, `matchRoute`, `pageMeta`) alimente à la fois le routeur client, le pré-rendu (`scripts/prerender.mjs`) et le sitemap. Une page qui n’y figure pas n’existe pas pour Google.
- **Pré-rendu obligatoire.** Chaque page est rendue au build en HTML complet, puis hydratée. Un état initial différent entre serveur et client casse l’hydratation, contrôlée par `check:site`.
- **Le contenu est de la donnée.** Tutoriels et taxonomie vivent en JSON, validés par `scripts/validate-data.mjs`. Les libellés affichés ne sont pas écrits dans les composants.
- **Aucun runtime dynamique.** Pas de backend, pas de `fetch` côté visiteur ; le calcul doit être local.
- **CSS unique.** `src/index.css` en CSS simple (pas de CSS-in-JS, pas d’utilitaires Tailwind dans le balisage au-delà des composants `ui/`).
- **Références techniques déjà réunies.** La fiche `gestion-evacuations` (pente de 1 à 2 cm/m, guide Nicoll), `poser-un-plancher-osb-sur-solives` (surface + 10 % de chute, NF EN 300, abaque fabricant), `monter-une-petite-cloison-en-placo` (entraxe 60 cm, NF DTU 25.41), `ceinturer-un-mur-en-pierre` (dosage 300 kg/m³ sourcé) et `poser-du-carrelage-au-sol` (calepinage, marge de 10 %, NF DTU 52.2) fournissent les valeurs et les sources de départ.

## Goals / Non-Goals

**Goals:**

- Sept outils dont les formules sont des fonctions pures, testables hors navigateur, partagées entre le pré-rendu et le client.
- Des pages indexables dont le contenu texte (méthode, hypothèses, limites, liens) existe dans le HTML, indépendamment de la saisie.
- Un chemin clair de l’outil vers le geste : chaque outil cite ses tutoriels.
- Une extension minimale : ajouter un outil = une entrée de données + une fonction.

**Non-Goals:**

- Dimensionner une structure (solivage, section de montant, réseau d’évacuation complet) : les outils donnent des quantités, pas des sections.
- Estimer un budget en euros, produire un devis ou un bon de commande.
- Sauvegarder une saisie, la partager par URL ou la préremplir depuis une fiche.
- Traiter les pièces non rectangulaires, la pose diagonale, les motifs et les pièces en L pour le calpinage.
- Maintenir une seconde liste d’associations dans les fiches : les liens inverses sont dérivés du registre des calculateurs.

## Decisions

**1. Métadonnées en JSON, formules en TypeScript pur.**

`src/data/calculators.json` porte ce qui est éditorial : slug, titre, description, accroche, méthode, hypothèses, limites, champs (libellé, unité, bornes, valeur par défaut), tutos liés, référence. `src/lib/calculators/<slug>.ts` porte la formule, en fonction pure `compute(inputs) → sortie`.

Alternatives écartées : tout en TSX (le contenu échappe à `validate:data` et à la règle « le contenu est de la donnée ») ; un mini-langage de formules en JSON (une usine à gaz pour sept formules, et des tests qui ne couvrent plus le calcul) ; `eval` d’expressions (aucune validation possible, risque d’injection).

**2. Un registre unique alimente routes, hub et métadonnées.**

`src/lib/calculators/index.ts` exporte la liste des outils et `findCalculator(slug)`. `buildRoutes` y ajoute le hub et chaque outil, donc le pré-rendu, le `sitemap.xml` et `pageMeta` suivent sans liste parallèle à tenir.

**3. L’état initial est calculé au build, jamais dans un `useEffect`.**

`CalculatorPage` initialise son état avec les valeurs par défaut du JSON et calcule la sortie pendant le rendu. Serveur et client produisent donc exactement le même HTML (aucun `Date`, aucun aléatoire, aucun accès au `localStorage`). Ajouter ou modifier un champ met à jour les deux rendus en même temps.

**4. Champ générique à deux types, sortie générique à trois blocs.**

Les champs sont `number` (unité, minimum, maximum, pas) ou `select` (options étiquetées). La sortie est `{ headline, values[], warnings[] }` : une quantité principale, des valeurs intermédiaires, des alertes. Le calpinage renvoie en plus un `plan` typé, que la page confie à un composant SVG dédié. L’escalier possède lui aussi un plan typé et un composant dédié.

**5. SVG plutôt que `<canvas>` pour le calpinage.**

Le SVG est rendu côté serveur, ne demande aucune mesure du navigateur, reste net à l’impression et se vérifie en lisant le HTML pré-rendu (`check:site` y trouve le plan sans navigateur).

Le dessin pose les pièces entières et coupées, et cote la bande de rive des deux côtés utiles. Au-delà de 2 000 pièces, l’aperçu passe en mode simplifié (trame de lignes et bandes de rive colorées) : **plafond assumé** pour ne pas gonfler le HTML d’une pièce carrelée en petits éléments ; les quantités estimées restent identiques et une trame SVG (`<pattern>`) conserve le sens de pose.

**6. Les arrondis et le formatage français appartiennent à la formule.**

Les sorties sont déjà formatées (« 7,2 », espace insécable avant l’unité, « 3 sacs »), donc testables sans DOM. Le composant ne fait qu’afficher des chaînes.

**7. Les valeurs de convention sont affichées et modifiables.**

Taux de chute (10 %), entraxe (60 cm), joint (3 mm), pente (1 cm/m) : chacun est un champ avec sa valeur par défaut, listé dans les hypothèses. Aucune constante cachée dans le calcul.

**8. Aucun prix.**

Les outils donnent des dimensions et des quantités à prévoir, avec arrondi à l’entier supérieur pour les éléments indivisibles. Une fourchette de prix exigerait des relevés datés par enseigne : hors périmètre.

**9. Contrôles répartis comme dans le dépôt.**

`validate:data` : slugs uniques et kebab-case, champs bornés et cohérents, doublons d’unités, tutoriels liés existants. `pnpm test` : formules pures, cas limites (surface nulle, joint très large, bande de rive faible). `check:site` : pages générées, titre et `canonical`, exemple calculé présent dans le HTML pré-rendu, aucun lien interne mort, compteurs de routes mis à jour.

## Risks / Trade-offs

- **Désaccord serveur/client sur le rendu** → même fonction pure des deux côtés, valeurs par défaut issues du JSON, aucun état non déterministe. `check:site` compare le HTML pré-rendu et signale toute erreur d’hydratation.
- **Un résultat pris pour une prescription** → méthode, hypothèses et limites affichées sur chaque page ; pour la pente, la source (guide Nicoll) est citée ; le dosage renvoie au sac et à sa notice ; mention explicite qu’aucun outil ne dimensionne une structure.
- **Moteur générique qui grossit** → deux types de champs, trois blocs de sortie, une exception (le plan). Tout besoin qui ne rentre pas dedans devient un composant dédié, pas un nouveau cas du moteur.
- **Chute de la marge de rive ignorée par un utilisateur pressé** → l’alerte est un bloc visible, pas une ligne grise, et nomme la valeur mesurée.
- **Tailles extrêmes pour le dessin** → plafond de 2 000 pièces avec aperçu simplifié, comptage identique au mode détaillé.
- **Contrôles existants figés sur 62 tutoriels et 6 thèmes** → `check:site` compte désormais aussi les outils ; toute évolution du registre met à jour ces compteurs.
- **Divergence entre la fiche et l’outil** (mêmes valeurs à deux endroits) → les valeurs de départ sont reprises des fiches existantes et la référence commune est citée dans `docs/outils-calculateurs.md`; un changement de source se répercute aux deux endroits, comme pour les fiches.

## Migration Plan

Ajout pur : aucune URL existante ne change, aucune donnée migrée, aucun drapeau. Le déploiement suit le build habituel (`prerender.mjs` génère les nouvelles pages et les ajoute au sitemap). Retour arrière : retirer les entrées du registre, le hub et les pages disparaissent du sitemap au build suivant.

## Extension après relecture du 24 septembre 2026

Le moteur reste composé de fonctions pures. L’escalier renvoie un plan dédié, consommé par un composant SVG (vue de dessus et profil déroulé). Il recherche un nombre entier de hauteurs et répartit les marches entre les branches ; la géométrie reste dans les reculements saisis. Les marches rayonnantes tournent autour d’un jour carré explicite : ce modèle n’est pas un balancement de fabrication. Le giron est mesuré sur un arc au milieu de la largeur utile.

Les champs conditionnels utilisent `visibleWhen` avec une référence à un select du même outil. Les champs masqués n’entrent pas dans la validation du mode actif. Le composant est remonté au changement de slug pour éviter de transporter des valeurs entre outils.

Le dosage met à l’échelle une recette renseignée par le visiteur ; aucune quantité d’eau ou de granulats n’est déduite d’une masse volumique arbitraire. L’ossature refuse les barres plus courtes que les montants ; aucun aboutage n’est proposé. Les quantités servent à préparer le projet et ne sont plus systématiquement décrites comme des achats.

## Illustrations et découverte — 26 septembre 2026

Chaque définition possède une illustration locale PNG et son texte alternatif ; `responsiveImage` fournit les WebP des cartes. Les associations `relatedTutorials` servent également aux liens inverses en bas des fiches.

La recherche réutilise `searchScore` sans index distant ni nouvelle dépendance. L’accueil propose au plus cinq tutoriels et trois calculateurs, distingués par leur libellé et accessibles dans la même liste au clavier. Le catalogue affiche tous les calculateurs correspondants dans une section distincte pour une recherche générale sans filtre de catégorie, parcours, difficulté ou favoris. Les compteurs de tutoriels restent propres aux tutoriels.
