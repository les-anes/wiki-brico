import {
  Search,
  X,
  ChevronRight,
  Sparkles,
  Bookmark,
  BarChart3,
  Clock3,
  Euro,
  ArrowUpRight,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { tutorials } from "@/data";
import { categories, journeys } from "@/data/taxonomy";
import {
  belongsToCategory,
  catalogHref,
  readCatalogFilters,
  normalize,
  duration,
  type CatalogFilters,
} from "@/lib/catalog";
import { tutorialPath } from "@/lib/routes";
import { childTopics } from "@/lib/topic-path";

export function CatalogPage({
  search,
  saved,
  toggleSaved,
  navigate,
}: {
  search: string;
  saved: string[];
  toggleSaved: (id: string) => void;
  navigate: (href: string, replace?: boolean) => void;
}) {
  const filters = readCatalogFilters(search);
  const { query, category, topicPath, difficulty, savedOnly, journey } =
    filters;
  const update = (patch: Partial<CatalogFilters>, replace = false) =>
    navigate(catalogHref({ ...filters, ...patch }), replace);
  const setCategory = (category: string) => update({ category, topicPath: [] });
  const setTopicPath = (topicPath: string[]) => update({ topicPath });
  const setDifficulty = (difficulty: string) => update({ difficulty });
  const setSavedOnly = (savedOnly: boolean) => update({ savedOnly });
  const selectedCategory = categories.find((c) => c.id === category);
  const activeJourney = journeys.find((j) => j.id === journey);
  const filtered = tutorials.filter(
    (t) =>
      belongsToCategory(t, category, topicPath) &&
      (difficulty === "all" || t.difficulty === difficulty) &&
      (!savedOnly || saved.includes(t.id)) &&
      (journey === "all" || t.journeys?.includes(journey)) &&
      normalize(
        [
          t.title,
          t.description,
          ...t.tools,
          ...[
            t.category,
            ...(t.relatedCategories ?? []).map((c) => c.category),
          ].flatMap((id) => {
            const c = categories.find((c) => c.id === id);
            return c ? [c.name, c.shortName] : [id];
          }),
          ...(t.topicPath ?? []),
          ...(t.relatedCategories ?? []).flatMap((c) => c.topicPath),
        ].join(" "),
      ).includes(normalize(query)),
  );
  return (
    <main tabIndex={-1}>
      {" "}
      <section
        className="tutorials-section catalog-page container"
        id="tutoriels"
        tabIndex={-1}
      >
        <nav className="breadcrumb" aria-label="Fil d’Ariane">
          <a href="#">Accueil</a>
          <ChevronRight size={14} />
          <span>Les tutoriels</span>
        </nav>
        <div className="section-heading">
          <div>
            <span className="eyebrow">UN PROJET APRÈS L’AUTRE</span>
            <h1>
              {savedOnly ? "Vos projets de côté" : "On s’y met ce week-end ?"}
            </h1>
            <p>
              Choisissez un univers, un geste à apprendre ou une pièce à
              rénover.
            </p>
          </div>
          <span className="result-count" role="status">
            {filtered.length} tutoriel{filtered.length > 1 ? "s" : ""}
          </span>
        </div>
        <form
          className="search-box catalog-search"
          onSubmit={(event) => event.preventDefault()}
        >
          <Search size={20} />
          <input
            aria-label="Rechercher dans les tutoriels"
            placeholder="Un projet, un outil, un matériau…"
            value={query}
            onChange={(event) => update({ query: event.target.value }, true)}
          />
          {query && (
            <button
              type="button"
              aria-label="Effacer la recherche"
              onClick={() => update({ query: "" })}
            >
              <X size={18} />
            </button>
          )}
        </form>
        <div className="catalog-discovery">
          <label className="difficulty-filter">
            Univers
            <select
              aria-label="Filtrer par catégorie"
              value={category}
              onChange={(event) => setCategory(event.target.value)}
            >
              <option value="all">Tous les univers</option>
              {["trade", "transversal"].map((kind) => (
                <optgroup
                  key={kind}
                  label={
                    kind === "trade"
                      ? "Travaux & rénovation"
                      : "Rubriques transversales"
                  }
                >
                  {categories
                    .filter((c) => c.kind === kind)
                    .map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.name}
                      </option>
                    ))}
                </optgroup>
              ))}
            </select>
          </label>
          <label className="difficulty-filter">
            Parcours
            <select
              aria-label="Filtrer par parcours"
              value={journey}
              onChange={(event) => update({ journey: event.target.value })}
            >
              <option value="all">Tous les parcours</option>
              {journeys.map((j) => (
                <option key={j.id} value={j.id}>
                  {j.title}
                </option>
              ))}
            </select>
          </label>
        </div>
        {activeJourney && (
          <div className="catalog-journey-note">
            <strong>{activeJourney.title}</strong>
            <p>{activeJourney.description}</p>
            <small>
              Sélection de tutoriels disponibles, à compléter selon votre
              chantier.
            </small>
          </div>
        )}
        <div className="filters">
          <div className="filter-tabs">
            <button
              className={
                category === "all" &&
                !savedOnly &&
                !query &&
                difficulty === "all" &&
                journey === "all"
                  ? "active"
                  : ""
              }
              onClick={() => {
                navigate(catalogHref());
              }}
            >
              Tous les projets
            </button>
            <button
              className={difficulty === "Débutant" ? "active" : ""}
              onClick={() =>
                setDifficulty(difficulty === "Débutant" ? "all" : "Débutant")
              }
            >
              Pour débuter <Sparkles size={13} />
            </button>
            <button
              className={savedOnly ? "active" : ""}
              onClick={() => setSavedOnly(!savedOnly)}
            >
              Mes favoris
            </button>
          </div>
          <label className="difficulty-filter">
            Difficulté{" "}
            <select
              aria-label="Filtrer par difficulté"
              value={difficulty}
              onChange={(e) => setDifficulty(e.target.value)}
            >
              <option value="all">Tous les niveaux</option>
              <option>Débutant</option>
              <option>Intermédiaire</option>
              <option>Avancé</option>
            </select>
          </label>
        </div>
        {selectedCategory && (
          <div className="plumbing-filters">
            {Array.from({ length: topicPath.length + 1 }, (_, level) => {
              const prefix = topicPath.slice(0, level);
              const choices = childTopics(selectedCategory.topics, prefix);
              if (!choices.length) return null;
              const label =
                ["Thème", "Sous-catégorie", "Type de raccord"][level] ??
                "Sous-catégorie";
              return (
                <label className="difficulty-filter" key={level}>
                  {label}
                  <select
                    aria-label={`Filtrer : ${label}`}
                    value={topicPath[level] ?? ""}
                    onChange={(event) =>
                      setTopicPath(
                        event.target.value
                          ? [...prefix, event.target.value]
                          : prefix,
                      )
                    }
                  >
                    <option value="">
                      {level === 0 ? "Tous les sujets" : "Tout afficher"}
                    </option>
                    {choices.map((name) => (
                      <option key={name}>{name}</option>
                    ))}
                  </select>
                </label>
              );
            })}
          </div>
        )}
        {(query || category !== "all" || journey !== "all") && (
          <div className="active-filters">
            <span>
              {query && `Recherche : « ${query} » `}
              {category !== "all" &&
                categories.find((c) => c.id === category)?.name}
              {topicPath.length > 0 && ` › ${topicPath.join(" › ")}`}
            </span>
            <button
              onClick={() => {
                update({
                  query: "",
                  category: "all",
                  topicPath: [],
                  journey: "all",
                });
              }}
            >
              Effacer <X size={14} />
            </button>
          </div>
        )}
        <div className="tutorial-grid">
          {filtered.map((t) => (
            <article className="tutorial-card" key={t.id}>
              <div className="card-image">
                <a href={tutorialPath(t.id)} tabIndex={-1} aria-hidden="true">
                  <img src={t.image} alt={t.imageAlt} loading="lazy" />
                </a>
                <span className="category-badge">
                  {categories.find((c) => c.id === t.category)?.name}
                </span>
                <button
                  className={`save-button ${saved.includes(t.id) ? "is-saved" : ""}`}
                  aria-label={`${saved.includes(t.id) ? "Retirer des" : "Ajouter aux"} favoris : ${t.title}`}
                  aria-pressed={saved.includes(t.id)}
                  onClick={() => toggleSaved(t.id)}
                >
                  <Bookmark
                    size={17}
                    fill={saved.includes(t.id) ? "currentColor" : "none"}
                  />
                </button>
              </div>
              <div className="card-body">
                {t.topicPath && (
                  <div className="topic-path">{t.topicPath.join(" › ")}</div>
                )}
                <span
                  className={`level ${t.difficulty === "Débutant" ? "beginner" : ""}`}
                >
                  <BarChart3 size={12} />
                  {t.difficulty ?? "Niveau à préciser"}
                </span>
                <h3>
                  <a href={tutorialPath(t.id)}>{t.title}</a>
                </h3>
                <p>{t.description}</p>
                <div className="card-meta">
                  <span>
                    <Clock3 size={14} />
                    {duration(t.durationMinutes)}
                  </span>
                  <span>
                    <Euro size={14} />
                    {t.cost
                      ? `${t.cost.min}–${t.cost.max} €`
                      : "Budget à préciser"}
                  </span>
                  <a href={tutorialPath(t.id)} aria-label={`Lire : ${t.title}`}>
                    <ArrowUpRight size={19} />
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>
        {!filtered.length && (
          <div className="empty">
            <Search size={30} />
            <h3>Aucun tutoriel pour le moment</h3>
            <p>
              {savedOnly
                ? "Enregistrez un projet avec l’icône marque-page pour le retrouver ici."
                : "Cette bibliothèque démarre tout juste. Essayez une autre catégorie ou une autre recherche."}
            </p>
            <Button
              variant="outline"
              onClick={() => {
                navigate(catalogHref());
              }}
            >
              Voir tous les projets
            </Button>
          </div>
        )}
      </section>
    </main>
  );
}
