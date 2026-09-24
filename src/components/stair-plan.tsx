/* oxlint-disable jsx-a11y/prefer-tag-over-role -- Les deux vues sont des dessins SVG accessibles avec titre et description. */
import { fr } from "@/lib/calculators/format";
import type { StairPlan } from "@/types";

export function StairPlanView({ plan }: { plan: StairPlan }) {
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
  return (
    <div className="stair-views">
      <figure>
        <figcaption>Vue de dessus — emprise utile</figcaption>
        <svg
          className="stair-svg"
          viewBox={`${-margin} ${-margin} ${extent.x + 2 * margin} ${extent.y + 2 * margin}`}
          role="img"
          aria-labelledby="escalier-plan-titre escalier-plan-description"
        >
          <title id="escalier-plan-titre">{`Plan de l’escalier : ${fr(extent.y, 1)} sur ${fr(extent.x, 1)} cm`}</title>
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
            const x =
              step.points.reduce((sum, point) => sum + point[0], 0) /
              step.points.length;
            const y =
              step.points.reduce((sum, point) => sum + point[1], 0) /
              step.points.length;
            return (
              <g key={step.points.map((point) => point.join(",")).join(" ")}>
                <polygon
                  className={
                    step.landing ? "stair-step is-landing" : "stair-step"
                  }
                  points={step.points.map((point) => point.join(",")).join(" ")}
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
              y={plan.kind === "droit" ? -font * 0.5 : last[1] - font}
              textAnchor={plan.kind === "droit" ? "middle" : "end"}
            >
              Étage
            </text>
          </g>
        </svg>
        <p>
          Marches numérotées dans le sens de montée. Les cotes excluent les
          limons, les garde-corps et les dégagements.
        </p>
      </figure>
      <figure>
        <figcaption>Profil déroulé — hauteur et giron</figcaption>
        <svg
          className="stair-svg"
          viewBox={`${-profileMargin} ${-profileMargin} ${developed + plan.going + profileMargin * 2} ${height + profileMargin * 2}`}
          role="img"
          aria-labelledby="escalier-profil-titre escalier-profil-description"
        >
          <title id="escalier-profil-titre">{`${plan.risers} hauteurs de ${fr(rise, 2)} cm pour franchir ${fr(height, 1)} cm`}</title>
          <desc id="escalier-profil-description">
            Le profil suit la ligne de montée déroulée. Il ne représente ni la
            trémie ni la hauteur libre au-dessus des marches.
          </desc>
          {surfaces.map((surface) => (
            <rect
              key={surface.x}
              className={
                surface.landing ? "stair-step is-landing" : "stair-step"
              }
              x={surface.x}
              y={surface.y}
              width={surface.length}
              height={height - surface.y}
            />
          ))}
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
    </div>
  );
}
