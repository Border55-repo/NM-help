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
