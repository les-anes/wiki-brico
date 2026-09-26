# Publier un tutoriel sur Instagram

`scripts/instagram.mjs` sort les tutoriels du catalogue sur Instagram : l’illustration
en post du fil, avec une légende construite depuis la fiche, puis la même illustration
en story avec le titre et le domaine incrustés. Le script lit `src/data/tutorials/` —
la fiche reste la seule source du texte — et n’est jamais importé par le site.

## Ce que l’API impose

Ces quatre points expliquent la forme du script ; ils ne se contournent pas.

- **JPEG uniquement.** Meta télécharge lui-même le média depuis une URL publique, et
  refuse les PNG comme les WebP. D’où les visuels dérivés de `public/images/social/`,
  fabriqués par `--media` et servis par le site déployé.
- **Aucun sticker dans une story.** L’API publie une image nue : ni lien, ni texte, ni
  mention. Le titre et `wikibrico.fr` sont donc incrustés dans le visuel de story.
- **Aucun lien cliquable dans une légende.** L’adresse du tutoriel est écrite en clair,
  sans `https://` qui ne servirait à rien à l’écran (`wikibrico.fr/tutoriel/…`), et
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
pnpm instagram --compte                   # vérifie le jeton et nomme le compte
pnpm instagram --dry-run                  # fiche, légende et URLs, sans publier
pnpm instagram --media --limit 7          # visuels des 7 prochaines fiches
pnpm instagram --check                    # visuels de la fiche à venir en ligne ?
pnpm instagram --publish                  # publie le post puis la story
```

Options : `--only <id>` pour viser une fiche, `--limit <n>` pour en traiter plusieurs,
`--hasard` pour tirer au hasard dans la file plutôt que suivre le catalogue,
`--sans-story` pour ne sortir que le post.

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

Les visuels se préparent **au fur et à mesure**, jamais les 152 d’un coup : on prépare
les visuels des prochaines fiches de la file, on les committe, on déploie, et la
publication quotidienne peut tourner plusieurs jours dessus. Quand la réserve est
épuisée, `--check` le dit et le workflow s’arrête sans échec le temps d’en préparer
d’autres.

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
## Ordre et état

L’ordre est celui du catalogue : catégories dans l’ordre de `src/data/categories.json`,
puis identifiants. `output/instagram/publications.json` note, pour chaque fiche sortie,
la date, l’identifiant du post et celui de la story ; une fiche déjà présente est
sautée. Supprime une ligne pour la remettre dans la file.

## Publication quotidienne

`.github/workflows/instagram.yml` publie une fiche par jour et enregistre l’état dans
le dépôt. Il faut créer **un seul secret de dépôt** : `INSTAGRAM_ACCESS_TOKEN`. Le
déclenchement manuel du workflow accepte un nombre de fiches à publier.

Où le mettre, dans GitHub : l’onglet **Settings** du dépôt → **Secrets and variables**
→ **Actions** → section **Repository secrets** → **New repository secret**. Pour ce
dépôt-ci, l’adresse directe est
<https://github.com/les-anes/wiki-brico/settings/secrets/actions>.

Dans cette page, trois sections se ressemblent : *Environment secrets* ne sert qu’aux
jobs qui déclarent un environnement de déploiement (ce n’est pas notre cas),
*Organization secrets* vaut pour plusieurs dépôts, et c’est **Repository secrets**
qu’il faut utiliser. L’onglet *Variables*, à côté de *Secrets*, convient aux valeurs en
clair — le workflow lit `secrets.…`, donc le jeton va bien dans **Secrets**.

## Ce que l’outil ne fait pas

- Pas de Reels ni de vidéo : les fiches n’en ont pas.
- Pas de carrousel : le post tient sur l’illustration.
- Pas de réponse aux commentaires, ni de statistiques.
- Pas de génération de texte par IA : la légende vient de la fiche, elle est donc
  relue et assumée.
