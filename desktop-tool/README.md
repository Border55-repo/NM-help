# Nordic Mafia-verktøy v0.4.0

Windows-verktøy med kontinuerlig sideavlesning, cooldown-leser, Learning Mode,
Work Mode og mobilvennlig kontrollpanel på det lokale nettverket.

## Start på Windows

1. Installer Python 3 dersom det ikke allerede er installert.
2. Dobbeltklikk `START_NM_TOOL.bat`.
3. Trykk **Start nettleser** og logg inn manuelt i Chrome.
4. Trykk **Aktiver Work Mode** når du er klar.

Chrome-profilen lagres lokalt i `chrome-profile`, slik at vanlig innlogging kan
beholdes. Passord lagres ikke av verktøyet.

## Mobil

PC og telefon må være på samme nett. Trykk **Åpne mobilpanel** og bruk adressen
som vises i loggen på telefonen. Selenium og Chrome kjører fortsatt på PC-en;
telefonen er et responsivt kontrollpanel.

## Sikkerhet og CAPTCHA

Ved CAPTCHA pauses Work Mode automatisk. CAPTCHA må løses manuelt i nettleseren.
Verktøyet prøver ikke å omgå eller løse den automatisk.

## Learning Mode

Kjente selektorer prøves først. Når nettsiden har endret seg, kan verktøyet finne
synlige knapper etter navn. Treff lagres i `data/selectors.json` og prioriteres
ved senere kjøringer. Dersom en aktivitet fortsatt ikke finnes, blir siden bare
observert og det utføres ingen tilfeldig handling.

