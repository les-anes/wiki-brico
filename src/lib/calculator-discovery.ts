import { calculatorDefinitions } from "./calculators/definitions.ts";
import { searchScore } from "./search.ts";

/** Même tolérance aux fautes et mêmes règles d’acronymes que les tutoriels. */
export function searchCalculators(query: string) {
  if (!query.trim()) return [];
  return (
    calculatorDefinitions
      .map((tool) => ({
        tool,
        score: searchScore(
          tool.title,
          `${tool.description} ${tool.heading} calculateur ${tool.slug}`,
          query,
        ),
      }))
      .filter(({ score }) => Number.isFinite(score))
      // Tableau temporaire : le tri ne modifie pas les définitions.
      // oxlint-disable-next-line unicorn/no-array-sort
      .sort((a, b) => a.score - b.score)
      .map(({ tool }) => tool)
  );
}

/** Les associations éditoriales restent définies uniquement dans le calculateur. */
export function calculatorsForTutorial(id: string) {
  return calculatorDefinitions.filter((tool) =>
    tool.relatedTutorials.includes(id),
  );
}
