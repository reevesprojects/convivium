// Convivium Settings & Reading Customization Modal Component

import { StorageService } from "../services/storage.js";

export const SettingsModal = {
  modalEl: null,

  init() {
    if (!document.getElementById("settings-modal-root")) {
      const root = document.createElement("div");
      root.id = "settings-modal-root";
      root.innerHTML = `
        <div class="modal-overlay" id="settings-modal-overlay">
          <div class="modal-container" style="max-width: 540px;">
            <div class="modal-header">
              <div class="modal-title">⚙️ Reading Preferences</div>
              <button class="btn-icon" id="btn-close-settings">✕</button>
            </div>
            <div class="modal-body" id="settings-modal-body">
              <!-- Render dynamic form -->
            </div>
            <div class="modal-footer">
              <button class="btn btn-secondary btn-sm" id="btn-reset-settings">Reset to Defaults</button>
              <button class="btn btn-primary btn-sm" id="btn-save-settings">Apply & Close</button>
            </div>
          </div>
        </div>
      `;
      document.body.appendChild(root);

      this.modalEl = document.getElementById("settings-modal-overlay");

      this.modalEl.addEventListener("click", (e) => {
        if (e.target === this.modalEl) this.close();
      });
      document.getElementById("btn-close-settings").addEventListener("click", () => this.close());
      document.getElementById("btn-save-settings").addEventListener("click", () => this.close());
      document.getElementById("btn-reset-settings").addEventListener("click", () => {
        localStorage.removeItem("convivium_settings");
        this.applyCurrentSettings();
        this.renderForm();
      });
    } else {
      this.modalEl = document.getElementById("settings-modal-overlay");
    }
  },

  isOpen() {
    return this.modalEl && this.modalEl.classList.contains("open");
  },

  open() {
    this.init();
    this.renderForm();
    this.modalEl.classList.add("open");
  },

  close() {
    if (this.modalEl) {
      this.modalEl.classList.remove("open");
    }
  },

  renderForm() {
    const settings = StorageService.getSettings();
    const body = document.getElementById("settings-modal-body");

    body.innerHTML = `
      <div style="display: flex; flex-direction: column; gap: 1.5rem;">
        <!-- Theme Selection -->
        <div>
          <label style="font-weight: 700; font-size: 0.85rem; text-transform: uppercase; color: var(--text-muted); display: block; margin-bottom: 0.5rem;">
            Display Theme
          </label>
          <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 0.5rem;">
            <button class="btn btn-secondary btn-sm ${settings.theme === 'parchment' ? 'active' : ''}" data-set-theme="parchment" style="justify-content: flex-start;">
              📜 Parchment (Sepia)
            </button>
            <button class="btn btn-secondary btn-sm ${settings.theme === 'scholar-dark' ? 'active' : ''}" data-set-theme="scholar-dark" style="justify-content: flex-start;">
              🌙 Scholar Dark
            </button>
            <button class="btn btn-secondary btn-sm ${settings.theme === 'athenian-obsidian' ? 'active' : ''}" data-set-theme="athenian-obsidian" style="justify-content: flex-start;">
              🏛️ Athenian Obsidian
            </button>
            <button class="btn btn-secondary btn-sm ${settings.theme === 'modern-light' ? 'active' : ''}" data-set-theme="modern-light" style="justify-content: flex-start;">
              ☀️ Modern Light
            </button>
          </div>
        </div>

        <!-- Typography Selection -->
        <div>
          <label style="font-weight: 700; font-size: 0.85rem; text-transform: uppercase; color: var(--text-muted); display: block; margin-bottom: 0.5rem;">
            Text Font Family
          </label>
          <select id="setting-font-family" style="width: 100%; padding: 0.5rem; background-color: var(--bg-surface); border: 1px solid var(--border-subtle); border-radius: var(--radius-md);">
            <option value="cormorant" ${settings.fontFamily === 'cormorant' ? 'selected' : ''}>Cormorant Garamond (Classical Elegance)</option>
            <option value="garamond" ${settings.fontFamily === 'garamond' ? 'selected' : ''}>EB Garamond (Standard Scholarly)</option>
            <option value="cardo" ${settings.fontFamily === 'cardo' ? 'selected' : ''}>Cardo (Optimized for Polytonic Greek/Latin)</option>
            <option value="system-serif" ${settings.fontFamily === 'system-serif' ? 'selected' : ''}>System Serif (Georgia / Times)</option>
          </select>
        </div>

        <!-- Font Size Slider -->
        <div>
          <div style="display: flex; justify-content: space-between; margin-bottom: 0.35rem;">
            <label style="font-weight: 700; font-size: 0.85rem; text-transform: uppercase; color: var(--text-muted);">
              Verse Font Size
            </label>
            <span id="font-size-val" style="font-family: var(--font-mono); font-size: 0.85rem;">${settings.fontSize}px</span>
          </div>
          <input 
            type="range" 
            id="setting-font-size" 
            min="14" 
            max="26" 
            value="${settings.fontSize}" 
            style="width: 100%; accent-color: var(--accent-primary);"
          />
        </div>

        <!-- Line Height Slider -->
        <div>
          <div style="display: flex; justify-content: space-between; margin-bottom: 0.35rem;">
            <label style="font-weight: 700; font-size: 0.85rem; text-transform: uppercase; color: var(--text-muted);">
              Line Spacing
            </label>
            <span id="line-height-val" style="font-family: var(--font-mono); font-size: 0.85rem;">${settings.lineHeight}</span>
          </div>
          <input 
            type="range" 
            id="setting-line-height" 
            min="1.3" 
            max="2.3" 
            step="0.1" 
            value="${settings.lineHeight}" 
            style="width: 100%; accent-color: var(--accent-primary);"
          />
        </div>
      </div>
    `;

    // Event listeners
    body.querySelectorAll("[data-set-theme]").forEach(btn => {
      btn.addEventListener("click", () => {
        const theme = btn.dataset.setTheme;
        StorageService.updateSetting("theme", theme);
        this.applyCurrentSettings();
        this.renderForm();
      });
    });

    const fontSelect = body.querySelector("#setting-font-family");
    fontSelect.addEventListener("change", (e) => {
      StorageService.updateSetting("fontFamily", e.target.value);
      this.applyCurrentSettings();
    });

    const sizeRange = body.querySelector("#setting-font-size");
    sizeRange.addEventListener("input", (e) => {
      body.querySelector("#font-size-val").textContent = `${e.target.value}px`;
      StorageService.updateSetting("fontSize", parseInt(e.target.value, 10));
      this.applyCurrentSettings();
    });

    const heightRange = body.querySelector("#setting-line-height");
    heightRange.addEventListener("input", (e) => {
      body.querySelector("#line-height-val").textContent = e.target.value;
      StorageService.updateSetting("lineHeight", parseFloat(e.target.value));
      this.applyCurrentSettings();
    });
  },

  applyCurrentSettings() {
    const settings = StorageService.getSettings();
    document.documentElement.setAttribute("data-theme", settings.theme || "parchment");

    let fontVar = "var(--font-serif-cormorant)";
    if (settings.fontFamily === "garamond") fontVar = "var(--font-serif-garamond)";
    else if (settings.fontFamily === "cardo") fontVar = "var(--font-serif-cardo)";
    else if (settings.fontFamily === "system-serif") fontVar = "Georgia, 'Times New Roman', serif";

    document.documentElement.style.setProperty("--user-font-family", fontVar);
    document.documentElement.style.setProperty("--user-font-size", `${settings.fontSize}px`);
    document.documentElement.style.setProperty("--user-line-height", `${settings.lineHeight}`);
  }
};
