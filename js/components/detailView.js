// Convivium Detailed Profile Views (Text, Author, Translator)

import { TEXTS } from "../data/texts.js";
import { AUTHORS } from "../data/authors.js";
import { TRANSLATORS } from "../data/translators.js";
import { StorageService } from "../services/storage.js";

export const DetailView = {
  renderTextDetail(containerEl, textId) {
    const customTexts = StorageService.getCustomTexts();
    const text = [...TEXTS, ...customTexts].find(t => t.id === textId);
    if (!text) {
      containerEl.innerHTML = `<div style="padding: 3rem; text-align: center;"><h3>Text Not Found</h3><a href="#/catalog" class="btn btn-secondary">Return to Catalog</a></div>`;
      return;
    }

    const author = AUTHORS.find(a => a.id === text.authorId);
    const authorName = author ? author.name : text.authorId;

    containerEl.innerHTML = `
      <div style="max-width: 1000px; margin: 0 auto;">
        <div style="margin-bottom: 1.5rem;">
          <a href="#/catalog" class="btn btn-ghost btn-sm">&larr; Back to Library</a>
        </div>

        <div class="card" style="margin-bottom: 2rem;">
          <div class="card-header" style="border-bottom: 1px solid var(--border-subtle); padding-bottom: 1rem; margin-bottom: 1rem;">
            <div>
              <h1 class="card-title" style="font-size: 2rem;">${text.title}</h1>
              <div class="card-subtitle" style="font-size: 1.2rem;">
                <cite>${text.originalTitle}</cite> — by <a href="#/authors/${text.authorId}" style="color: var(--accent-primary); text-decoration: underline;">${authorName}</a>
              </div>
            </div>
            <span class="pill ${text.language.includes('Greek') ? 'pill-greek' : 'pill-latin'}" style="font-size: 0.9rem;">
              ${text.language}
            </span>
          </div>

          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1rem; margin-bottom: 1.5rem; background-color: var(--bg-secondary); padding: 1rem; border-radius: var(--radius-md);">
            <div>
              <span style="font-size: 0.75rem; color: var(--text-muted); text-transform: uppercase; font-weight: 700; display: block;">Date</span>
              <strong>${text.date}</strong>
            </div>
            <div>
              <span style="font-size: 0.75rem; color: var(--text-muted); text-transform: uppercase; font-weight: 700; display: block;">Format / Meter</span>
              <strong>${text.format}</strong>
            </div>
            <div>
              <span style="font-size: 0.75rem; color: var(--text-muted); text-transform: uppercase; font-weight: 700; display: block;">Genre</span>
              <strong>${text.genre}</strong>
            </div>
            <div>
              <span style="font-size: 0.75rem; color: var(--text-muted); text-transform: uppercase; font-weight: 700; display: block;">Passage Ref</span>
              <strong>${text.passageRef}</strong>
            </div>
          </div>

          <p style="font-size: 1.05rem; line-height: 1.6; margin-bottom: 1.5rem; color: var(--text-secondary);">
            ${text.description}
          </p>

          <div style="margin-bottom: 2rem;">
            <h3 style="font-family: var(--font-title); margin-bottom: 0.75rem;">Available Translations & Editions</h3>
            <div style="display: flex; flex-direction: column; gap: 0.5rem;">
              ${text.sourceEditions.map(ed => `
                <div style="display: flex; justify-content: space-between; align-items: center; padding: 0.75rem 1rem; background-color: var(--bg-surface); border: 1px solid var(--border-subtle); border-radius: var(--radius-md);">
                  <div>
                    <strong>${ed.type === 'source' ? '🏛️ ' : '✒️ '}${ed.name}</strong>
                    ${ed.highlights ? `<div style="font-size: 0.85rem; color: var(--text-muted);">${ed.highlights}</div>` : ''}
                  </div>
                  <div style="display: flex; gap: 0.5rem; align-items: center;">
                    <span class="pill pill-gold">${ed.year}</span>
                    ${ed.meter ? `<span class="pill pill-verse">${ed.meter}</span>` : ''}
                  </div>
                </div>
              `).join("")}
            </div>
          </div>

          <div style="display: flex; gap: 1rem;">
            <a href="#/compare/${text.id}" class="btn btn-primary" style="flex: 1;">
              <span>⚡ Open in Parallel Studio</span>
            </a>
            <a href="#/compare/${text.id}?mode=interlinear" class="btn btn-secondary" style="flex: 1;">
              <span>☰ Open in Interlinear Mode</span>
            </a>
          </div>
        </div>
      </div>
    `;
  },

  renderAuthorDetail(containerEl, authorId) {
    const author = AUTHORS.find(a => a.id === authorId);
    if (!author) {
      containerEl.innerHTML = `<div style="padding: 3rem; text-align: center;"><h3>Author Not Found</h3></div>`;
      return;
    }

    const authorTexts = TEXTS.filter(t => t.authorId === author.id);

    containerEl.innerHTML = `
      <div style="max-width: 900px; margin: 0 auto;">
        <div style="margin-bottom: 1.5rem;">
          <a href="#/catalog" class="btn btn-ghost btn-sm">&larr; Back to Directory</a>
        </div>

        <div class="card" style="margin-bottom: 2rem;">
          <div class="card-header">
            <div>
              <h1 class="card-title" style="font-size: 2.2rem;">${author.image} ${author.name}</h1>
              <div class="card-subtitle" style="font-size: 1.3rem;"><cite>${author.originalName}</cite> • ${author.era}</div>
            </div>
            <span class="pill ${author.language.includes('Greek') ? 'pill-greek' : 'pill-latin'}" style="font-size: 0.9rem;">
              ${author.language}
            </span>
          </div>

          <div class="card-meta" style="margin-bottom: 1.5rem;">
            <span class="pill pill-gold">${author.period}</span>
            ${author.genres.map(g => `<span class="pill pill-verse">${g}</span>`).join("")}
          </div>

          <p style="font-size: 1.05rem; line-height: 1.7; color: var(--text-secondary); margin-bottom: 2rem;">
            ${author.bio}
          </p>

          <h3 style="font-family: var(--font-title); margin-bottom: 1rem;">Works by ${author.name} in Library</h3>
          <div style="display: flex; flex-direction: column; gap: 0.75rem;">
            ${authorTexts.map(t => `
              <div style="display: flex; justify-content: space-between; align-items: center; padding: 1rem; background-color: var(--bg-secondary); border-radius: var(--radius-md);">
                <div>
                  <h4 style="font-family: var(--font-title); font-size: 1.15rem;">${t.title} (${t.originalTitle})</h4>
                  <div style="font-size: 0.85rem; color: var(--text-muted);">${t.format} • ${t.date}</div>
                </div>
                <a href="#/compare/${t.id}" class="btn btn-primary btn-sm">
                  Compare Translations &raquo;
                </a>
              </div>
            `).join("")}
          </div>
        </div>
      </div>
    `;
  },

  renderTranslatorDetail(containerEl, translatorId) {
    const translator = TRANSLATORS.find(t => t.id === translatorId);
    if (!translator) {
      containerEl.innerHTML = `<div style="padding: 3rem; text-align: center;"><h3>Translator Not Found</h3></div>`;
      return;
    }

    containerEl.innerHTML = `
      <div style="max-width: 900px; margin: 0 auto;">
        <div style="margin-bottom: 1.5rem;">
          <a href="#/catalog" class="btn btn-ghost btn-sm">&larr; Back to Directory</a>
        </div>

        <div class="card" style="margin-bottom: 2rem;">
          <div class="card-header">
            <div>
              <h1 class="card-title" style="font-size: 2.2rem;">✒️ ${translator.name}</h1>
              <div class="card-subtitle" style="font-size: 1.15rem;">${translator.dates} • ${translator.nationality}</div>
            </div>
            <span class="pill pill-gold">${translator.century}</span>
          </div>

          <div style="background-color: var(--accent-surface); border: 1px solid var(--border-subtle); border-radius: var(--radius-md); padding: 1.25rem; margin-bottom: 1.5rem;">
            <div style="font-size: 0.8rem; font-weight: 700; text-transform: uppercase; color: var(--accent-primary); margin-bottom: 0.25rem;">
              Translation Philosophy & Style
            </div>
            <p style="font-size: 1.05rem; font-style: italic; color: var(--text-primary); line-height: 1.5;">
              "${translator.approach}"
            </p>
          </div>

          <p style="font-size: 1.05rem; line-height: 1.7; color: var(--text-secondary); margin-bottom: 2rem;">
            ${translator.bio}
          </p>

          <h3 style="font-family: var(--font-title); margin-bottom: 0.75rem;">Notable Classical Translations</h3>
          <ul style="padding-left: 1.5rem; line-height: 1.8; color: var(--text-secondary); margin-bottom: 2rem;">
            ${translator.notableWorks.map(w => `<li><strong>${w}</strong></li>`).join("")}
          </ul>

          ${(() => {
            const corpusTexts = TEXTS.filter(t =>
              t.sourceEditions && t.sourceEditions.some(ed =>
                ed.type === "translation" &&
                (ed.translatorId === translator.id ||
                 (ed.name && ed.name.toLowerCase().includes(translator.name.toLowerCase().split(' ').pop())))
              )
            );
            if (!corpusTexts.length) return '';
            return `
              <h3 style="font-family: var(--font-title); margin-bottom: 0.75rem;">Texts Available in Convivium</h3>
              <div style="display: flex; flex-direction: column; gap: 0.5rem; margin-bottom: 2rem;">
                ${corpusTexts.map(t => {
                  const ed = t.sourceEditions.find(e =>
                    e.type === "translation" &&
                    (e.translatorId === translator.id ||
                     (e.name && e.name.toLowerCase().includes(translator.name.toLowerCase().split(' ').pop())))
                  );
                  return `
                    <div style="display: flex; justify-content: space-between; align-items: center; padding: 0.75rem 1rem; background-color: var(--bg-surface); border: 1px solid var(--border-subtle); border-radius: var(--radius-md);">
                      <div>
                        <strong style="font-family: var(--font-title);">${t.title}</strong>
                        <div style="font-size: 0.82rem; color: var(--text-muted);">${ed ? ed.name : ''} &mdash; ${t.passageRef}</div>
                      </div>
                      <a href="#/compare/${t.id}" class="btn btn-primary btn-sm">Compare &raquo;</a>
                    </div>
                  `;
                }).join('')}
              </div>
            `;
          })()}
        </div>
      </div>
    `;
  }
};
