import type { CalculatorInputs, CalculatorOutput } from "@/types";

import { definitionOf } from "./definitions.ts";
import { fr, invalid, reader, roundUp } from "./format.ts";

const definition = definitionOf("ossature-montants");

/** Espacement des vis à plaque, pris au milieu de la plage de 25 à 30 cm. */
const VIS_PLAQUE = 0.275;

/** Montants, rails et visserie d’une cloison sur ossature métallique. */
export function compute(inputs: CalculatorInputs): CalculatorOutput {
  const read = reader(definition, inputs);
  const longueur = read.number("longueur");
  const hauteur = read.number("hauteur");
  const entraxe = Number(read.option("entraxe")) / 100;
  const barre = Number(read.option("barre"));
  if (read.errors.length) return invalid(read.errors);

  const intervalles = roundUp(longueur / entraxe);
  const montants = intervalles + 1;
  const parBarre = Math.floor(barre / hauteur + 1e-9);
  if (hauteur > barre)
    return invalid([
      "Hauteur sous plafond : la barre choisie est trop courte. Choisis un profilé d’un seul tenant adapté ; les aboutages ne sont pas calculés.",
    ]);
  const barresMontants = roundUp(montants / parBarre);
  const rails = 2;
  const barresRails = rails * roundUp(longueur / barre);
  const vis = 2 * (roundUp(hauteur / VIS_PLAQUE) + 1) * montants;
  const surface = longueur * hauteur;

  const warnings: string[] = [];
  const chuteMontant = parBarre >= 1 ? barre - parBarre * hauteur : 0;
  if (chuteMontant > 0 && chuteMontant < 0.2)
    warnings.push(
      `Il reste moins de ${fr(chuteMontant * 100, 0)} cm par barre de montant : cette chute ne fournit pas un montant complet supplémentaire.`,
    );
  warnings.push(
    `L’entraxe de ${fr(entraxe * 100, 0)} cm est celui saisi : vérifie la préconisation du fabricant de profilés pour ta hauteur et la charge suspendue.`,
  );

  return {
    headline: `${fr(montants)} montants et ${fr(barresRails)} barres de rails`,
    values: [
      {
        label: "Montants",
        value: `${fr(montants)} profilés de ${fr(hauteur, 2)} m`,
        hint: `${fr(intervalles)} intervalles de ${fr(entraxe * 100, 0)} cm au maximum, plus un montant en about de chaque côté.`,
      },
      {
        label: "Barres de montants",
        value: `${fr(barresMontants)} barres de ${fr(barre, 0)} m`,
        hint:
          parBarre >= 1
            ? `${fr(parBarre)} montant${parBarre > 1 ? "s" : ""} par barre.`
            : "Hauteur supérieure à une barre : aboutage nécessaire.",
      },
      {
        label: "Rails",
        value: `${fr(barresRails)} barres de ${fr(barre, 0)} m`,
        hint: `Un rail au sol et un au plafond, sur ${fr(longueur, 1)} m de longueur.`,
      },
      {
        label: "Vis à plaque (estimation)",
        value: `environ ${fr(vis, 0)} vis`,
        hint: "Une vis tous les 27,5 cm sur chaque montant, faces de la cloison comprises.",
      },
      {
        label: "Surface de cloison",
        value: `${fr(surface, 2)} m²`,
        hint: "Pour chiffrer les plaques et l’isolant avec les autres outils.",
      },
    ],
    warnings,
  };
}
