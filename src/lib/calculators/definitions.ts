import type {
  CalculatorDefinition,
  CalculatorHub,
  CalculatorInputs,
} from "@/types";

import data from "../../data/calculators.json" with { type: "json" };

// Le JSON est la source de vérité éditoriale : libellés, bornes, hypothèses et
// limites ne sont pas écrits dans les composants.
const definitions = data as unknown as {
  hub: CalculatorHub;
  tools: CalculatorDefinition[];
};

export const calculatorHub = definitions.hub;
export const calculatorDefinitions = definitions.tools;

export function visibleFields(
  definition: CalculatorDefinition,
  inputs: CalculatorInputs,
) {
  return definition.fields.filter(
    (field) =>
      !field.visibleWhen ||
      field.visibleWhen.values.includes(
        String(inputs[field.visibleWhen.field]),
      ),
  );
}

export function definitionOf(slug: string): CalculatorDefinition {
  const definition = definitions.tools.find((tool) => tool.slug === slug);
  if (!definition) throw new Error(`Outil inconnu : ${slug}`);
  return definition;
}

/** Valeurs de départ d’un outil, telles que rendues par le pré-rendu. */
export function defaultInputs(
  definition: CalculatorDefinition,
): Record<string, number | string> {
  return Object.fromEntries(
    definition.fields.map((field) => [field.name, field.default]),
  );
}
