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
        // const dpr = window.devicePixelRatio;
        // canvas.width = size * dpr;
        // canvas.height = size * dpr;
        // context.scale(dpr, dpr);

        const step = 20;
        const branches = 20;
        const lineWidth = 2;

        const clear = () => context.clearRect(0, 0, canvas.width, canvas.height);

        const drawBranchesVertical = (initialX, initialY, width, isLeft) => {
            for (let j = 0; j < branches; j++) {
                const y = getRandomInt(0, width);
                const length = getRandomInt(step / 3, step / 3 * 2);
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

        const drawBranchesHorizontal = (initialX, initialY, width, isUp) => {
            for (let j = 0; j < branches; j++) {
                const x = getRandomInt(0, width);
                const length = getRandomInt(step / 3, step / 3 * 2);
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

        const generateVertical = (initialX, initialY, width, height) => {
            // context.fillStyle = 'rgba(0, 48, 73, 0.5)';
            // context.strokeStyle = "rgba(214, 40, 40, 0.8)";
            // context.fillRect(initialX, initialY, width, height);

            const segments = width / step;

            for (let i = 0; i <= segments; i++) {
                const x = initialX + i * step;
                // context.lineWidth = lineWidth;
                // context.beginPath();
                // context.moveTo(x + lineWidth / 2, initialY);
                // context.lineTo(x + lineWidth / 2, initialY + width);
                // context.stroke();

                drawBranchesVertical(x, initialY, width, false);
                drawBranchesVertical(x, initialY, width, true);
            }
        };

        const generateHorizontal = (initialX, initialY, width, height) => {
            // context.fillStyle = 'rgba(0, 48, 73, 0.5)';
            // context.strokeStyle = "rgba(214, 40, 40, 0.8)";
            // context.fillRect(initialX, initialY, width, height);

            const segments = height / step;

            for (let i = 0; i <= segments; i++) {
                const y = initialY + i * step;
                // context.lineWidth = lineWidth;
                // context.beginPath();
                // context.moveTo(initialX, y + lineWidth / 2);
                // context.lineTo(initialX + width, y + lineWidth / 2);
                // context.stroke();

                drawBranchesHorizontal(initialX, y, width, false);
                drawBranchesHorizontal(initialX, y, width, true);
            }
        };

        const drawLines = (count) => {
            const segment = size / count;
            for (let i = 0; i < count; i++) {
                for (let j = 0; j < count; j++) {
                    if ( (j + i) % 2 === 1){
                        generateHorizontal(i * segment, j * segment, segment, segment);
                    } else {
                        generateVertical(i * segment, j * segment, segment, segment);
                    }

                }
            }

            // generateVertical(0, 0, segment, segment);
            // generateHorizontal(segment, 0, segment, segment);
            // generateVertical(segment, segment, segment, segment);
            // generateHorizontal(0, segment, segment, segment);
        };

        const drawLinesRotated = () => {
            const segment = size / 2;
            generateHorizontal(0, 0, segment, segment);
            generateVertical(segment, 0, segment, segment);
            generateHorizontal(segment, segment, segment, segment);
            generateVertical(0, segment, segment, segment);
        };

        const generate = () => {
            // drawLinesRotated();
            // context.save();
            // context.globalCompositeOperation = 'destination-in';
            // context.restore();

            //   context.fillStyle = 'blue';
            //   context.beginPath();
            //   context.arc(size / 2, size / 2, size/2 * 0.9, 0, 2 * Math.PI);
            //   context.fill();

            // context.fillStyle = "rgba(247, 127, 0, 0.1)";
            // context.fillStyle='white';
            // context.beginPath();
            // context.arc(size / 2, size / 2, size / 2 * 0.8, 0, 2 * Math.PI);
            // context.fill();

            context.fillStyle = "rgba(247, 127, 0, 0.5)";
            context.strokeStyle = "rgba(214, 40, 40, 0.7)";
            context.fillRect(0, 0, size, size);

            // context.save();
            // context.globalCompositeOperation = "source-atop";
            // context.globalCompositeOperation = "multiply";
            for (let i = 0; i < 10; i++) {
                drawLines(3);
            }
            // context.restore();
        };

        generate();

        return canvas;
    };

    const artwork = {run, defaultOptions, name: 'shortLines'};

    if (typeof module !== "undefined" && typeof module.exports !== "undefined") {
        module.exports = artwork;
    } else {
        window.GenerativeArt = Object.assign({}, window.GenerativeArt, {[artwork.name]: artwork});
    }
})();