(() => {
    const defaultOptions = {
        step: 5,
        maxDepth: 12,
        backgroundColor: '#EAE2B7',
        lineWidthFactor: 0.0025,
        colors: [
            '#003049',
            '#D62828',
            '#F77F00',
            '#FCBF49'
        ],
        iterations: 15
    };

    const run = (canvas, options = defaultOptions) => {
        const context = canvas.getContext("2d");

        const getRandomInt = (min, max) => {
            min = Math.ceil(min);
            max = Math.floor(max);
            return Math.floor(Math.random() * (max - min)) + min;
        };

        const size = canvas.width;


        const columnWidth = 5;
        const segmentCount = 50;
        const padding = 1;
        const segmentPadding = 10;

        const hslColors = [
            { h: 198, s: 63, l: 38 },
            { h: 170, s: 40, l: 60 },
            { h: 139, s: 36, l: 78 },
            { h: 71, s: 100, l: 87 },
            { h: 344, s: 100, l: 54 }
        ];

        const clear = () => context.clearRect(0, 0, canvas.width, canvas.height);

        const drawBase = () => {
            for (let i = 0; i < 15000; i++) {
                context.beginPath();
                context.fillStyle = 'rgba(0,0,0, 0.5)'
                context.arc(getRandomInt(0, size), getRandomInt(0, size), 2, 0, Math.PI * 2);
                context.fill();
            }
        }

        const drawBars = () => {
            for (let i = 0; i < size / columnWidth; i++) {
                const xs = new Array(segmentCount)
                    .fill(0)
                    .map(_ => getRandomInt(0, size))
                    .sort((a, b) => a - b);

                for (let j = 0; j <= xs.length; j++) {
                    const color = hslColors[getRandomInt(0, hslColors.length)];
                    context.fillStyle = `hsl(${color.h}, ${color.s}%, ${color.l}%, 1)`;
                    if (j === 0) {
                        context.fillRect((i * columnWidth) + padding, 0, columnWidth - padding, xs[j]);
                    }
                    else if (j === segmentCount + 1) {
                        context.fillRect((i * columnWidth) + padding, xs[j - 1], columnWidth - padding, size);
                    }
                    else {
                        const x = (i * columnWidth) + padding;
                        const y = xs[j - 1];

                        const width = columnWidth - padding;
                        const height = y + xs[j];
                        context.fillRect(x, y, width, height);
                    }
                }
            }
        }

        const generate = () => {
            clear();
            // drawBase();
            drawBars();
        };

        generate();

        return canvas;
    };

    const artwork = {run, defaultOptions, name: 'segments'};

    if (typeof module !== "undefined" && typeof module.exports !== "undefined") {
        module.exports = artwork;
    } else {
        window[artwork.name] = artwork;
    }
})();