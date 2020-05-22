import { getRandomInt, radians } from '../lib/math';
import { ArtWork, ArtWorkOptions } from '../types/index';
import AnimationEngine from '../lib/animation';

const artwork = (): ArtWork => {
  const animationEngine = AnimationEngine();

  const run = (canvas: HTMLCanvasElement, options: ArtWorkOptions) => {
    animationEngine.cancel();
    const context = canvas.getContext('2d');
    const size = canvas.width;
    const COLUMN_COUNT = 20;
    const CELL_SIZE = size / COLUMN_COUNT;

    const clear = (ctx) => ctx.clearRect(0, 0, size, size);

    clear(context);

    const drawDebugCirle = (ctx, point) => {
      ctx.beginPath();
      ctx.arc(point[0], point[1], 3, 0, 2 * Math.PI);
      ctx.fill();
    };

    /**
     *
     * @param {number} r
     * @param {number} a
     * @param {number} x
     * @param {number} y
     */
    const getCirclePointByAngle = (r, a, x, y) => {
      return [x + r * Math.cos(radians(a)), y + r * Math.sin(radians(a))];
    };

    /**
     *
     * @param {CanvasRenderingContext2D} ctx
     * @param {number} x
     * @param {number} y
     * @param {number} radius
     * @param {number} sides
     * @param {number} offest
     * @param {string} color
     */
    const drawPolygon = (
      ctx,
      x,
      y,
      radius,
      sides,
      offest = 0,
      color = 'rgba(255, 0, 0, 0.1)'
    ) => {
      const arcAngle = 360 / sides;
      ctx.fillStyle = color;
      ctx.beginPath();

      for (let i = 0; i <= sides; i++) {
        const point = getCirclePointByAngle(
          getRandomInt(radius, radius * 1.2),
          i * arcAngle + offest,
          x,
          y
        );
        if (i === 0) {
          ctx.moveTo(point[0], point[1]);
        }

        ctx.lineTo(point[0], point[1]);
      }
      ctx.fill();
    };

    const drawBlot = (x, y, r, color) => {
      for (let i = 0; i < 50; i++) {
        drawPolygon(
          context,
          x,
          y,
          getRandomInt(r, r + 10),
          getRandomInt(6, 12),
          getRandomInt(0, 60),
          color
        );
      }
    };

    drawBlot(size / 2, size / 2, 100, 'rgba(255, 0, 0, 0.1)');
    drawBlot(size / 2, size / 3, 80, 'rgba(255, 160, 0, 0.1)');
    drawBlot(size / 3, size / 3, 70, 'rgba(255, 200, 0, 0.1)');
    drawBlot(size / 3, size / 2, 110, 'rgba(0, 255, 100, 0.1)');

    return canvas;
  };

  const animate = (canvas: HTMLCanvasElement, options: ArtWorkOptions) =>
    animationEngine.animate(200, () => run(canvas, options));

  return {
    run,
    animate,
    name: 'Playground',
  };
};

export default artwork;
