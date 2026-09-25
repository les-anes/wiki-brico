import { ChevronRight } from "lucide-react";
import { useState } from "react";

import { CalpinagePlanView } from "@/components/calpinage-plan";
import { StairPlanView } from "@/components/stair-plan";
import { TutorialLinks } from "@/components/tutorial-links";
import { Button } from "@/components/ui/button";
import { categories } from "@/data/taxonomy";
import {
  calculatorHub,
  defaultInputs,
  findCalculator,
} from "@/lib/calculators";
import { visibleFields } from "@/lib/calculators/definitions";
import { reader } from "@/lib/calculators/format";
import { catalogHref } from "@/lib/catalog";
import { categoryPath } from "@/lib/routes";
import type { CalculatorField, CalculatorInputs } from "@/types";

function Field({
  field,
  value,
  error,
  onChange,
}: {
  field: CalculatorField;
  value: number | string;
  error?: string;
  onChange: (name: string, value: string) => void;
}) {
  const id = `champ-${field.name}`;
  const helpId = field.help ? `${id}-aide` : undefined;
  const errorId = error ? `${id}-erreur` : undefined;
  const describedBy = [helpId, errorId].filter(Boolean).join(" ") || undefined;
  return (
    <div className="calculator-field">
      <label htmlFor={id}>
        {field.label}
        {field.unit && <span className="field-unit">{field.unit}</span>}
      </label>
      {field.type === "number" ? (
        <input
          id={id}
          type="number"
          inputMode="decimal"
          value={String(value)}
          min={field.min}
          max={field.max}
          step={field.step ?? "any"}
          aria-describedby={describedBy}
          aria-invalid={Boolean(error)}
          onChange={(event) => onChange(field.name, event.target.value)}
        />
      ) : (
        <select
          id={id}
          value={String(value)}
          aria-describedby={describedBy}
          aria-invalid={Boolean(error)}
          onChange={(event) => onChange(field.name, event.target.value)}
        >
          {field.options?.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      )}
      {field.help && (
        <p className="field-help" id={helpId}>
          {field.help}
        </p>
      )}
      {error && (
        <p className="field-error" id={errorId}>
          {error}
        </p>
      )}
    </div>
  );
}

function referenceDate(value: string): string {
  const [year, month, day] = value.split("-");
  return `${day}/${month}/${year}`;
}

export function CalculatorPage({ slug }: { slug: string }) {
  const tool = findCalculator(slug);
  // Le slug vient d’une route déjà validée : l’absence d’outil est une erreur de
  // développement, pas un cas d’usage.
  if (!tool) throw new Error(`Outil inconnu : ${slug}`);
  const [inputs, setInputs] = useState<CalculatorInputs>(() =>
    defaultInputs(tool),
  );
  const output = tool.compute(inputs);
  const fields = visibleFields(tool, inputs);
  const fieldErrors = Object.fromEntries(
    fields.map((field) => {
      const read = reader(tool, inputs);
      if (field.type === "number") read.number(field.name);
      else read.option(field.name);
      return [
        field.name,
        read.errors[0] ??
          (output.values.length === 0
            ? output.warnings.find((warning) =>
                warning.startsWith(`${field.label} :`),
              )
            : undefined),
      ];
    }),
  );
  const category = tool.category;
  const categoryName =
    categories.find((entry) => entry.id === category)?.name ?? category;

  return (
    <main className="calculator-page container" tabIndex={-1}>
      <nav className="breadcrumb" aria-label="Fil d’Ariane">
        <a href="/">Accueil</a>
        <ChevronRight size={14} aria-hidden="true" />
        <a href="/calculateurs/">{calculatorHub.title}</a>
        <ChevronRight size={14} aria-hidden="true" />
        <span aria-current="page">{tool.title}</span>
      </nav>
      <header className="calculator-heading">
        <span className="eyebrow">CALCULATEUR</span>
        <h1>{tool.heading}</h1>
        <p>{tool.introduction}</p>
      </header>
      <div className="calculator-layout">
        <form
          className="calculator-form"
          onSubmit={(event) => event.preventDefault()}
        >
          <h2>Ta saisie</h2>
          {fields.map((field) => (
            <Field
              key={field.name}
              field={field}
              value={inputs[field.name]}
              error={fieldErrors[field.name]}
              onChange={(name, value) =>
                setInputs((current) => ({ ...current, [name]: value }))
              }
            />
          ))}
        </form>
        <section className="calculator-result" aria-live="polite">
          <h2 className="visually-hidden">Résultat du calcul</h2>
          {output.values.length > 0 && (
            <>
              <p className="result-headline">{output.headline}</p>
              <dl className="result-values">
                {output.values.map((value) => (
                  <div key={value.label}>
                    <dt>{value.label}</dt>
                    <dd>
                      {value.value}
                      {value.hint && (
                        <span className="result-hint">{value.hint}</span>
                      )}
                    </dd>
                  </div>
                ))}
              </dl>
            </>
          )}
          {output.warnings.length > 0 && (
            <div className="result-warnings">
              <h3>
                {output.values.length ? "À vérifier" : "Saisie à corriger"}
              </h3>
              <ul>
                {output.warnings.map((warning) => (
                  <li key={warning}>{warning}</li>
                ))}
              </ul>
            </div>
          )}
        </section>
      </div>
      {output.plan && (
        <section className="calculator-plan">
          <h2>Le plan de calepinage</h2>
          <CalpinagePlanView plan={output.plan} />
          <ul className="calpinage-legend">
            <li>
              <span className="legend-swatch" /> Carreau entier
            </li>
            <li>
              <span className="legend-swatch is-cut" /> Carreau coupé, clique
              pour son format
            </li>
          </ul>
        </section>
      )}
      {output.stairPlan && (
        <section className="calculator-plan">
          <h2>Ton escalier en images</h2>
          <StairPlanView plan={output.stairPlan} />
        </section>
      )}
      <section className="calculator-method">
        <h2>La méthode</h2>
        <p>{tool.method}</p>
        <h3>Hypothèses retenues</h3>
        <ul>
          {tool.assumptions.map((assumption) => (
            <li key={assumption}>{assumption}</li>
          ))}
        </ul>
        <h3>Limites du calcul</h3>
        <ul>
          {tool.limits.map((limit) => (
            <li key={limit}>{limit}</li>
          ))}
        </ul>
        <p className="calculator-reference">
          <a href={tool.reference.url} target="_blank" rel="noreferrer">
            {tool.reference.title} ↗
          </a>
          <span>
            {tool.reference.note} Consulté le{" "}
            {referenceDate(tool.reference.accessedAt)}.
          </span>
        </p>
        <h3>Pour préparer la suite</h3>
        <TutorialLinks ids={tool.relatedTutorials} />
        <div className="calculator-discovery">
          <Button variant="ghost" asChild>
            <a href={categoryPath(category)}>
              Tous les tutoriels : {categoryName}
            </a>
          </Button>
          {tool.catalogFilter && (
            <Button asChild>
              <a href={catalogHref(tool.catalogFilter)}>
                Les fiches de ce sujet
              </a>
            </Button>
          )}
        </div>
      </section>
    </main>
  );
}
