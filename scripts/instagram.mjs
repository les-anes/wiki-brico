#!/usr/bin/env node
/**
 * Publie les tutoriels WikiBrico sur Instagram : l’illustration en post, avec
 * une légende construite depuis la fiche, puis la même illustration en story
 * avec le titre et le domaine incrustés.
 *
 * Contraintes de l’API officielle, qui commandent ce fichier :
 *   - le média doit être un JPEG hébergé sur un serveur public, Meta le
 *     télécharge lui-même (PNG et WebP ne passent pas) ;
 *   - une story publiée par API ne peut porter ni sticker ni lien : le titre et
 *     le domaine sont donc incrustés dans l’image par `--media` ;
 *   - une légende n’a pas de lien cliquable : l’URL du tutoriel est écrite en
 *     clair et renvoie vers la bio.
 *
 * Rien de tout cela n’entre dans le site statique : ce script lit les fiches et
 * n’est jamais importé par l’application.
 *
 * Commandes :
 *   --plan              liste la file d’attente, sans réseau
 *   --dry-run           montre la fiche, la légende et les URLs, sans publier
 *   --media             fabrique les JPEG de `public/images/social/` (sharp)
 *   --publish           publie le post puis la story, et note l’état
 * Options : --only <id>, --limit <n>, --sans-story, --help */

import { access, mkdir, readFile, readdir, writeFile } from "node:fs/promises";
import { fileURLToPath, pathToFileURL } from "node:url";

const DOSSIER_FICHES = new URL("../src/data/tutorials/", import.meta.url);
const DOSSIER_SOCIAL = new URL("../public/images/social/", import.meta.url);
const FICHIER_ETAT = new URL(
  "../output/instagram/publications.json",
  import.meta.url,
);
const FICHIER_CATEGORIES = new URL(
  "../src/data/categories.json",
  import.meta.url,
);

const SITE = origine(process.env.SITE_URL ?? "https://wikibrico.fr");
const VERSION_API = process.env.INSTAGRAM_GRAPH_VERSION ?? "v25.0";
const HOTE_API = "https://graph.instagram.com";
/** L’API accepte 100 publications par 24 h ; au-delà, mieux vaut étaler. */
const PLAFOND_QUOTIDIEN = 100;

// ---------------------------------------------------------------------------
// Fonctions pures : fichier d’attente, légende, noms de fichiers, gabarit
// ---------------------------------------------------------------------------

/** Produit social d’une fiche : le post du fil, puis la story. */
export const TYPES_MEDIA = ["fil", "story"];

/** Origine du site sans barre oblique finale : les URLs sont bâties à la main. */
function origine(site) {
  return String(site).replace(/\/+$/, "");
}

/** Nom de fichier du visuel dérivé, tel qu’il sera servi par le site. */
export function nomImage(id, type) {
  return `${id}-${type}.jpg`;
}

/** URL publique d’un visuel dérivé : Meta la télécharge lui-même. */
export function urlPublique(nom, site = SITE) {
  return `${origine(site)}/images/social/${nom}`;
}

/**
 * Nom du domaine tel qu’on l’écrit à un lecteur : sans `https://` ni `www.`.
 * Instagram n’en fait rien de cliquable, alors autant que ce soit lisible.
 */
export function nomDeDomaine(site = SITE) {
  return new URL(site).host.replace(/^www\./, "");
}

/** Adresse du tutoriel, écrite sans schéma, pour la légende. */
export function adresseTutoriel(id, site = SITE) {
  return `${nomDeDomaine(site)}/tutoriel/${id}/`;
}

/** Durée lisible : « 2 h », « 1 h 30 », « 45 min », rien sous la minute. */
export function dureeLisible(minutes) {
  if (typeof minutes !== "number" || !Number.isFinite(minutes) || minutes <= 0)
    return null;
  if (minutes < 60) return `${Math.round(minutes)} min`;
  const heures = Math.floor(minutes / 60);
  const reste = Math.round(minutes - heures * 60);
  return reste === 0 ? `${heures} h` : `${heures} h ${reste}`;
}

/**
 * Étiquette d’hashtag : minuscules, sans accent ni ponctuation. Les accents sont
 * retirés parce qu’une recherche Instagram se fait presque toujours sans eux.
 */
export function etiquette(valeur) {
  return String(valeur)
    .replace(/[\u0153\u0152]/g, "oe")
    .replace(/[\u00e6\u00c6]/g, "ae")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "");
}

/** Dernier mot d’un nom de catégorie : « Gros œuvre » donne « œuvre ». */
export function motDeCategorie(categorie) {
  return (
    String(categorie ?? "")
      .trim()
      .split(/\s+/)
      .at(-1) ?? ""
  );
}

/**
 * Hashtags de la fiche : ses tags, la catégorie et la marque, dédoublonnés et
 * bornés — une légende qui en porte quinze se lit moins bien qu’une qui en
 * porte huit.
 */
export function hashtags(fiche, categorie, maximum = 8) {
  const bruts = [
    ...(Array.isArray(fiche.tags) ? fiche.tags : []),
    motDeCategorie(categorie),
    "bricolage",
    "tuto",
    "wikibrico",
  ];
  const vus = new Set();
  for (const brut of bruts) {
    const propre = etiquette(brut ?? "");
    if (propre.length >= 3) vus.add(propre);
  }
  return [...vus].slice(0, maximum).map((mot) => `#${mot}`);
}

/** Ligne de repères : durée, budget, niveau, selon ce que la fiche renseigne. */
export function reperes(fiche) {
  const morceaux = [];
  const duree = dureeLisible(fiche.durationMinutes);
  if (duree) morceaux.push(`Temps : ${duree}`);
  if (typeof fiche.cost === "string" && fiche.cost.trim())
    morceaux.push(`Budget : ${fiche.cost.trim()}`);
  if (typeof fiche.difficulty === "string" && fiche.difficulty.trim())
    morceaux.push(`Niveau : ${fiche.difficulty.trim().toLowerCase()}`);
  return morceaux.join(" · ");
}

/** Légende du post : accroche, description, repères, lien et hashtags. */
export function legende(fiche, categorie, site = SITE) {
  const lignes = [fiche.title.trim(), "", fiche.description.trim()];
  const ligneReperes = reperes(fiche);
  if (ligneReperes) lignes.push("", ligneReperes);
  lignes.push(
    "",
    `Le pas à pas illustré, étape par étape : ${adresseTutoriel(fiche.id, site)}`,
    "Le lien est aussi dans la bio.",
    "",
    hashtags(fiche, categorie).join(" "),
  );
  return lignes.join("\n");
}

/** Mélange une liste, pour tirer une fiche au hasard au lieu de suivre l’ordre. */
export function melanger(liste, alea = Math.random) {
  const copie = [...liste];
  for (let index = copie.length - 1; index > 0; index -= 1) {
    const tirage = Math.min(Math.floor(alea() * (index + 1)), index);
    [copie[index], copie[tirage]] = [copie[tirage], copie[index]];
  }
  return copie;
}

/** Fiches à publier : dans l’ordre du catalogue, sans celles déjà publiées. */
export function fileDAttente(
  fiches,
  publies,
  { only, limit, hasard, alea = Math.random } = {},
) {
  if (only) return fiches.filter((fiche) => fiche.id === only);
  const restantes = fiches.filter((fiche) => !(fiche.id in publies));
  // Au hasard : une fiche par défaut, ou autant que demandé, mais toujours
  // parmi celles qui ne sont pas encore sorties.
  const ordonnees = hasard ? melanger(restantes, alea) : restantes;
  if (hasard) return ordonnees.slice(0, typeof limit === "number" ? limit : 1);
  return typeof limit === "number" ? ordonnees.slice(0, limit) : ordonnees;
}

/** Ordre du catalogue : catégories puis fiches, comme sur le site. */
export function trierFiches(fiches, ordreCategories) {
  const rang = new Map(ordreCategories.map((id, index) => [id, index]));
  return fiches.toSorted(
    (a, b) =>
      (rang.get(a.category) ?? ordreCategories.length) -
        (rang.get(b.category) ?? ordreCategories.length) ||
      a.id.localeCompare(b.id, "fr"),
  );
}

/** Découpe un titre en lignes d’au plus `largeur` caractères, sans couper un mot. */
export function decouperTitre(titre, largeur = 20) {
  const lignes = [];
  let courante = "";
  for (const mot of titre.trim().split(/\s+/)) {
    const essai = courante ? `${courante} ${mot}` : mot;
    if (essai.length <= largeur || !courante) courante = essai;
    else {
      lignes.push(courante);
      courante = mot;
    }
  }
  if (courante) lignes.push(courante);
  return lignes;
}

/** Échappe le texte destiné à un SVG (titres à apostrophes et esperluettes). */
export function echapperXml(texte) {
  return String(texte)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

/**
 * Bas de l’illustration dans la story : les visuels du catalogue font
 * 1536×1024, donc 1080×720 une fois ramenés à la largeur de la story.
 */
const BAS_ILLUSTRATION = 720;

/**
 * Calque texte de la story : titre sur fond sombre et adresse du site. Les
 * repères de l’API interdisant tout sticker, c’est la seule façon d’y voir le
 * nom du domaine. Le titre se centre entre l’illustration et le filet, pour que
 * la composition tienne avec un titre court comme avec un titre long.
 */
export function svgStory({
  titre,
  categorie,
  domaine,
  largeur = 1080,
  hauteur = 1920,
}) {
  const lignes = decouperTitre(titre);
  const taille = lignes.length > 3 ? 52 : 64;
  const interligne = taille * 1.3;
  const yRegle = hauteur - 380;
  const centre = (BAS_ILLUSTRATION + yRegle) / 2;
  const debut = centre - ((lignes.length - 1) * interligne) / 2;
  const textes = lignes
    .map(
      (ligne, index) =>
        `<text x="${largeur / 2}" y="${debut + index * interligne}" text-anchor="middle" font-family="Helvetica, Arial, sans-serif" font-size="${taille}" font-weight="700" fill="#fdfcf8">${echapperXml(ligne)}</text>`,
    )
    .join("");
  return [
    `<svg xmlns="http://www.w3.org/2000/svg" width="${largeur}" height="${hauteur}">`,
    textes,
    `<line x1="${largeur * 0.13}" y1="${yRegle}" x2="${largeur * 0.87}" y2="${yRegle}" stroke="#7b8a6c" stroke-width="3" />`,
    `<text x="${largeur / 2}" y="${yRegle + 90}" text-anchor="middle" font-family="Helvetica, Arial, sans-serif" font-size="56" font-weight="700" fill="#e2c37f">${echapperXml(domaine)}</text>`,
    `<text x="${largeur / 2}" y="${yRegle + 170}" text-anchor="middle" font-family="Helvetica, Arial, sans-serif" font-size="40" fill="#c6cdb6">${echapperXml(categorie)}</text>`,
    "</svg>",
  ].join("");
}

// ---------------------------------------------------------------------------
// Lecture du dépôt
// ---------------------------------------------------------------------------

async function lireJson(url) {
  return JSON.parse(await readFile(url, "utf8"));
}

async function lireFiches() {
  const chemins = [];
  const parcourir = async (dossier) => {
    for (const entree of await readdir(dossier, { withFileTypes: true })) {
      const url = new URL(
        `${entree.name}${entree.isDirectory() ? "/" : ""}`,
        dossier,
      );
      if (entree.isDirectory()) await parcourir(url);
      else if (entree.name.endsWith(".json")) chemins.push(url);
    }
  };
  await parcourir(DOSSIER_FICHES);
  const fiches = await Promise.all(chemins.map((chemin) => lireJson(chemin)));
  return fiches.filter((fiche) => fiche.status !== "draft");
}

async function lireCategories() {
  const categories = await lireJson(FICHIER_CATEGORIES);
  return {
    ordre: categories.map((categorie) => categorie.id),
    noms: new Map(
      categories.map((categorie) => [
        categorie.id,
        categorie.shortName ?? categorie.name ?? categorie.id,
      ]),
    ),
  };
}

async function lireEtat() {
  try {
    return await lireJson(FICHIER_ETAT);
  } catch {
    return {};
  }
}

async function ecrireEtat(etat) {
  await mkdir(new URL("./", FICHIER_ETAT), { recursive: true });
  await writeFile(FICHIER_ETAT, `${JSON.stringify(etat, null, 2)}\n`, "utf8");
}

async function fichierExiste(url) {
  try {
    await access(url);
    return true;
  } catch {
    return false;
  }
}

// ---------------------------------------------------------------------------
// Visuels dérivés (sharp, chargé seulement quand on en a besoin)
// ---------------------------------------------------------------------------

/**
 * Fabrique les deux JPEG d’une fiche : la vignette du fil (illustration
 * entière, 1080 de large) et la story composée. Sans ce passage, rien n’est
 * publiable : l’API refuse les PNG.
 */
async function fabriquerMedias(fiche, categorie) {
  const { default: sharp } = await import("sharp");
  const source = fileURLToPath(
    new URL(`../public/images/tutoriels/${fiche.id}.png`, import.meta.url),
  );
  await mkdir(DOSSIER_SOCIAL, { recursive: true });
  const fil = new URL(nomImage(fiche.id, "fil"), DOSSIER_SOCIAL);
  const story = new URL(nomImage(fiche.id, "story"), DOSSIER_SOCIAL);

  await sharp(source)
    .resize({ width: 1080, withoutEnlargement: false })
    .jpeg({ quality: 84, mozjpeg: true })
    .toFile(fileURLToPath(fil));

  const illustration = await sharp(source)
    .resize({ width: 1080 })
    .jpeg({ quality: 84, mozjpeg: true })
    .toBuffer();

  await sharp({
    create: {
      width: 1080,
      height: 1920,
      channels: 3,
      background: "#283b20",
    },
  })
    .composite([
      { input: illustration, top: 0, left: 0 },
      {
        input: Buffer.from(
          svgStory({
            titre: fiche.title,
            categorie,
            domaine: nomDeDomaine(SITE),
            hauteur: 1920,
          }),
        ),
        top: 0,
        left: 0,
      },
    ])
    .jpeg({ quality: 88, mozjpeg: true })
    .toFile(fileURLToPath(story));

  return { fil: fileURLToPath(fil), story: fileURLToPath(story) };
}

// ---------------------------------------------------------------------------
// API Instagram
// ---------------------------------------------------------------------------

function apiUrl(ressource) {
  return new URL(`${HOTE_API}/${VERSION_API}/${ressource}`);
}

function jeton() {
  const valeur = process.env.INSTAGRAM_ACCESS_TOKEN;
  if (!valeur)
    throw new Error(
      "INSTAGRAM_ACCESS_TOKEN est absent : ajoute le jeton longue durée dans .env en local (ou dans les secrets du dépôt GitHub pour l’action quotidienne). Si tu as lancé node scripts/instagram.mjs directement, passe plutôt par pnpm instagram, qui charge .env.",
    );
  return valeur;
}

async function reponseJson(reponse, etape) {
  const charge = await reponse.json().catch(() => ({}));
  if (!reponse.ok || charge.error)
    throw new Error(
      `${etape} : ${charge.error?.message ?? reponse.statusText}`,
    );
  return charge;
}

/**
 * Compte visé, lu dans le jeton : c’est la seule source fiable, un jeton
 * Instagram ne donnant accès qu’à son propre compte. `INSTAGRAM_ACCOUNT_ID`
 * n’est conservé que pour prévenir s’il désigne autre chose.
 */
async function compteInstagram() {
  const url = apiUrl("me");
  url.search = new URLSearchParams({
    fields: "user_id,username",
    access_token: jeton(),
  });
  const charge = await reponseJson(await fetch(url), "Compte Instagram");
  const identifiant = charge.user_id ?? charge.id;
  if (!identifiant)
    throw new Error("Instagram n’a renvoyé aucun identifiant de compte.");
  return { id: String(identifiant), username: charge.username ?? null };
}

/** Signale un INSTAGRAM_ACCOUNT_ID qui ne correspond pas au jeton. */
function verifierIdentifiantConfigure(compte) {
  const configure = process.env.INSTAGRAM_ACCOUNT_ID;
  if (configure && configure !== compte.id)
    console.warn(
      `Attention : INSTAGRAM_ACCOUNT_ID vaut ${configure}, alors que le jeton appartient au compte ${compte.id}. La variable est ignorée (le jeton fait foi) ; supprime-la pour éviter la confusion.`,
    );
}

/** Fiches dont les deux visuels sont déjà fabriqués : elles seules se publient. */
async function avecVisuels(fiches) {
  const pretes = [];
  for (const fiche of fiches) {
    const presents = await Promise.all(
      TYPES_MEDIA.map((type) =>
        fichierExiste(new URL(nomImage(fiche.id, type), DOSSIER_SOCIAL)),
      ),
    );
    if (presents.every(Boolean)) pretes.push(fiche);
  }
  return pretes;
}

async function appelApi(compte, ressource, parametres) {
  const corps = new URLSearchParams({
    ...parametres,
    access_token: jeton(),
  });
  const reponse = await fetch(apiUrl(`${compte}/${ressource}`), {
    method: "POST",
    body: corps,
  });
  return reponseJson(reponse, `Instagram (${ressource})`);
}

/** Meta prépare le média avant publication : on attend le statut. */
async function attendreConteneur(conteneur) {
  for (let essai = 1; essai <= 10; essai += 1) {
    const url = apiUrl(conteneur);
    url.search = new URLSearchParams({
      fields: "status_code,status",
      access_token: jeton(),
    });
    const charge = await reponseJson(await fetch(url), "Statut du média");
    if (charge.status_code === "FINISHED") return;
    if (charge.status_code === "ERROR" || charge.status_code === "EXPIRED")
      throw new Error(
        `Instagram n’a pas pu préparer le média : ${charge.status ?? charge.status_code}`,
      );
    await new Promise((suite) => setTimeout(suite, 5_000));
  }
  throw new Error("Instagram n’a pas préparé le média dans le délai attendu.");
}

/**
 * Vérifie que Meta pourra télécharger le média. Le corps est annulé dès les
 * en-têtes lus : inutile de rapatrier deux mégaoctets pour un contrôle.
 */
async function verifierMediaPublic(url) {
  const reponse = await fetch(url, { redirect: "follow" });
  const type = reponse.headers.get("content-type") ?? "";
  await reponse.body?.cancel().catch(() => {});
  if (!reponse.ok)
    throw new Error(`Visuel injoignable (${reponse.status}) : ${url}`);
  if (!type.startsWith("image/jpeg"))
    throw new Error(
      `Le visuel n’est pas un JPEG (${type || "type inconnu"}) : ${url}`,
    );
}

/**
 * Attend qu’un visuel soit servi par le site, le temps qu’un déploiement passe.
 * C’est ce qui permet à une seule exécution de fabriquer les images, de les
 * pousser puis de publier, sans intervention entre les deux.
 */
async function attendreMediaPublic(url, minutes) {
  const fin = Date.now() + minutes * 60_000;
  let essai = 0;
  for (;;) {
    essai += 1;
    try {
      await verifierMediaPublic(url);
      if (essai > 1)
        console.log(`Visuel en ligne après ${essai} tentative(s).`);
      return;
    } catch (erreur) {
      if (Date.now() >= fin)
        throw new Error(
          `${erreur.message}\nDéploiement non constaté après ${minutes} min : le site sert-il bien public/images/social/ ?`,
          { cause: erreur },
        );
      console.log(
        `Pas encore en ligne (essai ${essai}) : ${url} — nouvelle tentative dans 15 s.`,
      );
      await new Promise((suite) => setTimeout(suite, 15_000));
    }
  }
}

async function publierFil(compte, fiche, categorie) {
  const conteneur = await appelApi(compte, "media", {
    image_url: urlPublique(nomImage(fiche.id, "fil")),
    caption: legende(fiche, categorie),
    alt_text: String(fiche.imageAlt ?? fiche.title).slice(0, 1000),
  });
  await attendreConteneur(conteneur.id);
  return appelApi(compte, "media_publish", { creation_id: conteneur.id });
}

async function publierStory(compte, fiche) {
  const conteneur = await appelApi(compte, "media", {
    media_type: "STORIES",
    image_url: urlPublique(nomImage(fiche.id, "story")),
  });
  await attendreConteneur(conteneur.id);
  return appelApi(compte, "media_publish", { creation_id: conteneur.id });
}

// ---------------------------------------------------------------------------
// Commandes
// ---------------------------------------------------------------------------

const AIDE = `Publication des tutoriels WikiBrico sur Instagram.

  pnpm instagram --plan                     file d’attente, sans réseau
  pnpm instagram --compte                   vérifie le jeton et nomme le compte
  pnpm instagram --dry-run [--only <id>]    fiche, légende et URLs, sans publier
  pnpm instagram --media [--limit <n>]      visuels des <n> prochaines fiches
  pnpm instagram --check [--only <id>]      visuels de la fiche à venir en ligne ?
  pnpm instagram --check --attendre 10      … en laissant 10 min à un déploiement
  pnpm instagram --publish [--only <id>] [--limit <n>] [--sans-story]

Option : --hasard tire une fiche au hasard (dont les visuels sont prêts, pour
--dry-run et --publish) au lieu de suivre l’ordre du catalogue.

Variables d’environnement : INSTAGRAM_ACCESS_TOKEN (obligatoire pour publier),
INSTAGRAM_ACCOUNT_ID (facultatif), INSTAGRAM_GRAPH_VERSION, SITE_URL.`;

function lireArguments(argv) {
  const options = { sansStory: false };
  for (let index = 0; index < argv.length; index += 1) {
    const argument = argv[index];
    if (argument === "--plan") options.commande = "plan";
    else if (argument === "--dry-run") options.commande = "dry-run";
    else if (argument === "--media") options.commande = "media";
    else if (argument === "--check") options.commande = "check";
    else if (argument === "--compte") options.commande = "compte";
    else if (argument === "--hasard") options.hasard = true;
    else if (argument === "--attendre")
      options.attendre = Number(argv[++index]);
    else if (argument === "--publish") options.commande = "publish";
    else if (argument === "--help" || argument === "-h")
      options.commande = "aide";
    else if (argument === "--sans-story") options.sansStory = true;
    else if (argument === "--only") options.only = argv[++index];
    else if (argument === "--limit") options.limit = Number(argv[++index]);
    else throw new Error(`Option inconnue : ${argument} (essaie --help).`);
  }
  return options;
}

async function contexte() {
  const [fiches, categories, etat] = await Promise.all([
    lireFiches(),
    lireCategories(),
    lireEtat(),
  ]);
  return {
    fiches: trierFiches(fiches, categories.ordre),
    categorieDe: (fiche) =>
      categories.noms.get(fiche.category) ?? fiche.category,
    etat,
  };
}

async function commandePlan(fichiers, publies, options) {
  const attente = fileDAttente(fichiers, publies, options);
  if (attente.length === 0) {
    console.log("Rien à publier : toutes les fiches de la file sont sorties.");
    return;
  }
  console.log(`${attente.length} fiche(s) en attente, dans l’ordre :\n`);
  for (const fiche of attente)
    console.log(
      `  ${fiche.id}  ${fiche.title}${fiche.image ? "" : "  (sans image)"}`,
    );
  const restantes = attente.length - 1;
  if (restantes > 0)
    console.log(`\n${restantes} autres suivront. Rien n’a été publié.`);
}

/**
 * Fiches que la commande peut traiter : on ne propose que ce qui est publiable,
 * c’est-à-dire ce dont les visuels existent déjà sur le disque. Une fiche peut
 * donc attendre son tour le temps qu’on prépare ses images.
 */
async function fileDuTravail(fichiers, publies, options) {
  const attente = fileDAttente(await avecVisuels(fichiers), publies, options);
  const rienAPublier = fileDAttente(fichiers, publies, options).length === 0;
  return { attente, rienAPublier };
}

/** Message quand la file ne donne rien : dire laquelle des deux causes c’est. */
function rienAFaire(rienAPublier) {
  return rienAPublier
    ? "Aucune fiche à publier avec ces critères."
    : "Aucun visuel prêt : lance pnpm instagram --media --limit 1 (ou --limit 7 pour une semaine) avant de publier.";
}

async function commandeDryRun(fichiers, categorieDe, publies, options) {
  const { attente, rienAPublier } = await fileDuTravail(
    fichiers,
    publies,
    options,
  );
  const fiche = attente[0];
  if (!fiche) {
    console.log(rienAFaire(rienAPublier));
    return;
  }
  const categorie = categorieDe(fiche);
  console.log(`Fiche : ${fiche.id} — ${fiche.title}`);
  console.log(`Catégorie : ${categorie}`);
  console.log(`Post  : ${urlPublique(nomImage(fiche.id, "fil"))}`);
  if (!options.sansStory)
    console.log(`Story : ${urlPublique(nomImage(fiche.id, "story"))}`);
  const absents = [];
  for (const type of options.sansStory ? ["fil"] : TYPES_MEDIA)
    if (
      !(await fichierExiste(new URL(nomImage(fiche.id, type), DOSSIER_SOCIAL)))
    )
      absents.push(type);
  if (absents.length)
    console.log(
      `\nVisuels manquants (${absents.join(", ")}) : lance pnpm instagram --media${options.only ? ` --only ${fiche.id}` : ""} puis déploie le site.`,
    );
  console.log(`\n— Légende —\n${legende(fiche, categorie)}\n`);
  console.log("Rien n’a été publié (--dry-run).");
}

async function commandeMedia(fichiers, categorieDe, publies, options) {
  // Les visuels se préparent au fur et à mesure : par défaut ceux des prochaines
  // fiches de la file, jamais tout le catalogue d’un coup.
  const choisies = fileDAttente(fichiers, publies, options).filter(
    (fiche) => fiche.image,
  );
  let fabriquees = 0;
  for (const fiche of choisies) {
    const { story } = await fabriquerMedias(fiche, categorieDe(fiche));
    fabriquees += 1;
    console.log(
      `Visuels écrits : ${nomImage(fiche.id, "fil")} et ${story.split("/").at(-1)}`,
    );
  }
  console.log(
    `\n${fabriquees} fiche(s) traitée(s) dans public/images/social/. Committe ces visuels et déploie le site : Meta les télécharge depuis l’URL publique.`,
  );
}

/** Contrôle sans jeton que les visuels de la prochaine fiche sont en ligne. */
async function commandeVerifier(fichiers, publies, options) {
  const { attente, rienAPublier } = await fileDuTravail(
    fichiers,
    publies,
    options,
  );
  const fiche = attente[0];
  if (!fiche) {
    console.log(rienAFaire(rienAPublier));
    return;
  }
  // --attendre laisse au déploiement le temps de servir les visuels qu’on vient
  // de pousser : c’est ce qui rend l’action quotidienne autonome.
  const verifier = (url) =>
    options.attendre > 0
      ? attendreMediaPublic(url, options.attendre)
      : verifierMediaPublic(url);
  await verifier(urlPublique(nomImage(fiche.id, "fil")));
  await verifier(urlPublique(nomImage(fiche.id, "story")));
  console.log(`Visuels en ligne pour ${fiche.id}.`);
}

/** Vérifie le jeton et nomme le compte visé, sans rien publier. */
async function commandeCompte() {
  const compte = await compteInstagram();
  verifierIdentifiantConfigure(compte);
  console.log(
    `Jeton valide pour @${compte.username ?? "inconnu"} (compte ${compte.id}).`,
  );
}

async function commandePublish(fichiers, categorieDe, etat, options) {
  const { attente, rienAPublier } = await fileDuTravail(
    fichiers,
    etat,
    options,
  );
  if (attente.length === 0) {
    console.log(rienAFaire(rienAPublier));
    return;
  }
  if (attente.length > PLAFOND_QUOTIDIEN)
    throw new Error(
      `Instagram plafonne à ${PLAFOND_QUOTIDIEN} publications par 24 h : réduis avec --limit.`,
    );
  const compte = await compteInstagram();
  verifierIdentifiantConfigure(compte);
  let publiees = 0;
  for (const fiche of attente) {
    const categorie = categorieDe(fiche);
    const types = options.sansStory ? ["fil"] : TYPES_MEDIA;
    for (const type of types)
      await verifierMediaPublic(urlPublique(nomImage(fiche.id, type))).catch(
        (erreur) => {
          throw new Error(
            `${erreur.message}\nSi les visuels ne sont pas encore fabriqués : pnpm instagram --media --only ${fiche.id}. Sinon, déploie le site avant de publier.`,
          );
        },
      );
    console.log(`Publication du fil : ${fiche.title}`);
    const post = await publierFil(compte.id, fiche, categorie);
    etat[fiche.id] = {
      titre: fiche.title,
      publieLe: new Date().toISOString().slice(0, 10),
      fil: post.id,
      story: null,
    };
    // Écrit après chaque étape : une coupure ne fait pas republier le fil.
    await ecrireEtat(etat);
    if (options.sansStory) {
      console.log(`  post ${post.id} publié.`);
      publiees += 1;
      continue;
    }
    try {
      const story = await publierStory(compte.id, fiche);
      etat[fiche.id].story = story.id;
      await ecrireEtat(etat);
      console.log(`  post ${post.id}, story ${story.id} publiés.`);
    } catch (erreur) {
      console.error(`  story non publiée : ${erreur.message}`);
    }
    publiees += 1;
  }
  console.log(
    `\n${publiees} fiche(s) publiée(s). État : output/instagram/publications.json — committe ce fichier pour garder la liste à jour.`,
  );
}

async function main(argv) {
  const options = lireArguments(argv);
  if (!options.commande || options.commande === "aide") {
    console.log(AIDE);
    return;
  }
  const { fiches, categorieDe, etat } = await contexte();
  if (options.commande === "plan") return commandePlan(fiches, etat, options);
  if (options.commande === "dry-run")
    return commandeDryRun(fiches, categorieDe, etat, options);
  if (options.commande === "media")
    return commandeMedia(fiches, categorieDe, etat, options);
  if (options.commande === "check")
    return commandeVerifier(fiches, etat, options);
  if (options.commande === "compte") return commandeCompte();
  return commandePublish(fiches, categorieDe, etat, options);
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href)
  main(process.argv.slice(2)).catch((erreur) => {
    console.error(erreur.message);
    process.exitCode = 1;
  });

export { main };
