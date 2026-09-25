import assert from "node:assert/strict";
import { test } from "node:test";

import { fr, frTrim } from "./format.ts";
import { calculators, defaultInputs, findCalculator } from "./index.ts";

function run(slug: string, inputs: Record<string, number | string> = {}) {
  const tool = findCalculator(slug);
  assert(tool, `${slug}: outil déclaré`);
  return tool.compute({ ...defaultInputs(tool), ...inputs });
}

test("chaque outil rend un résultat chiffré sur ses valeurs par défaut", () => {
  assert.equal(calculators.length, 9);
  for (const tool of calculators) {
    const output = tool.compute(defaultInputs(tool));
    assert(output.headline.length > 0, `${tool.slug}: titre de résultat`);
    assert(output.values.length > 0, `${tool.slug}: valeurs affichées`);
    assert.equal(
      output.warnings.some((warning) => warning.includes("saisis un nombre")),
      false,
      `${tool.slug}: valeurs par défaut valides`,
    );
  }
});

test("une saisie hors bornes ne produit aucun résultat chiffré", () => {
  for (const [slug, input] of [
    ["calpinage", { longueur: "" }],
    ["quantite-osb", { longueur: 500 }],
    ["isolant-panneaux", { surface: "abc" }],
    ["ossature-montants", { hauteur: 0.2 }],
    ["dosage-materiaux", { dosage: 900 }],
    ["pente-evacuation-pvc", { pente: 0.1 }],
  ] as const) {
    const output = run(slug, input);
    assert.equal(output.headline, "", `${slug}: pas de résultat`);
    assert.equal(output.values.length, 0, `${slug}: aucune valeur`);
    assert(output.warnings.length > 0, `${slug}: message d’erreur`);
  }
});

test("la pente donne la descente, l’angle et la hauteur d’arrivée", () => {
  const output = run("pente-evacuation-pvc", {
    longueur: 3,
    pente: 1.5,
    hauteurDepart: 60,
  });
  assert.equal(output.headline, "4,5 cm de descente sur 3,0 m");
  assert.equal(output.values[0].value, "4,5 cm");
  assert.equal(output.values[1].value, "1,5 cm plus bas");
  assert.equal(output.values[3].value, "0,86°");
  assert.equal(output.values[4].value, "55,5 cm");
  assert.deepEqual(output.warnings, []);
});

test("la pente sous le minimum et la hauteur négative sont signalées", () => {
  const faible = run("pente-evacuation-pvc", { pente: 0.8 });
  assert(faible.warnings[0].includes("sous le minimum de 1 cm/m"));
  const negatif = run("pente-evacuation-pvc", {
    longueur: 10,
    pente: 5,
    hauteurDepart: 20,
  });
  assert(
    negatif.warnings.some((w) =>
      w.includes("sous le niveau de référence du sol"),
    ),
  );
});

test("la quantité d’OSB se compte en rangées, plus la chute", () => {
  const output = run("quantite-osb", {
    longueur: 4,
    largeur: 3,
    format: "2500x1250",
    chute: 10,
  });
  assert.equal(output.headline, "7 panneaux de 250 × 125 cm");
  assert.equal(output.values[2].value, "6 panneaux");
  assert.equal(output.values[3].value, "7 panneaux à prévoir");
  const serre = run("quantite-osb", { longueur: 4, largeur: 2.6, chute: 0 });
  assert(serre.warnings[0].includes("dernière rangée"));
});

test("le compte d’isolant arrondit au conditionnement supérieur", () => {
  const output = run("isolant-panneaux", {
    surface: 30,
    format: "panneau-1200x600",
    chute: 10,
  });
  assert.equal(output.headline, "46 panneaux de 120 × 60 cm");
  assert.equal(output.values[3].value, "46 panneaux");
  const rouleau = run("isolant-panneaux", {
    surface: 30,
    format: "rouleau-6000x1200",
    chute: 10,
  });
  assert.equal(rouleau.values[3].value, "5 rouleaux");
});

test("l’ossature compte les montants, les rails et la visserie", () => {
  const serre = run("ossature-montants", { longueur: 4, entraxe: "40" });
  assert.equal(serre.values[0].value, "11 profilés de 2,50 m");
  const courant = run("ossature-montants", { longueur: 4, hauteur: 2.5 });
  assert.equal(courant.headline, "8 montants et 4 barres de rails");
  assert.equal(courant.values[2].value, "4 barres de 3 m");
  const haut = run("ossature-montants", { hauteur: 3.4 });
  assert.equal(haut.values.length, 0);
  assert(haut.warnings[0].includes("trop courte"));
});

test("le dosage donne le liant, l’eau et les granulats d’un mètre cube", () => {
  const beton = run("dosage-materiaux", {
    famille: "beton",
    dosage: 300,
    longueur: 2,
    largeur: 1,
    epaisseur: 50,
    sac: "35",
  });
  assert.equal(beton.values[0].value, "1,000 m³");
  assert.equal(beton.values[1].value, "300 kg");
  assert.equal(beton.values[2].value, "environ 150 litres");
  assert.equal(beton.values[3].value, "650 kg");
  assert.equal(beton.values[4].value, "1 200 kg");
  assert(beton.values[1].hint?.includes("9 sacs de 35 kg"));
  const mortier = run("dosage-materiaux", {
    famille: "mortier",
    dosage: 300,
    longueur: 2,
    largeur: 1,
    epaisseur: 50,
  });
  assert.equal(mortier.values.length, 4);
  assert.equal(mortier.values[3].value, "650 kg");
});

test("le calpinage centré donne deux bandes de rive égales", () => {
  const output = run("calpinage", {
    longueur: 4,
    largeur: 3,
    carreauLargeur: 30,
    carreauLongueur: 30,
    joint: 3,
    depart: "centre",
    marge: 10,
  });
  const plan = output.plan!;
  assert.equal(plan.pieces.length, 140);
  assert.equal(plan.edges.start, plan.edges.end);
  assert.equal(plan.rows, 10);
  assert.equal(output.headline, "154 carreaux de 30 × 30 cm");
  assert.equal(output.values[1].value, "140");
  assert.equal(
    output.values[1].hint,
    "96 carreaux entiers et 44 pièces coupées.",
  );
  assert.deepEqual(output.warnings, []);
});

test("le calpinage prévient quand une bande de rive est trop étroite", () => {
  const output = run("calpinage", {
    longueur: 2.53,
    largeur: 2.53,
    carreauLargeur: 30,
    carreauLongueur: 30,
    depart: "angle",
  });
  assert(output.warnings[0].includes("bande de rive descend à 10,6 cm"));
  const decalee = run("calpinage", { pose: "decalee" });
  assert(decalee.warnings.some((w) => w.includes("moins d’un demi-carreau")));
});

test("deux coupes d’une même rangée peuvent sortir d’un seul carreau", () => {
  const droite = run("calpinage", { pose: "droite" });
  const decalee = run("calpinage", { pose: "decalee" });
  // Les rangs décalés coupent 2,9 cm à chaque bout : ces deux coupes tiennent
  // dans un carreau, le total ne bouge donc pas.
  assert.equal(droite.values[0].value, decalee.values[0].value);
  assert.equal(
    decalee.warnings.some((w) => w.includes("de plus qu’une pose droite")),
    false,
  );
});

test("le calpinage bascule en aperçu simplifié sur une pièce fine", () => {
  const output = run("calpinage", {
    longueur: 20,
    largeur: 20,
    carreauLargeur: 2.5,
    carreauLongueur: 2.5,
    joint: 0,
  });
  const plan = output.plan!;
  assert.equal(plan.simplified, true);
  assert.equal(plan.pieces.length, 2000);
  assert(output.headline.startsWith(`${fr(704000)} carreaux`));
  assert(output.warnings.some((w) => w.includes("Aperçu simplifié")));
});

test("une pièce plus courte qu’un carreau reste calculable", () => {
  const output = run("calpinage", {
    longueur: 0.5,
    largeur: 0.5,
    carreauLargeur: 60,
    carreauLongueur: 60,
    joint: 0,
  });
  assert.equal(output.plan!.pieces.length, 1);
  assert.equal(output.plan!.pieces[0].cut, true);
  assert.equal(output.values[0].value, "2");
});

test("le format décimal conserve la virgule en supprimant les zéros", () => {
  assert.equal(frTrim(25.5, 2), "25,5");
  assert.equal(frTrim(250, 2), "250");
});

test("le calepinage conserve les rives de 2 mm et réserve le trait de coupe", () => {
  const thin = run("calpinage", {
    longueur: 0.608,
    largeur: 0.6,
    depart: "angle",
    joint: 3,
  });
  assert.equal(thin.plan!.edges.end, 0.002);
  assert(thin.warnings.some((warning) => warning.includes("0,2 cm")));
  const noKerf = run("calpinage", {
    longueur: 0.6,
    largeur: 0.6,
    joint: 0,
    pose: "decalee",
    depart: "angle",
    marge: 0,
    trait: 0,
  });
  const kerf = run("calpinage", {
    longueur: 0.6,
    largeur: 0.6,
    joint: 0,
    pose: "decalee",
    depart: "angle",
    marge: 0,
    trait: 3,
  });
  assert.equal(noKerf.values[0].value, "4");
  assert.equal(kerf.values[0].value, "5");
});

test("le dosage met à l’échelle la recette saisie sans déduire des constituants", () => {
  const output = run("dosage-materiaux", {
    longueur: 2,
    largeur: 1,
    epaisseur: 50,
    eauDosage: 120,
    sableDosage: 720,
    gravierDosage: 1100,
  });
  assert.equal(output.values[2].value, "environ 120 litres");
  assert.equal(output.values[3].value, "720 kg");
  assert.equal(output.values[4].value, "1 100 kg");
  assert(
    run("dosage-materiaux", { famille: "mortier", gravierDosage: "" }).values
      .length > 0,
  );
});

test("un escalier droit distingue les hauteurs, les marches et le giron", () => {
  const output = run("escalier", { hauteur: 280, longueur: 390, hauteurs: 16 });
  const plan = output.stairPlan!;
  assert.equal(plan.risers, 16);
  assert.equal(plan.steps.length, 15);
  assert.equal(plan.rise, 17.5);
  assert.equal(plan.going, 26);
  assert.equal(output.values[3].value, "61,0 cm");
  assert.equal(
    plan.steps.reduce((sum, step) => sum + step.length, 0),
    390,
  );
  assert.equal(run("escalier", { hauteurs: 16.5 }).values.length, 0);
  assert.equal(run("escalier", { hauteurs: 2 }).values.length, 0);
  assert(
    run("escalier", { forme: "droit", retour: "", jour: "", sens: "" })
      .stairPlan,
  );
});

test("les quarts tournants rentrent dans les deux branches et se reflètent", () => {
  for (const forme of ["palier", "rayonnant"]) {
    const right = run("escalier", { forme }).stairPlan!;
    const left = run("escalier", { forme, sens: "gauche" }).stairPlan!;
    assert(right && left);
    assert(right.extent.x <= 300 + 1e-8);
    assert(right.extent.y <= 390 + 1e-8);
    assert.equal(right.steps.length, right.risers - 1);
    assert.equal(
      right.steps.filter((step) => step.landing).length,
      forme === "palier" ? 1 : 0,
    );
    assert(Math.abs(right.rise * right.risers - right.height) < 1e-8);
    right.steps.forEach((step, index) =>
      step.points.forEach(([x, y], vertex) => {
        assert(x >= -1e-8 && x <= right.extent.x + 1e-8);
        assert(y >= -1e-8 && y <= right.extent.y + 1e-8);
        assert.equal(left.steps[index].points[vertex][0], right.extent.x - x);
        assert.equal(left.steps[index].points[vertex][1], y);
      }),
    );
    // L’aire des polygones doit couvrir les volées et le tournant, sans compter le jour.
    const area = right.steps.reduce(
      (sum, step) =>
        sum +
        Math.abs(
          step.points.reduce((twice, [x, y], i) => {
            const [nx, ny] = step.points[(i + 1) % step.points.length];
            return twice + x * ny - nx * y;
          }, 0),
        ) /
          2,
      0,
    );
    const block = forme === "palier" ? right.width : right.width + 10;
    const expected =
      right.width * (right.extent.x + right.extent.y - 2 * block) +
      block * block -
      (forme === "rayonnant" ? 100 : 0);
    assert(Math.abs(area - expected) < 1e-6);
  }
});

test("les marches tournantes exposent leur collet, leur extérieur et leur nez", () => {
  const plan = run("escalier", { forme: "rayonnant" }).stairPlan!;
  const nombre = (label: string) =>
    Number(/([\d]+,[\d]+)/.exec(label)![1].replace(",", "."));
  const etiquettes = (etape: (typeof plan.steps)[number]) =>
    (etape.cotes ?? []).map((cote) => cote.label);
  const tournantes = plan.steps.filter((etape) =>
    etiquettes(etape).some((label) => label.startsWith("Collet")),
  );
  assert(tournantes.length >= 2, "Le quart tournant comporte des tournantes");
  for (const etape of tournantes) {
    const cote = (nom: string) =>
      nombre(etiquettes(etape).find((label) => label.startsWith(nom))!);
    assert(
      cote("Collet") < etape.length,
      "Le collet est plus étroit que la ligne de foulée",
    );
    assert(
      etape.length < cote("Extérieur"),
      "L’extérieur est plus large que la ligne de foulée",
    );
    assert(
      cote("Nez") > etape.length,
      "Le nez traverse la largeur de la marche",
    );
  }
  const droit = run("escalier", {
    hauteur: 280,
    longueur: 390,
    hauteurs: 16,
  }).stairPlan!;
  assert.equal(droit.steps[0].cotes?.[0].label, "Giron 26,0 cm");
  const palier = run("escalier", { forme: "palier" }).stairPlan!;
  assert.equal(
    palier.steps.find((etape) => etape.landing)?.cotes?.[0].label,
    "Côté 90,0 cm",
  );
});

test("un escalier impossible ne produit aucun plan et Blondel seul ne valide pas le confort", () => {
  assert.equal(
    run("escalier", { forme: "palier", longueur: 80 }).stairPlan,
    undefined,
  );
  const steep = run("escalier", { hauteur: 280, longueur: 150, hauteurs: 14 });
  assert(steep.warnings.some((warning) => warning.includes("Giron")));
  assert(steep.warnings.some((warning) => warning.includes("échappée")));
});

function litresDeMortier(inputs: Record<string, number | string> = {}): number {
  return Number.parseFloat(
    run("rejointoiement-chaux", inputs).values[0].value.replace(",", "."),
  );
}

test("le rejointoiement à la chaux part du vide des joints, pas de la surface", () => {
  const output = run("rejointoiement-chaux");
  assert.equal(output.headline, "17 litres de mortier à gâcher");
  assert.equal(output.values[0].value, "17,0 L");
  assert.equal(output.values[1].value, "14,8 %");
  assert.equal(output.values[2].value, "4,9 L");
  assert.equal(output.values[3].value, "12,1 L");
  assert.equal(output.values[4].value, "3,4 L/m²");
  assert.deepEqual(output.warnings, []);
});

test("le mortier suit la surface et la profondeur, les grandes pierres en demandent moins", () => {
  const base = litresDeMortier();
  assert(Math.abs(litresDeMortier({ surface: 10 }) - base * 2) < 0.05);
  assert(Math.abs(litresDeMortier({ profondeur: 40 }) - base * 2) < 0.05);
  const grandes = run("rejointoiement-chaux", {
    hauteurPierre: 40,
    longueurPierre: 60,
  });
  assert(
    litresDeMortier({ hauteurPierre: 40, longueurPierre: 60 }) < base / 1.5,
  );
  assert(
    grandes.warnings.some((warning) => warning.includes("8 % de la surface")),
  );
});

test("le rejointoiement signale les cas qui font rater le joint", () => {
  const profondeur = run("rejointoiement-chaux", { profondeur: 8 });
  assert(
    profondeur.warnings.some((warning) =>
      warning.includes("Moins d’un centimètre"),
    ),
  );
  const riche = run("rejointoiement-chaux", { proportion: "2" });
  assert(
    riche.warnings.some((warning) => warning.includes("Proportion riche")),
  );
  const sansMarge = run("rejointoiement-chaux", { perte: 0 });
  assert(
    sansMarge.warnings.some((warning) =>
      warning.includes("Sans marge de perte"),
    ),
  );
  const large = run("rejointoiement-chaux", { largeurJoint: 50 });
  assert(large.warnings.some((warning) => warning.includes("4 cm")));
  // Saisie hors bornes : aucun résultat chiffré.
  assert.equal(run("rejointoiement-chaux", { surface: 0.2 }).values.length, 0);
});

test("la puissance du radiateur suit le volume et l’isolation", () => {
  const output = run("puissance-radiateur");
  assert.equal(
    output.headline,
    `${fr(1320)} W conseillés pour chauffer 30,0 m³`,
  );
  assert.equal(output.values[0].value, "30,0 m³");
  assert.equal(output.values[1].value, `${fr(1200)} W`);
  assert.equal(output.values[2].value, `${fr(1320)} W`);
  assert.equal(output.values[3].value, `${fr(1500)} W`);
  assert.equal(output.values[4].value, "100 W/m²");
  // Une pièce deux fois plus grande demande deux fois plus de puissance.
  const grande = run("puissance-radiateur", { longueur: 8 });
  assert.equal(grande.values[1].value, `${fr(2400)} W`);
  assert.equal(grande.values[3].value, `${fr(3000)} W`);
  // Un logement mal isolé change le coefficient, pas le volume.
  const passoire = run("puissance-radiateur", { isolation: "50" });
  assert.equal(passoire.values[0].value, "30,0 m³");
  assert.equal(passoire.values[1].value, `${fr(1500)} W`);
  assert.equal(passoire.values[4].value, "125 W/m²");
});

test("le radiateur signale le surdimensionnement, le plancher bas et la marge nulle", () => {
  const trop = run("puissance-radiateur", {
    longueur: 12,
    largeur: 8,
    isolation: "50",
  });
  assert.equal(trop.values[3].value, "au-delà de 3 000 W");
  assert(trop.warnings.some((w) => w.includes("répartis la puissance")));
  const haut = run("puissance-radiateur", { hauteur: 4 });
  assert(haut.warnings.some((w) => w.includes("l’air chaud s’accumule")));
  const sansMarge = run("puissance-radiateur", { majoration: 0 });
  assert(sansMarge.warnings.some((w) => w.includes("Sans correction")));
  const minuscule = run("puissance-radiateur", {
    longueur: 1,
    largeur: 1,
    hauteur: 2,
  });
  assert(minuscule.warnings.some((w) => w.includes("sèche-serviettes")));
  assert.equal(run("puissance-radiateur", { hauteur: 0.5 }).values.length, 0);
});
