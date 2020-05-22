import { ArtWork, Point, ArtWorkOptions } from '../types/index';
import { getRandomInt } from '../lib/math';
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

    const colors = options.colors.map((c) => c.toString());

    const drawTriangle = (
      ctx: CanvasRenderingContext2D,
      p1: Point,
      p2: Point,
      p3: Point
    ) => {
      ctx.fillStyle = colors[getRandomInt(0, colors.length)];
      ctx.beginPath();
      ctx.moveTo(p1.x, p1.y);
      ctx.lineTo(p2.x, p2.y);
      ctx.lineTo(p3.x, p3.y);
      ctx.fill();
    };

    const drawSquareWithTriangles = (
      ctx: CanvasRenderingContext2D,
      x: number,
      y: number,
      w: number,
      h: number
    ) => {
      drawTriangle(ctx, { x, y }, { x: x + w, y }, { x, y: y + h });
      drawTriangle(
        ctx,
        { x: x + w, y },
        { x: x + w, y: y + h },
        { x, y: y + h }
      );
    };

    for (let i = 0; i < COLUMN_COUNT; i++) {
      for (let j = 0; j < COLUMN_COUNT; j++) {
        drawSquareWithTriangles(
          context,
          i * CELL_SIZE,
          j * CELL_SIZE,
          CELL_SIZE,
          CELL_SIZE
        );
      }
    }

    return canvas;
  };

  const animate = (canvas: HTMLCanvasElement, options: ArtWorkOptions) =>
    animationEngine.animate(300, () => run(canvas, options));

  return {
    run,
    animate,
    name: 'Triangles',
  };
};

export default artwork;
