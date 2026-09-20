/* oxlint-disable jsx-a11y/prefer-tag-over-role -- La liste de la combobox garde le focus dans le champ ; un select natif changerait cette interaction. */
import { ArrowRight, Search } from "lucide-react";
import { useEffect, useId, useRef, useState } from "react";

import { Button } from "@/components/ui/button";
import { tutorials } from "@/data";
import { categories } from "@/data/taxonomy";
import { catalogHref } from "@/lib/catalog";
import { tutorialPath } from "@/lib/routes";
import { searchTutorials } from "@/lib/search";

export function TutorialSearch({
  navigate,
}: {
  navigate: (href: string) => void;
}) {
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(-1);
  const listId = useId();
  const list = useRef<HTMLDivElement>(null);
  const results = query.trim()
    ? searchTutorials(tutorials, categories, query)
    : [];
  const suggestions = results.slice(0, 5);
  const expanded = open && query.trim().length > 0;
  const selected = expanded ? suggestions[active] : undefined;

  useEffect(() => {
    if (expanded && active >= 0)
      list.current?.children[active]?.scrollIntoView?.({ block: "nearest" });
  }, [active, expanded]);

  function close() {
    setOpen(false);
    setActive(-1);
  }
  function go(href: string) {
    close();
    navigate(href);
  }

  return (
    <div
      className="tutorial-search"
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) close();
      }}
    >
      <form
        className="search-box"
        onSubmit={(event) => {
          event.preventDefault();
          go(catalogHref({ query }));
        }}
      >
        <Search size={20} aria-hidden="true" />
        <input
          role="combobox"
          aria-label="Rechercher un tutoriel"
          aria-autocomplete="list"
          aria-expanded={expanded}
          aria-controls={expanded ? listId : undefined}
          aria-activedescendant={
            selected ? `${listId}-${selected.id}` : undefined
          }
          autoComplete="off"
          placeholder="Qu’avez-vous envie de réaliser ?"
          value={query}
          onFocus={() => setOpen(true)}
          onChange={(event) => {
            setQuery(event.target.value);
            setActive(-1);
            setOpen(true);
          }}
          onKeyDown={(event) => {
            if (event.nativeEvent.isComposing) return;
            if (event.key === "Escape") {
              event.preventDefault();
              close();
            } else if (event.key === "ArrowDown" || event.key === "ArrowUp") {
              if (!suggestions.length) return;
              event.preventDefault();
              setOpen(true);
              setActive((index) =>
                event.key === "ArrowDown"
                  ? (index + 1) % suggestions.length
                  : (index <= 0 ? suggestions.length : index) - 1,
              );
            } else if (event.key === "Enter" && selected) {
              event.preventDefault();
              go(tutorialPath(selected.id));
            } else if (event.key === "Tab") close();
          }}
        />
        <Button type="submit" size="icon" aria-label="Rechercher">
          <ArrowRight size={20} />
        </Button>
      </form>
      <output className="sr-only">
        {expanded
          ? `${results.length} tutoriel${results.length > 1 ? "s" : ""} trouvé${results.length > 1 ? "s" : ""}.`
          : ""}
      </output>
      {expanded && (
        <div className="search-suggestions">
          <div
            id={listId}
            ref={list}
            role="listbox"
            aria-label="Tutoriels suggérés"
          >
            {suggestions.map((tutorial, index) => (
              <button
                type="button"
                role="option"
                id={`${listId}-${tutorial.id}`}
                key={tutorial.id}
                tabIndex={-1}
                aria-selected={active === index}
                onMouseDown={(event) => event.preventDefault()}
                onClick={() => go(tutorialPath(tutorial.id))}
              >
                <span>
                  {tutorial.title}
                  <small>
                    {
                      categories.find(
                        (category) => category.id === tutorial.category,
                      )?.name
                    }
                  </small>
                </span>
                <ArrowRight size={16} aria-hidden="true" />
              </button>
            ))}
          </div>
          {!suggestions.length && (
            <p>Aucun tutoriel trouvé. Essaie un autre mot.</p>
          )}
          {!!suggestions.length && (
            <button
              type="button"
              className="search-all"
              onClick={() => go(catalogHref({ query }))}
            >
              Voir tous les résultats ({results.length})
            </button>
          )}
        </div>
      )}
    </div>
  );
}
