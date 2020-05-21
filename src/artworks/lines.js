const artwork = () => {
  const defaultOptions = {
    step: 75,
    maxDepth: 8,
    backgroundColor: 'white',
    colors: ['#941B0C', '#BC3908', '#F6AA1C'],
    lineWidthFactor: 0.0045,
    count: 5,
  };

  const run = (canvas, o) => {
    const options = { ...defaultOptions, ...o };
    console.log(options);
    const context = canvas.getContext('2d');
    const size = canvas.width;
    const step = options.step;
    const lineWidth = size * options.lineWidthFactor;
    const MAX_DEPTH = options.maxDepth;
    context.lineWidth = lineWidth;
    const colors = options.colors;

    const getRandomInt = (min, max) => {
      min = Math.ceil(min);
      max = Math.floor(max);
      return Math.floor(Math.random() * (max - min)) + min;
    };

    const clamp = (num, min, max) =>
      num <= min ? min : num >= max ? max : num;

    const clear = () => {
      context.fillStyle = options.backgroundColor;
      context.strokeStyle = options.lineColor;
      context.fillRect(0, 0, size, size);
    };

    const generatePoint = (point) => {
      const _step = step + (Math.random() * step) / 3;
      const a = Math.random() * 2 * Math.PI;
      const _x = _step * Math.cos(a) * -1;
      const _y = _step * Math.sin(a) * -1;

      return {
        x: clamp(point.x + _x, 0, size),
        y: clamp(point.y + _y, 0, size),
      };
    };

    const addBranches = (point, depth = 0, color = colors[0]) => {
      if (depth === MAX_DEPTH) {
        return;
      }

      const nextPoint = generatePoint(point);
      const controlPoint1 = generatePoint(point);
      const controlPoint2 = generatePoint(point);

      context.strokeStyle = color;
      context.beginPath();
      context.moveTo(point.x, point.y);
      context.lineTo(nextPoint.x, nextPoint.y);
      // context.quadraticCurveTo(controlPoint1.x, controlPoint1.y, nextPoint.x, nextPoint.y);
      // context.bezierCurveTo(controlPoint1.x, controlPoint1.y, point.x, point.y, nextPoint.x, nextPoint.y);

      context.stroke();

      addBranches(nextPoint, depth + 1, color);
      addBranches(nextPoint, depth + 1, color);
    };

    const generate = () => {
      context.beginPath();
      // const startPoint = { x: size / 2, y: size / 2 };
      const startPoint = {
        x: getRandomInt(0, size),
        y: getRandomInt(0, size),
      };
      const color = colors[getRandomInt(0, colors.length)];
      console.log(color.toString());
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
    defaultOptions,
    name: 'Lines',
  };
};

export default artwork;
