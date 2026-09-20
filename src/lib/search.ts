import type { Tutorial } from "@/types";

const words = (text: string) =>
  text
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .match(/[a-z0-9]+/g) ?? [];

function oneTypo(query: string, word: string): boolean {
  if (query.length < 4 || Math.abs(query.length - word.length) > 1)
    return false;
  let index = 0;
  while (index < query.length && query[index] === word[index]) index++;
  if (query.length === word.length) {
    return (
      query.slice(index + 1) === word.slice(index + 1) ||
      (query[index] === word[index + 1] &&
        query[index + 1] === word[index] &&
        query.slice(index + 2) === word.slice(index + 2))
    );
  }
  return query.length > word.length
    ? query.slice(index + 1) === word.slice(index)
    : query.slice(index) === word.slice(index + 1);
}

/** Score croissant : correspondance exacte, puis faute ; titre prioritaire. */
export function searchScore(title: string, text: string, query: string) {
  const terms = words(query);
  if (!terms.length) return 0;
  const titleWords = words(title);
  const allWords = [...titleWords, ...words(text)];
  const exact = (list: string[]) =>
    terms.every((term) => list.some((word) => word.includes(term)));
  if (exact(titleWords)) return 0;
  if (exact(allWords)) return 1;
  // Une faute par mot suffit au catalogue actuel ; étendre ce seuil demanderait
  // un classement plus fin pour ne pas noyer les résultats pertinents.
  const fuzzy = (list: string[]) =>
    terms.every((term) =>
      list.some((word) => word.includes(term) || oneTypo(term, word)),
    );
  if (fuzzy(titleWords)) return 2;
  return fuzzy(allWords) ? 3 : Infinity;
}

/** Même sélection et même classement pour le catalogue et les suggestions. */
export function searchTutorials(
  tutorials: Tutorial[],
  categories: { id: string; name: string; shortName: string }[],
  query: string,
): Tutorial[] {
  return (
    tutorials
      .map((t) => ({
        tutorial: t,
        score: searchScore(
          t.title,
          [
            t.description,
            ...t.tools,
            ...[
              t.category,
              ...(t.relatedCategories ?? []).map((c) => c.category),
            ].flatMap((id) => {
              const match = categories.find((item) => item.id === id);
              return match ? [match.name, match.shortName] : [id];
            }),
            ...(t.topicPath ?? []),
            ...(t.relatedCategories ?? []).flatMap((c) => c.topicPath),
          ].join(" "),
          query,
        ),
      }))
      .filter(({ score }) => Number.isFinite(score))
      // Tableau temporaire : le tri en place ne modifie pas le catalogue source.
      // oxlint-disable-next-line unicorn/no-array-sort
      .sort((a, b) => a.score - b.score)
      .map(({ tutorial }) => tutorial)
  );
}
