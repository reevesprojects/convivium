export const TEXTS = [
  {
    id: "homer-odyssey",
    title: "Odyssey",
    originalTitle: "Ὀδύσσεια",
    authorId: "homer",
    language: "Ancient Greek",
    date: "c. 725–675 BCE",
    format: "Verse (Dactylic Hexameter)",
    genre: "Epic Poetry",
    description: "The epic journey of Odysseus, king of Ithaca, wandering for ten years across mythical seas to reclaim his kingdom and reunion with Penelope after the fall of Troy.",
    passageRef: "Book 1, lines 1–25 (The Proem)",
    commentaryCount: 8,
    tags: ["Facing Text", "Sample Passage", "Verse", "Commentary", "Hexameter"],
    sourceEditions: [
      { id: "greek", name: "Original Greek (OCT)", translator: "Original (Homer)", year: "Archaic", type: "source", meter: "Dactylic Hexameter", format: "Verse" },
      { id: "wilson", name: "Emily Wilson (2017)", translatorId: "emily-wilson", year: "2017", type: "translation", meter: "Iambic Pentameter", format: "Verse", highlights: "Line-for-line matching, modern clarity" },
      { id: "fagles", name: "Robert Fagles (1996)", translatorId: "robert-fagles", year: "1996", type: "translation", meter: "Flexible 5/6 Beat Modern Verse", format: "Verse", highlights: "Performative energy, epic grandeur" },
      { id: "lattimore", name: "Richmond Lattimore (1965)", translatorId: "richmond-lattimore", year: "1965", type: "translation", meter: "Accentual Six-Beat Verse", format: "Verse", highlights: "Syntactic fidelity to Greek order" },
      { id: "pope", name: "Alexander Pope (1725)", translatorId: "alexander-pope", year: "1725", type: "translation", meter: "Heroic Couplets", format: "Verse", highlights: "Neoclassical Augustan elegance" },
      { id: "chapman", name: "George Chapman (1616)", translatorId: "george-chapman", year: "1616", type: "translation", meter: "Rhymed Iambic Pentameter", format: "Verse", highlights: "Elizabethan vigor and metaphysical conceits" },
      { id: "rouse", name: "W.H.D. Rouse (1937)", year: "1937", type: "translation", format: "Prose", highlights: "Lively colloquial prose, reader's Homer" },
      { id: "butcher_lang", name: "Butcher & Lang (1879)", year: "1879", type: "translation", format: "Prose", highlights: "Victorian archaizing prose, biblical cadence" },
      { id: "lawrence", name: "T.E. Lawrence (1932)", year: "1932", type: "translation", format: "Prose", highlights: "Soldier-poet's spare, modern prose" }
    ],
    segments: [
      {
        ref: "1.1",
        lineNum: 1,
        source: "Ἄνδρα μοι ἔννεπε, Μοῦσα, πολύτροπον, ὃς μάλα πολλὰ",
        literal: "The man to me tell of, Muse, of many turns, who very much",
        translations: {
          wilson: "Tell me about a complicated man.",
          fagles: "Sing to me of the man, Muse, the man of twists and turns",
          lattimore: "Tell me, Muse, of the man of many ways, who was driven",
          pope: "The man for wisdom’s various arts renown’d,",
          chapman: "The man in love with wisdom, Muse, reveal,",
          rouse: "Here is a man of many resources, O Muse, and you must tell me the tale of his wanderings.",
          butcher_lang: "Tell me, O Muse, of that ingenious hero who travelled far and wide after he had sacked the famous town of Troy.",
          lawrence: "Tell me, O Muse, of the shifty-plotted man who wandered far and wide after he had sacked the sacred city of Troy."
        },
        notes: "The opening word is ἄνδρα ('man', in accusative), establishing the human subject in contrast to the Iliad's 'wrath'. πολύτροπος (polytropos) means 'of many turns', 'much-wandering', or 'wily/resourceful'. Emily Wilson's choice ('complicated') sparked international academic discussion.",
        vocab: [
          { word: "Ἄνδρα", lemma: "ἀνήρ", meaning: "man, mortal hero (acc. sing.)", link: "https://logeion.uchicago.edu/%E1%BC%80%CE%BD%CE%AE%CF%81" },
          { word: "ἔννεπε", lemma: "ἐνέπω", meaning: "tell, recount, utter (imperative)", link: "https://logeion.uchicago.edu/%E1%BC%90%CE%BD%CE%AD%CF%80%CF%89" },
          { word: "πολύτροπον", lemma: "πολύτροπος", meaning: "of many turns, shifty, much traveled, versatile", link: "https://logeion.uchicago.edu/%CF%80%CE%BF%CE%BB%CF%8D%CF%84%CF%81%CE%BF%CF%80%CE%BF%CF%82" }
        ]
      },
      {
        ref: "1.2",
        lineNum: 2,
        source: "πλάγχθη, ἐπεὶ Τροίης ἱερὸν πτολίεθρον ἔπερσεν:",
        literal: "was tossed about, after Troy's sacred citadel he sacked:",
        translations: {
          wilson: "Muse, tell me how he wandered and was lost",
          fagles: "driven time and again off course, once he had plundered",
          lattimore: "far journeys, after he had sacked Troy’s sacred citadel.",
          pope: "Long exercised in woes, on rugged ground;",
          chapman: "Who, Troy being sacked, did long through ocean reel;",
          rouse: "Many were the men whose towns he saw and whose minds he learnt, and many the sorrows his heart suffered at sea.",
          butcher_lang: "Many were the men whose cities he saw and whose mind he learned, and many the sorrows he suffered in his heart upon the sea.",
          lawrence: "He saw the cities of many men and knew their minds, and on the sea he suffered many pains in his heart."
        },
        notes: "πλάγχθη (planchthē): passive 'was tossed / made to wander', emphasizing fate and divine intervention following the sack of Troy (ἱερὸν πτολίεθρον).",
        vocab: [
          { word: "πλάγχθη", lemma: "πλάζω", meaning: "caused to wander, buffeted, tossed", link: "https://logeion.uchicago.edu/%CF%80%CE%BB%CE%AC%CE%B6%CF%89" },
          { word: "πτολίεθρον", lemma: "πτολίεθρον", meaning: "citadel, fortified city", link: "https://logeion.uchicago.edu/%CF%80%CF%84%CE%BF%CE%BB%CE%AF%CE%B5%CE%B8%CF%81%CE%BF%CE%BD" }
        ]
      },
      {
        ref: "1.3",
        lineNum: 3,
        source: "πολλῶν δ᾽ ἀνθρώπων ἴδεν ἄστεα καὶ νόον ἔγνω,",
        literal: "and of many men saw cities and mind learned,",
        translations: {
          wilson: "when Troy’s sacred citadel fell. Tell me how he visited",
          fagles: "the hallowed heights of Troy. Many cities of men he saw",
          lattimore: "Many were they whose cities he saw, whose minds he learned of,",
          pope: "Distant from home; he visited with pain",
          chapman: "Many the men whose cities he surveyed,",
          rouse: "He suffered many hardships at sea, while trying to save himself and bring his companions home.",
          butcher_lang: "He suffered many sorrows on the deep, seeking to save his own life and the return of his comrades.",
          lawrence: "Striving the while to save his life and bring his friends to harbour."
        },
        notes: "ἴδεν ἄστεα καὶ νόον ἔγνω: 'saw cities and learned the minds of men'. Odysseus's journey is not merely geographical but an intellectual and anthropological education.",
        vocab: [
          { word: "νόον", lemma: "νόος", meaning: "mind, spirit, disposition, thoughts", link: "https://logeion.uchicago.edu/%CE%BD%CF%8C%CE%BF%CF%82" },
          { word: "ἔγνω", lemma: "γιγνώσκω", meaning: "knew, recognized, understood (aorist)", link: "https://logeion.uchicago.edu/%CE%B3%CE%B9%CE%B3%CE%BD%CF%8E%CF%83%CE%BA%CF%89" }
        ]
      },
      {
        ref: "1.4",
        lineNum: 4,
        source: "πολλὰ δ᾽ ὅ γ᾽ ἐν πόντῳ πάθεν ἄλγεα ὃν κατὰ θυμόν,",
        literal: "and many he in sea suffered pains his in spirit,",
        translations: {
          wilson: "the cities of countless people and learned their ways,",
          fagles: "and learned their ways, many pains he suffered, heartsick on the open sea,",
          lattimore: "many the pains he suffered on the sea in his spirit",
          pope: "A varied race, and learned their manners well;",
          chapman: "And many suffered woes on ocean's shade,",
          rouse: "But even so he could not save his companions, for they were destroyed by their own reckless folly.",
          butcher_lang: "Yet even so he saved not his comrades, though he desired it sore, for through their own blind folly they perished.",
          lawrence: "Yet not even so he saved his men, for all his longing, for they lost themselves by their own gross sins."
        },
        notes: "πάθεν ἄλγεα: 'suffered sorrows/griefs in his spirit' (θυμός). Echoes the heroic suffering themes of Greek epic.",
        vocab: [
          { word: "ἄλγεα", lemma: "ἄλγος", meaning: "pain, sorrow, grief", link: "https://logeion.uchicago.edu/%E1%BC%84%CE%BB%CE%B3%CE%BF%CF%82" },
          { word: "θυμόν", lemma: "θυμός", meaning: "heart, soul, courage, passionate spirit", link: "https://logeion.uchicago.edu/%CE%B8%CF%85%CE%BC%CF%8C%CF%82" }
        ]
      },
      {
        ref: "1.5",
        lineNum: 5,
        source: "ἀρνύμενος ἥν τε ψυχὴν καὶ νόστον ἑταίρων.",
        literal: "striving to win his own life and homecoming of companions.",
        translations: {
          wilson: "and what sorrows he sustained upon the ocean, battling",
          fagles: "fighting to save his life and bring his comrades home.",
          lattimore: "trying to win his life and the homecoming of his companions;",
          pope: "On seas and lands, by tempestuous fortunes led,",
          chapman: "To save his fellows, and his own life keep;",
          rouse: "They perished by their own blind folly, the fools! They ate the oxen of Hyperion the Sun.",
          butcher_lang: "Fools! who devoured the oxen of Hyperion the Sun, and he took from them the day of their returning.",
          lawrence: "The fools! They ate the oxen of the Sun, and he took from them the day of their return."
        },
        notes: "νόστον (noston): 'homecoming / return', root of modern 'nostalgia'. This verse encapsulates Odysseus's double mission: preserving his own ψυχή (life) and securing the return of his men.",
        vocab: [
          { word: "ἀρνύμενος", lemma: "ἄρνυμαι", meaning: "striving to win, preserve, gain", link: "https://logeion.uchicago.edu/%E1%BC%84%CF%81%CE%BD%CF%85%CE%BC%CE%B1%CE%B9" },
          { word: "νόστον", lemma: "νόστος", meaning: "homecoming, safe return voyage", link: "https://logeion.uchicago.edu/%CE%BD%CF%8C%CF%83%CF%84%CE%BF%CF%82" }
        ]
      },
      {
        ref: "1.6",
        lineNum: 6,
        source: "ἀλλ᾽ οὐδ᾽ ὣς ἑτάρους ἐρρύσατο, ἱέμενός περ:",
        literal: "But not even so companions he rescued, desiring though:",
        translations: {
          wilson: "to save his life and bring his comrades home.",
          fagles: "But he could not save them from disaster, hard as he strove—",
          lattimore: "yet even so he could not save his companions, hard though he wished it;",
          pope: "Much for his friends he suffered, but in vain;",
          chapman: "Yet not his friends could from their ruin reap;",
          rouse: "And the Sun took from them their day of return. Tell me the tale, O Muse.",
          butcher_lang: "Tell me now, O Muse, these things. Speak from what point thou wilt.",
          lawrence: "Tell me of this, Muse, from whatever point you will."
        },
        notes: "Anticipates the tragedy of his crew: their destruction was due to their own moral failing and blasphemy.",
        vocab: [
          { word: "ἐρρύσατο", lemma: "ῥύομαι", meaning: "rescued, defended, protected", link: "https://logeion.uchicago.edu/%E1%BF%A5%CF%8D%CE%BF%CE%BC%CE%B1%CE%B9" }
        ]
      },
      {
        ref: "1.7",
        lineNum: 7,
        source: "αὐτῶν γὰρ σφετέρῃσιν ἀτασθαλίῃσιν ὄλοντο,",
        literal: "for by their own recklessness they perished,",
        translations: {
          wilson: "They perished by their own reckless foolishness.",
          fagles: "the fools, by their own recklessness they died,",
          lattimore: "for they perished through their own sheer folly,",
          pope: "Their own rash frenzy turned their fate to pain;",
          chapman: "For in their foolish blind audaciousness,",
          rouse: "They were ruined by their own recklessness, the poor fools!",
          butcher_lang: "Fools, that they were, who ate the kine of Hyperion the Sun god!",
          lawrence: "Fools! They ate the oxen of the Sun-god, Hyperion!"
        },
        notes: "ἀτασθαλίαι (atasthaliai): 'blind recklessness / sinful folly'. A crucial moral concept in the Odyssey exonerating the gods and Odysseus.",
        vocab: [
          { word: "ἀτασθαλίῃσιν", lemma: "ἀτασθαλία", meaning: "recklessness, insolence, folly, hubris", link: "https://logeion.uchicago.edu/%E1%BC%80%CF%84%CE%B1%CF%83%CE%B8%CE%B1%CE%BB%CE%AF%CE%B1" },
          { word: "ὄλοντο", lemma: "ὄλλυμι", meaning: "perished, were destroyed", link: "https://logeion.uchicago.edu/%E1%BD%84%CE%BB%CE%BB%CF%85%CE%BC%CE%B9" }
        ]
      },
      {
        ref: "1.8",
        lineNum: 8,
        source: "νήπιοι, οἳ κατὰ βοῦς Ὑπερίονος Ἠελίοιο",
        literal: "fools, who down the cattle of Hyperion the Sun",
        translations: {
          wilson: "Fools, for they ate the cattle of Hyperion the Sun,",
          fagles: "cattle of the Sun God Hyperion they devoured—",
          lattimore: "fools, who devoured the cattle of Helios Hyperion,",
          pope: "The herds of Phoebus they consumed away,",
          chapman: "They ate the oxen of the Sun in bliss;",
          rouse: "And he took away the day of their return.",
          butcher_lang: "And he bereft them of the day of their returning.",
          lawrence: "And the Sun-god took away their day of returning."
        },
        notes: "νήπιοι (nēpioi): 'infantile / foolish / oblivious'. The slaughter of the cattle of Helios on the island of Thrinacia.",
        vocab: [
          { word: "νήπιοι", lemma: "νήπιος", meaning: "childlike, foolish, without discernment", link: "https://logeion.uchicago.edu/%CE%BD%CE%AE%CF%80%CE%B9%CE%BF%CF%82" },
          { word: "Ἠελίοιο", lemma: "Ἥλιος", meaning: "Helios, Sun god", link: "https://logeion.uchicago.edu/%E1%BC%A5%CE%BB%CE%B9%CE%BF%CF%82" }
        ]
      },
      {
        ref: "1.9",
        lineNum: 9,
        source: "ἤσθιον: αὐτὰρ ὁ τοῖσιν ἀφείλετο νόστιμον ἦμαρ.",
        literal: "ate: but he from them took away homecoming day.",
        translations: {
          wilson: "and he stripped them of their day of return.",
          fagles: "and the Sungod snatched away their day of return.",
          lattimore: "and he took away from them their day of return.",
          pope: "And Sun-god snatched their day of joy away.",
          chapman: "And he their day of sweet returning stole.",
          rouse: "Tell me about this man from the beginning.",
          butcher_lang: "Of these things, O goddess, daughter of Zeus, speak to us as thou wilt.",
          lawrence: "Tell me, O goddess, daughter of Zeus."
        },
        notes: "νόστιμον ἦμαρ (nostimon ēmar): the epic formula for 'the day of homecoming'.",
        vocab: [
          { word: "ἀφείλετο", lemma: "ἀφαιρέω", meaning: "took away, robbed, snatched", link: "https://logeion.uchicago.edu/%E1%BC%80%CF%86%CE%B1%CE%B9%CF%81%CE%AD%CF%89" },
          { word: "ἦμαρ", lemma: "ἦμαρ", meaning: "day", link: "https://logeion.uchicago.edu/%E1%BC%A6%CE%BC%CE%B1%CF%81" }
        ]
      },
      {
        ref: "1.10",
        lineNum: 10,
        source: "τῶν ἁμόθεν γε, θεά, θύγατερ Διός, εἰπὲ καὶ ἡμῖν.",
        literal: "Of these from somewhere at least, goddess, daughter of Zeus, tell also to us.",
        translations: {
          wilson: "Goddess, child of Zeus, tell us these things from whatever point you will.",
          fagles: "Launch out on his story, Muse, daughter of Zeus, start from where you will—sing for our time too.",
          lattimore: "From some point here, goddess, daughter of Zeus, speak, and tell us also.",
          pope: "O Muse, inspire the song! recount the whole,",
          chapman: "O goddess, child of Jove, begin the tale!",
          rouse: "That is the story. Begin it where you will, daughter of Zeus.",
          butcher_lang: "Tell me even these things, from whatsoever point thou wilt, daughter of Zeus.",
          lawrence: "Begin the tale at any point you choose, daughter of Zeus."
        },
        notes: "ἁμόθεν (hamothen): 'from any point whatsoever'. Homer asks the Muse to choose where in the sprawling ten-year tale to begin.",
        vocab: [
          { word: "ἁμόθεν", lemma: "ἁμόθεν", meaning: "from any point, from anywhere", link: "https://logeion.uchicago.edu/%E1%BC%81%CE%BC%CF%8C%CE%B8%CE%B5%CE%BD" },
          { word: "θύγατερ", lemma: "θυγάτηρ", meaning: "daughter", link: "https://logeion.uchicago.edu/%CE%B8%CF%85%CE%B3%CE%AC%CF%84%CE%B7%CF%81" }
        ]
      }
    ]
  },
  {
    id: "homer-iliad",
    title: "Iliad",
    originalTitle: "Ἰλιάς",
    authorId: "homer",
    language: "Ancient Greek",
    date: "c. 750–700 BCE",
    format: "Verse (Dactylic Hexameter)",
    genre: "Epic Poetry",
    description: "Set during the tenth year of the siege of Troy, the Iliad recounts the catastrophic wrath of Achilles, the greatest Greek warrior, against supreme commander Agamemnon.",
    passageRef: "Book 1, lines 1–18 (The Rage of Achilles)",
    commentaryCount: 6,
    tags: ["Facing Text", "Sample Passage", "Verse", "Commentary", "Hexameter"],
    sourceEditions: [
      { id: "greek", name: "Original Greek (OCT)", translator: "Original (Homer)", year: "Archaic", type: "source", meter: "Dactylic Hexameter", format: "Verse" },
      { id: "alexander", name: "Caroline Alexander (2015)", translatorId: "caroline-alexander", year: "2015", type: "translation", meter: "Modern Verse Line-by-Line", format: "Verse", highlights: "Raw poetic precision and urgency" },
      { id: "fagles", name: "Robert Fagles (1990)", translatorId: "robert-fagles", year: "1990", type: "translation", meter: "Loose 5/6 Beat Verse", format: "Verse", highlights: "Thunderous, dynamic performance cadence" },
      { id: "lattimore", name: "Richmond Lattimore (1951)", translatorId: "richmond-lattimore", year: "1951", type: "translation", meter: "Accentual Hexameter", format: "Verse", highlights: "Close adherence to Greek syntactic layout" },
      { id: "pope", name: "Alexander Pope (1715)", translatorId: "alexander-pope", year: "1715", type: "translation", meter: "Heroic Couplets", format: "Verse", highlights: "Monumental Augustan poetic masterpiece" },
      { id: "lang", name: "Andrew Lang et al. (1883)", year: "1883", type: "translation", format: "Prose", highlights: "Dignified Victorian prose with archaic diction" },
      { id: "cowper", name: "William Cowper (1791)", year: "1791", type: "translation", meter: "Blank Verse", format: "Verse", highlights: "Pre-Romantic philosophical severity" },
      { id: "rieu", name: "E.V. Rieu (1950)", year: "1950", type: "translation", format: "Prose", highlights: "Readable modern prose, Penguin Classics standard" }
    ],
    segments: [
      {
        ref: "1.1",
        lineNum: 1,
        source: "Μῆνιν ἄειδε θεὰ Πηληϊάδεω Ἀχιλῆος",
        literal: "Wrath sing, goddess, of Peleus' son Achilles",
        translations: {
          alexander: "Wrath—sing, goddess, of the ruinous wrath of Peleus' son Achilles,",
          fagles: "Rage—Goddess, sing the rage of Peleus' son Achilles,",
          lattimore: "Sing, goddess, the anger of Peleus' son Achilleus",
          pope: "Achilles' wrath, to Greece the direful spring",
          lang: "Sing, O goddess, the anger of Achilles son of Peleus, that brought countless ills upon the Achaeans.",
          cowper: "Achilles' fatal wrath, the direful spring of woes unnumbered, heavenly goddess, sing!",
          rieu: "Sing, O goddess, the anger of Achilles son of Peleus—the ruinous anger that brought the Greeks endless suffering."
        },
        notes: "Μῆνις (mēnis): not ordinary human anger, but cosmic, devastating, almost divine wrath. It is the very first word of Western literature.",
        vocab: [
          { word: "Μῆνιν", lemma: "μῆνις", meaning: "wrath, cosmic anger, vengeance", link: "https://logeion.uchicago.edu/%CE%BC%E1%BF%86%CE%BD%CE%B9%CF%82" },
          { word: "ἄειδε", lemma: "ἀείδω", meaning: "sing, chant (imperative)", link: "https://logeion.uchicago.edu/%E1%BC%80%CE%B5%CE%AF%CE%B4%CF%89" }
        ]
      },
      {
        ref: "1.2",
        lineNum: 2,
        source: "οὐλομένην, ἣ μυρί᾽ Ἀχαιοῖς ἄλγε᾽ ἔθηκε,",
        literal: "destructive, which myriad pains on the Achaeans placed,",
        translations: {
          alexander: "that brought upon the Achaeans countless agonies",
          fagles: "murderous, doomed, that cost the Achaeans countless losses,",
          lattimore: "and its devastation, which put pains thousandfold upon the Achaians,",
          pope: "Of woes unnumber'd, heavenly goddess, sing!",
          lang: "Many a brave soul did it send hurrying down to Hades, and many a hero did it yield a prey to dogs and vultures.",
          cowper: "Of woes unnumbered, heavenly goddess, sing! That wrath which hurled to Pluto's gloomy reign the souls of mighty chiefs untimely slain.",
          rieu: "It brought death to countless Achaeans and sent many brave soldiers to Hades, leaving their bodies as food for dogs and birds of prey."
        },
        notes: "οὐλομένην (oulomenēn): 'destructive / cursed / ruinous', describing the catastrophic human toll of Achilles' withdrawal.",
        vocab: [
          { word: "οὐλομένην", lemma: "οὐλόμενος", meaning: "ruinous, deadly, accursed", link: "https://logeion.uchicago.edu/%CE%BF%E1%BD%84%CE%BB%CE%BF%CE%BC%CE%B1%CE%B9" },
          { word: "μυρί᾽", lemma: "μυρίος", meaning: "numberless, countless, ten thousand", link: "https://logeion.uchicago.edu/%CE%BC%CF%85%CF%81%CE%AF%CE%BF%CF%82" }
        ]
      },
      {
        ref: "1.3",
        lineNum: 3,
        source: "πολλὰς δ᾽ ἰφθίμους ψυχὰς Ἄϊδι προΐαψεν",
        literal: "and many valiant souls to Hades hurled forward,",
        translations: {
          alexander: "and hurled down to Hades many mighty souls",
          fagles: "hurling down to the House of Death so many sturdy souls,",
          lattimore: "hurled in their multitudes to the house of Hades strong souls",
          pope: "That wrath which hurl'd to Pluto's gloomy reign",
          lang: "For so did their fell purpose urge them, from the day when first they parted in strife.",
          cowper: "And filled with heroes many a shady grove. Such was the sovereign will of Jove.",
          rieu: "Sing it from the beginning, when the two men first quarrelled: Agamemnon king of men and the noble Achilles."
        },
        notes: "ψυχὰς Ἄϊδι προΐαψεν: hurled souls to Hades (the underworld). Note the distinction between the ephemeral 'shade/soul' and the true heroic bodily self.",
        vocab: [
          { word: "ἰφθίμους", lemma: "ἴφθιμος", meaning: "strong, mighty, valiant", link: "https://logeion.uchicago.edu/%E1%BC%B4%CF%86%CE%B8%CE%B9%CE%BC%CE%BF%CF%82" },
          { word: "προΐαψεν", lemma: "προϊάπτω", meaning: "sent before time, hurled forward prematurely", link: "https://logeion.uchicago.edu/%CF%80%CF%81%CE%BF%CF%8A%CE%AC%CF%80%CF%84%CF%89" }
        ]
      },
      {
        ref: "1.4",
        lineNum: 4,
        source: "ἡρώων, αὐτοὺς δὲ ἑλώρια τεῦχε κύνεσσιν",
        literal: "of heroes, and themselves spoils made for dogs",
        translations: {
          alexander: "of heroes, making their bodies carrion for dogs",
          fagles: "great fighters' souls, but made their bodies carrion, feasts for the dogs",
          lattimore: "of heroes, but gave their bodies to be the delicate feasting of dogs,",
          pope: "The souls of mighty chiefs untimely slain;",
          lang: "And wrought out the will of Zeus from the day when first Atreus' son, king of men, and great Achilles parted in strife.",
          cowper: "From that dire day when first in wordy war, the mighty Agamemnon, king of men, opposed the great Achilles.",
          rieu: "Who was it that made them quarrel so bitterly? It was Apollo, son of Leto and Zeus."
        },
        notes: "αὐτούς (themselves): in Homeric thought, the physical body left on the battlefield is the 'true self', while the ψυχή is merely a shadow.",
        vocab: [
          { word: "ἑλώρια", lemma: "ἑλώριον", meaning: "prey, booty, carrion food", link: "https://logeion.uchicago.edu/%E1%BC%91%CE%BB%CF%8E%CF%81%CE%B9%CE%BF%CE%BD" },
          { word: "κύνεσσιν", lemma: "κύων", meaning: "dogs", link: "https://logeion.uchicago.edu/%CE%BA%CF%8D%CF%89%CE%BD" }
        ]
      },
      {
        ref: "1.5",
        lineNum: 5,
        source: "οἰωνοῖσί τε πᾶσι, Διὸς δ᾽ ἐτελείετο βουλή,",
        literal: "and birds all, and of Zeus was being fulfilled the will,",
        translations: {
          alexander: "and birds of prey—and the will of Zeus was accomplished—",
          fagles: "and birds, and the will of Zeus was moving toward its end.",
          lattimore: "of all birds, and the will of Zeus was accomplished since that time",
          pope: "Whose limbs unburied on the naked shore, / Devouring dogs and hungry vultures tore.",
          lang: "So from the time when the son of Atreus, king of men, and great Achilles first fell out with one another.",
          cowper: "Begin then—Goddess! Where they first began, alike enraged, Atrides, king of men, and great Achilles.",
          rieu: "He was angry with Agamemnon because the king had dishonoured the priest Chryses, who had come to the swift ships of the Achaeans."
        },
        notes: "Διὸς δ᾽ ἐτελείετο βουλή: 'and the will of Zeus was fulfilled'. Even the destructive tragedy is subsumed within overarching cosmic purpose.",
        vocab: [
          { word: "οἰωνοῖσί", lemma: "οἰωνός", meaning: "birds of prey, omens", link: "https://logeion.uchicago.edu/%CE%BF%E1%BC%B0%CF%89%CE%BD%CF%8C%CF%82" },
          { word: "βουλή", lemma: "βουλή", meaning: "will, plan, purpose, counsel", link: "https://logeion.uchicago.edu/%CE%B2%CE%BF%CF%85%CE%BB%CE%AE" }
        ]
      }
    ]
  },
  {
    id: "virgil-aeneid",
    title: "Aeneid",
    originalTitle: "Aeneis",
    authorId: "virgil",
    language: "Latin",
    date: "29–19 BCE",
    format: "Verse (Dactylic Hexameter)",
    genre: "Epic Poetry",
    description: "The national epic of ancient Rome, following the Trojan hero Aeneas as he escapes the ruins of Troy, journeys across the Mediterranean, and fights to found the dynasty that will become Rome.",
    passageRef: "Book 1, lines 1–22 (Arms and the Man)",
    commentaryCount: 5,
    tags: ["Facing Text", "Sample Passage", "Verse", "Commentary", "Latin"],
    sourceEditions: [
      { id: "latin", name: "Original Latin (OCT)", translator: "Original (Virgil)", year: "Augustan", type: "source", meter: "Dactylic Hexameter", format: "Verse" },
      { id: "fagles", name: "Robert Fagles (2006)", translatorId: "robert-fagles", year: "2006", type: "translation", meter: "Modern 5/6 Beat Verse", format: "Verse", highlights: "Lyrical resonance and cinematic sweep" },
      { id: "ruden", name: "Sarah Ruden (2008)", translatorId: "sarah-ruden", year: "2008", type: "translation", meter: "Strict Line-for-Line Iambic Pentameter", format: "Verse", highlights: "Latin concision and tight rhythmic tension" },
      { id: "dryden", name: "John Dryden (1697)", translatorId: "john-dryden", year: "1697", type: "translation", meter: "Heroic Couplets", format: "Verse", highlights: "Foundational classic of English Restoration verse" },
      { id: "williams", name: "Theodore Williams (1910)", year: "1910", type: "translation", meter: "Blank Verse", format: "Verse", highlights: "Elegant American blank verse, classical discipline" },
      { id: "conington", name: "John Conington (1866)", year: "1866", type: "translation", meter: "Spenserian / Rhyming Verse", format: "Verse", highlights: "Victorian rhymed translation, widely reprinted" }
    ],
    segments: [
      {
        ref: "1.1",
        lineNum: 1,
        source: "Arma virumque cano, Troiae qui primus ab oris",
        literal: "Arms and the man I sing, of Troy who first from shores",
        translations: {
          fagles: "Wars and a man I sing—an exile driven on by Fate,",
          ruden: "Arms and a man I sing, the first from Troy,",
          dryden: "Arms, and the man I sing, who, forc'd by fate,",
          williams: "Of arms I sing and the hero, who first from the shores of Troy",
          conington: "I sing of arms, and one who came, driven of fate, from Trojan shore."
        },
        notes: "Virgil synthesizes both Homeric epics in the first three words: 'Arma' evokes the Iliad (warfare), while 'virumque' evokes the Odyssey (the man).",
        vocab: [
          { word: "Arma", lemma: "arma", meaning: "arms, weapons, warfare (neut. pl.)", link: "https://logeion.uchicago.edu/arma" },
          { word: "virumque", lemma: "vir", meaning: "and the man, hero (acc. sing. + enclitic -que)", link: "https://logeion.uchicago.edu/vir" },
          { word: "cano", lemma: "cano", meaning: "I sing, chant, celebrate (pres. 1st sing.)", link: "https://logeion.uchicago.edu/cano" }
        ]
      },
      {
        ref: "1.2",
        lineNum: 2,
        source: "Italiam, fato profugus, Laviniaque venit",
        literal: "to Italy, by fate an exile, and Lavinian came",
        translations: {
          fagles: "he was the first to reach the Lavinian coast and Italian soil.",
          ruden: "A fated fugitive to Italy",
          dryden: "And haughty Juno's unrelenting hate,",
          williams: "Came, destined exile, to the Lavinian shore—",
          conington: "Long tossed on land and ocean, by the will of Heaven a wanderer still,"
        },
        notes: "fato profugus: 'an exile by fate'. Aeneas's identity is defined not by personal ambition but by cosmic mission and displacement.",
        vocab: [
          { word: "fato", lemma: "fatum", meaning: "fate, destiny, divine decree (ablative)", link: "https://logeion.uchicago.edu/fatum" },
          { word: "profugus", lemma: "profugus", meaning: "fleeing, fugitive, exile", link: "https://logeion.uchicago.edu/profugus" }
        ]
      },
      {
        ref: "1.3",
        lineNum: 3,
        source: "litora, multum ille et terris iactatus et alto",
        literal: "shores, much he both on lands tossed about and on the deep",
        translations: {
          fagles: "He was tossed about endlessly on land and sea",
          ruden: "And the Lavinian coast. Much he was tossed",
          dryden: "Expell'd and exil'd, left the Trojan shore.",
          williams: "Much buffeted on land and on the deep",
          conington: "And suffering much from Juno's sleepless ire,"
        },
        notes: "multum iactatus: 'much tossed/buffeted', paralleling Odysseus in Odyssey 1.2 (πολλὰ πλάγχθη).",
        vocab: [
          { word: "iactatus", lemma: "iacto", meaning: "tossed about, hurled, buffeted", link: "https://logeion.uchicago.edu/iacto" },
          { word: "alto", lemma: "altum", meaning: "the deep, high sea", link: "https://logeion.uchicago.edu/altum" }
        ]
      },
      {
        ref: "1.4",
        lineNum: 4,
        source: "vi superum saevae memorem Iunonis ob iram;",
        literal: "by force of gods above, savage mindful of Juno on account of wrath;",
        translations: {
          fagles: "by the powers above, through cruel Juno's unrelenting rage.",
          ruden: "On land and sea by heavenly powers, through cruel",
          dryden: "Long labours, both by sea and land, he bore,",
          williams: "By violence of Heaven, by cruel Juno's sleepless hate,",
          conington: "He reached at last the goal of all his pain,"
        },
        notes: "saevae memorem Iunonis ob iram: 'because of the unforgetting anger of cruel Juno'. Juno's enduring hostility is the psychological engine of the epic.",
        vocab: [
          { word: "saevae", lemma: "saevus", meaning: "savage, cruel, fierce", link: "https://logeion.uchicago.edu/saevus" },
          { word: "memorem", lemma: "memor", meaning: "mindful, unforgetting, relentless", link: "https://logeion.uchicago.edu/memor" },
          { word: "iram", lemma: "ira", meaning: "anger, wrath, rage", link: "https://logeion.uchicago.edu/ira" }
        ]
      },
      {
        ref: "1.5",
        lineNum: 5,
        source: "multa quoque et bello passus, dum conderet urbem,",
        literal: "many things also and in war having suffered, until he could found a city,",
        translations: {
          fagles: "He suffered much in war too, till he could found a city",
          ruden: "Juno's unforgiving wrath, and suffered much",
          dryden: "And in the doubtful war, before he won / The Latian realm, and built the destined town;",
          williams: "And bearing war's brunt in many a stubborn fight, / Till he should build a city and bring home",
          conington: "And brought his gods to Latium, whence the race / Of old Latinus, and the Alban sires,"
        },
        notes: "dum conderet urbem: 'until he might found a city'. The foundational drive of Rome's civilizing duty.",
        vocab: [
          { word: "conderet", lemma: "condo", meaning: "found, build, establish (subjunctive)", link: "https://logeion.uchicago.edu/condo" },
          { word: "urbem", lemma: "urbs", meaning: "city", link: "https://logeion.uchicago.edu/urbs" }
        ]
      }
    ]
  },
  {
    id: "plato-apology",
    title: "Apology of Socrates",
    originalTitle: "Ἀπολογία Σωκράτους",
    authorId: "plato",
    language: "Ancient Greek",
    date: "c. 399 BCE",
    format: "Prose (Philosophical Dialogue / Speech)",
    genre: "Philosophy",
    description: "Plato's rendition of the speech delivered by Socrates in 399 BCE at his trial on charges of corrupting the youth and impiety against the state gods.",
    passageRef: "Section 17a–18a (The Exordium / Opening Words)",
    commentaryCount: 4,
    tags: ["Facing Text", "Sample Passage", "Prose", "Philosophy", "Classical Athens"],
    sourceEditions: [
      { id: "greek", name: "Original Greek (Burnet OCT)", translator: "Original (Plato)", year: "Classical", type: "source", format: "Prose" },
      { id: "jowett", name: "Benjamin Jowett (1871)", translatorId: "benjamin-jowett", year: "1871", type: "translation", format: "Prose", highlights: "Victorian eloquence and philosophical clarity" },
      { id: "fowler", name: "Harold North Fowler (1914 Loeb)", translatorId: "herbert-weir-smyth", year: "1914", type: "translation", format: "Prose", highlights: "Standard scholarly Loeb facing text" },
      { id: "church", name: "F.J. Church (1880)", year: "1880", type: "translation", format: "Prose", highlights: "Accessible Victorian plain style" },
      { id: "grube", name: "G.M.A. Grube, rev. Cooper (1997)", year: "1997", type: "translation", format: "Prose", highlights: "Influential scholarly modern critical edition" }
    ],
    segments: [
      {
        ref: "17a.1",
        lineNum: 1,
        source: "Ὅ τι μὲν ὑμεῖς, ὦ ἄνδρες Ἀθηναῖοι, πεπόνθατε ὑπὸ τῶν ἐμῶν κατηγόρων, οὐκ οἶδα:",
        literal: "How you indeed, O men of Athens, have been affected by my accusers, I do not know:",
        translations: {
          jowett: "How you, O Athenians, have been affected by my accusers, I cannot tell;",
          fowler: "How you, men of Athens, have been affected by my accusers, I do not know;",
          church: "I do not know, O Athenians, how far my accusers have influenced you;",
          grube: "I do not know, men of Athens, how my accusers affected you."
        },
        notes: "Socrates opens with radical simplicity and ironic modesty: contrasting the persuasive theatricality of his accusers with simple truth.",
        vocab: [
          { word: "πεπόνθατε", lemma: "πάσχω", meaning: "experienced, suffered, were affected (perf.)", link: "https://logeion.uchicago.edu/%CF%80%CE%AC%CF%83%CF%87%CF%89" },
          { word: "κατηγόρων", lemma: "κατήγορος", meaning: "accusers, prosecutors", link: "https://logeion.uchicago.edu/%CE%BA%CE%B1%CF%84%CE%AE%CE%B3%CE%BF%CF%81%CE%BF%CF%82" }
        ]
      },
      {
        ref: "17a.2",
        lineNum: 2,
        source: "ἐγὼ δ᾽ οὖν καὶ αὐτὸς ὑπ᾽ αὐτῶν ὀλίγου ἐμαυτοῦ ἐπελαθόμην, οὕτω πιθανῶς ἔλεγον:",
        literal: "I at least and myself by them almost of myself forgot, so persuasively they spoke:",
        translations: {
          jowett: "but I know that they almost made me forget who I was—so persuasively did they speak;",
          fowler: "but I, for my part, almost forgot my own identity, so persuasively did they talk;",
          church: "but so they spoke that I almost forgot myself—so bewitching is their art;",
          grube: "The one thing is true: they said almost nothing true, but from me you will hear the whole truth."
        },
        notes: "ὀλίγου ἐμαυτοῦ ἐπελαθόμην: 'I almost forgot myself', a masterstroke of rhetorical irony.",
        vocab: [
          { word: "ἐπελαθόμην", lemma: "ἐπιλανθάνομαι", meaning: "forgot, lost consciousness of", link: "https://logeion.uchicago.edu/%E1%BC%90%CF%80%CE%B9%CE%BB%CE%B1%CE%BD%CE%B8%CE%AC%CE%BD%CE%BF%CE%BC%CE%B1%CE%B9" },
          { word: "πιθανῶς", lemma: "πιθανός", meaning: "persuasively, plausibly", link: "https://logeion.uchicago.edu/%CF%80%CE%B9%CE%B8%CE%B1%CE%BD%CF%8C%CF%82" }
        ]
      },
      {
        ref: "17a.3",
        lineNum: 3,
        source: "καίτοι ἀληθές γε ὡς ἔπος εἰπεῖν οὐδὲν εἰρήκασιν.",
        literal: "and yet true at least so to say nothing they have spoken.",
        translations: {
          jowett: "and yet they have hardly uttered a word of truth.",
          fowler: "and yet there is hardly a word of truth in what they have said.",
          church: "Not one word of what they have said is true.",
          grube: "However, nothing they said is true."
        },
        notes: "ἀληθές ... οὐδὲν: 'not one thing true'. Sets the fundamental philosophical dichotomy between Rhetoric (persuasion without truth) and Philosophy (truth without artifice).",
        vocab: [
          { word: "ἀληθές", lemma: "ἀληθής", meaning: "true, real, sincere", link: "https://logeion.uchicago.edu/%E1%BC%80%CE%BB%CE%B7%CE%B8%CE%AE%CF%82" },
          { word: "εἰρήκασιν", lemma: "λέγω", meaning: "they have spoken, said (perfect)", link: "https://logeion.uchicago.edu/%CE%BB%CE%AD%CE%B3%CF%89" }
        ]
      }
    ]
  },
  {
    id: "catullus-carmen-5",
    title: "Carmen 5 (Vivamus, mea Lesbia)",
    originalTitle: "Carmina V",
    authorId: "catullus",
    language: "Latin",
    date: "c. 55 BCE",
    format: "Verse (Phalaecian Hendecasyllabic)",
    genre: "Lyric Poetry",
    description: "Catullus's passionate invitation to his beloved Lesbia to live and love boldly, disregarding the disapproval of conservative old men and counting thousands of kisses.",
    passageRef: "Lines 1–13 (Complete Poem)",
    commentaryCount: 4,
    tags: ["Facing Text", "Complete Poem", "Verse", "Lyric", "Latin"],
    sourceEditions: [
      { id: "latin", name: "Original Latin (Mynors OCT)", translator: "Original (Catullus)", year: "Late Republic", type: "source", meter: "Hendecasyllabic", format: "Verse" },
      { id: "burton", name: "Richard Burton & Leonard Smithers (1894)", translatorId: "george-chapman", year: "1894", type: "translation", format: "Verse", highlights: "Sensuous Victorian rhythm" },
      { id: "postgate", name: "J. P. Postgate (1912 Loeb)", translatorId: "herbert-weir-smyth", year: "1912", type: "translation", format: "Verse", highlights: "Scholarly classic Loeb edition" },
      { id: "showerman", name: "Grant Showerman (1913)", year: "1913", type: "translation", format: "Prose", highlights: "Loeb prose facing text edition" },
      { id: "martin", name: "Charles Martin (1979)", year: "1979", type: "translation", meter: "Modern Free Verse", format: "Verse", highlights: "Inventive modern American version" }
    ],
    segments: [
      {
        ref: "5.1",
        lineNum: 1,
        source: "Vivamus, mea Lesbia, atque amemus,",
        literal: "Let us live, my Lesbia, and let us love,",
        translations: {
          burton: "Live we, my Lesbia, and love we while we may,",
          postgate: "Let us live, my Lesbia, and let us love,",
          showerman: "Let us live and love, my Lesbia,",
          martin: "My Lesbia, let us live and love"
        },
        notes: "Vivamus ... amemus: Jussive subjunctives expressing joyful defiance.",
        vocab: [
          { word: "Vivamus", lemma: "vivo", meaning: "let us live (subjunctive pres. 1st pl.)", link: "https://logeion.uchicago.edu/vivo" },
          { word: "amemus", lemma: "amo", meaning: "let us love (subjunctive pres. 1st pl.)", link: "https://logeion.uchicago.edu/amo" }
        ]
      },
      {
        ref: "5.2",
        lineNum: 2,
        source: "rumoresque senum severiorum",
        literal: "and rumors of old men too stern",
        translations: {
          burton: "And for the rumors of stern elderly men",
          postgate: "and all the talk of the old men who are too stern",
          showerman: "and heed not what the stern old men may say",
          martin: "and pay no heed to gossip from old men"
        },
        notes: "senum severiorum: 'of too-severe old men', using alliteration of 's' sound to mock whispering gossips.",
        vocab: [
          { word: "senum", lemma: "senex", meaning: "of old men (genitive pl.)", link: "https://logeion.uchicago.edu/senex" },
          { word: "severiorum", lemma: "severus", meaning: "too strict, harsh, censorious (comparative)", link: "https://logeion.uchicago.edu/severus" }
        ]
      },
      {
        ref: "5.3",
        lineNum: 3,
        source: "omnes unius aestimemus assis!",
        literal: "all at one value copper coin!",
        translations: {
          burton: "Value them all at just a single penny!",
          postgate: "let us value at a single penny!",
          showerman: "—they're worth a penny, all of them!",
          martin: "not worth a damn, their words"
        },
        notes: "unius assis: Genitive of value ('worth not even a penny / as').",
        vocab: [
          { word: "assis", lemma: "as", meaning: "as (small bronze Roman coin)", link: "https://logeion.uchicago.edu/as" }
        ]
      },
      {
        ref: "5.4",
        lineNum: 4,
        source: "Soles occidere et redire possunt:",
        literal: "Suns can set and return:",
        translations: {
          burton: "The suns may set and rise again each day;",
          postgate: "Suns may set and rise again;",
          showerman: "The suns can set and rise again;",
          martin: "Suns can set and rise again:"
        },
        notes: "Contrasts the cyclical eternal return of celestial suns with finite, fragile human life.",
        vocab: [
          { word: "Soles", lemma: "sol", meaning: "suns, days", link: "https://logeion.uchicago.edu/sol" },
          { word: "occidere", lemma: "occido", meaning: "to fall down, set, perish", link: "https://logeion.uchicago.edu/occido" }
        ]
      },
      {
        ref: "5.5",
        lineNum: 5,
        source: "nobis cum semel occidit brevis lux,",
        literal: "for us when once has set short light,",
        translations: {
          burton: "For us, when once is quenched our little light,",
          postgate: "for us, when once our brief light has set,",
          showerman: "but once our brief light is set,",
          martin: "but once our brief light fails to rise,"
        },
        notes: "brevis lux: 'brief light' of mortality.",
        vocab: [
          { word: "brevis", lemma: "brevis", meaning: "short, brief", link: "https://logeion.uchicago.edu/brevis" },
          { word: "lux", lemma: "lux", meaning: "light, life", link: "https://logeion.uchicago.edu/lux" }
        ]
      },
      {
        ref: "5.6",
        lineNum: 6,
        source: "nox est perpetua una dormienda.",
        literal: "night is perpetual one to be slept.",
        translations: {
          burton: "Is left one everlasting night to sleep.",
          postgate: "there is one perpetual night to be slept.",
          showerman: "there must we sleep through one perpetual night.",
          martin: "there's one unending night to be slept through."
        },
        notes: "Passive periphrastic (dormienda est): 'one eternal night must be slept'. Haunting contrast to the vibrant opening.",
        vocab: [
          { word: "perpetua", lemma: "perpetuus", meaning: "everlasting, perpetual, unbroken", link: "https://logeion.uchicago.edu/perpetuus" }
        ]
      }
    ]
  },
  {
    id: "aeschylus-agamemnon",
    title: "Agamemnon",
    originalTitle: "Ἀγαμέμνων",
    authorId: "aeschylus",
    language: "Ancient Greek",
    date: "458 BCE",
    format: "Verse (Dramatic Trimeter / Lyric Choral)",
    genre: "Tragedy",
    description: "The opening masterpiece of Aeschylus's Oresteia trilogy, chronicling the fateful return of King Agamemnon from Troy to Mycenae and his murder by his wife Clytemnestra.",
    passageRef: "Lines 1–21 (The Watchman's Prologue)",
    commentaryCount: 4,
    tags: ["Facing Text", "Sample Passage", "Tragedy", "Drama", "Classical Athens"],
    sourceEditions: [
      { id: "greek", name: "Original Greek (Page OCT)", translator: "Original (Aeschylus)", year: "458 BCE", type: "source", format: "Verse" },
      { id: "taplin", name: "Oliver Taplin (2018)", translatorId: "oliver-taplin", year: "2018", type: "translation", format: "Verse", highlights: "Rhythmic stage-oriented dramatic verse" },
      { id: "smyth", name: "Herbert Weir Smyth (1926 Loeb)", translatorId: "herbert-weir-smyth", year: "1926", type: "translation", format: "Verse", highlights: "Standard philological facing text" },
      { id: "lattimore", name: "Richmond Lattimore (1953)", translatorId: "richmond-lattimore", year: "1953", type: "translation", format: "Verse", highlights: "Monumental poetic severity" },
      { id: "morshead", name: "E.D.A. Morshead (1877)", year: "1877", type: "translation", format: "Verse", highlights: "Victorian rhyming translation, classic verse drama" },
      { id: "vellacott", name: "Philip Vellacott (1956)", year: "1956", type: "translation", format: "Verse", highlights: "Accessible, actable Penguin Classics verse" }
    ],
    segments: [
      {
        ref: "1.1",
        lineNum: 1,
        source: "Θεοὺς μὲν αἰτῶ τῶνδ᾽ ἀπαλλαγὴν πόνων,",
        literal: "The gods indeed I ask of these release from toils,",
        translations: {
          taplin: "I ask the gods to grant release from all these hardships,",
          smyth: "Release from these toils I ask on behalf of the gods,",
          lattimore: "I ask the gods some respite from the weariness",
          morshead: "I pray the gods to quit me of my toils,",
          vellacott: "I'm asking the gods for release from this long misery"
        },
        notes: "The solitary watchman stationed on the palace roof at Argos waits year-long for the signal beacon announcing Troy's capture.",
        vocab: [
          { word: "ἀπαλλαγὴν", lemma: "ἀπαλλαγή", meaning: "release, deliverance, deliverance from", link: "https://logeion.uchicago.edu/%E1%BC%80%CF%80%CE%B1%CE%BB%CE%BB%CE%B1%CE%B3%CE%AE" },
          { word: "πόνων", lemma: "πόνος", meaning: "toil, labor, hardship, suffering", link: "https://logeion.uchicago.edu/%CF%80%CF%8C%CE%BD%CE%BF%CF%82" }
        ]
      },
      {
        ref: "1.2",
        lineNum: 2,
        source: "φρουρᾶς ἐτείας μῆκος, ἣν κοιμώμενος",
        literal: "of watch year-long length, in which lying asleep",
        translations: {
          taplin: "this whole year’s watch, during which, couched",
          smyth: "the length of my year-long watch, in which couched",
          lattimore: "of this watch, the size of a year now, wherein couched"
        },
        notes: "ἐτείας μῆκος: 'the length of a full year'. Establishes the exhausting anticipation that permeates the tragedy.",
        vocab: [
          { word: "ἐτείας", lemma: "ἐτήσιος", meaning: "annual, lasting a year", link: "https://logeion.uchicago.edu/%E1%BC%90%CF%84%CE%AE%CF%83%CE%B9%CE%BF%CF%82" }
        ]
      },
      {
        ref: "1.3",
        lineNum: 3,
        source: "στέγαις Ἀτρειδῶν ἄγκαθεν, κυνὸς δίκην,",
        literal: "on roofs of Atreidae upon elbows, dog's fashion,",
        translations: {
          taplin: "high on the palace roof of the sons of Atreus, like a dog,",
          smyth: "upon the roof of the Atreidae on my elbows like a dog,",
          lattimore: "high on the roof of the sons of Atreus upon my elbows, like a dog,",
          morshead: "Like a dog, I lie upon the palace roof of Atreides.",
          vellacott: "on the roof of Atreus' house—propped on my arms, like a dog"
        },
        notes: "κυνὸς δίκην: 'in the manner of a dog'. The watchdog metaphor sets up the dark bestial imagery that recurs throughout the Oresteia.",
        vocab: [
          { word: "κυνὸς", lemma: "κύων", meaning: "dog (genitive sing.)", link: "https://logeion.uchicago.edu/%CE%BA%CF%8D%CF%89%CE%BD" },
          { word: "δίκην", lemma: "δίκη", meaning: "custom, way, manner (adverbial acc.)", link: "https://logeion.uchicago.edu/%CE%B4%CE%AF%CE%BA%CE%B7" }
        ]
      }
    ]
  },
  {
    id: "sappho-fr-31",
    title: "Fragment 31 (Phainetai moi)",
    originalTitle: "Φαίνεταί μοι",
    authorId: "sappho",
    language: "Ancient Greek (Aeolic)",
    date: "c. 600 BCE",
    format: "Verse (Sapphic Stanza)",
    genre: "Lyric Poetry",
    description: "Sappho's celebrated lyric on the overwhelming physical and psychological sensations of erotic desire and jealousy, famously preserved in Pseudo-Longinus's On the Sublime.",
    passageRef: "Stanzas 1–4 (Complete Fragment)",
    commentaryCount: 4,
    tags: ["Facing Text", "Complete Poem", "Verse", "Lyric", "Aeolic Greek"],
    sourceEditions: [
      { id: "greek", name: "Original Aeolic Greek (Lobel-Page)", translator: "Original (Sappho)", year: "Archaic", type: "source", meter: "Sapphic Stanza", format: "Verse" },
      { id: "carson", name: "Anne Carson (2002)", translatorId: "anne-carson", year: "2002", type: "translation", format: "Verse", highlights: "Stark intimacy, avant-garde directness" },
      { id: "symonds", name: "John Addington Symonds (1883)", translatorId: "george-chapman", year: "1883", type: "translation", format: "Verse", highlights: "Victorian aesthetic lyricism" },
      { id: "wharton", name: "Henry Wharton (1885)", year: "1885", type: "translation", format: "Prose", highlights: "Scholarly Victorian prose translation" },
      { id: "lowell", name: "Amy Lowell (1920)", year: "1920", type: "translation", format: "Verse", highlights: "Imagist, sharply musical American modernism" }
    ],
    segments: [
      {
        ref: "31.1",
        lineNum: 1,
        source: "φαίνεταί μοι κῆνος ἴσος θέοισιν",
        literal: "appears to me that man equal to the gods",
        translations: {
          carson: "He seems to me equal to gods that man",
          symonds: "Peer of gods he seemeth to me, the blissful",
          wharton: "He seems to me peer of gods, that man",
          lowell: "He is more than a hero"
        },
        notes: "ἴσος θέοισιν: 'equal to the gods'. Catullus famously adapted this poem in his Carmen 51 ('Ille mi par esse deo videtur').",
        vocab: [
          { word: "φαίνεταί", lemma: "φαίνω", meaning: "appears, seems, shines forth", link: "https://logeion.uchicago.edu/%CF%86%CE%B1%CE%AF%CE%BD%CF%89" },
          { word: "ἴσος", lemma: "ἴσος", meaning: "equal, peer to, matching", link: "https://logeion.uchicago.edu/%E1%BC%B4%CF%83%CE%BF%CF%82" }
        ]
      },
      {
        ref: "31.2",
        lineNum: 2,
        source: "ἔμμεν' ὤνηρ, ὄττις ἐνάντιός τοι",
        literal: "to be the man, whoever opposite to you",
        translations: {
          carson: "who sits opposite you",
          symonds: "Man who sits and gazes at thee enraptured,",
          wharton: "who sitting opposite to thee",
          lowell: "he who is allowed to sit beside you"
        },
        notes: "ἐνάντιός τοι: 'face to face with you'.",
        vocab: [
          { word: "ἐνάντιός", lemma: "ἐναντίος", meaning: "opposite, facing", link: "https://logeion.uchicago.edu/%E1%BC%90%CE%BD%CE%B1%CE%BD%CF%84%CE%AF%CE%BF%CF%82" }
        ]
      },
      {
        ref: "31.3",
        lineNum: 3,
        source: "ἰσδάνει καὶ πλᾶσιον ἆδυ φωνεί- / σας ὐπακούει",
        literal: "sits and close sweet speaking listens to",
        translations: {
          carson: "and hears you speaking sweetly",
          symonds: "Hears thy sweet voice murmuring in his ear and",
          wharton: "listens to thee speaking sweetly",
          lowell: "and to hear the softness of your voice"
        },
        notes: "ἆδυ φωνείσας: 'sweet-speaking' in Aeolic dialect (Attic: ἡδὺ φωνούσης).",
        vocab: [
          { word: "ἆδυ", lemma: "ἡδύς", meaning: "sweet, pleasant, delightful", link: "https://logeion.uchicago.edu/%E1%BC%A1%CE%B4%CF%8D%CF%82" }
        ]
      }
    ]
  },
  {
    id: "marcus-meditations",
    title: "Meditations",
    originalTitle: "Τὰ εἰς ἑαυτόν",
    authorId: "marcus-aurelius",
    language: "Ancient Greek (Koine)",
    date: "c. 170–180 CE",
    format: "Prose (Stoic Reflections)",
    genre: "Philosophy",
    description: "The private spiritual notebook of the Roman Emperor Marcus Aurelius, written on military campaign as a rigorous exercise in Stoic self-discipline, mortality, and virtue.",
    passageRef: "Book 2, Section 1 (Morning Reflection)",
    commentaryCount: 3,
    tags: ["Facing Text", "Sample Passage", "Prose", "Stoicism", "Philosophy"],
    sourceEditions: [
      { id: "greek", name: "Original Greek (Farquharson OCT)", translator: "Original (Marcus Aurelius)", year: "Imperial", type: "source", format: "Prose" },
      { id: "hays", name: "Gregory Hays (2002)", translatorId: "gregory-hays", year: "2002", type: "translation", format: "Prose", highlights: "Crisp, unadorned, forceful modern English" },
      { id: "long", name: "George Long (1862)", translatorId: "benjamin-jowett", year: "1862", type: "translation", format: "Prose", highlights: "Classic Victorian scholarly edition" },
      { id: "farquharson", name: "A.S.L. Farquharson (1944)", year: "1944", type: "translation", format: "Prose", highlights: "Oxford scholarly translation, philological precision" },
      { id: "staniforth", name: "Maxwell Staniforth (1964)", year: "1964", type: "translation", format: "Prose", highlights: "Influential Penguin Classics version, widely read" }
    ],
    segments: [
      {
        ref: "2.1.1",
        lineNum: 1,
        source: "Ἕωθεν προλέγειν ἑαυτῷ: συντεύξομαι περιέργῳ, ἀχαρίστῳ, ὑβριστῇ, δολερῷ, βασκάνῳ, ἀκοινωνήτῳ:",
        literal: "At dawn say beforehand to oneself: I shall meet with busybody, ungrateful, arrogant, deceitful, envious, unsocial:",
        translations: {
          hays: "When you wake up in the morning, tell yourself: The people I deal with today will be meddling, ungrateful, arrogant, dishonest, jealous, and surly.",
          long: "Begin the morning by saying to thyself, I shall meet with the busy-body, the ungrateful, arrogant, deceitful, envious, unsocial.",
          farquharson: "Begin the morning by saying to thyself: I shall meet today with the busy-body, the thankless, the overbearing, the treacherous, the envious, the unneighbourly.",
          staniforth: "Begin each day by telling yourself: Today I shall be meeting with interference, ingratitude, insolence, disloyalty, ill-will, and selfishness."
        },
        notes: "Ἕωθεν προλέγειν ἑαυτῷ: 'Say to yourself at daybreak'. The praemeditatio malorum—a fundamental Stoic cognitive exercise anticipating difficult human behavior.",
        vocab: [
          { word: "Ἕωθεν", lemma: "ἕωθεν", meaning: "from the morning, at dawn", link: "https://logeion.uchicago.edu/%E1%BC%95%CF%89%CE%B8%CE%B5%CE%BD" },
          { word: "ἀκοινωνήτῳ", lemma: "ἀκοινώνητος", meaning: "unsocial, selfish, refusing fellowship", link: "https://logeion.uchicago.edu/%E1%BC%80%CE%BA%CE%BF%CE%B9%CE%BD%CF%8E%CE%BD%CE%B7%CF%84%CE%BF%CF%82" }
        ]
      },
      {
        ref: "2.1.2",
        lineNum: 2,
        source: "πάντα ταῦτα συμβέβηκεν ἐκείνοις παρὰ τὴν ἄγνοιαν τῶν ἀγαθῶν καὶ κακῶν.",
        literal: "all these things has happened to them on account of the ignorance of good and evil.",
        translations: {
          hays: "They are like this because they cannot distinguish good from evil.",
          long: "All these things happen to them by reason of their ignorance of what is good and evil.",
          farquharson: "All this has happened to them because they know not good from evil.",
          staniforth: "All of this is because they have no idea of good and evil."
        },
        notes: "Socratic intellectualism applied to Stoic compassion: people do wrong out of ignorance (ἄγνοια) of the nature of good and bad.",
        vocab: [
          { word: "ἄγνοιαν", lemma: "ἄγνοια", meaning: "ignorance, lack of knowledge", link: "https://logeion.uchicago.edu/%E1%BC%84%CE%B3%CE%BD%CE%BF%CE%B9%CE%B1" },
          { word: "ἀγαθῶν", lemma: "ἀγαθός", meaning: "good things, virtues", link: "https://logeion.uchicago.edu/%E1%BC%80%CE%B3%CE%B1%CE%B8%CF%8C%CF%82" }
        ]
      }
    ]
  }
];
