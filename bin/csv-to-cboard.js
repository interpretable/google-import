const fs = require('fs');
const fsPromises = require('fs/promises');
const path = require('path');
const csv = require('fast-csv');
const modifiedFitzgeraldKeys = require('../modifiedFitzgeraldKey.json');
const jsonfile = require('jsonfile');
const fuzzysort = require('fuzzysort');
const simovSlugify = require('slugify');
simovSlugify.extend({ "'": ' ', '/': ' ' });

const pathToBoardsSheet = path.resolve(
  __dirname,
  '..',
  'Interpretable - Donnees pictogrammes - Grilles.csv'
);
const pathToTilesSheet = path.resolve(
  __dirname,
  '..',
  'Interpretable - Donnees pictogrammes - Pictos.csv'
);
const cboardJsonFileDirectory = path.resolve(
  __dirname,
  '..',
  'export',
  'src',
  'api'
);
const cboardJsonFilePath = path.resolve(cboardJsonFileDirectory, 'boards.json');
const symbolsJsonFilePath = path.resolve(
  cboardJsonFileDirectory,
  'interpretable-symbols.json'
);
const imagesPath = path.resolve(__dirname, '..', 'images');

const cboardSymbolsDirectory = 'symbols/interpretable/';
const cboardImagesDirectory = path.resolve(
  __dirname,
  '..',
  'export',
  'public',
  cboardSymbolsDirectory
);
const backgroundColor = 'rgb(255, 255, 255)';
const folderBackgroundColor = 'rgb(187, 222, 251)';

const buildSearchTargetsFromPath = async directoryPath => {
  const files = await fsPromises.readdir(directoryPath);
  return files.map(file => ({
    file,
    humanizedName: humanize(path.parse(file).name),
    name: slugify(humanize(path.parse(file).name), '_')
  }));
  // .filter(t => t.file.length < 1000)
  // .map(({ file }) => fuzzysort.prepare(file))
};

const humanize = string =>
  string
    .replaceAll('Base_interpretable_V17_', '')
    .replaceAll('_', ' ')
    .replaceAll('-', ' ');
const slugify = (string, replacement = '-') =>
  simovSlugify(string, { strict: true, lower: true, replacement });

const transformPictoToTile = picto => ({
  ...picto
});

const transformBoardRow = row => {
  // Grilles
  // Nombre de ligne
  // Nombre de colonne
  const label = row['Grilles'];

  return {
    id: slugify(label),
    name: label,
    nameKey: label,
    author: 'Interpretable',
    email: 'interpretable@erasme.io',
    isPublic: true,
    hidden: false,
    tiles: []
  };
};

const transformPictoRow = (targets, options) => (row, next) => {
  let transformedRow = null;
  const board = row['Est présent sur la grille '];
  const description = row['Descriptif'];
  const userInputFilename = row['Nom du fichier image']
    ? slugify(humanize(row['Nom du fichier image']), '_')
    : null;
  const hasBoard = !!board;
  if (!hasBoard) {
    next(null, null);
    return;
  }

  // console.log(Object.keys(row));
  const label = row['Label*\n(Apparaitra sous le picto dans CBoard)'];
  if (!label) {
    console.warn(`Pictogram described as "${description}" has no label.`);
    next(null, null);
    return;
  }

  const normalizedLabel = label.toLowerCase().replaceAll('-', ' ');
  const loadBoard = row["Lors d'un clic ouvre la grille"];
  const id = `${slugify(board)}_${slugify(label)}`;
  console.log('id', id);
  transformedRow = {
    board: slugify(board),
    loadBoard: loadBoard ? slugify(loadBoard) : null,
    row: row['Ligne'] || null,
    column: row['Colonne'] || null,
    id,
    label,
    loadBoardLabel: loadBoard,
    backgroundColor: loadBoard ? folderBackgroundColor : backgroundColor
  };

  console.debug('  filenameSearchInput', userInputFilename);
  const results = fuzzysort.go(userInputFilename, targets, { key: 'name' });
  if (userInputFilename && results.length > 0) {
    console.debug(
      '  filenameFirstResult',
      results.map(result => result.obj.file).slice(0, 2)
    );
    handleFileResult(results[0].obj.file, transformedRow, next);
  } else {
    const results = fuzzysort.go(normalizedLabel, targets, {
      key: 'humanizedName'
    });
    if (results.length > 0) {
      console.debug('  guessInput', normalizedLabel);
      console.debug(
        '  guessFirstResult',
        results.map(result => result.obj.file).slice(0, 2)
      );
      handleFileResult(results[0].obj.file, transformedRow, next);
    } else {
      next(null, transformedRow);
    }
  }

  console.debug('why how ?');
  // next(null, transformedRow);
};

const handleFileResult = (filename, transformedRow, nextCallback) => {
  const definitiveFilename = `${slugify(transformedRow.label, '_')}.svg`;
  const definitiveFilePath = path.resolve(
    cboardImagesDirectory,
    definitiveFilename
  );
  fs.cp(path.resolve(imagesPath, filename), definitiveFilePath, e => {
    if (e) {
      nextCallback(e);
    }

    transformedRow.image = `/${cboardSymbolsDirectory}${definitiveFilename}`;
    console.debug('image', transformedRow.image);
    nextCallback(null, transformedRow);
  });
};

const getColorPropertiesFromGrammaticalCategory = grammaticalCateory => {
  if (grammaticalCateory) {
    const colorCoding = modifiedFitzgeraldKeys.find(
      ({ category }) =>
        category.toLowerCase() === grammaticalCateory.toLowerCase()
    );

    if (colorCoding) {
      const { category, ...colorProperties } = colorCoding;

      return colorProperties;
    }
  }

  return { fontColor: '#000000', backgroundColor };
};

(async () => {
  let cboard = {
    beginner: [],
    advanced: []
  };
  let symbols = [];
  const searchOptions = {
    limit: 100 // don't return more results than you need!
    // threshold: -10000 // don't return bad results
  };
  const searchTargets = await buildSearchTargetsFromPath(imagesPath);
  await fsPromises.mkdir(cboardImagesDirectory, { recursive: true });
  await fsPromises.mkdir(cboardJsonFileDirectory, { recursive: true });

  // console.log(searchTargets);
  fs.createReadStream(pathToBoardsSheet)
    .pipe(csv.parse({ headers: true }))
    .transform(transformBoardRow)
    .on('data', board => {
      cboard = { ...cboard, advanced: [...cboard.advanced, board] };
    })
    .on('end', () => {
      fs.createReadStream(pathToTilesSheet)
        .pipe(csv.parse({ headers: true }))
        .transform(transformPictoRow(searchTargets, searchOptions))
        // .pipe(process.stdout)
        .on('data', picto => {
          const boardIndex = cboard.advanced.findIndex(
            ({ id }) => id === picto.board
          );
          if (boardIndex !== -1) {
            const pictoIndex = cboard.advanced[boardIndex].tiles.findIndex(
              ({ id }) => id === picto.id
            );
            if (pictoIndex === -1) {
              cboard.advanced[boardIndex].tiles.push(
                transformPictoToTile(picto)
              );
            }
          } else {
            console.warn(
              `Couldn't find a board named ${
                picto.board
              }. Available board names are: ${cboard.advanced
                .map(board => board.id)
                .join(', ')}.`
            );
          }

          // symbols
          const id = `symbol.intepretable.${toCamelCase(picto.label)}`;
          const symbolIndex = symbols.findIndex(
            ({ id: symbolId }) => symbolId === id
          );
          if (symbolIndex === -1) {
            symbols.push({
              id,
              translatedId: picto.label,
              src: picto.image ? picto.image : null
            });
          }
        })
        .on('end', () => {
          jsonfile.writeFile(cboardJsonFilePath, cboard, { spaces: 2 }, err => {
            if (err) {
              console.error(err);
            }

            // symbols
            symbols = symbols.filter(
              ({ translatedId, src }) => translatedId && src
            );
            jsonfile.writeFile(
              symbolsJsonFilePath,
              symbols,
              { spaces: 2 },
              e => {
                if (e) {
                  console.error(e);
                }

                process.exit();
              }
            );
          });
        });
    });
})();

const toCamelCase = string => {
  return slugify(string)
    .split('_')
    .map((str, i) => {
      if (i === 0) {
        return str;
      }
      return str.charAt(0).toUpperCase() + str.slice(1);
    })
    .join('');
};

/**
 * Downloads a file
 * @param{string} realFileId file ID
 * @return{obj} file status
 * */
async function downloadFile(realFileId) {
  // Get credentials and build service
  // TODO (developer) - Use appropriate auth mechanism for your app
  // const projectId = 'interpretable-v2';
  const { GoogleAuth } = require('google-auth-library');
  const { google } = require('googleapis');

  const auth = new GoogleAuth({
    scopes: 'https://www.googleapis.com/auth/drive',
    projectId: process.env.GOOGLE_PROJECT_ID
  });
  const service = google.drive({ version: 'v3', auth });

  fileId = realFileId;
  try {
    // https://www.googleapis.com/drive/v2/files?q='10wWegpzJcltscf7ZY-vp3npybs7aOrmr'+in+parents&key={YOUR_API_KEY}
    const file = await service.files.get({
      fileId: fileId,
      alt: 'media'
    });
    console.log(file.status);
    return file.status;
  } catch (err) {
    // TODO(developer) - Handle error
    throw err;
  }
}
