# Controle Variana — 31 oktober 2026

Deze wijziging vervangt de onderzoeksverkenner op Toepassingen door de gevraagde A/B/C-keuzehulp.

## Gedrag

- Kolom A bevat de drie opgegeven vragen.
- Kolom B bevat Analyses, Blauwdruk en Specialistische modules.
- De drie vragen koppelen in dezelfde volgorde aan deze outputs.
- Eén A-keuze is actief. Bij wisselen worden de bijbehorende B-tegels gemarkeerd en vervalt de vorige selectie.
- Kolom C heeft uitsluitend zijn titel en een lege ruimte. Er zijn geen modules, onderzoeken of placeholderteksten ingevuld.
- De datakoppeling voor latere C-inhoud bestaat al via modules en moduleIds.
- De outputtegels linken naar de bestaande uitlegpagina’s.
- De oorspronkelijke fictieve onderzoeksdata en bijbehorende code blijven bewaard, maar worden niet meer op Toepassingen geladen.
- Verwijzingen naar de oude onderzoekskaart zijn bijgewerkt naar de keuzehulp.

## Controles

- Alle 23 pagina’s succesvol gebouwd en statisch gecontroleerd op interne bestanden, ankers, unieke IDs, H1, metabeschrijving en ARIA-verwijzingen.
- Alle drie keuzes met de muis getest: precies één geselecteerde vraag en één passende output; C blijft leeg.
- Home en pijltjestoetsbediening gecontroleerd, inclusief focus en meeveranderende output.
- Toepassingen op 320, 768 en 1440 pixels gecontroleerd: selectie werkt en geen horizontale pagina-overloop.
- De B-link naar Blauwdruk opent de juiste eigen pagina.
- De bijgewerkte producttour op Voorbeelden verwijst naar de nieuwe keuzehulp.
- JavaScript-syntaxcontrole geslaagd; geen browserfouten of waarschuwingen waargenomen.
- Tariefbron, onderzoeksdata, contactconfiguratie en CNAME zijn ongewijzigd.

De controle is geen volledige toegankelijkheidsaudit of fysieke apparaattest. De keuzehulp voert geen onderzoek uit en bepaalt geen advies buiten de getoonde vaste koppelingen.
