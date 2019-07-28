(() => {
    const defaultOptions = {
        step: 5,
        maxDepth: 12,
        backgroundColor: '#EAE2B7',
        lineWidthFactor: 0.0025,
        colors:[
            '#003049',
            '#D62828',
            '#F77F00',
            '#FCBF49'
        ]
    };

    const run = (canvas, options = defaultOptions) => {
        const context = canvas.getContext("2d");
        const size = canvas.width;

        context.lineWidth = 3;
        context.fillStyle = "#F77F00";
        context.strokeStyle = "#F77F00";
        context.fillRect(0, 0, size, size);

        const padding = 5;
        const MAX_ITERATIONS = 20;
        const drawCircle = (x, y, radius, iteration = 1) => {
            if (iteration === MAX_ITERATIONS) {
                return;
            }

            if (iteration % 2 === 0) {
                context.fillStyle = "#F77F00";
            } else {
                context.fillStyle = "#D62828";

            }

            context.beginPath();
            context.arc(x, y, radius, 0, 2 * Math.PI);
            context.fill();


            const nextRadius = radius * 0.75;
            const a = Math.random() * 2 * Math.PI;
            const _x = (radius - nextRadius - padding) * Math.cos(a);
            const _y = (radius - nextRadius - padding) * Math.sin(a);
            drawCircle(_x + x, _y + y, nextRadius, iteration + 1);

        };

        const generate = () => {
            context.fillStyle = "#F77F00";
            context.fillRect(0, 0, size, size);
            const baseRadius = (size/2) - padding;
            const baseX = size/2;
            const baseY = size/2;
            drawCircle(baseX, baseY, baseRadius);
        };

        generate();

        return canvas;
    };

    const artwork = { run, defaultOptions, name: 'circles'};

    if (typeof module !== "undefined" && typeof module.exports !== "undefined") {
        module.exports = artwork;
    } else {
        window[artwork.name] = artwork;
    }
})();
