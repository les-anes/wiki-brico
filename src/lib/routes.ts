import type { Tutorial } from "@/types";

import pillars from "../data/pillars.json" with { type: "json" };
import { calculatorHub, calculators } from "./calculators/index.ts";

export type Route =
  | { kind: "home"; path: "/" }
  | { kind: "catalog"; path: "/tutoriels/" }
  | { kind: "tutorial"; path: string; id: string }
  | { kind: "theme"; path: string; id: string }
  | { kind: "calculators"; path: "/calculateurs/" }
  | { kind: "calculator"; path: string; id: string }
  | { kind: "notFound"; path: string };

interface CategoryRef {
  id: string;
  name: string;
}

interface BreadcrumbItem {
  name: string;
  url: string;
}

export interface PageMeta {
  title: string;
  description: string;
  canonical: string;
  og: { title: string; description: string; url: string; image?: string };
  breadcrumb: BreadcrumbItem[];
}

export interface RouteContext {
  tutorials: Tutorial[];
  categories: CategoryRef[];
  siteUrl: string;
}

const HOME: Route = { kind: "home", path: "/" };
const CATALOG: Route = { kind: "catalog", path: "/tutoriels/" };
const CALCULATORS: Route = { kind: "calculators", path: "/calculateurs/" };

export function tutorialPath(id: string): string {
  return `/tutoriel/${id}/`;
}

export function calculatorPath(slug: string): string {
  return `/calculateurs/${slug}/`;
}

/** Chemin canonique d’un guide thématique, utilisé par le routeur et les métadonnées. */
function themePath(id: string): string {
  return `/themes/${id}/`;
}

export function categoryPath(id: string): string {
  return pillars.some((pillar) => pillar.id === id)
    ? themePath(id)
    : `/tutoriels/?categorie=${encodeURIComponent(id)}`;
}

/**
 * Une nouvelle query string n’est pas une nouvelle page : filtres, recherche et
 * favoris se mettent à jour sur place, sans déplacer le focus ni le défilement.
 */
export function isPageChange(previous: string, next: string): boolean {
  return previous.split("?")[0] !== next.split("?")[0];
}

export function buildRoutes(tutorials: Tutorial[]): Route[] {
  return [
    HOME,
    CATALOG,
    ...tutorials.map((t): Route => ({
      kind: "tutorial",
      path: tutorialPath(t.id),
      id: t.id,
    })),
    ...pillars.map((pillar): Route => ({
      kind: "theme",
      path: themePath(pillar.id),
      id: pillar.id,
    })),
    CALCULATORS,
    ...calculators.map((calculator): Route => ({
      kind: "calculator",
      path: calculatorPath(calculator.slug),
      id: calculator.slug,
    })),
  ];
}

/** Découpe un chemin entrant en segments, en ignorant query string et fragment. */
function segments(pathname: string): string[] {
  return pathname.split("?")[0].split("#")[0].split("/").filter(Boolean);
}

export function matchRoute(tutorials: Tutorial[], pathname: string): Route {
  const parts = segments(pathname);
  if (parts.length === 0) return HOME;
  if (parts.length === 1 && parts[0] === "tutoriels") return CATALOG;
  if (
    parts.length === 2 &&
    parts[0] === "themes" &&
    pillars.some((p) => p.id === parts[1])
  )
    return { kind: "theme", path: themePath(parts[1]), id: parts[1] };
  if (parts.length === 1 && parts[0] === "calculateurs") return CALCULATORS;
  if (parts.length === 2 && parts[0] === "calculateurs") {
    const slug = decodeURIComponent(parts[1]);
    return calculators.some((calculator) => calculator.slug === slug)
      ? { kind: "calculator", path: calculatorPath(slug), id: slug }
      : { kind: "notFound", path: pathname };
  }
  if (parts.length === 2 && parts[0] === "tutoriel") {
    const id = decodeURIComponent(parts[1]);
    return tutorials.some((t) => t.id === id)
      ? { kind: "tutorial", path: tutorialPath(id), id }
      : { kind: "notFound", path: pathname };
  }
  return { kind: "notFound", path: pathname };
}

function origin(siteUrl: string): string {
  return siteUrl.replace(/\/+$/, "");
}

export function pageMeta(route: Route, ctx: RouteContext): PageMeta {
  const base = origin(ctx.siteUrl);

  if (route.kind === "theme") {
    const pillar = pillars.find((p) => p.id === route.id);
    if (!pillar) return pageMeta({ kind: "notFound", path: route.path }, ctx);
    const canonical = `${base}${themePath(pillar.id)}`;
    const title = `${pillar.title} — WikiBrico`;
    return {
      title,
      description: pillar.description,
      canonical,
      og: { title, description: pillar.description, url: canonical },
      breadcrumb: [
        { name: "Accueil", url: `${base}/` },
        { name: "Les tutoriels", url: `${base}/tutoriels/` },
        {
          name:
            ctx.categories.find((c) => c.id === pillar.id)?.name ??
            pillar.title,
          url: canonical,
        },
      ],
    };
  }

  if (route.kind === "tutorial") {
    const tutorial = ctx.tutorials.find((t) => t.id === route.id);
    if (!tutorial) return pageMeta({ kind: "notFound", path: route.path }, ctx);
    const canonical = `${base}${route.path}`;
    const categoryName =
      ctx.categories.find((c) => c.id === tutorial.category)?.name ??
      tutorial.category;
    return {
      title: `${tutorial.title} — WikiBrico`,
      description: tutorial.description,
      canonical,
      og: {
        title: tutorial.title,
        description: tutorial.description,
        url: canonical,
        image: `${base}${tutorial.image}`,
      },
      breadcrumb: [
        { name: "Accueil", url: `${base}/` },
        { name: "Les tutoriels", url: `${base}/tutoriels/` },
        {
          name: categoryName,
          url: `${base}${categoryPath(tutorial.category)}`,
        },
        { name: tutorial.title, url: canonical },
      ],
    };
  }

  if (route.kind === "calculators") {
    const canonical = `${base}/calculateurs/`;
    const title = `${calculatorHub.title} — WikiBrico`;
    return {
      title,
      description: calculatorHub.description,
      canonical,
      og: { title, description: calculatorHub.description, url: canonical },
      breadcrumb: [
        { name: "Accueil", url: `${base}/` },
        { name: calculatorHub.title, url: canonical },
      ],
    };
  }

  if (route.kind === "calculator") {
    const calculator = calculators.find((tool) => tool.slug === route.id);
    if (!calculator)
      return pageMeta({ kind: "notFound", path: route.path }, ctx);
    const canonical = `${base}${route.path}`;
    return {
      title: `${calculator.title} — WikiBrico`,
      description: calculator.description,
      canonical,
      og: {
        title: calculator.title,
        description: calculator.description,
        url: canonical,
      },
      breadcrumb: [
        { name: "Accueil", url: `${base}/` },
        { name: calculatorHub.title, url: `${base}/calculateurs/` },
        { name: calculator.title, url: canonical },
      ],
    };
  }

  if (route.kind === "catalog") {
    const canonical = `${base}/tutoriels/`;
    const title = "On s’y met ce week-end ? — WikiBrico";
    const description = `${ctx.tutorials.length} tutoriels de bricolage et de rénovation, expliqués étape par étape, avec outils, matériaux et budget.`;
    return {
      title,
      description,
      canonical,
      og: { title, description, url: canonical },
      breadcrumb: [
        { name: "Accueil", url: `${base}/` },
        { name: "Les tutoriels", url: canonical },
      ],
    };
  }

  if (route.kind === "home") {
    const canonical = `${base}/`;
    const title = "WikiBrico — Le savoir-faire se partage.";
    const description =
      "WikiBrico, l’encyclopédie du faire soi-même. Des tutoriels structurés pour apprendre à bricoler et rénover, étape par étape.";
    return {
      title,
      description,
      canonical,
      og: { title, description, url: canonical },
      breadcrumb: [{ name: "Accueil", url: canonical }],
    };
  }

  const canonical = `${base}${route.path}`;
  const title = "Page introuvable — WikiBrico";
  const description = "Cette page n’existe pas ou n’existe plus.";
  return {
    title,
    description,
    canonical,
    og: { title, description, url: canonical },
    breadcrumb: [],
  };
}
