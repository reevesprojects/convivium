// Convivium Interlinear & Stacked Comparative View Component

import { TEXTS } from "../data/texts.js";
import { AUTHORS } from "../data/authors.js";
import { TRANSLATORS } from "../data/translators.js";
import { StorageService } from "../services/storage.js";
import { DiffService } from "../services/diff.js";
import { CommentaryDrawer } from "./commentaryDrawer.js";

export const InterlinearView = {
  text: null,
  activeEditions: [],
  selectedSegmentRef: null,
  diffMode: false,

  init(textId, targetSegmentRef = null) {
    const customTexts = StorageService.getCustomTexts();
    this.text = [...TEXTS, ...customTexts].find(t => t.id === textId);
    if (!this.text) return false;

    const settings = StorageService.getSettings();
    this.diffMode = settings.diffHighlight || false;

    const validEdIds = new Set(this.text.sourceEditions.filter(e => e.type === "translation").map(e => e.id));
    const allValid = this.activeEditions && this.activeEditions.length > 0 && this.activeEditions.every(id => validEdIds.has(id));

    if (!allValid) {
      this.activeEditions = this.text.sourceEditions.filter(e => e.type === "translation").map(e => e.id);
    }

    if (targetSegmentRef) {
      this.selectedSegmentRef = targetSegmentRef;
    }

    return true;
  },

  render(containerEl) {
    if (!this.text) {
      containerEl.innerHTML = `<div style="padding: 2rem; text-align: center;">Text not found.</div>`;
      return;
    }

    this.activeEditions = this.activeEditions.filter(edId => this.text.sourceEditions.some(e => e.id === edId));
    if (this.activeEditions.length === 0) {
      this.activeEditions = this.text.sourceEditions.filter(e => e.type === "translation").map(e => e.id);
    }

    const author = AUTHORS.find(a => a.id === this.text.authorId);
    const authorName = author ? author.name : this.text.authorId;
    const settings = StorageService.getSettings();

    containerEl.innerHTML = `
      <!-- Studio Toolbar -->
      <div class="studio-toolbar">
        <div class="studio-title-block">
          <a href="#/texts/${this.text.id}" class="back-btn">
            &larr; Overview
          </a>
          <div>
            <div class="studio-work-title">${this.text.title} <span style="font-size: 0.9rem; color: var(--text-muted); font-weight: normal;">(${this.text.originalTitle})</span></div>
            <div class="studio-work-author">${authorName} • Interlinear Stacked View</div>
          </div>
        </div>

        <div class="studio-controls-group">
          <!-- View Switcher -->
          <div class="toggle-group">
            <button class="toggle-btn" id="btn-view-parallel-switch" title="Side-by-side parallel columns">
              <span>⫼</span> Parallel
            </button>
            <button class="toggle-btn active" id="btn-view-interlinear-switch" title="Line-by-line stacked view">
              <span>☰</span> Interlinear
            </button>
          </div>

          <!-- Diff Toggle -->
          <button class="btn btn-secondary btn-sm ${this.diffMode ? 'active' : ''}" id="btn-toggle-interlinear-diff">
            <span>✨</span> Diff: <strong>${this.diffMode ? 'ON' : 'OFF'}</strong>
          </button>
        </div>
      </div>

      <!-- Editions Toggle Filter -->
      <div class="editions-selector-bar">
        <span style="font-size: 0.75rem; font-weight: 700; text-transform: uppercase; color: var(--text-muted);">
          Compare Translators:
        </span>
        ${this.text.sourceEditions.filter(e => e.type === "translation").map(ed => {
          const isActive = this.activeEditions.includes(ed.id);
          return `
            <button class="edition-toggle-chip ${isActive ? 'active' : ''}" data-trans-id="${ed.id}">
              <span class="chip-check">${isActive ? '✓' : '+'}</span>
              <span>✒️ ${ed.name}</span>
            </button>
          `;
        }).join("")}
      </div>

      <!-- Interlinear Cards List -->
      <div class="interlinear-list" style="--user-font-size: ${settings.fontSize}px; --user-line-height: ${settings.lineHeight};">
        ${this.text.segments.map(seg => {
          const isBookmarked = StorageService.isBookmarked(this.text.id, seg.ref);
          const transTexts = Object.values(seg.translations || {});

          return `
            <div class="interlinear-card" data-seg-ref="${seg.ref}">
              <div class="interlinear-card-header">
                <div class="interlinear-ref">
                  📍 Line ${seg.lineNum} (${seg.ref})
                </div>
                <div style="display: flex; gap: 0.5rem; align-items: center;">
                  <button class="btn btn-ghost btn-sm btn-bookmark" data-ref="${seg.ref}" title="Bookmark this verse">
                    ${isBookmarked ? '⭐ Saved' : '☆ Bookmark'}
                  </button>
                  <button class="btn btn-primary btn-sm btn-open-notes" data-ref="${seg.ref}">
                    <span>📜 Commentary & Notes</span>
                  </button>
                </div>
              </div>

              <!-- Source Greek/Latin Box -->
              <div class="interlinear-source-block">
                <div class="interlinear-source-text font-cardo">
                  ${seg.source}
                </div>
                ${seg.literal ? `
                  <div class="literal-gloss">
                    <strong>Literal Gloss:</strong> ${seg.literal}
                  </div>
                ` : ''}
              </div>

              <!-- Stacked Translations -->
              <div class="interlinear-translations-grid">
                ${this.activeEditions.map(edId => {
                  const ed = this.text.sourceEditions.find(e => e.id === edId);
                  if (!ed) return '';
                  const transMap = seg.translations || {};
                  const rawLine = transMap[edId] || `[Line not translated]`;
                  const formattedLine = this.diffMode && transMap[edId]
                    ? DiffService.highlightVariance(transMap[edId], transTexts)
                    : rawLine;

                  return `
                    <div class="interlinear-trans-item">
                      <div class="interlinear-trans-header">
                        <span class="interlinear-trans-author">
                          ✒️ ${ed.name || edId} (${ed.year || ''})
                        </span>
                        ${ed.meter ? `<span class="pill pill-verse" style="font-size: 0.65rem;">${ed.meter}</span>` : ''}
                      </div>
                      <div class="interlinear-trans-text">
                        ${formattedLine}
                      </div>
                    </div>
                  `;
                }).join("")}
              </div>
            </div>
          `;
        }).join("")}
      </div>
    `;

    this.attachEventListeners(containerEl);
  },

  attachEventListeners(containerEl) {
    // Switch to parallel view
    containerEl.querySelector("#btn-view-parallel-switch")?.addEventListener("click", () => {
      window.location.hash = `#/compare/${this.text.id}`;
    });

    // Toggle diff
    containerEl.querySelector("#btn-toggle-interlinear-diff")?.addEventListener("click", () => {
      this.diffMode = !this.diffMode;
      StorageService.updateSetting("diffHighlight", this.diffMode);
      this.render(containerEl);
    });

    // Toggle Editions
    containerEl.querySelectorAll("[data-trans-id]").forEach(chip => {
      chip.addEventListener("click", () => {
        const id = chip.dataset.transId;
        if (this.activeEditions.includes(id)) {
          if (this.activeEditions.length > 1) {
            this.activeEditions = this.activeEditions.filter(e => e !== id);
          }
        } else {
          this.activeEditions.push(id);
        }
        this.render(containerEl);
      });
    });

    // Commentary buttons
    containerEl.querySelectorAll(".btn-open-notes").forEach(btn => {
      btn.addEventListener("click", () => {
        const ref = btn.dataset.ref;
        CommentaryDrawer.open(this.text, ref);
      });
    });

    // Bookmark buttons
    containerEl.querySelectorAll(".btn-bookmark").forEach(btn => {
      btn.addEventListener("click", () => {
        const ref = btn.dataset.ref;
        const bookmarked = StorageService.toggleBookmark({
          textId: this.text.id,
          textTitle: this.text.title,
          segmentRef: ref
        });
        btn.innerHTML = bookmarked ? '⭐ Saved' : '☆ Bookmark';
      });
    });
  }
};
