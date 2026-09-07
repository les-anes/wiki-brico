import { useEffect, useState } from "react";
import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  Bookmark,
  Check,
  ChevronRight,
  Clock3,
  Droplets,
  Hammer,
  House,
  Layers3,
  Menu,
  PaintRoller,
  Search,
  ShieldCheck,
  Sparkles,
  Trees,
  Wrench,
  X,
  Zap,
  BookOpen,
  Euro,
  BarChart3,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { tutorials } from "@/data";
import type { Tutorial } from "@/types";
const categories = [
  { id: "plomberie", name: "Plomberie", icon: Droplets },
  { id: "electricite", name: "Électricité", icon: Zap },
  { id: "maconnerie", name: "Gros œuvre", icon: Hammer },
  { id: "menuiserie", name: "Menuiserie", icon: Wrench },
  { id: "peinture", name: "Peinture", icon: PaintRoller },
  { id: "revetements", name: "Sols & murs", icon: Layers3 },
  { id: "charpente", name: "Charpente", icon: Trees },
  { id: "toiture", name: "Toiture", icon: House },
];
const duration = (minutes: number) =>
  minutes < 60
    ? `${minutes} min`
    : `${Math.floor(minutes / 60)} h${minutes % 60 ? ` ${minutes % 60}` : ""}`;
const currentSlug = () => {
  try {
    return decodeURIComponent(location.hash.slice(1));
  } catch {
    return location.hash.slice(1);
  }
};
const normalize = (s: string) =>
  s
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
function readSaved(): string[] {
  try {
    const value: unknown = JSON.parse(
      localStorage.getItem("wikibrico:saved") || "[]",
    );
    return Array.isArray(value)
      ? value.filter((v): v is string => typeof v === "string")
      : [];
  } catch {
    return [];
  }
}
export default function App() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("all");
  const [difficulty, setDifficulty] = useState("all");
  const [savedOnly, setSavedOnly] = useState(false);
  const [saved, setSaved] = useState<string[]>(readSaved);
  const [menu, setMenu] = useState(false);
  const [slug, setSlug] = useState(currentSlug);
  useEffect(() => {
    const listener = () => {
      setSlug(currentSlug());
      if (!location.hash || location.hash.startsWith("#tutoriel/"))
        window.scrollTo(0, 0);
    };
    window.addEventListener("hashchange", listener);
    return () => window.removeEventListener("hashchange", listener);
  }, []);
  const selected = tutorials.find((t) => slug === `tutoriel/${t.id}`);
  useEffect(() => {
    document.title = selected
      ? `${selected.title} — WikiBrico`
      : "WikiBrico — Le savoir-faire se partage.";
  }, [selected]);
  function toggleSaved(id: string) {
    setSaved((current) => {
      const next = current.includes(id)
        ? current.filter((s) => s !== id)
        : [...current, id];
      try {
        localStorage.setItem("wikibrico:saved", JSON.stringify(next));
      } catch {
        /* Browsing still works when storage is unavailable. */
      }
      return next;
    });
  }
  function catalog(onlySaved = false) {
    location.hash = "";
    setSavedOnly(onlySaved);
    setMenu(false);
    setTimeout(
      () =>
        document
          .getElementById("tutoriels")
          ?.scrollIntoView({ behavior: "smooth" }),
      30,
    );
  }
  const filtered = tutorials.filter(
    (t) =>
      (category === "all" || t.category === category) &&
      (difficulty === "all" || t.difficulty === difficulty) &&
      (!savedOnly || saved.includes(t.id)) &&
      normalize(
        `${t.title} ${t.description} ${t.category} ${t.tools.join(" ")}`,
      ).includes(normalize(query)),
  );
  return (
    <>
      <header className="site-header">
        <div className="container header-inner">
          <a className="logo" href="#" aria-label="WikiBrico, accueil">
            <span className="logo-icon">
              <House size={21} />
            </span>
            Wiki<span>Brico</span>
            <span className="logo-dot">.</span>
          </a>
          <nav
            className={menu ? "nav open" : "nav"}
            aria-label="Navigation principale"
          >
            <button onClick={() => catalog()}>Les tutoriels</button>
            <button
              onClick={() => {
                location.hash = "";
                setMenu(false);
                setTimeout(
                  () =>
                    document
                      .getElementById("categories")
                      ?.scrollIntoView({ behavior: "smooth" }),
                  30,
                );
              }}
            >
              Les catégories
            </button>
            <a href="#a-propos" onClick={() => setMenu(false)}>
              L’esprit WikiBrico <ArrowUpRight size={13} />
            </a>
          </nav>
          <button className="saved-nav" onClick={() => catalog(true)}>
            <Bookmark size={17} /> <span>Mes favoris</span>
            <span className="count">{saved.length}</span>
          </button>
          <Button
            variant="ghost"
            size="icon"
            className="mobile-menu"
            aria-label="Afficher le menu"
            aria-expanded={menu}
            onClick={() => setMenu(!menu)}
          >
            {menu ? <X /> : <Menu />}
          </Button>
        </div>
      </header>
      {selected ? (
        <TutorialPage
          tutorial={selected}
          saved={saved.includes(selected.id)}
          onSave={() => toggleSaved(selected.id)}
        />
      ) : slug.startsWith("tutoriel/") ? (
        <main className="container empty">
          <h1>Tutoriel introuvable</h1>
          <a href="#">Revenir au catalogue</a>
        </main>
      ) : (
        <main>
          <section className="hero container">
            <div className="hero-copy">
              <div className="eyebrow">
                <span /> LE SAVOIR-FAIRE SE PARTAGE
              </div>
              <h1>
                Vos deux mains.
                <br />
                Des milliers de
                <br />
                <span>possibilités.</span>
              </h1>
              <p>
                Le bricolage commence par un peu de curiosité.
                <br className="desktop-break" /> Des tutos clairs, les bons
                outils et le plaisir de faire soi-même.
              </p>
              <form
                className="search-box"
                onSubmit={(e) => {
                  e.preventDefault();
                  catalog();
                }}
              >
                <Search size={20} />
                <input
                  aria-label="Rechercher un tutoriel"
                  placeholder="Qu’avez-vous envie de réaliser ?"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                />
                <Button size="icon" aria-label="Rechercher">
                  <ArrowRight size={20} />
                </Button>
              </form>
              <div className="hero-hints">
                <span>Un projet en tête ?</span>
                {["Peinture", "Étagère", "Joints"].map((s) => (
                  <button
                    key={s}
                    onClick={() => {
                      setQuery(s === "Peinture" ? "peindre" : s);
                      catalog();
                    }}
                  >
                    {s}
                    <ArrowUpRight size={11} />
                  </button>
                ))}
              </div>
              <div className="hero-proof">
                <span className="proof-icon">
                  <BookOpen size={17} />
                </span>
                <span>Du premier coup de pinceau aux grands projets.</span>
              </div>
            </div>
            <div className="hero-visual">
              <img
                src="https://images.unsplash.com/photo-1452860606245-08befc0ff44b?auto=format&fit=crop&w=1300&q=90"
                alt="Atelier créatif avec outils et matériel de bricolage"
              />
              <div className="image-shade" />
              <span className="image-label">
                <span /> APPRENDRE. FAIRE. ÊTRE FIER.
              </span>
              <div className="hero-note">
                <span className="note-icon">
                  <Wrench size={22} />
                </span>
                <div>
                  <strong>« C’est moi qui l’ai fait. »</strong>
                  <p>Et ça, ça change tout.</p>
                </div>
                <Sparkles size={20} />
              </div>
              <span className="vertical-caption">
                UN PEU D’ENVIE, BEAUCOUP DE POSSIBILITÉS
              </span>
            </div>
          </section>
          <div className="promise-strip">
            <div className="container promise-inner">
              <span>
                <BookOpen />
                Des étapes faciles à suivre
              </span>
              <span>
                <Wrench />
                Outils & matériaux détaillés
              </span>
              <span>
                <Euro />
                Un budget sans surprise
              </span>
              <span>
                <ShieldCheck />
                Les bons réflexes avant de commencer
              </span>
            </div>
          </div>
          <section className="container categories-section" id="categories">
            <div className="section-heading">
              <div>
                <span className="eyebrow">À CHAQUE PROJET, SON UNIVERS</span>
                <h2>Par où commence-t-on ?</h2>
              </div>
              <button
                className="text-link"
                onClick={() => {
                  setCategory("all");
                  catalog();
                }}
              >
                Explorer les tutoriels <ArrowRight size={16} />
              </button>
            </div>
            <div className="category-grid">
              {categories.map(({ id, name, icon: Icon }) => (
                <button
                  key={id}
                  className={`category-tile ${category === id ? "active" : ""}`}
                  aria-pressed={category === id}
                  onClick={() => {
                    setCategory(category === id ? "all" : id);
                    catalog();
                  }}
                >
                  <Icon size={25} strokeWidth={1.5} />
                  <span>{name}</span>
                  <small>
                    {tutorials.filter((t) => t.category === id).length
                      ? `${tutorials.filter((t) => t.category === id).length} tutos`
                      : "À venir"}
                  </small>
                </button>
              ))}
            </div>
          </section>
          <section className="container tutorials-section" id="tutoriels">
            <div className="section-heading">
              <div>
                <span className="eyebrow">UN PROJET APRÈS L’AUTRE</span>
                <h2>
                  {savedOnly
                    ? "Vos projets de côté"
                    : "On s’y met ce week-end ?"}
                </h2>
                <p>
                  Des projets accessibles pour se lancer et prendre confiance.
                </p>
              </div>
              <span className="result-count">
                {filtered.length} tutoriel{filtered.length > 1 ? "s" : ""}
              </span>
            </div>
            <div className="filters">
              <div className="filter-tabs">
                <button
                  className={category === "all" && !savedOnly ? "active" : ""}
                  onClick={() => {
                    setCategory("all");
                    setSavedOnly(false);
                  }}
                >
                  Tous les projets
                </button>
                <button
                  className={difficulty === "Débutant" ? "active" : ""}
                  onClick={() =>
                    setDifficulty(
                      difficulty === "Débutant" ? "all" : "Débutant",
                    )
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
            {(query || category !== "all") && (
              <div className="active-filters">
                <span>
                  {query && `Recherche : « ${query} » `}
                  {category !== "all" &&
                    categories.find((c) => c.id === category)?.name}
                </span>
                <button
                  onClick={() => {
                    setQuery("");
                    setCategory("all");
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
                    <a
                      href={`#tutoriel/${t.id}`}
                      tabIndex={-1}
                      aria-hidden="true"
                    >
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
                    <span
                      className={`level ${t.difficulty === "Débutant" ? "beginner" : ""}`}
                    >
                      <BarChart3 size={12} />
                      {t.difficulty}
                    </span>
                    <h3>
                      <a href={`#tutoriel/${t.id}`}>{t.title}</a>
                    </h3>
                    <p>{t.description}</p>
                    <div className="card-meta">
                      <span>
                        <Clock3 size={14} />
                        {duration(t.durationMinutes)}
                      </span>
                      <span>
                        <Euro size={14} />
                        {t.cost.min}–{t.cost.max} €
                      </span>
                      <a
                        href={`#tutoriel/${t.id}`}
                        aria-label={`Lire : ${t.title}`}
                      >
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
                    setCategory("all");
                    setQuery("");
                    setDifficulty("all");
                    setSavedOnly(false);
                  }}
                >
                  Voir tous les projets
                </Button>
              </div>
            )}
          </section>
          <section className="container about" id="a-propos">
            <div className="about-icon">
              <House size={42} strokeWidth={1.3} />
            </div>
            <div>
              <span className="eyebrow">
                MOINS DE MYSTÈRE, PLUS DE SAVOIR-FAIRE
              </span>
              <h2>
                Une maison s’améliore.
                <br />
                Le savoir-faire se transmet.
              </h2>
              <p>
                WikiBrico, c’est une encyclopédie du bricolage pensée pour tous
                les curieux. Une même recette pour chaque tuto : de quoi
                prévoir, comprendre et avancer à son rythme.
              </p>
              <span className="draft-note">
                Bibliothèque de démonstration · 6 exemples éditoriaux à valider.
              </span>
            </div>
            <ArrowDown className="about-arrow" size={40} strokeWidth={1} />
          </section>
        </main>
      )}
      <footer className="container">
        <a className="logo" href="#">
          Wiki<span>Brico</span>.
        </a>
        <p>Le plaisir d’apprendre. La fierté de faire.</p>
        <span>Fait pour les mains curieuses. © {new Date().getFullYear()}</span>
      </footer>
    </>
  );
}
function TutorialPage({
  tutorial: t,
  saved,
  onSave,
}: {
  tutorial: Tutorial;
  saved: boolean;
  onSave: () => void;
}) {
  return (
    <main className="container detail">
      <a className="breadcrumb" href="#">
        Accueil <ChevronRight size={14} /> Les tutoriels{" "}
        <ChevronRight size={14} />{" "}
        {categories.find((c) => c.id === t.category)?.name}
      </a>
      <div className="detail-heading">
        <div>
          <span className="eyebrow">{t.category}</span>
          <h1>{t.title}</h1>
          <p>{t.description}</p>
        </div>
        <Button variant="outline" onClick={onSave}>
          <Bookmark size={16} fill={saved ? "currentColor" : "none"} />
          {saved ? "Enregistré" : "Enregistrer"}
        </Button>
      </div>
      {t.status === "draft" && (
        <div className="draft-banner">
          Exemple de tutoriel — brouillon éditorial à compléter et à valider
          avant utilisation.
        </div>
      )}
      <img className="detail-image" src={t.image} alt={t.imageAlt} />
      <div className="detail-stats">
        <span>
          <BarChart3 /> {t.difficulty}
        </span>
        <span>
          <Clock3 /> {duration(t.durationMinutes)}
        </span>
        <span>
          <Euro /> {t.cost.min}–{t.cost.max} € <small>budget indicatif</small>
        </span>
      </div>
      <div className="detail-layout">
        <aside>
          <h2>Avant de commencer</h2>
          <h3>Les outils</h3>
          <ul>
            {t.tools.map((tool) => (
              <li key={tool}>
                <Check size={15} />
                {tool}
              </li>
            ))}
          </ul>
          <h3>Les matériaux</h3>
          <ul>
            {t.materials.map((m) => (
              <li key={m.name}>
                <Check size={15} />
                <span>
                  {m.name}
                  <small>{m.quantity}</small>
                </span>
              </li>
            ))}
          </ul>
        </aside>
        <div>
          <h2>Les étapes du projet</h2>
          {t.steps.map((s, i) => (
            <section className="step" key={s.title}>
              <span>{String(i + 1).padStart(2, "0")}</span>
              <div>
                <h3>{s.title}</h3>
                <p>{s.description}</p>
              </div>
            </section>
          ))}
          <section className="advice">
            <h3>Les erreurs à éviter</h3>
            <ul>
              {t.mistakes.map((m) => (
                <li key={m}>{m}</li>
              ))}
            </ul>
          </section>
          <section className="advice safety">
            <h3>
              <ShieldCheck size={19} /> Les précautions
            </h3>
            <ul>
              {t.safety.map((s) => (
                <li key={s}>{s}</li>
              ))}
            </ul>
          </section>
          <p className="updated">
            Mis à jour le {new Date(t.updatedAt).toLocaleDateString("fr-FR")}
          </p>
        </div>
      </div>
    </main>
  );
}
