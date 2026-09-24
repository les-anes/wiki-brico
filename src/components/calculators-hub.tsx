import { ArrowRight, ChevronRight } from "lucide-react";

import { calculatorHub, calculators } from "@/lib/calculators";
import { calculatorPath } from "@/lib/routes";

export function CalculatorsHub() {
  return (
    <main className="calculators-page container" tabIndex={-1}>
      <nav className="breadcrumb" aria-label="Fil d’Ariane">
        <a href="/">Accueil</a>
        <ChevronRight size={14} aria-hidden="true" />
        <span aria-current="page">{calculatorHub.title}</span>
      </nav>
      <header className="calculators-heading">
        <span className="eyebrow">OUTILS DE CHANTIER</span>
        <h1>{calculatorHub.heading}</h1>
        <p>{calculatorHub.introduction}</p>
      </header>
      <ul className="calculator-grid">
        {calculators.map((tool) => (
          <li key={tool.slug}>
            <a className="calculator-card" href={calculatorPath(tool.slug)}>
              <h2>{tool.title}</h2>
              <p>{tool.description}</p>
              <span>
                Ouvrir l’outil <ArrowRight size={15} aria-hidden="true" />
              </span>
            </a>
          </li>
        ))}
      </ul>
    </main>
  );
}
