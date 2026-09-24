import type { CalculatorInputs, CalculatorOutput } from "@/types";

import { definitionOf } from "./definitions.ts";
import { fr, invalid, reader } from "./format.ts";

const definition = definitionOf("pente-evacuation-pvc");

/** Descente régulière d’un tronçon d’évacuation gravitaire. */
export function compute(inputs: CalculatorInputs): CalculatorOutput {
  const read = reader(definition, inputs);
  const longueur = read.number("longueur");
  const pente = read.number("pente");
  const hauteurDepart = read.number("hauteurDepart");
  if (read.errors.length) return invalid(read.errors);

  const descente = longueur * pente;
  const arrivee = hauteurDepart - descente;
  const degres = (Math.atan(pente / 100) * 180) / Math.PI;
  const warnings: string[] = [];
  if (pente < 1)
    warnings.push(
      `Pente de ${fr(pente, 1)} cm/m, sous le minimum de 1 cm/m du guide cité en référence : l’eau stagne et les dépôts s’accumulent.`,
    );
  if (pente > 4)
    warnings.push(
      `Pente de ${fr(pente, 1)} cm/m : hors de la plage de 1 à 2 cm/m retenue par la fiche de pose. Vérifie les prescriptions de ton système pour cette configuration.`,
    );
  if (arrivee < 0)
    warnings.push(
      `Le point d’arrivée tombe ${fr(-arrivee, 1)} cm sous le niveau de référence du sol : vérifie la hauteur disponible avant de tracer.`,
    );

  return {
    headline: `${fr(descente, 1)} cm de descente sur ${fr(longueur, 1)} m`,
    values: [
      {
        label: "Descente totale",
        value: `${fr(descente, 1)} cm`,
        hint: "À reporter sur toute la longueur du tronçon, sans creux intermédiaire.",
      },
      {
        label: "Repère tous les mètres",
        value: `${fr(pente, 1)} cm plus bas`,
        hint: "Un repère par mètre évite la contre-pente entre deux colliers.",
      },
      { label: "Pente en pourcentage", value: `${fr(pente, 1)} %` },
      { label: "Pente en degrés", value: `${fr(degres, 2)}°` },
      {
        label: "Hauteur du point d’arrivée",
        value: `${fr(arrivee, 1)} cm`,
        hint: `Pour un départ mesuré à ${fr(hauteurDepart, 1)} cm du sol.`,
      },
    ],
    warnings,
  };
}
