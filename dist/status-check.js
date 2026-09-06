(() => {
  const button = document.getElementById("status-check");
  const output = document.getElementById("status-result");
  if (!button || !output) return;

  const checkStorage = () => {
    const key = "__nm_status_check__";
    try {
      localStorage.setItem(key, "ok");
      const ok = localStorage.getItem(key) === "ok";
      localStorage.removeItem(key);
      return ok;
    } catch {
      return false;
    }
  };

  button.addEventListener("click", async () => {
    button.disabled = true;
    output.dataset.state = "";
    output.textContent = "Kontrollerer …";

    const checks = [
      { label: "Nettverk", ok: navigator.onLine, detail: navigator.onLine ? "tilkoblet" : "frakoblet" },
      { label: "Lokal lagring", ok: checkStorage(), detail: "kan lagre innstillinger på enheten" },
      { label: "OCR", ok: Boolean(globalThis.Tesseract), detail: "bildegjenkjenning lastet" }
    ];

    try {
      const response = await fetch("./manifest.webmanifest", { cache: "no-store" });
      checks.push({ label: "Appfiler", ok: response.ok, detail: response.ok ? "tilgjengelige" : `HTTP ${response.status}` });
    } catch {
      checks.push({ label: "Appfiler", ok: false, detail: "kunne ikke kontrolleres" });
    }

    if ("serviceWorker" in navigator) {
      const registration = await navigator.serviceWorker.getRegistration().catch(() => null);
      checks.push({ label: "Offline-støtte", ok: Boolean(registration), detail: registration ? "aktiv" : "ikke aktiv ennå" });
    } else {
      checks.push({ label: "Offline-støtte", ok: false, detail: "ikke støttet av nettleseren" });
    }

    const failures = checks.filter((item) => !item.ok);
    output.dataset.state = failures.length === 0 ? "ok" : failures.length < checks.length ? "warning" : "error";
    const heading = document.createElement("strong");
    heading.textContent = failures.length === 0 ? "Alt ser bra ut." : `${checks.length - failures.length} av ${checks.length} kontroller bestått.`;
    const list = document.createElement("ul");
    checks.forEach((item) => {
      const row = document.createElement("li");
      row.textContent = `${item.ok ? "✓" : "!"} ${item.label}: ${item.detail}`;
      list.appendChild(row);
    });
    output.replaceChildren(heading, list);
    button.disabled = false;
  });
})();
