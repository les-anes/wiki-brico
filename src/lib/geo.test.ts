import assert from "node:assert/strict";
import { test } from "node:test";

import type { Tutorial } from "@/types";

import { llmsTxt, tutorialJsonLd, tutorialMarkdown } from "./geo.ts";

const silicone = {
  id: "refaire-joints-silicone",
  title: "Refaire le joint silicone",
  description: "Retire l’ancien joint, puis refais un cordon propre.",
  category: "cuisine-salle-de-bains",
  tags: ["silicone", "étanchéité"],
  relatedTutorials: ["poser-une-etagere"],
  difficulty: "Débutant",
  durationMinutes: 60,
  cost: { min: 10, max: 25, currency: "EUR" },
  image: "/images/tutoriels/refaire-joints-silicone.png",
  imageAlt: "Un pistolet à silicone.",
  scope: "Joint entre un lavabo stable et un mur sain.",
  sources: [
    {
      title: "Notice fabricant",
      url: "https://exemple.fr/notice",
      note: "Délai de remise en eau.",
      accessedAt: "2026-09-01",
    },
  ],
  dtuReferences: [
    {
      reference: "DTU 25.41",
      title: "Ouvrages en plaques de plâtre",
      url: "https://exemple.fr/dtu",
      scope: "Supports.",
      accessedAt: "2026-09-01",
    },
  ],
  tools: ["Pistolet à cartouche"],
  materials: [{ name: "Silicone sanitaire", quantity: "1 cartouche" }],
  steps: [
    { title: "Retire l’ancien joint", description: "Décolle le cordon." },
    { title: "Applique et lisse", description: "Passe le lisseur." },
  ],
  mistakes: ["Appliquer sur une surface humide."],
  safety: ["Aère la pièce."],
  status: "documented",
  updatedAt: "2026-09-24",
} as Tutorial;

const etagere = {
  id: "poser-une-etagere",
  title: "Poser une étagère",
  description: "Une étagère droite et solide.",
  category: "techniques",
  tags: [],
  relatedTutorials: [],
  sources: [],
} as unknown as Tutorial;

const ctx = {
  tutorials: [silicone, etagere],
  categories: [
    { id: "techniques", name: "Techniques" },
    { id: "cuisine-salle-de-bains", name: "Cuisine & salle de bains" },
  ],
  siteUrl: "https://wikibrico.fr/",
};

test("le JSON-LD d’une fiche est un TechArticle daté qui cite ses seuls DTU", () => {
  const data = tutorialJsonLd(silicone, ctx);
  assert.equal(data["@type"], "TechArticle");
  assert.equal(data.dateModified, "2026-09-24");
  assert.equal(data.timeRequired, "PT60M");
  assert.equal(
    data.mainEntityOfPage,
    "https://wikibrico.fr/tutoriel/refaire-joints-silicone/",
  );
  assert.deepEqual(
    data.citation?.map((c: { url: string }) => c.url),
    ["https://exemple.fr/dtu"],
  );
  assert(!JSON.stringify(data).includes("HowTo"));
});

test("la version Markdown reprend la fiche complète et ses sources", () => {
  const md = tutorialMarkdown(silicone, ctx);
  assert(md.startsWith("# Refaire le joint silicone\n"));
  assert(md.indexOf("Retire l’ancien joint") < md.indexOf("Applique et lisse"));
  for (const expected of [
    "Joint entre un lavabo stable et un mur sain.",
    "Silicone sanitaire — 1 cartouche",
    "[DTU 25.41 — Ouvrages en plaques de plâtre](https://exemple.fr/dtu)",
    "[Notice fabricant](https://exemple.fr/notice)",
    "[Poser une étagère](https://wikibrico.fr/tutoriel/poser-une-etagere/)",
    "10–25 €",
  ])
    assert(md.includes(expected), expected);
});

test("llms.txt liste chaque fiche une fois, vers sa version Markdown", () => {
  const txt = llmsTxt(ctx);
  assert(txt.startsWith("# WikiBrico\n"));
  for (const t of ctx.tutorials) {
    const url = `https://wikibrico.fr/tutoriel/${t.id}/index.md`;
    assert.equal(txt.split(`](${url})`).length, 2, t.id);
  }
});
