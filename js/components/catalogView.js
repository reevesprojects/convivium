// Convivium Catalog & Directory Component

import { TEXTS } from "../data/texts.js";
import { AUTHORS } from "../data/authors.js";
import { TRANSLATORS } from "../data/translators.js";
import { StorageService } from "../services/storage.js";

export const CatalogView = {
  activeTab: "texts", // "texts" | "authors" | "translators"
  filterLanguage: "all", // "all" | "Ancient Greek" | "Latin" | "Hebrew" | "English_Old_Middle" | "French_All" | etc.
  filterFormat: "all", // "all" | "Verse" | "Prose"
  minYearFilter: -2100, // Starting year: -2100 to 2000
  maxYearFilter: 2000, // Ending year: -2100 to 2000
  searchQuery: "",

  // Helper to parse date strings like "c. 725–675 BCE", "458 BCE", "c. 1375–1400 CE", "1808 CE" into numeric year
  parseYear(dateStr) {
    if (!dateStr) return 0;
    const isBCE = /BCE|BC/i.test(dateStr);
    const nums = dateStr.match(/\d+/g);
    if (!nums || nums.length === 0) return 0;
    const num = parseInt(nums[0], 10);
    return isBCE ? -num : num;
  },

  formatSingleYear(year) {
    if (year < 0) return `${Math.abs(year)} BCE`;
    return `${year} CE`;
  },

  formatYearRangeLabel(minY, maxY) {
    if (minY <= -2100 && maxY >= 2000) return "All Eras (2100 BCE – 2000 CE)";
    return `${this.formatSingleYear(minY)} – ${this.formatSingleYear(maxY)}`;
  },

  render(containerEl) {
    const customTexts = StorageService.getCustomTexts();
    const allTexts = [...TEXTS, ...customTexts];

    // Calculate percentage positions for dual slider range bar
    const totalSpan = 2000 - (-2100); // 4100
    const leftPercent = Math.max(0, Math.min(100, ((this.minYearFilter - (-2100)) / totalSpan) * 100));
    const rightPercent = Math.max(0, Math.min(100, 100 - (((this.maxYearFilter - (-2100)) / totalSpan) * 100)));

    containerEl.innerHTML = `
      <div class="hero-section">
        <span class="hero-eyebrow">Digital Humanities Translation Platform</span>
        <h1 class="hero-title">Convivium</h1>
        <p class="hero-subtitle">
          Compare classical Greek, Latin, Hebrew, and vernacular masterpieces across centuries of historical and modern translations. Discover linguistic nuances, poetic variances, and interpretive choices side-by-side.
        </p>
        <div class="hero-actions">
          ${(() => {
            const last = StorageService.getLastVisited();
            const lastText = last ? [...TEXTS, ...customTexts].find(t => t.id === last.textId) : null;
            return last && lastText ? `
              <a href="#/compare/${last.textId}?segment=${last.segmentRef}" class="btn btn-primary">
                <span>▶</span> Continue: ${lastText.title}
              </a>
            ` : `
              <a href="#/compare/homer-odyssey" class="btn btn-primary">
                <span>⚡</span> Explore Homer's Odyssey
              </a>
            `;
          })()}
          <a href="#/compare/dante-inferno" class="btn btn-secondary">
            <span>👑</span> Dante's Inferno
          </a>
          <button class="btn btn-secondary" id="btn-open-importer">
            <span>➕</span> Import Text / Translation
          </button>
        </div>
      </div>

      <!-- Main Navigation Tabs -->
      <div class="filter-bar">
        <div class="toggle-group" style="margin-right: auto;">
          <button class="toggle-btn ${this.activeTab === 'texts' ? 'active' : ''}" data-tab="texts">
            📚 Texts (${allTexts.length})
          </button>
          <button class="toggle-btn ${this.activeTab === 'authors' ? 'active' : ''}" data-tab="authors">
            🏛️ Authors (${AUTHORS.length})
          </button>
          <button class="toggle-btn ${this.activeTab === 'translators' ? 'active' : ''}" data-tab="translators">
            ✒️ Translators (${TRANSLATORS.length})
          </button>
        </div>

        <input 
          type="search" 
          class="filter-search-input" 
          placeholder="Filter catalog by keyword..." 
          id="catalog-filter-input"
          value="${this.searchQuery}"
        />
      </div>

      <!-- Secondary Filter Controls (2-Sided Year Range Slider & Language Dropdown) -->
      ${this.activeTab === 'texts' ? `
        <div style="background-color: var(--bg-surface); border: 1px solid var(--border-subtle); border-radius: var(--radius-md); padding: 1.1rem 1.25rem; margin-bottom: 1.5rem; display: flex; flex-wrap: wrap; gap: 1.5rem; align-items: center; justify-content: space-between;">
          
          <!-- 2-Sided Interactive Year Slider -->
          <div style="flex: 1 1 360px; min-width: 280px;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.5rem;">
              <span style="font-size: 0.8rem; color: var(--text-muted); text-transform: uppercase; font-weight: 700; display: flex; align-items: center; gap: 0.35rem;">
                <span>⏳</span> Composition Date Range:
              </span>
              <strong id="year-slider-label" style="font-family: var(--font-mono, monospace); color: var(--accent-primary); font-size: 0.9rem;">
                ${this.formatYearRangeLabel(this.minYearFilter, this.maxYearFilter)}
              </strong>
            </div>

            <div class="dual-slider-container">
              <div class="dual-slider-track"></div>
              <div class="dual-slider-range" id="dual-slider-range-bar" style="left: ${leftPercent}%; right: ${rightPercent}%;"></div>
              
              <input 
                type="range" 
                class="dual-slider-input" 
                id="catalog-year-min-slider" 
                min="-2100" 
                max="2000" 
                step="25" 
                value="${this.minYearFilter}" 
                title="Starting Year"
              />
              <input 
                type="range" 
                class="dual-slider-input" 
                id="catalog-year-max-slider" 
                min="-2100" 
                max="2000" 
                step="25" 
                value="${this.maxYearFilter}" 
                title="Ending Year"
              />
            </div>

            <div style="display: flex; justify-content: space-between; font-size: 0.72rem; color: var(--text-muted); margin-top: 0.25rem; font-family: var(--font-mono);">
              <span>2100 BCE</span>
              <span>1000 BCE</span>
              <span>1 CE</span>
              <span>1000 CE</span>
              <span>2000 CE</span>
            </div>
          </div>

          <!-- Language Dropdown (combining Old/Middle English and Old/Renaissance French) -->
          <div style="display: flex; align-items: center; gap: 0.6rem; flex-wrap: wrap;">
            <label for="catalog-language-select" style="font-size: 0.8rem; color: var(--text-muted); text-transform: uppercase; font-weight: 700;">
              🌐 Language:
            </label>
            <select 
              id="catalog-language-select" 
              style="padding: 0.45rem 0.9rem; border-radius: var(--radius-sm); border: 1px solid var(--border-strong); background-color: var(--bg-secondary); color: var(--text-primary); font-family: var(--font-body); font-size: 0.88rem; cursor: pointer; min-width: 210px;"
            >
              <option value="all" ${this.filterLanguage === 'all' ? 'selected' : ''}>All Languages</option>
              <option value="Ancient Greek" ${this.filterLanguage === 'Ancient Greek' ? 'selected' : ''}>Ancient Greek (🏛️)</option>
              <option value="Latin" ${this.filterLanguage === 'Latin' ? 'selected' : ''}>Classical & Medieval Latin (🦅)</option>
              <option value="Hebrew" ${this.filterLanguage === 'Hebrew' ? 'selected' : ''}>Biblical Hebrew (📜)</option>
              <option value="German" ${this.filterLanguage === 'German' ? 'selected' : ''}>German (Goethe / Faust 🖋️)</option>
              <option value="Russian" ${this.filterLanguage === 'Russian' ? 'selected' : ''}>Russian (Pushkin / Dostoevsky 🪶)</option>
              <option value="Chinese" ${this.filterLanguage === 'Chinese' ? 'selected' : ''}>Classical Chinese (☯️)</option>
              <option value="Persian" ${this.filterLanguage === 'Persian' ? 'selected' : ''}>Classical Persian (🍷)</option>
              <option value="English_Old_Middle" ${this.filterLanguage === 'English_Old_Middle' ? 'selected' : ''}>Old & Middle English (🛡️)</option>
              <option value="French_All" ${this.filterLanguage === 'French_All' ? 'selected' : ''}>French (Old, Renaissance & Modern 🥀)</option>
              <option value="Italian" ${this.filterLanguage === 'Italian' ? 'selected' : ''}>Italian (Dante / Petrarch / Boccaccio)</option>
              <option value="Spanish" ${this.filterLanguage === 'Spanish' ? 'selected' : ''}>Spanish (Cervantes)</option>
              <option value="Portuguese" ${this.filterLanguage === 'Portuguese' ? 'selected' : ''}>Portuguese (Camões)</option>
            </select>
          </div>

          <!-- Format Filters (All / Verse / Prose) -->
          <div style="display: flex; gap: 0.35rem; align-items: center;">
            <span style="font-size: 0.8rem; color: var(--text-muted); text-transform: uppercase; font-weight: 700; margin-right: 0.2rem;">
              Format:
            </span>
            <button class="filter-chip ${this.filterFormat === 'all' ? 'active' : ''}" data-fmt="all">All</button>
            <button class="filter-chip ${this.filterFormat === 'Verse' ? 'active' : ''}" data-fmt="Verse">Verse</button>
            <button class="filter-chip ${this.filterFormat === 'Prose' ? 'active' : ''}" data-fmt="Prose">Prose</button>
          </div>

        </div>
      ` : ''}

      <!-- Catalog Content Container -->
      <div id="catalog-content-area"></div>
    `;

    this.renderActiveTabContent(containerEl.querySelector("#catalog-content-area"));
    this.attachEventListeners(containerEl);
  },

  renderActiveTabContent(contentArea) {
    if (!contentArea) return;

    if (this.activeTab === "texts") {
      this.renderTextsGrid(contentArea);
    } else if (this.activeTab === "authors") {
      this.renderAuthorsGrid(contentArea);
    } else if (this.activeTab === "translators") {
      this.renderTranslatorsGrid(contentArea);
    }
  },

  renderTextsGrid(contentArea) {
    const customTexts = StorageService.getCustomTexts();
    const allTexts = [...TEXTS, ...customTexts];

    const filtered = allTexts.filter(text => {
      // 2-Sided Year Range filter (minYearFilter to maxYearFilter)
      if (this.minYearFilter > -2100 || this.maxYearFilter < 2000) {
        const textYear = this.parseYear(text.date);
        if (textYear < this.minYearFilter || textYear > this.maxYearFilter) return false;
      }

      // Language filter (with combined Old/Middle English and French handling)
      if (this.filterLanguage !== "all") {
        if (this.filterLanguage === "English_Old_Middle") {
          const isOldOrMiddle = text.language.includes("Old English") || text.language.includes("Middle English");
          if (!isOldOrMiddle) return false;
        } else if (this.filterLanguage === "French_All") {
          const isFrench = text.language.includes("French") || text.language.includes("Franco-Italian");
          if (!isFrench) return false;
        } else {
          if (!text.language.includes(this.filterLanguage)) return false;
        }
      }

      // Format filter
      if (this.filterFormat !== "all" && !text.format.includes(this.filterFormat)) return false;

      // Search query
      if (this.searchQuery.trim()) {
        const q = this.searchQuery.toLowerCase();
        const titleMatch = text.title.toLowerCase().includes(q) || text.originalTitle.toLowerCase().includes(q);
        const descMatch = text.description.toLowerCase().includes(q);
        const authorMatch = text.authorId.toLowerCase().includes(q);
        if (!titleMatch && !descMatch && !authorMatch) return false;
      }
      return true;
    });

    if (filtered.length === 0) {
      contentArea.innerHTML = `
        <div style="text-align: center; padding: 3rem; color: var(--text-muted);">
          <h3>No texts matched the selected filters.</h3>
          <p>Try resetting the search keyword or language filter.</p>
        </div>
      `;
      return;
    }

    contentArea.innerHTML = `
      <div class="cards-grid">
        ${filtered.map(text => {
          const author = AUTHORS.find(a => a.id === text.authorId);
          const authorName = author ? author.name : text.authorId;
          const translationCount = text.sourceEditions ? text.sourceEditions.filter(e => e.type === "translation").length : 0;
          const langClass = text.language.includes("Greek") ? "pill-greek" :
                            text.language.includes("Latin") ? "pill-latin" :
                            text.language.includes("Hebrew") ? "pill-notes" :
                            text.language.includes("Chinese") ? "pill-verse" :
                            text.language.includes("Persian") ? "pill-gold" : "pill-prose";

          return `
            <article class="card">
              <div class="card-header">
                <div>
                  <h3 class="card-title">${text.title}</h3>
                  <div class="card-subtitle">${text.originalTitle} — ${authorName}</div>
                </div>
                <span class="pill ${langClass}" style="flex-shrink: 0;">${text.language}</span>
              </div>

              <div class="card-meta">
                <span class="pill pill-verse">${text.format}</span>
                <span class="pill pill-gold">${text.date}</span>
                <span class="pill pill-commentary">${translationCount} Translations</span>
                ${text.isCustom ? `<span class="pill pill-sample">Custom Text</span>` : ''}
              </div>

              <p class="card-body">
                ${text.description}
              </p>

              <div style="font-size: 0.8rem; color: var(--text-muted); margin-bottom: 1rem; font-family: var(--font-mono);">
                📍 Sample Passage: <strong>${text.passageRef}</strong>
              </div>

              <div class="card-footer">
                <a href="#/compare/${text.id}" class="btn btn-primary btn-sm">
                  <span>⚡ Compare</span>
                </a>
                <a href="#/texts/${text.id}" class="btn btn-secondary btn-sm" title="View details, full manuscript info & online editions">
                  <span>📖 Details & Sources</span>
                </a>
                <a href="https://www.gutenberg.org/ebooks/search/?query=${encodeURIComponent(text.title.replace(/\s*\([^)]*\)/g, ''))}" target="_blank" rel="noopener noreferrer" class="btn btn-ghost btn-sm" title="Find free public domain editions on Project Gutenberg">
                  <span>🌐 Online ↗</span>
                </a>
                ${text.isCustom ? `
                  <button class="btn btn-ghost btn-sm btn-delete-custom" data-text-id="${text.id}" title="Delete this custom text from your library" style="color: var(--accent-danger, #e05);">
                    🗑️ Delete
                  </button>
                ` : ''}
              </div>
            </article>
          `;
        }).join("")}
      </div>
    `;
  },

  renderAuthorsGrid(contentArea) {
    const filtered = AUTHORS.filter(author => {
      if (this.searchQuery.trim()) {
        const q = this.searchQuery.toLowerCase();
        return author.name.toLowerCase().includes(q) || 
               author.originalName.toLowerCase().includes(q) || 
               author.bio.toLowerCase().includes(q);
      }
      return true;
    });

    contentArea.innerHTML = `
      <div class="cards-grid">
        ${filtered.map(author => {
          const langClass = author.language.includes("Greek") ? "pill-greek" :
                            author.language.includes("Latin") ? "pill-latin" :
                            author.language.includes("Hebrew") ? "pill-notes" :
                            author.language.includes("Chinese") ? "pill-verse" :
                            author.language.includes("Persian") ? "pill-gold" : "pill-prose";

          return `
            <article class="card">
              <div class="card-header">
                <div>
                  <h3 class="card-title">${author.image} ${author.name}</h3>
                  <div class="card-subtitle">${author.originalName} (${author.era})</div>
                </div>
                <span class="pill ${langClass}" style="flex-shrink: 0;">${author.language}</span>
              </div>

              <div class="card-meta">
                <span class="pill pill-gold">${author.period}</span>
                ${author.genres.map(g => `<span class="pill pill-verse">${g}</span>`).join("")}
              </div>

              <p class="card-body">
                ${author.bio}
              </p>

              <div class="card-footer">
                <a href="#/authors/${author.id}" class="btn btn-secondary btn-sm" style="width: 100%;">
                  View Works & Translations &raquo;
                </a>
              </div>
            </article>
          `;
        }).join("")}
      </div>
    `;
  },

  renderTranslatorsGrid(contentArea) {
    const filtered = TRANSLATORS.filter(t => {
      if (this.searchQuery.trim()) {
        const q = this.searchQuery.toLowerCase();
        return t.name.toLowerCase().includes(q) || 
               t.bio.toLowerCase().includes(q) || 
               t.style.toLowerCase().includes(q);
      }
      return true;
    });

    contentArea.innerHTML = `
      <div class="cards-grid">
        ${filtered.map(t => {
          // Split complex multi-clause styles (e.g. separated by commas, semicolons, or slashes) into distinct clean pills
          const stylePills = (t.style || "")
            .split(/[,;\/]+/)
            .map(s => s.trim())
            .filter(s => s.length > 0);

          return `
            <article class="card">
              <div class="card-header">
                <div>
                  <h3 class="card-title">✒️ ${t.name}</h3>
                  <div class="card-subtitle">${t.dates} (${t.nationality})</div>
                </div>
                <span class="pill pill-gold" style="flex-shrink: 0;">${t.century}</span>
              </div>

              <div class="card-meta">
                ${stylePills.map(s => `<span class="pill pill-commentary">${s}</span>`).join("")}
              </div>

              <p class="card-body">
                <strong>Approach:</strong> ${t.approach}<br/><br/>
                <span style="font-size: 0.85rem; color: var(--text-muted);">${t.bio}</span>
              </p>

              <div style="font-size: 0.8rem; margin-bottom: 0.75rem;">
                <strong>Notable Editions:</strong><br/>
                <span style="color: var(--text-secondary); font-style: italic;">
                  ${t.notableWorks.join(" • ")}
                </span>
              </div>

              <div class="card-footer">
                <a href="#/translators/${t.id}" class="btn btn-secondary btn-sm" style="width: 100%;">
                  View Translator Profile &raquo;
                </a>
              </div>
            </article>
          `;
        }).join("")}
      </div>
    `;
  },

  attachEventListeners(containerEl) {
    // Tab toggling
    containerEl.querySelectorAll("[data-tab]").forEach(btn => {
      btn.addEventListener("click", () => {
        this.activeTab = btn.dataset.tab;
        this.render(containerEl);
      });
    });

    // 2-Sided Year Range slider listener (with live label update, cross-boundary lock, and smooth track highlight)
    const minSlider = containerEl.querySelector("#catalog-year-min-slider");
    const maxSlider = containerEl.querySelector("#catalog-year-max-slider");
    const rangeBar = containerEl.querySelector("#dual-slider-range-bar");
    const yearLabel = containerEl.querySelector("#year-slider-label");

    const updateDualSlider = () => {
      let minVal = parseInt(minSlider.value, 10);
      let maxVal = parseInt(maxSlider.value, 10);

      // Prevent thumbs from crossing over
      if (minVal > maxVal) {
        const temp = minVal;
        minVal = maxVal;
        maxVal = temp;
      }

      this.minYearFilter = minVal;
      this.maxYearFilter = maxVal;

      if (yearLabel) {
        yearLabel.textContent = this.formatYearRangeLabel(minVal, maxVal);
      }

      if (rangeBar) {
        const totalSpan = 2000 - (-2100);
        const leftPercent = Math.max(0, Math.min(100, ((minVal - (-2100)) / totalSpan) * 100));
        const rightPercent = Math.max(0, Math.min(100, 100 - (((maxVal - (-2100)) / totalSpan) * 100)));
        rangeBar.style.left = `${leftPercent}%`;
        rangeBar.style.right = `${rightPercent}%`;
      }

      const contentArea = containerEl.querySelector("#catalog-content-area");
      this.renderActiveTabContent(contentArea);
    };

    if (minSlider && maxSlider) {
      minSlider.addEventListener("input", updateDualSlider);
      maxSlider.addEventListener("input", updateDualSlider);
    }

    // Language dropdown select listener
    const langSelect = containerEl.querySelector("#catalog-language-select");
    if (langSelect) {
      langSelect.addEventListener("change", (e) => {
        this.filterLanguage = e.target.value;
        const contentArea = containerEl.querySelector("#catalog-content-area");
        this.renderActiveTabContent(contentArea);
      });
    }

    // Format filter chips (All / Verse / Prose)
    containerEl.querySelectorAll("[data-fmt]").forEach(btn => {
      btn.addEventListener("click", () => {
        this.filterFormat = btn.dataset.fmt;
        this.render(containerEl);
      });
    });

    // Filter search input
    const filterInput = containerEl.querySelector("#catalog-filter-input");
    if (filterInput) {
      filterInput.addEventListener("input", (e) => {
        this.searchQuery = e.target.value;
        const contentArea = containerEl.querySelector("#catalog-content-area");
        this.renderActiveTabContent(contentArea);
      });
    }

    // Open importer modal
    const importerBtn = containerEl.querySelector("#btn-open-importer");
    if (importerBtn) {
      importerBtn.addEventListener("click", () => {
        window.location.hash = "#/import";
      });
    }

    // Delete custom texts
    containerEl.querySelectorAll(".btn-delete-custom").forEach(btn => {
      btn.addEventListener("click", (e) => {
        e.preventDefault();
        e.stopPropagation();
        const textId = btn.dataset.textId;
        if (confirm("Delete this custom text from your library? This cannot be undone.")) {
          StorageService.deleteCustomText(textId);
          this.render(containerEl);
        }
      });
    });
  }
};
