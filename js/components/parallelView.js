// Convivium Parallel Comparison Studio Component

import { TEXTS } from "../data/texts.js";
import { AUTHORS } from "../data/authors.js";
import { TRANSLATORS } from "../data/translators.js";
import { StorageService } from "../services/storage.js";
import { DiffService } from "../services/diff.js";
import { CommentaryDrawer } from "./commentaryDrawer.js";

export const ParallelView = {
  text: null,
  activeEditions: [], // Array of edition IDs currently displayed
  selectedSegmentRef: null,
  diffMode: false,
  showLiteral: true,
  showScansion: false,
  currentSection: null, // Section ID for passage navigation

  init(textId, targetSegmentRef = null) {
    const customTexts = StorageService.getCustomTexts();
    this.text = [...TEXTS, ...customTexts].find(t => t.id === textId);
    if (!this.text) return false;

    const settings = StorageService.getSettings();
    this.diffMode = settings.diffHighlight || false;
    this.showLiteral = settings.showLiteralGloss !== false;

    // Validate and initialize active editions for the current text
    const validEdIds = new Set(this.text.sourceEditions.map(e => e.id));
    const allValid = Array.isArray(this.activeEditions) && this.activeEditions.length > 0 && this.activeEditions.every(id => validEdIds.has(id));

    if (!allValid) {
      const sourceEd = this.text.sourceEditions.find(e => e.type === "source")?.id || this.text.sourceEditions[0]?.id;
      const transEds = this.text.sourceEditions.filter(e => e.type === "translation").map(e => e.id).slice(0, 3);
      this.activeEditions = [sourceEd, ...transEds].filter(Boolean);
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
      containerEl.innerHTML = `<div style="padding: 2rem; text-align: center;">Text not found. <a href="#/catalog">Return to Catalog</a></div>`;
      return;
    }

    // Sanitize active editions to only include existing editions for this text
    this.activeEditions = this.activeEditions.filter(edId => this.text.sourceEditions.some(e => e.id === edId));
    if (this.activeEditions.length === 0) {
      const sourceEd = this.text.sourceEditions.find(e => e.type === "source")?.id || this.text.sourceEditions[0]?.id;
      const transEds = this.text.sourceEditions.filter(e => e.type === "translation").map(e => e.id).slice(0, 3);
      this.activeEditions = [sourceEd, ...transEds].filter(Boolean);
    }

    const author = AUTHORS.find(a => a.id === this.text.authorId);
    const authorName = author ? author.name : this.text.authorId;
    const settings = StorageService.getSettings();

    // Compute visible segments (filtered by current section if sections exist)
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

    // Compute active columns count for CSS Grid
    const colCount = this.activeEditions.length;
    const gridTemplateCols = colCount <= 1 
      ? `minmax(280px, 1fr)` 
      : `minmax(280px, 1.2fr) ` + Array(Math.max(0, colCount - 1)).fill("minmax(260px, 1fr)").join(" ");

    containerEl.innerHTML = `
      <!-- Studio Toolbar -->
      <div class="studio-toolbar">
        <div class="studio-title-block">
          <a href="#/texts/${this.text.id}" class="back-btn">
            &larr; Overview
          </a>
          <div>
            <div class="studio-work-title">${this.text.title} <span style="font-size: 0.9rem; color: var(--text-muted); font-weight: normal;">(${this.text.originalTitle})</span></div>
            <div class="studio-work-author">${authorName} • ${this.text.passageRef}</div>
          </div>
        </div>

        <div class="studio-controls-group">
          <!-- View Switcher -->
          <div class="toggle-group">
            <button class="toggle-btn active" id="btn-view-parallel" title="Side-by-side parallel columns">
              <span>⫼</span> Parallel
            </button>
            <button class="toggle-btn" id="btn-view-interlinear" title="Line-by-line stacked view">
              <span>☰</span> Interlinear
            </button>
          </div>

          <!-- Diff Toggle -->
          <button class="btn btn-secondary btn-sm ${this.diffMode ? 'active' : ''}" id="btn-toggle-diff" title="Highlight lexical variance across translations">
            <span>✨</span> Diff: <strong>${this.diffMode ? 'ON' : 'OFF'}</strong>
          </button>

          <!-- Meter & Scansion Toggle -->
          <button class="btn btn-secondary btn-sm ${this.showScansion ? 'active' : ''}" id="btn-toggle-scansion" title="Show metrical feet and scansion (– ⏑ ⏑)">
            <span>⚡</span> Meter: <strong>${this.showScansion ? 'ON' : 'OFF'}</strong>
          </button>

          <!-- Literal Gloss Toggle -->
          <button class="btn btn-secondary btn-sm ${this.showLiteral ? 'active' : ''}" id="btn-toggle-literal" title="Toggle word-by-word literal English gloss">
            <span>📖</span> Gloss: <strong>${this.showLiteral ? 'ON' : 'OFF'}</strong>
          </button>

        </div>
      </div>


      <!-- Passage Navigator Bar (only when sections exist) -->
      ${hasSections ? `
      <div class="passage-nav-bar">
        <span class="passage-nav-label">📜 Passage:</span>

        <button class="passage-nav-arrow ${!prevSection ? 'disabled' : ''}" id="btn-passage-prev" title="${prevSection ? 'Previous: ' + prevSection.title : 'No previous passage'}" ${!prevSection ? 'disabled' : ''}>
          ‹
        </button>

        <div class="passage-nav-dropdown-wrap">
          <button class="passage-nav-current" id="btn-passage-select" title="Jump to another passage">
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

        <button class="passage-nav-arrow ${!nextSection ? 'disabled' : ''}" id="btn-passage-next" title="${nextSection ? 'Next: ' + nextSection.title : 'No next passage'}" ${!nextSection ? 'disabled' : ''}>
          ›
        </button>

        <span class="passage-nav-count">${currentSectionIdx + 1} / ${this.text.sections.length}</span>
      </div>
      ` : ''}

      <!-- Edition Selector Bar: Active Columns + Add Dropdown -->
      <div class="editions-selector-bar">
        <span style="font-size: 0.75rem; font-weight: 700; text-transform: uppercase; color: var(--text-muted);">
          Active Columns:
        </span>
        
        <!-- Active Edition Chips -->
        ${this.activeEditions.map(edId => {
          const ed = this.text.sourceEditions.find(e => e.id === edId);
          if (!ed) return '';
          const isSource = ed.type === "source";
          return `
            <button class="edition-toggle-chip active" data-ed-id="${ed.id}" title="Click to remove column">
              <span>${isSource ? '🏛️ ' + ed.name : '✒️ ' + ed.name}</span>
              ${this.activeEditions.length > 1 ? '<span style="font-size: 0.7rem; opacity: 0.7; margin-left: 2px;">✕</span>' : ''}
            </button>
          `;
        }).join("")}

        <!-- Add Edition Dropdown Button -->
        <div class="add-edition-dropdown">
          <button class="btn-add-edition" id="btn-toggle-add-edition-menu" title="Add another translation or source column">
            <span>➕ Add Translation</span>
            <span style="font-size: 0.65rem; opacity: 0.8;">▼</span>
          </button>

          <div class="add-edition-menu" id="add-edition-menu">
            <div class="add-edition-menu-header">Select Edition to Compare</div>
            ${this.text.sourceEditions.map(ed => {
              const isActive = this.activeEditions.includes(ed.id);
              const isSource = ed.type === "source";
              return `
                <button class="edition-menu-item ${isActive ? 'active' : ''}" data-toggle-ed="${ed.id}">
                  <div class="edition-menu-item-info">
                    <span class="edition-menu-item-name">${isSource ? '🏛️ ' + ed.name : '✒️ ' + ed.name}</span>
                    <span class="edition-menu-item-meta">${ed.year || ''} ${ed.format ? '• ' + ed.format : ''} ${ed.highlights ? '• ' + ed.highlights : ''}</span>
                  </div>
                  <span class="edition-menu-item-check">${isActive ? '✓' : '+'}</span>
                </button>
              `;
            }).join("")}
          </div>
        </div>
      </div>

      <!-- Parallel Studio Grid -->
      <div class="parallel-studio-container">
        <!-- Grid Header Row -->
        <div class="parallel-header-row" style="grid-template-columns: ${gridTemplateCols};">
          ${this.activeEditions.map(edId => {
            const ed = this.text.sourceEditions.find(e => e.id === edId);
            if (!ed) return '';
            const isSource = ed.type === "source";

            return `
              <div class="parallel-col-header ${isSource ? 'source-header' : ''}">
                <div class="col-header-title">
                  <span>${ed.name || edId}</span>
                  ${this.activeEditions.length > 2 ? `
                    <button class="btn-icon btn-remove-col" data-remove-ed="${ed.id}" title="Hide this column" style="width: 22px; height: 22px; font-size: 0.8rem;">
                      ✕
                    </button>
                  ` : ''}
                </div>
                <div class="col-header-meta">
                  <span>${ed.year || ''}</span>
                  ${ed.meter ? `• <span>${ed.meter}</span>` : ''}
                  ${ed.format ? `<span class="pill pill-verse" style="padding: 0.1rem 0.4rem; font-size: 0.65rem;">${ed.format}</span>` : ''}
                </div>
              </div>
            `;
          }).join("")}
        </div>

        <!-- Grid Body Rows -->
        <div class="parallel-body">
          ${visibleSegments.map(seg => {
            const isSelected = this.selectedSegmentRef === seg.ref;
            
            // Extract all translation texts for diff computation
            const transTexts = Object.values(seg.translations || {});

            return `
              <div 
                class="parallel-row ${isSelected ? 'selected-row' : ''}" 
                data-seg-ref="${seg.ref}"
                style="grid-template-columns: ${gridTemplateCols};"
              >
                ${this.activeEditions.map(edId => {
                  const ed = this.text.sourceEditions.find(e => e.id === edId);
                  if (!ed) return '';
                  const isSource = ed.type === "source";

                  if (isSource) {
                    let sourceHtml = seg.source;
                    if (seg.vocab && seg.vocab.length > 0) {
                      seg.vocab.forEach(v => {
                        const regex = new RegExp(`(${v.word})`, "g");
                        sourceHtml = sourceHtml.replace(regex, `<span class="lexicon-word" data-lemma="${v.lemma}" data-meaning="${v.meaning}" data-link="${v.link}">$1</span>`);
                      });
                    }

                    return `
                      <div class="parallel-cell source-cell">
                        <div class="line-meta-badge">
                          <span>Line ${seg.lineNum} (${seg.ref})</span>
                          <div style="display: flex; gap: 0.35rem; align-items: center;">
                            ${seg.variants && seg.variants.length > 0 ? `
                              <span class="variant-tag" title="Variant readings / Apparatus Criticus in manuscripts" data-trigger-apparatus="${seg.ref}">
                                🏛️ var
                              </span>
                            ` : ''}
                            ${seg.notes ? `<span class="has-commentary-dot" title="Scholarly commentary available"></span>` : ''}
                          </div>
                        </div>
                        ${this.showScansion ? `
                          <div class="inline-scansion-line" title="Metrical scansion pattern">
                            ${seg.scansion || "– ⏑ ⏑ | – ⏑ ⏑ | – ‖ ⏑ ⏑ | – ⏑ ⏑ | – ⏑ ⏑ | – –"}
                          </div>
                        ` : ''}
                        <div class="source-text" style="font-weight: 600; color: var(--text-primary);">
                          ${sourceHtml}
                        </div>
                        ${this.showLiteral && seg.literal ? `
                          <div class="literal-gloss">${seg.literal}</div>
                        ` : ''}
                      </div>
                    `;

                  } else {
                    const transMap = seg.translations || {};
                    const rawLine = transMap[edId] || `<span style="color: var(--text-muted); font-style: italic;">[Line not aligned]</span>`;
                    const formattedLine = this.diffMode && transMap[edId] 
                      ? DiffService.highlightVariance(transMap[edId], transTexts)
                      : rawLine;
                    const edLabel = ed.name ? ed.name.split(" (")[0] : edId;

                    return `
                      <div class="parallel-cell">
                        <div class="line-meta-badge">
                          <span>${edLabel}</span>
                        </div>
                        <div class="translation-line">
                          ${formattedLine}
                        </div>
                      </div>
                    `;
                  }
                }).join("")}
              </div>
            `;
          }).join("")}
        </div>
      </div>
    `;

    this.attachEventListeners(containerEl);

    // If there is an active selected segment, scroll it into view and open commentary
    if (this.selectedSegmentRef) {
      setTimeout(() => {
        const targetRow = containerEl.querySelector(`[data-seg-ref="${this.selectedSegmentRef}"]`);
        if (targetRow) {
          targetRow.scrollIntoView({ behavior: "smooth", block: "center" });
          CommentaryDrawer.open(this.text, this.selectedSegmentRef);
        }
      }, 150);
    }
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

    // Row hover synchronization
    const rows = containerEl.querySelectorAll(".parallel-row");
    rows.forEach(row => {
      row.addEventListener("mouseenter", () => {
        row.classList.add("hovered-row");
      });
      row.addEventListener("mouseleave", () => {
        row.classList.remove("hovered-row");
      });

      // Row click: select row and open Commentary Drawer
      row.addEventListener("click", () => {
        rows.forEach(r => r.classList.remove("selected-row"));
        row.classList.add("selected-row");
        const ref = row.dataset.segRef;
        this.selectedSegmentRef = ref;
        StorageService.saveLastVisited(this.text.id, ref);
        CommentaryDrawer.open(this.text, ref);
      });
    });

    // Keyboard navigation (ArrowDown / ArrowUp between segments)
    const handleKeyNav = (e) => {
      if (e.key !== "ArrowDown" && e.key !== "ArrowUp") return;
      if (document.activeElement && document.activeElement.tagName === "TEXTAREA") return;
      e.preventDefault();
      const rowArr = [...containerEl.querySelectorAll(".parallel-row")];
      if (!rowArr.length) return;
      const currentIdx = rowArr.findIndex(r => r.classList.contains("selected-row"));
      let nextIdx = e.key === "ArrowDown"
        ? (currentIdx < 0 ? 0 : Math.min(currentIdx + 1, rowArr.length - 1))
        : Math.max((currentIdx < 0 ? 0 : currentIdx) - 1, 0);
      rowArr.forEach(r => r.classList.remove("selected-row"));
      rowArr[nextIdx].classList.add("selected-row");
      rowArr[nextIdx].scrollIntoView({ behavior: "smooth", block: "nearest" });
      const ref = rowArr[nextIdx].dataset.segRef;
      this.selectedSegmentRef = ref;
      StorageService.saveLastVisited(this.text.id, ref);
      CommentaryDrawer.open(this.text, ref);
    };
    // Remove previous listener before adding (prevent duplicates on re-render)
    document.removeEventListener("keydown", this._keyNavHandler);
    this._keyNavHandler = handleKeyNav;
    document.addEventListener("keydown", this._keyNavHandler);


    containerEl.querySelectorAll(".edition-toggle-chip").forEach(chip => {
      chip.addEventListener("click", () => {
        const edId = chip.dataset.edId;
        if (this.activeEditions.length > 1) {
          this.activeEditions = this.activeEditions.filter(id => id !== edId);
          this.render(containerEl);
        }
      });
    });

    // Toggle Add Edition Dropdown Menu
    const addMenuBtn = containerEl.querySelector("#btn-toggle-add-edition-menu");
    const addMenu = containerEl.querySelector("#add-edition-menu");
    if (addMenuBtn && addMenu) {
      addMenuBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        addMenu.classList.toggle("open");
      });

      const closeMenu = (evt) => {
        if (!addMenu.contains(evt.target) && evt.target !== addMenuBtn) {
          addMenu.classList.remove("open");
        }
      };
      document.addEventListener("click", closeMenu);
    }

    // Toggle Edition from Dropdown
    containerEl.querySelectorAll(".edition-menu-item").forEach(item => {
      item.addEventListener("click", (e) => {
        e.stopPropagation();
        const edId = item.dataset.toggleEd;
        if (this.activeEditions.includes(edId)) {
          if (this.activeEditions.length > 1) {
            this.activeEditions = this.activeEditions.filter(id => id !== edId);
          }
        } else {
          this.activeEditions.push(edId);
        }
        this.render(containerEl);
      });
    });

    // Remove Column button in table headers
    containerEl.querySelectorAll(".btn-remove-col").forEach(btn => {
      btn.addEventListener("click", (e) => {
        e.stopPropagation();
        const edId = btn.dataset.removeEd;
        if (this.activeEditions.length > 1) {
          this.activeEditions = this.activeEditions.filter(id => id !== edId);
          this.render(containerEl);
        }
      });
    });

    // Toggle Diff Mode
    const diffBtn = containerEl.querySelector("#btn-toggle-diff");
    if (diffBtn) {
      diffBtn.addEventListener("click", () => {
        this.diffMode = !this.diffMode;
        StorageService.updateSetting("diffHighlight", this.diffMode);
        this.render(containerEl);
      });
    }

    // Toggle Scansion Mode
    const scansionBtn = containerEl.querySelector("#btn-toggle-scansion");
    if (scansionBtn) {
      scansionBtn.addEventListener("click", () => {
        this.showScansion = !this.showScansion;
        this.render(containerEl);
      });
    }

    // Toggle Literal Gloss
    const literalBtn = containerEl.querySelector("#btn-toggle-literal");

    if (literalBtn) {
      literalBtn.addEventListener("click", () => {
        this.showLiteral = !this.showLiteral;
        StorageService.updateSetting("showLiteralGloss", this.showLiteral);
        this.render(containerEl);
      });
    }

    // View switch to Interlinear
    const interlinearBtn = containerEl.querySelector("#btn-view-interlinear");
    if (interlinearBtn) {
      interlinearBtn.addEventListener("click", () => {
        window.location.hash = `#/compare/${this.text.id}?mode=interlinear`;
      });
    }

    // Lexicon word interactive popover
    containerEl.querySelectorAll(".lexicon-word").forEach(wordEl => {
      wordEl.addEventListener("click", (e) => {
        e.stopPropagation(); // Avoid triggering row selection
        
        // Remove existing popover if any
        document.querySelectorAll(".lexicon-popover").forEach(p => p.remove());

        const popover = document.createElement("div");
        popover.className = "lexicon-popover";
        popover.innerHTML = `
          <div class="lexicon-popover-header">
            <span class="lexicon-popover-word">${wordEl.textContent}</span>
            <button class="btn-icon" style="width: 20px; height: 20px; font-size: 0.75rem;" onclick="this.closest('.lexicon-popover').remove()">✕</button>
          </div>
          <div class="lexicon-popover-lemma">Lemma: <strong>${wordEl.dataset.lemma}</strong></div>
          <div class="lexicon-popover-meaning">${wordEl.dataset.meaning}</div>
          ${wordEl.dataset.link ? `<a href="${wordEl.dataset.link}" target="_blank" rel="noopener" class="lexicon-popover-link">Logeion / Lexicon Entry &raquo;</a>` : ''}
        `;

        document.body.appendChild(popover);
        const rect = wordEl.getBoundingClientRect();
        popover.style.top = `${rect.bottom + window.scrollY + 6}px`;
        popover.style.left = `${Math.min(window.innerWidth - 300, Math.max(10, rect.left + window.scrollX))}px`;

        const closeHandler = (evt) => {
          if (!popover.contains(evt.target) && evt.target !== wordEl) {
            popover.remove();
            document.removeEventListener("click", closeHandler);
          }
        };
        setTimeout(() => document.addEventListener("click", closeHandler), 10);
      });
    });

  }
};
