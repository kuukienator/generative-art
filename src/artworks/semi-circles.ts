import { ArtWork, ArtWorkOptions } from '../types/index';
import { distance, getRandomInt } from '../lib/math';
import { circleFilled, circleStroked, Circle } from '../lib/shapes';
import { Color } from '../lib/colors';
import AnimationEngine from '../lib/animation';

const artwork = (): ArtWork => {
  const animationEngine = AnimationEngine();

  const run = (canvas: HTMLCanvasElement, options: ArtWorkOptions) => {
    animationEngine.cancel();
    const context = canvas.getContext('2d');
    const size = canvas.width;

    const clear = (ctx: CanvasRenderingContext2D, w: number, h: number) =>
      ctx.clearRect(0, 0, w, h);

    const getClosestCircle = (circle: Circle, circles: Array<Circle>) => {
      return circles
        .map((c) => ({ ...c, d: distance(circle, c) }))
        .sort((a, b) => a.d - b.d)[0];
    };

    const oribitedCircle = (
      ctx: CanvasRenderingContext2D,
      circle: Circle,
      color: Color
    ) => {
      ctx.fillStyle = color.toString();
      circleFilled(ctx, circle.x, circle.y, circle.r);

      ctx.lineWidth = 4;
      circleStroked(ctx, circle.x, circle.y, circle.r * 1.25);
    };

    clear(context, size, size);
    const circlesCount = 50;
    const colors = options.colors;

    context.fillStyle = '#233D4D';
    context.fillRect(0, 0, size, size);

    const circles: Array<Circle> = Array(circlesCount)
      .fill(0)
      .map(() => ({
        x: getRandomInt(0, size),
        y: getRandomInt(0, size),
        r: getRandomInt(20, 40),
      }));

    circles.forEach((circle) => {
      const closestCirlce = getClosestCircle(
        circle,
        circles.filter((c) => c !== circle)
      );
      context.lineWidth = 4;
      context.strokeStyle = '#FCF5E9';
      context.beginPath();
      context.moveTo(circle.x, circle.y);
      context.lineTo(closestCirlce.x, closestCirlce.y);
      context.stroke();
    });

    circles.forEach((circle) => {
      oribitedCircle(context, circle, colors[getRandomInt(0, colors.length)]);
    });

    return canvas;
  };

  const animate = (canvas: HTMLCanvasElement, options: ArtWorkOptions) =>
    animationEngine.animate(500, () => run(canvas, options));

  return {
    run,
    animate,
    name: 'Semi Cirlces',
  };
};

export default artwork;
