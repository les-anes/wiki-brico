import "./validate-data.mjs";
import { createServer } from "vite";
import { createServer as createHttpServer } from "node:http";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { createElement } from "react";
import { prerenderToNodeStream } from "react-dom/static";

function resolveSiteUrl(value) {
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

const origin = resolveSiteUrl(process.env.SITE_URL ?? "https://wikibrico.fr");

let manifest;
try {
	manifest = JSON.parse(await readFile("dist/.vite/manifest.json", "utf8"));
} catch {
	throw new Error(
		"Manifeste Vite introuvable : lancez `vite build` avant le prerendu.",
	);
}
const entry = Object.values(manifest).find((chunk) => chunk.isEntry);
if (!entry) throw new Error("Entrée introuvable dans le manifeste Vite.");
const assets = {
	css: (entry.css ?? []).map((file) => `/${file}`),
	modules: [`/${entry.file}`],
};

// Réutilise les vrais imports JSON et la transformation TS de Vite, sans port réseau.
const server = await createServer({
	server: {
		middlewareMode: true,
		hmr: { server: createHttpServer() },
		watch: null,
	},
	appType: "custom",
});

try {
	const { Document } = await server.ssrLoadModule("/src/document.tsx");
	const { buildRoutes } = await server.ssrLoadModule("/src/lib/routes.ts");
	const { tutorials } = await server.ssrLoadModule("/src/data/index.ts");

	const render = async (path) => {
		const { prelude } = await prerenderToNodeStream(
			createElement(Document, { initialPath: path, siteUrl: origin, assets }),
		);
		let html = "";
		for await (const chunk of prelude) html += chunk;
		return html;
	};

	const routes = buildRoutes(tutorials);
	for (const route of routes) {
		const file = join("dist", route.path.replace(/^\//, ""), "index.html");
		await mkdir(dirname(file), { recursive: true });
		await writeFile(file, await render(route.path));
	}
	await writeFile("dist/404.html", await render("/404/"));

	const updatedAt = new Map(
		tutorials.map((tutorial) => [
			`/tutoriel/${tutorial.id}/`,
			tutorial.updatedAt,
		]),
	);
	const urls = routes
		.map((route) => {
			const lastmod = updatedAt.get(route.path);
			const loc = `${origin}${route.path}`;
			return `<url><loc>${loc}</loc>${lastmod ? `<lastmod>${lastmod}</lastmod>` : ""}</url>`;
		})
		.join("");
	await writeFile(
		"dist/sitemap.xml",
		`<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls}</urlset>\n`,
	);
	await writeFile(
		"dist/robots.txt",
		`User-agent: *\nAllow: /\nSitemap: ${origin}/sitemap.xml\n`,
	);

	console.log(
		`Prerendu : ${routes.length} pages + 404.html, sitemap (${routes.length} URLs) et robots.txt pour ${origin}.`,
	);
} finally {
	await server.close();
}
