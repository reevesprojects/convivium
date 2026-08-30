// Convivium Translators Directory & Dynamic Corpus Synthesis
// Merges rich hand-curated scholarly biographies with dynamically generated profiles 
// for every translator and critical edition across all 86 corpus texts.

import { TEXTS } from "./texts.js";

// 1. Hand-Curated Detailed Biographies & Translation Philosophies
export const CURATED_TRANSLATORS = [
  {
    "id": "emily-wilson",
    "name": "Emily Wilson",
    "dates": "b. 1971",
    "nationality": "British-American",
    "century": "21st Century",
    "style": "Iambic Pentameter, strict line-for-line matching",
    "bio": "Classicist and Professor of Classical Studies at the University of Pennsylvania. Her 2017 translation of the Odyssey was the first published English translation by a woman, praised for its rhythmic vitality, directness, and moral clarity.",
    "approach": "Translates Homer into regular iambic pentameter, matching the line count of the Greek original line-for-line without inflated archaism.",
    "notableWorks": [
      "Homer: Odyssey (2017)",
      "Homer: Iliad (2023)"
    ]
  },
  {
    "id": "robert-fagles",
    "name": "Robert Fagles",
    "dates": "1933 – 2008",
    "nationality": "American",
    "century": "20th Century",
    "style": "Flexible, loose 5-to-6 beat modern verse",
    "bio": "Renowned American translator and professor of comparative literature at Princeton University. His Homeric and Virgilian translations are celebrated for their muscular, performative energy and vivid contemporary English.",
    "approach": "Aims for a performable, spoken delivery with modern dramatic cadence while preserving epic grandeur.",
    "notableWorks": [
      "Homer: Iliad (1990)",
      "Homer: Odyssey (1996)",
      "Virgil: Aeneid (2006)",
      "Dante: Inferno (2006)"
    ]
  },
  {
    "id": "alexander-pope",
    "name": "Alexander Pope",
    "dates": "1688 – 1744",
    "nationality": "English",
    "century": "18th Century (Augustan)",
    "style": "Heroic Couplets (rhymed iambic pentameter)",
    "bio": "One of the greatest English poets of the Augustan period. His monumental rhymed translations of Homer were widely acclaimed and financially secured his literary independence.",
    "approach": "Grand, stately neoclassical style with polished heroic couplets, emphasizing moral dignity and sublime rhetorical balance.",
    "notableWorks": [
      "Homer: Iliad (1715–1720)",
      "Homer: Odyssey (1725–1726)"
    ]
  },
  {
    "id": "george-chapman",
    "name": "George Chapman",
    "dates": "c. 1559 – 1634",
    "nationality": "English",
    "century": "17th Century (Renaissance / Elizabethan)",
    "style": "Fourteeners (Iliad), Rhymed Iambic Pentameter (Odyssey)",
    "bio": "Renaissance dramatist, translator, and poet. His Homer was famously commemorated in John Keats's sonnet 'On First Looking into Chapman's Homer'.",
    "approach": "Vigorous, Elizabethan poetic drive filled with philosophical conceits, passion, and Renaissance metaphors.",
    "notableWorks": [
      "Homer: Iliad (1611)",
      "Homer: Odyssey (1616)"
    ]
  },
  {
    "id": "richmond-lattimore",
    "name": "Richmond Lattimore",
    "dates": "1906 – 1984",
    "nationality": "American",
    "century": "20th Century",
    "style": "Six-beat free verse accentual hexameter",
    "bio": "Classicist and poet at Bryn Mawr College. His translations of Homer and Greek drama are prized for their unparalleled fidelity to the Greek word order and syntax.",
    "approach": "Close syntactic fidelity aiming to reproduce the unhurried dactylic sweep of the Greek hexameter without English artificiality.",
    "notableWorks": [
      "Homer: Iliad (1951)",
      "Homer: Odyssey (1965)",
      "Aeschylus: Oresteia (1953)"
    ]
  },
  {
    "id": "john-dryden",
    "name": "John Dryden",
    "dates": "1631 – 1700",
    "nationality": "English",
    "century": "17th Century (Restoration)",
    "style": "Heroic Couplets (rhymed)",
    "bio": "England's first Poet Laureate. His translation of Virgil's Aeneid remains one of the crowning achievements of English verse translation.",
    "approach": "Defined translation modes (metaphrase, paraphrase, imitation); produced a majestic, resonant English Virgil.",
    "notableWorks": [
      "Virgil: The Works of Virgil (1697)"
    ]
  },
  {
    "id": "sarah-ruden",
    "name": "Sarah Ruden",
    "dates": "b. 1962",
    "nationality": "American",
    "century": "21st Century",
    "style": "Strict Line-for-line Iambic Hexameter / Pentameter",
    "bio": "American poet, translator, and essayist. Her translations of Virgil, Augustine, Sophocles, and the Gospels are renowned for their poetic compression and precision.",
    "approach": "Focuses on Latin concision and poetic resonance, preserving the exact line count and rhythmic urgency of the original.",
    "notableWorks": [
      "Virgil: Aeneid (2008)",
      "Augustine: Confessions (2017)",
      "Sophocles: Oedipus (2010)"
    ]
  },
  {
    "id": "benjamin-jowett",
    "name": "Benjamin Jowett",
    "dates": "1817 – 1893",
    "nationality": "English",
    "century": "19th Century (Victorian)",
    "style": "Victorian scholarly prose",
    "bio": "Master of Balliol College, Oxford, and Regius Professor of Greek. His translations of Plato's dialogues became the standard English editions for generations.",
    "approach": "Elevated, fluent Victorian prose designed to make classical philosophy transparent and engaging.",
    "notableWorks": [
      "Plato: The Dialogues of Plato (1871)",
      "Thucydides (1881)"
    ]
  },
  {
    "id": "anne-carson",
    "name": "Anne Carson",
    "dates": "b. 1950",
    "nationality": "Canadian",
    "century": "21st Century",
    "style": "Minimalist, lyrical, avant-garde verse",
    "bio": "MacArthur Fellow, poet, essayist, and classicist. Her translations of Sappho (If Not, Winter), Aeschylus, Euripides, and Sophocles are celebrated for their stark emotional immediacy.",
    "approach": "Preserves the physical fragmentary gaps of the papyri, creating intense emotional resonance and contemporary clarity.",
    "notableWorks": [
      "Sappho: If Not, Winter (2002)",
      "Grief Lessons: Four Plays by Euripides (2006)",
      "Aeschylus: Agamemnon (2009)",
      "Sophocles: Oedipus Rex (2002)"
    ]
  },
  {
    "id": "gregory-hays",
    "name": "Gregory Hays",
    "dates": "b. 1966",
    "nationality": "American",
    "century": "21st Century",
    "style": "Modern lucid prose",
    "bio": "Professor of Classics at the University of Virginia. His translation of Marcus Aurelius for Modern Library revitalized the text for modern general readers.",
    "approach": "Crisp, unadorned, forceful English reflecting Marcus Aurelius's private, urgent spiritual self-counsel.",
    "notableWorks": [
      "Marcus Aurelius: Meditations (2002)"
    ]
  },
  {
    "id": "robert-alter",
    "name": "Robert Alter",
    "dates": "b. 1935",
    "nationality": "American",
    "century": "21st Century",
    "style": "Rhythmic, idiomatic Hebrew-cadenced English prose and verse",
    "bio": "Emeritus Professor of Hebrew and Comparative Literature at UC Berkeley. Single-handedly translated the entire Hebrew Bible over two decades, winning the PEN Lifetime Achievement Award.",
    "approach": "Preserves the concrete sensory metaphors, parataxis ('and... and...'), and rhythmic poetic parallelisms of ancient Biblical Hebrew.",
    "notableWorks": [
      "The Five Books of Moses: Genesis (2004)",
      "The Book of Psalms (2007)",
      "The Hebrew Bible: Complete Translation (2018)"
    ]
  },
  {
    "id": "peter-green",
    "name": "Peter Green",
    "dates": "1924 – 2024",
    "nationality": "British",
    "century": "21st Century",
    "style": "Strict hexameter line-for-line verse",
    "bio": "Dougherty Centennial Professor Emeritus of Classics at the University of Texas at Austin. Celebrated for his monumental translations of Homer, Hesiod, Apollonius, and Juvenal.",
    "approach": "Rigorously reproduces the six-beat line and unembellished Greek spoken realism without Victorian romanticizing.",
    "notableWorks": [
      "Homer: The Iliad (2015)",
      "Homer: The Odyssey (2018)",
      "Hesiod: Theogony and Works and Days (2004)"
    ]
  },
  {
    "id": "c-d-c-reeve",
    "name": "C. D. C. Reeve",
    "dates": "b. 1948",
    "nationality": "Irish-American",
    "century": "21st Century",
    "style": "Philosophically precise, lucid modern prose",
    "bio": "Delta Kappa Epsilon Distinguished Professor of Philosophy at UNC Chapel Hill, renowned for his definitive translations of Plato and Aristotle for Hackett Publishing.",
    "approach": "Exact philosophical terminology and syntactical transparency designed for serious philosophical inquiry.",
    "notableWorks": [
      "Plato: Republic (2004)",
      "Aristotle: Politics (2017)",
      "Aristotle: Nicomachean Ethics (2014)"
    ]
  },
  {
    "id": "simon-armitage",
    "name": "Simon Armitage",
    "dates": "b. 1963",
    "nationality": "British",
    "century": "21st Century",
    "style": "Modern alliterative verse with Yorkshire dialect resonance",
    "bio": "UK Poet Laureate and Professor of Poetry at the University of Leeds. Celebrated for his transformative alliterative translations of Sir Gawain and the Green Knight and Pearl.",
    "approach": "Dynamic modern alliteration that captures the muscular pulse and landscape imagery of Middle English romance.",
    "notableWorks": [
      "Sir Gawain and the Green Knight (2007)",
      "Pearl (2016)",
      "The Death of King Arthur (2012)"
    ]
  },
  {
    "id": "edith-grossman",
    "name": "Edith Grossman",
    "dates": "1936 – 2023",
    "nationality": "American",
    "century": "21st Century",
    "style": "Vibrant, contemporary, rhythmically nuanced prose",
    "bio": "Renowned American translator of Latin American and Spanish Golden Age literature. Her translation of Don Quixote was acclaimed by Harold Bloom as a masterwork.",
    "approach": "Preserves Cervantes's wit, narrative momentum, and subtle irony in fluent, natural modern English.",
    "notableWorks": [
      "Miguel de Cervantes: Don Quixote (2003)",
      "Gabriel García Márquez: Love in the Time of Cholera (1988)"
    ]
  },
  {
    "id": "richard-pevear-larissa-volokhonsky",
    "name": "Richard Pevear & Larissa Volokhonsky",
    "dates": "b. 1943 / b. 1945",
    "nationality": "American / Russian",
    "century": "21st Century",
    "style": "Polyphonic, literal, idiomatically faithful prose",
    "bio": "Prize-winning husband-and-wife translating duo celebrated for their landmark translations of Dostoevsky, Tolstoy, Gogol, and Chekhov.",
    "approach": "Meticulously restores the quirky syntax, stylistic shifts, and distinct character voices of 19th-century Russian masters.",
    "notableWorks": [
      "Dostoevsky: Crime and Punishment (1992)",
      "Tolstoy: War and Peace (2007)",
      "Tolstoy: Anna Karenina (2000)"
    ]
  },
  {
    "id": "lydia-davis",
    "name": "Lydia Davis",
    "dates": "b. 1947",
    "nationality": "American",
    "century": "21st Century",
    "style": "Hyper-accurate, luminous, stylistically rigorous prose",
    "bio": "MacArthur Fellow, Man Booker International Prize winner, and short-story master. Celebrated for her landmark translations of Proust and Flaubert.",
    "approach": "Uncompromising fidelity to Flaubert's and Proust's exact syntax, word placement, and sentence rhythm.",
    "notableWorks": [
      "Gustave Flaubert: Madame Bovary (2010)",
      "Marcel Proust: Swann's Way (2002)"
    ]
  },
  {
    "id": "stephen-mitchell",
    "name": "Stephen Mitchell",
    "dates": "b. 1943",
    "nationality": "American",
    "century": "20th–21st Century",
    "style": "Lyrical, spiritual, metrically flexible verse and prose",
    "bio": "Prolific American poet and translator acclaimed for his accessible and resonant versions of Rilke, the Tao Te Ching, Job, and Gilgamesh.",
    "approach": "Combines spiritual insight and lyrical melody to make ancient wisdom texts immediately vivid to contemporary readers.",
    "notableWorks": [
      "Rainer Maria Rilke: Duino Elegies and The Sonnets to Orpheus (1982/2009)",
      "Laozi: Tao Te Ching (1988)",
      "Gilgamesh (2004)"
    ]
  },
  {
    "id": "anthony-verity",
    "name": "Anthony Verity",
    "dates": "b. 1939",
    "nationality": "British",
    "century": "21st Century",
    "style": "Modern poetic line-for-line verse",
    "bio": "Classicist and former Headmaster of Leeds Grammar School. Renowned for his Oxford World's Classics translations of Homer, Theocritus, and Pindar.",
    "approach": "Clear, direct, line-by-line verse that keeps close to the Greek text without archaic rhetoric.",
    "notableWorks": [
      "Homer: The Iliad (2011)",
      "Homer: The Odyssey (2016)",
      "Theocritus: Idylls (2002)"
    ]
  },
  {
    "id": "ian-johnston",
    "name": "Ian Johnston",
    "dates": "b. 1938",
    "nationality": "Canadian",
    "century": "21st Century",
    "style": "Fluent, performable, rhythmic modern verse and prose",
    "bio": "Professor Emeritus at Vancouver Island University. Prolific translator of Greek epic, drama, Latin philosophy, and German literature freely shared with the world.",
    "approach": "Rhythmic, speakable English verse crafted for students, actors, and general readers.",
    "notableWorks": [
      "Homer: Iliad & Odyssey (2006–2010)",
      "Aeschylus: Oresteia (2007)",
      "Virgil: Aeneid (2012)",
      "Henrik Ibsen: A Doll's House (2014)"
    ]
  },
  {
    "id": "wayne-a-rebhorn",
    "name": "Wayne A. Rebhorn",
    "dates": "b. 1943",
    "nationality": "American",
    "century": "21st Century",
    "style": "Lively, idiomatic, Renaissance-attuned prose",
    "bio": "Celanese Centennial Professor of English at the University of Texas at Austin. Winner of the PEN Translation Prize for his complete Decameron.",
    "approach": "Captures the full comic vitality, syntactic complexity, and earthy social realism of Boccaccio and Machiavelli.",
    "notableWorks": [
      "Giovanni Boccaccio: The Decameron (2013)",
      "Niccolò Machiavelli: The Prince (2011)"
    ]
  },
  {
    "id": "richard-wilbur",
    "name": "Richard Wilbur",
    "dates": "1921 – 2017",
    "nationality": "American",
    "century": "20th–21st Century",
    "style": "Masterful rhymed heroic couplets & iambic pentameter",
    "bio": "Two-time Pulitzer Prize winner and second U.S. Poet Laureate. Universally recognized as the greatest English translator of French classical verse drama.",
    "approach": "Impeccable rhymed verse with effortless wit, metric precision, and sparkling theatrical brilliance.",
    "notableWorks": [
      "Molière: Tartuffe (1963 / rev. 2004)",
      "Molière: The Misanthrope (1955)",
      "Racine: Phaedra (1986)"
    ]
  },
  {
    "id": "w-j-johnson",
    "name": "W. J. Johnson",
    "dates": "b. 1953",
    "nationality": "British",
    "century": "21st Century",
    "style": "Graceful verse and rhythmic prose",
    "bio": "Reader in Religious Studies at Cardiff University and celebrated translator for Oxford World's Classics.",
    "approach": "Faithful reproduction of Sanskrit dramatic meters and poetic conventions (kavya) in supple English.",
    "notableWorks": [
      "Kalidasa: The Recognition of Shakuntala (2001)",
      "The Bhagavad Gita (1994)",
      "The Sauptikaparvan of the Mahabharata (1998)"
    ]
  },
  {
    "id": "john-minford",
    "name": "John Minford",
    "dates": "b. 1946",
    "nationality": "British-Australian",
    "century": "20th–21st Century",
    "style": "Cultivated, literary Sinological translation",
    "bio": "Sinologist and literary translator, Emeritus Professor of Chinese at ANU. Renowned for his translations of The Story of the Stone, The Art of War, and the I Ching.",
    "approach": "Richly annotated literary English that conveys both tactical precision and philosophical depth.",
    "notableWorks": [
      "Sun Tzu: The Art of War (2002)",
      "Cao Xueqin: The Story of the Stone (Vol. 4-5, 1982–1986)",
      "I Ching: The Book of Change (2014)"
    ]
  },
  {
    "id": "philip-freeman",
    "name": "Philip Freeman",
    "dates": "b. 1961",
    "nationality": "American",
    "century": "21st Century",
    "style": "Clean, engaging, accessible modern prose",
    "bio": "Qualley Chair of Classical Languages at St. Olaf College and Fletcher Jones Chair of Western Culture at Pepperdine University.",
    "approach": "Distills ancient Roman philosophy and practical ethics into clear, elegant prose for contemporary lives.",
    "notableWorks": [
      "Cicero: How to Be a Friend (De Amicitia, 2018)",
      "Cicero: How to Grow Old (De Senectute, 2016)",
      "Cicero: How to Run a Country (2013)"
    ]
  },
  {
    "id": "a-s-kline",
    "name": "A. S. Kline",
    "dates": "b. 1947",
    "nationality": "British",
    "century": "21st Century",
    "style": "Accessible, complete poetic and prose digital translations",
    "bio": "Prolific English translator and creator of 'Poetry in Translation', providing hundreds of complete public domain literary translations spanning Greek, Latin, Italian, French, and Chinese classics.",
    "approach": "Clear, readable modern translations in unrhymed verse and prose designed for free global digital access.",
    "notableWorks": [
      "Ovid: Metamorphoses (2000)",
      "Dante: Divine Comedy (2000)",
      "Petrarch: Canzoniere (2001)",
      "Henrik Ibsen: A Doll's House (2020)"
    ]
  }
];

// 2. Helper to clean raw edition names into clean human-readable translator names
function cleanTranslatorName(rawName) {
  if (!rawName) return "Unknown Translator";
  let clean = rawName.replace(/\s*\([0-9\/\s\-–a-zA-Z\.\,\'\&\;\:\!]+\)/g, "").trim();
  if (!clean) clean = rawName.trim();
  return clean;
}

// 3. Helper to create URL-safe kebab-case IDs
function slugify(text) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

// 4. Dynamic Aggregator Function: Discovers and builds complete directory of all translators in corpus
export function buildDynamicTranslatorsList() {
  const translatorMap = new Map();

  // Seed with curated translators first
  CURATED_TRANSLATORS.forEach(curated => {
    translatorMap.set(curated.id, {
      ...curated,
      notableWorks: new Set(curated.notableWorks || []),
      editions: [],
      isCurated: true
    });
  });

  // Scan all texts across the entire corpus
  TEXTS.forEach(text => {
    if (!text.sourceEditions) return;

    text.sourceEditions.forEach(ed => {
      if (ed.type === "translation") {
        const cleanName = cleanTranslatorName(ed.name);
        const slugId = slugify(cleanName);

        // Find existing curated profile by exact ID or name match
        let targetId = slugId;
        if (!translatorMap.has(targetId)) {
          for (const [k, v] of translatorMap.entries()) {
            if (v.name.toLowerCase() === cleanName.toLowerCase() ||
                (v.name.split(" ").pop().length > 3 && cleanName.toLowerCase().includes(v.name.toLowerCase().split(" ").pop()))) {
              targetId = k;
              break;
            }
          }
        }

        // If not found in curated, create new dynamic profile
        if (!translatorMap.has(targetId)) {
          let century = "Historical / Modern";
          if (ed.year) {
            const yr = parseInt(ed.year, 10);
            if (!isNaN(yr)) {
              if (yr >= 2000) century = "21st Century";
              else if (yr >= 1900) century = "20th Century";
              else if (yr >= 1800) century = "19th Century";
              else if (yr >= 1700) century = "18th Century";
              else if (yr >= 1600) century = "17th Century";
              else if (yr >= 1500) century = "16th Century";
              else if (yr >= 1400) century = "15th Century";
            }
          }

          translatorMap.set(targetId, {
            id: targetId,
            name: cleanName,
            dates: ed.year ? `Edition: ${ed.year}` : "Classical / Modern",
            nationality: "World Literature Scholar",
            century: century,
            style: ed.format || "Verse / Prose",
            bio: ed.highlights ? `${ed.highlights}. Featured in Convivium's comparative translation corpus.` : `Distinguished translator and editor of classical and world literature.`,
            approach: ed.highlights || `Faithful translation of ${text.title} preserving literary resonance and structural integrity.`,
            notableWorks: new Set(),
            editions: [],
            isCurated: false
          });
        }

        const trObj = translatorMap.get(targetId);
        const workLabel = `${text.title}${ed.year ? ` (${ed.year})` : ""}`;
        trObj.notableWorks.add(workLabel);
        trObj.editions.push({
          textId: text.id,
          textTitle: text.title,
          year: ed.year,
          format: ed.format,
          highlights: ed.highlights,
          rawName: ed.name
        });
      }
    });
  });

  // Convert Sets to Arrays and sort: curated first, then alphabetically by last name
  const list = Array.from(translatorMap.values()).map(tr => ({
    ...tr,
    notableWorks: Array.from(tr.notableWorks)
  }));

  list.sort((a, b) => {
    if (a.isCurated && !b.isCurated) return -1;
    if (!a.isCurated && b.isCurated) return 1;
    const lastNameA = a.name.split(" ").pop();
    const lastNameB = b.name.split(" ").pop();
    return lastNameA.localeCompare(lastNameB);
  });

  return list;
}

// Global exported array for backward compatibility and reactive UI consumption
export const TRANSLATORS = buildDynamicTranslatorsList();
