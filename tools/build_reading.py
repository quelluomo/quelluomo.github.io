#!/usr/bin/env python3
"""Build the reading pages in read/ from the sources in writing-src/.

Run from the repository root:  python3 tools/build_reading.py

Source markup, one block per paragraph, blocks separated by a blank line:
  # Heading            chapter or section heading
  % text               text shown on a screen or announced (TV quiz, metro)
  @ Name, role         speaker label in a script
  > text               stage direction
  ^ text               opening credits (consecutive lines are grouped)
  *                    section break
  A line break inside a block is kept as a line break.
  *italic*  **bold**   inline
"""
import html, math, re
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent

PIECES = [
    dict(slug="blinded-by-a-goddess", title="Blinded by a Goddess", genre="Non-fiction", lang="en",
         language="English", colour="#1f3fbf", cover="blinded.png", pdf="blinded-by-a-goddess.pdf",
         intro="The ordeal of Guillaume Le Gentil and his decades-long attempt to observe the transit of Venus."),
    dict(slug="the-no-gaming-zone", title="The No Gaming Zone", genre="Non-fiction", lang="en",
         language="English", colour="#4f7dff", cover="no-gaming.png", pdf="the-no-gaming-zone.pdf",
         form="Monologue",
         intro="A monologue on growing up with video games and the pull of nearly going pro, told as a TV documentary on the rise and fall of Atari."),
    dict(slug="tutta-la-vita-davanti-insieme", title="Tutta la vita davanti, insieme", genre="Fiction", lang="it",
         language="Italiano", colour="#b83a12", cover="tutta-la-vita.png", pdf="tutta-la-vita-davanti-insieme.pdf",
         form="Racconto", label_genre="Narrativa",
         intro="Un racconto sull'adolescenza e su tutti i suoi alti e bassi."),
    dict(slug="nearly-seven-minutes", title="Nearly Seven Minutes", genre="Fiction", lang="en",
         language="English", colour="#e8501f", cover="7-minutes.png", pdf="7-minutes.pdf",
         form="Short story", colophon="First published in 2014 by Colour of Runaway Dog.",
         intro="A short story."),
    dict(slug="flipped-over-penguins", title="Flipped Over Penguins", genre="Fiction", lang="en",
         language="English", colour="#ff7a3d", cover="flipped-over.png", pdf="flipped-over-penguins.pdf",
         form="Short story", colophon="First published in 2014 by Colour of Runaway Dog.",
         intro="A short story."),
]

UI = {
    "en": dict(read="min read", original="Download the original PDF", back="← All writing",
               next="Next", end="The end.", words="words"),
    "it": dict(read="min di lettura", original="Scarica il PDF originale", back="← Tutti gli scritti",
               next="Prossimo", end="Fine.", words="parole"),
}

def inline(s):
    s = html.escape(s, quote=False).replace("\u2028", "<br />\n          ")
    s = re.sub(r"\*\*\*(.+?)\*\*\*", r"<strong><em>\1</em></strong>", s)
    s = re.sub(r"\*\*(.+?)\*\*", r"<strong>\1</strong>", s)
    s = re.sub(r"\*(.+?)\*", r"<em>\1</em>", s)
    s = re.sub(r"&lt;(https?://[^&\s]+)&gt;", r'&lt;<a href="\1" rel="noopener">\1</a>&gt;', s)
    return s

def render(src, pid):
    blocks = [b.strip() for b in src.strip().split("\n\n") if b.strip()]
    out, credits = [], []
    in_biblio = False
    def flush_credits():
        if not credits: return
        for i, c in enumerate(credits):
            cls = "credits" + (" credits-start" if i == 0 else "") + (" credits-end" if i == len(credits) - 1 else "")
            out.append(f'<p class="{cls}">{inline(c)}</p>')
        credits.clear()
    for b in blocks:
        b = "\u2028".join(x.strip() for x in b.split("\n"))   # line breaks inside a paragraph
        if b.startswith("^ "):
            credits.append(b[2:]); continue
        flush_credits()
        if b in ("*", "***", "* * *"):
            out.append('<p class="break" aria-hidden="true">*&nbsp;&nbsp;*&nbsp;&nbsp;*</p>')
        elif b.startswith("# "):
            in_biblio = b[2:].strip().lower() == "bibliography"
            out.append(f"<h2>{inline(b[2:])}</h2>")
        elif b.startswith("% "):
            line = f'<span class="screen-line">{inline(b[2:])}</span>'
            if out and out[-1].startswith('<p class="screen">'):
                out[-1] = out[-1][:-len("</p>")] + line + "</p>"
            else:
                out.append(f'<p class="screen">{line}</p>')
        elif b.startswith("@ "):
            out.append(f'<p class="speaker">{inline(b[2:])}</p>')
        elif b.startswith("> "):
            out.append(f'<p class="direction">[{inline(b[2:])}]</p>')
        else:
            cls = ' class="bibliography"' if in_biblio else ""
            out.append(f"<p{cls}>{inline(b)}</p>")
    flush_credits()
    return "\n          ".join(out)

def words(src):
    return len(re.findall(r"[\w’']+", re.sub(r"^[#%@>^] ", "", src, flags=re.M)))

PAGE = """<!DOCTYPE html>
<html lang="{lang}">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>{title} | Matteo Muscas</title>
    <meta name="description" content="{intro_attr}" />

    <link rel="stylesheet" href="../css/theme.css" />
    <link rel="stylesheet" href="../css/reading.css" />

    <script type="module" defer src="../js/theme.js"></script>
  </head>
  <body style="--piece: {colour}">
    <!-- Generated by tools/build_reading.py from writing-src/{slug}.md. Edit the source, not this file. -->
    <header>
      <nav class="nav-container">
        <a href="../index.html" class="logo-link">Matteo Muscas</a>
        <div class="nav-links">
          <a href="../index.html#work" class="nav-link">Work</a>
          <a href="../index.html#about" class="nav-link">About</a>
          <a href="../index.html#contact" class="nav-link">Contact</a>
          <button
            class="theme-toggle"
            id="theme-toggle"
            aria-label="Toggle dark mode"
          >
            <span class="theme-icon">🌙</span>
          </button>
        </div>
      </nav>
    </header>

    <main>
      <article>
        <figure class="read-cover">
          <img src="../assets/writing/covers/{cover}" alt="" width="1200" height="750" />
        </figure>

        <p class="read-eyebrow">{eyebrow}</p>
        <h1 class="read-title">{title}</h1>
        <div class="read-meta">
          <span>{minutes} {ui_read}</span>
          <span>{nwords} {ui_words}</span>
          <a href="../assets/writing/{pdf}" target="_blank" rel="noopener">{ui_original}</a>
        </div>
        <p class="read-intro">{intro}</p>

        <div class="read-text">
          {body}
        </div>

        <footer class="read-end">
          <p>{ui_end}</p>{colophon}
        </footer>
      </article>

      <nav class="read-nav" aria-label="More writing">
        <a href="../writing.html">{ui_back}</a>
        <a href="{next_slug}.html">{ui_next}: {next_title} →</a>
      </nav>
    </main>

    <footer>
      <p>&copy; 2026 Matteo Muscas</p>
    </footer>
  </body>
</html>
"""

def main():
    (ROOT / "read").mkdir(exist_ok=True)
    for i, p in enumerate(PIECES):
        src = (ROOT / "writing-src" / f"{p['slug']}.md").read_text()
        ui = UI[p["lang"]]
        nxt = PIECES[(i + 1) % len(PIECES)]
        n = words(src)
        eyebrow = " · ".join(x for x in [p.get("label_genre", p["genre"]), p.get("form"), p["language"]] if x)
        page = PAGE.format(
            lang=p["lang"], title=html.escape(p["title"]), intro=html.escape(p["intro"]),
            intro_attr=html.escape(p["intro"], quote=True), colour=p["colour"], slug=p["slug"],
            cover=p["cover"], pdf=p["pdf"], eyebrow=html.escape(eyebrow),
            minutes=max(1, math.ceil(n / 230)), nwords=f"{n:,}".replace(",", " " if p["lang"] == "it" else ","),
            ui_read=ui["read"], ui_words=ui["words"], ui_original=ui["original"], ui_end=ui["end"],
            ui_back=ui["back"], ui_next=ui["next"],
            colophon=f'\n          <p>{html.escape(p["colophon"])}</p>' if p.get("colophon") else "",
            body=render(src, p["slug"]), next_slug=nxt["slug"], next_title=html.escape(nxt["title"]),
        )
        (ROOT / "read" / f"{p['slug']}.html").write_text(page)
        print(f"read/{p['slug']}.html  {n} words")

if __name__ == "__main__":
    main()
