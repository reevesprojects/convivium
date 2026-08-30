// Convivium Central Texts Corpus (Modular Entry Point)

import { GREEK_TEXTS } from "./texts/greek.js";
import { LATIN_TEXTS } from "./texts/latin.js";
import { NEAR_EASTERN_TEXTS } from "./texts/nearEastern.js";
import { MEDIEVAL_RENAISSANCE_TEXTS } from "./texts/medievalRenaissance.js";
import { MODERN_TEXTS } from "./texts/modern.js";

export const TEXTS = [
  ...GREEK_TEXTS,
  ...LATIN_TEXTS,
  ...NEAR_EASTERN_TEXTS,
  ...MEDIEVAL_RENAISSANCE_TEXTS,
  ...MODERN_TEXTS
];
