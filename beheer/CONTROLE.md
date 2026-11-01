# Controle Variana — publieke adressen zonder .html

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
