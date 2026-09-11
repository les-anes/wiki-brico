import assert from "node:assert/strict";
import { test } from "node:test";

import type { Tutorial } from "@/types";

import { buildRoutes, matchRoute, pageMeta, tutorialPath } from "./routes.ts";

const parquet = {
  id: "poser-du-parquet",
  title: "Poser du parquet",
  description: "Un parquet flottant posé proprement, pièce par pièce.",
  category: "finitions",
  topicPath: ["Parquet"],
  image: "/images/tutoriels/poser-du-parquet.png",
} as Tutorial;

const etagere = {
  id: "poser-une-etagere",
  title: "Poser une étagère",
  description: "Une étagère droite et solide, fixée dans le bon support.",
  category: "techniques",
  topicPath: ["Percer et fixer"],
  image: "/images/tutoriels/poser-une-etagere.png",
} as Tutorial;

const tutorials = [parquet, etagere];
const categories = [
  { id: "finitions", name: "Finitions" },
  { id: "techniques", name: "Techniques" },
];
const siteUrl = "https://wikibrico.fr";

test("tutorialPath construit un chemin canonique avec slash final", () => {
  assert.equal(tutorialPath("poser-du-parquet"), "/tutoriel/poser-du-parquet/");
});

test("buildRoutes liste l'accueil, le catalogue puis chaque tutoriel", () => {
  const routes = buildRoutes(tutorials);
  assert.deepEqual(
    routes.map((r) => r.path),
    [
      "/",
      "/tutoriels/",
      "/tutoriel/poser-du-parquet/",
      "/tutoriel/poser-une-etagere/",
    ],
  );
});

test("matchRoute reconnaît l'accueil racine", () => {
  assert.deepEqual(matchRoute(tutorials, "/"), { kind: "home", path: "/" });
});

test("matchRoute reconnaît le catalogue avec ou sans slash final", () => {
  assert.equal(matchRoute(tutorials, "/tutoriels/").kind, "catalog");
  assert.equal(matchRoute(tutorials, "/tutoriels").kind, "catalog");
});

test("matchRoute ignore la query string", () => {
  const route = matchRoute(tutorials, "/tutoriels/?categorie=finitions");
  assert.deepEqual(route, { kind: "catalog", path: "/tutoriels/" });
});

test("matchRoute reconnaît une fiche existante, avec ou sans slash final", () => {
  assert.deepEqual(matchRoute(tutorials, "/tutoriel/poser-du-parquet/"), {
    kind: "tutorial",
    path: "/tutoriel/poser-du-parquet/",
    id: "poser-du-parquet",
  });
  assert.equal(
    matchRoute(tutorials, "/tutoriel/poser-du-parquet").kind,
    "tutorial",
  );
});

test("matchRoute marque une fiche inconnue comme introuvable", () => {
  const route = matchRoute(tutorials, "/tutoriel/inexistant/");
  assert.equal(route.kind, "notFound");
});

test("matchRoute marque tout autre chemin comme introuvable", () => {
  assert.equal(matchRoute(tutorials, "/nimporte/quoi").kind, "notFound");
});

test("pageMeta de l'accueil donne un titre et un canonical absolus", () => {
  const meta = pageMeta(
    { kind: "home", path: "/" },
    { tutorials, categories, siteUrl },
  );
  assert.match(meta.title, /WikiBrico/);
  assert.equal(meta.canonical, "https://wikibrico.fr/");
  assert.deepEqual(meta.breadcrumb, [
    { name: "Accueil", url: "https://wikibrico.fr/" },
  ]);
});

test("pageMeta d'une fiche dérive titre, description, canonical et image", () => {
  const route = matchRoute(tutorials, "/tutoriel/poser-du-parquet/");
  const meta = pageMeta(route, { tutorials, categories, siteUrl });
  assert.equal(meta.title, "Poser du parquet — WikiBrico");
  assert.equal(meta.description, parquet.description);
  assert.equal(
    meta.canonical,
    "https://wikibrico.fr/tutoriel/poser-du-parquet/",
  );
  assert.equal(
    meta.og.image,
    "https://wikibrico.fr/images/tutoriels/poser-du-parquet.png",
  );
  assert.equal(meta.og.url, "https://wikibrico.fr/tutoriel/poser-du-parquet/");
});

test("pageMeta d'une fiche expose le fil d'Ariane accueil › tutoriels › catégorie › fiche", () => {
  const route = matchRoute(tutorials, "/tutoriel/poser-du-parquet/");
  const meta = pageMeta(route, { tutorials, categories, siteUrl });
  assert.deepEqual(
    meta.breadcrumb.map((b) => b.name),
    ["Accueil", "Les tutoriels", "Finitions", "Poser du parquet"],
  );
  assert.equal(meta.breadcrumb.at(-1)?.url, meta.canonical);
});

test("pageMeta d'une fiche introuvable porte un titre dédié", () => {
  const meta = pageMeta(
    { kind: "notFound", path: "/tutoriel/inexistant/" },
    { tutorials, categories, siteUrl },
  );
  assert.match(meta.title, /introuvable/i);
});
