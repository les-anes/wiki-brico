import assert from "node:assert/strict";
import { validateTutorialLinks } from "./validate-tutorial-links.mjs";
import { createServer } from "vite";
import { createServer as createHttpServer } from "node:http";
import { renderToStaticMarkup } from "react-dom/server";
import { createElement } from "react";
import { readFile } from "node:fs/promises";

// Use Vite's real JSON imports and TS transforms without opening a network port.
const server = await createServer({
  server: {
    middlewareMode: true,
    hmr: { server: createHttpServer() },
    watch: null,
  },
  appType: "custom",
});
try {
  const { tutorials } = await server.ssrLoadModule("/src/data/index.ts");
  const { categories, journeys } = await server.ssrLoadModule(
    "/src/data/taxonomy.ts",
  );
  const { belongsToCategory, catalogHref, readCatalogFilters } =
    await server.ssrLoadModule("/src/lib/catalog.ts");
  const { default: App } = await server.ssrLoadModule("/src/App.tsx");
  const render = (hash) => {
    globalThis.location = { hash };
    return renderToStaticMarkup(createElement(App));
  };
  const countCards = (html) =>
    (html.match(/class="tutorial-card"/g) ?? []).length;
  assert.equal(categories.filter((c) => c.kind === "trade").length, 12);
  assert.equal(categories.filter((c) => c.kind === "transversal").length, 2);
  assert.equal(tutorials.length, 14);
  assert.equal(new Set(tutorials.map((t) => t.id)).size, 14);
  const home = render("");
  assert(home.includes("Vos deux mains."));
  assert.equal(countCards(home), 0, "Catalogue séparé de l’accueil");
  assert(!home.includes("On s’y met ce week-end ?"));
  assert.equal(countCards(render("#tutoriels")), 14);
  assert.equal(
    countCards(
      render(
        catalogHref({
          category: "plomberie",
          topicPath: ["Arrivée d’eau", "PER"],
        }),
      ),
    ),
    3,
  );
  assert.equal(
    countCards(
      render(
        catalogHref({
          category: "plomberie",
          topicPath: ["Arrivée d’eau", "PER", "Raccord à sertir"],
        }),
      ),
    ),
    1,
  );
  assert.equal(
    countCards(
      render(
        catalogHref({ category: "preparer-chantier", topicPath: ["Plans"] }),
      ),
    ),
    1,
  );
  assert.equal(countCards(render(catalogHref({ savedOnly: true }))), 0);
  assert.equal(countCards(render(catalogHref({ category: "electricite" }))), 0);
  assert.equal(
    countCards(render(catalogHref({ query: "zzzintrouvablezzz" }))),
    0,
  );
  const dimensioning = tutorials.find(
    (t) => t.id === "dimensionnement-plomberie",
  );
  assert(belongsToCategory(dimensioning, "preparer-chantier", ["Plans"]));
  assert(belongsToCategory(dimensioning, "plomberie", ["Arrivée d’eau"]));
  assert(
    !belongsToCategory(dimensioning, "plomberie", ["Gestion des évacuations"]),
  );
  for (const journey of journeys) {
    assert.equal(
      countCards(render(catalogHref({ journey: journey.id }))),
      tutorials.filter((t) => t.journeys?.includes(journey.id)).length,
    );
  }
  const href = catalogHref({
    category: "plomberie",
    topicPath: ["Arrivée d’eau", "PER"],
    query: "eau & cuivre",
    journey: "renover-une-salle-de-bains",
  });
  assert.equal(readCatalogFilters(href).query, "eau & cuivre");
  assert.deepEqual(readCatalogFilters(href).topicPath, [
    "Arrivée d’eau",
    "PER",
  ]);
  for (const tutorial of tutorials) {
    assert.equal(tutorial.status, "documented", `${tutorial.id}: fiche complétée`);
    assert.equal(tutorial.imageOrigin, "original", `${tutorial.id}: illustration locale`);
    assert(!tutorial.imageCredit, `${tutorial.id}: pas de crédit photographique obsolète`);
    assert(tutorial.steps.length >= 5 && tutorial.steps.length <= 6, `${tutorial.id}: étapes courtes`);
    assert.equal(tutorial.mistakes.length, 3, `${tutorial.id}: erreurs essentielles`);
    const html = render(`#tutoriel/${tutorial.id}`);
    assert(html.includes(tutorial.image), `${tutorial.id}: illustration rendue`);
    assert(!html.includes("Tutoriel introuvable"), tutorial.id);
    assert(html.includes("Revenir aux tutoriels"), tutorial.id);
    assert(!html.includes("Ce que couvre ce guide"), tutorial.id);
    assert(!html.includes("Sources techniques"), tutorial.id);
    assert.equal(
      html.includes("Références DTU"),
      !!tutorial.dtuReferences?.length,
    );
    assert.equal(
      html.includes("Où trouver le matériel"),
      !!tutorial.shoppingLinks?.length,
    );
    const encoded = (value) => value.replaceAll("&", "&amp;");
    for (const reference of tutorial.dtuReferences ?? [])
      assert(html.includes(encoded(reference.url)), tutorial.id);
    for (const link of tutorial.shoppingLinks ?? [])
      assert(html.includes(encoded(link.url)), tutorial.id);
    for (const source of tutorial.sources ?? [])
      if (
        ![
          ...(tutorial.dtuReferences ?? []),
          ...(tutorial.shoppingLinks ?? []),
        ].some((link) => link.url === source.url)
      )
        assert(!html.includes(encoded(source.url)), tutorial.id);
    assert(!html.includes("<figcaption"), tutorial.id);
    if (tutorial.imageCredit) {
      assert(
        !html.includes(encoded(tutorial.imageCredit.sourceUrl)),
        tutorial.id,
      );
      assert(
        !html.includes(encoded(tutorial.imageCredit.licenseUrl)),
        tutorial.id,
      );
    }
  }
  const pehd = tutorials.find((tutorial) => tutorial.id === "plomberie-pehd");
  assert(pehd.description.includes("polyéthylène haute densité"));
  assert(pehd.steps.length >= 5 && pehd.steps.length <= 6);
  assert.equal(pehd.mistakes.length, 3);
  assert(!pehd.tools.join(" ").includes("dynamométrique"));
  const shoppingHtml = render("#tutoriel/plomberie-pehd")
    .split('class="tutorial-shopping"')[1]
    .split("</section>")[0];
  const dtuHtml = render("#tutoriel/plomberie-pehd")
    .split('class="tutorial-sources"')[1]
    .split("</section>")[0];
  for (const link of pehd.shoppingLinks) {
    assert(shoppingHtml.includes(link.url));
    assert(!dtuHtml.includes(link.url));
  }
  validateTutorialLinks({});
  validateTutorialLinks({ shoppingLinks: [], dtuReferences: [] });
  for (const url of [
    "http://www.leroymerlin.fr/produits/tube.html",
    "https://leroymerlin.fr.evil.fr/tube.html",
    "https://evil.fr/leroymerlin.fr/tube.html",
    "https://leroymerlin.fr@evil.fr/tube.html",
    "https://fauxleroymerlin.fr/tube.html",
    "https://autre.fr/tube.html",
    "https://www.leroymerlin.com/tube.html",
  ])
    assert.throws(() =>
      validateTutorialLinks({
        shoppingLinks: [{ material: "Tube", retailer: "Leroy Merlin", url }],
      }),
    );
  assert.throws(() =>
    validateTutorialLinks({
      dtuReferences: [
        { ...pehd.dtuReferences[0], url: pehd.shoppingLinks[0].url },
      ],
    }),
  );
  assert.throws(() =>
    validateTutorialLinks({
      dtuReferences: [
        { ...pehd.dtuReferences[0], reference: "Notice fabricant" },
      ],
    }),
  );
  assert(render("#tutoriel/absent").includes("Tutoriel introuvable"));
  assert((await readFile("index.html", "utf8")).includes("/favicon.svg"));
  assert((await readFile("public/favicon.svg", "utf8")).includes("<svg"));
  console.log(
    "Accueil, catalogue, 14 fiches, 14 catégories, 3 parcours, classements multiples, filtres URL et favicon : contrôles réussis.",
  );
} finally {
  await server.close();
}
