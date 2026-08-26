export const TRANSLATORS = [
  {
    id: "emily-wilson",
    name: "Emily Wilson",
    dates: "b. 1971",
    nationality: "British-American",
    century: "21st Century",
    style: "Iambic Pentameter, strict line-for-line matching",
    bio: "Classicist and Professor of Classical Studies at the University of Pennsylvania. Her 2017 translation of the Odyssey was the first published English translation by a woman, praised for its rhythmic vitality, directness, and moral clarity.",
    approach: "Translates Homer into regular iambic pentameter, matching the line count of the Greek original line-for-line without inflated archaism.",
    notableWorks: ["Homer: Odyssey (2017)", "Homer: Iliad (2023)"]
  },
  {
    id: "robert-fagles",
    name: "Robert Fagles",
    dates: "1933 – 2008",
    nationality: "American",
    century: "20th Century",
    style: "Flexible, loose 5-to-6 beat modern verse",
    bio: "Renowned American translator and professor of comparative literature at Princeton University. His Homeric and Virgilian translations are celebrated for their muscular, performative energy and vivid contemporary English.",
    approach: "Aims for a performable, spoken delivery with modern dramatic cadence while preserving epic grandeur.",
    notableWorks: ["Homer: Iliad (1990)", "Homer: Odyssey (1996)", "Virgil: Aeneid (2006)"]
  },
  {
    id: "alexander-pope",
    name: "Alexander Pope",
    dates: "1688 – 1744",
    nationality: "English",
    century: "18th Century (Augustan)",
    style: "Heroic Couplets (rhymed iambic pentameter)",
    bio: "One of the greatest English poets of the Augustan period. His monumental rhymed translations of Homer were widely acclaimed and financially secured his literary independence.",
    approach: "Grand, stately neoclassical style with polished heroic couplets, emphasizing moral dignity and sublime rhetorical balance.",
    notableWorks: ["Homer: Iliad (1715–1720)", "Homer: Odyssey (1725–1726)"]
  },
  {
    id: "george-chapman",
    name: "George Chapman",
    dates: "c. 1559 – 1634",
    nationality: "English",
    century: "17th Century (Renaissance / Elizabethan)",
    style: "Fourteeners (Iliad), Rhymed Iambic Pentameter (Odyssey)",
    bio: "Renaissance dramatist, translator, and poet. His Homer was famously commemorated in John Keats's sonnet 'On First Looking into Chapman's Homer'.",
    approach: "Vigorous, Elizabethan poetic drive filled with philosophical conceits, passion, and Renaissance metaphors.",
    notableWorks: ["Homer: Iliad (1611)", "Homer: Odyssey (1616)"]
  },
  {
    id: "richmond-lattimore",
    name: "Richmond Lattimore",
    dates: "1906 – 1984",
    nationality: "American",
    century: "20th Century",
    style: "Six-beat free verse accentual hexameter",
    bio: "Classicist and poet at Bryn Mawr College. His translations of Homer and Greek drama are prized for their unparalleled fidelity to the Greek word order and syntax.",
    approach: "Close syntactic fidelity aiming to reproduce the unhurried dactylic sweep of the Greek hexameter without English artificiality.",
    notableWorks: ["Homer: Iliad (1951)", "Homer: Odyssey (1965)", "Aeschylus: Oresteia (1953)"]
  },
  {
    id: "john-dryden",
    name: "John Dryden",
    dates: "1631 – 1700",
    nationality: "English",
    century: "17th Century (Restoration)",
    style: "Heroic Couplets (rhymed)",
    bio: "England's first Poet Laureate. His translation of Virgil's Aeneid remains one of the crowning achievements of English verse translation.",
    approach: "Defined translation modes (metaphrase, paraphrase, imitation); produced a majestic, resonant English Virgil.",
    notableWorks: ["Virgil: The Works of Virgil (1697)"]
  },
  {
    id: "sarah-ruden",
    name: "Sarah Ruden",
    dates: "b. 1962",
    nationality: "American",
    century: "21st Century",
    style: "Strict Line-for-line Iambic Hexameter / Pentameter",
    bio: "American poet, translator, and essayist. Her translations of Virgil, Augustine, and the Gospels are renowned for their poetic compression and precision.",
    approach: "Focuses on Latin concision and poetic resonance, preserving the exact line count and rhythmic urgency of the original.",
    notableWorks: ["Virgil: Aeneid (2008)", "Apuleius: The Golden Ass (2011)"]
  },
  {
    id: "benjamin-jowett",
    name: "Benjamin Jowett",
    dates: "1817 – 1893",
    nationality: "English",
    century: "19th Century (Victorian)",
    style: "Victorian scholarly prose",
    bio: "Master of Balliol College, Oxford, and Regius Professor of Greek. His translations of Plato's dialogues became the standard English editions for generations.",
    approach: "Elevated, fluent Victorian prose designed to make classical philosophy transparent and engaging.",
    notableWorks: ["Plato: The Dialogues of Plato (1871)", "Thucydides (1881)"]
  },
  {
    id: "anne-carson",
    name: "Anne Carson",
    dates: "b. 1950",
    nationality: "Canadian",
    century: "21st Century",
    style: "Minimalist, lyrical, avant-garde verse",
    bio: "MacArthur Fellow, poet, essayist, and classicist. Her translations of Sappho (If Not, Winter) and Euripides are celebrated for their stark intimacy.",
    approach: "Preserves the physical fragmentary gaps of the papyri, creating intense emotional resonance.",
    notableWorks: ["Sappho: If Not, Winter (2002)", "Grief Lessons: Four Plays by Euripides (2006)"]
  },
  {
    id: "gregory-hays",
    name: "Gregory Hays",
    dates: "b. 1966",
    nationality: "American",
    century: "21st Century",
    style: "Modern lucid prose",
    bio: "Professor of Classics at the University of Virginia. His translation of Marcus Aurelius for Modern Library revitalized the text for modern general readers.",
    approach: "Crisp, unadorned, forceful English reflecting Marcus Aurelius's private, urgent spiritual self-counsel.",
    notableWorks: ["Marcus Aurelius: Meditations (2002)"]
  },
  {
    id: "caroline-alexander",
    name: "Caroline Alexander",
    dates: "b. 1956",
    nationality: "American-British",
    century: "21st Century",
    style: "Faithful line-by-line modern verse",
    bio: "Author and classicist; first woman to publish a complete English translation of Homer's Iliad (2015).",
    approach: "Uncompromising poetic fidelity to Homer's dactylic pulse and emotional brutal honesty.",
    notableWorks: ["Homer: The Iliad (2015)"]
  },
  {
    id: "herbert-weir-smyth",
    name: "Herbert Weir Smyth",
    dates: "1857 – 1937",
    nationality: "American",
    century: "20th Century",
    style: "Academic Loeb Classical Library prose/verse",
    bio: "Eliot Professor of Greek Literature at Harvard University and author of the definitive Greek Grammar.",
    approach: "Accurate scholarly facing-text translation designed for philological study.",
    notableWorks: ["Aeschylus: Plays (Loeb Classical Library, 1922–1926)"]
  },
  {
    id: "oliver-taplin",
    name: "Oliver Taplin",
    dates: "b. 1943",
    nationality: "British",
    century: "21st Century",
    style: "Performance-oriented dramatic verse",
    bio: "Emeritus Professor of Classical Languages and Literature at Oxford University and world authority on Greek stagecraft.",
    approach: "Vibrant rhythmic verse specifically crafted for modern theater and vocal performance.",
    notableWorks: ["Aeschylus: The Oresteia (2018)", "Sophocles: Oedipus the King (2015)"]
  }
];
