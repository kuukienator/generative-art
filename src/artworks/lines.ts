import { ArtWork, ArtWorkOptions, Point } from '../types/index';
import { clamp, getRandomInt } from '../lib/math';
import { Color } from '../lib/colors';

const artwork = (): ArtWork => {
  const defaultOptions = {
    step: 75,
    maxDepth: 8,
    backgroundColor: 'white',
    lineWidthFactor: 0.0045,
    count: 5,
  };

  const run = (canvas: HTMLCanvasElement, o: ArtWorkOptions) => {
    const options = { ...defaultOptions, ...o };
    const context = canvas.getContext('2d');
    const size = canvas.width;
    const step = options.step;
    const lineWidth = size * options.lineWidthFactor;
    const MAX_DEPTH = options.maxDepth;
    context.lineWidth = lineWidth;
    const colors = options.colors;

    const clear = () => {
      context.fillStyle = options.backgroundColor;
      context.fillRect(0, 0, size, size);
    };

    const generatePoint = (point: Point) => {
      const nextStep = step + (Math.random() * step) / 3;
      const a = Math.random() * 2 * Math.PI;
      const _x = nextStep * Math.cos(a) * -1;
      const _y = nextStep * Math.sin(a) * -1;

      return {
        x: clamp(point.x + _x, 0, size),
        y: clamp(point.y + _y, 0, size),
      };
    };

    const addBranches = (
      point: Point,
      depth: number = 0,
      color: Color = colors[0]
    ) => {
      if (depth === MAX_DEPTH) {
        return;
      }

      const nextPoint = generatePoint(point);
      const controlPoint1 = generatePoint(point);
      const controlPoint2 = generatePoint(point);

      context.strokeStyle = color.toString();
      context.beginPath();
      context.moveTo(point.x, point.y);
      context.lineTo(nextPoint.x, nextPoint.y);
      context.stroke();

      addBranches(nextPoint, depth + 1, color);
      addBranches(nextPoint, depth + 1, color);
    };

    const generate = () => {
      context.beginPath();
      const startPoint = {
        x: getRandomInt(0, size),
        y: getRandomInt(0, size),
      };
      const color = colors[getRandomInt(0, colors.length)];
      addBranches({ x: startPoint.x, y: startPoint.y + step }, 0, color);
      addBranches({ x: startPoint.x, y: startPoint.y + step }, 0, color);
      addBranches({ x: startPoint.x, y: startPoint.y + step }, 0, color);
    };

    clear();
    for (let i = 0; i < options.count; i++) {
      generate();
    }

    return canvas;
  };

  return {
    run,
    name: 'Lines',
  };
};

export default artwork;
