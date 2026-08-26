// Convivium LocalStorage & Persistence Service

const SETTINGS_KEY = "convivium_settings";
const CUSTOM_TEXTS_KEY = "convivium_custom_texts";
const NOTES_KEY = "convivium_user_notes";
const BOOKMARKS_KEY = "convivium_bookmarks";

const DEFAULT_SETTINGS = {
  theme: "parchment", // "parchment" | "scholar-dark" | "athenian-obsidian" | "modern-light"
  fontFamily: "cormorant", // "cormorant" | "garamond" | "cardo" | "system-serif"
  fontSize: 18, // in pixels
  lineHeight: 1.7,
  syncScroll: true,
  showLiteralGloss: true,
  showLineNumbers: true,
  viewMode: "parallel", // "parallel" | "interlinear"
  pinnedOriginal: true,
  diffHighlight: false
};

export const StorageService = {
  getSettings() {
    try {
      const data = localStorage.getItem(SETTINGS_KEY);
      return data ? { ...DEFAULT_SETTINGS, ...JSON.parse(data) } : { ...DEFAULT_SETTINGS };
    } catch (e) {
      console.error("Failed to load settings from localStorage", e);
      return { ...DEFAULT_SETTINGS };
    }
  },

  saveSettings(settings) {
    try {
      localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
    } catch (e) {
      console.error("Failed to save settings", e);
    }
  },

  updateSetting(key, value) {
    const settings = this.getSettings();
    settings[key] = value;
    this.saveSettings(settings);
    return settings;
  },

  getCustomTexts() {
    try {
      const data = localStorage.getItem(CUSTOM_TEXTS_KEY);
      return data ? JSON.parse(data) : [];
    } catch (e) {
      console.error("Failed to load custom texts", e);
      return [];
    }
  },

  saveCustomText(customText) {
    try {
      const texts = this.getCustomTexts();
      const existingIdx = texts.findIndex(t => t.id === customText.id);
      if (existingIdx >= 0) {
        texts[existingIdx] = customText;
      } else {
        texts.push(customText);
      }
      localStorage.setItem(CUSTOM_TEXTS_KEY, JSON.stringify(texts));
      return true;
    } catch (e) {
      console.error("Failed to save custom text", e);
      return false;
    }
  },

  deleteCustomText(textId) {
    try {
      const texts = this.getCustomTexts().filter(t => t.id !== textId);
      localStorage.setItem(CUSTOM_TEXTS_KEY, JSON.stringify(texts));
      return true;
    } catch (e) {
      console.error("Failed to delete custom text", e);
      return false;
    }
  },

  getUserNotes(textId, segmentRef) {
    try {
      const data = localStorage.getItem(NOTES_KEY);
      const notes = data ? JSON.parse(data) : {};
      const key = `${textId}:${segmentRef}`;
      return notes[key] || "";
    } catch (e) {
      return "";
    }
  },

  saveUserNote(textId, segmentRef, noteText) {
    try {
      const data = localStorage.getItem(NOTES_KEY);
      const notes = data ? JSON.parse(data) : {};
      const key = `${textId}:${segmentRef}`;
      if (!noteText || noteText.trim() === "") {
        delete notes[key];
      } else {
        notes[key] = noteText.trim();
      }
      localStorage.setItem(NOTES_KEY, JSON.stringify(notes));
      return true;
    } catch (e) {
      console.error("Failed to save user note", e);
      return false;
    }
  },

  getAllNotes() {
    try {
      const data = localStorage.getItem(NOTES_KEY);
      return data ? JSON.parse(data) : {};
    } catch (e) {
      return {};
    }
  },

  getBookmarks() {
    try {
      const data = localStorage.getItem(BOOKMARKS_KEY);
      return data ? JSON.parse(data) : [];
    } catch (e) {
      return [];
    }
  },

  toggleBookmark(bookmark) {
    try {
      const list = this.getBookmarks();
      const idx = list.findIndex(b => b.textId === bookmark.textId && b.segmentRef === bookmark.segmentRef);
      if (idx >= 0) {
        list.splice(idx, 1);
      } else {
        list.push({ ...bookmark, timestamp: new Date().toISOString() });
      }
      localStorage.setItem(BOOKMARKS_KEY, JSON.stringify(list));
      return idx < 0; // returns true if now bookmarked
    } catch (e) {
      console.error("Failed to toggle bookmark", e);
      return false;
    }
  },

  isBookmarked(textId, segmentRef) {
    const list = this.getBookmarks();
    return list.some(b => b.textId === textId && b.segmentRef === segmentRef);
  },

  // ─── Translation Arena ELO Storage ──────────────────────────────────────
  ARENA_KEY: "convivium_arena_ratings",

  getArenaRatings() {
    try {
      const data = localStorage.getItem(this.ARENA_KEY);
      return data ? JSON.parse(data) : {};
    } catch (e) {
      return {};
    }
  },

  getEditionRating(textId, editionId) {
    const all = this.getArenaRatings();
    const key = `${textId}:${editionId}`;
    return all[key] || { elo: 1200, wins: 0, losses: 0, matches: 0 };
  },

  recordArenaResult(textId, winnerId, loserId) {
    const all = this.getArenaRatings();
    const winKey = `${textId}:${winnerId}`;
    const loseKey = `${textId}:${loserId}`;

    const winner = all[winKey] || { elo: 1200, wins: 0, losses: 0, matches: 0 };
    const loser  = all[loseKey] || { elo: 1200, wins: 0, losses: 0, matches: 0 };

    // ELO update (K=32)
    const K = 32;
    const expectedW = 1 / (1 + Math.pow(10, (loser.elo - winner.elo) / 400));
    const expectedL = 1 - expectedW;
    winner.elo = Math.round(winner.elo + K * (1 - expectedW));
    loser.elo  = Math.round(loser.elo  + K * (0 - expectedL));

    winner.wins++;    winner.matches++;
    loser.losses++;   loser.matches++;

    all[winKey]  = winner;
    all[loseKey] = loser;

    try {
      localStorage.setItem(this.ARENA_KEY, JSON.stringify(all));
    } catch (e) {
      console.error("Failed to save arena ratings", e);
    }
    return { winner, loser };
  },

  resetArenaRatings() {
    try {
      localStorage.removeItem(this.ARENA_KEY);
    } catch (e) {}
  },

  // ─── Last Visited (Reading Progress) ─────────────────────────────────────
  LAST_VISITED_KEY: "convivium_last_visited",

  saveLastVisited(textId, segmentRef) {
    try {
      localStorage.setItem(this.LAST_VISITED_KEY, JSON.stringify({ textId, segmentRef, ts: Date.now() }));
    } catch (e) {}
  },

  getLastVisited() {
    try {
      const data = localStorage.getItem(this.LAST_VISITED_KEY);
      return data ? JSON.parse(data) : null;
    } catch (e) {
      return null;
    }
  }
};
