# Controle Variana — decoratieve pijlen verwijderd

## Wijziging van 2 november 2026 — decoratieve pijlen verwijderd

- Decoratieve pijlen zijn verwijderd uit knoppen, doorverwijsblokken, klikbare opties, systeemoverzichten en de onderzoeksverkenner. Volledige pijlspans zijn verwijderd, zodat er geen lege icoonruimte overblijft. CSS-pijlen en SVG-pijlpunten zijn verwijderd; gewone verbindingslijnen blijven behouden.
- De bijbehorende inspringing van de feature-lijsten en tussenruimte in het systeemoverzicht is aangepast. De vormgeving is verder niet heringericht.
- De linkbestemmingen van alle 23 gegenereerde inhoudspagina’s zijn gelijk aan de vorige versie. Er zijn geen lege pijlspans achtergebleven. Functionele menu-elementen blijven bestaan.
- Toetsenbordbesturing, native dropdown- en uitklapbediening, videobediening en de bestaande softwarebeelden blijven behouden. De contactvelden, Formspree-koppeling en modalwerking zijn niet gewijzigd.
- De build voor 23 inhoudsroutes en de statische controle van alle 47 HTML-bestanden zijn geslaagd. De 36 bestanden buiten de toegestane visuele wijzigingen zijn bytegelijk gebleven. De bronreview vond geen resterende zichtbare pijlglyphs of SVG-pijlmarkers en geen concrete implementatiefout.
- Lokaal in de browser gecontroleerd: de keuzehulp opent de contactmodal met het juiste onderwerp; Escape sluit het venster; de rechterpijltoets wisselt nog van B naar C. De systeemverkenner toont Marketing en de juiste detailpagina. Bij 320 pixels zijn er geen horizontale overloop of defecte afbeeldingen. De desktopweergave is visueel gecontroleerd. Er zijn geen testmails verstuurd.
- Controleer na publicatie de bijgewerkte blokken en knoppen op variana.nl met een volledig herladen pagina.

De onderdelen hieronder beschrijven eerdere wijzigingen en controles.

## Wijziging van 2 november 2026 — Formspree

- Deze versie gebruikt Formspree als verzenddienst. Het gedeelde contactformulier, de native modal, onderwerpselectie en de bestaande verplichte/optionele velden blijven behouden. Alleen de zichtbare providervermelding en privacyverwijzing in het formulier zijn naar Formspree aangepast.
- De transportcode accepteert uitsluitend een echte endpoint in de vorm https://formspree.io/f/ gevolgd door kleine letters en cijfers. De eigenaar heeft de echte endpoint https://formspree.io/f/xkjjpzyl aangeleverd. De koppeling is gepubliceerd en een echte testaanvraag is door de endpoint geaccepteerd en door de eigenaar in de mailbox ontvangen.
- De browser verstuurt een FormData-POST met Accept: application/json, CORS, credentials: omit en redirect: error. De browser bepaalt zelf de multipart-boundary. De timeout blijft 25 seconden, ook tijdens het lezen van de responsebody.
- De leesbare uitwerking gaat mee als Onderwerp en als subject voor de notificatie. De bronpagina wordt Bronpagina. Oude providerinstellingen _template en _honey en onbekende payloadvelden worden niet meegestuurd; de honeypot wordt vóór verzending door main.js gecontroleerd.
- Een succesvolle HTTP-response betekent acceptatie door Formspree. Een bekende JSON-errorsresponse wordt afgewezen, ook als de HTTP-status succesvol is. Acceptatie bewijst nog geen inboxaflevering. Fouten bewaren de invoer; de bestaande formulierbesturing blokkeert dubbele inzendingen en houdt een lopende aanvraag bij sluiten/heropenen ongewijzigd.
- Vijfentwintig transportgevallen met nagebootste requests zijn geslaagd, waaronder correcte payloadmapping, acceptatie, bekende foutresponses, afwijzende HTTP-status, netwerkfouten, timeout tijdens fetch en body, en ongeldige endpoints. Er is vanuit deze controles geen echte aanvraag verstuurd.
- De build voor 23 inhoudsroutes, 49 routecontroles, 47 URL-controles en 19 complete contactselecties is geslaagd. Alle 47 HTML-bestanden zijn statisch gecontroleerd; contactpagina en modal gebruiken precies hetzelfde formulier, één per pagina. De eigenaar heeft bevestigd dat het e-mailadres bij Formspree is geverifieerd en heeft de echte formulierendpoint aangeleverd. Een echte testaanvraag vanuit de live toepassingenmodal heeft de verzendbevestiging getoond. De eigenaar heeft ontvangst op info@variana.nl bevestigd; de pagina bleef op /toepassingen/#onderzoek en het venster bleef open.

De onderdelen hieronder zijn historische controles van eerdere versies en verzendpogingen. De eerdere FormSubmit-pogingen hebben geen door de eigenaar ontvangen activeringsmail of bewezen inboxaflevering opgeleverd. Historische technische controles zijn geen bewijs dat die koppeling werkte.

## Eerdere wijziging van 2 november 2026 — FormSubmit-verzendpoging

- Het gedeelde formulier op Contact en in de toepassingenmodal gebruikt nu Verstuur aanvraag. De browser verstuurt JSON rechtstreeks naar de FormSubmit-AJAX-endpoint voor info@variana.nl. De e-mailconcept- en lokale downloadafhandeling zijn verwijderd; de gewone directe e-maillink blijft beschikbaar.
- Naam en e-mailadres blijven verplicht; telefoonnummer en toelichting blijven optioneel. De leesbare gekozen uitwerking gaat mee als onderwerp. De gedeelde formulierbron, onderwerpallowlist en native modal blijven behouden.
- contact-delivery.js controleert HTTP-status, JSON en de bevestigde success-waarde. Een activatiemelding wordt als nog niet beschikbaar behandeld. Netwerk-, timeout- en andere fouten geven geen succesmelding. De timeout is 25 seconden; fetch gebruikt CORS en credentials: omit. Er worden geen geheime sleutels in de website opgenomen.
- De verzendknop en invoervelden worden tijdens verzending geblokkeerd. Sluiten en heropenen van de modal behouden het oorspronkelijke onderwerp en de status van een lopende aanvraag. Bij een fout blijft invoer staan; pas na bevestigde acceptatie door de dienst wordt persoonlijke invoer gewist.
- De honeypot blijft aanwezig. De integratie bevat geen instelling die de standaardcaptcha uitschakelt. De formuliertekst noemt FormSubmit als verzenddienst en verwijst naar het privacybeleid. Volgens de [officiële FormSubmit-documentatie](https://formsubmit.co/documentation) worden inzendingen dertig dagen bewaard.
- Zestien transportgevallen met nagebootste responses zijn geslaagd, waaronder bevestigde acceptatie, afwijzing, activatie, ongeldige responses, netwerkfout en timeout. Dit zijn technische controles en geen bewijs van aflevering van een echte aanvraag.
- De build voor 23 inhoudsroutes, 49 routecontroles, 47 URL-controles en 19 volledige contactselecties is geslaagd. Alle 47 HTML-bestanden zijn statisch gecontroleerd. Een lokale testserver met nagebootste verzenddienst bevestigt afwijzing met behoud van invoer, succesvol opnieuw versturen, blokkade tijdens verzending en sluiten/heropenen van de modal tijdens een lopende aanvraag. Er zijn twee gesimuleerde requests verstuurd zonder automatische herhalingen; zij bevatten het leesbare onderwerp, optioneel telefoonnummer en een bronadres zonder query of fragment.
- De gewone contactpagina behoudt de previewselectie en verplichte naam/e-mail, met optionele telefoon/toelichting. De downloadknop ontbreekt. De gedeelde formulierbron blijft identiek voor beide pagina's.
- De eigenaar moet de FormSubmit-activeringsmail op info@variana.nl bevestigen. Eigenaarsactivatie en daadwerkelijke ontvangst in de mailbox zijn nog niet geverifieerd. Livecontrole en activering worden afzonderlijk afgerond.

De onderdelen hieronder zijn historische controles van eerdere versies. Hun opmerkingen over e-mailconcepten en TXT-downloads beschrijven de eerdere werking en zijn niet meer van toepassing op het huidige formulier.

## Eerdere aanvulling van 2 november 2026 — formulier boven Toepassingen

- De knop in B en C heet Open het contactformulier en opent na een volledige selectie een native dialog boven de huidige toepassingenpagina. De normale contactlink blijft alleen als fallback bestaan.
- showModal maakt de achtergrond inert. Het venster heeft een benoemde sluitknop, een scrollbare inhoud en een vast zichtbare kop bij het scrollen in het formulier. De achtergrondscroll wordt tijdens het openen geblokkeerd.
- Kruisje en Escape sluiten het venster. Focus keert terug naar de activerende knop. Ingevulde tekst blijft bij sluiten en heropenen op dezelfde pagina behouden; de actuele keuze bepaalt opnieuw het onderwerp. Er wordt hoogstens één gegenereerde onderwerpoptie getoond.
- Contactpagina en dialog worden uit hetzelfde formulierfragment opgebouwd. Naam en e-mailadres blijven verplicht; telefoonnummer en toelichting blijven optioneel. E-mailconcept en lokale download behouden hun werking.
- De build voor 23 inhoudsroutes, 49 routecontroles, 47 URL-controles en 19 volledige contactselecties zijn geslaagd. Statische controle van 47 HTML-bestanden is geslaagd; het formulier is identiek op beide pagina's en komt op iedere pagina precies één keer voor. De bronreview vond geen concrete implementatiefout.
- Lokaal in de browser getest: B en C openen het native venster zonder adreswijziging. Een poging de tab in de achtergrond aan te klikken verandert de keuze niet. Het onderwerp wisselt van Blauwdruk & plan van aanpak naar Analyses zonder extra onderwerpopties; naamtekst blijft behouden. Kruisje en Escape sluiten, herstellen focus en heffen de scrollblokkade op.
- Een echte TXT-download vanuit de geopende modal met fictieve testinvoer is gecontroleerd: juiste onderwerp en optionele lege velden. Er is geen e-mail verstuurd. De gewone contactpagina blijft werken, inclusief onderwerp=preview.
- Bij 320 × 720 pixels past het venster binnen de schermbreedte, zonder horizontale overloop. Na scrollen naar de toelichting blijft de sluitknop in beeld. De livecontrole wordt afzonderlijk afgerond na publicatie.

## Eerdere wijziging van 2 november 2026 — doorverwijzing naar Contact

- Het veld heet E-mailadres. Naam en e-mailadres blijven verplicht; telefoonnummer en de toelichting bij het vraagstuk zijn optioneel. De toelichting heet Geef hier meer informatie over je vraagstuk.
- Telefoonnummer en toelichting worden opgenomen in zowel het e-mailconcept als het lokale aanvraagbestand. Lege of uitsluitend uit spaties bestaande optionele invoer wordt weergegeven als Niet ingevuld.
- De schermen B en C bieden na een volledige selectie Ga verder naar contact. Het onderwerp op de contactpagina wordt ingevuld met de precieze gekozen uitwerking. Een onvolledige selectie verbergt de knop en wist de oude link.
- De toegestane keuzehulp-onderwerpen worden uit de bestaande routegegevens gegenereerd. Een onbekende querywaarde voegt geen vrije tekst of optie toe; bestaande onderwerpverwijzingen en de URL-helper blijven werken.
- De build voor 23 inhoudsroutes is geslaagd. De bestaande 49 routecontroles en 47 URL-controles slagen. Alle 19 geldige complete selecties verwijzen naar het exacte contactonderwerp; publieke en offline contactlinks behouden onderwerp en formulieranker.
- Statische controle van alle 47 gegenereerde HTML-bestanden is geslaagd, inclusief interne bestanden, ankers, unieke IDs, metadata en ARIA-verwijzingen. Bestaande teksten buiten Contact, tarieven, routegegevens, stijlen en media zijn ongewijzigd.
- Lokaal in de browser getest: de knop in B geeft Blauwdruk & plan van aanpak door; de knop in C geeft Scenariovergelijking door; een gewijzigde onvolledige keuze wist beide links. Bestaande previewlinks en onbekende onderwerpwaarden behouden correct gedrag.
- Naam en e-mailadres blijven verplicht. Twee echte TXT-downloads met fictieve testinvoer bevestigen dat telefoon en toelichting leeg mogen blijven en dat een ingevuld telefoonnummer in de aanvraag terechtkomt. Er is geen e-mail verstuurd.
- De controle na publicatie wordt afzonderlijk afgerond.

## Eerdere controle — publieke adressen zonder .html

Deze wijziging geeft de bestaande website adressen zonder .html. De producttekst, desktopdemonstratie, screenshots, tarieven en opdrachtomschrijvingen blijven inhoudelijk behouden.

## Beoogd URL-gedrag

- De homepage opent op /; de overige 22 inhoudspagina’s openen op een eigen pad met afsluitende slash, bijvoorbeeld /software/, /toepassingen/ en /hoe-het-werkt/.
- Iedere paginamap bevat een volledige index.html. De hoofdmap behoudt volledige .html-versies voor oude links en offline bekijken; het vroegere software/index.html is nu ook een volledige pagina.
- Bij HTTP(S) zet een vroeg script een oud bestandsadres of een expliciet /slug/index.html om naar het publieke adres met location.replace. De query en het fragment blijven behouden; de homepage op / veroorzaakt geen doorverwijslus.
- /voorbeelden.html en /voorbeelden/ verwijzen naar /#opdrachten. De query blijft behouden; een oud sectieanker wordt vervangen door #opdrachten.
- Statische interne links en de dynamische links van beide interactieve schermen gebruiken de publieke adressen. Fragmentlinks binnen dezelfde pagina, externe links en e-mailadressen blijven hun eigen werking behouden.
- Canonical- en og:url-verwijzingen gebruiken https://variana.nl met het publieke pad. De build past assetpaden aan voor de paginamappen, waaronder scripts, afbeeldingen, video, captions en posterbeelden.
- De URL-helper wordt vóór de overige paginascripts geladen. Bij file:// verwijst hij paginalinks naar de echte .html-bestanden in de hoofdmap. De .html-verwijzingen in beheerbronnen, metadata en routegegevens blijven daarvoor behouden.
- De compatibiliteit berust op browserdoorverwijzingen en is geen HTTP 301-configuratie. Zonder JavaScript hebben oude bestandsadressen een beperkte fallback, zonder volledige garantie op behoud van query en fragment. Het expliciete /index.html kan dan in de adresbalk blijven staan: GitHub Pages serveert voor / en /index.html hetzelfde bestand.

## Uitgevoerde controles van deze URL-wijziging

- De build is succesvol uitgevoerd voor 23 publieke inhoudsroutes, hun compatibele bestandsversies en de twee Voorbeelden-aliases.
- node beheer/controle_urls.cjs slaagt met 47 URL-controles. De controle omvat publieke en offline links, queryparameters, fragmenten, oude adressen en uitzonderingen die niet herschreven mogen worden.
- node beheer/controle_routes.cjs slaagt met de bestaande 49 routecontroles voor de A/B/C-keuzehulp, overheidsuitsluitingen en de interne blauwdruk vóór specialistische uitwerkingen.
- De statische controle is geslaagd voor 23 inhoudsroutes en 47 HTML-bestanden in de publicatieselectie van 112 tracked bestanden. Interne bestanden en ankers, unieke IDs, H1, metabeschrijvingen, ARIA-verwijzingen en assetpaden zijn gecontroleerd. De vergelijking van 46 beschermde bestanden is eveneens geslaagd.

## Lokale browsercontrole van deze URL-wijziging

- /index.html opent op / met behoud van query en fragment. De menuoptie Software opent /software/; ook herladen op dat adres werkt.
- /software/index.html normaliseert naar /software/ met behoud van query en fragment.
- /contact.html normaliseert naar /contact/ en behoudt onderwerp=preview; de formulieroptie voor een productpreview wordt geselecteerd. De waarde software.html in een queryparameter wordt niet herschreven.
- De Voorbeelden-alias opent /#opdrachten en behoudt de query.
- De dynamische links van de systeemverkenner openen /blauwdruk/ en /marketing/. Bij Overheidsorganisatie met de overzichtsvraag verwijst de link in B van de keuzehulp naar /blauwdruk/.
- De softwarepagina heeft geen defecte afbeeldingen. De MP4-metadata meldt 31,33 seconden en de juiste videobron wordt geladen.

## Grenzen van de controle en publicatie

- De offline URL-helper is met de 47 URL-controles getest; file:// is niet opnieuw in een browser getest.
- Deze ronde bevat geen nieuwe volledige afspeeltest, ondertitelingscontrole of responsive test. De eerdere productcontroles hieronder zijn als historisch bewijs opgenomen.
- De live publicatie wacht nog op afronding. Daarna worden de schone adressen op variana.nl, bestaande gedeelde links en de actuele GitHub Pages-publicatie gecontroleerd.

De controles hieronder beschrijven de eerdere productpresentatie vóór deze URL-wijziging.

## Behouden productpresentatie

- De hero gaat over een onderbouwde keuze vanuit een complexe vraag. De inhoud verbindt analyses aan inzicht, de blauwdruk aan samenhang en aanpak, en specialistische uitwerkingen aan concrete afwegingen.
- Eén statusvermelding bovenaan en een beschikbaarheidstoelichting onderaan geven aan dat de zelfstandige software wordt ontwikkeld. De afbeeldingen en uitkomstentabel herhalen deze melding niet telkens.
- De homepage en softwarehero tonen een fictief vraagstuk dat is ingevuld in de echte blauwdrukmodule. De projectomgeving toont hetzelfde bewaarde fictieve concept.
- De video variana-concept-rondleiding-nl.mp4 duurt circa 31 seconden en is gemonteerd uit zeven echte schermopnamen van de desktopapp. De speler heeft bediening, een posterbeeld en Nederlandse captions uit het bijbehorende .vtt-bestand.
- De rondleiding toont modulekeuze, invoer van het fictieve Horizon Fietsservice-vraagstuk, lokaal bewaren als concept en terugvinden in de eigen projectomgeving. Er is geen onderzoek uitgevoerd en er wordt geen gegenereerde eindblauwdruk gepresenteerd.
- De nieuwe screenshots blauwdruk-concept-nl.png en project-concept-nl.png zijn 1536 × 816 pixels. Het bestaande moduleoverzicht blijft zichtbaar; oudere afbeeldingen blijven als bronbestanden behouden.
- De opname bevat geen bestaande herkenbare klantprojecten of private dossier-, test- of instellingenbeelden. Private bron- en opnamebestanden vallen buiten de uploadselectie.
- Het fictieve concept blijft in de lokale app bewaard. De desktopbroncode is voor de presentatie niet veranderd.
- De uitleg over lokaal werken noemt regie, continuïteit van onderzoekscontext en lokale AI als ontwikkelrichting. Zij bevat geen garantie dat alle functies offline werken, gegevens altijd lokaal blijven of bepaalde beveiliging wordt geboden.
- De productpreview blijft bereikbaar via /contact/?onderwerp=preview. Het formulier bereidt een e-mailconcept of lokaal aanvraagbestand voor en verstuurt niet automatisch.
- De navigatie komt op alle inhoudspagina’s uit dezelfde headerfunctie. Software staat tussen Hoe het werkt en Voor wie; een afwijkende oude weergave wordt eerst op caching onderzocht.
- Tarieven, vijf opdrachtomschrijvingen, de A/B/C-keuzehulp, blauwdruklogica en overheidsfilters behouden hun inhoud en gedrag.

## Eerdere bron- en bouwcontroles van de productpresentatie

- Vóór deze URL-wijziging zijn de bouw en statische controle van 23 inhoudspagina’s en twee doorverwijzingen geslaagd: de toenmalige 25 HTML-bestanden zijn gecontroleerd op interne bestanden, ankers, unieke IDs, H1, metabeschrijvingen en ARIA-verwijzingen.
- De beschermde bestaande bestanden zijn ongewijzigd volgens de statische vergelijking.
- De aangescherpte softwarebron behoudt de bestaande sectieankers; herhaalde beeldbadges en statusrijen zijn vervangen door een uitkomstgerichte toelichting.
- De gemaakte opname toont de echte app, met een fictief concept en zonder gestarte onderzoeksuitvoering. De nieuwe screenshots tonen conceptinvoer en projectvoorbereiding.

## Eerdere lokale browsercontrole van de productpresentatie

- Video afspelen getest tot het einde: 31,33 seconden, 1536 × 816 pixels, geen afspeelfout; Nederlandse captions staan aan. Alle zeven opgenomen scènes zijn gecontroleerd op uitsluitend algemene of fictieve inhoud. Het projectoverzicht met een bestaand klantproject is niet opgenomen.
- Twee nieuwe onbewerkte screenshots van de echte interface gecontroleerd; de invoer en projectomgeving hebben de status concept en passende onderschriften.
- Homepage, Software en Hoe het werkt getest op 320, 768 en 1440 pixels: geen horizontale overloop of mislukte geladen afbeeldingen. De videospeler schaalt binnen de schermbreedte.
- In de software-inhoud staat precies één productstatus bovenaan; de beschikbaarheidstoelichting staat onderaan. Herhaalde beeldbadges en propositiekaarten op deze productpagina zijn verwijderd.
- Bestaande preview- en formuliercode is ongewijzigd. Er is geen aanvraag verstuurd.
- Software staat in de gedeelde hoofdnavigatie van alle drie geteste pagina’s. De live navigatie en deployment worden afzonderlijk gecontroleerd na publicatie.
- Interactiecode, routegegevens en tarieven zijn bytegelijk aan de vorige versie. De vijf opdrachten inclusief de internationale juridische organisatie blijven behouden.
- Uploadselectie bevat alleen websitebronnen, twee neutrale conceptscreenshots, het MP4-bestand en captions. Desktopcode, private dossiers, tijdelijke frames, runtimehulpmiddelen en broninventaris worden niet gepubliceerd.

Deze controle is geen volledige toegankelijkheidsaudit of fysieke apparaattest.
