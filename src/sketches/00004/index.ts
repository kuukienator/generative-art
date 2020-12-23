import { ArtWork, ArtWorkOptions, Point } from '../../types/index';
import { getRandomInt } from '../../lib/math';
import { Color } from '../../lib/colors';

const artwork = (): ArtWork => {
  const run = (canvas: HTMLCanvasElement, options: ArtWorkOptions) => {
    const context = canvas.getContext('2d');

    const colors = options.colors;

    const size = canvas.width;
    const step = 4; // 4, 10
    const lineWidth = size * 0.035; // 0.035, 0.1

    context.lineWidth = lineWidth;
    context.fillStyle = '#EAE2B7';

    const clear = () => {
      context.fillStyle = '#EAE2B7';
      context.fillRect(0, 0, size, size);
    };

    const generate = (y: number, color: Color) => {
      const line: Array<Point> = [];
      for (let i = 0; i <= size; i += step) {
        const direction = Math.random() <= 0.5 ? -1 : 1;

        const random =
          10 *
          (Math.sin(Math.random() * i) + Math.cos(Math.random() * i)) *
          direction;

        line.push({ x: i, y: y + random });
      }

      context.strokeStyle = color.toString();
      context.beginPath();
      for (let i = 0; i < line.length - 1; i++) {
        const xc = (line[i].x + line[i + 1].x) / 4;
        const yc = (line[i].y + line[i + 1].y) / 4;
        context.lineTo(line[i].x, line[i].y);
      }
      context.stroke();
    };

    clear();

    const drawLine = (y: number, color: Color) => {
      for (let i = 0; i < 20; i++) {
        generate(y, color);
      }
    };

    const drawLines = () => {
      drawLine(size * 0, colors[getRandomInt(0, colors.length)]);
      drawLine(size * 0.1, colors[getRandomInt(0, colors.length)]);
      drawLine(size * 0.2, colors[getRandomInt(0, colors.length)]);
      drawLine(size * 0.3, colors[getRandomInt(0, colors.length)]);
      drawLine(size * 0.4, colors[getRandomInt(0, colors.length)]);
      drawLine(size * 0.5, colors[getRandomInt(0, colors.length)]);
      drawLine(size * 0.6, colors[getRandomInt(0, colors.length)]);
      drawLine(size * 0.7, colors[getRandomInt(0, colors.length)]);
      drawLine(size * 0.8, colors[getRandomInt(0, colors.length)]);
      drawLine(size * 0.9, colors[getRandomInt(0, colors.length)]);
      drawLine(size * 1, colors[getRandomInt(0, colors.length)]);
    };

    drawLines();
    return canvas;
  };

  return {
    run,
    name: 'Heat Waves',
  };
};

export default artwork;
