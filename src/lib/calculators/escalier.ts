import type {
  CalculatorInputs,
  CalculatorOutput,
  StairPlan,
  StairStep,
} from "@/types";

import { definitionOf } from "./definitions.ts";
import { fr, invalid, reader } from "./format.ts";

const definition = definitionOf("escalier");
type Candidate = {
  n: number;
  first: number;
  second: number;
  turn: number;
  g: number;
  score: number;
};

function score(h: number, g: number): number {
  const gaps = [
    Math.max(16 - h, h - 20, 0),
    Math.max(24 - g, g - 32, 0),
    Math.max(60 - 2 * h - g, 2 * h + g - 64, 0),
  ];
  return (
    gaps.filter((gap) => gap > 1e-8).length * 10000 +
    gaps.reduce((sum, gap) => sum + gap * gap, 0) * 100 +
    Math.abs(2 * h + g - 63) +
    Math.abs(h - 17.5) / 10
  );
}

function rectangle(
  x: number,
  y: number,
  width: number,
  height: number,
  length: number,
  landing = false,
): StairStep {
  return {
    points: [
      [x, y],
      [x + width, y],
      [x + width, y + height],
      [x, y + height],
    ],
    length,
    landing,
    cotes: [
      {
        // Décalée du centre pour ne pas se superposer au numéro de la marche.
        from: [x + width * 0.78, y],
        to: [x + width * 0.78, y + height],
        label: landing
          ? `Côté ${fr(length, 1)} cm`
          : `Giron ${fr(length, 1)} cm`,
      },
    ],
  };
}

const distance = (a: [number, number], b: [number, number]) =>
  Math.hypot(b[0] - a[0], b[1] - a[1]);

/** Géométrie préliminaire bornée à 36 hauteurs ; aucun dimensionnement de structure. */
export function compute(inputs: CalculatorInputs): CalculatorOutput {
  const read = reader(definition, inputs);
  const kind = read.option("forme") as StairPlan["kind"];
  const height = read.number("hauteur");
  const length = read.number("longueur");
  const width = read.number("largeur");
  const imposed = read.number("hauteurs");
  const turning = kind !== "droit";
  const u = kind === "u-palier" || kind === "u-rayonnant";
  const back = turning ? read.number("retour") : 0;
  const left = turning ? read.option("sens") === "gauche" : false;
  // Le jour n’est lu que lorsqu’il est affiché : un champ masqué peut être vide.
  const well = kind === "rayonnant" || u ? read.number("jour") : 0;
  if (read.errors.length) return invalid(read.errors);
  if (!Number.isInteger(imposed) || (imposed !== 0 && imposed < 4))
    return invalid([
      "Nombre de hauteurs imposé : saisis 0 pour le mode automatique ou un entier de 4 à 36.",
    ]);
  const block = width + well;
  // Profondeur de la zone de tournant : le palier fait la largeur d’une volée,
  // les marches tournantes tournent autour du jour intérieur.
  const turnDepth = kind === "u-palier" ? width : block;
  if (turning && (length < turnDepth || back < turnDepth))
    return invalid([
      `Le tournant occupe ${fr(turnDepth, 1)} cm de profondeur : les deux longueurs au sol doivent au moins couvrir cette dimension.`,
    ]);
  const candidates: Candidate[] = [];
  const minimum = imposed || Math.max(4, Math.ceil(height / 22));
  const maximum = imposed || Math.min(36, Math.floor(height / 14));
  for (let n = minimum; n <= maximum; n += 1) {
    const h = height / n;
    if (!turning) {
      const g = length / (n - 1);
      candidates.push({
        n,
        first: n - 1,
        second: 0,
        turn: 0,
        g,
        score: score(h, g),
      });
      continue;
    }
    if (kind === "palier" || kind === "u-palier") {
      for (let first = 1; first < n - 2; first += 1) {
        const second = n - 2 - first;
        const available = Math.min(
          (length - turnDepth) / first,
          (back - turnDepth) / second,
        );
        // Les longueurs au sol sont des maxima : inutile d’allonger le pas au-delà de la cible.
        const g = Math.min(available, 63 - 2 * h);
        if (g > 0)
          candidates.push({ n, first, second, turn: 1, g, score: score(h, g) });
      }
    } else {
      // Quart tournant : le vide est carré dans l’angle. Demi-tour : il sépare les
      // deux volées, et la ligne de foulée balaie un demi-cercle autour de son milieu.
      const rayon = u ? well / 2 + width / 2 : well + width / 2;
      const sweep = u ? Math.PI : Math.PI / 2;
      for (let turn = 2; turn <= Math.min(8, n - 1); turn += 1) {
        const g = (sweep * rayon) / turn;
        for (let first = 0; first <= n - 1 - turn; first += 1) {
          const second = n - 1 - turn - first;
          if (
            first * g <= length - turnDepth + 1e-8 &&
            second * g <= back - turnDepth + 1e-8
          ) {
            candidates.push({ n, first, second, turn, g, score: score(h, g) });
          }
        }
      }
    }
  }
  candidates.sort(
    (a, b) =>
      a.score - b.score ||
      Math.abs(a.first - a.second) - Math.abs(b.first - b.second),
  );
  const selected = candidates[0];
  if (!selected)
    return invalid([
      "Aucune disposition de ce modèle ne tient dans les longueurs au sol indiquées. Augmente l’espace disponible, modifie la largeur ou compare une autre forme.",
    ]);
  const { n, first, second, turn, g } = selected;
  const rise = height / n;
  const blondel = 2 * rise + g;
  const extent = u
    ? { x: width + block, y: turnDepth + Math.max(first, second) * g }
    : turning
      ? { x: block + second * g, y: block + first * g }
      : { x: width, y: length };
  const steps: StairStep[] = [];
  const walkingLine: [number, number][] = [[width / 2, extent.y]];
  if (u) {
    // Deux volées parallèles : la première monte vers le tournant, la seconde en
    // repart dans l’autre sens. Les deux partent du même bord.
    for (let i = 0; i < first; i += 1)
      steps.push(rectangle(0, turnDepth + (first - 1 - i) * g, width, g, g));
    if (kind === "u-palier") {
      // Le palier occupe toute la largeur du U, sur la profondeur d’une volée.
      steps.push(rectangle(0, 0, extent.x, turnDepth, turnDepth, true));
      walkingLine.push([width / 2, turnDepth], [block + width / 2, turnDepth]);
    } else {
      // Les tournantes balaient un demi-cercle autour du milieu du jour : les
      // collets se resserrent sur le vide, les extérieurs vont chercher les murs.
      const pivot: [number, number] = [width + well / 2, turnDepth];
      const rayon = well / 2 + width / 2;
      const foule = (angle: number): [number, number] => [
        pivot[0] - rayon * Math.cos(angle),
        pivot[1] - rayon * Math.sin(angle),
      ];
      const dedans = (angle: number): [number, number] => [
        pivot[0] - (well / 2) * Math.cos(angle),
        pivot[1] - (well / 2) * Math.sin(angle),
      ];
      const dehors = (angle: number): [number, number] => {
        const radius = Math.min(
          (width + well / 2) / Math.max(Math.abs(Math.cos(angle)), 1e-9),
          turnDepth / Math.max(Math.abs(Math.sin(angle)), 1e-9),
        );
        return [
          pivot[0] - radius * Math.cos(angle),
          pivot[1] - radius * Math.sin(angle),
        ];
      };
      // Angle où le rayon quitte le mur de côté pour le mur du fond : la marche
      // qui traverse ce coin doit y passer, sinon le tournant est chanfreiné.
      const coin = Math.atan2(turnDepth, width + well / 2);
      for (let i = 0; i < turn; i += 1) {
        const a = (i * Math.PI) / turn;
        const b = ((i + 1) * Math.PI) / turn;
        const dehorsA = dehors(a);
        const dehorsB = dehors(b);
        const dedansA = dedans(a);
        const dedansB = dedans(b);
        const points: [number, number][] = [dehorsA];
        if (a < coin && b > coin) points.push([0, 0]);
        if (a < Math.PI - coin && b > Math.PI - coin)
          points.push([extent.x, 0]);
        points.push(dehorsB, dedansB, dedansA);
        steps.push({
          points,
          length: g,
          cotes: [
            {
              from: dedansA,
              to: dedansB,
              label: `Collet ${fr(distance(dedansA, dedansB), 1)} cm`,
            },
            {
              from: dehorsA,
              to: dehorsB,
              label: `Extérieur ${fr(distance(dehorsA, dehorsB), 1)} cm`,
            },
            {
              // Le nez est le bord avant de la marche, celui qu’on franchit.
              from: dehorsB,
              to: dedansB,
              label: `Nez ${fr(distance(dehorsB, dedansB), 1)} cm`,
            },
          ],
        });
      }
      for (let i = 0; i <= 24; i += 1)
        walkingLine.push(foule((i * Math.PI) / 24));
    }
    walkingLine.push([block + width / 2, extent.y]);
    for (let i = 0; i < second; i += 1)
      steps.push(rectangle(block, turnDepth + i * g, width, g, g));
  } else {
    for (let i = 0; i < first; i += 1)
      steps.push(rectangle(0, extent.y - (i + 1) * g, width, g, g));
    if (kind === "palier") {
      steps.push(rectangle(0, 0, width, width, width, true));
      walkingLine.push([width / 2, width / 2], [extent.x, width / 2]);
    } else if (kind === "rayonnant") {
      const point = (angle: number, side: number): [number, number] => {
        const c = Math.cos(angle),
          s = Math.sin(angle);
        const radius = side / Math.max(c, s);
        return [block - radius * c, block - radius * s];
      };
      for (let i = 0; i < turn; i += 1) {
        const a = (i * Math.PI) / (2 * turn),
          b = ((i + 1) * Math.PI) / (2 * turn);
        const crossesCorner = a < Math.PI / 4 && b > Math.PI / 4;
        const dehorsA = point(a, block);
        const dehorsB = point(b, block);
        const dedansA = point(a, well);
        const dedansB = point(b, well);
        const points: [number, number][] = [dehorsA];
        if (crossesCorner) points.push([0, 0]);
        points.push(dehorsB, dedansB);
        if (crossesCorner) points.push([width, width]);
        points.push(dedansA);
        // Le giron d’une marche tournante varie du collet à l’extérieur :
        // ce sont ces cotes qui décident si la marche est marchable.
        steps.push({
          points,
          length: g,
          cotes: [
            {
              from: dedansA,
              to: dedansB,
              label: `Collet ${fr(distance(dedansA, dedansB), 1)} cm`,
            },
            {
              from: dehorsA,
              to: dehorsB,
              label: `Extérieur ${fr(distance(dehorsA, dehorsB), 1)} cm`,
            },
            {
              // Le nez est le bord avant de la marche, celui qu’on franchit :
              // c’est l’arête du côté vers lequel on monte.
              from: dehorsB,
              to: dedansB,
              label: `Nez ${fr(distance(dehorsB, dedansB), 1)} cm`,
            },
          ],
        });
      }
      for (let i = 0; i <= 24; i += 1) {
        const angle = (i * Math.PI) / 48;
        const radius = well + width / 2;
        walkingLine.push([
          block - radius * Math.cos(angle),
          block - radius * Math.sin(angle),
        ]);
      }
      walkingLine.push([extent.x, width / 2]);
    } else walkingLine.push([width / 2, 0]);
    for (let i = 0; i < second; i += 1)
      steps.push(rectangle(block + i * g, 0, g, width, g));
  }
  if (left) {
    for (const step of steps) {
      step.points = step.points.map(([x, y]) => [extent.x - x, y]);
      for (const cote of step.cotes ?? []) {
        cote.from = [extent.x - cote.from[0], cote.from[1]];
        cote.to = [extent.x - cote.to[0], cote.to[1]];
      }
    }
    for (const point of walkingLine) point[0] = extent.x - point[0];
  }
  const warnings: string[] = [];
  if (rise < 16 || rise > 20)
    warnings.push(
      `Hauteur de ${fr(rise, 1)} cm, hors du repère de comparaison de 16 à 20 cm.`,
    );
  if (g < 24 || g > 32)
    warnings.push(
      `Giron de ${fr(g, 1)} cm, hors du repère de comparaison de 24 à 32 cm.`,
    );
  if (blondel < 60 - 1e-8 || blondel > 64 + 1e-8)
    warnings.push(
      `Relation de Blondel de ${fr(blondel, 1)} cm, hors du repère de 60 à 64 cm : revois les dimensions.`,
    );
  if (kind === "rayonnant" || kind === "u-rayonnant")
    warnings.push(
      "Marches rayonnantes, sans balancement : les collets et le passage réel doivent être vérifiés sur une épure avant fabrication.",
    );
  if (u)
    warnings.push(
      "Demi-tour : les deux volées se croisent au-dessus de la même trémie. L’échappée et la hauteur libre se vérifient volée par volée, sans oublier les marches du tournant.",
    );
  warnings.push(
    "Trémie et échappée non calculées : vérifie la hauteur libre au-dessus de chaque marche et les dégagements aux deux niveaux.",
  );
  return {
    headline: `${n} hauteurs de ${fr(rise, 1)} cm`,
    values: [
      {
        label: "Hauteur de marche",
        value: `${fr(rise, 2)} cm`,
        hint: `${n} hauteurs identiques entre les sols finis.`,
      },
      {
        label: "Giron",
        value: `${fr(g, 2)} cm`,
        hint:
          kind === "rayonnant" || kind === "u-rayonnant"
            ? "Mesuré sur la ligne de foulée, au milieu de la largeur utile."
            : "Distance horizontale entre deux nez de marche.",
      },
      {
        label: "Marches sous le niveau de l’étage",
        value:
          kind === "palier" || kind === "u-palier"
            ? `${n - 2} marches et 1 palier`
            : `${n - 1} marches`,
        hint: "L’étage forme l’arrivée et n’est pas compté comme une marche à fabriquer.",
      },
      {
        label: "Relation de Blondel — 2h + g",
        value: `${fr(blondel, 1)} cm`,
        hint: "Repère de 60 à 64 cm ; ce contrôle ne valide pas à lui seul l’escalier.",
      },
      {
        label: "Pente des marches",
        value: `${fr((Math.atan(rise / g) * 180) / Math.PI, 1)}°`,
        hint: "Calculée avec la hauteur et le giron, hors palier.",
      },
      {
        label: "Emprise utile utilisée",
        value: `${fr(extent.y, 1)} × ${fr(extent.x, 1)} cm`,
        hint: u
          ? "Profondeur et largeur totale du demi-tour, jour compris, hors limons et dégagements."
          : "Branche de départ × branche d’arrivée, hors limons et dégagements.",
      },
      ...(turning
        ? [
            {
              label: "Répartition en montant",
              value: `${first} marches + ${kind === "palier" || kind === "u-palier" ? "palier" : `${turn} tournantes`} + ${second} marches`,
            },
          ]
        : []),
    ],
    warnings,
    stairPlan: {
      kind,
      left,
      height,
      rise,
      going: g,
      risers: n,
      width,
      extent,
      steps,
      walkingLine,
    },
  };
}
