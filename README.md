# NM Help

En mobilvennlig og installerbar companion-app som lager børstips fra skjermbilder av Nordic Mafia-børsen.

## Viktig

- Et børsskjermbilde er påkrevd før appen lager tips.
- Bildet og kurshistorikken behandles lokalt i nettleseren.
- Appen logger ikke inn, spiller ikke og gjennomfører ikke handler.
- Prosjektet er uavhengig og ikke tilknyttet Nordic Mafia eller Ellar Development AS.

## Funksjoner

- lokal OCR av skjermbilder med Tesseract.js
- redigering og kontroll av avleste kurser
- trend-, volatilitet- og datagrunnlagsvurdering
- tydelige signaler: Positiv, Hold, Følg med og Høy risiko
- lokal kurshistorikk for inntil 30 analyser
- PWA-støtte for installasjon på mobil og PC
- utskiftbar analysemotor som kan kobles til et offisielt API senere

## Lokal kjøring

```bash
npm run serve
```

Åpne adressen som vises i terminalen. OCR-komponenten hentes fra jsDelivr første gang.

## Test

```bash
npm test
```
