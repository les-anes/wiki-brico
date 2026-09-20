import assert from "node:assert/strict";

import { JSDOM } from "jsdom";
import { act, createElement } from "react";
import { createRoot } from "react-dom/client";

export async function checkAutocomplete(server) {
  const { TutorialSearch } = await server.ssrLoadModule(
    "/src/components/tutorial-search.tsx",
  );
  const dom = new JSDOM(
    "<!doctype html><html><body><div id='test'></div></body></html>",
    { url: "https://wikibrico.fr/" },
  );
  globalThis.window = dom.window;
  globalThis.document = dom.window.document;
  globalThis.IS_REACT_ACT_ENVIRONMENT = true;
  const container = document.getElementById("test");
  const root = createRoot(container);
  const navigations = [];
  const dispatch = async (target, event) =>
    act(() => {
      target.dispatchEvent(event);
    });
  try {
    await act(() =>
      root.render(
        createElement(TutorialSearch, {
          navigate: (href) => navigations.push(href),
        }),
      ),
    );
    const input = container.querySelector("input");
    const type = async (value) => {
      Object.getOwnPropertyDescriptor(
        dom.window.HTMLInputElement.prototype,
        "value",
      ).set.call(input, value);
      await dispatch(input, new dom.window.Event("input", { bubbles: true }));
    };
    const key = (value) =>
      dispatch(
        input,
        new dom.window.KeyboardEvent("keydown", {
          key: value,
          bubbles: true,
          cancelable: true,
        }),
      );
    assert.equal(input.getAttribute("aria-expanded"), "false");
    await type("parqet");
    assert.equal(input.getAttribute("aria-expanded"), "true");
    assert(
      container
        .querySelector('[role="option"]')
        .textContent.includes("parquet"),
    );
    assert(container.querySelectorAll('[role="option"]').length <= 5);
    await key("ArrowDown");
    assert(
      document.getElementById(input.getAttribute("aria-activedescendant")),
    );
    await key("Escape");
    assert.equal(input.getAttribute("aria-expanded"), "false");
    assert.equal(input.value, "parqet");
    await key("ArrowDown");
    await key("Enter");
    assert.equal(navigations.at(-1), "/tutoriel/poser-du-parquet/");
    await type("parquet");
    await dispatch(
      container.querySelector('[role="option"]'),
      new dom.window.MouseEvent("click", { bubbles: true }),
    );
    assert.equal(navigations.at(-1), "/tutoriel/poser-du-parquet/");
    await type("parqet");
    await key("Tab");
    assert.equal(input.getAttribute("aria-expanded"), "false");
    await dispatch(
      container.querySelector("form"),
      new dom.window.Event("submit", { bubbles: true, cancelable: true }),
    );
    assert.equal(navigations.at(-1), "/tutoriels/?q=parqet");
    await type("zzzintrouvablezzz");
    assert.equal(container.querySelectorAll('[role="option"]').length, 0);
    assert(container.textContent.includes("Aucun tutoriel trouvé"));
    await type("");
    assert.equal(input.getAttribute("aria-expanded"), "false");
  } finally {
    await act(() => root.unmount());
    globalThis.IS_REACT_ACT_ENVIRONMENT = false;
  }
}
