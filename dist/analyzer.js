export function normalizePrice(value) {
  if (typeof value === "number") return Number.isFinite(value) ? value : NaN;
  const cleaned = String(value ?? "")
    .replace(/\s/g, "")
    .replace(/[^0-9,.-]/g, "")
    .replace(/,(?=.*[,])/g, "")
    .replace(",", ".");
  return Number.parseFloat(cleaned);
}

export function parseMarketText(text) {
  const rows = [];
  const lines = String(text ?? "").split(/\r?\n/).map((line) => line.trim()).filter(Boolean);
  for (const line of lines) {
    const match = line.match(/^(.{2,40}?)\s+(?:kr\s*)?([0-9][0-9 .]*(?:[,.][0-9]{1,2})?)\s*(?:kr)?$/i);
    if (!match) continue;
    const name = match[1].replace(/[^\p{L}\p{N}&. -]/gu, "").trim();
    const price = normalizePrice(match[2]);
    if (name.length >= 2 && Number.isFinite(price) && price > 0) rows.push({ name, price });
  }
  return rows.filter((row, index) => rows.findIndex((other) => other.name.toLowerCase() === row.name.toLowerCase()) === index);
}

function average(values) {
  return values.length ? values.reduce((sum, value) => sum + value, 0) / values.length : 0;
}

export function analyzeStocks(stocks, history = []) {
  return stocks.map((stock) => {
    const prior = history
      .flatMap((snapshot) => snapshot.stocks ?? [])
      .filter((item) => item.name.toLowerCase() === stock.name.toLowerCase())
      .map((item) => item.price)
      .filter(Number.isFinite)
      .slice(-8);
    const baseline = average(prior);
    const change = baseline > 0 ? ((stock.price - baseline) / baseline) * 100 : 0;
    const deltas = prior.slice(1).map((value, index) => Math.abs((value - prior[index]) / prior[index]) * 100);
    const volatility = average(deltas);
    let signal = "HOLD";
    let confidence = prior.length < 2 ? 35 : Math.min(88, 50 + prior.length * 5);
    let reason = "Vi trenger flere skjermbilder over tid før trenden blir tydelig.";

    if (prior.length >= 2 && change <= -6) {
      signal = "FØLG MED";
      reason = `Kursen er ${Math.abs(change).toFixed(1)} % under snittet i historikken. Det kan være et mulig lavpunkt, men vent gjerne på en bekreftet oppgang.`;
    } else if (prior.length >= 2 && change >= 4 && volatility <= 12) {
      signal = "POSITIV";
      reason = `Kursen ligger ${change.toFixed(1)} % over historisk snitt med moderat svingning.`;
    } else if (prior.length >= 2 && volatility > 12) {
      signal = "HØY RISIKO";
      confidence = Math.max(40, confidence - 10);
      reason = `Kursen har svingt mye (${volatility.toFixed(1)} % i snitt). Vurder en mindre innsats eller avvent.`;
    } else if (prior.length >= 2) {
      reason = `Kursen er ${Math.abs(change).toFixed(1)} % ${change >= 0 ? "over" : "under"} historisk snitt. Ingen sterk retning ennå.`;
    }

    return { ...stock, signal, confidence: Math.round(confidence), change, volatility, samples: prior.length + 1, reason };
  }).sort((a, b) => b.confidence - a.confidence || b.change - a.change);
}
