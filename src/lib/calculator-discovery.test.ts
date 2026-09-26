import assert from "node:assert/strict";
import { test } from "node:test";

import {
  calculatorsForTutorial,
  searchCalculators,
} from "./calculator-discovery.ts";

test("les calculateurs partagent la recherche tolérante et les acronymes exacts", () => {
  assert(
    searchCalculators("esclalier").some((tool) => tool.slug === "escalier"),
  );
  assert(
    searchCalculators("EVACUATION pente").some(
      (tool) => tool.slug === "pente-evacuation-pvc",
    ),
  );
  assert.deepEqual(
    searchCalculators("OSB").map((tool) => tool.slug),
    ["quantite-osb"],
  );
  assert.deepEqual(searchCalculators("PER"), []);
  assert.deepEqual(searchCalculators(""), []);
  assert.deepEqual(searchCalculators("zzzintrouvablezzz"), []);
});

test("les liens inverses réutilisent les associations éditoriales", () => {
  assert.deepEqual(
    calculatorsForTutorial("poser-un-plancher-osb-sur-solives").map(
      (tool) => tool.slug,
    ),
    ["quantite-osb"],
  );
  assert(
    calculatorsForTutorial("radiateur-connecte").some(
      (tool) => tool.slug === "puissance-radiateur",
    ),
  );
  assert.deepEqual(calculatorsForTutorial("inexistant"), []);
});
