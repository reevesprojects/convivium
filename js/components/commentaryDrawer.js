// Convivium Scholarly Commentary Drawer Component

import { StorageService } from "../services/storage.js";

export const CommentaryDrawer = {
  activeText: null,
  activeSegment: null,
  drawerEl: null,
  backdropEl: null,

  init() {
    // Create elements if not yet injected
    if (!document.getElementById("commentary-drawer-root")) {
      const root = document.createElement("div");
      root.id = "commentary-drawer-root";
      root.innerHTML = `
        <div class="drawer-backdrop" id="drawer-backdrop"></div>
        <aside class="commentary-drawer" id="commentary-drawer" aria-label="Scholarly Commentary Drawer">
          <div class="drawer-header">
            <div class="drawer-title">
              <span>📜</span>
              <span id="drawer-header-text">Commentary & Notes</span>
            </div>
            <button class="btn-icon" id="btn-close-drawer" title="Close Drawer (Esc)">✕</button>
          </div>
          <div class="drawer-content" id="drawer-body">
            <!-- Dynamic Content Injected Here -->
          </div>
        </aside>
      `;
      document.body.appendChild(root);

      this.drawerEl = document.getElementById("commentary-drawer");
      this.backdropEl = document.getElementById("drawer-backdrop");

      this.backdropEl.addEventListener("click", () => this.close());
      document.getElementById("btn-close-drawer").addEventListener("click", () => this.close());

      document.addEventListener("keydown", (e) => {
        if (e.key === "Escape" && this.isOpen()) {
          this.close();
        }
      });
    } else {
      this.drawerEl = document.getElementById("commentary-drawer");
      this.backdropEl = document.getElementById("drawer-backdrop");
    }
  },

  isOpen() {
    return this.drawerEl && this.drawerEl.classList.contains("open");
  },

  open(text, segmentRef) {
    this.init();
    this.activeText = text;
    this.activeSegment = text.segments.find(s => s.ref === segmentRef);

    if (!this.activeSegment) return;

    const drawerBody = document.getElementById("drawer-body");
    const drawerHeader = document.getElementById("drawer-header-text");
    const userNote = StorageService.getUserNotes(text.id, segmentRef);

    drawerHeader.textContent = `${text.title} — Line ${this.activeSegment.lineNum} (${segmentRef})`;

    drawerBody.innerHTML = `
      <!-- Source Reference Section -->
      <div class="drawer-section">
        <span class="drawer-section-title">Original Text (${text.language})</span>
        <div style="font-family: var(--font-serif-cormorant); font-size: 1.35rem; font-weight: 700; color: var(--text-primary); line-height: 1.4;">
          ${this.activeSegment.source}
        </div>
        ${this.activeSegment.literal ? `
          <div style="font-size: 0.9rem; color: var(--text-muted); font-style: italic; margin-top: 0.25rem;">
            <strong>Literal:</strong> ${this.activeSegment.literal}
          </div>
        ` : ''}
      </div>

      <!-- Meter & Scansion Analysis -->
      ${(this.activeSegment.scansion || this.activeSegment.meter || text.format.includes("Verse")) ? `
        <div class="drawer-section">
          <span class="drawer-section-title">⚡ Meter & Scansion</span>
          <div style="background-color: var(--bg-surface); border: 1px solid var(--border-subtle); border-radius: var(--radius-md); padding: 0.85rem 1rem;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.5rem;">
              <span class="pill pill-verse" style="font-weight: 700;">${this.activeSegment.meter || text.format}</span>
              <span style="font-size: 0.75rem; color: var(--text-muted);">– Long • ⏑ Short • ‖ Caesura</span>
            </div>
            <div class="scansion-display" style="font-family: var(--font-mono, monospace); font-size: 1.1rem; letter-spacing: 0.1em; color: var(--accent-primary); padding: 0.4rem 0;">
              ${this.activeSegment.scansion || "– ⏑ ⏑ | – ⏑ ⏑ | – ‖ ⏑ ⏑ | – ⏑ ⏑ | – ⏑ ⏑ | – –"}
            </div>
          </div>
        </div>
      ` : ''}

      <!-- Apparatus Criticus & Manuscript Variants -->
      ${this.activeSegment.variants && this.activeSegment.variants.length > 0 ? `
        <div class="drawer-section">
          <span class="drawer-section-title">🏛️ Apparatus Criticus & Variant Readings</span>
          <div class="apparatus-list" style="display: flex; flex-direction: column; gap: 0.75rem;">
            ${this.activeSegment.variants.map(v => `
              <div class="apparatus-item" style="background-color: var(--bg-surface); border-left: 3px solid var(--accent-gold); border-top: 1px solid var(--border-subtle); border-right: 1px solid var(--border-subtle); border-bottom: 1px solid var(--border-subtle); border-radius: 0 var(--radius-md) var(--radius-md) 0; padding: 0.85rem 1rem;">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.35rem;">
                  <strong style="font-family: var(--font-serif-cormorant); font-size: 1.15rem; color: var(--text-primary);">${v.reading}</strong>
                  <span class="pill pill-gold" style="font-size: 0.7rem;">${v.source}</span>
                </div>
                <div style="font-size: 0.88rem; color: var(--text-secondary); margin-bottom: 0.25rem;">
                  <em>Meaning:</em> ${v.meaning}
                </div>
                ${v.editorialNote ? `
                  <div style="font-size: 0.82rem; color: var(--text-muted); line-height: 1.4;">
                    <strong>Editorial Note:</strong> ${v.editorialNote}
                  </div>
                ` : ''}
              </div>
            `).join("")}
          </div>
        </div>
      ` : ''}

      <!-- Scholarly Commentary Note -->
      ${this.activeSegment.notes ? `
        <div class="drawer-section">
          <span class="drawer-section-title">Scholarly Commentary & Context</span>
          <div style="background-color: var(--bg-surface); border: 1px solid var(--border-subtle); border-radius: var(--radius-md); padding: 1rem; font-size: 0.92rem; line-height: 1.6; color: var(--text-secondary);">
            ${this.activeSegment.notes}
          </div>
        </div>
      ` : ''}

      <!-- Lexicon & Vocabulary Breakdown -->
      ${this.activeSegment.vocab && this.activeSegment.vocab.length > 0 ? `
        <div class="drawer-section">
          <span class="drawer-section-title">Lexicon & Grammatical Analysis</span>
          <div class="vocab-list">

            ${this.activeSegment.vocab.map(v => `
              <div class="vocab-item">
                <div class="vocab-word-row">
                  <span class="vocab-word">${v.word}</span>
                  <a href="${v.link}" target="_blank" rel="noopener" class="pill pill-gold" style="text-decoration: none; font-size: 0.65rem;">
                    Logeion / LSJ ↗
                  </a>
                </div>
                <div class="vocab-lemma">Lemma: <strong>${v.lemma}</strong></div>
                <div class="vocab-meaning">${v.meaning}</div>
              </div>
            `).join("")}
          </div>
        </div>
      ` : ''}

      <!-- Translations Comparison Matrix -->
      <div class="drawer-section">
        <span class="drawer-section-title">Renderings by Translator</span>
        <div style="display: flex; flex-direction: column; gap: 0.5rem;">
          ${Object.entries(this.activeSegment.translations || {}).map(([edId, line]) => {
            const ed = text.sourceEditions.find(e => e.id === edId);
            return `
              <div style="padding: 0.6rem 0.8rem; background-color: var(--bg-surface); border: 1px solid var(--border-subtle); border-radius: var(--radius-sm);">
                <div style="font-size: 0.75rem; font-weight: 700; color: var(--text-muted); margin-bottom: 0.2rem; text-transform: uppercase;">
                  ${ed ? ed.name : edId}
                </div>
                <div style="font-family: var(--font-serif-cormorant); font-size: 1.05rem; line-height: 1.4;">
                  ${line}
                </div>
              </div>
            `;
          }).join("")}
        </div>
      </div>

      <!-- Personal Scholar Note -->
      <div class="drawer-section">
        <span class="drawer-section-title">Personal Study Note (Auto-saved)</span>
        <textarea 
          class="user-note-area" 
          id="user-note-input" 
          placeholder="Type your personal observations, translation ideas, or reading notes here..."
        >${userNote}</textarea>
        <div style="display: flex; justify-content: flex-end; margin-top: 0.25rem;">
          <span id="note-save-status" style="font-size: 0.75rem; color: var(--text-muted);">
            ${userNote ? 'Saved to local storage' : ''}
          </span>
        </div>
      </div>
    `;

    // Note auto-save listener
    const noteInput = document.getElementById("user-note-input");
    const saveStatus = document.getElementById("note-save-status");
    let saveTimeout = null;

    noteInput.addEventListener("input", (e) => {
      saveStatus.textContent = "Typing...";
      clearTimeout(saveTimeout);
      saveTimeout = setTimeout(() => {
        StorageService.saveUserNote(text.id, segmentRef, e.target.value);
        saveStatus.textContent = "Saved to local storage ✓";
      }, 500);
    });

    this.drawerEl.classList.add("open");
    this.backdropEl.classList.add("open");
  },

  close() {
    if (this.drawerEl) this.drawerEl.classList.remove("open");
    if (this.backdropEl) this.backdropEl.classList.remove("open");
  }
};
