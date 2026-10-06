# Épingler les pages du site sur Pinterest

`scripts/pinterest.mjs` épingle les pages du site, tutoriels et calculateurs, une épingle par
page, dans le tableau de sa catégorie. Chaque épingle porte un **lien cliquable** vers la page,
marqué `?utm_source=pinterest&utm_medium=social`. Le script lit la même donnée qu’Instagram
(`src/data/tutorials/`, `src/data/calculators.json`) mais garde son propre état,
`output/pinterest/publications.json` : sa file démarre avec toutes les pages.

## Ce que l’API impose

- **Accès d’essai, puis standard.** Une application neuve est en accès d’essai : les épingles
  ne sont visibles que de son propriétaire. L’accès standard, qui les rend publiques, se demande
  avec une **vidéo du parcours d’autorisation** — c’est ce que montre `--jeton`.
- **Jetons.** Accès valable 30 jours, rafraîchissement valable 60 jours et renouvelé à chaque
  usage. `--publish` rafraîchit à moins de sept jours de l’échéance et réécrit `.env`.
- **Portées.** `boards:write` est exigé pour créer une épingle, même sans créer de tableau.
- **Visuel.** Envoyé en base64 dans la requête : rien à committer ni à déployer. Format 2:3,
  1080×1620, fabriqué en mémoire avec les gabarits d’Instagram.

## Prérequis

1. Un compte Pinterest **professionnel**.
2. Une application sur [developers.pinterest.com](https://developers.pinterest.com/apps/), avec
   l’adresse de redirection `http://localhost:8085/callback`.
3. Un tableau par catégorie, créé à la main et nommé **exactement** comme le `shortName` de
   `src/data/categories.json` : Gros œuvre, Toiture, Isolation, Cloisons, Électricité,
   Plomberie, Assainissement, Chauffage, Menuiseries, Finitions, Cuisine & bains, Extérieurs,
   Préparer son chantier, Savoir-faire. La casse est ignorée.
4. Dans `.env` (ignoré par git) :

```sh
PINTEREST_APP_ID=…
PINTEREST_APP_SECRET=…
# Posés par --jeton, puis tenus à jour par --publish :
# PINTEREST_ACCESS_TOKEN, PINTEREST_REFRESH_TOKEN, PINTEREST_ACCESS_EXPIRE
```

## Commandes

```sh
pnpm pinterest --jeton                   # ouvre l’autorisation, pose les jetons dans .env
pnpm pinterest --tableaux                # ✓ / ✗ par catégorie
pnpm pinterest --plan                    # file d’attente, sans réseau
pnpm pinterest --dry-run [--only <id>]   # texte de l’épingle et aperçu JPEG dans /tmp
pnpm pinterest --publish [--limit <n>]   # une épingle par défaut, état écrit après chacune
```

Si la production refuse les écritures en accès d’essai, `PINTEREST_API_HOST=https://api-sandbox.pinterest.com`.

## Automatiser

`--publish` se suffit à lui-même : il rafraîchit le jeton, fabrique le visuel et publie. Une
tâche cron locale, trois fois par jour :

```cron
17 9,14,19 * * *  cd ~/Projects/wiki-brico && pnpm pinterest --publish
```

Committe ensuite `output/pinterest/publications.json`, sinon une autre machine republierait
les mêmes pages.

## Known gaps

- `not done` — pas d’action GitHub : le jeton de rafraîchissement change à chaque usage, il
  faudrait réécrire le secret du dépôt à chaque exécution (`gh secret set` avec un jeton
  d’accès personnel).
- `not tested` — aucun appel réel à l’API : ni `--jeton`, ni `--publish`, faute de compte et
  d’application.
- `unknown` — `http://localhost` comme redirection : la doc l’utilise en exemple, sans le
  garantir.
