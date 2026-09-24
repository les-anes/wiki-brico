# Prompts des illustrations de tutoriels

## Gabarit de prompt

Toutes les couvertures suivent le même parti pris : une vignette d’objets à la gouache et au fusain sur papier ivoire, sans texte ni personnage, cadrée sur les 70 % centraux pour rester lisible en vignette de carte. Le gabarit prêt à copier est dans `output/imagegen/_gabarit.txt` : seule la partie `Subject:` change d’une fiche à l’autre.

```text
Use case: stylized-concept. Original French DIY tutorial cover, landscape 1536x1024. Subject: <l’objet et l’action, deux ou trois éléments reconnaissables, cadrage de trois quarts>. Loose imperfect charcoal contours, flat gouache shapes, coarse dry brush texture on warm ivory paper. Simplified recognizable objects in central 70 percent with generous margins for mobile card crop. Natural subject colors. No text, numbers, labels, arrows, logos, watermark, photorealism or technical diagram.
```

Variantes utiles, à ajouter au cas par cas :

- une main seulement jusqu’à l’avant-bras (`Only hand and forearm visible, no full person.`), ou aucun personnage (`Simple isolated object vignette, no person, no building background.`) ;
- un objet, une action, un cadrage : si l’image a besoin d’une légende pour se comprendre, c’est qu’il y a trop d’objets ;
- jamais de schéma coté ni de flèche — le texte porte l’explication, l’image porte l’objet.

Fichiers : `public/images/tutoriels/<id>.png` en 1536×1024, plus les variantes `-480`, `-720` et `-960` en WebP qualité 82. Le prompt réellement utilisé est conservé dans `output/imagegen/<id>.txt` et recopié ci-dessous dans la section de son lot.

## Remplacement des 42 couvertures de la liste — 17 septembre 2026

Les 42 tutoriels réalisés depuis `docs/tutos-a-implementer.md` disposent de nouvelles illustrations générées avec l’outil intégré imagegen et contrôlées visuellement. Ces images remplacent notamment les couvertures provisoires mentionnées dans l’historique ci-dessous. Sources PNG et prompts dans `output/imagegen/`, PNG publiés en 1536×1024 et variantes WebP 480, 720 et 960 pixels à qualité 82. Les textes alternatifs sont ajustés aux images retenues.

### remplacer-un-carreau-de-carrelage-casse

Fichier : `public/images/tutoriels/remplacer-un-carreau-de-carrelage-casse.png`

```text
Use case: stylized-concept. Create an original French DIY tutorial cover, landscape exactly 1536x1024. Subject: one cracked square terracotta tile in the middle of a small patch of intact tiled floor, a small chisel resting at its broken edge, a hammer and notched trowel lying beside on a cloth. Loose imperfect charcoal contours, flat gouache shapes, coarse dry brush texture on warm ivory paper. Simplified recognizable objects in central 70 percent with generous margins for mobile crop. Natural colors. No text, numbers, labels, arrows, logos, watermark, photorealism or technical diagram.
```

### poser-du-carrelage-au-sol

Fichier : `public/images/tutoriels/poser-du-carrelage-au-sol.png`

```text
Use case: stylized-concept. Original French DIY tutorial cover, landscape 1536x1024. Subject: a row of square floor tiles laid dry along a taut chalk line on a bare floor, a notched adhesive trowel, an open bucket of adhesive and a few tile spacers beside it. Object vignette, not a labeled diagram. Loose imperfect charcoal contours, flat gouache shapes, coarse dry brush texture on warm ivory paper. Simplified recognizable objects in central 70 percent with generous margins for mobile card crop. Natural subject colors. No text, numbers, labels, arrows, logos, watermark, photorealism or technical diagram.
Create a new standalone cover illustration, landscape exactly 1536x1024. Strong handmade pencil and gouache character on ivory paper. Keep the whole subject inside the central 70% with generous margins. No text, letters, numbers, logos, arrows or watermark.
```

### poser-un-sol-vinyle-clipsable

Fichier : `public/images/tutoriels/poser-un-sol-vinyle-clipsable.png`

```text
Use case: stylized-concept. Original French DIY tutorial cover, landscape 1536x1024. Subject: three long vinyl floor planks half assembled, the last one tilted at an angle to click into the previous one, a tapping block, a rubber mallet and a utility knife lying on the planks. Object vignette, not a labeled diagram. Loose imperfect charcoal contours, flat gouache shapes, coarse dry brush texture on warm ivory paper. Simplified recognizable objects in central 70 percent with generous margins for mobile card crop. Natural subject colors. No text, numbers, labels, arrows, logos, watermark, photorealism or technical diagram.
Create a new standalone cover illustration, landscape exactly 1536x1024. Strong handmade pencil and gouache character on ivory paper. Keep the whole subject inside the central 70% with generous margins. No text, letters, numbers, logos, arrows or watermark.
```

### organiser-les-travaux-d-une-chambre

Fichier : `public/images/tutoriels/organiser-les-travaux-d-une-chambre.png`

```text
Use case: stylized-concept. Original French DIY tutorial cover, landscape 1536x1024. Subject: a handwritten work schedule on a sheet of paper resting on a wooden tool crate, a folding rule, a pencil and a roll of masking tape on top, a room with stripped walls in the background. Object vignette, not a labeled diagram. Loose imperfect charcoal contours, flat gouache shapes, coarse dry brush texture on warm ivory paper. Simplified recognizable objects in central 70 percent with generous margins for mobile card crop. Natural subject colors. No text, numbers, labels, arrows, logos, watermark, photorealism or technical diagram.
Create a new standalone cover illustration, landscape exactly 1536x1024. Strong handmade pencil and gouache character on ivory paper. Keep the whole subject inside the central 70% with generous margins. No text, letters, numbers, logos, arrows or watermark.
```

### fabriquer-des-volets-battants-en-bois

Fichier : `public/images/tutoriels/fabriquer-des-volets-battants-en-bois.png`

```text
Use case: stylized-concept. Original French DIY tutorial cover. Landscape exactly 1536x1024. Loose imperfect charcoal contours, flat gouache shapes and coarse dry brush texture on warm ivory paper, simplified expressive forms. Subject centered in central 70 percent, generous clear margins. No text, numbers, arrows, logos, labels, watermark, photorealism or technical diagram. Subject: A wooden shutter lying flat, back face visible, made of vertical honey-colored wooden planks, with two horizontal battens and ONE diagonal wooden brace ascending from bottom LEFT to top RIGHT. Two black hinges attached along LEFT edge, bottom end of diagonal next to bottom LEFT hinge. Small drill and carpenter square beside it. Exact brace orientation essential.
```

### remplacer-un-linteau

Fichier : `public/images/tutoriels/remplacer-un-linteau.png`

```text
Use case: stylized-concept. Original French DIY tutorial cover. Landscape exactly 1536x1024. Loose imperfect charcoal contours, flat gouache shapes and coarse dry brush texture on warm ivory paper, simplified expressive forms. Subject centered in central 70 percent, generous clear margins. No text, numbers, arrows, logos, labels, watermark, photorealism or technical diagram. Subject: A finished sturdy horizontal rectangular oak lintel installed above a small window opening in a sound stone wall. Both ends of the horizontal timber clearly embedded in stone masonry. A carpenter level resting on the window sill. Completed result, no construction activity, no demolition, no loose stones, no propping, no floating beams.
```

### ceinturer-un-mur-en-pierre

Fichier : `public/images/tutoriels/ceinturer-un-mur-en-pierre.png`

```text
Use case: stylized-concept. Original French DIY tutorial cover. Landscape exactly 1536x1024. Loose imperfect charcoal contours, flat gouache shapes and coarse dry brush texture on warm ivory paper, simplified expressive forms. Subject centered in central 70 percent, generous clear margins. No text, numbers, arrows, logos, labels, watermark, photorealism or technical diagram. Subject: Corner of a stone masonry building, both walls topped with one continuous finished smooth grey reinforced concrete ring beam turning the corner. Solid opaque concrete hides all reinforcement. Simple isolated architectural vignette, no exposed steel rods, no cutaway, no construction activity, no tools.
```

### poser-une-bande-a-joint

Fichier : `public/images/tutoriels/poser-une-bande-a-joint.png`

```text
Use case: stylized-concept. Original French DIY tutorial cover, landscape 1536x1024. Subject: a paper joint tape being bedded into fresh filler along the seam between two plasterboards, a wide taping knife and a small hawk of joint compound resting on a board edge nearby. Object vignette, not a labeled diagram. Loose imperfect charcoal contours, flat gouache shapes, coarse dry brush texture on warm ivory paper. Simplified recognizable objects in central 70 percent with generous margins for mobile card crop. Natural subject colors. No text, numbers, labels, arrows, logos, watermark, photorealism or technical diagram.
Create a new standalone cover illustration, landscape exactly 1536x1024. Strong handmade pencil and gouache character on ivory paper. Keep the whole subject inside the central 70% with generous margins. No text, letters, numbers, logos, arrows or watermark.
```

### monter-une-petite-cloison-en-placo

Fichier : `public/images/tutoriels/monter-une-petite-cloison-en-placo.png`

```text
Use case: stylized-concept. Original French DIY tutorial cover, landscape 1536x1024. Subject: a bare steel stud partition frame standing between floor and ceiling with its bottom and top tracks screwed down and vertical studs at regular intervals, one plasterboard panel propped against the wall beside it. Object vignette, not a labeled diagram. Loose imperfect charcoal contours, flat gouache shapes, coarse dry brush texture on warm ivory paper. Simplified recognizable objects in central 70 percent with generous margins for mobile card crop. Natural subject colors. No text, numbers, labels, arrows, logos, watermark, photorealism or technical diagram.
Create a new standalone cover illustration, landscape exactly 1536x1024. Strong handmade pencil and gouache character on ivory paper. Keep the whole subject inside the central 70% with generous margins. No text, letters, numbers, logos, arrows or watermark.
```

### poser-une-etagere-sur-tasseaux

Fichier : `public/images/tutoriels/poser-une-etagere-sur-tasseaux.png`

```text
Use case: stylized-concept. Original French DIY tutorial cover. Landscape exactly 1536x1024. Loose imperfect charcoal contours, flat gouache shapes and coarse dry brush texture on warm ivory paper, simplified expressive forms. Subject centered in central 70 percent, generous clear margins. No text, numbers, arrows, logos, labels, watermark, photorealism or technical diagram. Subject: One simple horizontal honey-colored wooden shelf inside a white cupboard alcove, seen slightly from BELOW so its underside is clearly visible. Shelf rests ON TOP OF three narrow wooden support cleats fixed to left, right and rear walls immediately UNDER the shelf. No rails or trim above shelf. A small drill and folding ruler sit on shelf. Physically coherent simple construction, no brackets.
```

### peindre-un-motif-au-pochoir

Fichier : `public/images/tutoriels/peindre-un-motif-au-pochoir.png`

```text
Use case: stylized-concept. Original French DIY tutorial cover, landscape 1536x1024. Subject: a translucent stencil sheet held against a wall with part of its repeating motif already painted in a contrasting colour, a round stencil brush almost dry on a paper plate below and a roll of low-tack tape nearby. Object vignette, not a labeled diagram. Loose imperfect charcoal contours, flat gouache shapes, coarse dry brush texture on warm ivory paper. Simplified recognizable objects in central 70 percent with generous margins for mobile card crop. Natural subject colors. No text, numbers, labels, arrows, logos, watermark, photorealism or technical diagram.
Create a new standalone cover illustration, landscape exactly 1536x1024. Strong handmade pencil and gouache character on ivory paper. Keep the whole subject inside the central 70% with generous margins. No text, letters, numbers, logos, arrows or watermark.
```

### poser-une-credence-carrelee

Fichier : `public/images/tutoriels/poser-une-credence-carrelee.png`

```text
Use case: stylized-concept. Original French DIY tutorial cover, landscape 1536x1024. Subject: a band of small square wall tiles running along a kitchen wall above a worktop, a notched adhesive trowel and a handful of tile spacers lying on the worktop beside it. Object vignette, not a labeled diagram. Loose imperfect charcoal contours, flat gouache shapes, coarse dry brush texture on warm ivory paper. Simplified recognizable objects in central 70 percent with generous margins for mobile card crop. Natural subject colors. No text, numbers, labels, arrows, logos, watermark, photorealism or technical diagram.
Create a new standalone cover illustration, landscape exactly 1536x1024. Strong handmade pencil and gouache character on ivory paper. Keep the whole subject inside the central 70% with generous margins. No text, letters, numbers, logos, arrows or watermark.
```

### renover-les-joints-d-un-carrelage

Fichier : `public/images/tutoriels/renover-les-joints-d-un-carrelage.png`

```text
Use case: stylized-concept. Original French DIY tutorial cover, landscape 1536x1024. Subject: a tiled wall being regrouted, one area of pale fresh grout spread across the joints with a rubber float, a small stiff joint brush and a damp sponge resting on the tiles below. Object vignette, not a labeled diagram. Loose imperfect charcoal contours, flat gouache shapes, coarse dry brush texture on warm ivory paper. Simplified recognizable objects in central 70 percent with generous margins for mobile card crop. Natural subject colors. No text, numbers, labels, arrows, logos, watermark, photorealism or technical diagram.
Create a new standalone cover illustration, landscape exactly 1536x1024. Strong handmade pencil and gouache character on ivory paper. Keep the whole subject inside the central 70% with generous margins. No text, letters, numbers, logos, arrows or watermark.
```

### nettoyer-les-bouches-de-vmc

Fichier : `public/images/tutoriels/nettoyer-les-bouches-de-vmc.png`

```text
Use case: stylized-concept. Original French DIY tutorial cover, landscape 1536x1024. Subject: a round white mechanical ventilation grille lifted away from a ceiling opening and resting on a cloth below, a small soft brush and a vacuum hose beside it, dust visible on the grille slats. Object vignette, not a labeled diagram. Loose imperfect charcoal contours, flat gouache shapes, coarse dry brush texture on warm ivory paper. Simplified recognizable objects in central 70 percent with generous margins for mobile card crop. Natural subject colors. No text, numbers, labels, arrows, logos, watermark, photorealism or technical diagram.
Create a new standalone cover illustration, landscape exactly 1536x1024. Strong handmade pencil and gouache character on ivory paper. Keep the whole subject inside the central 70% with generous margins. No text, letters, numbers, logos, arrows or watermark.
```

### remplacer-flexible-et-douchette

Fichier : `public/images/tutoriels/remplacer-flexible-et-douchette.png`

```text
Use case: stylized-concept. Original French DIY tutorial cover. Landscape exactly 1536x1024. Loose imperfect charcoal contours, flat gouache shapes and coarse dry brush texture on warm ivory paper, simplified expressive forms. Subject centered in central 70 percent, generous clear margins. No text, numbers, arrows, logos, labels, watermark, photorealism or technical diagram. Subject: A detached silver handheld shower head and a loosely coiled silver shower hose with visible female end connectors, with exactly two small flat black rubber sealing washers beside it. Simple object still life. No tape, no spool, no tools, no water, no text.
```

### poser-des-plinthes

Fichier : `public/images/tutoriels/poser-des-plinthes.png`

```text
Use case: stylized-concept. Original French DIY tutorial cover, landscape 1536x1024. Subject: a length of skirting board laid along the foot of a wall with one end cut at 45 degrees, a mitre box holding a saw and a folding rule on the floor nearby. Object vignette, not a labeled diagram. Loose imperfect charcoal contours, flat gouache shapes, coarse dry brush texture on warm ivory paper. Simplified recognizable objects in central 70 percent with generous margins for mobile card crop. Natural subject colors. No text, numbers, labels, arrows, logos, watermark, photorealism or technical diagram.
Create a new standalone cover illustration, landscape exactly 1536x1024. Strong handmade pencil and gouache character on ivory paper. Keep the whole subject inside the central 70% with generous margins. No text, letters, numbers, logos, arrows or watermark.
```

### regler-une-porte-de-placard

Fichier : `public/images/tutoriels/regler-une-porte-de-placard.png`

```text
Use case: stylized-concept. Original French DIY tutorial cover, landscape 1536x1024. Subject: a cupboard door standing slightly ajar on a pair of concealed hinges, their metal cups visible on the door edge, a manual screwdriver lying on the shelf inside. Object vignette, not a labeled diagram. Loose imperfect charcoal contours, flat gouache shapes, coarse dry brush texture on warm ivory paper. Simplified recognizable objects in central 70 percent with generous margins for mobile card crop. Natural subject colors. No text, numbers, labels, arrows, logos, watermark, photorealism or technical diagram.
Create a new standalone cover illustration, landscape exactly 1536x1024. Strong handmade pencil and gouache character on ivory paper. Keep the whole subject inside the central 70% with generous margins. No text, letters, numbers, logos, arrows or watermark.
```

### remplacer-le-joint-d-une-fenetre

Fichier : `public/images/tutoriels/remplacer-le-joint-d-une-fenetre.png`

```text
Use case: stylized-concept. Original French DIY tutorial cover, landscape 1536x1024. Subject: a soft rubber seal running along the groove of a window frame, a short offcut of the old seal, a sharp knife and a sheet of paper resting on the sill. Object vignette, not a labeled diagram. Loose imperfect charcoal contours, flat gouache shapes, coarse dry brush texture on warm ivory paper. Simplified recognizable objects in central 70 percent with generous margins for mobile card crop. Natural subject colors. No text, numbers, labels, arrows, logos, watermark, photorealism or technical diagram.
Create a new standalone cover illustration, landscape exactly 1536x1024. Strong handmade pencil and gouache character on ivory paper. Keep the whole subject inside the central 70% with generous margins. No text, letters, numbers, logos, arrows or watermark.
```

### raboter-une-porte-qui-frotte

Fichier : `public/images/tutoriels/raboter-une-porte-qui-frotte.png`

```text
Use case: stylized-concept. Original French DIY tutorial cover. Landscape exactly 1536x1024. Loose imperfect charcoal contours, flat gouache shapes and coarse dry brush texture on warm ivory paper, simplified expressive forms. Subject centered in central 70 percent, generous clear margins. No text, numbers, arrows, logos, labels, watermark, photorealism or technical diagram. Subject: A wooden hand plane resting on a small workbench next to curled wood shavings and a pencil. In the background, a detached interior wooden door rests safely flat on two sturdy sawhorses. Tools are idle, nobody using the plane, no hands. Simple clear DIY still life.
```

### decoller-du-papier-peint

Fichier : `public/images/tutoriels/decoller-du-papier-peint.png`

```text
Use case: stylized-concept. Original French DIY tutorial cover, landscape 1536x1024. Subject: a wide strip of old wallpaper peeling away from a wall under a broad scraper, damp patches on the wall behind, a spray bottle and a sponge on the floor below. Object vignette, not a labeled diagram. Loose imperfect charcoal contours, flat gouache shapes, coarse dry brush texture on warm ivory paper. Simplified recognizable objects in central 70 percent with generous margins for mobile card crop. Natural subject colors. No text, numbers, labels, arrows, logos, watermark, photorealism or technical diagram.
Create a new standalone cover illustration, landscape exactly 1536x1024. Strong handmade pencil and gouache character on ivory paper. Keep the whole subject inside the central 70% with generous margins. No text, letters, numbers, logos, arrows or watermark.
```

### peindre-deux-couleurs

Fichier : `public/images/tutoriels/peindre-deux-couleurs.png`

```text
Use case: stylized-concept. Original French DIY tutorial cover, landscape 1536x1024. Subject: a wall carrying two horizontal bands of clearly different flat colours, separated by a crisp line still covered with a strip of masking tape, a roller resting in a tray at the foot of the wall. Object vignette, not a labeled diagram. Loose imperfect charcoal contours, flat gouache shapes, coarse dry brush texture on warm ivory paper. Simplified recognizable objects in central 70 percent with generous margins for mobile card crop. Natural subject colors. No text, numbers, labels, arrows, logos, watermark, photorealism or technical diagram.
Create a new standalone cover illustration, landscape exactly 1536x1024. Strong handmade pencil and gouache character on ivory paper. Keep the whole subject inside the central 70% with generous margins. No text, letters, numbers, logos, arrows or watermark.
```

### repeindre-un-mur-fonce-en-clair

Fichier : `public/images/tutoriels/repeindre-un-mur-fonce-en-clair.png`

```text
Use case: stylized-concept. Original French DIY tutorial cover, landscape 1536x1024. Subject: a paint roller applying pale paint across a wall where one broad band of dark colour still shows through the fresh coat, a paint tray below. Object vignette, not a labeled diagram. Loose imperfect charcoal contours, flat gouache shapes, coarse dry brush texture on warm ivory paper. Simplified recognizable objects in central 70 percent with generous margins for mobile card crop. Natural subject colors. No text, numbers, labels, arrows, logos, watermark, photorealism or technical diagram.
Create a new standalone cover illustration, landscape exactly 1536x1024. Strong handmade pencil and gouache character on ivory paper. Keep the whole subject inside the central 70% with generous margins. No text, letters, numbers, logos, arrows or watermark.
```

### repeindre-une-porte

Fichier : `public/images/tutoriels/repeindre-une-porte.png`

```text
Use case: stylized-concept. Original French DIY tutorial cover, landscape 1536x1024. Subject: an interior panelled door lying flat on two trestles being painted with a small roller, a loaded paintbrush and an open paint pot resting on the floor beside it. Object vignette, not a labeled diagram. Loose imperfect charcoal contours, flat gouache shapes, coarse dry brush texture on warm ivory paper. Simplified recognizable objects in central 70 percent with generous margins for mobile card crop. Natural subject colors. No text, numbers, labels, arrows, logos, watermark, photorealism or technical diagram.
Create a new standalone cover illustration, landscape exactly 1536x1024. Strong handmade pencil and gouache character on ivory paper. Keep the whole subject inside the central 70% with generous margins. No text, letters, numbers, logos, arrows or watermark.
```

### remplacer-un-interrupteur

Fichier : `public/images/tutoriels/remplacer-un-interrupteur.png`

```text
Use case: stylized-concept. Original French DIY tutorial cover. Landscape exactly 1536x1024. Loose imperfect charcoal contours, flat gouache shapes and coarse dry brush texture on warm ivory paper, simplified expressive forms. Subject centered in central 70 percent, generous clear margins. No text, numbers, arrows, logos, labels, watermark, photorealism or technical diagram. Subject: One white square French wall light switch with single wide rocker and its separate white square decorative surround lying on an ivory surface next to a red and yellow insulated screwdriver. No wires, no terminals, no tester, no cutaway, no hands. Simple recognizable objects.
```

### poser-du-papier-peint-intisse

Fichier : `public/images/tutoriels/poser-du-papier-peint-intisse.png`

```text
Use case: stylized-concept. Original French DIY tutorial cover, landscape 1536x1024. Subject: a strip of patterned wallpaper being smoothed flat against a wall with a smoothing brush, its top edge overhanging near the ceiling, a craft knife and a pencil on a nearby ledge. Object vignette, not a labeled diagram. Loose imperfect charcoal contours, flat gouache shapes, coarse dry brush texture on warm ivory paper. Simplified recognizable objects in central 70 percent with generous margins for mobile card crop. Natural subject colors. No text, numbers, labels, arrows, logos, watermark, photorealism or technical diagram.
Create a new standalone cover illustration, landscape exactly 1536x1024. Strong handmade pencil and gouache character on ivory paper. Keep the whole subject inside the central 70% with generous margins. No text, letters, numbers, logos, arrows or watermark.
```

### peindre-un-plafond

Fichier : `public/images/tutoriels/peindre-un-plafond.png`

```text
Use case: stylized-concept. Original French DIY tutorial cover, landscape 1536x1024. Subject: a paint roller mounted on a long extension pole laying a fresh band of paint across a ceiling, a paint bucket and a protective sheet visible far below. Object vignette, not a labeled diagram. Loose imperfect charcoal contours, flat gouache shapes, coarse dry brush texture on warm ivory paper. Simplified recognizable objects in central 70 percent with generous margins for mobile card crop. Natural subject colors. No text, numbers, labels, arrows, logos, watermark, photorealism or technical diagram.
Create a new standalone cover illustration, landscape exactly 1536x1024. Strong handmade pencil and gouache character on ivory paper. Keep the whole subject inside the central 70% with generous margins. No text, letters, numbers, logos, arrows or watermark.
```

### purger-un-radiateur

Fichier : `public/images/tutoriels/purger-un-radiateur.png`

```text
Use case: stylized-concept. Original French DIY tutorial cover, landscape 1536x1024. Subject: a small bleed key fitted on the valve at the top of a cast-iron radiator, with a shallow bowl and a folded cloth on the floor below, a few water droplets. Object vignette, not a labeled diagram. Loose imperfect charcoal contours, flat gouache shapes, coarse dry brush texture on warm ivory paper. Simplified recognizable objects in central 70 percent with generous margins for mobile card crop. Natural subject colors. No text, numbers, labels, arrows, logos, watermark, photorealism or technical diagram.
Create a new standalone cover illustration, landscape exactly 1536x1024. Strong handmade pencil and gouache character on ivory paper. Keep the whole subject inside the central 70% with generous margins. No text, letters, numbers, logos, arrows or watermark.
```

### reboucher-une-fissure

Fichier : `public/images/tutoriels/reboucher-une-fissure.png`

```text
Use case: stylized-concept. Original French DIY tutorial cover, landscape 1536x1024. Subject: a narrow putty knife pressing filler into a thin crack running down a plain plaster wall, with a small open tub of filler and a sanding block on the floor below. Object vignette, not a labeled diagram. Loose imperfect charcoal contours, flat gouache shapes, coarse dry brush texture on warm ivory paper. Simplified recognizable objects in central 70 percent with generous margins for mobile card crop. Natural subject colors. No text, numbers, labels, arrows, logos, watermark, photorealism or technical diagram.
Create a new standalone cover illustration, landscape exactly 1536x1024. Strong handmade pencil and gouache character on ivory paper. Keep the whole subject inside the central 70% with generous margins. No text, letters, numbers, logos, arrows or watermark.
```

### choisir-une-cheville

Fichier : `public/images/tutoriels/choisir-une-cheville.png`

```text
Use case: stylized-concept. Original French DIY tutorial cover, landscape 1536x1024. Subject: three wall plugs of clearly different shapes lying side by side in front of a masonry drill bit and a single screw, a small drill hole visible in a wall block behind them. Object vignette, not a labeled diagram. Loose imperfect charcoal contours, flat gouache shapes, coarse dry brush texture on warm ivory paper. Simplified recognizable objects in central 70 percent with generous margins for mobile card crop. Natural subject colors. No text, numbers, labels, arrows, logos, watermark, photorealism or technical diagram.
Create a new standalone cover illustration, landscape exactly 1536x1024. Strong handmade pencil and gouache character on ivory paper. Keep the whole subject inside the central 70% with generous margins. No text, letters, numbers, logos, arrows or watermark.
```

### fixer-une-tringle-a-rideaux

Fichier : `public/images/tutoriels/fixer-une-tringle-a-rideaux.png`

```text
Use case: stylized-concept. Original French DIY tutorial cover, landscape 1536x1024. Subject: a straight curtain rod resting on two wall brackets fixed to a plain wall, a spirit level and a pencil lying on a nearby windowsill, no curtains. Object vignette, not a labeled diagram. Loose imperfect charcoal contours, flat gouache shapes, coarse dry brush texture on warm ivory paper. Simplified recognizable objects in central 70 percent with generous margins for mobile card crop. Natural subject colors. No text, numbers, labels, arrows, logos, watermark, photorealism or technical diagram.
Create a new standalone cover illustration, landscape exactly 1536x1024. Strong handmade pencil and gouache character on ivory paper. Keep the whole subject inside the central 70% with generous margins. No text, letters, numbers, logos, arrows or watermark.
```

### remplacer-une-prise-murale

Fichier : `public/images/tutoriels/remplacer-une-prise-murale.png`

```text
Use case: stylized-concept. Original French DIY tutorial cover, landscape exactly 1536x1024. Loose imperfect charcoal contours, flat gouache, dry brush texture, ivory paper, simplified recognizable objects centered with generous margins. Subject: one white French TYPE E electrical socket viewed from front, round recessed face with EXACTLY TWO round dark holes side by side and ONE protruding cylindrical metal earth pin ABOVE them, in a square white surround. Beside it lies a single red and yellow insulated screwdriver. No side earth clips, no wires, no terminals, no tester, no hands, no text, no numbers, no letters, no logo, no watermark. Isolated object still life, not a wiring diagram.
```

### peindre-sans-bavures

Fichier : `public/images/tutoriels/peindre-sans-bavures.png`

```text
Use case: stylized-concept. Original French DIY tutorial cover, landscape 1536x1024. Subject: a small cutting-in paintbrush laying a clean band of paint along a wall corner just above a strip of masking tape fixed to a skirting board, a few drops of paint on the tape edge. Object vignette, not a labeled diagram. Loose imperfect charcoal contours, flat gouache shapes, coarse dry brush texture on warm ivory paper. Simplified recognizable objects in central 70 percent with generous margins for mobile card crop. Natural subject colors. No text, numbers, labels, arrows, logos, watermark, photorealism or technical diagram.
Create a new standalone cover illustration, landscape exactly 1536x1024. Strong handmade pencil and gouache character on ivory paper. Keep the whole subject inside the central 70% with generous margins. No text, letters, numbers, logos, arrows or watermark.
```

### choisir-sa-peinture

Fichier : `public/images/tutoriels/choisir-sa-peinture.png`

```text
Use case: stylized-concept. Original French DIY tutorial cover, landscape 1536x1024. Subject: three paint colour swatch cards side by side showing a matte, a velvet and a satin finish, each a flat muted colour patch, with a small unbranded open paint pot and a brush beside them. Object vignette, not a labeled diagram. Loose imperfect charcoal contours, flat gouache shapes, coarse dry brush texture on warm ivory paper. Simplified recognizable objects in central 70 percent with generous margins for mobile card crop. Natural subject colors. No text, numbers, labels, arrows, logos, watermark, photorealism or technical diagram.
Create a new standalone cover illustration, landscape exactly 1536x1024. Strong handmade pencil and gouache character on ivory paper. Keep the whole subject inside the central 70% with generous margins. No text, letters, numbers, logos, arrows or watermark.
```

### calculer-sa-peinture

Fichier : `public/images/tutoriels/calculer-sa-peinture.png`

```text
Use case: stylized-concept. Original French DIY tutorial cover, landscape 1536x1024. Subject: a rolled measuring tape stretched along the base of a plain wall, a small notepad and pencil on the floor and a closed paint can with its lid beside them. No numbers or markings on the tape. Object vignette, not a labeled diagram. Loose imperfect charcoal contours, flat gouache shapes, coarse dry brush texture on warm ivory paper. Simplified recognizable objects in central 70 percent with generous margins for mobile card crop. Natural subject colors. No text, numbers, labels, arrows, logos, watermark, photorealism or technical diagram.
Create a new standalone cover illustration, landscape exactly 1536x1024. Strong handmade pencil and gouache character on ivory paper. Keep the whole subject inside the central 70% with generous margins. No text, letters, numbers, logos, arrows or watermark.
```

### choisir-rouleau-et-pinceau

Fichier : `public/images/tutoriels/choisir-rouleau-et-pinceau.png`

```text
Use case: stylized-concept. Original French DIY tutorial cover, landscape 1536x1024. Subject: a paint roller with a wooden handle and a small cutting-in paintbrush resting side by side across the ridged edge of a shallow paint tray holding a little paint. Object vignette, not a labeled diagram. Loose imperfect charcoal contours, flat gouache shapes, coarse dry brush texture on warm ivory paper. Simplified recognizable objects in central 70 percent with generous margins for mobile card crop. Natural subject colors. No text, numbers, labels, arrows, logos, watermark, photorealism or technical diagram.
Create a new standalone cover illustration, landscape exactly 1536x1024. Strong handmade pencil and gouache character on ivory paper. Keep the whole subject inside the central 70% with generous margins. No text, letters, numbers, logos, arrows or watermark.
```

### rejointoyer-un-mur-en-pierre

Fichier : `public/images/tutoriels/rejointoyer-un-mur-en-pierre.png`

```text
Use case: stylized-concept. Original French DIY tutorial cover, landscape 1536x1024. Subject: a fragment of a stone wall with irregular grey-beige stones and thick repointed pale lime mortar joints, a long pointed pointing trowel carrying a small blob of pale lime mortar in front of the wall and a shallow mortar tub with a mound of fresh mortar beside it. Object vignette, not a labeled diagram. Loose imperfect charcoal contours, flat gouache shapes, coarse dry brush texture on warm ivory paper. Simplified recognizable objects in central 70 percent with generous margins for mobile card crop. Natural stone grey-beige and warm ivory subject colors. No text, numbers, labels, arrows, logos, watermark, photorealism or technical diagram.
Create a new standalone cover illustration, landscape exactly 1536x1024. Strong handmade pencil and gouache character on ivory paper. Keep the whole subject inside the central 70% with generous margins. No text, letters, numbers, logos, arrows or watermark.
```

### remplacer-mitigeur-lavabo

Fichier : `public/images/tutoriels/remplacer-mitigeur-lavabo.png`

```text
Use case: stylized-concept. Original French DIY tutorial cover, landscape 1536x1024. Subject: a standalone silver single-lever bathroom washbasin mixer tap with two braided flexible supply hoses curving below its base. Loose imperfect charcoal contours, flat gouache shapes, coarse dry brush texture on warm ivory paper. Simplified recognizable objects in central 70 percent with generous margins for mobile card crop. Natural silver and grey subject colors. No text, numbers, labels, arrows, logos, watermark, photorealism or technical diagram.
Create a new standalone cover illustration, landscape exactly 1536x1024. Strong handmade pencil and gouache character on ivory paper. Keep the whole subject inside the central 70% with generous margins. No text, letters, numbers, logos, arrows or watermark.
```

### reparer-fuite-joint-plat

Fichier : `public/images/tutoriels/reparer-fuite-joint-plat.png`

```text
Use case: stylized-concept. Original French DIY tutorial cover, landscape 1536x1024. Subject: the end of a short curved silver braided plumbing supply hose with a hexagonal swivel nut, beside one clearly visible flat red fibre sealing washer and a small brass male plumbing fitting. Object vignette, not assembly diagram. Loose imperfect charcoal contours, flat gouache shapes, coarse dry brush texture on warm ivory paper. Simplified recognizable objects in central 70 percent with generous margins for mobile card crop. Natural silver, brass and muted red subject colors. No text, numbers, labels, arrows, logos, watermark, photorealism or technical diagram.
Create a new standalone cover illustration, landscape exactly 1536x1024. Strong handmade pencil and gouache character on ivory paper. Keep the whole subject inside the central 70% with generous margins. No text, letters, numbers, logos, arrows or watermark.
```

### lisser-un-mur

Fichier : `public/images/tutoriels/lisser-un-mur.png`

```text
Use case: stylized-concept. Original French DIY tutorial cover, landscape 1536x1024. Subject: a broad steel smoothing knife with a wooden handle spreading a wide thin layer of pale white finishing plaster across a simple small upright fragment of pale grey plaster wall, a small unbranded open tub of filler beside it. Loose imperfect charcoal contours, flat gouache shapes, coarse dry brush texture on warm ivory paper. Simplified recognizable objects in central 70 percent with generous margins for mobile card crop. Natural subject colors. No text, numbers, labels, arrows, logos, watermark, photorealism or technical diagram.
Create a new standalone cover illustration, landscape exactly 1536x1024. Strong handmade pencil and gouache character on ivory paper. Keep the whole subject inside the central 70% with generous margins. No text, letters, numbers, logos, arrows or watermark.
```

### arreter-chasse-eau-qui-coule

Fichier : `public/images/tutoriels/arreter-chasse-eau-qui-coule.png`

```text
Use case: stylized-concept. Original French DIY tutorial cover, landscape 1536x1024. Subject: An open white ceramic toilet cistern seen slightly from above, lid placed beside it, simple grey flush tower and small blue float visible inside. Loose imperfect charcoal contours, flat gouache shapes, coarse dry brush texture on warm ivory paper. Simplified recognizable objects in central 70 percent with generous margins for mobile card crop. Natural subject colors. No text, numbers, labels, arrows, logos, watermark, photorealism or technical diagram.
Create a new standalone cover illustration, landscape exactly 1536x1024. Strong handmade pencil and gouache character on ivory paper. Keep the whole subject inside the central 70% with generous margins. No text, letters, numbers, logos, arrows or watermark.
```

### remplacer-mecanisme-chasse-eau

Fichier : `public/images/tutoriels/remplacer-mecanisme-chasse-eau.png`

```text
Use case: stylized-concept. Original French DIY tutorial cover, landscape 1536x1024. Subject: One standalone white and grey dual flush toilet mechanism with a blue adjustment piece, a large dark rubber sealing washer and a small round dual push button placed beside it. Loose imperfect charcoal contours, flat gouache shapes, coarse dry brush texture on warm ivory paper. Simplified recognizable objects in central 70 percent with generous margins for mobile card crop. Natural subject colors. No text, numbers, labels, arrows, logos, watermark, photorealism or technical diagram.
Create a new standalone cover illustration, landscape exactly 1536x1024. Strong handmade pencil and gouache character on ivory paper. Keep the whole subject inside the central 70% with generous margins. No text, letters, numbers, logos, arrows or watermark.
```

### nettoyer-siphon-lavabo

Fichier : `public/images/tutoriels/nettoyer-siphon-lavabo.png`

```text
Use case: stylized-concept. Original French DIY tutorial cover, landscape 1536x1024. Subject: A white plastic bottle trap for a bathroom washbasin, its threaded bottom cup unscrewed and placed beside it, small cleaning brush and shallow muted blue basin beneath. Loose imperfect charcoal contours, flat gouache shapes, coarse dry brush texture on warm ivory paper. Simplified recognizable objects in central 70 percent with generous margins for mobile card crop. Natural subject colors. No text, numbers, labels, arrows, logos, watermark, photorealism or technical diagram.
Create a new standalone cover illustration, landscape exactly 1536x1024. Strong handmade pencil and gouache character on ivory paper. Keep the whole subject inside the central 70% with generous margins. No text, letters, numbers, logos, arrows or watermark.
```

## Peinture — 16 septembre 2026

**Illustrations provisoires.** L’environnement de rédaction de ce lot ne disposait pas de l’outil imagegen : les quatre dessins ont été tracés en SVG hors du dépôt, puis convertis en PNG 1536×1024 ; les variantes WebP 480, 720 et 960 ont été générées avec `cwebp` (qualité 82). À remplacer par une génération avec l’outil maison, sans changer les données des fiches. Couvertures illustratives, sans valeur de schéma de montage.

### choisir-sa-peinture

Fichier : `public/images/tutoriels/choisir-sa-peinture.png`

```text
Use case: stylized-concept. Original French DIY tutorial cover, landscape 1536x1024. Subject: three paint colour swatch cards side by side showing a matte, a velvet and a satin finish, each a flat muted colour patch, with a small unbranded open paint pot and a brush beside them. Object vignette, not a labeled diagram. Loose imperfect charcoal contours, flat gouache shapes, coarse dry brush texture on warm ivory paper. Simplified recognizable objects in central 70 percent with generous margins for mobile card crop. Natural subject colors. No text, numbers, labels, arrows, logos, watermark, photorealism or technical diagram.
```

### peindre-sans-bavures

Fichier : `public/images/tutoriels/peindre-sans-bavures.png`

```text
Use case: stylized-concept. Original French DIY tutorial cover, landscape 1536x1024. Subject: a small cutting-in paintbrush laying a clean band of paint along a wall corner just above a strip of masking tape fixed to a skirting board, a few drops of paint on the tape edge. Object vignette, not a labeled diagram. Loose imperfect charcoal contours, flat gouache shapes, coarse dry brush texture on warm ivory paper. Simplified recognizable objects in central 70 percent with generous margins for mobile card crop. Natural subject colors. No text, numbers, labels, arrows, logos, watermark, photorealism or technical diagram.
```

### calculer-sa-peinture

Fichier : `public/images/tutoriels/calculer-sa-peinture.png`

```text
Use case: stylized-concept. Original French DIY tutorial cover, landscape 1536x1024. Subject: a rolled measuring tape stretched along the base of a plain wall, a small notepad and pencil on the floor and a closed paint can with its lid beside them. No numbers or markings on the tape. Object vignette, not a labeled diagram. Loose imperfect charcoal contours, flat gouache shapes, coarse dry brush texture on warm ivory paper. Simplified recognizable objects in central 70 percent with generous margins for mobile card crop. Natural subject colors. No text, numbers, labels, arrows, logos, watermark, photorealism or technical diagram.
```

### choisir-rouleau-et-pinceau

Fichier : `public/images/tutoriels/choisir-rouleau-et-pinceau.png`

```text
Use case: stylized-concept. Original French DIY tutorial cover, landscape 1536x1024. Subject: a paint roller with a wooden handle and a small cutting-in paintbrush resting side by side across the ridged edge of a shallow paint tray holding a little paint. Object vignette, not a labeled diagram. Loose imperfect charcoal contours, flat gouache shapes, coarse dry brush texture on warm ivory paper. Simplified recognizable objects in central 70 percent with generous margins for mobile card crop. Natural subject colors. No text, numbers, labels, arrows, logos, watermark, photorealism or technical diagram.
```

## Petites réparations et électricité — 16 septembre 2026

**Illustrations provisoires.** Même situation que le lot peinture : pas d’outil imagegen disponible pour ce lot. Les dessins ont été tracés en SVG hors du dépôt, convertis en PNG 1536×1024, puis en WebP 480, 720 et 960 avec `cwebp` (qualité 82). À remplacer par une génération avec l’outil maison, sans changer les données des fiches. Couvertures illustratives, sans valeur de schéma de montage.

### reboucher-une-fissure

Fichier : `public/images/tutoriels/reboucher-une-fissure.png`

```text
Use case: stylized-concept. Original French DIY tutorial cover, landscape 1536x1024. Subject: a narrow putty knife pressing filler into a thin crack running down a plain plaster wall, with a small open tub of filler and a sanding block on the floor below. Object vignette, not a labeled diagram. Loose imperfect charcoal contours, flat gouache shapes, coarse dry brush texture on warm ivory paper. Simplified recognizable objects in central 70 percent with generous margins for mobile card crop. Natural subject colors. No text, numbers, labels, arrows, logos, watermark, photorealism or technical diagram.
```

### choisir-une-cheville

Fichier : `public/images/tutoriels/choisir-une-cheville.png`

```text
Use case: stylized-concept. Original French DIY tutorial cover, landscape 1536x1024. Subject: three wall plugs of clearly different shapes lying side by side in front of a masonry drill bit and a single screw, a small drill hole visible in a wall block behind them. Object vignette, not a labeled diagram. Loose imperfect charcoal contours, flat gouache shapes, coarse dry brush texture on warm ivory paper. Simplified recognizable objects in central 70 percent with generous margins for mobile card crop. Natural subject colors. No text, numbers, labels, arrows, logos, watermark, photorealism or technical diagram.
```

### fixer-une-tringle-a-rideaux

Fichier : `public/images/tutoriels/fixer-une-tringle-a-rideaux.png`

```text
Use case: stylized-concept. Original French DIY tutorial cover, landscape 1536x1024. Subject: a straight curtain rod resting on two wall brackets fixed to a plain wall, a spirit level and a pencil lying on a nearby windowsill, no curtains. Object vignette, not a labeled diagram. Loose imperfect charcoal contours, flat gouache shapes, coarse dry brush texture on warm ivory paper. Simplified recognizable objects in central 70 percent with generous margins for mobile card crop. Natural subject colors. No text, numbers, labels, arrows, logos, watermark, photorealism or technical diagram.
```

### remplacer-une-prise-murale

Fichier : `public/images/tutoriels/remplacer-une-prise-murale.png`

```text
Use case: stylized-concept. Original French DIY tutorial cover, landscape 1536x1024. Subject: a wall socket unscrewed and held away from its box, revealing three distinctly coloured wires, with an insulated screwdriver and a small voltage tester resting on the floor below. Object vignette, not a labeled diagram. Loose imperfect charcoal contours, flat gouache shapes, coarse dry brush texture on warm ivory paper. Simplified recognizable objects in central 70 percent with generous margins for mobile card crop. Natural subject colors. No text, numbers, labels, arrows, logos, watermark, photorealism or technical diagram.
```

## Chauffage, électricité et finitions — 16 septembre 2026

**Illustrations provisoires.** Même situation que les lots précédents : pas d’outil imagegen disponible. Les dessins ont été tracés en SVG hors du dépôt, convertis en PNG 1536×1024, puis en WebP 480, 720 et 960 avec `cwebp` (qualité 82). À remplacer par une génération avec l’outil maison, sans changer les données des fiches. Couvertures illustratives, sans valeur de schéma de montage.

### purger-un-radiateur

Fichier : `public/images/tutoriels/purger-un-radiateur.png`

```text
Use case: stylized-concept. Original French DIY tutorial cover, landscape 1536x1024. Subject: a small bleed key fitted on the valve at the top of a cast-iron radiator, with a shallow bowl and a folded cloth on the floor below, a few water droplets. Object vignette, not a labeled diagram. Loose imperfect charcoal contours, flat gouache shapes, coarse dry brush texture on warm ivory paper. Simplified recognizable objects in central 70 percent with generous margins for mobile card crop. Natural subject colors. No text, numbers, labels, arrows, logos, watermark, photorealism or technical diagram.
```

### remplacer-un-interrupteur

Fichier : `public/images/tutoriels/remplacer-un-interrupteur.png`

```text
Use case: stylized-concept. Original French DIY tutorial cover, landscape 1536x1024. Subject: a wall light switch unscrewed and held away from its box, showing its terminals and two wires, with an insulated screwdriver and a small voltage tester resting on the floor below. Object vignette, not a labeled diagram. Loose imperfect charcoal contours, flat gouache shapes, coarse dry brush texture on warm ivory paper. Simplified recognizable objects in central 70 percent with generous margins for mobile card crop. Natural subject colors. No text, numbers, labels, arrows, logos, watermark, photorealism or technical diagram.
```

### peindre-un-plafond

Fichier : `public/images/tutoriels/peindre-un-plafond.png`

```text
Use case: stylized-concept. Original French DIY tutorial cover, landscape 1536x1024. Subject: a paint roller mounted on a long extension pole laying a fresh band of paint across a ceiling, a paint bucket and a protective sheet visible far below. Object vignette, not a labeled diagram. Loose imperfect charcoal contours, flat gouache shapes, coarse dry brush texture on warm ivory paper. Simplified recognizable objects in central 70 percent with generous margins for mobile card crop. Natural subject colors. No text, numbers, labels, arrows, logos, watermark, photorealism or technical diagram.
```

### poser-du-papier-peint-intisse

Fichier : `public/images/tutoriels/poser-du-papier-peint-intisse.png`

```text
Use case: stylized-concept. Original French DIY tutorial cover, landscape 1536x1024. Subject: a strip of patterned wallpaper being smoothed flat against a wall with a smoothing brush, its top edge overhanging near the ceiling, a craft knife and a pencil on a nearby ledge. Object vignette, not a labeled diagram. Loose imperfect charcoal contours, flat gouache shapes, coarse dry brush texture on warm ivory paper. Simplified recognizable objects in central 70 percent with generous margins for mobile card crop. Natural subject colors. No text, numbers, labels, arrows, logos, watermark, photorealism or technical diagram.
```

## Cloisons et finitions — 16 septembre 2026

**Illustrations provisoires.** Même situation que les lots précédents : pas d’outil imagegen disponible. Les dessins ont été tracés en SVG hors du dépôt, convertis en PNG 1536×1024, puis en WebP 480, 720 et 960 avec `cwebp` (qualité 82). Le prompt brut de chaque fiche est aussi consigné dans `output/imagegen/<id>.txt`. À remplacer par une génération avec l’outil maison, sans changer les données des fiches. Couvertures illustratives, sans valeur de schéma de montage.

### poser-une-bande-a-joint

Fichier : `public/images/tutoriels/poser-une-bande-a-joint.png`

```text
Use case: stylized-concept. Original French DIY tutorial cover, landscape 1536x1024. Subject: a paper joint tape being bedded into fresh filler along the seam between two plasterboards, a wide taping knife and a small hawk of joint compound resting on a board edge nearby. Object vignette, not a labeled diagram. Loose imperfect charcoal contours, flat gouache shapes, coarse dry brush texture on warm ivory paper. Simplified recognizable objects in central 70 percent with generous margins for mobile card crop. Natural subject colors. No text, numbers, labels, arrows, logos, watermark, photorealism or technical diagram.
```

### monter-une-petite-cloison-en-placo

Fichier : `public/images/tutoriels/monter-une-petite-cloison-en-placo.png`

```text
Use case: stylized-concept. Original French DIY tutorial cover, landscape 1536x1024. Subject: a bare steel stud partition frame standing between floor and ceiling with its bottom and top tracks screwed down and vertical studs at regular intervals, one plasterboard panel propped against the wall beside it. Object vignette, not a labeled diagram. Loose imperfect charcoal contours, flat gouache shapes, coarse dry brush texture on warm ivory paper. Simplified recognizable objects in central 70 percent with generous margins for mobile card crop. Natural subject colors. No text, numbers, labels, arrows, logos, watermark, photorealism or technical diagram.
```

### poser-une-etagere-sur-tasseaux

Fichier : `public/images/tutoriels/poser-une-etagere-sur-tasseaux.png`

```text
Use case: stylized-concept. Original French DIY tutorial cover, landscape 1536x1024. Subject: a plain wooden shelf resting inside a narrow cupboard on three slim battens screwed to the side walls and back, a folding rule and a cordless drill lying on the shelf. Object vignette, not a labeled diagram. Loose imperfect charcoal contours, flat gouache shapes, coarse dry brush texture on warm ivory paper. Simplified recognizable objects in central 70 percent with generous margins for mobile card crop. Natural subject colors. No text, numbers, labels, arrows, logos, watermark, photorealism or technical diagram.
```

### peindre-un-motif-au-pochoir

Fichier : `public/images/tutoriels/peindre-un-motif-au-pochoir.png`

```text
Use case: stylized-concept. Original French DIY tutorial cover, landscape 1536x1024. Subject: a translucent stencil sheet held against a wall with part of its repeating motif already painted in a contrasting colour, a round stencil brush almost dry on a paper plate below and a roll of low-tack tape nearby. Object vignette, not a labeled diagram. Loose imperfect charcoal contours, flat gouache shapes, coarse dry brush texture on warm ivory paper. Simplified recognizable objects in central 70 percent with generous margins for mobile card crop. Natural subject colors. No text, numbers, labels, arrows, logos, watermark, photorealism or technical diagram.
```

## Pièces d’eau et carrelage — 16 septembre 2026

**Illustrations provisoires.** Même situation que les lots précédents : pas d’outil imagegen disponible. Les dessins ont été tracés en SVG hors du dépôt, convertis en PNG 1536×1024, puis en WebP 480, 720 et 960 avec `cwebp` (qualité 82). À remplacer par une génération avec l’outil maison, sans changer les données des fiches. Couvertures illustratives, sans valeur de schéma de montage.

### poser-une-credence-carrelee

Fichier : `public/images/tutoriels/poser-une-credence-carrelee.png`

```text
Use case: stylized-concept. Original French DIY tutorial cover, landscape 1536x1024. Subject: a band of small square wall tiles running along a kitchen wall above a worktop, a notched adhesive trowel and a handful of tile spacers lying on the worktop beside it. Object vignette, not a labeled diagram. Loose imperfect charcoal contours, flat gouache shapes, coarse dry brush texture on warm ivory paper. Simplified recognizable objects in central 70 percent with generous margins for mobile card crop. Natural subject colors. No text, numbers, labels, arrows, logos, watermark, photorealism or technical diagram.
```

### renover-les-joints-d-un-carrelage

Fichier : `public/images/tutoriels/renover-les-joints-d-un-carrelage.png`

```text
Use case: stylized-concept. Original French DIY tutorial cover, landscape 1536x1024. Subject: a tiled wall being regrouted, one area of pale fresh grout spread across the joints with a rubber float, a small stiff joint brush and a damp sponge resting on the tiles below. Object vignette, not a labeled diagram. Loose imperfect charcoal contours, flat gouache shapes, coarse dry brush texture on warm ivory paper. Simplified recognizable objects in central 70 percent with generous margins for mobile card crop. Natural subject colors. No text, numbers, labels, arrows, logos, watermark, photorealism or technical diagram.
```

### nettoyer-les-bouches-de-vmc

Fichier : `public/images/tutoriels/nettoyer-les-bouches-de-vmc.png`

```text
Use case: stylized-concept. Original French DIY tutorial cover, landscape 1536x1024. Subject: a round white mechanical ventilation grille lifted away from a ceiling opening and resting on a cloth below, a small soft brush and a vacuum hose beside it, dust visible on the grille slats. Object vignette, not a labeled diagram. Loose imperfect charcoal contours, flat gouache shapes, coarse dry brush texture on warm ivory paper. Simplified recognizable objects in central 70 percent with generous margins for mobile card crop. Natural subject colors. No text, numbers, labels, arrows, logos, watermark, photorealism or technical diagram.
```

### remplacer-flexible-et-douchette

Fichier : `public/images/tutoriels/remplacer-flexible-et-douchette.png`

```text
Use case: stylized-concept. Original French DIY tutorial cover, landscape 1536x1024. Subject: a coiled braided stainless steel shower hose lying on tiles beside a round shower head, a roll of white thread seal tape and an adjustable wrench sitting next to them. Object vignette, not a labeled diagram. Loose imperfect charcoal contours, flat gouache shapes, coarse dry brush texture on warm ivory paper. Simplified recognizable objects in central 70 percent with generous margins for mobile card crop. Natural subject colors. No text, numbers, labels, arrows, logos, watermark, photorealism or technical diagram.
```

## Menuiseries et plinthes — 16 septembre 2026

**Illustrations provisoires.** Même situation que les lots précédents : pas d’outil imagegen disponible. Les dessins ont été tracés en SVG hors du dépôt, convertis en PNG 1536×1024, puis en WebP 480, 720 et 960 avec `cwebp` (qualité 82). À remplacer par une génération avec l’outil maison, sans changer les données des fiches. Couvertures illustratives, sans valeur de schéma de montage.

### poser-des-plinthes

Fichier : `public/images/tutoriels/poser-des-plinthes.png`

```text
Use case: stylized-concept. Original French DIY tutorial cover, landscape 1536x1024. Subject: a length of skirting board laid along the foot of a wall with one end cut at 45 degrees, a mitre box holding a saw and a folding rule on the floor nearby. Object vignette, not a labeled diagram. Loose imperfect charcoal contours, flat gouache shapes, coarse dry brush texture on warm ivory paper. Simplified recognizable objects in central 70 percent with generous margins for mobile card crop. Natural subject colors. No text, numbers, labels, arrows, logos, watermark, photorealism or technical diagram.
```

### regler-une-porte-de-placard

Fichier : `public/images/tutoriels/regler-une-porte-de-placard.png`

```text
Use case: stylized-concept. Original French DIY tutorial cover, landscape 1536x1024. Subject: a cupboard door standing slightly ajar on a pair of concealed hinges, their metal cups visible on the door edge, a manual screwdriver lying on the shelf inside. Object vignette, not a labeled diagram. Loose imperfect charcoal contours, flat gouache shapes, coarse dry brush texture on warm ivory paper. Simplified recognizable objects in central 70 percent with generous margins for mobile card crop. Natural subject colors. No text, numbers, labels, arrows, logos, watermark, photorealism or technical diagram.
```

### remplacer-le-joint-d-une-fenetre

Fichier : `public/images/tutoriels/remplacer-le-joint-d-une-fenetre.png`

```text
Use case: stylized-concept. Original French DIY tutorial cover, landscape 1536x1024. Subject: a soft rubber seal running along the groove of a window frame, a short offcut of the old seal, a sharp knife and a sheet of paper resting on the sill. Object vignette, not a labeled diagram. Loose imperfect charcoal contours, flat gouache shapes, coarse dry brush texture on warm ivory paper. Simplified recognizable objects in central 70 percent with generous margins for mobile card crop. Natural subject colors. No text, numbers, labels, arrows, logos, watermark, photorealism or technical diagram.
```

### raboter-une-porte-qui-frotte

Fichier : `public/images/tutoriels/raboter-une-porte-qui-frotte.png`

```text
Use case: stylized-concept. Original French DIY tutorial cover, landscape 1536x1024. Subject: a wooden interior door lying flat across two low blocks, an edge of its bottom rail being shaved with a hand plane, a pencil line drawn just above the cut and a sheet of paper lying beside it. Object vignette, not a labeled diagram. Loose imperfect charcoal contours, flat gouache shapes, coarse dry brush texture on warm ivory paper. Simplified recognizable objects in central 70 percent with generous margins for mobile card crop. Natural subject colors. No text, numbers, labels, arrows, logos, watermark, photorealism or technical diagram.
```

## Peinture avancée et papier peint — 16 septembre 2026

**Illustrations provisoires.** Même situation que les lots précédents : pas d’outil imagegen disponible. Les dessins ont été tracés en SVG hors du dépôt, convertis en PNG 1536×1024, puis en WebP 480, 720 et 960 avec `cwebp` (qualité 82). À remplacer par une génération avec l’outil maison, sans changer les données des fiches. Couvertures illustratives, sans valeur de schéma de montage.

### decoller-du-papier-peint

Fichier : `public/images/tutoriels/decoller-du-papier-peint.png`

```text
Use case: stylized-concept. Original French DIY tutorial cover, landscape 1536x1024. Subject: a wide strip of old wallpaper peeling away from a wall under a broad scraper, damp patches on the wall behind, a spray bottle and a sponge on the floor below. Object vignette, not a labeled diagram. Loose imperfect charcoal contours, flat gouache shapes, coarse dry brush texture on warm ivory paper. Simplified recognizable objects in central 70 percent with generous margins for mobile card crop. Natural subject colors. No text, numbers, labels, arrows, logos, watermark, photorealism or technical diagram.
```

### repeindre-une-porte

Fichier : `public/images/tutoriels/repeindre-une-porte.png`

```text
Use case: stylized-concept. Original French DIY tutorial cover, landscape 1536x1024. Subject: an interior panelled door lying flat on two trestles being painted with a small roller, a loaded paintbrush and an open paint pot resting on the floor beside it. Object vignette, not a labeled diagram. Loose imperfect charcoal contours, flat gouache shapes, coarse dry brush texture on warm ivory paper. Simplified recognizable objects in central 70 percent with generous margins for mobile card crop. Natural subject colors. No text, numbers, labels, arrows, logos, watermark, photorealism or technical diagram.
```

### repeindre-un-mur-fonce-en-clair

Fichier : `public/images/tutoriels/repeindre-un-mur-fonce-en-clair.png`

```text
Use case: stylized-concept. Original French DIY tutorial cover, landscape 1536x1024. Subject: a paint roller applying pale paint across a wall where one broad band of dark colour still shows through the fresh coat, a paint tray below. Object vignette, not a labeled diagram. Loose imperfect charcoal contours, flat gouache shapes, coarse dry brush texture on warm ivory paper. Simplified recognizable objects in central 70 percent with generous margins for mobile card crop. Natural subject colors. No text, numbers, labels, arrows, logos, watermark, photorealism or technical diagram.
```

### peindre-deux-couleurs

Fichier : `public/images/tutoriels/peindre-deux-couleurs.png`

```text
Use case: stylized-concept. Original French DIY tutorial cover, landscape 1536x1024. Subject: a wall carrying two horizontal bands of clearly different flat colours, separated by a crisp line still covered with a strip of masking tape, a roller resting in a tray at the foot of the wall. Object vignette, not a labeled diagram. Loose imperfect charcoal contours, flat gouache shapes, coarse dry brush texture on warm ivory paper. Simplified recognizable objects in central 70 percent with generous margins for mobile card crop. Natural subject colors. No text, numbers, labels, arrows, logos, watermark, photorealism or technical diagram.
```

## Maçonnerie de pierre — 16 septembre 2026

**Illustration provisoire.** L’environnement de rédaction de la fiche T40 ne disposait pas de l’outil imagegen : le dessin a été tracé à la main en SVG, hors du dépôt, puis converti en PNG 1536×1024 avec `sips` ; les variantes WebP 480, 720 et 960 ont été générées avec `cwebp` (qualité 82). À remplacer par une génération avec l’outil maison, sans changer les données de la fiche. Couverture illustrative, sans valeur de schéma de montage.

### rejointoyer-un-mur-en-pierre

Fichier : `public/images/tutoriels/rejointoyer-un-mur-en-pierre.png`

```text
Use case: stylized-concept. Original French DIY tutorial cover, landscape 1536x1024. Subject: a fragment of a stone wall with irregular grey-beige stones and thick repointed pale lime mortar joints, a long pointed pointing trowel carrying a small blob of pale lime mortar in front of the wall and a shallow mortar tub with a mound of fresh mortar beside it. Object vignette, not a labeled diagram. Loose imperfect charcoal contours, flat gouache shapes, coarse dry brush texture on warm ivory paper. Simplified recognizable objects in central 70 percent with generous margins for mobile card crop. Natural stone grey-beige and warm ivory subject colors. No text, numbers, labels, arrows, logos, watermark, photorealism or technical diagram.
```

## Robinetterie et enduits — 16 septembre 2026

Trois illustrations originales produites avec l’outil intégré imagegen, copiées dans `public/images/tutoriels/` et contrôlées visuellement. PNG 1536×1024 et variantes WebP 480, 720 et 960 pixels générées avec `cwebp` (qualité 82). Couvertures illustratives, sans valeur de schéma de montage.

### remplacer-mitigeur-lavabo

Fichier : `public/images/tutoriels/remplacer-mitigeur-lavabo.png`

```text
Use case: stylized-concept. Original French DIY tutorial cover, landscape 1536x1024. Subject: a standalone silver single-lever bathroom washbasin mixer tap with two braided flexible supply hoses curving below its base. Loose imperfect charcoal contours, flat gouache shapes, coarse dry brush texture on warm ivory paper. Simplified recognizable objects in central 70 percent with generous margins for mobile card crop. Natural silver and grey subject colors. No text, numbers, labels, arrows, logos, watermark, photorealism or technical diagram.
```

### reparer-fuite-joint-plat

Fichier : `public/images/tutoriels/reparer-fuite-joint-plat.png`

```text
Use case: stylized-concept. Original French DIY tutorial cover, landscape 1536x1024. Subject: the end of a short curved silver braided plumbing supply hose with a hexagonal swivel nut, beside one clearly visible flat red fibre sealing washer and a small brass male plumbing fitting. Object vignette, not assembly diagram. Loose imperfect charcoal contours, flat gouache shapes, coarse dry brush texture on warm ivory paper. Simplified recognizable objects in central 70 percent with generous margins for mobile card crop. Natural silver, brass and muted red subject colors. No text, numbers, labels, arrows, logos, watermark, photorealism or technical diagram.
```

### lisser-un-mur

Fichier : `public/images/tutoriels/lisser-un-mur.png`

```text
Use case: stylized-concept. Original French DIY tutorial cover, landscape 1536x1024. Subject: a broad steel smoothing knife with a wooden handle spreading a wide thin layer of pale white finishing plaster across a simple small upright fragment of pale grey plaster wall, a small unbranded open tub of filler beside it. Loose imperfect charcoal contours, flat gouache shapes, coarse dry brush texture on warm ivory paper. Simplified recognizable objects in central 70 percent with generous margins for mobile card crop. Natural subject colors. No text, numbers, labels, arrows, logos, watermark, photorealism or technical diagram.
```

Production du 8 septembre 2026. Référence de style : `public/images/tutoriels/plomberie-pehd.png`. Les treize dessins complètent le PEHD déjà approuvé. Ce document de travail n’est pas publié sur le site.

## Carrelage, sols et gros œuvre — 16 septembre 2026

**Illustrations provisoires.** Pas d’outil imagegen disponible dans cet environnement, comme pour les lots précédents : les sept dessins ont été tracés en SVG hors du dépôt, convertis en PNG 1536×1024, puis en WebP 480, 720 et 960 avec `cwebp` (qualité 82). À remplacer par une génération avec l’outil maison, sans changer les données des fiches. Couvertures illustratives, sans valeur de schéma de montage.

### remplacer-un-carreau-de-carrelage-casse

Fichier : `public/images/tutoriels/remplacer-un-carreau-de-carrelage-casse.png`

```text
Use case: stylized-concept. Original French DIY tutorial cover, landscape 1536x1024. Subject: one cracked square tile in the middle of an intact tiled floor, its corner lifted by a small chisel, a mallet and a notched trowel lying beside on a cloth. Object vignette, not a labeled diagram. Loose imperfect charcoal contours, flat gouache shapes, coarse dry brush texture on warm ivory paper. Simplified recognizable objects in central 70 percent with generous margins for mobile card crop. Natural subject colors. No text, numbers, labels, arrows, logos, watermark, photorealism or technical diagram.
```

### poser-du-carrelage-au-sol

Fichier : `public/images/tutoriels/poser-du-carrelage-au-sol.png`

```text
Use case: stylized-concept. Original French DIY tutorial cover, landscape 1536x1024. Subject: a row of square floor tiles laid dry along a taut chalk line on a bare floor, a notched adhesive trowel, an open bucket of adhesive and a few tile spacers beside it. Object vignette, not a labeled diagram. Loose imperfect charcoal contours, flat gouache shapes, coarse dry brush texture on warm ivory paper. Simplified recognizable objects in central 70 percent with generous margins for mobile card crop. Natural subject colors. No text, numbers, labels, arrows, logos, watermark, photorealism or technical diagram.
```

### poser-un-sol-vinyle-clipsable

Fichier : `public/images/tutoriels/poser-un-sol-vinyle-clipsable.png`

```text
Use case: stylized-concept. Original French DIY tutorial cover, landscape 1536x1024. Subject: three long vinyl floor planks half assembled, the last one tilted at an angle to click into the previous one, a tapping block, a rubber mallet and a utility knife lying on the planks. Object vignette, not a labeled diagram. Loose imperfect charcoal contours, flat gouache shapes, coarse dry brush texture on warm ivory paper. Simplified recognizable objects in central 70 percent with generous margins for mobile card crop. Natural subject colors. No text, numbers, labels, arrows, logos, watermark, photorealism or technical diagram.
```

### organiser-les-travaux-d-une-chambre

Fichier : `public/images/tutoriels/organiser-les-travaux-d-une-chambre.png`

```text
Use case: stylized-concept. Original French DIY tutorial cover, landscape 1536x1024. Subject: a handwritten work schedule on a sheet of paper resting on a wooden tool crate, a folding rule, a pencil and a roll of masking tape on top, a room with stripped walls in the background. Object vignette, not a labeled diagram. Loose imperfect charcoal contours, flat gouache shapes, coarse dry brush texture on warm ivory paper. Simplified recognizable objects in central 70 percent with generous margins for mobile card crop. Natural subject colors. No text, numbers, labels, arrows, logos, watermark, photorealism or technical diagram.
```

### fabriquer-des-volets-battants-en-bois

Fichier : `public/images/tutoriels/fabriquer-des-volets-battants-en-bois.png`

```text
Use case: stylized-concept. Original French DIY tutorial cover, landscape 1536x1024. Subject: a wooden shutter laid flat, face down, its two horizontal rails and a diagonal brace screwed across the back, a cordless drill and a try square resting on the boards. Object vignette, not a labeled diagram. Loose imperfect charcoal contours, flat gouache shapes, coarse dry brush texture on warm ivory paper. Simplified recognizable objects in central 70 percent with generous margins for mobile card crop. Natural subject colors. No text, numbers, labels, arrows, logos, watermark, photorealism or technical diagram.
```

### remplacer-un-linteau

Fichier : `public/images/tutoriels/remplacer-un-linteau.png`

```text
Use case: stylized-concept. Original French DIY tutorial cover, landscape 1536x1024. Subject: a stone rubble wall opening propped by two vertical steel props standing on wooden planks, an old timber lintel being slid out just above the opening, a spirit level and a mallet on the ground. Object vignette, not a labeled diagram. Loose imperfect charcoal contours, flat gouache shapes, coarse dry brush texture on warm ivory paper. Simplified recognizable objects in central 70 percent with generous margins for mobile card crop. Natural subject colors. No text, numbers, labels, arrows, logos, watermark, photorealism or technical diagram.
```

### ceinturer-un-mur-en-pierre

Fichier : `public/images/tutoriels/ceinturer-un-mur-en-pierre.png`

```text
Use case: stylized-concept. Original French DIY tutorial cover, landscape 1536x1024. Subject: the uneven top of a low stone wall receiving a fresh concrete capping, steel bars emerging from the wet concrete, a short wooden formwork and a trowel resting on the wall. Object vignette, not a labeled diagram. Loose imperfect charcoal contours, flat gouache shapes, coarse dry brush texture on warm ivory paper. Simplified recognizable objects in central 70 percent with generous margins for mobile card crop. Natural subject colors. No text, numbers, labels, arrows, logos, watermark, photorealism or technical diagram.
```

## reboucher-un-trou

Fichier : `public/images/tutoriels/reboucher-un-trou.png`

```text
Use case: stylized-concept. Create an original editorial illustration for a French DIY tutorial. Use the attached image ONLY as a style reference, replace its pipe subject completely. Subject: A putty knife with a wooden handle spreading a small patch of ivory wall filler on a small plain plaster wall fragment, simple object vignette. Match the loose imperfect charcoal contours, flat gouache shapes, coarse dry-brush texture, simplified expressive forms, generous ivory paper background of the reference. Landscape composition with the subject comfortably inside the central 70 percent so it also fits a card crop. No realism, no smooth 3D rendering, no text, numbers, arrows, labels, logos or watermark.
```

## poser-une-etagere

Fichier : `public/images/tutoriels/poser-une-etagere.png`

```text
Use case: stylized-concept. Create an original editorial illustration for a French DIY tutorial. Use the attached image ONLY as a style reference, replace its pipe subject completely. Subject: One short honey-colored wooden wall shelf on two simple dark metal right-angle brackets, three-quarter view, isolated object. Match the loose imperfect charcoal contours, flat gouache shapes, coarse dry-brush texture, simplified expressive forms, generous ivory paper background of the reference. Landscape composition with the subject comfortably inside the central 70 percent so it also fits a card crop. No realism, no smooth 3D rendering, no text, numbers, arrows, labels, logos or watermark.
```

## refaire-joints-silicone

Fichier : `public/images/tutoriels/refaire-joints-silicone.png`

```text
Use case: stylized-concept. Create an original editorial illustration for a French DIY tutorial. Use the attached image ONLY as a style reference, replace its pipe subject completely. Subject: One plain unbranded caulking gun with an ivory cartridge and a short neat white silicone bead, isolated object vignette. Match the loose imperfect charcoal contours, flat gouache shapes, coarse dry-brush texture, simplified expressive forms, generous ivory paper background of the reference. Landscape composition with the subject comfortably inside the central 70 percent so it also fits a card crop. No realism, no smooth 3D rendering, no text, numbers, arrows, labels, logos or watermark.
```

## peindre-un-mur

Fichier : `public/images/tutoriels/peindre-un-mur.png`

```text
Use case: stylized-concept. Create an original editorial illustration for a French DIY tutorial. Use attached image ONLY as style reference, replace its subject completely. Subject: A paint roller with a wooden handle and sage-green paint on its sleeve beside a shallow paint tray, isolated object vignette. Loose imperfect charcoal contours, flat gouache shapes, coarse dry-brush texture, simplified expressive forms, generous ivory paper background. Landscape composition, entire subject visible with comfortable margins. No realism, smooth 3D rendering, text, numbers, arrows, labels, logos or watermark. Use natural subject colors, not the blue pipe colors of the reference.
```

## renover-un-meuble

Fichier : `public/images/tutoriels/renover-un-meuble.png`

```text
Use case: stylized-concept. Create an original editorial illustration for a French DIY tutorial. Use attached image ONLY as style reference, replace its subject completely. Subject: A small wooden bedside cabinet with a drawer partly painted muted sage green and warm bare wood visible, a small paintbrush beside it. Loose imperfect charcoal contours, flat gouache shapes, coarse dry-brush texture, simplified expressive forms, generous ivory paper background. Landscape composition, entire subject visible with comfortable margins. No realism, smooth 3D rendering, text, numbers, arrows, labels, logos or watermark. Use natural subject colors, not the blue pipe colors of the reference.
```

## poser-du-parquet

Fichier : `public/images/tutoriels/poser-du-parquet.png`

```text
Use case: stylized-concept. Create an original editorial illustration for a French DIY tutorial. Use attached image ONLY as style reference, replace its subject completely. Subject: Three honey-oak engineered parquet boards with visible wood grain, one board lifted slightly next to two joined boards, simple isolated vignette. Loose imperfect charcoal contours, flat gouache shapes, coarse dry-brush texture, simplified expressive forms, generous ivory paper background. Landscape composition, entire subject visible with comfortable margins. No realism, smooth 3D rendering, text, numbers, arrows, labels, logos or watermark. Use natural subject colors, not the blue pipe colors of the reference.
```

## gestion-evacuations

Fichier : `public/images/tutoriels/gestion-evacuations.png`

```text
Use case: stylized-concept. Create an original editorial illustration for a French DIY tutorial. Use attached image ONLY as style reference, replace its subject completely. Subject: A light grey PVC waste pipe with a socket elbow and a short straight section, recognizable thick plastic plumbing parts, isolated object. Loose imperfect charcoal contours, flat gouache shapes, coarse dry-brush texture, simplified expressive forms, generous ivory paper background. Landscape composition, entire subject visible with comfortable margins. No realism, smooth 3D rendering, text, numbers, arrows, labels, logos or watermark. Use natural subject colors, not the blue pipe colors of the reference.
```

## raccord-per-vers-cuivre

Fichier : `public/images/tutoriels/raccord-per-vers-cuivre.png`

```text
Original stylized charcoal and gouache illustration on ivory paper for a DIY tutorial. Landscape. Subject: A short red PEX plastic pipe and a short warm copper pipe connected by a simple neutral grey push-fit plumbing connector, no cutaway, isolated object. Loose broken black contours, rough dry brush strokes, simplified flat colors, clearly hand drawn. No text, no logo, no arrows, no photographic detail. Match the attached drawing's handmade visual style, but use copper and red subject colors.
```

## plomberie-cuivre

Fichier : `public/images/tutoriels/plomberie-cuivre.png`

```text
Original stylized charcoal and gouache illustration on ivory paper for a DIY tutorial. Landscape. Subject: Two short copper plumbing tubes and a rounded copper press elbow, warm copper colors, isolated object vignette. Loose broken black contours, rough dry brush strokes, simplified flat colors, clearly hand drawn. No text, no logo, no arrows, no photographic detail. Match the attached drawing's handmade visual style, but use copper and red subject colors.
```

## dimensionnement-plomberie

Fichier : `public/images/tutoriels/dimensionnement-plomberie.png`

```text
Use case: stylized-concept. Create an original editorial illustration for a French DIY tutorial. Use attached image ONLY as style reference, replace its subject completely. Subject: Three short pipe offcuts with different open circular diameters beside a loosely curled measuring tape with no numbers or text, isolated object. Loose imperfect charcoal contours, flat gouache shapes, coarse dry-brush texture, simplified expressive forms, generous ivory paper background. Landscape composition, entire subject visible with comfortable margins. No realism, smooth 3D rendering, text, numbers, arrows, labels, logos or watermark. Use natural subject colors, not the blue pipe colors of the reference.
```

## per-raccord-a-glissement

Fichier : `public/images/tutoriels/per-raccord-a-glissement.png`

```text
Use case: stylized-concept. Create an original editorial illustration for a French DIY tutorial. Use attached image ONLY as style reference, replace its subject completely. Subject: A short red PEX pipe with a brass sliding sleeve and matching brass barbed fitting placed nearby, isolated object vignette, not a labeled diagram. Loose imperfect charcoal contours, flat gouache shapes, coarse dry-brush texture, simplified expressive forms, generous ivory paper background. Landscape composition, entire subject visible with comfortable margins. No realism, smooth 3D rendering, text, numbers, arrows, labels, logos or watermark. Use natural subject colors, not the blue pipe colors of the reference.
```

## per-raccord-a-compression

Fichier : `public/images/tutoriels/per-raccord-a-compression.png`

```text
Use case: stylized-concept. Create an original editorial illustration for a French DIY tutorial. Use attached image ONLY as style reference, replace its subject completely. Subject: A short blue PEX pipe beside a brass compression fitting and separate hexagonal nut, isolated object vignette. Loose imperfect charcoal contours, flat gouache shapes, coarse dry-brush texture, simplified expressive forms, generous ivory paper background. Landscape composition, entire subject visible with comfortable margins. No realism, smooth 3D rendering, text, numbers, arrows, labels, logos or watermark. Use natural subject colors, not the blue pipe colors of the reference.
```

## per-raccord-a-sertir

Fichier : `public/images/tutoriels/per-raccord-a-sertir.png`

```text
Use case: stylized-concept. Create an original editorial illustration for a French DIY tutorial. Use attached image ONLY as style reference, replace its subject completely. Subject: A short red PEX pipe inserted in a brass plumbing fitting with a silver metal crimp sleeve, isolated object vignette. Loose imperfect charcoal contours, flat gouache shapes, coarse dry-brush texture, simplified expressive forms, generous ivory paper background. Landscape composition, entire subject visible with comfortable margins. No realism, smooth 3D rendering, text, numbers, arrows, labels, logos or watermark. Use natural subject colors, not the blue pipe colors of the reference.
```


## Électricité — 10 septembre 2026

Trois illustrations originales produites avec l’outil intégré imagegen, puis copiées dans le projet. Contrôle visuel des trois images effectué ; couvertures illustratives, pas schémas de câblage.

### remplacer-une-ampoule

Fichier : `public/images/tutoriels/remplacer-une-ampoule.png`

```text
Use case: stylized-concept. Original French DIY tutorial cover, landscape. Loose imperfect charcoal contours, flat gouache, coarse dry brush texture on warm ivory paper, simplified recognizable object centered with generous margins. No text, numbers, labels, arrows, logos, watermark or photorealism. Subject: One white LED light bulb with a silver E27 screw base, lying diagonally, isolated.
```

### brancher-un-luminaire-dcl

Fichier : `public/images/tutoriels/brancher-un-luminaire-dcl.png`

```text
Use case: stylized-concept. Original French DIY tutorial cover, landscape. Loose imperfect charcoal contours, flat gouache, coarse dry brush texture on warm ivory paper, simplified recognizable object centered with generous margins. No text, numbers, labels, arrows, logos, watermark or photorealism. Subject: A simple muted ochre pendant lampshade with white cord and small white molded DCL plug, isolated, no exposed wires.
```

### dimensionner-son-tableau-electrique

Fichier : `public/images/tutoriels/dimensionner-son-tableau-electrique.png`

```text
Use case: stylized-concept. Original French DIY tutorial cover, landscape. Loose imperfect charcoal contours, flat gouache, coarse dry brush texture on warm ivory paper, simplified recognizable object centered with generous margins. No text, numbers, labels, arrows, logos, watermark or photorealism. Subject: Front view of a small closed domestic electrical distribution panel, ivory casing with a row of grey switch toggles and one wider residual-current device with a distinct small blue test button. All protective covers in place, no wires, no hand.
```

L’illustration du tableau est réaffectée au tutoriel de dimensionnement après retrait de la fiche de test du différentiel.


## Plomberie et WC — 14 septembre 2026

Trois illustrations originales générées avec l’outil intégré imagegen, copiées dans `public/images/tutoriels/` et contrôlées visuellement. PNG 1536×1024 et variantes WebP 480, 720 et 960 pixels ; couvertures illustratives, sans valeur de schéma de montage.

### arreter-chasse-eau-qui-coule

Fichier : `public/images/tutoriels/arreter-chasse-eau-qui-coule.png`

```text
Use case: stylized-concept. Original French DIY tutorial cover, landscape 1536x1024. Subject: An open white ceramic toilet cistern seen slightly from above, lid placed beside it, simple grey flush tower and small blue float visible inside. Loose imperfect charcoal contours, flat gouache shapes, coarse dry brush texture on warm ivory paper. Simplified recognizable objects in central 70 percent with generous margins for mobile card crop. Natural subject colors. No text, numbers, labels, arrows, logos, watermark, photorealism or technical diagram.
```

### remplacer-mecanisme-chasse-eau

Fichier : `public/images/tutoriels/remplacer-mecanisme-chasse-eau.png`

```text
Use case: stylized-concept. Original French DIY tutorial cover, landscape 1536x1024. Subject: One standalone white and grey dual flush toilet mechanism with a blue adjustment piece, a large dark rubber sealing washer and a small round dual push button placed beside it. Loose imperfect charcoal contours, flat gouache shapes, coarse dry brush texture on warm ivory paper. Simplified recognizable objects in central 70 percent with generous margins for mobile card crop. Natural subject colors. No text, numbers, labels, arrows, logos, watermark, photorealism or technical diagram.
```

### nettoyer-siphon-lavabo

Fichier : `public/images/tutoriels/nettoyer-siphon-lavabo.png`

```text
Use case: stylized-concept. Original French DIY tutorial cover, landscape 1536x1024. Subject: A white plastic bottle trap for a bathroom washbasin, its threaded bottom cup unscrewed and placed beside it, small cleaning brush and shallow muted blue basin beneath. Loose imperfect charcoal contours, flat gouache shapes, coarse dry brush texture on warm ivory paper. Simplified recognizable objects in central 70 percent with generous margins for mobile card crop. Natural subject colors. No text, numbers, labels, arrows, logos, watermark, photorealism or technical diagram.
```


### ajouter-un-contacteur-jour-nuit

Fichier : `public/images/tutoriels/ajouter-un-contacteur-jour-nuit.png`. Génération avec l’outil intégré imagegen le 10 septembre 2026. Illustration contrôlée visuellement, sans valeur de schéma de câblage.

```text
Use case: stylized-concept. Original French DIY tutorial cover, landscape. Loose imperfect charcoal contours, flat gouache, coarse dry brush texture on warm ivory paper, simplified recognizable objects centered with generous margins. Subject: a white cylindrical domestic electric hot water tank, with a small separate ivory modular day-night contactor and grey selector lever in foreground. No wiring diagram, no exposed wires, no text, numbers, labels, arrows, logos, watermark or photorealism. Natural white and grey object colors, subtle warm shadows.
```

## Structure — 17 septembre 2026

Illustration originale générée avec l’outil intégré imagegen et contrôlée visuellement. PNG 1536×1024 et variantes WebP 480, 720 et 960 pixels à qualité 82 ; source et prompt conservés dans `output/imagegen/`. Couverture illustrative, sans valeur de schéma de montage.

### poser-un-plancher-osb-sur-solives

Fichier : `public/images/tutoriels/poser-un-plancher-osb-sur-solives.png`

```text
Use case: stylized-concept. Original French DIY tutorial cover, landscape exactly 1536x1024. Subject: an ochre OSB flooring panel with very recognizable large compressed wood flakes, installed flat across four parallel solid timber floor joists. Low three-quarter view clearly shows the thick joists extending out toward the foreground from beneath the panel, and the panel spanning perpendicular across all four joists. Panel ends supported on outer joists, screw heads flush in neat rows above joists. A cordless screwdriver and a small open tin of wood screws rest on the panel. Simple isolated object vignette, no person, no building background. Loose imperfect charcoal contours, flat gouache shapes, coarse dry brush texture on warm ivory paper. Simplified expressive recognizable forms, whole subject inside central 70 percent with generous margins for mobile cropping. Natural warm wood colors. No text, numbers, labels, arrows, logos, watermark, photorealism or technical diagram.
```

## Finitions — 20 septembre 2026

### ragreer-un-sol-en-beton

Illustration originale générée avec l’outil intégré imagegen et contrôlée visuellement. Fichier : `public/images/tutoriels/ragreer-un-sol-en-beton.png`, 1536×1024 ; variantes WebP 480, 720 et 960 pixels à qualité 82. Source et prompt conservés dans `output/imagegen/`.

```text
Use case: stylized-concept. Original French DIY tutorial cover, landscape exactly 1536x1024. Subject: a gloved hand tilting a plain bucket to pour smooth grey self-leveling floor compound onto a small bare concrete interior floor, with a stainless steel smoothing trowel with wooden handle beside the fresh puddle. Only hand and forearm visible, no full person. Loose imperfect charcoal contours, flat gouache shapes, coarse dry brush texture on warm ivory paper. Simplified recognizable forms, whole subject within central 70 percent, generous margins for mobile cropping. Natural grey mortar and muted blue bucket. No text, numbers, labels, arrows, logos, watermark, photorealism or technical diagram.
```

## Domotique — 24 septembre 2026

### radiateur-connecte

Fichier : `public/images/tutoriels/radiateur-connecte.png`, 1536×1024 ; variantes WebP 480, 720 et 960 pixels à qualité 82. Illustration générée avec l’outil d’image de ChatGPT à partir du gabarit de prompt, puis contrôlée visuellement : sujet dans les 70 % centraux, aucun texte ni personnage. Prompt conservé dans `output/imagegen/radiateur-connecte.txt`.

```text
Use case: stylized-concept. Original French DIY tutorial cover, landscape 1536x1024 (3:2 aspect ratio). Subject: a flat white panel radiator with vertical fins seen from the front against a pale wall; a grey connected thermostatic head with a small round display is fitted on its left side, and three simple radio waves rise from the head toward a smartphone standing on a small wooden shelf on the right, its screen showing an abstract circular dial and a slider. No people, no full person. Loose imperfect charcoal contours, flat gouache shapes, coarse dry brush texture on warm ivory paper. Simplified recognizable objects in central 70 percent with generous margins for mobile card crop. Natural subject colors: warm ivory paper, muted sage wall wash, white radiator, grey head, terracotta accent. No text, numbers, labels, arrows, logos, watermark, photorealism or technical diagram; the phone screen stays abstract, without letters or figures.
```
