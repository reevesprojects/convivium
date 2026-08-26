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

          <!-- Literal Gloss Toggle -->
          <button class="btn btn-secondary btn-sm ${this.showLiteral ? 'active' : ''}" id="btn-toggle-literal" title="Toggle word-by-word literal English gloss">
            <span>📖</span> Gloss: <strong>${this.showLiteral ? 'ON' : 'OFF'}</strong>
          </button>

          <!-- Export Actions Dropdown -->
          <button class="btn btn-secondary btn-sm" id="btn-export-comparison" title="Export this comparative alignment">
            <span>📥</span> Export
          </button>
        </div>
      </div>

      <!-- Edition Selector Chips -->
      <div class="editions-selector-bar">
        <span style="font-size: 0.75rem; font-weight: 700; text-transform: uppercase; color: var(--text-muted);">
          Editions:
        </span>
        ${this.text.sourceEditions.map(ed => {
          const isActive = this.activeEditions.includes(ed.id);
          const isSource = ed.type === "source";
          return `
            <button class="edition-toggle-chip ${isActive ? 'active' : ''}" data-ed-id="${ed.id}">
              <span class="chip-check">${isActive ? '✓' : '+'}</span>
              <span>${isSource ? '🏛️ ' + ed.name : '✒️ ' + ed.name}</span>
            </button>
          `;
        }).join("")}
      </div>

      <!-- Parallel Studio Grid -->
      <div class="parallel-studio-container" style="--user-font-size: ${settings.fontSize}px; --user-line-height: ${settings.lineHeight};">
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
          ${this.text.segments.map(seg => {
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
                    return `
                      <div class="parallel-cell source-cell">
                        <div class="line-meta-badge">
                          <span>Line ${seg.lineNum} (${seg.ref})</span>
                          ${seg.notes ? `<span class="has-commentary-dot" title="Scholarly commentary available"></span>` : ''}
                        </div>
                        <div class="source-text font-cardo" style="font-weight: 600; color: var(--text-primary);">
                          ${seg.source}
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
        CommentaryDrawer.open(this.text, ref);
      });
    });

    // Toggle Editions
    containerEl.querySelectorAll(".edition-toggle-chip").forEach(chip => {
      chip.addEventListener("click", () => {
        const edId = chip.dataset.edId;
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

    // Remove Column button
    containerEl.querySelectorAll(".btn-remove-col").forEach(btn => {
      btn.addEventListener("click", (e) => {
        e.stopPropagation();
        const edId = btn.dataset.removeEd;
        this.activeEditions = this.activeEditions.filter(id => id !== edId);
        this.render(containerEl);
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

    // Export Comparison
    const exportBtn = containerEl.querySelector("#btn-export-comparison");
    if (exportBtn) {
      exportBtn.addEventListener("click", () => {
        this.exportMarkdown();
      });
    }
  },

  exportMarkdown() {
    let md = `# Parallel Translation: ${this.text.title} (${this.text.originalTitle})\n`;
    md += `**Passage**: ${this.text.passageRef}\n\n`;
    
    // Header
    const edNames = this.activeEditions.map(edId => {
      const ed = this.text.sourceEditions.find(e => e.id === edId);
      return ed ? ed.name : edId;
    });

    md += `| Ref | ` + edNames.join(" | ") + ` |\n`;
    md += `| --- | ` + edNames.map(() => "---").join(" | ") + ` |\n`;

    this.text.segments.forEach(seg => {
      const cells = this.activeEditions.map(edId => {
        const ed = this.text.sourceEditions.find(e => e.id === edId);
        if (ed?.type === "source") return seg.source.replace(/\|/g, "\\|");
        return (seg.translations[edId] || "").replace(/\|/g, "\\|");
      });
      md += `| ${seg.ref} | ` + cells.join(" | ") + ` |\n`;
    });

    const blob = new Blob([md], { type: "text/markdown" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${this.text.id}-parallel-comparison.md`;
    a.click();
    URL.revokeObjectURL(url);
  }
};
