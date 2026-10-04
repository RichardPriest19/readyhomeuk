// ---------------------------------------------------------------------------
// Affiliate settings
// Replace AMAZON_TAG with your Amazon Associates tracking ID (ends in -21 for amazon.co.uk).
// For any product, set `asin` to link straight to a product page instead of a search.
// ---------------------------------------------------------------------------
const AMAZON_TAG = "readyhomeuk-21";

const CATEGORIES = [
  { id: "all", label: "Everything" },
  { id: "power", label: "Power cuts" },
  { id: "comms", label: "Staying in touch" },
  { id: "water", label: "Water & food" },
  { id: "health", label: "First aid & hygiene" },
  { id: "family", label: "Family & pets" },
  { id: "safety", label: "Home safety" },
  { id: "car", label: "Car & grab bag" },
];

// Helpers used in quantity text. `h` = { adults, children, babies, pets }.
const people = (h) => h.adults + h.children + h.babies;
const plural = (n, one, many) => `${n} ${n === 1 ? one : many}`;

const PRODUCTS = [
  {
    id: "torch",
    name: "Wind-up or battery torch",
    category: "power",
    official: true,
    icon: "torch",
    tone: "amber",
    summary: "Light that works when the mains is off. Far safer than candles.",
    why: "The government's Prepare campaign lists a battery or wind-up torch first, because candles are a leading cause of house fires during power cuts. A wind-up model never runs out of batteries.",
    lookFor: [
      "A hand-crank or USB-rechargeable LED torch, ideally with both",
      "At least 100 lumens for moving around the house",
      "A head torch as well, so your hands are free",
    ],
    // Head torch link is a 2-pack.
    qty: (h) => `${plural(Math.max(1, h.adults), "torch", "torches")}, one per adult, or ${plural(Math.ceil(Math.max(1, h.adults) / 2), "head torch 2-pack", "head torch 2-packs")}`,
    query: "wind up rechargeable LED torch",
    asin: "B00BHY7URE", // Duronic wind-up rechargeable LED lantern/torch
    buyLabel: "Wind-up torch on Amazon UK",
    extraBuys: [
      { label: "Head torch on Amazon UK", asin: "B0D3VDXB19" }, // Blukar rechargeable head torch, 2 pack
    ],
  },
  {
    id: "lantern",
    name: "Rechargeable LED lantern",
    category: "power",
    official: false,
    summary: "Lights a whole room, not just a path. Far safer than candles.",
    why: "A torch is good for moving around, but a lantern lights a room so you can cook, read and look after children in a power cut. Candles cause house fires every year, especially during power cuts, so an LED lantern is the safer choice.",
    lookFor: [
      "Rechargeable, with a long runtime on a low setting",
      "A warm light setting is easier on the eyes in the evening",
      "Can also charge a phone, as a bonus",
    ],
    qty: () => "1 per room you'll use in the evening",
    query: "LED camping lantern rechargeable",
    asin: "B09XXQC2K3", // Blukar rechargeable LED lantern, 2000 lumens
  },
  {
    id: "warmth",
    name: "Hand warmers and sleeping bags",
    category: "power",
    official: false,
    summary: "Most central heating stops in a power cut. Stay warm without it.",
    why: "Gas boilers need electricity to run, so most homes lose their heating in a power cut. In winter, a warm sleeping bag for each person and disposable hand warmers keep you comfortable through a cold night. Older people and young children feel the cold fastest.",
    lookFor: [
      "A 3-season or warmer sleeping bag for each adult and child",
      "Air-activated hand warmers last up to 10 hours each",
      "Never use hand warmers on babies, and don't put them directly on skin",
    ],
    qty: (h) => `${plural(Math.max(1, h.adults + h.children), "sleeping bag", "sleeping bags")}, plus 1 box of 40 pairs of hand warmers`,
    query: "hand warmers disposable",
    asin: "B00FQLL0IO", // HotHands hand warmers, 40 pairs
    buyLabel: "Hand warmers on Amazon UK",
    extraBuys: [
      { label: "Sleeping bag on Amazon UK", asin: "B077XQDZW4" }, // MalloMe 3-4 season sleeping bag
    ],
  },
  {
    id: "powerbank",
    name: "Portable power bank",
    category: "comms",
    official: true,
    icon: "powerbank",
    tone: "teal",
    summary: "Keeps phones charged so you can get alerts and call for help.",
    why: "Your phone receives the government's Emergency Alerts and is how you'll contact family. A charged power bank gives several full phone charges during a long outage.",
    lookFor: [
      "20,000 mAh or more for several phone charges",
      "The right cables for every phone in the house",
      "Keep it topped up: check and recharge every three months",
      "A car charger lets you charge phones from the car during a power cut",
    ],
    qty: (h) => `${plural(Math.max(1, Math.ceil(h.adults / 2)), "power bank", "power banks")} of 20,000 mAh`,
    query: "power bank 20000mAh",
    asin: "B07YPS5JC5", // INIU 20000mAh power bank
    buyLabel: "Single power bank on Amazon UK",
    extraBuys: [
      { label: "2-pack (10,000 mAh each) on Amazon UK", asin: "B09JBDSV7F" }, // AsperX 2-pack power bank, 2 x 10000mAh
      { label: "Car charger on Amazon UK", asin: "B08VJ2VH2J" }, // INIU 60W USB-C + USB-A car charger
    ],
  },
  {
    id: "radio",
    name: "Wind-up or battery radio",
    category: "comms",
    official: true,
    icon: "radio",
    tone: "violet",
    summary: "Hear official updates even when the internet and mobile networks are down.",
    why: "Local and national radio broadcast emergency updates during power cuts. The government recommends a battery or wind-up radio so you are not relying on mobile data.",
    lookFor: [
      "Hand-crank and solar charging, with batteries as back-up",
      "FM/AM is enough for BBC local radio and emergency updates",
      "A built-in torch and USB phone-charging port are useful extras",
    ],
    qty: () => "1 per household",
    query: "wind up solar emergency radio FM DAB",
    asin: "B0FBR82LMV", // ROCAM FM/AM wind-up solar radio
  },
  {
    id: "pmr",
    name: "PMR446 walkie-talkies",
    category: "comms",
    official: false,
    summary: "Talk to family and neighbours when the mobile networks go down.",
    why: "In a long power cut, mobile phone masts can lose their backup power within hours. PMR446 radios are licence-free in the UK and let your household or street keep in touch without any network. Range is short, typically a few hundred metres to 1–2 km in towns, and they can't call 999.",
    lookFor: [
      "Marked PMR446 and licence-free. Avoid 'Baofeng'-style radios, which need an amateur licence in the UK",
      "Rechargeable, or running on the AA/AAA batteries you already keep",
      "Agree a channel in advance and write it in your household plan",
    ],
    // Main link is a 2-pack; extra link is a 4-pack.
    qty: (h) => {
      const r = Math.max(2, h.adults);
      return r <= 2 ? "2 radios (1 × 2-pack)" : `${r} radios, one per adult (${Math.ceil(r / 4)} × 4-pack)`;
    },
    query: "PMR446 walkie talkie licence free",
    asin: "B07DYCXZM6", // Motorola Talkabout T42 PMR446, 2 pack
    buyLabel: "2-pack on Amazon UK",
    extraBuys: [
      { label: "4-pack on Amazon UK", asin: "B0GJSKDKKN" }, // eSynic PMR446 rechargeable, 4 pack
    ],
  },
  {
    id: "routerups",
    name: "Battery backup for your broadband router",
    category: "comms",
    official: false,
    summary: "Keeps your Wi-Fi and home phone working in a power cut.",
    why: "UK landlines are moving from copper lines to internet calling (Digital Voice), with the switch-over due to finish by early 2027. Once your line has switched, your home phone stops working in a power cut because the router has no power. A small battery backup keeps the router, Wi-Fi and home phone running for several hours. Providers only have to offer one to customers who depend on their landline, for example people with a telecare alarm or no mobile signal.",
    lookFor: [
      "Check your router's power socket: most UK broadband hubs take 12V",
      "Enough capacity for several hours, at least 10,000 mAh",
      "An old corded phone won't help once your line has switched to Digital Voice",
    ],
    qty: () => "1 per household",
    query: "mini UPS for router 12V",
    asin: "B0CQR5GMN4", // SKE mini UPS for router, 20000mAh, UK plug
  },
  {
    id: "solar",
    name: "Foldable solar charger",
    category: "comms",
    official: false,
    summary: "Tops up phones and your power bank when an outage lasts days.",
    why: "A power bank gives you a few days of charging. A foldable solar panel keeps phones and power banks topped up for as long as there's daylight. Charging is slow on cloudy UK days, so think of it as a top-up rather than your main supply.",
    lookFor: [
      "At least 20W; 40W charges noticeably faster in UK light",
      "USB-C and USB-A outputs",
      "Folds small enough to store with the rest of your kit",
    ],
    qty: () => "1 per household",
    query: "foldable solar charger USB C",
    asin: "B09H6GGK55", // FlexSolar 40W foldable solar charger
  },
  {
    id: "backupphone",
    name: "Basic backup mobile phone",
    category: "comms",
    official: false,
    summary: "Weeks of battery on one charge, for calls and texts when your smartphone is flat.",
    why: "A simple phone such as a Nokia 105 lasts weeks on standby, far longer than a smartphone. Put a pay-as-you-go SIM in it: in the UK a phone needs a SIM to call 999, but emergency calls then work on any network with signal, even with no credit.",
    lookFor: [
      "A 4G model, as older 2G and 3G phones are losing network support",
      "A cheap pay-as-you-go SIM, topped up occasionally to keep the number active",
      "Charge it every few months and store it with your kit",
    ],
    qty: () => "1 per household",
    query: "Nokia 105 4G unlocked",
    asin: "B0DGGXJQH7", // Nokia 105 4G (2023), dual SIM
  },
  {
    id: "batteries",
    name: "Spare batteries",
    category: "power",
    official: true,
    icon: "batteries",
    tone: "amber",
    summary: "For torches, radios, smoke alarms and any medical equipment.",
    why: "The guidance asks you to keep spare batteries for torches, radios and medical devices. Alkaline batteries keep for up to ten years in a drawer.",
    lookFor: [
      "Check which sizes your torch, radio and alarms take (usually AA and AAA)",
      "Long-life alkaline for storage, not rechargeables that slowly drain",
      "Write the expiry year on the pack",
    ],
    qty: () => "A multipack of AA and AAA",
    query: "AA AAA alkaline batteries multipack long life",
    asin: "B093C9B1HK", // Duracell Plus AA, 24 pack
    buyLabel: "AA batteries on Amazon UK",
    extraBuys: [
      { label: "AAA batteries on Amazon UK", asin: "B094YMYM5G" }, // Duracell Plus AAA, 24 pack
    ],
  },
  {
    id: "firstaid",
    name: "First aid kit",
    category: "health",
    official: true,
    icon: "firstaid",
    tone: "rose",
    summary: "Plasters, bandages, dressings, antiseptic and the basics to treat minor injuries.",
    why: "When ambulances and GP surgeries are stretched you may need to deal with minor injuries yourself. The government suggests plasters, bandages, a thermometer, antiseptic, eyewash, sterile dressings, gloves, medical tape and tweezers.",
    lookFor: [
      "A kit that meets British Standard BS 8599-1 for home or workplace use",
      "A digital thermometer if the kit doesn't include one",
      "A first aid guide booklet, in case the internet is down",
    ],
    qty: (h) => (people(h) > 4 ? "1 large kit (family size)" : "1 home kit"),
    query: "first aid kit home BS 8599",
    asin: "B013T35V80", // Safety First Aid Group BS 8599 kit, medium
  },
  {
    id: "medication",
    name: "Pill organiser & medicine bag",
    category: "health",
    official: true,
    icon: "pills",
    tone: "violet",
    summary: "Keep several days of essential medication sorted and ready to go.",
    why: "The government advises having enough of your regular medication to last several days, in case pharmacies are closed or you can't travel. An organiser makes it easy to grab and go.",
    lookFor: [
      "A weekly pill organiser with clearly marked days",
      "A small insulated bag if any medicine needs to stay cool",
      "Keep a paper copy of every prescription in the bag",
    ],
    qty: () => "1 per person on regular medication",
    query: "weekly pill organiser travel medicine bag",
    asin: "B0BQJ2XZWF", // AUVON XL weekly pill organiser
    buyLabel: "Single organiser on Amazon UK",
    extraBuys: [
      { label: "2-pack on Amazon UK", asin: "B08C71ZHFN" }, // Large weekly pill box organiser, 2 pack
    ],
  },
  {
    id: "sanitiser",
    name: "Hand sanitiser & wet wipes",
    category: "health",
    official: true,
    icon: "sanitiser",
    tone: "teal",
    summary: "Stay clean and healthy when the taps don't work.",
    why: "If your water supply is cut off, hand sanitiser and wet wipes are the government's recommended way to keep hands and surfaces clean and stop illness spreading.",
    lookFor: [
      "Sanitiser with at least 60% alcohol",
      "Large packs of unscented wet wipes",
      "Bin bags for waste if collections stop",
    ],
    // Sanitiser link is 4 bottles; wipes link is a box of 18 packs.
    qty: (h) => {
      const bottles = Math.max(1, Math.ceil(people(h) / 2));
      const wipes = Math.max(2, people(h));
      return `${plural(bottles, "bottle", "bottles")} of sanitiser (${plural(Math.ceil(bottles / 4), "pack", "packs")} of 4) and ${wipes} packs of wipes (${plural(Math.ceil(wipes / 18), "box", "boxes")} of 18)`;
    },
    query: "hand sanitiser 60% alcohol and wet wipes bulk",
    asin: "B08DV6R7J3", // 4 x 500ml hand sanitiser gel, 70% alcohol
    buyLabel: "Hand sanitiser on Amazon UK",
    extraBuys: [
      { label: "Wet wipes on Amazon UK", asin: "B0FFTNGFM9" }, // Huggies Pure fragrance-free wipes, 18 packs
    ],
  },
  {
    id: "toilet",
    name: "Emergency toilet liners",
    category: "health",
    official: false,
    summary: "When the water is off, toilets can't flush. Liners turn your own toilet into a sealed, hygienic one.",
    why: "If the mains water is cut off, you can usually flush only once with the water left in the cistern. Disposable liners with absorbent pads fit over your own toilet bowl and seal waste in a bag, so you don't waste drinking water on flushing. Tie up used liners and store them outside until bin collections resume.",
    lookFor: [
      "Liners with absorbent or gelling pads, which turn waste solid and cut smells",
      "A universal fit for a standard toilet bowl",
      "Strong bin bags and somewhere outside to keep used liners",
    ],
    // About 2 liners per person per day; linked pack has 20.
    qty: (h) => `${people(h) * 6} liners for 3 days (${Math.ceil((people(h) * 6) / 20)} × 20-pack)`,
    query: "emergency toilet liners absorbent",
    asin: "B0BCJGP6SR", // Lunderg toilet liners with absorbent pads, 20 pack
  },
  {
    id: "masks",
    name: "FFP2 dust masks",
    category: "health",
    official: false,
    summary: "Protect your lungs from smoke, dust and mould, and slow the spread of illness.",
    why: "FFP2 masks filter at least 94% of airborne particles. They're useful for smoke from nearby fires, dust and mould during flood clean-up, and for stopping illness spreading through the household during an outbreak.",
    lookFor: [
      "FFP2 rating and UK or CE certification",
      "Individually wrapped, so they stay clean in storage",
      "Not suitable for children under 3",
    ],
    qty: (h) => {
      const n = (h.adults + h.children) * 3;
      return `${n} masks for 3 days (${Math.ceil(n / 20)} × 20-pack)`;
    },
    query: "FFP2 masks UK certified",
    asin: "B0F93SXDJF", // FFP2 masks, UK certified, 20 pack
  },
  {
    id: "fan",
    name: "Rechargeable fan",
    category: "health",
    official: false,
    summary: "Keeps you cool in a heatwave, even when the power is off.",
    why: "Heatwaves are a growing risk in the UK and are hardest on older people, babies and anyone with a health condition. A rechargeable fan with a large battery runs all night, so it still works if the power goes off when it's hottest.",
    lookFor: [
      "A big battery (10,000 mAh or more) for a full night",
      "USB-C charging, so it works from your power bank",
      "Quiet enough to sleep with",
    ],
    qty: () => "1 per household, plus 1 for anyone vulnerable to heat",
    query: "rechargeable battery desk fan",
    asin: "B0DNM5H1KP", // Warmco D3 rechargeable desk fan, 10000mAh
  },
  {
    id: "water",
    name: "Bottled water",
    category: "water",
    official: true,
    icon: "water",
    tone: "sky",
    summary: "The single most important thing in your kit.",
    why: "The government recommends 2.5 to 3 litres per person per day just to drink, or 10 litres per person per day to cover cooking and washing. Plan for at least three days.",
    lookFor: [
      "Sealed multipacks of still water, the cheapest and safest option",
      "Store in a cool, dark place, off the floor",
      "Use and replace it before the best-before date",
    ],
    qty: (h) => {
      const p = people(h);
      // Linked pack is 6 x 1.5L = 9 litres.
      return `${p * 9}–${p * 30} litres for 3 days: ${p}–${Math.ceil((p * 30) / 9)} packs of 6 × 1.5L`;
    },
    query: "still bottled water multipack 2 litre",
    asin: "B0HGT12S3T", // Volvic still water, 6 x 1.5L
  },
  {
    id: "jerrycan",
    name: "Water storage container",
    category: "water",
    official: false,
    icon: "jerrycan",
    tone: "teal",
    summary: "Fill up from the tap the moment a water outage is announced.",
    why: "Bottled water covers drinking. A food-grade container lets you store extra tap water for washing and flushing when you get a warning that supplies may be cut.",
    lookFor: [
      "Food-grade, BPA-free plastic with a tap",
      "Collapsible designs save space when empty",
      "10 to 20 litres is as much as most people can lift",
    ],
    // Linked product is a 2-pack.
    qty: (h) => {
      const n = Math.max(1, Math.ceil(people(h) / 2));
      return `${plural(n, "container", "containers")} of 10–20 litres (${Math.ceil(n / 2)} × 2-pack)`;
    },
    query: "collapsible water container with tap food grade 20 litre",
    asin: "B08JHJB4KB", // Cedilis 20L collapsible water container with tap, 2 pack
  },
  {
    id: "watertreat",
    name: "Water purification tablets and filter",
    category: "water",
    official: false,
    summary: "Make water safe to drink when there's a 'boil water' notice and no power to boil it.",
    why: "If your water supplier issues a 'boil water' notice during a power cut, you may have no way to boil water. Purification tablets make clear water safe to drink, and a personal filter lets you drink safely on the move. They're a back-up to bottled water, not a replacement for it.",
    lookFor: [
      "Tablets that say how many litres each one treats",
      "A personal filter for each grab bag",
      "Check the expiry date: tablets usually last about 5 years",
    ],
    qty: () => "1 pack of tablets (treats 2,000 litres), and a filter for each grab bag",
    query: "water purification tablets",
    asin: "B0BT4YGHYS", // Oasis 67mg purification tablets, 200 (treats 2,000 L)
    buyLabel: "Purification tablets on Amazon UK",
    extraBuys: [
      { label: "LifeStraw filter on Amazon UK", asin: "B07C56LR6N" }, // LifeStraw personal water filter
    ],
  },
  {
    id: "flask",
    name: "Vacuum flask",
    category: "water",
    official: false,
    summary: "Fill it with boiling water when a power cut is forecast, and you'll have hot drinks for a day.",
    why: "A good vacuum flask keeps water hot for around 24 hours. When a storm or planned power cut is on the way, fill it from the kettle. You'll have hot drinks, instant soup or porridge without any power.",
    lookFor: [
      "Stainless steel, double-walled, at least 1 litre",
      "A pouring stopper that doesn't need to be unscrewed",
      "Warm it with hot water first, then refill with boiling water",
    ],
    qty: (h) => `${Math.ceil(people(h) / 2)} × 1-litre flask`,
    query: "vacuum flask 1 litre",
    asin: "B000TAOWC8", // THERMOcafe by Thermos 1L stainless steel flask
  },
  {
    id: "food",
    name: "Long-life food",
    category: "water",
    official: true,
    icon: "tins",
    tone: "sage",
    summary: "Food you can eat without cooking: tins, pouches and snacks.",
    why: "The guidance recommends non-perishable food that doesn't need cooking, like tinned meat and vegetables, because you may have no power to cook with.",
    lookFor: [
      "Ring-pull tins, so you don't even need an opener",
      "Ready-to-eat pouches, oat bars, nuts and dried fruit",
      "Food your household actually likes, so you can rotate it into normal meals",
    ],
    // Linked pack is 12 tins; count one tin per meal.
    qty: (h) => `${people(h) * 9} meals for 3 days: ${plural(Math.ceil((people(h) * 9) / 12), "pack", "packs")} of 12 tins, plus snacks`,
    query: "ring pull tinned food ready to eat",
    asin: "B09P4L33SW", // Heinz Baked Beans, 12 x 415g
  },
  {
    id: "rations",
    name: "Emergency food rations",
    category: "water",
    official: false,
    icon: "rations",
    tone: "sage",
    summary: "Compact, long shelf life bars that you can forget about for years.",
    why: "Emergency ration bars last five years or more and need no water or cooking. They are a good back-up to your everyday tins and are ideal for a grab bag.",
    lookFor: [
      "A shelf life of at least five years",
      "Around 2,400 calories per person per day",
      "Individually wrapped portions",
    ],
    // One 3-day bar per person; the 12-pack has 6,840 kcal, about 1.9 bars' worth.
    qty: (h) => `${people(h)} × 3-day bar, or ${Math.ceil((people(h) * 3600) / 6840)} × 12-pack`,
    query: "emergency food ration bars 5 year shelf life",
    asin: "B07VNQGPYW", // 72 HRS 3600 kcal ration bar, 5-year shelf life
    buyLabel: "Single 3-day bar on Amazon UK",
    extraBuys: [
      { label: "12-pack (6,840 kcal) on Amazon UK", asin: "B09GLTXDR2" }, // Emergency ration biscuits, 12 pack, 6840 kcal
    ],
  },
  {
    id: "opener",
    name: "Manual tin opener",
    category: "water",
    official: true,
    icon: "opener",
    tone: "amber",
    summary: "An electric opener won't help you in a power cut.",
    why: "The government specifically mentions keeping a tin opener alongside tinned food. A simple manual one is cheap and lasts for years.",
    lookFor: [
      "A sturdy stainless steel, hand-turned opener",
      "Comfortable grip handles",
      "Keep it with the food, not in the kitchen drawer",
    ],
    qty: () => "1 per household",
    query: "manual tin opener stainless steel",
    asin: "B00004OCJW", // OXO Good Grips tin opener
  },
  {
    id: "baby",
    name: "Ready-to-feed baby formula",
    category: "family",
    official: true,
    icon: "baby",
    tone: "rose",
    summary: "No boiling water needed, so it works when the power is off.",
    why: "The government says ready-made or 'ready-to-feed' formula is best in an emergency, because you may not be able to boil water to make up powdered formula safely.",
    lookFor: [
      "The same brand and stage your baby already uses",
      "Single-use bottles and teats, or a sterile starter pack",
      "Check use-by dates and rotate stock monthly",
    ],
    qty: (h) => (h.babies ? `About ${h.babies * 18} bottles (3 days)` : "Only if you have a baby at home"),
    // No affiliate link: UK law restricts advertising infant formula.
    noBuy: "We don't link to infant formula. Your midwife, health visitor or pharmacist can advise which ready-to-feed formula to keep.",
    showWhen: (h) => h.babies > 0,
  },
  {
    id: "pets",
    name: "Long-life pet food",
    category: "family",
    official: true,
    icon: "paw",
    tone: "sage",
    summary: "Don't forget the four-legged members of the household.",
    why: "The government reminds households to include food for pets. Keep a few extra days of their usual food, plus water for them too.",
    lookFor: [
      "Their usual food, so you don't upset their stomach",
      "Sealed pouches or tins with a long date",
      "A collapsible water bowl",
    ],
    qty: (h) => (h.pets ? `3 days of food for ${plural(h.pets, "pet", "pets")}` : "Only if you have pets"),
    query: "pet food pouches multipack long life",
    asin: "B08BL81STZ", // Winalot Meaty Chunks dog food, 40 x 100g pouches
    buyLabel: "Dog food on Amazon UK",
    extraBuys: [
      { label: "Cat food on Amazon UK", asin: "B0CY5LF8DW" }, // FELIX Original Mixed Selection in Jelly, 40 x 85g
    ],
    showWhen: (h) => h.pets > 0,
  },
  {
    id: "games",
    name: "Card games for all ages",
    category: "family",
    official: false,
    summary: "Keep everyone calm and entertained when the screens go dark.",
    why: "A long power cut is easier to cope with if you have something to do. Simple card games need no power, suit all ages and help children feel that things are normal.",
    lookFor: [
      "Quick to learn, so all ages can join in",
      "Small enough to pack in a grab bag",
      "A pack of ordinary playing cards is a good back-up",
    ],
    qty: () => "1 or 2 games per household",
    query: "family card games",
    asin: "B0031QBHMA", // Asmodee Dobble family card game
    buyLabel: "Dobble on Amazon UK",
    extraBuys: [
      { label: "UNO on Amazon UK", asin: "B0D9R9WBQT" }, // Mattel UNO with 2 add-on packs, in a tin
    ],
  },
  {
    id: "blanket",
    name: "Foil emergency blankets",
    category: "car",
    official: false,
    icon: "blanket",
    tone: "sky",
    summary: "Light, cheap and they keep in body heat during a winter power cut.",
    why: "Without power most central heating stops. Foil blankets weigh almost nothing and help keep people warm, especially older people and young children who feel the cold faster.",
    lookFor: [
      "A pack of several blankets, at least 130 x 210 cm",
      "Keep warm layers and normal blankets with your kit too",
      "Put one or two in the car for winter",
    ],
    qty: (h) => `${plural(Math.max(2, people(h)), "blanket", "blankets")}`,
    query: "foil emergency thermal blanket pack",
    asin: "B0CR651FQS", // Emergency foil blankets, pack of 15
  },
  {
    id: "grabbag",
    name: "Grab bag",
    category: "car",
    official: false,
    icon: "bag",
    tone: "amber",
    summary: "A ready-packed bag in case you need to leave home quickly.",
    why: "If you're asked to evacuate because of flooding or fire, you may have minutes to leave. A packed bag by the door holds your essentials, documents and medication.",
    lookFor: [
      "A waterproof rucksack of 30 to 40 litres",
      "Easy to carry for the smallest adult in the house",
      "Pack a torch, water, snacks, medication, chargers and copies of documents",
    ],
    qty: () => "1 per household",
    query: "waterproof rucksack 35 litre",
    asin: "B07JYXQMHV", // G4Free 35L waterproof backpack
  },
  {
    id: "whistle",
    name: "Emergency whistle",
    category: "car",
    official: false,
    summary: "Signal for help if you're trapped or separated. Louder than shouting and needs no power.",
    why: "A whistle carries much further than your voice and takes little effort, which matters if you're injured or trapped. Keep one in the grab bag and one on each person's keys or coat.",
    lookFor: [
      "A pealess design, so it still works when wet",
      "Bright orange, so it's easy to find in a bag",
      "A lanyard or clip",
    ],
    // Linked product is a 3-pack; babies don't need one.
    qty: (h) => {
      const n = h.adults + h.children;
      return `${plural(n, "whistle", "whistles")}, one per person (${Math.ceil(n / 3)} × 3-pack)`;
    },
    query: "emergency whistle pealess",
    asin: "B096PN4BV5", // SwimCell emergency whistle, orange, 3 pack
  },
  {
    id: "wallet",
    name: "Waterproof document wallet",
    category: "car",
    official: false,
    icon: "wallet",
    tone: "violet",
    summary: "Keep your emergency plan, IDs and important numbers safe and dry.",
    why: "The government suggests writing a household emergency plan and keeping important phone numbers on paper. A waterproof wallet protects these, plus copies of passports, insurance and prescriptions.",
    lookFor: [
      "A zip-sealed, waterproof A4 wallet",
      "Room for your printed household emergency plan",
      "A little cash in small notes, in case card machines are down",
    ],
    qty: () => "1 per household",
    query: "waterproof document wallet A4 zip",
    asin: "B07KFBGW9V", // A4 zip wallets, 5 pack
  },
  {
    id: "car",
    name: "Winter car kit",
    category: "car",
    official: true,
    icon: "car",
    tone: "sage",
    summary: "Ice scraper, shovel, jump leads and warm things for the boot.",
    why: "For winter travel the government suggests a torch, phone charger, warm clothes, blankets, high-visibility clothing, jump leads, food and drink, a shovel and a first aid kit in the car.",
    lookFor: [
      "A folding snow shovel and ice scraper",
      "Jump leads or a portable jump starter",
      "A hi-vis vest for every seat",
    ],
    qty: () => "1 per car",
    query: "winter car emergency kit jump leads shovel",
    asin: "B00F88TYME", // AA Emergency Winter Car Kit AA5281
    buyLabel: "Winter car kit on Amazon UK",
    extraBuys: [
      { label: "Jump starter on Amazon UK", asin: "B0FB2L7CCX" }, // AstroAI B8 jump starter, up to 7.0L petrol / 5.5L diesel
    ],
  },
  {
    id: "smoke",
    name: "Smoke alarms",
    category: "safety",
    official: true,
    icon: "smoke",
    tone: "rose",
    summary: "One on every floor. Test them every month.",
    why: "The Prepare campaign tells households to test smoke alarms at least monthly. Fires are more likely in power cuts, when people use candles and heaters.",
    lookFor: [
      "10-year sealed battery models, so there is no battery to forget",
      "Interlinked alarms, so all sound when one does",
      "One on every floor of your home",
    ],
    qty: () => "At least 1 per floor",
    query: "smoke alarm 10 year sealed battery",
    asin: "B07CWV3PRS", // X-Sense SD11 smoke alarm, 10-year sealed battery
    buyLabel: "Single alarm on Amazon UK",
    extraBuys: [
      { label: "2-pack on Amazon UK", asin: "B0DPHPYGCW" }, // X-Sense SD11 smoke alarm, 2 pack
    ],
  },
  {
    id: "co",
    name: "Carbon monoxide alarm",
    category: "safety",
    official: false,
    icon: "co",
    tone: "amber",
    summary: "Warns you of a gas you can't see or smell.",
    why: "Carbon monoxide risk rises when people use gas heaters, generators or barbecues indoors during a power cut. An alarm is required by law in many rented homes in the UK.",
    lookFor: [
      "Certified to BS EN 50291",
      "Sealed battery that lasts the life of the alarm",
      "Fit one in every room with a boiler, fire or stove",
    ],
    qty: () => "1 per room with a fuel-burning appliance",
    query: "carbon monoxide alarm BS EN 50291",
    asin: "B0CKWGSX22", // FireAngel FA6813 CO alarm, 10-year
    buyLabel: "Single alarm on Amazon UK",
    extraBuys: [
      { label: "2-pack on Amazon UK", asin: "B0G25YPMDM" }, // BLACK+DECKER CO alarm 2-pack, 10-year sealed battery, EN 50291
    ],
  },
  {
    id: "fire",
    name: "Fire blanket and extinguisher",
    category: "safety",
    official: false,
    summary: "Put out a small kitchen fire before it spreads.",
    why: "Fires are more likely during power cuts, when people use candles and heaters. A fire blanket smothers a small pan fire safely. If you also keep an extinguisher, UK fire services recommend foam or water-mist types for homes rather than powder, which is hard to see and breathe through indoors. Only tackle a fire if it's small and you have a clear way out. Otherwise get out, stay out and call 999.",
    lookFor: [
      "A fire blanket Kitemarked to BS EN 1869, kept near the kitchen door",
      "A Kitemarked foam or water-mist extinguisher, not powder",
      "Never use water on a chip-pan or oil fire",
    ],
    qty: () => "1 fire blanket for the kitchen; an extinguisher is optional",
    query: "fire blanket kitemarked BS EN 1869",
    asin: "B07R8HZLGL", // Firechief Kitemarked fire blanket 1m x 1m
    buyLabel: "Fire blanket on Amazon UK",
    extraBuys: [
      { label: "Foam extinguisher + blanket on Amazon UK", asin: "B01BSY2TNC" }, // FSS 2L AFFF foam, Kitemarked, with blanket
    ],
  },
  {
    id: "floodbarrier",
    name: "Flood barriers",
    category: "safety",
    official: false,
    summary: "Water-activated bags that swell up to block doorways. No sand needed.",
    why: "Around 1 in 6 properties in England is at risk of flooding. When a flood warning is issued, soaking these bags makes them swell into heavy, sandbag-like barriers within minutes. They're light to store and far easier to handle than traditional sandbags. Sign up for free flood warnings so you have time to put them in place.",
    lookFor: [
      "Enough bags to block each outside door, usually two layers high",
      "Covers for any low airbricks, as water gets in through those too",
      "Check your long-term flood risk on GOV.UK before you buy",
    ],
    qty: () => "1 × 6-pack per outside door",
    query: "water activated flood barrier bags",
    asin: "B0085S0612", // Quick Dam water-activated flood bags, 6 pack
  },
  {
    id: "stopcock",
    name: "Stopcock key",
    category: "safety",
    official: false,
    summary: "Turn off the water at the outside meter if a pipe bursts.",
    why: "A burst pipe can flood a home in minutes. Your indoor stopcock is usually under the kitchen sink, but if that's stuck or you can't reach it, a stopcock key lets you turn off the supply at the outside meter or boundary box. Find both before you need them.",
    lookFor: [
      "A long universal key that reaches deep boundary boxes",
      "Fits the common UK valve heads",
      "Keep it somewhere you can reach quickly, not in the loft",
    ],
    qty: () => "1 per household",
    query: "stopcock key universal",
    asin: "B002SHLR50", // Faithfull universal stopcock key, 114cm
  },
];

function amazonUrl(product) {
  if (product.noBuy) return null;
  const tag = encodeURIComponent(AMAZON_TAG);
  if (product.asin) return `https://www.amazon.co.uk/dp/${product.asin}?tag=${tag}`;
  return `https://www.amazon.co.uk/s?k=${encodeURIComponent(product.query)}&tag=${tag}`;
}

// The 10 items on the UK government's Prepare list, shown first under "Start here".
const ESSENTIALS = ["water", "food", "opener", "torch", "radio", "powerbank", "batteries", "firstaid", "medication", "sanitiser"];

const SITUATIONS = [
  { photo: "powercut", title: "Power cuts", text: "Light, heat and a charged phone", filter: "power" },
  { photo: "flood", title: "Flooding", text: "Keep water out of your home", filter: "safety" },
  { photo: "storm", title: "Severe storms", text: "Stay safe and informed", filter: "comms" },
  { photo: "outage", title: "Water outages", text: "Drinking water for 3 days", filter: "water" },
  { photo: "heat", title: "Heatwaves & cold snaps", text: "Protect the most vulnerable", filter: "health" },
  { photo: "cyber", title: "Cyber attacks", text: "When cards and phones go down", filter: "all" },
];
