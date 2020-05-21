const artwork = () => {
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

        const HRL_COLORS_PALETTES = [
            // 540d6e-ee4266-ffd23f-3bceac-0ead69
            [
                { h: 198, s: 63, l: 38 },
                { h: 170, s: 40, l: 60 },
                { h: 139, s: 36, l: 78 },
                { h: 71, s: 100, l: 87 },
                { h: 344, s: 100, l: 54 }
            ],
            [
                { h: 309, s: 51, l: 90 },
                { h: 350, s: 21, l: 78 },
                { h: 325, s: 26, l: 52 },
                { h: 296, s: 39, l: 31 },
                { h: 237, s: 63, l: 15 }
            ],
            [
                { h: 352, s: 70, l: 70 },
                { h: 13, s: 90, l: 58 },
                { h: 248, s: 31, l: 23 },
                { h: 173, s: 70, l: 35 },
                { h: 71, s: 58, l: 64 }
            ],
            [
                { h: 284, s: 79, l: 24 },
                { h: 347, s: 83, l: 60 },
                { h: 46, s: 100, l: 62 },
                { h: 166, s: 60, l: 52 },
                { h: 154, s: 85, l: 37 }
            ],

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
                    const palette = HRL_COLORS_PALETTES[3];
                    const color = palette[getRandomInt(0, palette.length)];
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

    return {run, defaultOptions, name: 'Segments'};
}

export default artwork;