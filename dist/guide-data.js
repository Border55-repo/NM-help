export const rankData = [
  { rank: "Sivilist", start: null, rates: { "Kriminalitet": 3.33, "Utpressing": 1.67, "Fight Club": 1.67, "Fengselsutbrytning": 1.67, "OC – bli med": 16.67 } },
  { rank: "Wannabe", start: 23, rates: { "Kriminalitet": 0.77, "Biltyveri": 1.16, "Utpressing": 0.38, "Fight Club": 0.38, "Oppdrag": 3.08, "Fengselsutbrytning": 0.24, "OC – bli med": 3.85 } },
  { rank: "Bråkmaker", start: 30, rates: { "Kriminalitet": 0.23, "Biltyveri": 0.59, "Utpressing": 0.05, "Fight Club": 0.12, "Oppdrag": 0.94, "Fengselsutbrytning": 0.12, "OC – bli med": 1.175, "CdGv2 – angriper og vinner": 0.35, "CdGv2 – forsvarer og får penger": 0.24 } },
  { rank: "Gangster", start: 35.7, rates: { "Kriminalitet": 0.085, "Biltyveri": 0.125, "Utpressing": 0.04, "Fight Club": 0.042, "Oppdrag": 0.34, "Fengselsutbrytning": 0.04, "OC – starte": 0.42, "OC – bli med": 0.42, "CdGv2 – angriper og vinner": 0.125, "CdGv2 – angriper og taper": 0, "CdGv2 – forsvarer og får penger": 0.08, "CdGv2 – forsvarer og taper": 0 } },
  { rank: "Hitman", start: 68, rates: { "Kriminalitet": 0.06, "Biltyveri": 0.09, "Utpressing": 0.03, "Fight Club": 0.03, "Filmproduksjon": 0.4, "Oppdrag": 0.225, "Fengselsutbrytning": 0.03, "OC – starte": 0.28, "OC – bli med": 0.28, "CdGv2 – angriper og vinner": 0.09, "CdGv2 – forsvarer og får penger": 0.055 } },
  { rank: "Assassin", start: 70, rates: { "Kriminalitet": 0.04, "Biltyveri": 0.06, "Utpressing": 0.02, "Fight Club": 0.02, "Filmproduksjon": 0.28, "Oppdrag": 0.16, "Fengselsutbrytning": 0.02, "OC – starte": 0.2, "CdGv2 – angriper og vinner": 0.06, "CdGv2 – angriper og taper": 0, "CdGv2 – forsvarer og får penger": 0.04 } },
  { rank: "Kaptein", start: 69.5, rates: { "Kriminalitet": 0.03, "Biltyveri": 0.04, "Utpressing": 0.01, "Fight Club": 0.013, "Filmproduksjon": 0.2, "Oppdrag": 0.12, "Fengselsutbrytning": 0.016, "OC – starte": 0.18, "OC – bli med": 0.15, "CdGv2 – angriper og vinner": 0.05, "CdGv2 – forsvarer og får penger": 0.03, "Drap": 0.11 } },
  { rank: "Boss", start: 72.5, rates: { "Kriminalitet": 0.02, "Biltyveri": 0.03, "Utpressing": 0.01, "Fight Club": 0.01, "Filmproduksjon": 0.15, "Oppdrag": 0.09, "Fengselsutbrytning": 0.01, "OC – starte": 0.14, "OC – bli med": 0.14, "CdGv2 – angriper og vinner": 0.03, "CdGv2 – forsvarer og får penger": 0.02, "Drap": 0.08 } },
  { rank: "Gudfar", start: 77, rates: { "Kriminalitet": 0.0175, "Biltyveri": 0.03, "Utpressing": 0.005, "Fight Club": 0.01, "Filmproduksjon": 0.115, "Fengselsutbrytning": 0.005, "OC – starte": 0.11, "OC – bli med": 0.11, "CdGv2 – forsvarer og får penger": 0.02 } },
  { rank: "Leg. Gudfar", start: 47, rates: { "Kriminalitet": 0.0085, "Biltyveri": 0.01, "Utpressing": 0.01, "Fight Club": 0.005, "Filmproduksjon": 0.05, "Oppdrag": 0.05, "Fengselsutbrytning": 0.005, "OC – starte": 0.06, "OC – bli med": 0.05, "CdGv2 – angriper og vinner": 0.01, "CdGv2 – angriper og taper": 0, "CdGv2 – forsvarer og får penger": 0.01, "CdGv2 – forsvarer og taper": 0 } },
  { rank: "Don", start: 40.6, rates: { "Kriminalitet": 0.0094, "Biltyveri": 0.0055, "Fight Club": 0.0011, "Filmproduksjon": 0.02, "Fengselsutbrytning": 0.0019, "OC – starte": 0.02 } }
];

export const missions = [
  {
    number: 1,
    title: "Kongen av Bastøy",
    goal: "Bryt ut 30 spillere fra fengselet i Oslo.",
    tips: ["Reis til Oslo før du starter utbrytningene.", "Tell vellykkede utbrytninger underveis til du når 30."],
    reward: "250 000 kr og 2 kuler",
    tags: "fengsel utbrytning oslo"
  },
  {
    number: 2,
    title: "IKEA",
    goal: "Frakt 100 sofaer fra Stockholm til London.",
    tips: ["Kjøp Sofa på The Underground i Stockholm, send varene til London før du flyr, og selg dem etter ankomst.", "Boeing 737-300 koster 15 000 000 kr og gjør frakten betydelig raskere.", "På returen kan Passport fra London til Stockholm gi omtrent 3 300 kr per stykk i prisforskjell.", "Har du ledig kapasitet på siste tur, kan Kingsize Bed fra Stockholm til London gi omtrent 2 100 kr per stykk i prisforskjell."],
    reward: "Ikke oppgitt",
    tags: "sofa stockholm london underground boeing passport kingsize bed penger"
  },
  {
    number: 3,
    title: "From Russia with Love",
    goal: "Frakt 8 Mercedes Benz SL 500 fra Helsinki til Moskva.",
    tips: ["Alle bilene må ha opprinnelse i Helsinki og må sendes derfra til Moskva.", "En bil kjøpt i en annen by må først tilbake til Helsinki. Send den raskt videre fordi politiet kan finne den.", "Ved eget biltyveri anbefaler spillerdata alternativet «Stjel fra en offentlig parkeringsplass».", "Samle gjerne Mercedes-biler i Helsinki på forhånd hvis du planlegger å ta oppdraget igjen."],
    reward: "605 000 kr og 4 000 kuler",
    tags: "mercedes benz bil biltyveri helsinki moskva russland"
  },
  {
    number: 4,
    title: "Jensen",
    goal: "Bryt Henrik Jensen ut av fengselet.",
    tips: ["Jensen kan brytes ut i alle byer.", "Regn med rundt 20 forsøk. Ved mislykket forsøk er fengselsstraffen 9 minutter, og andre spillere kan ikke hjelpe deg ut under oppdraget.", "Er du i Helsinki etter oppdrag 3, kan du ta med Passport til Oslo. Spillerdata anslår omtrent 5 200 kr fortjeneste per Passport."],
    reward: "Ikke oppgitt",
    tags: "henrik jensen fengsel utbrytning passport helsinki oslo penger"
  },
  {
    number: 5,
    title: "Lefdal",
    goal: "Frakt 10 TV-er fra Oslo til København og 10 TV-er fra Oslo til Helsinki.",
    tips: ["Fordelingen mellom Plasma-TV og TV-Apparat endres mellom rundene.", "Send varene før du flyr.", "Du kan starte med en 50/50-fordeling for å teste destinasjonene, eller sende det du kan til én by for å avsløre riktig fordeling raskt.", "Spillere rapporterer at Plasma-TV ofte går til København og TV-Apparat til Helsinki, men dette er ikke garantert."],
    reward: "Ikke oppgitt",
    tags: "tv plasma lefdal oslo københavn helsinki frakt"
  },
  {
    number: 6,
    title: "Dårlig planlagt ran",
    goal: "Bryt ut Paul Castellano, Aniello Dellacroce, Joe Porrello og Anthony Spero.",
    tips: ["Finn først hvilken by hver person sitter fengslet i. Plasseringen er tilfeldig og endres mellom rundene.", "De kan være fordelt på flere byer, men opptil tre kan sitte i samme by.", "Regn med rundt 20 forsøk per person. Mislykket forsøk gir 9 minutter i fengsel."],
    reward: "Ikke oppgitt",
    tags: "ran fengsel utbrytning castellano dellacroce porrello spero"
  },
  {
    number: 7,
    title: "Mordet på de tre familiehodene",
    goal: "Finn og drep Don Gotti, Don Pedrino og Don Luciano.",
    tips: ["Søk etter alle tre i alle byer med søkefunksjonen under Drep. Tre timers søk er nok; Aktiv Detektiv kan ikke brukes.", "Noter byen til hver person. De flytter seg mellom nye runder av oppdraget, men ikke mens den aktive runden pågår.", "Hvert drap krever 8 000 kuler og en bil med maksimalt 20 % skade. Du trenger ikke skytetrening eller våpen.", "Hvis en befinner seg i London, kan du ta den personen sist fordi neste oppdrag starter der."],
    reward: "2 500 000 kr og 36 900 kuler",
    tags: "drap gotti pedrino luciano detektiv kuler bil london"
  },
  {
    number: 8,
    title: "Tower Café & Kebab House",
    goal: "Frakt Passport, Stress Less, Plasma-TV og Laptop fra London til Oslo.",
    tips: ["Antallet av hver vare varierer.", "Send alle varene til Oslo før du flyr. Varene leveres automatisk når du lander.", "Hvis du stoppes i tollen, oppgir spillerdata at bestikkelsen er 3 800 000 kr. Uten betaling havner du i fengsel."],
    reward: "Ikke oppgitt",
    tags: "tower cafe kebab passport stress less plasma laptop london oslo toll politi"
  },
  {
    number: 9,
    title: "Organisasjonen",
    goal: "Vinn streetrace, ta et valg og fullfør oppdraget i en lobby med to andre spillere.",
    tips: ["Del 1: Modifiser en Lamborghini Gallardo til 4 200 hk med 12 × 350 hk, og slå Alex Phantom i Streetrace. Dette kan gjøres i alle byer.", "Del 2: Velg mellom å drepe Gudfaren og bli med i Organisasjonen, eller å drepe Alex Phantom og fortsette for Gudfaren.", "Søk opp begge og avtal med andre spillere før du velger. Du trenger to andre som har tatt samme valg i del 3.", "Drapet krever 80 000 kuler og en bil med maksimalt 20 % skade.", "Del 3: Opprett eller bli med i en lobby på tre spillere. Lobbyeieren trykker «Fullfør oppdraget» når alle er klare."],
    reward: "90 000 000 kr og 20 000 kuler",
    tags: "organisasjonen streetrace alex phantom gudfaren lamborghini gallardo lobby kuler"
  }
];

export const strategies = [
  { icon: "↗", title: "Rank effektivt", text: "Velg ranken din i kalkulatoren. Prioriter aktiviteten med høyest prosent når målet er rask rank, men ta hensyn til ventetid, kostnad og risiko." },
  { icon: "◎", title: "Kombiner aktivitet og oppdrag", text: "Oppdrag gir ofte langt mer rankprosent enn vanlige handlinger. Samle biler eller varer på forhånd når en senere oppdragsrunde kan kreve dem." },
  { icon: "¤", title: "Tjen på returreisen", text: "Når et oppdrag sender deg mellom byer, sjekk prisforskjeller på The Underground. IKEA-guiden har konkrete returlaster mellom London og Stockholm." },
  { icon: "⌁", title: "Sikre stjålne biler", text: "Send stjålne biler bort fra opprinnelsesbyen raskt. Spillguider beskriver at bilen ellers kan bli funnet og forsvinne fra garasjen." },
  { icon: "◫", title: "Planlegg frakt", text: "Send alltid oppdragsvarer før du flyr. Større flykapasitet kan kutte antall turer, men regn på om investeringen passer økonomien din." },
  { icon: "⚑", title: "Samarbeid trygt", text: "Organisert Krim og Oppdrag 9 krever samarbeid. Avtal roller, kostnader og fordeling tydelig med spillerne før dere starter." }
];

export const stocks = [
  { ticker: "NMB", name: "DNB Bank ASA" },
  { ticker: "COSA", name: "Aker ASA" },
  { ticker: "GNAR", name: "Kongsberg Gruppen" },
  { ticker: "FLEET", name: "Avinor AS" },
  { ticker: "PHARM", name: "Photon Pharma AS" },
  { ticker: "LAUND", name: "Norges Bank" },
  { ticker: "CASIN", name: "Nordic Entertainment Group" },
  { ticker: "PRESS", name: "Schibsted ASA" },
  { ticker: "SHPRD", name: "Securitas Norge AS" },
  { ticker: "HARB", name: "Oslo Havn KF" },
  { ticker: "NAS", name: "Norwegian Air Shuttle ASA" },
  { ticker: "IKEA", name: "IKEA AB" }
];
