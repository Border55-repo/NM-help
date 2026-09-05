import test from "node:test";
import assert from "node:assert/strict";
import { analyzeStocks, normalizePrice, parseMarketText } from "../dist/analyzer.js";

test("normaliserer norsk desimaltall", () => {
  assert.equal(normalizePrice("1 234,50 kr"), 1234.5);
});

test("leser navn og kurs fra OCR-tekst", () => {
  assert.deepEqual(parseMarketText("Nordic Oil 120,50\nPolar Bank 88"), [
    { name: "Nordic Oil", price: 120.5 },
    { name: "Polar Bank", price: 88 }
  ]);
});

test("kobler kjent ticker og selskapsnavn til kurs i en børsrad", () => {
  const catalogue = [
    { ticker: "NMB", name: "DNB Bank ASA" },
    { ticker: "NAS", name: "Norwegian Air Shuttle ASA" }
  ];
  assert.deepEqual(parseMarketText("NMB DNB Bank ASA 2 586 kr +1.29%\nNAS Norwegian Air Shuttle ASA 682 kr +5.08%", catalogue), [
    { ticker: "NMB", name: "NMB · DNB Bank ASA", price: 2586 },
    { ticker: "NAS", name: "NAS · Norwegian Air Shuttle ASA", price: 682 }
  ]);
});

test("tåler én OCR-feil i en kjent ticker", () => {
  const catalogue = [{ ticker: "PHARM", name: "Photon Pharma AS" }];
  assert.deepEqual(parseMarketText("PHARH Photon Pharma AS 600 kr +2.56%", catalogue), [
    { ticker: "PHARM", name: "PHARM · Photon Pharma AS", price: 600 }
  ]);
});

test("krever historikk før sterkt signal", () => {
  const [result] = analyzeStocks([{ name: "Nordic Oil", price: 100 }], []);
  assert.equal(result.signal, "HOLD");
  assert.equal(result.confidence, 35);
});

test("markerer høy volatilitet som risiko", () => {
  const history = [80, 120, 75].map((price, index) => ({ createdAt: String(index), stocks: [{ name: "Nordic Oil", price }] }));
  const [result] = analyzeStocks([{ name: "Nordic Oil", price: 110 }], history);
  assert.equal(result.signal, "HØY RISIKO");
});
