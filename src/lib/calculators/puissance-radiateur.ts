import type { CalculatorInputs, CalculatorOutput } from "@/types";

import { definitionOf } from "./definitions.ts";
import { fr, invalid, reader } from "./format.ts";

const definition = definitionOf("puissance-radiateur");

/** Puissances commerciales courantes d’un radiateur mural, en watts. */
const MODELES = [500, 750, 1000, 1250, 1500, 1750, 2000, 2500, 3000];
/** Hauteur de plafond de référence de la règle en watts par mètre carré. */
const HAUTEUR_REFERENCE = 2.5;

/**
 * Puissance d’un radiateur à partir du volume à chauffer : volume × coefficient
 * volumétrique, puis corrections saisies et puissance commerciale la plus proche.
 */
export function compute(inputs: CalculatorInputs): CalculatorOutput {
  const read = reader(definition, inputs);
  const longueur = read.number("longueur");
  const largeur = read.number("largeur");
  const hauteur = read.number("hauteur");
  const majoration = read.number("majoration");
  const coefficient = Number(read.option("isolation"));
  if (read.errors.length) return invalid(read.errors);

  const surface = longueur * largeur;
  const volume = surface * hauteur;
  const theorique = volume * coefficient;
  const conseillee = theorique * (1 + majoration / 100);
  const parMetreCarre = theorique / surface;
  const modele = MODELES.find((puissance) => puissance >= conseillee);
  const sansModele = modele === undefined;

  const warnings: string[] = [];
  if (majoration === 0)
    warnings.push(
      "Sans correction ni marge, une pièce froide, un simple vitrage ou une salle de bain te laisseront sous-dimensionné : mieux vaut un appareil légèrement plus puissant qu’un appareil juste.",
    );
  if (hauteur >= 3)
    warnings.push(
      `Plafond de ${fr(hauteur, 2)} m : l’air chaud s’accumule en haut, et la part du volume qui chauffe vraiment est plus faible que le volume total. Privilégie un appareil à inertie et une bonne circulation de l’air.`,
    );
  if (sansModele)
    warnings.push(
      `Plus de 3 000 W pour une seule pièce : répartis la puissance sur deux appareils, la chaleur sera plus uniforme et chaque appareil restera dans les puissances courantes.`,
    );
  if (conseillee < MODELES[0])
    warnings.push(
      `Moins de ${fr(MODELES[0], 0)} W : aucun radiateur mural ne descend si bas, sauf un sèche-serviettes. Vérifie les dimensions de la pièce et le coefficient d’isolation.`,
    );
  if (hauteur < HAUTEUR_REFERENCE && parMetreCarre > 125)
    warnings.push(
      `Puissance de ${fr(parMetreCarre, 0)} W/m², au-dessus des repères courants : vérifie la surface au sol avant de commander.`,
    );
  if (conseillee > 2000 && !sansModele)
    warnings.push(
      "Au-delà de 2 000 W dans une même pièce, deux appareils chauffent plus uniformément qu’un seul modèle très puissant.",
    );

  return {
    headline: `${fr(conseillee, 0)} W conseillés pour chauffer ${fr(volume, 1)} m³`,
    values: [
      {
        label: "Volume à chauffer",
        value: `${fr(volume, 1)} m³`,
        hint: `${fr(surface, 1)} m² au sol sur ${fr(hauteur, 2)} m de haut.`,
      },
      {
        label: "Puissance théorique",
        value: `${fr(theorique, 0)} W`,
        hint: `Volume × ${fr(coefficient, 0)} W/m³, le coefficient retenu pour ce niveau d’isolation.`,
      },
      {
        label: "Puissance conseillée",
        value: `${fr(conseillee, 0)} W`,
        hint: `Majoration de ${fr(majoration, 0)} % pour la marge et les corrections.`,
      },
      {
        label: "Modèle le plus proche",
        value: sansModele ? "au-delà de 3 000 W" : `${fr(modele, 0)} W`,
        hint: "La puissance commerciale juste au-dessus de la puissance conseillée. Au-dessus de 3 000 W, deux appareils.",
      },
      {
        label: "Puissance au mètre carré",
        value: `${fr(parMetreCarre, 0)} W/m²`,
        hint: "À recouper avec la règle de 70 à 100 W/m² pour un logement standard sous 2,50 m de plafond.",
      },
    ],
    warnings,
  };
}
