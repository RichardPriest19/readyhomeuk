(() => {
  const STORE_KEY = "readyhome-uk";

  const state = {
    household: { adults: 1, children: 0, babies: 0, pets: 0 },
    have: {},
    filter: "all",
  };

  // Saved state is a convenience only: the page works without it.
  try {
    const saved = JSON.parse(localStorage.getItem(STORE_KEY) || "{}");
    if (saved.household) Object.assign(state.household, saved.household);
    if (saved.have) state.have = saved.have;
  } catch (_) {}

  function save() {
    try {
      localStorage.setItem(STORE_KEY, JSON.stringify({ household: state.household, have: state.have }));
    } catch (_) {}
  }

  const $ = (sel) => document.querySelector(sel);
  const categoryLabel = (id) => (CATEGORIES.find((c) => c.id === id) || {}).label || "";
  const peopleCount = () => state.household.adults + state.household.children + state.household.babies;

  function visibleProducts() {
    return PRODUCTS.filter((p) => !p.showWhen || p.showWhen(state.household));
  }

  // ---- Background photos (hero, banner) --------------------------------------
  const wide = window.innerWidth > 900 ? 1600 : 900;
  document.querySelectorAll("[data-photo]").forEach((el) => {
    el.style.backgroundImage = `url("${photo(el.dataset.photo, wide, Math.round(wide * 0.7))}")`;
  });

  // ---- Situation tiles -------------------------------------------------------
  $("#tiles").innerHTML = SITUATIONS.map(
    (s) => `
      <button type="button" class="tile" data-filter="${s.filter}">
        <span class="tile-img" data-photo="${s.photo}" style="background-image:url('${photo(s.photo, 800, 600)}')"></span>
        <span class="tile-body">
          <span class="tile-title">${s.title}</span>
          <span class="tile-text">${s.text}</span>
          <span class="tile-btn">Shop the kit</span>
        </span>
      </button>`
  ).join("");
  $("#tiles").addEventListener("click", (e) => {
    const tile = e.target.closest("[data-filter]");
    if (!tile) return;
    setFilter(tile.dataset.filter);
    $("#kit").scrollIntoView({ behavior: "smooth" });
  });

  // ---- Household counters --------------------------------------------------
  const MIN = { adults: 1, children: 0, babies: 0, pets: 0 };
  document.querySelectorAll(".counter").forEach((el) => {
    const key = el.dataset.key;
    const out = el.querySelector("output");
    out.textContent = state.household[key];
    el.querySelectorAll("button").forEach((btn) =>
      btn.addEventListener("click", () => {
        const next = Math.min(12, Math.max(MIN[key], state.household[key] + Number(btn.dataset.step)));
        if (next === state.household[key]) return;
        state.household[key] = next;
        out.textContent = next;
        save();
        renderAll();
      })
    );
  });

  function renderSummary() {
    const p = peopleCount();
    $("#household-summary").innerHTML = `
      <div class="stat"><strong>${p * 9}–${p * 30}L</strong><span>water for 3 days</span></div>
      <div class="stat"><strong>${p * 9}</strong><span>no-cook meals</span></div>
      <div class="stat"><strong>${visibleProducts().length}</strong><span>items to get</span></div>
    `;
  }

  // ---- Filters ---------------------------------------------------------------
  function renderFilters() {
    $("#filters").innerHTML = CATEGORIES.map(
      (c) =>
        `<button type="button" role="tab" class="chip" data-filter="${c.id}" aria-selected="${
          state.filter === c.id
        }">${c.label}</button>`
    ).join("");
  }
  function setFilter(id) {
    state.filter = id;
    renderFilters();
    renderGrid();
  }
  $("#filters").addEventListener("click", (e) => {
    const btn = e.target.closest("[data-filter]");
    if (btn) setFilter(btn.dataset.filter);
  });

  // ---- Product grid ----------------------------------------------------------
  function renderGrid() {
    const items = visibleProducts().filter((p) => state.filter === "all" || p.category === state.filter);
    $("#grid").innerHTML = items.length
      ? items
          .map(
            (p) => `
        <article class="card ${state.have[p.id] ? "is-have" : ""}" data-id="${p.id}">
          <button type="button" class="card-open" data-open="${p.id}" aria-label="More about ${p.name}">
            <div class="card-media">
              <img src="${photo(p.id, 600, 600)}" alt="" loading="lazy" width="600" height="600">
              ${p.official ? '<span class="badge">Gov. list</span>' : ""}
              ${state.have[p.id] ? '<span class="got">✓ Got it</span>' : ""}
            </div>
            <div class="card-body">
              <p class="card-cat">${categoryLabel(p.category)}</p>
              <h3>${p.name}</h3>
              <p class="card-summary">${p.summary}</p>
              <p class="card-qty">${p.qty(state.household)}</p>
            </div>
          </button>
          <div class="card-foot">
            <label class="have-toggle"><input type="checkbox" data-have="${p.id}" ${
              state.have[p.id] ? "checked" : ""
            }> I have this</label>
            <button type="button" class="btn btn-primary" data-open="${p.id}">View</button>
          </div>
        </article>`
          )
          .join("")
      : `<p class="empty">Nothing in this group for your household. Try “Everything”.</p>`;
  }

  $("#grid").addEventListener("click", (e) => {
    const open = e.target.closest("[data-open]");
    if (open) openModal(open.dataset.open);
  });
  $("#grid").addEventListener("change", (e) => {
    if (e.target.matches("[data-have]")) setHave(e.target.dataset.have, e.target.checked);
  });

  // ---- Essentials ------------------------------------------------------------
  function renderEssentials() {
    const items = ESSENTIALS.map((id) => PRODUCTS.find((p) => p.id === id)).filter(Boolean);
    $("#essentials-list").innerHTML = items
      .map(
        (p, i) => `
        <li class="ess-item ${state.have[p.id] ? "is-have" : ""}">
          <span class="ess-num">${state.have[p.id] ? "✓" : i + 1}</span>
          <button type="button" class="ess-open" data-open="${p.id}" aria-label="More about ${p.name}">
            <img src="${photo(p.id, 160, 160)}" alt="" loading="lazy" width="64" height="64">
            <span class="ess-text"><span class="ess-name">${p.name}</span><span class="ess-qty">${p.qty(state.household)}</span></span>
          </button>
          <span class="ess-actions">
            <label class="have-toggle"><input type="checkbox" data-have="${p.id}" ${state.have[p.id] ? "checked" : ""}> Got it</label>
            <button type="button" class="btn btn-primary" data-open="${p.id}">View</button>
          </span>
        </li>`
      )
      .join("");
    const done = items.filter((p) => state.have[p.id]).length;
    $("#ess-progress-bar").style.width = `${(done / items.length) * 100}%`;
    $("#ess-progress-label").textContent = done === items.length ? "All 10 essentials ready" : `${done} of ${items.length} essentials ready`;
  }

  $("#essentials-list").addEventListener("click", (e) => {
    const open = e.target.closest("[data-open]");
    if (open) openModal(open.dataset.open);
  });
  $("#essentials-list").addEventListener("change", (e) => {
    if (e.target.matches("[data-have]")) setHave(e.target.dataset.have, e.target.checked);
  });

  function setHave(id, value) {
    if (value) state.have[id] = true;
    else delete state.have[id];
    save();
    const card = document.querySelector(`.card[data-id="${id}"]`);
    if (card) {
      const media = card.querySelector(".card-media");
      const got = media.querySelector(".got");
      if (value && !got) media.insertAdjacentHTML("beforeend", '<span class="got">✓ Got it</span>');
      if (!value && got) got.remove();
      card.querySelector("[data-have]").checked = value;
    }
    renderProgress();
    renderEssentials();
  }

  function renderProgress() {
    const items = visibleProducts();
    const done = items.filter((p) => state.have[p.id]).length;
    $("#kit-progress-bar").style.width = `${items.length ? (done / items.length) * 100 : 0}%`;
    $("#kit-progress-label").textContent = `${done} of ${items.length} items ready`;
    $("#header-count").textContent = done;
  }

  // ---- Modal -----------------------------------------------------------------
  const modal = $("#modal");
  const AFFILIATE_NOTE = $("#modal-note").textContent;
  let current = null;

  function openModal(id) {
    const p = PRODUCTS.find((x) => x.id === id);
    if (!p) return;
    current = p;
    $("#modal-img").src = photo(p.id, 900, 900);
    $("#modal-cat").textContent = categoryLabel(p.category) + (p.official ? " · On the government list" : "");
    $("#modal-title").textContent = p.name;
    $("#modal-lede").textContent = p.summary;
    $("#modal-qty").innerHTML = `<span>For your household</span><strong>${p.qty(state.household)}</strong>`;
    $("#modal-why").textContent = p.why;
    $("#modal-look").innerHTML = p.lookFor.map((t) => `<li>${t}</li>`).join("");
    const buy = $("#modal-buy");
    const url = amazonUrl(p);
    buy.hidden = !url;
    if (url) buy.href = url;
    buy.textContent = p.buyLabel || "View on Amazon UK";
    $("#modal-extra-buys").innerHTML = (p.extraBuys || [])
      .map((b) => `<a class="btn btn-amazon" href="${amazonUrl({ asin: b.asin })}" target="_blank" rel="sponsored noopener nofollow">${b.label}</a>`)
      .join("");
    $("#modal-note").textContent = url ? AFFILIATE_NOTE : p.noBuy;
    $("#modal-have").checked = !!state.have[p.id];
    if (typeof modal.showModal === "function") modal.showModal();
    else modal.setAttribute("open", "");
  }

  function closeModal() {
    if (typeof modal.close === "function") modal.close();
    else modal.removeAttribute("open");
  }

  $("#modal-close").addEventListener("click", closeModal);
  modal.addEventListener("click", (e) => {
    if (e.target === modal) closeModal();
  });
  $("#modal-have").addEventListener("change", (e) => current && setHave(current.id, e.target.checked));

  // ---- Photo credits ---------------------------------------------------------
  const people = new Map();
  Object.values(PHOTOS).forEach((p) => people.set(p.by, p.link));
  $("#credits").innerHTML =
    "Photos on <a href='https://unsplash.com' target='_blank' rel='noopener'>Unsplash</a> by " +
    [...people].map(([by, link]) => `<a href="${link}" target="_blank" rel="noopener">${by}</a>`).join(", ") +
    ". Product photos are illustrative.";

  // ---- Back to top -----------------------------------------------------------
  const toTop = $("#to-top");
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  const updateToTop = () => toTop.classList.toggle("show", window.scrollY > 600);
  window.addEventListener("scroll", updateToTop, { passive: true });
  toTop.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: reduceMotion.matches ? "auto" : "smooth" });
    $(".brand").focus({ preventScroll: true });
  });
  updateToTop();

  // ---- Init ------------------------------------------------------------------
  function renderAll() {
    renderSummary();
    renderEssentials();
    renderGrid();
    renderProgress();
  }

  $("#year").textContent = new Date().getFullYear();
  renderFilters();
  renderAll();
})();
