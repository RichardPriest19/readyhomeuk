// Build script: run `node build.js` after editing products, photos or content.
// - Pre-renders the kit into index.html so search engines see the full content
// - Generates the guide pages, sitemap.xml and robots.txt
const fs = require("fs");
const path = require("path");

const ROOT = __dirname;
const SITE = "https://richardpriest19.github.io/readyhomeuk/";

const load = (f) => fs.readFileSync(path.join(ROOT, f), "utf8");
const lib = new Function(
  load("photos.js") + load("products.js") + load("render.js") +
    "; return { PHOTOS, photo, PRODUCTS, CATEGORIES, SITUATIONS, ESSENTIALS, amazonUrl, tileHTML, summaryHTML, filtersHTML, cardHTML, essentialHTML, buyLinks, creditsHTML, visibleFor };"
)();
const { PHOTOS, photo, PRODUCTS, SITUATIONS, ESSENTIALS } = lib;

const now = new Date();
const UPDATED = now.toLocaleDateString("en-GB", { month: "long", year: "numeric" });
const ISO_DATE = now.toISOString().slice(0, 10);
const YEAR = now.getFullYear();

const byId = (id) => PRODUCTS.find((p) => p.id === id);
const abs = (u) => (/^https?:/.test(u) ? u : SITE + u);
const jsonld = (obj) => `<script type="application/ld+json">${JSON.stringify(obj).replace(/</g, "\\u003c")}</script>`;
const strip = (html) => html.replace(/<[^>]+>/g, "");

function fill(html, name, content) {
  const re = new RegExp(`<!--pre:${name}-->[\\s\\S]*?<!--/pre:${name}-->`);
  if (!re.test(html)) throw new Error(`marker missing: ${name}`);
  return html.replace(re, () => `<!--pre:${name}-->${content}<!--/pre:${name}-->`);
}

function faqHTML(faq) {
  return faq
    .map((f) => `\n          <details><summary>${f.q}</summary><div class="faq-a">${f.a.map((p) => `<p>${p}</p>`).join("")}</div></details>`)
    .join("") + "\n        ";
}

function faqLD(faq) {
  return {
    "@type": "FAQPage",
    mainEntity: faq.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a.map(strip).join(" ") },
    })),
  };
}

// ---------------------------------------------------------------------------------
// Content
// ---------------------------------------------------------------------------------
const HOME_FAQ = [
  {
    q: "What should be in an emergency kit in the UK?",
    a: [
      "The UK government's Prepare campaign asks every household to keep a battery or wind-up torch, a battery or wind-up radio, a portable power bank, spare batteries, a first aid kit, hand sanitiser and wet wipes, bottled water, food that needs no cooking (with a tin opener) and enough of any regular medication to last several days.",
      "Families should also plan for babies (ready-to-feed formula) and pets. Our <a href=\"#essentials\">10 essentials</a> list covers the core items.",
    ],
  },
  {
    q: "How much water should I store for an emergency?",
    a: [
      "Government guidance is 2.5 to 3 litres per person per day just to drink, or about 10 litres per person per day to cover cooking and washing too.",
      "For three days that's 9 to 30 litres per person, or 36 to 120 litres for a family of four. See our <a href=\"emergency-water-and-food/\">water and food storage guide</a> for a table by household size.",
    ],
  },
  {
    q: "How many days of supplies should I keep?",
    a: [
      "Aim for at least three days. Most emergencies are over sooner, but after major storms and floods some homes have waited several days for power or water to come back.",
    ],
  },
  {
    q: "What should I do in a power cut?",
    a: [
      "Check whether your neighbours are affected, then call 105 (free, in England, Scotland and Wales) to report it and get updates. Switch off appliances except one light, keep the fridge and freezer closed, and check on vulnerable neighbours.",
      "Never use a barbecue, camping stove or generator indoors, because of the risk of carbon monoxide poisoning. Our <a href=\"power-cut-kit/\">power cut kit guide</a> covers what to keep ready.",
    ],
  },
  {
    q: "Where should I keep my emergency kit?",
    a: [
      "Keep it together in one place that's easy to reach and that everyone at home knows about. Avoid the loft, and avoid the garage or cellar if your home could flood. Keep a packed <a href=\"grab-bag-checklist/\">grab bag</a> near the door, and check dates and batteries every six months.",
    ],
  },
  {
    q: "Is ReadyHome UK part of the government?",
    a: [
      "No. ReadyHome UK is an independent site. Our core list follows the government's Prepare campaign, and we earn a small commission if you buy through our Amazon links, at no extra cost to you.",
    ],
  },
];

const GUIDES = [
  {
    slug: "power-cut-kit",
    title: "Power Cut Kit UK: What You Need (2026 Checklist)",
    description: "What to keep at home for a long power cut in the UK: torches, lanterns, power banks, power stations, radios and ways to stay warm, with amounts for your household.",
    h1: "Power cut kit: what every UK home needs",
    tile: "Power cut kit",
    tileText: "Light, heat, charging and staying in touch",
    photo: "powercut",
    intro: [
      "Most power cuts in the UK are fixed within a few hours. But after big storms, some homes have been without power for several days. When the electricity goes, so does more than the lights: most central heating stops, fridges warm up, phones run flat and, if your landline has moved to Digital Voice, your home phone stops working too.",
      "In England, Scotland and Wales you can call <strong>105</strong> for free to report a power cut and get updates. Below is everything worth keeping ready, starting with the items on the government's own checklist.",
      "<h2>Safety first</h2>",
      "Use LED torches and lanterns rather than candles, which cause house fires every year. Never use a barbecue, camping stove, patio heater or petrol generator indoors: they give off carbon monoxide, which can kill. A battery power station is the safe way to run appliances indoors.",
      "<h2>What to keep ready</h2>",
    ],
    items: ["torch", "lantern", "batteries", "powerbank", "radio", "warmth", "flask", "powerstation", "homebackup", "routerups", "solar", "food"],
    faq: [
      { q: "What number do I call in a power cut?", a: ["Call 105. It's free from most phones in England, Scotland and Wales and puts you through to your local electricity network operator. In Northern Ireland, contact NIE Networks."] },
      { q: "How long do power cuts last in the UK?", a: ["Most are fixed within a few hours. After severe storms, damage to overhead lines can leave some homes without power for several days, which is why the government suggests keeping supplies for at least three days."] },
      { q: "Will my landline work in a power cut?", a: ["Older copper landlines usually did. Most UK lines are moving to Digital Voice, which runs through your broadband router and stops working when the power goes, unless the router has a battery backup."] },
      { q: "Is it safe to use a portable power station indoors?", a: ["Yes. Battery power stations give off no fumes, unlike petrol generators. Keep them dry, ventilated and away from heat, as you would any large battery."] },
    ],
  },
  {
    slug: "flood-kit",
    title: "Flood Kit UK: How to Protect Your Home From Flooding",
    description: "How to protect a UK home from flooding: flood barriers, airbrick covers, toilet bungs and what to do before, during and after a flood.",
    h1: "Flood kit: how to protect your home",
    tile: "Flood kit",
    tileText: "Keep water out, and recover faster",
    photo: "flood",
    intro: [
      "Around 1 in 6 properties in England is at risk of flooding, from rivers, the sea or heavy rain overwhelming drains. You can check your home's long-term risk on <a href=\"https://www.gov.uk/check-long-term-flood-risk\" target=\"_blank\" rel=\"noopener\">GOV.UK</a> and <a href=\"https://www.gov.uk/sign-up-for-flood-warnings\" target=\"_blank\" rel=\"noopener\">sign up for free flood warnings</a>. You can also call Floodline on <strong>0345 988 1188</strong>.",
      "Water gets into homes through doors, airbricks and drains. When a warning is issued, block all three, move valuables and medicines upstairs, and get your grab bag ready in case you need to leave.",
      "<h2>Stay safe in a flood</h2>",
      "Never walk or drive through floodwater. Just 15cm of fast-flowing water can knock you off your feet, and 30cm can float a car. Floodwater is often contaminated with sewage, so wear gloves when cleaning up, and have an electrician check your electrics before you switch them back on.",
      "<h2>What to keep ready</h2>",
    ],
    items: ["floodbarrier", "doorbarrier", "airbrick", "toiletbung", "dehumidifier", "grabbag", "wallet", "torch", "whistle"],
    faq: [
      { q: "How do I know if my home is at risk of flooding?", a: ["Use the government's free long-term flood risk checker on GOV.UK. It covers rivers, the sea, surface water and reservoirs for any address in England. Scotland, Wales and Northern Ireland have their own flood maps."] },
      { q: "What should I do when a flood warning is issued?", a: ["Put flood barriers, airbrick covers and toilet bungs in place, move valuables, documents and medicines upstairs, and charge your phones. If it's safe and you know how, turn off gas, electricity and water. Follow any advice to evacuate."] },
      { q: "Do sandless sandbags work?", a: ["Water-activated barriers swell up to form a seal when wet and are much lighter to store and carry than sandbags. They work best across doorways and gaps. For homes at high risk, fitted flood doors or boards give stronger protection."] },
      { q: "How long does it take to dry out a house after a flood?", a: ["Usually weeks, and sometimes months, depending on how deep the water was. Dehumidifiers and good ventilation speed it up and help prevent mould."] },
    ],
  },
  {
    slug: "emergency-water-and-food",
    title: "Emergency Water & Food Storage UK: How Much You Need",
    description: "How much emergency water and food to store in the UK, based on government guidance, with a table for every household size and the best no-cook foods.",
    h1: "Emergency water and food: how much to store",
    tile: "Water & food storage",
    tileText: "How much to keep, by household size",
    photo: "water",
    intro: [
      "Water is the single most important thing in any emergency kit. Mains supplies can be cut off by burst pipes, flooding, freezing weather or contamination, and you may be told to boil water at a time when you have no power to do it.",
      "The UK government recommends <strong>2.5 to 3 litres of drinking water per person per day</strong> as a minimum, or about <strong>10 litres per person per day</strong> to cover cooking and washing too. Plan for at least three days.",
      "<h2>How much water to store</h2>",
    ],
    table: true,
    after: [
      "Sealed bottled water from the supermarket is the cheapest and safest option. Buy a few extra packs and use them in normal life, replacing them as you go, so your stock never goes out of date. A food-grade container lets you store extra tap water for washing and flushing when an outage is announced.",
      "<h2>Food that needs no cooking</h2>",
      "Choose food you can eat cold, straight from the tin or packet: ring-pull tins, ready meals, oat bars, nuts and dried fruit. Pick things your household actually likes so you can rotate them into normal meals. Don't forget a manual tin opener.",
      "<h2>What to keep ready</h2>",
    ],
    items: ["water", "jerrycan", "watertreat", "food", "rations", "opener", "flask", "toilet"],
    faq: [
      { q: "How much water does one person need per day?", a: ["At least 2.5 to 3 litres just to drink. To cover cooking and washing as well, plan on about 10 litres per person per day."] },
      { q: "Does bottled water go off?", a: ["Sealed bottled water keeps for a long time, but the best-before date is a good guide to quality. Store it somewhere cool and dark, and rotate it through normal use before the date."] },
      { q: "Can I store tap water?", a: ["Yes, in clean, food-grade containers with a lid. Store it somewhere cool and dark and replace it regularly, roughly every six months."] },
      { q: "What food is best for an emergency kit?", a: ["Food that needs no cooking and keeps for months: ring-pull tins, long-life ready meals, oat and cereal bars, nuts, dried fruit and emergency ration bars."] },
    ],
  },
  {
    slug: "grab-bag-checklist",
    title: "Emergency Grab Bag Checklist UK: What to Pack",
    description: "What to pack in an emergency grab bag in the UK, in case you need to leave home quickly because of flooding, fire or an evacuation.",
    h1: "Emergency grab bag checklist",
    tile: "Grab bag checklist",
    tileText: "What to pack if you need to leave fast",
    photo: "grabbag",
    intro: [
      "If you're told to evacuate because of flooding, fire or a gas leak, you may have only minutes to leave. A grab bag is a small, ready-packed bag kept near the door, holding what you'd need for the first day or two away from home.",
      "Keep it light enough for the smallest adult in the house to carry, tell everyone where it is, and check it every six months: swap the water and snacks, recharge the power bank and update medication.",
      "<h2>What to pack</h2>",
    ],
    items: ["grabbag", "wallet", "medication", "firstaid", "torch", "powerbank", "water", "rations", "blanket", "whistle", "sanitiser", "masks", "backupphone"],
    faq: [
      { q: "What should be in a grab bag?", a: ["Copies of important documents, medication, a first aid kit, a torch, a charged power bank and cable, water, snacks, a foil blanket, a whistle, hand sanitiser and a little cash. Add essentials for babies, children and pets."] },
      { q: "Where should I keep my grab bag?", a: ["Somewhere near the main door that everyone knows about, not in the loft or a cellar. In a flood-risk area, keep it upstairs if possible."] },
      { q: "How often should I check my grab bag?", a: ["Every six months. Replace water and food before their dates, recharge power banks, test the torch and update any medication and documents."] },
    ],
  },
];

// ---------------------------------------------------------------------------------
// Shared page pieces
// ---------------------------------------------------------------------------------
const FONTS =
  '<link rel="preconnect" href="https://fonts.googleapis.com">\n  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>\n  <link rel="preconnect" href="https://images.unsplash.com">\n  <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@600;700;800&family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">';

function headMeta({ url, title, description, image, prefix = "" }) {
  return `
  <link rel="canonical" href="${url}">
  <link rel="icon" href="${prefix}favicon.svg" type="image/svg+xml">
  <meta name="theme-color" content="#383c41">
  <meta name="robots" content="index, follow, max-image-preview:large">
  <meta property="og:type" content="website">
  <meta property="og:site_name" content="ReadyHome UK">
  <meta property="og:locale" content="en_GB">
  <meta property="og:url" content="${url}">
  <meta property="og:title" content="${title}">
  <meta property="og:description" content="${description}">
  <meta property="og:image" content="${image}">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="${title}">
  <meta name="twitter:description" content="${description}">
  <meta name="twitter:image" content="${image}">
  `;
}

function footerGuides(prefix) {
  return GUIDES.map((g) => `<a href="${prefix}${g.slug}/">${g.tile}</a>`).join("");
}

// ---------------------------------------------------------------------------------
// Home page
// ---------------------------------------------------------------------------------
function buildHome() {
  const file = path.join(ROOT, "index.html");
  let html = fs.readFileSync(file, "utf8");
  const h = { adults: 1, children: 0, babies: 0, pets: 0 };
  const title = "UK Emergency Kit Checklist 2026 | ReadyHome UK";
  const description =
    "The emergency kit the UK government says every home should keep: water, food, torch, radio, first aid and more, with amounts worked out for your household.";
  const ogImage = abs(photo("hero", 1200, 630));

  html = fill(html, "head", headMeta({ url: SITE, title, description, image: ogImage }) +
    `<link rel="preload" as="image" href="${photo("hero", 1600, 1120)}">\n  `);
  html = fill(html, "jsonld", jsonld({
    "@context": "https://schema.org",
    "@graph": [
      { "@type": "WebSite", "@id": SITE + "#website", url: SITE, name: "ReadyHome UK", inLanguage: "en-GB", description },
      { "@type": "WebPage", "@id": SITE + "#page", url: SITE, name: title, isPartOf: { "@id": SITE + "#website" }, dateModified: ISO_DATE, inLanguage: "en-GB" },
      {
        "@type": "ItemList",
        name: "The 10 essentials for a UK household emergency kit",
        itemListElement: ESSENTIALS.map((id, i) => ({ "@type": "ListItem", position: i + 1, name: byId(id).name })),
      },
      faqLD(HOME_FAQ),
    ],
  }));

  // Hero and banner photos, so the largest image starts loading before any JavaScript runs
  html = html.replace(/(<(?:div|section) [^>]*?data-photo="(\w+)")(?: style="[^"]*")?>/g,
    (m, start, key) => `${start} style="background-image:url('${photo(key, 1600, 1120)}')">`);

  html = fill(html, "tiles", SITUATIONS.map(lib.tileHTML).join("") + "\n      ");
  html = fill(html, "summary", lib.summaryHTML(h));
  html = fill(html, "essentials", ESSENTIALS.map((id, i) => lib.essentialHTML(byId(id), i, h, {})).join("") + "\n      ");
  html = fill(html, "filters", lib.filtersHTML("all"));
  html = fill(html, "grid", lib.visibleFor(h).map((p) => lib.cardHTML(p, h, {})).join("") + "\n      ");
  html = fill(html, "credits", lib.creditsHTML());
  html = fill(html, "year", String(YEAR));
  html = fill(html, "footerguides", footerGuides(""));
  html = fill(html, "updated", `Last updated ${UPDATED}.`);
  html = fill(html, "faq", faqHTML(HOME_FAQ));
  html = fill(html, "guides", GUIDES.map((g) => `
        <a class="guide-tile" href="${g.slug}/">
          <img src="${photo(g.photo, 640, 400)}" alt="" loading="lazy" width="640" height="400">
          <span>${g.tile}</span>
          <small>${g.tileText}</small>
        </a>`).join("") + "\n      ");
  fs.writeFileSync(file, html);
}

// ---------------------------------------------------------------------------------
// Guide pages
// ---------------------------------------------------------------------------------
const ONE = { adults: 1, children: 0, babies: 0, pets: 0 };
const FAMILY = { adults: 2, children: 2, babies: 0, pets: 0 };

function waterTable() {
  const rows = [1, 2, 3, 4, 5, 6].map((p) =>
    `<tr><td>${p} ${p === 1 ? "person" : "people"}</td><td>${p * 9} litres</td><td>${p * 30} litres</td><td>${p}–${Math.ceil((p * 30) / 9)} packs</td></tr>`
  ).join("");
  return `<table class="guide-table"><thead><tr><th>Household</th><th>Drinking only (3 days)</th><th>Drinking, cooking &amp; washing (3 days)</th><th>Packs of 6 × 1.5L</th></tr></thead><tbody>${rows}</tbody></table>`;
}

function guideItem(p, prefix) {
  const img = photo(p.id, 600, 600);
  const src = /^https?:/.test(img) ? img : prefix + img;
  const buys = lib.buyLinks(p);
  const buyHTML = buys.length
    ? `<div class="gi-buys">${buys.map((b) => `<a class="btn btn-amazon" href="${b.url}" target="_blank" rel="sponsored noopener nofollow">${b.label}</a>`).join("")}</div>
          <p class="gi-note">Affiliate link. Prices and availability are shown on Amazon. Photo is illustrative.</p>`
    : `<p class="gi-note">${p.noBuy || ""}</p>`;
  return `
        <li class="guide-item" id="${p.id}">
          <img src="${src}" alt="${p.name}" loading="lazy" width="600" height="600">
          <div>
            <h3>${p.name}</h3>
            <p class="gi-summary">${p.summary}${p.official ? " <em>On the government's list.</em>" : ""}</p>
            <p class="gi-amounts"><strong>For one person:</strong> ${p.qty(ONE)}<br><strong>For a family of four:</strong> ${p.qty(FAMILY)}</p>
            <p>${p.why}</p>
            <ul>${p.lookFor.map((t) => `<li>${t}</li>`).join("")}</ul>
            ${buyHTML}
          </div>
        </li>`;
}

function buildGuide(g) {
  const prefix = "../";
  const url = `${SITE}${g.slug}/`;
  const items = g.items.map(byId).filter(Boolean);
  const heroImg = photo(g.photo, 1600, 900);
  const heroSrc = /^https?:/.test(heroImg) ? heroImg : prefix + heroImg;
  const photoKeys = [g.photo, ...items.map((p) => p.id)];
  const related = GUIDES.filter((o) => o.slug !== g.slug);
  const body = [
    ...g.intro,
    ...(g.table ? [waterTable()] : []),
    ...(g.after || []),
  ].map((x) => (x.startsWith("<h2>") || x.startsWith("<table") ? x : `<p>${x}</p>`)).join("\n        ");

  const ld = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        headline: g.h1,
        description: g.description,
        image: abs(heroImg),
        dateModified: ISO_DATE,
        inLanguage: "en-GB",
        mainEntityOfPage: url,
        author: { "@type": "Organization", name: "ReadyHome UK", url: SITE },
        publisher: { "@type": "Organization", name: "ReadyHome UK", url: SITE },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: SITE },
          { "@type": "ListItem", position: 2, name: g.tile, item: url },
        ],
      },
      faqLD(g.faq),
    ],
  };

  const html = `<!doctype html>
<html lang="en-GB">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${g.title}</title>
  <meta name="description" content="${g.description}">${headMeta({ url, title: g.title, description: g.description, image: abs(heroImg), prefix })}
  ${FONTS}
  <link rel="stylesheet" href="${prefix}styles.css">
  ${jsonld(ld)}
</head>
<body>
  <div class="promo-bar">
    <span>Based on UK government emergency guidance</span>
    <span class="promo-sep" aria-hidden="true">•</span>
    <span>As an Amazon Associate we earn from qualifying purchases</span>
  </div>

  <header class="site-header">
    <div class="header-inner">
      <a class="brand" href="${prefix}">
        <svg viewBox="0 0 32 32" aria-hidden="true"><path d="M5 15 16 6l11 9v11a1.5 1.5 0 0 1-1.5 1.5h-19A1.5 1.5 0 0 1 5 26z" /><path d="m11.5 18.5 3.2 3.2 6-6.4" /></svg>
        <span><b>Ready</b>Home UK</span>
      </a>
      <nav>
        <a href="${prefix}#essentials">Essentials</a>
        <a href="${prefix}#kit">Full kit</a>
        ${related.map((o) => `<a href="${prefix}${o.slug}/">${o.tile}</a>`).join("\n        ")}
      </nav>
    </div>
  </header>

  <main>
    <section class="guide-hero" style="background:#5c6166 url('${heroSrc}') center / cover">
      <div class="guide-hero-inner">
        <p class="breadcrumb"><a href="${prefix}">Home</a> › ${g.tile}</p>
        <h1>${g.h1}</h1>
        <p class="updated">Last updated ${UPDATED}</p>
      </div>
    </section>

    <div class="guide-main">
      <div class="prose">
        ${body}
      </div>

      <ol class="guide-items">${items.map((p) => guideItem(p, prefix)).join("")}
      </ol>

      <div class="guide-cta">
        <div>
          <h2>Work out amounts for your household</h2>
          <p>Our free checklist sizes water, food and supplies for everyone at home.</p>
        </div>
        <a class="btn btn-light" href="${prefix}#household">Open the checklist</a>
      </div>

      <section class="faq" aria-labelledby="faq-title">
        <h2 id="faq-title" style="font-size:clamp(24px,3vw,32px);margin:0 0 16px">Frequently asked questions</h2>${faqHTML(g.faq)}
      </section>

      <h2 style="font-size:24px;margin:40px 0 16px">More guides</h2>
      <div class="related">${related.map((o) => `
        <a class="guide-tile" href="${prefix}${o.slug}/">
          <span>${o.tile}</span>
          <small>${o.tileText}</small>
        </a>`).join("")}
      </div>
    </div>
  </main>

  <footer class="site-footer">
    <div class="footer-inner">
      <div class="footer-brand">
        <span><b>Ready</b>Home UK</span>
        <p>Helping UK households get ready for emergencies, one item at a time.</p>
      </div>
      <div class="footer-text">
        <p>
          <strong>Affiliate disclosure:</strong> ReadyHome UK is a participant in the Amazon EU Associates Programme, an affiliate
          advertising programme designed to provide a means for sites to earn advertising fees by advertising and linking to
          Amazon.co.uk. If you buy through our links we may earn a small commission, at no extra cost to you.
        </p>
        <p>Guidance on this site is general information, not professional advice. In an emergency, call 999. ReadyHome UK is not part of, or endorsed by, the UK government.</p>
        <p class="credits">${lib.creditsHTML(photoKeys)}</p>
        <p class="footer-guides"><a href="${prefix}">Emergency kit checklist</a>${footerGuides(prefix)}</p>
        <p>© ${YEAR} ReadyHome UK</p>
      </div>
    </div>
  </footer>
</body>
</html>
`;
  fs.mkdirSync(path.join(ROOT, g.slug), { recursive: true });
  fs.writeFileSync(path.join(ROOT, g.slug, "index.html"), html);
}

// ---------------------------------------------------------------------------------
// Sitemap and robots
// ---------------------------------------------------------------------------------
function buildSitemap() {
  const urls = [SITE, ...GUIDES.map((g) => `${SITE}${g.slug}/`)];
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map((u) => `  <url><loc>${u}</loc><lastmod>${ISO_DATE}</lastmod></url>`).join("\n")}
</urlset>
`;
  fs.writeFileSync(path.join(ROOT, "sitemap.xml"), xml);
  fs.writeFileSync(path.join(ROOT, "robots.txt"), `User-agent: *\nAllow: /\n\nSitemap: ${SITE}sitemap.xml\n`);
}

buildHome();
GUIDES.forEach(buildGuide);
buildSitemap();
console.log(`Built home + ${GUIDES.length} guides, sitemap and robots (${UPDATED}).`);
