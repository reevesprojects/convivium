// Convivium Digital Humanities External Digital Library Services
// Generates accurate, scholar-oriented discovery URLs for Project Gutenberg, Perseus Digital Library,
// Internet Classics Archive (MIT), Internet Archive, Amazon, Bookshop.org, Sefaria, and Standard Ebooks.

export const ExternalLinksService = {
  // Author-level primary digital library portals
  getAuthorLinks(author) {
    if (!author) return [];

    const name = author.name;
    const encName = encodeURIComponent(name);
    const cleanName = name.replace(/\s*\([^)]*\)/g, "").trim();
    const encCleanName = encodeURIComponent(cleanName);
    const lang = author.language || "";

    const links = [];

    // 1. Perseus Digital Library (Tufts University) for Classical Greek & Latin
    if (lang.includes("Greek") || lang.includes("Latin")) {
      links.push({
        id: "perseus",
        name: "Perseus Digital Library",
        icon: "🏛️",
        category: "Academic Primary Source",
        url: `https://www.perseus.tufts.edu/hopper/searchresults?q=${encCleanName}`,
        description: "Tufts University's flagship classical library with full Greek/Latin texts and morphological tools"
      });
    }

    // 2. Sefaria for Biblical Hebrew
    if (lang.includes("Hebrew")) {
      links.push({
        id: "sefaria",
        name: "Sefaria Living Library",
        icon: "📜",
        category: "Bilingual Hebrew Library",
        url: `https://www.sefaria.org/search?q=${encCleanName}&tab=text`,
        description: "Open-source digital library of Hebrew texts with interlinear translations"
      });
    }

    // 3. Project Gutenberg (Free Public Domain eBooks)
    links.push({
      id: "gutenberg",
      name: "Project Gutenberg",
      icon: "📖",
      category: "Free Public Domain Texts",
      url: `https://www.gutenberg.org/ebooks/search/?query=${encCleanName}&submit_search=Go%21`,
      description: "Over 70,000 free digital editions and historical translations"
    });

    // 4. Internet Archive (Scanned Historical Manuscripts & Critical Editions)
    links.push({
      id: "internet-archive",
      name: "Internet Archive",
      icon: "📚",
      category: "Historical Scans & Editions",
      url: `https://archive.org/search?query=${encCleanName}+AND+mediatype%3Atexts`,
      description: "Millions of digitized scholarly editions, Loeb Classical Library scans, and historical variorums"
    });

    // 5. Standard Ebooks (Carefully formatted modern typographic editions)
    links.push({
      id: "standard-ebooks",
      name: "Standard Ebooks",
      icon: "✨",
      category: "Modern Free Editions",
      url: `https://standardebooks.org/ebooks?query=${encCleanName}`,
      description: "Free, beautifully typeset digital editions of public domain classics"
    });

    // 6. Bookshop.org & Amazon for Modern Critical Translations & Paperbacks
    links.push({
      id: "bookshop",
      name: "Bookshop.org",
      icon: "🛍️",
      category: "Independent Bookstores",
      url: `https://bookshop.org/search?keywords=${encName}`,
      description: "Support local independent bookstores for modern published translations"
    });

    links.push({
      id: "amazon",
      name: "Amazon Books",
      icon: "📦",
      category: "Editions & Audiobooks",
      url: `https://www.amazon.com/s?k=${encName}+translation`,
      description: "Find physical copies, Kindle editions, and audiobooks"
    });

    return links;
  },

  // Text / Work-level digital library portals
  getTextLinks(text) {
    if (!text) return [];

    const title = text.title.replace(/\s*\([^)]*\)/g, "").trim();
    const encTitle = encodeURIComponent(title);
    const authorName = text.authorId || "";
    const encQuery = encodeURIComponent(`${title} ${authorName}`.trim());
    const lang = text.language || "";

    const links = [];

    // 1. Perseus Digital Library (Greek & Latin)
    if (lang.includes("Greek") || lang.includes("Latin")) {
      links.push({
        id: "perseus",
        name: "Perseus Digital Library",
        icon: "🏛️",
        category: "Primary Text & Greek/Latin Lexicon",
        url: `https://www.perseus.tufts.edu/hopper/searchresults?q=${encTitle}`,
        description: "Read the complete critical Greek/Latin edition with word-by-word morphological parsing"
      });
    }

    // 2. MIT Internet Classics Archive (Greek, Latin, Persian, Chinese)
    if (lang.includes("Greek") || lang.includes("Latin") || lang.includes("Persian") || lang.includes("Chinese")) {
      links.push({
        id: "mit-classics",
        name: "Internet Classics Archive (MIT)",
        icon: "🎓",
        category: "MIT Classical Archive",
        url: `http://classics.mit.edu/`,
        description: "MIT's curated archive of classical Greek, Roman, and world literature translations"
      });
    }

    // 3. Sefaria (Hebrew Bible & Rabbinics)
    if (lang.includes("Hebrew")) {
      links.push({
        id: "sefaria",
        name: "Sefaria Open Library",
        icon: "📜",
        category: "Hebrew & Translation Interlinear",
        url: `https://www.sefaria.org/search?q=${encTitle}&tab=text`,
        description: "Explore the full Hebrew text with traditional commentaries (Rashi, Ibn Ezra) and English versions"
      });
    }

    // 4. Project Gutenberg
    links.push({
      id: "gutenberg",
      name: "Project Gutenberg (Free eBook)",
      icon: "📖",
      category: "Public Domain Editions",
      url: `https://www.gutenberg.org/ebooks/search/?query=${encQuery}&submit_search=Go%21`,
      description: "Free EPUB, Kindle, and HTML editions of historical translations"
    });

    // 5. Standard Ebooks
    links.push({
      id: "standard-ebooks",
      name: "Standard Ebooks",
      icon: "✨",
      category: "Free Curated Editions",
      url: `https://standardebooks.org/ebooks?query=${encTitle}`,
      description: "Beautifully formatted public domain editions with modern typography"
    });

    // 6. Internet Archive
    links.push({
      id: "internet-archive",
      name: "Internet Archive",
      icon: "📚",
      category: "Critical Editions & Loeb Scans",
      url: `https://archive.org/search?query=${encQuery}+AND+mediatype%3Atexts`,
      description: "Digitized facsimiles of Oxford Classical Texts, Loeb Classical Library, and variorum commentaries"
    });

    // 7. Bookshop.org & Amazon
    links.push({
      id: "bookshop",
      name: "Bookshop.org",
      icon: "🛍️",
      category: "Buy from Independent Bookstores",
      url: `https://bookshop.org/search?keywords=${encQuery}`,
      description: "Find modern translations and Norton Critical Editions at independent bookstores"
    });

    links.push({
      id: "amazon",
      name: "Amazon Books",
      icon: "📦",
      category: "Buy Physical / Kindle / Audio",
      url: `https://www.amazon.com/s?k=${encQuery}`,
      description: "Find paperback, hardcover, and audiobook editions"
    });

    return links;
  },

  // Edition / Translator-level links
  getEditionLink(edition, text) {
    if (!edition) return null;

    const query = `${edition.name} ${text ? text.title : ""}`.trim();
    const encQuery = encodeURIComponent(query);
    const encEdName = encodeURIComponent(edition.name);

    if (edition.type === "source") {
      return {
        name: "Perseus / Internet Archive",
        icon: "🏛️",
        url: `https://archive.org/search?query=${encQuery}+AND+mediatype%3Atexts`
      };
    }

    // Extract clean translator name and work title
    const translatorName = edition.name.replace(/\s*\([^)]*\)/g, "").trim();
    const workTitle = text ? (text.title || "").replace(/\s*\([^)]*\)/g, "").trim() : "";
    const cleanQuery = `${translatorName} ${workTitle}`.trim();
    const encCleanQuery = encodeURIComponent(cleanQuery);
    const gutenbergQuery = encodeURIComponent(`${translatorName} ${workTitle}`.trim());

    // 1. If A.S. Kline / Poetry in Translation
    if (edition.id.includes("kline") || translatorName.toLowerCase().includes("kline")) {
      return {
        name: "Poetry in Translation",
        icon: "🌐",
        url: `https://www.poetryintranslation.com/search/index.php?search=${encodeURIComponent(workTitle)}`
      };
    }

    // 2. If Ian Johnston (Vancouver Island University)
    if (edition.id.includes("johnston") || translatorName.toLowerCase().includes("johnston")) {
      return {
        name: "Johnston Digital / Archive",
        icon: "🎓",
        url: `https://www.google.com/search?q=${encodeURIComponent('Ian Johnston ' + workTitle + ' translation')}`
      };
    }

    // 3. If verified ISBN is present -> Link to WorldCat & Google Books universal aggregate
    if (edition.isbn) {
      const cleanIsbn = edition.isbn.replace(/[^0-9X]/gi, "");
      return {
        name: `WorldCat / ISBN`,
        icon: "🏷️",
        url: `https://www.worldcat.org/isbn/${cleanIsbn}`,
        isbn: edition.isbn
      };
    }

    // 4. Standard public domain translation search (Translator + Work Title on Project Gutenberg)
    if (edition.year && parseInt(edition.year, 10) < 1928) {
      return {
        name: "Project Gutenberg / Archive",
        icon: "📖",
        url: `https://www.gutenberg.org/ebooks/search/?query=${gutenbergQuery}&submit_search=Go%21`
      };
    }

    // 5. Modern in-copyright translation -> Universal Google Books & WorldCat search
    return {
      name: "Google Books / WorldCat",
      icon: "📚",
      url: `https://www.google.com/search?tbm=bks&q=${encCleanQuery}`
    };
  },

  // Multiple Discovery Actions for Edition Detail Modal/Card
  getEditionDiscoveryLinks(edition, text) {
    if (!edition) return [];
    const translatorName = edition.name.replace(/\s*\([^)]*\)/g, "").trim();
    const workTitle = text ? (text.title || "").replace(/\s*\([^)]*\)/g, "").trim() : "";
    const query = `${translatorName} ${workTitle}`.trim();
    const encQuery = encodeURIComponent(query);
    const links = [];

    if (edition.isbn) {
      const cleanIsbn = edition.isbn.replace(/[^0-9X]/gi, "");
      links.push({
        name: "WorldCat (Library Catalog)",
        icon: "🏛️",
        url: `https://www.worldcat.org/isbn/${cleanIsbn}`
      });
      links.push({
        name: "Bookshop.org",
        icon: "🛍️",
        url: `https://bookshop.org/search?keywords=${cleanIsbn}`
      });
    }

    links.push({
      name: "Google Books",
      icon: "📚",
      url: `https://www.google.com/search?tbm=bks&q=${encQuery}`
    });

    links.push({
      name: "Goodreads",
      icon: "⭐",
      url: `https://www.goodreads.com/search?q=${encQuery}`
    });

    return links;
  },

  // Translator-level links
  getTranslatorLinks(translator) {
    if (!translator) return [];

    const name = translator.name;
    const encName = encodeURIComponent(name);

    return [
      {
        id: "gutenberg",
        name: "Project Gutenberg",
        icon: "📖",
        category: "Historical Translations",
        url: `https://www.gutenberg.org/ebooks/search/?query=${encName}&submit_search=Go%21`,
        description: "Public domain translations by this author"
      },
      {
        id: "internet-archive",
        name: "Internet Archive",
        icon: "📚",
        category: "Scanned Books & Editions",
        url: `https://archive.org/search?query=${encName}+AND+mediatype%3Atexts`,
        description: "Historical manuscripts, Loeb volumes, and critical apparatus"
      },
      {
        id: "bookshop",
        name: "Bookshop.org",
        icon: "🛍️",
        category: "Modern Translations",
        url: `https://bookshop.org/search?keywords=${encName}`,
        description: "Explore published translations in print through independent bookstores"
      },
      {
        id: "amazon",
        name: "Amazon Books",
        icon: "📦",
        category: "Print & Audiobooks",
        url: `https://www.amazon.com/s?k=${encName}+translator`,
        description: "Browse all translations and audio recordings"
      }
    ];
  }
};
