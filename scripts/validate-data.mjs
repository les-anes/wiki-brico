import { readdir, readFile, access } from "node:fs/promises";
import assert from "node:assert/strict";
import { validateTutorialLinks } from "./validate-tutorial-links.mjs";
const directory = new URL("../src/data/tutorials/", import.meta.url);
const ids = new Set();
const slugify = (value) =>
  value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
async function listJson(folder, prefix = "") {
  const paths = [];
  for (const entry of await readdir(folder, { withFileTypes: true })) {
    if (entry.isDirectory())
      paths.push(
        ...(await listJson(
          new URL(`${entry.name}/`, folder),
          `${prefix}${entry.name}/`,
        )),
      );
    else if (entry.name.endsWith(".json")) paths.push(`${prefix}${entry.name}`);
  }
  return paths.sort();
}
const httpsUrl = (value) => {
  try {
    return new URL(value).protocol === "https:";
  } catch {
    return false;
  }
};
const taxonomy = JSON.parse(
  await readFile(
    new URL("../src/data/categories.json", import.meta.url),
    "utf8",
  ),
);
const journeys = JSON.parse(
  await readFile(new URL("../src/data/journeys.json", import.meta.url), "utf8"),
);
const categories = taxonomy.map((category) => category.id);
assert.equal(
  new Set(categories).size,
  categories.length,
  "Catégories dupliquées",
);
assert.equal(
  new Set(journeys.map((j) => j.id)).size,
  journeys.length,
  "Parcours dupliqués",
);
function validClassification(category, topicPath) {
  return taxonomy.some(
    (entry) =>
      entry.id === category &&
      entry.topics.some(
        (path) => JSON.stringify(path) === JSON.stringify(topicPath),
      ),
  );
}
const text = (value) => typeof value === "string" && value.trim().length > 0;
for (const file of await listJson(directory)) {
  const t = JSON.parse(await readFile(new URL(file, directory), "utf8"));
  assert(
    text(t.id) &&
      /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(t.id) &&
      file.split("/").at(-1) === `${t.id}.json` &&
      !ids.has(t.id),
    `${file}: identifiant invalide ou dupliqué`,
  );
  ids.add(t.id);
  validateTutorialLinks(t, file);
  const expectedPath = [
    t.category,
    ...(t.topicPath ?? []).map(slugify),
    `${t.id}.json`,
  ].join("/");
  assert(
    file === expectedPath,
    `${file}: emplacement attendu : ${expectedPath}`,
  );
  if (t.image?.startsWith("/")) {
    assert(
      /^\/images\/[a-z0-9/-]+\.(jpg|png|webp|svg)$/.test(t.image),
      `${file}: chemin image invalide`,
    );
    await access(new URL(`../public${t.image}`, import.meta.url));
  }
  if (t.imageCredit) {
    for (const key of ["author", "license", "caption", "changes", "accessedAt"])
      assert(text(t.imageCredit[key]), `${file}: crédit ${key} requis`);
    for (const key of ["licenseUrl", "sourceUrl", "originalUrl"])
      assert(httpsUrl(t.imageCredit[key]), `${file}: URL crédit invalide`);
  }
  if (t.status === "documented") {
    assert(
      text(t.scope) && text(t.estimatesNote),
      `${file}: périmètre et estimations requis`,
    );
    assert(t.imageCredit, `${file}: crédit photo requis`);
    assert(
      Array.isArray(t.sources) &&
        t.sources.length > 0 &&
        t.sources.every(
          (s) =>
            text(s.title) &&
            httpsUrl(s.url) &&
            text(s.note) &&
            /^\d{4}-\d{2}-\d{2}$/.test(s.accessedAt),
        ),
      `${file}: sources requises`,
    );
    assert(
      !/Section à rédiger|Liste à compléter|Points de vigilance spécifiques à documenter/.test(
        JSON.stringify(t),
      ),
      `${file}: contenu provisoire`,
    );
  }
  for (const key of ["title", "description", "image", "imageAlt"])
    assert(text(t[key]), `${file}: ${key} requis`);
  assert(categories.includes(t.category), `${file}: catégorie invalide`);
  if (t.topicPath !== undefined)
    assert(
      validClassification(t.category, t.topicPath),
      `${file}: catégorie ou sous-catégorie invalide`,
    );
  if (t.relatedCategories !== undefined) {
    assert(
      Array.isArray(t.relatedCategories) &&
        t.relatedCategories.every(
          (entry) =>
            entry.category !== t.category &&
            validClassification(entry.category, entry.topicPath),
        ),
      `${file}: classement secondaire invalide`,
    );
    assert.equal(
      new Set(t.relatedCategories.map((entry) => JSON.stringify(entry))).size,
      t.relatedCategories.length,
      `${file}: classement secondaire dupliqué`,
    );
  }
  if (t.journeys !== undefined)
    assert(
      Array.isArray(t.journeys) &&
        new Set(t.journeys).size === t.journeys.length &&
        t.journeys.every((id) => journeys.some((j) => j.id === id)),
      `${file}: parcours invalide`,
    );
  assert(
    (t.status === "draft" && t.difficulty === null) ||
      ["Débutant", "Intermédiaire", "Avancé"].includes(t.difficulty),
    `${file}: difficulté invalide`,
  );
  assert(
    ["draft", "documented", "published"].includes(t.status),
    `${file}: statut invalide`,
  );
  assert(
    (t.status === "draft" && t.durationMinutes === null) ||
      (Number.isInteger(t.durationMinutes) && t.durationMinutes > 0),
    `${file}: durée invalide`,
  );
  assert(
    (["draft", "documented"].includes(t.status) && t.cost === null) ||
      (t.cost?.currency === "EUR" &&
        Number.isFinite(t.cost.min) &&
        t.cost.min >= 0 &&
        Number.isFinite(t.cost.max) &&
        t.cost.max >= t.cost.min),
    `${file}: coût invalide`,
  );
  for (const key of ["tools", "mistakes", "safety"])
    assert(
      Array.isArray(t[key]) && t[key].length && t[key].every(text),
      `${file}: ${key} invalide`,
    );
  assert(
    Array.isArray(t.materials) &&
      t.materials.length &&
      t.materials.every((m) => text(m.name) && text(m.quantity)),
    `${file}: matériaux invalides`,
  );
  assert(
    Array.isArray(t.steps) &&
      t.steps.length &&
      t.steps.every((s) => text(s.title) && text(s.description)),
    `${file}: étapes invalides`,
  );
  assert(
    /^\d{4}-\d{2}-\d{2}$/.test(t.updatedAt) &&
      !Number.isNaN(Date.parse(t.updatedAt)),
    `${file}: date invalide`,
  );
}
console.log(`${ids.size} tutoriels JSON validés.`);
