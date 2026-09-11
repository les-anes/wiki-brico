import assert from "node:assert/strict";
import { validateTutorialLinks } from "./validate-tutorial-links.mjs";
import { createServer } from "vite";
import { createServer as createHttpServer } from "node:http";
import { renderToStaticMarkup } from "react-dom/server";
import { createElement } from "react";
import { access, readFile } from "node:fs/promises";
import { JSDOM, VirtualConsole } from "jsdom";
import { runInNewContext } from "node:vm";

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
	const { categories, journeys } = await server.ssrLoadModule(
		"/src/data/taxonomy.ts",
	);
	const { belongsToCategory, catalogHref, readCatalogFilters } =
		await server.ssrLoadModule("/src/lib/catalog.ts");
	const { buildRoutes, matchRoute, pageMeta, tutorialPath } =
		await server.ssrLoadModule("/src/lib/routes.ts");
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
	assert.equal(tutorials.length, 14);
	assert.equal(new Set(tutorials.map((t) => t.id)).size, 14);
	const home = render("/");
	assert(home.includes("Vos deux mains."));
	assert.equal(countCards(home), 0, "Catalogue séparé de l’accueil");
	assert(!home.includes("On s’y met ce week-end ?"));
	assert(home.includes("/favicon.svg"));
	assert(!home.includes("Tutoriel introuvable"));
	assert.equal(countCards(render("/tutoriels/")), 14);
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
		assert(
			tutorial.steps.length >= 5 && tutorial.steps.length <= 6,
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
			const jsonld = html.match(
				/<script type="application\/ld\+json">([\s\S]*?)<\/script>/,
			);
			assert(jsonld, `${route.path}: BreadcrumbList présent`);
			const breadcrumb = JSON.parse(jsonld[1]);
			assert.equal(breadcrumb["@type"], "BreadcrumbList");
			assert.equal(breadcrumb.itemListElement.length, 4);
			assert(!html.includes('"HowTo"'), `${route.path}: pas de balisage HowTo`);
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
	{
		const dom = new JSDOM(await readFile("dist/index.html", "utf8"), {
			url: "https://apercu-deploiement.netlify.app/",
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
		const originalError = console.error;
		const originalWarn = console.warn;
		globalThis.window = dom.window;
		globalThis.document = dom.window.document;
		globalThis.location = dom.window.location;
		Object.defineProperty(globalThis, "navigator", {
			value: dom.window.navigator,
			configurable: true,
			writable: true,
		});
		console.error = (...args) => messages.push(String(args[0]));
		console.warn = (...args) => messages.push(String(args[0]));
		try {
			const { hydrateRoot } = await import("react-dom/client");
			const root = hydrateRoot(
				dom.window.document,
				createElement(Document, {
					initialPath: "/",
					siteUrl,
					assets: { css, modules },
				}),
			);
			await new Promise((resolve) => setTimeout(resolve, 0));
			root.unmount();
		} finally {
			// Les globals DOM restent en place : React poursuit son travail planifié
			// après l'unmount et lit encore `window`.
			console.error = originalError;
			console.warn = originalWarn;
		}
		const relevant = messages.filter(
			(message) =>
				!/not wrapped in act|IS_REACT_ACT_ENVIRONMENT|DevTools/i.test(message),
		);
		assert.deepEqual(relevant, [], `hydratation : ${relevant.join(" | ")}`);
	}

	console.log(
		"Accueil, catalogue, 14 fiches, 16 URLs, sitemap, robots, fil d’Ariane, 404, shim et hydratation : contrôles réussis.",
	);
} finally {
	await server.close();
}
