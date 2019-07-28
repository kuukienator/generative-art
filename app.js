const { createCanvas } = require('canvas');
const fs = require('fs');
const util = require('util');

const artwork = require('./lib/segments');

const create = ({ id, index, options, run, name, outputPath }) => new Promise((resolve, reject) => {
    const canvas = createCanvas(1024, 1024);
    const completedCanvas = run(canvas, options);
    const out = fs.createWriteStream(`${outputPath}/${name}-${id}-${index}.png`);
    const stream = completedCanvas.createPNGStream();
    stream.pipe(out);
    out.on('finish', resolve);
    out.on('error', reject);
});

(async () => {
    const date = Date.now();
    // const colors = ['#941B0C', '#BC3908', '#F6AA1C'];
    // const colors = ['#d3bcc0', '#a5668b', '#69306d'];
    const options = { ...artwork.defaultOptions };

    const outputPath = `${__dirname}/out/${artwork.name}`;

    try {
        await util.promisify(fs.access)(outputPath);
        await util.promisify(fs.mkdir)(outputPath);
    } catch(err) {
       if (err.code !== 'EEXIST') {
           console.error(err);
       }
    }

    for (let i = 0; i < 5; i++) {
        await create({ run: artwork.run, options, id: date, index: i, name: artwork.name, outputPath });
        console.log('completed:', i);
    }

    await util.promisify(fs.writeFile)(`${outputPath}/configuration-${artwork.name}-${date}.json`, JSON.stringify(options));

    console.log('All done 👍');
})();


