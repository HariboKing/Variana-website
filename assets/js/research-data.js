/* Generated from beheer/demonstraties.json. No runtime fetch. */
window.VARIANA_RESEARCH_DEMOS = {
  "schemaVersion": 1,
  "categories": {
    "strategie": "Strategie & Beleid",
    "ontwikkeling": "Ontwikkeling",
    "marketing": "Marketing",
    "evaluatie": "Evaluatie & Beslisondersteuning"
  },
  "defaultCase": "industriele-groei",
  "cases": [
    {
      "id": "industriele-groei",
      "category": "strategie",
      "title": "Internationale groeistrategie voor een industriële onderneming",
      "shortTitle": "Internationale groei onderzoeken",
      "subtitle": "Een fictieve producent van modulaire meetkasten voor industriële installaties verkent uitbreiding naar Duitsland, Denemarken en Oostenrijk.",
      "executionStatus": "not_executed",
      "methodologyStatus": "illustrative_unconfirmed",
      "inputNotice": "De organisatie, haar uitgangssituatie en de opdracht hieronder zijn speciaal voor deze demonstratie bedacht. Er is geen klantcasus gebruikt.",
      "brief": "Onderzoek voor een fictieve producent van modulaire meetkasten voor industriële installaties welke internationale groeiroutes nader moeten worden beoordeeld voor Duitsland, Denemarken en Oostenrijk.\n\nDe bedachte organisatie heeft een productielocatie in Nederland en wil zowel commerciële mogelijkheden als de gevolgen voor productie, levering en ondersteuning onderzoeken. Mogelijke routes om te onderzoeken zijn samenwerking met een lokale kanaalpartner en een eigen verkooporganisatie. Dit zijn demonstratie-inputs, geen aanbevolen strategieën.\n\nBreng de vragen over klanttoepassingen, concurrentie, externe eisen, stakeholders, capaciteit, logistiek, investeringsbehoefte en financiering met elkaar in verband. Laat zien welke informatie andere analyses nodig hebben en wanneer een herbeoordeling vereist zou zijn.\n\nMaak uiteindelijk zichtbaar welke beslisinformatie onderbouwd kan worden en welke aannames en onzekerheden openblijven. Voor deze website is dat onderzoek nog niet uitgevoerd. Er zijn geen marktgegevens, financiële berekeningen, onderzoeksbevindingen of aanbevelingen beschikbaar.",
      "inputFacts": [
        {
          "label": "Organisatie",
          "value": "Fictieve industriële producent; speciaal voor deze website bedacht."
        },
        {
          "label": "Beoogde scope",
          "value": "Drie landen, één af te bakenen productlijn en mogelijke verkooproutes."
        },
        {
          "label": "Beslissing",
          "value": "Welke groeiroutes moeten worden onderzocht en welke informatie is nodig vóór een toetredingsbesluit?"
        },
        {
          "label": "Randvoorwaarden",
          "value": "Productie, levering, ondersteuning, benodigde investeringen en financiering moeten in samenhang worden bekeken."
        }
      ],
      "missingInputs": [
        "Gevalideerde productspecificaties, capaciteit- en procesgegevens.",
        "Gecontroleerde informatie over markten, concurrenten, stakeholders en relevante externe eisen.",
        "Afgesproken besliscriteria en gegevens voor eventuele financiële uitwerking.",
        "Een daadwerkelijk uitgevoerd Variana-onderzoek met gecontroleerde output."
      ],
      "modules": [
        {
          "id": "concept",
          "title": "Concept & afbakening",
          "group": 0,
          "purpose": "Bepalen welke uitbreiding wordt onderzocht en welke beslissing het onderzoek moet ondersteunen.",
          "questions": [
            "Welke productlijn en klanttoepassing vallen binnen de uitbreiding?",
            "Wat betekent internationale groei in deze opdracht: markttoetreding, verkoopkanaal of lokale aanwezigheid?",
            "Welke uitgangspunten zijn randvoorwaarden en welke zijn nog aannames?"
          ],
          "plannedApproach": [
            "De demonstratie-input omzetten naar een afgebakende beslisvraag.",
            "Begrippen, scope en uitsluitingen expliciet vastleggen.",
            "Aannames apart registreren van beschikbare informatie."
          ],
          "requiredInputs": [
            "De fictieve briefing",
            "Voor een echte uitvoering: productscope, ambities en besluitcriteria"
          ],
          "dependsOn": [],
          "expectedContribution": "Een gedeeld begrippen- en afbakeningskader voor alle vervolgonderdelen.",
          "reviewTriggers": [
            "Een andere productscope",
            "Gewijzigde doelstellingen of randvoorwaarden"
          ],
          "appliedMethods": [],
          "executionStatus": "not_executed"
        },
        {
          "id": "probleem",
          "title": "Probleemanalyse",
          "group": 0,
          "purpose": "De groeivraag ontleden in samenhangende deelvragen en informatiebehoeften.",
          "questions": [
            "Welke onzekerheid belemmert een markttoetredingsbesluit?",
            "Hoe hangen commerciële, operationele en financieringsvragen samen?",
            "Welke deelvragen moeten eerst worden beantwoord om andere te kunnen beoordelen?"
          ],
          "plannedApproach": [
            "Een probleemstructuur met deelvragen opstellen.",
            "Per deelvraag aangeven welke informatie nodig is.",
            "Afhankelijkheden tussen deelvragen expliciet maken."
          ],
          "requiredInputs": [
            "Afbakening en uitgangspunten",
            "Voor een echte uitvoering: een gevalideerde probleemomschrijving"
          ],
          "dependsOn": [
            "concept"
          ],
          "expectedContribution": "Een onderzoeksstructuur waarin zichtbaar is welke vragen elkaar beïnvloeden.",
          "reviewTriggers": [
            "Een ontbrekende beslisvraag",
            "Een onhoudbaar gebleken uitgangspunt"
          ],
          "appliedMethods": [],
          "executionStatus": "not_executed"
        },
        {
          "id": "stakeholders",
          "title": "Stakeholders & eisen",
          "group": 0,
          "purpose": "Onderzoeken welke betrokkenen, belangen en eisen van betekenis zijn voor de uitbreiding.",
          "questions": [
            "Welke klantrollen, kanaalpartners en interne teams moeten worden betrokken?",
            "Welke eisen aan product, service en ondersteuning moeten worden vastgesteld?",
            "Waar kunnen belangen of verantwoordelijkheden botsen?"
          ],
          "plannedApproach": [
            "Relevante rollen en informatiebehoeften inventariseren.",
            "Eisen en verwachtingen per rol van elkaar onderscheiden.",
            "Vastleggen welke verwachtingen nog niet zijn getoetst."
          ],
          "requiredInputs": [
            "Deelvragen en productscope",
            "Voor een echte uitvoering: informatie over betrokken partijen en hun eisen"
          ],
          "dependsOn": [
            "concept",
            "probleem"
          ],
          "expectedContribution": "Informatie over belangen en eisen die de markt-, capaciteits- en scenarioanalyse moet kunnen gebruiken.",
          "reviewTriggers": [
            "Nieuwe belanghebbenden",
            "Nieuwe of gewijzigde gebruikseisen"
          ],
          "appliedMethods": [],
          "executionStatus": "not_executed"
        },
        {
          "id": "omgeving",
          "title": "Omgeving & externe ontwikkelingen",
          "group": 1,
          "purpose": "Vaststellen welke externe omstandigheden en relevante eisen moeten worden onderzocht.",
          "questions": [
            "Welke externe ontwikkelingen zijn relevant voor de drie voorgestelde landen?",
            "Welke product-, contract- of uitvoeringseisen moeten worden nagegaan?",
            "Welke informatie is actueel, controleerbaar en passend bij de gekozen productlijn?"
          ],
          "plannedApproach": [
            "De omgevingsvragen per land op dezelfde scope afbakenen.",
            "Bij verzamelde informatie herkomst, geldigheid en beperkingen vastleggen.",
            "Aangeven welke externe factoren doorwerken in andere onderdelen."
          ],
          "requiredInputs": [
            "Productspecificatie en gekozen landen",
            "Voor een echte uitvoering: gecontroleerde externe bronnen"
          ],
          "dependsOn": [
            "probleem"
          ],
          "expectedContribution": "Gecontroleerde omgevingsinformatie voor de marktbeoordeling, risicoanalyse en scenario’s.",
          "reviewTriggers": [
            "Een wijziging in een relevante randvoorwaarde",
            "Nieuwe informatie die de afbakening raakt"
          ],
          "appliedMethods": [],
          "executionStatus": "not_executed"
        },
        {
          "id": "markt",
          "title": "Markt & concurrentie",
          "group": 1,
          "purpose": "De commerciële onderzoeksvragen per land op een vergelijkbare basis behandelen.",
          "questions": [
            "Hoe moeten mogelijke toepassingen en klantsegmenten per land worden afgebakend?",
            "Welke alternatieve aanbieders en kanalen zijn relevant om te onderzoeken?",
            "Welke informatie is nodig om landen te vergelijken zonder ontbrekende gegevens te verhullen?"
          ],
          "plannedApproach": [
            "Eén vergelijkingskader voor de drie landen voorbereiden.",
            "Informatie, aannames en onbeantwoorde vragen gescheiden houden.",
            "De aansluiting op betrokken partijen en externe eisen controleren."
          ],
          "requiredInputs": [
            "Omgevingsvragen",
            "Stakeholder- en kanaaleisen",
            "Voor een echte uitvoering: gecontroleerde markt- en concurrentiegegevens"
          ],
          "dependsOn": [
            "omgeving",
            "stakeholders"
          ],
          "expectedContribution": "Een onderbouwde marktbeoordeling waarop scenario’s kunnen voortbouwen; nu nog niet beschikbaar.",
          "reviewTriggers": [
            "Nieuwe omgevingsinformatie",
            "Afwijkende klant- of kanaaleisen",
            "Onvoldoende vergelijkbare informatie"
          ],
          "appliedMethods": [],
          "executionStatus": "not_executed"
        },
        {
          "id": "capaciteit",
          "title": "Capaciteit & logistiek",
          "group": 1,
          "purpose": "De operationele voorwaarden voor mogelijke uitbreidingsroutes onderzoeken.",
          "questions": [
            "Welke productiestappen en capaciteitsgrenzen moeten in beeld worden gebracht?",
            "Welke gevolgen hebben verkoopkanalen voor levering, service en ondersteuning?",
            "Welke gegevens zijn nodig om investerings- en financieringsvragen verantwoord uit te werken?"
          ],
          "plannedApproach": [
            "Afhankelijkheden tussen productie, levering en ondersteuning beschrijven.",
            "Operationele informatiebehoeften koppelen aan mogelijke groeiroutes.",
            "Ontbrekende gegevens voor latere berekeningen expliciet benoemen."
          ],
          "requiredInputs": [
            "Productspecificatie en eisen van betrokkenen",
            "Voor een echte uitvoering: gevalideerde capaciteit-, kosten- en procesgegevens"
          ],
          "dependsOn": [
            "probleem",
            "stakeholders"
          ],
          "expectedContribution": "Operationele randvoorwaarden voor scenario’s, risico’s en realisatieplanning; geen berekeningen in deze demonstratie.",
          "reviewTriggers": [
            "Gewijzigde capaciteit of service-eisen",
            "Een andere kanaal- of uitbreidingsroute"
          ],
          "appliedMethods": [],
          "executionStatus": "not_executed"
        },
        {
          "id": "scenario",
          "title": "Strategische scenario’s",
          "group": 2,
          "purpose": "Mogelijke groeiroutes pas beoordelen op basis van onderling verbonden onderzoeksinformatie.",
          "questions": [
            "Welke routes kunnen met dezelfde besliscriteria worden vergeleken?",
            "Welke voorwaarden bepalen de uitvoerbaarheid per route?",
            "Waar verandert de afweging als een belangrijke aanname niet houdbaar blijkt?"
          ],
          "plannedApproach": [
            "Uitgangspunten van te vergelijken routes expliciet vastleggen.",
            "Onderbouwing uit markt- en operationele onderdelen verbinden.",
            "Onzekerheden en voorwaarden bij iedere afweging zichtbaar houden."
          ],
          "requiredInputs": [
            "Gecontroleerde marktbeoordeling",
            "Operationele randvoorwaarden",
            "Voor een echte uitvoering: overeengekomen besliscriteria"
          ],
          "dependsOn": [
            "markt",
            "capaciteit"
          ],
          "expectedContribution": "Een samenhangende scenarioafweging; er zijn nog geen scenario-uitkomsten of voorkeuren vastgesteld.",
          "reviewTriggers": [
            "Een herziene marktbeoordeling",
            "Een gewijzigde operationele randvoorwaarde"
          ],
          "appliedMethods": [],
          "executionStatus": "not_executed"
        },
        {
          "id": "risico",
          "title": "Risico’s & afhankelijkheden",
          "group": 2,
          "purpose": "Onderzoeken welke onzekerheden en afhankelijkheden een scenario of besluit kunnen veranderen.",
          "questions": [
            "Welke kritische afhankelijkheden komen in meerdere onderzoeksdelen terug?",
            "Welke aannames zijn bepalend voor een route en moeten nader worden getoetst?",
            "Welke informatie is nodig voordat risico’s of financiële consequenties verantwoord worden beoordeeld?"
          ],
          "plannedApproach": [
            "Onzekerheden verbinden met de onderdelen waarop zij invloed hebben.",
            "Aannames en ontbrekende onderbouwing bij elkaar brengen.",
            "Terugkoppeling organiseren wanneer een beoordeling herzien moet worden."
          ],
          "requiredInputs": [
            "Scenario-uitgangspunten",
            "Externe en operationele randvoorwaarden",
            "Voor een echte uitvoering: gecontroleerde risico-informatie"
          ],
          "dependsOn": [
            "omgeving",
            "capaciteit",
            "scenario"
          ],
          "expectedContribution": "Een traceerbaar overzicht van onzekerheden en afhankelijkheden, nog zonder risicoscores of conclusies.",
          "reviewTriggers": [
            "Een onvoldoende onderbouwde aanname",
            "Een conflict tussen onderzoeksdelen"
          ],
          "appliedMethods": [],
          "executionStatus": "not_executed"
        },
        {
          "id": "realisatie",
          "title": "Realisatie & beslisinformatie",
          "group": 2,
          "purpose": "Onderzoeksinformatie vertalen naar een bespreekbaar besluit en eventueel een uitvoeringsplan.",
          "questions": [
            "Welke beslispunten kunnen na onderzoek worden geformuleerd?",
            "Welke voorwaarden moeten zijn vervuld vóór uitvoering?",
            "Welke activiteiten, verantwoordelijkheden en financiële gegevens moeten voor een realisatieplan worden uitgewerkt?"
          ],
          "plannedApproach": [
            "Bevindingen en afwegingen verbinden aan de oorspronkelijke beslisvraag.",
            "Voorwaarden en resterende onzekerheden in het vervolg laten terugkomen.",
            "Een plan pas uitwerken voor zover de onderbouwing en opdracht dat toelaten."
          ],
          "requiredInputs": [
            "Gecontroleerde scenario- en risicoanalyse",
            "Voor een echte uitvoering: bevestigde keuzes en planningsgegevens"
          ],
          "dependsOn": [
            "scenario",
            "risico"
          ],
          "expectedContribution": "Besluitvormingsinformatie en mogelijke planonderdelen; er is nog geen adviesrapport of bedrijfsplan beschikbaar.",
          "reviewTriggers": [
            "Herziene scenario’s of risico’s",
            "Gewijzigde opdracht of besluitcriteria"
          ],
          "appliedMethods": [],
          "executionStatus": "not_executed"
        }
      ],
      "graphGroups": [
        "Afbakening & betrokkenen",
        "Onderzoekslijnen",
        "Afweging & realisatie"
      ],
      "loops": [
        {
          "id": "externe-wijziging",
          "title": "Een externe randvoorwaarde verandert",
          "nodes": [
            "omgeving",
            "markt",
            "scenario"
          ],
          "back": [
            "scenario",
            "omgeving"
          ],
          "description": "Als gecontroleerde omgevingsinformatie een randvoorwaarde wijzigt, kan de marktbeoordeling herziening vragen. Dat kan doorwerken in een scenario en nieuwe omgevingsvragen oproepen. Dit is een procesroute, geen bevinding uit deze casus."
        },
        {
          "id": "capaciteitsvraag",
          "title": "Een capaciteitsaanname moet worden herzien",
          "nodes": [
            "capaciteit",
            "scenario",
            "risico"
          ],
          "back": [
            "risico",
            "capaciteit"
          ],
          "description": "Als een operationele aanname onvoldoende onderbouwd blijkt, moet worden nagegaan welke scenario’s en risicoafwegingen daarvan afhankelijk zijn. Een herbeoordeling kan aanvullende informatie over capaciteit vereisen. Er is hier geen capaciteitstekort vastgesteld."
        },
        {
          "id": "scopevraag",
          "title": "Onderzoeksdelen blijken niet aan te sluiten",
          "nodes": [
            "probleem",
            "stakeholders",
            "markt"
          ],
          "back": [
            "markt",
            "probleem"
          ],
          "description": "Als scope, definities of eisen tussen onderzoeksdelen uiteenlopen, kan de probleemafbakening opnieuw aandacht vragen. Pas na afstemming kunnen de betreffende analyses op dezelfde basis verder. Dit is een illustratie van een controlepunt."
        }
      ],
      "outputSlots": [
        {
          "title": "Analysefragmenten",
          "detail": "Uitgevoerde analyses met bronverwijzingen en beperkingen."
        },
        {
          "title": "Vergelijkingen & scenario’s",
          "detail": "Werkelijke beoordelingskaders en onderbouwde scenarioafwegingen."
        },
        {
          "title": "Conclusies & beslispunten",
          "detail": "Gecontroleerde conclusies met herleidbare onderbouwing."
        },
        {
          "title": "Rapportages & plannen",
          "detail": "Gecontroleerde rapport- of planfragmenten uit het onderzoek."
        },
        {
          "title": "Bronnen & onzekerheden",
          "detail": "Het echte brondossier en de daarbij vastgelegde aannames en onzekerheden."
        }
      ],
      "outputs": [],
      "sources": [],
      "findings": []
    }
  ]
};
