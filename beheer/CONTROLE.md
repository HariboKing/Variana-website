# Controle Variana — 31 oktober 2026

Deze wijziging breidt de A/B/C-keuzehulp uit met organisatie- en gebruiksvragen, een gerichte output en een route op hoofdlijnen. De tabbladstijl met één zichtbaar onderdeel tegelijk blijft behouden.

## Gedrag

- Onderdeel A begint zonder gekozen organisatie of hoofdvraag. Een bestaande vraag-query kan alleen de hoofdvraag vooraf kiezen.
- De organisatiekeuze onderscheidt Bedrijf of andere organisatie (waaronder stichtingen) en Overheidsorganisatie.
- Inzicht over een onderwerp koppelt aan Analyses; een samenhangend overzicht aan Blauwdruk. Deze routes zijn compleet na organisatie en hoofdvraag.
- Een specialistische uitwerking vraagt daarnaast naar het doel en een bijbehorende intentie. Per doel verschijnen maximaal drie intenties, geen volledige modulecatalogus.
- Bij overheid en het doel rond doelgroepen wordt de enige passende uitwerking, Customer journey, automatisch gekozen.
- Onderdeel B bevat Analyses, Blauwdruk en Specialistische modules, met een aparte toelichting op de gekozen output.
- A, B en C zijn klikbare tabbladen; telkens is precies één paneel zichtbaar.
- Wisselen van tabblad behoudt de antwoorden; een A-keuze opent B niet automatisch.
- Wisselen van organisatie of hoofdvraag wist het specialistische doel en de gekozen uitwerking. Eerdere ongeschikte keuzes mogen niet blijven doorwerken.
- Onderdeel C toont een genummerde route van relevante globale stappen en sluit af met de passende output. Een beperkte vraag krijgt niet automatisch de volledige ontwikkelketen.
- Interne feedbacklussen worden als herhaalde toetsing en aanscherping beschreven, zonder verzonnen iteratieaantallen. Feedback van de klant volgt na diens eerste oplevering.
- Organisaties, hoofdvragen, outputs, doelen, uitwerkingen, stappen en routes staan in beheer/toepassingsroutes.json. Toegestane organisaties en stepIds bepalen de koppelingen; businessOnly beperkt stappen tot bedrijven.
- Overheden krijgen geen productontwikkeling, marketingmatrix, financieringsaanvraag, pitchdeck, informatiememorandum, target list of investeringsbeoordeling.
- De mogelijke overheidsuitwerkingen zijn Adviesrapport, Scenariovergelijking, Plan van aanpak, Customer journey en KPI’s en managementcriteria.
- De outputtegels linken naar de bestaande uitlegpagina’s.
- De oorspronkelijke fictieve onderzoeksdata en bijbehorende code blijven bewaard, maar worden niet meer op Toepassingen geladen.
- Verwijzingen naar de oude onderzoekskaart zijn bijgewerkt naar de keuzehulp.

## Uitgevoerde controles

- Alle 23 pagina’s gebouwd; geen ontbrekende interne bestanden, ankers of ARIA-verwijzingen. IDs zijn uniek; iedere pagina heeft één H1 en één metabeschrijving.
- De beginstaat, geldige vraag-query en ongeldige vraag-query gecontroleerd. Een query kiest nooit automatisch een organisatie.
- In de browser alle 19 complete combinaties getest: vier algemene routes en vijftien toegestane specialistische routes. Bij overheid wordt de enige doelgroepuitwerking automatisch gekozen.
- Per gekozen doel verschijnen alleen de passende intenties, maximaal drie. Bij A blijven de tabbladen behouden en wordt B niet automatisch geopend.
- De afhankelijke B-markering, outputtoelichting en C-eindoutput gecontroleerd. C bevat bij een analyse slechts de beperkte route; de bedrijfsblauwdruk bevat de bredere keten.
- Wisselen van een bedrijfspitchdeck naar overheid wist specialistische keuzes, outputdetail en C-route. De vijf uitgesloten commerciële modules en de bedrijfsgebonden stappen worden voor overheid niet aangeboden.
- 49 geautomatiseerde routegevallen geslaagd, inclusief onvolledige keuzes, ongeldige organisaties, ongeldige combinaties en pogingen om uitgesloten bedrijfsuitwerkingen aan overheid te koppelen. Uitvoeren: node beheer/controle_routes.cjs.
- Tabbladen en keuzegroepen met pijltjestoetsen, Home en End gecontroleerd; steeds precies één paneel zichtbaar. De terugknop bij een onvolledige keuze richt de focus op de ontbrekende vraag.
- Bestaande fragmentlinks openen het juiste paneel. De outputlink naar Blauwdruk en de link vanuit de producttour op Voorbeelden openen de bedoelde pagina.
- Alle drie panelen gecontroleerd op 320, 768 en 1440 pixels: geen horizontale pagina-overloop of elementen buiten de schermbreedte. Desktoproute en mobiele output visueel bekeken.
- JavaScript-syntaxcontrole geslaagd; geen browserfouten of waarschuwingen waargenomen.
- Tariefbron, onderzoeksdata, contactconfiguratie en CNAME zijn bytegelijk aan de vorige versie.
- Alleen openbare websitebronnen worden gepubliceerd. Het interne Wordbestand en geëxtraheerde brontekst staan buiten de website-map en uploadselectie.

De controle is geen volledige toegankelijkheidsaudit of fysieke apparaattest. De keuzehulp voert geen onderzoek uit en bepaalt geen advies buiten de getoonde vaste koppelingen. De beschikbaarheid van zelfstandige software blijft ongewijzigd.
