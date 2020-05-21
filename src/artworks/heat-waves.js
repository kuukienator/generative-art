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

    const colors = [
      'rgba(0, 48, 73, 0.1)',
      'rgba(214, 40, 40, 0.1)',
      'rgba(247, 127, 0, 0.1)',
      'rgba(252, 191, 73, 0.1)',
    ];

    const size = canvas.width;
    const step = 4; // 4, 10
    const lineWidth = size * 0.035; // 0.035, 0.1

    context.lineWidth = lineWidth;
    context.fillStyle = '#EAE2B7';

    const clear = () => {
      context.fillStyle = '#EAE2B7';
      context.fillRect(0, 0, size, size);
    };

    const generate = (y, color) => {
      const line = [];
      for (let i = 0; i <= size; i += step) {
        const direction = Math.random() <= 0.5 ? -1 : 1;

        /*
                const variance = Math.max(size / 2 - 25, 0);
                const random = Math.random() * variance / 2 * direction;
                */

        const random =
          10 *
          (Math.sin(Math.random() * i) + Math.cos(Math.random() * i)) *
          direction;

        line.push({ x: i, y: y + random });
      }

      // const color = colors[getRandomInt(0, colors.length)];
      // context.lineWidth = lineWidth + Math.random() * 3;
      context.strokeStyle = color;
      context.beginPath();
      for (let i = 0; i < line.length - 1; i++) {
        const xc = (line[i].x + line[i + 1].x) / 4;
        const yc = (line[i].y + line[i + 1].y) / 4;
        // context.quadraticCurveTo(line[i].x, line[i].y, xc, yc);
        context.lineTo(line[i].x, line[i].y);
      }
      context.stroke();
    };

    clear();

    const drawLine = (y, color) => {
      for (let i = 0; i < 20; i++) {
        generate(y, color);
      }
    };

    const doStuff = () => {
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

    doStuff();
    return canvas;
  };

  return {
    run,
    defaultOptions,
    name: 'Heat Waves',
  };
};

export default artwork;
