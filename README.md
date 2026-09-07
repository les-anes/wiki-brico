# WikiBrico

Squelette d’une encyclopédie DIY : React 19, TypeScript, Vite 6, Tailwind CSS 3 et composants locaux suivant les conventions shadcn/ui (Radix Slot, CVA, tokens CSS, `components.json`, alias `@/`).

## Démarrer

```sh
npm install
npm run dev
npm run build
npm run preview
```

Le catalogue comprend recherche insensible aux accents, catégories, filtre de difficulté, favoris dans le navigateur et fiches de tutoriels accessibles par URL `/#tutoriel/identifiant`. Interface responsive en français.

## Ajouter un tutoriel

Dupliquer un fichier de `src/data/tutorials/`. Le nom du fichier doit correspondre à son `id`. Tous les JSON sont importés automatiquement par Vite ; aucun serveur ni base de données nécessaire. Le contrat TypeScript se trouve dans `src/types.ts`. Exécuter `npm run validate:data` pour vérifier le contenu ; cette validation est aussi exécutée au build.

Champs obligatoires : `id`, `title`, `description`, `category`, `difficulty`, `durationMinutes`, `cost` (`min`, `max`, `currency`), `image`, `imageAlt`, `tools`, `materials` (`name`, `quantity`), `steps` (`title`, `description`), `mistakes`, `safety`, `status`, `updatedAt`.

Catégories : `plomberie`, `electricite`, `maconnerie` (gros œuvre), `menuiserie`, `peinture`, `revetements`, `charpente`, `toiture`. Difficultés : `Débutant`, `Intermédiaire`, `Avancé`. Coûts en EUR ; durée en minutes ; date au format YYYY-MM-DD.

Les six exemples ont le statut `draft` : ils illustrent le format, restent visibles dans cette démonstration et affichent un avertissement sur leur fiche. Les étapes sont volontairement éditoriales et doivent être complétées et vérifiées avant utilisation. Le statut `published` supprime la mention de brouillon ; il ne constitue pas une validation technique automatique.

## Déploiement et limites

Publier le dossier `dist/`. La navigation par fragment fonctionne sur un hébergement statique sans configuration de réécriture. Pour un référencement individuel des tutoriels, prévoir un pré-rendu avec de vraies routes : les fragments ne sont pas des pages SEO indépendantes. `SITE_URL=https://votre-domaine.fr npm run build` génère un sitemap de l’accueil ; sans domaine configuré, seul robots.txt est généré.

Les images d’illustration proviennent d’Unsplash et les polices de Google Fonts : une connexion est nécessaire à leur chargement. Pour une version autonome, placer les images dans `public/images` et héberger les polices localement. Aucun compte utilisateur, backend ou service d’envoi n’est connecté.
