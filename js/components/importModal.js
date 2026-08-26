// Convivium Custom Text & Translation Alignment Wizard

import { StorageService } from "../services/storage.js";

export const ImportModal = {
  render(containerEl) {
    containerEl.innerHTML = `
      <div style="max-width: 900px; margin: 0 auto;">
        <div class="section-header">
          <div>
            <h2 class="section-title">➕ Import Custom Text & Translations</h2>
            <p style="color: var(--text-secondary); font-size: 0.95rem; margin-top: 0.25rem;">
              Add your own classical texts, student translations, or uncataloged editions. They will be stored securely in your browser's local library.
            </p>
          </div>
          <a href="#/catalog" class="btn btn-secondary btn-sm">&larr; Back to Catalog</a>
        </div>

        <div class="card" style="margin-bottom: 2rem;">
          <form id="import-form">
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 1rem; margin-bottom: 1.5rem;">
              <div>
                <label style="font-weight: 600; font-size: 0.85rem; display: block; margin-bottom: 0.25rem;">Work Title (English)</label>
                <input type="text" id="import-title" required placeholder="e.g. Oedipus Rex" class="filter-search-input" style="width: 100%;" />
              </div>
              <div>
                <label style="font-weight: 600; font-size: 0.85rem; display: block; margin-bottom: 0.25rem;">Original Title</label>
                <input type="text" id="import-orig-title" placeholder="e.g. Οἰδίπους Τύραννος" class="filter-search-input" style="width: 100%;" />
              </div>
              <div>
                <label style="font-weight: 600; font-size: 0.85rem; display: block; margin-bottom: 0.25rem;">Author</label>
                <input type="text" id="import-author" required placeholder="e.g. Sophocles" class="filter-search-input" style="width: 100%;" />
              </div>
              <div>
                <label style="font-weight: 600; font-size: 0.85rem; display: block; margin-bottom: 0.25rem;">Language</label>
                <select id="import-language" class="filter-search-input" style="width: 100%;">
                  <option value="Ancient Greek">Ancient Greek</option>
                  <option value="Latin">Latin</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </div>

            <!-- Alignment Inputs -->
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1.5rem; margin-bottom: 1.5rem;">
              <div>
                <label style="font-weight: 600; font-size: 0.85rem; display: block; margin-bottom: 0.25rem;">
                  Source Text Lines (Greek / Latin, 1 line per verse)
                </label>
                <textarea 
                  id="import-source-lines" 
                  required 
                  class="user-note-area" 
                  style="min-height: 220px; font-family: var(--font-serif-cormorant); font-size: 1.1rem;"
                  placeholder="ὦ τέκνα, Κάδμου τοῦ πάλαι νέα τροφή,&#10;τίνας ποθ᾽ ἕδρας τάσδε μοι θοάζετε&#10;ἱκτηρίοις κλάδοισιν ἐξεστεμμένοι;"
                ></textarea>
              </div>

              <div>
                <label style="font-weight: 600; font-size: 0.85rem; display: block; margin-bottom: 0.25rem;">
                  Translation 1 (Translator Name: <input type="text" id="import-trans1-name" placeholder="e.g. Robert Bagg" style="padding: 2px 6px; font-size: 0.8rem;" />)
                </label>
                <textarea 
                  id="import-trans1-lines" 
                  required 
                  class="user-note-area" 
                  style="min-height: 220px; font-family: var(--font-serif-cormorant); font-size: 1.1rem;"
                  placeholder="My children, latest brood of ancient Cadmus,&#10;what is the meaning of this sitting here,&#10;these branches twined with woolen suppliant bands?"
                ></textarea>
              </div>
            </div>

            <div style="display: flex; justify-content: space-between; align-items: center;">
              <button type="button" class="btn btn-secondary btn-sm" id="btn-load-sample-import">
                <span>🪄</span> Load Example Data
              </button>
              <button type="submit" class="btn btn-primary">
                <span>💾</span> Align & Save to Library
              </button>
            </div>
          </form>
        </div>
      </div>
    `;

    this.attachEventListeners(containerEl);
  },

  attachEventListeners(containerEl) {
    const form = containerEl.querySelector("#import-form");
    const loadSampleBtn = containerEl.querySelector("#btn-load-sample-import");

    loadSampleBtn.addEventListener("click", () => {
      containerEl.querySelector("#import-title").value = "Oedipus Rex";
      containerEl.querySelector("#import-orig-title").value = "Οἰδίπους Τύραννος";
      containerEl.querySelector("#import-author").value = "Sophocles";
      containerEl.querySelector("#import-language").value = "Ancient Greek";
      containerEl.querySelector("#import-trans1-name").value = "Robert Bagg (1982)";
      containerEl.querySelector("#import-source-lines").value = 
`ὦ τέκνα, Κάδμου τοῦ πάλαι νέα τροφή,
τίνας ποθ᾽ ἕδρας τάσδε μοι θοάζετε
ἱκτηρίοις κλάδοισιν ἐξεστεμμένοι;
πόλις δ᾽ ὁμοῦ μὲν θυμιαμάτων γέμει,
ὁμοῦ δὲ παιάνων τε καὶ στεναγμάτων:`;
      containerEl.querySelector("#import-trans1-lines").value = 
`My children, newest generation of old Cadmus,
why do you sit before me in this posture of prayer,
wreathed with suppliant branches?
The city is heavy with incense smoke,
and at the same time echoes with hymns and cries of sorrow.`;
    });

    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const title = containerEl.querySelector("#import-title").value.trim();
      const origTitle = containerEl.querySelector("#import-orig-title").value.trim();
      const author = containerEl.querySelector("#import-author").value.trim();
      const language = containerEl.querySelector("#import-language").value;
      const transName = containerEl.querySelector("#import-trans1-name").value.trim() || "User Translation";
      const sourceRaw = containerEl.querySelector("#import-source-lines").value.trim();
      const transRaw = containerEl.querySelector("#import-trans1-lines").value.trim();

      const sourceLines = sourceRaw.split("\n").map(l => l.trim()).filter(l => l.length > 0);
      const transLines = transRaw.split("\n").map(l => l.trim()).filter(l => l.length > 0);

      const id = "custom-" + title.toLowerCase().replace(/[^a-z0-9]/g, "-") + "-" + Date.now();
      const transId = "trans-1";

      const segments = sourceLines.map((src, index) => {
        return {
          ref: `1.${index + 1}`,
          lineNum: index + 1,
          source: src,
          literal: "",
          translations: {
            [transId]: transLines[index] || ""
          }
        };
      });

      const newText = {
        id,
        isCustom: true,
        title,
        originalTitle: origTitle || title,
        authorId: author.toLowerCase().replace(/[^a-z0-9]/g, "-"),
        language,
        date: "Classical Era",
        format: "Verse",
        genre: "Custom Addition",
        description: `Custom aligned translation of ${title} by ${author}.`,
        passageRef: `Lines 1–${segments.length}`,
        commentaryCount: 0,
        tags: ["Custom", "Facing Text", "Verse"],
        sourceEditions: [
          { id: "greek", name: `Original (${language})`, year: "Original", type: "source", format: "Verse" },
          { id: transId, name: transName, year: "Modern", type: "translation", format: "Verse" }
        ],
        segments
      };

      StorageService.saveCustomText(newText);
      alert(`"${title}" has been successfully aligned and saved to your library!`);
      window.location.hash = `#/compare/${id}`;
    });
  }
};
