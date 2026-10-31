# Controle Variana — 31 oktober 2026

Deze controle betreft de herindeling van Toepassingen, Hoe het werkt en Voorbeelden in de GitHub-bron.

## Inhoud en verplaatsingen

- Vier blokken op Toepassingen in de gevraagde volgorde: Strategisch, Analytisch, Plan van aanpak / stappenplannen, Overig.
- De onderzoeksverkenner staat uitsluitend op Toepassingen en opent standaard de samenhangkaart. De kaart is horizontaal ingericht met context eronder; modulekeuze heeft een horizontale rij.
- Het systeemschema staat bovenaan Hoe het werkt, na de intro. De negen opties openen negen eigen uitlegpagina’s. Analyses gebruikt de bestaande analysedienst; acht andere schemaopties hebben nieuwe pagina’s. Plan van aanpak heeft daarnaast een nieuwe eigen pagina.
- De oorspronkelijke vierfasenuitleg op Hoe het werkt is behouden. Er is geen tweede catalogus van systeemonderdelen toegevoegd.
- Voorbeelden bevat bovenaan ruimte voor nog aan te leveren praktijkcases, gevolgd door de verplaatste producttour.
- Er zijn geen werkelijke klantcases of verzonnen onderzoeksresultaten toegevoegd. De oorspronkelijke fictieve onderzoeksdata is byte voor byte behouden.
- Tarieven, contactadres, beeldbestanden en de domeinkoppeling zijn ongewijzigd.

## Uitgevoerde controles

- Alle 23 pagina’s succesvol gegenereerd.
- Interne bestanden en ankers, unieke IDs, H1’s, metabeschrijvingen en ARIA-verwijzingen gecontroleerd.
- Alle 23 pagina’s in Chromium op 320 en 1440 pixels gecontroleerd: geen horizontale pagina-overloop, ontbrekende afbeeldingen of ontbrekende H1.
- Standaardtab, modulekeuze, directe modulelink, toetsenbordnavigatie en feedbacklussen van de onderzoeksverkenner getest.
- De negen diagramlinks gecontroleerd; de blauwdruk opent de juiste eigen pagina.
- De producttour op Voorbeelden met muis en toetsenbord gecontroleerd. De link naar de onderzoekskaart opent de nieuwe locatie.
- Op desktop staan de drie onderzoeksgroepen op gelijke hoogte van links naar rechts. De context staat onder de kaart.
- JavaScript-syntaxcontrole geslaagd. Geen browserfouten of waarschuwingen waargenomen.
- Plaatsing en inhoud zijn aanvullend onafhankelijk gelezen en gecontroleerd.

## Grenzen

Dit is geen volledige toegankelijkheidsaudit of fysieke apparaattest. De onderzoeksverkenner voert geen onderzoek uit. Praktijkvoorbeelden krijgen pas inhoud wanneer die wordt aangeleverd; de ingerichte plek bevat een statusmelding.

GitHub Actions vermeldt de actuele publicatiestatus. Beheerbronnen en gegenereerde HTML horen samen in één wijziging.
