# import
Import pictograms data and files.

## From Google drive

1. Export __Google sheet__ `Grilles` & `Pictos` tabs as `csv` :
https://docs.google.com/spreadsheets/d/1EK-Lvo608LWAjOEJIbMyla5pPgknCRWXEzkcP4U6bFQ

2. Copy both files to the `import` repository directory :
- `./Interpretable - Donnees pictogrammes - Grilles.csv`
- `./Interpretable - Donnees pictogrammes - Pictos.csv`

3. Download last `svg` pictograms folder from __Google Drive__ :
   https://drive.google.com/drive/folders/1hrppNScjbcCQPhfc2jesljYrUhXUE2w4

And extract it to the `images` directory.

4. Run the script
```
npm run csv-to-cboard
```

## Resources 

- https://github.com/interpretable/api/issues/5
