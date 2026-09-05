import { analyzeStocks, normalizePrice, parseMarketText } from "./analyzer.js";

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
const historyKey = "nordic-borsvakt-history-v1";
let selectedFile = null;

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
    parsed = parseMarketText(result.data.text);
    progress.textContent = parsed.length ? `${parsed.length} kurser funnet. Kontroller dem under.` : "Ingen sikre kurser ble funnet. Legg dem inn fra bildet under.";
  } catch (error) {
    progress.textContent = `${error.message} Legg inn kursene fra bildet manuelt under.`;
  }
  stockRows.innerHTML = "";
  (parsed.length ? parsed : [{ name: "", price: "" }, { name: "", price: "" }]).forEach(addRow);
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

renderHistory();
if ("serviceWorker" in navigator) navigator.serviceWorker.register("service-worker.js");
