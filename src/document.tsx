import { useCallback, useEffect, useState } from "react";
import App from "@/App";
import { tutorials } from "@/data";
import { categories } from "@/data/taxonomy";
import { matchRoute, pageMeta } from "@/lib/routes";

export interface DocumentAssets {
	css: string[];
	modules: string[];
}

/** Rétablit les anciens liens à fragment (`/#tutoriel/<id>`) vers les URLs canoniques. */
const hashShim = [
	"(function(){",
	'var raw=location.hash;if(!raw||raw==="#"){if(raw==="#")history.replaceState(null,"","/");return;}',
	'raw=raw.slice(1);var query="";var q=raw.indexOf("?");if(q>-1){query=raw.slice(q);raw=raw.slice(0,q);}',
	'if(raw!=="tutoriels"&&raw.indexOf("tutoriel/")!==0)return;',
	'var path=raw==="tutoriels"?"/tutoriels/":"/tutoriel/"+raw.slice("tutoriel/".length)+"/";',
	"location.replace(path+query);",
	"})();",
].join("");

export function Document({
	initialPath,
	siteUrl,
	assets,
}: {
	initialPath: string;
	siteUrl: string;
	assets: DocumentAssets;
}) {
	const [path, setPath] = useState(initialPath);

	useEffect(() => {
		const onPop = () => setPath(location.pathname + location.search);
		const onClick = (event: MouseEvent) => {
			if (
				event.defaultPrevented ||
				event.button !== 0 ||
				event.metaKey ||
				event.ctrlKey ||
				event.shiftKey ||
				event.altKey
			)
				return;
			const anchor = (event.target as HTMLElement | null)?.closest("a");
			const href = anchor?.getAttribute("href");
			if (!anchor || !href || !href.startsWith("/")) return;
			if (anchor.target === "_blank" || anchor.hasAttribute("download")) return;
			event.preventDefault();
			history.pushState(null, "", href);
			setPath(location.pathname + location.search);
			window.scrollTo(0, 0);
		};
		window.addEventListener("popstate", onPop);
		document.addEventListener("click", onClick);
		return () => {
			window.removeEventListener("popstate", onPop);
			document.removeEventListener("click", onClick);
		};
	}, []);

	const navigate = useCallback((href: string, replace = false) => {
		if (replace) history.replaceState(null, "", href);
		else history.pushState(null, "", href);
		setPath(location.pathname + location.search);
		window.scrollTo(0, 0);
	}, []);

	const route = matchRoute(tutorials, path);
	const meta = pageMeta(route, { tutorials, categories, siteUrl });
	const breadcrumb =
		meta.breadcrumb.length > 1
			? {
					"@context": "https://schema.org",
					"@type": "BreadcrumbList",
					itemListElement: meta.breadcrumb.map((item, index) => ({
						"@type": "ListItem",
						position: index + 1,
						name: item.name,
						item: item.url,
					})),
				}
			: null;

	return (
		<html lang="fr" data-site-url={siteUrl}>
			<head>
				<meta charSet="UTF-8" />
				<meta name="viewport" content="width=device-width, initial-scale=1.0" />
				<link rel="icon" type="image/svg+xml" href="/favicon.svg" />
				<meta name="theme-color" content="#f8f7f3" />
				<title>{meta.title}</title>
				<meta name="description" content={meta.description} />
				<link rel="canonical" href={meta.canonical} />
				{route.kind === "notFound" && <meta name="robots" content="noindex" />}
				<meta property="og:type" content="website" />
				<meta property="og:site_name" content="WikiBrico" />
				<meta property="og:title" content={meta.og.title} />
				<meta property="og:description" content={meta.og.description} />
				<meta property="og:url" content={meta.og.url} />
				{meta.og.image && <meta property="og:image" content={meta.og.image} />}
				<meta
					name="twitter:card"
					content={meta.og.image ? "summary_large_image" : "summary"}
				/>
				{assets.css.map((href) => (
					<link key={href} rel="stylesheet" href={href} />
				))}
				{breadcrumb && (
					<script type="application/ld+json">
						{JSON.stringify(breadcrumb)}
					</script>
				)}
			</head>
			<body>
				<App path={path} navigate={navigate} />
				<script>{hashShim}</script>
				{assets.modules.map((src) => (
					<script key={src} type="module" src={src} />
				))}
			</body>
		</html>
	);
}
