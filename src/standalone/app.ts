const { createCanvas } = require('canvas');
const fs = require('fs');
const util = require('util');

import artwork from '../artworks/circle-waves';
import { PALETTES } from '../lib/color-palettes';

const create = ({ id, index, options, run, name, outputPath }) =>
  new Promise((resolve, reject) => {
    const size = 1000;
    const canvas = createCanvas(size, size);
    const completedCanvas = run(canvas, options);
    const out = fs.createWriteStream(
      `${outputPath}/${name}-${id}-${index}.png`
    );
    const stream = completedCanvas.createPNGStream();
    stream.pipe(out);
    out.on('finish', resolve);
    out.on('error', reject);
  });

(async () => {
  const date = Date.now();
  // const colors = ['#941B0C', '#BC3908', '#F6AA1C'];
  // const colors = ['#d3bcc0', '#a5668b', '#69306d'];
  const currentArtwork = artwork();
  const artworkFilename = currentArtwork.id;
  const options = { colors: PALETTES[0] };

  const outputPath = `${process.cwd()}/out/${artworkFilename}`;

  console.log(outputPath, process.cwd());

  try {
    await util.promisify(fs.access)(outputPath);
    await util.promisify(fs.mkdir)(outputPath);
  } catch (err) {
    if (err.code !== 'EEXIST') {
      console.error(err);
    }
  }

  for (let i = 0; i < 5; i++) {
    await create({
      run: currentArtwork.run,
      options,
      id: date,
      index: i,
      name: currentArtwork.name,
      outputPath,
    });
    console.log('completed:', i);
  }

  await util.promisify(fs.writeFile)(
    `${outputPath}/configuration-${artworkFilename}-${date}.json`,
    JSON.stringify(options)
  );

  console.log('All done 👍');
})();
