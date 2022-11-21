# import
Import pictograms data and files.

## From Google drive

1. Export __Google sheet__ `Grilles` & `Pictos` tabs as `csv` :
https://docs.google.com/spreadsheets/d/1EK-Lvo608LWAjOEJIbMyla5pPgknCRWXEzkcP4U6bFQ

2. Copy both files to the repository directory :
- `./Liste pictogrammes - Membres du comité éditorial - Grilles.csv`
- `./Liste pictogrammes - Membres du comité éditorial - Pictos.csv`

3. Download `images/` folder __Google Drive__ and extract it in images ex :
```
./images/Octobre-22
```

4. Run the script
```
node bin/csv-to-cboard.js
```

## Resources 

- https://github.com/interpretable/api/issues/5
