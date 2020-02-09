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
        const distance = (p1, p2) => Math.sqrt(Math.pow((p1.x-p2.x), 2) + Math.pow((p1.y-p2.y), 2));
        const clear = (ctx) => ctx.clearRect(0, 0, size, size);
        const getClosestCircle = (circle, circles) => {
            return circles
            .map(c => ({...c, d: distance(circle, c)}))
            .sort((a, b) => a.d - b.d)[0];
        }

        const positions = [0, 90, 180, 270];

        const drawSemiCircle = (ctx, center, radius, startAngle, angle, color) => {
            ctx.fillStyle = color;
            ctx.beginPath();
            ctx.arc(center.x, center.y, radius, radians(startAngle), radians(startAngle + angle));
            ctx.fill();
            ctx.closePath();
        }

        const oribitedCircle = (ctx, circle, color) => {
            ctx.fillStyle = color;
            ctx.beginPath();
            ctx.arc(circle.x, circle.y, circle.r, 0, 2 * Math.PI);
            ctx.fill();
            ctx.closePath();


            ctx.lineWidth = 4;
            ctx.beginPath();
            ctx.arc(circle.x, circle.y, circle.r * 1.25, 0, 2 * Math.PI);
            ctx.stroke();
        }

        clear(context);
        const circlesCount = 100;
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
        const colors = HRL_COLORS_PALETTES[0].map(color => `hsl(${color.h}, ${color.s}%, ${color.l}%, 1)`);
        /*
        for (let i = 0; i < rows; i++) {
            for (let j = 0; j < columns; j++) {

                const center = {
                    x: (i * cellSize/2) + (cellSize / 2),
                    y: (j * cellSize/2) + (cellSize / 2)
                }

                drawSemiCircle(context, center, cellSize / 2, positions[getRandomInt(0, positions.length)], 180, colors[getRandomInt(0, colors.length)]);
            }
        }
        */

        context.fillStyle = '#233D4D';
        context.fillRect(0, 0, size, size);

        const circles = Array(circlesCount).fill(0).map(() => ({x: getRandomInt(0, size), y: getRandomInt(0, size), r: getRandomInt(20, 50)}));

        circles.forEach(circle => {
            const closestCirlce = getClosestCircle(circle, circles.filter(c => c !== circle));
            context.lineWidth = 4;
            context.strokeStyle = '#FCF5E9';
           context.beginPath();
           context.moveTo(circle.x, circle.y)
           context.lineTo(closestCirlce.x, closestCirlce.y)
           context.stroke();
        });

        circles.forEach(circle => {
            oribitedCircle(context, circle, colors[getRandomInt(0, colors.length)]);
        });




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