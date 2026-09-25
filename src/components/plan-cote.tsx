import type { StairDimension } from "@/types";

/**
 * Cote dessinée : trait de cote, traits de rappel et libellé à côté du trait.
 * Partagée par le plan d’escalier et par le calepinage, qui y lit les cotes
 * d’une marche ou le format d’un carreau coupé.
 */
export function Cote({
  cote,
  font,
  rotation = false,
}: {
  cote: StairDimension;
  font: number;
  /**
   * Aligne le libellé sur le trait quand celui-ci est plus vertical
   * qu’horizontal : sur un carreau étroit, un libellé couché ne tiendrait pas.
   */
  rotation?: boolean;
}) {
  const [x1, y1] = cote.from;
  const [x2, y2] = cote.to;
  const dx = x2 - x1;
  const dy = y2 - y1;
  const longueur = Math.hypot(dx, dy) || 1;
  const nx = -dy / longueur;
  const ny = dx / longueur;
  // Marque de cote : un trait oblique à 45° à chaque extrémité, comme sur une
  // épure. Un trait perpendiculaire croisé formait une petite étoile, et deux
  // cotes voisines se superposaient sur leur sommet commun.
  const obliquite = Math.atan2(dy, dx) + Math.PI / 4;
  const sx = Math.cos(obliquite) * font * 0.5;
  const sy = Math.sin(obliquite) * font * 0.5;
  // Sur un trait plus court que la police, la marque se transforme en pâté :
  // on la remplace par un simple trait de cote.
  const avecMarques = longueur > font;
  // Le libellé se pose à côté du trait, jamais dessus : son halo de lisibilité
  // masquerait le trait et ne laisserait que des morceaux.
  const ecart = font * 1.3;
  // Il quitte aussi le milieu du trait, où passe la ligne de foulée.
  const long = 0.3;
  const x = x1 + dx * long + nx * ecart;
  const y = y1 + dy * long + ny * ecart;
  const pivoter = rotation && Math.abs(dy) > Math.abs(dx);
  return (
    <g className="plan-cote">
      <line x1={x1} y1={y1} x2={x2} y2={y2} />
      {avecMarques && (
        <>
          <line x1={x1 - sx} y1={y1 - sy} x2={x1 + sx} y2={y1 + sy} />
          <line x1={x2 - sx} y1={y2 - sy} x2={x2 + sx} y2={y2 + sy} />
        </>
      )}
      <text
        x={x}
        y={y}
        transform={
          pivoter
            ? `rotate(${(Math.atan2(dy, dx) * 180) / Math.PI} ${x} ${y})`
            : undefined
        }
        fontSize={font * 0.75}
        textAnchor="middle"
        dominantBaseline="central"
        strokeWidth={font * 0.2}
      >
        {cote.label}
      </text>
    </g>
  );
}
