# Variana — websitebron

Actuele bron: https://github.com/HariboKing/Variana-website, branch main. GitHub Pages publiceert de site via de bestaande CNAME voor variana.nl. De website bevat 23 inhoudspagina’s en twee doorverwijspagina’s.

## Huidige indeling

- De homepage toont direct na de hero de productpresentatie van Variana Desktop, gevolgd door het onderscheid tussen dienstverlening en software. Daarna volgt het bestaande onderdeel Van systeem naar toepassing.
- Software staat in het hoofdmenu tussen Hoe het werkt en Voor wie. De eigen pagina software.html toont echte prototypebeelden, ontwikkelstatus, lokale software en de mogelijkheid om een productpreview aan te vragen. Het adres /software verwijst via software/index.html naar deze pagina.
- Hoe het werkt bevat de bestaande opening, het onderscheid tussen dienst en software, één interactieve systeemverkenner en de bestaande contactoproep. De oude screenshotpresentatie en afzonderlijke vierfasenuitleg blijven verwijderd.
- Toepassingen bevat de opening, vier invalshoeken, de A/B/C-keuzehulp, Van klantvraag naar uitwerking en de contactoproep. De losse operationele sectie is verwijderd.
- De homepage bevat na Praktijkervaring de sectie Een greep uit onze opdrachten, gevolgd door de contactoproep. De vijf opdrachtomschrijvingen zijn door de gebruiker aangeleverd.
- Voorbeelden is verwijderd uit navigatie en footer. Het vroegere adres voorbeelden.html verwijst door naar index.html#opdrachten; de footerlink Onze opdrachten opent die homepage-sectie rechtstreeks.
- Contact, tarieven, doelgroepen en kennisbank behouden hun functie.

## Onderhouden en bouwen

Bewerk tekst in beheer/paginas/ en metadata in beheer/pages.json. Navigatie, footer, de gedeelde propositiekaarten en doorverwijzingen staan in beheer/build.py. voorbeelden.html verwijst naar index.html#opdrachten; software/index.html verwijst naar ../software.html.

Voer vanuit de website-map uit:

    python beheer/build.py

De generator schrijft de HTML in de hoofdmap. Werk beheerbronnen en gegenereerde HTML samen bij in GitHub. Voor bekijken of hosten zijn geen Python, Node, database of extra bouwstappen nodig.

De algemene vormgeving staat in assets/css/styles.css. De homepage gebruikt ook cinematic.css. De productpresentatie, softwarepagina en gedeelde propositiekaarten gebruiken product.css. De build voegt de bestanden van een interactief scherm alleen toe aan de pagina met de bijbehorende markering. De CSS- en JavaScript-URL’s krijgen een inhoudshash tegen verouderde browsercache.

## Softwarepresentatie en beschikbare beelden

De markering PROPOSITIONS plaatst dezelfde twee kaarten op de homepage, Hoe het werkt en de softwarepagina: Variana als dienst is nu beschikbaar; Variana als zelfstandige software is in ontwikkeling. De diensten en hun bestaande tarieven blijven beschikbaar. Er wordt geen zelfstandige download aangeboden.

De homepage gebruikt het echte Nederlandse startscherm. De softwarepagina toont daarnaast het moduleoverzicht en het overzicht van specialistische modules. De drie geselecteerde bronbeelden staan onbewerkt in assets/images/software:

- startscherm-nl.png
- moduleoverzicht-nl.png
- specialistische-modules-nl.png

Deze beelden tonen de interface en module-ingangen van de ontwikkelversie. Zij bewijzen geen uitvoering van onderzoek of beschikbaarheid van alle getoonde modules. Er is geen schermopname toegevoegd: in het beschikbare bronmateriaal is geen videobestand aangetroffen. De productdemonstratie biedt daarom een aanvraag voor een preview van de ontwikkelversie, zonder een nagebootste video of afspeelknop.

Installatiebestanden, ondersteunde besturingssystemen, systeemvereisten en de omvang van offline gebruik worden pas vermeld wanneer zij zijn bevestigd. Ontwikkelstatus en beschikbare functies moeten per versie worden toegelicht.

De CTA contact.html?onderwerp=preview kiest de nieuwe formulieroptie voor een productpreview. Het bestaande formulier bereidt een e-mailconcept of lokaal aanvraagbestand voor; het verstuurt geen automatische e-mail.

Alleen de drie gekozen, algemene interfacebeelden zijn openbaar opgenomen. Overige bronbeelden, dossierinhoud, test- en instellingenbeelden en de private inventaris van bronbestanden blijven buiten de website en uploadselectie. De originele afbeeldingen zijn niet bewerkt; eerder aanwezige beeldbestanden blijven ongewijzigd.

## Interactief systeem op Hoe het werkt

De bron van Hoe het werkt bevat de markering SYSTEM_EXPLORER en het element data-system-explorer. De build verwijdert de markering en laadt system-explorer.css en system-explorer.js uitsluitend op deze pagina. De teksten staan als veilige, vaste JSON in de paginabron. Er is geen fetch of externe bibliotheek nodig.

Het scherm bevat vier hoofdbouwstenen:

- Input: de vraag, context en beschikbare informatie.
- Analyse: inzicht in het onderwerp.
- Blauwdruk: de opbouw en inrichting van organisatie of opgave.
- Specialistische modules: concrete toepassingen en antwoorden vanuit de blauwdruk.

Onder de specialistische modules staan vier toepassingen: Strategie, bestuur en beleid; Ontwikkeling en inrichting; Marketing; Beoordeling & evaluatie. Elke keuze opent een toelichting in hetzelfde scherm, met een link naar de bestaande uitlegpagina. Er staat één toelichting tegelijk in beeld. De analyse kan zelfstandig worden opgeleverd; een specialistische uitwerking bouwt altijd voort op een interne blauwdruk.

De knoppen werken met muis, Enter en spatie. Pijltjestoetsen, Home en End verplaatsen de selectie. Bestaande fragmentankers verwijzen naar de passende hoofdbouwsteen of toepassing. De opening en contactoproep blijven gelijk aan de vorige versie.

## Interactieve A/B/C-keuzehulp op Toepassingen

De vier invalshoeken boven de keuzehulp zijn Strategie, bestuur & beleid; Ontwikkeling en inrichting; Marketing; Beoordeling en evaluatie.

De markering APPLICATION_MATCHER plaatst de keuzehulp. beheer/application_renderer.py leest beheer/toepassingsroutes.json en maakt de statische HTML met veilige ingebedde JSON. De browser gebruikt application-matcher.css en application-matcher.js.

A opent zonder gekozen organisatie of hoofdvraag. Kies Bedrijf of andere organisatie (waaronder stichtingen) of Overheidsorganisatie, en daarna één van drie hoofdvragen:

- Geef inzicht in een onderwerp → Analyses.
- Geef overzicht en een plan van aanpak of stappenplan → Blauwdruk, met als gerichte uitwerking Blauwdruk & plan van aanpak.
- Geen van beide: ik heb een specialistische vraag → een gerichte specialistische uitwerking.

Bij de derde hoofdvraag volgen maximaal vier richtingen: Strategisch advies en afweging; Marketing opzetten; Investering en financiering voorbereiden; Andere plannen en ontwikkelingen beoordelen. Alleen passende richtingen verschijnen. Per richting volgen maximaal drie concrete intenties; de volledige modulelijst verschijnt nergens als één catalogus.

B behoudt de drie hoofdcategorieën Analyses, Blauwdruk en Specialistische modules. De passende categorie wordt gemarkeerd en de gerichte output krijgt een korte toelichting en een link naar de uitlegpagina.

C toont na een complete keuze een genummerde route op hoofdlijnen. Alleen een losse analyse heeft een korte route zonder blauwdruk. Iedere andere route bouwt eerst de interne blauwdruk op. Bij de overzichtsvraag is die blauwdruk met plan van aanpak de einduitwerking en wordt zij niet tweemaal getoond. Bij een specialistische vraag komt de gekozen module ná de interne blauwdruk. De toelichting op interne feedbacklussen beschrijft de toetsing en aanscherping vóór de eerste oplevering; klantfeedback volgt daarna.

A, B en C blijven afzonderlijke tabbladen met steeds één zichtbaar paneel. Wisselen van tabblad behoudt de antwoorden; kiezen bij A opent B niet automatisch. Wisselen van organisatie of hoofdvraag wist het specialistische doel en de gekozen uitwerking. De pijltjestoetsen, Home en End werken op de tabbladen en afzonderlijk binnen de keuzegroepen van A. Een onvolledige keuze toont bij B en C welke vraag nog ontbreekt.

Oude fragmentlinks blijven bereikbaar: vraagstuk opent A, onderzoek B en samenhang/resultaten C. De demo-link opent A. Een vraag-query kan alleen de hoofdvraag vooraf selecteren; de bezoeker moet de organisatie zelf kiezen.

beheer/toepassingsroutes.json bevat organizations, routes, outputs, goals, tasks, steps en flows. De organisatieverwijzingen op doelen en taken bepalen welke mogelijkheden beschikbaar zijn. Alle specialistische stepIds volgen dezelfde basisroute als flows.overzicht, die eindigt met blauwdruk. De browser sluit stappen met businessOnly uit voor overheden. De build controleert deze structuur en verwijzingen.

Voor overheden verschijnen de specialistische richtingen strategie en beoordeling. Productontwikkeling en marketingmatrix worden uit C gefilterd. Financieringsaanvraag, pitchdeck, informatiememorandum, target list en investeringsbeoordeling zijn uitgesloten. De gerichte overheidsuitwerkingen zijn Adviesrapport, Scenariovergelijking, Beoordelingsrapport en KPI’s en managementcriteria. De overzichtsvraag biedt ook voor overheid een blauwdruk met plan van aanpak.

Controleer wijzigingen met:

    node beheer/controle_routes.cjs

Deze controle gebruikt dezelfde resolver als de browser en test ook onvolledige keuzes, overheidsuitsluitingen en de blauwdruk als basis vóór iedere specialistische uitwerking.

Beide interactieve schermen beschrijven de samenhang en vaste koppelingen. Zij voeren geen onderzoek uit, raadplegen geen bronnen en presenteren geen onderzoeksresultaten. Interne bronstukken, instructies en gedetailleerde afhankelijkheden worden niet gepubliceerd. De oude onderzoeksverkenner en fictieve gegevens blijven in de bron bewaard, maar worden niet op Toepassingen geladen of getoond.

## Opdrachten op de homepage

De sectie opdrachten staat in beheer/paginas/index.html tussen praktijkervaring en de bestaande contactoproep. De geordende lijst bevat vijf aangeleverde omschrijvingen: een strategisch adviesrapport, twee blauwdrukken en twee analyses. Dienstnamen staan vet; de tekst blijft beperkt tot de aangeleverde opdrachtomschrijving. De vormgeving staat in assets/css/cinematic.css.

De vroegere Voorbeelden-pagina en producttour worden niet meer opgebouwd. voorbeelden.html is uitsluitend een compatibele doorverwijzing naar de opdrachten op de homepage. De oudere prototypebeelden en onderzoeksassets blijven in de bron bewaard; de nieuwe productpresentatie gebruikt de drie Nederlandse beelden hierboven. Schermafbeeldingen vormen geen bewijs van uitgevoerde onderzoeksresultaten.

## Contact, tarieven en publicatie

Het bevestigde publieke adres is info@variana.nl. Het formulier opent een e-mailconcept of maakt een lokale TXT-download; de bezoeker verstuurt zelf. Er is geen automatische verzending.

De tarieven staan in beheer/paginas/samenwerken.html. Deze wijziging verandert geen bedragen of btw-vermelding. De huidige dienstverlening gebruikt een online ondersteund prototype. Zelfstandige offline software en de zelfstandige marketing- en evaluatiemodules zijn nog in ontwikkeling; de keuzehulpen wijzigen die beschikbaarheid niet.

Bewaar de CNAME. Interne bron-PDF’s, Worddocumenten, geëxtraheerde brontekst, werkmappen, back-ups en aanvraagbestanden horen niet in de websitebron. Oudere ZIP-bestanden zijn geen bron voor deze GitHub-wijzigingen.

Zie beheer/CONTROLE.md voor de controle van deze versie.
