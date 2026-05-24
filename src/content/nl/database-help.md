# Hulp bij databasebeheer

Op deze helppagina vindt u informatie over het databasebeheer en hoe u dit effectief kunt gebruiken.

## Vermeldingen bewerken

Klik op het potlood linksonder bij een vermelding om deze te bewerken.
U kunt nu elk veld wijzigen, de vermelding verwijderen, uw wijzigingen opslaan of verwerpen.

## Waarschuwingen

Sommige vermeldingen tonen de waarschuwingen:

"Deze vermelding heeft geen contactgegevens!"

of

"Deze vermelding heeft geen geodata!"

Deze waarschuwing geeft aan dat de vermelding is geactiveerd,
maar dat er geen coördinaten voor de afstandszoekfunctie zijn bepaald.
De vermelding zal daardoor niet verschijnen in omgevingszoekresultaten.

Dit kan de volgende oorzaken hebben:

1. Tijd: De geodata worden opgehaald via een API, wat soms wat tijd kan kosten. Wacht even en laad de pagina opnieuw.

2. Onjuist adres: De geodata konden niet worden gevonden vanwege een typefout of omdat het adres niet bestaat. Corrigeer het adres.

3. API niet beschikbaar: De geo-API was tijdelijk niet beschikbaar. Klik op het potlood linksonder en klik vervolgens op "opnieuw proberen" naast de fout. Wacht even. U hoeft geen velden in de vermelding te bewerken.

4. Backend-fout: Als niets van het bovenstaande heeft geholpen, is ons backend mogelijk kapot. Neem contact op met de ontwikkelaars.

## Filteren

Filteren helpt u bij het zoeken naar specifieke vermeldingen.
Bij het filteren wordt geen rekening gehouden met hoofdletters en kleine letters.

### Vrije tekst

Het filter is in de eerste plaats een zoekopdracht in vrije tekst. Voer willekeurige termen in de balk in en klik op Filteren.
De waarden die in de vermeldingen worden doorzocht, zijn de waarden van alle velden die gebruikers vrij kunnen invullen.
Dat gaat van naam, adres, telefoonnummer, enzovoort tot en met speciale aanbiedingen. Waarden met een vooraf gedefinieerde keuze (zoals 'Type', 'Attributen' of 'Aanbod') worden hierbij niet meegenomen.

### Filters

Als de zoekopdracht in vrije tekst niet voldoende is, kunt u uw zoekopdracht ook anders definiëren of verder beperken.
Hiervoor kunt u filters gebruiken.

Alles wat eindigt op een dubbele punt (`:`) wordt herkend als een filter.
Alles wat na een filter staat, is de waarde die wordt vergeleken. Sommige filters (zoals `heeft:`) kunnen op meerdere waarden tegelijk filteren.
Om dit te doen, kunt u hetzelfde filter meerdere keren gebruiken of een komma (`,`) tussen de waarden plaatsen.

Als u wilt filteren op zinnen of andere zaken die spaties bevatten, kunt u deze tussen aanhalingstekens (`"zoekterm met spatie"`) plaatsen.
Alles tussen de aanhalingstekens wordt dan als één woord behandeld.

**Filters kunnen naar wens met elkaar en met vrije tekst worden gecombineerd.**

De volgende filters zijn beschikbaar:

#### omgeving: [afstand], plaats

Filtert op straal.

Voer na `omgeving:` een postcode of plaatsnaam in.
De weergegeven vermeldingen bevinden zich binnen een straal van 10 km van de gezochte plaats.
Om deze straal te wijzigen, kunt u ook een afstand met `km` opgeven.

Voorbeelden:

`omgeving: 100km, berlin` _toont alle vermeldingen binnen een straal van 100 km van Berlijn_

`omgeving: "Mülheim an der Ruhr"` _toont alle vermeldingen binnen een straal van 10 km van Mülheim an der Ruhr_

Opmerking: U kunt slechts één omgevingsfilter tegelijkertijd toepassen. Omgevingsfilters werken alleen op vermeldingen die al eens zijn geactiveerd.

#### is: type / geactiveerd

Filtert op welk type vermelding wordt weergegeven en of een vermelding geactiveerd is.
Dit filter kan worden omgekeerd met `-niet`.

Voorbeelden:

`is: groep, geactiveerd` _toont alle geactiveerde groepen_

`is-niet: geactiveerd is: logopedist` _toont alle niet-geactiveerde logopedisten_

`is: groep, logopedist` _toont alle groepen en alle logopedisten_

#### heeft: veld

Filtert op vermeldingen die een bepaald veld hebben. Dit filter kan worden omgekeerd met `-niet`.

Voorbeelden:

`heeft: speciale-aanbiedingen` _toont alle vermeldingen met speciale aanbiedingen_

`is: geactiveerd heeft-niet: geodata` _toont alle vermeldingen die geactiveerd zijn maar geen positiegegevens hebben voor de omgevingszoekfunctie_

#### biedt: aanbod / attributen

Filtert op vermeldingen die alle gefilterde aanbiedingen of alle attributen hebben.

U kunt ook de filters `aanbod:` en `attributen:` gebruiken om alleen in die velden te filteren.
Al deze filters kunnen worden omgekeerd met `-niet`.

Voorbeelden:

`biedt: begeleidende-therapie, indicaties` _toont alle vermeldingen die begeleidende therapie **en** indicaties bieden_

`attributen-niet: vergoeding` of `biedt-niet: vergoeding` _toont alle vermeldingen die het attribuut "vergoeding" niet hebben_

#### geactiveerd-door: gebruiker

Filtert op gebruikersnaam, voor alle vermeldingen die een gebruiker heeft geactiveerd.

Voorbeeld:

`geactiveerd-door: Laila` _toont alle vermeldingen die door Laila zijn geactiveerd_

#### geactiveerd-op, geactiveerd-voor, geactiveerd-na: datum

Filtert op de activeringsdatum.
Deze filters kunnen worden gecombineerd om een tijdsperiode te beperken.

Voorbeelden:

`geactiveerd-op: 01.03` _toont alle vermeldingen die op 01.03 van dit jaar zijn geactiveerd_

`geactiveerd-voor: 31.12.2022 geactiveerd-na: 24.12.2022` _toont alle vermeldingen die tussen 24.12.2022 en 31.12.2022 zijn geactiveerd_

#### ingediend-op, ingediend-voor, ingediend-na: datum

Filtert op de indieningsdatum.
Deze filters kunnen worden gecombineerd om een tijdsperiode te beperken.

Voorbeelden:

`ingediend-na: 22.04.2016` _toont alle vermeldingen die na 22.04.2016 zijn ingediend_

`ingediend-voor: 31.12.2022` _toont alle vermeldingen die voor 31.12.2022 zijn ingediend_

#### tekst, niet: vrije tekst

Met `tekst:` kunt u expliciet een vrije tekst definiëren.

Met `niet:` kunt u een vrije tekst omkeren. Alle vermeldingen die deze vrije tekst niet bevatten, worden dan weergegeven.
Om meerdere woorden op te geven, scheidt u ze met komma's. Dit filter werkt alleen als er ook een vrije tekst is opgegeven.

Voorbeeld:

`groep niet: Hamburg, Str, Straat, Groep` _toont alle vermeldingen die de tekst "groep" bevatten, maar niet de teksten "Hamburg", "Str", "Straat" of "Groep"_

#### [veldfilter]: waarde

Er zijn ook veldfilters. Deze worden geschreven door de naam van een veld te schrijven, gevolgd door `:`.
De inhoud van het veld wordt hierbij op overeenkomst gecontroleerd. Als meerdere waarden, gescheiden door komma's, zijn opgegeven, wordt gefilterd op vermeldingen waarbij een van de waarden overeenkomt.

Voorbeelden:

`stad: Hamburg, Berlin, München` _toont alle vermeldingen waarbij de stad in het adresveld is opgegeven als "Hamburg", "Berlin" of "München"_

`straat: schoolstraat` _toont alle vermeldingen met de straat "schoolstraat" in het adres_

Anders dan tekstvelden kan het numerieke veld minimumleeftijd worden beperkt met `minimumleeftijd-onder:` en `minimumleeftijd-boven:`, vergelijkbaar met datumfilters.
