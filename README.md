# Variana — websitebron, bekijken en onderhouden

Bijgewerkt op **30 oktober 2026**: Home is ingekort en bevat de drie tegels Analyses, Blauwdruk en Specialistische modules en een onderdeel Praktijkervaring. Toepassingen begint met vijf soorten vraagstukken en de verplaatste samenhangsectie; het klikbare schema verwijst naar de systeemopbouw op Hoe het werkt. Van vraag naar besluitvorming staat nu in de Kennisbank. Het nieuwe interactieve scherm wordt eerst besproken en is niet gebouwd. Zie beheer/CONTROLE.md voor de controles.

Deze Nederlandstalige website bestaat uit 14 HTML-pagina’s: acht hoofdpagina’s, drie kennisartikelen en drie dienstenpagina’s. De site gebruikt lokale HTML-, CSS-, JavaScript- en afbeeldingsbestanden. Bekijken vereist geen installatie, build, Python of internetverbinding.

## Openen en delen

1. Pak het ZIP-bestand volledig uit in een map op je computer.
2. Open `index.html` vanuit die map met je browser.
3. Gebruik de navigatie om de andere pagina’s te bekijken.

Open de site niet rechtstreeks vanuit het ZIP-bestand: dan kunnen gekoppelde bestanden ontbreken. Deel de hele uitgepakte website-map, of maak daarvan opnieuw een ZIP. Alleen `index.html` delen is onvoldoende.

Voor aanpassen in Visual Studio Code kun je Live Preview gebruiken. Een lokale webserver is optioneel. Open PowerShell in de website-map en voer, als Python beschikbaar is, uit:

```powershell
python -m http.server 8000 --bind 127.0.0.1
```

Open daarna `http://127.0.0.1:8000`. Stop de server met `Ctrl+C`.

## Teksten en gedeelde onderdelen onderhouden

- `beheer/paginas/` bevat per pagina een gewoon HTML-bronbestand voor de tekst en inhoud. Dit zijn invoerbestanden voor de generator; open voor bekijken de HTML-bestanden in de hoofdmap. In `beheer/pages.json` staan de paginatitels, metabeschrijvingen en verwijzingen naar de bronbestanden.
- `beheer/build.py` bevat de centrale navigatie, footer en helpers voor terugkerende inhoud en invulmarkeringen.
- `assets/css/styles.css` bevat de vormgeving. Bovenaan staan variabelen voor kleuren, typografie en afstanden.
- `assets/css/cinematic.css` bevat uitsluitend de beeldvullende homepage-hero: uitsnede, donkere verlopen, tekstplaatsing en responsive gedrag. Alleen de homepage laadt dit bestand.
- `assets/js/main.js` bevat het mobiele menu, de producttour, afbeeldingsvergroting via een dialoog en het contactformulier.
- `beheer/demonstraties.json` bevat de onderzoeksinhoud voor de interactieve voorbeeldenpagina. `beheer/research_renderer.py` controleert de gegevens en genereert de HTML-opzet en `assets/js/research-data.js`. De bediening staat in `assets/js/research.js`; de bijbehorende vormgeving in `assets/css/research.css`.
- `assets/images/` bevat het bestaande Variana-beeldmerk en de productbeelden.

## Achtergrond van de homepage

De aangeleverde kantoorvisual staat als originele PNG in `assets/images/variana-city-hero-original.png`. De website gebruikt de geoptimaliseerde versie `assets/images/variana-city-hero.webp` (1672 × 941 pixels, circa 280 KB). De originele PNG is circa 2 MB. De beeldverhouding is gelijk gebleven; de uitsnede gebeurt alleen in CSS met `background-size: cover`.

De foto vult de eerste sectie; titel, tekst en knoppen blijven echte HTML. Donkere verlopen zorgen voor leesbaarheid links en een aansluiting op de volgende sectie. Desktop, tablet en mobiel hebben passende uitsneden. De achtergrond krijgt een preload met hoge prioriteit vanuit `beheer/build.py`; er is geen lazy loading, video of parallax. De foto is een aangeleverde sfeer-/toekomstvisual en wordt niet als Variana-kantoor of uitgevoerd onderzoek gepresenteerd.

Het bestaande prototypescherm staat nu in de eerstvolgende inhoudelijke sectie, bij de uitleg van het systeem. De overige homepage-onderdelen en andere pagina’s zijn behouden. Voorvertoningen staan in `beheer/voorvertoning/`; die afbeeldingen zijn controlebeelden en geen onderdelen die de website hoeft te laden.

Na een wijziging aan de beheerbron regenereer je de HTML met Python, vanuit de website-map:

```powershell
python beheer/build.py
```

Voor alleen bekijken is deze stap niet nodig. Je kunt een kleine tekstwijziging rechtstreeks in een `.html`-bestand doen, maar een volgende build overschrijft die wijziging. Bewerk daarom bij voorkeur het bijbehorende HTML-bronbestand in `beheer/paginas/`. Controleer na regenereren de aangepaste pagina, links en mobiele weergave.

Voor een nieuwe pagina maak je een HTML-bronbestand in `beheer/paginas/` en voeg je de bijbehorende metadata en bestandsverwijzing toe in `beheer/pages.json`. Voeg ook de relevante interne links toe en werk zo nodig de centrale navigatie bij. Iedere pagina krijgt een eigen titel, metabeschrijving en één H1.

## Interactieve onderzoeksverkenning

`voorbeelden.html` bevat één complexe, volledig fictieve demonstratie-input: internationale groei van een producent van modulaire meetkasten. De organisatie en briefing zijn nieuw bedacht; er is geen klantcasus gebruikt. Vier tabbladen tonen het vraagstuk, negen voorgenomen onderzoeksmodules, hun afhankelijkheden en mogelijke feedbacklussen, en de status van de resultaten.

Dit onderzoek is nog niet uitgevoerd. Er zijn geen marktgegevens, bevindingen, berekeningen, bronnen, aanbevelingen of rapporten verzonnen. De onderzoeksindeling is illustratief en nog niet als werkelijk doorlopen methodologie bevestigd. De resultatenweergave bevat daarom uitsluitend duidelijke statusinformatie en geen rapport- of downloadknoppen. De eerdere drie voorbeelden en het redactionele demonstratiedocument zijn verwijderd.

De demonstratie werkt zonder `fetch`, externe bibliotheken of internetverbinding. De vier toepassingsgebieden zijn in de gegevensstructuur opgenomen. Zodra meer demonstraties worden toegevoegd, verschijnt een casuskeuze. Zie `beheer/DEMONSTRATIES.md` voor het toevoegen van echte, gecontroleerde output en nieuwe onderzoeken.

## Contact

Het bevestigde contactadres is `info@variana.nl`. Het formulier opent een conceptbericht in het e-mailprogramma van de bezoeker. De bezoeker controleert en verzendt het bericht daar zelf. Als alternatief kan de aanvraag als lokaal tekstbestand worden gedownload.

Er is geen backend en geen automatische verzending. De website bewaart de invoer niet. Bij een gewijzigd adres pas je `assets/js/config.js` en de zichtbare e-maillinks in de beheerbron aan, en regenereer je de pagina’s.

Een toekomstige formulierdienst vraagt om een aparte inrichting. Werk dan ook de uitleg over verzending, gegevensgebruik en privacy bij.

## Prijzen en productstatus

De prijzen staan op `samenwerken.html`, onder `tarieven`, `richtprijzen` en `licentietarieven`. Wijzig de bedragen in `beheer/paginas/samenwerken.html` en regenereer de site. Alle genoemde bedragen zijn exclusief btw.

| Losse opdracht | Groot-MKB | Enterprise |
| --- | ---: | ---: |
| Analysepakket | €2.500 | €5.000 |
| Specialistische module | €5.000 | €12.500 |
| Organisatieblauwdruk | €10.000 | €20.000 |

Voor Klein-MKB en individuele gebruikers gelden richtprijzen per losse opdracht: analysetraject €500, bedrijfsuitvoeringsplan €1.500 en specialistische module €1.500. De scope en inbegrepen werkzaamheden worden vooraf afgesproken. Beheerde dienstverlening is op aanvraag.

De geplande offline jaarlicenties staan hiervan los: Groot-MKB €15.000, Enterprise €75.000 en Klein-MKB €7.500 per jaar. Deze jaarprijzen zijn indicatief; de offline software is nog in ontwikkeling en niet beschikbaar. Voor een individuele jaarlicentie is de richtprijs op aanvraag.

De huidige dienstverlening gebruikt een werkend, online ondersteund prototype. De echte prototypebeelden op de site zijn geselecteerd voor openbare presentatie en blijven herkenbaar als ontwikkelversie. Ze zijn geen bewijs dat de offline software productierijp is.

## Publicatie via GitHub Pages

De actuele bron staat in https://github.com/HariboKing/Variana-website op branch main. De bestaande CNAME koppelt de site aan variana.nl. GitHub Pages publiceert vanuit main en de hoofdmap; de status staat onder Actions. Voor beheer of herinrichting:

1. Gebruik een repository met uitsluitend de website-map. Neem geen interne bron-PDF’s of bovenliggende werkmappen op.
2. Regeneer de pagina’s als de beheerbron is gewijzigd en controleer de site lokaal.
3. Voeg de websitebestanden met hun mapstructuur toe aan de repository. Het bestand `.nojekyll` hoort erbij.
4. Kies in GitHub bij **Settings → Pages** de branch en map met `index.html` als publicatiebron.
5. Controleer de gepubliceerde project-URL. De relatieve verwijzingen ondersteunen een GitHub Pages-projectpad.
6. Koppel `variana.nl` pas wanneer je wilt publiceren; volg dan de DNS- en HTTPS-instructies van GitHub.

Rond vóór publicatie de domeinspecifieke canonical-URL’s en sitemap af. Controleer ook social-previewafbeelding, bedrijfsgegevens en privacy-informatie, passend bij de werkelijk gebruikte contactroute. Een eventuele formulierdienst moet afzonderlijk worden ingesteld. De huidige site laadt geen externe code of online lettertypen.

Interne pitchdecks, financiële overzichten en andere bronbestanden horen niet in de openbare website of deelbare ZIP. Publiceer alleen de bedoelde websitebestanden.


## Redactionele wijzigingen van 30 oktober

De persoonlijke teamsectie is verwijderd, inclusief de centrale verwijzing ernaartoe. De belangrijkste acties zijn ‘Vraag nu een demo aan’, ‘Dien je vraag in’ en bij tarieven ‘Vraag een offerte aan’. Het contactformulier blijft een aanvraagconcept voor de eigen e-mailsoftware of een lokale download; het verstuurt niets automatisch.

De werkwijze vertrekt vanuit een organisatiebrede blauwdruk. De vier focusgroepen zijn Enterprise, Groot-MKB, Klein-MKB en vergelijkbare organisaties (zoals stichtingen), en overheidsorganisaties (zoals ministeries en gemeenten, inclusief beleidsmakers en bestuurders). Individuele gebruikers en adviseurs blijven welkom maar staan niet als extra focusgroep in de hoofdindeling.

De prijzen zijn ongewijzigd. Groot-MKB en Enterprise krijgen het label ‘Organisatieblauwdruk’; bij Klein-MKB en individuele gebruikers staat ‘Bedrijfsuitvoeringsplan’. De procesuitleg over het ontstaan van een opdracht is van de tarievenpagina verwijderd; de contactpagina beschrijft hoe je een aanvraag voorbereidt.

De voorbeeldenpagina legt uit wat de bezoeker nu kan verkennen: fictieve input, deelvragen en mogelijke koppelingen. De onderzoeksdata bevat nog steeds geen echte of verzonnen onderzoeksresultaten. Voeg alleen daadwerkelijk uitgevoerde, gecontroleerde en voor publicatie vrijgegeven output toe.


## Herindeling van 30 oktober — GitHub-versie

De huidige hoofdlijn is analyses → organisatiebrede blauwdruk → specialistische verdieping. De vijf invalshoeken op Toepassingen zijn strategisch, analytisch, bedrijfs- en organisatieontwikkeling, marketing en evaluatie. Links in het samenhangschema verwijzen naar openbare uitleg op Hoe het werkt. De interne stappen en prompts worden niet getoond.

Bij tekstwijzigingen moeten zowel de beheerbronnen als de gegenereerde HTML naar GitHub. Wijzigingen op main kunnen direct via GitHub Pages worden gepubliceerd. Bewaar bij updates de CNAME. De oude lokale ZIP is geen bron voor deze GitHub-wijzigingsronde.
