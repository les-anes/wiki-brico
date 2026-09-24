import type { CalculatorInputs, CalculatorOutput } from "@/types";

import { definitionOf } from "./definitions.ts";
import { fr, invalid, reader, roundUp } from "./format.ts";

const definition = definitionOf("rejointoiement-chaux");

/** Volume d’un seau de chantier, en litres. */
const SEAU = 10;

function seaux(litres: number): string {
  const valeur = roundUp((litres / SEAU) * 10) / 10;
  return `${fr(valeur, 1)} ${valeur > 1 ? "seaux" : "seau"}`;
}

/**
 * Mortier d’un rejointoiement à la chaux. Le volume vient des joints — leur
 * largeur, leur profondeur et leur part de la surface — et non de la surface du
 * mur.
 */
export function compute(inputs: CalculatorInputs): CalculatorOutput {
  const read = reader(definition, inputs);
  const surface = read.number("surface");
  const hauteur = read.number("hauteurPierre");
  const longueur = read.number("longueurPierre");
  const largeurJoint = read.number("largeurJoint");
  const profondeur = read.number("profondeur");
  const perte = read.number("perte");
  const proportion = Number(read.option("proportion"));
  if (read.errors.length) return invalid(read.errors);

  const joint = largeurJoint / 10;
  const part =
    1 - (hauteur * longueur) / ((hauteur + joint) * (longueur + joint));
  const litres =
    surface * (profondeur / 1000) * part * (1 + perte / 100) * 1000;
  const chaux = litres / (1 + proportion);
  const sable = litres - chaux;

  const warnings: string[] = [];
  if (profondeur < 10)
    warnings.push(
      "Moins d’un centimètre de profondeur à garnir : le mortier n’a rien à quoi s’accrocher et le joint se décolle. Dégarnis jusqu’à un mortier qui tient encore.",
    );
  if (largeurJoint > 40)
    warnings.push(
      "Des joints de plus de 4 cm se garnissent en deux passes, en laissant la première tirer entre les deux.",
    );
  if (part < 0.08)
    warnings.push(
      "Moins de 8 % de la surface en joints : vérifie la largeur des joints et la taille des pierres, l’estimation tient à ces deux mesures.",
    );
  if (perte === 0)
    warnings.push(
      "Sans marge de perte, le premier creux irrégulier te fera repartir en magasin.",
    );
  if (litres > 120)
    warnings.push(
      "Plus de 120 litres à gâcher : travaille par zones d’un à deux mètres carrés, en partant du haut du mur, et gâche au fur et à mesure.",
    );
  if (proportion === 2)
    warnings.push(
      "Proportion riche en liant : sur une pierre tendre, un mortier plus dur qu’elle la fait éclater. Un volume de chaux pour trois volumes de sable est plus prudent.",
    );

  return {
    headline: `${fr(litres, 0)} litres de mortier à gâcher`,
    values: [
      {
        label: "Mortier à gâcher",
        value: `${fr(litres, 1)} L`,
        hint: `Soit environ ${seaux(litres)} de ${fr(SEAU, 0)} L, marge de perte de ${fr(perte, 0)} % comprise.`,
      },
      {
        label: "Part des joints sur le mur",
        value: `${fr(part * 100, 1)} %`,
        hint: `Pour des pierres de ${fr(hauteur, 0)} × ${fr(longueur, 0)} cm et des joints de ${fr(largeurJoint, 0)} mm.`,
      },
      {
        label: "Chaux",
        value: `${fr(chaux, 1)} L`,
        hint: `Soit environ ${seaux(chaux)}. Convertis en sacs avec le volume indiqué sur l’emballage du produit.`,
      },
      {
        label: "Sable",
        value: `${fr(sable, 1)} L`,
        hint: `Soit environ ${seaux(sable)}, à doser au volume comme la chaux.`,
      },
      {
        label: "Mortier au mètre carré",
        value: `${fr(litres / surface, 1)} L/m²`,
        hint: "Pour chiffrer un autre mur du même appareillage.",
      },
    ],
    warnings,
  };
}
