# Onderzoeksdemonstraties onderhouden

De enige inhoudsbron is `beheer/demonstraties.json`. Voer na wijzigen vanuit de website-map `python beheer/build.py` uit. Dit maakt gewone HTML en een klassiek JavaScript-gegevensbestand. Er is tijdens het bekijken geen fetch, build of server vereist. Alle beheerbestanden worden meegeleverd: sla hier uitsluitend openbaar deelbare gegevens op, ook wanneer ze nog niet in de interface worden weergegeven.

## Huidige status

Er is één nieuw bedachte fictieve invoer, geen klantcasus en geen uitgevoerd onderzoek. `executionStatus` is `not_executed`; `methodologyStatus` is `illustrative_unconfirmed`. Alle modules zijn `not_executed`; hun `appliedMethods` zijn leeg. `outputs`, `sources` en `findings` zijn leeg. De deelvragen, voorgenomen aanpak, afhankelijkheden en voorwaardelijke feedbackroutes zijn een illustratieve website-opzet. Zij zijn geen verslag van werkelijk onderzoek.

## Opbouw

| Veld | Gebruik |
| --- | --- |
| `categories` | Vier toepassingsgebieden, met stabiele sleutels en zichtbare namen |
| `defaultCase` | ID van de standaardcasus |
| `cases` | Onderzoeken; een keuze verschijnt automatisch bij meer dan één |
| `id`, `category`, `title`, `subtitle` | Identiteit en presentatie van een casus |
| `inputNotice`, `brief`, `inputFacts`, `missingInputs` | Herkomst, oorspronkelijke vraag, beschikbare en ontbrekende input |
| `modules` | Onderzoeksstappen, deelvragen, benodigde informatie, voorgenomen aanpak en later werkelijk toegepaste methoden |
| `dependsOn` | Module-ID’s waarvan het onderdeel informatie nodig heeft |
| `expectedContribution`, `reviewTriggers` | Voorgenomen bijdrage en mogelijke aanleiding voor herbeoordeling |
| `graphGroups`, moduleveld `group` | Kolommen in de kaart; groepsindex begint bij nul |
| `loops` | Voorwaardelijke terugkoppelroutes; `nodes` bevat module-ID’s en `back` precies twee ID’s: van en naar |
| `outputSlots` | Duidelijk als toekomstig aangeduide soorten output, geen onderzoeksresultaten |
| `outputs`, `sources`, `findings` | Alleen werkelijk uitgevoerde, gecontroleerde, voor publicatie vrijgegeven inhoud |

Gebruik voor casus- en module-ID’s kleine letters, cijfers en koppeltekens. De bestaande dataset laat het complete schema zien. Voeg een casus aan `cases` toe en gebruik één van `strategie`, `ontwikkeling`, `marketing` of `evaluatie`. De interface hoeft hiervoor niet opnieuw te worden gebouwd. Gebruik ten minste één module en één begrijpelijke terugkoppelroute; laat een bevoegde inhoudelijke reviewer de structuur aan het werkelijke dossier toetsen.

## Echte onderzoeksoutput toevoegen

1. Voer het onderzoek daadwerkelijk met Variana uit. Neem de echte stappen, methoden, bronverwijzingen, aannames, onzekerheden en herbeoordelingen over uit het gecontroleerde dossier. De website voert geen onderzoek uit.
2. Controleer inhoud en rechten voor openbare presentatie. Plaats geen intern rapport, klantgegevens of ongecontroleerde tussenresultaten in deze website-map. Ook de JSON en beheerbron zijn openbaar deelbaar.
3. Gebruik voor een uitgevoerd dossier `executed_review_pending` zolang controle loopt, en `reviewed` wanneer het is gecontroleerd. Stel `methodologyStatus` uitsluitend op `verified` wanneer de methodologie is bevestigd. Werk module-statussen bij; `completed` geeft een uitgevoerde module aan. Vul `appliedMethods` uitsluitend met echt toegepaste methoden. Pas de zichtbare introductie en statusuitleg in `beheer/paginas/voorbeelden.html` en `research_renderer.py` aan wanneer de tijdelijke opzet wordt vervangen door een uitgevoerd dossier.
4. Elk item in `outputs`, `sources` en `findings` vereist `id`, `title` en `reviewStatus: approved`. Dit is een publicatiegoedkeuring; het is geen vervanging voor feitelijke controle. Koppel met `moduleIds` aan bestaande modules en met `sourceIds` aan bestaande bronnen.
5. Plaats een lokaal onderzoeksbestand onder `assets/research/`. Een outputitem vereist `path` naar een bestaand bestand, plus zo nodig `description`, `moduleIds` en `sourceIds`. Gebruik bijvoorbeeld gecontroleerde, toegankelijke HTML-fragmenten met relatieve links. De huidige lege opzet bevat geen voorbeeldrapport of verzonnen outputrecords.
6. Een bronitem kan een lokale `path` onder `assets/research/`, een echte `url` met HTTP(S) en/of een bibliografische `note` bevatten. Online bronnen zijn als online gemarkeerd; een internetverbinding is alleen nodig als de bezoeker die externe bron opent. Controleer lokale bronpaden handmatig.
7. Een bevinding kan `text`, `uncertainties`, `moduleIds` en `sourceIds` bevatten. Neem onderbouwing, aannames en beperkingen ook in het gekoppelde onderzoeksbestand op. De interface toont goedgekeurde bevindingen zodra goedgekeurde outputbestanden beschikbaar zijn.
8. Regeneer de site en controleer statuslabels, modulekoppelingen, bronlinks en bestanden op desktop, mobiel en met toetsenbord. Pas de documentatie aan en maak de ZIP opnieuw.

De generator weigert resultaten bij een niet-uitgevoerde casus, onbevestigde toegepaste methoden, onbekende module- of bronverwijzingen, niet-goedgekeurde records en ontbrekende outputbestanden. De generator kan niet bewijzen dat onderzoek echt is uitgevoerd of inhoudelijk juist is: daarvoor blijft dossiercontrole nodig.
