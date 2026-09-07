import { readdir, readFile } from "node:fs/promises";
import assert from "node:assert/strict";
const directory = new URL("../src/data/tutorials/", import.meta.url);
const ids = new Set();
const categories = [
  "plomberie",
  "electricite",
  "maconnerie",
  "menuiserie",
  "peinture",
  "revetements",
  "charpente",
  "toiture",
];
const text = (value) => typeof value === "string" && value.trim().length > 0;
for (const file of (await readdir(directory)).filter((f) =>
  f.endsWith(".json"),
)) {
  const t = JSON.parse(await readFile(new URL(file, directory), "utf8"));
  assert(
    text(t.id) &&
      /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(t.id) &&
      file === `${t.id}.json` &&
      !ids.has(t.id),
    `${file}: identifiant invalide ou dupliqué`,
  );
  ids.add(t.id);
  for (const key of ["title", "description", "image", "imageAlt"])
    assert(text(t[key]), `${file}: ${key} requis`);
  assert(categories.includes(t.category), `${file}: catégorie invalide`);
  assert(
    ["Débutant", "Intermédiaire", "Avancé"].includes(t.difficulty),
    `${file}: difficulté invalide`,
  );
  assert(["draft", "published"].includes(t.status), `${file}: statut invalide`);
  assert(
    Number.isInteger(t.durationMinutes) && t.durationMinutes > 0,
    `${file}: durée invalide`,
  );
  assert(
    t.cost?.currency === "EUR" &&
      Number.isFinite(t.cost.min) &&
      t.cost.min >= 0 &&
      Number.isFinite(t.cost.max) &&
      t.cost.max >= t.cost.min,
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
