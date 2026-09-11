import { StrictMode } from "react";
import { hydrateRoot } from "react-dom/client";

import { Document } from "./document";

import "./index.css";

// Le HTML prerendu contient déjà les balises d'assets et l'origine de
// publication : on les relit pour que l'arbre client corresponde exactement à
// ce qui a été rendu sur le serveur (une origine recalculée depuis
// `location.origin` différerait sur les URL de prévisualisation).
const css = Array.from(
  document.querySelectorAll<HTMLLinkElement>('link[rel="stylesheet"]'),
)
  .map((element) => element.getAttribute("href"))
  .filter((href): href is string => Boolean(href));
const modules = Array.from(
  document.querySelectorAll<HTMLScriptElement>('script[type="module"]'),
)
  .map((element) => element.getAttribute("src"))
  .filter((src): src is string => Boolean(src));
const siteUrl =
  document.documentElement.dataset.siteUrl?.trim() || location.origin;

hydrateRoot(
  document,
  <StrictMode>
    <Document
      initialPath={location.pathname + location.search}
      siteUrl={siteUrl}
      assets={{ css, modules }}
    />
  </StrictMode>,
);
