# Aide à la gestion de la base de données

Sur cette page d'aide, vous trouverez des informations sur la gestion de la base de données et comment l'utiliser efficacement.

## Modifier des entrées

Cliquez sur le crayon en bas à gauche d'une entrée pour la modifier.
Vous pouvez maintenant modifier chaque champ, supprimer l'entrée, enregistrer vos modifications ou les annuler.

## Avertissements

Certaines entrées affichent les avertissements :

« Cette entrée n'a pas de coordonnées de contact ! »

ou

« Cette entrée n'a pas de données géographiques ! »

Cet avertissement indique que l'entrée a été activée,
mais qu'aucune coordonnée pour la recherche par distance n'a été déterminée.
L'entrée n'apparaîtra donc pas dans les recherches de proximité.

Cela peut avoir les causes suivantes :

1. Délai : Les données géographiques sont récupérées via une API, ce qui peut parfois prendre un certain temps. Attendez un peu et rechargez la page.

2. Adresse incorrecte : Les données géographiques n'ont pas pu être trouvées en raison d'une faute de frappe ou parce que l'adresse n'existe pas. Corrigez l'adresse.

3. API indisponible : L'API géographique était temporairement indisponible. Cliquez sur le crayon en bas à gauche, puis sur « réessayer » à côté de l'erreur. Attendez un peu. Vous n'avez pas besoin de modifier des champs dans l'entrée.

4. Erreur backend : Si rien de ce qui précède n'a fonctionné, notre backend est peut-être en panne. Contactez les développeurs.

## Filtrage

Le filtrage vous aide à rechercher des entrées spécifiques.
La casse n'est pas prise en compte lors du filtrage.

### Texte libre

Le filtre est avant tout une recherche en texte libre. Entrez des termes dans la barre et cliquez sur Filtrer.
Les valeurs consultées dans les entrées sont les valeurs de tous les champs que les utilisateurs peuvent remplir librement.
Cela va du nom, de l'adresse, du numéro de téléphone, etc. jusqu'aux offres spéciales. Les valeurs à choix prédéfinis (comme « Type », « Attributs » ou « Offres ») ne sont pas prises en compte.

### Filtres

Si la recherche en texte libre ne suffit pas, vous pouvez définir votre recherche autrement ou la restreindre davantage.
Vous pouvez utiliser des filtres pour cela.

Tout ce qui se termine par deux-points (`:`) est reconnu comme un filtre.
Tout ce qui suit un filtre est la valeur comparée. Certains filtres (comme `hat:`) peuvent filtrer plusieurs valeurs simultanément.
Pour ce faire, vous pouvez utiliser le même filtre plusieurs fois ou séparer les valeurs par une virgule (`,`).

Si vous souhaitez filtrer des expressions ou d'autres éléments contenant des espaces, vous pouvez les mettre entre guillemets (`"terme de recherche avec espace"`).
Tout ce qui se trouve entre guillemets est alors traité comme un seul mot.

**Les filtres peuvent être combinés librement entre eux et avec du texte libre.**

Les filtres suivants sont disponibles :

#### proximite: [distance], lieu

Filtre par rayon.

Entrez après `proximite:` un code postal ou un nom de lieu.
Les entrées affichées se situeront dans un rayon de 10 km du lieu recherché.
Pour modifier ce rayon, vous pouvez indiquer une distance supplémentaire avec `km`.

Exemples :

`proximite: 100km, berlin` _affiche toutes les entrées dans un rayon de 100 km de Berlin_

`proximite: "Mülheim an der Ruhr"` _affiche toutes les entrées dans un rayon de 10 km de Mülheim an der Ruhr_

Remarque : on ne peut appliquer qu'un seul filtre de proximité à la fois. Les filtres de proximité ne fonctionnent que sur des entrées qui ont déjà été activées une fois.

#### est: type / activé

Filtre par type d'entrée affiché et si une entrée est activée.
Ce filtre peut être inversé avec `-pas`.

Exemples :

`est: groupe, activé` _affiche tous les groupes activés_

`est-pas: activé est: orthophoniste` _affiche tous les orthophonistes non activés_

`est: groupe, orthophoniste` _affiche tous les groupes et tous les orthophonistes_

#### a: champ

Filtre par entrées ayant un certain champ. Ce filtre peut être inversé avec `-pas`.

Exemples :

`a: offres-speciales` _affiche toutes les entrées avec des offres spéciales_

`est: activé a-pas: geodonnees` _affiche toutes les entrées qui sont activées mais n'ont pas de données de position pour la recherche de proximité_

#### offre: offres / attributs

Filtre par entrées ayant toutes les offres ou tous les attributs filtrés.

Alternativement, vous pouvez utiliser les filtres `offres:` et `attributs:` pour filtrer uniquement dans ces champs.
Tous ces filtres peuvent être inversés avec `-pas`.

Exemples :

`offre: therapie-accompagnement, indications` _affiche toutes les entrées proposant une thérapie d'accompagnement **et** des indications_

`attributs-pas: prise-en-charge` ou `offre-pas: prise-en-charge` _affiche toutes les entrées n'ayant pas l'attribut « prise-en-charge »_

#### active-par: utilisateur

Filtre par nom d'utilisateur, pour toutes les entrées activées par un utilisateur.

Exemple :

`active-par: Laila` _affiche toutes les entrées activées par Laila_

#### active-le, active-avant, active-apres: date

Filtre par date d'activation.
Ces filtres peuvent être combinés pour restreindre une période.

Exemples :

`active-le: 01.03` _affiche toutes les entrées activées le 01.03 de cette année_

`active-avant: 31.12.2022 active-apres: 24.12.2022` _affiche toutes les entrées activées entre le 24.12.2022 et le 31.12.2022_

#### soumis-le, soumis-avant, soumis-apres: date

Filtre par date de soumission.
Ces filtres peuvent être combinés pour restreindre une période.

Exemples :

`soumis-apres: 22.04.2016` _affiche toutes les entrées soumises après le 22.04.2016_

`soumis-avant: 31.12.2022` _affiche toutes les entrées soumises avant le 31.12.2022_

#### texte, pas: texte libre

Avec `texte:`, vous pouvez définir explicitement un texte libre.

Avec `pas:`, vous pouvez inverser un texte libre. Toutes les entrées ne contenant pas ce texte libre seront alors affichées.
Pour indiquer plusieurs mots, séparez-les par des virgules. Ce filtre ne fonctionne que si un texte libre est également indiqué.

Exemple :

`groupe pas: Hamburg, Str, Straße, Groupe` _affiche toutes les entrées contenant le texte « groupe » mais pas les textes « Hamburg », « Str », « Straße » ou « Groupe »_

#### [filtre de champ]: valeur

Il existe également des filtres de champ. Ceux-ci sont écrits en indiquant le nom d'un champ suivi de `:`.
Le contenu du champ est vérifié pour correspondance. Si plusieurs valeurs séparées par des virgules sont indiquées, les entrées pour lesquelles l'une des valeurs correspond sont filtrées.

Exemples :

`ville: Hamburg, Berlin, München` _affiche toutes les entrées où la ville dans le champ adresse est indiquée comme « Hamburg », « Berlin » ou « München »_

`rue: schulstrasse` _affiche toutes les entrées avec la rue « schulstrasse » dans l'adresse_

Contrairement aux champs texte, le champ numérique âge minimum peut être restreint avec `age-min-sous:` et `age-min-dessus:`, de manière similaire aux filtres de date.
