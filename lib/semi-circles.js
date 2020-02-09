(() => {
    const run = (canvas) => {
        const context = canvas.getContext("2d");
        //context.filter = 'best';
        //context.imageSmoothingEnabled = true;
        const size = canvas.width;

        const getRandomInt = (min, max) => {
            min = Math.ceil(min);
            max = Math.floor(max);
            return Math.floor(Math.random() * (max - min)) + min;
        };


        const radians = degrees => degrees * Math.PI / 180;
        const clear = (ctx) => ctx.clearRect(0, 0, size, size);

        const positions = [0, 90, 180, 270];

        const drawQuarterCircle = (ctx, center, radius, size, startAngle, angle) => {
            ctx.beginPath();
            ctx.arc(center.x, center.y, radius, radians(startAngle), radians(angle));
            ctx.arc(center.x, center.y, radius + size, radians(angle), radians(startAngle), true);
            ctx.fill();
        }

        clear(context);
        const rows = 10;
        const columns = 10;
        const cellSize = size / rows;

        for (let i = 0; i < rows; i++) {
            for (let j = 0; j < columns; j++) {

                context.rect(i * cellSize, j * cellSize, cellSize, cellSize);
                context.stroke();
                const center = {
                    x: (i * cellSize) + (cellSize / 2),
                    y: (j * cellSize) + (cellSize / 2)
                }

                context.beginPath();
                context.arc(center.x, center.y, 2, 0, 2 * Math.PI);
                context.fill();

                drawQuarterCircle(context, center, cellSize / 2, 2, 0, 90);
            }
        }

        return canvas;
    };

    const artwork = {
        run,
        name: 'semiCircles'
    };

    if (typeof module !== "undefined" && typeof module.exports !== "undefined") {
        module.exports = artwork;
    } else {
        window.GenerativeArt = Object.assign({}, window.GenerativeArt, {
            [artwork.name]: artwork
        });
    }

})();