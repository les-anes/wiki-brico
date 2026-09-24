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

const definition = definitionOf("quantite-osb");

/**
 * Nombre de panneaux OSB d’un plancher : le grand côté du panneau se pose en
 * travers des solives, donc le compte se fait en rangées.
 */
export function compute(inputs: CalculatorInputs): CalculatorOutput {
  const read = reader(definition, inputs);
  const longueur = read.number("longueur");
  const largeur = read.number("largeur");
  const chute = read.number("chute");
  const format = read.option("format");
  if (read.errors.length) return invalid(read.errors);

  const size = selectSizeMm(format);
  const long = Math.max(size.width, size.height) / 1000;
  const court = Math.min(size.width, size.height) / 1000;
  const rangees = roundUp(largeur / court);
  const parRangee = roundUp(longueur / long);
  const alignes = rangees * parRangee;
  const total = roundUp(alignes * (1 + chute / 100));
  const surface = longueur * largeur;
  const surfaceAchetee = total * long * court;
  const rive = largeur - (rangees - 1) * court;
  const coupeDeBout = longueur - (parRangee - 1) * long;

  const warnings: string[] = [];
  if (rive < 0.3)
    warnings.push(
      `La dernière rangée ne fait que ${fr(rive * 100, 1)} cm : vérifie la découpe et les appuis nécessaires sur le plan du solivage.`,
    );
  if (coupeDeBout < 0.3)
    warnings.push(
      `Le dernier panneau de chaque rangée est coupé à ${fr(coupeDeBout * 100, 1)} cm : vérifie les appuis de cette petite rive et ajuste le départ des rangs.`,
    );
  warnings.push(
    "Ce comptage en rangées ne vérifie ni les appuis ni le décalage des joints de bout : confronte-le au plan du solivage et à la notice des panneaux.",
  );

  return {
    headline: `${fr(total)} panneaux de ${frTrim(size.width / 10)} × ${frTrim(size.height / 10)} cm`,
    values: [
      {
        label: "Surface à couvrir",
        value: `${fr(surface, 2)} m²`,
      },
      {
        label: "Surface d’un panneau",
        value: `${fr(long * court, 2)} m²`,
      },
      {
        label: "Pose alignée",
        value: `${fr(alignes)} panneaux`,
        hint: `${fr(rangees)} rangées de ${fr(parRangee)} panneaux, grand côté en travers des solives.`,
      },
      {
        label: `Avec ${fr(chute, 0)} % de chute`,
        value: `${fr(total)} panneaux à prévoir`,
        hint: `Soit ${fr(surfaceAchetee, 2)} m² de panneaux pour ${fr(surface, 2)} m² de plancher.`,
      },
      {
        label: "Bande de rive de la dernière rangée",
        value: `${fr(rive * 100, 1)} cm`,
        hint: "Les jeux de 3 mm entre panneaux et le décalage des rangs ne sont pas comptés dans cette cote.",
      },
    ],
    warnings,
  };
}
