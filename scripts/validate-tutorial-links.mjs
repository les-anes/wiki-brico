import assert from "node:assert/strict";

const retailers = {
  "Leroy Merlin": "leroymerlin.fr",
  "Brico Dépôt": "bricodepot.fr",
  "Brico Cash": "bricocash.fr",
  Castorama: "castorama.fr",
};
const text = (value) => typeof value === "string" && value.trim().length > 0;
function trustedUrl(value, domains) {
  try {
    const url = new URL(value);
    return (
      url.protocol === "https:" &&
      !url.username &&
      !url.password &&
      !url.port &&
      domains.some(
        (domain) =>
          url.hostname === domain || url.hostname.endsWith(`.${domain}`),
      )
    );
  } catch {
    return false;
  }
}
export function validateTutorialLinks(tutorial, label = tutorial.id) {
  if (tutorial.shoppingLinks !== undefined) {
    assert(
      Array.isArray(tutorial.shoppingLinks),
      `${label}: liens d’achat invalides`,
    );
    for (const link of tutorial.shoppingLinks) {
      assert(
        link &&
          text(link.material) &&
          Object.hasOwn(retailers, link.retailer) &&
          trustedUrl(link.url, [retailers[link.retailer]]),
        `${label}: marchand ou URL d’achat non autorisé`,
      );
    }
  }
  if (tutorial.dtuReferences !== undefined) {
    assert(
      Array.isArray(tutorial.dtuReferences),
      `${label}: références DTU invalides`,
    );
    for (const reference of tutorial.dtuReferences) {
      assert(
        reference &&
          /^(NF )?DTU \d+\.\d+(?: P[\d-]+)?$/.test(reference.reference) &&
          text(reference.title) &&
          text(reference.scope) &&
          /^\d{4}-\d{2}-\d{2}$/.test(reference.accessedAt) &&
          Number.isFinite(Date.parse(reference.accessedAt)) &&
          trustedUrl(reference.url, [
            "boutique.afnor.org",
            "norminfo.afnor.org",
            "boutique.cstb.fr",
          ]),
        `${label}: référence DTU ou éditeur invalide`,
      );
    }
  }
}
