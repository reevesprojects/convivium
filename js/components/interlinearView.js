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
  currentSection: null, // Section ID for passage navigation

  init(textId, targetSegmentRef = null) {
    const customTexts = StorageService.getCustomTexts();
    this.text = [...TEXTS, ...customTexts].find(t => t.id === textId);
    if (!this.text) return false;

    const settings = StorageService.getSettings();
    this.diffMode = settings.diffHighlight || false;

    const validEdIds = new Set(this.text.sourceEditions.filter(e => e.type === "translation").map(e => e.id));
    const allValid = this.activeEditions && this.activeEditions.length > 0 && this.activeEditions.every(id => validEdIds.has(id));

    if (!allValid) {
      this.activeEditions = this.text.sourceEditions.filter(e => e.type === "translation").map(e => e.id).slice(0, 3);
    }

    if (targetSegmentRef) {
      this.selectedSegmentRef = targetSegmentRef;
    }

    // Default to first section if the text has sections
    if (this.text.sections && this.text.sections.length > 0) {
      const validSectionIds = new Set(this.text.sections.map(s => s.id));
      if (!this.currentSection || !validSectionIds.has(this.currentSection)) {
        this.currentSection = this.text.sections[0].id;
      }
    } else {
      this.currentSection = null;
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

    // Compute visible segments (filtered by current section)
    const hasSections = this.text.sections && this.text.sections.length > 1;
    let visibleSegments = this.text.segments;
    if (hasSections && this.currentSection) {
      const section = this.text.sections.find(s => s.id === this.currentSection);
      if (section) {
        const refSet = new Set(section.segmentRefs);
        visibleSegments = this.text.segments.filter(seg => refSet.has(seg.ref));
      }
    }
    const currentSectionObj = hasSections ? this.text.sections.find(s => s.id === this.currentSection) : null;
    const currentSectionIdx = hasSections ? this.text.sections.findIndex(s => s.id === this.currentSection) : -1;
    const prevSection = hasSections && currentSectionIdx > 0 ? this.text.sections[currentSectionIdx - 1] : null;
    const nextSection = hasSections && currentSectionIdx < this.text.sections.length - 1 ? this.text.sections[currentSectionIdx + 1] : null;

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

      <!-- Passage Navigator Bar (only when sections exist) -->
      ${hasSections ? `
      <div class="passage-nav-bar">
        <span class="passage-nav-label">📜 Passage:</span>
        <button class="passage-nav-arrow ${!prevSection ? 'disabled' : ''}" id="btn-passage-prev" ${!prevSection ? 'disabled' : ''}>‹</button>
        <div class="passage-nav-dropdown-wrap">
          <button class="passage-nav-current" id="btn-passage-select">
            <span class="passage-nav-current-title">${currentSectionObj ? currentSectionObj.title : 'Select Passage'}</span>
            <span class="passage-nav-caret">▼</span>
          </button>
          <div class="passage-nav-menu" id="passage-nav-menu">
            ${this.text.sections.map((sec, i) => `
              <button class="passage-nav-menu-item ${sec.id === this.currentSection ? 'active' : ''}" data-section-id="${sec.id}">
                <span class="passage-nav-menu-num">${i + 1}</span>
                <span class="passage-nav-menu-title">${sec.title}</span>
                ${sec.id === this.currentSection ? '<span class="passage-nav-menu-check">✓</span>' : ''}
              </button>
            `).join('')}
          </div>
        </div>
        <button class="passage-nav-arrow ${!nextSection ? 'disabled' : ''}" id="btn-passage-next" ${!nextSection ? 'disabled' : ''}>›</button>
        <span class="passage-nav-count">${currentSectionIdx + 1} / ${this.text.sections.length}</span>
      </div>
      ` : ''}

      <!-- Editions Selector Bar: Active Columns + Add Dropdown -->
      <div class="editions-selector-bar">
        <span style="font-size: 0.75rem; font-weight: 700; text-transform: uppercase; color: var(--text-muted);">
          Active Translators:
        </span>
        
        <!-- Active Translator Chips -->
        ${this.activeEditions.map(edId => {
          const ed = this.text.sourceEditions.find(e => e.id === edId);
          if (!ed) return '';
          return `
            <button class="edition-toggle-chip active" data-trans-id="${ed.id}" title="Click to remove translator">
              <span>✒️ ${ed.name}</span>
              ${this.activeEditions.length > 1 ? '<span style="font-size: 0.7rem; opacity: 0.7; margin-left: 2px;">✕</span>' : ''}
            </button>
          `;
        }).join("")}

        <!-- Add Translator Dropdown Button -->
        <div class="add-edition-dropdown">
          <button class="btn-add-edition" id="btn-toggle-add-trans-menu" title="Add another translation">
            <span>➕ Add Translation</span>
            <span style="font-size: 0.65rem; opacity: 0.8;">▼</span>
          </button>

          <div class="add-edition-menu" id="add-trans-menu">
            <div class="add-edition-menu-header">Select Translator to Compare</div>
            ${this.text.sourceEditions.filter(e => e.type === "translation").map(ed => {
              const isActive = this.activeEditions.includes(ed.id);
              return `
                <button class="edition-menu-item ${isActive ? 'active' : ''}" data-toggle-trans="${ed.id}">
                  <div class="edition-menu-item-info">
                    <span class="edition-menu-item-name">✒️ ${ed.name}</span>
                    <span class="edition-menu-item-meta">${ed.year || ''} ${ed.format ? '• ' + ed.format : ''} ${ed.highlights ? '• ' + ed.highlights : ''}</span>
                  </div>
                  <span class="edition-menu-item-check">${isActive ? '✓' : '+'}</span>
                </button>
              `;
            }).join("")}
          </div>
        </div>
      </div>

      <!-- Interlinear Cards List -->
      <div class="interlinear-list">
        ${visibleSegments.map(seg => {
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
    // ── Passage Navigator ──────────────────────────────────────────────────
    const hasSections = this.text.sections && this.text.sections.length > 1;
    if (hasSections) {
      const prevBtn = containerEl.querySelector("#btn-passage-prev");
      const nextBtn = containerEl.querySelector("#btn-passage-next");
      const selectBtn = containerEl.querySelector("#btn-passage-select");
      const navMenu = containerEl.querySelector("#passage-nav-menu");

      prevBtn?.addEventListener("click", () => {
        const idx = this.text.sections.findIndex(s => s.id === this.currentSection);
        if (idx > 0) {
          this.currentSection = this.text.sections[idx - 1].id;
          this.render(containerEl);
        }
      });

      nextBtn?.addEventListener("click", () => {
        const idx = this.text.sections.findIndex(s => s.id === this.currentSection);
        if (idx < this.text.sections.length - 1) {
          this.currentSection = this.text.sections[idx + 1].id;
          this.render(containerEl);
        }
      });

      const positionMenu = () => {
        if (!navMenu || !selectBtn) return;
        const rect = selectBtn.getBoundingClientRect();
        navMenu.style.top = `${rect.bottom + 6}px`;
        navMenu.style.left = `${rect.left}px`;
        navMenu.style.width = `${Math.max(320, rect.width)}px`;
      };

      selectBtn?.addEventListener("click", (e) => {
        e.stopPropagation();
        const isOpen = navMenu.classList.toggle("open");
        selectBtn.classList.toggle("open", isOpen);
        if (isOpen) positionMenu();
      });

      containerEl.querySelectorAll("[data-section-id]").forEach(item => {
        item.addEventListener("click", (e) => {
          e.stopPropagation();
          this.currentSection = item.dataset.sectionId;
          this.render(containerEl);
        });
      });

      const closeNavMenu = (evt) => {
        if (navMenu && !navMenu.contains(evt.target) && evt.target !== selectBtn) {
          navMenu.classList.remove("open");
          selectBtn?.classList.remove("open");
          document.removeEventListener("click", closeNavMenu);
        }
      };
      document.addEventListener("click", closeNavMenu);
    }

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

    // Remove active translator chip
    containerEl.querySelectorAll("[data-trans-id]").forEach(chip => {
      chip.addEventListener("click", () => {
        const id = chip.dataset.transId;
        if (this.activeEditions.length > 1) {
          this.activeEditions = this.activeEditions.filter(e => e !== id);
          this.render(containerEl);
        }
      });
    });

    // Toggle Add Translator Dropdown Menu
    const addTransBtn = containerEl.querySelector("#btn-toggle-add-trans-menu");
    const addTransMenu = containerEl.querySelector("#add-trans-menu");
    if (addTransBtn && addTransMenu) {
      addTransBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        addTransMenu.classList.toggle("open");
      });

      const closeMenu = (evt) => {
        if (!addTransMenu.contains(evt.target) && evt.target !== addTransBtn) {
          addTransMenu.classList.remove("open");
        }
      };
      document.addEventListener("click", closeMenu);
    }

    // Toggle Translator from Dropdown
    containerEl.querySelectorAll("[data-toggle-trans]").forEach(item => {
      item.addEventListener("click", (e) => {
        e.stopPropagation();
        const id = item.dataset.toggleTrans;
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
