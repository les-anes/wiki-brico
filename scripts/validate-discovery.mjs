import assert from "node:assert/strict";

export function validateDiscovery(tutorials, tags, pillars, categories) {
  const text = (value) =>
    typeof value === "string" && value.trim() === value && value.length > 0;
  assert(
    Array.isArray(tags) && tags.length > 0 && tags.every(text),
    "Référentiel de tags invalide",
  );
  assert.equal(
    new Set(tags.map((tag) => tag.toLocaleLowerCase("fr"))).size,
    tags.length,
    "Tags dupliqués",
  );
  const ids = new Set(tutorials.map((tutorial) => tutorial.id));
  for (const tutorial of tutorials) {
    assert(
      Array.isArray(tutorial.tags) &&
        tutorial.tags.length > 0 &&
        new Set(tutorial.tags).size === tutorial.tags.length &&
        tutorial.tags.every((tag) => tags.includes(tag)),
      `${tutorial.id}: tags absents, inconnus ou dupliqués`,
    );
    const related = tutorial.relatedTutorials;
    assert(
      Array.isArray(related) &&
        related.length >= 3 &&
        related.length <= 5 &&
        new Set(related).size === related.length &&
        related.every((id) => ids.has(id) && id !== tutorial.id),
      `${tutorial.id}: tutoriels complémentaires invalides`,
    );
  }
  assert(Array.isArray(pillars), "Pages piliers invalides");
  assert.equal(
    new Set(pillars.map((p) => p.id)).size,
    pillars.length,
    "Pages piliers dupliquées",
  );
  for (const pillar of pillars) {
    assert(
      categories.includes(pillar.id),
      `${pillar.id}: catégorie du thème inconnue`,
    );
    for (const field of ["title", "description", "introduction"])
      assert(text(pillar[field]), `${pillar.id}: ${field} requis`);
    assert(
      Array.isArray(pillar.sections) && pillar.sections.length > 0,
      `${pillar.id}: sections requises`,
    );
    const selected = [];
    for (const section of pillar.sections) {
      assert(
        text(section.title) && text(section.description),
        `${pillar.id}: section incomplète`,
      );
      assert(
        Array.isArray(section.tutorials) &&
          section.tutorials.length > 0 &&
          section.tutorials.every((id) => ids.has(id)),
        `${pillar.id}: liens de section invalides`,
      );
      selected.push(...section.tutorials);
    }
    assert.equal(
      new Set(selected).size,
      selected.length,
      `${pillar.id}: tutoriel répété`,
    );
  }
}
