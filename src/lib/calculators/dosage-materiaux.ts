import type { CalculatorInputs, CalculatorOutput } from "@/types";

import { definitionOf } from "./definitions.ts";
import { fr, invalid, reader, roundUp } from "./format.ts";

const definition = definitionOf("dosage-materiaux");

/** Liant, granulats et eau d’un volume de béton ou de mortier. */
export function compute(inputs: CalculatorInputs): CalculatorOutput {
  const read = reader(definition, inputs);
  const famille = read.option("famille");
  const dosage = read.number("dosage");
  const longueur = read.number("longueur");
  const largeur = read.number("largeur");
  const epaisseur = read.number("epaisseur");
  const poidsSac = Number(read.option("sac"));
  if (read.errors.length) return invalid(read.errors);

  const beton = famille === "beton";
  const eauDosage = read.number("eauDosage");
  const sableDosage = read.number("sableDosage");
  const gravierDosage = beton ? read.number("gravierDosage") : 0;
  if (read.errors.length) return invalid(read.errors);
  const volume = longueur * largeur * (epaisseur / 100);
  const liant = volume * dosage;
  const eau = volume * eauDosage;
  const sable = volume * sableDosage;
  const gravier = volume * gravierDosage;
  const sacs = roundUp(liant / poidsSac);
  const warnings = [
    "Les quantités reprennent la recette saisie, sans en valider la résistance ni l’usage. Les sacs sont des sacs de liant seul.",
  ];

  return {
    headline: `${fr(sacs)} sacs de ${fr(poidsSac, 0)} kg pour ${fr(volume, 3)} m³`,
    values: [
      {
        label: "Volume à couler",
        value: `${fr(volume, 3)} m³`,
        hint: `${fr(longueur, 2)} × ${fr(largeur, 2)} m sur ${fr(epaisseur, 1)} cm d’épaisseur.`,
      },
      {
        label: "Liant",
        value: `${fr(liant, 0)} kg`,
        hint: `Soit ${fr(sacs)} sac${sacs > 1 ? "s" : ""} de ${fr(poidsSac, 0)} kg, pour un dosage de ${fr(dosage, 0)} kg/m³.`,
      },
      {
        label: "Eau",
        value: `environ ${fr(eau, 0)} litres`,
        hint: "Quantité de la recette, à ajuster en amont selon l’humidité des granulats.",
      },
      {
        label: "Sable",
        value: `${fr(sable, 0)} kg`,
        hint: "Masse issue du dosage de sable renseigné.",
      },
      ...(beton
        ? [
            {
              label: "Gravier",
              value: `${fr(gravier, 0)} kg`,
              hint: "Masse issue du dosage de gravier renseigné.",
            },
          ]
        : []),
    ],
    warnings,
  };
}
