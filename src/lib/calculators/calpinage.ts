import type {
  CalculatorInputs,
  CalculatorOutput,
  CalpinagePlan,
  CalpinagePiece,
} from "@/types";

import { definitionOf } from "./definitions.ts";
import { fr, frTrim, invalid, reader, roundTo, roundUp } from "./format.ts";

const definition = definitionOf("calpinage");

/** Nombre de pièces au-delà duquel le plan est réduit à une trame (HTML trop lourd). */
const MAX_PIECES = 2000;
/** Nombre maximum de pièces par axe, garde-fou contre une boucle sans fin. */
const MAX_AXIS = 5000;

interface AxisPiece {
  offset: number;
  width: number;
  cut: boolean;
}

interface Layer {
  pieces: CalpinagePiece[];
  placed: number;
  whole: number;
  rows: number;
  tiles: number;
  minPerRow: number;
  maxPerRow: number;
  /** Bande de rive aux deux extrémités de la longueur (gauche et droite du plan). */
  edgeStart: number;
  edgeEnd: number;
  /** Bande de rive aux deux extrémités de la largeur (haut et bas du plan). */
  edgeFirst: number;
  edgeLast: number;
  simplified: boolean;
}

/** Découpe d’un axe : pièces visibles, joint compris, à partir d’un décalage initial. */
function axisPieces(
  room: number,
  tile: number,
  joint: number,
  shift: number,
): AxisPiece[] {
  const pieces: AxisPiece[] = [];
  let start = -shift;
  for (let index = 0; index < MAX_AXIS; index += 1) {
    const end = start + tile;
    const from = Math.max(start, 0);
    const to = Math.min(end, room);
    const width = roundTo(to - from);
    if (width > 0)
      pieces.push({ offset: roundTo(from), width, cut: width < tile - 1e-7 });
    if (end >= room - 1e-9) break;
    start = end + joint;
  }
  return pieces;
}

/**
 * Carreaux consommés par une rangée. Une rangée ne comporte que deux coupes au
 * plus, aux deux extrémités : elles se taillent dans un même carreau quand leur
 * somme ne dépasse pas un carreau.
 */
function tilesForRow(widths: number[], tile: number, kerf: number): number {
  const cuts = widths.filter((width) => width < tile - 1e-7);
  const full = widths.length - cuts.length;
  const [first, second] = cuts;
  if (first === undefined) return full;
  const paire =
    second !== undefined && first + second + kerf <= tile + 1e-9
      ? 1
      : cuts.length;
  return full + paire;
}

/** Décalage d’un axe pour répartir les coupes également sur deux côtés opposés. */
function centreShift(room: number, tile: number, joint: number): number {
  const count = axisPieces(room, tile, joint, 0).length;
  return Math.max((count * tile + (count - 1) * joint - room) / 2, 0);
}

function layout(
  roomWidth: number,
  roomHeight: number,
  tileWidth: number,
  tileHeight: number,
  joint: number,
  centred: boolean,
  decalee: boolean,
  kerf: number,
): Layer {
  const shiftX = centred ? centreShift(roomWidth, tileWidth, joint) : 0;
  const shiftY = centred ? centreShift(roomHeight, tileHeight, joint) : 0;
  const rows = axisPieces(roomHeight, tileHeight, joint, shiftY);
  const pieces: CalpinagePiece[] = [];
  let placed = 0;
  let whole = 0;
  let tiles = 0;
  let minPerRow = Number.POSITIVE_INFINITY;
  let maxPerRow = 0;
  let edgeStart = Number.POSITIVE_INFINITY;
  let edgeEnd = Number.POSITIVE_INFINITY;

  rows.forEach((row, index) => {
    const rowShift =
      shiftX + (decalee && index % 2 === 1 ? (tileWidth + joint) / 2 : 0);
    const columns = axisPieces(roomWidth, tileWidth, joint, rowShift);
    const rowCut = row.width < tileHeight - 1e-7;
    placed += columns.length;
    tiles += tilesForRow(
      columns.map((column) => column.width),
      tileWidth,
      kerf,
    );
    minPerRow = Math.min(minPerRow, columns.length);
    maxPerRow = Math.max(maxPerRow, columns.length);
    edgeStart = Math.min(edgeStart, columns[0].width);
    edgeEnd = Math.min(edgeEnd, columns.at(-1)!.width);
    for (const column of columns) {
      const cut = column.cut || rowCut;
      if (!cut) whole += 1;
      if (pieces.length < MAX_PIECES)
        pieces.push({
          x: column.offset,
          y: row.offset,
          width: column.width,
          height: row.width,
          cut,
        });
    }
  });

  return {
    pieces,
    placed,
    whole,
    rows: rows.length,
    tiles,
    minPerRow,
    maxPerRow,
    edgeStart,
    edgeEnd,
    edgeFirst: rows[0].width,
    edgeLast: rows.at(-1)!.width,
    simplified: placed > MAX_PIECES,
  };
}

/** Calpinage d’une pièce rectangulaire : agencement, comptes et plan. */
export function compute(inputs: CalculatorInputs): CalculatorOutput {
  const read = reader(definition, inputs);
  const roomWidth = read.number("longueur");
  const roomHeight = read.number("largeur");
  const tileWidth = read.number("carreauLargeur") / 100;
  const tileHeight = read.number("carreauLongueur") / 100;
  const joint = read.number("joint") / 1000;
  const pose = read.option("pose");
  const depart = read.option("depart");
  const marge = read.number("marge");
  const kerf = read.number("trait") / 1000;
  if (read.errors.length) return invalid(read.errors);

  const centred = depart === "centre";
  const decalee = pose === "decalee";
  const layer = layout(
    roomWidth,
    roomHeight,
    tileWidth,
    tileHeight,
    joint,
    centred,
    decalee,
    kerf,
  );
  const droit = decalee
    ? layout(
        roomWidth,
        roomHeight,
        tileWidth,
        tileHeight,
        joint,
        centred,
        false,
        kerf,
      )
    : layer;
  const acheter = roundUp(layer.tiles * (1 + marge / 100));
  const acheterDroit = roundUp(droit.tiles * (1 + marge / 100));
  const couvert = roomWidth * roomHeight;
  const achete = acheter * tileWidth * tileHeight;

  const warnings: string[] = [];
  const pireLongueur = Math.min(layer.edgeStart, layer.edgeEnd);
  const pireLargeur = Math.min(layer.edgeFirst, layer.edgeLast);
  if (pireLongueur < tileWidth / 2)
    warnings.push(
      `Sur la longueur, la bande de rive descend à ${fr(pireLongueur * 100, 1)} cm, moins d’un demi-carreau de ${fr(tileWidth * 100, 1)} cm. Décale le départ d’un demi-carreau pour retomber sur des coupes plus larges.`,
    );
  if (pireLargeur < tileHeight / 2)
    warnings.push(
      `Sur la largeur, la bande de rive descend à ${fr(pireLargeur * 100, 1)} cm, moins d’un demi-carreau de ${fr(tileHeight * 100, 1)} cm. Vérifie l’autre sens de départ avant d’encoller.`,
    );
  if (marge === 0)
    warnings.push(
      "Aucune marge de coupe : un carreau cassé, et le calepinage est à reprendre.",
    );
  if (decalee && acheter > acheterDroit)
    warnings.push(
      `La pose décalée demande ${fr(acheter - acheterDroit)} carreau${acheter - acheterDroit > 1 ? "x" : ""} de plus qu’une pose droite, à cause des coupes de départ d’une rangée sur deux.`,
    );
  if (layer.simplified)
    warnings.push(
      `Aperçu simplifié au-delà de ${fr(MAX_PIECES)} pièces : le plan affiche la trame et les bandes de rive, les quantités estimées restent identiques.`,
    );

  const plan: CalpinagePlan = {
    room: { width: roomWidth, height: roomHeight },
    tile: { width: tileWidth, height: tileHeight },
    joint,
    pieces: layer.pieces,
    edges: {
      start: layer.edgeStart,
      end: layer.edgeEnd,
      top: layer.edgeFirst,
      bottom: layer.edgeLast,
    },
    rows: layer.rows,
    centred,
    simplified: layer.simplified,
    shift: {
      x: centred ? centreShift(roomWidth, tileWidth, joint) : 0,
      y: centred ? centreShift(roomHeight, tileHeight, joint) : 0,
    },
    staggered: decalee,
  };

  return {
    headline: `${fr(acheter)} carreaux de ${frTrim(tileWidth * 100)} × ${frTrim(tileHeight * 100)} cm`,
    values: [
      {
        label: "Carreaux à prévoir",
        value: `${fr(acheter)}`,
        hint: `${fr(layer.tiles)} carreaux au calepinage, plus ${fr(marge, 0)} % de marge pour les coupes et la casse.`,
      },
      {
        label: "Pièces posées",
        value: `${fr(layer.placed)}`,
        hint: `${fr(layer.whole)} carreaux entiers et ${fr(layer.placed - layer.whole)} pièces coupées.`,
      },
      {
        label: "Rangées",
        value: `${fr(layer.rows)}`,
        hint:
          layer.minPerRow === layer.maxPerRow
            ? `${fr(layer.minPerRow)} pièces par rangée.`
            : `de ${fr(layer.minPerRow)} à ${fr(layer.maxPerRow)} pièces selon la rangée.`,
      },
      {
        label: "Bande de rive sur la longueur",
        value: `${fr(layer.edgeStart * 100, 1)} cm d’un côté, ${fr(layer.edgeEnd * 100, 1)} cm de l’autre`,
        hint:
          centred && !decalee
            ? "Départ centré : les deux coupes opposées sont égales quand la pièce est d’équerre."
            : "Largeur minimale rencontrée sur chaque côté, toutes rangées confondues.",
      },
      {
        label: "Bande de rive sur la largeur",
        value: `${fr(layer.edgeFirst * 100, 1)} cm d’un côté, ${fr(layer.edgeLast * 100, 1)} cm de l’autre`,
      },
      {
        label: "Surface couverte",
        value: `${fr(couvert, 2)} m²`,
        hint: `Surface de carreaux prévue : ${fr(achete, 2)} m².`,
      },
    ],
    warnings,
    plan,
  };
}
