// Convivium — Translation Arena
// Blind pairwise battle between two anonymous translations.
// The user picks the better one; an ELO leaderboard is maintained.

import { TEXTS } from "../data/texts.js";
import { StorageService } from "../services/storage.js";

// ─── Pick only texts that have 2+ translation editions ─────────────────────
function getArenaTexts() {
  const custom = StorageService.getCustomTexts();
  return [...TEXTS, ...custom].filter(
    t => (t.sourceEditions || []).filter(e => e.type === "translation").length >= 2
  );
}

// ─── Shuffle helper ─────────────────────────────────────────────────────────
function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

// ─── Random segment from text ───────────────────────────────────────────────
function pickSegment(text) {
  const segs = (text.segments || []).filter(
    s => s.translations && Object.keys(s.translations).length >= 2
  );
  if (!segs.length) return null;
  return segs[Math.floor(Math.random() * segs.length)];
}

// ─── Arena State ─────────────────────────────────────────────────────────────
const ArenaView = {
  text: null,
  segment: null,
  edA: null,
  edB: null,
  voted: false,
  winnerId: null,

  // ─── Prepare a fresh matchup ──────────────────────────────────────────────
  newMatchup(preferTextId) {
    this.voted    = false;
    this.winnerId = null;

    const allTexts = getArenaTexts();
    if (!allTexts.length) { this.text = null; return; }

    const candidates = preferTextId
      ? allTexts.filter(t => t.id === preferTextId)
      : allTexts;
    this.text = (candidates.length ? candidates : allTexts)[
      Math.floor(Math.random() * (candidates.length || allTexts.length))
    ];

    this.segment = pickSegment(this.text);
    if (!this.segment) { this.text = null; return; }

    const transEditions = shuffle(
      this.text.sourceEditions.filter(
        e => e.type === "translation" && this.segment.translations[e.id]
      )
    );
    [this.edA, this.edB] = transEditions;
  },

  // ─── Public render entry ─────────────────────────────────────────────────
  render(containerEl, preferTextId) {
    this.newMatchup(preferTextId || "");
    this._paint(containerEl);
  },

  // ─── Paint current state ─────────────────────────────────────────────────
  _paint(containerEl) {
    const ratings     = StorageService.getArenaRatings();
    const leaderboard = this._buildLeaderboard(ratings);

    if (!this.text || !this.segment) {
      containerEl.innerHTML = `
        <div style="max-width:720px;margin:0 auto;text-align:center;padding:4rem 1rem;">
          <h2 style="font-family:var(--font-title);font-size:2rem;margin-bottom:1rem;">⚔️ Translation Arena</h2>
          <p style="color:var(--text-muted);">No texts with multiple translations found.
          <a href="#/catalog" class="btn btn-primary" style="margin-top:1rem;display:inline-block;">Browse Library</a></p>
        </div>`;
      return;
    }

    const textA = this.segment.translations[this.edA.id] || "";
    const textB = this.segment.translations[this.edB.id] || "";
    const sourceEd = this.text.sourceEditions.find(e => e.type === "source");

    containerEl.innerHTML = `
      <div class="arena-shell" id="arena-shell">

        <!-- Header -->
        <div class="arena-header">
          <div class="arena-title-block">
            <h1 class="arena-title">⚔️ Translation Arena</h1>
            <p class="arena-subtitle">
              Which translation speaks to you? Translators are anonymous until you vote.
            </p>
          </div>
          <div class="arena-header-actions">
            <div style="display:flex;align-items:center;gap:0.5rem;">
              <label for="arena-text-select" style="font-size:0.8rem;color:var(--text-muted);white-space:nowrap;">
                📖 Work:
              </label>
              <select id="arena-text-select" class="arena-select">
                <option value="">Random text</option>
                ${getArenaTexts().map(t => `
                  <option value="${t.id}" ${this.text.id === t.id ? "selected" : ""}>
                    ${t.title}
                  </option>`).join("")}
              </select>
            </div>
            <button class="btn btn-secondary btn-sm" id="arena-next-btn">🔀 New Matchup</button>
            <button class="btn btn-ghost btn-sm" id="arena-reset-btn">🗑️ Reset Ratings</button>
          </div>
        </div>

        <!-- Passage context strip -->
        <div class="arena-context-strip">
          <span class="arena-work-badge">${this.text.title} &mdash; <em>${this.text.originalTitle}</em></span>
          <span class="arena-ref-badge">📍 ${this.segment.ref}</span>
          ${sourceEd ? `<span class="arena-source-text font-cardo">${this.segment.source}</span>` : ""}
        </div>

        <!-- Battle cards -->
        <div class="arena-battle-grid" id="arena-battle-grid">
          ${this._renderCard("A", textA)}
          <div class="arena-vs-divider"><span class="arena-vs-label">VS</span></div>
          ${this._renderCard("B", textB)}
        </div>

        <!-- Result banner (shown after vote) -->
        <div class="arena-result" id="arena-result" style="display:${this.voted ? "flex" : "none"}">
          ${this.voted ? this._renderResult() : ""}
        </div>

        <!-- Leaderboard -->
        <div class="arena-leaderboard-section">
          <div class="arena-leaderboard-header">
            <h2 class="arena-leaderboard-title">🏆 Leaderboard &mdash; ${this.text.title}</h2>
            <span style="font-size:0.8rem;color:var(--text-muted);">ELO-ranked by your votes</span>
          </div>
          ${leaderboard.length ? `
            <div class="arena-leaderboard-grid">
              ${leaderboard.map((item, i) => `
                <div class="arena-lb-row ${i === 0 ? "rank-1" : i === 1 ? "rank-2" : i === 2 ? "rank-3" : ""}">
                  <span class="rank-badge">${["🥇","🥈","🥉"][i] || "#" + (i+1)}</span>
                  <div class="lb-ed-info">
                    <span class="lb-ed-name">${item.name}</span>
                    <span class="lb-ed-year">${item.year}</span>
                  </div>
                  <div class="lb-stats">
                    <span class="lb-elo">${item.rating.elo}</span>
                    <span class="lb-wl">${item.rating.wins}W / ${item.rating.losses}L</span>
                  </div>
                  <div class="lb-bar-wrap">
                    <div class="lb-bar" style="width:${
                      Math.min(100, Math.round((item.rating.wins / Math.max(1, item.rating.matches)) * 100))
                    }%"></div>
                  </div>
                </div>`).join("")}
            </div>` : `
            <p class="arena-empty-lb">
              No matches yet for <strong>${this.text.title}</strong>. Vote above to start ranking translations!
            </p>`}
        </div>

      </div>`;

    this._attachEvents(containerEl);
  },

  _renderCard(slot, text) {
    const edId     = slot === "A" ? this.edA.id : this.edB.id;
    const ed       = slot === "A" ? this.edA     : this.edB;
    const isWinner = this.voted && this.winnerId === edId;
    const isLoser  = this.voted && this.winnerId !== null && this.winnerId !== edId;

    return `
      <div class="arena-card ${this.voted ? (isWinner ? "winner-card" : "loser-card") : ""}"
           id="arena-card-${slot}" data-slot="${slot}" data-ed-id="${edId}">
        <div class="arena-card-label">
          ${this.voted
            ? `<span class="arena-translator-reveal">${isWinner ? "🏆 " : ""}${ed.name}${ed.year ? " (" + ed.year + ")" : ""}${isWinner ? " — Winner!" : ""}</span>`
            : `<span class="arena-anon-badge">Translation ${slot}</span>`}
        </div>
        <blockquote class="arena-passage">${text}</blockquote>
        ${!this.voted
          ? `<button class="btn arena-vote-btn" data-vote="${edId}" id="arena-vote-${slot}">
               👑 This one
             </button>`
          : `<div class="arena-result-chip ${isWinner ? "chip-win" : "chip-lose"}">
               ${isWinner ? "✓ Your choice" : "✗ Not chosen"}
             </div>`}
      </div>`;
  },

  _renderResult() {
    const winner  = this.edA.id === this.winnerId ? this.edA : this.edB;
    const loser   = this.edA.id === this.winnerId ? this.edB : this.edA;
    const wRating = StorageService.getEditionRating(this.text.id, winner.id);
    const lRating = StorageService.getEditionRating(this.text.id, loser.id);
    return `
      <div class="arena-result-banner">
        <div class="result-icon">🏆</div>
        <div>
          <div class="result-winner-name">${winner.name} wins this round!</div>
          <div class="result-elo-change">
            New ELO &mdash; ${winner.name}: <strong>${wRating.elo}</strong>
            &nbsp;|&nbsp; ${loser.name}: <strong>${lRating.elo}</strong>
          </div>
        </div>
        <button class="btn btn-primary" id="arena-continue-btn">⚔️ Next Match</button>
      </div>`;
  },

  _buildLeaderboard(ratings) {
    if (!this.text) return [];
    return (this.text.sourceEditions || [])
      .filter(e => e.type === "translation")
      .map(ed => ({ ...ed, rating: ratings[`${this.text.id}:${ed.id}`] || { elo: 1200, wins: 0, losses: 0, matches: 0 } }))
      .filter(ed => ed.rating.matches > 0)
      .sort((a, b) => b.rating.elo - a.rating.elo);
  },

  _attachEvents(containerEl) {
    // Vote
    containerEl.querySelectorAll(".arena-vote-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        const votedId = btn.dataset.vote;
        const otherId = votedId === this.edA.id ? this.edB.id : this.edA.id;
        StorageService.recordArenaResult(this.text.id, votedId, otherId);
        this.voted    = true;
        this.winnerId = votedId;
        this._paint(containerEl);
      });
    });

    // Next (skip / after vote)
    const nextBtn = containerEl.querySelector("#arena-next-btn");
    nextBtn?.addEventListener("click", () => {
      const sel = containerEl.querySelector("#arena-text-select");
      this.render(containerEl, sel?.value || "");
    });

    // Continue after vote
    const contBtn = containerEl.querySelector("#arena-continue-btn");
    contBtn?.addEventListener("click", () => {
      const sel = containerEl.querySelector("#arena-text-select");
      this.render(containerEl, sel?.value || this.text.id);
    });

    // Text selector
    const sel = containerEl.querySelector("#arena-text-select");
    sel?.addEventListener("change", () => {
      this.render(containerEl, sel.value || "");
    });

    // Reset
    const resetBtn = containerEl.querySelector("#arena-reset-btn");
    resetBtn?.addEventListener("click", () => {
      if (confirm("Reset all Arena ELO ratings? This cannot be undone.")) {
        StorageService.resetArenaRatings();
        this._paint(containerEl);
      }
    });
  }
};

export { ArenaView };
