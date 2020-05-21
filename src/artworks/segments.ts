import { ArtWork, ArtWorkOptions } from '../types/index';
import { getRandomInt } from '../lib/math';

const artwork = (): ArtWork => {
  const run = (canvas: HTMLCanvasElement, options: ArtWorkOptions) => {
    const context = canvas.getContext('2d');

    const size = canvas.width;

    const columnWidth = 5;
    const segmentCount = 50;
    const padding = 1;
    const segmentPadding = 10;

    const clear = () => context.clearRect(0, 0, canvas.width, canvas.height);

    const drawBars = () => {
      for (let i = 0; i < size / columnWidth; i++) {
        const xs = new Array(segmentCount)
          .fill(0)
          .map((_) => getRandomInt(0, size))
          .sort((a, b) => a - b);

        for (let j = 0; j <= xs.length; j++) {
          const palette = options.colors;
          const color = palette[getRandomInt(0, palette.length)];
          context.fillStyle = color.toString();
          if (j === 0) {
            context.fillRect(
              i * columnWidth + padding,
              0,
              columnWidth - padding,
              xs[j]
            );
          } else if (j === segmentCount + 1) {
            context.fillRect(
              i * columnWidth + padding,
              xs[j - 1],
              columnWidth - padding,
              size
            );
          } else {
            const x = i * columnWidth + padding;
            const y = xs[j - 1];

            const width = columnWidth - padding;
            const height = y + xs[j];
            context.fillRect(x, y, width, height);
          }
        }
      }
    };

    const generate = () => {
      clear();
      drawBars();
    };

    generate();

    return canvas;
  };

  return {
    run,
    name: 'Segments',
  };
};

export default artwork;
