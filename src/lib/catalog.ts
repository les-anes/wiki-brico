import type { Tutorial } from "@/types";

import { matchesTopicPath } from "./topic-path";
export interface CatalogFilters {
  category: string;
  topicPath: string[];
  query: string;
  difficulty: string;
  savedOnly: boolean;
  journey: string;
}
const defaultFilters: CatalogFilters = {
  category: "all",
  topicPath: [],
  query: "",
  difficulty: "all",
  savedOnly: false,
  journey: "all",
};
export function catalogHref(filters: Partial<CatalogFilters> = {}) {
  const f = { ...defaultFilters, ...filters };
  const params = new URLSearchParams();
  if (f.category !== "all") params.set("categorie", f.category);
  f.topicPath.forEach((topic) => params.append("sujet", topic));
  if (f.query) params.set("q", f.query);
  if (f.difficulty !== "all") params.set("niveau", f.difficulty);
  if (f.savedOnly) params.set("favoris", "1");
  if (f.journey !== "all") params.set("parcours", f.journey);
  return `/tutoriels/${params.size ? `?${params}` : ""}`;
}
export function readCatalogFilters(path: string): CatalogFilters {
  const params = new URLSearchParams(path.split("?")[1] ?? "");
  return {
    category: params.get("categorie") || "all",
    topicPath: params.getAll("sujet"),
    query: params.get("q") || "",
    difficulty: params.get("niveau") || "all",
    savedOnly: params.get("favoris") === "1",
    journey: params.get("parcours") || "all",
  };
}
export function belongsToCategory(
  tutorial: Tutorial,
  category: string,
  topicPath: string[] = [],
) {
  if (category === "all") return true;
  return [
    { category: tutorial.category, topicPath: tutorial.topicPath },
    ...(tutorial.relatedCategories ?? []),
  ].some(
    (entry) =>
      entry.category === category &&
      matchesTopicPath(entry.topicPath, topicPath),
  );
}
export const normalize = (s: string) =>
  s
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
export const duration = (minutes: number | null) =>
  minutes === null
    ? "Durée à préciser"
    : minutes < 60
      ? `${minutes} min`
      : `${Math.floor(minutes / 60)} h${minutes % 60 ? ` ${minutes % 60}` : ""}`;
