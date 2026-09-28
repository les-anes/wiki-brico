# Publier les pages du site sur Instagram

`scripts/instagram.mjs` sort les pages du site sur Instagram : les tutoriels et les
calculateurs, un pour un. Chaque page part en post du fil, avec une légende construite
depuis la donnée, puis en story avec le titre et le domaine incrustés. Le script lit
`src/data/tutorials/` et `src/data/calculators.json` — la donnée reste la seule source
du texte — et n’est jamais importé par le site.

## Ce que l’API impose

Ces quatre points expliquent la forme du script ; ils ne se contournent pas.

- **JPEG uniquement.** Meta télécharge lui-même le média depuis une URL publique, et
  refuse les PNG comme les WebP. D’où les visuels dérivés de `public/images/social/`,
  fabriqués par `--media` et servis par le site déployé.
- **Aucun sticker dans une story.** L’API publie une image nue : ni lien, ni texte, ni
  mention. Le titre et `wikibrico.fr` sont donc incrustés dans le visuel de story.
- **Aucun lien cliquable dans une légende.** L’adresse de la page est écrite en clair,
  sans `https://` qui ne servirait à rien à l’écran (`wikibrico.fr/tutoriel/…`,
  `wikibrico.fr/calculateurs/…`), et sans barre oblique finale, qui ne se lit pas. Elle
  renvoie vers la bio. L’API ne sait pas non plus modifier la bio : si tu veux que le
  lien en bio suive la dernière publication, c’est à la main dans l’application.
- **100 publications par 24 h**, et un jeton qui expire. Un post et une story par jour
  tiennent largement dans le plafond ; le jeton longue durée se renouvelle dans Meta.

## Prérequis

1. Un compte Instagram **professionnel** (Business ou Creator).
2. Une application Meta avec le cas d’usage « Gérer les messages et les contenus sur
   Instagram », le compte ajouté comme testeur, et un jeton portant
   `instagram_business_basic` et `instagram_business_content_publish`.
3. Le jeton dans `.env` (fichier ignoré par git) :

```sh
INSTAGRAM_ACCESS_TOKEN=…
FACEBOOK_PAGE_TOKEN=…       # facultatif, jeton de Page (voir « La Page Facebook »)
SITE_URL=https://wikibrico.fr # facultatif, c’est déjà la valeur par défaut
```

`INSTAGRAM_ACCOUNT_ID` n’est pas nécessaire : un jeton Instagram ne donne accès qu’à son
propre compte, et le script le lit lui-même dans le jeton. Si tu renseignes quand même
cette variable avec un autre identifiant — le tableau de bord Meta en montre un, mais qui
n’est pas celui attendu par la connexion Instagram — le script te prévient et l’ignore.

## Obtenir le jeton

L’application Meta créée pour Instalala fait l’affaire : une application peut publier
sur tout compte professionnel ajouté comme testeur. Sinon, dans le tableau de bord Meta :

1. **Ajouter le cas d’usage.** **Cas d’utilisation → ajouter « Gérer les messages et les
   contenus sur Instagram »**. C’est ce qui fait apparaître une section **Instagram** dans
   le menu de gauche : sans elle, le générateur de jeton est introuvable, et c’est le
   piège le plus courant.
2. Dans **Rôles dans l’application → Testeurs Instagram**, ajouter le compte (le nom
   d’utilisateur Instagram exact, sans `@`). L’invitation s’accepte ensuite **depuis
   l’application Instagram** du compte : Paramètres → Applications et sites web →
   Invitations de testeur.
3. Dans **Instagram → Configuration de l’API avec connexion Instagram** — le panneau qui
   affiche aussi l’URL de rappel et le bouton « Vérifier le token » — ajouter le compte,
   puis **générer un jeton** avec `instagram_business_basic` et
   `instagram_business_content_publish`. Ce jeton dure **une heure** : il sert
   uniquement à en obtenir un durable. Le bouton ne fonctionne qu’une fois l’étape 2
   faite et l’invitation acceptée.
4. Échanger ce jeton contre un jeton de **60 jours** (l’échange demande le secret de
   l’application, visible dans **Paramètres de l’application → Général**) :

```sh
curl -s "https://graph.instagram.com/access_token?grant_type=ig_exchange_token&client_secret=<SECRET_APP>&access_token=<JETON_COURT>"
```

5. Mettre la valeur de `access_token` renvoyée dans `INSTAGRAM_ACCESS_TOKEN`. Le jeton
   renvoie aussi `expires_in` (5 184 000 secondes, soit 60 jours).

Vérifier un jeton sans rien publier :

```sh
curl -s "https://graph.instagram.com/v25.0/me?fields=user_id,username&access_token=<JETON>"
```

Au bout de deux mois, régénérer un jeton. Le rafraîchissement se fait sur
`/refresh_access_token?grant_type=ig_refresh_token` — je ne l’ai pas retrouvé dans la
page de documentation que j’ai pu lire, donc à confirmer dans le tableau de bord ;
au pire, un jeton neuf tous les deux mois fait le travail.
### Si le testeur Instagram n'est pas reconnu

Meta répond `does not resolve to a valid user ID` quand il ne trouve pas le compte
saisi dans **Rôles → Testeurs Instagram**. Trois causes, dans l'ordre où je les
regarderais :

1. **Le chemin direct** est le bouton « Ajouter un compte » du panneau *Configuration de
   l'API avec connexion Instagram* : il ouvre une connexion Instagram et inscrit le
   compte comme testeur au passage, sans qu'on ait à ressaisir un nom nulle part.
2. Dans **Rôles → Testeurs Instagram**, il faut le **nom d'utilisateur Instagram exact**
   — celui affiché sur le profil, sans `@` — et non le nom du site ni un compte
   Facebook : ce champ est partagé entre les rôles Facebook et le rôle Instagram. Le
   compte doit aussi être **professionnel** (Business ou Créateur), l’API ne servant
   qu’aux comptes professionnels.
3. Si l'application est rattachée à un portefeuille Business, la documentation précise
   que les rôles se gèrent **dans le Business Manager**, pas dans le tableau de bord.

Une fois le compte ajouté, l'invitation se refuse ou s'accepte depuis l'application
Instagram du compte concerné : Paramètres → Applications et sites web → Invitations de
testeur.

## Commandes

```sh
pnpm instagram --plan                     # file d’attente, sans réseau
pnpm instagram --compte                   # vérifie les jetons, nomme le compte et la Page
pnpm instagram --dry-run                  # page, légende et URLs, sans publier
pnpm instagram --media --limit 7          # visuels des 7 prochaines pages
pnpm instagram --media --type calculateurs  # les neuf calculateurs d’un coup
pnpm instagram --check                    # visuels de la page à venir en ligne ?
pnpm instagram --check --attendre 10      # … en laissant 10 min à un déploiement
pnpm instagram --publish                  # publie le post puis la story
pnpm instagram --facebook                 # recopie sur la Page ce qui attend
```

Options : `--only <id>` pour viser une page, `--limit <n>` pour en traiter plusieurs,
`--type tutoriels|calculateurs` pour ne traiter qu’une famille, `--hasard` pour tirer au
hasard dans la file plutôt que suivre l’ordre, `--sans-story` pour ne sortir que le post.

## Premier essai

```sh
pnpm instagram --compte                 # le jeton répond, et il nomme le compte
pnpm instagram --media --hasard         # tirer une fiche et préparer ses deux visuels
git add public/images/social && git commit -m "…" && git push   # déployer
pnpm instagram --check --hasard         # les visuels sont-ils en ligne ?
pnpm instagram --dry-run --hasard       # relire la légende
pnpm instagram --publish --hasard       # publier : post puis story
```

Après une publication, `output/instagram/publications.json` a changé : committe-le, il
est la mémoire de l’outil. Avec plusieurs fiches en réserve, `--hasard` peut aussi servir
à `--check` et à `--publish` ; pour un premier essai, `--only <id>` reste plus sûr, on
sait exactement ce qui part.

## Cycle d’une publication

Les visuels se préparent **au fur et à mesure** : par défaut ceux des prochaines fiches
de la file (`--limit 7` pour une semaine d’avance), qu’on committe, qu’on déploie, et sur
lesquels la publication quotidienne tourne ensuite plusieurs jours. C’est ce qui évite de
fabriquer 152 images d’avance pour rien.

Rien n’interdit de tout préparer d’un coup, si tu préfères être tranquille : `pnpm
instagram --media` sans `--limit` traite toute la file non publiée. Compte une vingtaine
de mégaoctets dans le dépôt, servis par le site. Une fiche dont les visuels ne sont pas
encore en ligne n’est simplement pas proposée à la publication : elle attend son tour.

Quand la réserve est épuisée, `--check` le dit et le workflow s’arrête sans échec le temps
d’en préparer d’autres.

**Seules les fiches dont les visuels sont prêts sont proposées** à `--dry-run`, `--check`
et `--publish` : une fiche dont les images n’existent pas encore attend son tour au lieu
de faire échouer la publication. C’est ce qui permet de préparer une semaine d’avance
sans que l’ordre du catalogue soit bousculé.

```sh
pnpm instagram --plan                                 # 1. voir la file
pnpm instagram --media --limit 7                      # 2. préparer une semaine
pnpm build && git add public/images/social && git commit && git push
                                                      # 3. committer et déployer
pnpm instagram --dry-run --only peindre-un-plafond    # 4. relire la légende
pnpm instagram --publish --only peindre-un-plafond    # 5. publier
```

`--publish` vérifie d’abord que chaque visuel répond en `image/jpeg` : si le site n’est
pas déployé, ou si les visuels n’ont pas été fabriqués, la publication s’arrête avec le
message qui dit quoi faire. Rien n’est publié à moitié : l’état est écrit après chaque
étape, donc une coupure ne fait pas republier le post.
## Les deux familles

La file mêle les deux, **un calculateur pour un tutoriel** : les neuf calculateurs passent
donc en un peu plus de deux semaines, puis les tutoriels continuent seuls. Comme trois
tutoriels sont déjà sortis, les calculateurs du début se suivent de près — le temps que
l’alternance se remette d’aplomb.

Les deux ne se ressemblent pas dans le fil, et c’est voulu :

| | Tutoriel | Calculateur |
| --- | --- | --- |
| Post du fil | illustration pleine largeur, en paysage | illustration encadrée d’un filet vert, en portrait 4:5, titre et adresse écrits dans l’image |
| Story | illustration en haut, titre et domaine dans un bandeau sombre | la même carte que le post, en 1080×1920 |
| Légende | « le pas à pas illustré, étape par étape », `#tuto` | « le calculateur, avec le détail du calcul », `#calculateur` |

## Ordre et état

L’ordre est celui des sources : les tutoriels suivent `src/data/categories.json` puis
leurs identifiants, les calculateurs suivent l’ordre du hub de `calculators.json`, et les
deux alternent. `output/instagram/publications.json` note, pour chaque page sortie, la
date, l’identifiant du post, celui de la story et celui de la copie sur la Page
(`facebook`, `null` tant qu’elle n’est pas passée) ; une page déjà présente est sautée,
qu’elle soit un tutoriel ou un calculateur. Supprime une ligne pour la remettre dans la
file.

## Publication quotidienne

`.github/workflows/instagram.yml` publie une fiche par jour, et il n’a besoin d’aucune
préparation préalable. Il commence par regarder si les visuels de la prochaine fiche sont
déjà en ligne :

- **oui** — cas courant, quand une réserve a été préparée d’avance : il publie, puis
  commite l’état.
- **non** — réserve épuisée : il fabrique les deux visuels, les pousse, laisse jusqu’à
  10 minutes au déploiement Netlify pour les servir (`--check --attendre 10`), puis
  publie.

Une seule exécution peut donc générer, déployer et publier d’affilée. Le prix, quand la
réserve est vide, est un commit de robot par jour (les deux visuels, quelques centaines
de kilo-octets) et une à trois minutes d’attente de déploiement.

`.github/workflows/instagram.yml` a besoin d’écrire dans le dépôt
(`permissions: contents: write`, déjà en place) et de deux secrets de dépôt :
`INSTAGRAM_ACCESS_TOKEN`, et `FACEBOOK_PAGE_TOKEN` pour la Page.

Où le mettre, dans GitHub : l’onglet **Settings** du dépôt → **Secrets and variables**
→ **Actions** → section **Repository secrets** → **New repository secret**. Pour ce
dépôt-ci, l’adresse directe est
<https://github.com/les-anes/wiki-brico/settings/secrets/actions>.

Dans cette page, trois sections se ressemblent : *Environment secrets* ne sert qu’aux
jobs qui déclarent un environnement de déploiement (ce n’est pas notre cas),
*Organization secrets* vaut pour plusieurs dépôts, et c’est **Repository secrets**
qu’il faut utiliser. L’onglet *Variables*, à côté de *Secrets*, convient aux valeurs en
clair — le workflow lit `secrets.…`, donc le jeton va bien dans **Secrets**.

## La Page Facebook

Le réglage de crossposting d’Instagram (« Publier aussi sur Facebook ») ne s’applique
qu’aux publications faites **depuis l’application** : l’API Content Publishing n’a aucun
paramètre pour le déclencher, et `/<IG_ID>/media` ne connaît que `share_to_feed`, qui
concerne le fil Instagram. Une publication d’API reste donc sur Instagram, quel que soit
le réglage du compte.

Quand la Page est configurée, le script la publie lui-même : la même fiche part sur
Instagram (fil puis story) **et** sur la Page, avec le visuel du fil et une légende
adaptée. Sur Facebook un lien est cliquable, donc la légende y écrit l’adresse en entier
(`https://wikibrico.fr/tutoriel/<id>`) au lieu de renvoyer à la bio, qui n’existe pas de
ce côté ; les hashtags restent. Si `FACEBOOK_PAGE_TOKEN` manque, la Page est
simplement ignorée, et rien ne change côté Instagram. Le jeton suffit : l’identifiant
de la Page est lu dedans, et `FACEBOOK_PAGE_ID` ne sert qu’à la figer.

### Obtenir le jeton de Page

Le jeton Instagram ne donne accès à rien côté Facebook : il faut un jeton de **Page**,
obtenu avec une connexion Facebook. Un jeton de Page n’existe que si le compte Facebook
qui le demande a un rôle sur cette Page : c’est la seule condition vraiment bloquante, et
elle se règle dans Facebook, pas dans la console développeur.

1. **Vérifier le rôle, et trouver l’identifiant de la Page.** Dans l’application
   Facebook : **Menu → Pages → la Page → Paramètres → Accès à la Page → Rôles**. Le compte
   doit y figurer comme **administrateur** (ou avoir accès aux contenus). L’identifiant de
   la Page se lit sur la Page, dans **À propos → Transparence de la Page**. Si la Page
   appartient à un **portefeuille Business**, c’est dans le Business Manager que le compte
   doit l’avoir en tant qu’actif : ça ne se règle pas depuis la Page elle-même.
2. **Générer un jeton utilisateur** dans
   <https://developers.facebook.com/tools/explorer>, en choisissant l’application et en
   cochant `pages_show_list`, `pages_read_engagement` et `pages_manage_posts`. En mode
   développement, ça suffit pour ses propres Pages : pas d’App Review. Le menu déroulant
   « User or Page » de l’Explorer liste les Pages sur lesquelles le compte a un rôle :
   s’il n’en affiche aucune, l’étape 1 est à reprendre, inutile de continuer.
3. **Échanger ce jeton court contre un jeton utilisateur de 60 jours.** L’ordre compte :
   un jeton de Page tiré d’un jeton court ne vit qu’une heure ou deux.

```sh
curl -s "https://graph.facebook.com/v25.0/oauth/access_token?grant_type=fb_exchange_token&client_id=<APP_ID>&client_secret=<SECRET_APP>&fb_exchange_token=<JETON_COURT>"
```

4. **Lire les Pages de ce compte, avec leurs jetons.** `tasks` dit ce que le compte a le
   droit d’y faire : la réponse doit contenir `CREATE_CONTENT`.

```sh
curl -s "https://graph.facebook.com/v25.0/me/accounts?fields=id,name,tasks,access_token&access_token=<JETON_60J>"
```

5. **Recopier l’`access_token` de la Page** dans `FACEBOOK_PAGE_TOKEN`, et dans les
   secrets du dépôt (`Settings → Secrets and variables → Actions`). L’identifiant n’est
   pas nécessaire : un jeton de Page ne donne accès qu’à la sienne. Un jeton de Page issu
   d’un jeton utilisateur longue durée ne se périme pas tant que celui-ci vit : au bout de
   deux mois, refaire les étapes 2 à 5.

Vérifier sans rien publier — la réponse doit nommer la **Page**, pas le profil :

```sh
pnpm instagram --compte
```

### Si `--compte` nomme ton profil et non la Page

`pnpm instagram --compte` lit la Page **dans le jeton** : un jeton de Page ne donne accès
qu’à la sienne, donc `/me` répond la Page. S’il répond ton nom de profil, le jeton est un
**jeton utilisateur** — celui que l’Explorer affiche en haut de la page.

- **`GET /me/accounts` renvoie `{"data":[]}`** : ce compte n’a de rôle sur aucune Page,
  quelles que soient les permissions accordées (`GET /me/permissions` les liste). Reprendre
  l’étape 1 : soit le rôle manque, soit la Page est dans un portefeuille Business où il
  faut la rattacher au compte.
- **Le portefeuille Business.** C’est le cas quand la Page est un actif de portefeuille :
  `GET /me/accounts` reste alors vide **même avec l’accès total sur la Page**, parce que
  l’application n’est pas rattachée au portefeuille. Dans Business Suite :
  **Paramètres → Comptes → Applications → Ajouter** l’application, puis lui donner accès à
  la Page (**Ajouter des actifs → Pages → Gérer la Page**). Ensuite `GET /me/accounts`
  doit lister la Page. `GET /me/businesses?fields=id,name` (permission
  `business_management`) nomme le portefeuille, et `GET /<portefeuille>/owned_pages?fields=id,name`
  ses Pages. Si Business Suite répond **« Cette application ne vous appartient pas »**,
  c’est que l’application a été créée pour un autre projet : seules les applications dont
  le portefeuille est propriétaire peuvent y être associées. Le dialogue propose alors
  **Créer un nouvel ID d’application**, ce qui en donne une au portefeuille — c’est la
  voie à suivre, et l’Instagram garde la sienne, inchangée. Vérifie aussi, dans le
  sélecteur de portefeuille de Business Suite, que tu travailles bien dans **celui qui
  détient la Page** : deux portefeuilles homonymes cohabitent facilement, et le bon est
  celui dont le compteur d’éléments professionnels n’est pas à zéro.
- **Le jeton d’utilisateur système**, pour ne plus jamais renouveler : Business Suite →
  **Paramètres → Utilisateurs → Utilisateurs système**, attribuer la Page en « Gérer la
  Page », puis **Générer un nouveau jeton** pour l’application avec `pages_manage_posts` et
  `pages_read_engagement`. Attention : `/me` répond alors l’utilisateur système, pas la
  Page — il faut donc renseigner `FACEBOOK_PAGE_ID`, l’identifiant de la Page (Business
  Suite → Comptes → Pages), en plus du jeton.
- **Aucune Page du tout.** Si le compte n’a pas de Page et que le crossposting visait un
  profil personnel, l’API ne peut rien y publier : Graph n’expose plus d’endpoint pour
  publier sur un profil. Il faut créer une Page et y brancher l’Instagram, ou continuer à
  dupliquer les publications à la main dans Business Suite.

### Quand une copie échoue

Une copie ratée — jeton de Page périmé, Page injoignable — n’empêche pas la publication
Instagram : le fil et la story partent, l’erreur s’affiche, et le champ `facebook` de la
fiche reste `null`. C’est ce champ vide qui marque le retard : `pnpm instagram --plan` le
rappelle, et

```sh
pnpm instagram --facebook              # tout ce qui attend
pnpm instagram --facebook --only <id>  # une seule fiche
```

le rattrape. Le compte du retard part de la première copie réussie : les fiches sorties
avant que la Page soit branchée, et celles du jour même de la mise en service, restent
sur Instagram.

```sh
pnpm instagram --compte                       # 1. les deux jetons répondent ?
pnpm instagram --dry-run --only <id>          # 2. relire les deux légendes
pnpm instagram --facebook --only <id>         # 3. recopier une fiche déjà sortie
```

## Ce que l’outil ne fait pas

- Pas de Reels ni de vidéo : les fiches n’en ont pas.
- Pas de carrousel : le post tient sur l’illustration.
- Pas de réponse aux commentaires, ni de statistiques.
- Pas de génération de texte par IA : la légende vient de la fiche, elle est donc
  relue et assumée.
