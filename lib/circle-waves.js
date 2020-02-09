(() => {
    const run = (canvas) => {
        const context = canvas.getContext("2d");
        context.filter = 'best';
        context.imageSmoothingEnabled = true;
        const size = canvas.width;

        const getRandomInt = (min, max) => {
            min = Math.ceil(min);
            max = Math.floor(max);
            return Math.floor(Math.random() * (max - min)) + min;
        };

        const radians = degrees => degrees * Math.PI / 180;

        const subdivideLine = (start, end, segments) => {
            if (segments === 0) {
                return {
                    start,
                    end: end * 0.8
                };
            }

            const splitPoint = getRandomInt(start, end);
            console.log(start, end, splitPoint);

            return [
                subdivideLine(start, splitPoint, segments - 1),
                subdivideLine(splitPoint, end, segments - 1)
            ].flat();
        }

        const drawArcSegment = (ctx, center, radius, size, startAngle, angle, color = 'black') => {
            ctx.strokeStyle = color;
            ctx.lineWidth = size * 1;
            ctx.beginPath();
            ctx.arc(center.x, center.y, radius, radians(startAngle), radians(angle));
            ctx.stroke();
        }

        const drawArc = (ctx, center, radius, size, startAngle, angle, color = 'black') => {
            ctx.fillStyle = color;
            ctx.strokeStyle = 'white';
            ctx.lineWidth = size * 0.1;
            ctx.beginPath();
            ctx.arc(center.x, center.y, radius, radians(startAngle), radians(angle));
            ctx.arc(center.x, center.y, radius + size, radians(angle), radians(startAngle), true);
            ctx.fill();
            //ctx.stroke();
            //ctx.closePath();
            //ctx.beginPath();
            //ctx.stroke();
        }

        const clear = (ctx) => ctx.clearRect(0, 0, size, size);

        const center = {
            x: size / 2,
            y: size / 2
        };

        const generate = () => {
            clear(context);
            const HRL_COLORS_PALETTES = [
                // 540d6e-ee4266-ffd23f-3bceac-0ead69
                [{
                        h: 198,
                        s: 63,
                        l: 38
                    },
                    {
                        h: 170,
                        s: 40,
                        l: 60
                    },
                    {
                        h: 139,
                        s: 36,
                        l: 78
                    },
                    {
                        h: 71,
                        s: 100,
                        l: 87
                    },
                    {
                        h: 344,
                        s: 100,
                        l: 54
                    }
                ],
                [{
                        h: 309,
                        s: 51,
                        l: 90
                    },
                    {
                        h: 350,
                        s: 21,
                        l: 78
                    },
                    {
                        h: 325,
                        s: 26,
                        l: 52
                    },
                    {
                        h: 296,
                        s: 39,
                        l: 31
                    },
                    {
                        h: 237,
                        s: 63,
                        l: 15
                    }
                ],
                [{
                        h: 352,
                        s: 70,
                        l: 70
                    },
                    {
                        h: 13,
                        s: 90,
                        l: 58
                    },
                    {
                        h: 248,
                        s: 31,
                        l: 23
                    },
                    {
                        h: 173,
                        s: 70,
                        l: 35
                    },
                    {
                        h: 71,
                        s: 58,
                        l: 64
                    }
                ],
                [{
                        h: 284,
                        s: 79,
                        l: 24
                    },
                    {
                        h: 347,
                        s: 83,
                        l: 60
                    },
                    {
                        h: 46,
                        s: 100,
                        l: 62
                    },
                    {
                        h: 166,
                        s: 60,
                        l: 52
                    },
                    {
                        h: 154,
                        s: 85,
                        l: 37
                    }
                ],

            ];

            const baseColors = [
                '#003049',
                '#D62828',
                '#F77F00',
                '#FCBF49'
            ];

            const colors = HRL_COLORS_PALETTES[0].map(color => `hsl(${color.h}, ${color.s}%, ${color.l}%, 1)`);
            const segmentSize = 30;
            const segments = size / segmentSize;
            const iterations = 10;
            for (let j = 0; j < iterations; j++) {
                for (let i = 1; i < segments + 1; i++) {
                    //drawArcSegment(context, center, i * segmentSize, segmentSize, getRandomInt(0, 360), getRandomInt(90, 360), colors[getRandomInt(0, colors.length)]);
                    drawArc(context, center, i * segmentSize, segmentSize, getRandomInt(0, 360), getRandomInt(90, 360), colors[getRandomInt(0, colors.length)]);
                }
            }
        }
        generate();

        return canvas;
    };

    const artwork = {
        run,
        name: 'circleWaves'
    };

    if (typeof module !== "undefined" && typeof module.exports !== "undefined") {
        module.exports = artwork;
    } else {
        window.GenerativeArt = Object.assign({}, window.GenerativeArt, {
            [artwork.name]: artwork
        });
    }

})();