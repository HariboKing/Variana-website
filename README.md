# Variana — websitebron

Actuele bron: https://github.com/HariboKing/Variana-website, branch main. GitHub Pages publiceert de site via de bestaande CNAME voor variana.nl. De website bevat 23 inhoudspagina’s met publieke adressen zonder .html. De oude bestandsadressen blijven beschikbaar voor bestaande links en offline bekijken.

De voorbeeldrapporten staan in één PDF-lezer op de homepage, na Van systeem naar toepassing en vóór Praktijkervaring. De bezoeker kiest met rapportknoppen welke PDF in hetzelfde scherm verschijnt. Analyses en de keuzehulp verwijzen rechtstreeks naar deze lezer op de homepage. De opdrachtenlijst bevat geen rapport- of downloadknop meer. Het anker /#voorbeeld-kattenvoerverpakking opent nog steeds de oorspronkelijke opdrachtomschrijving. Beide aangeleverde PDF-bestanden zijn ongewijzigd opgenomen.

Decoratieve pijlen zijn verwijderd uit knoppen, doorverwijsblokken, klikbare opties, systeemoverzichten en de onderzoeksverkenner. De bron verwijdert volledige pijlspans en SVG-pijlpunten; gewone verbindingslijnen blijven beschikbaar. CSS-inspringing die alleen voor een pijl diende is aangepast. Linkbestemmingen, teksten, formulieren en interactiewerking blijven behouden. Toetsenbordbesturing met de Arrow-toetsen, native browserbediening en de bestaande softwarebeelden blijven werken zoals voorheen.

Deze versie voert de overstap naar Formspree door. De eigenaar heeft bevestigd dat het e-mailadres bij Formspree is geverifieerd en heeft de echte formulierendpoint https://formspree.io/f/xkjjpzyl aangeleverd. Een echte aanvraag vanuit de live toepassingenmodal is door Formspree geaccepteerd; de eigenaar heeft ontvangst op info@variana.nl bevestigd.

## Huidige indeling

- De homepage toont direct na de hero de productpresentatie van Variana Desktop, gevolgd door het onderscheid tussen dienstverlening en software. Daarna volgt het bestaande onderdeel Van systeem naar toepassing.
- Software staat in het hoofdmenu tussen Hoe het werkt en Voor wie. De eigen pagina /software/ richt zich op de beoogde uitkomsten: inzicht, organisatieoverzicht en een gerichte afweging of aanpak. Zij toont echte schermbeelden en een korte desktopopname. software/index.html bevat de volledige pagina.
- Hoe het werkt bevat de bestaande opening, het onderscheid tussen dienst en software, één interactieve systeemverkenner en de bestaande contactoproep. De oude screenshotpresentatie en afzonderlijke vierfasenuitleg blijven verwijderd.
- Toepassingen bevat de opening, vier invalshoeken, de A/B/C-keuzehulp, Van klantvraag naar uitwerking en de contactoproep. De losse operationele sectie is verwijderd.
- De homepage bevat na Praktijkervaring de sectie Een greep uit onze opdrachten, gevolgd door de contactoproep. De vijf opdrachtomschrijvingen zijn door de gebruiker aangeleverd.
- /voorbeelden/ en de oude bestandsadressen verwijzen door naar de PDF-lezer op de homepage. De footerlink Onze opdrachten opent de bestaande opdrachtenlijst rechtstreeks.
- Contact, tarieven, doelgroepen en kennisbank behouden hun functie.

## Onderhouden en bouwen

Het contactformulier is ingericht voor rechtstreekse verzending via Formspree; de bezoeker hoeft geen e-mailprogramma te openen. Naam en e-mailadres zijn verplicht; telefoonnummer en de toelichting zijn optioneel. De knop Open het contactformulier in B en C verschijnt alleen na een volledige selectie. Zij opent op Toepassingen een native dialog met de gekozen uitwerking ingevuld; de pagina blijft op haar plaats en de achtergrond kan niet worden bediend. Het kruisje of Escape sluit het venster, waarna de focus teruggaat naar de knop. Invoer blijft bij sluiten en heropenen en bij een verzendfout behouden. Persoonlijke invoer wordt pas gewist wanneer de verzenddienst de aanvraag heeft geaccepteerd.

De contactpagina en het venster gebruiken hetzelfde bronfragment in beheer/onderdelen/contact-formulier.html via CONTACT_FORM. De build leidt de toegestane onderwerpen af uit beheer/toepassingsroutes.json en plaatst ze via CONTACT_RESULT_TOPICS bij beide formulieren. main.js selecteert alleen een bekend onderwerp uit die tabel. De dialogvormgeving staat in assets/css/contact-dialog.css en wordt uitsluitend bij de keuzehulp geladen. Bestaande demo-, preview- en overige contactlinks blijven bruikbaar. De knop behoudt een gewone contactlink met `onderwerp=keuze-<resultaat-id>` en de centrale URL-helper als fallback wanneer de modal niet kan worden geopend.

De publieke instellingen staan in assets/js/config.js: contactEmail is het openbare contactadres en contactEndpoint moet de echte, door Formspree uitgegeven endpoint zijn. Een endpoint heeft de vorm https://formspree.io/f/ gevolgd door de formulier-ID; de transportcode accepteert daar alleen kleine letters en cijfers. Daar staan geen wachtwoorden of geheime API-sleutels in. assets/js/contact-delivery.js verstuurt een FormData-POST met Accept: application/json, zonder cookies of andere credentials. De browser maakt zelf de multipart-boundary. De build laadt dit script vóór main.js op Contact en Toepassingen. Een succesvolle HTTP-response bevestigt acceptatie; een bekende JSON-errorsresponse wordt ook bij een succesvolle HTTP-status afgewezen. Dit bevestigt nog geen inboxaflevering. Netwerk-, timeout- en andere fouten bewaren de invoer en tonen een foutmelding. Tijdens de aanvraag zijn de velden en verzendknop geblokkeerd; sluiten en heropenen van de modal verandert de lopende aanvraag niet.

De verzending bevat naam, e-mailadres, organisatie, telefoonnummer, het leesbare onderwerp en de toelichting. De interne _subject-waarde wordt het gedocumenteerde Formspree-veld subject; de bronpagina wordt meegestuurd als Bronpagina. De oude providerinstellingen _template en _honey worden niet meegestuurd. De bestaande honeypotcontrole blijft vóór de verzending in main.js actief.

Bewerk tekst in beheer/paginas/ en metadata in beheer/pages.json. Navigatie, footer en de gedeelde propositiekaarten staan in beheer/build.py. De bronbestanden, metadata en routegegevens behouden hun .html-bestandsnamen en verwijzingen. beheer/url_renderer.py zet die bij het bouwen om naar publieke adressen en voegt de compatibele doorverwijzingen toe. Bewerk de gegenereerde pagina’s niet afzonderlijk.

Voer vanuit de website-map uit:

    python beheer/build.py

De generator schrijft de homepage als index.html en de overige 22 inhoudspagina’s als een volledige pagina in een eigen map, bijvoorbeeld software/index.html. Daarnaast blijven volledige .html-versies in de hoofdmap bestaan. Werk beheerbronnen, gegenereerde HTML en de paginamappen samen bij in GitHub. Voor bekijken of hosten zijn geen Python, Node, database of extra bouwstappen nodig.

De algemene vormgeving staat in assets/css/styles.css. De homepage gebruikt ook cinematic.css. De productpresentatie, softwarepagina en gedeelde propositiekaarten gebruiken product.css. De build voegt de bestanden van een interactief scherm alleen toe aan de pagina met de bijbehorende markering. De CSS- en JavaScript-URL’s krijgen een inhoudshash tegen verouderde browsercache.

De binnenkant van de interactieve schermen gebruikt assets/css/interactive-pearl.css: licht staalblauwe vlakken met een petrolondertoon, donkere tekst en zichtbare focus. De gedeelde kleurvariabelen en het verloop staan in dit stylesheet: inhoud #C6D7E0 / #BED1D9 / #D1E0E7, kaarten en velden #E8F0F4, actieve vlakken #BFD9CD. Softwarekaders, onderschriften, vergrootvensters, contactformulieren en uitklapblokken sluiten daarop aan; mediabovenbalken en primaire formulierknoppen zijn donkerblauw. De keuzehulp, systeemverkenner, PDF-lezer, formulieren, uitklapblokken en de bediening rond vergrootbare softwarebeelden delen dit palet. De build laadt het stylesheet na de bestaande componentvormgeving en alleen op pagina’s met deze onderdelen. De keuzehulp heeft één omvattend matcher-screen met buitenrand en afgeronde buitenhoeken; de tabbladen staan daarbinnen en sluiten zonder tussenruimte op de hoekloze inhoud aan. De interactielogica en de inhoud van afbeeldingen, video’s en PDF’s blijven hun eigen bron gebruiken.

De keuzehulp op Toepassingen, Verken het systeem op Hoe het werkt en de PDF-lezer op de homepage gebruiken aanvullend assets/css/refined-interface.css. Dit aanvullende stylesheet gebruikt dezelfde gedeelde kleurvariabelen. Deze drie onderdelen hebben een kader met 20px hoeken, een donkerblauwe Variana-bovenbalk en een licht staalblauwe inhoud met petrolondertoon. De onderliggende navigatie- en inhoudspanelen zijn transparant, zodat het kleurverloop doorloopt. Kaarten zijn lichter blauw (#E8F0F4); actieve kaarten en rapportkeuzes zijn zacht petrolgroen (#BFD9CD), met een gevuld vinkrondje. Donkere petrolkleurige tekst en accenten ondersteunen de leesbaarheid. De A/B/C-stappen gebruiken ronde letterlabels en een donkerblauwe actieve stap. De build laadt dit stylesheet als laatste bij APPLICATION_MATCHER, SYSTEM_EXPLORER en REPORT_READER. Bestaande teksten, routes, IDs en ARIA-statussen blijven behouden.

## Publieke adressen en offline bekijken

- De homepage gebruikt https://variana.nl/; andere pagina’s gebruiken bijvoorbeeld https://variana.nl/software/ en https://variana.nl/hoe-het-werkt/. GitHub Pages serveert daarvoor de index.html in de betreffende map.
- Een vroeg script normaliseert oude .html-adressen en expliciete adressen zoals /software/index.html naar het publieke adres. Het bewaart queryparameters en fragmentankers. De oude Voorbeelden-adressen openen het overeenkomstige rapport op de homepage of de PDF-lezer wanneer geen rapport is gekozen.
- Dit zijn doorverwijzingen in de browser, geen HTTP 301-doorverwijzingen. Zonder JavaScript werkt de gewone navigatie naar de nieuwe paginamappen; oude bestandsadressen hebben een beperkte fallback. / en /index.html gebruiken op deze statische hosting hetzelfde bestand, waardoor een expliciet geopend /index.html zonder JavaScript zichtbaar kan blijven. De fallback bewaart niet alle queryparameters of fragmenten.
- Elke inhoudspagina vermeldt haar publieke adres in de canonical-link en og:url. De build herschrijft interne links en past assetpaden aan de mapdiepte aan, ook voor videobronnen, ondertiteling en posterbeelden.
- assets/js/page-urls.js leest de ingebedde URL-tabel vóór de andere paginascripts. De twee interactieve schermen gebruiken deze helper voor hun dynamische links. Bij file:// zet de helper paginalinks terug naar de bestaande .html-bestanden in de hoofdmap, zodat het offline voorbeeld via index.html te bekijken blijft.

Controleer wijzigingen in de adresafhandeling en de bestaande keuzehulp met:

    node beheer/controle_urls.cjs
    node beheer/controle_routes.cjs
    node beheer/controle_voorbeelden.cjs

Deze indeling is bedoeld voor publicatie op de hoofdmap van variana.nl. De CNAME blijft behouden.

## Softwarepresentatie en beschikbare beelden

De openingssecties van Software en Toepassingen gebruiken de twee aangeleverde achtergrondfoto’s. Software toont het beeld links en de volledige openingstekst rechts; Toepassingen toont het beeld rechts en de tekst links. CSS-overgangen laten de foto’s aansluiten op de paginakleur. Op smalle schermen verschijnt het beeld boven de tekst. De twee WebP-bestanden in assets/images/ zijn voor het web verkleinde versies van de aangeleverde afbeeldingen; de overgangen worden in assets/css/section-heroes.css gemaakt. Alleen deze twee pagina’s laden dat stylesheet en hun eigen achtergrond vooraf.

Het echte blauwdrukscherm dat eerst bovenaan Software stond, is verplaatst naar de bestaande galerij bij De werkomgeving. De schermbeelden, captions, zoomfunctie en desktopvideo blijven beschikbaar.

De markering PROPOSITIONS plaatst dezelfde twee kaarten op de homepage en Hoe het werkt: Variana als dienst is nu beschikbaar; Variana als zelfstandige software is in ontwikkeling. De softwarepagina heeft één duidelijke statusvermelding bovenaan en een beschikbaarheidstoelichting onderaan. De diensten en hun bestaande tarieven blijven beschikbaar. Er wordt geen zelfstandige download aangeboden.

De homepage en de werkomgevingsgalerij op Software tonen een ingevuld fictief vraagstuk in de echte blauwdrukmodule. De softwarepagina toont daarnaast het moduleoverzicht en de projectomgeving van het bewaarde concept. De actuele beelden staan in assets/images/software:

- blauwdruk-concept-nl.png
- moduleoverzicht-nl.png
- project-concept-nl.png

De nieuwe conceptbeelden zijn 1536 × 816 pixels; het moduleoverzicht is 1918 × 1020 pixels. Het fictieve demonstratieproject heet Horizon Fietsservice. De beelden tonen ingevoerde informatie en een bewaard concept, geen afgerond onderzoek of gegenereerde eindblauwdruk. De eerder gebruikte start- en moduleschermen blijven als bronbestanden behouden.

De productdemonstratie gebruikt assets/video/variana-concept-rondleiding-nl.mp4 met Nederlandse ondertiteling in het gelijknamige .vtt-bestand. De opname van circa 31 seconden is in de echte desktopapp gemaakt en uit zeven korte opnamen gemonteerd. Zij toont het kiezen van een module, het invoeren van een fictief organisatievraagstuk, lokaal bewaren als concept en terugvinden in de projectomgeving. Er is geen onderzoeksuitvoering gestart en er worden geen voltooide onderzoeksresultaten voorgesteld. De videospeler heeft bediening, een posterbeeld en Nederlandse captions.

Het fictieve concept is in de lokale app bewaard. De desktopbroncode is voor deze websitepresentatie niet aangepast.

De producttekst legt het nut van een eigen werkomgeving uit: regie over de werkwijze, continuïteit van de opgebouwde onderzoekscontext en lokale AI als ontwikkelrichting. Dit zijn beoogde voordelen. Er wordt niet gesteld dat alle AI-functionaliteit al offline werkt, gegevens nooit het apparaat verlaten of bepaalde beveiligingsgaranties gelden. Installatiebestanden, ondersteunde besturingssystemen, systeemvereisten en de omvang van offline gebruik worden pas vermeld wanneer zij zijn bevestigd.

De CTA /contact/?onderwerp=preview kiest de formulieroptie voor een productpreview. Die aanvraag gebruikt dezelfde Formspree-koppeling.

De opname en nieuwe screenshots gebruiken de algemene werkomgeving en het eigen fictieve Horizon Fietsservice-concept. Bestaande herkenbare projecten, hun dossierinhoud en private test- of instellingenbeelden zijn niet in de opname of nieuwe websitebeelden verwerkt. De private opname- en broninventaris blijven buiten de website en uploadselectie. Eerder aanwezige beeldbestanden blijven ongewijzigd.

De hoofdnavigatie wordt voor alle inhoudspagina’s door dezelfde headerfunctie opgebouwd. Software staat daarin tussen Hoe het werkt en Voor wie. Een afwijkende weergave op een reeds geopende pagina kan een oudere browser- of publicatiecache betreffen; beschrijf dit niet als een verholpen bronfout zonder die fout eerst te hebben vastgesteld.

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

De vroegere producttour wordt niet meer opgebouwd. De oudere prototypebeelden en onderzoeksassets blijven in de bron bewaard. De huidige softwarepresentatie gebruikt de conceptbeelden en desktopopname hierboven; zij toont de voorbereiding van een vraagstuk en vormt geen bewijs van uitgevoerde onderzoeksresultaten. Het afzonderlijke voorbeeldrapport is door de eigenaar aangeleverd en wordt niet voorgesteld als een softwaredemonstratie.

## Voorbeeldrapporten

De markering REPORT_READER bouwt één PDF-lezer op de homepage vanuit beheer/rapporten.json via beheer/report_renderer.py. Elke beschikbare PDF heeft een eigen rapportknop; de actieve knop bepaalt de titel, toelichting, downloadlink en inhoud van hetzelfde PDF-scherm. Directe rapportlinks gebruiken /#concurrentieanalyse en /#omgevingsanalyse. /#voorbeeldrapport opent de hele sectie. De rapportknoppen ondersteunen toetsenbordbediening. Zichtbare links voor apart openen en downloaden blijven beschikbaar wanneer de browser geen ingebouwde PDF-lezer ondersteunt.

Een volgend rapport toevoegen: plaats de PDF in assets/downloads/, voeg een overeenkomstig item toe aan beheer/rapporten.json en voer de build uit. De rapportkeuze wordt automatisch opgebouwd; voeg uitsluitend daadwerkelijk beschikbare documenten toe. De concurrentieanalyse telt vijftien pagina’s en is 125.137 bytes; de omgevingsanalyse telt elf pagina’s en is 125.290 bytes. Beide PDF-bestanden zijn ongewijzigd opgenomen.

De homepage laadt alleen report-reader.css en report-reader.js voor de lezer. De markering REPORT_PREVIEW plaatst de bestaande concurrentiepreview uitsluitend op Analyses, direct na Wat kun je ontvangen? Die preview en passende uitkomsten van de keuzehulp verwijzen naar de homepagelezer. De eerdere afzonderlijke rapportpagina wordt niet meer opgebouwd; de oude bron en previewafbeeldingen blijven als ongebruikte historische bestanden behouden.

De keuzehulp toont in B een klein voorbeeld bij complete inzichtvragen en de specialistische uitwerking Scenariovergelijking, voor zowel bedrijven als overheden. Bij de vergelijking vermeldt de tekst dat het document laat zien hoe een vergelijkende analyse is opgebouwd. De voorbeeldlink verdwijnt direct bij een onvolledige of andere keuze. De resolver en contactselectie blijven gelijk. beheer/controle_voorbeelden.cjs controleert deze selectie voor negentien complete routes en vier onvolledige keuzes.

De vijf opdrachtomschrijvingen op de homepage blijven een afzonderlijke lijst zonder rapport- of downloadlink. De URL-renderer houdt bestaande Voorbeelden-links bruikbaar als doorverwijzingen naar de lezer op de homepage.

## Contact, tarieven en publicatie

Het bevestigde publieke ontvangstadres is info@variana.nl. De eigenaar heeft de formulierendpoint https://formspree.io/f/xkjjpzyl aangeleverd. Controleer in Formspree de bijbehorende ontvanger en bevestig dat de aanvraag in de gewenste mailbox aankomt. Een geverifieerd accountadres is op zichzelf geen bewijs van inboxaflevering. De oude e-mailconcept- en TXT-downloadfuncties zijn uit het formulier verwijderd. De gewone e-maillink voor rechtstreeks contact blijft beschikbaar.

De eigenaar heeft het e-mailadres bij Formspree als geverifieerd bevestigd. Vijfentwintig transportgevallen met nagebootste requests slagen. Daarnaast is één echte testaanvraag vanuit de live toepassingenmodal verstuurd en door de eigenaar in de mailbox ontvangen. Het venster bleef open op dezelfde toepassingenpagina, met het onderwerp Analyses. De contactpagina en de modal gebruiken hetzelfde formulier en dezelfde verzendcode; er is geen tweede echte aanvraag nodig geweest.

Formspree verwerkt de ingevulde gegevens als verzenddienst. De openbare formuliertekst noemt Formspree en verwijst naar het [privacybeleid](https://formspree.io/legal/privacy-policy/). Controleer de actuele voorwaarden en instellingen van het gekozen formulier voordat deze koppeling in gebruik wordt genomen. De eerdere FormSubmit-pogingen hebben geen door de eigenaar ontvangen activeringsmail of bewezen inboxaflevering opgeleverd; de Formspree-voorbereiding is geen bewijs dat die eerdere koppeling werkte.

De tarieven staan in beheer/paginas/samenwerken.html. Deze wijziging verandert geen bedragen of btw-vermelding. De huidige dienstverlening gebruikt een online ondersteund prototype. Zelfstandige offline software en de zelfstandige marketing- en evaluatiemodules zijn nog in ontwikkeling; de keuzehulpen wijzigen die beschikbaarheid niet.

Bewaar de CNAME. Interne bron-PDF’s, Worddocumenten, geëxtraheerde brontekst, werkmappen, back-ups en aanvraagbestanden horen niet in de websitebron. Oudere ZIP-bestanden zijn geen bron voor deze GitHub-wijzigingen.

Zie beheer/CONTROLE.md voor de controle van deze versie.
