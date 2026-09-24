import { ChevronRight } from "lucide-react";

import { TutorialLinks } from "@/components/tutorial-links";
import { Button } from "@/components/ui/button";
import pillars from "@/data/pillars.json";
import { categories } from "@/data/taxonomy";
import { catalogHref } from "@/lib/catalog";

export function PillarPage({ id }: { id: string }) {
  const pillar = pillars.find((p) => p.id === id)!;
  const category = categories.find((c) => c.id === id)!;
  return (
    <main className="pillar-page container" tabIndex={-1}>
      <nav className="breadcrumb" aria-label="Fil d’Ariane">
        <a href="/">Accueil</a>
        <ChevronRight size={14} aria-hidden="true" />
        <a href="/tutoriels/">Les tutoriels</a>
        <ChevronRight size={14} aria-hidden="true" />
        <span aria-current="page">{category.name}</span>
      </nav>
      <header className="pillar-heading">
        <span className="eyebrow">GUIDE THÉMATIQUE</span>
        <h1>{pillar.title}</h1>
        <p>{pillar.introduction}</p>
        <Button asChild>
          <a href={catalogHref({ category: id })}>
            Tous les tutoriels : {category.name}
          </a>
        </Button>
      </header>
      {pillar.sections.map((section) => (
        <section className="pillar-section" key={section.title}>
          <h2>{section.title}</h2>
          <p>{section.description}</p>
          <TutorialLinks ids={section.tutorials} />
        </section>
      ))}
    </main>
  );
}
