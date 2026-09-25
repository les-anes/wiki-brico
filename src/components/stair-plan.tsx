/* oxlint-disable jsx-a11y/prefer-tag-over-role -- Les deux vues sont des dessins SVG accessibles avec titre et description. */
import { useState } from "react";

import { Cote } from "@/components/plan-cote";
import { fr } from "@/lib/calculators/format";
import type { StairPlan, StairStep } from "@/types";

/**
 * Libellé d’une marche : cotes annoncées aux lecteurs d’écran sur les marches
 * du plan, et reprises dans le panneau de cotes.
 */
function stepLabel(
  index: number,
  step: Pick<StairStep, "length" | "landing">,
  rise: number,
) {
  const top = fr((index + 1) * rise, 1);
  return step.landing
    ? `Palier — ${fr(step.length, 1)} cm de côté, dessus à ${top} cm du sol`
    : `Marche ${index + 1} — marche de ${fr(rise, 2)} cm, giron de ${fr(step.length, 1)} cm, dessus à ${top} cm du sol`;
}

/**
 * Cotes que le libellé de la marche ne donne pas déjà : collet, extérieur et
 * nez des marches tournantes, dont la largeur varie d’un bord à l’autre.
 */
const cotesEnPlus = (step: StairStep) =>
  (step.cotes ?? []).filter((cote) => !/^(Giron|Côté)/.test(cote.label));

/**
 * Ancre du numéro de marche. La ligne de foulée passe au milieu des marches :
 * sur une marche rectangulaire, le numéro se décale d’un quart de largeur pour
 * ne pas la croiser. Les tournantes gardent leur centre de gravité.
 */
function ancreNumero(step: StairStep): [number, number] {
  const xs = step.points.map((point) => point[0]);
  const ys = step.points.map((point) => point[1]);
  const centre: [number, number] = [
    xs.reduce((total, x) => total + x, 0) / xs.length,
    ys.reduce((total, y) => total + y, 0) / ys.length,
  ];
  const rectangulaire = step.points.every(([x, y], index) => {
    const [nx, ny] = step.points[(index + 1) % step.points.length];
    return x === nx || y === ny;
  });
  if (!rectangulaire) return centre;
  const largeur = Math.max(...xs) - Math.min(...xs);
  const profondeur = Math.max(...ys) - Math.min(...ys);
  return largeur >= profondeur
    ? [Math.min(...xs) + largeur * 0.25, centre[1]]
    : [centre[0], Math.min(...ys) + profondeur * 0.25];
}

export function StairPlanView({ plan }: { plan: StairPlan }) {
  const [selection, setSelection] = useState<number | null>(null);
  const [focus, setFocus] = useState<number | null>(null);

  const { extent, steps, rise, height } = plan;
  const margin = Math.max(extent.x, extent.y) * 0.15;
  const font = Math.max(extent.x, extent.y) / 28;
  const first = plan.walkingLine[0];
  const last = plan.walkingLine.at(-1)!;
  const developed = steps.reduce((sum, step) => sum + step.length, 0);
  const profileMargin = Math.max(developed, height) * 0.12;
  const profileFont = Math.max(developed, height) / 30;
  const profile = [[0, height]];
  const surfaces = steps.map((step, index) => {
    const x = steps
      .slice(0, index)
      .reduce((sum, previous) => sum + previous.length, 0);
    const y = height - (index + 1) * rise;
    profile.push([x, y]);
    profile.push([x + step.length, y]);
    return { x, y, length: step.length, landing: step.landing };
  });
  profile.push([developed, 0], [developed + plan.going, 0]);
  const choix =
    selection === null
      ? null
      : { rang: selection + 1, etape: steps[selection] };
  const surfaceChoisie = choix ? surfaces[choix.rang - 1] : null;
  const basculer = (index: number) =>
    setSelection((courante) => (courante === index ? null : index));
  // Contour d’une marche, en centimètres : sert au tracé et à l’anneau qui le
  // découpe pour qu’il garde la même épaisseur sur tout le pourtour.
  const contour = (index: number) =>
    steps[index].points.map((point) => point.join(",")).join(" ");
  const miseEnAvant = focus ?? selection;
  return (
    <div className="stair-views">
      <figure>
        <figcaption>Vue de dessus — emprise utile</figcaption>
        <svg
          className="stair-svg"
          viewBox={`${-margin} ${-margin} ${extent.x + 2 * margin} ${extent.y + 2 * margin}`}
          role="img"
          aria-label={`Plan de l’escalier : ${fr(extent.y, 1)} sur ${fr(extent.x, 1)} cm`}
          aria-describedby="escalier-plan-description"
        >
          <desc id="escalier-plan-description">{`${steps.length} surfaces numérotées dans le sens de montée. La ligne pointillée montre le passage ; le sol de l’étage constitue l’arrivée.`}</desc>
          <defs>
            <marker
              id="escalier-fleche"
              viewBox="0 0 10 10"
              refX="9"
              refY="5"
              markerWidth="7"
              markerHeight="7"
              orient="auto-start-reverse"
            >
              <path d="M 0 0 L 10 5 L 0 10 z" />
            </marker>
          </defs>
          {steps.map((step, index) => {
            const [x, y] = ancreNumero(step);
            const cotes = stepLabel(index, step, rise);
            return (
              <g
                key={step.points.map((point) => point.join(",")).join(" ")}
                role="button"
                tabIndex={0}
                aria-label={[
                  cotes,
                  ...cotesEnPlus(step).map((cote) => cote.label),
                ].join(" · ")}
                aria-pressed={selection === index}
                onClick={() => basculer(index)}
                onFocus={(event) =>
                  // :focus-visible distingue le clavier du clic : au clic, c’est
                  // la sélection qui met la marche en avant, pas le focus.
                  setFocus(
                    event.currentTarget.matches(":focus-visible")
                      ? index
                      : null,
                  )
                }
                onBlur={() =>
                  setFocus((courant) => (courant === index ? null : courant))
                }
                onKeyDown={(event) => {
                  if (event.key === "Enter" || event.key === " ") {
                    event.preventDefault();
                    basculer(index);
                  }
                }}
              >
                <polygon
                  className={[
                    "stair-step",
                    step.landing ? "is-landing" : "",
                    selection === index ? "is-selected" : "",
                  ]
                    .filter(Boolean)
                    .join(" ")}
                  points={contour(index)}
                />
                <text
                  className="stair-number"
                  x={x}
                  y={y}
                  fontSize={Math.min(font, plan.going * 0.55)}
                  textAnchor="middle"
                  dominantBaseline="central"
                >
                  {step.landing ? "Palier" : index + 1}
                </text>
              </g>
            );
          })}
          {miseEnAvant !== null && (
            <g className="stair-ring">
              <clipPath id="escalier-selection">
                <polygon points={contour(miseEnAvant)} />
              </clipPath>
              <g clipPath="url(#escalier-selection)">
                <polygon points={contour(miseEnAvant)} />
              </g>
            </g>
          )}
          {choix?.etape.cotes?.map((cote) => (
            <Cote key={cote.label} cote={cote} font={font} />
          ))}
          <polyline
            className="stair-walk"
            points={plan.walkingLine.map((point) => point.join(",")).join(" ")}
            markerEnd="url(#escalier-fleche)"
          />
          <g className="stair-label" fontSize={font}>
            <text x={extent.x / 2} y={-margin * 0.5} textAnchor="middle">
              {fr(extent.x, 1)} cm
            </text>
            <text
              transform={`translate(${-margin * 0.48} ${extent.y / 2}) rotate(-90)`}
              textAnchor="middle"
            >
              {fr(extent.y, 1)} cm
            </text>
            <text x={first[0]} y={extent.y + font * 1.6} textAnchor="middle">
              Départ
            </text>
            <text
              x={last[0]}
              y={
                plan.kind === "droit"
                  ? -font * 0.5
                  : plan.kind.startsWith("u-")
                    ? extent.y + font * 1.6
                    : last[1] - font
              }
              textAnchor={
                plan.kind === "droit" || plan.kind.startsWith("u-")
                  ? "middle"
                  : "end"
              }
            >
              Étage
            </text>
          </g>
        </svg>
        <p>
          Marches numérotées dans le sens de montée. Clique une marche pour lire
          ses cotes sur le dessin. Les cotes excluent les limons, les
          garde-corps et les dégagements.
        </p>
      </figure>
      <figure>
        <figcaption>Profil déroulé — hauteur et giron</figcaption>
        <svg
          className="stair-svg"
          viewBox={`${-profileMargin} ${-profileMargin} ${developed + plan.going + profileMargin * 2} ${height + profileMargin * 2}`}
          role="img"
          aria-label={`${plan.risers} hauteurs de ${fr(rise, 2)} cm pour franchir ${fr(height, 1)} cm`}
          aria-describedby="escalier-profil-description"
        >
          <desc id="escalier-profil-description">
            Le profil suit la ligne de montée déroulée. Il ne représente ni la
            trémie ni la hauteur libre au-dessus des marches.
          </desc>
          {surfaces.map((surface, index) => (
            <rect
              key={surface.x}
              className={[
                "stair-step",
                surface.landing ? "is-landing" : "",
                selection === index ? "is-selected" : "",
              ]
                .filter(Boolean)
                .join(" ")}
              x={surface.x}
              y={surface.y}
              width={surface.length}
              height={height - surface.y}
            />
          ))}
          {surfaceChoisie && (
            <Cote
              cote={{
                from: [
                  surfaceChoisie.x + surfaceChoisie.length / 2,
                  surfaceChoisie.y,
                ],
                to: [
                  surfaceChoisie.x + surfaceChoisie.length / 2,
                  surfaceChoisie.y + rise,
                ],
                label: `hauteur ${fr(rise, 2)} cm`,
              }}
              font={profileFont}
            />
          )}
          <polyline
            className="stair-profile"
            points={profile.map((point) => point.join(",")).join(" ")}
          />
          <g className="stair-label" fontSize={profileFont}>
            <text
              transform={`translate(${-profileMargin * 0.4} ${height / 2}) rotate(-90)`}
              textAnchor="middle"
            >
              H = {fr(height, 1)} cm
            </text>
            <text
              x={developed / 2}
              y={height + profileFont * 1.8}
              textAnchor="middle"
            >
              g = {fr(plan.going, 1)} cm · h = {fr(rise, 1)} cm
            </text>
            <text x={developed + plan.going} y={-profileFont} textAnchor="end">
              Sol fini de l’étage
            </text>
          </g>
        </svg>
        <p>
          Le tournant est déroulé pour montrer les hauteurs régulières. La
          trémie et l’échappée restent à vérifier sur le bâtiment.
        </p>
      </figure>
      {choix && (
        <div className="stair-cotes" aria-live="polite">
          <p className="stair-cotes-titre">
            {choix.etape.landing ? "Palier" : `Marche ${choix.rang}`} — cotes
            exactes
          </p>
          <ul>
            <li>Hauteur de marche : {fr(rise, 2)} cm</li>
            <li>
              Giron sur la ligne de foulée : {fr(choix.etape.length, 1)} cm
            </li>
            {cotesEnPlus(choix.etape).map((cote) => (
              <li key={cote.label}>{cote.label}</li>
            ))}
            <li>Dessus à {fr(choix.rang * rise, 1)} cm du sol</li>
          </ul>
          {cotesEnPlus(choix.etape).length > 0 && (
            <dl className="stair-lexique">
              <div>
                <dt>Collet</dt>
                <dd>
                  le bord intérieur de la marche, le plus étroit. C’est lui qui
                  décide si le pied trouve où se poser.
                </dd>
              </div>
              <div>
                <dt>Extérieur</dt>
                <dd>
                  le bord opposé, le plus large, du côté du mur ou du limon
                  extérieur.
                </dd>
              </div>
              <div>
                <dt>Nez</dt>
                <dd>
                  le bord avant de la marche, celui qu’on franchit ; sa longueur
                  va du collet jusqu’à l’extérieur.
                </dd>
              </div>
            </dl>
          )}
          <p>Clique une autre marche pour changer, ou la même pour effacer.</p>
        </div>
      )}
    </div>
  );
}
