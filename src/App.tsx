import { useEffect, useRef, useState } from "react";
import {
	ArrowDown,
	ArrowRight,
	ArrowUpRight,
	Bookmark,
	Check,
	ChevronRight,
	Clock3,
	House,
	Menu,
	Search,
	ShieldCheck,
	Sparkles,
	Wrench,
	X,
	BookOpen,
	Euro,
	BarChart3,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { CategoryNavigation } from "@/components/category-navigation";
import { CatalogPage } from "@/components/catalog-page";
import { initializeAnalytics, trackPage } from "@/lib/analytics";
import { tutorials } from "@/data";
import { categories, navigationCategories, journeys } from "@/data/taxonomy";
import { belongsToCategory, catalogHref, duration } from "@/lib/catalog";
import { matchRoute } from "@/lib/routes";
import type { Tutorial } from "@/types";
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
export default function App({
	path,
	navigate,
}: {
	path: string;
	navigate: (href: string, replace?: boolean) => void;
}) {
	const [query, setQuery] = useState("");
	const [saved, setSaved] = useState<string[]>([]);
	const [menu, setMenu] = useState(false);
	const lastCatalog = useRef(catalogHref());
	const previousPath = useRef(path);
	const route = matchRoute(tutorials, path);
	const isCatalog = route.kind === "catalog";
	if (isCatalog) lastCatalog.current = path;
	const selected =
		route.kind === "tutorial"
			? tutorials.find((t) => t.id === route.id)
			: undefined;
	useEffect(() => {
		// Les favoris vivent dans localStorage : on les charge après l’hydratation.
		setSaved(readSaved());
	}, []);
	useEffect(() => {
		setMenu(false);
	}, [path]);
	useEffect(() => {
		if (previousPath.current === path) return;
		previousPath.current = path;
		window.scrollTo(0, 0);
		document.querySelector<HTMLElement>("main")?.focus({ preventScroll: true });
	}, [path]);
	useEffect(() => {
		initializeAnalytics();
		// `route` dérive de `path` : le suivi se relance à chaque navigation.
		trackPage(
			route.kind === "tutorial"
				? `tutoriel/${route.id}`
				: route.kind === "catalog"
					? "tutoriels"
					: route.kind === "home"
						? ""
						: "introuvable",
		);
	}, [path]);
	function toggleSaved(id: string) {
		setSaved((current) => {
			const next = current.includes(id)
				? current.filter((value) => value !== id)
				: [...current, id];
			try {
				localStorage.setItem("wikibrico:saved", JSON.stringify(next));
			} catch {
				/* Storage is optional. */
			}
			return next;
		});
	}
	return (
		<>
			<header className="site-header">
				<div className="container header-inner">
					<a className="logo" href="/" aria-label="WikiBrico, accueil">
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
						<CategoryNavigation
							categories={navigationCategories}
							onSelect={(category, topicPath = []) =>
								navigate(catalogHref({ category, topicPath }))
							}
						/>
					</nav>
					<button
						className="saved-nav"
						onClick={() => navigate(catalogHref({ savedOnly: true }))}
					>
						<Bookmark size={17} />
						<span>Mes favoris</span>
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
					returnHref={lastCatalog.current}
				/>
			) : isCatalog ? (
				<CatalogPage
					search={path}
					saved={saved}
					toggleSaved={toggleSaved}
					navigate={navigate}
				/>
			) : route.kind === "notFound" ? (
				<main className="container empty">
					<h1>
						{route.path.startsWith("/tutoriel/")
							? "Tutoriel introuvable"
							: "Page introuvable"}
					</h1>
					<a href={catalogHref()}>Revenir au catalogue</a>
				</main>
			) : (
				<main tabIndex={-1}>
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
									navigate(catalogHref({ query }));
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
											navigate(
												catalogHref({
													query: s === "Peinture" ? "peindre" : s,
												}),
											);
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
									navigate(catalogHref());
								}}
							>
								Explorer les tutoriels <ArrowRight size={16} />
							</button>
						</div>
						<div className="category-grid">
							{categories
								.filter((c) => c.kind === "trade")
								.map(({ id, name, icon: Icon }) => (
									<button
										key={id}
										className="category-tile"
										onClick={() => {
											navigate(catalogHref({ category: id }));
										}}
									>
										<Icon size={25} strokeWidth={1.5} />
										<span>{name}</span>
										<small>
											{tutorials.filter((t) => belongsToCategory(t, id)).length
												? `${tutorials.filter((t) => belongsToCategory(t, id)).length} tutos`
												: "À venir"}
										</small>
									</button>
								))}
						</div>
					</section>
					<section className="container discovery-section">
						<div className="section-heading">
							<div>
								<span className="eyebrow">PLUSIEURS FAÇONS D’APPRENDRE</span>
								<h2>Un chantier en tête ?</h2>
								<p>
									Explorez par pièce, préparez vos travaux ou apprenez un geste.
								</p>
							</div>
						</div>
						<div className="journey-grid">
							{journeys.map((j) => (
								<a
									className="journey-card"
									key={j.id}
									href={catalogHref({ journey: j.id })}
								>
									<House size={24} />
									<h3>{j.title}</h3>
									<p>{j.description}</p>
									<span>
										Explorer le parcours <ArrowRight size={15} />
									</span>
								</a>
							))}
						</div>
						<div className="transversal-links">
							{categories
								.filter((c) => c.kind === "transversal")
								.map(({ id, name, icon: Icon }) => (
									<a href={catalogHref({ category: id })} key={id}>
										<Icon size={22} />
										<span>{name}</span>
										<ArrowRight size={17} />
									</a>
								))}
						</div>
						<div className="catalog-invitation">
							<div>
								<h2>Votre prochain projet commence ici.</h2>
								<p>{tutorials.length} tutoriels à explorer à votre rythme.</p>
							</div>
							<Button asChild>
								<a href={catalogHref()}>
									Explorer tous les tutoriels <ArrowRight size={16} />
								</a>
							</Button>
						</div>
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
								Bibliothèque en construction ·{" "}
								{tutorials.filter((t) => t.status === "draft").length}{" "}
								brouillons éditoriaux à valider.
							</span>
						</div>
						<ArrowDown className="about-arrow" size={40} strokeWidth={1} />
					</section>
				</main>
			)}
			<footer className="container">
				<a className="logo" href="/">
					Wiki<span>Brico</span>.
				</a>
				<p>Le plaisir d’apprendre. La fierté de faire.</p>
				<a href={catalogHref()}>Les tutoriels</a>
				<span>Fait pour les mains curieuses. © {new Date().getFullYear()}</span>
			</footer>
		</>
	);
}
function TutorialPage({
	tutorial: t,
	saved,
	onSave,
	returnHref,
}: {
	tutorial: Tutorial;
	saved: boolean;
	onSave: () => void;
	returnHref: string;
}) {
	return (
		<main className="container detail" tabIndex={-1}>
			<nav className="breadcrumb" aria-label="Fil d’Ariane">
				<a href="/">Accueil</a>
				<ChevronRight size={14} />
				<a href={returnHref}>Les tutoriels</a>
				<ChevronRight size={14} />
				<a href={catalogHref({ category: t.category, topicPath: t.topicPath })}>
					{categories.find((c) => c.id === t.category)?.name}
					{t.topicPath && ` › ${t.topicPath.join(" › ")}`}
				</a>
			</nav>
			<a className="back-to-catalog" href={returnHref}>
				← Revenir aux tutoriels
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
			<figure>
				<img
					className={
						t.imageOrigin === "original"
							? "detail-image detail-diagram"
							: "detail-image"
					}
					src={t.image}
					alt={t.imageAlt}
				/>
			</figure>
			<div className="detail-stats">
				<span>
					<BarChart3 /> {t.difficulty ?? "Niveau à préciser"}
				</span>
				<span>
					<Clock3 /> {duration(t.durationMinutes)}
				</span>
				<span>
					<Euro />{" "}
					{t.cost ? `${t.cost.min}–${t.cost.max} €` : "Budget à préciser"}{" "}
					{t.cost && <small>budget indicatif</small>}
				</span>
			</div>
			{t.estimatesNote && <p className="estimates-note">{t.estimatesNote}</p>}
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
					{!!t.shoppingLinks?.length && (
						<section className="tutorial-shopping">
							<h2>Où trouver le matériel</h2>
							<ul>
								{t.shoppingLinks.map((link) => (
									<li key={link.url}>
										<a href={link.url} target="_blank" rel="noreferrer">
											<span>{link.material}</span>
											<small>{link.retailer} ↗</small>
										</a>
									</li>
								))}
							</ul>
						</section>
					)}
					{!!t.dtuReferences?.length && (
						<section className="tutorial-sources">
							<h2>Références DTU</h2>
							<ul>
								{t.dtuReferences.map((reference) => (
									<li key={reference.url}>
										<a href={reference.url} target="_blank" rel="noreferrer">
											{reference.reference} — {reference.title} ↗
										</a>
									</li>
								))}
							</ul>
						</section>
					)}
					{((t.relatedCategories?.length ?? 0) > 0 ||
						(t.journeys?.length ?? 0) > 0) && (
						<section className="related-discovery">
							<h2>Retrouvez aussi ce tutoriel</h2>
							<div>
								{t.relatedCategories?.map((entry) => (
									<a
										key={entry.category}
										href={catalogHref({
											category: entry.category,
											topicPath: entry.topicPath,
										})}
									>
										{categories.find((c) => c.id === entry.category)?.name} ›{" "}
										{entry.topicPath.join(" › ")}
									</a>
								))}
								{t.journeys?.map((id) => (
									<a key={id} href={catalogHref({ journey: id })}>
										{journeys.find((j) => j.id === id)?.title}
									</a>
								))}
							</div>
						</section>
					)}
					<p className="updated">
						Mis à jour le {new Date(t.updatedAt).toLocaleDateString("fr-FR")}
					</p>
				</div>
			</div>
		</main>
	);
}
