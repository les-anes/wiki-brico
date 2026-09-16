---
name: rediger-tutoriel
description: Rédiger ou réviser une fiche tutoriel WikiBrico (JSON dans src/data/tutorials/, illustration et variantes WebP) en respectant le modèle commun, la taxonomie et les validations du projet. Utiliser dès qu'on ajoute un tutoriel du catalogue, qu'on traite un sujet de docs/tutos-a-implementer.md, ou qu'on révise une fiche existante.
---

# Rédiger une fiche tutoriel WikiBrico

Workflow complet pour ajouter ou réviser une fiche. Le français est la langue de travail.
Appliquer ce skill **avant** d'écrire une ligne de JSON.

## 0. Lire la référence (obligatoire)

1. `openspec/specs/page-tutoriel/spec.md` — modèle éditorial commun (ton, structure, images, liens). C'est la référence maîtresse.
2. `openspec/specs/contenus-tutoriels/spec.md` — contrat des données et statuts.
3. `src/types.ts` — interface `Tutorial`.
4. `docs/tutos-a-implementer.md` — anti-doublon, priorité, avancement.
5. Modèles concrets les plus récents : `src/data/tutorials/plomberie/arrivee-d-eau/pehd/plomberie-pehd.json` (éditorial) et les dernières fiches (T40, T06, T04/T05).

Si un sujet vient de `docs/tutos-a-implementer.md`, marquer la ligne `— En cours` (avec le nom du changement OpenSpec s'il existe) avant de commencer.

## 1. Emplacement, identifiant, classement

- Fichier : `src/data/tutorials/<category>/<topicPath-slugs>/<id>.json`.
- `id` : slug stable, `^[a-z0-9]+(?:-[a-z0-9]+)*$`, identique au nom de fichier. **Ne jamais renommer ni renuméroter.**
- Slug d'un libellé de `topicPath` (règle exacte de `validate-data.mjs`) : NFD → suppression des accents → minuscules → tout caractère non alphanumérique remplacé par `-` → `-` en début/fin retirés.
- `category` et `topicPath` doivent exister dans `src/data/categories.json` (comparaison exacte du tableau). Sinon **ajouter le sujet** à la taxonomie avant de créer la fiche (ex. T19 réclame `finitions` → `["Sol vinyle"]`).
- Classements secondaires : `relatedCategories`, sans jamais dupliquer un JSON, catégorie différente de la principale.
- `journeys` : ids valides de `src/data/journeys.json`.

## 2. Écrire le JSON (statut `documented`)

Champs requis : `id`, `title`, `description`, `category`, `difficulty`, `durationMinutes`, `image`, `imageAlt`, `tools`, `materials`, `steps`, `mistakes`, `safety`, `status`, `updatedAt`.

Pour `status: "documented"` (statut par défaut des fiches publiables), il faut en plus :
- `scope` — périmètre et cas non couverts (donnée éditoriale, **non affichée**).
- `estimatesNote` — 2 phrases max, distingue matériel et chantier complet (**non affichée**).
- `sources` — non vide, chaque entrée `{ title, url (HTTPS), note, accessedAt: "AAAA-MM-JJ" }` (**non affichées**).
- `imageOrigin: "original"` **sans** `imageCredit`.
- `cost` peut rester `null` ; `difficulty` et `durationMinutes` doivent être renseignés (≠ `draft`).

Contraintes numériques imposées par `scripts/check-site.mjs` :
- `steps` : **5 ou 6** entrées `{ title, description }` (7 tolérées seulement pour un cas de sécurité exceptionnel, cf. contacteur).
- `mistakes` : **exactement 3**.
- `tools` ≥ 1, `safety` ≥ 1, `materials` ≥ 1 avec `name` + `quantity`.
- `updatedAt` = date du jour.

Champs optionnels, à n'utiliser que si vérifiés :
- `dtuReferences` : `reference` au format exact `NF DTU n.n` éventuellement suffixé ` P..`, URL HTTPS sur `boutique.afnor.org`, `norminfo.afnor.org` ou `boutique.cstb.fr`. Uniquement des DTU réellement consultés ; sinon **omettre** (la rubrique est masquée).
- `shoppingLinks` : enseigne dans `Leroy Merlin` (leroymerlin.fr), `Brico Dépôt` (bricodepot.fr), `Brico Cash` (bricocash.fr), `Castorama` (castorama.fr) ; vendeur direct, HTTPS, pas de marketplace ni d'affiliation.

## 3. Rédaction (règles éditoriales)

- Titre = résultat concret avec un verbe d'action.
- `description` = 1 à 2 phrases, tutoiement, français courant, phrases actives ; développer les acronymes dès la première mention.
- Chaque étape : titre d'action, 1 à 3 phrases ; progression préparation → réalisation → contrôle.
- **Aucune délégation à un professionnel, un « spécialiste » ou une « personne compétente »** : décrire les contrôles à faire soi-même, les conditions d'arrêt et les prérequis de sécurité.
- Erreurs : 3 erreurs fréquentes et concrètes. Précautions : propres au chantier, pas d'avertissements génériques.
- Rester sur le cas courant : pas de catalogue de variantes ni d'exposé théorique. Un détail dépendant du produit renvoie brièvement à sa notice.
- Le contenu du JSON ne doit pas contenir de marqueur provisoire (`Section à rédiger`, `Liste à compléter`, …) : `validate-data` les rejette.

## 4. Illustration

Convention du dépôt (cf. `docs/illustrations-tutoriels.md`) :
- Source de travail : `output/imagegen/<nom>.png` + `output/imagegen/<nom>.txt` (le prompt brut).
- PNG publié : `public/images/tutoriels/<id>.png`, **1536×1024**.
- Variantes WebP : `<id>-480.webp`, `-720.webp`, `-960.webp` (générées avec `cwebp`, qualité 82 sur les postes qui l'ont).
- Ajouter une section datée dans `docs/illustrations-tutoriels.md` avec le prompt.
- Style : dessin crayon/gouache fond ivoire, formes simplifiées, sujet centré dans les 70 %, **sans texte, flèche, logo ni légende**. `imageAlt` descriptif.
- `image` doit pointer vers un fichier **existant** : `validate-data.mjs` fait un `access()` dessus, même en `draft`.

**Si l'environnement n'a pas l'outil imagegen ni `cwebp`** (vérifier `command -v cwebp magick convert` et `python3 -c "import PIL"`) : produire le JSON, `imageAlt` et le prompt, créer le dossier/PNG impossible, et **demander à l'utilisateur de générer l'image** avant de lancer les validations. Ne pas inventer de fichier ni laisser un chemin mort.

## 5. Mettre à jour les compteurs et le suivi

`scripts/check-site.mjs` contient des **compteurs codés en dur** à ajuster :
- `tutorials.length` et le nombre d'ids uniques ;
- `countCards(render("/tutoriels/"))` ;
- comptes par catégorie/sujet assertés : `electricite`, `plomberie` + `["Arrivée d’eau","PER"]`, `["...","Raccord à sertir"]`, `preparer-chantier` + `["Plans"]` ;
- la ligne finale `"… N fiches, M URLs …"` (`URLs = 2 + nombre de tutoriels`).

`docs/tutos-a-implementer.md` :
- déplacer la ligne `Txx` vers « Réalisés depuis cette liste » avec `— terminé le AAAA-MM-JJ — [/tutoriel/<id>/](/tutoriel/<id>/)` ;
- mettre à jour la date en tête et ajouter une entrée au journal (compteur de tutoriels et d'idées restantes).

Optionnel : document de lot dans `docs/` (modèle `docs/tutoriels-electricite.md`).

## 6. Vérifier (porte de sortie)

```sh
pnpm validate:data
pnpm typecheck && pnpm lint && pnpm test
pnpm build && pnpm check:site
```

Puis relecture éditoriale : cohérence outils ↔ matériaux ↔ étapes, sources, image, absence de rubriques vides affichées, `scope`/`sources`/crédits non recopiés dans la page.

## Pièges connus

- `check-site.mjs` vérifie que les URLs de `sources` **n'apparaissent pas** dans le HTML rendu (seuls DTU et liens d'achat s'affichent).
- La page ne doit contenir ni « Ce que couvre ce guide », ni `<figcaption>`, ni crédit de licence.
- Un chemin image ou un classement inconnu, un id dupliqué ou un emplacement de fichier incorrect font échouer `validate:data`.
- Une nouvelle catégorie/sous-catégorie se déclare dans `categories.json`, pas seulement dans le JSON de la fiche.
- Les sujets structurels (T41, T42) demandent un cadrage préalable : cas précis, niveau avancé, aucune dimension universelle.
