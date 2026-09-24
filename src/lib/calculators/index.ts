import type { Calculator, CalculatorInputs, CalculatorOutput } from "@/types";

import { compute as calpinage } from "./calpinage.ts";
import {
  calculatorDefinitions,
  calculatorHub,
  defaultInputs,
} from "./definitions.ts";
import { compute as dosage } from "./dosage-materiaux.ts";
import { compute as escalier } from "./escalier.ts";
import { compute as isolant } from "./isolant-panneaux.ts";
import { compute as ossature } from "./ossature-montants.ts";
import { compute as pente } from "./pente-evacuation.ts";
import { compute as puissance } from "./puissance-radiateur.ts";
import { compute as osb } from "./quantite-osb.ts";
import { compute as rejointoiement } from "./rejointoiement-chaux.ts";

export { calculatorHub, defaultInputs };

const formulas: Record<string, (inputs: CalculatorInputs) => CalculatorOutput> =
  {
    "pente-evacuation-pvc": pente,
    "quantite-osb": osb,
    "isolant-panneaux": isolant,
    "ossature-montants": ossature,
    "dosage-materiaux": dosage,
    calpinage,
    escalier,
    "rejointoiement-chaux": rejointoiement,
    "puissance-radiateur": puissance,
  };

// Un outil déclaré dans le JSON sans formule est une erreur de développement :
// mieux vaut échouer au chargement que servir une page muette.
export const calculators: Calculator[] = calculatorDefinitions.map(
  (definition) => {
    const compute = formulas[definition.slug];
    if (!compute) throw new Error(`Formule manquante pour ${definition.slug}`);
    return Object.assign({}, definition, { compute });
  },
);

export function findCalculator(slug: string): Calculator | undefined {
  return calculators.find((calculator) => calculator.slug === slug);
}
