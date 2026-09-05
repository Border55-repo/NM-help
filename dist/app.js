import { analyzeStocks, normalizePrice, parseMarketText } from "./analyzer.js";
import { missions, rankData, stocks, strategies } from "./guide-data.js";

const $ = (selector) => document.querySelector(selector);
const fileInput = $("#screenshot");
const dropzone = $("#dropzone");
const previewWrap = $("#preview-wrap");
const preview = $("#preview");
const scanButton = $("#scan-button");
const progress = $("#progress");
const verifySection = $("#verify-section");
const resultsSection = $("#results-section");
const stockRows = $("#stock-rows");
const historyKey = "nm-help-history-v1";
let selectedFile = null;

function formatPercent(value) {
  return `${new Intl.NumberFormat("nb-NO", { maximumFractionDigits: 4 }).format(value)} %`;
}

function renderRankTool() {
  const select = $("#rank-select");
  const currentInput = $("#current-rank");
  select.innerHTML = rankData.map((item, index) => `<option value="${index}">${escapeHtml(item.rank)}</option>`).join("");
  select.value = String(Math.max(0, rankData.findIndex((item) => item.rank === "Gangster")));
  const update = (resetCurrent = false) => {
    const item = rankData[Number(select.value)];
    if (resetCurrent) currentInput.value = String(item.start ?? 0);
    const current = Math.min(99.9999, Math.max(0, Number(String(currentInput.value).replace(",", ".")) || 0));
    const remaining = Math.max(0, 100 - current);
    const count = Math.max(1, Number($("#action-count").value) || 1);
    const rates = Object.entries(item.rates).sort((a, b) => b[1] - a[1]);
    const max = rates[0][1] || 1;
    const best = rates[0];
    $("#rank-summary").innerHTML = `
      <article><small>VALGT RANK</small><strong>${escapeHtml(item.rank)}</strong><span>${item.start === null ? "Start-rank" : `Rankbar starter rundt ${formatPercent(item.start)}`}</span></article>
      <article><small>BEST PER HANDLING</small><strong>${escapeHtml(best[0])}</strong><span>${formatPercent(best[1])} rank</span></article>
      <article><small>BESTE VEI TIL NESTE RANK</small><strong>${best[1] ? Math.ceil(remaining / best[1]).toLocaleString("nb-NO") : "–"}</strong><span>${formatPercent(remaining)} gjenstår · ${escapeHtml(best[0])}</span></article>`;
    $("#activity-bars").innerHTML = rates.map(([name, rate], index) => `
      <article class="activity-row ${index === 0 ? "best" : ""}">
        <div><strong>${escapeHtml(name)}</strong><span>${formatPercent(rate)} per handling · ${rate ? Math.ceil(remaining / rate).toLocaleString("nb-NO") : "–"} handlinger til neste rank · ${formatPercent(rate * count)} for ${count.toLocaleString("nb-NO")}</span></div>
        <div class="bar"><i style="width:${Math.max(rate ? 3 : 0, (rate / max) * 100)}%"></i></div>
      </article>`).join("");
  };
  select.addEventListener("change", () => update(true));
  currentInput.addEventListener("input", () => update(false));
  $("#action-count").addEventListener("input", () => update(false));
  update(true);
}

function renderMissions() {
  $("#mission-grid").innerHTML = missions.map((mission) => `
    <details class="mission-card" id="oppdrag-${mission.number}">
      <summary><span class="mission-number">${String(mission.number).padStart(2, "0")}</span><span><small>OPPDRAG ${mission.number}</small><strong>${escapeHtml(mission.title)}</strong></span><i>＋</i></summary>
      <div class="mission-body">
        <p class="mission-goal">${escapeHtml(mission.goal)}</p>
        <ol>${mission.tips.map((tip) => `<li>${escapeHtml(tip)}</li>`).join("")}</ol>
        <div class="reward"><span>BELØNNING</span><strong>${escapeHtml(mission.reward)}</strong></div>
      </div>
    </details>`).join("");
}

function renderStrategies() {
  $("#strategy-grid").innerHTML = strategies.map((item) => `<article><span>${item.icon}</span><div><h3>${escapeHtml(item.title)}</h3><p>${escapeHtml(item.text)}</p></div></article>`).join("");
}

function renderStocks() {
  $("#stock-list").innerHTML = stocks.map((stock) => `<article><strong>${stock.ticker}</strong><span>${escapeHtml(stock.name)}</span></article>`).join("");
}

function buildSearchIndex() {
  return [
    ...missions.map((mission) => ({
      type: "Oppdrag",
      title: `Oppdrag ${mission.number}: ${mission.title}`,
      summary: `${mission.goal} Åpne guiden for fremgangsmåte${mission.reward === "Ikke oppgitt" ? "." : ` og belønning på ${mission.reward}.`}`,
      keywords: `oppdrag mission ${mission.number} ${mission.title} ${mission.goal} ${mission.tags}`,
      href: `#oppdrag-${mission.number}`
    })),
    ...rankData.map((item, index) => {
      const best = Object.entries(item.rates).sort((a, b) => b[1] - a[1])[0];
      return {
        type: "Rank",
        title: item.rank,
        summary: `Beste registrerte aktivitet er ${best[0]} med ${formatPercent(best[1])} per handling. Åpne kalkulatoren for antall til neste rank.`,
        keywords: `rank xp rankbar kalkulator ${item.rank}`,
        href: "#rank",
        rankIndex: index
      };
    }),
    ...strategies.map((item) => ({ type: "Tips", title: item.title, summary: item.text, keywords: `tips aktivitet økonomi penger ${item.title} ${item.text}`, href: "#aktivitet" })),
    ...stocks.map((stock) => ({ type: "Aksje", title: `${stock.ticker} · ${stock.name}`, summary: "Fast aksje på Nordic Mafia-børsen. Last opp et skjermbilde for å lese gjeldende kurs.", keywords: `børs aksje ticker kurs ${stock.ticker} ${stock.name}`, href: "#bors" }))
  ];
}

function setupSearch() {
  const input = $("#help-search");
  const section = $("#search-results");
  const holder = $("#result-list");
  const index = buildSearchIndex();
  const run = (rawQuery, shouldScroll = false) => {
    const query = rawQuery.trim().toLocaleLowerCase("nb-NO");
    if (!query) { section.classList.add("hidden"); holder.innerHTML = ""; return; }
    const terms = query.split(/\s+/).filter(Boolean);
    const matches = index.map((item) => {
      const title = item.title.toLocaleLowerCase("nb-NO");
      const type = item.type.toLocaleLowerCase("nb-NO");
      const keywords = item.keywords.toLocaleLowerCase("nb-NO");
      if (!terms.every((term) => `${title} ${type} ${keywords}`.includes(term))) return null;
      const score = terms.reduce((total, term) => total + (title === term ? 8 : title.includes(term) ? 5 : type.includes(term) ? 3 : 1), 0);
      return { ...item, score };
    }).filter(Boolean).sort((a, b) => b.score - a.score).slice(0, 8);
    section.classList.remove("hidden");
    holder.innerHTML = matches.length ? matches.map((item) => `<a href="${item.href}" data-rank-index="${item.rankIndex ?? ""}"><span>${item.type}</span><strong>${escapeHtml(item.title)}</strong><small>${escapeHtml(item.summary)}</small><b>Åpne →</b></a>`).join("") : `<div class="empty-state">Ingen treff på «${escapeHtml(rawQuery)}». Prøv et oppdragsnummer, en rank eller en aktivitet.</div>`;
    holder.querySelectorAll("a").forEach((link) => link.addEventListener("click", () => {
      const rankIndex = link.dataset.rankIndex;
      if (rankIndex !== "") { $("#rank-select").value = rankIndex; $("#rank-select").dispatchEvent(new Event("change")); }
      const target = document.querySelector(link.getAttribute("href"));
      if (target?.tagName === "DETAILS") target.open = true;
    }));
    if (shouldScroll) section.scrollIntoView({ behavior: "smooth", block: "start" });
  };
  input.addEventListener("input", () => run(input.value));
  document.addEventListener("keydown", (event) => { if (event.key === "/" && document.activeElement !== input) { event.preventDefault(); input.focus(); } });
  document.querySelectorAll("[data-search]").forEach((button) => button.addEventListener("click", () => { input.value = button.dataset.search; run(input.value, true); }));
  $("#clear-search").addEventListener("click", () => { input.value = ""; run(""); input.focus(); });
}

function loadHistory() {
  try { return JSON.parse(localStorage.getItem(historyKey)) ?? []; } catch { return []; }
}

function saveHistory(history) {
  localStorage.setItem(historyKey, JSON.stringify(history.slice(-30)));
}

function formatPrice(value) {
  return new Intl.NumberFormat("nb-NO", { maximumFractionDigits: 2 }).format(value);
}

function addRow(stock = { name: "", price: "" }) {
  const row = $("#row-template").content.firstElementChild.cloneNode(true);
  row.querySelector(".stock-name").value = stock.name;
  row.querySelector(".stock-price").value = stock.price === "" ? "" : String(stock.price).replace(".", ",");
  row.querySelector(".remove-row").addEventListener("click", () => row.remove());
  stockRows.append(row);
}

function getStocks() {
  return [...stockRows.querySelectorAll("tr")].map((row) => ({
    name: row.querySelector(".stock-name").value.trim(),
    price: normalizePrice(row.querySelector(".stock-price").value)
  })).filter((stock) => stock.name && Number.isFinite(stock.price) && stock.price > 0);
}

function handleFile(file) {
  if (!file || !file.type.startsWith("image/")) return;
  selectedFile = file;
  preview.src = URL.createObjectURL(file);
  dropzone.classList.add("hidden");
  previewWrap.classList.remove("hidden");
  scanButton.disabled = false;
  verifySection.classList.add("hidden");
  resultsSection.classList.add("hidden");
}

fileInput.addEventListener("change", () => handleFile(fileInput.files[0]));
$("#replace-image").addEventListener("click", () => fileInput.click());
dropzone.addEventListener("dragover", (event) => { event.preventDefault(); dropzone.classList.add("dragging"); });
dropzone.addEventListener("dragleave", () => dropzone.classList.remove("dragging"));
dropzone.addEventListener("drop", (event) => { event.preventDefault(); dropzone.classList.remove("dragging"); handleFile(event.dataTransfer.files[0]); });

scanButton.addEventListener("click", async () => {
  if (!selectedFile) return;
  scanButton.disabled = true;
  progress.classList.remove("hidden");
  progress.textContent = "Starter lokal bildelesing …";
  let parsed = [];
  try {
    if (!globalThis.Tesseract) throw new Error("OCR-biblioteket kunne ikke lastes.");
    const result = await globalThis.Tesseract.recognize(selectedFile, "nor+eng", {
      logger: ({ status, progress: value }) => {
        if (status === "recognizing text") progress.textContent = `Leser skjermbildet … ${Math.round(value * 100)} %`;
      }
    });
    parsed = parseMarketText(result.data.text, stocks);
    progress.textContent = parsed.length ? `${parsed.length} av ${stocks.length} kurser funnet. Kontroller dem under.` : "Ingen sikre kurser ble funnet. Aksjenavnene er fylt inn, legg inn kursene fra bildet.";
  } catch (error) {
    progress.textContent = `${error.message} Legg inn kursene fra bildet manuelt under.`;
  }
  stockRows.innerHTML = "";
  stocks.map((stock) => {
    const detected = parsed.find((item) => item.ticker === stock.ticker || item.name.toLowerCase().includes(stock.ticker.toLowerCase()));
    return detected ?? { name: `${stock.ticker} · ${stock.name}`, price: "" };
  }).forEach(addRow);
  verifySection.classList.remove("hidden");
  verifySection.scrollIntoView({ behavior: "smooth" });
  scanButton.disabled = false;
});

$("#add-row").addEventListener("click", () => addRow());
$("#analyze-button").addEventListener("click", () => {
  if (!selectedFile) return alert("Du må laste opp et skjermbilde før du kan få tips.");
  const stocks = getStocks();
  if (!stocks.length) return alert("Kontroller at minst én aksje har navn og gyldig kurs.");
  const history = loadHistory();
  const tips = analyzeStocks(stocks, history);
  const snapshot = { id: crypto.randomUUID(), createdAt: new Date().toISOString(), stocks };
  saveHistory([...history, snapshot]);
  renderResults(tips);
  renderHistory();
  resultsSection.classList.remove("hidden");
  resultsSection.scrollIntoView({ behavior: "smooth" });
});

function renderResults(tips) {
  const best = tips[0];
  const risky = tips.filter((tip) => tip.signal === "HØY RISIKO").length;
  $("#summary-grid").innerHTML = `
    <article><small>MEST INTERESSANT</small><strong>${escapeHtml(best.name)}</strong><span>${escapeHtml(best.signal)}</span></article>
    <article><small>AKSJER ANALYSERT</small><strong>${tips.length}</strong><span>fra skjermbildet</span></article>
    <article><small>HØY RISIKO</small><strong>${risky}</strong><span>aksjer merket</span></article>`;
  $("#tips-grid").innerHTML = tips.map((tip) => `
    <article class="tip-card ${tip.signal.toLowerCase().replaceAll(" ", "-")}">
      <div class="tip-top"><div><small>${tip.samples} datapunkt</small><h3>${escapeHtml(tip.name)}</h3></div><span class="signal">${escapeHtml(tip.signal)}</span></div>
      <div class="price">${formatPrice(tip.price)} <small>spillkr</small></div>
      <p>${escapeHtml(tip.reason)}</p>
      <div class="confidence"><span><i style="width:${tip.confidence}%"></i></span><small>${tip.confidence} % datagrunnlag</small></div>
    </article>`).join("");
}

function renderHistory() {
  const history = loadHistory().slice().reverse();
  const holder = $("#history-list");
  if (!history.length) { holder.className = "empty-state"; holder.textContent = "Ingen analyser ennå. Last opp det første skjermbildet."; return; }
  holder.className = "history-list";
  holder.innerHTML = history.map((item) => `<div><span>${new Date(item.createdAt).toLocaleString("nb-NO", { dateStyle: "medium", timeStyle: "short" })}</span><strong>${item.stocks.length} aksjer</strong><small>${item.stocks.map((stock) => escapeHtml(stock.name)).join(" · ")}</small></div>`).join("");
}

function escapeHtml(value) {
  return String(value).replace(/[&<>'"]/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", '"': "&quot;" })[char]);
}

$("#new-analysis").addEventListener("click", () => { fileInput.value = ""; selectedFile = null; preview.src = ""; previewWrap.classList.add("hidden"); dropzone.classList.remove("hidden"); scanButton.disabled = true; progress.classList.add("hidden"); verifySection.classList.add("hidden"); resultsSection.classList.add("hidden"); scrollTo({ top: 0, behavior: "smooth" }); });
$("#clear-history").addEventListener("click", () => { if (confirm("Vil du slette all lokal kurshistorikk?")) { localStorage.removeItem(historyKey); renderHistory(); } });

renderRankTool();
renderMissions();
renderStrategies();
renderStocks();
setupSearch();
renderHistory();
if ("serviceWorker" in navigator) navigator.serviceWorker.register("service-worker.js");
