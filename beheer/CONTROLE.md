# Controle Variana — 31 oktober 2026

Deze wijziging herordent Hoe het werkt en Toepassingen en maakt de interne blauwdruk de vaste basis vóór iedere specialistische uitwerking. De A/B/C-tabbladstijl blijft behouden.

## Beoogd gedrag

- Hoe het werkt bevat drie hoofdonderdelen: de bestaande opening, één interactieve systeemverkenner en de bestaande contactoproep.
- Het systeemscherm heeft Input, Analyse (inzicht), Blauwdruk (opbouw & inrichting) en Specialistische modules. Daaronder staan Strategie, bestuur en beleid; Ontwikkeling en inrichting; Marketing; Beoordeling & evaluatie.
- Een keuze vervangt de toelichting in hetzelfde scherm en biedt een link naar de bijbehorende uitlegpagina. De oude screenshotpresentatie en vierfasenuitleg staan niet meer op deze pagina.
- Toepassingen bevat de opening, vier nieuwe invalshoeken, de interactieve keuzehulp, Van klantvraag naar uitwerking en de contactoproep. De losse operationele sectie is verwijderd.
- A begint zonder gekozen organisatie of hoofdvraag. Een vraag-query kan alleen de hoofdvraag vooraf kiezen.
- De organisatiekeuze onderscheidt Bedrijf of andere organisatie en Overheidsorganisatie. De drie hoofdvragen leiden naar inzicht/Analyses, overzicht met plan van aanpak/Blauwdruk, of een specialistische uitwerking.
- De vier specialistische richtingen zijn strategisch advies en afweging, marketing opzetten, investering en financiering voorbereiden en het beoordelen van andere plannen en ontwikkelingen. Per richting verschijnen maximaal drie concrete intenties.
- Voor overheid verschijnen alleen strategie en beoordeling. De commerciële modules blijven uitgesloten; productontwikkeling en marketingmatrix worden uit de gedeelde C-route gefilterd.
- B behoudt Analyses, Blauwdruk en Specialistische modules, met een gerichte outputtoelichting.
- C toont voor een losse analyse geen blauwdruk. Iedere andere route bevat één blauwdruk. Bij de overzichtsvraag is die blauwdruk met plan van aanpak de einduitwerking; bij een specialistische vraag volgt de module achter de interne blauwdruk.
- A, B en C tonen steeds één paneel. Wisselen van tabblad behoudt antwoorden; een A-keuze opent B niet automatisch. Wisselen van organisatie of hoofdvraag wist specialistische vervolgkeuzes en eerdere output.
- Interne feedbacklussen worden beschreven als toetsing en aanscherping vóór de eerste oplevering. Feedback van klant of externe betrokkenen is dan nog niet verwerkt.
- Oude fragmentankers en lokale uitlegpagina’s blijven bereikbaar. De afzonderlijke schermen laden uitsluitend hun eigen CSS en JavaScript via de build.

## Uitgevoerde controles

- Alle 23 pagina’s gebouwd en gecontroleerd: geen ontbrekende interne bestanden, ankers of ARIA-verwijzingen. IDs zijn uniek; iedere pagina heeft één H1 en één metabeschrijving.
- 49 geautomatiseerde routegevallen geslaagd. De controle omvat de toegestane outputs, onvolledige en ongeldige keuzes, overheidsuitsluitingen en de blauwdruk als laatste basisstap vóór iedere specialistische module. Uitvoeren: node beheer/controle_routes.cjs.
- Onafhankelijke broncontrole bevestigt de gevraagde volgorde op beide pagina’s. De opening en contactoproep van Hoe het werkt zijn gelijk aan de vorige versie.
- De C-rendering gecontroleerd in de bron: de overzichtsroute hergebruikt de laatste blauwdruktegel als eindoutput; de specialistische route voegt de module daarna toe; de analyseroute bevat geen blauwdruk.

## Lokale browsercontroles

- Alle acht systeemkeuzes gecontroleerd: steeds één geselecteerde knop en één bijgewerkt uitlegvlak, met de juiste paginalink. De link naar Evaluatie opent de eigen uitlegpagina.
- Pijltjestoetsen, Home en End werken. Bestaande systeemfragmenten selecteren het passende onderdeel; ook het vroegere fases-titel blijft geldig.
- Alle 19 complete A-combinaties doorlopen: vier algemene routes en vijftien specialistische routes voor de toegestane organisatietypen.
- B toont de juiste output. Iedere specialistische C-route eindigt met interne blauwdruk → gekozen module. De overzichtsroute toont de blauwdruk één keer als einduitwerking; de analyseroute bevat geen blauwdruk.
- Wisselen van bedrijf naar overheid wist specialistische keuzes, outputdetail en C-route. Alleen de toegestane overheidsrichtingen zijn beschikbaar; bedrijfsgebonden stappen verdwijnen uit C.
- Beginstaat, vraag-query, terugknoppen, behoud van antwoorden bij tabwissels en precies één zichtbaar A/B/C-paneel gecontroleerd. Een onvolledige terugknop richt de focus op de ontbrekende vraag.
- Beide pagina’s op 320, 768 en 1440 pixels gecontroleerd: geen horizontale pagina-overloop. Ook de volledige blauwdrukroute past op 320 pixels. De systeemweergave is visueel bekeken en vastgelegd.
- JavaScript-syntaxcontroles geslaagd; geen browserfouten of waarschuwingen waargenomen.
- Tariefbron, onderzoeksdata, contactconfiguratie en CNAME zijn bytegelijk aan de vorige versie. Private bronstukken staan buiten de website en uploadselectie.

De publicatie wordt afzonderlijk gecontroleerd via GitHub Actions en de live website. Deze controle is geen volledige toegankelijkheidsaudit of fysieke apparaattest. De schermen voeren geen onderzoek uit en bepalen geen advies buiten de getoonde vaste koppelingen. De beschikbaarheid van zelfstandige software blijft ongewijzigd.
