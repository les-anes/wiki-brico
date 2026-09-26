import { ArrowRight, ChevronRight } from "lucide-react";

import { calculatorHub, calculators } from "@/lib/calculators";
import { responsiveImage } from "@/lib/images";
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
        {calculators.map((tool, index) => {
          const image = responsiveImage(tool.image);
          return (
            <li key={tool.slug}>
              <a className="calculator-card" href={calculatorPath(tool.slug)}>
                <picture className="calculator-card-image">
                  <source
                    type="image/webp"
                    srcSet={`${image.small} 480w, ${image.medium} 720w, ${image.large} 960w`}
                    sizes="(max-width: 700px) calc(100vw - 36px), 480px"
                  />
                  <img
                    src={tool.image}
                    alt={tool.imageAlt}
                    width={image.width}
                    height={image.height}
                    loading={index < 2 ? "eager" : "lazy"}
                    decoding="async"
                  />
                </picture>
                <h2>{tool.title}</h2>
                <p>{tool.description}</p>
                <span>
                  Ouvrir l’outil <ArrowRight size={15} aria-hidden="true" />
                </span>
              </a>
            </li>
          );
        })}
      </ul>
    </main>
  );
}
