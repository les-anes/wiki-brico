import type { Tutorial } from "@/types";

import pillars from "../data/pillars.json" with { type: "json" };
import { calculators } from "./calculators/index.ts";
import {
  calculatorPath,
  categoryPath,
  type RouteContext,
  tutorialPath,
} from "./routes.ts";

/*
 * Lisibilité par les moteurs génératifs (ChatGPT, Perplexity, Claude…) : données
 * structurées et versions Markdown dérivées des mêmes JSON que les pages. Les
 * sources de recherche et le périmètre, masqués dans la page, ne sont exposés
 * que dans la version Markdown : un moteur peut citer la fiche sans la sortir
 * de son cadre, et le HTML reste conforme à la spec `page-tutoriel`.
 */

const SITE_NAME = "WikiBrico";
const SITE_DESCRIPTION =
  "Encyclopédie française du bricolage et de la rénovation : des tutoriels structurés, étape par étape, avec outils, matériaux, budget et précautions.";

function base(siteUrl: string): string {
  return siteUrl.replace(/\/+$/, "");
}

export function tutorialMarkdownPath(id: string): string {
  return `${tutorialPath(id)}index.md`;
}

function categoryName(ctx: RouteContext, id: string): string {
  return ctx.categories.find((c) => c.id === id)?.name ?? id;
}

function organization(siteUrl: string) {
  return {
    "@type": "Organization",
    "@id": `${base(siteUrl)}/#organisation`,
    name: SITE_NAME,
    url: `${base(siteUrl)}/`,
  };
}

/** Accueil : identité du site, pour que les moteurs rattachent les fiches à une même source. */
export function siteJsonLd(siteUrl: string) {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_NAME,
    url: `${base(siteUrl)}/`,
    description: SITE_DESCRIPTION,
    inLanguage: "fr-FR",
    publisher: organization(siteUrl),
  };
}

/**
 * Fiche : article technique daté, qui cite ses DTU. Pas de `HowTo` (voir spec
 * `referencement`) ni de sources de recherche, absentes du HTML des fiches.
 */
export function tutorialJsonLd(t: Tutorial, ctx: RouteContext) {
  const url = `${base(ctx.siteUrl)}${tutorialPath(t.id)}`;
  const citation = (t.dtuReferences ?? []).map((r) => ({
    "@type": "CreativeWork",
    name: `${r.reference} — ${r.title}`,
    url: r.url,
  }));
  return {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    headline: t.title,
    description: t.description,
    image: `${base(ctx.siteUrl)}${t.image}`,
    url,
    mainEntityOfPage: url,
    inLanguage: "fr-FR",
    dateModified: t.updatedAt,
    articleSection: categoryName(ctx, t.category),
    keywords: t.tags.join(", "),
    ...(t.difficulty && { proficiencyLevel: t.difficulty }),
    ...(!!t.durationMinutes && { timeRequired: `PT${t.durationMinutes}M` }),
    author: organization(ctx.siteUrl),
    publisher: organization(ctx.siteUrl),
    ...(citation.length > 0 && { citation }),
  };
}

const list = (items: string[]) => items.map((item) => `- ${item}`).join("\n");

/** Fiche complète en Markdown, servie à `/tutoriel/<id>/index.md`. */
export function tutorialMarkdown(t: Tutorial, ctx: RouteContext): string {
  const origin = base(ctx.siteUrl);
  const facts = [
    `Catégorie : ${categoryName(ctx, t.category)}`,
    t.difficulty && `Difficulté : ${t.difficulty}`,
    t.durationMinutes && `Durée indicative : ${t.durationMinutes} min`,
    t.cost && `Budget indicatif : ${t.cost.min}–${t.cost.max} €`,
    `Mis à jour le : ${t.updatedAt}`,
    `Page : ${origin}${tutorialPath(t.id)}`,
  ].filter((fact): fact is string => !!fact);
  const related = t.relatedTutorials
    .map((id) => ctx.tutorials.find((other) => other.id === id))
    .filter((other): other is Tutorial => !!other);

  const sections: [string, string | undefined][] = [
    ["Périmètre", t.scope],
    ["Estimations", t.estimatesNote],
    ["Outils", list(t.tools)],
    ["Matériaux", list(t.materials.map((m) => `${m.name} — ${m.quantity}`))],
    [
      "Étapes",
      t.steps
        .map((s, i) => `### ${i + 1}. ${s.title}\n\n${s.description}`)
        .join("\n\n"),
    ],
    ["Erreurs à éviter", list(t.mistakes)],
    ["Précautions", list(t.safety)],
    [
      "Références DTU",
      list(
        (t.dtuReferences ?? []).map(
          (r) => `[${r.reference} — ${r.title}](${r.url})`,
        ),
      ),
    ],
    [
      "Sources consultées",
      list(
        (t.sources ?? []).map(
          (s) =>
            `[${s.title}](${s.url}) — ${s.note} (consulté le ${s.accessedAt})`,
        ),
      ),
    ],
    [
      "Pour continuer",
      list(
        related.map(
          (other) => `[${other.title}](${origin}${tutorialPath(other.id)})`,
        ),
      ),
    ],
  ];

  return [
    `# ${t.title}`,
    `> ${t.description}`,
    list(facts),
    ...sections
      .filter(([, body]) => body)
      .map(([title, body]) => `## ${title}\n\n${body}`),
  ]
    .join("\n\n")
    .concat("\n");
}

/** Index du site au format https://llmstxt.org, servi à `/llms.txt`. */
export function llmsTxt(ctx: RouteContext): string {
  const origin = base(ctx.siteUrl);
  const byCategory = ctx.categories
    .map((category) => ({
      name: category.name,
      tutorials: ctx.tutorials.filter((t) => t.category === category.id),
    }))
    .filter((group) => group.tutorials.length);

  return [
    `# ${SITE_NAME}`,
    `> ${SITE_DESCRIPTION}`,
    "Chaque fiche existe en HTML et en Markdown (lien ci-dessous). Elle précise son périmètre, les outils, les matériaux, les étapes, les erreurs à éviter, les précautions et les sources consultées. Les durées et budgets sont indicatifs.",
    ...byCategory.map(
      (group) =>
        `## Tutoriels — ${group.name}\n\n${list(
          group.tutorials.map(
            (t) =>
              `[${t.title}](${origin}${tutorialMarkdownPath(t.id)}): ${t.description}`,
          ),
        )}`,
    ),
    `## Guides thématiques\n\n${list(
      pillars.map(
        (p) => `[${p.title}](${origin}${categoryPath(p.id)}): ${p.description}`,
      ),
    )}`,
    `## Calculateurs\n\n${list(
      calculators.map(
        (c) =>
          `[${c.title}](${origin}${calculatorPath(c.slug)}): ${c.description}`,
      ),
    )}`,
  ]
    .join("\n\n")
    .concat("\n");
}
