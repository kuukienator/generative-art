const artwork = () => {
    let currentAnimationFrame = null;

    /**
     * 
     * @param {HTMLCanvasElement} canvas 
     */
    const run = (canvas) => {
        const context = canvas.getContext("2d");
        const size = canvas.width;
        const COLUMN_COUNT = 20;
        const CELL_SIZE = size/COLUMN_COUNT;

        const getRandomInt = (min, max) => {
            min = Math.ceil(min);
            max = Math.floor(max);
            return Math.floor(Math.random() * (max - min)) + min;
        };

        const clear = (ctx) => ctx.clearRect(0, 0, size, size);
        
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
            [{
                h: 198,
                s: 63,
                l: 38
            },
            {
                h: 170,
                s: 40,
                l: 60
            }
        ],

        ];
        const colors = HRL_COLORS_PALETTES[3].map(color => `hsl(${color.h}, ${color.s}%, ${color.l}%, 1)`);

        /**
         * 
         * @param {CanvasRenderingContext2D} ctx 
         * @param {Array<number>} p1 
         * @param {Array<number>} p2 
         * @param {Array<number>} p3 
         */
        const drawTriangle = (ctx, p1, p2, p3) => {
            ctx.fillStyle = colors[getRandomInt(0, colors.length)];
            ctx.beginPath();
            ctx.moveTo(p1[0], p1[1]);
            ctx.lineTo(p2[0], p2[1]);
            ctx.lineTo(p3[0], p3[1]);
            ctx.fill();
        }

        /**
         * 
         * @param {CanvasRenderingContext2D} ctx 
         * @param {number} x 
         * @param {number} y 
         * @param {number} w 
         * @param {number} h 
         */
        const drawSquareWithTriangles = (ctx, x, y, w, h) => {
            drawTriangle(ctx, [x, y], [x + w, y], [x, y + h]);
            drawTriangle(ctx, [x + w, y], [x + w, y + h], [x, y + h]);
        }

        for (let i = 0; i < COLUMN_COUNT; i++) {
           for (let j = 0; j < COLUMN_COUNT; j++) {
                drawSquareWithTriangles(context, i * CELL_SIZE, j * CELL_SIZE, CELL_SIZE, CELL_SIZE);
           }
        }

        return canvas;
    };

    const animationLoop = (stepSize = 1000, animateCallback) => {
        animateCallback();
        let start = null;

        const step = (timestamp) => {
            if (!start) {
                start = timestamp;
            }

            const progress = timestamp - start;

            if (progress >= stepSize) {
                start = timestamp;
                animateCallback();
            }

            currentAnimationFrame = window.requestAnimationFrame(step);
        }

        currentAnimationFrame = window.requestAnimationFrame(step);
    }

    /**
     * 
     * @param {HTMLCanvasElement} canvas 
     */
    const animate = (canvas) => {
        if (currentAnimationFrame) {
            window.cancelAnimationFrame(currentAnimationFrame);
        }
        run(canvas);
        // animationLoop(1000, () => run(canvas));

    }

    return {
        run: animate,
        name: 'Triangles'
    };
}

export default artwork;