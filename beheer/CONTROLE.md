# Controle Variana — 30 oktober 2026

De lokale testmap en ZIP bevatten de actuele website. Er is niets gepubliceerd of verstuurd.

## Huidige inhoud

- De persoonlijke teamsectie en de verwijzingen ernaartoe zijn uit alle pagina’s en de beheerbron verwijderd.
- De primaire acties zijn ‘Vraag nu een demo aan’ en ‘Dien je vraag in’. Op de tarievenpagina staat ‘Vraag een offerte aan’.
- De organisatieblauwdruk omvat strategie, markt, aanbod, mensen, processen, middelen en uitvoering. De werkwijze is uitgelegd als vraag → blauwdruk → gericht onderzoek → beslissing. Nieuwe relevante informatie wordt in de blauwdruk en geraakte analyses of plannen verwerkt.
- De vier bevestigde focusgroepen zijn Enterprise, Groot-MKB, Klein-MKB en vergelijkbare organisaties (waaronder stichtingen), en overheidsorganisaties. Ministeries, gemeenten, beleidsmakers en bestuurders zijn expliciet genoemd.
- Analyse-uitwerkingen maken duidelijk welke informatie nog ontbreekt voor een onderbouwd besluit. Aannames en onzekerheden blijven herkenbaar.
- De evaluatietekst benoemt doelbijdrage, uitvoerbaarheid, middelen en risico’s. Toekomstige softwaremodules blijven herkenbaar in ontwikkeling.
- De tarieven en dienstpagina onderscheiden een organisatieblauwdruk voor Groot-MKB/Enterprise en een bedrijfsuitvoeringsplan voor Klein-MKB/individuen. De bedragen zijn gelijk gebleven en exclusief btw. De procesuitleg over het ontstaan van een opdracht is van de tarievenpagina verwijderd; praktische aanvraaguitleg staat bij Contact.
- De voorbeeldenpagina toont één volledig fictieve vraag, negen voorgenomen onderzoeksmodules, mogelijke afhankelijkheden en terugkoppelingen. Zij is een navigeerbare onderzoeksopzet, geen bewijs van uitgevoerd onderzoek. Er zijn geen onderzoeksbevindingen, bronnen, berekeningen of rapporten toegevoegd.
- De cinematische homepage en laatst gekozen lichtere blauw-teal (#3BB3BE) zijn behouden. De originele achtergrond-PNG en geoptimaliseerde WebP blijven beschikbaar. Echte prototypebeelden zijn niet inhoudelijk aangepast.

## Controles

- Alle veertien pagina’s statisch gecontroleerd: bestanden, ankers, unieke metadata, één H1, labels, knoppen en ARIA-verwijzingen.
- Alle veertien pagina’s op 320 en 1440 pixels gecontroleerd: geen horizontale pagina-overloop, ontbrekende beelden of persoonlijke teaminhoud.
- Demo- en vraagknoppen, offerteknop en de onderwerpkeuze op Contact gecontroleerd. De bezoeker verstuurt zelf vanuit het eigen e-mailprogramma; er is geen automatische verzending.
- Onderzoektabs met toetsenbord gecontroleerd; resultaten blijven niet beschikbaar en bevatten geen rapport- of downloadknoppen. Geen JavaScript-fouten of waarschuwingen in de browsercontrole.
- De eerdere bedragen zijn vergeleken met de vorige ZIP. De onderzoeksdata, scripts, stijlbestanden en bronafbeeldingen zijn ongewijzigd.
- De complete ZIP wordt na uitpakken vanuit de meegeleverde beheerbron identiek opgebouwd.

## Beheer en vervolgstap

Bewerk teksten in beheer/paginas/ en metadata in beheer/pages.json. Navigatie, footer en producttour staan centraal in beheer/build.py. Regeneer vanuit de website-map met python beheer/build.py. De gebruiker hoeft voor bekijken geen build uit te voeren.

Voor een overtuigende inhoudelijke demonstratie blijft een daadwerkelijk met Variana uitgevoerd, gecontroleerd en voor publicatie vrijgegeven onderzoek nodig. Voeg pas daarna echte analysefragmenten, bronnen, conclusies en rapporten toe. Zie DEMONSTRATIES.md.

De contactroute blijft geschikt voor een offline voorbeeld: een e-mailconcept of lokale aanvraagdownload. De zelfstandige offline Variana-software is nog in ontwikkeling. De marketingwebsite zelf bestaat volledig uit lokale bestanden.

Getest via lokale HTTP in Chromium. De testbrowser blokkeert file://; direct dubbelklikken kon daarin niet worden getest. Er is geen volledige toegankelijkheidsaudit of test op fysieke apparaten en andere browsers uitgevoerd. Voorvertoningen in beheer/voorvertoning/ zijn controlebeelden en geen runtime-afhankelijkheden.
