# Variana — websitebron

Actuele bron: https://github.com/HariboKing/Variana-website, branch main. GitHub Pages publiceert de site via de bestaande CNAME voor variana.nl. De website bevat 23 statische HTML-pagina’s.

## Huidige indeling

- Toepassingen begint met vier soorten vraagstukken. De interactieve keuzehulp daaronder heeft drie tabbladen. A vraagt naar de organisatie en het beoogde gebruik, B toont de passende output en C de bijbehorende route op hoofdlijnen. Er is steeds één onderdeel zichtbaar.
- Hoe het werkt bevat het systeemschema met links naar eigen uitlegpagina’s en de vierfasenuitleg.
- Voorbeelden bevat ruimte voor praktijkcases en daaronder de interactieve producttour.
- Contact, tarieven, doelgroepen en kennisbank behouden hun functie. Verwijzingen naar de keuzehulp zijn bijgewerkt.

## Onderhouden en bouwen

Bewerk tekst in beheer/paginas/ en metadata in beheer/pages.json. Navigatie, footer en producttour staan in beheer/build.py.

Voer vanuit de website-map uit:

    python beheer/build.py

De generator schrijft de HTML in de hoofdmap. Werk beheerbronnen en gegenereerde HTML samen bij in GitHub. Voor bekijken of hosten zijn geen Python, Node, database of extra bouwstappen nodig.

De algemene vormgeving staat in assets/css/styles.css. De homepage gebruikt ook cinematic.css. Stylesheets en interactieve code krijgen waar nodig een inhoudshash in de URL tegen verouderde browsercache.

## Interactieve A/B/C-keuzehulp

De markering APPLICATION_MATCHER plaatst de keuzehulp op Toepassingen. beheer/application_renderer.py leest beheer/toepassingsroutes.json en maakt de statische HTML met veilige ingebedde JSON. De browser gebruikt application-matcher.css en application-matcher.js; er is geen fetch of externe bibliotheek nodig.

De hoofdkoppelingen zijn:

- Inzicht over een onderwerp → Analyses.
- Overzicht van product, doelgroep of organisatie → Blauwdruk. Voor een overheid spreekt de vraag over een vraagstuk, doelgroep of organisatie.
- Een specifiek verslag, advies of stappenplan → Specialistische modules, met een gerichte uitwerking op basis van aanvullende antwoorden.

A is standaard geopend; organisatie en hoofdvraag zijn nog niet gekozen. Kies eerst Bedrijf of andere organisatie (waaronder stichtingen) of Overheidsorganisatie, en daarna wat je wilt bereiken. Voor Analyses en Blauwdruk zijn die twee keuzes voldoende. Bij een specialistische uitwerking volgt eerst een doel en daarna een bijbehorende intentie. Per doel worden maximaal drie passende intenties getoond. Bij overheid en het doel rond doelgroepen wordt de enige passende uitwerking, Customer journey, automatisch gekozen. De volledige modulelijst verschijnt nergens als één catalogus.

Klik op A, B of C om uitsluitend de inhoud van dat onderdeel te bekijken. Wisselen van tabblad behoudt de antwoorden; kiezen bij A opent B niet automatisch. Wisselen van organisatie of hoofdvraag wist het specialistische doel en de gekozen uitwerking, zodat geen eerdere, ongeschikte selectie blijft gelden. B behoudt de drie hoofdcategorieën en toont daarnaast de gekozen output met een korte toelichting en een link naar de uitlegpagina.

De pijltjestoetsen, Home en End werken op de tabbladen en afzonderlijk binnen de keuzegroepen van A. Oude fragmentlinks openen het passende onderdeel: vraagstuk toont A, onderzoek toont B en samenhang/resultaten toont C. De demo-link opent A. Een vraag-query kan alleen de hoofdvraag vooraf selecteren; een organisatie moet de bezoeker nog zelf kiezen.

Onderdeel C toont na een complete keuze een genummerde route op hoofdlijnen, met als laatste onderdeel de passende output. Een losse analyse krijgt een beperkte onderzoeksroute; de blauwdruk geeft een breder organisatieoverzicht en specialistische uitwerkingen krijgen hun relevante deelroute. Niet iedere aanvraag doorloopt dus automatisch de hele keten. Literatuuronderzoek verschijnt op de relevante momenten. De toelichting op interne feedbacklussen maakt duidelijk dat eerdere onderdelen intern opnieuw worden getoetst en aangescherpt voordat de klant een eerste oplevering krijgt. Feedback van de klant volgt daarna.

beheer/toepassingsroutes.json bevat de organisaties (organizations), hoofdvragen (routes), hoofdcategorieën (outputs), doelen (goals), gerichte uitwerkingen (tasks), globale stappen (steps) en hoofdroutes (flows). organizations op doelen en uitwerkingen bepaalt wie de optie mag zien. Iedere uitwerking verwijst via stepIds naar de benodigde bouwstenen. Stappen met businessOnly worden voor overheden uitgesloten. De brede overzichtsroute bevat deze stappen wel voor bedrijven.

Voor overheden worden productontwikkeling en marketingmatrix uitgesloten. Ook financieringsaanvraag, pitchdeck, informatiememorandum, target list en investeringsbeoordeling worden niet aangeboden. Overheidsuitwerkingen zijn Adviesrapport, Scenariovergelijking, Plan van aanpak, Customer journey en KPI’s en managementcriteria. Houd deze beperkingen ook bij toekomstige wijzigingen aan de gegevens en selectiecode in stand.

Controleer wijzigingen in de routegegevens met `node beheer/controle_routes.cjs`. Deze controle gebruikt dezelfde resolver als de browser en test ook onvolledige en uitgesloten combinaties. De build valideert de structuur en verwijzingen van het gegevensbestand.

De keuzehulp verduidelijkt vaste koppelingen en mogelijke routes. Zij voert geen onderzoek uit, raadpleegt geen bronnen en presenteert geen onderzoeksresultaten. De openbare route is een samenvatting; interne bronstukken, instructies en gedetailleerde afhankelijkheden worden niet gepubliceerd. De keuzehulp wijzigt niets aan de beschikbaarheid van zelfstandige software.

De oude onderzoeksverkenner en fictieve gegevens zijn in de bron bewaard, maar worden niet op Toepassingen geladen of getoond. De bijbehorende oude fragmentankers blijven bereikbaar als verwijzingen naar de nieuwe interface.

## Praktijkvoorbeelden

De gereserveerde ruimte staat in beheer/paginas/voorbeelden.html, onder praktijkvoorbeelden. Hier is nog geen klantcase ingevuld. Voeg later de bedoelde praktijkvragen, aanpak en beschikbare uitwerking toe. De producttour staat daaronder, bij werkomgeving.

Prototypebeelden tonen de werkomgeving en vormen geen bewijs van uitgevoerde onderzoeksresultaten. Er worden geen onderzoeksuitkomsten of klantresultaten verzonnen.

## Contact, tarieven en publicatie

Het bevestigde publieke adres is info@variana.nl. Het formulier opent een e-mailconcept of maakt een lokale TXT-download; de bezoeker verstuurt zelf. Er is geen automatische verzending.

De tarieven staan in beheer/paginas/samenwerken.html. De huidige wijzigingen veranderen geen bedragen of btw-vermelding. Huidige dienstverlening gebruikt een online ondersteund prototype. Zelfstandige offline software en de zelfstandige marketing- en evaluatiemodules zijn nog in ontwikkeling.

Bewaar de CNAME. Interne bron-PDF’s, Worddocumenten, geëxtraheerde brontekst, werkmappen, back-ups en aanvraagbestanden horen niet in de websitebron. Oudere ZIP-bestanden zijn geen bron voor deze GitHub-wijzigingen.

Zie beheer/CONTROLE.md voor de controle van deze versie.
