import assert from "node:assert/strict";
import { test } from "node:test";

import { aRafraichir, borner, epingle, tableauPour } from "./pinterest.mjs";

const ficheExemple = {
  id: "peindre-un-plafond",
  genre: "tutoriel",
  title: "Peindre un plafond sans traces",
  description: "Rouleau, perche et bonne lumière : le plafond en deux couches.",
  imageAlt: "Un rouleau sur perche applique la peinture au plafond.",
  durationMinutes: 180,
  difficulty: "Débutant",
};

test("borner coupe au dernier mot et signale la coupe", () => {
  assert.equal(borner("court", 10), "court");
  assert.equal(borner("un deux trois quatre", 12), "un deux…");
  assert.ok(borner("x".repeat(30), 10).length <= 10);
});

test("une épingle porte un lien cliquable, marqué, vers la page", () => {
  const pin = epingle(ficheExemple, "Finitions", "https://wikibrico.fr/");
  assert.equal(
    pin.link,
    "https://wikibrico.fr/tutoriel/peindre-un-plafond/?utm_source=pinterest&utm_medium=social",
  );
  assert.equal(pin.title, ficheExemple.title);
  assert.equal(pin.alt_text, ficheExemple.imageAlt);
  assert.match(pin.description, /^Rouleau, perche/);
  assert.match(pin.description, /Temps : 3 h/);
  assert.doesNotMatch(pin.description, /#/);
});

test("un calculateur pointe vers /calculateurs/", () => {
  const pin = epingle(
    { ...ficheExemple, id: "calpinage", genre: "calculateur" },
    "Finitions",
    "https://wikibrico.fr",
  );
  assert.match(pin.link, /\/calculateurs\/calpinage\/\?/);
});

test("une épingle respecte les plafonds de Pinterest", () => {
  const longue = {
    ...ficheExemple,
    title: "mot ".repeat(60),
    description: "phrase ".repeat(200),
    imageAlt: "",
  };
  const pin = epingle(longue, "Finitions", "https://wikibrico.fr");
  assert.ok(pin.title.length <= 100);
  assert.ok(pin.description.length <= 500);
  assert.ok(pin.alt_text.length > 0 && pin.alt_text.length <= 500);
});

test("le tableau se trouve par le nom de la catégorie, sans casse", () => {
  const tableaux = [
    { id: "1", name: "Finitions " },
    { id: "2", name: "cuisine & bains" },
  ];
  assert.equal(tableauPour("Finitions", tableaux)?.id, "1");
  assert.equal(tableauPour("Cuisine & bains", tableaux)?.id, "2");
  assert.equal(tableauPour("Toiture", tableaux), undefined);
});

test("le jeton se rafraîchit à moins de sept jours, ou sans échéance connue", () => {
  const maintenant = new Date("2026-10-06T08:00:00Z");
  assert.equal(aRafraichir("2026-11-01T00:00:00Z", maintenant), false);
  assert.equal(aRafraichir("2026-10-10T00:00:00Z", maintenant), true);
  assert.equal(aRafraichir(undefined, maintenant), true);
  assert.equal(aRafraichir("pas une date", maintenant), true);
});
