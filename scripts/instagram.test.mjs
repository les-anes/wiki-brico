import assert from "node:assert/strict";
import { test } from "node:test";

import {
  adresseTutoriel,
  decouperTitre,
  dureeLisible,
  echapperXml,
  etiquette,
  fileDAttente,
  hashtags,
  legende,
  melanger,
  motDeCategorie,
  nomDeDomaine,
  nomImage,
  reperes,
  svgStory,
  trierFiches,
  urlPublique,
} from "./instagram.mjs";

const ficheExemple = {
  id: "peindre-un-plafond",
  title: "Peindre un plafond sans traces",
  description: "Un plafond se peint au rouleau, par bandes régulières.",
  category: "finitions",
  tags: ["peinture", "rouleau", "peinture"],
  durationMinutes: 120,
  cost: null,
  difficulty: "Intermédiaire",
  imageAlt: "Un rouleau passe une bande de peinture sur un plafond.",
};

test("les visuels dérivés portent le type dans leur nom et une URL publique", () => {
  assert.equal(
    nomImage("peindre-un-plafond", "fil"),
    "peindre-un-plafond-fil.jpg",
  );
  assert.equal(
    nomImage("peindre-un-plafond", "story"),
    "peindre-un-plafond-story.jpg",
  );
  assert.equal(
    urlPublique(nomImage("peindre-un-plafond", "story"), "https://exemple.fr"),
    "https://exemple.fr/images/social/peindre-un-plafond-story.jpg",
  );
  assert.equal(
    nomDeDomaine("https://wikibrico.fr/"),
    "wikibrico.fr",
    "le domaine s’écrit sans schéma ni barre oblique",
  );
  assert.equal(nomDeDomaine("https://www.wikibrico.fr"), "wikibrico.fr");
  assert.equal(
    adresseTutoriel("peindre-un-plafond", "https://exemple.fr/"),
    "exemple.fr/tutoriel/peindre-un-plafond/",
  );
});

test("la durée s’écrit en minutes ou en heures rondes", () => {
  assert.equal(dureeLisible(45), "45 min");
  assert.equal(dureeLisible(60), "1 h");
  assert.equal(dureeLisible(90), "1 h 30");
  assert.equal(dureeLisible(600), "10 h");
  assert.equal(dureeLisible(0), null);
  assert.equal(dureeLisible(undefined), null);
});

test("un hashtag perd ses accents, ses ligatures et sa ponctuation", () => {
  assert.equal(etiquette("Électricité"), "electricite");
  assert.equal(etiquette("Gros œuvre"), "grosoeuvre");
  assert.equal(etiquette("Chauffe-eau"), "chauffeeau");
  assert.equal(etiquette("caillebotis & grille"), "caillebotisgrille");
  assert.equal(motDeCategorie("Gros œuvre"), "œuvre");
  assert.equal(motDeCategorie(undefined), "");
});

test("les hashtags dédoublonnent les tags et restent bornés", () => {
  const liste = hashtags(ficheExemple, "Finitions");
  assert.equal(liste[0], "#peinture");
  assert.equal(liste.includes("#rouleau"), true);
  assert.equal(liste.includes("#finitions"), true);
  assert.equal(liste.includes("#wikibrico"), true);
  assert.equal(liste.filter((mot) => mot === "#peinture").length, 1);
  assert(liste.length <= 8);
  assert.equal(hashtags({ tags: ["a"] }, "Peinture", 3).length, 3);
});

test("les repères ne gardent que ce que la fiche renseigne", () => {
  assert.equal(reperes(ficheExemple), "Temps : 2 h · Niveau : intermédiaire");
  assert.equal(
    reperes({ durationMinutes: 90, cost: "20 à 40 €", difficulty: "Avancé" }),
    "Temps : 1 h 30 · Budget : 20 à 40 € · Niveau : avancé",
  );
  assert.equal(reperes({}), "");
});

test("la légende porte le titre, la description, le lien du tutoriel et la bio", () => {
  const texte = legende(ficheExemple, "Finitions", "https://wikibrico.fr");
  assert(texte.startsWith("Peindre un plafond sans traces\n\nUn plafond"));
  assert(
    texte.includes("wikibrico.fr/tutoriel/peindre-un-plafond/"),
    "la légende donne l’adresse du tutoriel",
  );
  assert.equal(
    texte.includes("https://"),
    false,
    "la légende s’écrit sans schéma, Instagram n’en fait rien de cliquable",
  );
  assert(texte.includes("dans la bio"));
  assert(
    texte.endsWith("#peinture #rouleau #finitions #bricolage #tuto #wikibrico"),
  );
});

test("la file d’attente saute les fiches publiées et respecte les options", () => {
  const fiches = [
    { id: "a", category: "finitions" },
    { id: "b", category: "toiture" },
    { id: "c", category: "toiture" },
  ];
  assert.deepEqual(
    fileDAttente(fiches, { b: {} }).map((fiche) => fiche.id),
    ["a", "c"],
  );
  assert.deepEqual(
    fileDAttente(fiches, { a: {} }, { only: "a", limit: 1 }).map(
      (fiche) => fiche.id,
    ),
    ["a"],
  );
  assert.deepEqual(
    fileDAttente(fiches, {}, { limit: 2 }).map((fiche) => fiche.id),
    ["a", "b"],
  );
});

test("le tirage au hasard ne sort jamais deux fois la même fiche", () => {
  const fiches = [
    { id: "a", category: "finitions" },
    { id: "b", category: "finitions" },
    { id: "c", category: "finitions" },
  ];
  // Un générateur figé rend le tirage prévisible, donc vérifiable.
  const figé = (valeur) => () => valeur;
  const tirage = fileDAttente(fiches, {}, { hasard: true, alea: figé(0) });
  assert.equal(tirage.length, 1, "le hasard ne sort qu’une fiche par défaut");
  assert(
    ["a", "b", "c"].includes(tirage[0].id),
    "la fiche tirée vient bien de la file",
  );
  assert.equal(
    fileDAttente(fiches, {}, { hasard: true, alea: figé(0) })[0].id,
    tirage[0].id,
    "le même aléa donne le même tirage",
  );
  assert.deepEqual(
    melanger(fiches, figé(0)).map((fiche) => fiche.id),
    ["b", "c", "a"],
    "le mélange est déterministe quand l’aléa l’est",
  );
  assert.deepEqual(
    fileDAttente(fiches, { a: {}, b: {}, c: {} }, { hasard: true }),
    [],
    "aucune fiche publiée ne ressort",
  );
  assert.equal(
    fileDAttente(fiches, {}, { hasard: true, limit: 2 }).length,
    2,
    "--limit borne le tirage",
  );
  assert.deepEqual(
    fileDAttente(fiches, {}, { only: "b" }).map((fiche) => fiche.id),
    ["b"],
    "--only reste prioritaire",
  );
});

test("le tri suit l’ordre des catégories du site", () => {
  const fiches = [
    { id: "z", category: "toiture" },
    { id: "b", category: "finitions" },
    { id: "a", category: "finitions" },
  ];
  assert.deepEqual(
    trierFiches(fiches, ["finitions", "toiture"]).map((entree) => entree.id),
    ["a", "b", "z"],
  );
});

test("un titre se découpe en lignes sans couper un mot", () => {
  assert.deepEqual(decouperTitre("Peindre un plafond sans traces", 20), [
    "Peindre un plafond",
    "sans traces",
  ]);
  assert.deepEqual(decouperTitre("Rejointoyer", 20), ["Rejointoyer"]);
  assert.deepEqual(decouperTitre("Anticonstitutionnel", 4), [
    "Anticonstitutionnel",
  ]);
});

test("le calque de story contient le titre échappé, le domaine et la catégorie", () => {
  const svg = svgStory({
    titre: "Poser une étagère & ses tasseaux",
    categorie: "Agencement",
    domaine: nomDeDomaine("https://wikibrico.fr"),
  });
  assert(svg.startsWith("<svg "));
  assert(svg.includes("&amp;"), "l’esperluette du titre est échappée");
  assert(svg.includes("wikibrico.fr"), "le domaine figure dans la story");
  assert.equal(
    svg.includes("https://"),
    false,
    "la story n’affiche pas de schéma, il ne se passe rien en la touchant",
  );
  assert(svg.includes("Agencement"));
  assert.equal(echapperXml('<a href="x">'), "&lt;a href=&quot;x&quot;&gt;");
});
