// Convivium Translation Variance & Diff Service

// Comprehensive multi-language stop-word list (English, Middle English, Old/Modern French, Latin, Greek common particles)
const STOP_WORDS = new Set([
  // English common particles, conjunctions, pronouns, prepositions, aux verbs
  "a", "about", "above", "after", "again", "against", "all", "am", "an", "and", "any", "are", "aren't", 
  "as", "at", "be", "because", "been", "before", "being", "below", "between", "both", "but", "by", 
  "can", "cannot", "could", "did", "didn't", "do", "does", "doesn't", "doing", "don't", "down", 
  "during", "each", "few", "for", "from", "further", "had", "hadn't", "has", "hasn't", "have", 
  "haven't", "having", "he", "he'd", "he'll", "he's", "her", "here", "hers", "herself", "him", 
  "himself", "his", "how", "i", "i'd", "i'll", "i'm", "i've", "if", "in", "into", "is", "isn't", 
  "it", "it's", "its", "itself", "let's", "me", "more", "most", "mustn't", "my", "myself", "no", 
  "nor", "not", "of", "off", "on", "once", "only", "or", "other", "ought", "our", "ours", "ourselves", 
  "out", "over", "own", "same", "shan't", "she", "she'd", "she'll", "she's", "should", "shouldn't", 
  "so", "some", "such", "than", "that", "that's", "the", "their", "theirs", "them", "themselves", 
  "then", "there", "there's", "these", "they", "they'd", "they'll", "they're", "they've", "this", 
  "those", "through", "to", "too", "under", "until", "up", "very", "was", "wasn't", "we", "we'd", 
  "we'll", "we're", "we've", "were", "weren't", "what", "what's", "when", "when's", "where", 
  "where's", "which", "while", "who", "who's", "whom", "why", "why's", "with", "won't", "would", 
  "wouldn't", "you", "you'd", "you'll", "you're", "you've", "your", "yours", "yourself", "yourselves",
  // Archaic / Early Modern English
  "thou", "thee", "thy", "thine", "ye", "hath", "doth", "art", "shalt", "wilt", "unto", "upon", "hast", "ere", "twixt",
  // Middle English common function words
  "þe", "þat", "þer", "þis", "watz", "hit", "hir", "his", "and", "in", "to", "of", "on", "wiþ", "fro", "for", "ne",
  // French / Old French articles and common pronouns
  "le", "la", "les", "un", "une", "des", "du", "de", "et", "ou", "en", "dans", "par", "pour", "sur", "avec", "qui", "que", "dont", "ce", "cet", "cette", "ces", "il", "elle", "ils", "elles", "ne", "pas", "se", "sa", "son", "ses", "li", "ad", "est", "fu", "tut"
]);

export function tokenize(text) {
  if (!text) return [];
  return text
    .toLowerCase()
    .replace(/[.,/#!$%^&*;:{}=\-_`~()—"“”'’]/g, " ")
    .split(/\s+/)
    .filter(w => w.length > 0);
}

export function isStopWord(word) {
  if (!word) return true;
  const clean = word.toLowerCase().replace(/[^a-z0-9þðȝæœ]/g, "");
  return clean.length <= 1 || STOP_WORDS.has(clean);
}

// Compute word sets and similarity metrics
export const DiffService = {
  getSimilarityScore(textA, textB) {
    const tokensA = new Set(tokenize(textA).filter(w => !isStopWord(w)));
    const tokensB = new Set(tokenize(textB).filter(w => !isStopWord(w)));
    if (tokensA.size === 0 && tokensB.size === 0) return 1;
    if (tokensA.size === 0 || tokensB.size === 0) return 0;

    let intersection = 0;
    tokensA.forEach(token => {
      if (tokensB.has(token)) intersection++;
    });

    const union = new Set([...tokensA, ...tokensB]).size;
    return union > 0 ? (intersection / union) : 0;
  },

  // Highlight meaningful shared key terms vs distinct lexical choices between translations
  highlightVariance(targetText, allTranslationTexts) {
    if (!targetText) return "";
    const words = targetText.split(/(\s+|[.,#!$%^&*;:{}=\-_`~()—"“”'’]+)/);
    
    // Build set of substantive words present in OTHER translations
    const otherWords = new Set();
    allTranslationTexts.forEach(other => {
      if (other !== targetText) {
        tokenize(other).forEach(w => {
          if (!isStopWord(w)) {
            otherWords.add(w);
          }
        });
      }
    });

    return words.map(chunk => {
      const clean = chunk.toLowerCase().replace(/[^a-z0-9þðȝæœ]/g, "");
      if (!clean) return chunk; // punctuation / whitespace

      // Do NOT highlight trivial grammatical stop words (the, and, of, in, to...)
      if (isStopWord(clean)) {
        return chunk;
      }

      if (otherWords.has(clean)) {
        return `<span class="diff-word diff-shared" title="Key term shared across translations: '${chunk}'">${chunk}</span>`;
      } else {
        return `<span class="diff-word diff-distinct" title="Distinct lexical phrasing by this translator: '${chunk}'">${chunk}</span>`;
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

