// Convivium Translation Variance & Diff Service

export function tokenize(text) {
  if (!text) return [];
  return text
    .toLowerCase()
    .replace(/[.,/#!$%^&*;:{}=\-_`~()—"“”'’]/g, " ")
    .split(/\s+/)
    .filter(w => w.length > 0);
}

// Compute word sets and similarity metrics
export const DiffService = {
  getSimilarityScore(textA, textB) {
    const tokensA = new Set(tokenize(textA));
    const tokensB = new Set(tokenize(textB));
    if (tokensA.size === 0 && tokensB.size === 0) return 1;
    if (tokensA.size === 0 || tokensB.size === 0) return 0;

    let intersection = 0;
    tokensA.forEach(token => {
      if (tokensB.has(token)) intersection++;
    });

    const union = new Set([...tokensA, ...tokensB]).size;
    return union > 0 ? (intersection / union) : 0;
  },

  // Highlight shared vs distinct words between an active line and reference translations
  highlightVariance(targetText, allTranslationTexts) {
    if (!targetText) return "";
    const words = targetText.split(/(\s+|[.,/#!$%^&*;:{}=\-_`~()—"“”'’]+)/);
    
    // Build set of words present in OTHER translations
    const otherWords = new Set();
    allTranslationTexts.forEach(other => {
      if (other !== targetText) {
        tokenize(other).forEach(w => otherWords.add(w));
      }
    });

    return words.map(chunk => {
      const clean = chunk.toLowerCase().replace(/[^a-z0-9]/g, "");
      if (!clean) return chunk; // punctuation / whitespace

      if (otherWords.has(clean)) {
        return `<span class="diff-word diff-shared" title="Word shared in other translations">${chunk}</span>`;
      } else {
        return `<span class="diff-word diff-distinct" title="Distinct lexical choice by this translator">${chunk}</span>`;
      }
    }).join("");
  },

  // Word count and meter statistics
  getTextMetrics(text) {
    if (!text) return { words: 0, chars: 0, syllablesApprox: 0 };
    const tokens = tokenize(text);
    // Approximation for English syllables
    const syllables = tokens.reduce((acc, word) => {
      const matches = word.match(/[aeiouy]{1,2}/g);
      return acc + (matches ? Math.max(1, matches.length) : 1);
    }, 0);

    return {
      words: tokens.length,
      chars: text.length,
      syllablesApprox: syllables
    };
  }
};
