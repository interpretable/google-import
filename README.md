# import

Import pictograms data and files.

## From Google drive

1. Export **Google sheet** `Grilles` & `Pictos` tabs as `csv` :
   https://docs.google.com/spreadsheets/d/1EK-Lvo608LWAjOEJIbMyla5pPgknCRWXEzkcP4U6bFQ

2. Copy both files to the `import` repository directory :

- `./Interpretable - Donnees pictogrammes - Grilles.csv`
- `./Interpretable - Donnees pictogrammes - Pictos.csv`

3. Download last `svg` pictograms folder from **Google Drive** :
   https://drive.google.com/drive/folders/1hrppNScjbcCQPhfc2jesljYrUhXUE2w4

And extract it to the `images` directory.

4. Run the script

```
npm run csv-to-cboard
```

## Todo

### Quelques remarques générales

- [x] j'ai reparcouru toutes les lignes du google sheet, en reclassant c[ertains pictos ou board. On devrait avoir beaucoup plus de pictos intégrés dans ton dev CBoard (voir par exemple le board santé).
- [x] J'ai déplacé les pictos abandonnés dans l'onglet "Pictos abandonnés" : exemple : picto "rechauffer_le_repas" qui apparaissait avant dans le board "Autonomie".
- [ ] Peux-tu les classer par ordre alphabétique stp ?

### A propos des labels inscrits sous les pictos qui ouvrent des boards :

- [x] Pour le label du board "Autonomie", le label inscrit sous le picto est "déambulateur" alors qu'il est indiqué "Autonomie" dans le google sheet. .
- [x] Pour le label du board "Emotions", le label inscrit sous le picto est "Bonheur" alors qu'il est indiqué "Emotions" dans le google sheet.
- [x] Pour le label du board "Famille", le label inscrit sous le picto est "Famille élargie" alors qu'il est indiqué "Famille" dans le google sheet.
- [x] Pour le label du board "Finances", le label inscrit sous le picto est "Euro" alors qu'il est indiqué "Finances" dans le google sheet.
- [x] Pour le label du board "Général", le label inscrit sous le picto est "Jours français" alors qu'il est indiqué "Général" dans le google sheet.
- [x] Pour le label du board "Hygiène", le label inscrit sous le picto est "Salle de bains" alors qu'il est indiqué "Hygiène" dans le google sheet.
- [x] Pour le label du board "Individu", le label inscrit sous le picto est "Famille nucléaire" alors qu'il est indiqué "Individu" dans le google sheet.
- [x] Pour le label du board "Migrant", le label inscrit sous le picto est "Planisphère drapeaux" alors qu'il est indiqué "Migrant" dans le google sheet.
- [x] Pour le label du board "Santé", le label inscrit sous le picto est "Infirmière" alors qu'il est indiqué "Santé" dans le google sheet.
- [x] Pour le label du board "Acteurs", le label inscrit sous le picto est "Restaurants du coeur" alors qu'il est indiqué "Acteurs" dans le google sheet.

### A propos des pictos :

- [x] Les fichiers sont bien présents mais les pictos n'apparaissent pas dans le board "Autonomie".
  - [x] Fichiers "porter_la_fourchette_a_la_bouche",
  - [x] "perimetre_de_marche"
- [x] Dans le board "5 sens", aucun picto n'apparaît.
- [x] Dans le board "Individu" (nommé actuellement "Famille nucléaire") :
  - [x] il y a un picto sans image dont le label est indiqué "Sans papier Sans papier 2"
  - [x] (Il existe bien deux fichiers distincts dans le drive pour "Sans papier" et "Sans papier 2", avec deux lignes dans le google sheet) ;
  - [x] le picto "Personnes âgées" n'apparait pas, alors que les fichiers sont bien présents dans le drive ;
  - [x] le picto "Bébé" n'apparait pas, alors que les fichiers sont bien présents dans le drive
- [x] Dans le board "Métropole de Lyon"
- [x] Dans le board "Racine",
  - [x] le picto ouvrant le board "Rendez-vous" ne s'affiche pas (fichier image "j_ai_rdv")
  - [x] le picto ouvrant le board "Santé" ne s'affiche pas (fichier image "infirmier").
  - [x] A noter que le label de ce picto est actuellement "Infirmière" et devrait être "Santé"
- [ ] Dans le board "Acteurs" apparaissent les cases
  - [x] "Centre social",
  - [ ] "Infirmière", _Je vois "infirmier" & "infirmier 2" c'est de ça dont tu parles ?_
  > *JG C'est corrigé, j'ai changé le label du picto 2*
  - [x] "Bus info santé" sans les pictos (ces pictos n'existent pas normalement).
- [ ] Il y a un board "Besoin" à la racine qui me convient bien, mais dont le picto qui le représente n'apparaît pas dans le google sheet. 
> *Je ne vois pas cette board dans le dernier import...*
- [x] Dans le board "handicap" :
  - [x] le picto "Handicap en fauteuil" (actuellement avec le label "Handicap psychique Fauteuil" - modifié - qui pointe vers le picto handicap_physique_fauteuil) n'apparaît pas ;
  - [x] le picto "déambulateur" n'apparaît pas ;
  - [x] le picto "Fauteuil roulant éléctrique" n'apparaît pas
- [x] Dans le board "Santé", la case "Habitudes alimentaires" ne devrait pas apparaître
- [x] Dans le board "Violence", j'ai un label nommé "Reprendre le picto ventre..." qui ne devrait pas apparaître

### Remarques


- Board "Allergie" (la baord est vide)
> *C'est corrigé, j'ai passé les pictos allérgies à l'intérieur de cette board.*

#### Image manquantes
> *JG : attention, les corrections ont été faîtes dans l'onglet "Pictos avec rubriques"*

- Board "Racine"
  - "Métropole de Lyon"
> *JG il existe pourtant bien un picto metropole_de_lyon*
  - Board "Acteurs"
    - "Securité sociale"
> *JG 23/6 en cours de récupération*
  - Board "Emotions"
    - "Angoisse"
> *JG corrigé*
  - Board "Handicap"
    - "Handicap en fauteuil"
> *JG il existe pourtant bien un picto handicap_physique_fauteuil*
  - Board "Santé"
    - Board "Hygiène"
      - "Douche adulte"
> *JG corrigé*
      - "Se laver au lavabo"
> *JG 23/6 en cours de récupération*
    - "En cas de canicule"
> *JG 23/6 en cours de récupération*
  - Board "Habitat"
    - "Habite à l'hôtel"
> *JG 23/6 en cours de récupération*
  - Board "Enfant / bébé"
    - "Eteindre la lumière"
> *JG corrigé*
  - Board "Famille"
    - "Nombre de bébés"
> *JG corrigé, j'ai supprimé la ligne*

## Resources

- https://github.com/interpretable/api/issues/5
