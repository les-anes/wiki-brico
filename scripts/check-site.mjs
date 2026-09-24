import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import { createServer as createHttpServer } from "node:http";
import { runInNewContext } from "node:vm";

import { JSDOM, VirtualConsole } from "jsdom";
import { act, createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { createServer } from "vite";

import { validateDiscovery } from "./validate-discovery.mjs";
import { validateTutorialLinks } from "./validate-tutorial-links.mjs";

function resolveOrigin(value) {
  let url;
  try {
    url = new URL(value);
  } catch {
    throw new Error(`SITE_URL doit être une URL absolue (reçu : ${value}).`);
  }
  if (!["https:", "http:"].includes(url.protocol))
    throw new Error("SITE_URL doit être une URL HTTP(S).");
  return url.origin;
}

const origin = resolveOrigin(process.env.SITE_URL ?? "https://wikibrico.fr");
const escapeText = (value) =>
  value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#x27;");

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
  const { default: pillars } = await server.ssrLoadModule(
    "/src/data/pillars.json",
  );
  const { default: tags } = await server.ssrLoadModule("/src/data/tags.json");
  const { searchTutorials } = await server.ssrLoadModule("/src/lib/search.ts");
  const { categories, journeys } = await server.ssrLoadModule(
    "/src/data/taxonomy.ts",
  );
  const { belongsToCategory, catalogHref, readCatalogFilters } =
    await server.ssrLoadModule("/src/lib/catalog.ts");
  const { buildRoutes, matchRoute, pageMeta, tutorialPath } =
    await server.ssrLoadModule("/src/lib/routes.ts");
  const { calculators } = await server.ssrLoadModule(
    "/src/lib/calculators/index.ts",
  );
  const { Document } = await server.ssrLoadModule("/src/document.tsx");
  const render = (path) =>
    renderToStaticMarkup(
      createElement(Document, {
        initialPath: path,
        siteUrl: origin,
        assets: { css: [], modules: [] },
      }),
    );
  const countCards = (html) =>
    (html.match(/class="tutorial-card"/g) ?? []).length;

  // --- Contenu rendu par route ---
  assert.equal(categories.filter((c) => c.kind === "trade").length, 12);
  assert.equal(categories.filter((c) => c.kind === "transversal").length, 2);
  assert.equal(tutorials.length, 72);
  assert.equal(new Set(tutorials.map((t) => t.id)).size, 72);
  validateDiscovery(
    tutorials,
    tags,
    pillars,
    categories.map((c) => c.id),
  );
  for (const relatedTutorials of [
    ["absent", tutorials[1].id, tutorials[2].id],
    [tutorials[0].id, tutorials[1].id, tutorials[2].id],
    [tutorials[1].id, tutorials[1].id, tutorials[2].id],
    [tutorials[1].id],
    tutorials.slice(1, 7).map((t) => t.id),
  ]) {
    const invalid = [
      { ...tutorials[0], relatedTutorials },
      ...tutorials.slice(1),
    ];
    assert.throws(
      () =>
        validateDiscovery(
          invalid,
          tags,
          pillars,
          categories.map((c) => c.id),
        ),
      /complémentaires invalides/,
    );
  }
  for (const invalidTags of [[], ["tag-inconnu"], ["PER", "PER"]]) {
    const invalid = [
      { ...tutorials[0], tags: invalidTags },
      ...tutorials.slice(1),
    ];
    assert.throws(
      () =>
        validateDiscovery(
          invalid,
          tags,
          pillars,
          categories.map((c) => c.id),
        ),
      /tags absents/,
    );
  }
  const invalidPillars = structuredClone(pillars);
  invalidPillars[0].sections[0].tutorials.push("absent");
  assert.throws(
    () =>
      validateDiscovery(
        tutorials,
        tags,
        invalidPillars,
        categories.map((c) => c.id),
      ),
    /liens de section invalides/,
  );
  assert.deepEqual(
    searchTutorials(tutorials, categories, "PER")
      .map((t) => t.id)
      .toSorted(),
    [
      "per-raccord-a-compression",
      "per-raccord-a-glissement",
      "per-raccord-a-sertir",
      "raccord-per-vers-cuivre",
    ],
    "PER ne renvoie que les quatre fiches sur ce matériau",
  );
  assert(
    searchTutorials(tutorials, categories, "BA13").some(
      (t) => t.id === "monter-une-petite-cloison-en-placo",
    ),
  );
  for (const tutorial of tutorials)
    for (const tag of tutorial.tags)
      assert(
        searchTutorials(tutorials, categories, tag).some(
          (t) => t.id === tutorial.id,
        ),
        `${tutorial.id}: recherche par tag ${tag}`,
      );
  const home = render("/");
  assert(home.includes("Vos deux mains."));
  assert.equal(countCards(home), 0, "Catalogue séparé de l’accueil");
  assert(!home.includes("On s’y met ce week-end ?"));
  assert(home.includes("/favicon.svg"));
  assert(!home.includes("Tutoriel introuvable"));
  assert.equal(countCards(render("/tutoriels/")), 72);
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
  const fuzzyResults = render(catalogHref({ query: "parqet poser" }));
  assert(
    fuzzyResults.includes('href="/tutoriel/poser-du-parquet/"'),
    "La recherche trouve le parquet malgré une faute et l’ordre des mots",
  );
  assert(fuzzyResults.includes('value="parqet poser"'));
  assert.equal(
    countCards(
      render(catalogHref({ query: "parqet poser", category: "electricite" })),
    ),
    0,
    "La recherche approximative respecte le filtre de catégorie",
  );
  assert.equal(countCards(render(catalogHref({ category: "electricite" }))), 6);
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

  // --- Routage ---
  assert.equal(matchRoute(tutorials, "/").kind, "home");
  assert.equal(matchRoute(tutorials, "/tutoriels/?q=peindre").kind, "catalog");
  assert.equal(
    matchRoute(tutorials, "/tutoriel/poser-du-parquet/").kind,
    "tutorial",
  );
  assert.equal(matchRoute(tutorials, "/tutoriel/absent/").kind, "notFound");
  assert.equal(matchRoute(tutorials, "/nimporte/quoi").kind, "notFound");

  for (const tutorial of tutorials) {
    assert.equal(
      tutorial.status,
      "documented",
      `${tutorial.id}: fiche complétée`,
    );
    assert.equal(
      tutorial.imageOrigin,
      "original",
      `${tutorial.id}: illustration locale`,
    );
    assert(
      !tutorial.imageCredit,
      `${tutorial.id}: pas de crédit photographique obsolète`,
    );
    // Le contacteur conserve une étape supplémentaire pour la mise en sécurité.
    const maxSteps = tutorial.id === "ajouter-un-contacteur-jour-nuit" ? 7 : 6;
    assert(
      tutorial.steps.length >= 5 && tutorial.steps.length <= maxSteps,
      `${tutorial.id}: étapes courtes`,
    );
    assert.equal(
      tutorial.mistakes.length,
      3,
      `${tutorial.id}: erreurs essentielles`,
    );
    const html = render(`/tutoriel/${tutorial.id}/`);
    assert(
      html.includes(tutorial.image),
      `${tutorial.id}: illustration rendue`,
    );
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
  const shoppingHtml = render("/tutoriel/plomberie-pehd/")
    .split('class="tutorial-shopping"')[1]
    .split("</section>")[0];
  const dtuHtml = render("/tutoriel/plomberie-pehd/")
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
  assert(render("/tutoriel/absent/").includes("Tutoriel introuvable"));
  assert((await readFile("public/favicon.svg", "utf8")).includes("<svg"));

  // --- Build statique (dist/) : une page par route, métadonnées propres ---
  const routes = buildRoutes(tutorials);
  assert.equal(routes.filter((route) => route.kind === "theme").length, 6);
  assert.equal(
    routes.filter((route) => route.kind === "calculator").length,
    calculators.length,
    "une route par calculateur",
  );
  const fileFor = (path) =>
    path === "/" ? "dist/index.html" : `dist${path}index.html`;
  for (const route of routes) {
    const html = await readFile(fileFor(route.path), "utf8");
    const meta = pageMeta(route, { tutorials, categories, siteUrl: origin });
    assert(
      html.includes(`<title>${escapeText(meta.title)}</title>`),
      `${route.path}: titre de page`,
    );
    assert(
      html.includes(`<link rel="canonical" href="${meta.canonical}"/>`),
      `${route.path}: canonical`,
    );
    assert(
      html.includes(`<meta property="og:url" content="${meta.og.url}"/>`),
      `${route.path}: og:url`,
    );
    assert(
      !html.includes('href="#tutoriel'),
      `${route.path}: aucun lien interne vers l’ancienne URL à fragment`,
    );
    if (route.kind === "catalog")
      for (const tutorial of tutorials)
        assert(
          html.includes(`href="${tutorialPath(tutorial.id)}"`),
          `/tutoriels/: lien vers /tutoriel/${tutorial.id}/`,
        );
    if (route.kind === "tutorial") {
      const tutorial = tutorials.find((t) => t.id === route.id);
      const doc = JSDOM.fragment(html);
      assert.deepEqual(
        [...doc.querySelectorAll(".continue-reading a")].map((a) =>
          a.getAttribute("href"),
        ),
        tutorial.relatedTutorials.map(tutorialPath),
        `${route.path}: liens complémentaires dans l’ordre éditorial`,
      );
      assert.deepEqual(
        [...doc.querySelectorAll(".tutorial-tags a")].map((a) =>
          a.getAttribute("href"),
        ),
        tutorial.tags.map((tag) => catalogHref({ query: tag })),
        `${route.path}: tags vers la recherche`,
      );
      const jsonld = html.match(
        /<script type="application\/ld\+json">([\s\S]*?)<\/script>/,
      );
      assert(jsonld, `${route.path}: BreadcrumbList présent`);
      const breadcrumb = JSON.parse(jsonld[1]);
      assert.equal(breadcrumb["@type"], "BreadcrumbList");
      assert.equal(breadcrumb.itemListElement.length, 4);
      assert(!html.includes('"HowTo"'), `${route.path}: pas de balisage HowTo`);
    }
    if (route.kind === "calculators") {
      const doc = JSDOM.fragment(html);
      assert.deepEqual(
        [...doc.querySelectorAll(".calculator-card")].map((card) =>
          card.getAttribute("href"),
        ),
        calculators.map((tool) => `/calculateurs/${tool.slug}/`),
        "le hub liste tous les outils",
      );
    }
    if (route.kind === "calculator") {
      const tool = calculators.find((entry) => entry.slug === route.id);
      const doc = JSDOM.fragment(html);
      const headline = doc.querySelector(".result-headline");
      assert(
        headline?.textContent.trim().length,
        `${route.path}: résultat calculé au pré-rendu`,
      );
      assert.equal(
        doc.querySelectorAll(
          ".calculator-field input, .calculator-field select",
        ).length,
        tool.fields.filter(
          (field) =>
            !field.visibleWhen ||
            field.visibleWhen.values.includes(
              String(
                tool.fields.find(
                  (entry) => entry.name === field.visibleWhen.field,
                ).default,
              ),
            ),
        ).length,
        `${route.path}: champs du formulaire`,
      );
      assert.deepEqual(
        [...doc.querySelectorAll(".tutorial-links a")].map((link) =>
          link.getAttribute("href"),
        ),
        tool.relatedTutorials.map(tutorialPath),
        `${route.path}: tutos liés dans l’ordre`,
      );
      if (route.id === "escalier")
        assert.equal(
          doc.querySelectorAll(".stair-svg").length,
          2,
          "Plan et profil pré-rendus",
        );
      assert(
        doc
          .querySelector(".calculator-reference a")
          ?.getAttribute("href")
          .startsWith("https://"),
        `${route.path}: référence consultable`,
      );
      assert(
        html.includes("Limites du calcul") &&
          html.includes("Hypothèses retenues"),
        `${route.path}: méthode, hypothèses et limites affichées`,
      );
      if (tool.slug === "calpinage")
        assert(
          doc.querySelector(".calpinage-svg")?.querySelectorAll("rect").length >
            0,
          `${route.path}: plan de calpinage dessiné`,
        );
    }
    if (route.kind === "theme") {
      const pillar = pillars.find((p) => p.id === route.id);
      const doc = JSDOM.fragment(html);
      assert.equal(doc.querySelector("h1").textContent, pillar.title);
      assert.equal(
        doc.querySelectorAll(".pillar-section").length,
        pillar.sections.length,
      );
      assert.deepEqual(
        [...doc.querySelectorAll(".tutorial-links a")].map((a) =>
          a.getAttribute("href"),
        ),
        pillar.sections.flatMap((s) => s.tutorials.map(tutorialPath)),
      );
      const breadcrumb = JSON.parse(
        doc.querySelector('script[type="application/ld+json"]').textContent,
      );
      assert.equal(
        breadcrumb.itemListElement.at(-1).item,
        `${origin}${route.path}`,
      );
      assert(
        home.includes(`href="${route.path}"`),
        `${route.path}: lien depuis l’accueil`,
      );
    }
    for (const [, internalHref] of html.matchAll(/href="(\/(?!\/)[^"]*)"/g)) {
      const path = internalHref.replaceAll("&amp;", "&");
      if (
        path.startsWith("/assets/") ||
        path.startsWith("/fonts/") ||
        path.startsWith("/images/") ||
        path === "/favicon.svg"
      )
        continue;
      assert.notEqual(
        matchRoute(tutorials, path).kind,
        "notFound",
        `${route.path}: lien interne ${path}`,
      );
    }
  }
  await access("dist/404.html");
  const notFound = await readFile("dist/404.html", "utf8");
  assert(notFound.includes('content="noindex"'));
  assert(notFound.includes("Page introuvable"));

  const sitemap = await readFile("dist/sitemap.xml", "utf8");
  const locs = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
  assert.deepEqual(
    locs,
    routes.map((route) => `${origin}${route.path}`),
    "sitemap identique aux routes",
  );
  const robots = await readFile("dist/robots.txt", "utf8");
  assert(robots.includes(`Sitemap: ${origin}/sitemap.xml`));

  // --- Shim des anciens liens à fragment ---
  {
    const html = await readFile("dist/index.html", "utf8");
    const shim = html.match(
      /<script>(\(function\(\)\{[\s\S]*?\}\)\(\);)<\/script>/,
    );
    assert(shim, "shim des anciens liens présent dans le document");
    const run = (hash) => {
      const calls = [];
      runInNewContext(shim[1], {
        location: { hash, replace: (url) => calls.push(url) },
        history: { replaceState: () => {} },
      });
      return calls;
    };
    assert.deepEqual(run("#tutoriel/poser-du-parquet"), [
      "/tutoriel/poser-du-parquet/",
    ]);
    assert.deepEqual(run("#tutoriels?categorie=plomberie"), [
      "/tutoriels/?categorie=plomberie",
    ]);
    assert.deepEqual(run(""), [], "pas de redirection sans fragment");
    assert.deepEqual(run("#a-propos"), [], "fragment non routé ignoré");
  }

  // --- Hydratation sans erreur ---
  // L'origine servie est volontairement différente de SITE_URL (cas d'une URL de
  // prévisualisation) : le client doit reprendre l'origine du document, pas
  // `location.origin`, sinon les métadonnées absolues divergent (React #418).
  for (const path of [
    "/",
    "/themes/plomberie/",
    "/tutoriel/plomberie-pehd/",
    "/calculateurs/calpinage/",
    "/calculateurs/escalier/",
  ]) {
    const dom = new JSDOM(await readFile(fileFor(path), "utf8"), {
      url: `https://apercu-deploiement.netlify.app${path}`,
      virtualConsole: new VirtualConsole(),
    });
    dom.window.scrollTo = () => {};
    const siteUrl = dom.window.document.documentElement.dataset.siteUrl;
    assert.equal(
      siteUrl,
      origin,
      "origine de publication portée par le document",
    );
    const css = [
      ...dom.window.document.querySelectorAll('link[rel="stylesheet"]'),
    ]
      .map((el) => el.getAttribute("href"))
      .filter(Boolean);
    const modules = [
      ...dom.window.document.querySelectorAll('script[type="module"]'),
    ]
      .map((el) => el.getAttribute("src"))
      .filter(Boolean);
    const messages = [];
    dom.virtualConsole.on("jsdomError", (error) =>
      messages.push(error.message),
    );
    const originalError = console.error;
    const originalWarn = console.warn;
    globalThis.window = dom.window;
    globalThis.document = dom.window.document;
    globalThis.location = dom.window.location;
    globalThis.history = dom.window.history;
    globalThis.Node = dom.window.Node;
    Object.defineProperty(globalThis, "navigator", {
      value: dom.window.navigator,
      configurable: true,
      writable: true,
    });
    console.error = (...args) => messages.push(String(args[0]));
    console.warn = (...args) => messages.push(String(args[0]));
    globalThis.IS_REACT_ACT_ENVIRONMENT = true;
    try {
      const { hydrateRoot } = await import("react-dom/client");
      let root;
      await act(async () => {
        root = hydrateRoot(
          dom.window.document,
          createElement(Document, {
            initialPath: path,
            siteUrl,
            assets: { css, modules },
          }),
        );
      });
      try {
        if (path === "/themes/plomberie/") {
          const click = async (selector) => {
            const anchor = document.querySelector(selector);
            assert(anchor, `Lien de navigation présent : ${selector}`);
            await act(async () =>
              anchor.dispatchEvent(
                new dom.window.MouseEvent("click", {
                  bubbles: true,
                  cancelable: true,
                  button: 0,
                }),
              ),
            );
          };
          await click('.pillar-section a[href="/tutoriel/plomberie-pehd/"]');
          assert.equal(location.pathname, "/tutoriel/plomberie-pehd/");
          assert.equal(
            document.querySelector('link[rel="canonical"]').href,
            `${origin}/tutoriel/plomberie-pehd/`,
          );
          assert.equal(
            document.querySelectorAll(".continue-reading a").length,
            3,
          );
          await click('.tutorial-tags a[href="/tutoriels/?q=PEHD"]');
          assert.equal(
            location.pathname + location.search,
            "/tutoriels/?q=PEHD",
          );
          assert.equal(document.querySelectorAll(".tutorial-card").length, 1);
          assert.equal(
            document.querySelector(
              'input[aria-label="Rechercher dans les tutoriels"]',
            ).value,
            "PEHD",
          );
          assert.equal(
            document.querySelector('link[rel="canonical"]').href,
            `${origin}/tutoriels/`,
          );
        }
        if (path === "/calculateurs/calpinage/") {
          // Le calcul doit se refaire dans le navigateur, sans requête réseau.
          const input = document.querySelector("#champ-longueur");
          assert(input, "Le champ de saisie est rendu");
          const setter = Object.getOwnPropertyDescriptor(
            dom.window.HTMLInputElement.prototype,
            "value",
          ).set;
          const avant = document.querySelector(".result-headline").textContent;
          await act(async () => {
            setter.call(input, "6");
            input.dispatchEvent(
              new dom.window.Event("input", { bubbles: true }),
            );
          });
          const apres = document.querySelector(".result-headline").textContent;
          assert.notEqual(apres, avant, "Le résultat suit la saisie");
          assert(
            document.querySelector(".calpinage-svg"),
            "Le plan reste dessiné après la saisie",
          );
          await act(async () => {
            setter.call(input, "");
            input.dispatchEvent(
              new dom.window.Event("input", { bubbles: true }),
            );
          });
          assert.equal(
            document.querySelector(".result-headline"),
            null,
            "Une saisie vide ne laisse aucun résultat chiffré",
          );
          assert(
            document
              .querySelector(".result-warnings")
              ?.textContent.includes("saisis un nombre"),
            "Le message nomme le champ à corriger",
          );
          assert.equal(input.getAttribute("aria-invalid"), "true");
          assert(
            input
              .getAttribute("aria-describedby")
              .includes("champ-longueur-erreur"),
          );
        }
        if (path === "/calculateurs/escalier/") {
          const shape = document.querySelector("#champ-forme");
          await act(async () => {
            shape.value = "rayonnant";
            shape.dispatchEvent(
              new dom.window.Event("change", { bubbles: true }),
            );
          });
          assert(
            document.querySelector("#champ-jour"),
            "Le quart tournant expose son jour",
          );
          assert.equal(document.querySelectorAll(".stair-svg").length, 2);
          const before = document
            .querySelector(".stair-walk")
            .getAttribute("points");
          const direction = document.querySelector("#champ-sens");
          await act(async () => {
            direction.value = "gauche";
            direction.dispatchEvent(
              new dom.window.Event("change", { bubbles: true }),
            );
          });
          assert.notEqual(
            document.querySelector(".stair-walk").getAttribute("points"),
            before,
            "Le plan reflète le sens du tournant",
          );
          await act(async () => {
            dom.window.history.pushState(
              {},
              "",
              "/calculateurs/pente-evacuation-pvc/",
            );
            dom.window.dispatchEvent(new dom.window.PopStateEvent("popstate"));
          });
          assert.equal(
            document.querySelector("#champ-longueur").value,
            "3",
            "Changer d’outil réinitialise les valeurs",
          );
          assert(
            document
              .querySelector(".result-headline")
              .textContent.includes("4,5 cm"),
          );
          assert.equal(
            document.querySelector('link[rel="canonical"]').href,
            `${origin}/calculateurs/pente-evacuation-pvc/`,
          );
        }
      } finally {
        await act(async () => root.unmount());
      }
    } finally {
      // Les globals DOM restent en place : React poursuit son travail planifié
      // après l'unmount et lit encore `window`.
      console.error = originalError;
      console.warn = originalWarn;
      globalThis.IS_REACT_ACT_ENVIRONMENT = false;
    }
    const relevant = messages.filter(
      (message) =>
        !/not wrapped in act|IS_REACT_ACT_ENVIRONMENT|DevTools/i.test(message),
    );
    assert.deepEqual(relevant, [], `hydratation : ${relevant.join(" | ")}`);
  }

  const { checkAutocomplete } = await import("./check-autocomplete.mjs");
  await checkAutocomplete(server);

  console.log(
    `Accueil, catalogue, ${tutorials.length} fiches, ${routes.filter((route) => route.kind === "theme").length} thèmes, ${calculators.length} calculateurs, ${routes.length} URLs, tags, liens complémentaires, sitemap, robots, fil d’Ariane, 404, shim, calcul et hydratation : contrôles réussis.`,
  );
} finally {
  await server.close();
}
