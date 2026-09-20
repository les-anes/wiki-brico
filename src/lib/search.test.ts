import assert from "node:assert/strict";
import { test } from "node:test";

import { searchScore } from "./search.ts";

test("la recherche ignore accents, casse, ponctuation et ordre des mots", () => {
  assert.equal(
    searchScore("Ragréer un sol en béton", "", " BÉTON, ragréer "),
    0,
  );
  assert.equal(searchScore("Ragréer un sol", "", "ragr"), 0);
  assert.equal(searchScore("Ragréer un sol", "", "  "), 0);
});

test("la recherche tolère une suppression, un ajout, un remplacement ou une inversion", () => {
  for (const query of ["ragrage", "ragreeage", "ragreoge", "ragregae"]) {
    assert.equal(searchScore("Ragréage", "", query), 2, query);
  }
  assert.equal(searchScore("Poser un parquet", "", "parqet poser"), 2);
});

test("les mots courts restent exacts et tous les mots doivent correspondre", () => {
  assert.equal(searchScore("PER", "", "pet"), Infinity);
  assert.equal(searchScore("Ragréage", "", "ragroge"), Infinity);
  assert.equal(searchScore("Ragréage", "", "ragrage toiture"), Infinity);
  assert.equal(searchScore("Ragréage", "", "zzzintrouvablezzz"), Infinity);
});

test("les résultats exacts précèdent les approximations, avec priorité au titre", () => {
  assert.equal(searchScore("Parquet", "", "parquet"), 0);
  assert.equal(searchScore("Préparer le sol", "Parquet", "parquet"), 1);
  assert.equal(searchScore("Parquets", "", "parqeuts"), 2);
  assert.equal(searchScore("Préparer le sol", "Parquets", "parqeuts"), 3);
});
