import { ArtWork, ArtWorkOptions } from '../types/index';
import { circleFilled } from '../lib/shapes';

const artwork = (): ArtWork => {
  const run = (canvas: HTMLCanvasElement, options: ArtWorkOptions) => {
    const context = canvas.getContext('2d');
    const size = canvas.width;

    context.lineWidth = 3;
    context.fillStyle = '#F77F00';
    context.strokeStyle = '#F77F00';
    context.fillRect(0, 0, size, size);

    const padding = 5;
    const MAX_ITERATIONS = 20;

    const drawCircle = (
      x: number,
      y: number,
      radius: number,
      iteration: number = 1
    ) => {
      if (iteration === MAX_ITERATIONS) {
        return;
      }

      if (iteration % 2 === 0) {
        context.fillStyle = '#F77F00';
      } else {
        context.fillStyle = '#D62828';
      }

      circleFilled(context, x, y, radius);

      const nextRadius = radius * 0.75;
      const a = Math.random() * 2 * Math.PI;
      const _x = (radius - nextRadius - padding) * Math.cos(a);
      const _y = (radius - nextRadius - padding) * Math.sin(a);
      drawCircle(_x + x, _y + y, nextRadius, iteration + 1);
    };

    const generate = () => {
      context.fillStyle = '#F77F00';
      context.fillRect(0, 0, size, size);
      const baseRadius = size / 2 - padding;
      const baseX = size / 2;
      const baseY = size / 2;
      drawCircle(baseX, baseY, baseRadius);
    };

    generate();

    return canvas;
  };

  return {
    run,
    name: 'Circles',
  };
};

export default artwork;
