type CategoryId =
  | "structure"
  | "toiture"
  | "isolation"
  | "cloisons"
  | "electricite"
  | "plomberie"
  | "assainissement"
  | "chauffage"
  | "menuiseries"
  | "finitions"
  | "cuisine-salle-de-bains"
  | "exterieurs"
  | "preparer-chantier"
  | "techniques";
export interface Tutorial {
  id: string;
  title: string;
  description: string;
  category: CategoryId;
  topicPath?: string[];
  relatedCategories?: { category: CategoryId; topicPath: string[] }[];
  journeys?: string[];
  tags: string[];
  relatedTutorials: string[];
  difficulty: "Débutant" | "Intermédiaire" | "Avancé" | null;
  durationMinutes: number | null;
  cost: { min: number; max: number; currency: "EUR" } | null;
  image: string;
  imageAlt: string;
  imageOrigin?: "original";
  imageCredit?: {
    author: string;
    license: string;
    licenseUrl: string;
    sourceUrl: string;
    originalUrl: string;
    caption: string;
    changes: string;
    accessedAt: string;
  };
  scope?: string;
  estimatesNote?: string;
  sources?: { title: string; url: string; note: string; accessedAt: string }[];
  dtuReferences?: {
    reference: string;
    title: string;
    url: string;
    scope: string;
    accessedAt: string;
  }[];
  shoppingLinks?: { material: string; retailer: string; url: string }[];
  tools: string[];
  materials: { name: string; quantity: string }[];
  steps: { title: string; description: string }[];
  mistakes: string[];
  safety: string[];
  status: "draft" | "documented" | "published";
  updatedAt: string;
}

interface CalculatorFieldOption {
  value: string;
  label: string;
}

/** Champ saisissable d’un outil : nombre borné ou choix dans une liste. */
export interface CalculatorField {
  name: string;
  label: string;
  help?: string;
  type: "number" | "select";
  unit?: string;
  default: number | string;
  min?: number;
  max?: number;
  step?: number;
  options?: CalculatorFieldOption[];
  visibleWhen?: { field: string; values: string[] };
}

interface CalculatorReference {
  title: string;
  url: string;
  note: string;
  accessedAt: string;
}

/** Métadonnées éditoriales d’un outil, telles qu’elles vivent dans le JSON. */
export interface CalculatorDefinition {
  slug: string;
  title: string;
  description: string;
  heading: string;
  introduction: string;
  category: CategoryId;
  fields: CalculatorField[];
  method: string;
  assumptions: string[];
  limits: string[];
  reference: CalculatorReference;
  relatedTutorials: string[];
  catalogFilter?: { category: CategoryId; topicPath: string[] };
  updatedAt: string;
}

export interface CalculatorHub {
  title: string;
  description: string;
  heading: string;
  introduction: string;
}

interface CalculatorValue {
  label: string;
  value: string;
  hint?: string;
}

/**
 * Bande de rive la plus étroite rencontrée sur chaque côté, en mètres :
 * `start` et `end` aux deux extrémités de la longueur, `top` et `bottom` aux
 * deux extrémités de la largeur, tels qu’orientés sur le plan.
 */
interface CalpinageEdges {
  start: number;
  end: number;
  top: number;
  bottom: number;
}

export interface CalpinagePlan {
  room: { width: number; height: number };
  tile: { width: number; height: number };
  /** Carré ou rectangle, ou nid d’abeille. */
  forme: "carre" | "hexagone";
  /** Plat à plat d’un carreau hexagonal, en mètres. */
  flat?: number;
  joint: number;
  /** Pièces posées, en mètres, dans le repère de la pièce. Vide si l’aperçu est simplifié. */
  pieces: CalpinagePiece[];
  edges: CalpinageEdges;
  rows: number;
  centred: boolean;
  /** Trop de pièces pour un dessin individuel : aperçu réduit à une trame. */
  simplified: boolean;
  shift: { x: number; y: number };
  staggered: boolean;
}

export interface CalpinagePiece {
  x: number;
  y: number;
  width: number;
  height: number;
  cut: boolean;
  /** Sommets de la pièce, pour les formats non rectangulaires (hexagone). */
  points?: [number, number][];
}

export interface CalculatorOutput {
  headline: string;
  values: CalculatorValue[];
  warnings: string[];
  plan?: CalpinagePlan;
  stairPlan?: StairPlan;
}

export interface StairStep {
  points: [number, number][];
  length: number;
  landing?: boolean;
  /** Cotes exactes de la marche, dessinées quand elle est sélectionnée. */
  cotes?: StairDimension[];
}

/** Segment à coter sur un dessin, avec son libellé déjà mis en forme. */
export interface StairDimension {
  from: [number, number];
  to: [number, number];
  label: string;
}

export interface StairPlan {
  kind: "droit" | "palier" | "rayonnant" | "u-palier" | "u-rayonnant";
  left: boolean;
  height: number;
  rise: number;
  going: number;
  risers: number;
  width: number;
  extent: { x: number; y: number };
  steps: StairStep[];
  walkingLine: [number, number][];
}

export type CalculatorInputs = Record<string, number | string>;

export interface Calculator extends CalculatorDefinition {
  compute: (inputs: CalculatorInputs) => CalculatorOutput;
}
