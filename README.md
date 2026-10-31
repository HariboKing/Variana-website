# Variana — websitebron

Actuele bron: https://github.com/HariboKing/Variana-website, branch main. GitHub Pages publiceert de site via de bestaande CNAME voor variana.nl. De website bevat 23 statische HTML-pagina’s.

## Huidige indeling

- Toepassingen begint met vier soorten vraagstukken. De interactieve keuzehulp daaronder verbindt een keuze in kolom A met output in kolom B. Kolom C heeft een titel en is verder leeg.
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

De huidige koppelingen zijn:

- Inzicht over een onderwerp → Analyses.
- Overzicht van product, doelgroep of organisatie → Blauwdruk.
- Een specifiek verslag, advies of stappenplan → Specialistische modules.

De eerste vraag is standaard gekozen. Klikken of de pijltjestoetsen, Home en End selecteren een vraag. De gekozen vraag en de bijbehorende output lichten op; de vorige selectie vervalt. B-tegels linken naar hun uitlegpagina.

Kolom C bevat momenteel geen modules, onderzoeken of zichtbare placeholdertekst. In het gegevensbestand is modules leeg en heeft iedere route een lege moduleIds-lijst. Voeg later de bedoelde modules toe aan modules en verbind ze via moduleIds met de juiste routes; dezelfde selectiecode markeert ze dan automatisch.

De oude onderzoeksverkenner en fictieve gegevens zijn in de bron bewaard, maar worden niet op Toepassingen geladen of getoond. De bijbehorende oude fragmentankers blijven bereikbaar als verwijzingen naar de nieuwe interface.

## Praktijkvoorbeelden

De gereserveerde ruimte staat in beheer/paginas/voorbeelden.html, onder praktijkvoorbeelden. Hier is nog geen klantcase ingevuld. Voeg later de bedoelde praktijkvragen, aanpak en beschikbare uitwerking toe. De producttour staat daaronder, bij werkomgeving.

Prototypebeelden tonen de werkomgeving en vormen geen bewijs van uitgevoerde onderzoeksresultaten. Er worden geen onderzoeksuitkomsten of klantresultaten verzonnen.

## Contact, tarieven en publicatie

Het bevestigde publieke adres is info@variana.nl. Het formulier opent een e-mailconcept of maakt een lokale TXT-download; de bezoeker verstuurt zelf. Er is geen automatische verzending.

De tarieven staan in beheer/paginas/samenwerken.html. De huidige wijzigingen veranderen geen bedragen of btw-vermelding. Huidige dienstverlening gebruikt een online ondersteund prototype. Zelfstandige offline software en de zelfstandige marketing- en evaluatiemodules zijn nog in ontwikkeling.

Bewaar de CNAME. Interne bron-PDF’s, werkmappen, back-ups en aanvraagbestanden horen niet in de websitebron. Oudere ZIP-bestanden zijn geen bron voor deze GitHub-wijzigingen.

Zie beheer/CONTROLE.md voor de controle van deze versie.
