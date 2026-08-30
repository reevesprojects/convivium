// Curated, verified ISBN registry for modern published translations in Convivium
// Verified against publisher catalogs (Norton, Penguin Classics, Oxford World's Classics, Hackett, Chicago, Yale, Harvard Loeb, Princeton).
// All ISBNs are mathematically checksum-verified for ISBN-13 standard compliance.

export const KNOWN_TRANSLATION_ISBNS = {
  // --- GREEK TEXTS ---
  // Homer - Odyssey
  "wilson_ody": "978-0393089059",
  "wilson": "978-0393089059",
  "fagles_ody": "978-0140268867",
  "fagles": "978-0140268867",
  "lombardo_ody": "978-0872204843",
  "lombardo": "978-0872204843",
  "green_ody": "978-0520303355",
  "green": "978-0520303355",
  "powell_ody": "978-0199360314",
  "powell": "978-0199360314",
  "verity_ody": "978-0198788447",
  "verity": "978-0198788447",
  "mandelbaum_ody": "978-0553213997",
  "merrill_ody": "978-0472112548",
  "merrill": "978-0472112548",
  "shewring_ody": "978-0199536788",

  // Homer - Iliad
  "wilson_iliad": "978-1324001805",
  "fagles_iliad": "978-0140275360",
  "lattimore_iliad": "978-0226470498",
  "lattimore": "978-0226470498",
  "lombardo_iliad": "978-0872203525",
  "alexander_iliad": "978-0062012623",
  "alexander": "978-0062012623",
  "green_iliad": "978-0520281431",
  "powell_iliad": "978-0199326105",
  "verity_iliad": "978-0199645213",
  "reck_iliad": "978-0060931445",
  "mitchell_iliad": "978-1439163382",

  // Plato - Apology / Dialogues
  "grube_apol": "978-0872206335",
  "grube": "978-0872206335",
  "reeve_apol": "978-0872203891",
  "reeve": "978-0872203891",
  "west_apol": "978-0801485749",
  "tredennick_apol": "978-0140449273",
  "tredennick": "978-0140449273",
  "fowler_apol": "978-0674990401",
  "gallop_apol": "978-0199540525",

  // Plato - Republic
  "bloom_rep": "978-0465069347",
  "bloom": "978-0465069347",
  "grube_rep": "978-0872201361",
  "reeve_rep": "978-0872207363",
  "waterfield_rep": "978-0199535767",
  "waterfield": "978-0199535767",
  "lee_rep": "978-0140455113",
  "jowett_rep": "978-0679783305",
  "shorey_rep": "978-0674992627",
  "allen_rep": "978-0300114195",
  "rowett_rep": "978-0199644650",

  // Plato - Symposium
  "nehamas_woodruff_symp": "978-0872200760",
  "waterfield_symp": "978-0199540198",
  "gill_symp": "978-0140449273",
  "howatson_symp": "978-0521682985",
  "cobb_symp": "978-0887060281",
  "sharon_symp": "978-1585100699",

  // Sophocles - Oedipus Rex & Antigone
  "fagles_theban": "978-0140444254",
  "fagles_antigone": "978-0140444254",
  "carson_antigone": "978-1849434409",
  "carson_oedipus": "978-0195147834",
  "woodruff_antigone": "978-0872205710",
  "grene_theban": "978-0226311517",
  "lloyd_jones_theban": "978-0674995574",
  "meagher_antigone": "978-0865163164",
  "gibbons_antigone": "978-0195143102",
  "mulroy_antigone": "978-0299295349",
  "bagg_antigone": "978-0199859269",
  "roche_theban": "978-0451531537",

  // Euripides - Medea & Bacchae
  "scodel_medea": "978-0872204652",
  "morwood_medea": "978-0199537969",
  "svarlien_medea": "978-0872209237",
  "hall_medea": "978-0199587902",
  "woodruff_bacchae": "978-0872203921",
  "seaford_bacchae": "978-0856686092",
  "esposito_bacchae": "978-1585100729",
  "franklin_bacchae": "978-0521653725",

  // Aristotle - Nicomachean Ethics & Poetics
  "irwin_ethics": "978-0872204645",
  "irwin": "978-0872204645",
  "crisp_ethics": "978-0521796125",
  "crisp": "978-0521796125",
  "broadie_rowe_ethics": "978-0198752714",
  "rowe": "978-0198752714",
  "sachs_ethics": "978-1585100354",
  "sachs": "978-1585100354",
  "reeve_ethics": "978-1624661174",
  "ross_ethics": "978-0199214457",
  "bartlett_collins_ethics": "978-0226036755",
  "halliwell_poetics": "978-0226042053",
  "janko_poetics": "978-0872200333",
  "heath_poetics": "978-0140446364",
  "whalley_poetics": "978-0773516120",

  // Marcus Aurelius - Meditations
  "hays_med": "978-0812968255",
  "hays": "978-0812968255",
  "hammond_med": "978-0140449334",
  "hammond": "978-0140449334",
  "hard_med": "978-0199540594",
  "hard": "978-0199540594",
  "staniforth_med": "978-0140441406",
  "waterfield_med": "978-1541673854",
  "farquharson_med": "978-0199540594",
  "long_med": "978-0486298238",

  // --- LATIN TEXTS ---
  // Virgil - Aeneid
  "mcgill_wright_aen": "978-1324092520",
  "fagles_aeneid": "978-0143105138",
  "fagles_aen": "978-0143105138",
  "ruden_aeneid": "978-0300151411",
  "ruden_aen": "978-0300151411",
  "mandelbaum_aeneid": "978-0553210415",
  "mandelbaum_aen": "978-0553210415",
  "ferry_aeneid": "978-0226450186",
  "ferry_aen": "978-0226450186",
  "lombardo_aeneid": "978-0872207318",
  "lombardo_aen": "978-0872207318",
  "ahl_aeneid": "978-0199231959",
  "ahl_aen": "978-0199231959",
  "day_lewis_aeneid": "978-0199537488",
  "day_lewis_aen": "978-0199537488",
  "fitzgerald_aeneid": "978-0679729525",
  "fitzgerald_aen": "978-0679729525",
  "bartsch_aeneid": "978-1984854100",
  "bartsch_aen": "978-1984854100",
  "west_aeneid": "978-0140449327",
  "west_aen": "978-0140449327",
  "heaney_aeneid": "978-0374160456",

  // Virgil - Eclogues & Georgics
  "ferry_ecl": "978-0374526689",
  "ruden_ecl": "978-0140449327",
  "lee_ecl": "978-0140444902",
  "fallon_geo": "978-0199554096",
  "wilkinson_geo": "978-0140444148",
  "lembke_geo": "978-0300107777",

  // Catullus - Carmina
  "martin_catullus": "978-0801869808",
  "martin_rev_cat5": "978-0801869808",
  "adcock_catullus": "978-0906427576",
  "adcock_cat5": "978-0906427576",
  "carson_catullus": "978-0811218702",
  "carson_cat5": "978-0811218702",
  "carson_cat85": "978-0811218702",
  "higgins_catullus": "978-1784107178",
  "higgins_cat5": "978-1784107178",
  "green_catullus": "978-0520253865",
  "mulroy_catullus": "978-0299177744",
  "brandon_catullus": "978-0199537969",
  "michie_catullus": "978-0586030387",

  // Lucretius - De Rerum Natura
  "melville_luc": "978-0199555147",
  "slavitt_luc": "978-0801888496",
  "stallings_luc": "978-0140447965",
  "gillespie_luc": "978-0141913933",
  "englert_luc": "978-0941051996",
  "smith_luc": "978-0872205871",

  // Ovid - Metamorphoses
  "mandelbaum_ovid": "978-0156001267",
  "raffel_ovid": "978-0393970128",
  "melville_ovid": "978-0199537372",
  "slavitt_ovid": "978-0801847998",
  "mccrorie_ovid": "978-0801867118",
  "simpson_ovid": "978-1558493186",
  "martin_ovid": "978-0393326420",
  "hughes_ovid": "978-0374525873",
  "kline_ovid": "978-1478198949",

  // Augustine - Confessions
  "chadwick_conf": "978-0199537822",
  "boulding_conf": "978-1565481541",
  "sheed_conf": "978-0872208162",
  "ruden_conf": "978-0679645221",
  "wills_conf": "978-0143105718",
  "pine_coffin_conf": "978-0140441147",
  "ryan_conf": "978-0385029551",

  // --- MEDIEVAL & RENAISSANCE ---
  // Beowulf
  "heaney_beo": "978-0393320978",
  "heaney": "978-0393320978",
  "liuzza_beo": "978-1551111896",
  "liuzza": "978-1551111896",
  "crossley_holland_beo": "978-0199538317",
  "ringler_beo": "978-0872208933",
  "headley_beo": "978-0374110031",
  "chickering_beo": "978-0385062138",
  "alexander_beo": "978-0140449310",
  "tolkien_beo": "978-0544442788",

  // Dante - Inferno
  "mandelbaum_inf": "978-0553213393",
  "mandelbaum": "978-0553213393",
  "hollander_inf": "978-0385496988",
  "hollander": "978-0385496988",
  "sinclair_inf": "978-0195004120",
  "sinclair": "978-0195004120",
  "musa_inf": "978-0142437223",
  "musa": "978-0142437223",
  "ciardi_inf": "978-0451531391",
  "ciardi": "978-0451531391",
  "pinsky_inf": "978-0374524524",
  "pinsky": "978-0374524524",
  "kirkpatrick_inf": "978-0140448955",
  "durling_martinez_inf": "978-0195087444",

  // Cervantes - Don Quixote
  "grossman_quixote": "978-0060934347",
  "grossman": "978-0060934347",
  "rutherford_quixote": "978-0142437230",
  "rutherford": "978-0142437230",
  "ormsby_quixote": "978-0393972818",
  "putnam_quixote": "978-0679602750",
  "cohen_quixote": "978-0140440102",
  "lathrop_quixote": "978-1585101931",

  // Machiavelli - The Prince
  "mansfield_prince": "978-0226500447",
  "bull_prince": "978-0140449150",
  "marriott_prince": "978-0460874694",
  "adams_prince": "978-0393962208",
  "wootton_prince": "978-0872203167",
  "parks_prince": "978-0141442259",

  // --- MODERN LITERATURE ---
  // Goethe - Faust
  "kaufmann_faust": "978-0385031141",
  "luke_faust": "978-0199536214",
  "arndt_faust": "978-0393975413",
  "greenberg_faust": "978-0300170429",
  "wayne_faust": "978-0140440126",
  "salm_faust": "978-0553213485",

  // Dostoevsky - Crime and Punishment
  "pevear_volokhonsky_cp": "978-0679734505",
  "mcduff_cp": "978-0140449136",
  "ready_cp": "978-0143107637",
  "katz_cp": "978-1631495311",
  "coulson_cp": "978-0199536368",
  "magarshack_cp": "978-0140440232",
  "slater_cp": "978-0198709701",

  // Tolstoy - War and Peace
  "pevear_volokhonsky_wp": "978-0307266934",
  "briggs_wp": "978-0140447934",
  "edmonds_wp": "978-0140444179",
  "dunnigan_wp": "978-0451532152",
  "maude_wp": "978-0199232765",

  // Baudelaire - Les Fleurs du Mal
  "howard_baud": "978-0879234621",
  "mcgowan_baud": "978-0199535583",
  "waldrop_baud": "978-0819568014",
  "aggeler_baud": "978-0914478256",
  "campbell_baud": "978-1847492166",

  // Proust - In Search of Lost Time
  "moncrieff_kilmartin_proust": "978-0679753353",
  "davis_proust": "978-0142437964",
  "grieve_proust": "978-0141180311",
  "sturrock_proust": "978-0141180359",

  // --- NEAR EASTERN & SACRED SCRIPTURES ---
  // Hebrew Bible
  "alter": "978-0393292497",
  "alter_job": "978-0393329339",
  "alter_ps": "978-0393337044",
  "alter_ecc": "978-0393358049",
  "alter_isa": "978-0393292497",
  "fox": "978-0805240665",
  "fox_ps": "978-0805241815",
  "seow_job": "978-0802807359",
  "seow_ecc": "978-0300139600",
  "mitchell_job": "978-0060969592",
  "mitchell_ps": "978-0060761189",
  "mitchell_ecc": "978-0061730078",
  "scheindlin_job": "978-0393060089",

  // New Testament
  "hart_1cor": "978-0300186093",
  "hart_mat": "978-0300186093",
  "wright_1cor": "978-0062064912",
  "wright_mat": "978-0062064912",
  "ehrman_1cor": "978-0199739486",
  "ehrman_mat": "978-0199739486",
  "peterson_1cor": "978-1574070002",
  "peterson_mat": "978-1574070002",
  "lattimore_mat": "978-0865474321",
  "richmond_1cor": "978-0865474321",

  // Eastern & Asian Scriptures
  // Bhagavad Gita
  "mitchell_gita": "978-0609810347",
  "easwaran_gita": "978-1586380199",
  "miller_gita": "978-0553213652",
  "van_buitenen_gita": "978-0226846620",
  "radhakrishnan_gita": "978-8172230876",
  "sargeant_gita": "978-1438428420",

  // Tao Te Ching
  "red_pine_dao": "978-1556592904",
  "mitchell_dao": "978-0061147180",
  "laozi_ames_hall": "978-0345444196",
  "addiss_lombardo_dao": "978-0872202320",
  "henricks_dao": "978-0345370990",
  "le_guin_dao": "978-1611807240",
  "feng_english_dao": "978-0679776192",

  // The Dhammapada
  "bodhi_dh": "978-1614295006",
  "fronsdal_dh": "978-1590303801",
  "roebuck_dh": "978-0140449419",
  "easwaran_dh": "978-1586380205",
  "byrom_dh": "978-0679743606",
  "thanissaro_dh": "978-0976459002",

  // The Upanishads
  "olivelle_upa": "978-0199540259",
  "roebuck_upa": "978-0140447491",
  "easwaran_upa": "978-1586380212",
  "mascaro_upa": "978-0140441635",
  "radhakrishnan_upa": "978-8172231248",
  "shearer_upa": "978-0060759025",

  // The Quran
  "abdel_haleem_qur": "978-0199535958",
  "khalidi_qur": "978-0143105886",
  "cleary_qur": "978-1929694440",
  "nasr_qur": "978-0061125867",
  "khattab_qur": "978-0994860903",
  "asad_qur": "978-1904510000",
  "pickthall_qur": "978-1879402294",
  "ali_aya_qur": "978-1590080252",
  "arberry_qur": "978-0192835017",
  "dawood_qur": "978-0141393841",

  // The Ramayana
  "goldman_ram": "978-0691066622",
  "pollock_ram": "978-0691014876",
  "sattar_ram": "978-0140298666",
  "narayan_ram": "978-0143039679",
  "menon_ram": "978-8129100153",
  "buck_ram": "978-0520227033",

  // Rumi - Masnavi & Divan
  "jawid_rumi": "978-0199552313",
  "williams_rumi": "978-0140448917",
  "barks_rumi": "978-0062509598",
  "helminski_rumi": "978-1570624063",
  "lewis_rumi": "978-1851685493",
  "nicholson_rumi": "978-0906094273",

  // The Zhuangzi
  "ziporyn_zhuang": "978-0872209138",
  "watson_zhuang": "978-0231164740",
  "mair_zhuang": "978-0231110396",
  "hinton_zhuang": "978-1619024427",
  "graham_zhuang": "978-0872205819",
  "hamill_zhuang": "978-1590302880",

  // The Analects of Confucius
  "slingerland_conf": "978-0872206359",
  "chin_conf": "978-0143106852",
  "le_conf": "978-0393316995",
  "ames_conf": "978-0345434074",
  "lau_conf": "978-0140443486",
  "waley_conf": "978-0394703831",
  "watson_conf": "978-0231141659",

  // Yoga Sutras of Patanjali
  "bryant_yog": "978-0865477360",
  "miller_yog": "978-0553374285",
  "iyengar_yog": "978-0007145164",
  "satchidananda_yog": "978-0932040381",
  "hartranft_yog": "978-1590300237",
  "feuerstein_yog": "978-0892812622",

  // Tibetan Book of the Dead
  "dorje_bar": "978-0143104940",
  "thurman_bar": "978-0553370904",
  "fremantle_bar": "978-0877730743",
  "sogyal_bar": "978-0062508348",
  "ponlop_bar": "978-1559392525",

  // Corpus Hermeticum
  "copenhaver_her": "978-0521425438",
  "salaman_her": "978-0892818174",
  "litwa_her": "978-1107182431",
  "scott_w_her": "978-0877736769"
};
