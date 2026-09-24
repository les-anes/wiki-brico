import type {
  CalculatorDefinition,
  CalculatorField,
  CalculatorInputs,
} from "@/types";

/**
 * Formate un nombre à la française sans dépendre des données ICU du moteur :
 * virgule décimale et espace fine insécable comme séparateur de milliers, si
 * bien que le pré-rendu et le navigateur produisent la même chaîne.
 */
export function fr(value: number, digits = 0): string {
  const fixed = Math.abs(value).toFixed(digits);
  const [whole, decimal] = fixed.split(".");
  const grouped = whole.replace(/\B(?=(\d{3})+(?!\d))/g, "\u202f");
  const sign = value < 0 ? "\u2212" : "";
  return `${sign}${grouped}${decimal ? `,${decimal}` : ""}`;
}

/** Arrondit à l’unité supérieure, sans l’erreur flottante qui donne 4,000000001. */
export function roundUp(value: number): number {
  return Math.ceil(value - 1e-9);
}

/**
 * Arrondit au dixième de millimètre. Sans cela, deux cotes physiquement égales
 * s’affichent avec un écart d’un dixième à cause du flottant (28,6 et 28,7 cm).
 */
export function roundTo(value: number, digits = 4): number {
  const factor = 10 ** digits;
  return Math.round(value * factor) / factor;
}

/** Comme `fr`, mais sans zéros inutiles : « 250 × 125 cm » plutôt que « 250,0 ». */
export function frTrim(value: number, digits = 1): string {
  return fr(value, digits)
    .replace(/(,\d*?)0+$/u, "$1")
    .replace(/,$/u, "");
}

/** Extrait les deux dimensions en millimètres d’un libellé comme « 2500x1250 ». */
export function selectSizeMm(value: string): { width: number; height: number } {
  const match = /(\d+)\s*x\s*(\d+)/.exec(value);
  return match
    ? { width: Number(match[1]), height: Number(match[2]) }
    : { width: 0, height: 0 };
}

export interface Reader {
  errors: string[];
  /** Valeur numérique du champ, ou `NaN` avec une erreur nommant le champ et sa borne. */
  number: (name: string) => number;
  /** Valeur d’un champ à choix, ou chaîne vide avec une erreur. */
  option: (name: string) => string;
}

function fieldOf(
  definition: CalculatorDefinition,
  name: string,
): CalculatorField | undefined {
  return definition.fields.find((field) => field.name === name);
}

function minimum(label: string, valeur: number, unit?: string): string {
  return `${label} : la valeur minimale est ${fr(valeur, 2)}${unit ? ` ${unit}` : ""}.`;
}

/**
 * Lit et borne les valeurs saisies. Une saisie hors bornes ne produit jamais de
 * résultat chiffré : l’outil affiche le message et rien d’autre.
 */
export function reader(
  definition: CalculatorDefinition,
  inputs: CalculatorInputs,
): Reader {
  const errors: string[] = [];
  return {
    errors,
    number(name) {
      const field = fieldOf(definition, name);
      const raw = inputs[name];
      const text = typeof raw === "string" ? raw.replace(",", ".").trim() : raw;
      const value = typeof text === "number" ? text : Number(text);
      if (text === "" || !Number.isFinite(value)) {
        errors.push(`${field?.label ?? name} : saisis un nombre.`);
        return Number.NaN;
      }
      if (field?.min !== undefined && value < field.min) {
        errors.push(minimum(field.label, field.min, field.unit));
        return Number.NaN;
      }
      if (field?.max !== undefined && value > field.max) {
        errors.push(
          `${field.label} : la valeur maximale est ${fr(field.max, 2)}${field.unit ? ` ${field.unit}` : ""}.`,
        );
        return Number.NaN;
      }
      return value;
    },
    option(name) {
      const field = fieldOf(definition, name);
      const value = String(inputs[name] ?? "");
      if (!field?.options?.some((option) => option.value === value)) {
        errors.push(`${field?.label ?? name} : choisis une valeur proposée.`);
        return "";
      }
      return value;
    },
  };
}

/** Sortie sans résultat chiffré, utilisée quand une saisie est invalide. */
export function invalid(errors: string[]): {
  headline: string;
  values: [];
  warnings: string[];
} {
  return { headline: "", values: [], warnings: errors };
}
