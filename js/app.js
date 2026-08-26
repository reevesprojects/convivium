// Convivium Main Application Orchestrator & Router

import { CatalogView } from "./components/catalogView.js";
import { ParallelView } from "./components/parallelView.js";
import { InterlinearView } from "./components/interlinearView.js";
import { DetailView } from "./components/detailView.js";
import { ImportModal } from "./components/importModal.js";
import { SearchModal } from "./components/searchModal.js";
import { SettingsModal } from "./components/settingsModal.js";
import { CommentaryDrawer } from "./components/commentaryDrawer.js";
import { ArenaView } from "./components/arenaView.js";

import { StorageService } from "./services/storage.js";


const App = {
  contentEl: null,

  init() {
    this.contentEl = document.getElementById("app-main-content");
    
    // Apply user settings (Theme, Fonts)
    SettingsModal.applyCurrentSettings();

    // Initialize global overlays
    SearchModal.init();
    SettingsModal.init();
    CommentaryDrawer.init();

    // Setup global topbar event listeners
    this.setupGlobalEvents();

    // Listen to hash changes
    window.addEventListener("hashchange", () => this.handleRoute());

    // Initial route
    this.handleRoute();
  },

  setupGlobalEvents() {
    document.getElementById("nav-search-trigger")?.addEventListener("click", () => {
      SearchModal.open();
    });

    document.getElementById("nav-settings-trigger")?.addEventListener("click", () => {
      SettingsModal.open();
    });
  },

  handleRoute() {
    const rawHash = window.location.hash || "#/catalog";
    const [pathPart, queryPart] = rawHash.split("?");
    const params = new URLSearchParams(queryPart || "");
    const segments = pathPart.replace(/^#\/?/, "").split("/");

    const rootRoute = segments[0] || "catalog";
    const paramId = segments[1];

    // Update active nav link
    document.querySelectorAll(".nav-link").forEach(link => {
      const href = link.getAttribute("href") || "";
      if (href === pathPart || (pathPart === "" && href === "#/catalog")) {
        link.classList.add("active");
      } else {
        link.classList.remove("active");
      }
    });

    // Close any open drawers or modals on route change
    CommentaryDrawer.close();

    // Route dispatch
    if (rootRoute === "compare" && paramId) {
      const mode = params.get("mode");
      const targetSeg = params.get("segment");
      this.contentEl.classList.add("fluid");

      if (mode === "interlinear") {
        InterlinearView.init(paramId, targetSeg);
        InterlinearView.render(this.contentEl);
      } else {
        ParallelView.init(paramId, targetSeg);
        ParallelView.render(this.contentEl);
      }
    } else if (rootRoute === "texts" && paramId) {
      this.contentEl.classList.remove("fluid");
      DetailView.renderTextDetail(this.contentEl, paramId);
    } else if (rootRoute === "authors") {
      this.contentEl.classList.remove("fluid");
      if (paramId) {
        DetailView.renderAuthorDetail(this.contentEl, paramId);
      } else {
        CatalogView.activeTab = "authors";
        CatalogView.render(this.contentEl);
      }
    } else if (rootRoute === "translators") {
      this.contentEl.classList.remove("fluid");
      if (paramId) {
        DetailView.renderTranslatorDetail(this.contentEl, paramId);
      } else {
        CatalogView.activeTab = "translators";
        CatalogView.render(this.contentEl);
      }
    } else if (rootRoute === "import") {
      this.contentEl.classList.remove("fluid");
      ImportModal.render(this.contentEl);
    } else if (rootRoute === "bookmarks") {
      this.contentEl.classList.remove("fluid");
      this.renderBookmarksView();
    } else if (rootRoute === "arena") {
      this.contentEl.classList.remove("fluid");
      ArenaView.render(this.contentEl, paramId || "");
    } else {
      // Default: Catalog
      this.contentEl.classList.remove("fluid");
      CatalogView.render(this.contentEl);
    }


    // Scroll to top on route change
    window.scrollTo({ top: 0, behavior: "smooth" });
  },

  renderBookmarksView() {
    const bookmarks = StorageService.getBookmarks();
    this.contentEl.innerHTML = `
      <div style="max-width: 900px; margin: 0 auto;">
        <div class="section-header">
          <div>
            <h2 class="section-title">⭐ Saved Passages & Bookmarks</h2>
            <p style="color: var(--text-secondary); font-size: 0.95rem; margin-top: 0.25rem;">
              Quick access to verses you've flagged for comparison and analysis.
            </p>
          </div>
          <a href="#/catalog" class="btn btn-secondary btn-sm">&larr; Back to Catalog</a>
        </div>

        ${bookmarks.length === 0 ? `
          <div class="card" style="text-align: center; padding: 3rem;">
            <h3>No Bookmarks Saved Yet</h3>
            <p style="color: var(--text-muted); margin-bottom: 1.5rem;">Click the "Bookmark" button on any verse in the studio to save it here.</p>
            <a href="#/compare/homer-odyssey" class="btn btn-primary">Start Reading Homer's Odyssey</a>
          </div>
        ` : `
          <div class="cards-grid">
            ${bookmarks.map(b => `
              <div class="card">
                <div class="card-header">
                  <h3 class="card-title">${b.textTitle}</h3>
                  <span class="pill pill-gold">${b.segmentRef}</span>
                </div>
                <div style="font-size: 0.8rem; color: var(--text-muted); margin-bottom: 1rem;">
                  Saved on ${new Date(b.timestamp).toLocaleDateString()}
                </div>
                <div class="card-footer">
                  <a href="#/compare/${b.textId}?segment=${b.segmentRef}" class="btn btn-primary btn-sm">
                    Open in Studio &raquo;
                  </a>
                </div>
              </div>
            `).join("")}
          </div>
        `}
      </div>
    `;
  }
};

document.addEventListener("DOMContentLoaded", () => {
  App.init();
});
