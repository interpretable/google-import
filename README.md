# Import pictograms to Interpretable AAC board

Import SVG pictograms and associated data to Interpretable AAC board.
> see https://github.com/interpretable/interpretable

## From Google drive

1. Export **Google sheet** `Grilles` & `Pictos` tabs as `csv` :
   https://docs.google.com/spreadsheets/d/1EK-Lvo608LWAjOEJIbMyla5pPgknCRWXEzkcP4U6bFQ

2. Copy both files to the `import` repository directory :

- `./Interpretable - Donnees pictogrammes - cboard_grid.csv`
- `./Interpretable - Donnees pictogrammes - cboard_data.csv`

3. Download last `svg` pictograms folder from **Google Drive** :
   https://drive.google.com/drive/folders/1hrppNScjbcCQPhfc2jesljYrUhXUE2w4

And extract it to the `images` directory.

4. Run the script

```
npm run csv-to-cboard &> import.log
```

5. Copy the content of the `./export` folder to the __Cboard project__.

## Resources

- https://github.com/interpretable/api/issues/5
