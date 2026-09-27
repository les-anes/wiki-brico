import { ChevronDown, ArrowRight, type LucideIcon } from "lucide-react";
import { useEffect, useRef, useState, useId } from "react";

type Props = {
  categories: {
    id: string;
    name: string;
    shortName: string;
    icon: LucideIcon;
    topics: string[][];
  }[];
  onSelect: (category: string, path?: string[]) => void;
};

/**
 * Thèmes d’une catégorie : un niveau de repli, jamais deux. Les thèmes d’un seul
 * segment sont des entrées simples ; ceux qui en ont deux — « Arrivée d’eau ›
 * Tuyaux » — se rangent sous leur parent, qui reste cliquable et ramasse tout
 * son sous-arbre. Le menu n’énumère pas les segments au-delà : la donnée les
 * refuse désormais, et rien ici ne se rappelle soi-même.
 */
function TopicList({
  paths,
  onSelect,
}: {
  paths: string[][];
  onSelect: (path: string[]) => void;
}) {
  const themes = [...new Set(paths.map((path) => path[0]))];
  return (
    <ul>
      {themes.map((theme) => {
        const enfants = paths
          .filter((path) => path[0] === theme && path.length > 1)
          .map((path) => path[1]);
        return (
          <li key={theme}>
            <button onClick={() => onSelect([theme])}>{theme}</button>
            {enfants.length > 0 && (
              <ul className="category-subtopics">
                {enfants.map((enfant) => (
                  <li key={enfant}>
                    <button onClick={() => onSelect([theme, enfant])}>
                      {enfant}
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </li>
        );
      })}
    </ul>
  );
}

export function CategoryNavigation({ categories, onSelect }: Props) {
  const navigationRef = useRef<HTMLElement>(null);
  const triggerRefs = useRef<Record<string, HTMLButtonElement | null>>({});
  const [openId, setOpenId] = useState<string | null>(null);
  const menuId = useId();
  const primary = categories.slice(0, 5);
  const others = categories.slice(5);

  useEffect(() => {
    const closeOutside = (event: PointerEvent) => {
      if (
        event.target instanceof Node &&
        !navigationRef.current?.contains(event.target)
      )
        setOpenId(null);
    };
    const closeOnFocusOut = (event: FocusEvent) => {
      if (
        event.target instanceof Node &&
        !navigationRef.current?.contains(event.target)
      )
        setOpenId(null);
    };
    document.addEventListener("pointerdown", closeOutside);
    document.addEventListener("focusin", closeOnFocusOut);
    return () => {
      document.removeEventListener("pointerdown", closeOutside);
      document.removeEventListener("focusin", closeOnFocusOut);
    };
  }, []);

  useEffect(() => {
    if (!openId) return;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      event.preventDefault();
      triggerRefs.current[openId]?.focus();
      setOpenId(null);
    };
    document.addEventListener("keydown", closeOnEscape);
    return () => document.removeEventListener("keydown", closeOnEscape);
  }, [openId]);

  function select(category: string, path: string[] = []) {
    setOpenId(null);
    onSelect(category, path);
  }

  function focusFirst(id: string) {
    setOpenId(id);
    requestAnimationFrame(() =>
      document
        .getElementById(`${menuId}-${id}`)
        ?.querySelector<HTMLButtonElement>("button")
        ?.focus(),
    );
  }

  return (
    <nav className="top-category-navigation" ref={navigationRef}>
      {primary.map((category) => {
        const paths = category.topics;
        const hasChildren = paths.length > 0;
        const isOpen = openId === category.id;
        return (
          <div
            className="top-category-item"
            key={category.id}
            onPointerEnter={(event) => {
              if (event.pointerType === "mouse")
                setOpenId(hasChildren ? category.id : null);
            }}
            onPointerLeave={(event) => {
              if (event.pointerType === "mouse") setOpenId(null);
            }}
          >
            <button
              className="top-category-trigger"
              ref={(element) => {
                triggerRefs.current[category.id] = element;
              }}
              aria-expanded={hasChildren ? isOpen : undefined}
              aria-controls={
                hasChildren ? `${menuId}-${category.id}` : undefined
              }
              onClick={() =>
                hasChildren ? setOpenId(category.id) : select(category.id)
              }
              onKeyDown={(event) => {
                if (hasChildren && event.key === "ArrowDown") {
                  event.preventDefault();
                  focusFirst(category.id);
                }
              }}
            >
              {category.shortName}
              {hasChildren && <ChevronDown size={13} aria-hidden="true" />}
            </button>
            {hasChildren && isOpen && (
              <div
                className="top-category-dropdown"
                id={`${menuId}-${category.id}`}
              >
                <button
                  className="top-category-all"
                  onClick={() => select(category.id)}
                >
                  Tout voir : {category.name}{" "}
                  <ArrowRight size={14} aria-hidden="true" />
                </button>
                <TopicList
                  paths={paths}
                  onSelect={(path) => select(category.id, path)}
                />
              </div>
            )}
          </div>
        );
      })}
      {others.length > 0 && (
        <div
          className="top-category-item top-category-others"
          onPointerEnter={(event) => {
            if (event.pointerType === "mouse") setOpenId("others");
          }}
          onPointerLeave={(event) => {
            if (event.pointerType === "mouse") setOpenId(null);
          }}
        >
          <button
            className="top-category-trigger"
            ref={(element) => {
              triggerRefs.current.others = element;
            }}
            aria-expanded={openId === "others"}
            aria-controls={`${menuId}-others`}
            onClick={() => setOpenId("others")}
            onKeyDown={(event) => {
              if (event.key === "ArrowDown") {
                event.preventDefault();
                focusFirst("others");
              }
            }}
          >
            Autres <ChevronDown size={13} aria-hidden="true" />
          </button>
          {openId === "others" && (
            <div className="top-category-dropdown" id={`${menuId}-others`}>
              <p className="category-dropdown-heading">Les autres univers</p>
              <ul>
                {others.map(({ id, name, icon: Icon }) => (
                  <li key={id}>
                    <button onClick={() => select(id)}>
                      <Icon size={17} aria-hidden="true" />
                      {name}
                    </button>
                  </li>
                ))}
              </ul>
              <button
                className="top-category-all"
                onClick={() => select("all")}
              >
                Tous les tutoriels <ArrowRight size={14} aria-hidden="true" />
              </button>
            </div>
          )}
        </div>
      )}
    </nav>
  );
}
