const artwork = () => {
  const defaultOptions = {
    step: 5,
    maxDepth: 12,
    backgroundColor: '#EAE2B7',
    lineWidthFactor: 0.0025,
    colors: ['#003049', '#D62828', '#F77F00', '#FCBF49'],
    iterations: 15,
  };

  const run = (canvas, options = defaultOptions) => {
    const context = canvas.getContext('2d');

    const getRandomInt = (min, max) => {
      min = Math.ceil(min);
      max = Math.floor(max);
      return Math.floor(Math.random() * (max - min)) + min;
    };
    const size = canvas.width;
    const step = options.step;
    const lineWidth = size * options.lineWidthFactor;
    const colors = options.colors;

    context.lineWidth = lineWidth;
    context.fillStyle = options.backgroundColor;

    const clear = () => {
      context.fillStyle = options.backgroundColor;
      context.fillRect(0, 0, size, size);
    };

    const generate = () => {
      const line = [];
      for (let i = 0; i <= size; i += step) {
        const distanceToCenter = Math.abs(i - size / 2);
        const variance = Math.max(size / 2 - 25 - distanceToCenter, 0);
        const direction = Math.random() <= 0.5 ? -1 : 1;
        const random = ((Math.random() * variance) / 2) * direction;
        line.push({ x: i, y: size / 2 + random });
      }

      const color = colors[getRandomInt(0, colors.length)];
      context.lineWidth = lineWidth + Math.random() * 3;
      context.strokeStyle = color;
      context.beginPath();
      for (let i = 0; i < line.length - 1; i++) {
        const xc = (line[i].x + line[i + 1].x) / 2;
        const yc = (line[i].y + line[i + 1].y) / 2;
        context.quadraticCurveTo(line[i].x, line[i].y, xc, yc);
      }
      context.stroke();
    };

    clear();
    for (let i = 0; i < options.iterations; i++) {
      generate();
    }

    return canvas;
  };

  return {
    run,
    defaultOptions,
    name: 'Waves',
  };
};

export default artwork;
