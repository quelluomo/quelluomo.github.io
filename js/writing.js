// Writing & zines — add a new entry here and it shows up on writing.html.
// external: true opens the link in a new tab (use for PDFs and off-site links).
// Fiction and non-fiction link to a reading page in read/, built by tools/build_reading.py.
// image: optional cover in assets/writing/covers/ — falls back to a placeholder.
// category format: "Genre · Form · Language" (e.g. "Fiction · Short story · English").
// Genres and cover colours: fiction = oranges, non-fiction = blues, poetry = purples, zine = greens.

// Highlighted pieces — shown first, under "Start here".
export const featured = [
  {
    title: "Blinded by a Goddess",
    category: "Non-fiction · English",
    description:
      "The ordeal of Guillaume Le Gentil and his decades-long attempt to observe the transit of Venus.",
    image: "assets/writing/covers/blinded.png",
    link: "./read/blinded-by-a-goddess.html",
  },
  {
    title: "The No Gaming Zone",
    category: "Non-fiction · Monologue · English",
    description:
      "A monologue on growing up with video games and the pull of nearly going pro.",
    image: "assets/writing/covers/no-gaming.png",
    link: "./read/the-no-gaming-zone.html",
  },
  {
    title: "Lacrosse Weekly 01",
    category: "Zine · English",
    description: "The first issue of a zine about lacrosse.",
    image: "assets/writing/covers/lacrosse.png",
    link: "./assets/writing/lacrosse-weekly-01.pdf",
    external: true,
  },
  {
    title: "Tutta la vita davanti, insieme",
    category: "Fiction · Short story · Italiano",
    description:
      "Un racconto sull'adolescenza e su tutti i suoi alti e bassi.",
    image: "assets/writing/covers/tutta-la-vita.png",
    link: "./read/tutta-la-vita-davanti-insieme.html",
  },
];

// Everything else.
export const others = [
  {
    title: "Everything About Garamond",
    category: "Zine · English",
    description:
      "A short zine on the history and anatomy of one of the most enduring typefaces in print.",
    image: "assets/writing/covers/everything-about-garamond.png",
    link: "./assets/writing/everything-about-garamond.pdf",
    external: true,
  },
  {
    title: "Ceilings",
    category: "Poetry · English",
    description: "A short collection of poems.",
    image: "assets/writing/covers/ceilings.png",
    link: "./assets/writing/ceilings.pdf",
    external: true,
  },
  {
    title: "Sardinian Winter Blues",
    category: "Poetry · English",
    description: "Selected poems.",
    image: "assets/writing/covers/sardinian-winter.png",
    link: "./assets/writing/sardinian-winter-blues.pdf",
    external: true,
  },
  {
    title: "Nearly Seven Minutes",
    category: "Fiction · Short story · English",
    description: "A short story.",
    image: "assets/writing/covers/7-minutes.png",
    link: "./read/nearly-seven-minutes.html",
  },
  {
    title: "Flipped Over Penguins",
    category: "Fiction · Short story · English",
    description: "A short story.",
    image: "assets/writing/covers/flipped-over.png",
    link: "./read/flipped-over-penguins.html",
  },
  {
    title: "Imitation of Life",
    category: "Fiction · Experimental · English",
    description:
      "A book written — and meant to be read — in random order. Shuffle the pages and start anywhere.",
    image: "assets/writing/covers/imitation.png",
    link: "./assets/writing/imitation-of-life.pdf",
    external: true,
  },
];
