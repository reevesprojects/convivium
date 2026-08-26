// Convivium Multi-Corpus Search Service

import { TEXTS } from "../data/texts.js";
import { AUTHORS } from "../data/authors.js";
import { TRANSLATORS } from "../data/translators.js";
import { StorageService } from "./storage.js";

// Normalize Greek/Latin diacritics for flexible searching
export function normalizeText(str) {
  if (!str) return "";
  return str
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "") // remove Greek / Latin accents
    .toLowerCase()
    .trim();
}

export const SearchService = {
  search(rawQuery) {
    if (!rawQuery || rawQuery.trim().length < 2) {
      return { authors: [], translators: [], texts: [], segments: [] };
    }

    const query = rawQuery.trim();
    const normQuery = normalizeText(query);
    const customTexts = StorageService.getCustomTexts();
    const allTexts = [...TEXTS, ...customTexts];

    const results = {
      query,
      authors: [],
      translators: [],
      texts: [],
      segments: []
    };

    // 1. Search Authors
    AUTHORS.forEach(author => {
      const matchName = normalizeText(author.name).includes(normQuery);
      const matchOrig = normalizeText(author.originalName).includes(normQuery);
      const matchBio = normalizeText(author.bio).includes(normQuery);
      if (matchName || matchOrig || matchBio) {
        results.authors.push({
          ...author,
          matchField: matchName ? "Name" : matchOrig ? "Original Name" : "Biography"
        });
      }
    });

    // 2. Search Translators
    TRANSLATORS.forEach(translator => {
      const matchName = normalizeText(translator.name).includes(normQuery);
      const matchBio = normalizeText(translator.bio).includes(normQuery);
      const matchApproach = normalizeText(translator.approach).includes(normQuery);
      if (matchName || matchBio || matchApproach) {
        results.translators.push({
          ...translator,
          matchField: matchName ? "Name" : matchApproach ? "Translation Approach" : "Biography"
        });
      }
    });

    // 3. Search Texts Catalog
    allTexts.forEach(text => {
      const matchTitle = normalizeText(text.title).includes(normQuery);
      const matchOrig = normalizeText(text.originalTitle).includes(normQuery);
      const matchDesc = normalizeText(text.description).includes(normQuery);
      const matchTags = text.tags && text.tags.some(t => normalizeText(t).includes(normQuery));
      if (matchTitle || matchOrig || matchDesc || matchTags) {
        results.texts.push({
          ...text,
          matchField: matchTitle ? "Title" : matchOrig ? "Original Title" : matchTags ? "Tag" : "Description"
        });
      }

      // 4. Search Segments / Verses within Texts
      if (text.segments) {
        text.segments.forEach(seg => {
          let segmentMatched = false;
          let matchContext = "";
          let matchSource = "";

          // Check original Greek/Latin
          if (normalizeText(seg.source).includes(normQuery)) {
            segmentMatched = true;
            matchSource = "Original (" + text.language + ")";
            matchContext = seg.source;
          }

          // Check literal gloss
          if (!segmentMatched && seg.literal && normalizeText(seg.literal).includes(normQuery)) {
            segmentMatched = true;
            matchSource = "Literal Gloss";
            matchContext = seg.literal;
          }

          // Check each translation
          if (!segmentMatched && seg.translations) {
            for (const [transKey, transLine] of Object.entries(seg.translations)) {
              if (normalizeText(transLine).includes(normQuery)) {
                segmentMatched = true;
                const edition = text.sourceEditions?.find(e => e.id === transKey);
                matchSource = edition ? edition.name : transKey;
                matchContext = transLine;
                break;
              }
            }
          }

          // Check notes / commentary
          if (!segmentMatched && seg.notes && normalizeText(seg.notes).includes(normQuery)) {
            segmentMatched = true;
            matchSource = "Commentary Note";
            matchContext = seg.notes;
          }

          // Check vocabulary lemmas
          if (!segmentMatched && seg.vocab) {
            const vocabMatch = seg.vocab.find(v => 
              normalizeText(v.word).includes(normQuery) || 
              normalizeText(v.lemma).includes(normQuery) || 
              normalizeText(v.meaning).includes(normQuery)
            );
            if (vocabMatch) {
              segmentMatched = true;
              matchSource = `Vocabulary (${vocabMatch.lemma}: ${vocabMatch.meaning})`;
              matchContext = `${vocabMatch.word} (${vocabMatch.lemma}) - ${vocabMatch.meaning}`;
            }
          }

          if (segmentMatched) {
            results.segments.push({
              textId: text.id,
              textTitle: text.title,
              segmentRef: seg.ref,
              lineNum: seg.lineNum,
              matchSource,
              matchContext,
              segment: seg
            });
          }
        });
      }
    });

    return results;
  },

  highlightMatch(text, query) {
    if (!text || !query) return text;
    const escaped = query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const regex = new RegExp(`(${escaped})`, 'gi');
    return text.replace(regex, '<mark class="search-highlight">$1</mark>');
  }
};
