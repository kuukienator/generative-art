import { ArtWork, ArtWorkOptions } from '../types/index';
import { getRandomInt, radians } from '../lib/math';

const artwork = (): ArtWork => {
  const run = (canvas: HTMLCanvasElement, options: ArtWorkOptions) => {
    const context = canvas.getContext('2d');
    context.filter = 'best';
    context.imageSmoothingEnabled = true;
    const size = canvas.width;

    const subdivideLine = (start: number, end: number, segments: number) => {
      if (segments === 0) {
        return {
          start,
          end: end * 0.8,
        };
      }

      const splitPoint = getRandomInt(start, end);

      return [
        subdivideLine(start, splitPoint, segments - 1),
        subdivideLine(splitPoint, end, segments - 1),
      ].flat();
    };

    const drawArc = (ctx, center, radius, size, startAngle, angle, color) => {
      ctx.fillStyle = color;
      ctx.strokeStyle = 'white';
      ctx.lineWidth = size * 0.1;
      ctx.beginPath();
      ctx.arc(center.x, center.y, radius, radians(startAngle), radians(angle));
      ctx.arc(
        center.x,
        center.y,
        radius + size,
        radians(angle),
        radians(startAngle),
        true
      );
      ctx.fill();
    };

    const clear = (ctx) => ctx.clearRect(0, 0, size, size);

    const center = {
      x: size / 2,
      y: size / 2,
    };

    const generate = () => {
      clear(context);

      const baseColors = ['#003049', '#D62828', '#F77F00', '#FCBF49'];

      const colors = options.colors;
      const segmentSize = 30;
      const segments = size / segmentSize;
      const iterations = 10;
      for (let j = 0; j < iterations; j++) {
        for (let i = 1; i < segments + 1; i++) {
          drawArc(
            context,
            center,
            i * (segmentSize / 2),
            segmentSize,
            getRandomInt(0, 360),
            getRandomInt(90, 360),
            colors[getRandomInt(0, colors.length)]
          );
        }
      }
    };
    generate();

    return canvas;
  };

  return {
    run,
    name: 'Circle Waves',
    id: 'circleWaves',
  };
};

export default artwork;
