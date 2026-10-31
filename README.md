# Variana — websitebron

Actuele bron: https://github.com/HariboKing/Variana-website, branch main. Publicatie verloopt via GitHub Pages en de bestaande CNAME voor variana.nl. De website gebruikt statische HTML, CSS, JavaScript en lokale afbeeldingen.

Bijgewerkt op 31 oktober 2026: drie interactieve onderdelen hebben elk een eigen plek gekregen. De website bevat 23 pagina’s.

## Pagina-indeling

- Toepassingen begint met vier routes: Strategisch, Analytisch, Plan van aanpak / stappenplannen en Overig. Daaronder staat de horizontale onderzoeksverkenner met fictieve input.
- Hoe het werkt begint na de intro met het systeemschema. Alle negen diagramopties linken naar een eigen uitlegpagina. De bestaande vierfasenuitleg staat eronder.
- Voorbeelden begint met een plek voor praktijkvoorbeelden die later inhoud krijgen. Daaronder staat de interactieve productdemonstratie met de bestaande prototypebeelden.
- Home, tarieven, contact, doelgroepen en kennisbank behouden hun functie. Verwijzingen naar verplaatste onderdelen zijn bijgewerkt.

De nieuwe uitlegpagina’s zijn blauwdruk.html, specialistische-modules.html, strategie.html, analytische-verdieping.html, organisatieontwikkeling.html, marketing.html, evaluatie.html, samenhang.html en plan-van-aanpak.html. De bestaande analyse.html bevat ook uitleg over de rol van analyses in het systeem.

## Onderhouden en bouwen

Bewerk tekst in beheer/paginas/ en metadata in beheer/pages.json. De centrale navigatie, footer en producttour staan in beheer/build.py.

Voer vanuit de website-map uit:

    python beheer/build.py

De generator schrijft alle HTML-pagina’s in de hoofdmap. Werk bij wijzigingen zowel de beheerbronnen als de gegenereerde pagina’s in GitHub bij. Voor het bekijken of hosten van de site is geen Python, Node, database of build nodig.

Gedeelde vormgeving staat in assets/css/styles.css. De homepage gebruikt aanvullend cinematic.css. Het systeemdiagram gebruikt gewone links. De interactieve producttour wordt ingevoegd via PRODUCT_DEMO en gebruikt main.js.

De onderzoeksverkenner wordt ingevoegd via RESEARCH_EXPLORER. De generator laadt research.css, research-data.js en research.js op de pagina met deze markering; dat is nu Toepassingen. Stylesheets en de interactieve researchcode krijgen een inhoudshash in de URL om verouderde browsercache te voorkomen.

## Onderzoeksverkenner

De data staat in beheer/demonstraties.json. De fictieve groeivraag en negen onderzoeksmodules zijn ongewijzigd. Het onderzoek is niet uitgevoerd: bronnen, bevindingen, rapporten en resultaten zijn leeg. Voeg uitsluitend werkelijk beschikbare en gecontroleerde output toe.

De kaart toont drie groepen van links naar rechts. Op smalle schermen kan alleen de kaart horizontaal schuiven. De toelichting staat eronder. De modulekeuze op het onderzoekstabblad is een horizontale rij.

De standaardweergave is De samenhang. Een bekende fragmentlink zoals toepassingen.html#onderzoek kiest het passende tabblad; toepassingen.html?module=capaciteit#onderzoek kiest de bijbehorende module. De verkenner gebruikt geen runtime-fetch en kan ook lokaal werken.

## Praktijkvoorbeelden

De gereserveerde ruimte staat in beheer/paginas/voorbeelden.html, onder praktijkvoorbeelden. Daar is nog geen klantcase ingevuld. Voeg hier later de bedoelde praktijkvragen, aanpak en beschikbare uitwerking toe. De producttour staat er direct onder, bij werkomgeving.

De fictieve demonstratie op Toepassingen en de werkelijke praktijkvoorbeelden hebben elk een eigen rol. De bestaande prototypebeelden tonen de werkomgeving en vormen geen bewijs van onderzoeksresultaten.

## Contact, tarieven en productstatus

Het bevestigde publieke adres is info@variana.nl. Het contactformulier opent een e-mailconcept of maakt een lokale TXT-download; de bezoeker verstuurt zelf. Er is geen automatische verzending.

De tarieven staan in beheer/paginas/samenwerken.html. Deze herindeling verandert geen bedragen of btw-vermelding. Huidige dienstverlening gebruikt een online ondersteund prototype. Zelfstandige offline software en de zelfstandige marketing- en evaluatiemodules zijn nog in ontwikkeling.

Bewaar bij publicatie de CNAME. Interne bron-PDF’s, werkmappen, back-ups en aanvraagbestanden horen niet in de websitebron. Oudere lokale ZIP-bestanden zijn geen bron voor deze GitHub-wijzigingsronde.

Zie beheer/CONTROLE.md voor de controle van deze versie.
