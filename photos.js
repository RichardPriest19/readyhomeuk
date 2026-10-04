// Photos from Unsplash (unsplash.com/license: free for commercial use, no permission needed).
// Credits are shown in the site footer.
const PHOTOS = {
  torch: { src: "https://images.unsplash.com/photo-1561916960-dea3b9b0355a", by: "amir shamsipur", link: "https://unsplash.com/@amir_shamsipur" },
  powerbank: { src: "https://images.unsplash.com/photo-1566554738544-d962991c3fee", by: "I'M ZION", link: "https://unsplash.com/@ziontech" },
  radio: { src: "https://images.unsplash.com/photo-1749649773867-9c9787a47df9", by: "Ian Talmacs", link: "https://unsplash.com/@iantalmacs" },
  batteries: { src: "https://images.unsplash.com/photo-1619641805634-b867f535071c", by: "Roberto Sorin", link: "https://unsplash.com/@roberto_sorin" },
  firstaid: { src: "https://images.unsplash.com/photo-1624638760852-8ede1666ab07", by: "Mathurin NAPOLY / matnapo", link: "https://unsplash.com/@matnapo" },
  medication: { src: "https://images.unsplash.com/photo-1666887360688-4f16bbe23947", by: "Nappy", link: "https://unsplash.com/@nappystudio" },
  sanitiser: { src: "https://images.unsplash.com/photo-1608564348103-2b78891150cf", by: "Neil Bates", link: "https://unsplash.com/@ngbates" },
  water: { src: "https://images.unsplash.com/photo-1536939459926-301728717817", by: "Jonathan Chng", link: "https://unsplash.com/@jon_chng" },
  jerrycan: { src: "https://images.unsplash.com/photo-1701009711077-07f9f4ea0edd", by: "Willy the Wizard", link: "https://unsplash.com/@willythewizard" },
  food: { src: "https://images.unsplash.com/photo-1738618140037-09e11c8e644a", by: "Jacob McGowin", link: "https://unsplash.com/@bamaham93" },
  rations: { src: "https://images.unsplash.com/photo-1633360821154-1935fb5671e6", by: "Towfiqu barbhuiya", link: "https://unsplash.com/@towfiqu999999" },
  opener: { src: "https://images.unsplash.com/photo-1612676855298-c7116c892b1a", by: "Jacinto", link: "https://unsplash.com/@longlivehaas" },
  baby: { src: "https://images.unsplash.com/photo-1747921719174-2d385e2f52b5", by: "mini MIMI", link: "https://unsplash.com/@minimimi" },
  pets: { src: "https://images.unsplash.com/photo-1714068691210-073dc52c6c1d", by: "Ayla Verschueren", link: "https://unsplash.com/@moob" },
  blanket: { src: "https://images.unsplash.com/photo-1759997725476-850059175ece", by: "Alexandros Giannakakis", link: "https://unsplash.com/@alegi__" },
  grabbag: { src: "https://images.unsplash.com/photo-1622260614153-03223fb72052", by: "Ali Kazal", link: "https://unsplash.com/@lureofadventure" },
  wallet: { src: "https://images.unsplash.com/photo-1655722725332-9925c96dd627", by: "Global Residence Index", link: "https://unsplash.com/@globalresidenceindex" },
  car: { src: "https://images.unsplash.com/photo-1597220542065-dbd32fb169f9", by: "Michael Heuser", link: "https://unsplash.com/@gum_meee" },
  smoke: { src: "https://images.unsplash.com/photo-1665655034446-1536f6de3fe6", by: "Yosuke Ota", link: "https://unsplash.com/@yosuke_ota" },
  co: { src: "https://images.unsplash.com/photo-1665655034446-1536f6de3fe6", by: "Yosuke Ota", link: "https://unsplash.com/@yosuke_ota" },
  hero: { src: "https://images.unsplash.com/photo-1561286623-690f30130de4", by: "Zoltan Tasi", link: "https://unsplash.com/@zoltantasi" },
  candle: { src: "https://images.unsplash.com/photo-1667933579786-6753a3dc4bd9", by: "Jeremy McKnight", link: "https://unsplash.com/@jeremymcknight" },
  flood: { src: "https://images.unsplash.com/photo-1547683905-f686c993aae5", by: "Chris Gallagher", link: "https://unsplash.com/@chriswebdog" },
  powercut: { src: "https://images.unsplash.com/photo-1789169917146-c5ae56dec1eb", by: "lhon karwan", link: "https://unsplash.com/@lhonkarwanhamasalih" },
  storm: { src: "https://images.unsplash.com/photo-1596368708356-6e1e1025ee72", by: "Quick PS", link: "https://unsplash.com/@quickps" },
  outage: { src: "https://images.unsplash.com/photo-1495647688236-ed6ef40cb28b", by: "Luis Tosta", link: "https://unsplash.com/@luis_tosta" },
  heat: { src: "https://images.unsplash.com/photo-1781439213625-66810379404d", by: "Margo Evardson", link: "https://unsplash.com/@stadinstudio" },
  cyber: { src: "https://images.unsplash.com/photo-1595928796398-1d0ac507eed0", by: "Moritz Erken", link: "https://unsplash.com/@moritzerken" },
  family: { src: "https://images.unsplash.com/photo-1761839258568-fd466a93f68b", by: "Land O'Lakes, Inc.", link: "https://unsplash.com/@landolakesinc" },
  camping: { src: "https://images.unsplash.com/photo-1619035226152-81e29823b8d9", by: "Alireza Shojaei", link: "https://unsplash.com/@alirezashojaei" },
  pmr: { src: "https://images.unsplash.com/photo-1586374579268-e08642454549", by: "Everyday basics", link: "https://unsplash.com/@zanardi" },
  whistle: { src: "https://images.unsplash.com/photo-1596055746427-d5f61aa5df99", by: "Muhammad Masood", link: "https://unsplash.com/@muhammadbinmasood" },
};

function photo(key, w = 800, h = 600) {
  const p = PHOTOS[key];
  return p ? `${p.src}?auto=format&fit=crop&w=${w}&h=${h}&q=75` : "";
}
