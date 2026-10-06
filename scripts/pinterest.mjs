#!/usr/bin/env node
/**
 * Épingle les pages WikiBrico sur Pinterest : les tutoriels et les calculateurs,
 * une épingle par page, dans le tableau de sa catégorie. Contrairement à
 * Instagram, chaque épingle porte un lien cliquable vers la page.
 *
 * Ce qui commande ce fichier :
 *   - le visuel part en base64 dans la requête : rien à committer ni à
 *     déployer avant de publier, il se fabrique en mémoire (format 2:3) ;
 *   - le jeton d’accès vit 30 jours, le jeton de rafraîchissement 60 et se
 *     renouvelle à chaque usage : `--publish` rafraîchit tout seul et réécrit
 *     `.env`, donc une tâche cron locale tourne sans navigateur ;
 *   - les tableaux se créent à la main, nommés comme le `shortName` des
 *     catégories : le script les retrouve par leur nom.
 *
 * La lecture des fiches et les gabarits viennent de `instagram.mjs` ; l’état de
 * Pinterest est à part (`output/pinterest/publications.json`), sa file démarre
 * donc avec toutes les pages, sans dépendre de ce qui est déjà sorti ailleurs.
 *
 * Commandes :
 *   --jeton             autorisation dans le navigateur, jetons posés dans .env
 *   --tableaux          tableaux du compte, et catégories qui n’en ont pas
 *   --plan              file d’attente, sans réseau
 *   --dry-run           texte de la prochaine épingle et aperçu du visuel
 *   --publish           publie (une épingle par défaut) et note l’état
 * Options : --only <id>, --limit <n>, --help */

import { randomBytes } from "node:crypto";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import { createServer } from "node:http";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

import {
  adresseDe,
  carteCalculateur,
  cheminImage,
  entrelacer,
  fileDAttente,
  lireCalculateurs,
  lireCategories,
  lireFiches,
  nomDeDomaine,
  poserVariableEnv,
  reperes,
  svgStory,
  trierFiches,
} from "./instagram.mjs";

const SITE = String(process.env.SITE_URL ?? "https://wikibrico.fr").replace(
  /\/+$/,
  "",
);
/** `https://api-sandbox.pinterest.com` si l’accès d’essai refuse la production. */
const HOTE_API = process.env.PINTEREST_API_HOST ?? "https://api.pinterest.com";
const REDIRECTION =
  process.env.PINTEREST_REDIRECT_URI ?? "http://localhost:8085/callback";
/** `boards:write` est exigé pour créer une épingle, même sans créer de tableau. */
const PORTEES =
  "boards:read,boards:write,pins:read,pins:write,user_accounts:read";
const FICHIER_ETAT = new URL(
  "../output/pinterest/publications.json",
  import.meta.url,
);
const FICHIER_ENV = new URL("../.env", import.meta.url);
const LARGEUR = 1080;
const HAUTEUR = 1620;

// ---------------------------------------------------------------------------
// Fonctions pures : texte de l’épingle, tableau, échéance du jeton
// ---------------------------------------------------------------------------

/** Coupe au dernier mot entier sous `maximum` caractères, points de suspension compris. */
export function borner(texte, maximum) {
  const propre = String(texte ?? "").trim();
  if (propre.length <= maximum) return propre;
  const coupe = propre.slice(0, maximum - 1);
  const espace = coupe.lastIndexOf(" ");
  return `${(espace > 0 ? coupe.slice(0, espace) : coupe).trimEnd()}…`;
}

/**
 * Corps de la requête, sans tableau ni média : titre (100 caractères au plus),
 * description sans hashtag (Pinterest les ignore), lien marqué pour l’analytics
 * et texte alternatif tiré de la donnée.
 */
export function epingle(fiche, categorie, site = SITE) {
  const calculateur = fiche.genre === "calculateur";
  const famille = calculateur ? "calculateurs" : "tutoriel";
  const lignes = [fiche.description.trim()];
  const ligneReperes = reperes(fiche);
  if (ligneReperes) lignes.push(ligneReperes);
  lignes.push(
    calculateur
      ? `Le calculateur gratuit, avec le détail du calcul, sur WikiBrico (${categorie}).`
      : `Le pas à pas illustré, étape par étape, sur WikiBrico (${categorie}).`,
  );
  return {
    title: borner(fiche.title, 100),
    description: borner(lignes.join("\n\n"), 500),
    link: `${String(site).replace(/\/+$/, "")}/${famille}/${fiche.id}/?utm_source=pinterest&utm_medium=social`,
    alt_text: borner(fiche.imageAlt || fiche.title, 500),
  };
}

const cle = (nom) =>
  String(nom).trim().normalize("NFC").toLocaleLowerCase("fr");

/** Tableau du compte qui porte le nom de la catégorie, casse et espaces ignorés. */
export function tableauPour(categorie, tableaux) {
  return tableaux.find((tableau) => cle(tableau.name) === cle(categorie));
}

/** À moins de sept jours de l’échéance, ou sans échéance lisible, on rafraîchit. */
export function aRafraichir(expireLe, maintenant = new Date()) {
  const echeance = Date.parse(expireLe ?? "");
  if (Number.isNaN(echeance)) return true;
  return echeance - maintenant.getTime() < 7 * 86_400_000;
}

// ---------------------------------------------------------------------------
// État et .env
// ---------------------------------------------------------------------------

async function lireEtat() {
  try {
    return JSON.parse(await readFile(FICHIER_ETAT, "utf8"));
  } catch {
    return {};
  }
}

async function ecrireEtat(etat) {
  await mkdir(new URL("./", FICHIER_ETAT), { recursive: true });
  await writeFile(FICHIER_ETAT, `${JSON.stringify(etat, null, 2)}\n`, "utf8");
}

/**
 * Pose les variables dans `.env` et dans l’environnement courant. Sans `.env`
 * (tâche hors du dépôt), on prévient : le prochain lancement repartira de
 * l’ancien jeton de rafraîchissement, que Pinterest vient de remplacer.
 */
async function poserJetons(valeurs) {
  for (const [nom, valeur] of Object.entries(valeurs))
    process.env[nom] = valeur;
  const texte = await readFile(FICHIER_ENV, "utf8").catch(() => null);
  if (texte === null) {
    console.warn(
      "Attention : .env introuvable, les nouveaux jetons ne sont pas enregistrés. Pose-les à la main (valeurs non affichées) ou relance --jeton.",
    );
    return;
  }
  let suite = texte;
  for (const [nom, valeur] of Object.entries(valeurs))
    suite = poserVariableEnv(suite, nom, valeur);
  await writeFile(FICHIER_ENV, suite);
}

// ---------------------------------------------------------------------------
// API Pinterest
// ---------------------------------------------------------------------------

function variable(nom) {
  const valeur = process.env[nom];
  if (!valeur)
    throw new Error(
      `${nom} est absent de .env : voir docs/poster-sur-pinterest.md. Lance le script par pnpm pinterest, qui charge .env.`,
    );
  return valeur;
}

async function reponseJson(reponse, etape) {
  const charge = await reponse.json().catch(() => ({}));
  if (!reponse.ok)
    throw new Error(
      `${etape} : ${charge.message ?? reponse.statusText} (HTTP ${reponse.status})`,
    );
  return charge;
}

async function api(chemin, { methode = "GET", corps } = {}) {
  const enTetes = {
    Authorization: `Bearer ${variable("PINTEREST_ACCESS_TOKEN")}`,
  };
  const reponse = await fetch(
    `${HOTE_API}/v5/${chemin}`,
    corps
      ? {
          method: methode,
          headers: { ...enTetes, "Content-Type": "application/json" },
          body: JSON.stringify(corps),
        }
      : { method: methode, headers: enTetes },
  );
  return reponseJson(reponse, `Pinterest (${methode} ${chemin})`);
}

/** Échange un code ou un jeton de rafraîchissement, puis pose les jetons. */
async function demanderJetons(parametres) {
  const identifiants = Buffer.from(
    `${variable("PINTEREST_APP_ID")}:${variable("PINTEREST_APP_SECRET")}`,
  ).toString("base64");
  const reponse = await fetch(`${HOTE_API}/v5/oauth/token`, {
    method: "POST",
    headers: {
      Authorization: `Basic ${identifiants}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams(parametres),
  });
  const charge = await reponseJson(reponse, "Jeton Pinterest");
  if (!charge.access_token)
    throw new Error("Pinterest n’a renvoyé aucun jeton d’accès.");
  const expireLe = new Date(
    Date.now() + (charge.expires_in ?? 0) * 1000,
  ).toISOString();
  await poserJetons({
    PINTEREST_ACCESS_TOKEN: charge.access_token,
    ...(charge.refresh_token
      ? { PINTEREST_REFRESH_TOKEN: charge.refresh_token }
      : {}),
    PINTEREST_ACCESS_EXPIRE: expireLe,
  });
  return expireLe;
}

async function rafraichirSiBesoin() {
  if (!aRafraichir(process.env.PINTEREST_ACCESS_EXPIRE)) return;
  const expireLe = await demanderJetons({
    grant_type: "refresh_token",
    refresh_token: variable("PINTEREST_REFRESH_TOKEN"),
  });
  console.log(`Jeton rafraîchi, valable jusqu’au ${expireLe.slice(0, 10)}.`);
}

async function lireTableaux() {
  const tableaux = [];
  let signet;
  do {
    const parametres = new URLSearchParams({ page_size: "250" });
    if (signet) parametres.set("bookmark", signet);
    const page = await api(`boards?${parametres}`);
    tableaux.push(...(page.items ?? []));
    signet = page.bookmark;
  } while (signet);
  return tableaux;
}

// ---------------------------------------------------------------------------
// Visuel 2:3, fabriqué en mémoire (sharp)
// ---------------------------------------------------------------------------

/**
 * Tutoriel : l’illustration en haut, le titre et le domaine dessous, comme la
 * story Instagram mais au format 2:3 que Pinterest ne recadre pas. Calculateur :
 * sa carte habituelle, à la même taille.
 */
async function visuel(element, categorie) {
  const { default: sharp } = await import("sharp");
  const source = fileURLToPath(cheminImage(element.image));
  if (element.genre === "calculateur") {
    const geometrie = carteCalculateur({
      titre: element.title,
      categorie,
      adresse: adresseDe(element, SITE),
      largeur: LARGEUR,
      hauteur: HAUTEUR,
    });
    const illustration = await sharp(source)
      .resize({ width: geometrie.largeurImage, height: geometrie.hauteurImage })
      .toBuffer();
    return sharp({
      create: {
        width: LARGEUR,
        height: HAUTEUR,
        channels: 3,
        background: "#f8f7f3",
      },
    })
      .composite([
        {
          input: illustration,
          top: geometrie.hautImage,
          left: geometrie.marge,
        },
        { input: Buffer.from(geometrie.svg), top: 0, left: 0 },
      ])
      .jpeg({ quality: 88, mozjpeg: true })
      .toBuffer();
  }
  const illustration = await sharp(source)
    .resize({ width: LARGEUR })
    .toBuffer();
  return sharp({
    create: {
      width: LARGEUR,
      height: HAUTEUR,
      channels: 3,
      background: "#283b20",
    },
  })
    .composite([
      { input: illustration, top: 0, left: 0 },
      {
        input: Buffer.from(
          svgStory({
            titre: element.title,
            categorie,
            domaine: nomDeDomaine(SITE),
            hauteur: HAUTEUR,
          }),
        ),
        top: 0,
        left: 0,
      },
    ])
    .jpeg({ quality: 88, mozjpeg: true })
    .toBuffer();
}

// ---------------------------------------------------------------------------
// Commandes
// ---------------------------------------------------------------------------

const AIDE = `Épingles Pinterest des pages WikiBrico, une par page.

  pnpm pinterest --jeton                    autorisation, jetons posés dans .env
  pnpm pinterest --tableaux                 tableaux trouvés et manquants
  pnpm pinterest --plan                     file d’attente, sans réseau
  pnpm pinterest --dry-run [--only <id>]    texte et aperçu du visuel, sans publier
  pnpm pinterest --publish [--only <id>] [--limit <n>]   une épingle par défaut

Variables : PINTEREST_APP_ID, PINTEREST_APP_SECRET (application), puis
PINTEREST_ACCESS_TOKEN, PINTEREST_REFRESH_TOKEN, PINTEREST_ACCESS_EXPIRE (posés par
--jeton et --publish). Facultatives : PINTEREST_API_HOST, PINTEREST_REDIRECT_URI,
SITE_URL.`;

function lireArguments(argv) {
  const options = {};
  const commandes = new Set([
    "jeton",
    "tableaux",
    "plan",
    "dry-run",
    "publish",
  ]);
  for (let index = 0; index < argv.length; index += 1) {
    const argument = argv[index];
    if (argument.startsWith("--") && commandes.has(argument.slice(2)))
      options.commande = argument.slice(2);
    else if (argument === "--only") options.only = argv[++index];
    else if (argument === "--limit") {
      options.limit = Number(argv[++index]);
      if (!Number.isInteger(options.limit) || options.limit < 1)
        throw new Error("--limit attend un entier positif.");
    } else if (argument === "--help" || argument === "-h")
      options.commande = "aide";
    else throw new Error(`Option inconnue : ${argument} (essaie --help).`);
  }
  return options;
}

async function catalogue() {
  const [fiches, calculateurs, categories] = await Promise.all([
    lireFiches(),
    lireCalculateurs(),
    lireCategories(),
  ]);
  return {
    pages: entrelacer(trierFiches(fiches, categories.ordre), calculateurs),
    categorieDe: (page) => categories.noms.get(page.category) ?? page.category,
    noms: [...categories.noms.values()],
  };
}

/**
 * Ouvre un petit serveur sur l’adresse de redirection, affiche l’URL
 * d’autorisation et attend que Pinterest y renvoie le code. Le `state` aléatoire
 * écarte une réponse qui ne viendrait pas de cette demande.
 */
async function commandeJeton() {
  const etat = randomBytes(16).toString("hex");
  const redirection = new URL(REDIRECTION);
  const autorisation = new URL("https://www.pinterest.com/oauth/");
  autorisation.search = new URLSearchParams({
    client_id: variable("PINTEREST_APP_ID"),
    redirect_uri: REDIRECTION,
    response_type: "code",
    scope: PORTEES,
    state: etat,
  });
  variable("PINTEREST_APP_SECRET");

  const code = await new Promise((resolve, reject) => {
    const serveur = createServer((requete, reponse) => {
      const url = new URL(requete.url ?? "/", REDIRECTION);
      if (url.pathname !== redirection.pathname) {
        reponse.writeHead(404).end();
        return;
      }
      const recu = url.searchParams.get("code");
      const valide = recu && url.searchParams.get("state") === etat;
      reponse
        .writeHead(valide ? 200 : 400, {
          "Content-Type": "text/plain; charset=utf-8",
        })
        .end(
          valide
            ? "Autorisation reçue : retourne dans le terminal."
            : "Réponse refusée.",
        );
      clearTimeout(minuterie);
      serveur.close();
      if (valide) resolve(recu);
      else
        reject(
          new Error(
            `Autorisation refusée : ${url.searchParams.get("error") ?? "state invalide"}.`,
          ),
        );
    });
    const minuterie = setTimeout(() => {
      serveur.close();
      reject(new Error("Aucune autorisation reçue en 5 minutes."));
    }, 5 * 60_000);
    serveur.listen(Number(redirection.port || 80), redirection.hostname, () =>
      console.log(
        `Ouvre cette adresse, connecte-toi et autorise l’application :\n\n${autorisation}\n\nEn attente sur ${REDIRECTION}…`,
      ),
    );
  });

  const expireLe = await demanderJetons({
    grant_type: "authorization_code",
    code,
    redirect_uri: REDIRECTION,
  });
  const compte = await api("user_account");
  console.log(
    `Jetons posés dans .env (valeurs non affichées), accès valable jusqu’au ${expireLe.slice(0, 10)}. Compte : ${compte.username ?? "inconnu"}.`,
  );
}

async function commandeTableaux(noms) {
  await rafraichirSiBesoin();
  const tableaux = await lireTableaux();
  for (const nom of noms) {
    const tableau = tableauPour(nom, tableaux);
    console.log(
      `  ${tableau ? "✓" : "✗"} ${nom}${tableau ? `  (${tableau.id})` : "  — à créer"}`,
    );
  }
}

async function commandePlan(pages, etat, options) {
  const attente = fileDAttente(pages, etat, options);
  console.log(
    attente.length === 0
      ? "Rien à épingler : toutes les pages sont sorties."
      : `${attente.length} page(s) en attente, dans l’ordre :\n\n${attente
          .map((page) => `  ${page.id}  ${page.title}`)
          .join("\n")}`,
  );
}

async function commandeDryRun(pages, categorieDe, etat, options) {
  const [page] = fileDAttente(pages, etat, { ...options, limit: 1 });
  if (!page) {
    console.log("Rien à épingler avec ces critères.");
    return;
  }
  const categorie = categorieDe(page);
  const corps = epingle(page, categorie);
  const apercu = join(tmpdir(), `wikibrico-epingle-${page.id}.jpg`);
  await writeFile(apercu, await visuel(page, categorie));
  console.log(
    `Page : ${page.id}\nTableau : ${categorie}\nLien : ${corps.link}`,
  );
  console.log(
    `\n— Titre —\n${corps.title}\n\n— Description —\n${corps.description}`,
  );
  console.log(
    `\n— Texte alternatif —\n${corps.alt_text}\n\nAperçu : ${apercu}`,
  );
  console.log("\nRien n’a été publié (--dry-run).");
}

async function commandePublish(pages, categorieDe, etat, options) {
  const attente = fileDAttente(pages, etat, { limit: 1, ...options });
  if (attente.length === 0) {
    console.log("Rien à épingler avec ces critères.");
    return;
  }
  await rafraichirSiBesoin();
  const tableaux = await lireTableaux();
  // Tout tableau manquant arrête avant la première épingle : mieux vaut rien
  // que la moitié de la série au mauvais endroit.
  const manquants = [
    ...new Set(
      attente.map(categorieDe).filter((nom) => !tableauPour(nom, tableaux)),
    ),
  ];
  if (manquants.length)
    throw new Error(
      `Tableau(x) introuvable(s) : ${manquants.join(", ")}. Crée-les sur Pinterest avec ce nom exact (pnpm pinterest --tableaux).`,
    );
  for (const page of attente) {
    const categorie = categorieDe(page);
    const tableau = tableauPour(categorie, tableaux);
    const reponse = await api("pins", {
      methode: "POST",
      corps: {
        board_id: tableau.id,
        ...epingle(page, categorie),
        media_source: {
          source_type: "image_base64",
          content_type: "image/jpeg",
          data: (await visuel(page, categorie)).toString("base64"),
        },
      },
    });
    etat[page.id] = {
      titre: page.title,
      publieLe: new Date().toISOString().slice(0, 10),
      epingle: reponse.id,
      tableau: tableau.id,
    };
    // Écrit après chaque épingle : une coupure ne fait pas republier.
    await ecrireEtat(etat);
    console.log(
      `Épinglé : ${page.title} (${reponse.id}) dans « ${categorie} ».`,
    );
  }
  console.log(
    "\nÉtat : output/pinterest/publications.json — committe ce fichier pour garder la liste à jour.",
  );
}

async function main(argv) {
  const options = lireArguments(argv);
  if (!options.commande || options.commande === "aide") {
    console.log(AIDE);
    return;
  }
  if (options.commande === "jeton") return commandeJeton();
  const [{ pages, categorieDe, noms }, etat] = await Promise.all([
    catalogue(),
    lireEtat(),
  ]);
  if (options.commande === "tableaux") return commandeTableaux(noms);
  if (options.commande === "plan") return commandePlan(pages, etat, options);
  if (options.commande === "dry-run")
    return commandeDryRun(pages, categorieDe, etat, options);
  return commandePublish(pages, categorieDe, etat, options);
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href)
  main(process.argv.slice(2)).catch((erreur) => {
    console.error(erreur.message);
    process.exitCode = 1;
  });
