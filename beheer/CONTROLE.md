# Controle Variana — 30 oktober 2026

Dit verslag betreft de herindeling van Home, Toepassingen, Hoe het werkt en Kennisbank in de GitHub-bron. De publicatiestatus is te volgen bij GitHub Actions in HariboKing/Variana-website.

## Verwerkte wijzigingen

- Home behoudt de cinematische opening en drie tegels: Analyses, Blauwdruk en Specialistische modules. Praktijkervaring beschrijft de door de opdrachtgever opgegeven professionele achtergrond, zonder namen, aantallen jaren of onbevestigde resultaten.
- De samenhangsectie staat op Toepassingen, als tweede inhoudelijke onderdeel na de ongewijzigde pagina-intro. Het eerste inhoudelijke onderdeel bevat vijf invalshoeken: strategisch, analytisch, bedrijfs- en organisatieontwikkeling, marketing en evaluatie.
- Het schema toont analyses → organisatieblauwdruk → specialistische modules. Alle negen onderdelen en terugkoppelingen zijn gewone links naar uitleg op Hoe het werkt. De blauwdruk heeft een neutrale donkerblauwe achtergrond.
- Hoe het werkt begint na de intro met de publieke systeemopbouw. Eerste analyses voeden de organisatiebrede blauwdruk; gerichte verdieping bouwt daarop voort. Er zijn geen interne prompts, selectieprocedures of uitvoeringsstappen openbaar gemaakt.
- Van vraag naar besluitvorming staat nu in de Kennisbank. De oude ankers op Hoe het werkt blijven bereikbaar.
- Het bestaande blok De software in beeld en de producttour zijn behouden. Een nieuw interactief scherm is uitsluitend onderwerp van overleg en is niet geïmplementeerd.
- De onderzoeksverkenner, fictieve input en lege onderzoeksresultaten zijn ongewijzigd. Er zijn geen bevindingen, bronnen of rapporten verzonnen.
- Tarieven, contactroute, doelgroepen, kleuren en beeldbestanden zijn behouden. De bestaande CNAME voor variana.nl blijft ongewijzigd.

## Uitgevoerde controles

- De generator bouwt alle 14 HTML-pagina’s.
- Alle 14 pagina’s gecontroleerd op interne bestanden en ankers, dubbele IDs, één H1 en een metabeschrijving.
- De vier gewijzigde pagina’s in Chromium gecontroleerd op 320, 768 en 1440 pixels: geen horizontale pagina-overloop of ontbrekende afbeeldingen.
- De vijf vraagstukcategorieën, sectievolgorde en alle doelankers gecontroleerd. De blauwdruklink opent de juiste uitleg op Hoe het werkt.
- De blauwdrukachtergrond is rgb(26, 42, 66). Toepassingen is ook visueel op desktop gecontroleerd.
- Het bestaande softwareblok is met de vorige bron vergeleken en is inhoudelijk identiek. Geen nieuwe JavaScript-interacties toegevoegd; geen browserfouten of waarschuwingen waargenomen.

- De gedeelde stylesheet krijgt automatisch een inhoudshash in de URL, zodat browsers na een vormgevingswijziging de nieuwe versie ophalen. De noodzaak hiervan bleek bij de livecontrole na publicatie.

## Beheer

Bewerk inhoud in beheer/paginas/ en metadata in beheer/pages.json. Regeneer daarna met python beheer/build.py en werk de gegenereerde rootpagina’s tegelijk bij. GitHub main is de actuele bron voor deze wijzigingsronde.

De website gebruikt statische bestanden. Het contactformulier opent een e-mailconcept of maakt een lokale tekstdownload; de bezoeker verstuurt zelf. De zelfstandige offline software en de marketing- en evaluatiemodules zijn nog in ontwikkeling.

De controle is geen volledige toegankelijkheidsaudit of fysieke apparaattest. Eerdere beelden in beheer/voorvertoning/ zijn geen runtime-afhankelijkheden.


## Correctie na feedback: geen dubbele opsomming

Op Hoe het werkt zijn de drie basiskaarten en vijf modulekaarten uit het eerste blok verwijderd. Twee korte alinea’s leggen de waarde van gedeelde context en samenhang uit. Het bestaande interactieve scherm blijft behouden. De vijf moduleankers staan bij dat scherm en blijven bereikbaar vanaf Toepassingen; de overige ankers horen bij de korte uitleg. Er is geen nieuwe interactie toegevoegd.
