// Convivium Classical Meter & Scansion Engine

export const ScansionService = {
  // Common classical meters and their patterns
  METERS: {
    "Dactylic Hexameter": {
      name: "Dactylic Hexameter",
      feet: 6,
      schema: "–⏕ | –⏕ | –⏕ | –⏕ | –⏑⏑ | –⏓",
      description: "Epic meter of Homer and Virgil: six feet of dactyls (– ⏑ ⏑) or spondees (– –), with feminine/masculine caesura usually in the 3rd foot."
    },
    "Hendecasyllabic": {
      name: "Phalaecian Hendecasyllabic",
      feet: 5,
      schema: "– – | – ⏑ ⏑ | – ⏑ | – ⏑ | – ⏓",
      description: "Eleven-syllable lyric meter popularized by Catullus (base + dactyl + two trochees + anceps)."
    },
    "Elegiac Couplet": {
      name: "Elegiac Couplet",
      feet: 6,
      schema: "Hexameter (–⏕ | –⏕ | –⏕ | –⏕ | –⏑⏑ | –⏓) + Pentameter (–⏕ –⏕ – || –⏑⏑ –⏑⏑ ⏓)",
      description: "Alternating dactylic hexameter and dactylic pentameter, standard for Roman love elegy and epigram."
    },
    "Iambic Trimeter": {
      name: "Iambic Trimeter",
      feet: 3,
      schema: "⏓ – ⏑ – | ⏓ – ⏑ – | ⏓ – ⏑ ⏓",
      description: "Standard dramatic meter for Greek tragedy dialogue (Aeschylus, Sophocles, Euripides)."
    },
    "Sapphic Stanza": {
      name: "Sapphic Stanza",
      feet: 4,
      schema: "– ⏑ – ⏓ – || ⏑ ⏑ – ⏑ – ⏓ (x3) + – ⏑ ⏑ – ⏓ (Adonic)",
      description: "Aeolic lyric meter invented by Sappho: three hendecasyllabic lines followed by a short Adonic clausula."
    },
    "Greater Asclepiadean": {
      name: "Greater Asclepiadean",
      feet: 5,
      schema: "– – | – ⏑ ⏑ – || – ⏑ ⏑ – || – ⏑ ⏑ – | ⏑ –",
      description: "Aeolic choriambic lyric meter favored by Horace in Odes (e.g. 1.11 Carpe Diem)."
    }
  },

  /**
   * Format scansion string for visual display with highlighted feet and caesura markers.
   */
  formatScansionDisplay(scansionStr) {
    if (!scansionStr) return "";
    
    return scansionStr
      .split("||")
      .map(half => {
        return half
          .split("|")
          .map(foot => `<span class="scansion-foot">${foot.trim()}</span>`)
          .join(`<span class="scansion-divider">|</span>`);
      })
      .join(`<span class="scansion-caesura" title="Principal Caesura (Pause)">‖</span>`);
  },

  /**
   * Syllable weight approximation fallback
   */
  approximateVerseScansion(text, meterType = "Dactylic Hexameter") {
    if (!text) return "";
    const m = meterType.toLowerCase();
    if (m.includes("hexameter")) {
      return "– ⏑ ⏑ | – ⏑ ⏑ | – ‖ ⏑ ⏑ | – ⏑ ⏑ | – ⏑ ⏑ | – –";
    } else if (m.includes("trimeter")) {
      return "⏑ – ⏑ – | ⏑ – ‖ ⏑ – | ⏑ – ⏑ –";
    } else if (m.includes("hendecasyllabic")) {
      return "– – | – ⏑ ⏑ | – ⏑ | – ⏑ | – ⏓";
    } else if (m.includes("sapphic")) {
      return "– ⏑ – – – ‖ ⏑ ⏑ – ⏑ – –";
    } else if (m.includes("asclepiadean")) {
      return "– – | – ⏑ ⏑ – ‖ – ⏑ ⏑ – ‖ – ⏑ ⏑ – | ⏑ –";
    }
    return "– ⏑ ⏑ | – ⏑ ⏑ | – ‖ – | – ⏑ ⏑ | – –";
  }
};
