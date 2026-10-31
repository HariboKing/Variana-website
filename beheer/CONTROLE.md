# Controle Variana — opdrachten op de homepage

Deze wijziging verwijdert Voorbeelden als inhoudspagina en plaatst de vijf aangeleverde opdrachtomschrijvingen op de homepage.

## Beoogd gedrag

- De homepage toont na Praktijkervaring de sectie Een greep uit onze opdrachten en daarna de bestaande contactoproep.
- De sectie heeft het anker opdrachten en bevat een geordende lijst met vijf omschrijvingen. De dienstnaam staat telkens vetgedrukt. Alle vijf zinnen volgen de tekst van de gebruiker.
- Voorbeelden staat niet meer in de hoofdnavigatie of footer. De footer bevat Onze opdrachten als directe link naar index.html#opdrachten.
- Het oude adres voorbeelden.html verwijst naar index.html#opdrachten. De vroegere inhoud en producttour worden niet meer getoond.
- De website heeft 22 inhoudspagina’s plus de compatibele doorverwijspagina. De oude pagina is uit de paginametadata en bronfragmenten verwijderd.
- Hoe het werkt, de A/B/C-keuzehulp, de blauwdruklogica, overheidsfilters, tarieven en contactfunctie behouden hun gedrag.

## Gecontroleerd in de bron

- De nieuwe homepage-sectie staat na praktijkervaring en vóór de contactoproep.
- De lijst bevat vijf items met vetgedrukte dienstnamen en de exacte aangeleverde titel.
- De overige homepage-inhoud is gelijk aan de vorige versie.
- De styling is beperkt tot de homepage en gebruikt de bestaande donkere huisstijl en accentkleur.

## Uitgevoerde controles

- De 22 inhoudspagina’s en de doorverwijspagina gebouwd. Geen ontbrekende interne bestanden, ankers of ARIA-verwijzingen; IDs zijn uniek en elke HTML-pagina heeft één H1 en metabeschrijving.
- Alle vijf opdrachtteksten en vetgedrukte dienstnamen exact vergeleken met de aangeleverde formuleringen. Plaatsing na praktijkervaring en vóór de contactoproep in de bron en browser bevestigd.
- Alle inhoudspagina’s statisch gecontroleerd op verwijzingen: geen Voorbeelden-link meer. De footerlink Onze opdrachten vanuit Toepassingen opent de juiste homepage-sectie.
- Het oude voorbeelden.html-adres met fragment werkomgeving opent automatisch index.html#opdrachten.
- Opdrachtsectie op 320, 768 en 1440 pixels gecontroleerd: geen horizontale overloop. Tekst is op 320 pixels 16 px en op bredere schermen 18 px. Desktopweergave visueel bekeken; het mobiele menu bevat geen Voorbeelden.
- Geen browserfouten of waarschuwingen waargenomen. De live publicatie wordt afzonderlijk gecontroleerd na de deployment.
- Keuzehulpcode, overheidsfilters, tariefbron, contactconfiguratie en CNAME zijn bytegelijk aan de vorige versie. Private bronstukken staan buiten de uploadselectie.

Deze controle is geen volledige toegankelijkheidsaudit of fysieke apparaattest.
