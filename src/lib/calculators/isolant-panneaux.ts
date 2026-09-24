import type { CalculatorInputs, CalculatorOutput } from "@/types";

import { definitionOf } from "./definitions.ts";
import {
  fr,
  frTrim,
  invalid,
  reader,
  roundUp,
  selectSizeMm,
} from "./format.ts";

const definition = definitionOf("isolant-panneaux");

/** Nombre de panneaux ou de rouleaux d’isolant pour une surface. */
export function compute(inputs: CalculatorInputs): CalculatorOutput {
  const read = reader(definition, inputs);
  const surface = read.number("surface");
  const chute = read.number("chute");
  const format = read.option("format");
  if (read.errors.length) return invalid(read.errors);

  const size = selectSizeMm(format);
  const unitaire = (size.width / 1000) * (size.height / 1000);
  const aCouvrir = surface * (1 + chute / 100);
  const unites = roundUp(aCouvrir / unitaire);
  const achetee = unites * unitaire;
  const rouleau = format.startsWith("rouleau");

  const warnings: string[] = [];
  warnings.push(
    "Un isolant comprimé perd sa performance : découpe les panneaux à la cote réelle entre les montants, sans les forcer.",
  );

  return {
    headline: `${fr(unites)} ${rouleau ? "rouleaux" : "panneaux"} de ${frTrim(size.width / 10, 0)} × ${frTrim(size.height / 10, 0)} cm`,
    values: [
      { label: "Surface à isoler", value: `${fr(surface, 2)} m²` },
      {
        label: rouleau ? "Surface d’un rouleau" : "Surface d’un panneau",
        value: `${fr(unitaire, 2)} m²`,
      },
      {
        label: "Surface avec marge",
        value: `${fr(aCouvrir, 2)} m²`,
        hint: `Marge de ${fr(chute, 0)} % pour les coupes de rive et les ouvertures.`,
      },
      {
        label: "À prévoir",
        value: `${fr(unites)} ${rouleau ? "rouleaux" : "panneaux"}`,
        hint: `Soit ${fr(achetee, 2)} m², pour environ ${fr(achetee - surface, 2)} m² de chute.`,
      },
    ],
    warnings,
  };
}
