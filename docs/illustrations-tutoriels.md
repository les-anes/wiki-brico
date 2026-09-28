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

## Lot cent tutoriels — 28 septembre 2026

Les neuf couvertures provisoires du lot T57 à T65 ont été remplacées par des illustrations originales générées avec imagegen intégré et contrôlées visuellement. PNG 1536×1024 et variantes WebP 480, 720 et 960 à qualité 82 dans `public/images/tutoriels/`. Sources PNG et prompts réellement utilisés dans `output/imagegen/`. Les textes alternatifs décrivent les nouvelles scènes.

### installer-un-recuperateur-d-eau-de-pluie

Fichier : `public/images/tutoriels/installer-un-recuperateur-d-eau-de-pluie.png`

```text
Illustration originale WikiBrico pour couverture de tutoriel. Format paysage 1536 × 1024. Dessin artisanal au crayon et à la gouache sur fond ivoire clair, traits légèrement irréguliers, textures douces, formes simplifiées mais reconnaissables, palette naturelle. Sujet centré dans les 70 % de l’image, marges aérées, lisible en miniature. Aucun texte, chiffre, flèche, légende, logo ou filigrane, aucun photoréalisme. Une cuve aérienne fermée de récupération d’eau de pluie, gris vert, sur un socle stable. À côté une descente verticale de gouttière, qui continue jusqu’au sol ; un collecteur latéral et un court tuyau la relient au haut de la cuve. Un robinet à la base de la cuve, un arrosoir posé au sol. Vue de trois quarts, aucun personnage.
```

### poser-un-faux-plafond

Fichier : `public/images/tutoriels/poser-un-faux-plafond.png`

```text
Illustration originale WikiBrico pour couverture de tutoriel. Format paysage 1536 × 1024. Dessin artisanal au crayon et à la gouache sur fond ivoire clair, traits légèrement irréguliers, textures douces, formes simplifiées mais reconnaissables, palette naturelle. Sujet centré dans les 70 % de l’image, marges aérées, lisible en miniature. Aucun texte, chiffre, flèche, légende, logo ou filigrane, aucun photoréalisme. Vue de trois quarts d’un petit plafond suspendu en cours de pose sous une dalle de béton. Des suspentes verticales courtes portent des fourrures métalliques horizontales ; une partie du dessous est déjà recouverte de plaques de plâtre blanc cassé, l’autre laisse voir l’ossature. Évocation épurée d’un angle de pièce, aucune plaque flottante, aucun personnage.
```

### poser-un-plan-de-travail

Fichier : `public/images/tutoriels/poser-un-plan-de-travail.png`

```text
Illustration originale WikiBrico pour couverture de tutoriel. Format paysage 1536 × 1024. Dessin artisanal au crayon et à la gouache sur fond ivoire clair, traits légèrement irréguliers, textures douces, formes simplifiées mais reconnaissables, palette naturelle. Sujet centré dans les 70 % de l’image, marges aérées, lisible en miniature. Aucun texte, chiffre, flèche, légende, logo ou filigrane, aucun photoréalisme. Un plan de travail stratifié couleur bois clair posé sur deux meubles bas de cuisine blanc cassé, avec une découpe rectangulaire aux angles arrondis pour un futur évier. Sur la partie pleine reposent un niveau à bulle et une visseuse sans marque. Vue de trois quarts, aucun robinet ni tuyau, aucun personnage.
```

### poser-une-terrasse-en-bois

Fichier : `public/images/tutoriels/poser-une-terrasse-en-bois.png`

```text
Illustration originale WikiBrico pour couverture de tutoriel. Format paysage 1536 × 1024. Dessin artisanal au crayon et à la gouache sur fond ivoire clair, traits légèrement irréguliers, textures douces, formes simplifiées mais reconnaissables, palette naturelle. Sujet centré dans les 70 % de l’image, marges aérées, lisible en miniature. Aucun texte, chiffre, flèche, légende, logo ou filigrane, aucun photoréalisme. Petit morceau de terrasse en cours de pose, vue de trois quarts légèrement plongeante : plusieurs lames de bois naturel parallèles espacées régulièrement, fixées sur trois lambourdes perpendiculaires, elles-mêmes posées sur des plots sur sol stable. Une partie des lambourdes reste découverte pour comprendre l’assemblage. Une visseuse repose sur les lames, aucun personnage ni jardin détaillé.
```

### isoler-un-mur-par-l-interieur

Fichier : `public/images/tutoriels/isoler-un-mur-par-l-interieur.png`

```text
Illustration originale WikiBrico pour couverture de tutoriel. Format paysage 1536 × 1024. Dessin artisanal au crayon et à la gouache sur fond ivoire clair, traits légèrement irréguliers, textures douces, formes simplifiées mais reconnaissables, palette naturelle. Sujet centré dans les 70 % de l’image, marges aérées, lisible en miniature. Aucun texte, chiffre, flèche, légende, logo ou filigrane, aucun photoréalisme. Vue de trois quarts d’un fragment de mur intérieur doublé : devant un mur maçonné sobre, ossature en montants métalliques verticaux et rails bas et haut, laine minérale ocre clair entre les montants. Une plaque de plâtre fixée couvre la moitié de l’ossature, laissant l’autre moitié visible. Rien en vue éclatée, aucun personnage, aucune annotation.
```

### isoler-ses-combles-perdus

Fichier : `public/images/tutoriels/isoler-ses-combles-perdus.png`

```text
Illustration originale WikiBrico pour couverture de tutoriel. Format paysage 1536 × 1024. Dessin artisanal au crayon et à la gouache sur fond ivoire clair, traits légèrement irréguliers, textures douces, formes simplifiées mais reconnaissables, palette naturelle. Sujet centré dans les 70 % de l’image, marges aérées, lisible en miniature. Aucun texte, chiffre, flèche, légende, logo ou filigrane, aucun photoréalisme. Vue de trois quarts légèrement plongeante sur un plancher de comble : un rouleau de laine minérale claire partiellement déroulé bien ajusté entre deux solives en bois brut, avec une autre travée déjà remplie. Solives sur plancher porteur visible, un mètre ruban fermé posé sur une zone du plancher libre. Évocation légère de chevrons en arrière-plan, pas de personnage.
```

### regler-une-fenetre-qui-ferme-mal

Fichier : `public/images/tutoriels/regler-une-fenetre-qui-ferme-mal.png`

```text
Illustration originale WikiBrico pour couverture de tutoriel. Format paysage 1536 × 1024. Dessin artisanal au crayon et à la gouache sur fond ivoire clair, traits légèrement irréguliers, textures douces, formes simplifiées mais reconnaissables, palette naturelle. Sujet centré dans les 70 % de l’image, marges aérées, lisible en miniature. Aucun texte, chiffre, flèche, légende, logo ou filigrane, aucun photoréalisme. Gros plan de trois quarts sur le coin inférieur d’une fenêtre blanche entrebâillée et sa paumelle métallique de réglage bien visible. Sur le rebord intérieur reposent une petite clé Allen et un tournevis à manche ocre, sans marque. Le battant et le dormant sont distincts et cohérents, verre légèrement bleuté. Aucun personnage, aucun outil flottant.
```

### remplacer-un-chauffe-eau

Fichier : `public/images/tutoriels/remplacer-un-chauffe-eau.png`

```text
Illustration originale WikiBrico pour couverture de tutoriel. Format paysage 1536 × 1024. Dessin artisanal au crayon et à la gouache sur fond ivoire clair, traits légèrement irréguliers, textures douces, formes simplifiées mais reconnaissables, palette naturelle. Sujet centré dans les 70 % de l’image, marges aérées, lisible en miniature. Aucun texte, chiffre, flèche, légende, logo ou filigrane, aucun photoréalisme. Un chauffe-eau électrique cylindrique vertical blanc solidement fixé à un fragment de mur clair, vu de trois quarts. Les deux raccordements hydrauliques sont SOUS le ballon. Sur l’arrivée froide un petit groupe de sécurité en laiton au-dessus d’un siphon blanc avec évacuation descendante ; départ chaud cuivre séparé. Capot électrique inférieur fermé, aucun fil apparent. Un seau posé au sol et une clé à molette à côté évoquent le remplacement. Aucun personnage, aucune marque ni inscription.
```

### nettoyer-ses-gouttieres

Fichier : `public/images/tutoriels/nettoyer-ses-gouttieres.png`

```text
Illustration originale WikiBrico pour couverture de tutoriel. Format paysage 1536 × 1024. Dessin artisanal au crayon et à la gouache sur fond ivoire clair, traits légèrement irréguliers, textures douces, formes simplifiées mais reconnaissables, palette naturelle. Sujet centré dans les 70 % de l’image, marges aérées, lisible en miniature. Aucun texte, chiffre, flèche, légende, logo ou filigrane, aucun photoréalisme. Gros plan sur un court tronçon de gouttière métallique semi-ronde fixé au bord d’un toit, quelques feuilles mortes dedans. Une seule main gantée retire une poignée de feuilles, avec un seau recueillant les débris juste à côté. Cadrage rapproché sur le geste, pas de corps ni échelle ni personne sur un toit, contexte et hauteur hors champ.
```

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

## Toiture — 24 septembre 2026

### poser-une-couverture-en-ardoise

Fichier : `public/images/tutoriels/poser-une-couverture-en-ardoise.png`, 1536×1024 ; variantes WebP 480, 720 et 960 pixels à qualité 82. Illustration générée avec l’outil d’image de ChatGPT à partir du gabarit de prompt, puis contrôlée visuellement : sujet dans les 70 % centraux, aucun texte ni personnage. Prompt conservé dans `output/imagegen/poser-une-couverture-en-ardoise.txt`.

```text
Use case: stylized-concept. Original French DIY tutorial cover, landscape 1536x1024 (3:2 aspect ratio). Subject: two rows of dark slate tiles laid on horizontal wooden battens, seen at a low three-quarter angle so the battens show underneath; a slate hammer and a small pile of copper hooks rest on the lower row, and a few cut slates lean against the battens on the right. No people, no full person. Loose imperfect charcoal contours, flat gouache shapes, coarse dry brush texture on warm ivory paper. Simplified recognizable objects in central 70 percent with generous margins for mobile card crop. Natural subject colors: warm ivory paper, cool grey-blue slate, pale wood battens, a copper accent. No text, numbers, labels, arrows, logos, watermark, photorealism or technical diagram.
```

### poser-une-couverture-en-tuile-mecanique

Fichier : `public/images/tutoriels/poser-une-couverture-en-tuile-mecanique.png`, 1536×1024 ; variantes WebP 480, 720 et 960 pixels à qualité 82. Illustration générée avec l’outil d’image de ChatGPT à partir du gabarit de prompt, puis contrôlée visuellement : sujet dans les 70 % centraux, aucun texte ni personnage. Prompt conservé dans `output/imagegen/poser-une-couverture-en-tuile-mecanique.txt`.

```text
Use case: stylized-concept. Original French DIY tutorial cover, landscape 1536x1024 (3:2 aspect ratio). Subject: a single terracotta interlocking clay roof tile resting on two horizontal wooden battens seen at a low three-quarter angle, with a roofer hammer and a taut chalk line crossing the frame, and a small stack of two more clay tiles beside it. No people, no full person. Loose imperfect charcoal contours, flat gouache shapes, coarse dry brush texture on warm ivory paper. Simplified recognizable objects in central 70 percent with generous margins for mobile card crop. Natural subject colors: warm ivory paper, terracotta clay, pale wood battens, a charcoal accent. No text, numbers, labels, arrows, logos, watermark, photorealism or technical diagram.
```

### poser-une-couverture-en-bac-acier

Fichier : `public/images/tutoriels/poser-une-couverture-en-bac-acier.png`, 1536×1024 ; variantes WebP 480, 720 et 960 pixels à qualité 82. Illustration générée avec l’outil d’image de ChatGPT à partir du gabarit de prompt, puis contrôlée visuellement : sujet dans les 70 % centraux, aucun texte ni personnage. Prompt conservé dans `output/imagegen/poser-une-couverture-en-bac-acier.txt`.

```text
Use case: stylized-concept. Original French DIY tutorial cover, landscape 1536x1024 (3:2 aspect ratio). Subject: a ribbed coated steel roofing sheet in muted green lying across three horizontal steel purlins, seen at a low three-quarter angle so the corrugations and the purlins underneath are both readable; a cordless drill-driver with a screwdriver bit rests on the upper part of the sheet, with a few screws and sealing washers beside it. No people, no full person. Loose imperfect charcoal contours, flat gouache shapes, coarse dry brush texture on warm ivory paper. Simplified recognizable objects in central 70 percent with generous margins for mobile card crop. Natural subject colors: warm ivory paper, muted green coated steel, grey purlins, a dark accent. No text, numbers, labels, arrows, logos, watermark, photorealism or technical diagram.
```

## 27 septembre 2026 — Initiation à la soudure

Illustrations originales générées avec imagegen intégré, PNG 1536 × 1024 et WebP 480, 720, 960 à qualité 82. Sources de travail et prompts conservés dans `output/imagegen/`.

### souder-un-composant-electronique-a-l-etain

Fichier : `public/images/tutoriels/souder-un-composant-electronique-a-l-etain.png`.

```text
Use case: stylized-concept. Original WikiBrico French DIY tutorial cover, landscape exactly 1536x1024. Loose irregular pencil outlines, simplified gouache shapes and dry brush texture on warm ivory paper, muted sage and terracotta accents. Recognizable objects centered in central 70 percent, generous breathing room, readable mobile crop. No text, numbers, labels, arrows, logo, watermark or photorealism. No people or hands. A small green through-hole practice circuit board held in a miniature bench vise, a single beige axial resistor fitted through two holes, a soldering iron safely resting in its metal holder beside a spool of thin silvery solder wire and brass tip-cleaning wool. Clean coherent still life on a heat-resistant mat. Board unpowered, no batteries, no mains wiring. Distinguish the soldering iron insulated handle and metal tip clearly.
```

## Escalier, trémie et câbles — 27 septembre 2026

Trois fiches écrites ce jour-là : l’escalier droit à limon central, l’ouverture d’une
trémie dans un plancher à solives et le choix de la section des câbles d’un circuit.
**Les trois illustrations ont été générées le 27 septembre 2026 avec imagegen intégré** : PNG 1536 × 1024 et variantes WebP 480, 720 et 960 pixels, qualité 82. Les sources de travail et les prompts ci-dessous sont conservés dans `output/imagegen/<id>.png` et `<id>.txt`.

### choisir-la-section-des-cables-d-un-circuit

Fichier : `public/images/tutoriels/choisir-la-section-des-cables-d-un-circuit.png`.

```text
Use case: stylized-concept. Original WikiBrico French DIY tutorial cover, landscape exactly 1536x1024. Loose irregular pencil outlines, simplified gouache shapes and dry brush texture on warm ivory paper, muted sage and terracotta accents. Recognizable objects centered in central 70 percent, generous breathing room, readable mobile crop. No text, numbers, labels, arrows, logo, watermark or photorealism. No people or hands. Three electrical cables of clearly different thicknesses lying parallel as loose open coils, their stripped copper ends showing, next to a modular circuit breaker on its DIN rail section and a folded yellow tape measure. The three cables form one simple balanced still life on a plain surface, thickness difference clearly readable. No active sparks, no lighting fixture, no wall.
```

### ouvrir-une-tremie-dans-un-plancher-en-bois

Fichier : `public/images/tutoriels/ouvrir-une-tremie-dans-un-plancher-en-bois.png`.

```text
Use case: stylized-concept. Original WikiBrico French DIY tutorial cover, landscape exactly 1536x1024. Loose irregular pencil outlines, simplified gouache shapes and dry brush texture on warm ivory paper, muted sage and terracotta accents. Recognizable objects centered in central 70 percent, generous breathing room, readable mobile crop. No text, numbers, labels, arrows, logo, watermark or photorealism. No people. A rectangular floor opening cut through a wooden joist floor, seen from a three-quarter angle: several parallel floor joists, two of them cut, the cut ends caught by metal joist hangers on two thicker perpendicular trimmer beams bolted to the surviving joists. Two telescopic steel props with flat plates stand under the neighbouring joists. Offcuts, a circular saw and a pencil are set aside on the boards. Dust and fresh saw cuts, no finished staircase, no railing, no cables.
```

### fabriquer-un-escalier-droit-a-limon-central

Fichier : `public/images/tutoriels/fabriquer-un-escalier-droit-a-limon-central.png`.

```text
Use case: stylized-concept. Original WikiBrico French DIY tutorial cover, landscape exactly 1536x1024. Loose irregular pencil outlines, simplified gouache shapes and dry brush texture on warm ivory paper, muted sage and terracotta accents. Recognizable objects centered in central 70 percent, generous breathing room, readable mobile crop. No text, numbers, labels, arrows, logo, watermark or photorealism. No people or hands. A single thick wooden stringer beam cut with a staircase of notches along its upper edge, standing upright on an edge; two wooden treads presented loose in two of the notches, one on each side of the beam, held slightly above their seat. A wood chisel and a wooden mallet lie beside it with a carpenter square and a marking gauge. Plain workshop surface, warm ivory background, no assembled staircase, no railing, no screws or metal brackets.
```

### souder-deux-pieces-d-acier-a-l-arc

Fichier : `public/images/tutoriels/souder-deux-pieces-d-acier-a-l-arc.png`.

```text
Use case: stylized-concept. Original WikiBrico French DIY tutorial cover, landscape exactly 1536x1024. Loose irregular pencil outlines, simplified gouache shapes and dry brush texture on warm ivory paper, muted sage and terracotta accents. Recognizable objects centered in central 70 percent, generous breathing room, readable mobile crop. No text, numbers, labels, arrows, logo, watermark or photorealism. No people or hands. A dark green welding helmet with dark rectangular viewing lens, thick leather gauntlet gloves and a stick-welding electrode holder lying safely on a grey steel workbench, next to two overlapping small flat steel coupons joined along the overlap edge with a short realistic weld bead. A compact inverter welder and return clamp attached to a coupon behind. No active arc, sparks, flame or smoke. This is stick welding with a straight coated electrode, not a MIG torch. All objects form one simple balanced still life.
```

## 2026-09-27 — Raccord de plomberie à la filasse

Illustration originale générée avec l’outil intégré imagegen, PNG 1536 × 1024 et variantes WebP 480, 720 et 960 (qualité 82). Source et prompt : `output/imagegen/faire-un-raccord-plomberie-avec-de-la-filasse.png` et `.txt` ; image publiée : `public/images/tutoriels/faire-un-raccord-plomberie-avec-de-la-filasse.png`.

```text
Illustration pour un tutoriel de plomberie, format paysage 1536 × 1024. Dessin au crayon et à la gouache sur fond ivoire, traits irréguliers et formes simplifiées, pas une photographie ni un schéma technique. Nature morte centrée dans les 70 % de l’image : un raccord droit mâle en laiton avec hexagone, posé horizontalement en trois-quarts, son filetage extérieur enveloppé d’une couche fine de fibres de lin beiges, premier filet et ouverture intérieure dégagés. À côté, un petit écheveau de filasse de lin, un petit pot ouvert sans étiquette de pâte à joint beige et une clé à molette. Le raccord et sa filasse sont le sujet principal, bien lisibles. Aucun texte, chiffre, flèche, logo, filigrane ou légende. Pas de mains.
```

## 2026-09-27 — Ajouter une nourrice d’eau

Illustration originale générée avec l’outil intégré imagegen. PNG 1536 × 1024 et variantes WebP 480, 720 et 960 (qualité 82). Source : `output/imagegen/ajouter-une-nourrice-d-eau.png` ; publication : `public/images/tutoriels/ajouter-une-nourrice-d-eau.png`.

```text
Illustration originale de tutoriel de bricolage, paysage 1536 × 1024. Dessin au crayon et à la gouache, traits irréguliers, formes simplifiées, fond ivoire clair, sans texte ni chiffres ni flèches ni logo ni légende. Sujet centré dans les 70 % de l’image avec marges généreuses : une seule nourrice de distribution d’eau froide en laiton fixée horizontalement sur deux supports muraux. Trois départs verticaux sous la barre, chacun avec une petite vanne à poignée bleue et un raccord métallique, puis un tube PER bleu descendant bien séparé des deux autres. Arrivée d’eau par un tube bleu à gauche avec une vanne d’arrêt, extrémité droite fermée par un bouchon en laiton. Géométrie de plomberie simple et crédible, trois branches parallèles sans croisement, aucune eau qui coule. Vue de trois-quarts très légère montrant les fixations et les écrous. Pas de mains, pas de personnes, pas de photoréalisme, pas de réseau de chauffage ni débitmètre.
```

## 2026-09-27 — Répéteur Wi-Fi

Illustration originale générée avec l’outil intégré imagegen, PNG 1536 × 1024 et variantes WebP 480, 720 et 960 (qualité 82). Source : `output/imagegen/installer-un-repeteur-wifi.png` ; publication : `public/images/tutoriels/installer-un-repeteur-wifi.png`.

```text
Illustration de tutoriel WikiBrico, paysage 1536 × 1024. Dessin au crayon et gouache sur fond ivoire clair, formes simples, traits irréguliers. Un répéteur Wi-Fi blanc compact avec deux petites antennes verticales, branché dans une prise murale française, au premier plan. En arrière-plan proche une petite box internet blanche posée sur une console en bois clair. Composition aérée, objets entièrement visibles centrés dans les 70 % de l’image, sans personnes. Aucun texte, logo, chiffre, flèche, symbole d’onde ou légende. Pas de photoréalisme.
```

## 2026-09-27 — Liaison Ethernet vers une pièce

Illustration originale générée avec l’outil intégré imagegen, PNG 1536 × 1024 et variantes WebP 480, 720 et 960 (qualité 82). Source : `output/imagegen/relier-une-piece-en-ethernet.png` ; publication : `public/images/tutoriels/relier-une-piece-en-ethernet.png`.

```text
Illustration originale pour tutoriel de bricolage, format paysage 1536 × 1024. Crayon et gouache, traits irréguliers, formes simplifiées et fond ivoire. Sujet central entièrement visible dans les 70 % du cadre : un long cordon Ethernet bleu enroulé en larges boucles, avec ses deux fiches RJ45 transparentes à languette et huit petits contacts dorés clairement reconnaissables, près d’un ordinateur portable gris fermé et d’une petite box internet blanche. Petite section de goulotte blanche ouverte à côté pour évoquer le passage le long d’une plinthe. Nature morte aérée, pas de personne, aucun texte, logo, chiffre, flèche, légende ou filigrane, pas de photoréalisme.
```

## 2026-09-27 — Vérifier la mise à la terre

Illustration originale générée avec l’outil intégré imagegen, PNG 1536 × 1024 et variantes WebP 480, 720 et 960 (qualité 82). Source : `output/imagegen/verifier-la-mise-a-la-terre.png` ; publication : `public/images/tutoriels/verifier-la-mise-a-la-terre.png`.

```text
Illustration originale pour WikiBrico, paysage 1536 × 1024. Dessin au crayon et gouache, traits irréguliers, formes simplifiées sur fond ivoire. Nature morte centrée dans les 70 % du cadre : un contrôleur de résistance de terre portable jaune et gris, écran éteint sans chiffres ni lettres, trois cordons de mesure isolés enroulés proprement et deux petits piquets auxiliaires métalliques posés à côté sur une planche en bois. Un conducteur vert et jaune et une petite barrette de coupure en cuivre fermée sur socle isolant complètent la scène. Pas de tableau électrique, pas de câbles sous tension, pas de mains, pas de raccordement technique à représenter. Aucun texte, symbole, logo, flèche ni légende. Pas de photoréalisme.
```

## 2026-09-27 — Créer une prise de terre

Illustration originale générée avec l’outil intégré imagegen, PNG 1536 × 1024 et variantes WebP 480, 720 et 960 (qualité 82). Source : `output/imagegen/creer-une-prise-de-terre.png` ; publication : `public/images/tutoriels/creer-une-prise-de-terre.png`.

```text
Illustration originale de bricolage WikiBrico, format paysage 1536 × 1024. Crayon et gouache sur fond ivoire, traits irréguliers, formes simplifiées. Nature morte centrée dans les 70 % du cadre avec larges marges : un long piquet de terre en acier cuivré posé en diagonale, son collier de raccordement compatible en bronze, une couronne de câble cuivre nu épais, une barrette de coupure fermée sur socle isolant et un regard de visite vert avec son couvercle posé à côté. Quelques touches de terre brune sous le matériel évoquent le jardin, sans scène de chantier ni installation sous tension. Tous les objets sont détachés et non raccordés, pas de mains, pas de personne. Aucun texte, chiffre, logo, flèche, légende ou filigrane. Pas de photoréalisme.
```

## 2026-09-27 — Rallonger le cordon fibre de la box

Illustration originale générée avec l’outil intégré imagegen, PNG 1536 × 1024 et variantes WebP 480, 720 et 960 (qualité 82). Source : `output/imagegen/rallonger-le-cable-fibre-de-la-box.png` ; publication : `public/images/tutoriels/rallonger-le-cable-fibre-de-la-box.png`.

```text
Illustration originale WikiBrico, format paysage 1536 × 1024. Dessin au crayon et à la gouache, formes simplifiées, traits irréguliers et fond ivoire clair. Nature morte centrée dans les 70 % de l’image avec marges : un long cordon de fibre optique blanc fin, enroulé en larges boucles souples, deux connecteurs SC/APC verts rectangulaires avec capuchons de protection opaques blancs en place, une petite prise optique murale blanche fermée et une box internet blanche générique à côté. Connecteurs optiques, surtout pas des fiches RJ45 ni de cuivre apparent. Aucun rayon laser, aucune lumière sortant des connecteurs. Pas de mains ni de personnes. Aucun texte, chiffre, logo, flèche, légende ou filigrane, pas de photoréalisme.
```

## 2026-09-27 — Couler une chape à la chaux

Illustration originale fournie et contrôlée visuellement, PNG 1536 × 1024 et variantes WebP 480, 720 et 960 (qualité 82). Source : `output/imagegen/couler-une-chape-a-la-chaux.png` ; publication : `public/images/tutoriels/couler-une-chape-a-la-chaux.png`.

```text
Illustration originale WikiBrico, format paysage 1536 × 1024. Dessin au crayon et à la gouache, formes simplifiées, traits irréguliers et fond ivoire clair. Intérieur vide vu de trois quarts : une chape de mortier de chaux fraîchement tirée à la règle, encore humide, prise entre deux règles de guidage en bois dont une est restée en place. Une règle de maçon en aluminium, une taloche et une truelle posées sur la chape fraîche, une auge en bois et un seau de mortier de chaux clair à côté, un niveau à bulle par terre. Bords de murs en maçonnerie à l’arrière du cadre, pas de carrelage ni de revêtement posé, pas de mains ni de personne. Aucun texte, chiffre, logo, flèche, légende ou filigrane. Pas de photoréalisme.
```

## 2026-09-27 — Couler une dalle en béton armé sur terre-plein

Illustration originale fournie et contrôlée visuellement, PNG 1536 × 1024 et variantes WebP 480, 720 et 960 (qualité 82). Source : `output/imagegen/couler-une-dalle-en-beton-arme.png` ; publication : `public/images/tutoriels/couler-une-dalle-en-beton-arme.png`.

```text
Illustration originale WikiBrico, format paysage 1536 × 1024. Dessin au crayon et à la gouache, formes simplifiées, traits irréguliers et fond ivoire clair. Dalle sur terre-plein vue de trois quarts en fin de coulage : un coffrage rectangulaire en planches rempli de béton gris frais, surface à peine tirée à la règle. Derrière le coffrage, un panneau de treillis soudé en acier posé sur de petits cavaliers plastique, une brouette de béton et une pelle rangées à côté. Sur le bord ouvert de la fouille, on distingue la couche de cailloux compactés et le film polyane noir qui remonte. Pas de bâtiment, pas de revêtement fini, pas de mains ni de personne. Aucun texte, chiffre, logo, flèche, légende ou filigrane. Pas de photoréalisme.
```

## 2026-09-27 — Fixer une solive dans un sabot

Illustration originale fournie et contrôlée visuellement, PNG 1536 × 1024 et variantes WebP 480, 720 et 960 (qualité 82). Source : `output/imagegen/fixer-une-solive-dans-un-sabot.png` ; publication : `public/images/tutoriels/fixer-une-solive-dans-un-sabot.png`.

```text
Illustration originale WikiBrico, format paysage 1536 × 1024. Dessin au crayon et à la gouache, formes simplifiées, traits irréguliers et fond ivoire clair. Vue rapprochée de trois quarts sur une poutre en bois : deux sabots métalliques galvanisés cloués sur sa face, une solive engagée à fond dans le premier sabot, une seconde solive posée à plat à côté, prête à être mise en place. Un marteau et une petite réserve de pointes crantées sont posés sur la poutre, un niveau à bulle posé en travers du dessus des solives. Bois brut uniquement, pas de mur ni de revêtement de sol, pas de mains ni de personne. Aucun texte, chiffre, logo, flèche, légende ou filigrane. Pas de photoréalisme.
```
