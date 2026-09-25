import { Fragment, useState } from "react";

import { hexagone } from "@/lib/calculators/calpinage";
import { fr } from "@/lib/calculators/format";
/* oxlint-disable jsx-a11y/prefer-tag-over-role -- Le plan de calpinage est une image composée, dessinée en SVG ; une balise img ne peut pas la porter. */
import type { CalpinagePiece, CalpinagePlan } from "@/types";

/** Marge du dessin, en centimètres, pour loger les cotes autour de la pièce. */
const MARGIN = 52;

/**
 * Épaisseur de l’anneau de sélection, en centimètres de plan. Il est découpé au
 * contour de la pièce : un trait centré sur le bord serait rogné de moitié le
 * long des murs, et l’encadrement paraîtrait plus épais d’un côté que de l’autre.
 */
const RING = 1.6;

function cote(value: number): string {
  return `${fr(value * 100, 1)} cm`;
}

/** Contour d’une pièce : hexagone ou rectangle selon la géométrie du plan. */
function formeDe(
  piece: CalpinagePiece,
  options: { className?: string; strokeWidth?: number } = {},
) {
  return piece.points ? (
    <polygon
      {...options}
      points={piece.points
        .map(([x, y]) => `${MARGIN + x * 100},${MARGIN + y * 100}`)
        .join(" ")}
    />
  ) : (
    <rect
      {...options}
      x={MARGIN + piece.x * 100}
      y={MARGIN + piece.y * 100}
      width={piece.width * 100}
      height={piece.height * 100}
    />
  );
}

/** Identifie une pièce par son coin haut-gauche, unique dans un calepinage. */
function cle(piece: CalpinagePiece): string {
  return `${piece.x}-${piece.y}`;
}

/**
 * Encombrement du morceau visible, en centimètres : pour un hexagone, les
 * pointes coupées par le mur sont ramenées au bord, ce qui donne la largeur et
 * la hauteur du morceau tel qu’il sera posé.
 */
function morceau(
  piece: CalpinagePiece,
  plan: CalpinagePlan,
): { largeur: number; hauteur: number } {
  const etendue = (valeurs: number[], bord: number) => {
    const dedans = valeurs.map((valeur) => Math.min(Math.max(valeur, 0), bord));
    return (Math.max(...dedans) - Math.min(...dedans)) * 100;
  };
  return {
    largeur: etendue(
      piece.points
        ? piece.points.map(([x]) => x)
        : [piece.x, piece.x + piece.width],
      plan.room.width,
    ),
    hauteur: etendue(
      piece.points
        ? piece.points.map(([, y]) => y)
        : [piece.y, piece.y + piece.height],
      plan.room.height,
    ),
  };
}

/**
 * Plan de calpinage en SVG : dessiné au build comme à la saisie, sans mesure du
 * navigateur. Au-delà du plafond de pièces, seules les bandes de rive sont
 * dessinées — les quantités, elles, restent exactes.
 */
export function CalpinagePlanView({ plan }: { plan: CalpinagePlan }) {
  const [selection, setSelection] = useState<string | null>(null);
  const [focus, setFocus] = useState<string | null>(null);
  const width = plan.room.width * 100;
  const height = plan.room.height * 100;
  const viewWidth = width + MARGIN * 2;
  const viewHeight = height + MARGIN * 2;
  const fontSize = Math.max(viewWidth, viewHeight) / 42;
  const joint = Math.max(plan.joint * 100, 0.15);
  const edges = {
    start: plan.edges.start * 100,
    end: plan.edges.end * 100,
    bottom: plan.edges.bottom * 100,
    top: plan.edges.top * 100,
  };
  const hexagonale = plan.forme === "hexagone";
  const plat = (plan.flat ?? 0) * 100;
  const rayon = plat / Math.sqrt(3);
  const pasRangee = (plat + plan.joint * 100) / 2;
  const pasRang = 2 * rayon + plan.joint * 100;
  const description = hexagonale
    ? `carreaux hexagonaux de ${fr(plat, 1)} cm de plat à plat`
    : `carreaux de ${fr(plan.tile.width * 100, 1)} cm`;
  const trameHexagonale = (centreX: number, centreY: number) =>
    hexagone([centreX, centreY], rayon)
      .map(([x, y]) => `${x},${y}`)
      .join(" ");
  const choisie = plan.pieces.find((piece) => cle(piece) === selection) ?? null;
  const format = choisie ? morceau(choisie, plan) : null;
  // La pièce mise en avant : celle qu’on vient de survoler au clavier, sinon
  // celle qui est ouverte dans le panneau de format.
  const miseEnAvant =
    plan.pieces.find((piece) => cle(piece) === (focus ?? selection)) ?? null;
  const basculer = (piece: CalpinagePiece) =>
    setSelection((courante) => (courante === cle(piece) ? null : cle(piece)));

  return (
    <>
      <svg
        className="calpinage-svg"
        viewBox={`0 0 ${viewWidth} ${viewHeight}`}
        role="img"
        aria-label={`Plan de calpinage d’une pièce de ${fr(plan.room.width, 2)} m sur ${fr(plan.room.height, 2)} m, ${description}`}
      >
        <clipPath id="calpinage-piece">
          <rect x={MARGIN} y={MARGIN} width={width} height={height} />
        </clipPath>
        <rect
          className="calpinage-room"
          x={MARGIN}
          y={MARGIN}
          width={width}
          height={height}
        />
        {plan.simplified ? (
          <g>
            <defs>
              {hexagonale ? (
                <pattern
                  id="calpinage-trame"
                  patternUnits="userSpaceOnUse"
                  x={MARGIN - plan.shift.x * 100}
                  y={MARGIN - plan.shift.y * 100}
                  width={pasRang}
                  height={2 * pasRangee}
                >
                  {[
                    [0, 0],
                    [1, 0],
                    [0.5, 1],
                    [1.5, 1],
                  ].map(([colonne, rangee]) => (
                    <polygon
                      key={`${colonne}-${rangee}`}
                      className="calpinage-grid-tile"
                      points={trameHexagonale(
                        colonne * pasRang,
                        rangee * pasRangee,
                      )}
                      strokeWidth={joint}
                    />
                  ))}
                </pattern>
              ) : (
                <pattern
                  id="calpinage-trame"
                  patternUnits="userSpaceOnUse"
                  x={MARGIN - plan.shift.x * 100}
                  y={MARGIN - plan.shift.y * 100}
                  width={(plan.tile.width + plan.joint) * 100}
                  height={
                    (plan.tile.height + plan.joint) *
                    100 *
                    (plan.staggered ? 2 : 1)
                  }
                >
                  <rect
                    className="calpinage-grid-tile"
                    width={plan.tile.width * 100}
                    height={plan.tile.height * 100}
                    strokeWidth={joint}
                  />
                  {plan.staggered &&
                    [-0.5, 0.5].map((offset) => (
                      <rect
                        key={offset}
                        className="calpinage-grid-tile"
                        x={offset * (plan.tile.width + plan.joint) * 100}
                        y={(plan.tile.height + plan.joint) * 100}
                        width={plan.tile.width * 100}
                        height={plan.tile.height * 100}
                        strokeWidth={joint}
                      />
                    ))}
                </pattern>
              )}
            </defs>
            <rect
              className="calpinage-band"
              x={MARGIN}
              y={MARGIN}
              width={edges.start}
              height={height}
            />
            <rect
              className="calpinage-band"
              x={MARGIN + width - edges.end}
              y={MARGIN}
              width={edges.end}
              height={height}
            />
            <rect
              className="calpinage-band"
              x={MARGIN}
              y={MARGIN}
              width={width}
              height={edges.top}
            />
            <rect
              className="calpinage-band"
              x={MARGIN}
              y={MARGIN + height - edges.bottom}
              width={width}
              height={edges.bottom}
            />
            <rect
              x={MARGIN}
              y={MARGIN}
              width={width}
              height={height}
              fill="url(#calpinage-trame)"
            />
          </g>
        ) : (
          <g clipPath="url(#calpinage-piece)">
            {plan.pieces.map((piece) => {
              const classe = [
                "calpinage-piece",
                piece.cut ? "is-cut" : "",
                selection === cle(piece) ? "is-selected" : "",
              ]
                .filter(Boolean)
                .join(" ");
              const dessin = formeDe(piece, {
                className: classe,
                strokeWidth: joint,
              });
              // Seules les pièces à couper sont cliquables : elles portent un format
              // utile, là où un carreau entier n’en a qu’un, déjà affiché plus haut.
              if (!piece.cut)
                return <Fragment key={cle(piece)}>{dessin}</Fragment>;
              const cotes = morceau(piece, plan);
              return (
                <g
                  key={cle(piece)}
                  role="button"
                  tabIndex={0}
                  aria-label={`Carreau à couper : ${fr(cotes.largeur, 1)} sur ${fr(cotes.hauteur, 1)} cm`}
                  aria-pressed={selection === cle(piece)}
                  onClick={() => basculer(piece)}
                  onFocus={() => setFocus(cle(piece))}
                  onBlur={() =>
                    setFocus((courant) =>
                      courant === cle(piece) ? null : courant,
                    )
                  }
                  onKeyDown={(event) => {
                    if (event.key === "Enter" || event.key === " ") {
                      event.preventDefault();
                      basculer(piece);
                    }
                  }}
                >
                  {dessin}
                </g>
              );
            })}
            {miseEnAvant && (
              <g className="calpinage-ring">
                <clipPath id="calpinage-selection">
                  {formeDe(miseEnAvant)}
                </clipPath>
                <g clipPath="url(#calpinage-selection)">
                  {formeDe(miseEnAvant, { strokeWidth: RING * 2 })}
                </g>
              </g>
            )}
          </g>
        )}
        {plan.centred && (
          <line
            className="calpinage-axis"
            x1={MARGIN + width / 2}
            y1={MARGIN}
            x2={MARGIN + width / 2}
            y2={MARGIN + height}
          />
        )}
        <rect
          className="calpinage-outline"
          x={MARGIN}
          y={MARGIN}
          width={width}
          height={height}
        />
        <g className="calpinage-cotes" fontSize={fontSize}>
          <text
            x={MARGIN + width / 2}
            y={MARGIN - fontSize}
            textAnchor="middle"
          >
            {cote(plan.edges.top)}
          </text>
          <text
            x={MARGIN + width / 2}
            y={MARGIN + height + fontSize * 1.9}
            textAnchor="middle"
          >
            {cote(plan.edges.bottom)}
          </text>
          <text
            x={MARGIN - fontSize * 0.8}
            y={MARGIN + height / 2}
            textAnchor="end"
            dominantBaseline="middle"
          >
            {cote(plan.edges.start)}
          </text>
          <text
            x={MARGIN + width + fontSize * 0.8}
            y={MARGIN + height / 2}
            dominantBaseline="middle"
          >
            {cote(plan.edges.end)}
          </text>
        </g>
      </svg>
      {choisie && format && (
        <div className="calpinage-format" aria-live="polite">
          <p className="calpinage-format-titre">
            Carreau à couper — {fr(format.largeur, 1)} × {fr(format.hauteur, 1)}{" "}
            cm
          </p>
          <ul>
            <li>
              {fr(format.largeur, 1)} cm dans le sens de la longueur de la pièce
            </li>
            <li>{fr(format.hauteur, 1)} cm dans le sens de la largeur</li>
            <li>
              {hexagonale
                ? `Carreau d’origine : hexagone de ${fr(plat, 1)} cm de plat à plat, ${fr(2 * rayon, 1)} cm de pointe à pointe`
                : `Carreau d’origine : ${fr(plan.tile.width * 100, 1)} × ${fr(plan.tile.height * 100, 1)} cm`}
            </li>
          </ul>
          <p>
            {hexagonale
              ? "Ces deux cotes encadrent le morceau visible, pointes recoupées par le mur comprises : découpe le carreau à l’identique, en gardant le côté du mur sur la même face que sur le plan."
              : "Reporte ces deux cotes sur le carreau, bord de mur sur la même face que sur le plan. Une même chute peut servir les deux extrémités d’une rangée quand leur somme tient dans un carreau."}
          </p>
        </div>
      )}
    </>
  );
}
