// Convivium Catalog & Directory Component

import { TEXTS } from "../data/texts.js";
import { AUTHORS } from "../data/authors.js";
import { TRANSLATORS } from "../data/translators.js";
import { StorageService } from "../services/storage.js";

export const CatalogView = {
  activeTab: "texts", // "texts" | "authors" | "translators"
  filterLanguage: "all", // "all" | "Ancient Greek" | "Latin" | "Hebrew" | etc.
  filterFormat: "all", // "all" | "Verse" | "Prose"
  filterEra: "all", // "all" | "Antiquity" | "Middle Ages" | "Renaissance"
  filterGenre: "all",
  searchQuery: "",

  render(containerEl) {
    const customTexts = StorageService.getCustomTexts();
    const allTexts = [...TEXTS, ...customTexts];

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

      <!-- Secondary Filter Chips (Era / Language / Format) -->
      ${this.activeTab === 'texts' ? `
        <div style="display: flex; gap: 0.5rem; margin-bottom: 0.75rem; flex-wrap: wrap; align-items: center;">
          <span style="font-size: 0.8rem; color: var(--text-muted); text-transform: uppercase; font-weight: 600;">Timeline:</span>
          <button class="filter-chip ${this.filterEra === 'all' ? 'active' : ''}" data-era="all">All Eras</button>
          <button class="filter-chip ${this.filterEra === 'Antiquity' ? 'active' : ''}" data-era="Antiquity">📜 Antiquity (c. 1200 BCE – 500 CE)</button>
          <button class="filter-chip ${this.filterEra === 'Middle Ages' ? 'active' : ''}" data-era="Middle Ages">⚔️ Middle Ages (c. 500 – 1400)</button>
          <button class="filter-chip ${this.filterEra === 'Renaissance' ? 'active' : ''}" data-era="Renaissance">⚜️ Renaissance (c. 1400 – 1600)</button>
        </div>
        <div style="display: flex; gap: 0.5rem; margin-bottom: 1.5rem; flex-wrap: wrap; align-items: center;">
          <span style="font-size: 0.8rem; color: var(--text-muted); text-transform: uppercase; font-weight: 600;">Languages:</span>
          <button class="filter-chip ${this.filterLanguage === 'all' ? 'active' : ''}" data-lang="all">All</button>
          <button class="filter-chip ${this.filterLanguage === 'Ancient Greek' ? 'active' : ''}" data-lang="Ancient Greek">Greek</button>
          <button class="filter-chip ${this.filterLanguage === 'Latin' ? 'active' : ''}" data-lang="Latin">Latin</button>
          <button class="filter-chip ${this.filterLanguage === 'Hebrew' ? 'active' : ''}" data-lang="Hebrew">Hebrew</button>
          <button class="filter-chip ${this.filterLanguage === 'Old English' ? 'active' : ''}" data-lang="Old English">Old English</button>
          <button class="filter-chip ${this.filterLanguage === 'Italian' ? 'active' : ''}" data-lang="Italian">Italian</button>
          <button class="filter-chip ${this.filterLanguage === 'Middle English' ? 'active' : ''}" data-lang="Middle English">Middle English</button>
          <button class="filter-chip ${this.filterLanguage === 'Spanish' ? 'active' : ''}" data-lang="Spanish">Spanish</button>
          <span style="border-left: 1px solid var(--border-strong); height: 16px; margin: 0 4px;"></span>
          <button class="filter-chip ${this.filterFormat === 'all' ? 'active' : ''}" data-fmt="all">All Formats</button>
          <button class="filter-chip ${this.filterFormat === 'Verse' ? 'active' : ''}" data-fmt="Verse">Verse</button>
          <button class="filter-chip ${this.filterFormat === 'Prose' ? 'active' : ''}" data-fmt="Prose">Prose</button>
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
      // Era filter
      if (this.filterEra !== "all" && text.period !== this.filterEra) return false;
      // Language filter
      if (this.filterLanguage !== "all" && !text.language.includes(this.filterLanguage)) return false;
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
          const isGreek = text.language.includes("Greek");

          return `
            <article class="card">
              <div class="card-header">
                <div>
                  <h3 class="card-title">${text.title}</h3>
                  <div class="card-subtitle">${text.originalTitle} — ${authorName}</div>
                </div>
                <span class="pill ${isGreek ? 'pill-greek' : 'pill-latin'}">${text.language}</span>
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
                  <span>⚡ Compare Translations</span>
                </a>
                <a href="#/texts/${text.id}" class="btn btn-ghost btn-sm">
                  Details &raquo;
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
        ${filtered.map(author => `
          <article class="card">
            <div class="card-header">
              <div>
                <h3 class="card-title">${author.image} ${author.name}</h3>
                <div class="card-subtitle">${author.originalName} (${author.era})</div>
              </div>
              <span class="pill ${author.language.includes('Greek') ? 'pill-greek' : 'pill-latin'}">${author.language}</span>
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
        `).join("")}
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
        ${filtered.map(t => `
          <article class="card">
            <div class="card-header">
              <div>
                <h3 class="card-title">✒️ ${t.name}</h3>
                <div class="card-subtitle">${t.dates} (${t.nationality})</div>
              </div>
              <span class="pill pill-gold">${t.century}</span>
            </div>

            <div class="card-meta">
              <span class="pill pill-commentary">${t.style}</span>
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
        `).join("")}
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

    // Era filter
    containerEl.querySelectorAll("[data-era]").forEach(btn => {
      btn.addEventListener("click", () => {
        this.filterEra = btn.dataset.era;
        this.render(containerEl);
      });
    });

    // Language filter
    containerEl.querySelectorAll("[data-lang]").forEach(btn => {
      btn.addEventListener("click", () => {
        this.filterLanguage = btn.dataset.lang;
        this.render(containerEl);
      });
    });

    // Format filter
    containerEl.querySelectorAll("[data-fmt]").forEach(btn => {
      btn.addEventListener("click", () => {
        this.filterFormat = btn.dataset.fmt;
        this.render(containerEl);
      });
    });

    // Filter input
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
