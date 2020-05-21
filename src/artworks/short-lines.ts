import { ArtWork, ArtWorkOptions } from '../types/index';
import { getRandomInt } from '../lib/math';

const artwork = (): ArtWork => {
  const run = (canvas: HTMLCanvasElement, options: ArtWorkOptions) => {
    const context = canvas.getContext('2d');
    const size = canvas.width;

    const step = 20;
    const branches = 20;
    const lineWidth = 2;

    const clear = () => context.clearRect(0, 0, canvas.width, canvas.height);

    const drawBranchesVertical = (
      initialX: number,
      initialY: number,
      width: number,
      isLeft: boolean
    ) => {
      for (let j = 0; j < branches; j++) {
        const y = getRandomInt(0, width);
        const length = getRandomInt(step / 3, (step / 3) * 2);
        context.lineWidth = lineWidth / 2;

        context.beginPath();
        context.moveTo(initialX + lineWidth / 2, initialY + y);
        if (isLeft) {
          context.lineTo(initialX + lineWidth / 2 - length, initialY + y);
        } else {
          context.lineTo(initialX + lineWidth / 2 + length, initialY + y);
        }

        context.stroke();
      }
    };

    const drawBranchesHorizontal = (
      initialX: number,
      initialY: number,
      width: number,
      isUp: boolean
    ) => {
      for (let j = 0; j < branches; j++) {
        const x = getRandomInt(0, width);
        const length = getRandomInt(step / 3, (step / 3) * 2);
        context.lineWidth = lineWidth / 2;

        context.beginPath();
        context.moveTo(initialX + x, initialY + lineWidth / 2);
        if (isUp) {
          context.lineTo(initialX + x, initialY + lineWidth / 2 - length);
        } else {
          context.lineTo(initialX + x, initialY + lineWidth / 2 + length);
        }

        context.stroke();
      }
    };

    const generateVertical = (
      initialX: number,
      initialY: number,
      width: number,
      height: number
    ) => {
      const segments = width / step;

      for (let i = 0; i <= segments; i++) {
        const x = initialX + i * step;
        drawBranchesVertical(x, initialY, width, false);
        drawBranchesVertical(x, initialY, width, true);
      }
    };

    const generateHorizontal = (
      initialX: number,
      initialY: number,
      width: number,
      height: number
    ) => {
      const segments = height / step;

      for (let i = 0; i <= segments; i++) {
        const y = initialY + i * step;
        drawBranchesHorizontal(initialX, y, width, false);
        drawBranchesHorizontal(initialX, y, width, true);
      }
    };

    const drawLines = (count: number) => {
      const segment = size / count;
      for (let i = 0; i < count; i++) {
        for (let j = 0; j < count; j++) {
          if ((j + i) % 2 === 1) {
            generateHorizontal(i * segment, j * segment, segment, segment);
          } else {
            generateVertical(i * segment, j * segment, segment, segment);
          }
        }
      }
    };

    const drawLinesRotated = () => {
      const segment = size / 2;
      generateHorizontal(0, 0, segment, segment);
      generateVertical(segment, 0, segment, segment);
      generateHorizontal(segment, segment, segment, segment);
      generateVertical(0, segment, segment, segment);
    };

    const generate = () => {
      clear();

      context.fillStyle = 'rgba(247, 127, 0, 0.5)';
      context.strokeStyle = 'rgba(214, 40, 40, 0.7)';
      context.fillRect(0, 0, size, size);

      for (let i = 0; i < 10; i++) {
        drawLines(3);
      }
    };

    generate();

    return canvas;
  };

  return {
    run,
    name: 'Short Lines',
  };
};

export default artwork;
