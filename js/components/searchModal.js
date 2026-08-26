// Convivium Global Search Modal Component

import { SearchService } from "../services/search.js";

export const SearchModal = {
  modalEl: null,
  searchInput: null,
  resultsList: null,

  init() {
    if (!document.getElementById("search-modal-root")) {
      const root = document.createElement("div");
      root.id = "search-modal-root";
      root.innerHTML = `
        <div class="modal-overlay" id="search-modal-overlay">
          <div class="modal-container search-modal-box">
            <div class="modal-header">
              <div class="modal-title">Search Convivium Corpus</div>
              <button class="btn-icon" id="btn-close-search">✕</button>
            </div>
            <div class="modal-body">
              <div class="search-input-wrapper">
                <span class="search-icon-inside">🔍</span>
                <input 
                  type="search" 
                  class="search-main-input" 
                  id="global-search-input" 
                  placeholder="Search Greek/Latin words, translations, authors, or commentary..." 
                  autocomplete="off"
                />
              </div>
              <div class="search-results-list" id="search-results-container">
                <div style="text-align: center; padding: 2rem; color: var(--text-muted);">
                  Type at least 2 letters (e.g. <em>polytropos</em>, <em>ἄνδρα</em>, <em>Fagles</em>, <em>wrath</em>) to search...
                </div>
              </div>
            </div>
          </div>
        </div>
      `;
      document.body.appendChild(root);

      this.modalEl = document.getElementById("search-modal-overlay");
      this.searchInput = document.getElementById("global-search-input");
      this.resultsList = document.getElementById("search-results-container");

      this.modalEl.addEventListener("click", (e) => {
        if (e.target === this.modalEl) this.close();
      });
      document.getElementById("btn-close-search").addEventListener("click", () => this.close());

      this.searchInput.addEventListener("input", (e) => {
        this.performSearch(e.target.value);
      });

      // Global keyboard shortcut: Ctrl+K or / or Cmd+K
      document.addEventListener("keydown", (e) => {
        if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
          e.preventDefault();
          this.open();
        } else if (e.key === "/" && document.activeElement.tagName !== "INPUT" && document.activeElement.tagName !== "TEXTAREA") {
          e.preventDefault();
          this.open();
        } else if (e.key === "Escape" && this.isOpen()) {
          this.close();
        }
      });
    } else {
      this.modalEl = document.getElementById("search-modal-overlay");
      this.searchInput = document.getElementById("global-search-input");
      this.resultsList = document.getElementById("search-results-container");
    }
  },

  isOpen() {
    return this.modalEl && this.modalEl.classList.contains("open");
  },

  open() {
    this.init();
    this.modalEl.classList.add("open");
    setTimeout(() => {
      this.searchInput.focus();
      this.searchInput.select();
    }, 50);
  },

  close() {
    if (this.modalEl) {
      this.modalEl.classList.remove("open");
      this.searchInput.value = "";
    }
  },

  performSearch(query) {
    if (!query || query.trim().length < 2) {
      this.resultsList.innerHTML = `
        <div style="text-align: center; padding: 2rem; color: var(--text-muted);">
          Type at least 2 letters to search the classical library...
        </div>
      `;
      return;
    }

    const results = SearchService.search(query);
    const hasAny = results.authors.length > 0 || results.translators.length > 0 || results.texts.length > 0 || results.segments.length > 0;

    if (!hasAny) {
      this.resultsList.innerHTML = `
        <div style="text-align: center; padding: 2.5rem; color: var(--text-muted);">
          <h4>No results found for "${query}"</h4>
          <p style="font-size: 0.85rem;">Try searching without accents or with English synonyms.</p>
        </div>
      `;
      return;
    }

    let html = '';

    // Texts matches
    if (results.texts.length > 0) {
      html += `<div style="font-size: 0.75rem; font-weight: 700; text-transform: uppercase; color: var(--text-muted); margin-top: 0.5rem;">Texts (${results.texts.length})</div>`;
      results.texts.forEach(t => {
        html += `
          <div class="search-result-item" onclick="location.hash='#/compare/${t.id}'; window.ConviviumSearchModal.close();">
            <div style="display: flex; justify-content: space-between; align-items: center;">
              <strong>${t.title} (${t.originalTitle})</strong>
              <span class="pill ${t.language.includes('Greek') ? 'pill-greek' : 'pill-latin'}" style="font-size: 0.65rem;">${t.language}</span>
            </div>
            <div style="font-size: 0.85rem; color: var(--text-secondary);">${SearchService.highlightMatch(t.description.slice(0, 110) + '...', query)}</div>
          </div>
        `;
      });
    }

    // Segments & Verses matches
    if (results.segments.length > 0) {
      html += `<div style="font-size: 0.75rem; font-weight: 700; text-transform: uppercase; color: var(--text-muted); margin-top: 0.75rem;">Matching Verses & Commentary (${results.segments.length})</div>`;
      results.segments.slice(0, 8).forEach(s => {
        html += `
          <div class="search-result-item" onclick="location.hash='#/compare/${s.textId}?segment=${s.segmentRef}'; window.ConviviumSearchModal.close();">
            <div style="display: flex; justify-content: space-between; align-items: center;">
              <span style="font-weight: 600;">${s.textTitle} — Line ${s.lineNum} (${s.segmentRef})</span>
              <span class="pill pill-gold" style="font-size: 0.65rem;">${s.matchSource}</span>
            </div>
            <div style="font-size: 0.85rem; color: var(--text-secondary); font-family: var(--font-serif-cormorant); font-size: 1.05rem;">
              ${SearchService.highlightMatch(s.matchContext, query)}
            </div>
          </div>
        `;
      });
    }

    // Authors matches
    if (results.authors.length > 0) {
      html += `<div style="font-size: 0.75rem; font-weight: 700; text-transform: uppercase; color: var(--text-muted); margin-top: 0.75rem;">Authors (${results.authors.length})</div>`;
      results.authors.forEach(a => {
        html += `
          <div class="search-result-item" onclick="location.hash='#/authors/${a.id}'; window.ConviviumSearchModal.close();">
            <div><strong>${a.image} ${a.name}</strong> (${a.originalName}) — <span style="color: var(--text-muted);">${a.era}</span></div>
            <div style="font-size: 0.82rem; color: var(--text-secondary);">${SearchService.highlightMatch(a.bio.slice(0, 95) + '...', query)}</div>
          </div>
        `;
      });
    }

    // Translators matches
    if (results.translators.length > 0) {
      html += `<div style="font-size: 0.75rem; font-weight: 700; text-transform: uppercase; color: var(--text-muted); margin-top: 0.75rem;">Translators (${results.translators.length})</div>`;
      results.translators.forEach(t => {
        html += `
          <div class="search-result-item" onclick="location.hash='#/translators/${t.id}'; window.ConviviumSearchModal.close();">
            <div><strong>✒️ ${t.name}</strong> (${t.century})</div>
            <div style="font-size: 0.82rem; color: var(--text-secondary);">${SearchService.highlightMatch(t.style, query)}</div>
          </div>
        `;
      });
    }

    this.resultsList.innerHTML = html;
  }
};

window.ConviviumSearchModal = SearchModal;
