const { createCanvas } = require('canvas');
const fs = require('fs');
const util = require('util');

import sketch from '../sketches/00001/index';
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
  const currentSketch = sketch();
  const sketchFilename = currentSketch.id;
  const options = { colors: PALETTES[2] };

  const outputPath = `${process.cwd()}/out/${sketchFilename}`;

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
      run: currentSketch.run,
      options,
      id: date,
      index: i,
      name: currentSketch.name,
      outputPath,
    });
    console.log('completed:', i);
  }

  await util.promisify(fs.writeFile)(
    `${outputPath}/configuration-${sketchFilename}-${date}.json`,
    JSON.stringify(options)
  );

  console.log('All done 👍');
})();
