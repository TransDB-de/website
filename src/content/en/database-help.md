# Hilfe zur Datenbank Verwaltung

Auf dieser Hilfe-Seite findest du Infos über die Datenbank Verwaltung, und wie man diese effektiv verwendet.

## Einträge Bearbeiten

Drücke auf den Stift unten links bei einem Eintrag um ihn zu bearbeiten.
Du kannst nun jedes Feld verändern, den Eintrag löschen, deine Änderungen speichern, oder sie verwerfen.

## Warnhinweise

Manche Einträge haben die Warnhinweise:

"Dieser Eintrag hat keine Kontaktdaten!"

oder

"Dieser Eintrag hat keine Geodaten!"

Diese Warnung weißt darauf hin, dass der Beitrag freigeschaltet wurde,
aber keine Koordinaten für die Distanzsuche ermittelt wurden.
Der Eintrag wird somit nicht bei Umgebungssuchen erscheinen können.

Das kann folgende Auslöser haben:

1. Zeit: Die Geodaten werden über einen API ermittelt, und das kann manchmal etwas dauern. Warte ein wenig und lade die Seite neu.

2. Falsche Adresse: Die Geodaten konnten nicht gefunden werden, weil ein Schreibfehler vorliegt, oder es die Adresse nicht gibt. Korrigiere die Adresse.

3. API Down: Der Geo-API war grade down. Drücke unten links auf den Stift, und dann auf "erneut versuchen" neben dem Fehler. Warte ein wenig. Du musst keine Felder im Beitrag bearbeiten.

4. Backend Fehler: Falls alles oben nichts gebracht hat, ist vielleicht unser Backend kaputt. Kontaktiere die Developer.

## Filtern

Filtern hilft dir dabei, nach bestimmten Einträgen zu suchen.
Groß- / Kleinschreibung wird beim Filtern nicht berücksichtigt.

### Freitext

Der Filter ist in erster Linie eine Freitext Suche. Gebe in die Leiste beliebige Begriffe ein, und drücke auf Filtern.
Die Werte welche bei den Einträgen durchsucht werden, sind die Werte aus allen Feldern welche Nutzer frei ausfüllen können.
Das heißt von Name, Adresse, Telefonnummer, ... bis hin zu Spezialangeboten. Werte mit vorgegebener Auswahl (wie 'Art', 'Attribute' oder 'Angebote') werden dabei nicht berücksichtigt.

### Filter

Falls die Freitext Suche nicht reicht, kannst du deine Suche auch anders definieren, oder weiter Einschränken.
Hierzu kannst du Filter verwenden.

Als Filter wird alles erkannt, was mit einem Doppelpunk (`:`) endet.
Alles was hinter einem Filter steht, ist der Wert welcher verglichen wird. Manche Filter (wie `hat:`) können nach mehreren Werten gleichzeitig filtern.
Um das zu tun, kannst du den gleichen Filter mehrere male verwenden, oder ein Komma (`,`) zwischen die Werte schreiben.

Falls du nach Phrasen oder anderen Dingen, welche Lücken beinhalten, filtern möchtest, kannst du diese in Anführungszeichen (`"Suchbegriff mit Lücke"`) setzen.
Alles zwischen den Anführungszeichen wird dann wie ein einzelnes Wort behandelt.

**Filter lassen sich beliebig miteinander, und mit Freitext kombinieren.**

Folgende Filter sind möglich:

#### umgebung: [distanz], Ort

Filtert nach Umkreis.

Gebe dazu hinter `umgebung:` eine Postleitzahl oder einen Ortsnamen ein.
Die angezeigten Einträge werden sich in einen 10km Umkreis von dem gesuchten Ort befinden.
Um diesen Umkreis zu verändern, kannst du zusätzlich eine Distanz, mit `km` angeben.

Beispiele:

`umgebung: 100km, berlin` _zeige alle Einträge im 100km Umkreis von Berlin_

`umgebung: "Mülheim an der Ruhr"` _zeige alle Einträge im 10km Umkreis von Mülheim an der Ruhr_

Hinweis: Man kann nur einen Umgebungs-Filter gleichzeitig anwenden. Umgebungsfilter funktionieren nur auf Einträgen welche schon einmal freigegeben waren.

#### ist: Art / freigeschaltet

Filtert nach was für eine Art Eintrag angezeigt werden soll, und ob ein Eintrag freigeschaltet ist.
Dieser Filter lässt sich mit `-nicht` umkehren.

Beispiele:

`ist: Gruppe/Verein, freigeschaltet` _zeige alle freigeschalteten Gruppen / Vereinen_

`ist-nicht: freigeschaltet ist: Logopäd*in` _zeige alle nicht freigeschalteten Logopäd\*innen_

`ist: Gruppe/Verein, Logopäd*in` _zeige alle Gruppen / Vereinen, und alle Logopäd\*innen_

#### hat: Feld

Filtert nach Einträgen, welche ein bestimmtes Feld haben. Dieser Filter lässt sich mit `-nicht` umkehren.

Beispiele:

`hat: Spezialangebote` _zeige alle Einträge mit Spezialangeboten_

`ist: freigeschaltet hat-nicht: geodaten` _zeige alle Einträge welche freigeschaltet sind, aber keine Positionsdaten für die Umgebungssuche haben_

#### bietet: Angebote / Attribute

Filtert nach, welche entweder alle Angebote, oder alle Attribute haben, nach welchen gefiltert wird.

Alternativ kann man auch die Filter `angebote:` und `attribute:` verwenden, um nur in diesen Feldern zu filtern.
Alle dieser Filter lassen sich mit `-nicht` umkehren.

Beispiele:

`bietet: begleittherapie, indikationen` _zeige alle Einträge welche Begleittherapie **und** Indikationen bieten_

`attribute-nicht: kostenübernahme` oder `bietet-nicht: kostenübernahme` _zeige alle Einträge welche nicht das Attribut "kostenübernahme" haben_

#### freigeschaltet-von: Nutzer

Filtert anhand des Nutzernamens, nach allen Beiträgen welche ein Nutzer freigeschaltet hat.

Beispiel:

`freigeschaltet-von: Laila` _zeigt alle Einträge welche von Laila freigeschaltet wurden_

#### freigeschaltet-am, freigeschaltet-vor, freigeschaltet-nach: Datum

Filtert nach dem Freischaltungsdatum.
Diese Filter lassen sich kombinieren, um einen Zeitraum einzuschränken.

Beispiele:

`freigeschaltet-am: 01.03` _zeigt alle Einträge welche am 01.03 dieses Jahres freigeschaltet wurden_

`freigeschaltet-vor: 31.12.2022 freigeschaltet-nach: 24.12.2022` _zeigt alle Einträge welche zwischen dem 24.12.2022 und dem 31.12.2022 freigeschaltet wruden_

#### eingereicht-am, eingereicht-vor, eingereicht-nach: Datum

Filtert nach dem Einreichungsdatum.
Diese Filter lassen sich kombinieren, um einen Zeitraum einzuschränken.

Beispiele:

`eingereicht-nach: 22.04.2016` _zeigt alle Einträge die nach dem 22.04.2016 eingereicht wurden_

`eingereicht-vor: 31.12.2022` _zeigt alle Einträge die vor dem 31.12.2022 eingereicht wurden_

#### text, nicht: Freitext

Mit `text:` lässt sich explizit ein Freitext definieren.

Mit `nicht:` lässt sich ein Freitext umkehren. Dabei werden alle Einträge angezeigt, welche diesen Freitext nicht haben.
Um mehrere Worte anzugeben, trenne sie mit Kommas. Dieser Filter funktioniert nur, wenn auch ein Freitext angegeben ist.

Beispiel:

`gruppe nicht: Hamburg, Str, Straße, Gruppe, owo` _zeigt alle Einträge, welche den Text "gruppe", aber nicht die Texte "Hamburg", "Str", "Straße", "Gruppe" oder "owo" enthalten_

#### [feldfilter]: Wert

Zusätzlich gibt es auch noch Feldfilter. Diese werden geschrieben indem man den Namen eines Feldes schreibt, gefolgt von `:`.
Der Inhalt des Feldes wird hierbei auf Übereinstimmung überprüft. Wenn mehrere Werte, mit Komma getrennt, angegeben sind, wird nach Einträgen gefiltert, bei welchen einer der Werte übereinstimmt.

Beispiele:

`stadt: Hamburg, Berlin, München` _zeigt alle Einträge in welchem die Stadt in dem Adressfeld als "Hamburg", "Berlin" oder "München" angegeben wurde_

`straße: schulstraße` _zeigt alle Einträge mit der Straße "schulstraße" in der Adresse_

Anders als Textfelder, lässt sich das Zahlenfeld Mindestalter mit `mindestalter-unter:` und `mindestalter-über:`, ähnlich wie Datumfilter einschränken.
