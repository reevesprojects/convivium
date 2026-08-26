# Convivium
A translation comparison studio for the modern scholar.

Inspired by [Bibliothekai](https://bibliothekai.ktema.org/) ([GitHub](https://github.com/davidmreed/bibliothekai)), Convivium is a digital humanities platform designed to facilitate deep analysis and side-by-side comparison of multiple translations of classical texts (Ancient Greek & Latin).

---

## Features

- **Parallel Text Studio**: Display multiple translations alongside the original Greek/Latin source text simultaneously with synchronized line-by-line alignment.
- **Synchronous Highlighting Engine**: Hovering over any verse in the original Greek/Latin or in any translation instantly illuminates the corresponding segment across all active columns.
- **Interlinear / Stacked Mode**: Toggle between a multi-column parallel studio and an interleaved line-by-line comparative card view.
- **Lexical Diff & Variance Highlighting**: Instantly visualize how translators' vocabulary choices diverge from each other through dynamic lexical variance highlighting.
- **Scholarly Commentary Drawer**: Click any verse to inspect:
  - Historical context and translator notes.
  - Greek & Latin grammatical breakdowns and lemma definitions.
  - Direct links to authoritative lexicons ([Logeion](https://logeion.uchicago.edu/), Perseus Tufts LSJ, Lewis & Short).
  - Personal study notes automatically saved to `localStorage`.
- **Bibliothekai-inspired Catalog**:
  - Browse by **Texts**, **Ancient Authors**, or **Modern Translators**.
  - Filter with pill badges (Ancient Greek, Latin, Verse, Prose, Meter, Facing Text, Commentary, Sample Passage).
- **Multi-Corpus Search**: Search Greek/Latin lemmas, diacritic-insensitive vocabulary, translator names, author biographies, and commentary notes with instant verse jumps (`Ctrl+K` or `/`).
- **Custom Text & Translation Importer**: Built-in wizard to paste custom Greek/Latin texts and student/scholarly translations with automated line alignment.
- **Customizable Display & Reading Themes**:
  - *Parchment (Warm Sepia)*, *Scholar Dark (Velvet Study)*, *Athenian Obsidian (OLED Midnight)*, and *Modern Light (Editorial)*.
  - Adjustable font family (*Cormorant Garamond*, *EB Garamond*, *Cardo* polytonic, *System Serif*), font size, and line spacing.
- **Export Capabilities**: Export parallel comparative alignments as formatted Markdown tables or citations.

---

## Curated Classical Corpus Included

1. **Homer — *Odyssey*** (Book 1, lines 1–25: The Proem)
   - Original Polytonic Greek vs. Emily Wilson (2017), Robert Fagles (1996), Richmond Lattimore (1965), Alexander Pope (1725), George Chapman (1616).
2. **Homer — *Iliad*** (Book 1, lines 1–18: The Rage of Achilles)
   - Original Polytonic Greek vs. Caroline Alexander (2015), Robert Fagles (1990), Richmond Lattimore (1951), Alexander Pope (1715).
3. **Virgil — *Aeneid*** (Book 1, lines 1–22: Arms and the Man)
   - Original Latin vs. Robert Fagles (2006), Sarah Ruden (2008), John Dryden (1697).
4. **Plato — *Apology of Socrates*** (Section 17a–18a: Opening Defense)
   - Original Greek Prose vs. Benjamin Jowett (1871), Harold North Fowler (1914 Loeb).
5. **Catullus — *Carmen 5*** ("Vivamus, mea Lesbia") & ***Carmen 85*** ("Odi et amo")
   - Original Latin vs. Richard Burton & Leonard Smithers (1894), J. P. Postgate (1912 Loeb).
6. **Aeschylus — *Agamemnon*** (Lines 1–25: Watchman's Soliloquy)
   - Original Greek vs. Oliver Taplin (2018), Herbert Weir Smyth (1926 Loeb), Richmond Lattimore (1953).
7. **Sappho — *Fragment 31*** ("Phainetai moi")
   - Original Aeolic Greek vs. Anne Carson (2002), John Addington Symonds (1883).
8. **Marcus Aurelius — *Meditations*** (Book 2.1: Morning Reflection)
   - Original Greek vs. Gregory Hays (2002), George Long (1862).

---

## Getting Started

### Prerequisites

- A modern web browser supporting HTML5, ES Modules, and CSS Custom Properties.
- No build tools, NodeJS, or bundlers required to run directly.

### Running Locally

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd convivium
   ```

2. Open `index.html` in your web browser:
   - Direct file open: double-click `index.html` in your file explorer.
   - Or run with any local dev server:
     ```bash
     # Using Python
     python -m http.server 8000
     # Or using Node
     npx serve .
     ```
   - Navigate to `http://localhost:8000`.

---

## Keyboard Shortcuts

- `Ctrl + K` or `/` : Open Global Library & Verse Search.
- `Escape` : Close search modal, settings modal, or commentary drawer.

---

## Project Structure

```
convivium/
├── index.html                  # Main application entry point
├── css/
│   ├── main.css                # Design system tokens, typography, theme engines
│   ├── components.css          # Cards, pills, badges, search modal, commentary drawer
│   └── comparison.css          # Parallel grid, interlinear cards, synchronized hover, diff
├── js/
│   ├── app.js                  # Main controller, router, lifecycle manager
│   ├── data/
│   │   ├── texts.js            # Classical aligned texts dataset + footnotes + vocab
│   │   ├── authors.js          # Author catalog, dates, and bios
│   │   └── translators.js      # Translator catalog, styles, and approaches
│   ├── services/
│   │   ├── storage.js          # LocalStorage manager for settings, notes, custom texts
│   │   ├── search.js           # Multi-corpus diacritic-insensitive search engine
│   │   └── diff.js             # Translation variance and lexical diff calculator
│   └── components/
│       ├── catalogView.js      # Bibliothekai-style catalog (Texts, Authors, Translators)
│       ├── parallelView.js     # Side-by-side synchronized column studio
│       ├── interlinearView.js  # Interleaved line-by-line stacked comparison
│       ├── detailView.js       # Detailed profiles for texts, authors, and translators
│       ├── commentaryDrawer.js # Sliding commentary drawer & lexicon lookup
│       ├── searchModal.js      # Global quick-search dialog
│       ├── settingsModal.js    # Display & typography customization dialog
│       └── importModal.js      # Custom text & translation alignment wizard
├── LICENSE                     # BSD 3-Clause License
└── README.md                   # Documentation & User Guide
```

---

## License

BSD 3-Clause License

Copyright (c) 2026, Benjamin Reeves

Redistribution and use in source and binary forms, with or without
modification, are permitted provided that the following conditions are met:

1. Redistributions of source code must retain the above copyright notice, this
   list of conditions and the following disclaimer.

2. Redistributions in binary form must reproduce the above copyright notice,
   this list of conditions and the following disclaimer in the documentation
   and/or other materials provided with the distribution.

3. Neither the name of the copyright holder nor the names of its
   contributors may be used to endorse or promote products derived from
   this software without specific prior written permission.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE
FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL
DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR
SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER
CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY,
OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.

---

## Contact

Benjamin Reeves  
[EMAIL_ADDRESS]

---

## Acknowledgments

- Inspired by [Bibliothekai](https://bibliothekai.ktema.org/) by David M. Reed.
- Thanks to the open digital classics community ([Perseus Digital Library](http://www.perseus.tufts.edu/), [Logeion](https://logeion.uchicago.edu/)).
- Special thanks to the classical translators who have preserved and reinterpreted these timeless works across generations.
