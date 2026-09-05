# NM Help

Et mobilvennlig og installerbart hjelpeverktøy for Nordic Mafia-spillere. Appen samler søkbare oppdragsguider, rankdata, aktivitetstips, aksjeoversikt og skjermbildebasert børsanalyse.

## Viktig

- Et børsskjermbilde er påkrevd før appen lager tips.
- Bildet og kurshistorikken behandles lokalt i nettleseren.
- Appen logger ikke inn, spiller ikke og gjennomfører ikke handler.
- Prosjektet er uavhengig og ikke tilknyttet Nordic Mafia eller Ellar Development AS.

## Funksjoner

- lokal OCR av skjermbilder med Tesseract.js
- søk på tvers av oppdrag, ranker, aktiviteter og aksjer
- rankkalkulator med XP/prosent per aktivitet for Sivilist–Don
- trinnvise guider for oppdrag 1–9
- oversikt over alle 12 aksjer på Nordic Mafia-børsen
- tips til aktivitet, frakt, samarbeid og spilløkonomi
- redigering og kontroll av avleste kurser
- trend-, volatilitet- og datagrunnlagsvurdering
- tydelige signaler: Positiv, Hold, Følg med og Høy risiko
- lokal kurshistorikk for inntil 30 analyser
- PWA-støtte for installasjon på mobil og PC
- utskiftbar analysemotor som kan kobles til et offisielt API senere

XP-tall og oppdragsløsninger er spillerdata og kan bli utdaterte ved endringer i spillet. Prosjektet bør derfor oppdateres når Nordic Mafia endrer mekanikker eller belønninger.

## Lokal kjøring

```bash
npm run serve
```

Åpne adressen som vises i terminalen. OCR-komponenten hentes fra jsDelivr første gang.

## Test

```bash
npm test
```
