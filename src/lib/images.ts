/**
 * Dérive les variantes WebP responsives d'une illustration locale.
 * La source `.png` reste la référence editoriale : elle sert de repli et
 * d'image Open Graph, tandis que le navigateur charge le WebP correspondant.
 */
export interface ResponsiveImage {
  /** Variante 480 px de large, pour les petites vignettes. */
  small: string;
  /** Variante 720 px de large, pour les vignettes haute densité. */
  medium: string;
  /** Variante 960 px de large, pour les pages de détail. */
  large: string;
  /** Dimensions naturelles de la source, pour réserver la place (CLS). */
  width: number;
  height: number;
}

export function responsiveImage(src: string): ResponsiveImage {
  const base = src.replace(/\.png$/, "");
  return {
    small: `${base}-480.webp`,
    medium: `${base}-720.webp`,
    large: `${base}-960.webp`,
    width: 1536,
    height: 1024,
  };
}
