import { fr } from "@/lib/calculators/format";
/* oxlint-disable jsx-a11y/prefer-tag-over-role -- Le plan de calpinage est une image composée, dessinée en SVG ; une balise img ne peut pas la porter. */
import type { CalpinagePlan } from "@/types";

/** Marge du dessin, en centimètres, pour loger les cotes autour de la pièce. */
const MARGIN = 52;

function cote(value: number): string {
  return `${fr(value * 100, 1)} cm`;
}

/**
 * Plan de calpinage en SVG : dessiné au build comme à la saisie, sans mesure du
 * navigateur. Au-delà du plafond de pièces, seules les bandes de rive sont
 * dessinées — les quantités, elles, restent exactes.
 */
export function CalpinagePlanView({ plan }: { plan: CalpinagePlan }) {
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

  return (
    <svg
      className="calpinage-svg"
      viewBox={`0 0 ${viewWidth} ${viewHeight}`}
      role="img"
      aria-labelledby="calpinage-titre"
    >
      <title id="calpinage-titre">
        {`Plan de calpinage d’une pièce de ${fr(plan.room.width, 2)} m sur ${fr(plan.room.height, 2)} m, carreaux de ${fr(plan.tile.width * 100, 1)} cm`}
      </title>
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
            <pattern
              id="calpinage-trame"
              patternUnits="userSpaceOnUse"
              x={MARGIN - plan.shift.x * 100}
              y={MARGIN - plan.shift.y * 100}
              width={(plan.tile.width + plan.joint) * 100}
              height={
                (plan.tile.height + plan.joint) * 100 * (plan.staggered ? 2 : 1)
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
          {plan.pieces.map((piece) => (
            <rect
              key={`${piece.x}-${piece.y}`}
              className={
                piece.cut ? "calpinage-piece is-cut" : "calpinage-piece"
              }
              x={MARGIN + piece.x * 100}
              y={MARGIN + piece.y * 100}
              width={piece.width * 100}
              height={piece.height * 100}
              strokeWidth={joint}
            />
          ))}
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
        <text x={MARGIN + width / 2} y={MARGIN - fontSize} textAnchor="middle">
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
  );
}
