De enige mappen die belangrijk zijn voor jullie zijn:

- [`data`](./data): bandkiezer.yml stelt de vragen voor de bandkiezer op en
  nav.yml de items die in het menu staan. Meer daarover hieronder.
- [`content`](./content): Alle pagina's. Als je hier een bestand eindigend in
  `.md` verwijderd, wordt die pagina ook verwijderd. De naam van het bestand
  wordt ook de url, dus `content/hallo.md` wordt
  `boomchickcollective.nl/hallo/`. Naam mag geen spaties bevatten.
- [`content/media`](./content/media): Alle afbeeldingen en video's voor op de
  site. Alles wat hier staat, staat in principe op de website, het hoeft niet
  per se op een pagina te staan.

De navigatie menu items zijn gedefinieerd in [`data/nav.yml`](./data/nav.yml).
Ze hebben een naam (`name:`) en url (`page:`). De volgorde maakt uit.

# Afbeeldingen (media)

Alle afbeeldingen in de map
[`content/media/carrousel`](./content/media/carrousel/) worden voor de
carrousel op de homepagina gebruikt. Wil je een afbeelding uit de carrousel
halen maar nog wel op de website hebben? Plaats 'm in de map
[`content/media`](./content/media).
