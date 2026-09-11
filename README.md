# WikiBrico

Encyclopédie DIY statique : React 19, TypeScript, Vite 6, Tailwind CSS 3 et composants suivant les conventions shadcn/ui.

## Démarrer

```sh
npm install
npm run dev
npm run build
npm run preview
npm test
npm run check:site
```

## Pages et navigation

- `/` : accueil, univers de travaux, parcours et rubriques transversales.
- `/tutoriels/` : catalogue « On s’y met ce week-end ? », recherche, filtres, catégories, sous-catégories, parcours et favoris.
- `/tutoriel/<identifiant>/` : fiche détaillée, références DTU, liens de matériel et liens vers ses autres classements.

Chaque route est une vraie page HTML pré-rendue au build : `<title>`, `meta description`, `canonical`, `og:*` propres et balisage `BreadcrumbList`. Le rendu serveur réutilise le même composant React que le navigateur, puis `hydrateRoot` reprend la main. Les anciens liens à fragment (`/#tutoriel/<identifiant>`, `/#tutoriels?...`) sont redirigés vers l’URL canonique par un court script en ligne. Les chemins inconnus affichent `404.html`.

Les filtres sont dans l’URL : `/tutoriels/?categorie=plomberie`, `/tutoriels/?parcours=renover-une-chambre` ou `/tutoriels/?favoris=1`. Les niveaux de sous-catégorie utilisent des paramètres `sujet` répétés. Les liens et le bouton Retour conservent la sélection ; les favoris sont stockés dans le navigateur. La recherche remplace l’entrée d’historique courante pour ne pas créer une étape par lettre.

Le favicon SVG local `public/favicon.svg` reprend la maison du logo.

## Catégories et parcours

`src/data/categories.json` définit les 12 grandes catégories, les deux rubriques transversales, les libellés courts de navigation et les chemins de sous-catégories. `src/data/taxonomy.ts` associe les icônes et choisit les cinq accès principaux de la barre du haut. Les autres sont dans « Autres ».

`src/data/journeys.json` définit les parcours. Les sélections initiales « Rénover une chambre », « Aménager des combles » et « Rénover une salle de bains » utilisent les tutoriels existants. Elles ne prétendent pas couvrir intégralement ces chantiers. Ajouter un parcours dans ce fichier puis son identifiant dans le champ `journeys` des tutoriels concernés.

## Un tutoriel, plusieurs accès

Chaque tutoriel possède un seul fichier JSON et un identifiant stable. Son classement principal détermine le dossier :

```text
src/data/tutorials/
├── plomberie/arrivee-d-eau/per/raccord-a-sertir/per-raccord-a-sertir.json
├── plomberie/gestion-des-evacuations/gestion-evacuations.json
├── cloisons/enduits/reboucher-un-trou.json
├── finitions/peinture/peindre-un-mur.json
├── finitions/parquet/poser-du-parquet.json
├── techniques/percer-et-fixer/poser-une-etagere.json
└── cuisine-salle-de-bains/joints-sanitaires/refaire-joints-silicone.json
```

Le chemin est `catégorie/topicPath-en-slugs/id.json`. L’import Vite est récursif. Les titres et identifiants des tutoriels ne changent pas lors d’un déplacement, donc leurs liens et favoris restent valides.

`relatedCategories` fournit les autres classements, sans dupliquer le contenu. Exemple du dimensionnage :

```json
{
  "category": "plomberie",
  "topicPath": ["Arrivée d’eau", "Dimensionnage"],
  "relatedCategories": [
    { "category": "preparer-chantier", "topicPath": ["Plans"] }
  ],
  "journeys": ["renover-une-salle-de-bains"]
}
```

Le catalogue compte chaque tutoriel une seule fois, même lorsqu’il est accessible par plusieurs chemins. Les filtres de catégorie et parcours se combinent.

## Ajouter et vérifier les contenus

Dupliquer un JSON existant dans le dossier voulu. Champs : `id`, `title`, `description`, `category`, `topicPath`, `relatedCategories`, `journeys`, `difficulty`, `durationMinutes`, `cost`, `image`, `imageAlt`, `tools`, `materials`, `steps`, `mistakes`, `safety`, `status`, `updatedAt`. Le contrat est dans `src/types.ts`.

- `draft` : exemple éditorial non terminé ; durée, niveau et coût peuvent être `null`.
- `documented` : synthèse de sources consultées, sans validation professionnelle du chantier. Exige `scope`, `estimatesNote`, `sources` et une origine d’image (`imageCredit` ou `imageOrigin: "original"`). Le coût peut rester `null`.
- `published` : état éditorial avec niveau, durée et coût renseignés ; ce statut ne constitue pas une certification technique.

Les 14 tutoriels actuels sont documentés et harmonisés avec le modèle commun, y compris les six anciens brouillons. Les durées sont des estimations et les budgets non chiffrables restent à préciser.

`npm run validate:data` vérifie récursivement chemins, identifiants, classifications principales et secondaires, parcours, sources et présence des images locales. Cette validation est aussi exécutée au build. `npm test` teste le routage et les métadonnées (`src/lib/routes.test.ts`). `npm run check:site` contrôle le rendu des pages, les filtres, la correspondance du sitemap, le fil d’Ariane, le shim des anciens liens et l’hydratation, sans navigateur.

## Images et déploiement

Les 14 tutoriels utilisent des illustrations originales locales, regroupées dans `public/images/tutoriels/` et nommées selon l’identifiant de la fiche (`<id>.png`). Les prompts sont conservés dans `docs/illustrations-tutoriels.md`. Aucune légende ni crédit n’est affiché. Les images d’accueil utilisent encore Unsplash ; les polices utilisent Google Fonts.

Publier `dist/`. `netlify.toml` lance `npm run build && npm run check:site`, puis publie `dist/`. Le build pré-rend une page par route, `404.html`, `sitemap.xml` et `robots.txt`. `SITE_URL` fixe l’origine des URLs absolues ; il vaut `https://wikibrico.fr` par défaut et peut être surchargé par variable d’environnement (`SITE_URL=https://exemple.fr npm run build`).

## Travailler avec OpenSpec

OpenSpec est installé comme dépendance de développement à version fixée. Utiliser la version du projet :

```sh
npm run openspec -- list
npm run validate:specs
```

`openspec/config.yaml` décrit le contexte et les conventions de WikiBrico. Les spécifications du socle existant sont dans `openspec/specs/`. Les changements en cours vont dans `openspec/changes/`, puis dans son dossier `archive/` une fois terminés.

Les skills Codex sont dans `.agents/skills/`. Après rechargement du projet ou ouverture d’une nouvelle session, utiliser :

- `$openspec-explore` pour explorer une idée.
- `$openspec-propose` suivi du besoin pour préparer la proposition, les specs, la conception et les tâches.
- `$openspec-apply-change` pour implémenter un changement préparé.
- `$openspec-update-change` pour ajuster un changement.
- `$openspec-sync-specs` pour intégrer ses évolutions aux specs de référence.
- `$openspec-archive-change` pour archiver un changement terminé.

Exemple : `$openspec-propose Ajouter un tableau comparatif des raccords PEHD dans les tutoriels de plomberie`.

Versionner `openspec/` et `.agents/skills/` avec le code. La validation OpenSpec contrôle les documents ; elle complète les contrôles de données, de rendu et de compilation.

## Fiches simples et liens

Les fiches expliquent les acronymes dès leur première utilisation et proposent cinq ou six étapes courtes, trois erreurs fréquentes et des précautions propres au chantier. Le périmètre `scope` et les `sources` de recherche restent des données éditoriales, sans affichage dans la page.

- `dtuReferences` : collection optionnelle de `{ reference, title, url, scope, accessedAt }`. Seuls les DTU vérifiés sont affichés dans « Références DTU », avec un lien vers leur éditeur (AFNOR ou CSTB). `scope` consigne la portée et les limites de la consultation ; un résumé ne vaut pas lecture du texte intégral.
- `shoppingLinks` : collection optionnelle de `{ material, retailer, url }`, affichée dans « Où trouver le matériel ». Enseignes autorisées : Leroy Merlin (`leroymerlin.fr`), Brico Dépôt (`bricodepot.fr`), Brico Cash (`bricocash.fr`) et Castorama (`castorama.fr`). Vérifier le vendeur direct et la destination lors de la rédaction ; les vendeurs tiers de marketplace sont exclus.

La validation analyse les domaines HTTPS, et rejette les imitations de domaines. Elle ne peut pas vérifier automatiquement la portée d’un DTU ni le vendeur actuel d’une page : ces vérifications restent éditoriales. Les rubriques vides sont masquées et les sources de recherche restent uniquement dans les données éditoriales.

Les illustrations créées pour le site portent `imageOrigin: "original"` et un texte alternatif descriptif. Ils sont affichés à leur ratio naturel dans la fiche, sans légende externe.

Le [modèle commun des pages tutoriel](openspec/specs/page-tutoriel/spec.md) fixe le ton, la structure, le niveau de détail, le style des illustrations et les règles de liens pour chaque nouvelle fiche ou révision. Il prend la version approuvée du PEHD comme référence ; les 14 fiches existantes ont été harmonisées le 8 septembre 2026.
