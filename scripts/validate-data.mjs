import assert from "node:assert/strict";
import { readdir, readFile, access } from "node:fs/promises";

import { validateDiscovery } from "./validate-discovery.mjs";
import { validateTutorialLinks } from "./validate-tutorial-links.mjs";
const directory = new URL("../src/data/tutorials/", import.meta.url);
const ids = new Set();
const tutorials = [];
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
  return paths.toSorted();
}
const httpsUrl = (value) => {
  try {
    return new URL(value).protocol === "https:";
  } catch {
    return false;
  }
};
async function readJson(url) {
  try {
    return JSON.parse(await readFile(url, "utf8"));
  } catch (error) {
    console.error(`JSON invalide : ${url.pathname}`);
    console.error(error instanceof Error ? error.message : error);
    process.exit(1);
  }
}
const taxonomy = await readJson(
  new URL("../src/data/categories.json", import.meta.url),
);
const journeys = await readJson(
  new URL("../src/data/journeys.json", import.meta.url),
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
const declaredImages = new Set();
for (const file of await listJson(directory)) {
  const t = await readJson(new URL(file, directory));
  tutorials.push(t);
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
    declaredImages.add(t.image.split("/").at(-1));
    for (const width of [480, 720, 960]) {
      const variant = `${t.image.replace(/\.png$/, "")}-${width}.webp`;
      await access(new URL(`../public${variant}`, import.meta.url)).catch(
        () => {
          assert.fail(
            `${file}: variante d’illustration manquante : ${variant}`,
          );
        },
      );
      declaredImages.add(variant.split("/").at(-1));
    }
  }
  if (t.imageOrigin !== undefined) {
    assert(
      t.imageOrigin === "original" &&
        t.image.startsWith("/images/") &&
        !t.imageCredit,
      `${file}: illustration originale invalide`,
    );
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
    assert(
      t.imageOrigin === "original" || t.imageCredit,
      `${file}: origine ou crédit image requis`,
    );
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
const orphelines = (
  await readdir(new URL("../public/images/tutoriels/", import.meta.url))
).filter((name) => !declaredImages.has(name));
assert(
  orphelines.length === 0,
  `illustrations sans fiche : ${orphelines.join(", ")}`,
);
validateDiscovery(
  tutorials,
  await readJson(new URL("../src/data/tags.json", import.meta.url)),
  await readJson(new URL("../src/data/pillars.json", import.meta.url)),
  categories,
);

// --- Outils de calcul ---
const calculators = await readJson(
  new URL("../src/data/calculators.json", import.meta.url),
);
const hub = calculators?.hub;
assert(
  text(hub?.title) &&
    text(hub?.description) &&
    text(hub?.heading) &&
    text(hub?.introduction),
  "calculateurs : présentation du hub incomplète",
);
const calculatriceSlugs = new Set();
for (const tool of calculators.tools ?? []) {
  const where = `calculateurs : ${tool.slug}`;
  assert(
    /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(tool.slug ?? "") &&
      !calculatriceSlugs.has(tool.slug),
    `${where} : identifiant invalide ou dupliqué`,
  );
  calculatriceSlugs.add(tool.slug);
  for (const key of [
    "title",
    "description",
    "heading",
    "introduction",
    "method",
  ])
    assert(text(tool[key]), `${where} : ${key} requis`);
  assert(
    /^\d{4}-\d{2}-\d{2}$/.test(tool.updatedAt ?? ""),
    `${where} : date invalide`,
  );
  assert(categories.includes(tool.category), `${where} : catégorie invalide`);
  for (const key of ["assumptions", "limits"])
    assert(
      Array.isArray(tool[key]) && tool[key].length && tool[key].every(text),
      `${where} : ${key} requis`,
    );
  assert(
    text(tool.reference?.title) &&
      text(tool.reference?.note) &&
      httpsUrl(tool.reference?.url) &&
      /^\d{4}-\d{2}-\d{2}$/.test(tool.reference?.accessedAt ?? ""),
    `${where} : référence invalide`,
  );
  assert(
    Array.isArray(tool.relatedTutorials) &&
      tool.relatedTutorials.length > 0 &&
      tool.relatedTutorials.every((id) => ids.has(id)),
    `${where} : tutoriels liés invalides`,
  );
  if (tool.catalogFilter !== undefined)
    assert(
      validClassification(
        tool.catalogFilter.category,
        tool.catalogFilter.topicPath,
      ),
      `${where} : filtre de catalogue invalide`,
    );
  const fieldNames = new Set();
  assert(
    Array.isArray(tool.fields) && tool.fields.length > 0,
    `${where} : champs requis`,
  );
  for (const field of tool.fields) {
    assert(
      /^[a-z][a-zA-Z0-9]*$/.test(field.name ?? "") &&
        !fieldNames.has(field.name),
      `${where} : nom de champ invalide ou dupliqué`,
    );
    fieldNames.add(field.name);
    if (field.visibleWhen) {
      const controlling = tool.fields.find(
        (entry) => entry.name === field.visibleWhen.field,
      );
      assert(
        controlling?.type === "select" &&
          Array.isArray(field.visibleWhen.values) &&
          field.visibleWhen.values.length > 0 &&
          field.visibleWhen.values.every((value) =>
            controlling.options.some((option) => option.value === value),
          ),
        `${where}/${field.name} : condition d’affichage invalide`,
      );
    }
    assert(text(field.label), `${where}/${field.name} : libellé requis`);
    assert(
      ["number", "select"].includes(field.type),
      `${where}/${field.name} : type de champ inconnu`,
    );
    if (field.type === "number") {
      assert(
        Number.isFinite(field.default) &&
          Number.isFinite(field.min) &&
          Number.isFinite(field.max) &&
          field.min < field.max &&
          field.default >= field.min &&
          field.default <= field.max,
        `${where}/${field.name} : bornes ou valeur par défaut invalides`,
      );
      assert(text(field.unit), `${where}/${field.name} : unité requise`);
      assert(
        field.step === undefined ||
          (Number.isFinite(field.step) && field.step > 0),
        `${where}/${field.name} : pas invalide`,
      );
    } else {
      const values = field.options?.map((option) => option.value) ?? [];
      assert(
        values.length >= 2 &&
          new Set(values).size === values.length &&
          field.options.every(
            (option) => text(option.value) && text(option.label),
          ) &&
          values.includes(field.default),
        `${where}/${field.name} : options invalides`,
      );
      // Les formules lisent les dimensions dans la valeur de l’option.
      if (field.name === "format")
        assert(
          field.options.every((option) =>
            /^(?:[a-z-]+-)?\d+x\d+$/.test(option.value),
          ),
          `${where}/${field.name} : dimensions en millimètres attendues`,
        );
    }
  }
}
console.log(
  `${ids.size} tutoriels JSON, tags, liens complémentaires et pages piliers validés, ${calculatriceSlugs.size} calculateurs validés.`,
);
